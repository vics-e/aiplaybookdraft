import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Home, BookOpen, Shield, Bot, MessageSquare, DollarSign, Calendar, FileText, CheckCircle, Lightbulb, Target, Zap } from 'lucide-react';
import { playbook } from './data/playbookData';
import { PageContent } from './components/PageContent';
import { ProgressBar } from './components/ProgressBar';
import sageLogo from 'figma:asset/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png';

export default function SageAIPlaybook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [visitedPages, setVisitedPages] = useState<Set<number>>(new Set([0]));
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Introduction']));

  const totalPages = playbook.length;

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      setVisitedPages(prev => {
        const newSet = new Set(prev);
        newSet.add(page);
        return newSet;
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        if (currentPage >= section.pageNumber && (!nextSection || currentPage < nextSection.pageNumber)) {
          const sectionPages = nextSection ? nextSection.pageNumber - section.pageNumber : totalPages - section.pageNumber;
          const progress = ((currentPage - section.pageNumber + 1) / sectionPages) * 100;
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

  // Calculate section completion
  const getSectionCompletion = (sectionName: string) => {
    const section = groupedPages[sectionName];
    if (!section) return 0;
    const visitedInSection = section.pages.filter(p => visitedPages.has(p.index)).length;
    return (visitedInSection / section.pages.length) * 100;
  };

  return (
    <div className="bg-black text-white min-h-screen flex" style={{ fontFamily: 'var(--font-family-body)' }}>
      {/* Sidebar Navigation */}
      <aside className={`fixed left-0 top-0 h-screen bg-black/95 backdrop-blur-xl border-r border-[#00DC51]/20 z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-80`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#00DC51]/20">
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
            <div className="px-6 py-4 border-b border-[#00DC51]/10">
              <div className="text-xs font-bold text-white/50 mb-2">CURRENT SECTION</div>
              <div className="text-sm font-bold mb-2">{currentSection.name}</div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-[#00DC51] transition-all duration-300"
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
                      onClick={() => toggleSection(sectionName)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group"
                    >
                      <div className="w-8 h-8 bg-[#00DC51]/15 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#00DC51]/30">
                        <SectionIcon className="text-[#00DC51]" size={16} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 text-left">
                        {/* Extract section number from sectionName (e.g., "Section 1: Understanding AI" -> "Section 1") */}
                        {sectionName.includes(':') ? (
                          <>
                            <div className="text-xs font-black text-[#00DC51] uppercase tracking-wider">
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
                              className="h-full bg-[#00DC51] transition-all duration-300"
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
                      <div className="mt-1 space-y-1 ml-2">
                        {sectionData.pages.map(({ index, page }) => {
                          const isActive = currentPage === index;
                          const isVisited = visitedPages.has(index);
                          const isCover = page.type === 'cover';
                          const isContents = page.type === 'contents';
                          
                          return (
                            <button
                              key={index}
                              onClick={() => goToPage(index)}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group text-left ${
                                isActive 
                                  ? 'bg-[#00DC51]/15 border-l-4 border-[#00DC51]' 
                                  : 'hover:bg-white/5 border-l-4 border-transparent'
                              }`}
                            >
                              {/* Checkmark or Page Number */}
                              <div className={`w-6 flex-shrink-0 flex items-center justify-center ${
                                isActive ? 'text-[#00DC51]' : isVisited ? 'text-[#00DC51]' : 'text-white/40'
                              }`}>
                                {isVisited ? (
                                  <CheckCircle size={16} strokeWidth={2.5} className="fill-[#00DC51]/20" />
                                ) : (
                                  <span className="text-xs font-black tabular-nums">
                                    {isCover ? '🏠' : isContents ? '📋' : String(index).padStart(2, '0')}
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
          <div className="p-6 border-t border-[#00DC51]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white/50">OVERALL PROGRESS</span>
              <span className="text-xs font-black text-[#00DC51]">
                {Math.round((visitedPages.size / totalPages) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00DC51] to-[#00FF5F] transition-all duration-300 shadow-[0_0_10px_rgba(0,220,81,0.5)]"
                style={{ width: `${(visitedPages.size / totalPages) * 100}%` }}
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
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-6 z-50 bg-[#00DC51] text-black p-2.5 rounded-r-xl shadow-lg transition-all hover:bg-[#00FF5F] ${
          sidebarOpen ? 'left-80' : 'left-0'
        }`}
      >
        {sidebarOpen ? <ChevronLeft size={20} strokeWidth={2.5} /> : <ChevronRight size={20} strokeWidth={2.5} />}
      </button>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <div className="max-w-5xl mx-auto px-12 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PageContent
                page={currentPageData}
                userInput={userInputs[currentPageData.id] || ''}
                onInputChange={(value) => handleInputChange(currentPageData.id, value)}
                goToPage={goToPage}
                pageInputs={userInputs}
                onUpdatePageInput={handleInputChange}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10"
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed rounded-xl transition-all font-semibold text-sm border border-white/10 hover:border-white/20 disabled:hover:bg-white/5"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
              <span>Previous</span>
            </button>

            <div className="text-center">
              <div className="text-xs font-semibold text-white/50 mb-1">Page {currentPage + 1} of {totalPages}</div>
              <div className="flex gap-1">
                {playbook.slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 3)).map((_, idx) => {
                  const pageIdx = Math.max(0, currentPage - 2) + idx;
                  const isVisited = visitedPages.has(pageIdx);
                  return (
                    <button
                      key={pageIdx}
                      onClick={() => goToPage(pageIdx)}
                      className={`h-2 rounded-full transition-all ${
                        pageIdx === currentPage 
                          ? 'bg-[#00DC51] w-6' 
                          : isVisited
                          ? 'bg-[#00DC51]/50 w-2'
                          : 'bg-white/20 hover:bg-white/40 w-2'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2 px-6 py-3 bg-[#00DC51] hover:bg-[#00DC51]/90 text-black font-black disabled:opacity-20 disabled:cursor-not-allowed rounded-xl transition-all shadow-lg shadow-[#00DC51]/30 hover:shadow-[#00DC51]/50 hover:scale-105 text-sm border border-[#00DC51] disabled:shadow-none disabled:scale-100"
            >
              <span>{currentPage === totalPages - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}