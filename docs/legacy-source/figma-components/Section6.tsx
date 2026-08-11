import { motion } from 'motion/react';
import { Calendar, CheckCircle2, TrendingUp } from 'lucide-react';

export function Section6() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/95">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#00DC51]/20 border border-[#00DC51]/40 rounded-full mb-6">
            <span className="text-[#00DC51] font-semibold text-sm">Section 6</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            The <span className="text-[#00DC51]">90-Day</span> AI Adoption Plan
          </h2>
          <p className="text-xl text-white/70">
            Your roadmap from foundations to your first agent
          </p>
        </motion.div>

        {/* The 90-Day Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid gap-8">
            {/* Days 1-30 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#00DC51]/20 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-8"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-[#00DC51] rounded-xl flex items-center justify-center">
                  <Calendar className="text-black" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">The First 30 Days: Build the Foundations</h3>
                  <p className="text-white/70">Establish policy, tools, and team understanding</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/40 rounded-lg p-6">
                  <h4 className="font-semibold text-[#00DC51] mb-3">Key Actions:</h4>
                  <ul className="space-y-3">
                    {[
                      'Define your AI acceptable use policy',
                      'Choose approved AI tools for the firm',
                      'Run an AI awareness session for the team',
                      'Introduce the four output checks',
                      'Establish the human-in-the-loop model',
                      'Create your first prompt library (5-10 standard prompts)',
                      'Track where time is currently spent on repetitive tasks'
                    ].map((action, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#00DC51] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-white/80">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#00DC51]/10 rounded-lg p-4 border-l-4 border-[#00DC51]">
                  <p className="text-sm font-semibold">
                    <span className="text-[#00DC51]">Goal:</span> Every team member understands what AI is allowed,
                    what's prohibited, and how to use it safely.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Days 31-60 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="text-[#00DC51]" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Days 31–60: Move from Prompts to Workflows</h3>
                  <p className="text-white/70">Standardise AI use and build repeatable processes</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/40 rounded-lg p-6">
                  <h4 className="font-semibold text-[#00DC51] mb-3">Key Actions:</h4>
                  <ul className="space-y-3">
                    {[
                      'Identify 3 high-frequency tasks where AI helps most',
                      'Document standardised prompts for these tasks',
                      'Create workflow packs (prompt + checklist + review steps)',
                      'Train the team on using workflow packs consistently',
                      'Introduce AI file notes for client-facing outputs',
                      'Run a capacity reflection: measure time saved so far',
                      'Choose your first agent candidate workflow'
                    ].map((action, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#00DC51] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-white/80">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#00DC51]/10 rounded-lg p-4 border-l-4 border-[#00DC51]">
                  <p className="text-sm font-semibold">
                    <span className="text-[#00DC51]">Goal:</span> AI use is consistent across the team,
                    embedded into defined workflows, and creating measurable capacity.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Days 61-90 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#00DC51]/20 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-8"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-[#00DC51] rounded-xl flex items-center justify-center text-black font-bold text-2xl">
                  90
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Days 61–90: Introduce Your First Agent</h3>
                  <p className="text-white/70">Deploy your first goal-driven AI workflow</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-black/40 rounded-lg p-6">
                  <h4 className="font-semibold text-[#00DC51] mb-3">Key Actions:</h4>
                  <ul className="space-y-3">
                    {[
                      'Complete the Agent Specification Template',
                      'Define the goal, inputs, actions, and review points',
                      'Set up the agent workflow in your systems',
                      'Run the agent with human review at every step',
                      'Track outcomes: time saved, accuracy, and client feedback',
                      'Refine the agent based on team input',
                      'Plan your next agent candidate'
                    ].map((action, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#00DC51] flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-white/80">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#00DC51]/10 rounded-lg p-4 border-l-4 border-[#00DC51]">
                  <p className="text-sm font-semibold">
                    <span className="text-[#00DC51]">Goal:</span> Your first agent is live, monitored,
                    and delivering measurable results with full professional oversight.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* The AI Scorecard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">The AI Scorecard</h3>
          <p className="text-white/70 mb-6">Track progress with these key metrics:</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { metric: 'Time saved per month', desc: 'Hours recovered from routine tasks' },
              { metric: 'Tasks with AI workflows', desc: 'Number of standardised AI-assisted processes' },
              { metric: 'Team confidence level', desc: '1-10 rating on AI comfort and competence' },
              { metric: 'Error rate', desc: 'Accuracy of AI-assisted outputs after review' },
              { metric: 'Client feedback', desc: 'Response to faster turnaround and improved service' },
              { metric: 'Capacity reinvestment', desc: 'How saved time is being used' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4"
              >
                <h4 className="font-bold text-[#00DC51] mb-1">{item.metric}</h4>
                <p className="text-sm text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Four Stages of the AI-Ready Firm */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">The Four Stages of the AI-Ready Firm</h3>
          
          <div className="space-y-4">
            {[
              { stage: 'Experimental', desc: 'Staff trying AI tools individually, no formal policy' },
              { stage: 'Structured', desc: 'Policy in place, approved tools, standardised workflows' },
              { stage: 'Agent-enabled', desc: 'First agents deployed with human oversight' },
              { stage: 'Orchestrated', desc: 'Multiple agents working together across systems' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                  i === 2 ? 'bg-[#00DC51] text-black' : 'bg-white/10 text-white/60'
                }`}>
                  {i + 1}
                </div>
                <div>
                  <h4 className={`font-bold mb-1 ${i === 2 ? 'text-[#00DC51]' : ''}`}>{item.stage}</h4>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#00DC51]/10 rounded-lg border border-[#00DC51]/30">
            <p className="text-sm text-white/80">
              <span className="text-[#00DC51] font-semibold">After 90 days:</span> Most firms will be at Stage 2 (Structured),
              moving toward Stage 3 (Agent-enabled). This is exactly where you should be.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
