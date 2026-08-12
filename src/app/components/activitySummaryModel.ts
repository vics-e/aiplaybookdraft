import type { PlaybookPage } from '../data/playbookData';

export interface ActivitySummaryActivity {
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

export function isInternalSummaryKey(key: string) {
  return INTERNAL_SUMMARY_KEYS.has(key);
}

export function tryParseResponse(response: string): unknown {
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

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normaliseText(value: string) {
  return value.replace(/\r\n/g, '\n').trim();
}

export function hasMeaningfulValue(value: unknown): boolean {
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
      if (isInternalSummaryKey(key)) {
        return false;
      }

      return hasMeaningfulValue(entryValue);
    });
  }

  return false;
}

export function collectActivitySummaryActivities(
  pages: PlaybookPage[],
  pageInputs: Record<string, string>,
): ActivitySummaryActivity[] {
  return pages
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
}

export function calculateActivitySummaryCompletion(activities: ActivitySummaryActivity[]) {
  const completedCount = activities.filter((activity) => (
    hasMeaningfulValue(tryParseResponse(activity.response))
  )).length;
  const totalCount = activities.length;

  return {
    completedCount,
    totalCount,
    completionPercentage: Math.round((completedCount / totalCount) * 100),
  };
}

export function buildActivitySummaryEdit(
  activity: Pick<ActivitySummaryActivity, 'id' | 'type'>,
  editValue: string,
  editListValues: Record<string, string>,
) {
  const structured = activity.type === 'numbered-list'
    || activity.type === 'list'
    || activity.type === 'multi-question';

  return {
    pageId: activity.id,
    value: structured ? JSON.stringify(editListValues) : editValue,
  };
}
