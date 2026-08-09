import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import type { ContentBlock } from '../data/playbookData';

export type NumberedTreatment = 'filled-marker' | 'accordion' | 'horizontal';

// This mapping records the approved content intent. Pages absent from it keep their
// specialist renderer or have no numbered-content treatment in this wave.
export const NUMBERED_TREATMENT_BY_PAGE_ID: Record<string, NumberedTreatment> = {
  's1-capacity': 'filled-marker',
  's2-risk': 'filled-marker',
  's2-checks': 'filled-marker',
  's6-scorecard': 'filled-marker',
  's6-strategic-questions': 'filled-marker',
  's7-policy': 'filled-marker',

  's1-framework': 'accordion',
  's2-ethics-responsibility': 'accordion',
  's2-data-confidentiality': 'accordion',
  's2-legal-responsibility': 'accordion',
  's2-failure-modes': 'accordion',
  's2-over-reliance': 'accordion',
  's2-evidence-trail': 'accordion',
  's2-red-team': 'accordion',
  's3-first-agent': 'accordion',
  's3-confidence': 'accordion',
  's4-types': 'accordion',
  's5-dividend': 'accordion',
  's5-time-pricing': 'accordion',
  's5-pricing': 'accordion',
  's5-3v-framework': 'accordion',
  's5-client-talk': 'accordion',
  's6-days1-30': 'accordion',
  's6-days31-60': 'accordion',
  's6-days61-90': 'accordion',

  's1-stages': 'horizontal',
  's1-human-loop': 'horizontal',
  's3-workflow-map': 'horizontal',
  's3-maturity': 'horizontal',
  's4-framework': 'horizontal',
  's4-progression': 'horizontal',
  's6-rhythm': 'horizontal',
  's6-four-stages': 'horizontal',
};

const CONNECTED_HORIZONTAL_PAGE_IDS = new Set([
  's1-stages',
  's1-human-loop',
  's3-workflow-map',
  's3-maturity',
  's4-progression',
  's6-rhythm',
  's6-four-stages',
]);

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

function SupportingCopy({ item }: { item: NumberedItem }) {
  return (
    <>
      {item.desc && (
        <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-white">
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
          <li key={`${item.title}-${index}`} className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-black">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <h5 className="text-base font-black leading-snug text-white">{displayTitle(item.title, index)}</h5>
              {(item.desc || item.example) && <div className="mt-2"><SupportingCopy item={item} /></div>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function NumberedAccordion({ block, pageId }: Pick<NumberedContentTreatmentProps, 'block' | 'pageId'>) {
  const items = normaliseItems(block);
  const componentId = useId().replace(/:/g, '');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

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
                className="group/accordion flex w-full items-start gap-3 rounded-lg px-1 py-3.5 text-left outline-none transition-colors hover:bg-white/[0.03] sm:gap-4"
              >
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black text-black transition-colors group-focus-visible/accordion:ring-2 group-focus-visible/accordion:ring-[var(--color-accent)] group-focus-visible/accordion:ring-offset-2 group-focus-visible/accordion:ring-offset-black ${isExpanded ? 'bg-[var(--color-accent)]' : 'bg-white'}`}>
                  {index + 1}
                </span>
                <span className="flex min-w-0 items-center gap-2 pt-1">
                  <span className="text-sm font-black leading-snug text-white sm:text-base">{displayTitle(item.title, index)}</span>
                  <span className={`inline-flex shrink-0 transition-all group-hover/accordion:translate-x-0.5 group-hover/accordion:text-[var(--color-accent)] ${isExpanded ? 'text-[var(--color-accent)]' : 'text-white/60'}`} aria-hidden="true">
                    {isExpanded ? <Minus size={17} strokeWidth={2.8} /> : <Plus size={17} strokeWidth={2.8} />}
                  </span>
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

function HorizontalNumberedSequence({ block, pageId }: Pick<NumberedContentTreatmentProps, 'block' | 'pageId'>) {
  const items = normaliseItems(block);
  const componentId = useId().replace(/:/g, '');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const showsConnector = CONNECTED_HORIZONTAL_PAGE_IDS.has(pageId);

  const toggleItem = (index: number) => {
    setExpandedItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section data-numbered-treatment="horizontal" className="min-w-0">
      {block.boxTitle && <h4 className="playbook-component-title mb-5 text-white">{block.boxTitle}</h4>}
      <div className="-mx-1 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ol className="flex w-max min-w-full snap-x snap-mandatory md:w-full">
          {items.map((item, index) => (
            <li
              key={`${item.title}-${index}`}
              className="relative w-[15rem] shrink-0 snap-start pr-6 last:pr-0 md:w-0 md:min-w-0 md:flex-1"
            >
              {(() => {
                const isExpanded = expandedItems.has(index);
                const triggerId = `${componentId}-sequence-trigger-${index}`;
                const panelId = `${componentId}-sequence-panel-${index}`;

                return (
                  <>
              {showsConnector && index < items.length - 1 && (
                <span className="absolute left-10 right-0 top-4 h-px bg-[var(--color-rule)]" aria-hidden="true" />
              )}
              <div className="relative z-10 mb-4 flex h-8 w-8 items-center text-xl font-black leading-none text-[var(--color-accent)]">
                {index + 1}
              </div>
              <div className="pr-2">
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggleItem(index)}
                  className="group flex items-start gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  <span className="text-base font-black leading-snug text-white">{displayTitle(item.title, index)}</span>
                  <span className="mt-0.5 shrink-0 text-[var(--color-accent)] transition-transform group-hover:scale-110" aria-hidden="true">
                    {isExpanded ? <Minus size={16} strokeWidth={2.8} /> : <Plus size={16} strokeWidth={2.8} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (item.desc || item.example) && (
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
                      <div className="mt-2"><SupportingCopy item={item} /></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
                  </>
                );
              })()}
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-1 text-[11px] font-semibold text-[var(--color-muted-text)] md:hidden">
        Swipe to follow the full sequence.
      </p>
    </section>
  );
}

export function NumberedContentTreatment(props: NumberedContentTreatmentProps) {
  if (props.treatment === 'filled-marker') return <FilledMarkerList block={props.block} />;
  if (props.treatment === 'accordion') return <NumberedAccordion block={props.block} pageId={props.pageId} />;
  return <HorizontalNumberedSequence block={props.block} pageId={props.pageId} />;
}
