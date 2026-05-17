import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Users, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Section5() {
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
            <span className="text-[#00DC51] font-semibold text-sm">Section 5</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-[#00DC51]">Pricing</span> & Economics of AI
          </h2>
          <p className="text-xl text-white/70">
            Understanding and capturing the AI dividend
          </p>
        </motion.div>

        {/* The AI Dividend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-[#00DC51]/20 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-8 sm:p-12">
            <h3 className="text-3xl font-bold mb-6">The AI Dividend</h3>
            <p className="text-xl text-white/80 mb-6">
              AI does not just speed up individual tasks. It changes the capacity of the entire firm.
            </p>
            <p className="text-white/70 mb-6">
              When repetitive work is reduced, turnaround times improve, staff stress decreases,
              more time becomes available for higher-value work, and teams gain space for training and upskilling.
            </p>
            
            <div className="bg-black/40 rounded-xl p-6">
              <p className="text-[#00DC51] font-semibold mb-3">Where capacity is usually created:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Quarterly updates',
                  'Payroll queries',
                  'Client chasers',
                  'Variance explanations',
                  'Workpaper reviews',
                  'Onboarding tasks'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#00DC51] rounded-full" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* What to do with the AI Dividend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-8">What Firms Can Do with the AI Dividend</h3>
          <p className="text-white/70 mb-8">Every firm faces a choice:</p>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: DollarSign,
                title: 'Give it away',
                desc: 'Reduce prices and compete on cost',
                color: 'red'
              },
              {
                icon: TrendingUp,
                title: 'Keep it as margin',
                desc: 'Deliver the same services more profitably',
                color: 'yellow'
              },
              {
                icon: Sparkles,
                title: 'Reinvest it into value',
                desc: 'Add insight, planning, and proactive support',
                color: 'green'
              },
              {
                icon: Users,
                title: 'Invest in people & growth',
                desc: 'Train teams, improve processes, take on more clients, expand into new services',
                color: 'green'
              }
            ].map((option, i) => {
              const Icon = option.icon;
              const borderColor = option.color === 'green' ? 'border-[#00DC51]' : option.color === 'yellow' ? 'border-yellow-500' : 'border-red-500';
              const bgColor = option.color === 'green' ? 'bg-[#00DC51]/10' : option.color === 'yellow' ? 'bg-yellow-500/10' : 'bg-red-500/10';
              const iconColor = option.color === 'green' ? 'text-[#00DC51]' : option.color === 'yellow' ? 'text-yellow-500' : 'text-red-500';
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${bgColor} border ${borderColor} rounded-xl p-6`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={iconColor} size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{i + 1}. {option.title}</h4>
                      <p className="text-sm text-white/70">{option.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6"
          >
            <p className="text-lg font-semibold text-center">
              <span className="text-[#00DC51]">The most successful firms</span> reinvest the AI dividend into client value,
              strengthen their teams, and use the additional capacity to grow sustainably.
            </p>
          </motion.div>
        </motion.div>

        {/* Four Pricing Models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">The Four Pricing Models in an AI World</h3>
          
          <div className="space-y-4">
            {[
              {
                model: 'Time-based pricing',
                desc: 'Charging by the hour creates a penalty for efficiency. As AI reduces time, revenue falls unless rates increase significantly.'
              },
              {
                model: 'Fixed-fee pricing',
                desc: 'AI improves margins by reducing delivery time while maintaining the same fee. This works well if positioned around outcomes, not effort.'
              },
              {
                model: 'Value-based pricing',
                desc: 'Pricing tied to client outcomes, insights, or strategic impact. AI creates space to deliver more value without increasing hours.'
              },
              {
                model: 'Hybrid pricing',
                desc: 'Combining fixed fees for compliance with value pricing for advisory. AI supports both by reducing admin time and creating advisory capacity.'
              }
            ].map((pricing, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#00DC51]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[#00DC51] font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{pricing.model}</h4>
                    <p className="text-sm text-white/70">{pricing.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Shift from Effort to Judgement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold mb-4">The Shift from Effort to Judgement</h3>
          <div className="space-y-4 text-white/70">
            <p>
              In a pre-AI world, accountants were valued for <strong className="text-white">effort</strong>: time spent processing,
              checking, and preparing.
            </p>
            <p>
              In an AI world, accountants are valued for <strong className="text-[#00DC51]">judgement</strong>: insight, advice,
              decision-making, and trusted guidance.
            </p>
            <p className="text-lg font-semibold text-white mt-6">
              Pricing should reflect this shift.
            </p>
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
            src="https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjUzNDkzMHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Financial analytics"
            className="w-full h-96 object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
