import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildActivitySummaryEdit,
  calculateActivitySummaryCompletion,
  collectActivitySummaryActivities,
  hasMeaningfulValue,
  tryParseResponse,
} from '../src/app/components/activitySummaryModel.ts';

const pages = [
  {
    id: 'ordinary-page',
    type: 'content',
    section: 'Section 1',
    title: 'Ordinary activity page',
    content: [],
    activity: {
      title: 'Ordinary response',
      prompt: 'Write a response',
      type: 'text',
    },
  },
  {
    id: 'specialist-spec-page',
    type: 'content',
    section: 'Section 3',
    title: 'Specialist activity page',
    content: [],
    activity: {
      title: 'Agent specification',
      prompt: 'Complete the specialist fields',
      type: 'spec-form',
      specFields: [{ label: 'Goal', placeholder: 'Describe the goal' }],
    },
  },
  {
    id: 'specialist-task-page',
    type: 'content',
    title: 'Specialist task page',
    content: [],
    activity: {
      title: 'Classify tasks',
      prompt: 'Classify each specialist task',
      type: 'checkbox-tasks',
      checkboxTasks: [{ label: 'Reconcile', criteria: ['Repeatable'] }],
    },
  },
  {
    id: 'non-activity-page',
    type: 'content',
    title: 'Reading only',
    content: [],
  },
];

test('empty and internal-only saved state remain incomplete', () => {
  const activities = collectActivitySummaryActivities(pages, {
    'ordinary-page': '',
    'specialist-spec-page': JSON.stringify({
      id: 'draft-1',
      currentStep: 2,
      activityCompleted: true,
      reviewMode: false,
    }),
  });

  assert.equal(hasMeaningfulValue(tryParseResponse('')), false);
  assert.deepEqual(calculateActivitySummaryCompletion(activities), {
    completedCount: 0,
    totalCount: 3,
    completionPercentage: 0,
  });
});

test('nested meaningful answers complete an activity', () => {
  const response = JSON.stringify({
    activityAnswers: {
      'question-0': '',
      'question-1': { notes: ['  ', 'Use human review'] },
    },
    currentStep: 3,
  });

  assert.equal(hasMeaningfulValue(tryParseResponse(response)), true);
});

test('activity collection includes specialist responses and preserves their metadata', () => {
  const activities = collectActivitySummaryActivities(pages, {
    'specialist-spec-page': '{"field-0":"Reduce rework"}',
    'specialist-task-page': '{"task-0":{"classification":"ai-ready"}}',
  });

  assert.deepEqual(activities.map(({ id, type, response, section, activityNumber }) => ({
    id,
    type,
    response,
    section,
    activityNumber,
  })), [
    {
      id: 'ordinary-page',
      type: 'text',
      response: '',
      section: 'Section 1',
      activityNumber: 1,
    },
    {
      id: 'specialist-spec-page',
      type: 'spec-form',
      response: '{"field-0":"Reduce rework"}',
      section: 'Section 3',
      activityNumber: 2,
    },
    {
      id: 'specialist-task-page',
      type: 'checkbox-tasks',
      response: '{"task-0":{"classification":"ai-ready"}}',
      section: 'Introduction',
      activityNumber: 3,
    },
  ]);
});

test('completion percentage is rounded from all collected activities', () => {
  const activities = collectActivitySummaryActivities(pages, {
    'ordinary-page': 'Reviewed',
    'specialist-spec-page': '{"field-0":"Reduce rework"}',
  });

  assert.deepEqual(calculateActivitySummaryCompletion(activities), {
    completedCount: 2,
    totalCount: 3,
    completionPercentage: 67,
  });
});

test('edited values are mapped back to the activity page ID', () => {
  const activities = collectActivitySummaryActivities(pages, {});
  const ordinaryActivity = activities.find(({ id }) => id === 'ordinary-page');
  const structuredActivity = {
    ...activities.find(({ id }) => id === 'specialist-spec-page'),
    type: 'multi-question',
  };

  assert.deepEqual(buildActivitySummaryEdit(ordinaryActivity, 'Edited response', {}), {
    pageId: 'ordinary-page',
    value: 'Edited response',
  });
  assert.deepEqual(buildActivitySummaryEdit(structuredActivity, '', { 'question-0': 'Edited answer' }), {
    pageId: 'specialist-spec-page',
    value: '{"question-0":"Edited answer"}',
  });
});
