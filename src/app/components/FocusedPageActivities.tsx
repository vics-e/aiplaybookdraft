import React from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle,
  Clock,
  Copy,
  HelpCircle,
  MessageSquare,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  TrendingDown,
  UserCheck,
} from 'lucide-react';
import type { Activity } from '../data/playbookData';

interface FocusedPageActivityProps {
  activity: Activity;
  userInput: string;
  onInputChange: (value: string) => void;
}

type SavedInputs = Record<string, any>;

const fieldClassName = 'w-full rounded-xl border-2 border-white/20 bg-black/45 px-4 py-3 text-sm font-medium text-white placeholder-white/35 transition-colors focus:border-[#00DC51] focus:outline-none';
const textareaClassName = `${fieldClassName} min-h-[112px] resize-y`;

function parseInputs(userInput: string): SavedInputs {
  if (!userInput) return {};

  try {
    const parsed = JSON.parse(userInput);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function saveInputs(onInputChange: (value: string) => void, current: SavedInputs, patch: SavedInputs) {
  onInputChange(JSON.stringify({ ...current, ...patch }));
}

function SavedStatus({ visible, label = 'Answers saved locally' }: { visible: boolean; label?: string }) {
  if (!visible) return null;

  return (
    <div className="flex items-center gap-2 text-xs font-bold text-[#00DC51]" role="status">
      <CheckCircle size={16} strokeWidth={2.5} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function scoreLabel(score: number) {
  if (score === 4) return 'Strong fit';
  if (score === 3) return 'Promising fit';
  if (score === 2) return 'Needs review';
  return 'Early assessment';
}

export function AgentCandidateActivity({ activity, userInput, onInputChange }: FocusedPageActivityProps) {
  const saved = parseInputs(userInput);
  const candidates = (activity.checkboxTasks || []).map((task, index) => {
    const data = saved[`task-${index}`] || { label: '', checks: [] };
    const checks = Array.isArray(data.checks) ? data.checks : [];
    return {
      index,
      task,
      label: typeof data.label === 'string' ? data.label : '',
      checks,
      score: task.criteria.filter((criterion) => checks.includes(criterion)).length,
    };
  });
  const namedCandidates = candidates.filter((candidate) => candidate.label.trim());
  const topScore = namedCandidates.length ? Math.max(...namedCandidates.map((candidate) => candidate.score)) : -1;
  const strongest = namedCandidates.filter((candidate) => candidate.score === topScore && topScore >= 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {candidates.map(({ index, task, label, checks, score }) => {
          const taskKey = `task-${index}`;
          const isStrongest = Boolean(label.trim()) && score === topScore;
          return (
            <fieldset
              key={taskKey}
              className={`rounded-2xl border-2 p-4 transition-colors ${isStrongest ? 'border-[#00DC51] bg-[#00DC51]/10 shadow-lg shadow-[#00DC51]/10' : 'border-white/12 bg-black/25'}`}
            >
              <legend className="sr-only">Workflow candidate {index + 1}</legend>
              <div className="mb-4 flex items-start justify-between gap-3">
                <label className="min-w-0 flex-1" htmlFor={`agent-candidate-${index}`}>
                  <span className="sr-only">Workflow candidate {index + 1} name</span>
                  <input
                    id={`agent-candidate-${index}`}
                    value={label}
                    onChange={(event) => saveInputs(onInputChange, saved, {
                      [taskKey]: { label: event.target.value, checks },
                    })}
                    placeholder={task.label}
                    className={`${fieldClassName} font-bold`}
                  />
                </label>
                <div className="flex-shrink-0 text-right" aria-label={`${score} of 4 criteria met, ${scoreLabel(score)}`}>
                  <div className="text-lg font-black text-[#00DC51]">{score}/4</div>
                  <div className="text-[10px] font-black uppercase tracking-wide text-white/55">{scoreLabel(score)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {task.criteria.map((criterion, criterionIndex) => {
                  const checked = checks.includes(criterion);
                  const checkboxId = `agent-candidate-${index}-criterion-${criterionIndex}`;
                  return (
                    <label
                      key={criterion}
                      htmlFor={checkboxId}
                      className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors ${checked ? 'border-[#00DC51]/45 bg-[#00DC51]/10 text-white' : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-[#00DC51]/35'}`}
                    >
                      <input
                        id={checkboxId}
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          const nextChecks = event.target.checked
                            ? [...checks, criterion]
                            : checks.filter((item: string) => item !== criterion);
                          saveInputs(onInputChange, saved, { [taskKey]: { label, checks: nextChecks } });
                        }}
                        className="sr-only"
                      />
                      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${checked ? 'border-[#00DC51] bg-[#00DC51]' : 'border-white/30 bg-black/30'}`} aria-hidden="true">
                        {checked && <Check size={13} strokeWidth={3} className="text-black" />}
                      </span>
                      <span className="text-xs font-semibold leading-relaxed">{criterion}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[#00DC51]/45 bg-black/30 p-4 sm:p-5" aria-live="polite">
        <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">
          <Sparkles size={16} aria-hidden="true" />
          Strongest candidate
        </div>
        {strongest.length ? (
          <p className="text-sm font-bold leading-relaxed text-white">
            {strongest.map((candidate) => candidate.label.trim()).join(' · ')} — {topScore}/4 criteria met ({scoreLabel(topScore)}).
          </p>
        ) : (
          <p className="text-sm font-medium leading-relaxed text-white/60">Name a workflow and complete its four criteria to see the strongest candidate.</p>
        )}
      </div>
      <SavedStatus visible={namedCandidates.length > 0 || candidates.some((candidate) => candidate.score > 0)} label="Candidate assessment saved locally" />
    </div>
  );
}

const CORE_WORKFLOWS = [
  'Quarterly Update Preparation',
  'Period-End Preparation',
  'Client Onboarding',
  'Client Chaser (Outstanding Items)',
];

export function StartingWorkflowActivity({ activity, userInput, onInputChange }: FocusedPageActivityProps) {
  const [copied, setCopied] = React.useState(false);
  const saved = parseInputs(userInput);
  const selected = typeof saved['question-0'] === 'string' ? saved['question-0'] : '';
  const rationale = typeof saved['question-1'] === 'string' ? saved['question-1'] : '';
  const review = typeof saved['question-2'] === 'string' ? saved['question-2'] : '';

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-white/90">1. {activity.questions?.[0]}</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CORE_WORKFLOWS.map((workflow, index) => {
            const active = selected === workflow;
            return (
              <label key={workflow} className={`flex min-h-[76px] cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${active ? 'border-[#00DC51] bg-[#00DC51]/12 shadow-lg shadow-[#00DC51]/10' : 'border-white/12 bg-black/25 hover:border-[#00DC51]/40'}`}>
                <input
                  type="radio"
                  name="starting-workflow"
                  value={workflow}
                  checked={active}
                  onChange={() => saveInputs(onInputChange, saved, { 'question-0': workflow })}
                  className="sr-only"
                />
                <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-sm font-black ${active ? 'bg-[#00DC51] text-black' : 'border border-white/20 bg-white/5 text-white/65'}`} aria-hidden="true">{index + 1}</span>
                <span className="text-sm font-bold leading-snug text-white">{workflow}</span>
                {active && <CheckCircle className="ml-auto flex-shrink-0 text-[#00DC51]" size={18} aria-hidden="true" />}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[rationale, review].map((value, index) => {
          const questionIndex = index + 1;
          return (
            <label key={questionIndex} htmlFor={`starting-workflow-question-${questionIndex}`} className="rounded-2xl border border-white/12 bg-black/25 p-4">
              <span className="mb-2 block text-sm font-bold leading-relaxed text-white/90">{questionIndex + 1}. {activity.questions?.[questionIndex]}</span>
              <textarea
                id={`starting-workflow-question-${questionIndex}`}
                value={value}
                onChange={(event) => saveInputs(onInputChange, saved, { [`question-${questionIndex}`]: event.target.value })}
                placeholder="Type your answer here..."
                className={textareaClassName}
              />
            </label>
          );
        })}
      </div>

      {selected && (
        <div className="rounded-2xl border border-[#00DC51]/45 bg-[#00DC51]/8 p-5" aria-live="polite">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Your starting workflow</div>
            <button
              type="button"
              onClick={async () => {
                const summary = [
                  `Starting workflow: ${selected}`,
                  rationale.trim() ? `Why it fits: ${rationale.trim()}` : '',
                  review.trim() ? `Review process: ${review.trim()}` : '',
                ].filter(Boolean).join('\n\n');
                await navigator.clipboard.writeText(summary);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              }}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#00DC51]/45 bg-black/30 px-3 py-2 text-xs font-black text-[#00DC51] transition-colors hover:bg-[#00DC51] hover:text-black"
            >
              {copied ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : <Copy size={14} strokeWidth={2.5} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy summary'}
            </button>
          </div>
          <h5 className="text-lg font-black text-white">{selected}</h5>
          <div className="mt-4 grid gap-4 text-sm leading-relaxed text-white/70 sm:grid-cols-2">
            <div><span className="block font-black text-white">Why it fits</span>{rationale || 'Add your rationale above.'}</div>
            <div><span className="block font-black text-white">Review process</span>{review || 'Define the human review point above.'}</div>
          </div>
        </div>
      )}
      <SavedStatus visible={Boolean(selected || rationale || review)} />
    </div>
  );
}

export function AiEnabledWorkflowActivity({ activity, userInput, onInputChange }: FocusedPageActivityProps) {
  const saved = parseInputs(userInput);
  const currentWorkflow = typeof saved['question-0'] === 'string' ? saved['question-0'] : '';
  const legacyAiWorkflow = typeof saved['question-1'] === 'string' ? saved['question-1'] : '';
  const agentHandles = typeof saved['agent-handles'] === 'string' ? saved['agent-handles'] : legacyAiWorkflow;
  const humanReviews = typeof saved['human-reviews'] === 'string' ? saved['human-reviews'] : '';
  const timeSaved = typeof saved['question-2'] === 'string' ? saved['question-2'] : '';

  const updateAiSide = (key: 'agent-handles' | 'human-reviews', value: string) => {
    const nextAgent = key === 'agent-handles' ? value : agentHandles;
    const nextHuman = key === 'human-reviews' ? value : humanReviews;
    const combined = [
      nextAgent.trim() ? `Agent handles: ${nextAgent.trim()}` : '',
      nextHuman.trim() ? `Accountant reviews and approves: ${nextHuman.trim()}` : '',
    ].filter(Boolean).join('\n');
    saveInputs(onInputChange, saved, { [key]: value, 'question-1': combined });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr]">
        <section className="rounded-2xl border border-white/14 bg-black/28 p-4 sm:p-5" aria-labelledby="current-workflow-title">
          <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/55"><Clock size={16} aria-hidden="true" />Current workflow</div>
          <label htmlFor="current-workflow" id="current-workflow-title" className="mb-2 block text-sm font-bold leading-relaxed text-white/90">1. {activity.questions?.[0]}</label>
          <textarea id="current-workflow" value={currentWorkflow} onChange={(event) => saveInputs(onInputChange, saved, { 'question-0': event.target.value })} placeholder="Type your answer here..." className={`${textareaClassName} min-h-[190px]`} />
        </section>

        <div className="flex items-center justify-center" aria-hidden="true">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00DC51] text-black shadow-lg shadow-[#00DC51]/25 lg:rotate-0 rotate-90"><ArrowRight size={20} strokeWidth={3} /></div>
        </div>

        <section className="rounded-2xl border-2 border-[#00DC51] bg-[#00DC51]/9 p-4 sm:p-5" aria-labelledby="ai-workflow-title">
          <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]"><Sparkles size={16} aria-hidden="true" />AI-enabled workflow</div>
          <p id="ai-workflow-title" className="mb-3 text-sm font-bold leading-relaxed text-white/90">2. {activity.questions?.[1]}</p>
          <div className="space-y-3">
            <label htmlFor="agent-handles" className="block text-xs font-black uppercase tracking-wide text-white/65"><span className="mb-2 flex items-center gap-2"><Bot size={15} aria-hidden="true" />What the agent handles</span><textarea id="agent-handles" value={agentHandles} onChange={(event) => updateAiSide('agent-handles', event.target.value)} placeholder="Describe the agent’s work..." className={textareaClassName} /></label>
            <label htmlFor="human-reviews" className="block text-xs font-black uppercase tracking-wide text-white/65"><span className="mb-2 flex items-center gap-2"><UserCheck size={15} aria-hidden="true" />What you review and approve</span><textarea id="human-reviews" value={humanReviews} onChange={(event) => updateAiSide('human-reviews', event.target.value)} placeholder="Describe the human review point..." className={textareaClassName} /></label>
          </div>
        </section>
      </div>

      <label htmlFor="time-saved-use" className="block rounded-2xl border border-white/14 bg-black/25 p-4 sm:p-5">
        <span className="mb-2 block text-sm font-bold leading-relaxed text-white/90">3. {activity.questions?.[2]}</span>
        <textarea id="time-saved-use" value={timeSaved} onChange={(event) => saveInputs(onInputChange, saved, { 'question-2': event.target.value })} placeholder="Type your answer here..." className={textareaClassName} />
      </label>
      <SavedStatus visible={Boolean(currentWorkflow || agentHandles || humanReviews || timeSaved)} />
    </div>
  );
}

const PROMPT_PARTS = [
  { key: 'question-1', label: 'Role', placeholder: 'What role would you give AI?' },
  { key: 'question-2', label: 'Task', placeholder: 'What task should it perform?' },
  { key: 'question-3', label: 'Context', placeholder: 'What context does it need?' },
  { key: 'question-4', label: 'Constraints', placeholder: 'What constraints would improve the output?' },
];

export function PromptFrameworkActivity({ activity, userInput, onInputChange }: FocusedPageActivityProps) {
  const [copied, setCopied] = React.useState(false);
  const saved = parseInputs(userInput);
  const values = PROMPT_PARTS.map((part) => typeof saved[part.key] === 'string' ? saved[part.key] : '');
  const completed = values.filter((value) => value.trim()).length;
  const structuredPrompt = PROMPT_PARTS.map((part, index) => values[index].trim() ? `${part.label}: ${values[index].trim()}` : '').filter(Boolean).join('\n\n');
  const legacyRewrite = typeof saved['question-0'] === 'string' ? saved['question-0'] : '';
  const preview = structuredPrompt || legacyRewrite;
  const copyPrompt = values
    .map((value) => value.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/15 bg-black/30 p-4">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Weak prompt</div>
        <p className="mt-2 text-base font-black text-white">“Write an email about the results.”</p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">1. {activity.questions?.[0]}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROMPT_PARTS.map((part, index) => (
            <label key={part.key} htmlFor={`prompt-framework-${part.label.toLowerCase()}`} className="rounded-2xl border border-white/12 bg-black/25 p-4">
              <span className="mb-2 flex items-center gap-2 text-sm font-black text-white"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00DC51] text-xs text-black">{index + 1}</span>{part.label}</span>
              <span className="mb-3 block text-xs font-medium leading-relaxed text-white/55">{activity.questions?.[index + 1]}</span>
              <textarea
                id={`prompt-framework-${part.label.toLowerCase()}`}
                value={values[index]}
                onChange={(event) => {
                  const nextValues = [...values];
                  nextValues[index] = event.target.value;
                  const nextPrompt = PROMPT_PARTS.map((item, itemIndex) => nextValues[itemIndex].trim() ? `${item.label}: ${nextValues[itemIndex].trim()}` : '').filter(Boolean).join('\n\n');
                  saveInputs(onInputChange, saved, { [part.key]: event.target.value, 'question-0': nextPrompt });
                }}
                placeholder={part.placeholder}
                className={`${textareaClassName} min-h-[102px]`}
              />
            </label>
          ))}
        </div>

        <aside className="rounded-2xl border-2 border-[#00DC51] bg-[#00DC51]/8 p-5 lg:sticky lg:top-6 lg:self-start" aria-labelledby="structured-prompt-preview-title">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h5 id="structured-prompt-preview-title" className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Structured prompt preview</h5>
            <span className="rounded-full border border-[#00DC51]/40 bg-black/30 px-3 py-1 text-xs font-black text-white" role="status" aria-live="polite">{completed} of 4 parts</span>
          </div>
          <div className="mb-5 grid grid-cols-4 gap-2" aria-hidden="true">
            {PROMPT_PARTS.map((part, index) => <span key={part.key} className={`h-1.5 rounded-full ${index < completed ? 'bg-[#00DC51]' : 'bg-white/15'}`} />)}
          </div>
          <div className="min-h-[280px] whitespace-pre-wrap rounded-xl border border-white/10 bg-black/35 p-4 text-sm font-medium leading-relaxed text-white/82" aria-live="polite">
            {preview || 'Complete Role, Task, Context, and Constraints to build your structured prompt.'}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={!copyPrompt}
              onClick={async () => {
                await navigator.clipboard.writeText(copyPrompt);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              }}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#00DC51] px-3 py-2 text-xs font-black text-black transition-colors hover:bg-[#00FF5F] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
            >
              {copied ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : <Copy size={14} strokeWidth={2.5} aria-hidden="true" />}
              {copied ? 'Copied prompt' : 'Copy prompt'}
            </button>
            <button
              type="button"
              disabled={!values.some((value) => value.trim()) && !legacyRewrite}
              onClick={() => {
                onInputChange(JSON.stringify({
                  ...saved,
                  'question-0': '',
                  'question-1': '',
                  'question-2': '',
                  'question-3': '',
                  'question-4': '',
                }));
                setCopied(false);
              }}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/15 bg-black/25 px-3 py-2 text-xs font-black text-white/70 transition-colors hover:border-[#00DC51]/50 hover:text-[#00DC51] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <RotateCcw size={14} strokeWidth={2.5} aria-hidden="true" />
              Clear
            </button>
          </div>
        </aside>
      </div>
      <SavedStatus visible={completed > 0 || Boolean(legacyRewrite)} label="Prompt framework saved locally" />
    </div>
  );
}

function parseFirstNumber(value: unknown) {
  if (typeof value !== 'string') return null;
  const match = value.replace(',', '.').match(/\d+(?:\.\d+)?/);
  return match ? Number.parseFloat(match[0]) : null;
}

function reductionFor(todayValue: unknown, aiValue: unknown) {
  const today = parseFirstNumber(todayValue);
  const withAi = parseFirstNumber(aiValue);
  if (today === null || withAi === null || today <= 0 || withAi < 0 || withAi > today) return null;
  return { hours: today - withAi, percent: Math.round(((today - withAi) / today) * 100) };
}

export function ImpactPricingActivity({ activity, userInput, onInputChange }: FocusedPageActivityProps) {
  const [activeServiceIndex, setActiveServiceIndex] = React.useState(0);
  const saved = parseInputs(userInput);
  const fields = activity.specFields || [];
  const services = [0, 1, 2].map((serviceIndex) => {
    const offset = serviceIndex * 5;
    return {
      serviceIndex,
      offset,
      name: saved[`field-${offset}`] || '',
      today: saved[`field-${offset + 1}`] || '',
      withAi: saved[`field-${offset + 2}`] || '',
      humanValue: saved[`field-${offset + 3}`] || '',
      pricing: saved[`field-${offset + 4}`] || '',
      reduction: reductionFor(saved[`field-${offset + 1}`], saved[`field-${offset + 2}`]),
    };
  });
  const comparable = services.filter((service) => service.name.trim() && service.reduction);
  const strongest = comparable.length ? [...comparable].sort((a, b) => (b.reduction?.percent || 0) - (a.reduction?.percent || 0))[0] : null;
  const activeService = services[activeServiceIndex] || services[0];

  const renderFieldLabel = (fieldIndex: number, compact = false) => {
    const field = fields[fieldIndex];
    const helper = fields[fieldIndex % 5]?.helper || '';
    const tooltipId = `impact-field-${fieldIndex}-tip`;
    return (
      <span className={`mb-2 flex min-h-8 items-start justify-between gap-2 font-bold text-white/90 ${compact ? 'text-xs' : 'text-sm'}`}>
        <span>{field?.label}</span>
        {helper && (
          <span className="group relative flex-shrink-0">
            <button
              type="button"
              aria-label={`Guidance for ${field?.label}`}
              aria-describedby={tooltipId}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/45 transition-colors hover:border-[#00DC51]/50 hover:text-[#00DC51] focus:text-[#00DC51]"
            >
              <HelpCircle size={15} aria-hidden="true" />
            </button>
            <span
              id={tooltipId}
              role="tooltip"
              className="pointer-events-none invisible absolute right-0 top-9 z-30 w-64 rounded-xl border border-[#00DC51]/35 bg-[#080D09] p-3 text-left text-xs font-semibold leading-relaxed text-white/75 opacity-0 shadow-2xl transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            >
              {helper}
            </span>
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Services in the AI impact pricing worksheet">
        {services.map((service) => {
          const completedFields = [0, 1, 2, 3, 4].filter((fieldIndex) => String(saved[`field-${service.offset + fieldIndex}`] || '').trim()).length;
          const selected = service.serviceIndex === activeServiceIndex;
          return (
            <button
              key={service.serviceIndex}
              type="button"
              role="tab"
              id={`service-tab-${service.serviceIndex}`}
              aria-selected={selected}
              aria-expanded={selected}
              aria-controls={`service-panel-${service.serviceIndex}`}
              aria-label={`Service ${service.serviceIndex + 1}, ${completedFields} of 5 fields complete, ${selected ? 'expanded' : 'collapsed'}`}
              onClick={() => setActiveServiceIndex(service.serviceIndex)}
              className={`min-h-14 rounded-xl border px-3 py-2 text-left transition-colors sm:flex sm:items-center sm:justify-between sm:gap-3 sm:px-4 ${selected ? 'border-[#00DC51] bg-[#00DC51]/12 text-white' : 'border-white/12 bg-black/25 text-white/60 hover:border-[#00DC51]/40 hover:text-white'}`}
            >
              <span className="block text-sm font-black">Service {service.serviceIndex + 1}</span>
              <span className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border sm:mt-0 ${selected ? 'border-[#00DC51]/60 bg-[#00DC51] text-black' : 'border-white/15 bg-white/5 text-white/55'}`} aria-hidden="true">
                {completedFields === 5 ? <Check size={15} strokeWidth={3} /> : selected ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
              </span>
            </button>
          );
        })}
      </div>

      <fieldset
        id={`service-panel-${activeService.serviceIndex}`}
        role="tabpanel"
        aria-labelledby={`service-tab-${activeService.serviceIndex}`}
        className="rounded-2xl border border-[#00DC51]/35 bg-black/24 p-4 sm:p-6"
      >
        <legend className="px-2 text-sm font-black uppercase tracking-[0.16em] text-[#00DC51]">Service {activeService.serviceIndex + 1}</legend>
        <div className="space-y-5">
          <label htmlFor={`impact-field-${activeService.offset}`} className="block">
            {renderFieldLabel(activeService.offset)}
            <input id={`impact-field-${activeService.offset}`} value={saved[`field-${activeService.offset}`] || ''} onChange={(event) => saveInputs(onInputChange, saved, { [`field-${activeService.offset}`]: event.target.value })} placeholder={fields[activeService.offset]?.placeholder} className={fieldClassName} />
          </label>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-3 sm:gap-5">
              {[1, 2].map((fieldWithinService, pairIndex) => {
                const fieldIndex = activeService.offset + fieldWithinService;
                const field = fields[fieldIndex];
                return (
                  <React.Fragment key={fieldIndex}>
                    {pairIndex === 1 && <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#00DC51]/12 text-[#00DC51]"><ArrowRight size={18} strokeWidth={2.7} aria-hidden="true" /></div>}
                    <label htmlFor={`impact-field-${fieldIndex}`} className="min-w-0">
                      {renderFieldLabel(fieldIndex, true)}
                      <input id={`impact-field-${fieldIndex}`} inputMode="decimal" value={saved[`field-${fieldIndex}`] || ''} onChange={(event) => saveInputs(onInputChange, saved, { [`field-${fieldIndex}`]: event.target.value })} placeholder={field?.placeholder} className={`${fieldClassName} px-3`} />
                    </label>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="mt-4 border-t border-white/10 pt-4" aria-live="polite">
              {activeService.reduction ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-white/65"><TrendingDown size={15} className="text-[#00DC51]" aria-hidden="true" />Reduction</span>
                  <span className="text-sm font-black text-[#00DC51]">{activeService.reduction.percent}% · {activeService.reduction.hours.toFixed(1)} hours</span>
                </div>
              ) : (
                <p className="text-xs font-medium leading-relaxed text-white/45">Enter comparable time figures to calculate the reduction.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[3, 4].map((fieldWithinService) => {
              const fieldIndex = activeService.offset + fieldWithinService;
              const field = fields[fieldIndex];
              if (!field) return null;
              return (
                <label key={fieldIndex} htmlFor={`impact-field-${fieldIndex}`} className="block rounded-xl border border-white/8 bg-white/[0.02] p-4">
                  {renderFieldLabel(fieldIndex)}
                  <textarea id={`impact-field-${fieldIndex}`} value={saved[`field-${fieldIndex}`] || ''} onChange={(event) => saveInputs(onInputChange, saved, { [`field-${fieldIndex}`]: event.target.value })} placeholder={field.placeholder} className={`${textareaClassName} min-h-[112px]`} />
                </label>
              );
            })}
          </div>
        </div>
      </fieldset>

      <section className="rounded-2xl border-2 border-[#00DC51] bg-[#00DC51]/8 p-5" aria-labelledby="impact-comparison-title">
        <div className="mb-4 flex items-center gap-2"><TrendingDown className="text-[#00DC51]" size={19} aria-hidden="true" /><h5 id="impact-comparison-title" className="text-sm font-black uppercase tracking-[0.16em] text-[#00DC51]">On-page comparison</h5></div>
        {comparable.length ? (
          <div className="space-y-3">
            {comparable.map((service) => (
              <div key={service.serviceIndex} className="grid grid-cols-1 gap-2 rounded-xl border border-white/10 bg-black/25 p-3 sm:grid-cols-[minmax(0,1fr)_minmax(180px,1fr)_auto] sm:items-center">
                <span className="truncate text-sm font-black text-white">{service.name}</span>
                <div className="h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true"><div className="h-full rounded-full bg-[#00DC51]" style={{ width: `${service.reduction?.percent || 0}%` }} /></div>
                <span className="text-sm font-black text-[#00DC51]">{service.reduction?.percent}% reduction</span>
              </div>
            ))}
            {strongest && <p className="pt-1 text-sm font-bold leading-relaxed text-white">Strongest efficiency opportunity: <span className="text-[#00DC51]">{strongest.name}</span>.</p>}
          </div>
        ) : (
          <p className="text-sm font-medium leading-relaxed text-white/60">Complete the paired time fields for at least one named service to compare the impact.</p>
        )}
      </section>
      <SavedStatus visible={Object.keys(saved).some((key) => key.startsWith('field-') && String(saved[key]).trim())} label="Pricing worksheet saved locally" />
    </div>
  );
}

export function ClientMessageActivity({ activity, userInput, onInputChange }: FocusedPageActivityProps) {
  const saved = parseInputs(userInput);
  const answers = [0, 1, 2].map((index) => typeof saved[`question-${index}`] === 'string' ? saved[`question-${index}`] : '');
  const labels = ['Core client statement', 'Response to the fee question', 'Client reassurance plan'];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-3">
        {answers.map((answer, index) => (
          <label key={index} htmlFor={`client-message-${index}`} className="block rounded-2xl border border-white/12 bg-black/25 p-4">
            <span className="mb-1 flex items-center gap-2 text-sm font-black text-white"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00DC51] text-xs text-black">{index + 1}</span>{labels[index]}</span>
            <span className="mb-3 block text-xs font-medium leading-relaxed text-white/60">{activity.questions?.[index]}</span>
            <textarea id={`client-message-${index}`} value={answer} onChange={(event) => saveInputs(onInputChange, saved, { [`question-${index}`]: event.target.value })} placeholder="Type your answer here..." className={textareaClassName} />
          </label>
        ))}
        <SavedStatus visible={answers.some((answer) => answer.trim())} label="Client communication plan saved locally" />
      </div>

      <aside className="rounded-2xl border-2 border-[#00DC51] bg-[#00DC51]/8 p-5 lg:sticky lg:top-6 lg:self-start" aria-labelledby="client-message-preview-title">
        <div className="mb-4 flex items-center gap-2 text-[#00DC51]"><MessageSquare size={19} aria-hidden="true" /><h5 id="client-message-preview-title" className="text-sm font-black uppercase tracking-[0.16em]">Client conversation preview</h5></div>
        <div className="space-y-4" aria-live="polite">
          {labels.map((label, index) => (
            <section key={label} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <h6 className="text-xs font-black uppercase tracking-wide text-white/50">{label}</h6>
              <p className="mt-2 whitespace-pre-wrap text-sm font-medium leading-relaxed text-white/82">{answers[index].trim() || 'Complete this response in the editor.'}</p>
            </section>
          ))}
        </div>
      </aside>
    </div>
  );
}
