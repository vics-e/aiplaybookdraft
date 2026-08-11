import { motion } from 'motion/react';
import type { NumberedTreatment } from '../../NumberedContentTreatments';

interface ThreeStagesVisualProps {
  pageId: string;
  numberedTreatment?: NumberedTreatment;
}

export function ThreeStagesVisual({ pageId, numberedTreatment }: ThreeStagesVisualProps) {
  const page = { id: pageId };

  return (
    <>
      {/* Custom Graphic for Three Stages */}
      {page.id === 's1-stages' && !numberedTreatment && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Stage 1 - Automation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/5 border-2 border-white/20 rounded-xl p-6 flex flex-col hover:border-white/40 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border-2 border-white/30">
                  <div className="text-white font-black text-sm">Step 1</div>
                </div>
                <h3 className="text-2xl font-black mb-3">Automation</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">Rules-based systems: bank feeds, automated postings, OCR. Predictable but limited.</p>
              </div>
            </motion.div>

            {/* Arrow 1 */}
            <div className="hidden md:flex absolute top-[120px] left-[30%] items-center justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-[#00DC51] font-black text-2xl"
              >
                →
              </motion.div>
            </div>

            {/* Stage 2 - AI Assistants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/5 border-2 border-[#00DC51]/30 rounded-xl p-6 flex flex-col hover:border-[#00DC51]/50 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-[#00DC51]/20 rounded-2xl flex items-center justify-center mb-4 border-2 border-[#00DC51]/40">
                  <div className="text-[#00DC51] font-black text-sm">Step 2</div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-white">AI Assistants</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">AI helps with tasks: drafting emails, summarizing info, explaining figures. Requires prompts and human direction.</p>
              </div>
            </motion.div>

            {/* Arrow 2 */}
            <div className="hidden md:flex absolute top-[120px] left-[63.5%] items-center justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-[#00DC51] font-black text-2xl"
              >
                →
              </motion.div>
            </div>

            {/* Stage 3 - AI Agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 flex flex-col shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-[#00DC51]/30 rounded-2xl flex items-center justify-center mb-4 border-2 border-[#00DC51] shadow-lg shadow-[#00DC51]/30">
                  <div className="text-[#00DC51] font-black text-sm">Step 3</div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-[#00DC51]">AI Agents</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">AI operates with a defined goal: performs multiple steps, works inside systems, presents results for approval.</p>
              </div>
            </motion.div>
          </div>

          {/* Evolution Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center mt-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-white/20 to-[#00DC51]/40" />
              <div className="text-xs font-black text-white/40 uppercase tracking-wider">Evolution of AI</div>
              <div className="h-px w-12 bg-gradient-to-r from-[#00DC51]/40 to-[#00DC51]" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
