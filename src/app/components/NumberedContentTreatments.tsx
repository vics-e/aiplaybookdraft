import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, MessageSquareText, Minus, Plus, ShieldCheck } from 'lucide-react';
import type { ContentBlock } from '../data/playbookData';

export type NumberedTreatment = 'filled-marker' | 'accordion' | 'editorial' | 'handoff' | 'selector' | 'metric-strip';

// This mapping records the approved content intent. Pages absent from it keep their
// specialist renderer or have no numbered-content treatment in this wave.
export const NUMBERED_TREATMENT_BY_PAGE_ID: Record<string, NumberedTreatment> = {
  's1-capacity': 'filled-marker',
  's2-risk': 'filled-marker',
  's2-checks': 'filled-marker',
  's6-scorecard': 'metric-strip',
  's6-strategic-questions': 'editorial',
  's7-policy': 'editorial',

  's1-framework': 'accordion',
  's2-ethics-responsibility': 'accordion',
  's2-data-confidentiality': 'accordion',
  's2-legal-responsibility': 'accordion',
  's2-failure-modes': 'accordion',
  's2-over-reliance': 'editorial',
  's2-evidence-trail': 'selector',
  's2-red-team': 'accordion',
  's3-first-agent': 'selector',
  's3-confidence': 'accordion',
  's3-controls': 'accordion',
  's4-types': 'accordion',
  's5-dividend': 'accordion',
  's5-time-pricing': 'selector',
  's5-pricing': 'accordion',
  's5-3v-framework': 'accordion',
  's5-client-talk': 'accordion',
  's6-days1-30': 'accordion',
  's6-days31-60': 'accordion',
  's6-days61-90': 'accordion',

  's1-stages': 'editorial',
  's1-human-loop': 'handoff',
  's3-workflow-map': 'selector',
  's3-maturity': 'selector',
  's4-framework': 'selector',
  's4-progression': 'selector',
  's6-rhythm': 'editorial',
  's6-four-stages': 'selector',
  's7-checklist': 'editorial',
};

interface NumberedItem {
  title: string;
  desc?: string;
  example?: string;
  warning?: boolean;
}

interface NumberedContentTreatmentProps {
  block: ContentBlock;
  pageId: string;
  treatment: NumberedTreatment;
}

function normaliseItems(block: ContentBlock): NumberedItem[] {
  return (block.items || []).map((item) => (
    typeof item === 'string'
      ? { title: item }
      : {
          title: item.title,
          desc: item.desc,
          example: item.example,
          warning: item.warning,
        }
  ));
}

function displayTitle(title: string, index: number) {
  const itemNumber = index + 1;
  return title
    .replace(new RegExp(`^${itemNumber}\\.\\s*`), '')
    .replace(new RegExp(`^(?:Question|Stage|Step)\\s+${itemNumber}\\s*[:\\-\\u2013\\u2014]\\s*`, 'i'), '');
}

function splitTitleAndDetail(title: string, index: number) {
  const cleanedTitle = displayTitle(title, index);
  const [headline, ...detailParts] = cleanedTitle.split(/\s+[\u2013\u2014]\s+/);
  return {
    headline,
    detail: detailParts.length > 0 ? detailParts.join(' — ') : '',
  };
}

function SupportingCopy({ item }: { item: NumberedItem }) {
  return (
    <>
      {item.desc && (
        <p className="whitespace-pre-line text-sm font-normal leading-relaxed text-[var(--color-muted-text)]">
          {item.desc}
        </p>
      )}
      {item.example && (
        <p className="mt-2 whitespace-pre-line text-xs font-medium italic leading-relaxed text-[var(--color-muted-text)]">
          {item.example}
        </p>
      )}
    </>
  );
}

function FilledMarkerList({ block }: Pick<NumberedContentTreatmentProps, 'block'>) {
  const items = normaliseItems(block);

  return (
    <section data-numbered-treatment="filled-marker">
      {block.boxTitle && <h4 className="playbook-component-title mb-5 text-white">{block.boxTitle}</h4>}
      <ol className="space-y-5">
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`} className="group flex items-start gap-4 transition-transform duration-200 motion-safe:hover:translate-x-1 motion-reduce:transition-none">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-black text-black transition-colors duration-200 group-hover:bg-[var(--color-accent)] motion-reduce:transition-none">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              {(() => {
                const { headline, detail } = splitTitleAndDetail(item.title, index);
                return (
                  <>
                    <h5 className="text-base font-black leading-snug text-white">{headline}</h5>
                    {detail && <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--color-muted-text)]">{detail}</p>}
                  </>
                );
              })()}
              {(item.desc || item.example) && <div className="mt-2"><SupportingCopy item={item} /></div>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const ACCORDION_INSTRUCTION_BY_PAGE_ID: Record<string, string> = {
  's1-framework': 'Select a principle to explore.',
  's2-failure-modes': 'Select a failure mode to explore.',
  's3-controls': 'Select a control to explore.',
  's5-pricing': 'Select a pricing model to explore.',
};

function NumberedAccordion({ block, pageId }: Pick<NumberedContentTreatmentProps, 'block' | 'pageId'>) {
  const items = normaliseItems(block);
  const componentId = useId().replace(/:/g, '');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const instruction = ACCORDION_INSTRUCTION_BY_PAGE_ID[pageId];

  const toggleItem = (index: number) => {
    setExpandedItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section data-numbered-treatment="accordion">
      {block.boxTitle && <h4 className="playbook-component-title mb-4 text-white">{block.boxTitle}</h4>}
      {instruction && (
        <p className="mb-3 ml-1 flex items-center gap-2 text-xs font-bold text-[var(--color-muted-text)]">
          <Plus size={15} strokeWidth={2.6} className="text-[var(--color-accent)]" aria-hidden="true" />
          {instruction}
        </p>
      )}
      <div className="space-y-1">
        {items.map((item, index) => {
          const isExpanded = expandedItems.has(index);
          const triggerId = `${pageId}-${componentId}-accordion-trigger-${index}`;
          const panelId = `${pageId}-${componentId}-accordion-panel-${index}`;

          return (
            <div key={`${item.title}-${index}`}>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}
                className="group/accordion grid w-full grid-cols-[2rem_minmax(0,1fr)_1.75rem] items-start gap-3 rounded-lg px-1 py-3.5 text-left outline-none transition-colors hover:bg-white/[0.03] sm:gap-4"
              >
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black text-black transition-colors group-focus-visible/accordion:ring-2 group-focus-visible/accordion:ring-[var(--color-accent)] group-focus-visible/accordion:ring-offset-2 group-focus-visible/accordion:ring-offset-black ${isExpanded ? 'bg-[var(--color-accent)]' : 'bg-white'}`}>
                  {index + 1}
                </span>
                <span className="min-w-0 pt-1">
                  <span className="text-sm font-black leading-snug text-white sm:text-base">{displayTitle(item.title, index)}</span>
                </span>
                <span className={`mt-2 inline-flex shrink-0 justify-self-end transition-all group-hover/accordion:translate-x-0.5 group-hover/accordion:text-[var(--color-accent)] ${isExpanded ? 'text-[var(--color-accent)]' : 'text-white/60'}`} aria-hidden="true">
                  {isExpanded ? <Minus size={17} strokeWidth={2.8} /> : <Plus size={17} strokeWidth={2.8} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 pl-11 pt-2 sm:pl-12">
                      {item.warning && (
                        <span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
                          Not Recommended
                        </span>
                      )}
                      <SupportingCopy item={item} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EditorialNumberedList({ block }: Pick<NumberedContentTreatmentProps, 'block'>) {
  const items = normaliseItems(block);
  const gridColumns = items.length === 4
    ? 'md:grid-cols-4 md:gap-6'
    : items.length === 3
      ? 'md:grid-cols-3 md:gap-8'
      : items.length === 2
        ? 'sm:grid-cols-2 sm:gap-8'
        : 'sm:grid-cols-2';

  return (
    <section data-numbered-treatment="editorial">
      {block.boxTitle && <h4 className="playbook-component-title mb-6 text-white">{block.boxTitle}</h4>}
      <ol className={`grid gap-7 ${gridColumns}`}>
        {items.map((item, index) => (
          <li key={`${item.title}-${index}`} className="group border-b border-[var(--color-rule)] pb-7 transition-transform duration-200 last:border-b-0 last:pb-0 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none md:border-b-0 md:pb-0">
            <span className="mb-4 block text-3xl font-black leading-none tracking-[-0.04em] text-[var(--color-accent)] transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none">
              {index + 1}
            </span>
            <h5 className="text-lg font-black leading-snug text-white">{displayTitle(item.title, index)}</h5>
            {(item.desc || item.example) && <div className="mt-3"><SupportingCopy item={item} /></div>}
          </li>
        ))}
      </ol>
    </section>
  );
}

const handoffIcons = [MessageSquareText, CheckCircle2, ShieldCheck];

function JoinedHandoff({ block }: Pick<NumberedContentTreatmentProps, 'block'>) {
  const items = normaliseItems(block);

  return (
    <section data-numbered-treatment="handoff">
      {block.boxTitle && <h4 className="playbook-component-title mb-5 text-white">{block.boxTitle}</h4>}
      <ol className="grid overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)] md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = handoffIcons[index] || ShieldCheck;
          return (
            <li key={`${item.title}-${index}`} className="group border-b border-[var(--color-rule)] p-6 transition-colors duration-200 last:border-b-0 hover:bg-[var(--color-surface-2)] motion-reduce:transition-none sm:p-8 md:min-h-64 md:border-b-0 md:border-r md:last:border-r-0">
              <span className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent)] text-black transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none">
                <Icon size={23} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">Step {index + 1}</span>
              <h5 className="text-lg font-black leading-snug text-white">{displayTitle(item.title, index)}</h5>
              {(item.desc || item.example) && <div className="mt-3"><SupportingCopy item={item} /></div>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function selectorInstruction(pageId: string) {
  if (pageId === 's3-maturity' || pageId === 's6-four-stages') return 'Select a stage to explore.';
  if (pageId === 's4-framework') return 'Select a prompt part to explore.';
  return 'Select a step to explore.';
}

function NumberedSelector({ block, pageId }: Pick<NumberedContentTreatmentProps, 'block' | 'pageId'>) {
  const items = normaliseItems(block);
  const componentId = useId().replace(/:/g, '');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedItem = items[selectedIndex];
  const isCompactStageSelector = pageId === 's6-four-stages';

  return (
    <section data-numbered-treatment="selector">
      {block.boxTitle && <h4 className="playbook-component-title mb-4 text-white">{block.boxTitle}</h4>}
      <p className="mb-3 ml-1 flex items-center gap-2 text-xs font-bold text-[var(--color-muted-text)]">
        <Plus size={15} strokeWidth={2.6} className="text-[var(--color-accent)]" aria-hidden="true" />
        {selectorInstruction(pageId)}
      </p>
      <div className={`grid overflow-hidden rounded-2xl border border-[var(--color-rule)] ${isCompactStageSelector ? 'md:grid-cols-[15rem_minmax(0,1fr)]' : 'md:grid-cols-[17rem_minmax(0,1fr)]'}`}>
        <div className="flex snap-x gap-1 overflow-x-auto bg-[var(--color-surface-1)] p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:overflow-visible" role="tablist" aria-label={block.boxTitle || 'Numbered content'}>
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={`${item.title}-${index}`}
                id={`${componentId}-selector-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`${componentId}-selector-panel`}
                onClick={() => setSelectedIndex(index)}
                className={`grid min-w-[12rem] snap-start grid-cols-[2rem_minmax(0,1fr)] items-center gap-2 rounded-xl px-3 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] md:min-w-0 md:w-full ${isSelected ? 'bg-[var(--color-surface-2)] text-white' : 'text-[var(--color-muted-text)] hover:bg-white/[0.03] hover:text-white'}`}
              >
                <span className="text-lg font-black text-[var(--color-accent)]">{index + 1}</span>
                <span className="text-sm font-black leading-snug">{displayTitle(item.title, index)}</span>
              </button>
            );
          })}
        </div>
        <div
          id={`${componentId}-selector-panel`}
          role="tabpanel"
          aria-labelledby={`${componentId}-selector-tab-${selectedIndex}`}
          className={isCompactStageSelector
            ? 'min-h-48 bg-black p-6 sm:p-8 md:min-h-[14rem]'
            : 'min-h-64 bg-black p-7 sm:p-10 md:flex md:min-h-[20rem] md:flex-col md:justify-center'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${selectedItem.title}-${selectedIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <span className="mb-3 block text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">{selectedIndex + 1} of {items.length}</span>
              <h5 className={`${isCompactStageSelector ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-black leading-tight text-white`}>{displayTitle(selectedItem.title, selectedIndex)}</h5>
              {(selectedItem.desc || selectedItem.example) && <div className={`${isCompactStageSelector ? 'mt-4' : 'mt-5'} max-w-3xl`}><SupportingCopy item={selectedItem} /></div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function MetricStrip({ block }: Pick<NumberedContentTreatmentProps, 'block'>) {
  const items = normaliseItems(block);

  return (
    <section data-numbered-treatment="metric-strip" className="min-w-0">
      {block.boxTitle && <h4 className="playbook-component-title mb-5 text-white">{block.boxTitle}</h4>}
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-rule)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ol className="flex w-max min-w-full bg-[var(--color-surface-1)] md:w-full">
          {items.map((item, index) => (
            <li
              key={`${item.title}-${index}`}
              className="group min-h-52 w-[13.5rem] shrink-0 border-r border-[var(--color-rule)] p-5 transition-colors duration-200 last:border-r-0 hover:bg-[var(--color-surface-2)] motion-reduce:transition-none md:w-0 md:min-w-0 md:flex-1"
            >
              <span className="mb-10 block text-4xl font-black leading-none tracking-[-0.06em] text-[var(--color-accent)] transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none">
                {index + 1}
              </span>
              <h5 className="text-base font-black leading-snug text-white">{displayTitle(item.title, index)}</h5>
              {(item.desc || item.example) && <div className="mt-3"><SupportingCopy item={item} /></div>}
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-2 text-[11px] font-semibold text-[var(--color-muted-text)] md:hidden">Swipe to view all metrics.</p>
    </section>
  );
}

export function NumberedContentTreatment(props: NumberedContentTreatmentProps) {
  if (props.treatment === 'filled-marker') return <FilledMarkerList block={props.block} />;
  if (props.treatment === 'accordion') return <NumberedAccordion block={props.block} pageId={props.pageId} />;
  if (props.treatment === 'editorial') return <EditorialNumberedList block={props.block} />;
  if (props.treatment === 'handoff') return <JoinedHandoff block={props.block} />;
  if (props.treatment === 'selector') return <NumberedSelector block={props.block} pageId={props.pageId} />;
  return <MetricStrip block={props.block} />;
}
