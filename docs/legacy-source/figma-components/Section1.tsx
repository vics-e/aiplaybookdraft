import { motion } from 'motion/react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Section1() {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const toggleActivity = (id: string) => {
    setExpandedActivity(expandedActivity === id ? null : id);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/95">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#00DC51]/20 border border-[#00DC51]/40 rounded-full mb-6">
            <span className="text-[#00DC51] font-semibold text-sm">Section 1</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            The <span className="text-[#00DC51]">AI Practice</span> Framework
          </h2>
          <p className="text-xl text-white/70">
            Understanding how AI transforms accounting firms
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl font-bold mb-4">The Shift to AI-Assisted Firms</h3>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Over the past two decades, the accounting profession has experienced several major technology shifts.
                First came desktop software. Then cloud accounting transformed collaboration. Automation reduced manual
                data entry and repetitive processing.
              </p>
              <p>
                <strong className="text-white">Now, we are entering the next phase: AI-assisted firms.</strong>
              </p>
              <p>
                Artificial intelligence is not about replacing accountants. It is about removing repetitive effort,
                improving consistency, and giving professionals more time to focus on judgement, advice, and client relationships.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Three Stages of AI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8">The Three Stages of AI in Accountancy</h3>
          
          <div className="space-y-6">
            {/* Stage 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#00DC51] p-6 rounded-r-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#00DC51] rounded-lg flex items-center justify-center text-black font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">Automation</h4>
                  <p className="text-white/70 mb-3">
                    Rules-based systems perform repetitive tasks: bank feeds, automated postings, OCR and data capture,
                    scheduled processes.
                  </p>
                  <p className="text-sm text-white/60 italic">
                    Automation follows fixed rules. It is predictable, but limited.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stage 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#00DC51] p-6 rounded-r-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#00DC51] rounded-lg flex items-center justify-center text-black font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">Assistants</h4>
                  <p className="text-white/70 mb-3">
                    Generative AI tools help with individual tasks: drafting emails, summarising information,
                    explaining figures, preparing checklists.
                  </p>
                  <p className="text-sm text-white/60 italic">
                    Assistants are powerful, but they rely on prompts, context, and human direction. They help with tasks, not full processes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stage 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#00DC51] p-6 rounded-r-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#00DC51] rounded-lg flex items-center justify-center text-black font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">Agents</h4>
                  <p className="text-white/70 mb-3">
                    AI agents operate with a defined goal and set of constraints. They can perform multiple steps,
                    operate inside accounting systems, make decisions with defined policies, and present results for approval.
                  </p>
                  <p className="text-sm text-white/60 italic">
                    Instead of only helping with one task, agents can take responsibility for entire processes or defined outcomes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Principle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 text-center"
          >
            <p className="text-2xl font-bold text-[#00DC51]">
              Assistants respond. Agents act.
            </p>
          </motion.div>
        </motion.div>

        {/* Five Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-4">The Sage AI Practice Framework</h3>
          <p className="text-white/70 mb-8">
            Based on professional guidance, real firm experiences, and emerging best practice, Sage has developed
            a simple framework for the AI-ready firm.
          </p>

          <div className="space-y-6">
            {[
              {
                num: 1,
                title: 'Start with the workflow',
                content: 'AI works best when processes are defined, steps are repeatable, and outcomes are predictable.'
              },
              {
                num: 2,
                title: 'Keep the accountant in control',
                content: 'AI may draft, check, summarise, or prepare. But the accountant reviews, applies judgement, signs off and presses send.'
              },
              {
                num: 3,
                title: 'Trust structured data over clever prompts',
                content: 'Clear prompts improve results, but clean, structured records and defined workflows create error-free, reliable AI outcomes.'
              },
              {
                num: 4,
                title: 'Turn capacity into value',
                content: 'The most successful firms reinvest the AI dividend into client value and long-term growth.'
              },
              {
                num: 5,
                title: 'Build for agents, not just assistants',
                content: 'Design clear processes, define outcomes and review points, and stay open to new ways of working.'
              }
            ].map((principle, index) => (
              <motion.div
                key={principle.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#00DC51]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#00DC51] font-bold">{principle.num}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">{principle.title}</h4>
                    <p className="text-white/70">{principle.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Where AI Works Best */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-6">Where AI Works Best</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Strong Fit */}
            <div className="bg-[#00DC51]/10 border border-[#00DC51] rounded-xl p-6">
              <h4 className="text-xl font-bold text-[#00DC51] mb-4">Strong fit for AI and agents</h4>
              <p className="text-white/70 text-sm mb-4">
                Areas where data is structured, steps are repeatable, and outcomes are predictable:
              </p>
              <ul className="space-y-2">
                {[
                  'Transaction reviews',
                  'Anomaly detection',
                  'Quarterly update preparation',
                  'Payroll queries',
                  'Variance explanations',
                  'Client onboarding steps'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/80">
                    <CheckCircle2 className="text-[#00DC51] flex-shrink-0 mt-0.5" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Human-led */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4">Human-led with AI support</h4>
              <p className="text-white/70 text-sm mb-4">
                Areas requiring professional judgement, ethical consideration, or contextual decision-making:
              </p>
              <ul className="space-y-2">
                {[
                  'Tax treatments',
                  'Advisory conversations',
                  'Judgement-heavy decisions',
                  'Ethical considerations',
                  'Client negotiations'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/80">
                    <CheckCircle2 className="text-white/40 flex-shrink-0 mt-0.5" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Interactive Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <button
            onClick={() => toggleActivity('capacity')}
            className="w-full bg-[#00DC51] text-black rounded-xl p-6 hover:bg-[#00DC51]/90 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold">Action: Capacity Reflection</h4>
                  <p className="text-sm text-black/70">Click to explore this activity</p>
                </div>
              </div>
              {expandedActivity === 'capacity' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
          </button>
          
          {expandedActivity === 'capacity' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/5 border border-white/10 rounded-b-xl p-6 mt-2"
            >
              <p className="text-white/80 mb-4">Ask yourself:</p>
              <ol className="space-y-3 ml-6 list-decimal text-white/70">
                <li>Where does your team spend the most repetitive time?</li>
                <li>Which tasks feel necessary but low value?</li>
                <li>What would you do if those tasks took 30–50% less time?</li>
              </ol>
              <div className="mt-6 p-4 bg-black/30 rounded-lg">
                <p className="text-sm text-white/60 mb-2">Write down three areas where additional capacity would make the biggest difference:</p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li>• Reducing turnaround times</li>
                  <li>• Improving client communication</li>
                  <li>• Creating space for advisory conversations</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1770220742903-f113513d0194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBhaSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MXx8fHwxNzcyNTQwODMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="AI Technology"
            className="w-full h-96 object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
