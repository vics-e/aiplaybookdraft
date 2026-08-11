import { motion } from 'motion/react';
import { BookOpen, Shield, Workflow, MessageSquare, DollarSign, Calendar, FileText } from 'lucide-react';

interface TableOfContentsProps {
  scrollToSection: (id: string) => void;
}

export function TableOfContents({ scrollToSection }: TableOfContentsProps) {
  const sections = [
    {
      id: 'section1',
      title: 'AI Practice Framework',
      description: 'Understanding the three stages of AI and the five principles of AI-ready firms',
      icon: Workflow,
      color: '#00DC51'
    },
    {
      id: 'section2',
      title: 'Professional Guardrails',
      description: 'Ethics, policies, and controls for safe and responsible AI adoption',
      icon: Shield,
      color: '#00DC51'
    },
    {
      id: 'section3',
      title: 'Assistants & Agents',
      description: 'The new workflow model and core agent opportunities in your firm',
      icon: Workflow,
      color: '#00DC51'
    },
    {
      id: 'section4',
      title: 'Prompting Skills',
      description: 'The accountant\'s prompt framework and practical prompt library',
      icon: MessageSquare,
      color: '#00DC51'
    },
    {
      id: 'section5',
      title: 'Pricing & Economics',
      description: 'Understanding the AI dividend and pricing for value in the AI era',
      icon: DollarSign,
      color: '#00DC51'
    },
    {
      id: 'section6',
      title: '90-Day Plan',
      description: 'Your roadmap from foundations to your first agent workflow',
      icon: Calendar,
      color: '#00DC51'
    },
    {
      id: 'section7',
      title: 'Templates & Tools',
      description: 'Ready-to-use policies, checklists, and templates for your firm',
      icon: FileText,
      color: '#00DC51'
    }
  ];

  return (
    <section id="toc" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            What's <span className="text-[#00DC51]">Inside</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A comprehensive guide to help your firm adopt AI safely, effectively, and profitably
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => scrollToSection(section.id)}
                className="group relative bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 hover:border-[#00DC51]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#00DC51]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00DC51]/30 transition-colors">
                      <Icon className="text-[#00DC51]" size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#00DC51] transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 bg-[#00DC51] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
