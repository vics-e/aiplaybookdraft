import { motion } from 'motion/react';
import { MessageSquare, User, Target, FileText, AlertCircle } from 'lucide-react';

export function Section4() {
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
            <span className="text-[#00DC51] font-semibold text-sm">Section 4</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-[#00DC51]">Assistant Skills</span> & Prompting
          </h2>
          <p className="text-xl text-white/70">
            Mastering the art of communicating with AI
          </p>
        </motion.div>

        {/* The Prompt Framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold mb-6">The Accountant's Prompt Framework</h3>
          <p className="text-white/70 mb-8">
            AI assistants work best when instructions are clear, structured, and purposeful. A vague question produces a vague answer.
            A structured prompt produces a useful result.
          </p>

          <div className="bg-gradient-to-br from-[#00DC51]/20 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-8">
            <h4 className="text-xl font-bold mb-6 text-center">Every effective prompt has four parts:</h4>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: User,
                  title: '1. Role',
                  desc: 'Who the AI should act as',
                  example: '"You are an accountant..." or "You are a payroll specialist..."'
                },
                {
                  icon: Target,
                  title: '2. Task',
                  desc: 'What you want it to do',
                  example: 'Draft an email, summarise a report, explain a variance, prepare a checklist'
                },
                {
                  icon: FileText,
                  title: '3. Context',
                  desc: 'The situation, background, or data',
                  example: 'Type of client, industry, financial figures, previous discussion points'
                },
                {
                  icon: AlertCircle,
                  title: '4. Constraints',
                  desc: 'Any rules the output must follow',
                  example: 'Word limit, tone requirements, format specifications'
                }
              ].map((part, i) => {
                const Icon = part.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/40 rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="text-black" size={20} />
                      </div>
                      <h5 className="font-bold text-lg">{part.title}</h5>
                    </div>
                    <p className="text-white/70 text-sm mb-3">{part.desc}</p>
                    <p className="text-xs text-white/50 italic">Example: {part.example}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Five Prompt Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">The Five Prompt Types Every Accountant Should Know</h3>
          
          <div className="space-y-4">
            {[
              {
                type: 'Drafting prompt',
                use: 'Creating client communications, reports, or explanations',
                example: 'You are an accountant. Draft a professional email to a client explaining a £5,000 variance in their Q3 management accounts. Keep it concise (under 150 words) and client-friendly.'
              },
              {
                type: 'Summarising prompt',
                use: 'Condensing meeting notes, reports, or long documents',
                example: 'You are an accountant. Summarise the key points from this client meeting note in 5 bullet points, focusing on action items and decisions made.'
              },
              {
                type: 'Explaining prompt',
                use: 'Making complex information clearer for clients',
                example: 'You are a tax accountant. Explain Making Tax Digital requirements to a small business owner in simple, non-technical language.'
              },
              {
                type: 'Checking prompt',
                use: 'Reviewing work for errors, completeness, or consistency',
                example: 'You are an accountant. Review this expense claim and identify any missing receipts, incorrect categorisation, or policy breaches.'
              },
              {
                type: 'Planning prompt',
                use: 'Creating checklists, workflows, or action plans',
                example: 'You are an accountant. Create a 10-point checklist for year-end preparation for a small retail client.'
              }
            ].map((prompt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#00DC51]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#00DC51] font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-2">{prompt.type}</h4>
                    <p className="text-sm text-white/60 mb-3">Use: {prompt.use}</p>
                    <div className="bg-black/40 rounded-lg p-4 border-l-2 border-[#00DC51]">
                      <p className="text-sm text-white/70 italic">"{prompt.example}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* From Prompts to Workflows to Agents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">From Prompts to Workflows to Agents</h3>
          <div className="space-y-4 text-white/70">
            <p>
              <strong className="text-white">Prompts</strong> are where most firms start. They help with individual tasks and produce quick results.
            </p>
            <p>
              <strong className="text-white">Workflows</strong> emerge when firms standardise prompts and build repeatable processes around them.
            </p>
            <p>
              <strong className="text-[#00DC51]">Agents</strong> take workflows further by operating autonomously toward defined goals,
              making prompting invisible to the user.
            </p>
            <div className="mt-6 p-4 bg-[#00DC51]/10 rounded-lg border border-[#00DC51]/30">
              <p className="text-[#00DC51] font-semibold">
                The journey: Master prompts → Standardise workflows → Deploy agents
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
