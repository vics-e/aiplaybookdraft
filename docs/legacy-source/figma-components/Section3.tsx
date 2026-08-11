import { motion } from 'motion/react';
import { Bot, User, ArrowRight, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Section3() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#00DC51]/20 border border-[#00DC51]/40 rounded-full mb-6">
            <span className="text-[#00DC51] font-semibold text-sm">Section 3</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-[#00DC51]">Assistants</span> & <span className="text-[#00DC51]">Agents</span>
          </h2>
          <p className="text-xl text-white/70">
            The new workflow model for accounting firms
          </p>
        </motion.div>

        {/* Assistants vs Agents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Assistants vs Agents: Understanding the Difference</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Assistants */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <User className="text-blue-400" size={24} />
                </div>
                <h4 className="text-2xl font-bold">Assistant-led Work</h4>
              </div>
              
              <div className="space-y-4">
                <p className="text-white/70">
                  The accountant performs the process, uses AI to help with tasks, and remains in control throughout.
                </p>
                
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-sm font-semibold text-white/90 mb-2">Examples:</p>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Drafting emails</li>
                    <li>• Summarising notes</li>
                    <li>• Preparing explanations</li>
                  </ul>
                </div>
                
                <p className="text-sm text-white/60 italic">
                  The assistant responds to instructions, and the human performs the overall process.
                </p>
              </div>
            </motion.div>

            {/* Agents */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#00DC51]/20 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#00DC51] rounded-lg flex items-center justify-center">
                  <Bot className="text-black" size={24} />
                </div>
                <h4 className="text-2xl font-bold">Agent-led Work</h4>
              </div>
              
              <div className="space-y-4">
                <p className="text-white/70">
                  The agent works toward a defined goal, determines the steps required within set guardrails,
                  operates across multiple actions, and prepares the result for review.
                </p>
                
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-sm font-semibold text-white/90 mb-2">The accountant:</p>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>• Reviews the outcome</li>
                    <li>• Applies judgement</li>
                    <li>• Approves and sends the result</li>
                  </ul>
                </div>
                
                <p className="text-sm text-[#00DC51] font-semibold">
                  All agent-led work follows a human-in-the-loop model.
                </p>
              </div>
            </motion.div>
          </div>

          {/* The Key Shift */}
          <div className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-6">
            <h4 className="font-bold text-xl mb-4">The key shift</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-white/60">Old model:</span>
                <ArrowRight className="text-[#00DC51]" size={20} />
                <span>Human performs tasks → time spent</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/60">Assistant model:</span>
                <ArrowRight className="text-[#00DC51]" size={20} />
                <span>Human performs process → AI helps with tasks</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#00DC51] font-semibold">Agent model:</span>
                <ArrowRight className="text-[#00DC51]" size={20} />
                <span className="text-[#00DC51]">Agent works toward outcome → human reviews and approves</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Agent Workflows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8">The Core Agent Workflows in a Firm</h3>
          
          <div className="grid gap-6">
            {[
              {
                title: 'Quarterly Update Preparation',
                goal: 'Prepare a complete and accurate quarterly update, while identifying trends and potential issues',
                actions: [
                  'Collect records from approved sources',
                  'Check completeness',
                  'Identify gaps or missing data',
                  'Analyse movements and identify trends',
                  'Prepare the quarterly update',
                  'Flag unusual items or risks for review'
                ]
              },
              {
                title: 'Period-End Preparation',
                goal: 'Prepare period-end figures and highlight significant changes',
                actions: [
                  'Review the ledger',
                  'Identify unusual movements',
                  'Analyse variances',
                  'Prepare draft workpapers',
                  'Present key changes for review'
                ]
              },
              {
                title: 'Client Onboarding',
                goal: 'Complete onboarding efficiently and consistently',
                actions: [
                  'Request required information',
                  'Track outstanding items',
                  'Perform identity checks',
                  'Prepare engagement documents',
                  'Confirm when onboarding is complete'
                ]
              },
              {
                title: 'Client Chaser',
                goal: 'Ensure required client information is received on time',
                actions: [
                  'Monitor outstanding items',
                  'Send scheduled reminders',
                  'Escalate where needed',
                  'Track responses'
                ]
              }
            ].map((workflow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00DC51]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#00DC51] font-bold text-xl">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">{workflow.title}</h4>
                    <p className="text-white/60 text-sm mb-4">
                      <span className="text-[#00DC51] font-semibold">Goal:</span> {workflow.goal}
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-white/80">The agent can:</p>
                      <ul className="space-y-1">
                        {workflow.actions.map((action, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                            <CheckCircle className="text-[#00DC51] flex-shrink-0 mt-0.5" size={16} />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Agent Maturity Ladder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8">The Agent Maturity Ladder</h3>
          <p className="text-white/70 mb-8">AI adoption usually follows a clear progression:</p>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-[#00DC51]/50 to-[#00DC51]" />
            
            <div className="space-y-6">
              {[
                { stage: 1, title: 'Prompts', desc: 'Staff use AI to answer questions or draft text. Work is still entirely human-led.' },
                { stage: 2, title: 'Assistants', desc: 'AI is used regularly for defined tasks. It helps with drafting, checking, and summarising.' },
                { stage: 3, title: 'Workflow packs', desc: 'Prompts, checklists, and processes are standardised across the firm.' },
                { stage: 4, title: 'Agents', desc: 'AI operates inside systems to achieve defined goals. It can perform multiple steps and prepare results for review.' },
                { stage: 5, title: 'Orchestrated agents', desc: 'Multiple agents work together across systems, coordinating tasks and delivering end-to-end outcomes.' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  <div className={`absolute left-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                    i >= 3 ? 'bg-[#00DC51] text-black' : 'bg-white/10 text-white/60'
                  }`}>
                    {item.stage}
                  </div>
                  <div className={`p-4 rounded-lg ${i >= 3 ? 'bg-[#00DC51]/10 border border-[#00DC51]' : 'bg-white/5 border border-white/10'}`}>
                    <h4 className={`font-bold mb-1 ${i >= 3 ? 'text-[#00DC51]' : ''}`}>{item.title}</h4>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzI0NTE0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team collaboration"
            className="w-full h-96 object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
