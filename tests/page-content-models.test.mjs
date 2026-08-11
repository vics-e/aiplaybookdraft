import assert from 'node:assert/strict';
import test from 'node:test';

import {
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
