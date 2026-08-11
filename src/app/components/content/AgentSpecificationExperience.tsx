import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  Check,
  CheckCircle,
  Copy,
  RotateCcw,
} from 'lucide-react';
import type { PlaybookPage } from '../../data/playbookData';
import { buildAgentSpecCopyText, parseSpecFormFields } from './activityModels';
import { parseStructuredInputs } from './promptLibraryModel';

interface AgentSpecificationExperienceProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
}

export function AgentSpecificationExperience({ page, userInput, onInputChange }: AgentSpecificationExperienceProps) {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const structuredInputs = parseStructuredInputs(userInput) as Record<string, unknown>;
  const agentSpecFields = page.activity?.specFields || [];
  const agentSpecFieldValues = parseSpecFormFields(userInput, agentSpecFields.length);
  const agentSpecMeta = structuredInputs;
  const agentSpecCurrentStep = typeof agentSpecMeta.currentStep === 'number' && Number.isFinite(agentSpecMeta.currentStep)
    ? Math.min(Math.max(Math.round(agentSpecMeta.currentStep), 0), Math.max(agentSpecFields.length - 1, 0))
    : 0;
  const agentSpecReviewMode = agentSpecMeta.reviewMode === true;
  const completedAgentSpecFields = agentSpecFields.filter(
    (_, index) => (agentSpecFieldValues[`field-${index}`] || '').trim() !== ''
  ).length;
  const agentSpecCopyText = buildAgentSpecCopyText(agentSpecFields, agentSpecFieldValues);
  const hasUsefulAgentSpecContent = completedAgentSpecFields > 0;

  const updateAgentSpecState = (updater: (current: Record<string, unknown>) => Record<string, unknown>) => {
    const nextState = updater(structuredInputs);
    onInputChange(JSON.stringify(nextState));
  };

  const clearAgentSpecAnswers = () => {
    if (!hasUsefulAgentSpecContent) {
      return;
    }

    if (!window.confirm('Clear all answers for this agent specification?')) {
      return;
    }

    updateAgentSpecState(() => ({
      currentStep: 0,
      reviewMode: false,
    }));
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-[28px] border border-white/12 bg-[#131313] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-8"
        >
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0E0E0E]">
              <Bot className="text-[#00DC51]" size={24} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#00DC51]">Activity</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h4 className="text-xl font-black text-white">{page.activity.title}</h4>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-white/72">{page.activity.prompt}</p>
            </div>
          </div>

          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              <span>Step {agentSpecCurrentStep + 1} of {agentSpecFields.length}</span>
              <span>{completedAgentSpecFields} completed</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#00DC51] transition-all"
                style={{ width: `${agentSpecFields.length > 0 ? ((agentSpecCurrentStep + 1) / agentSpecFields.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          {!agentSpecReviewMode ? (
            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[24px] border border-white/10 bg-[#101010] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">
                  {agentSpecFields[agentSpecCurrentStep]?.label}
                </p>
                <h5 className="mt-3 text-2xl font-black text-white">
                  {agentSpecFields[agentSpecCurrentStep]?.label}
                </h5>
                <p className="mt-3 text-sm font-medium leading-relaxed text-white/60">
                  {agentSpecFields[agentSpecCurrentStep]?.placeholder}
                </p>

                <div className="mt-5 grid gap-2">
                  {agentSpecFields.map((field, index) => (
                    <button
                      key={field.label}
                      onClick={() => updateAgentSpecState((current) => ({ ...current, currentStep: index, reviewMode: false }))}
                      className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition-colors ${
                        index === agentSpecCurrentStep
                          ? 'border-white/14 bg-white/[0.04] text-white'
                          : 'border-white/10 bg-black/15 text-white/60 hover:border-white/15 hover:text-white/80'
                      }`}
                    >
                      <span>{field.label}</span>
                      {(agentSpecFieldValues[`field-${index}`] || '').trim() ? (
                        <CheckCircle size={16} className="text-[#00DC51]" strokeWidth={2.5} />
                      ) : (
                        <span className="text-[11px] uppercase tracking-[0.16em] text-white/30">Pending</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#101010] p-5">
                <label htmlFor={`agent-spec-field-${agentSpecCurrentStep}`} className="mb-2 block text-sm font-bold text-white/90">
                  {agentSpecFields[agentSpecCurrentStep]?.label}
                </label>
                <textarea
                  id={`agent-spec-field-${agentSpecCurrentStep}`}
                  value={agentSpecFieldValues[`field-${agentSpecCurrentStep}`] || ''}
                  onChange={(e) => {
                    const fieldKey = `field-${agentSpecCurrentStep}`;
                    updateAgentSpecState((current) => ({
                      ...current,
                      [fieldKey]: e.target.value,
                    }));
                  }}
                  placeholder={agentSpecFields[agentSpecCurrentStep]?.placeholder}
                  className="min-h-[240px] w-full rounded-3xl border border-white/12 bg-black/25 p-4 text-sm font-medium leading-relaxed text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                />

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      onClick={() => updateAgentSpecState((current) => ({
                        ...current,
                        currentStep: Math.max(agentSpecCurrentStep - 1, 0),
                        reviewMode: false,
                      }))}
                      disabled={agentSpecCurrentStep === 0}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-3 text-sm font-bold text-white/75 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <RotateCcw size={16} strokeWidth={2.5} />
                      Back
                    </button>

                    <button
                      onClick={clearAgentSpecAnswers}
                      disabled={!hasUsefulAgentSpecContent}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/55 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Clear answers
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => updateAgentSpecState((current) => ({
                        ...current,
                        currentStep: Math.min(agentSpecCurrentStep + 1, Math.max(agentSpecFields.length - 1, 0)),
                        reviewMode: agentSpecCurrentStep >= agentSpecFields.length - 1,
                      }))}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00DC51] px-5 py-3 text-sm font-black text-black transition-all hover:bg-[#00F25B]"
                    >
                      <span>{agentSpecCurrentStep >= agentSpecFields.length - 1 ? 'Review spec' : 'Next step'}</span>
                      <ArrowRight size={16} strokeWidth={2.8} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-[24px] border border-white/10 bg-[#101010] p-4">
                <p className="text-sm font-semibold leading-relaxed text-white/78">
                  Review the final specification, then copy it into a brief, SOP, or implementation handover.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {agentSpecFields.map((field, index) => {
                  const value = agentSpecFieldValues[`field-${index}`] || '';

                  return (
                    <button
                      key={field.label}
                      onClick={() => updateAgentSpecState((current) => ({ ...current, currentStep: index, reviewMode: false }))}
                      className="rounded-[24px] border border-white/10 bg-[#101010] p-5 text-left transition-colors hover:border-white/20"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#00DC51]">{field.label}</p>
                        {(value || '').trim() ? (
                          <CheckCircle size={16} className="text-[#00DC51]" strokeWidth={2.5} />
                        ) : (
                          <AlertCircle size={16} className="text-[#FFD84D]" strokeWidth={2.5} />
                        )}
                      </div>
                      <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-white/72">
                        {value || 'Not completed yet'}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#101010] p-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#00DC51]">Preview & copy</p>
                    <h5 className="text-lg font-black text-white">Agent specification preview</h5>
                    <p className="mt-1 text-sm font-medium text-white/55">Review the final specification, then copy it into a brief, SOP, or implementation handover.</p>
                  </div>
                  <button
                    onClick={() => handlePromptCopy(agentSpecCopyText, 'agent-spec-review-copy')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-[#00DC51]/40 hover:text-white"
                  >
                    {copiedPromptId === 'agent-spec-review-copy' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                    <span>{copiedPromptId === 'agent-spec-review-copy' ? 'Copied' : 'Copy spec'}</span>
                  </button>
                </div>

                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-xs font-medium leading-relaxed text-white/72">
                  {agentSpecCopyText}
                </pre>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => updateAgentSpecState((current) => ({ ...current, reviewMode: false }))}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-3 text-sm font-bold text-white/75 transition-colors hover:border-white/25 hover:text-white"
                >
                  <RotateCcw size={16} strokeWidth={2.5} />
                  Edit answers
                </button>
                <button
                  onClick={clearAgentSpecAnswers}
                  disabled={!hasUsefulAgentSpecContent}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-3 text-sm font-bold text-white/55 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Clear answers
                </button>
              </div>
            </div>
          )}

          {userInput && userInput !== '{}' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2 text-xs font-bold text-[#00DC51]"
            >
              <CheckCircle size={16} strokeWidth={2.5} />
              <span>Agent specification saved locally</span>
            </motion.div>
          )}
        </motion.div>
  );
}
