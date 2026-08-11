import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Eye } from 'lucide-react';

interface CoreAgentWorkflowsVisualProps {
  pageId: string;
  getIcon: (iconName: string) => ComponentType<{ className?: string; size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
}

export function CoreAgentWorkflowsVisual({ pageId, getIcon }: CoreAgentWorkflowsVisualProps) {
  const page = { id: pageId };
  const [expandedWorkflowIndexes, setExpandedWorkflowIndexes] = React.useState<Set<number>>(new Set());

  const setWorkflowExpanded = (index: number, expanded: boolean) => {
    setExpandedWorkflowIndexes((current) => {
      const next = new Set(current);
      if (expanded) {
        next.add(index);
      } else {
        next.delete(index);
      }
      return next;
    });
  };

  return (
    <>
      {/* Custom Interactive Graphic for Core Agent Workflows */}
      {page.id === 's3-workflows' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-sm text-white/70 font-medium leading-relaxed mb-6">
            These four workflows represent the most common agent applications in accountancy firms. Click each workflow to explore its details.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                num: 1,
                title: 'Quarterly Update Preparation',
                icon: 'Calendar',
                goal: 'Prepare a draft quarterly business review for the accountant to review and finalise.',
                actions: [
                  'Collect management accounts, bank statements, and prior quarter comparisons',
                  'Check completeness of data (missing months, incomplete records)',
                  'Analyse revenue and cost trends vs. prior periods',
                  'Identify significant variances (e.g., revenue down 15%, costs up 20%)',
                  'Flag anomalies or unexpected movements',
                  'Prepare draft commentary explaining key changes',
                  'Generate summary report with charts and comparisons'
                ],
                review: 'Accountant reviews the analysis, applies judgement to explanations, adds context, and approves the final update before sending to the client.'
              },
              {
                num: 2,
                title: 'Period-End Preparation',
                icon: 'FileText',
                goal: 'Prepare year-end or period-end workpapers and identify items requiring accountant attention.',
                actions: [
                  'Review general ledger for the period',
                  'Identify unusual postings or out-of-pattern transactions',
                  'Perform variance analysis against budget or prior period',
                  'Check for incomplete journal entries or missing descriptions',
                  'Prepare reconciliation workpapers',
                  'Draft variance explanations based on data patterns',
                  'Flag items requiring professional judgement (e.g., provisions, accruals)'
                ],
                review: 'Accountant reviews the workpapers, validates variance explanations, applies professional judgement to flagged items, and finalises the close.'
              },
              {
                num: 3,
                title: 'Client Onboarding',
                icon: 'Users',
                goal: 'Complete the client onboarding process and ensure all required information is collected and verified.',
                actions: [
                  'Send initial welcome email and information request to new client',
                  'Track receipt of requested documents (ID, company records, bank details, etc.)',
                  'Perform completeness checks against onboarding checklist',
                  'Follow up on missing items with reminder emails',
                  'Verify information format and completeness (e.g., correct file types, readable scans)',
                  'Prepare onboarding status report showing what\'s complete and what\'s outstanding',
                  'Escalate to accountant if client is non-responsive after multiple reminders'
                ],
                review: 'Accountant reviews the completed onboarding file, confirms all compliance checks are satisfied, and approves the client for active service.'
              },
              {
                num: 4,
                title: 'Client Chaser (Outstanding Items)',
                icon: 'ClipboardList',
                goal: 'Manage and chase outstanding client items until resolved or escalated.',
                actions: [
                  'Monitor list of outstanding items (missing invoices, unsigned documents, overdue information)',
                  'Send polite reminder emails at defined intervals (e.g., 7 days, 14 days)',
                  'Track client responses and update status',
                  'Identify items that remain outstanding beyond firm thresholds',
                  'Escalate to accountant when: client is unresponsive, item is critical and overdue, or deadline is approaching',
                  'Log all communications and status updates in client file'
                ],
                review: 'Accountant reviews escalated items and decides whether to contact the client directly, adjust timelines, or take other action.'
              }
            ].map((workflow, index) => {
              const isExpanded = expandedWorkflowIndexes.has(index);
              const Icon = getIcon(workflow.icon);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group"
                >
                  <motion.div
                    animate={{
                      y: isExpanded ? 0 : [0, -4, 0],
                    }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }
                    }}
                    className={`bg-gradient-to-br from-white/[0.08] to-white/[0.03] border-2 rounded-xl p-5 cursor-pointer transition-all ${
                      isExpanded
                        ? 'border-[#00DC51] shadow-xl shadow-[#00DC51]/20'
                        : 'border-white/20 hover:border-[#00DC51]/50 hover:shadow-lg hover:shadow-[#00DC51]/10'
                    }`}
                    onClick={() => setWorkflowExpanded(index, !isExpanded)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setWorkflowExpanded(index, !isExpanded);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`${workflow.title}: ${isExpanded ? 'collapse details' : 'expand details'}`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                        isExpanded
                          ? 'bg-[#00DC51] border-[#00DC51] shadow-lg shadow-[#00DC51]/40'
                          : 'bg-white/10 border-white/30'
                      }`}>
                        {isExpanded ? (
                          <Icon className="text-black" size={22} strokeWidth={2.5} />
                        ) : (
                          <span className="text-white font-black text-sm">{workflow.num}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-black text-base mb-1 transition-colors ${
                          isExpanded ? 'text-[#00DC51]' : 'text-white'
                        }`}>
                          {workflow.title}
                        </h4>
                        <p className="text-xs text-white/60 font-medium leading-relaxed">
                          {workflow.goal}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className={`transition-colors ${
                          isExpanded ? 'text-[#00DC51]' : 'text-white/40'
                        }`} size={20} strokeWidth={2.5} style={{ transform: 'rotate(90deg)' }} />
                      </motion.div>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/10 space-y-4">
                        {/* Agent Actions */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Bot className="text-[#00DC51]" size={16} strokeWidth={2.5} />
                            <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Agent Actions</span>
                          </div>
                          <div className="space-y-2 pl-1">
                            {workflow.actions.map((action, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                                <p className="text-xs text-white/70 font-medium leading-relaxed">{action}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Review Point */}
                        <div className="bg-[#00DC51]/10 border-2 border-[#00DC51]/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="text-[#00DC51]" size={14} strokeWidth={2.5} />
                            <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Review Point</span>
                          </div>
                          <p className="text-xs text-white/80 font-medium leading-relaxed">
                            {workflow.review}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Click prompt when collapsed */}
                    {!isExpanded && (
                      <div className="mt-3 text-xs text-white/40 font-medium text-center">
                        Click to expand details
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative bg-gradient-to-r from-[#00DC51]/15 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-5 backdrop-blur-sm"
          >
            <p className="font-bold text-base leading-relaxed">
              Each workflow has a clear outcome, structured steps, and human oversight. The agent performs the process; the accountant reviews and approves the result.
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
