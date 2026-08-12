import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DEFAULT_WORKFLOW_MAP_STATE,
  buildWorkflowMapSummary,
  getWorkflowPlotPosition,
  getWorkflowQuadrant,
  parseWorkflowMapState,
  updateSelectedWorkflowIds,
} from '../src/app/components/content/workflowMapModel.ts';
import {
  buildAgentSpecCopyText,
  buildToolMatrixSummary,
  parseSpecFormFields,
  parseToolMatrixState,
} from '../src/app/components/content/activityModels.ts';
import {
  DEFAULT_PROMPT_LIBRARY_STATE,
  parsePromptLibraryState,
} from '../src/app/components/content/promptLibraryStateModel.ts';
import {
  buildGlossaryTerms,
  parseGlossaryPageState,
} from '../src/app/components/content/glossaryModel.ts';
import { cleanTemplateLine } from '../src/app/components/content/textCleaning.ts';

test('workflow map parsing sanitises scores and preserves its summary contract', () => {
  const state = parseWorkflowMapState(JSON.stringify({
    workflows: [{ id: 'one', name: '  Bank reconciliation  ', repeatability: 8, judgement: -2 }],
    selectedWorkflowIds: ['one'],
    currentStep: 99,
  }));

  assert.deepEqual(state.workflows[0], {
    id: 'one',
    name: 'Bank reconciliation',
    repeatability: 5,
    judgement: 1,
  });
  assert.equal(state.currentStep, 3);
  assert.equal(getWorkflowQuadrant(5, 1), 'strongAgentCandidate');
  assert.deepEqual(getWorkflowPlotPosition(state.workflows[0]), { left: 88, top: 88 });
  assert.match(buildWorkflowMapSummary(state).copyText, /Priority workflows[\s\S]*Bank reconciliation/);
});

test('workflow priority selection retains the two-item limit', () => {
  assert.deepEqual(updateSelectedWorkflowIds([], 'one'), ['one']);
  assert.deepEqual(updateSelectedWorkflowIds(['one'], 'two'), ['one', 'two']);
  assert.deepEqual(updateSelectedWorkflowIds(['one', 'two'], 'three'), ['one', 'two']);
  assert.deepEqual(updateSelectedWorkflowIds(['one', 'two'], 'one', false), ['two']);
});

test('workflow map state survives save and reload while discarding stale selections', () => {
  const saved = JSON.stringify({
    workflows: [
      { id: 'one', name: 'Monthly close', repeatability: 5, judgement: 2 },
      { id: 'two', name: 'Client advisory', repeatability: 2, judgement: 5 },
    ],
    draftName: 'Next workflow',
    scoringIndex: 1,
    selectedWorkflowIds: ['one', 'missing', 'one', 'two', 'overflow'],
    currentStep: 3,
    'question-0': 'derived summary data',
  });

  const reloaded = parseWorkflowMapState(saved);

  assert.deepEqual(reloaded.selectedWorkflowIds, ['one', 'two']);
  assert.equal(reloaded.draftName, 'Next workflow');
  assert.equal(reloaded.scoringIndex, 1);
  assert.match(buildWorkflowMapSummary(reloaded).copyText, /Monthly close:[\s\S]*Client advisory:/);
  assert.deepEqual(parseWorkflowMapState('{not json'), DEFAULT_WORKFLOW_MAP_STATE);
});

test('prompt library state round-trips useful values and sanitises malformed collections', () => {
  const reloaded = parsePromptLibraryState(JSON.stringify({
    searchQuery: 'email',
    expandedPromptIds: ['prompt-0', 4, null],
    promptValues: {
      'prompt-0': { 'var-0': 'Quarterly review', 'var-1': false },
      broken: ['not', 'a', 'map'],
    },
    activityAnswers: { 'question-0': 'Use an approved tool', 'question-1': 42 },
    activityCompleted: ['question-0', false],
  }));

  assert.deepEqual(reloaded, {
    searchQuery: 'email',
    expandedPromptIds: ['prompt-0'],
    promptValues: { 'prompt-0': { 'var-0': 'Quarterly review' } },
    activityAnswers: { 'question-0': 'Use an approved tool' },
    activityCompleted: ['question-0'],
  });
  assert.deepEqual(parsePromptLibraryState('not-json'), DEFAULT_PROMPT_LIBRARY_STATE);
});

test('activity models keep saved fields and produce stable copy summaries', () => {
  assert.deepEqual(parseSpecFormFields('{"field-0":"Goal"}', 2), {
    'field-0': 'Goal',
    'field-1': '',
  });
  assert.match(
    buildAgentSpecCopyText([{ label: 'Goal', placeholder: '' }], { 'field-0': 'Reduce rework' }),
    /Goal:\nReduce rework/,
  );

  const fallbackRows = [{
    id: 'matrix-row-0',
    toolName: 'Approved assistant',
    allowedTasks: 'Drafting',
    dataBoundaries: 'No client data',
    reviewRequired: 'Always',
  }];
  const state = parseToolMatrixState('', fallbackRows);
  assert.equal(state.activeRowId, 'matrix-row-0');
  assert.match(buildToolMatrixSummary(state.rows).copyText, /Review required: Always/);
});

test('agent specification fields reload independently of wizard metadata and recover from malformed state', () => {
  const saved = JSON.stringify({
    'field-0': 'Reconcile bank transactions',
    'field-1': 'Flag exceptions for review',
    currentStep: 1,
    reviewMode: true,
  });
  const fields = parseSpecFormFields(saved, 3);

  assert.deepEqual(fields, {
    'field-0': 'Reconcile bank transactions',
    'field-1': 'Flag exceptions for review',
    'field-2': '',
  });
  assert.match(
    buildAgentSpecCopyText([
      { label: 'Goal', placeholder: '' },
      { label: 'Output', placeholder: '' },
      { label: 'Guardrail', placeholder: '' },
    ], fields),
    /Goal:\nReconcile bank transactions[\s\S]*Guardrail:\n\(not completed\)/,
  );
  assert.deepEqual(parseSpecFormFields('{broken', 2), { 'field-0': '', 'field-1': '' });
});

test('tool matrix save and reload preserves summaries and repairs a stale active row', () => {
  const fallbackRows = [{
    id: 'matrix-row-0',
    toolName: 'Approved assistant',
    allowedTasks: 'Drafting',
    dataBoundaries: 'No client data',
    reviewRequired: 'Always',
  }];
  const reloaded = parseToolMatrixState(JSON.stringify({
    rows: [{
      id: 'custom-row',
      toolName: 'Research assistant',
      allowedTasks: 'Summarise public guidance',
      dataBoundaries: 'Public sources only',
      reviewRequired: 'Before use',
    }],
    activeRowId: 'deleted-row',
    'question-0': 'derived summary data',
  }), fallbackRows);

  assert.equal(reloaded.activeRowId, 'custom-row');
  assert.match(
    buildToolMatrixSummary(reloaded.rows).copyText,
    /Research assistant[\s\S]*Data boundaries: Public sources only[\s\S]*Review required: Before use/,
  );
  assert.deepEqual(parseToolMatrixState('{broken', fallbackRows), {
    rows: fallbackRows,
    activeRowId: 'matrix-row-0',
  });
});

test('glossary models sort terms and reject unrelated saved state', () => {
  const terms = buildGlossaryTerms([{
    type: 'numbered-list',
    items: [
      { title: 'Workflow', desc: 'Steps.' },
      { title: 'Agent', desc: 'Acts toward a goal.' },
    ],
  }]);

  assert.deepEqual(terms.map((term) => term.term), ['Agent', 'Workflow']);
  assert.equal(parseGlossaryPageState('{"question-0":"legacy"}').mode, 'lab');
  assert.equal(parseGlossaryPageState('{"mode":"flashcards"}').mode, 'flashcards');
});

test('template line cleaning supports normal and legacy-encoded bullets', () => {
  assert.equal(cleanTemplateLine('• Standard bullet'), 'Standard bullet');
  assert.equal(cleanTemplateLine('☐ Checklist item'), 'Checklist item');
  assert.equal(cleanTemplateLine('â€¢ Legacy bullet'), 'Legacy bullet');
  assert.equal(cleanTemplateLine('Ã¢â‚¬Â¢ Double-encoded bullet'), 'Double-encoded bullet');
});
