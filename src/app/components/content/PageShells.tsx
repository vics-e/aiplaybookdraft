import { motion } from 'motion/react';
import type { ComponentType } from 'react';
import type { PlaybookPage } from '../../data/playbookData';
import coverBackground from '../../../assets/7d10c58b13d65e57e14197ae9cce3c931f5cc649.png';
import sageLogo from '../../../assets/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png';

interface CoverPageProps {
  goToPage: (page: number) => void;
}

export function CoverPage({ goToPage }: CoverPageProps) {
  return (
    <div className="playbook-cover relative flex h-full flex-col overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src={coverBackground} alt="" className="absolute h-full w-full object-cover" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-5 pt-20 sm:px-10 sm:pt-24 lg:px-16">
        <div className="mb-12 flex-shrink-0">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="leading-[0.9] tracking-tight"
            style={{ fontFamily: 'var(--font-family-header)', fontWeight: 900 }}
          >
            <div className="mb-3 text-4xl font-black text-white sm:text-5xl lg:text-7xl">THE AI PLAYBOOK</div>
            <div className="text-4xl font-black leading-[0.9] text-[#00DC51] sm:text-5xl lg:text-7xl">
              For Accountants &amp;<br />
              Bookkeepers
            </div>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 max-w-2xl flex-shrink-0"
        >
          <p className="text-base font-medium leading-relaxed text-white/95">
            From assistants to agents: building the AI-ready firm.<br />
            Artificial intelligence is now part of everyday accountancy.
          </p>
        </motion.div>

        <div className="flex-grow" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex-shrink-0 pb-12 sm:pb-24"
        >
          <button
            onClick={() => goToPage(1)}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#00DC51] px-8 py-3.5 text-base font-black text-black shadow-lg shadow-[#00DC51]/40 transition-all hover:scale-105 hover:bg-[#00FF5F] hover:shadow-[#00DC51]/60"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            <span>Start Playbook</span>
            <span className="text-xl font-black transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>

      <motion.img
        src={sageLogo}
        alt="Sage"
        className="absolute bottom-4 right-8 z-20 h-14 w-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      />
    </div>
  );
}

interface ContentsPageProps {
  page: PlaybookPage;
  goToPage: (page: number) => void;
  getIcon: (iconName: string) => ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}

export function ContentsPage({ page, goToPage, getIcon }: ContentsPageProps) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-4xl font-black tracking-tight md:text-5xl" style={{ fontFamily: 'var(--font-family-header)' }}>Contents</h2>
        <p className="mb-2 text-lg font-medium text-white/70">Your roadmap to AI adoption</p>
        <p className="mx-auto max-w-2xl text-sm font-medium text-white/50">
          This playbook is designed to help firms move from experimentation to structured, confident adoption.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2">
        {page.sections?.map((section, index) => {
          const Icon = getIcon(section.icon);
          return (
            <motion.button
              type="button"
              key={index}
              initial={false}
              className="group w-full rounded-xl border-2 border-white/10 bg-white/[0.03] p-5 text-left transition-all hover:border-[var(--color-accent)] hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              onClick={() => goToPage(section.startPageIndex)}
            >
              <div className="flex items-center gap-4">
                <div className="accent-bg-soft accent-border-soft flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105">
                  <Icon className="accent-text" size={22} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  {section.sectionLabel && (
                    <p className="accent-text mb-1 text-xs font-black uppercase tracking-wider">{section.sectionLabel}</p>
                  )}
                  <h3 className="mb-0.5 text-base font-bold transition-colors group-hover:text-[var(--color-accent)]">{section.title}</h3>
                  <p className="text-xs font-medium text-white/50">{section.pages}</p>
                </div>
                <div className="accent-text text-sm font-black tabular-nums">{section.pageNumber}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
