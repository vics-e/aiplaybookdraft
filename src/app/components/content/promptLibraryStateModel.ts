export interface PromptLibraryState {
  searchQuery: string;
  expandedPromptIds: string[];
  promptValues: Record<string, Record<string, string>>;
  activityAnswers: Record<string, string>;
  activityCompleted: string[];
}

export const DEFAULT_PROMPT_LIBRARY_STATE: PromptLibraryState = {
  searchQuery: '',
  expandedPromptIds: [],
  promptValues: {},
  activityAnswers: {},
  activityCompleted: [],
};

export function parsePromptLibraryState(userInput: string) {
  if (!userInput || userInput === '') {
    return DEFAULT_PROMPT_LIBRARY_STATE;
  }

  try {
    const parsed = JSON.parse(userInput) as Record<string, unknown>;
    const hasPromptLibraryShape =
      typeof parsed.searchQuery === 'string' ||
      Array.isArray(parsed.expandedPromptIds) ||
      (parsed.promptValues && typeof parsed.promptValues === 'object') ||
      (parsed.activityAnswers && typeof parsed.activityAnswers === 'object') ||
      Array.isArray(parsed.activityCompleted);

    if (!hasPromptLibraryShape) {
      const legacyActivityAnswers = Object.entries(parsed).reduce<Record<string, string>>((acc, [key, value]) => {
        if (key.startsWith('question-') && typeof value === 'string') {
          acc[key] = value;
        }
        return acc;
      }, {});

      return {
        ...DEFAULT_PROMPT_LIBRARY_STATE,
        activityAnswers: legacyActivityAnswers,
      };
    }

    const promptValues = parsed.promptValues && typeof parsed.promptValues === 'object' && !Array.isArray(parsed.promptValues)
      ? Object.entries(parsed.promptValues as Record<string, unknown>).reduce<Record<string, Record<string, string>>>((acc, [promptId, values]) => {
          if (values && typeof values === 'object' && !Array.isArray(values)) {
            acc[promptId] = Object.entries(values as Record<string, unknown>).reduce<Record<string, string>>((valueAcc, [variableId, variableValue]) => {
              if (typeof variableValue === 'string') {
                valueAcc[variableId] = variableValue;
              }
              return valueAcc;
            }, {});
          }
          return acc;
        }, {})
      : {};

    const activityAnswers = parsed.activityAnswers && typeof parsed.activityAnswers === 'object' && !Array.isArray(parsed.activityAnswers)
      ? Object.entries(parsed.activityAnswers as Record<string, unknown>).reduce<Record<string, string>>((acc, [key, value]) => {
          if (typeof value === 'string') {
            acc[key] = value;
          }
          return acc;
        }, {})
      : {};

    return {
      searchQuery: typeof parsed.searchQuery === 'string' ? parsed.searchQuery : '',
      expandedPromptIds: Array.isArray(parsed.expandedPromptIds)
        ? parsed.expandedPromptIds.filter((value): value is string => typeof value === 'string')
        : [],
      promptValues,
      activityAnswers,
      activityCompleted: Array.isArray(parsed.activityCompleted)
        ? parsed.activityCompleted.filter((value): value is string => typeof value === 'string')
        : [],
    };
  } catch {
    return DEFAULT_PROMPT_LIBRARY_STATE;
  }
}
