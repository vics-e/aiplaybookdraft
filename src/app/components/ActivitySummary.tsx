import { motion } from 'motion/react';
import { Download, ClipboardList, CheckCircle, Calendar, Edit3, Save, X } from 'lucide-react';
import { useState } from 'react';
import { playbook } from '../data/playbookData';

interface ActivitySummaryProps {
  pageInputs: Record<string, string>;
  onInputChange?: (pageId: string, value: string) => void;
}

interface ActivitySummaryActivity {
  id: string;
  section: string;
  title: string;
  prompt: string;
  type: string;
  listCount?: number;
  placeholderPrefix?: string;
  questions?: string[];
  specFields?: { label: string; placeholder: string; helper?: string }[];
  checkboxTasks?: { label: string; criteria: string[] }[];
  dropdownOptions?: string[];
  gapSentence?: string;
  taskCount?: number;
  response: string;
  activityNumber: number;
}

interface QuestionBlock {
  label: string;
  answer?: string;
  items: string[];
}

const INTERNAL_SUMMARY_KEYS = new Set([
  'id',
  'searchQuery',
  'expandedPromptIds',
  'activityCompleted',
  'currentStep',
  'reviewMode',
  'scoringIndex',
  'activeRowId',
  'draftName',
  'mode',
  'selectedTerm',
  'currentFlashcardIndex',
  'learnedTerms',
  'flippedTerms',
]);

const ITEM_KEY_PATTERN = /^item-(\d+)$/;
const QUESTION_KEY_PATTERN = /^question-(\d+)$/;
const QUESTION_ITEM_KEY_PATTERN = /^question-(\d+)-item-(\d+)$/;
const FIELD_KEY_PATTERN = /^field-(\d+)$/;
const GAP_KEY_PATTERN = /^gap-(\d+)$/;
const TASK_KEY_PATTERN = /^task-(\d+)$/;

function tryParseResponse(response: string): unknown {
  const trimmed = response.trim();
  if (!trimmed) {
    return '';
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    return response;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normaliseText(value: string) {
  return value.replace(/\r\n/g, '\n').trim();
}

function toDisplayText(value: unknown) {
  if (typeof value === 'string') {
    return normaliseText(value);
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : '';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return '';
}

function titleCaseWord(word: string) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

function humanizeKey(key: string) {
  const keyMap: Record<string, string> = {
    'workflow-name': 'Workflow name',
    promptValues: 'Saved prompt drafts',
    activityAnswers: 'Activity answers',
    selectedWorkflowIds: 'Priority workflows',
    allowedTasks: 'Allowed tasks',
    dataBoundaries: 'Data boundaries',
    reviewRequired: 'Review required',
    topCandidate: 'Top candidate for agent automation',
  };

  if (keyMap[key]) {
    return keyMap[key];
  }

  if (QUESTION_KEY_PATTERN.test(key)) {
    const index = Number(key.replace('question-', ''));
    return `Question ${index + 1}`;
  }

  if (FIELD_KEY_PATTERN.test(key)) {
    const index = Number(key.replace('field-', ''));
    return `Field ${index + 1}`;
  }

  if (ITEM_KEY_PATTERN.test(key)) {
    const index = Number(key.replace('item-', ''));
    return `Item ${index + 1}`;
  }

  if (GAP_KEY_PATTERN.test(key)) {
    const index = Number(key.replace('gap-', ''));
    return `Gap ${index + 1}`;
  }

  if (TASK_KEY_PATTERN.test(key)) {
    const index = Number(key.replace('task-', ''));
    return `Task ${index + 1}`;
  }

  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => titleCaseWord(part))
    .join(' ');
}

function sortKeysByTrailingNumber(keys: string[]) {
  return [...keys].sort((left, right) => {
    const leftMatch = left.match(/(\d+)(?!.*\d)/);
    const rightMatch = right.match(/(\d+)(?!.*\d)/);

    if (!leftMatch || !rightMatch) {
      return left.localeCompare(right);
    }

    return Number(leftMatch[1]) - Number(rightMatch[1]);
  });
}

function hasMeaningfulValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    const trimmed = normaliseText(value);
    return trimmed !== '' && trimmed !== '{}' && trimmed !== '[]' && trimmed !== 'null';
  }

  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.some((item) => hasMeaningfulValue(item));
  }

  if (isPlainObject(value)) {
    return Object.entries(value).some(([key, entryValue]) => {
      if (INTERNAL_SUMMARY_KEYS.has(key)) {
        return false;
      }

      return hasMeaningfulValue(entryValue);
    });
  }

  return false;
}

function getWorkflowCategory(repeatability: unknown, judgement: unknown) {
  const repeatScore = typeof repeatability === 'number' && Number.isFinite(repeatability) ? repeatability : 0;
  const judgementScore = typeof judgement === 'number' && Number.isFinite(judgement) ? judgement : 0;

  if (repeatScore >= 4 && judgementScore <= 2) {
    return 'Strong agent candidate';
  }

  if (repeatScore >= 3 && judgementScore >= 3) {
    return 'Human-led with assistant support';
  }

  if (repeatScore <= 3 && judgementScore <= 3) {
    return 'Assistant task';
  }

  return 'Fully human-led';
}

function renderInlineText(text: string, key: string) {
  return (
    <p key={key} className="summary-response-text text-white/90 text-sm font-medium leading-relaxed whitespace-pre-wrap">
      {text}
    </p>
  );
}

function renderBulletList(items: string[], key: string) {
  return (
    <ul key={key} className="summary-bullet-list space-y-2">
      {items.map((item, index) => (
        <li key={`${key}-${index}`} className="flex items-start gap-3">
          <span className="summary-bullet mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00DC51]" />
          <span className="summary-response-text flex-1 text-white/90 text-sm font-medium leading-relaxed whitespace-pre-wrap">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function renderLabelledRows(
  entries: Array<{ label: string; value: unknown }>,
  activity: ActivitySummaryActivity,
  keyPrefix: string,
) {
  const meaningfulEntries = entries.filter((entry) => hasMeaningfulValue(entry.value));

  if (meaningfulEntries.length === 0) {
    return null;
  }

  return (
    <div key={keyPrefix} className="summary-block space-y-2.5">
      {meaningfulEntries.map((entry, index) => (
        <div
          key={`${keyPrefix}-${index}`}
          className="summary-kv-row rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
        >
          <p className="summary-kv-label text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
            {entry.label}
          </p>
          <div className="mt-1.5">
            {renderUnknownValue(entry.value, activity, `${keyPrefix}-${index}`)}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderObjectCards(
  items: Record<string, unknown>[],
  activity: ActivitySummaryActivity,
  keyPrefix: string,
  labelPrefix: string,
) {
  const meaningfulItems = items.filter((item) => hasMeaningfulValue(item));

  if (meaningfulItems.length === 0) {
    return null;
  }

  return (
    <div key={keyPrefix} className="summary-block space-y-3">
      {meaningfulItems.map((item, index) => {
        const title =
          toDisplayText(item.label) ||
          toDisplayText(item.title) ||
          toDisplayText(item.name) ||
          toDisplayText(item.toolName) ||
          `${labelPrefix} ${index + 1}`;

        const details = Object.entries(item).filter(([entryKey, entryValue]) => {
          if (entryKey === 'id' || entryKey === 'label' || entryKey === 'title' || entryKey === 'name' || entryKey === 'toolName') {
            return false;
          }

          return hasMeaningfulValue(entryValue);
        });

        return (
          <div
            key={`${keyPrefix}-${index}`}
            className="summary-group-card rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
          >
            <p className="summary-group-title text-sm font-bold text-white">{title}</p>
            {details.length > 0 && (
              <div className="mt-3 space-y-2">
                {details.map(([entryKey, entryValue]) => (
                  <div key={entryKey} className="summary-kv-row rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    <p className="summary-kv-label text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
                      {humanizeKey(entryKey)}
                    </p>
                    <div className="mt-1.5">
                      {renderUnknownValue(entryValue, activity, `${keyPrefix}-${index}-${entryKey}`)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getQuestionBlocks(record: Record<string, unknown>, activity: ActivitySummaryActivity) {
  const source = isPlainObject(record.activityAnswers) ? record.activityAnswers as Record<string, unknown> : record;
  const questionIndexes = new Set<number>();

  if (activity.questions) {
    activity.questions.forEach((_, index) => questionIndexes.add(index));
  }

  Object.keys(source).forEach((key) => {
    const questionMatch = key.match(QUESTION_KEY_PATTERN);
    if (questionMatch) {
      questionIndexes.add(Number(questionMatch[1]));
    }

    const questionItemMatch = key.match(QUESTION_ITEM_KEY_PATTERN);
    if (questionItemMatch) {
      questionIndexes.add(Number(questionItemMatch[1]));
    }
  });

  const sortedIndexes = [...questionIndexes].sort((left, right) => left - right);
  const blocks: QuestionBlock[] = [];
  const consumedKeys = new Set<string>();

  sortedIndexes.forEach((index) => {
    const questionKey = `question-${index}`;
    const answer = toDisplayText(source[questionKey]);
    const itemKeys = sortKeysByTrailingNumber(
      Object.keys(source).filter((key) => key.startsWith(`${questionKey}-item-`))
    );
    const items = itemKeys
      .map((key) => toDisplayText(source[key]))
      .filter(Boolean);

    if (!answer && items.length === 0) {
      return;
    }

    blocks.push({
      label: activity.questions?.[index] || humanizeKey(questionKey),
      answer: answer || undefined,
      items,
    });

    consumedKeys.add(questionKey);
    itemKeys.forEach((key) => consumedKeys.add(key));
  });

  if (source !== record) {
    consumedKeys.add('activityAnswers');
  }

  return { blocks, consumedKeys };
}

function getFieldEntries(record: Record<string, unknown>, activity: ActivitySummaryActivity) {
  const fieldKeys = sortKeysByTrailingNumber(
    Object.keys(record).filter((key) => FIELD_KEY_PATTERN.test(key))
  );

  const entries = fieldKeys
    .map((key) => {
      const index = Number(key.replace('field-', ''));
      const label = activity.specFields?.[index]?.label || humanizeKey(key);
      return { label, value: record[key] };
    })
    .filter((entry) => hasMeaningfulValue(entry.value));

  return { entries, consumedKeys: new Set(fieldKeys) };
}

function getRemainingEntries(record: Record<string, unknown>, consumedKeys: Set<string>) {
  return Object.entries(record).filter(([key, value]) => {
    if (consumedKeys.has(key) || INTERNAL_SUMMARY_KEYS.has(key)) {
      return false;
    }

    return hasMeaningfulValue(value);
  });
}

function renderWorkflowSummary(
  record: Record<string, unknown>,
  activity: ActivitySummaryActivity,
  keyPrefix: string,
) {
  if (!Array.isArray(record.workflows)) {
    return { element: null, consumedKeys: new Set<string>() };
  }

  const workflows = record.workflows.filter(isPlainObject);
  if (workflows.length === 0) {
    return { element: null, consumedKeys: new Set<string>() };
  }

  const selectedWorkflowIds = Array.isArray(record.selectedWorkflowIds)
    ? record.selectedWorkflowIds.filter((value): value is string => typeof value === 'string')
    : [];

  const selectedNames = workflows
    .filter((workflow) => selectedWorkflowIds.includes(String(workflow.id ?? '')))
    .map((workflow) => toDisplayText(workflow.name))
    .filter(Boolean);

  const element = (
    <div key={keyPrefix} className="summary-block space-y-3">
      {selectedNames.length > 0 && (
        <div className="summary-kv-row rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
          <p className="summary-kv-label text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
            Priority workflows
          </p>
          <div className="mt-1.5">
            {renderBulletList(selectedNames, `${keyPrefix}-selected`)}
          </div>
        </div>
      )}

      {workflows.map((workflow, index) => {
        const workflowName = toDisplayText(workflow.name) || `Workflow ${index + 1}`;
        const repeatability = toDisplayText(workflow.repeatability);
        const judgement = toDisplayText(workflow.judgement);
        const isPriority = selectedWorkflowIds.includes(String(workflow.id ?? ''));

        return (
          <div
            key={`${keyPrefix}-${index}`}
            className="summary-group-card rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="summary-group-title text-sm font-bold text-white">{workflowName}</p>
              {isPriority && (
                <span className="summary-inline-chip rounded-full border border-[#00DC51]/35 bg-[#00DC51]/10 px-2 py-0.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#00DC51]">
                  Priority
                </span>
              )}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div className="summary-kv-row rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <p className="summary-kv-label text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
                  Repeatability
                </p>
                {renderInlineText(repeatability ? `${repeatability}/5` : 'Not completed', `${keyPrefix}-${index}-repeatability`)}
              </div>
              <div className="summary-kv-row rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <p className="summary-kv-label text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
                  Judgement
                </p>
                {renderInlineText(judgement ? `${judgement}/5` : 'Not completed', `${keyPrefix}-${index}-judgement`)}
              </div>
              <div className="summary-kv-row rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <p className="summary-kv-label text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
                  Category
                </p>
                {renderInlineText(
                  getWorkflowCategory(workflow.repeatability, workflow.judgement),
                  `${keyPrefix}-${index}-category`
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return {
    element,
    consumedKeys: new Set([
      'workflows',
      'selectedWorkflowIds',
      'draftName',
      'currentStep',
      'scoringIndex',
      'question-0',
      'question-1',
      'question-2',
    ]),
  };
}

function renderRowsSummary(
  record: Record<string, unknown>,
  activity: ActivitySummaryActivity,
  keyPrefix: string,
) {
  const arrayKey = ['rows', 'items', 'fields'].find((key) => Array.isArray(record[key]));
  if (!arrayKey) {
    return { element: null, consumedKeys: new Set<string>() };
  }

  const rawItems = (record[arrayKey] as unknown[]).filter((item) => hasMeaningfulValue(item));
  if (rawItems.length === 0) {
    return { element: null, consumedKeys: new Set<string>() };
  }

  const primitiveItems = rawItems
    .map((item) => toDisplayText(item))
    .filter(Boolean);

  const objectItems = rawItems.filter(isPlainObject);

  const element = primitiveItems.length === rawItems.length
    ? renderBulletList(primitiveItems, `${keyPrefix}-${arrayKey}`)
    : renderObjectCards(objectItems, activity, `${keyPrefix}-${arrayKey}`, humanizeKey(arrayKey).replace(/s$/, ''));

  return {
    element,
    consumedKeys: new Set([arrayKey, 'activeRowId', 'question-0', 'question-1', 'question-2']),
  };
}

function renderTaskSummary(
  record: Record<string, unknown>,
  activity: ActivitySummaryActivity,
  keyPrefix: string,
) {
  const taskKeys = sortKeysByTrailingNumber(
    Object.keys(record).filter((key) => TASK_KEY_PATTERN.test(key))
  );

  if (taskKeys.length === 0) {
    return { element: null, consumedKeys: new Set<string>() };
  }

  const workflowName = toDisplayText(record['workflow-name']);
  const taskCards = taskKeys
    .map((taskKey, index) => {
      const taskValue = record[taskKey];
      if (!isPlainObject(taskValue)) {
        if (!hasMeaningfulValue(taskValue)) {
          return null;
        }

        return (
          <div
            key={`${keyPrefix}-${taskKey}`}
            className="summary-group-card rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
          >
            <p className="summary-group-title text-sm font-bold text-white">
              {activity.checkboxTasks?.[index]?.label || humanizeKey(taskKey)}
            </p>
            <div className="mt-3">{renderUnknownValue(taskValue, activity, `${keyPrefix}-${taskKey}`)}</div>
          </div>
        );
      }

      const title =
        toDisplayText(taskValue.label) ||
        activity.checkboxTasks?.[index]?.label ||
        humanizeKey(taskKey);

      const rows: Array<{ label: string; value: unknown }> = [];

      if (Array.isArray(taskValue.checks) && taskValue.checks.some((check) => hasMeaningfulValue(check))) {
        rows.push({ label: 'Checks completed', value: taskValue.checks });
      }

      if (hasMeaningfulValue(taskValue.classification)) {
        const classificationValue =
          taskValue.classification === 'ai-ready'
            ? 'AI-ready workflow'
            : taskValue.classification === 'human-led'
            ? 'Human-led with AI support'
            : taskValue.classification;

        rows.push({ label: 'Classification', value: classificationValue });
      }

      if (taskValue.topCandidate === true) {
        rows.push({ label: 'Top candidate for agent automation', value: 'Yes' });
      }

      Object.entries(taskValue).forEach(([entryKey, entryValue]) => {
        if (entryKey === 'label' || entryKey === 'checks' || entryKey === 'classification' || entryKey === 'topCandidate' || entryKey === 'id') {
          return;
        }

        if (hasMeaningfulValue(entryValue)) {
          rows.push({ label: humanizeKey(entryKey), value: entryValue });
        }
      });

      if (!title && rows.length === 0) {
        return null;
      }

      return (
        <div
          key={`${keyPrefix}-${taskKey}`}
          className="summary-group-card rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
        >
          <p className="summary-group-title text-sm font-bold text-white">{title || `Task ${index + 1}`}</p>
          {rows.length > 0 && <div className="mt-3">{renderLabelledRows(rows, activity, `${keyPrefix}-${taskKey}`)}</div>}
        </div>
      );
    })
    .filter(Boolean);

  const element = (
    <div key={keyPrefix} className="summary-block space-y-3">
      {workflowName && (
        <div className="summary-kv-row rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
          <p className="summary-kv-label text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
            Workflow name
          </p>
          <div className="mt-1.5">{renderInlineText(workflowName, `${keyPrefix}-workflow-name`)}</div>
        </div>
      )}
      {taskCards}
    </div>
  );

  const consumedKeys = new Set<string>(['workflow-name']);
  taskKeys.forEach((key) => consumedKeys.add(key));

  return { element, consumedKeys };
}

function renderFilledSentence(
  record: Record<string, unknown>,
  activity: ActivitySummaryActivity,
  keyPrefix: string,
) {
  if (!activity.gapSentence) {
    return { element: null, consumedKeys: new Set<string>() };
  }

  const gapKeys = sortKeysByTrailingNumber(
    Object.keys(record).filter((key) => GAP_KEY_PATTERN.test(key))
  );

  if (gapKeys.length === 0 || !gapKeys.some((key) => hasMeaningfulValue(record[key]))) {
    return { element: null, consumedKeys: new Set<string>() };
  }

  const parts = activity.gapSentence.split('___');
  const element = (
    <div key={keyPrefix} className="summary-kv-row rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
      <p className="summary-kv-label text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
        Completed sentence
      </p>
      <p className="summary-response-text mt-2 text-white/90 text-sm font-medium leading-relaxed whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (index === parts.length - 1) {
            return <span key={`${keyPrefix}-part-${index}`}>{part}</span>;
          }

          const gapValue = toDisplayText(record[`gap-${index}`]) || 'Not completed';

          return (
            <span key={`${keyPrefix}-part-${index}`}>
              {part}
              <span className="summary-inline-chip mx-1 inline-block rounded-md border border-[#00DC51]/35 bg-[#00DC51]/10 px-2 py-0.5 font-semibold text-white">
                {gapValue}
              </span>
            </span>
          );
        })}
      </p>
    </div>
  );

  return { element, consumedKeys: new Set(gapKeys) };
}

function renderStructuredObject(record: Record<string, unknown>, activity: ActivitySummaryActivity, keyPrefix: string) {
  const blocks: JSX.Element[] = [];
  const consumedKeys = new Set<string>();

  const workflowSummary = renderWorkflowSummary(record, activity, `${keyPrefix}-workflows`);
  if (workflowSummary.element) {
    blocks.push(workflowSummary.element);
    workflowSummary.consumedKeys.forEach((key) => consumedKeys.add(key));
  }

  const rowsSummary = renderRowsSummary(record, activity, `${keyPrefix}-rows`);
  if (rowsSummary.element) {
    blocks.push(rowsSummary.element);
    rowsSummary.consumedKeys.forEach((key) => consumedKeys.add(key));
  }

  const taskSummary = renderTaskSummary(record, activity, `${keyPrefix}-tasks`);
  if (taskSummary.element) {
    blocks.push(taskSummary.element);
    taskSummary.consumedKeys.forEach((key) => consumedKeys.add(key));
  }

  const fieldEntries = getFieldEntries(record, activity);
  if (fieldEntries.entries.length > 0) {
    blocks.push(renderLabelledRows(fieldEntries.entries, activity, `${keyPrefix}-fields`) as JSX.Element);
    fieldEntries.consumedKeys.forEach((key) => consumedKeys.add(key));
  }

  const filledSentence = renderFilledSentence(record, activity, `${keyPrefix}-sentence`);
  if (filledSentence.element) {
    blocks.push(filledSentence.element);
    filledSentence.consumedKeys.forEach((key) => consumedKeys.add(key));
  }

  const questionBlocks = getQuestionBlocks(record, activity);
  if (questionBlocks.blocks.length > 0) {
    blocks.push(
      <div key={`${keyPrefix}-questions`} className="summary-block space-y-3">
        {questionBlocks.blocks.map((block, index) => (
          <div
            key={`${keyPrefix}-question-${index}`}
            className="summary-group-card rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
          >
            <p className="summary-group-title text-sm font-bold text-white">{block.label}</p>
            <div className="mt-2 space-y-2">
              {block.answer && renderInlineText(block.answer, `${keyPrefix}-question-answer-${index}`)}
              {block.items.length > 0 && renderBulletList(block.items, `${keyPrefix}-question-items-${index}`)}
            </div>
          </div>
        ))}
      </div>
    );
    questionBlocks.consumedKeys.forEach((key) => consumedKeys.add(key));
  }

  const remainingEntries = getRemainingEntries(record, consumedKeys);
  if (remainingEntries.length > 0) {
    blocks.push(
      renderLabelledRows(
        remainingEntries.map(([key, value]) => ({ label: humanizeKey(key), value })),
        activity,
        `${keyPrefix}-remaining`
      ) as JSX.Element
    );
  }

  if (blocks.length === 0) {
    return (
      <span className="summary-empty-state text-white/35 italic text-sm">
        Not completed
      </span>
    );
  }

  return <div className="space-y-3">{blocks}</div>;
}

function renderUnknownValue(value: unknown, activity: ActivitySummaryActivity, keyPrefix: string): JSX.Element {
  if (!hasMeaningfulValue(value)) {
    return (
      <span className="summary-empty-state text-white/35 italic text-sm">
        Not completed
      </span>
    );
  }

  if (typeof value === 'string') {
    return renderInlineText(value, keyPrefix);
  }

  if (typeof value === 'number') {
    return renderInlineText(String(value), keyPrefix);
  }

  if (typeof value === 'boolean') {
    return renderInlineText(value ? 'Yes' : 'No', keyPrefix);
  }

  if (Array.isArray(value)) {
    const primitiveItems = value.map((item) => toDisplayText(item)).filter(Boolean);
    if (primitiveItems.length === value.length) {
      return renderBulletList(primitiveItems, keyPrefix);
    }

    const objectItems = value.filter(isPlainObject);
    const cards = renderObjectCards(objectItems, activity, keyPrefix, 'Item');
    if (cards) {
      return cards;
    }

    return renderBulletList(value.map((item) => {
      if (typeof item === 'string') {
        return item;
      }
      return humanizeKey(String(item));
    }), keyPrefix);
  }

  if (isPlainObject(value)) {
    return renderStructuredObject(value, activity, keyPrefix);
  }

  return renderInlineText(String(value), keyPrefix);
}

function canEditActivity(activity: ActivitySummaryActivity) {
  const trimmedResponse = activity.response.trim();
  if (!trimmedResponse) {
    return false;
  }

  const parsed = tryParseResponse(activity.response);

  if (activity.type === 'text' || activity.type === 'dropdown' || activity.type === 'yes-no') {
    return typeof parsed === 'string';
  }

  if ((activity.type === 'numbered-list' || activity.type === 'list') && isPlainObject(parsed)) {
    const meaningfulKeys = Object.keys(parsed).filter((key) => hasMeaningfulValue(parsed[key]));
    return meaningfulKeys.every((key) => ITEM_KEY_PATTERN.test(key));
  }

  if (activity.type === 'multi-question' && isPlainObject(parsed)) {
    const meaningfulKeys = Object.keys(parsed).filter((key) => hasMeaningfulValue(parsed[key]));
    return meaningfulKeys.every((key) => QUESTION_KEY_PATTERN.test(key));
  }

  return false;
}

export function ActivitySummary({ pageInputs, onInputChange }: ActivitySummaryProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editListValues, setEditListValues] = useState<Record<string, string>>({});

  const activitiesWithResponses: ActivitySummaryActivity[] = playbook
    .filter((page) => page.activity)
    .map((page, index) => ({
      id: page.id,
      section: page.section || 'Introduction',
      title: page.activity!.title,
      prompt: page.activity!.prompt,
      type: page.activity!.type || 'text',
      listCount: page.activity!.listCount,
      placeholderPrefix: page.activity!.placeholderPrefix,
      questions: page.activity!.questions,
      specFields: page.activity!.specFields,
      checkboxTasks: page.activity!.checkboxTasks,
      dropdownOptions: page.activity!.dropdownOptions,
      gapSentence: page.activity!.gapSentence,
      taskCount: page.activity!.taskCount,
      response: pageInputs[page.id] || '',
      activityNumber: index + 1,
    }));

  const completedCount = activitiesWithResponses.filter((activity) => hasMeaningfulValue(tryParseResponse(activity.response))).length;
  const totalCount = activitiesWithResponses.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  const handleEditStart = (activity: ActivitySummaryActivity) => {
    setEditingId(activity.id);

    if (activity.type === 'numbered-list' || activity.type === 'list' || activity.type === 'multi-question') {
      try {
        const parsed = activity.response ? JSON.parse(activity.response) : {};
        setEditListValues(isPlainObject(parsed) ? Object.fromEntries(
          Object.entries(parsed).map(([key, value]) => [key, typeof value === 'string' ? value : ''])
        ) : {});
      } catch {
        setEditListValues({});
      }
      setEditValue('');
      return;
    }

    setEditValue(activity.response);
    setEditListValues({});
  };

  const handleSave = (activity: ActivitySummaryActivity) => {
    if (!onInputChange) {
      return;
    }

    if (activity.type === 'numbered-list' || activity.type === 'list' || activity.type === 'multi-question') {
      onInputChange(activity.id, JSON.stringify(editListValues));
    } else {
      onInputChange(activity.id, editValue);
    }

    setEditingId(null);
    setEditValue('');
    setEditListValues({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
    setEditListValues({});
  };

  const handleDownload = () => {
    window.print();
  };

  const sections = Array.from(new Set(activitiesWithResponses.map((activity) => activity.section)));

  return (
    <div className="activity-summary-page space-y-8">
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-2 bg-[#00DC51]/15 border-2 border-[#00DC51]/40 rounded-full backdrop-blur-sm mb-6"
        >
          <span className="text-[#00DC51] font-bold text-xs tracking-wide uppercase">Activity Summary</span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-[1.05] tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>
          Your AI Journey <span className="relative inline-block">
            <span className="relative z-10">Responses</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#00DC51] -z-10 opacity-30" />
          </span>
        </h2>
        <p className="text-base md:text-lg text-white/70 font-medium leading-relaxed mb-8">
          Review all your activity responses in one place
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="activity-summary-stat bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList className="text-[#00DC51]" size={24} strokeWidth={2.5} />
            <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Total Activities</span>
          </div>
          <p className="text-4xl font-black">{completedCount} / {totalCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="activity-summary-stat bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-[#00DC51]" size={24} strokeWidth={2.5} />
            <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Completion</span>
          </div>
          <p className="text-4xl font-black">{completionPercentage}%</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={handleDownload}
          className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-[#00DC51] text-black font-bold rounded-xl hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/30 hover:shadow-[#00DC51]/50 hover:scale-[1.02] print:hidden"
        >
          <Download size={20} strokeWidth={2.5} />
          <span>Download / Print Summary</span>
        </button>
      </motion.div>

      <div className="space-y-8 print:space-y-6">
        {sections.map((section, sectionIndex) => {
          const sectionActivities = activitiesWithResponses.filter((activity) => activity.section === section);

          return (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <div className="activity-summary-section-header flex items-center gap-3 pb-3 border-b-2 border-[#00DC51]/30">
                <h3 className="text-xl font-black text-[#00DC51]">{section}</h3>
                <div className="h-px flex-1 bg-[#00DC51]/20" />
              </div>

              <div className="space-y-4">
                {sectionActivities.map((activity) => {
                  const editable = canEditActivity(activity);

                  return (
                    <div
                      key={activity.id}
                      className="activity-summary-card bg-white/[0.03] border-2 border-white/10 rounded-xl p-5 print:break-inside-avoid print:border-black/20"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 bg-[#00DC51] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00DC51]/30 print:shadow-none">
                          <span className="text-black font-black text-sm">{activity.activityNumber}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-base mb-1.5">{activity.title}</h4>
                          <p className="text-xs text-white/60 font-medium leading-relaxed print:text-black/60">{activity.prompt}</p>
                        </div>
                      </div>

                      <div className="activity-summary-response-shell pl-14 print:pl-0 print:ml-14 print:border-l-2 print:border-[#00DC51] print:pl-4">
                        <div className="text-xs font-black text-[#00DC51] uppercase tracking-wider mb-2">Your Response</div>
                        {editingId === activity.id ? (
                          <div className="space-y-2">
                            {activity.type === 'multi-question' && activity.questions ? (
                              <div className="space-y-4">
                                {activity.questions.map((question, index) => (
                                  <div key={index} className="space-y-2">
                                    <label className="text-xs font-bold text-white/90 block">
                                      {index + 1}. {question}
                                    </label>
                                    <textarea
                                      value={editListValues[`question-${index}`] || ''}
                                      onChange={(event) => setEditListValues((current) => ({ ...current, [`question-${index}`]: event.target.value }))}
                                      className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg p-3 text-sm font-medium leading-relaxed text-white placeholder-white/40 focus:outline-none resize-none min-h-[80px]"
                                      placeholder="Type your answer here..."
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (activity.type === 'numbered-list' || activity.type === 'list') && activity.listCount ? (
                              <div className="space-y-2">
                                {Array.from({ length: activity.listCount }).map((_, index) => (
                                  <div key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-xs">
                                      {index + 1}
                                    </div>
                                    <input
                                      type="text"
                                      value={editListValues[`item-${index}`] || ''}
                                      onChange={(event) => setEditListValues((current) => ({ ...current, [`item-${index}`]: event.target.value }))}
                                      className="w-full h-10 bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg p-3 text-sm font-medium leading-relaxed text-white placeholder-white/40 focus:outline-none"
                                      placeholder={`${activity.placeholderPrefix || 'Item'} ${index + 1}...`}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <textarea
                                value={editValue}
                                onChange={(event) => setEditValue(event.target.value)}
                                className="w-full h-32 bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg p-3 text-sm font-medium leading-relaxed text-white placeholder-white/40 focus:outline-none resize-none"
                                placeholder="Type your answer here..."
                              />
                            )}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleSave(activity)}
                                className="group flex items-center gap-2 px-4 py-2 bg-[#00DC51] text-black font-bold rounded-lg hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/30 hover:shadow-[#00DC51]/50 hover:scale-105"
                              >
                                <Save size={16} strokeWidth={2.5} />
                                <span>Save</span>
                              </button>
                              <button
                                onClick={handleCancel}
                                className="group flex items-center gap-2 px-4 py-2 bg-white/10 border-2 border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
                              >
                                <X size={16} strokeWidth={2.5} />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3 print:space-y-2">
                            {renderUnknownValue(tryParseResponse(activity.response), activity, `activity-${activity.id}`)}
                            {editable && (
                              <button
                                onClick={() => handleEditStart(activity)}
                                className="group flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/20 text-white/70 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-all text-xs print:hidden"
                              >
                                <Edit3 size={14} strokeWidth={2.5} />
                                <span>Edit Response</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="hidden print:block mt-12 pt-6 border-t-2 border-black/20">
        <div className="flex items-center justify-between text-xs text-black/60">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="font-bold">The AI Playbook for Accountants & Bookkeepers</div>
        </div>
      </div>
    </div>
  );
}
