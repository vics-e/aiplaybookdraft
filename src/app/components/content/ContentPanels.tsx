import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ArrowRight, Check, ClipboardList, FileText, X, XCircle } from 'lucide-react';
import { cleanTemplateLine } from './textCleaning';

export const TAKEAWAY_BAND_PAGE_IDS = new Set([
  's2-ethics-responsibility',
  's2-data-confidentiality',
  's2-legal-responsibility',
  's2-risk',
  's2-policy',
  's2-failure-modes',
  's2-over-reliance',
  's2-checks',
  's2-evidence-trail',
  's2-red-team',
  's3-controls',
  's5-client-talk',
]);

const HIGHLIGHT_BAND_PAGE_IDS = new Set([
  's1-human-loop',
  's2-ethics-responsibility',
  's2-data-confidentiality',
  's2-legal-responsibility',
  's2-failure-modes',
  's2-checks',
  's2-red-team',
  's3-controls',
  's3-spec',
  's5-time-pricing',
  's7-agent-spec',
  's7-tool-matrix',
]);

const WARNING_HIGHLIGHT_PAGE_IDS = new Set([
  's2-legal-responsibility',
  's2-failure-modes',
  's2-red-team',
  's5-time-pricing',
]);

export type MessageKind = 'Learning' | 'Control' | 'Principle' | 'Warning';

const CONTROL_MESSAGE_TITLES = new Set([
  'The Practical Rule',
  'The Data Boundary Principle',
  'The Safeguard',
  'Review rule',
]);

const PRINCIPLE_MESSAGE_TITLES = new Set([
  'The Bottom Line',
  'The Core Messaging Principle',
  'Responsibility',
]);

const LEARNING_MESSAGE_TITLES = new Set([
  'The Real Question',
  'The Shift',
  'Why This Matters',
  'Why Structured Workflows Matter',
  'Connection to Section 7',
  'The Key Distinction',
  'The Key Shift',
  'Connection to Agent Spec Template',
  'What Builds Trust Fastest',
  'Why This Works',
  'Core Message',
  'The Strategic Response',
  'The Direction of Travel',
  'The Three Vs',
  'Where should you be after 90 days?',
  'Purpose',
]);

function normaliseMessageTitle(title?: string) {
  return (title || '').replace(/:\s*$/, '').trim();
}

export function messageKindForBox(title?: string): MessageKind | null {
  const normalisedTitle = normaliseMessageTitle(title);
  if (CONTROL_MESSAGE_TITLES.has(normalisedTitle)) return 'Control';
  if (PRINCIPLE_MESSAGE_TITLES.has(normalisedTitle)) return 'Principle';
  if (LEARNING_MESSAGE_TITLES.has(normalisedTitle)) return 'Learning';
  return null;
}

export function MessageBand({ title, text, kind }: { title: string; text: string; kind: MessageKind }) {
  const isWarning = kind === 'Warning' || kind === 'Control';
  const Icon = kind === 'Learning' ? ArrowRight : kind === 'Principle' ? Check : AlertCircle;

  return (
    <motion.aside
      className="grid min-h-24 grid-cols-[48px_minmax(0,1fr)] overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)] transition-transform duration-200 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none sm:grid-cols-[64px_minmax(0,1fr)_auto]"
      aria-label={title}
    >
      <span className={`row-span-2 flex items-center justify-center text-black sm:row-span-1 ${isWarning ? 'bg-[#F39200]' : 'bg-[var(--color-accent)]'}`}>
        <Icon size={21} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <div className="self-center px-5 py-4 sm:px-7 sm:py-5">
        <h4 className="text-base font-black leading-snug text-white">{title}</h4>
        <p className="mt-1 whitespace-pre-line text-sm font-normal leading-relaxed text-[var(--color-muted-text)]">{text}</p>
      </div>
      <span className="col-start-2 mb-4 px-5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-muted-text)] sm:col-start-auto sm:mb-0 sm:mr-6 sm:self-center sm:px-0">
        {kind}
      </span>
    </motion.aside>
  );
}

function highlightKind(pageId: string, section?: string) {
  if (WARNING_HIGHLIGHT_PAGE_IDS.has(pageId)) return 'Warning';
  if (section?.includes('Section 2') || pageId === 's3-controls') return 'Control';
  if (['s1-human-loop', 's3-spec', 's7-agent-spec', 's7-tool-matrix'].includes(pageId)) return 'Principle';
  return 'Learning';
}

export function HighlightMessage({ pageId, section, text }: { pageId: string; section?: string; text: string }) {
  const usesBand = HIGHLIGHT_BAND_PAGE_IDS.has(pageId);
  const isWarning = WARNING_HIGHLIGHT_PAGE_IDS.has(pageId);
  const kind = highlightKind(pageId, section) as MessageKind;

  if (usesBand) {
    const title = isWarning ? 'Important warning' : kind === 'Control' ? 'Control' : kind === 'Principle' ? 'Principle' : 'Key takeaway';
    return <MessageBand title={title} text={text} kind={kind} />;
  }

  return (
    <motion.aside
      className="group flex items-start gap-3 border-y border-[var(--color-rule)] py-5 transition-transform duration-200 motion-safe:hover:translate-x-0.5 motion-reduce:transition-none"
      aria-label={highlightKind(pageId, section)}
    >
      <ArrowRight className="mt-0.5 shrink-0 text-[var(--color-accent)] transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none" size={19} strokeWidth={2.4} aria-hidden="true" />
      <p className="flex-1 text-base font-semibold leading-relaxed text-white">{text}</p>
    </motion.aside>
  );
}

export function PolicyUsesComparison({ approvedText, restrictedText }: { approvedText: string; restrictedText: string }) {
  const approvedLines = approvedText.split('\n').map(cleanTemplateLine).filter(Boolean);
  const restrictedLines = restrictedText.split('\n').map(cleanTemplateLine).filter(Boolean);

  const renderColumn = (title: string, lines: string[], restricted = false) => (
    <article className="p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${restricted ? 'bg-[#F39200]' : 'bg-[var(--color-accent)]'} text-black`}>
          {restricted ? <X size={18} strokeWidth={2.8} aria-hidden="true" /> : <Check size={18} strokeWidth={2.8} aria-hidden="true" />}
        </span>
        <h4 className="text-lg font-black text-white">{title}</h4>
      </div>
      {lines[0] && <p className="mb-3 text-sm font-semibold text-white">{lines[0]}</p>}
      <ul className="space-y-2.5">
        {lines.slice(1).map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm font-normal leading-relaxed text-[var(--color-muted-text)]">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${restricted ? 'bg-[#F39200]' : 'bg-[var(--color-accent)]'}`} aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
    </article>
  );

  return (
    <section className="grid overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)] md:grid-cols-2" aria-label="Approved and restricted AI uses">
      {renderColumn('Approved uses', approvedLines)}
      <div className="border-t border-[var(--color-rule)] md:border-l md:border-t-0">{renderColumn('Restricted uses', restrictedLines, true)}</div>
    </section>
  );
}

export function ReviewChecklistPanel({ title, text }: { title: string; text: string }) {
  const items = text.split('\n').map(cleanTemplateLine).filter(Boolean);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)]" aria-label={title}>
      <div className="flex items-center gap-3 border-b border-[var(--color-rule)] px-5 py-4 sm:px-6">
        <ClipboardList className="text-[var(--color-accent)]" size={20} strokeWidth={2.4} aria-hidden="true" />
        <h4 className="text-base font-black text-white">{title}</h4>
      </div>
      <ul className="grid gap-px bg-[var(--color-rule)] sm:grid-cols-2">
        {items.map((item) => {
          const isChecked = checkedItems.has(item);
          return (
            <li key={item} className="bg-[var(--color-surface-1)]">
              <label className="group flex cursor-pointer items-center gap-3 px-5 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-surface-2)] motion-reduce:transition-none sm:px-6">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setCheckedItems((current) => {
                    const next = new Set(current);
                    if (next.has(item)) next.delete(item);
                    else next.add(item);
                    return next;
                  })}
                  className="peer sr-only"
                />
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--color-surface-1)] ${isChecked ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--color-accent)] bg-transparent'}`} aria-hidden="true">
                  {isChecked && <Check size={13} strokeWidth={3} className="text-black" />}
                </span>
                <span>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function FileNoteTemplatePanel({ text }: { text: string }) {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const checksIndex = lines.findIndex((line) => line.startsWith('Key checks performed'));
  const changesIndex = lines.findIndex((line) => line.startsWith('Changes made'));
  const fields = lines.slice(0, checksIndex);
  const checks = lines.slice(checksIndex + 1, changesIndex).map(cleanTemplateLine);
  const closingFields = lines.slice(changesIndex);

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-rule)] px-5 py-4 sm:px-6">
        <FileText className="text-[var(--color-accent)]" size={20} strokeWidth={2.4} aria-hidden="true" />
        <h4 className="text-base font-black text-white">AI File Note Template</h4>
      </div>
      <div className="grid md:grid-cols-[1.05fr_.95fr]">
        <div className="grid gap-px bg-[var(--color-rule)]">
          {fields.concat(closingFields).map((field) => (
            <div key={field} className="bg-[var(--color-surface-1)] px-5 py-4 sm:px-6">
              <span className="block text-[11px] font-black uppercase tracking-[0.12em] text-[var(--color-muted-text)]">{field.replace(/:$/, '')}</span>
              <span className="mt-3 block h-px w-full bg-[var(--color-rule)]" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--color-rule)] p-5 sm:p-6 md:border-l md:border-t-0">
          <h5 className="mb-4 text-sm font-black text-white">Key checks performed</h5>
          <ul className="space-y-3">
            {checks.map((check) => (
              <li key={check} className="flex items-center gap-3 text-sm font-semibold text-white">
                <span className="h-4 w-4 rounded-[4px] border-2 border-[var(--color-accent)]" aria-hidden="true" />
                {check}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function StopDoingPanel({ title, text }: { title: string; text: string }) {
  const lines = text.split('\n').map(cleanTemplateLine).filter(Boolean);
  return (
    <section className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)] p-5 sm:p-6">
      <h4 className="text-base font-black text-white">{title}</h4>
      {lines[0] && <p className="mt-2 text-sm font-normal text-[var(--color-muted-text)]">{lines[0]}</p>}
      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {lines.slice(1).map((line) => (
          <li key={line} className="group flex items-center gap-3 rounded-xl border border-[var(--color-rule)] bg-black px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none">
            <XCircle className="shrink-0 text-[var(--color-accent)]" size={17} strokeWidth={2.3} aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
