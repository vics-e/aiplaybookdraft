import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
  Ban,
  BookOpen,
  Bot,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Copy,
  Database,
  DollarSign,
  Download,
  Eye,
  FileText,
  FileWarning,
  HelpCircle,
  Lightbulb,
  Lock,
  MessageSquare,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  UserX,
  Users,
  Users as UsersIcon,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import type { PlaybookPage } from '../../data/playbookData';
import { NumberedContentTreatment, type NumberedTreatment } from '../NumberedContentTreatments';
import {
  FileNoteTemplatePanel,
  HighlightMessage,
  MessageBand,
  PolicyUsesComparison,
  ReviewChecklistPanel,
  StopDoingPanel,
  type MessageKind,
  messageKindForBox,
} from './ContentPanels';

interface GenericContentRendererProps {
  page: PlaybookPage;
  numberedTreatment?: NumberedTreatment;
  getIcon: (iconName: string) => React.ElementType;
}

export function GenericContentRenderer({ page, numberedTreatment, getIcon }: GenericContentRendererProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [workflowMapExplainerStep, setWorkflowMapExplainerStep] = useState(0);
  const [toolMatrixGuideIndex, setToolMatrixGuideIndex] = useState(0);
  const [agentCapabilityIndex, setAgentCapabilityIndex] = useState(0);
  const [agentCandidateIndex, setAgentCandidateIndex] = useState(0);
  const isCertificatePage = page.id === 'certificate';
  const isFinishPage = page.id === 's7-finish';

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const toggleChecked = (index: number) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
      <div className={`space-y-5 ${isCertificatePage ? 'certificate-screen-only' : ''}`}>
        {page.content.map((block, index) => {
          // Skip the numbered-list and quote on s1-stages page since they're in the custom graphic
          if (page.id === 's1-stages' && (block.type === 'quote' || (!numberedTreatment && block.type === 'numbered-list'))) {
            return null;
          }
          // Skip the columns, box, and quote on s3-difference page since they're in the custom graphic
          if (page.id === 's3-difference' && (block.type === 'columns' || block.type === 'box' || block.type === 'quote')) {
            return null;
          }
          // Skip the columns and box on s1-role page since they're in the custom graphic
          if (page.id === 's1-role' && (block.type === 'columns' || block.type === 'box')) {
            return null;
          }
          // Skip content on s3-workflows page since it's in the custom graphic
          if (page.id === 's3-workflows' && (block.type === 'text' || block.type === 'box' || block.type === 'highlight')) {
            return null;
          }
          // Skip content on s3-maturity page since it's in the custom graphic
          if (page.id === 's3-maturity' && (
            block.type === 'highlight'
            || block.type === 'box'
            || (!numberedTreatment && block.type === 'numbered-list')
          )) {
            return null;
          }
          if (page.id === 's7-policy' && block.type === 'box' && block.title === 'Restricted uses') {
            return null;
          }
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              {block.type === 'text' && (
                <p className={`${page.id === 's3-workflow-map' ? 'max-w-4xl text-[15px] leading-[1.72] text-white/68 md:text-base' : 'text-sm leading-relaxed text-white/80'} font-medium`}>{block.text}</p>
              )}

              {block.type === 'highlight' && (
                <HighlightMessage pageId={page.id} section={page.section} text={block.text || ''} />
              )}

              {block.type === 'list' && (
                isFinishPage ? (
                  <div className="space-y-4">
                    {block.items?.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={14} strokeWidth={3.2} className="mt-1 flex-shrink-0 text-[#00DC51]" />
                        <p className="flex-1 text-[15px] font-medium leading-relaxed text-white">{item}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {block.items?.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#00DC51] rounded-full flex-shrink-0 mt-2 shadow-[0_0_8px_rgba(0,220,81,0.6)]" />
                        <p className="text-white/80 text-sm font-medium flex-1 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                )
              )}

              {block.type === 'numbered-list' && (
                <>
                  {numberedTreatment ? (
                    <NumberedContentTreatment
                      block={block}
                      pageId={page.id}
                      treatment={numberedTreatment}
                    />
                  ) : (
                  <>
                  {/* TABS/COMPARISON - for Section 3 Assistant vs Agent */}
                  {(page.id === 's3-difference' && (block.boxTitle === 'Assistant-Led Work:' || block.boxTitle === 'Agent-Led Work:')) ? null :

                  /* WORKFLOW MAPPER LADDER - for Section 3 Workflow Map */
                  page.id === 's3-workflow-map' && block.boxTitle === 'How to Map Your Workflows:' ? (
                    (() => {
                      const workflowSteps = (block.items || [])
                        .filter((item): item is { title: string; desc: string } => typeof item?.title === 'string' && typeof item?.desc === 'string')
                        .map((item, index) => ({
                          stage: `Step ${index + 1}`,
                          title: item.title.replace(/^Step \d+:\s*/, ''),
                          fullTitle: item.title,
                          desc: item.desc,
                        }));

                      const safeStepIndex = workflowSteps.length > 0
                        ? Math.min(workflowMapExplainerStep, workflowSteps.length - 1)
                        : 0;
                      const activeStep = workflowSteps[safeStepIndex];
                      const progressPercentage = workflowSteps.length > 1
                        ? (safeStepIndex / (workflowSteps.length - 1)) * 100
                        : 0;

                      const handleWorkflowTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
                        if (workflowSteps.length === 0) {
                          return;
                        }

                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percentage = x / rect.width;
                        const stageIndex = Math.min(
                          Math.floor(percentage * workflowSteps.length),
                          workflowSteps.length - 1
                        );
                        setWorkflowMapExplainerStep(stageIndex);
                      };

                      if (!activeStep) {
                        return null;
                      }

                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45 }}
                          className="rounded-[24px] border border-white/10 bg-[#131313] p-5 sm:p-7"
                        >
                          <div className="space-y-5">
                            <div>
                              <h4 className="font-black text-base text-white">{block.boxTitle}</h4>
                              <p className="mt-2 text-sm font-medium leading-relaxed text-white/58">
                                This exercise helps you identify which workflows in your firm are strong agent candidates and which should remain human-led or assistant-supported.
                              </p>
                            </div>

                            <div className="relative pt-1">
                              <div
                                className="absolute left-7 right-7 top-5 hidden cursor-pointer sm:block"
                                onClick={handleWorkflowTrackClick}
                              >
                                <div className="relative h-px bg-white/10">
                                  <motion.div
                                    className="absolute left-0 top-0 h-px bg-[#00DC51]/35"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                  />
                                </div>
                              </div>

                              <div className="relative flex justify-between gap-2">
                              {workflowSteps.map((step, index) => {
                                const isActive = index === safeStepIndex;
                                const isPast = index < safeStepIndex;

                                return (
                                  <div
                                    key={step.stage}
                                    className="group/step flex cursor-pointer flex-1 flex-col items-center"
                                    onClick={() => setWorkflowMapExplainerStep(index)}
                                  >
                                    <motion.div
                                      animate={{
                                        scale: isActive ? [1, 1.12, 1] : 1,
                                        backgroundColor: isActive ? '#00DC51' : isPast ? 'rgba(0,220,81,0.18)' : '#1A1A1A',
                                      }}
                                      transition={{
                                        scale: { duration: 0.25 },
                                        backgroundColor: { duration: 0.2 },
                                      }}
                                      className={`mb-3 flex h-8 w-8 items-center justify-center rounded-[10px] border text-sm font-black transition-all ${
                                        isActive
                                          ? 'border-[#00DC51] text-black shadow-lg shadow-[#00DC51]/30'
                                          : isPast
                                            ? 'border-[#00DC51]/25 text-[#00DC51]'
                                            : 'border-white/10 text-white/35 group-hover/step:text-white/60'
                                      }`}
                                    >
                                      {index + 1}
                                    </motion.div>

                                    <div className={`text-center text-xs font-bold transition-colors ${
                                      isActive
                                        ? 'text-[#00DC51]'
                                        : isPast
                                        ? 'text-white/70'
                                        : 'text-white/40 group-hover/step:text-white/60'
                                    }`}>
                                      {step.title}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            </div>
                          </div>

                          <motion.div
                            key={safeStepIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-5 rounded-2xl border border-white/10 bg-[#0E0E0E] p-5 sm:p-6"
                          >
                            <div className="mb-4 flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#00DC51]">
                                <span className="text-sm font-black text-black">{safeStepIndex + 1}</span>
                              </div>
                              <div>
                                <div className="mb-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#00DC51]">
                                  {activeStep.stage}
                                </div>
                                <h5 className="text-lg font-black text-white sm:text-xl">
                                  {activeStep.fullTitle}
                                </h5>
                              </div>
                            </div>

                            <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-white/72 sm:text-[15px]">
                              {activeStep.desc}
                            </p>
                          </motion.div>
                        </motion.div>
                      );
                    })()
                  )

                  /* INTERACTIVE FRAMEWORK SELECTORS - for Where Agents Transform Work */
                  : page.id === 's3-where-agents' && (
                    block.boxTitle === 'The Four Agent Capabilities:'
                    || block.boxTitle === 'What Makes a Strong Agent Candidate:'
                  ) ? (
                    (() => {
                      const isCapabilities = block.boxTitle === 'The Four Agent Capabilities:';
                      const frameworkItems = (block.items || []).filter((item): item is { title: string; desc: string } => typeof item !== 'string');
                      const selectedIndex = isCapabilities ? agentCapabilityIndex : agentCandidateIndex;
                      const setSelectedIndex = isCapabilities ? setAgentCapabilityIndex : setAgentCandidateIndex;
                      const activeItem = frameworkItems[selectedIndex] || frameworkItems[0];
                      const capabilityIcons = [Database, CheckCircle, TrendingUp, FileText];
                      const candidateIcons = [Target, Database, Calendar, Shield, Eye];
                      const frameworkIcons = isCapabilities ? capabilityIcons : candidateIcons;
                      return (
                        <div className="rounded-[24px] border border-[#00DC51]/45 bg-[#00DC51]/7 p-5 sm:p-6">
                          <h4 className="mb-4 text-base font-black text-white">{block.boxTitle}</h4>
                          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label={block.boxTitle}>
                            {frameworkItems.map((item, i) => {
                                const FrameworkIcon = frameworkIcons[i] || Sparkles;
                                const isSelected = i === selectedIndex;
                                return (
                                  <button
                                    key={item.title}
                                    type="button"
                                    role="tab"
                                    id={`${isCapabilities ? 'capability' : 'candidate'}-tab-${i}`}
                                    aria-selected={isSelected}
                                    aria-controls={`${isCapabilities ? 'capability' : 'candidate'}-panel`}
                                    onClick={() => setSelectedIndex(i)}
                                    className={`flex min-w-[150px] flex-1 items-center gap-2.5 rounded-xl border px-3 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00DC51] ${isSelected ? 'border-[#00DC51] bg-[#00DC51] text-black' : 'border-white/12 bg-[#071109] text-white/65 hover:border-[#00DC51]/45 hover:text-white'}`}
                                  >
                                    <FrameworkIcon size={18} strokeWidth={2.4} aria-hidden="true" className="shrink-0" />
                                    <span className="text-xs font-black leading-snug sm:text-sm">{item.title}</span>
                                  </button>
                                );
                              })}
                          </div>
                          {activeItem && (
                            <motion.div
                              key={`${isCapabilities ? 'capability' : 'candidate'}-${selectedIndex}`}
                              id={`${isCapabilities ? 'capability' : 'candidate'}-panel`}
                              role="tabpanel"
                              aria-labelledby={`${isCapabilities ? 'capability' : 'candidate'}-tab-${selectedIndex}`}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 flex min-h-[112px] items-start gap-4 rounded-2xl border border-white/10 bg-[#071109] p-4 sm:items-center sm:p-5"
                            >
                              {React.createElement(frameworkIcons[selectedIndex] || Sparkles, { size: 24, strokeWidth: 2.3, 'aria-hidden': true, className: 'mt-0.5 shrink-0 text-[#00DC51] sm:mt-0' })}
                              <div>
                                <h5 className="text-base font-black text-white">{activeItem.title}</h5>
                                <p className="mt-1.5 text-sm font-medium leading-relaxed text-white/65">{activeItem.desc}</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })()
                  )

                  /* STEP CARDS - for Section 4 Prompt Framework */
                  : page.section?.includes('Section 4') && block.boxTitle === 'Every Effective Prompt Has 4 Parts:' ? (
                    <div className="space-y-3">
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      {block.items?.map((item, i) => {
                        if (typeof item === 'string') return null;
                        const isExpanded = expandedItems.has(i + 100); // offset to avoid collision
                        const stepIcons = [Users, FileText, Database, Shield];
                        const StepIcon = stepIcons[i] || CheckCircle;

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`border-2 rounded-xl overflow-hidden transition-all ${
                              isExpanded
                                ? 'bg-[#00DC51]/10 border-[#00DC51]'
                                : 'bg-white/5 border-white/20 hover:border-[#00DC51]/30'
                            }`}
                          >
                            <button
                              onClick={() => toggleExpanded(i + 100)}
                              className="w-full flex items-center justify-between p-5 text-left"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                  isExpanded ? 'bg-[#00DC51] text-black scale-110' : 'bg-[#00DC51]/20 text-[#00DC51] border-2 border-[#00DC51]/30'
                                }`}>
                                  <StepIcon size={22} strokeWidth={2.5} />
                                </div>
                                <div>
                                  <h5 className="font-bold text-base">{item.title}</h5>
                                  {!isExpanded && (
                                    <p className="text-xs text-white/50 font-medium mt-1">Click to see examples</p>
                                  )}
                                </div>
                              </div>
                              <ChevronDown
                                className={`transition-transform text-white/60 ${isExpanded ? 'rotate-180' : ''}`}
                                size={20}
                                strokeWidth={2.5}
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-5 pl-20">
                                    <p className="text-white/70 text-sm font-medium leading-relaxed whitespace-pre-line">{item.desc}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )

                  /* EQUAL OUTCOME CARDS - for the AI-enabled workflow */
                  : page.id === 's3-ai-workflow' && block.boxTitle === 'What Changes in AI-Enabled Workflows:' ? (
                    <div className="rounded-[24px] border border-[#00DC51]/45 bg-[#00DC51]/7 p-5 sm:p-6">
                      <h4 className="mb-4 text-base font-black text-[#00DC51]">{block.boxTitle}</h4>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {block.items?.map((item, i) => {
                          if (typeof item === 'string') return null;
                          const icons = [Zap, CheckCircle, Users, TrendingUp];
                          const MetricIcon = icons[i] || Sparkles;
                          return (
                            <motion.article
                              key={i}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="rounded-2xl border border-white/12 bg-black/30 p-4"
                            >
                              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00DC51] text-black shadow-lg shadow-[#00DC51]/25">
                                <MetricIcon size={19} strokeWidth={2.7} aria-hidden="true" />
                              </div>
                              <h5 className="text-base font-black text-white">{item.title}</h5>
                              <p className="mt-2 text-sm font-medium leading-relaxed text-white/65">{item.desc}</p>
                            </motion.article>
                          );
                        })}
                      </div>
                    </div>
                  )

                  /* COMPACT GUIDANCE ACCORDION - for Talking to Clients About AI */
                  : page.id === 's5-client-talk' && block.boxTitle === 'Client Messaging Guidance:' ? (
                    <div className="rounded-[24px] border border-[#00DC51]/35 bg-[#00DC51]/6 p-4 sm:p-5">
                      <h4 className="mb-3 text-base font-black text-white">{block.boxTitle}</h4>
                      <div className="divide-y divide-white/10">
                        {block.items?.map((item, i) => {
                          if (typeof item === 'string') return null;
                          const expansionKey = i + 700;
                          const isExpanded = expandedItems.has(expansionKey);
                          const panelId = `client-guidance-${i}`;
                          return (
                            <div key={i}>
                              <button
                                type="button"
                                onClick={() => toggleExpanded(expansionKey)}
                                aria-expanded={isExpanded}
                                aria-controls={panelId}
                                className="flex min-h-16 w-full items-center gap-3 py-3 text-left sm:gap-4"
                              >
                                <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-black transition-colors ${isExpanded ? 'bg-[#00DC51] text-black' : 'border border-[#00DC51]/35 bg-[#00DC51]/10 text-[#00DC51]'}`}>{i + 1}</span>
                                <span className="flex-1 text-sm font-black leading-snug text-white sm:text-base">{item.title}</span>
                                <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${isExpanded ? 'border-[#00DC51] bg-[#00DC51] text-black' : 'border-white/15 bg-black/20 text-white/55'}`} aria-hidden="true">
                                  {isExpanded ? <Minus size={15} strokeWidth={3} /> : <Plus size={15} strokeWidth={3} />}
                                </span>
                              </button>
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    id={panelId}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <p className="pb-4 pl-12 pr-10 text-sm font-medium leading-relaxed text-white/68 sm:pl-[52px]">{item.desc}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )

                  /* CHOICE CARDS - for Section 5 AI Dividend */
                  : page.section?.includes('Section 5') && block.boxTitle === 'Four Ways to Use the AI Dividend:' ? (
                    <div>
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.items?.map((item, i) => {
                          if (typeof item === 'string') return null;
                          const isWarning = item.warning;
                          const itemIcon = item.icon ? item.icon : null;
                          const IconComponent = itemIcon ? getIcon(itemIcon) : CheckCircle;

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ scale: isWarning ? 1 : 1.03, y: isWarning ? 0 : -4 }}
                              className={`rounded-xl p-5 border-2 transition-all ${
                                isWarning
                                  ? 'bg-red-500/10 border-red-500/40 opacity-60 cursor-not-allowed'
                                  : i === 2 || i === 3
                                  ? 'bg-[#00DC51]/10 border-[#00DC51] shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 cursor-pointer'
                                  : 'bg-white/5 border-white/20 hover:border-white/40 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-start gap-4 mb-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 flex-shrink-0 ${
                                  isWarning
                                    ? 'bg-red-500/20 border-red-500/50'
                                    : i === 2 || i === 3
                                    ? 'bg-[#00DC51]/30 border-[#00DC51]'
                                    : 'bg-white/10 border-white/30'
                                }`}>
                                  <IconComponent
                                    className={isWarning ? 'text-red-400' : i === 2 || i === 3 ? 'text-[#00DC51]' : 'text-white/60'}
                                    size={22}
                                    strokeWidth={2.5}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h5 className={`font-bold text-base mb-2 ${
                                    isWarning ? 'text-red-400' : i === 2 || i === 3 ? 'text-[#00DC51]' : ''
                                  }`}>
                                    {item.title}
                                  </h5>
                                  {isWarning && (
                                    <span className="inline-block px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs font-bold text-red-400 mb-2">
                                      Not Recommended
                                    </span>
                                  )}
                                  <p className="text-sm text-white/70 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )

                  /* EXPANDABLE PROMPT TYPES - for Section 4 Five Prompt Types */
                  : page.section?.includes('Section 4') && block.boxTitle === 'The Five Prompt Types:' ? (
                    <div className="space-y-3">
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      {block.items?.map((item, i) => {
                        if (typeof item === 'string') return null;
                        const isExpanded = expandedItems.has(i + 200); // offset
                        const promptIcons = [MessageSquare, FileText, Lightbulb, CheckCircle, HelpCircle];
                        const PromptIcon = promptIcons[i] || FileText;
                        const colors = [
                          { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400', hoverBorder: 'hover:border-blue-500/60' },
                          { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400', hoverBorder: 'hover:border-purple-500/60' },
                          { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400', hoverBorder: 'hover:border-yellow-500/60' },
                          { bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-400', hoverBorder: 'hover:border-green-500/60' },
                          { bg: 'bg-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-400', hoverBorder: 'hover:border-orange-500/60' }
                        ];
                        const color = colors[i] || colors[0];

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.08 }}
                            className={`border-2 rounded-xl overflow-hidden transition-all ${
                              isExpanded
                                ? `${color.bg} ${color.border}`
                                : `bg-white/5 border-white/20 ${color.hoverBorder}`
                            }`}
                          >
                            <button
                              onClick={() => toggleExpanded(i + 200)}
                              className="w-full flex items-center justify-between p-4 text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                                  isExpanded ? `${color.bg} ${color.border}` : `bg-white/10 border-white/30 group-hover:${color.bg}`
                                }`}>
                                  <PromptIcon className={isExpanded ? color.text : 'text-white/60'} size={20} strokeWidth={2.5} />
                                </div>
                                <h5 className="font-bold text-sm">{item.title}</h5>
                              </div>
                              <ChevronDown
                                className={`transition-transform text-white/60 ${isExpanded ? 'rotate-180' : ''}`}
                                size={18}
                                strokeWidth={2.5}
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pl-16">
                                    <p className="text-white/70 text-sm font-medium leading-relaxed whitespace-pre-line">{item.desc}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )

                  /* ACCORDION STYLE - for s2-ethics-responsibility (Five Fundamental Principles) */
                  : page.id === 's2-ethics-responsibility' && block.boxTitle === 'The Five Fundamental Principles:' ? (
                    <div className="space-y-2">
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      {block.items?.map((item, i) => {
                        if (typeof item === 'string') return null;
                        const isExpanded = expandedItems.has(i);

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`border-2 rounded-xl overflow-hidden transition-all ${
                              isExpanded
                                ? 'bg-[#00DC51]/10 border-[#00DC51]'
                                : 'bg-white/5 border-white/20 hover:border-white/40'
                            }`}
                          >
                            <button
                              onClick={() => toggleExpanded(i)}
                              className="w-full flex items-center justify-between p-4 text-left"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                                  isExpanded ? 'bg-[#00DC51] text-black' : 'bg-white/10 text-white/60'
                                }`}>
                                  {i + 1}
                                </div>
                                <h5 className="font-bold text-base">{item.title}</h5>
                              </div>
                              <ChevronDown
                                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                size={20}
                                strokeWidth={2.5}
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pl-16">
                                    <p className="text-white/70 text-sm font-medium leading-relaxed">{item.desc}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )

                  /* ICON GRID CARDS - for s2-data-confidentiality (Key Risks) */
                  : page.id === 's2-data-confidentiality' && block.boxTitle === 'Key Confidentiality Risks with AI:' ? (
                    <div>
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.items?.map((item, i) => {
                          if (typeof item === 'string') return null;
                          const riskIcons = [Lock, UserX, FileWarning, UsersIcon];
                          const RiskIcon = riskIcons[i] || AlertCircle;

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              className="group bg-white/5 border-2 border-white/20 rounded-xl p-5 hover:bg-[#00DC51]/5 hover:border-[#00DC51]/50 transition-all cursor-pointer"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-500/20 border-2 border-red-500/40 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/30 group-hover:scale-110 transition-all">
                                  <RiskIcon className="text-red-400" size={22} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-bold text-base mb-2">{item.title}</h5>
                                  <p className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )

                  /* CHECKLIST STYLE - for s2-policy */
                  : page.id === 's2-policy' ? (
                    <div className="bg-white/5 border-2 border-white/20 rounded-xl p-6">
                      <h4 className="font-black text-base mb-5 flex items-center gap-2">
                        <ClipboardList className="text-[#00DC51]" size={20} strokeWidth={2.5} />
                        Minimum AI Policy Checklist
                      </h4>
                      <div className="space-y-3">
                        {block.items?.map((item, i) => {
                          if (typeof item === 'string') return null;
                          const isChecked = checkedItems.has(i);

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => toggleChecked(i)}
                              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-[#00DC51]/15 border-[#00DC51]'
                                  : 'bg-white/5 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                isChecked
                                  ? 'bg-[#00DC51] border-[#00DC51]'
                                  : 'bg-transparent border-white/30'
                              }`}>
                                {isChecked && (
                                  <CheckCircle className="text-black" size={16} strokeWidth={3} />
                                )}
                              </div>
                              <div className="flex-1">
                                <h5 className={`font-bold text-sm mb-1 ${isChecked ? 'text-white' : 'text-white/90'}`}>
                                  {item.title}
                                </h5>
                                <p className={`text-sm font-medium leading-relaxed ${isChecked ? 'text-white/70' : 'text-white/60'}`}>
                                  {item.desc}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )

                  /* EXPANDABLE CARDS - for s2-failure-modes */
                  : page.id === 's2-failure-modes' && block.boxTitle ? (
                    <div className="space-y-3">
                      <h4 className="font-black text-base mb-4 text-[#00DC51]">{block.boxTitle}</h4>
                      {block.items?.map((item, i) => {
                        if (typeof item === 'string') return null;
                        const isExpanded = expandedItems.has(i);
                        const failureIcons = [HelpCircle, AlertCircle, Ban, XCircle];
                        const FailureIcon = failureIcons[i] || AlertCircle;

                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`border-2 rounded-xl overflow-hidden transition-all ${
                              isExpanded
                                ? 'bg-orange-500/10 border-orange-500/50'
                                : 'bg-white/5 border-white/20 hover:border-orange-500/30'
                            }`}
                          >
                            <button
                              onClick={() => toggleExpanded(i)}
                              className="w-full flex items-center justify-between p-4 text-left"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  isExpanded ? 'bg-orange-500/30 border-2 border-orange-500' : 'bg-orange-500/20 border-2 border-orange-500/30'
                                }`}>
                                  <FailureIcon className="text-orange-400" size={20} strokeWidth={2.5} />
                                </div>
                                <h5 className="font-bold text-base">{item.title}</h5>
                              </div>
                              <ChevronDown
                                className={`transition-transform text-white/60 ${isExpanded ? 'rotate-180' : ''}`}
                                size={20}
                                strokeWidth={2.5}
                              />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pl-16">
                                    <p className="text-white/70 text-sm font-medium leading-relaxed">{item.desc}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  )

                  /* TABBED GUIDE - for s7-tool-matrix */
                  : page.id === 's7-tool-matrix' && block.boxTitle === 'Tool Usage Matrix:' ? (
                    (() => {
                      const guideItems = (block.items || []).filter((item): item is Exclude<typeof item, string> => typeof item !== 'string');
                      const activeGuide = guideItems[Math.min(toolMatrixGuideIndex, Math.max(guideItems.length - 1, 0))];
                      const detailLines = activeGuide?.desc
                        ? activeGuide.desc.split('\n').map((line) => line.trim()).filter(Boolean)
                        : [];
                      const parsedDetails = detailLines.reduce<Record<string, string>>((acc, line) => {
                        const [label, ...rest] = line.split(':');
                        if (!label || rest.length === 0) {
                          return acc;
                        }

                        acc[label.trim()] = rest.join(':').trim();
                        return acc;
                      }, {});

                      return (
                        <div className="space-y-4 rounded-[24px] border border-white/12 bg-white/[0.03] p-5 sm:p-6">
                          <div className="space-y-2">
                            <h4 className="text-base font-black text-white">{block.boxTitle}</h4>
                            <p className="text-sm font-medium leading-relaxed text-white/60">
                              Select a tool type to see the boundaries for tasks, data, and review.
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {guideItems.map((item, index) => (
                              <button
                                key={item.title}
                                onClick={() => setToolMatrixGuideIndex(index)}
                                className={`rounded-full border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors sm:text-[11px] ${
                                  index === toolMatrixGuideIndex
                                    ? 'border-[#00DC51]/35 bg-[#00DC51]/12 text-[#00DC51]'
                                    : 'border-white/12 bg-black/20 text-white/72 hover:border-white/20 hover:text-white'
                                }`}
                              >
                                {item.title}
                              </button>
                            ))}
                          </div>

                          {activeGuide && (
                            <motion.div
                              key={activeGuide.title}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.18 }}
                              className="rounded-[22px] border border-white/10 bg-[#111111] p-5"
                            >
                              <div className="mb-4">
                                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#00DC51]">Selected tool type</p>
                                <h5 className="mt-2 text-xl font-black text-white">{activeGuide.title}</h5>
                              </div>

                              <div className="grid gap-3 md:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/45">Allowed tasks</p>
                                  <p className="mt-2 text-sm font-medium leading-relaxed text-white">{parsedDetails['Allowed tasks'] || '—'}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/45">Data allowed</p>
                                  <p className="mt-2 text-sm font-medium leading-relaxed text-white">{parsedDetails['Data allowed'] || '—'}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/45">Review required</p>
                                  <p className="mt-2 text-sm font-medium leading-relaxed text-white">{parsedDetails['Review required'] || '—'}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })()
                  )

                  /* DEFAULT NUMBERED LIST - for all other pages */
                  : (
                    <div className={block.boxTitle ? "bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-5 backdrop-blur-sm" : ""}>
                      {block.boxTitle && (
                        <h4 className="font-black text-base mb-4">{block.boxTitle}</h4>
                      )}

                      {/* Numbered Items */}
                      <div className="space-y-3">
                        {block.items?.map((item, i) => {
                        const isWarning = typeof item === 'object' && item.warning;
                        const itemIcon = typeof item === 'object' && item.icon ? item.icon : null;
                        const itemTitle = typeof item === 'string' ? item : item.title;
                        const itemDesc = typeof item === 'object' && item.desc ? item.desc : null;
                        const itemExample = typeof item === 'object' && item.example ? item.example : null;

                        return (
                          <div key={i} className="flex items-start gap-3 group">
                            {/* Number Badge with optional icon */}
                            <div className={`${page.id === 's1-stages' ? 'w-20 h-20' : 'w-9 h-9'} ${isWarning ? 'bg-white/10 border-2 border-white/20' : 'bg-[#00DC51]'} rounded-xl flex items-center justify-center flex-shrink-0 ${isWarning ? 'text-white/40' : 'text-black'} font-black ${page.id === 's1-stages' ? 'text-xs' : 'text-sm'} shadow-lg ${isWarning ? 'shadow-black/20' : 'shadow-[#00DC51]/30'} group-hover:scale-110 transition-transform`}>
                              {itemIcon ? (
                                (() => {
                                  const Icon = getIcon(itemIcon);
                                  return <Icon size={18} strokeWidth={2.5} />;
                                })()
                              ) : (
                                page.id === 's1-stages' ? `Step ${i + 1}` : i + 1
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                              {typeof item === 'string' ? (
                                <p className="text-white/80 text-sm font-medium leading-relaxed">{item}</p>
                              ) : (
                                <>
                                  <h4 className={`font-bold text-base mb-1.5 ${isWarning ? 'text-white/50' : ''}`}>
                                    {item.title}
                                  </h4>
                                  {itemDesc && (
                                    <p className="text-white/60 font-medium text-sm leading-relaxed">{itemDesc}</p>
                                  )}
                                  {itemExample && (
                                    <p className="text-white/50 font-medium text-xs leading-relaxed mt-2 italic">{itemExample}</p>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  )}
                  </>
                  )}
                </>
              )}

              {block.type === 'box' && (
                page.id === 's7-policy' && block.title === 'Approved uses' ? (
                  <PolicyUsesComparison
                    approvedText={block.text || ''}
                    restrictedText={page.content.find((candidate) => candidate.type === 'box' && candidate.title === 'Restricted uses')?.text || ''}
                  />
                ) : page.id === 's7-checklist' && block.title?.startsWith('Quick review checklist') ? (
                  <ReviewChecklistPanel title={block.title || ''} text={block.text || ''} />
                ) : page.id === 's7-file-note' && block.title === 'AI File Note Template:' ? (
                  <FileNoteTemplatePanel text={block.text || ''} />
                ) : page.id === 's6-stop-doing' && block.title === 'Common tasks firms stop doing:' ? (
                  <StopDoingPanel title={block.title} text={block.text || ''} />
                ) : messageKindForBox(block.title) ? (
                  <MessageBand title={block.title || ''} text={block.text || ''} kind={messageKindForBox(block.title) as MessageKind} />
                ) : (
                <motion.div
                  className={`p-5 transition-colors duration-200 motion-reduce:transition-none ${
                    page.id === 's3-workflow-map' && block.title === 'Common High-Impact Agent Candidates:'
                      ? 'rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)] hover:border-white/30'
                      : page.id === 's7-tool-matrix'
                      ? block.style === 'green'
                        ? 'border-y border-[var(--color-rule)] bg-transparent text-white'
                        : block.style === 'dark'
                        ? 'rounded-2xl border border-[var(--color-rule)] bg-black hover:border-white/30'
                        : 'rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)] hover:border-white/30'
                      : block.style === 'green'
                      ? 'border-y border-[var(--color-rule)] bg-transparent'
                      : block.style === 'dark'
                      ? 'rounded-2xl border border-[var(--color-rule)] bg-black hover:border-white/30'
                      : 'rounded-2xl border border-[var(--color-rule)] bg-[var(--color-surface-1)] hover:border-white/30'
                  }`}>
                  {block.title && !(page.id === 's3-workflow-map' && block.title === 'Common High-Impact Agent Candidates:') && (
                    <div className="flex items-start gap-3 mb-2.5">
                      <h4 className="font-black text-base flex-1">{block.title}</h4>
                    </div>
                  )}
                  {page.id === 's3-workflow-map' && block.title === 'Common High-Impact Agent Candidates:' ? (
                    (() => {
                      const candidateItems = (block.text || '')
                        .split('\n')
                        .map((item) => item.replace(/^•\s*|^â€¢\s*|^Ã¢â‚¬Â¢\s*/, '').trim())
                        .filter(Boolean);

                      return (
                        <details className="group">
                          <summary className="list-none cursor-pointer">
                            <div className="mb-3 flex items-center justify-between gap-4">
                              <h4 className="flex-1 text-base font-black text-white">{block.title}</h4>
                              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors group-hover:border-white/35">
                                <span>Show examples</span>
                                <ChevronDown className="transition-transform group-open:rotate-180" size={14} strokeWidth={2.8} />
                              </span>
                            </div>

                            <p className="text-sm font-medium leading-relaxed text-white">
                              These are examples to help you think of your own workflows.
                            </p>
                          </summary>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {candidateItems.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-white/20 bg-transparent px-3 py-2 text-xs font-semibold text-white"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </details>
                      );
                    })()
                  ) : (
                    <p className={`font-medium leading-relaxed text-sm whitespace-pre-line ${
                      page.section?.includes('Section 2') ? 'text-white/80' : 'text-white/80'
                    }`}>{block.text}</p>
                  )}
                </motion.div>
                )
              )}

              {block.type === 'quote' && (
                page.id === 's3-workflow-map' ? (
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="border-l-[3px] border-[#00DC51] px-5 py-3"
                  >
                    <p className="text-[15px] font-bold italic leading-relaxed text-white">{block.text}</p>
                  </motion.div>
                ) : isFinishPage ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-r-xl border-l-[4px] border-[#00DC51] bg-gradient-to-r from-[#00DC51]/16 to-transparent px-5 py-5 sm:px-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl font-black leading-none text-[#00DC51]/90">"</div>
                      <p className="pt-1 text-lg font-bold italic leading-relaxed text-white">
                        {block.text}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-gradient-to-r from-[#00DC51]/15 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-6 backdrop-blur-sm group hover:from-[#00DC51]/20 transition-all"
                  >
                    <div className="absolute -left-1 top-5 w-1 h-10 bg-[#00DC51] shadow-[0_0_12px_rgba(0,220,81,0.8)] group-hover:h-14 transition-all" />
                    <div className="flex items-start gap-4">
                      <div className="text-[#00DC51] opacity-30 text-5xl font-serif leading-none">"</div>
                      <p className="text-lg font-bold italic leading-relaxed flex-1 pt-2">{block.text}</p>
                    </div>
                  </motion.div>
                )
              )}

              {block.type === 'columns' && (
                /* INTERACTIVE COMPARISON CARDS - for Section 3 */
                page.section?.includes('Section 3') ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {block.columns?.map((col, i) => {
                      const parts = col.text.split(/\n\nExamples:\s*/i);
                      const mainText = parts[0];
                      const examplesText = parts[1];
                      const lines = mainText.split('\n').filter(line => line.trim());

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.15 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className={`rounded-xl p-5 border-2 transition-all cursor-pointer ${
                            col.highlight
                              ? 'bg-[#00DC51]/10 border-[#00DC51] shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30'
                              : 'bg-white/5 border-white/20 hover:border-white/40'
                          }`}
                        >
                          {col.icon && (
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border-2 transition-all ${
                              col.highlight
                                ? 'bg-[#00DC51]/30 border-[#00DC51]'
                                : 'bg-white/10 border-white/30'
                            }`}>
                              {(() => {
                                const Icon = getIcon(col.icon);
                                return <Icon className={col.highlight ? 'text-[#00DC51]' : 'text-white/60'} size={22} strokeWidth={2.5} />;
                              })()}
                            </div>
                          )}
                          <h4 className={`font-black text-base mb-4 ${col.highlight ? 'text-[#00DC51]' : ''}`}>{col.title}</h4>

                          <div className="space-y-2 mb-4">
                            {lines.map((line, lineIndex) => (
                              <div key={lineIndex} className="flex items-start gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                                  col.highlight ? 'bg-[#00DC51] shadow-[0_0_8px_rgba(0,220,81,0.6)]' : 'bg-white/40'
                                }`} />
                                <p className="text-sm text-white/80 font-medium leading-relaxed">{line.trim()}</p>
                              </div>
                            ))}
                          </div>

                          {examplesText && (
                            <div className={`mt-4 pt-4 border-t ${col.highlight ? 'border-[#00DC51]/30' : 'border-white/10'}`}>
                              <p className={`text-xs font-bold mb-2 ${col.highlight ? 'text-[#00DC51]' : 'text-white/70'}`}>Examples:</p>
                              <div className="space-y-1.5">
                                {examplesText.split('\n').filter(line => line.trim()).map((example, exIndex) => (
                                  <p key={exIndex} className="text-xs text-white/60 font-medium leading-relaxed">
                                    {example.trim()}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  /* DEFAULT COLUMNS - for other sections */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {block.columns?.map((col, i) => {
                      const parts = col.text.split(/\n\nExamples:\s*/i);
                      const mainText = parts[0];
                      const examplesText = parts[1];

                      return (
                        <div key={i} className={`rounded-xl p-4 border-2 ${
                          col.highlight
                            ? 'bg-[#00DC51]/10 border-[#00DC51]'
                            : 'bg-white/5 border-white/20'
                        }`}>
                          {col.icon && (
                            <div className="w-10 h-10 bg-[#00DC51]/20 rounded-xl flex items-center justify-center mb-3 border border-[#00DC51]/30">
                              {(() => {
                                const Icon = getIcon(col.icon);
                                return <Icon className="text-[#00DC51]" size={20} strokeWidth={2.5} />;
                              })()}
                            </div>
                          )}
                          <h4 className="font-black text-sm mb-2">{col.title}</h4>
                          <p className="text-xs text-white/70 font-medium leading-relaxed mb-3">{mainText}</p>

                          {examplesText && (
                            <div className="mt-4 pt-3 border-t border-white/10">
                              <p className="text-xs font-bold text-[#00DC51] mb-2">Examples:</p>
                              <p className="text-xs text-white/60 font-medium leading-relaxed italic">
                                {examplesText}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </motion.div>
          );
        })}
      </div>
  );
}
