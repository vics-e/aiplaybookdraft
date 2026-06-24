import { motion } from 'motion/react';
import { Download, ClipboardList, CheckCircle, Calendar, Edit3, Save, X } from 'lucide-react';
import { useState } from 'react';
import { playbook } from '../data/playbookData';

interface ActivitySummaryProps {
  pageInputs: Record<string, string>;
  onInputChange?: (pageId: string, value: string) => void;
}

export function ActivitySummary({ pageInputs, onInputChange }: ActivitySummaryProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editListValues, setEditListValues] = useState<Record<string, string>>({});
  
  // Get all pages with activities
  const activitiesWithResponses = playbook
    .filter(page => page.activity)
    .map((page, index) => ({
      id: page.id,
      section: page.section || 'Introduction',
      title: page.activity!.title,
      prompt: page.activity!.prompt,
      type: page.activity!.type || 'text',
      listCount: page.activity!.listCount,
      placeholderPrefix: page.activity!.placeholderPrefix,
      questions: page.activity!.questions,
      specFields: page.activity!.specFields,
      checkboxTasks: page.activity!.checkboxTasks,
      response: pageInputs[page.id] || '',
      activityNumber: index + 1
    }));

  const completedCount = activitiesWithResponses.filter(a => a.response && a.response !== '{}').length;
  const totalCount = activitiesWithResponses.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  // Handle edit start
  const handleEditStart = (activityId: string, currentResponse: string, type: string) => {
    setEditingId(activityId);
    if (type === 'numbered-list' || type === 'multi-question') {
      try {
        const parsed = currentResponse ? JSON.parse(currentResponse) : {};
        setEditListValues(parsed);
      } catch (e) {
        setEditListValues({});
      }
    } else {
      setEditValue(currentResponse);
    }
  };

  // Handle save
  const handleSave = (activityId: string, type: string) => {
    if (onInputChange) {
      if (type === 'numbered-list' || type === 'multi-question') {
        onInputChange(activityId, JSON.stringify(editListValues));
      } else {
        onInputChange(activityId, editValue);
      }
    }
    setEditingId(null);
    setEditValue('');
    setEditListValues({});
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
    setEditListValues({});
  };

  // Handle print/download
  const handleDownload = () => {
    window.print();
  };

  // Format response for display
  const formatResponse = (
    response: string,
    type: string,
    listCount?: number,
    questions?: string[],
    specFields?: { label: string; placeholder: string; helper?: string }[],
    checkboxTasks?: { label: string; criteria: string[] }[],
  ) => {
    if (!response || response === '{}') {
      return <span className="text-white/30 italic text-sm">No answer provided</span>;
    }

    if (type === 'multi-question' && questions) {
      try {
        const inputs = JSON.parse(response);
        const hasContent = Object.values(inputs).some((val: any) => val && val.trim() !== '');
        
        if (!hasContent) {
          return <span className="text-white/30 italic text-sm">No answer provided</span>;
        }

        return (
          <div className="space-y-4">
            {questions.map((question, index) => {
              const questionKey = `question-${index}`;
              const answer = inputs[questionKey] || '';
              
              if (!answer) return null;
              
              return (
                <div key={index} className="space-y-1">
                  <p className="text-xs font-bold text-white/70">{index + 1}. {question}</p>
                  <p className="text-white/90 text-sm font-medium leading-relaxed pl-4">{answer}</p>
                </div>
              );
            })}
          </div>
        );
      } catch (e) {
        return <p className="text-white/90 text-sm font-medium leading-relaxed whitespace-pre-wrap">{response}</p>;
      }
    }

    if ((type === 'numbered-list' || type === 'list') && listCount) {
      try {
        const inputs = JSON.parse(response);
        const items = Array.from({ length: listCount }).map((_, i) => inputs[`item-${i}`] || '');
        const hasContent = items.some(item => item.trim() !== '');
        
        if (!hasContent) {
          return <span className="text-white/30 italic text-sm">No answer provided</span>;
        }

        return (
          <div className="space-y-2">
            {items.map((item, index) => (
              item && (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-xs">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-white/90 text-sm font-medium leading-relaxed pt-0.5">{item}</p>
                </div>
              )
            ))}
          </div>
        );
      } catch (e) {
        return <p className="text-white/90 text-sm font-medium leading-relaxed whitespace-pre-wrap">{response}</p>;
      }
    }

    if (type === 'spec-form' && specFields) {
      try {
        const inputs = JSON.parse(response);
        const hasContent = specFields.some((_, index) => (inputs[`field-${index}`] || '').trim() !== '');

        if (!hasContent) {
          return <span className="text-white/30 italic text-sm">No answer provided</span>;
        }

        return (
          <div className="space-y-3">
            {specFields.map((field, index) => {
              const answer = inputs[`field-${index}`] || '';
              if (!answer) return null;

              return (
                <div key={index} className="space-y-1">
                  <p className="text-xs font-bold text-white/70">{field.label}</p>
                  <p className="text-white/90 text-sm font-medium leading-relaxed pl-4 whitespace-pre-wrap">{answer}</p>
                </div>
              );
            })}
          </div>
        );
      } catch (e) {
        return <p className="text-white/90 text-sm font-medium leading-relaxed whitespace-pre-wrap">{response}</p>;
      }
    }

    if (type === 'checkbox-tasks' && checkboxTasks) {
      try {
        const inputs = JSON.parse(response);
        const workflowName = inputs['workflow-name'] || '';
        const taskSummaries = checkboxTasks.map((task, taskIndex) => {
          const taskData = inputs[`task-${taskIndex}`] || {};
          return {
            label: taskData.label || '',
            checks: Array.isArray(taskData.checks) ? taskData.checks : [],
            placeholder: task.label,
          };
        });
        const hasContent =
          workflowName.trim() !== '' ||
          taskSummaries.some((task) => task.label.trim() !== '' || task.checks.length > 0);

        if (!hasContent) {
          return <span className="text-white/30 italic text-sm">No answer provided</span>;
        }

        return (
          <div className="space-y-3">
            {workflowName && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-white/70">First agent workflow</p>
                <p className="text-white/90 text-sm font-medium leading-relaxed pl-4">{workflowName}</p>
              </div>
            )}
            {taskSummaries.map((task, index) => (
              (task.label || task.checks.length > 0) && (
                <div key={index} className="space-y-1">
                  <p className="text-xs font-bold text-white/70">{task.label || task.placeholder}</p>
                  {task.checks.length > 0 && (
                    <div className="space-y-1 pl-4">
                      {task.checks.map((check: string) => (
                        <p key={check} className="text-white/90 text-sm font-medium leading-relaxed">• {check}</p>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        );
      } catch (e) {
        return <p className="text-white/90 text-sm font-medium leading-relaxed whitespace-pre-wrap">{response}</p>;
      }
    }

    return <p className="text-white/90 text-sm font-medium leading-relaxed whitespace-pre-wrap">{response}</p>;
  };

  // Group by section
  const sections = Array.from(new Set(activitiesWithResponses.map(a => a.section)));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-2 bg-[#00DC51]/15 border-2 border-[#00DC51]/40 rounded-full backdrop-blur-sm mb-6"
        >
          <span className="text-[#00DC51] font-bold text-xs tracking-wide uppercase">Activity Summary</span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-[1.05] tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>
          Your AI Journey <span className="relative inline-block">
            <span className="relative z-10">Responses</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#00DC51] -z-10 opacity-30" />
          </span>
        </h2>
        <p className="text-base md:text-lg text-white/70 font-medium leading-relaxed mb-8">
          Review all your activity responses in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <ClipboardList className="text-[#00DC51]" size={24} strokeWidth={2.5} />
            <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Total Activities</span>
          </div>
          <p className="text-4xl font-black">{completedCount} / {totalCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-[#00DC51]" size={24} strokeWidth={2.5} />
            <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Completion</span>
          </div>
          <p className="text-4xl font-black">{completionPercentage}%</p>
        </motion.div>
      </div>

      {/* Download Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={handleDownload}
          className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-[#00DC51] text-black font-bold rounded-xl hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/30 hover:shadow-[#00DC51]/50 hover:scale-[1.02] print:hidden"
        >
          <Download size={20} strokeWidth={2.5} />
          <span>Download / Print Summary</span>
        </button>
      </motion.div>

      {/* Activity Responses by Section */}
      <div className="space-y-8 print:space-y-6">
        {sections.map((section, sectionIndex) => {
          const sectionActivities = activitiesWithResponses.filter(a => a.section === section);
          
          return (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + sectionIndex * 0.1 }}
              className="space-y-4"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 pb-3 border-b-2 border-[#00DC51]/30">
                <h3 className="text-xl font-black text-[#00DC51]">{section}</h3>
                <div className="h-px flex-1 bg-[#00DC51]/20" />
              </div>

              {/* Activities in this section */}
              <div className="space-y-4">
                {sectionActivities.map((activity, actIndex) => (
                  <div
                    key={activity.id}
                    className="bg-white/[0.03] border-2 border-white/10 rounded-xl p-5 print:break-inside-avoid print:border-black/20"
                  >
                    {/* Activity Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#00DC51] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00DC51]/30 print:shadow-none">
                        <span className="text-black font-black text-sm">{activity.activityNumber}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base mb-1.5">{activity.title}</h4>
                        <p className="text-xs text-white/60 font-medium leading-relaxed print:text-black/60">{activity.prompt}</p>
                      </div>
                    </div>

                    {/* Response */}
                    <div className="pl-14 print:pl-0 print:ml-14 print:border-l-2 print:border-[#00DC51] print:pl-4">
                      <div className="text-xs font-black text-[#00DC51] uppercase tracking-wider mb-2">Your Response</div>
                      {editingId === activity.id ? (
                        <div className="space-y-2">
                          {activity.type === 'multi-question' && activity.questions ? (
                            <div className="space-y-4">
                              {activity.questions.map((question, index) => (
                                <div key={index} className="space-y-2">
                                  <label className="text-xs font-bold text-white/90 block">
                                    {index + 1}. {question}
                                  </label>
                                  <textarea
                                    value={editListValues[`question-${index}`] || ''}
                                    onChange={(e) => setEditListValues(prev => ({ ...prev, [`question-${index}`]: e.target.value }))}
                                    className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg p-3 text-sm font-medium leading-relaxed text-white placeholder-white/40 focus:outline-none resize-none min-h-[80px]"
                                    placeholder="Type your answer here..."
                                  />
                                </div>
                              ))}
                            </div>
                          ) : activity.type === 'numbered-list' && activity.listCount ? (
                            <div className="space-y-2">
                              {Array.from({ length: activity.listCount }).map((_, index) => (
                                <div key={index} className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-xs">
                                    {index + 1}
                                  </div>
                                  <input
                                    type="text"
                                    value={editListValues[`item-${index}`] || ''}
                                    onChange={(e) => setEditListValues(prev => ({ ...prev, [`item-${index}`]: e.target.value }))}
                                    className="w-full h-10 bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg p-3 text-sm font-medium leading-relaxed text-white placeholder-white/40 focus:outline-none"
                                    placeholder="Type your answer here..."
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full h-32 bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg p-3 text-sm font-medium leading-relaxed text-white placeholder-white/40 focus:outline-none resize-none"
                              placeholder="Type your answer here..."
                            />
                          )}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleSave(activity.id, activity.type)}
                              className="group flex items-center gap-2 px-4 py-2 bg-[#00DC51] text-black font-bold rounded-lg hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/30 hover:shadow-[#00DC51]/50 hover:scale-105"
                            >
                              <Save size={16} strokeWidth={2.5} />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancel}
                              className="group flex items-center gap-2 px-4 py-2 bg-white/10 border-2 border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
                            >
                              <X size={16} strokeWidth={2.5} />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 print:space-y-2">
                      {formatResponse(
                        activity.response,
                        activity.type,
                        activity.listCount,
                        activity.questions,
                        activity.specFields,
                        activity.checkboxTasks
                      )}
                          <button
                            onClick={() => handleEditStart(activity.id, activity.response, activity.type)}
                            className="group flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/20 text-white/70 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-all text-xs print:hidden"
                          >
                            <Edit3 size={14} strokeWidth={2.5} />
                            <span>Edit Response</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Print-specific footer */}
      <div className="hidden print:block mt-12 pt-6 border-t-2 border-black/20">
        <div className="flex items-center justify-between text-xs text-black/60">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="font-bold">The AI Playbook for Accountants & Bookkeepers</div>
        </div>
      </div>
    </div>
  );
}
