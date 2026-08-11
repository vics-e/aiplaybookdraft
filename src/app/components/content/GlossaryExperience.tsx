import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Search } from 'lucide-react';
import type { PlaybookPage } from '../../data/playbookData';
import {
  GLOSSARY_HELPER_CONTENT,
  buildGlossaryTerms,
  parseGlossaryPageState,
  type GlossaryPageState,
} from './glossaryModel';

interface GlossaryExperienceProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
}

export function GlossaryExperience({ page, userInput, onInputChange }: GlossaryExperienceProps) {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const glossaryTerms = buildGlossaryTerms(page.content);
  const glossaryState = parseGlossaryPageState(userInput);
  const filteredGlossaryTerms = glossaryTerms.filter((term) => {
    const query = glossaryState.searchQuery.trim().toLowerCase();
    return !query || term.term.toLowerCase().includes(query) || term.definition.toLowerCase().includes(query);
  });
  const selectedGlossaryTerm = filteredGlossaryTerms.find((term) => term.term === glossaryState.selectedTerm)
    || glossaryTerms.find((term) => term.term === glossaryState.selectedTerm)
    || filteredGlossaryTerms[0]
    || glossaryTerms[0];
  const glossaryFlashcardIndex = glossaryTerms.length > 0
    ? Math.min(Math.max(glossaryState.currentFlashcardIndex, 0), glossaryTerms.length - 1)
    : 0;
  const activeFlashcard = glossaryTerms[glossaryFlashcardIndex];
  const activeFlashcardIsFlipped = activeFlashcard ? glossaryState.flippedTerms.includes(activeFlashcard.term) : false;
  const glossaryLearnedTerms = glossaryTerms.filter((term) => glossaryState.learnedTerms.includes(term.term));
  const glossaryProgress = glossaryTerms.length > 0
    ? (glossaryLearnedTerms.length / glossaryTerms.length) * 100
    : 0;

  const updateGlossaryState = (updater: (current: GlossaryPageState) => GlossaryPageState) => {
    const nextState = updater(glossaryState);
    onInputChange(JSON.stringify(nextState));
  };

  const handlePromptCopy = async (text: string, promptId: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptId(promptId);
      window.setTimeout(() => {
        setCopiedPromptId((current) => (current === promptId ? null : current));
      }, 1400);
    } catch {
      setCopiedPromptId(null);
    }
  };

  return (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-6 xl:-mx-4 xl:w-[calc(100%+2rem)] 2xl:-mx-6 2xl:w-[calc(100%+3rem)]"
        >
          <style>{`
            .glossary-term-list {
              scrollbar-width: thin;
              scrollbar-color: #00DC51 #030604;
            }

            .glossary-term-list::-webkit-scrollbar {
              width: 10px;
            }

            .glossary-term-list::-webkit-scrollbar-track {
              background: #030604;
              border-radius: 999px;
            }

            .glossary-term-list::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #00DC51 0%, #00b842 100%);
              border-radius: 999px;
              border: 2px solid #030604;
            }

            .glossary-term-list::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #00ff5f 0%, #00c948 100%);
            }
          `}</style>
          <div className="rounded-[28px] border border-white/12 bg-gradient-to-br from-white/[0.05] via-[#00DC51]/[0.05] to-transparent p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:p-6">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">Glossary Lab</h3>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/68 md:text-base">
                  Explore terms as a reference tool, then switch into flashcards to remember the key ideas.
                </p>
              </div>
              <div className="inline-flex w-full max-w-full rounded-full border border-white/12 bg-[#101310] p-1 sm:w-auto max-[380px]:flex-col">
                <button
                  type="button"
                  onClick={() => {
                    updateGlossaryState((current) => ({ ...current, mode: 'lab' }));
                  }}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-black transition-colors sm:flex-none ${
                    glossaryState.mode === 'lab'
                      ? 'bg-[#00DC51] text-black'
                      : 'bg-transparent text-white hover:text-[#00DC51]'
                  }`}
                >
                  Glossary Lab
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateGlossaryState((current) => ({ ...current, mode: 'flashcards' }));
                  }}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-black transition-colors sm:flex-none ${
                    glossaryState.mode === 'flashcards'
                      ? 'bg-[#00DC51] text-black'
                      : 'bg-transparent text-white hover:text-[#00DC51]'
                  }`}
                >
                  Flashcards
                </button>
              </div>
            </div>

            {glossaryState.mode === 'lab' ? (
              <div className="space-y-5">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00DC51]" size={18} strokeWidth={2.5} />
                  <input
                    aria-label="Search glossary terms"
                    value={glossaryState.searchQuery}
                    onChange={(e) => {
                      const nextSearchQuery = e.target.value;
                      updateGlossaryState((current) => ({
                        ...current,
                        mode: 'lab',
                        searchQuery: nextSearchQuery,
                      }));
                    }}
                    placeholder="Search glossary terms..."
                    className="w-full rounded-2xl border border-white/15 bg-[#030604] py-3 pl-12 pr-4 text-sm font-bold text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00DC51]"
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
                  <aside className="glossary-term-list grid content-start gap-2 rounded-3xl border border-white/12 bg-[#030604] p-3 lg:max-h-[560px] lg:overflow-auto">
                    {filteredGlossaryTerms.length > 0 ? filteredGlossaryTerms.map((term) => (
                      <button
                        key={term.id}
                        type="button"
                        onClick={() => {
                          updateGlossaryState((current) => ({
                            ...current,
                            mode: 'lab',
                            selectedTerm: term.term,
                          }));
                        }}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                          selectedGlossaryTerm?.term === term.term
                            ? 'border-[#00DC51] bg-[#00DC51]/12'
                            : 'border-white/12 bg-white/[0.035] hover:border-[#00DC51]/60 hover:bg-[#00DC51]/8'
                        }`}
                      >
                        <p className="text-sm font-black text-white">{term.term}</p>
                      </button>
                    )) : (
                      <div className="rounded-2xl border border-dashed border-white/15 px-4 py-6 text-center text-sm font-medium text-white/55">
                        No glossary terms found.
                      </div>
                    )}
                  </aside>

                  <section className="rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_top_right,_rgba(0,214,57,0.12),_transparent_34%),linear-gradient(145deg,#07140b,#020403)] p-6 md:p-7">
                    {selectedGlossaryTerm ? (
                      <>
                        <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Definition</div>
                        <h3 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">{selectedGlossaryTerm.term}</h3>
                        <p className="mb-6 max-w-4xl text-base font-medium leading-relaxed text-white/86 md:text-lg">
                          {selectedGlossaryTerm.definition}
                        </p>

                        {(() => {
                          const helper = GLOSSARY_HELPER_CONTENT[selectedGlossaryTerm.term];
                          const helperCards = [
                            helper?.example ? { label: 'Example', value: helper.example } : null,
                            helper?.watchOut ? { label: 'Watch out', value: helper.watchOut } : null,
                            helper?.plainEnglish ? { label: 'Plain English', value: helper.plainEnglish } : null,
                          ].filter((item): item is { label: string; value: string } => Boolean(item));

                          return helperCards.length > 0 ? (
                            <div className="mb-5 grid gap-3 md:grid-cols-3">
                              {helperCards.map((card) => (
                                <div key={card.label} className="min-h-[132px] rounded-2xl border border-white/12 bg-white/[0.035] p-4">
                                  <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#00DC51]">{card.label}</p>
                                  <p className="text-sm font-medium leading-relaxed text-white/82">{card.value}</p>
                                </div>
                              ))}
                            </div>
                          ) : null;
                        })()}

                        {GLOSSARY_HELPER_CONTENT[selectedGlossaryTerm.term]?.relatedTerms?.length ? (
                          <div className="mb-5">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#00DC51]">Related terms</p>
                            <div className="flex flex-wrap gap-2">
                              {GLOSSARY_HELPER_CONTENT[selectedGlossaryTerm.term]?.relatedTerms?.map((relatedTerm) => (
                                <button
                                  key={relatedTerm}
                                  type="button"
                                  onClick={() => {
                                    updateGlossaryState((current) => ({
                                      ...current,
                                      mode: 'lab',
                                      selectedTerm: relatedTerm,
                                    }));
                                  }}
                                  className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-black text-white/75 transition-colors hover:border-[#00DC51]/60 hover:bg-[#00DC51]/10 hover:text-white"
                                >
                                  {relatedTerm}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => handlePromptCopy(`${selectedGlossaryTerm.term}\n\n${selectedGlossaryTerm.definition}`, `glossary-${selectedGlossaryTerm.term}`)}
                            className="inline-flex items-center gap-2 rounded-full bg-[#00DC51] px-4 py-2.5 text-sm font-black text-black transition-colors hover:bg-[#00FF5F]"
                          >
                            {copiedPromptId === `glossary-${selectedGlossaryTerm.term}` ? <Check size={16} strokeWidth={3} /> : <Copy size={16} strokeWidth={2.5} />}
                            <span>{copiedPromptId === `glossary-${selectedGlossaryTerm.term}` ? 'Copied' : 'Copy explanation'}</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center text-sm font-medium text-white/55">
                        Select a term to view the official definition.
                      </div>
                    )}
                  </section>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  {activeFlashcard ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          updateGlossaryState((current) => {
                            const isFlipped = current.flippedTerms.includes(activeFlashcard.term);
                            return {
                              ...current,
                              flippedTerms: isFlipped
                                ? current.flippedTerms.filter((term) => term !== activeFlashcard.term)
                                : [...current.flippedTerms, activeFlashcard.term],
                            };
                          });
                        }}
                        className="flex min-h-[390px] w-full flex-col items-center justify-center rounded-[24px] border border-[#00DC51] bg-[radial-gradient(circle_at_top_right,_rgba(0,214,57,0.16),_transparent_38%),linear-gradient(135deg,#03170b,#010201)] p-8 text-center shadow-[0_22px_80px_rgba(0,214,57,0.08)]"
                      >
                        <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Click to reveal</p>
                        {!activeFlashcardIsFlipped ? (
                          <h3 className="text-4xl font-black tracking-tight text-white md:text-6xl">{activeFlashcard.term}</h3>
                        ) : (
                          <p className="max-w-3xl text-lg font-medium leading-relaxed text-white/88 md:text-2xl">
                            {activeFlashcard.definition}
                          </p>
                        )}
                      </button>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateGlossaryState((current) => ({
                              ...current,
                              currentFlashcardIndex: current.currentFlashcardIndex <= 0 ? glossaryTerms.length - 1 : current.currentFlashcardIndex - 1,
                            }));
                          }}
                          className="rounded-full border border-white/15 bg-[#101310] px-4 py-2.5 text-sm font-black text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateGlossaryState((current) => ({
                              ...current,
                              learnedTerms: current.learnedTerms.includes(activeFlashcard.term)
                                ? current.learnedTerms
                                : [...current.learnedTerms, activeFlashcard.term],
                              currentFlashcardIndex: current.currentFlashcardIndex >= glossaryTerms.length - 1 ? 0 : current.currentFlashcardIndex + 1,
                            }));
                          }}
                          className="rounded-full bg-[#00DC51] px-4 py-2.5 text-sm font-black text-black transition-colors hover:bg-[#00FF5F]"
                        >
                          I know this
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateGlossaryState((current) => ({
                              ...current,
                              currentFlashcardIndex: current.currentFlashcardIndex >= glossaryTerms.length - 1 ? 0 : current.currentFlashcardIndex + 1,
                            }));
                          }}
                          className="rounded-full border border-white/15 bg-[#101310] px-4 py-2.5 text-sm font-black text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>

                <aside className="rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_top_right,_rgba(0,214,57,0.14),_transparent_38%),#030604] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Flashcard progress</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-white">Learning mode</h3>
                  <p className="mt-3 text-sm font-medium text-white/65">
                    {glossaryLearnedTerms.length} / {glossaryTerms.length} learned
                  </p>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/12">
                    <motion.div
                      className="h-full rounded-full bg-[#00DC51]"
                      animate={{ width: `${glossaryProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  <div className="mt-5 space-y-2">
                    {glossaryLearnedTerms.length > 0 ? glossaryLearnedTerms.map((term) => (
                      <div key={term.term} className="rounded-2xl border border-white/12 bg-white/[0.035] px-4 py-3 text-sm font-medium text-white/78">
                        {term.term}
                      </div>
                    )) : (
                      <div className="rounded-2xl border border-dashed border-white/15 px-4 py-5 text-sm font-medium text-white/55">
                        Terms you mark as known will appear here.
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </motion.div>
  );
}
