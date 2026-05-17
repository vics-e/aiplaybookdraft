import { motion } from 'motion/react';
import { FileText, Download, CheckSquare, FileCheck } from 'lucide-react';
import { useState } from 'react';

export function Section7() {
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const toggleTemplate = (id: string) => {
    setExpandedTemplate(expandedTemplate === id ? null : id);
  };

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
            <span className="text-[#00DC51] font-semibold text-sm">Section 7</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-[#00DC51]">Templates</span> & Practical Tools
          </h2>
          <p className="text-xl text-white/70">
            Ready-to-use resources for your firm
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid gap-6 mb-12">
          {/* AI Acceptable Use Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleTemplate('policy')}
              className="w-full p-6 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00DC51]/20 rounded-lg flex items-center justify-center">
                    <FileText className="text-[#00DC51]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Acceptable Use Policy (Starter Template)</h3>
                    <p className="text-sm text-white/60">Essential policy framework for your firm</p>
                  </div>
                </div>
                <Download className="text-white/40" size={20} />
              </div>
            </button>
            
            {expandedTemplate === 'policy' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-white/10 p-6 bg-black/40"
              >
                <div className="space-y-4 text-sm text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Purpose</h4>
                    <p>This policy defines how AI tools may be used within [Firm Name] to ensure professional standards, client confidentiality, and compliance with regulatory obligations.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Approved Tools</h4>
                    <p>Staff may only use AI tools approved by the firm. Current approved tools: [List tools]</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Prohibited Uses</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Never enter client confidential data into unapproved AI tools</li>
                      <li>Never use AI outputs without human review</li>
                      <li>Never rely on AI for professional judgement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Review Requirements</h4>
                    <p>All AI-generated outputs must be reviewed by a qualified professional before use.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Agent Specification Template */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleTemplate('agent')}
              className="w-full p-6 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00DC51]/20 rounded-lg flex items-center justify-center">
                    <FileCheck className="text-[#00DC51]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Agent Specification Template</h3>
                    <p className="text-sm text-white/60">Define your agent workflows clearly</p>
                  </div>
                </div>
                <Download className="text-white/40" size={20} />
              </div>
            </button>
            
            {expandedTemplate === 'agent' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-white/10 p-6 bg-black/40"
              >
                <div className="space-y-4 text-sm">
                  {[
                    { label: 'Workflow name', example: 'e.g., Quarterly update preparation' },
                    { label: 'Goal or outcome', example: 'What result should the agent achieve?' },
                    { label: 'Trigger', example: 'What starts the process?' },
                    { label: 'Inputs required', example: 'What information or data is needed?' },
                    { label: 'Agent behaviour', example: 'What actions will the agent perform?' },
                    { label: 'Human review point', example: 'Where does the accountant step in?' },
                    { label: 'Final output', example: 'What does the agent produce?' },
                    { label: 'Escalation rules', example: 'When must the agent stop and alert a human?' }
                  ].map((field, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-[#00DC51] mb-1">{field.label}</h4>
                      <p className="text-white/60 text-xs italic">{field.example}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* AI Output Review Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleTemplate('checklist')}
              className="w-full p-6 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00DC51]/20 rounded-lg flex items-center justify-center">
                    <CheckSquare className="text-[#00DC51]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Output Review Checklist</h3>
                    <p className="text-sm text-white/60">Quality checks before using AI outputs</p>
                  </div>
                </div>
                <Download className="text-white/40" size={20} />
              </div>
            </button>
            
            {expandedTemplate === 'checklist' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-white/10 p-6 bg-black/40"
              >
                <div className="space-y-3">
                  {[
                    { check: 'Accuracy', q: 'Are all facts, figures, and statements correct?' },
                    { check: 'Completeness', q: 'Is anything missing? Are all questions answered?' },
                    { check: 'Professional tone', q: 'Is the wording appropriate and client-suitable?' },
                    { check: 'Compliance', q: 'Does it follow professional standards and firm policies?' },
                    { check: 'Context', q: 'Does it reflect the specific client situation?' },
                    { check: 'Confidentiality', q: 'Does it protect sensitive information?' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                      <div className="flex-shrink-0 w-6 h-6 border-2 border-[#00DC51] rounded flex items-center justify-center">
                        <span className="text-[#00DC51] text-xs">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white mb-0.5">{item.check}</h4>
                        <p className="text-xs text-white/60">{item.q}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* AI Glossary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#00DC51]/20 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">AI Glossary</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { term: 'AI Assistant', def: 'A tool that helps with individual tasks like drafting or summarising' },
              { term: 'AI Agent', def: 'A system that works toward a defined goal across multiple steps' },
              { term: 'Prompt', def: 'An instruction given to an AI system to perform a task' },
              { term: 'Human-in-the-loop', def: 'A model where AI prepares outputs and humans review and approve' },
              { term: 'Hallucination', def: 'When AI produces confident but incorrect information' },
              { term: 'Guardrails', def: 'Rules and constraints that control how AI operates' },
              { term: 'AI dividend', def: 'The capacity created when AI reduces time spent on routine work' },
              { term: 'Workflow', def: 'A repeatable process with defined steps and outputs' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-black/40 rounded-lg p-4"
              >
                <h4 className="font-bold text-[#00DC51] mb-1">{item.term}</h4>
                <p className="text-sm text-white/70">{item.def}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-8 sm:p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Build Your AI-Ready Firm?</h3>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Start with the foundations, build structured workflows, and deploy your first agent.
              The future of accountancy is here.
            </p>
            <button className="px-8 py-4 bg-[#00DC51] text-black font-semibold rounded-lg hover:bg-[#00DC51]/90 transition-all transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
