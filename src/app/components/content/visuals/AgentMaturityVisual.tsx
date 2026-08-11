import React from 'react';
import { motion } from 'motion/react';
import { Target } from 'lucide-react';
import type { NumberedTreatment } from '../../NumberedContentTreatments';

interface AgentMaturityVisualProps {
  pageId: string;
  numberedTreatment?: NumberedTreatment;
}

export function AgentMaturityVisual({ pageId, numberedTreatment }: AgentMaturityVisualProps) {
  const [currentStage, setCurrentStage] = React.useState(0);

  if (pageId !== 's3-maturity' || numberedTreatment) {
    return null;
  }

  const stages = [
    {
      stage: 'Stage 1',
      title: 'Prompts',
      desc: 'Staff use AI to answer questions or draft text. Work is still entirely human-led.',
      shortLabel: 'Prompts'
    },
    {
      stage: 'Stage 2',
      title: 'Assistants',
      desc: 'AI is used regularly for defined tasks. It helps with drafting, checking, and summarising, while the accountant remains in control.',
      shortLabel: 'Assistants'
    },
    {
      stage: 'Stage 3',
      title: 'Workflow Packs',
      desc: 'Prompts, checklists, and processes are standardised across the firm. Work becomes more consistent and repeatable.',
      shortLabel: 'Workflow Packs'
    },
    {
      stage: 'Stage 4',
      title: 'Agents',
      desc: 'AI operates inside systems to achieve defined goals or outputs. It can perform multiple steps, gather information, carry out checks, and prepare results for review.',
      shortLabel: 'Agents'
    },
    {
      stage: 'Stage 5',
      title: 'Orchestrated Agents',
      desc: 'Multiple agents work together across systems. They coordinate tasks, share data, and deliver end-to-end outcomes across entire workflows.',
      shortLabel: 'Orchestrated'
    }
  ];

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const stageIndex = Math.min(Math.floor(percentage * stages.length), stages.length - 1);
    setCurrentStage(stageIndex);
  };

  const progressPercentage = (currentStage / (stages.length - 1)) * 100;

  return (
    <>
      {/* Custom Interactive Graphic for Agent Maturity Ladder - Timeline Scrubber */}
      {
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Timeline Track */}
            <div className="space-y-6">
              {/* Track */}
              <div
                className="relative h-3 bg-white/10 rounded-full cursor-pointer group"
                onClick={handleTrackClick}
              >
                {/* Fill */}
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00DC51]/60 to-[#00DC51] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Thumb */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-[#00DC51] rounded-full border-4 border-black shadow-lg shadow-[#00DC51]/40"
                  initial={{ left: '0%' }}
                  animate={{
                    left: `${progressPercentage}%`,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    left: { duration: 0.4, ease: "easeOut" },
                    scale: { duration: 0.3 }
                  }}
                />
              </div>

              {/* Stops */}
              <div className="relative flex justify-between px-1">
                {stages.map((stage, index) => {
                  const isActive = index === currentStage;
                  const isPast = index < currentStage;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer group/stop"
                      onClick={() => setCurrentStage(index)}
                      style={{ width: `${100 / stages.length}%` }}
                    >
                      {/* Pip */}
                      <motion.div
                        animate={{
                          scale: isActive ? [1, 1.3, 1] : 1,
                          backgroundColor: isActive || isPast ? '#00DC51' : 'rgba(255,255,255,0.3)'
                        }}
                        transition={{
                          scale: { duration: 0.3 },
                          backgroundColor: { duration: 0.2 }
                        }}
                        className={`w-3 h-3 rounded-full mb-3 transition-all ${
                          isActive
                            ? 'shadow-lg shadow-[#00DC51]/60'
                            : 'group-hover/stop:bg-[#00DC51]/60'
                        }`}
                      />

                      {/* Label */}
                      <div className={`text-center text-xs font-bold transition-colors ${
                        isActive
                          ? 'text-[#00DC51]'
                          : isPast
                          ? 'text-white/70'
                          : 'text-white/40 group-hover/stop:text-white/60'
                      }`}>
                        {stage.shortLabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail Panel */}
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#00DC51]/15 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#00DC51] rounded-xl flex items-center justify-center shadow-lg shadow-[#00DC51]/40">
                  <span className="text-black font-black text-lg">{currentStage + 1}</span>
                </div>
                <div>
                  <div className="text-xs font-black text-[#00DC51] uppercase tracking-wider mb-1">
                    {stages[currentStage].stage}
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {stages[currentStage].title}
                  </h3>
                </div>
              </div>

              <p className="text-base text-white/80 font-medium leading-relaxed">
                {stages[currentStage].desc}
              </p>
            </motion.div>

            {/* Navigation Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-white/40 font-medium"
            >
              Click any stage or drag along the track to explore your maturity progression
            </motion.div>

            {/* Key message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative bg-gradient-to-r from-[#00DC51]/15 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-5 backdrop-blur-sm"
            >
              <p className="font-bold text-base leading-relaxed">
                AI maturity is not about using smarter prompts. It is about moving from manual effort, to assisted tasks, to goal-driven agent outcomes.
              </p>
            </motion.div>

            {/* Target box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-[#00DC51]" size={20} strokeWidth={2.5} />
                <h4 className="font-black text-base text-[#00DC51]">Where to Focus</h4>
              </div>
              <p className="text-sm text-white/80 font-medium leading-relaxed">
                Most firms should aim to reach Stage 3-4 (Workflow Packs to Agents) within 90 days.
              </p>
            </motion.div>
          </motion.div>
      }
    </>
  );
}
