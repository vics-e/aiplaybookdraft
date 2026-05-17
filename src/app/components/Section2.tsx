import { motion } from 'motion/react';
import { Shield, AlertTriangle, FileCheck, Lock } from 'lucide-react';

export function Section2() {
  return (
    <section className="py-20 bg-gradient-to-b from-black/95 to-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#00DC51]/20 border border-[#00DC51]/40 rounded-full mb-6">
            <span className="text-[#00DC51] font-semibold text-sm">Section 2</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Professional <span className="text-[#00DC51]">Guardrails</span> for AI
          </h2>
          <p className="text-xl text-white/70">
            Ethics, policies, and controls for safe AI adoption
          </p>
        </motion.div>

        {/* Professional Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Professional Principles for AI in Accountancy</h3>
            <p className="text-white/70 mb-6">
              Artificial intelligence does not change the professional responsibilities of accountants.
              Professional codes of ethics make it clear that responsibility always remains with the accountant and the firm.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, title: 'Integrity', desc: 'Be honest and straightforward in all professional work' },
                { icon: FileCheck, title: 'Objectivity', desc: 'Do not allow bias or undue influence' },
                { icon: Lock, title: 'Confidentiality', desc: 'Protect client and firm information at all times' },
                { icon: AlertTriangle, title: 'Due Care', desc: 'Maintain knowledge and skill, review work properly' }
              ].map((principle, i) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/40 border border-[#00DC51]/20 rounded-lg p-4"
                  >
                    <Icon className="text-[#00DC51] mb-2" size={24} />
                    <h4 className="font-bold mb-1">{principle.title}</h4>
                    <p className="text-sm text-white/60">{principle.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* The Real Risk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 p-8 rounded-r-xl">
            <h3 className="text-2xl font-bold mb-4">The Real Risk: AI Without Process</h3>
            <p className="text-white/70 mb-4">
              AI itself is not the biggest risk. The real risk is unstructured AI use when staff use unapproved tools,
              paste client data into personal accounts, don't review outputs, or keep no audit trail.
            </p>
            <div className="bg-black/40 rounded-lg p-6 mt-6">
              <p className="text-[#00DC51] font-semibold mb-3">Why structured workflows matter:</p>
              <p className="text-white/70">
                AI works best when it follows defined structures, inside defined workflows, with clear human review points.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Minimum AI Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">The Minimum AI Policy Every Firm Needs</h3>
          <div className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-8">
            <div className="space-y-6">
              {[
                { num: 1, title: 'Approved tools', desc: 'Which AI systems staff are allowed to use' },
                { num: 2, title: 'Prohibited data', desc: 'What must never be entered into AI tools' },
                { num: 3, title: 'Review requirements', desc: 'What must be checked before outputs are used' },
                { num: 4, title: 'Responsibility', desc: 'Who signs off the final work' },
                { num: 5, title: 'Escalation', desc: 'What to do when AI outputs are uncertain or incorrect' }
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#00DC51] rounded-lg flex items-center justify-center text-black font-bold">
                    {item.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Four Output Checks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">The Four Output Checks</h3>
          <p className="text-white/70 mb-6">Before using any AI output, perform four simple checks:</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Accuracy', question: 'Are the facts, figures, and statements correct?' },
              { title: 'Completeness', question: 'Is anything missing? Are there unanswered questions?' },
              { title: 'Professional tone', question: 'Is the wording appropriate, clear, and suitable for the client?' },
              { title: 'Compliance & ethics', question: 'Does the output follow professional standards and firm policies?' }
            ].map((check, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#00DC51] rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{check.title}</h4>
                    <p className="text-sm text-white/60">{check.question}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Human-in-the-Loop Model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#00DC51]/20 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">The Human-in-the-Loop Model</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-[#00DC51] font-bold">1</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">AI prepares</h4>
                <p className="text-white/70 text-sm">AI collects information, performs checks, drafts outputs, prepares summaries</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-[#00DC51] font-bold">2</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">Accountant reviews</h4>
                <p className="text-white/70 text-sm">The accountant reviews results, applies judgement, makes adjustments</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#00DC51] rounded-lg flex items-center justify-center text-black">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h4 className="font-bold mb-1">Accountant approves</h4>
                <p className="text-white/70 text-sm">The accountant signs off, sends to client, and takes responsibility</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center font-semibold text-lg">
              AI performs the steps. <span className="text-[#00DC51]">The accountant remains accountable.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
