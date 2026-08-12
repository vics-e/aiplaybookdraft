import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { ChevronLeft, ChevronRight, Home, BookOpen, Shield, Bot, MessageSquare, DollarSign, Calendar, FileText, CheckCircle, Lightbulb, Target, Zap, Moon, Sun } from 'lucide-react';
import { playbook } from './data/playbookData';
import { PageContent } from './components/PageContent';
import { ProgressBar } from './components/ProgressBar';
import { SECTION_OPENERS, SectionOpener, type SectionOpenerId } from './components/SectionOpener';
import {
  getSectionOpenerByName as findSectionOpenerByName,
  getSectionOpenerByStartPage as findSectionOpenerByStartPage,
  isValidPage,
  resolveContentsDestination,
  resolveNextExperience,
  resolvePreviousExperience,
} from './models/playbookNavigationModel';
import {
  addVisitedPage,
  getSectionVisitProgress,
  getVisitedPageProgress,
  loadPlaybookState,
  savePlaybookState,
  type PlaybookStorage,
} from './models/playbookStateModel';
import sageLogo from '../assets/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png';

const THEME_STORAGE_KEY = 'sage-ai-playbook-theme';
const DESKTOP_NAVIGATION_QUERY = '(min-width: 1024px)';
const SECTION_OPENER_NAVIGATION = (Object.keys(SECTION_OPENERS) as SectionOpenerId[]).map(openerId => {
  const startPageIndex = playbook.findIndex(page => page.id === SECTION_OPENERS[openerId].startPageId);
  return {
    openerId,
    startPageIndex,
    sectionName: startPageIndex >= 0 ? playbook[startPageIndex].section : undefined
  };
});

function getSectionOpenerByStartPage(page: number) {
  return findSectionOpenerByStartPage(SECTION_OPENER_NAVIGATION, page);
}

function getSectionOpenerByName(sectionName: string) {
  return findSectionOpenerByName(SECTION_OPENER_NAVIGATION, sectionName);
}

function getBrowserPlaybookStorage(): PlaybookStorage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

type PlaybookTheme = 'dark' | 'light';

function getInitialTheme(): PlaybookTheme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function getInitialDesktopState() {
  return typeof window === 'undefined' || window.matchMedia(DESKTOP_NAVIGATION_QUERY).matches;
}

function getInitialPlaybookState(totalPages: number) {
  return loadPlaybookState(getBrowserPlaybookStorage(), totalPages);
}

export default function SageAIPlaybook() {
  const [persistedState] = useState(() => getInitialPlaybookState(playbook.length));
  const [currentPage, setCurrentPage] = useState(persistedState.currentPage);
  const [userInputs, setUserInputs] = useState<Record<string, string>>(persistedState.userInputs);
  const [isDesktop, setIsDesktop] = useState(getInitialDesktopState);
  const [sidebarOpen, setSidebarOpen] = useState(getInitialDesktopState);
  const [visitedPages, setVisitedPages] = useState<Set<number>>(persistedState.visitedPages);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Introduction']));
  const [activeSectionOpener, setActiveSectionOpener] = useState<SectionOpenerId | null>(null);
  const [theme, setTheme] = useState<PlaybookTheme>(getInitialTheme);
  const contentRegionRef = useRef<HTMLDivElement>(null);
  const shouldFocusContentRef = useRef(false);

  const totalPages = playbook.length;

  useEffect(() => {
    savePlaybookState(getBrowserPlaybookStorage(), { currentPage, userInputs, visitedPages });
  }, [currentPage, userInputs, visitedPages]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Theme preference is optional; a private or restricted browser still gets the default.
    }
  }, [theme]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_NAVIGATION_QUERY);
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
      setSidebarOpen(event.matches);
    };

    setIsDesktop(desktopQuery.matches);
    setSidebarOpen(desktopQuery.matches);
    desktopQuery.addEventListener('change', handleViewportChange);

    return () => desktopQuery.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    if (!shouldFocusContentRef.current) {
      return;
    }

    const focusTimer = window.setTimeout(() => {
      shouldFocusContentRef.current = false;
      const heading = contentRegionRef.current?.querySelector<HTMLElement>('h1, h2');
      heading?.focus();
    }, 450);

    return () => window.clearTimeout(focusTimer);
  }, [activeSectionOpener, currentPage]);

  useEffect(() => {
    if (!sidebarOpen || isDesktop) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDesktop, sidebarOpen]);

  const goToPage = (page: number) => {
    if (isValidPage(page, totalPages)) {
      shouldFocusContentRef.current = true;
      setActiveSectionOpener(null);
      setCurrentPage(page);
      setVisitedPages(prev => addVisitedPage(prev, page));
      if (!isDesktop) {
        setSidebarOpen(false);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openSectionOpener = (openerId: SectionOpenerId) => {
    const opener = SECTION_OPENER_NAVIGATION.find(entry => entry.openerId === openerId);
    if (!opener || opener.startPageIndex < 0 || !opener.sectionName) {
      return;
    }

    shouldFocusContentRef.current = true;
    setCurrentPage(opener.startPageIndex);
    setActiveSectionOpener(opener.openerId);
    setExpandedSections(prev => new Set(prev).add(opener.sectionName!));
    if (!isDesktop) {
      setSidebarOpen(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextExperience = () => {
    const nextOpener = getSectionOpenerByStartPage(currentPage + 1);
    const destination = resolveNextExperience(currentPage, activeSectionOpener, totalPages, SECTION_OPENER_NAVIGATION);
    if (destination.kind === 'opener' && nextOpener) {
      openSectionOpener(destination.openerId);
      return;
    }

    if (destination.kind === 'page') {
      goToPage(destination.page);
    }
  };

  const goToPreviousExperience = () => {
    const currentOpener = getSectionOpenerByStartPage(currentPage);
    const destination = resolvePreviousExperience(currentPage, activeSectionOpener, totalPages, SECTION_OPENER_NAVIGATION);
    if (destination.kind === 'opener' && currentOpener) {
      openSectionOpener(destination.openerId);
      return;
    }

    if (destination.kind === 'page') {
      goToPage(destination.page);
    }
  };

  const goToPageFromContent = (page: number) => {
    const opener = getSectionOpenerByStartPage(page);
    const destination = resolveContentsDestination(page, totalPages, SECTION_OPENER_NAVIGATION);
    if (destination.kind === 'opener' && opener) {
      openSectionOpener(destination.openerId);
      return;
    }

    if (destination.kind === 'page') {
      goToPage(destination.page);
    }
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionName)) {
        newSet.delete(sectionName);
      } else {
        newSet.add(sectionName);
      }
      return newSet;
    });
  };

  const handleSectionHeaderClick = (
    sectionName: string,
    isExpanded: boolean,
    sectionOpener?: (typeof SECTION_OPENER_NAVIGATION)[number]
  ) => {
    if (sectionName === 'Introduction') {
      if (isExpanded) {
        toggleSection(sectionName);
      } else {
        setExpandedSections(prev => new Set(prev).add(sectionName));
        goToPage(0);
      }
      return;
    }

    if (!sectionOpener || isExpanded) {
      toggleSection(sectionName);
      return;
    }

    openSectionOpener(sectionOpener.openerId);
  };

  const handleInputChange = (pageId: string, value: string) => {
    setUserInputs(prev => ({ ...prev, [pageId]: value }));
  };

  const currentPageData = playbook[currentPage];

  // Get section info for current page
  const getCurrentSection = () => {
    if (currentPage === 0) return null;
    if (currentPage === 1) return { name: 'Contents', progress: 0 };
    
    const contentsPage = playbook[1];
    if (contentsPage.type === 'contents' && contentsPage.sections) {
      for (let i = 0; i < contentsPage.sections.length; i++) {
        const section = contentsPage.sections[i];
        const nextSection = contentsPage.sections[i + 1];
        if (currentPage >= section.startPageIndex && (!nextSection || currentPage < nextSection.startPageIndex)) {
          const sectionPages = nextSection ? nextSection.startPageIndex - section.startPageIndex : totalPages - section.startPageIndex;
          const progress = ((currentPage - section.startPageIndex + 1) / sectionPages) * 100;
          return { name: section.title, progress };
        }
      }
    }
    return null;
  };

  // Group pages by section
  const groupPagesBySection = () => {
    const groups: { [key: string]: { pages: { index: number; page: any }[], icon?: string } } = {
      'Introduction': { pages: [] }
    };

    playbook.forEach((page, index) => {
      if (page.type === 'cover') {
        groups['Introduction'].pages.push({ index, page });
      } else if (page.type === 'contents') {
        groups['Introduction'].pages.push({ index, page });
      } else if (page.section) {
        if (!groups[page.section]) {
          groups[page.section] = { pages: [] };
          
          // Get icon from contents page by matching section label (e.g., "Section 1")
          const contentsPage = playbook[1];
          if (contentsPage.type === 'contents' && contentsPage.sections) {
            // Extract section label from page.section (e.g., "Section 1: Understanding AI" -> "Section 1")
            const sectionLabel = page.section.split(':')[0].trim();
            const sectionInfo = contentsPage.sections.find(s => s.sectionLabel === sectionLabel);
            if (sectionInfo) {
              groups[page.section].icon = sectionInfo.icon;
            }
          }
        }
        groups[page.section].pages.push({ index, page });
      }
    });

    return groups;
  };

  const groupedPages = groupPagesBySection();
  const currentSection = getCurrentSection();
  const visitedPageProgress = getVisitedPageProgress(visitedPages, totalPages);

  // Calculate section completion
  const getSectionCompletion = (sectionName: string) => {
    const section = groupedPages[sectionName];
    if (!section) return 0;
    return getSectionVisitProgress(section.pages.map(page => page.index), visitedPages);
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="playbook-app-shell min-h-screen overflow-x-hidden bg-[var(--color-page-background)] text-[var(--color-text-primary)] flex" style={{ fontFamily: 'var(--font-family-body)' }}>
      {sidebarOpen && !isDesktop && (
        <button
          type="button"
          className="playbook-sidebar-backdrop fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        id="playbook-sidebar"
        aria-label="Playbook navigation"
        aria-hidden={!sidebarOpen}
        inert={(!sidebarOpen ? '' : undefined) as any}
        className={`playbook-sidebar fixed left-0 top-0 h-screen w-80 bg-black/95 backdrop-blur-xl border-r accent-border-faint z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b accent-border-faint">
            <button
              onClick={() => goToPage(0)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity group w-full"
            >
              <img 
                src={sageLogo} 
                alt="Sage" 
                className="h-8 w-auto"
              />
              <div className="text-left">
                <h1 className="font-bold text-base tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>The AI Playbook</h1>
                <p className="text-xs text-white/50 font-medium">For Accountants & Bookkeepers</p>
              </div>
            </button>
          </div>

          {/* Current Section & Progress */}
          {currentSection && (
            <div className="px-6 py-4 border-b accent-border-faint">
              <div className="text-xs font-bold text-white/50 mb-2">CURRENT SECTION</div>
              <div className="text-sm font-bold mb-2">{currentSection.name}</div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full accent-bg transition-all duration-300"
                  style={{ width: `${currentSection.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Navigation Menu with Sections */}
          <nav className="flex-1 overflow-y-auto custom-scrollbar p-4">
            <div className="space-y-2">
              {Object.entries(groupedPages).map(([sectionName, sectionData]) => {
                const isExpanded = expandedSections.has(sectionName);
                const completion = getSectionCompletion(sectionName);
                const sectionOpener = getSectionOpenerByName(sectionName);
                const getIcon = (iconName?: string) => {
                  const icons: Record<string, any> = {
                    BookOpen, Shield, Bot, MessageSquare, DollarSign, Calendar, FileText,
                    CheckCircle, Lightbulb, Target, Zap
                  };
                  return icons[iconName || 'BookOpen'] || BookOpen;
                };
                const SectionIcon = getIcon(sectionData.icon);

                return (
                  <div key={sectionName} className="border-b border-white/5 pb-2">
                    {/* Section Header */}
                    <button
                      onClick={() => handleSectionHeaderClick(sectionName, isExpanded, sectionOpener)}
                      aria-expanded={isExpanded}
                      aria-controls={`playbook-section-${sectionName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group"
                    >
                      <div className="w-8 h-8 accent-bg-soft rounded-lg flex items-center justify-center flex-shrink-0 border accent-border-soft">
                        <SectionIcon className="accent-text" size={16} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 text-left">
                        {/* Extract section number from sectionName (e.g., "Section 1: Understanding AI" -> "Section 1") */}
                        {sectionName.includes(':') ? (
                          <>
                            <div className="text-xs font-black accent-text uppercase tracking-wider">
                              {sectionName.split(':')[0]}
                            </div>
                            <div className="text-xs font-bold text-white/90 mt-0.5">
                              {sectionName.split(':')[1].trim()}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm font-black">{sectionName}</div>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-white/10 rounded-full h-1 overflow-hidden">
                            <div 
                              className="h-full accent-bg transition-all duration-300"
                              style={{ width: `${completion}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-white/50">{Math.round(completion)}%</span>
                        </div>
                      </div>
                      <ChevronRight 
                        size={16} 
                        strokeWidth={2.5}
                        className={`text-white/40 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    </button>

                    {/* Section Pages */}
                    {isExpanded && (
                      <div id={`playbook-section-${sectionName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`} className="mt-1 space-y-1 ml-2">
                        {sectionData.pages
                          .filter(({ page }) => !(sectionName === 'Introduction' && page.type === 'cover'))
                          .map(({ index, page }) => {
                          const isActive = currentPage === index;
                          const isVisited = visitedPages.has(index);
                          const isCover = page.type === 'cover';
                          const isContents = page.type === 'contents';
                          
                          return (
                            <button
                              key={index}
                              onClick={() => goToPage(index)}
                              aria-current={isActive ? 'page' : undefined}
                              className={`min-h-11 w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group text-left ${
                                isActive 
                                  ? 'accent-bg-soft border-l-4 accent-border'
                                  : 'hover:bg-white/5 border-l-4 border-transparent'
                              }`}
                            >
                              {/* Checkmark or Page Number */}
                              <div className={`w-6 flex-shrink-0 flex items-center justify-center ${
                                isActive ? 'accent-text' : isVisited ? 'accent-text' : 'text-white/40'
                              }`}>
                                {isVisited ? (
                                  <CheckCircle size={16} strokeWidth={2.5} className="accent-fill-soft" />
                                ) : (
                                  <span className="text-xs font-black tabular-nums">
                                    {isCover ? '🏠' : isContents ? '📋' : String(index + 1).padStart(2, '0')}
                                  </span>
                                )}
                              </div>

                              {/* Page Title */}
                              <div className="flex-1 min-w-0">
                                <div className={`text-xs font-bold leading-tight ${
                                  isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                                }`}>
                                  {isCover ? 'Start' : isContents ? 'Contents' : page.title.replace(/\*\*/g, '')}
                                </div>
                              </div>
                            </button>
                          );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Overall Progress */}
          <div className="p-6 border-t accent-border-faint">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white/50">OVERALL PROGRESS</span>
              <span className="text-xs font-black accent-text">
                {Math.round(visitedPageProgress)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full accent-bg transition-all duration-300 shadow-[0_0_10px_rgba(0,214,57,0.5)]"
                style={{ width: `${visitedPageProgress}%` }}
              />
            </div>
            <div className="text-center mt-2 text-xs font-semibold text-white/60">
              {visitedPages.size} of {totalPages} pages visited
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Toggle Button */}
      <button
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-controls="playbook-sidebar"
        aria-expanded={sidebarOpen}
        className={`playbook-sidebar-toggle fixed top-6 z-[60] min-h-11 min-w-11 accent-bg text-black p-2.5 rounded-r-xl shadow-lg transition-all accent-hover ${sidebarOpen ? 'sidebar-is-open' : ''}`}
      >
        {sidebarOpen ? <ChevronLeft size={20} strokeWidth={2.5} /> : <ChevronRight size={20} strokeWidth={2.5} />}
      </button>

      <button
        type="button"
        className="orbit-theme-toggle fixed right-4 top-4 z-[70]"
        onClick={() => setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={theme === 'light'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className="orbit-theme-toggle__tooltip" role="tooltip">{theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</span>
        <Sun className="orbit-theme-toggle__sun" size={20} strokeWidth={1.8} aria-hidden="true" />
        <Moon className="orbit-theme-toggle__moon" size={20} strokeWidth={1.8} aria-hidden="true" />
      </button>

      {/* Main Content Area */}
      <main className={`playbook-main min-w-0 flex-1 transition-all duration-300 ${sidebarOpen ? 'sidebar-is-open' : ''}`}>
        <div ref={contentRegionRef} className="playbook-main-inner max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSectionOpener || currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeSectionOpener ? (
                <SectionOpener openerId={activeSectionOpener} />
              ) : (
                <PageContent
                  page={currentPageData}
                  userInput={userInputs[currentPageData.id] || ''}
                  onInputChange={(value) => handleInputChange(currentPageData.id, value)}
                  goToPage={goToPageFromContent}
                  pageInputs={userInputs}
                  onUpdatePageInput={handleInputChange}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="playbook-page-nav mt-10 grid grid-cols-2 items-center gap-3 border-t border-white/10 pt-6 sm:mt-12 sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:pt-8"
          >
            <button
              type="button"
              onClick={goToPreviousExperience}
              disabled={currentPage === 0}
              aria-label="Go to previous page"
              className="order-2 flex min-h-11 items-center gap-2 justify-self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:bg-white/5 sm:order-1 sm:px-6 sm:py-3"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
              <span>Previous</span>
            </button>

            <div className="order-1 col-span-2 text-center sm:order-2 sm:col-span-1">
              {!activeSectionOpener && (
                <div className="text-xs font-semibold text-white/50 mb-1">Page {currentPage + 1} of {totalPages}</div>
              )}
              <div className="flex justify-center">
                {playbook.slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 3)).map((_, idx) => {
                  const pageIdx = Math.max(0, currentPage - 2) + idx;
                  const isVisited = visitedPages.has(pageIdx);
                  return (
                    <button
                      type="button"
                      key={pageIdx}
                      onClick={() => goToPage(pageIdx)}
                      aria-label={`Go to page ${pageIdx + 1}`}
                      aria-current={pageIdx === currentPage ? 'page' : undefined}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg"
                    >
                      <span className={`h-2 rounded-full transition-all ${
                          pageIdx === currentPage
                            ? 'accent-bg w-6'
                            : isVisited
                            ? 'accent-bg-medium w-2'
                            : 'bg-white/20 w-2'
                        }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={goToNextExperience}
              disabled={currentPage === totalPages - 1}
              aria-label={activeSectionOpener ? 'Start section' : currentPage === totalPages - 1 ? 'Finish playbook' : 'Go to next page'}
              className="accent-action-shadow order-3 flex min-h-11 items-center gap-2 justify-self-end rounded-xl border accent-border accent-bg px-4 py-2.5 text-sm font-black text-black transition-all hover:scale-105 accent-hover disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-20 disabled:shadow-none sm:px-6 sm:py-3"
            >
              <span>{activeSectionOpener ? 'Start section' : currentPage === totalPages - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </motion.div>
        </div>
      </main>
    </div>
    </MotionConfig>
  );
}
