import { useEffect, useRef, useState } from 'react';
import sectionOneDarkVideo from '../../assets/section-openers/auto-entry-1--over-dark--1416w1416h.mp4';
import sectionOneLightVideo from '../../assets/section-openers/auto-entry-1--over-light--1416w1416h.mp4';
import sectionTwoDarkVideo from '../../assets/section-openers/data-security--over-dark--1416w1416h.mp4';
import sectionTwoLightVideo from '../../assets/section-openers/data-security--over-light--1416w1416h.mp4';
import sectionThreeDarkVideo from '../../assets/section-openers/connect-your-accounts--over-dark--1416w1416h.mp4';
import sectionThreeLightVideo from '../../assets/section-openers/connect-your-accounts--over-light--1416w1416h.mp4';
import sectionFourDarkVideo from '../../assets/section-openers/create--over-dark--1416w1416h.mp4';
import sectionFourLightVideo from '../../assets/section-openers/create--over-light--1416w1416h.mp4';
import sectionFiveDarkVideo from '../../assets/section-openers/bank-feed--over-dark--1416w1416h.mp4';
import sectionFiveLightVideo from '../../assets/section-openers/bank-feed--over-light--1416w1416h.mp4';
import sectionSixDarkVideo from '../../assets/section-openers/announcements--over-dark--1416w1416h.mp4';
import sectionSixLightVideo from '../../assets/section-openers/announcements--over-light--1416w1416h.mp4';
import sectionSevenDarkVideo from '../../assets/section-openers/compliant--over-dark--1416w1416h.mp4';
import sectionSevenLightVideo from '../../assets/section-openers/compliant--over-light--1416w1416h.mp4';
import conclusionDarkVideo from '../../assets/section-openers/celebration-1--over-dark--1416w1416h.mp4';
import conclusionLightVideo from '../../assets/section-openers/celebration-1--over-light--1416w1416h.mp4';

type PlaybookTheme = 'dark' | 'light';

export type SectionOpenerId = 'section-1' | 'section-2' | 'section-3' | 'section-4' | 'section-5' | 'section-6' | 'section-7' | 'conclusion';

export interface SectionOpenerContent {
  startPageId: string;
  sectionLabel: string;
  titleBeforeAccent: string;
  titleAccent: string;
  titleAfterAccent: string;
  subtitle: string;
  learningHeading?: string;
  learningPoints: string[];
  darkVideo: string;
  lightVideo: string;
}

export const SECTION_OPENERS: Record<SectionOpenerId, SectionOpenerContent> = {
  'section-1': {
    startPageId: 's1-intro',
    sectionLabel: 'Section 1 \u00B7 Understanding AI',
    titleBeforeAccent: 'The Shift to ',
    titleAccent: 'AI-Assisted',
    titleAfterAccent: ' Firms',
    subtitle: 'AI is not about replacing accountants\u2014it\u2019s about giving you time back',
    learningPoints: [
      'Why AI changes firm capacity',
      'Where human judgement remains essential',
      'How AI-assisted firms operate differently'
    ],
    darkVideo: sectionOneDarkVideo,
    lightVideo: sectionOneLightVideo
  },
  'section-2': {
    startPageId: 's2-ethics-responsibility',
    sectionLabel: 'Section 2 \u00B7 Professional Guardrails',
    titleBeforeAccent: 'Professional ',
    titleAccent: 'Ethics',
    titleAfterAccent: ' and Responsibility in an AI World',
    subtitle: 'Your responsibilities don\u2019t change',
    learningPoints: [
      'The professional duties that do not change',
      'How to protect confidential information',
      'Where review and accountability must sit'
    ],
    darkVideo: sectionTwoDarkVideo,
    lightVideo: sectionTwoLightVideo
  },
  'section-3': {
    startPageId: 's3-where-assistants',
    sectionLabel: 'Section 3 \u00B7 Assistants & Agents',
    titleBeforeAccent: 'Where ',
    titleAccent: 'Assistants',
    titleAfterAccent: ' Help',
    subtitle: 'Understanding when to use AI assistants vs. when to build agent workflows',
    learningPoints: [
      'When an assistant is the right choice',
      'How agents differ from prompt-based tools',
      'Which workflows are suitable for agents'
    ],
    darkVideo: sectionThreeDarkVideo,
    lightVideo: sectionThreeLightVideo
  },
  'section-4': {
    startPageId: 's4-framework',
    sectionLabel: 'Section 4 \u00B7 Prompting Skills',
    titleBeforeAccent: 'The Accountant\u2019s ',
    titleAccent: 'Prompt Framework',
    titleAfterAccent: '',
    subtitle: 'How to get better results from AI assistants',
    learningPoints: [
      'How to structure a reliable prompt',
      'Which prompt types suit common work',
      'How prompts develop into workflows'
    ],
    darkVideo: sectionFourDarkVideo,
    lightVideo: sectionFourLightVideo
  },
  'section-5': {
    startPageId: 's5-dividend',
    sectionLabel: 'Section 5 \u00B7 Pricing & Economics',
    titleBeforeAccent: 'Understanding the ',
    titleAccent: 'AI Dividend',
    titleAfterAccent: '',
    subtitle: 'AI creates capacity. Firms must decide what to do with it.',
    learningPoints: [
      'How AI changes the economics of work',
      'Why time-based pricing becomes unstable',
      'How to make value more visible to clients'
    ],
    darkVideo: sectionFiveDarkVideo,
    lightVideo: sectionFiveLightVideo
  },
  'section-6': {
    startPageId: 's6-days1-30',
    sectionLabel: 'Section 6 \u00B7 90-Day Plan',
    titleBeforeAccent: 'The First ',
    titleAccent: '30 Days',
    titleAfterAccent: ': Build the Foundations',
    subtitle: 'Clarity, control, and confidence',
    learningPoints: [
      'What to establish in the first 30 days',
      'How to move from prompts to workflows',
      'When to introduce a first agent'
    ],
    darkVideo: sectionSixDarkVideo,
    lightVideo: sectionSixLightVideo
  },
  'section-7': {
    startPageId: 's7-policy',
    sectionLabel: 'Section 7 \u00B7 Templates & Tools',
    titleBeforeAccent: 'AI ',
    titleAccent: 'Acceptable Use Policy',
    titleAfterAccent: ' (Starter Template)',
    subtitle: 'Simple, clear expectations for AI use',
    learningPoints: [
      'How to set clear AI-use boundaries',
      'Which checks belong in every workflow',
      'How to document tools, agents and outputs'
    ],
    darkVideo: sectionSevenDarkVideo,
    lightVideo: sectionSevenLightVideo
  },
  'conclusion': {
    startPageId: 's7-finish',
    sectionLabel: 'Conclusion \u00B7 Completion & Certificate',
    titleBeforeAccent: 'Building Your ',
    titleAccent: 'AI-Ready',
    titleAfterAccent: ' Firm',
    subtitle: 'You\u2019re ready to begin',
    learningHeading: 'What you\u2019ll take forward',
    learningPoints: [
      'The framework and professional guardrails',
      'The skills, 90-day plan and practical templates',
      'One action to begin your AI journey'
    ],
    darkVideo: conclusionDarkVideo,
    lightVideo: conclusionLightVideo
  }
};

function getDocumentTheme(): PlaybookTheme {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  const root = document.documentElement;
  return root.dataset.theme === 'light' || root.classList.contains('light') ? 'light' : 'dark';
}

function useDocumentTheme() {
  const [theme, setTheme] = useState<PlaybookTheme>(getDocumentTheme);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setTheme(getDocumentTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

interface SectionOpenerProps {
  openerId: SectionOpenerId;
}

export function SectionOpener({ openerId }: SectionOpenerProps) {
  const content = SECTION_OPENERS[openerId];
  const theme = useDocumentTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSource = theme === 'light' ? content.lightVideo : content.darkVideo;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    video.play().catch(() => {
      // Autoplay is best-effort; the muted first frame remains visible if a browser blocks it.
    });
  }, [videoSource]);

  return (
    <div className="section-opener" data-section-opener={openerId}>
      <section className="overflow-hidden rounded-[24px] border border-[var(--color-rule)] bg-[var(--color-surface-1)] max-[700px]:rounded-[19px]" aria-labelledby={`${openerId}-opener-title`}>
        <div className="grid min-h-[520px] min-[1101px]:grid-cols-[minmax(0,1.08fr)_minmax(300px,.92fr)]">
          <div className="flex flex-col justify-center bg-[var(--color-page-background)] px-[clamp(2.25rem,5vw,3.875rem)] py-[clamp(2.25rem,5vw,3.875rem)] max-[700px]:px-[25px] max-[700px]:py-[42px]">
            <p className="mb-[22px] text-[0.77rem] font-black uppercase tracking-[0.13em] text-[var(--color-accent)]">
              {content.sectionLabel}
            </p>
            <h1
              id={`${openerId}-opener-title`}
              className="m-0 text-balance text-[clamp(2.25rem,4.5vw,3.75rem)] font-black leading-none tracking-[-0.03em] text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-family-header)' }}
            >
              {content.titleBeforeAccent}
              <span className="text-[var(--color-accent)]">{content.titleAccent}</span>
              {content.titleAfterAccent}
            </h1>
            <p className="mt-[25px] max-w-[650px] text-[clamp(1rem,1.5vw,1.18rem)] font-bold leading-[1.45] text-[var(--color-text-primary)]">
              {content.subtitle}
            </p>
          </div>

          <div className="grid min-h-[370px] place-items-center overflow-hidden border-t border-[var(--color-rule)] bg-[var(--color-surface-1)] min-[1101px]:min-h-[440px] min-[1101px]:border-l min-[1101px]:border-t-0">
            <video
              key={videoSource}
              ref={videoRef}
              className="h-auto max-h-[500px] w-[84%] max-w-[500px] object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src={videoSource} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[20px] border border-[var(--color-rule)] bg-[var(--color-surface-1)] p-[22px]" aria-labelledby={`${openerId}-learning-title`}>
        <h2
          id={`${openerId}-learning-title`}
          className="mb-[15px] text-[1.3rem] font-black text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-family-header)' }}
        >
          {content.learningHeading || 'What you’ll learn'}
        </h2>
        <ol className="grid gap-[10px] min-[701px]:grid-cols-3">
          {content.learningPoints.map((point, index) => (
            <li key={point} className="flex items-start gap-[11px] border-t border-[var(--color-rule)] p-[14px]">
              <span className="font-black text-[var(--color-accent)]" aria-hidden="true">{index + 1}</span>
              <span className="text-[0.82rem] font-bold leading-[1.4] text-[var(--color-text-primary)]">{point}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
