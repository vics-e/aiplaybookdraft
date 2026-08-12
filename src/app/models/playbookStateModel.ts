export const PLAYBOOK_STORAGE_KEY = 'sage-ai-playbook-progress';

export interface PersistedPlaybookState {
  currentPage?: unknown;
  userInputs?: unknown;
  visitedPages?: unknown;
}

export interface PlaybookState {
  currentPage: number;
  userInputs: Record<string, string>;
  visitedPages: Set<number>;
}

export interface PlaybookStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function createDefaultPlaybookState(): PlaybookState {
  return {
    currentPage: 0,
    userInputs: {},
    visitedPages: new Set<number>([0]),
  };
}

export function getValidatedCurrentPage(value: unknown, totalPages: number) {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value < totalPages
    ? value
    : 0;
}

export function getValidatedUserInputs(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value as Record<string, unknown>).reduce<Record<string, string>>((answers, [key, answer]) => {
    if (typeof answer === 'string') {
      answers[key] = answer;
    }
    return answers;
  }, {});
}

export function getValidatedVisitedPages(value: unknown, totalPages: number, currentPage: number) {
  if (!Array.isArray(value)) {
    return new Set<number>([0, currentPage]);
  }

  const validPages = value.filter(
    (page): page is number => typeof page === 'number' && Number.isInteger(page) && page >= 0 && page < totalPages,
  );

  return new Set<number>([...validPages, 0, currentPage]);
}

export function hydratePlaybookState(serializedState: string | null, totalPages: number): PlaybookState {
  if (!serializedState) {
    return createDefaultPlaybookState();
  }

  try {
    const parsed = JSON.parse(serializedState) as PersistedPlaybookState | null;
    const currentPage = getValidatedCurrentPage(parsed?.currentPage, totalPages);

    return {
      currentPage,
      userInputs: getValidatedUserInputs(parsed?.userInputs),
      visitedPages: getValidatedVisitedPages(parsed?.visitedPages, totalPages, currentPage),
    };
  } catch {
    return createDefaultPlaybookState();
  }
}

export function loadPlaybookState(storage: PlaybookStorage | null, totalPages: number): PlaybookState {
  if (!storage) {
    return createDefaultPlaybookState();
  }

  try {
    return hydratePlaybookState(storage.getItem(PLAYBOOK_STORAGE_KEY), totalPages);
  } catch {
    return createDefaultPlaybookState();
  }
}

export function serializePlaybookState(state: PlaybookState) {
  return JSON.stringify({
    currentPage: state.currentPage,
    userInputs: state.userInputs,
    visitedPages: Array.from(state.visitedPages),
  });
}

export function savePlaybookState(storage: PlaybookStorage | null, state: PlaybookState) {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(PLAYBOOK_STORAGE_KEY, serializePlaybookState(state));
    return true;
  } catch {
    return false;
  }
}

export function addVisitedPage(visitedPages: ReadonlySet<number>, page: number) {
  return new Set<number>([...visitedPages, page]);
}

export function getVisitedPageProgress(visitedPages: ReadonlySet<number>, totalPages: number) {
  return totalPages > 0 ? (visitedPages.size / totalPages) * 100 : 0;
}

export function getSectionVisitProgress(pageIndices: readonly number[], visitedPages: ReadonlySet<number>) {
  if (pageIndices.length === 0) {
    return 0;
  }

  const visitedCount = pageIndices.filter(page => visitedPages.has(page)).length;
  return (visitedCount / pageIndices.length) * 100;
}
