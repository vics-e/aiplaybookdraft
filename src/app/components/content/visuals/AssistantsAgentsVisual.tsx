import { motion } from 'motion/react';
import { Bot, MessageSquare } from 'lucide-react';

export function AssistantsAgentsVisual({ pageId }: { pageId: string }) {
  const page = { id: pageId };

  return (
    <>
      {/* Custom Graphic for Assistants vs Agents */}
      {page.id === 's3-difference' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-blue-500/10 border-2 border-blue-400/40 rounded-xl p-6 flex flex-col shadow-lg shadow-blue-500/10 hover:border-blue-400/60 transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 border-2 border-blue-400/50 shadow-lg shadow-blue-500/20">
                  <MessageSquare className="text-blue-400" size={26} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-blue-400">AI Assistant</h3>

                {/* Subtitle */}
                <div className="mb-4 pb-4 border-b border-blue-400/20">
                  <p className="text-sm font-bold text-blue-400/80 italic">
                    Assistants respond to what you ask.
                  </p>
                </div>

                <p className="text-sm text-white/80 font-medium leading-relaxed mb-5">
                  You drive the process. AI responds to prompts and helps with tasks along the way. You remain in control at every step.
                </p>

                {/* Examples */}
                <div className="bg-blue-500/20 border-2 border-blue-400/30 rounded-lg p-4 mt-auto">
                  <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-3">Examples in Practice</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Summarise this client email"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Draft a response to this query"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Explain this variance"
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* AI Agent */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 flex flex-col shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-[#00DC51]/30 rounded-xl flex items-center justify-center mb-4 border-2 border-[#00DC51] shadow-lg shadow-[#00DC51]/30">
                  <Bot className="text-[#00DC51]" size={26} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-[#00DC51]">AI Agent</h3>

                {/* Subtitle */}
                <div className="mb-4 pb-4 border-b border-[#00DC51]/20">
                  <p className="text-sm font-bold text-[#00DC51]/80 italic">
                    Agents work toward what you want to achieve.
                  </p>
                </div>

                <p className="text-sm text-white/80 font-medium leading-relaxed mb-5">
                  Agent works autonomously toward a goal. It determines the steps, performs actions within guardrails, and presents results for your review.
                </p>

                {/* Examples */}
                <div className="bg-[#00DC51]/20 border-2 border-[#00DC51]/30 rounded-lg p-4 mt-auto">
                  <div className="text-xs font-black text-[#00DC51] uppercase tracking-wider mb-3">Examples in Practice</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Prepare the quarterly update for Client X, identify any issues, and draft the client communication"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Review all outstanding items for clients in Group A, send reminders where needed, and flag urgent cases"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Complete the month-end close checks and prepare the management report"
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
