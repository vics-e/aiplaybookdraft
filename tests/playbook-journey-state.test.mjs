import assert from 'node:assert/strict';
import test from 'node:test';

import {
  addVisitedPage,
  createDefaultPlaybookState,
  getSectionVisitProgress,
  getVisitedPageProgress,
  hydratePlaybookState,
  loadPlaybookState,
  PLAYBOOK_STORAGE_KEY,
  savePlaybookState,
} from '../src/app/models/playbookStateModel.ts';
import {
  resolveContentsDestination,
  resolveNextExperience,
  resolvePreviousExperience,
} from '../src/app/models/playbookNavigationModel.ts';

const totalPages = 8;
const navigation = [
  { openerId: 'section-1', startPageIndex: 2, sectionName: 'Section 1' },
  { openerId: 'section-2', startPageIndex: 5, sectionName: 'Section 2' },
];

test('saved playbook state hydrates through a deterministic round trip', () => {
  const values = new Map();
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const state = {
    currentPage: 4,
    userInputs: { reflection: 'Prioritise review work' },
    visitedPages: new Set([0, 2, 4]),
  };

  assert.equal(savePlaybookState(storage, state), true);
  assert.equal(values.has(PLAYBOOK_STORAGE_KEY), true);
  assert.deepEqual(loadPlaybookState(storage, totalPages), state);
});

test('corrupt JSON and storage read/write failures fall back without escaping', () => {
  assert.deepEqual(hydratePlaybookState('{broken', totalPages), createDefaultPlaybookState());

  const failedRead = loadPlaybookState({
    getItem() { throw new Error('blocked'); },
    setItem() {},
  }, totalPages);
  assert.deepEqual(failedRead, createDefaultPlaybookState());

  const writeResult = savePlaybookState({
    getItem() { return null; },
    setItem() { throw new Error('quota'); },
  }, createDefaultPlaybookState());
  assert.equal(writeResult, false);
  assert.equal(savePlaybookState(null, createDefaultPlaybookState()), false);
});

test('invalid current pages reset and non-string answers are discarded', () => {
  for (const invalidPage of [-1, totalPages, 1.5, '3', null]) {
    const state = hydratePlaybookState(JSON.stringify({
      currentPage: invalidPage,
      userInputs: { kept: 'answer', number: 12, object: {}, empty: '' },
      visitedPages: [3],
    }), totalPages);

    assert.equal(state.currentPage, 0);
    assert.deepEqual(state.userInputs, { kept: 'answer', empty: '' });
    assert.deepEqual(state.visitedPages, new Set([3, 0]));
  }
});

test('hydration deduplicates visited pages and always includes cover and current page', () => {
  const state = hydratePlaybookState(JSON.stringify({
    currentPage: 4,
    visitedPages: [4, 4, 2, 2, -1, 8, 2.5, '3'],
  }), totalPages);

  assert.deepEqual(state.visitedPages, new Set([4, 2, 0]));
});

test('next and previous navigation stop at the first and last page', () => {
  assert.deepEqual(resolvePreviousExperience(0, null, totalPages, navigation), { kind: 'none' });
  assert.deepEqual(resolveNextExperience(totalPages - 1, null, totalPages, navigation), { kind: 'none' });
  assert.deepEqual(resolveNextExperience(3, null, totalPages, navigation), { kind: 'page', page: 4 });
  assert.deepEqual(resolvePreviousExperience(4, null, totalPages, navigation), { kind: 'page', page: 3 });
});

test('section openers resolve symmetrically across next and previous journeys', () => {
  assert.deepEqual(resolveNextExperience(1, null, totalPages, navigation), {
    kind: 'opener',
    openerId: 'section-1',
  });
  assert.deepEqual(resolveNextExperience(2, 'section-1', totalPages, navigation), {
    kind: 'page',
    page: 2,
  });
  assert.deepEqual(resolvePreviousExperience(2, null, totalPages, navigation), {
    kind: 'opener',
    openerId: 'section-1',
  });
  assert.deepEqual(resolvePreviousExperience(2, 'section-1', totalPages, navigation), {
    kind: 'page',
    page: 1,
  });
});

test('contents destinations open section entrances and reject invalid page values', () => {
  assert.deepEqual(resolveContentsDestination(5, totalPages, navigation), {
    kind: 'opener',
    openerId: 'section-2',
  });
  assert.deepEqual(resolveContentsDestination(6, totalPages, navigation), { kind: 'page', page: 6 });
  assert.deepEqual(resolveContentsDestination(totalPages, totalPages, navigation), { kind: 'none' });
});

test('visited-page tracking is deduplicated and drives overall and section progress', () => {
  let visitedPages = new Set([0]);
  visitedPages = addVisitedPage(visitedPages, 2);
  visitedPages = addVisitedPage(visitedPages, 2);
  visitedPages = addVisitedPage(visitedPages, 3);

  assert.deepEqual(visitedPages, new Set([0, 2, 3]));
  assert.equal(getVisitedPageProgress(visitedPages, totalPages), 37.5);
  assert.equal(getSectionVisitProgress([2, 3, 4], visitedPages), (2 / 3) * 100);
  assert.equal(getSectionVisitProgress([], visitedPages), 0);
});
