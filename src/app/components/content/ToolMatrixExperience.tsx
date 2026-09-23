import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  CheckCircle,
  ChevronDown,
  Copy,
  Bot,
  Database,
  Lock,
  MessageSquare,
  Shield,
} from 'lucide-react';
import type { PlaybookPage } from '../../data/playbookData';
import {
  buildToolMatrixSummary,
  parseToolMatrixRows,
  parseToolMatrixState,
  type ToolMatrixPageState,
} from './activityModels';

interface ToolMatrixExperienceProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
}

export function ToolMatrixExperience({ page, userInput, onInputChange }: ToolMatrixExperienceProps) {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const defaultToolMatrixRows = parseToolMatrixRows(page.content);
  const toolMatrixState = parseToolMatrixState(userInput, defaultToolMatrixRows);
  const activeToolMatrixRow = toolMatrixState.rows.find((row) => row.id === toolMatrixState.activeRowId)
    || toolMatrixState.rows[0];
  const toolMatrixSummary = buildToolMatrixSummary(toolMatrixState.rows);

  const updateToolMatrixState = (updater: (current: ToolMatrixPageState) => ToolMatrixPageState) => {
    const nextState = updater(toolMatrixState);
    const summary = buildToolMatrixSummary(nextState.rows);
    onInputChange(JSON.stringify({
      ...nextState,
      'question-0': summary.question0,
      'question-1': summary.question1,
      'question-2': summary.question2,
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
              <Shield className="text-[#00DC51]" size={24} strokeWidth={2.5} />
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

          <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
            <aside className="space-y-3 rounded-[24px] border border-white/10 bg-[#101010] p-4 sm:p-5">
              <div>
                <h5 className="text-lg font-black text-white">Tool boundaries</h5>
                <p className="mt-1 text-sm font-medium text-white/55">Select a row to define tasks, data boundaries, and review requirements.</p>
              </div>

              <div className="space-y-2">
                {toolMatrixState.rows.map((row, index) => {
                  const icons = [MessageSquare, Shield, Database, Bot];
                  const Icon = icons[index] || Lock;

                  return (
                    <button
                    key={row.id}
                    onClick={() => updateToolMatrixState((current) => ({ ...current, activeRowId: row.id }))}
                    className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                      activeToolMatrixRow?.id === row.id
                          ? 'border-white/14 bg-white/[0.04]'
                          : 'border-white/10 bg-black/20 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl ${
                          activeToolMatrixRow?.id === row.id ? 'bg-[#00DC51]/10 text-[#00DC51]' : 'bg-black/35 text-white/60'
                        }`}>
                          <Icon size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white">{row.toolName || 'Untitled tool'}</p>
                          <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-white/50">
                            {row.allowedTasks || 'Add the tasks this tool is allowed to support.'}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="space-y-5">
              {activeToolMatrixRow && (
                <div className="rounded-[24px] border border-white/10 bg-[#101010] p-5 sm:p-6">
                  <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Matrix row</p>
                      <h5 className="mt-2 text-2xl font-black text-white">{activeToolMatrixRow.toolName}</h5>
                      <p className="mt-2 text-sm font-medium text-white/55">Define exactly what this tool can do, what data it can use, and where review stays mandatory.</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="tool-matrix-name" className="text-sm font-bold text-white">Tool or category name</label>
                      <input
                        id="tool-matrix-name"
                        type="text"
                        value={activeToolMatrixRow.toolName}
                        onChange={(e) => {
                          const value = e.target.value;
                          updateToolMatrixState((current) => ({
                            ...current,
                            rows: current.rows.map((row) => row.id === activeToolMatrixRow.id ? { ...row, toolName: value } : row),
                          }));
                        }}
                        className="w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="tool-matrix-allowed-tasks" className="text-sm font-bold text-white">Allowed tasks</label>
                      <textarea
                        id="tool-matrix-allowed-tasks"
                        value={activeToolMatrixRow.allowedTasks}
                        onChange={(e) => {
                          const value = e.target.value;
                          updateToolMatrixState((current) => ({
                            ...current,
                            rows: current.rows.map((row) => row.id === activeToolMatrixRow.id ? { ...row, allowedTasks: value } : row),
                          }));
                        }}
                        placeholder="Define the tasks this tool is allowed to support."
                        className="min-h-[110px] w-full rounded-2xl border border-white/12 bg-black/25 p-4 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="tool-matrix-data-boundaries" className="text-sm font-bold text-white">Data boundaries</label>
                        <textarea
                          id="tool-matrix-data-boundaries"
                          value={activeToolMatrixRow.dataBoundaries}
                          onChange={(e) => {
                            const value = e.target.value;
                            updateToolMatrixState((current) => ({
                              ...current,
                              rows: current.rows.map((row) => row.id === activeToolMatrixRow.id ? { ...row, dataBoundaries: value } : row),
                            }));
                          }}
                          placeholder="What data can this tool use?"
                          className="min-h-[110px] w-full rounded-2xl border border-white/12 bg-black/25 p-4 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="tool-matrix-review-required" className="text-sm font-bold text-white">Review required</label>
                        <textarea
                          id="tool-matrix-review-required"
                          value={activeToolMatrixRow.reviewRequired}
                          onChange={(e) => {
                            const value = e.target.value;
                            updateToolMatrixState((current) => ({
                              ...current,
                              rows: current.rows.map((row) => row.id === activeToolMatrixRow.id ? { ...row, reviewRequired: value } : row),
                            }));
                          }}
                          placeholder="Explain where review or approval is mandatory."
                          className="min-h-[110px] w-full rounded-2xl border border-white/12 bg-black/25 p-4 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <details className="group rounded-[24px] border border-white/10 bg-[#101010] p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <div>
                    <h5 className="text-lg font-black text-white">Preview & copy</h5>
                    <p className="mt-1 text-sm font-medium text-white/55">Use this output for internal guidance, policy notes, or staff training material.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-xs font-bold text-white/72 transition-colors group-hover:border-white/20">
                    <span>Show preview</span>
                    <ChevronDown className="transition-transform group-open:rotate-180" size={14} strokeWidth={2.8} />
                  </div>
                </summary>

                <div className="mt-4 border-t border-white/8 pt-4">
                  <div className="mb-4 flex justify-end">
                    <button
                      onClick={() => handlePromptCopy(toolMatrixSummary.copyText, 'tool-matrix-summary')}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-[#00DC51]/40 hover:text-white"
                    >
                      {copiedPromptId === 'tool-matrix-summary' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                      <span>{copiedPromptId === 'tool-matrix-summary' ? 'Copied' : 'Copy matrix'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/25 p-4 text-xs font-medium leading-relaxed text-white/72">
                    {toolMatrixSummary.copyText}
                  </pre>
                </div>
              </details>
            </div>
          </div>

          {userInput && userInput !== '{}' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2 text-xs font-bold text-[#00DC51]"
            >
              <CheckCircle size={16} strokeWidth={2.5} />
              <span role="status" aria-live="polite" aria-atomic="true">Tool usage matrix updated</span>
            </motion.div>
          )}
        </motion.div>
  );
}
