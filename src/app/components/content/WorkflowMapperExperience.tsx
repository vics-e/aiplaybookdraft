import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Copy,
  Target,
  X,
} from 'lucide-react';
import type { PlaybookPage } from '../../data/playbookData';
import {
  WORKFLOW_QUADRANTS,
  buildWorkflowMapSummary,
  clampScore,
  formatWorkflowNameList,
  getWorkflowPlotPosition,
  getWorkflowQuadrant,
  parseWorkflowMapState,
  updateSelectedWorkflowIds,
  type WorkflowMapPageState,
} from './workflowMapModel';

interface WorkflowMapperExperienceProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
}

export function WorkflowMapperExperience({ page, userInput, onInputChange }: WorkflowMapperExperienceProps) {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const workflowMapState = parseWorkflowMapState(userInput);
  const workflowMapSummary = buildWorkflowMapSummary(workflowMapState);
  const workflowCandidates = workflowMapState.workflows.filter((workflow) => (
    getWorkflowQuadrant(workflow.repeatability, workflow.judgement) === 'strongAgentCandidate'
  ));
  const selectedPriorityWorkflows = workflowMapState.workflows.filter((workflow) => (
    workflowMapState.selectedWorkflowIds.includes(workflow.id)
  ));
  const workflowWizardStep = Math.min(Math.max(workflowMapState.currentStep, 0), 3);
  const workflowScoringIndex = workflowMapState.workflows.length > 0
    ? Math.min(Math.max(workflowMapState.scoringIndex, 0), workflowMapState.workflows.length - 1)
    : 0;
  const activeWorkflowForScoring = workflowMapState.workflows[workflowScoringIndex];
  const isLastWorkflowScoringStep = workflowMapState.workflows.length > 0 && workflowScoringIndex >= workflowMapState.workflows.length - 1;
  const workflowWizardSteps = ['List workflows', 'Score each', 'See results', 'Prioritise'];
  const scoredWorkflowCount = workflowMapState.workflows.filter((workflow) => (
    workflow.repeatability >= 1
    && workflow.repeatability <= 5
    && workflow.judgement >= 1
    && workflow.judgement <= 5
  )).length;
  const canAdvanceWorkflowListStep = workflowMapState.workflows.length >= 3 && workflowMapState.workflows.length <= 15;
  const canAdvanceWorkflowPriorities = workflowMapState.selectedWorkflowIds.length > 0 && workflowMapState.selectedWorkflowIds.length <= 2;
  const hasReachedWorkflowPriorityLimit = workflowMapState.selectedWorkflowIds.length >= 2;
  const selectedPriorityWorkflowNames = formatWorkflowNameList(selectedPriorityWorkflows.map((workflow) => workflow.name));

  const updateWorkflowMapState = (updater: (current: WorkflowMapPageState) => WorkflowMapPageState) => {
    const nextState = updater(workflowMapState);
    const summary = buildWorkflowMapSummary(nextState);
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
              <ClipboardList className="text-[#00DC51]" size={24} strokeWidth={2.5} />
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

          {workflowWizardStep >= 0 ? (
            <>
              <div className="mb-6 overflow-hidden rounded-[24px] border border-white/10 bg-[#0E0E0E]">
                <div className="relative px-4 pt-5 sm:px-6">
                  <div className="absolute left-10 right-10 top-9 hidden h-px bg-white/10 sm:block" />
                  <div className="grid gap-3 sm:grid-cols-4">
                    {workflowWizardSteps.map((label, index) => {
                      const isActive = workflowWizardStep === index;
                      const isComplete = workflowWizardStep > index;

                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => {
                            if (index === 0 || workflowMapState.workflows.length > 0) {
                              updateWorkflowMapState((current) => ({ ...current, currentStep: index }));
                            }
                          }}
                          className="relative flex flex-col items-center gap-2 pb-4 text-center"
                        >
                          <span className={`flex h-9 w-9 items-center justify-center rounded-[10px] border text-sm font-black transition-colors ${
                            isActive
                              ? 'border-[#00DC51] bg-[#00DC51] text-black'
                              : isComplete
                                ? 'border-[#00DC51]/35 bg-[#00DC51]/10 text-[#00DC51]'
                                : 'border-white/10 bg-[#131313] text-white/40'
                          }`}>
                            {index + 1}
                          </span>
                                  <span className={`text-center text-[12px] font-bold ${isActive ? 'text-[#00DC51]' : 'text-white/55'}`}>{label}</span>
                                </button>
                              );
                            })}
                          </div>
                </div>

                <div className="border-t border-white/8 px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">
                        Step {workflowWizardStep + 1} of 4
                      </p>
                      <h5 className="mt-2 text-lg font-black text-white">{workflowWizardSteps[workflowWizardStep]}</h5>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/60">
                      {workflowMapState.workflows.length} workflow{workflowMapState.workflows.length === 1 ? '' : 's'}
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {workflowWizardStep === 0 && (
                  <motion.div
                    key="workflow-step-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="rounded-[24px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          aria-label="Workflow or process name"
                          type="text"
                          value={workflowMapState.draftName}
                          onChange={(e) => updateWorkflowMapState((current) => ({ ...current, draftName: e.target.value }))}
                          placeholder="Add a workflow or process, e.g. Monthly reporting"
                          className="flex-1 rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const name = workflowMapState.draftName.trim();
                            if (!name || workflowMapState.workflows.length >= 15) {
                              return;
                            }

                            updateWorkflowMapState((current) => ({
                              ...current,
                              workflows: [
                                ...current.workflows,
                                {
                                  id: `workflow-${Date.now()}-${current.workflows.length}`,
                                  name,
                                  repeatability: 3,
                                  judgement: 3,
                                },
                              ],
                              draftName: '',
                              scoringIndex: current.workflows.length === 0 ? 0 : current.scoringIndex,
                            }));
                          }}
                          disabled={!workflowMapState.draftName.trim() || workflowMapState.workflows.length >= 15}
                          className="inline-flex items-center justify-center rounded-2xl bg-[#00DC51] px-5 py-3 text-sm font-black text-black transition-all hover:bg-[#00F25B] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
                        >
                          Add workflow
                        </button>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          {workflowMapState.workflows.length} / 15 workflows added
                        </p>
                        <p className="text-xs font-medium text-white/45">Write down 10-15 common workflows.</p>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#00DC51] transition-all"
                          style={{ width: `${Math.min((workflowMapState.workflows.length / 15) * 100, 100)}%` }}
                        />
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {workflowMapState.workflows.length > 0 ? workflowMapState.workflows.map((workflow) => (
                          <div
                            key={workflow.id}
                            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/82"
                          >
                            <span>{workflow.name}</span>
                            <button
                              type="button"
                              onClick={() => {
                                updateWorkflowMapState((current) => {
                                  const remaining = current.workflows.filter((item) => item.id !== workflow.id);
                                  return {
                                    ...current,
                                    workflows: remaining,
                                    selectedWorkflowIds: current.selectedWorkflowIds.filter((id) => id !== workflow.id),
                                    scoringIndex: Math.min(current.scoringIndex, Math.max(remaining.length - 1, 0)),
                                  };
                                });
                              }}
                              className="text-white/45 transition-colors hover:text-white"
                              aria-label={`Remove ${workflow.name}`}
                            >
                              <X size={14} strokeWidth={3} />
                            </button>
                          </div>
                        )) : (
                          <p className="text-sm font-medium text-white/45">Add at least 3 workflows to build your first map.</p>
                        )}
                      </div>
                      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Getting started</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-white/72">Add at least 3 workflows to build your first map. Continue unlocks once you have 3.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {workflowWizardStep === 1 && (
                  <motion.div
                    key="workflow-step-score"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="rounded-[24px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6">
                      {activeWorkflowForScoring ? (
                        <>
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">
                                Workflow {workflowScoringIndex + 1} of {workflowMapState.workflows.length}
                              </p>
                              <h5 className="mt-2 text-2xl font-black text-white">{activeWorkflowForScoring.name}</h5>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/55">
                              {scoredWorkflowCount} scored
                            </div>
                          </div>

                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-[#00DC51] transition-all"
                              style={{ width: `${workflowMapState.workflows.length > 0 ? ((workflowScoringIndex + 1) / workflowMapState.workflows.length) * 100 : 0}%` }}
                            />
                          </div>

                          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p className="text-sm font-medium leading-relaxed text-white/70">
                              Score one workflow at a time. Higher repeatability means the process happens often and follows consistent steps. Higher judgement means it needs more professional interpretation.
                            </p>
                          </div>

                          <div className="mt-5 space-y-4">
                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-white/82">Repeatability</span>
                                <span className="text-base font-black text-[#00DC51]">{activeWorkflowForScoring.repeatability}/5</span>
                              </div>
                              <div className="grid grid-cols-5 gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <button
                                    key={`repeatability-${value}`}
                                    type="button"
                                    onClick={() => {
                                      updateWorkflowMapState((current) => ({
                                        ...current,
                                        workflows: current.workflows.map((item) => item.id === activeWorkflowForScoring.id ? { ...item, repeatability: value } : item),
                                      }));
                                    }}
                                    className={`h-11 rounded-lg text-sm font-black transition-colors ${
                                      value <= activeWorkflowForScoring.repeatability
                                        ? 'bg-[#00DC51] text-black'
                                        : 'bg-[#1A1A1A] text-white/25'
                                    }`}
                                  >
                                    {value}
                                  </button>
                                ))}
                              </div>
                              <p className="mt-3 text-sm font-medium text-white/55">1 = rare/ad-hoc, 5 = daily and highly repeatable.</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-white/82">Judgement required</span>
                                <span className="text-base font-black text-[#FFB800]">{activeWorkflowForScoring.judgement}/5</span>
                              </div>
                              <div className="grid grid-cols-5 gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <button
                                    key={`judgement-${value}`}
                                    type="button"
                                    onClick={() => {
                                      updateWorkflowMapState((current) => ({
                                        ...current,
                                        workflows: current.workflows.map((item) => item.id === activeWorkflowForScoring.id ? { ...item, judgement: value } : item),
                                      }));
                                    }}
                                    className={`h-11 rounded-lg text-sm font-black transition-colors ${
                                      value <= activeWorkflowForScoring.judgement
                                        ? 'bg-[#FFB800] text-black'
                                        : 'bg-[#1A1A1A] text-white/25'
                                    }`}
                                  >
                                    {value}
                                  </button>
                                ))}
                              </div>
                              <p className="mt-3 text-sm font-medium text-white/55">1 = pure data entry, 5 = deep professional interpretation.</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-white/45">Add workflows first to begin scoring.</p>
                      )}
                    </div>

                    <div className="rounded-[20px] border border-white/10 bg-[#111111] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Workflows in this step</p>
                      {workflowMapState.workflows.length > 1 && (
                        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                          {workflowMapState.workflows.map((workflow, index) => (
                            <button
                              key={workflow.id}
                              type="button"
                              onClick={() => updateWorkflowMapState((current) => ({ ...current, scoringIndex: index }))}
                              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                                workflowScoringIndex === index
                                  ? 'border-[#00DC51]/40 bg-[#00DC51]/10 text-white'
                                  : 'border-white/10 bg-black/20 text-white/70 hover:border-white/15 hover:text-white'
                              }`}
                            >
                              <span className="font-semibold">{workflow.name}</span>
                              <span className="text-xs font-black text-white/45">{index + 1}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {workflowWizardStep === 2 && (
                  <motion.div
                    key="workflow-step-map"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="rounded-[24px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                          <h5 className="text-lg font-black text-white">Workflow map</h5>
                          <p className="mt-1 text-sm font-medium text-white/72">High repeatability and low judgement point to the strongest starting agents.</p>
                        </div>
                        <div className="rounded-full border border-[#00DC51]/25 bg-[#00DC51]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#00DC51]">
                          {workflowCandidates.length} candidates
                        </div>
                      </div>

                      <div className="relative h-[280px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] sm:h-[300px]">
                        <div className="absolute inset-y-10 left-1/2 w-px bg-white/10" />
                        <div className="absolute inset-x-6 top-1/2 h-px bg-white/10 sm:inset-x-8" />
                        <div className="absolute left-4 top-4 max-w-[38%] text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFD84D] sm:text-[11px]">Human-led + assistant</div>
                        <div className="absolute right-4 top-4 max-w-[38%] text-right text-[10px] font-bold uppercase tracking-[0.16em] text-[#00DC51] sm:text-[11px]">Strong agent candidate</div>
                        <div className="absolute bottom-5 left-4 max-w-[38%] text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF8B8B] sm:text-[11px]">Fully human-led</div>
                        <div className="absolute bottom-5 right-4 max-w-[38%] text-right text-[10px] font-bold uppercase tracking-[0.16em] text-[#7AB8FF] sm:text-[11px]">Assistant task</div>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                          Repeatability →
                        </div>
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                          Judgement →
                        </div>

                        {workflowMapState.workflows.map((workflow) => {
                          const quadrant = WORKFLOW_QUADRANTS[getWorkflowQuadrant(workflow.repeatability, workflow.judgement)];
                          const { left, top } = getWorkflowPlotPosition(workflow);

                          return (
                            <div
                              key={workflow.id}
                              title={workflow.name}
                              className={`absolute flex max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border bg-black/90 px-3 py-2 text-[11px] font-black text-white shadow-lg sm:max-w-[11rem] ${quadrant.borderClass}`}
                              style={{ left: `${left}%`, top: `${top}%` }}
                            >
                              <span className="block truncate">{workflow.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {Object.entries(WORKFLOW_QUADRANTS).map(([key, quadrant]) => {
                        const matchingWorkflows = workflowMapState.workflows.filter((workflow) => (
                          getWorkflowQuadrant(workflow.repeatability, workflow.judgement) === key
                        ));

                        return (
                          <div key={key} className={`rounded-2xl border p-4 ${quadrant.borderClass} ${quadrant.bgClass}`}>
                            <p className={`text-xs font-black uppercase tracking-[0.16em] ${quadrant.colorClass}`}>{quadrant.label}</p>
                            <p className="mt-2 text-sm font-semibold text-white">{matchingWorkflows.length} workflow{matchingWorkflows.length === 1 ? '' : 's'}</p>
                            <p className="mt-2 text-xs font-medium leading-relaxed text-white/55">{quadrant.guidance}</p>
                            {matchingWorkflows.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {matchingWorkflows.map((workflow) => (
                                  <span
                                    key={workflow.id}
                                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] font-semibold text-white/72"
                                  >
                                    {workflow.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {workflowWizardStep === 3 && (
                  <motion.div
                    key="workflow-step-prioritise"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    <div className="rounded-[24px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6">
                      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Step 4 of 4</p>
                          <h5 className="mt-2 text-2xl font-black text-white">Choose 1 to 2 priority workflows</h5>
                          <p className="mt-3 max-w-3xl text-base font-medium leading-relaxed text-white/82">
                            These workflows scored high on repeatability and low on judgement. Pick 1-2 to start with based on impact, data availability, and team readiness.
                          </p>
                        </div>
                        <div className="rounded-full border border-[#00DC51]/25 bg-[#00DC51]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#00DC51]">
                          {workflowMapState.selectedWorkflowIds.length} selected
                        </div>
                      </div>

                      {workflowCandidates.length > 0 ? (
                        <div className="space-y-4">
                          {workflowCandidates.map((workflow) => {
                            const quadrant = WORKFLOW_QUADRANTS.strongAgentCandidate;
                            const isSelected = workflowMapState.selectedWorkflowIds.includes(workflow.id);
                            const isDisabled = !isSelected && hasReachedWorkflowPriorityLimit;

                            return (
                              <button
                                key={workflow.id}
                                type="button"
                                disabled={isDisabled}
                                aria-pressed={isSelected}
                                onClick={() => {
                                  updateWorkflowMapState((current) => ({
                                    ...current,
                                    selectedWorkflowIds: updateSelectedWorkflowIds(current.selectedWorkflowIds, workflow.id),
                                  }));
                                }}
                                className={`w-full rounded-[22px] border p-5 text-left transition-all disabled:cursor-not-allowed ${
                                  isSelected
                                    ? 'border-[#00DC51]/45 bg-[#0F2417] shadow-[0_0_0_1px_rgba(0,220,81,0.1)]'
                                    : isDisabled
                                      ? 'border-white/8 bg-black/20 opacity-60'
                                      : 'border-white/10 bg-black/20 hover:border-white/18 hover:bg-white/[0.03]'
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <h6 className="text-lg font-black text-white">{workflow.name}</h6>
                                      <span className={`rounded-full bg-[#00DC51]/12 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] ${quadrant.colorClass}`}>
                                        {quadrant.label}
                                      </span>
                                    </div>
                                    <p className="mt-3 text-sm font-semibold text-white">
                                      Repeatability {workflow.repeatability}/5 · Judgement {workflow.judgement}/5
                                    </p>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-white/72">
                                      Start here if the workflow already follows consistent steps, the data is accessible, and the team can review the output reliably.
                                    </p>
                                  </div>
                                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border-2 transition-colors ${
                                    isSelected
                                      ? 'border-[#00DC51] bg-[#00DC51] text-black'
                                      : 'border-white/18 bg-transparent text-transparent'
                                  }`}>
                                    <Check size={18} strokeWidth={3.2} />
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-white/12 bg-black/20 p-4 text-sm font-medium leading-relaxed text-white/72">
                          No strong agent candidates are available yet. Go back to the scoring step and increase repeatability or lower judgement on one or two workflows to create a starting shortlist.
                        </div>
                      )}
                      {workflowCandidates.length > 0 && (
                        <p className="mt-4 text-sm font-medium text-white/62">
                          {hasReachedWorkflowPriorityLimit
                            ? 'You have selected the maximum of 2 workflows. Deselect one to choose a different starting point.'
                            : 'Select up to 2 workflows. Your starting point appears below once you choose one.'}
                        </p>
                      )}

                      {selectedPriorityWorkflows.length > 0 && (
                        <div className="mt-6 rounded-[22px] border border-[#00DC51]/20 bg-[#102016] p-5 sm:p-6">
                          <p className="text-lg font-black text-[#00DC51]">Your starting point</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {selectedPriorityWorkflows.map((workflow) => (
                              <span
                                key={workflow.id}
                                className="rounded-full border border-[#00DC51]/18 bg-white/[0.03] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                              >
                                {workflow.name}
                              </span>
                            ))}
                          </div>
                          <p className="mt-4 text-base font-medium leading-relaxed text-white/88">
                            Start with {selectedPriorityWorkflowNames}. Map the end-to-end steps, identify the data inputs, and run a small test with one team member before scaling.
                          </p>
                        </div>
                      )}

                      <details className="group mt-6 rounded-[20px] border border-white/10 bg-black/20">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left">
                          <div>
                            <p className="text-sm font-black text-white">Copy summary</p>
                            <p className="mt-1 text-sm font-medium text-white/62">Keep this secondary and use it when you want a portable page 24 summary.</p>
                          </div>
                          <ChevronDown className="transition-transform group-open:rotate-180" size={18} strokeWidth={2.8} />
                        </summary>

                        <div className="border-t border-white/8 px-4 pb-4 pt-4">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => handlePromptCopy(workflowMapSummary.copyText, 'workflow-map-summary')}
                              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-colors hover:border-[#00DC51]/40"
                            >
                              {copiedPromptId === 'workflow-map-summary' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                              <span>{copiedPromptId === 'workflow-map-summary' ? 'Copied' : 'Copy summary'}</span>
                            </button>
                          </div>

                          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#050805] p-4 text-xs font-medium leading-relaxed text-white/88">
                            {workflowMapSummary.copyText}
                          </pre>
                        </div>
                      </details>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (workflowWizardStep === 1 && workflowScoringIndex > 0) {
                      updateWorkflowMapState((current) => ({ ...current, scoringIndex: Math.max(current.scoringIndex - 1, 0) }));
                      return;
                    }

                    updateWorkflowMapState((current) => ({ ...current, currentStep: Math.max(current.currentStep - 1, 0) }));
                  }}
                  disabled={workflowWizardStep === 0}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white/72 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Back
                </button>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (workflowWizardStep === 0) {
                        if (!canAdvanceWorkflowListStep) {
                          return;
                        }

                        updateWorkflowMapState((current) => ({
                          ...current,
                          currentStep: 1,
                          scoringIndex: 0,
                        }));
                        return;
                      }

                      if (workflowWizardStep === 1) {
                        updateWorkflowMapState((current) => {
                          if (current.scoringIndex < current.workflows.length - 1) {
                            return { ...current, scoringIndex: current.scoringIndex + 1 };
                          }

                          return { ...current, currentStep: 2 };
                        });
                        return;
                      }

                      if (workflowWizardStep === 2) {
                        updateWorkflowMapState((current) => ({ ...current, currentStep: 3 }));
                      }
                    }}
                    disabled={
                      (workflowWizardStep === 0 && !canAdvanceWorkflowListStep)
                      || (workflowWizardStep === 1 && workflowMapState.workflows.length === 0)
                      || (workflowWizardStep === 3 && !canAdvanceWorkflowPriorities)
                    }
                    className="inline-flex items-center justify-center rounded-full bg-[#00DC51] px-5 py-2.5 text-sm font-black text-black transition-all hover:bg-[#00F25B] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
                  >
                    {workflowWizardStep === 1
                      ? (isLastWorkflowScoringStep ? 'See results' : 'Next')
                      : workflowWizardStep < 3
                        ? 'Next'
                        : 'Ready to use'}
                  </button>
                  {workflowWizardStep === 0 && !canAdvanceWorkflowListStep && (
                    <p className="text-xs font-medium text-white/45">Continue unlocks once you have 3 workflows.</p>
                  )}
                  {workflowWizardStep === 3 && !canAdvanceWorkflowPriorities && (
                    <p className="text-xs font-medium text-white/45">Select 1 or 2 strong candidates to complete the exercise.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/12 bg-black/30 p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    aria-label="Workflow or process name"
                    type="text"
                    value={workflowMapState.draftName}
                    onChange={(e) => updateWorkflowMapState((current) => ({ ...current, draftName: e.target.value }))}
                    placeholder="Add a workflow or process, e.g. Monthly reporting"
                    className="flex-1 rounded-2xl border-2 border-white/15 bg-black/40 px-4 py-3 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                  />
                  <button
                    onClick={() => {
                      const name = workflowMapState.draftName.trim();
                      if (!name || workflowMapState.workflows.length >= 15) {
                        return;
                      }

                      updateWorkflowMapState((current) => ({
                        ...current,
                        workflows: [
                          ...current.workflows,
                          {
                            id: `workflow-${Date.now()}-${current.workflows.length}`,
                            name,
                            repeatability: 3,
                            judgement: 3,
                          },
                        ],
                        draftName: '',
                        scoringIndex: current.workflows.length,
                      }));
                    }}
                    disabled={!workflowMapState.draftName.trim() || workflowMapState.workflows.length >= 15}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#00DC51] px-5 py-3 text-sm font-black text-black transition-all hover:bg-[#00F25B] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
                  >
                    Add workflow
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                    {workflowMapState.workflows.length} / 15 workflows mapped
                  </p>
                  <p className="text-xs font-medium text-white/45">Score repeatability and judgement for each one.</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {workflowMapState.workflows.length > 0 ? workflowMapState.workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80"
                    >
                      <span>{workflow.name}</span>
                      <button
                        onClick={() => {
                          updateWorkflowMapState((current) => {
                            const remaining = current.workflows.filter((item) => item.id !== workflow.id);
                            return {
                              ...current,
                              workflows: remaining,
                              selectedWorkflowIds: current.selectedWorkflowIds.filter((id) => id !== workflow.id),
                              scoringIndex: Math.min(current.scoringIndex, Math.max(remaining.length - 1, 0)),
                            };
                          });
                        }}
                        className="text-white/45 transition-colors hover:text-white"
                        aria-label={`Remove ${workflow.name}`}
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                    </div>
                  )) : (
                    <p className="text-sm font-medium text-white/45">Add 5 to 15 workflows to build your map.</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {workflowMapState.workflows.map((workflow, index) => {
                  const quadrantKey = getWorkflowQuadrant(workflow.repeatability, workflow.judgement);
                  const quadrant = WORKFLOW_QUADRANTS[quadrantKey];
                  const isSelected = workflowMapState.selectedWorkflowIds.includes(workflow.id);
                  const canSelect = quadrantKey === 'strongAgentCandidate';

                  return (
                    <div key={workflow.id} className={`rounded-3xl border p-5 ${quadrant.borderClass} ${quadrant.bgClass}`}>
                      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-black/35 text-xs font-black text-white/70">
                              {index + 1}
                            </span>
                            <h5 className="text-base font-black text-white">{workflow.name}</h5>
                          </div>
                          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${quadrant.colorClass}`}>
                            {quadrant.label}
                          </p>
                          <p className="mt-1 text-xs font-medium text-white/55">{quadrant.guidance}</p>
                        </div>

                        <label className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
                          canSelect
                            ? isSelected
                              ? 'border-[#00DC51] bg-[#00DC51] text-black'
                              : 'border-white/15 bg-black/30 text-white/75'
                            : 'border-white/10 bg-black/20 text-white/35'
                        }`}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={!canSelect}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              updateWorkflowMapState((current) => ({
                                ...current,
                                selectedWorkflowIds: checked
                                  ? [...current.selectedWorkflowIds.filter((id) => id !== workflow.id), workflow.id].slice(0, 2)
                                  : current.selectedWorkflowIds.filter((id) => id !== workflow.id),
                              }));
                            }}
                            className="sr-only"
                          />
                          <Target size={14} strokeWidth={2.5} />
                          <span>{canSelect ? 'Prioritise this workflow' : 'Not a first agent candidate'}</span>
                        </label>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Repeatability</span>
                            <span className="text-sm font-black text-[#00DC51]">{workflow.repeatability}/5</span>
                          </div>
                          <input
                            aria-label={`${workflow.name}: repeatability`}
                            type="range"
                            min={1}
                            max={5}
                            step={1}
                            value={workflow.repeatability}
                            onChange={(e) => {
                              const nextValue = clampScore(Number(e.target.value));
                              updateWorkflowMapState((current) => ({
                                ...current,
                                workflows: current.workflows.map((item) => item.id === workflow.id ? { ...item, repeatability: nextValue } : item),
                              }));
                            }}
                            className="w-full accent-[#00DC51]"
                          />
                          <p className="mt-2 text-xs font-medium text-white/45">1 = rare or ad hoc, 5 = frequent and highly repeatable.</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Judgement required</span>
                            <span className="text-sm font-black text-[#00DC51]">{workflow.judgement}/5</span>
                          </div>
                          <input
                            aria-label={`${workflow.name}: judgement required`}
                            type="range"
                            min={1}
                            max={5}
                            step={1}
                            value={workflow.judgement}
                            onChange={(e) => {
                              const nextValue = clampScore(Number(e.target.value));
                              updateWorkflowMapState((current) => ({
                                ...current,
                                workflows: current.workflows.map((item) => item.id === workflow.id ? { ...item, judgement: nextValue } : item),
                              }));
                            }}
                            className="w-full accent-[#00DC51]"
                          />
                          <p className="mt-2 text-xs font-medium text-white/45">1 = low judgement, 5 = high professional interpretation.</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/12 bg-[#050805] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h5 className="text-lg font-black text-white">Workflow map</h5>
                    <p className="mt-1 text-sm font-medium text-white/55">High repeatability and low judgement point to the strongest starting agents.</p>
                  </div>
                  <div className="rounded-full border border-[#00DC51]/25 bg-[#00DC51]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#00DC51]">
                    {workflowCandidates.length} candidates
                  </div>
                </div>

                <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
                  <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
                  <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                  <div className="absolute left-4 top-4 max-w-[38%] text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFD84D]">Human-led + assistant</div>
                  <div className="absolute right-4 top-4 max-w-[38%] text-right text-[11px] font-bold uppercase tracking-[0.14em] text-[#00DC51]">Strong agent candidate</div>
                  <div className="absolute bottom-4 left-4 max-w-[38%] text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF8B8B]">Fully human-led</div>
                  <div className="absolute bottom-4 right-4 max-w-[38%] text-right text-[11px] font-bold uppercase tracking-[0.14em] text-[#7AB8FF]">Assistant task</div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Repeatability →
                  </div>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Judgement →
                  </div>

                  {workflowMapState.workflows.map((workflow) => {
                    const quadrant = WORKFLOW_QUADRANTS[getWorkflowQuadrant(workflow.repeatability, workflow.judgement)];
                    const left = ((workflow.repeatability - 1) / 4) * 100;
                    const top = (1 - ((workflow.judgement - 1) / 4)) * 100;
                    const isSelected = workflowMapState.selectedWorkflowIds.includes(workflow.id);

                    return (
                      <button
                        key={workflow.id}
                        onClick={() => {
                          if (getWorkflowQuadrant(workflow.repeatability, workflow.judgement) !== 'strongAgentCandidate') {
                            return;
                          }

                          updateWorkflowMapState((current) => {
                            const isCurrentlySelected = current.selectedWorkflowIds.includes(workflow.id);
                            return {
                              ...current,
                              selectedWorkflowIds: isCurrentlySelected
                                ? current.selectedWorkflowIds.filter((id) => id !== workflow.id)
                                : [...current.selectedWorkflowIds.filter((id) => id !== workflow.id), workflow.id].slice(0, 2),
                            };
                          });
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-3 py-2 text-[11px] font-black shadow-lg transition-all ${
                          isSelected
                            ? 'border-[#00DC51] bg-[#00DC51] text-black shadow-[#00DC51]/40'
                            : `bg-black/85 text-white ${quadrant.borderClass}`
                        }`}
                        style={{ left: `${left}%`, top: `${top}%` }}
                      >
                        {workflow.name}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {Object.entries(WORKFLOW_QUADRANTS).map(([key, quadrant]) => {
                    const count = workflowMapState.workflows.filter((workflow) => (
                      getWorkflowQuadrant(workflow.repeatability, workflow.judgement) === key
                    )).length;

                    return (
                      <div key={key} className={`rounded-2xl border p-3 ${quadrant.borderClass} ${quadrant.bgClass}`}>
                        <p className={`text-xs font-black uppercase tracking-[0.16em] ${quadrant.colorClass}`}>{quadrant.label}</p>
                        <p className="mt-1 text-sm font-semibold text-white">{count} workflow{count === 1 ? '' : 's'}</p>
                        <p className="mt-1 text-xs font-medium text-white/50">{quadrant.guidance}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h5 className="text-lg font-black text-white">Copyable workflow summary</h5>
                    <p className="mt-1 text-sm font-medium text-white/55">Use this output to decide which workflows to test first.</p>
                  </div>
                  <button
                    onClick={() => handlePromptCopy(workflowMapSummary.copyText, 'workflow-map-summary')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-[#00DC51]/40 hover:text-white"
                  >
                    {copiedPromptId === 'workflow-map-summary' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                    <span>{copiedPromptId === 'workflow-map-summary' ? 'Copied' : 'Copy summary'}</span>
                  </button>
                </div>

                <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#050805] p-4 text-xs font-medium leading-relaxed text-white/72">
                  {workflowMapSummary.copyText}
                </pre>
              </div>
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
              <span role="status" aria-live="polite" aria-atomic="true">Workflow map saved locally</span>
            </motion.div>
          )}
        </motion.div>
  );
}
