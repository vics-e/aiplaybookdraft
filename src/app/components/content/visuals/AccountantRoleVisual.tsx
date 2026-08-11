import { motion } from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle,
  Database,
  Eye,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

export function AccountantRoleVisual({ pageId }: { pageId: string }) {
  const page = { id: pageId };

  return (
    <>
      {/* Custom Graphic for New Role of the Accountant */}
      {page.id === 's1-role' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* What AI Can Do vs What Accountants Must Do */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Can Do Well */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/5 border-2 border-white/20 rounded-xl p-6 hover:border-white/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border-2 border-blue-400/50">
                  <Bot className="text-blue-400" size={24} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-lg">What AI Can Do Well</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Draft communications</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Summarise data</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Check consistency</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Spot errors</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Prepare reports</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Follow workflows</p>
                </li>
              </ul>
            </motion.div>

            {/* What Accountants Must Do */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#00DC51]/30 rounded-xl flex items-center justify-center border-2 border-[#00DC51]">
                  <Target className="text-[#00DC51]" size={24} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-lg text-[#00DC51]">What Accountants Must Still Do</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Apply judgement</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Make decisions</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Interpret context</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Advise clients</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Strengthen relationships</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Take responsibility</p>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* The Shift - Enhanced Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="rounded-2xl overflow-hidden border-2 border-[#00DC51]/40 shadow-2xl shadow-[#00DC51]/20 bg-gradient-to-br from-[#00DC51]/10 to-[#00DC51]/5 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#00DC51] rounded-xl flex items-center justify-center shadow-lg shadow-[#00DC51]/40">
                <TrendingUp className="text-black" size={24} strokeWidth={2.5} />
              </div>
              <h4 className="font-black text-xl text-[#00DC51]">The Shift</h4>
            </div>

            <div className="flex items-center gap-3 justify-between">
              {/* Stage 1: Processor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/30 rounded-xl p-5 text-center flex-1 shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-white/40"
                >
                  <Database className="text-white" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-white">Processor</p>
                <p className="text-xs text-white/70 font-semibold mt-2">Data Handler</p>
                <p className="text-xs text-white/50 mt-3 leading-relaxed">Enters & manages data</p>
              </motion.div>

              {/* Arrow 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="flex items-center gap-1 flex-shrink-0"
              >
                <div className="h-px w-8 bg-gradient-to-r from-white/30 to-white/50"></div>
                <ArrowRight className="text-white/50" size={28} strokeWidth={3} />
                <div className="h-px w-8 bg-gradient-to-r from-white/50 to-white/30"></div>
              </motion.div>

              {/* Stage 2: Reviewer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="bg-gradient-to-br from-white/15 to-white/8 border-2 border-white/40 rounded-xl p-5 text-center flex-1 shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-white/25 rounded-lg flex items-center justify-center mx-auto mb-3 border border-white/50"
                >
                  <Eye className="text-white" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-white">Reviewer</p>
                <p className="text-xs text-white/80 font-semibold mt-2">Insight Provider</p>
                <p className="text-xs text-white/60 mt-3 leading-relaxed">Validates & spots patterns</p>
              </motion.div>

              {/* Arrow 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                className="flex items-center gap-1 flex-shrink-0"
              >
                <div className="h-px w-8 bg-gradient-to-r from-white/40 to-[#00DC51]/60"></div>
                <ArrowRight className="text-[#00DC51]" size={28} strokeWidth={3} />
                <div className="h-px w-8 bg-gradient-to-r from-[#00DC51]/60 to-[#00DC51]/40"></div>
              </motion.div>

              {/* Stage 3: Adviser */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                className="bg-gradient-to-br from-[#00DC51]/30 to-[#00DC51]/15 border-2 border-[#00DC51] rounded-xl p-5 text-center shadow-xl shadow-[#00DC51]/40 flex-1"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-[#00DC51]/40 rounded-lg flex items-center justify-center mx-auto mb-3 border border-[#00DC51]"
                >
                  <Sparkles className="text-[#00DC51]" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-[#00DC51]">Adviser</p>
                <p className="text-xs text-[#00DC51]/90 font-bold mt-2">Trusted Partner</p>
                <p className="text-xs text-[#00DC51]/70 mt-3 leading-relaxed">Provides strategy & growth</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
