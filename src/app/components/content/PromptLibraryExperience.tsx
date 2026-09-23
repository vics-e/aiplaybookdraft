import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  CheckCircle,
  ChevronDown,
  Copy,
  Lightbulb,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import type { PlaybookPage } from '../../data/playbookData';
import {
  buildPersonalisedPrompt,
  buildPromptTemplates,
  extractPromptVariables,
  parseNumberedSteps,
  parsePromptLibraryState,
  renderPromptText,
  type PromptLibraryState,
} from './promptLibraryModel';

interface PromptLibraryExperienceProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
}

export function PromptLibraryExperience({ page, userInput, onInputChange }: PromptLibraryExperienceProps) {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const promptLibraryState = parsePromptLibraryState(userInput);
  const promptTemplates = buildPromptTemplates(page.content);
  const promptSearchQuery = promptLibraryState.searchQuery.trim().toLowerCase();
  const filteredPromptTemplates = promptTemplates.filter((template) =>
    !promptSearchQuery ||
    template.title.toLowerCase().includes(promptSearchQuery) ||
    template.text.toLowerCase().includes(promptSearchQuery)
  );
  const promptIntroText = page.content.find((block) => block.type === 'text')?.text || '';
  const promptNoteText = page.content.find((block) => block.type === 'highlight')?.text || '';
  const promptPracticeText = page.content.filter((block) => block.type === 'text')[1]?.text || '';
  const promptHowToBlock = page.content.find((block) => block.type === 'box' && block.style === 'green');
  const promptHowToSteps = promptHowToBlock?.text ? parseNumberedSteps(promptHowToBlock.text) : [];
  const promptActivityQuestions = page.activity?.questions || [];
  const completedPromptActivityCount = promptActivityQuestions.filter((_, index) =>
    promptLibraryState.activityCompleted.includes(`question-${index}`)
  ).length;
  const promptActivityProgress = promptActivityQuestions.length > 0
    ? (completedPromptActivityCount / promptActivityQuestions.length) * 100
    : 0;

  const updatePromptLibraryState = (updater: (current: PromptLibraryState) => PromptLibraryState) => {
    const nextState = updater(promptLibraryState);
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
    <>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-8"
        >
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div className="space-y-5">
              <p className="max-w-4xl text-sm font-medium leading-relaxed text-white/82 md:text-base">
                {promptIntroText}
              </p>

              <div className="grid gap-3 sm:grid-cols-[auto_auto_minmax(0,1fr)]">
                <button
                  type="button"
                  onClick={() => {
                    updatePromptLibraryState((current) => ({
                      ...current,
                      expandedPromptIds: promptTemplates.map((template) => template.id),
                    }));
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                >
                  <ChevronDown className="rotate-180" size={16} strokeWidth={2.5} />
                  <span>Expand All</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updatePromptLibraryState((current) => ({
                      ...current,
                      expandedPromptIds: [],
                    }));
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                >
                  <ChevronDown size={16} strokeWidth={2.5} />
                  <span>Collapse All</span>
                </button>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00DC51]" size={18} strokeWidth={2.5} />
                  <input
                    aria-label="Filter prompts"
                    value={promptLibraryState.searchQuery}
                    onChange={(e) => {
                      const nextSearchQuery = e.target.value;
                      updatePromptLibraryState((current) => ({
                        ...current,
                        searchQuery: nextSearchQuery,
                      }));
                    }}
                    placeholder="Filter prompts..."
                    className="w-full rounded-xl border border-white/15 bg-black/60 py-3 pl-12 pr-4 text-sm font-bold text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00DC51] xl:ml-auto xl:max-w-sm"
                  />
                </div>
              </div>
            </div>

            <aside className="rounded-2xl border-2 border-[#00DC51] bg-gradient-to-br from-[#00DC51]/16 via-[#00DC51]/7 to-transparent p-5 shadow-lg shadow-[#00DC51]/10">
              <h3 className="mb-4 text-base font-black text-white">{promptHowToBlock?.title || 'How to Use This Library:'}</h3>
              <div className="space-y-3">
                {promptHowToSteps.map((step, index) => (
                  <div key={step} className="grid grid-cols-[28px_1fr] items-start gap-3">
                    <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#00DC51] text-xs font-black text-[#00DC51]">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-white/85">{step}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="space-y-3">
            {filteredPromptTemplates.map((template, index) => {
              const isExpanded = promptLibraryState.expandedPromptIds.includes(template.id);
              const variableValues = promptLibraryState.promptValues[template.id] || {};
              const personalisedPrompt = buildPersonalisedPrompt(template.text, template.variables, variableValues);
              const copyOriginalId = `${template.id}-original`;
              const copyPersonalisedId = `${template.id}-personalised`;

              return (
                <motion.article
                  key={template.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-[#00DC51]/55 bg-gradient-to-br from-[#00DC51]/10 via-white/[0.03] to-white/[0.01] shadow-xl shadow-[#00DC51]/10'
                      : 'border-white/12 bg-gradient-to-r from-white/[0.05] to-white/[0.02]'
                  }`}
                >
                  <div className="grid gap-4 p-5 md:grid-cols-[44px_minmax(0,1fr)_auto] md:items-center">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#00DC51]/30 bg-[#00DC51]/15 text-sm font-black text-[#00DC51]">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-black text-white">{template.title}</h3>
                      <p className="text-sm font-medium leading-relaxed text-white/82">
                        {renderPromptText(template.text, template.variables, variableValues)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          updatePromptLibraryState((current) => {
                            const isOpen = current.expandedPromptIds.includes(template.id);
                            return {
                              ...current,
                              expandedPromptIds: isOpen
                                ? current.expandedPromptIds.filter((id) => id !== template.id)
                                : [...current.expandedPromptIds, template.id],
                            };
                          });
                        }}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                      >
                        <Sparkles size={14} strokeWidth={2.5} />
                        <span>{isExpanded ? 'Hide' : 'Personalise'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePromptCopy(template.text, copyOriginalId)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#00DC51] px-3 py-2 text-xs font-black uppercase tracking-wide text-black transition-colors hover:bg-[#00FF5F]"
                      >
                        {copiedPromptId === copyOriginalId ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                        <span>{copiedPromptId === copyOriginalId ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updatePromptLibraryState((current) => {
                            const isOpen = current.expandedPromptIds.includes(template.id);
                            return {
                              ...current,
                              expandedPromptIds: isOpen
                                ? current.expandedPromptIds.filter((id) => id !== template.id)
                                : [...current.expandedPromptIds, template.id],
                            };
                          });
                        }}
                        aria-label={isExpanded ? 'Collapse prompt' : 'Expand prompt'}
                        className="rounded-xl p-2 text-white/70 transition-colors hover:text-[#00DC51]"
                      >
                        <ChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-white/10"
                      >
                        <div className="grid gap-5 p-5 lg:grid-cols-[340px_minmax(0,1fr)]">
                          <div className="rounded-2xl border border-white/12 bg-[#00DC51]/6 p-4">
                            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Type values here</h4>
                            <div className="space-y-4">
                              {template.variables.map((variable) => (
                                <div key={variable.id} className="space-y-2">
                                  <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-white/90">
                                    {variable.label}
                                  </label>
                                  <input
                                    aria-label={variable.label}
                                    value={variableValues[variable.id] || ''}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      updatePromptLibraryState((current) => ({
                                        ...current,
                                        promptValues: {
                                          ...current.promptValues,
                                          [template.id]: {
                                            ...(current.promptValues[template.id] || {}),
                                            [variable.id]: value,
                                          },
                                        },
                                      }));
                                    }}
                                    placeholder={`Type ${variable.key.toLowerCase()}...`}
                                    className="w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 text-sm font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00DC51]"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/12 bg-[#00DC51]/6 p-4">
                            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Live prompt</h4>
                            <div className="min-h-[128px] whitespace-pre-wrap text-sm font-medium leading-relaxed text-white/86">
                              {renderPromptText(template.text, template.variables, variableValues)}
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handlePromptCopy(personalisedPrompt, copyPersonalisedId)}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#00DC51] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-black transition-colors hover:bg-[#00FF5F]"
                              >
                                {copiedPromptId === copyPersonalisedId ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                                <span>{copiedPromptId === copyPersonalisedId ? 'Copied personalised prompt' : 'Copy personalised prompt'}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  updatePromptLibraryState((current) => ({
                                    ...current,
                                    promptValues: {
                                      ...current.promptValues,
                                      [template.id]: {},
                                    },
                                  }));
                                }}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                              >
                                <RotateCcw size={14} strokeWidth={2.5} />
                                <span>Reset fields</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}

            {filteredPromptTemplates.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-5 py-8 text-center">
                <p className="text-sm font-medium text-white/65">
                  No prompts match your filter yet. Try a different keyword.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-[#00DC51] bg-gradient-to-r from-[#00DC51]/18 to-[#00DC51]/5 px-5 py-5">
            <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[#00DC51] bg-[#00DC51]/20 text-[#00DC51]">
              <span className="text-lg font-black">i</span>
            </div>
            <p className="text-sm font-bold leading-relaxed text-white">{renderPromptText(promptNoteText, extractPromptVariables(promptNoteText))}</p>
          </div>

          <p className="max-w-4xl text-sm font-medium leading-relaxed text-white/78 md:text-base">
            {promptPracticeText}
          </p>
        </motion.div>
      {page.activity && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="rounded-2xl border-2 border-[#00DC51] bg-gradient-to-br from-[#00DC51]/12 via-[#00DC51]/6 to-transparent p-6 shadow-lg shadow-[#00DC51]/10"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00DC51] shadow-lg shadow-[#00DC51]/40">
                <Lightbulb className="text-black" size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#00DC51]">Activity</span>
                  <div className="h-px flex-1 bg-[#00DC51]/30" />
                </div>
                <h4 className="mb-2 text-lg font-black text-white">{page.activity.title}</h4>
                <p className="text-sm font-medium leading-relaxed text-white/72">{page.activity.prompt}</p>
              </div>
            </div>

            <div className="space-y-2 lg:min-w-[220px]">
              <p className="text-right text-sm font-black text-white">
                {completedPromptActivityCount} / {promptActivityQuestions.length} completed
              </p>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full bg-[#00DC51]"
                  animate={{ width: `${promptActivityProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {promptActivityQuestions.map((question, index) => {
              const questionKey = `question-${index}`;
              const isCompleted = promptLibraryState.activityCompleted.includes(questionKey);

              return (
                <div
                  key={questionKey}
                  className={`rounded-2xl border p-4 transition-colors ${
                    isCompleted
                      ? 'border-[#00DC51] bg-[#00DC51]/10'
                      : 'border-white/12 bg-black/25'
                  }`}
                >
                  <div className="mb-4 grid grid-cols-[34px_1fr] gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#00DC51] text-xs font-black text-[#00DC51]">
                      {index + 1}
                    </div>
                    <p id={`prompt-activity-${questionKey}`} className="text-sm font-bold leading-relaxed text-white">{question}</p>
                  </div>

                  <textarea
                    aria-labelledby={`prompt-activity-${questionKey}`}
                    value={promptLibraryState.activityAnswers[questionKey] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      updatePromptLibraryState((current) => ({
                        ...current,
                        activityAnswers: {
                          ...current.activityAnswers,
                          [questionKey]: value,
                        },
                      }));
                    }}
                    placeholder="Type your answer here..."
                    className="min-h-[104px] w-full resize-y rounded-xl border border-white/15 bg-black/75 p-3 text-sm font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00DC51]"
                  />

                  <label className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/68">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        updatePromptLibraryState((current) => ({
                          ...current,
                          activityCompleted: checked
                            ? [...current.activityCompleted, questionKey]
                            : current.activityCompleted.filter((item) => item !== questionKey),
                        }));
                      }}
                      className="h-4 w-4 accent-[#00DC51]"
                    />
                    <span>Mark as complete</span>
                  </label>
                </div>
              );
            })}
          </div>

          {(Object.keys(promptLibraryState.activityAnswers).length > 0 || promptLibraryState.activityCompleted.length > 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2 text-xs font-bold text-[#00DC51]"
            >
              <CheckCircle size={16} strokeWidth={2.5} />
              <span role="status" aria-live="polite" aria-atomic="true">Prompt library activity updated</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
}
