import { motion } from 'motion/react';

interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
}

export function ProgressBar({ currentPage, totalPages }: ProgressBarProps) {
  const progress = (currentPage / (totalPages - 1)) * 100;

  return (
    <div className="fixed top-[81px] left-0 right-0 h-1 bg-white/5 z-40">
      <motion.div
        className="h-full bg-gradient-to-r from-[#00DC51] to-[#00FF5F] shadow-[0_0_12px_rgba(0,220,81,0.5)]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
