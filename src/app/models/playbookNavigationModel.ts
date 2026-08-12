export interface SectionOpenerNavigationEntry<OpenerId extends string = string> {
  openerId: OpenerId;
  startPageIndex: number;
  sectionName?: string;
}

export type ExperienceDestination<OpenerId extends string = string> =
  | { kind: 'page'; page: number }
  | { kind: 'opener'; openerId: OpenerId }
  | { kind: 'none' };

export function isValidPage(page: number, totalPages: number) {
  return Number.isInteger(page) && page >= 0 && page < totalPages;
}

export function getSectionOpenerByStartPage<OpenerId extends string>(
  navigation: readonly SectionOpenerNavigationEntry<OpenerId>[],
  page: number,
) {
  return navigation.find(entry => entry.startPageIndex === page);
}

export function getSectionOpenerByName<OpenerId extends string>(
  navigation: readonly SectionOpenerNavigationEntry<OpenerId>[],
  sectionName: string,
) {
  return navigation.find(entry => entry.sectionName === sectionName);
}

export function resolveNextExperience<OpenerId extends string>(
  currentPage: number,
  activeOpenerId: OpenerId | null,
  totalPages: number,
  navigation: readonly SectionOpenerNavigationEntry<OpenerId>[],
): ExperienceDestination<OpenerId> {
  if (activeOpenerId) {
    const activeOpener = navigation.find(entry => entry.openerId === activeOpenerId);
    return activeOpener && isValidPage(activeOpener.startPageIndex, totalPages)
      ? { kind: 'page', page: activeOpener.startPageIndex }
      : { kind: 'none' };
  }

  const nextPage = currentPage + 1;
  const nextOpener = getSectionOpenerByStartPage(navigation, nextPage);
  if (nextOpener) {
    return { kind: 'opener', openerId: nextOpener.openerId };
  }

  return isValidPage(nextPage, totalPages) ? { kind: 'page', page: nextPage } : { kind: 'none' };
}

export function resolvePreviousExperience<OpenerId extends string>(
  currentPage: number,
  activeOpenerId: OpenerId | null,
  totalPages: number,
  navigation: readonly SectionOpenerNavigationEntry<OpenerId>[],
): ExperienceDestination<OpenerId> {
  if (activeOpenerId) {
    const activeOpener = navigation.find(entry => entry.openerId === activeOpenerId);
    const previousPage = activeOpener ? activeOpener.startPageIndex - 1 : -1;
    return isValidPage(previousPage, totalPages) ? { kind: 'page', page: previousPage } : { kind: 'none' };
  }

  const currentOpener = getSectionOpenerByStartPage(navigation, currentPage);
  if (currentOpener) {
    return { kind: 'opener', openerId: currentOpener.openerId };
  }

  const previousPage = currentPage - 1;
  return isValidPage(previousPage, totalPages) ? { kind: 'page', page: previousPage } : { kind: 'none' };
}

export function resolveContentsDestination<OpenerId extends string>(
  page: number,
  totalPages: number,
  navigation: readonly SectionOpenerNavigationEntry<OpenerId>[],
): ExperienceDestination<OpenerId> {
  const opener = getSectionOpenerByStartPage(navigation, page);
  if (opener) {
    return { kind: 'opener', openerId: opener.openerId };
  }

  return isValidPage(page, totalPages) ? { kind: 'page', page } : { kind: 'none' };
}
