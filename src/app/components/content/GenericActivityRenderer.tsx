import { motion } from 'motion/react';
import { CheckCircle, Lightbulb } from 'lucide-react';
import type { PlaybookPage } from '../../data/playbookData';
import {
  AgentCandidateActivity,
  AiEnabledWorkflowActivity,
  ClientMessageActivity,
  ImpactPricingActivity,
  PromptFrameworkActivity,
  StartingWorkflowActivity,
} from '../FocusedPageActivities';
import { parseStructuredInputs } from './promptLibraryModel';

interface GenericActivityRendererProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
}

const CERTIFICATE_NAME_PLACEHOLDER = '[Name / Practice Name]';

export function GenericActivityRenderer({ page, userInput, onInputChange }: GenericActivityRendererProps) {
  const isCertificatePage = page.id === 'certificate';
  const isFinishPage = page.id === 's7-finish';
  const usesFocusedPageActivity = [
    's3-where-agents',
    's3-workflows',
    's3-ai-workflow',
    's4-framework',
    's5-impact-exercise',
    's5-client-talk',
  ].includes(page.id);
  const activityTitleId = `${page.id}-activity-title`;
  const activityPromptId = `${page.id}-activity-prompt`;
  const structuredInputs = parseStructuredInputs(userInput) as Record<string, any>;
  const certificateName = isCertificatePage ? (structuredInputs['question-0'] || '').trim() : '';
  const certificateDisplayName = certificateName || CERTIFICATE_NAME_PLACEHOLDER;
  const certificateTitleBlock = isCertificatePage ? page.content.find(block => block.type === 'box') : undefined;
  const certificateStatement = isCertificatePage ? page.content.find(block => block.type === 'highlight')?.text || '' : '';
  const poweredBySageBlock = isCertificatePage
    ? page.content.find(block => block.type === 'box' && block.title === 'Powered by Sage')
    : undefined;
  const certificateCompletionDate = isCertificatePage
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
    : '';

  return (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          aria-labelledby={activityTitleId}
          aria-describedby={activityPromptId}
          className={`${isFinishPage
            ? 'overflow-hidden rounded-[28px] border-[1.5px] accent-border bg-[var(--color-surface-1)]'
            : 'overflow-hidden rounded-2xl border-[1.5px] accent-border bg-[var(--color-surface-1)]'} ${
            isCertificatePage ? 'certificate-activity-shell' : ''
          }`}
        >
          <div className={`flex items-center gap-4 border-b border-[var(--color-rule)] p-5 sm:p-6 ${isCertificatePage ? 'certificate-screen-only' : ''}`}>
            <div className={`${isFinishPage
              ? 'accent-bg flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl'
              : 'accent-bg w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0'}`}>
              <Lightbulb className="text-black" size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="playbook-page-eyebrow mb-1">Activity</div>
              <h4 id={activityTitleId} className="playbook-component-title">{page.activity.title}</h4>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <p id={activityPromptId} className="mb-5 text-base font-medium leading-relaxed text-white">{page.activity.prompt}</p>

          {page.id === 's3-where-agents' && (
            <AgentCandidateActivity activity={page.activity} userInput={userInput} onInputChange={onInputChange} />
          )}
          {page.id === 's3-workflows' && (
            <StartingWorkflowActivity activity={page.activity} userInput={userInput} onInputChange={onInputChange} />
          )}
          {page.id === 's3-ai-workflow' && (
            <AiEnabledWorkflowActivity activity={page.activity} userInput={userInput} onInputChange={onInputChange} />
          )}
          {page.id === 's4-framework' && (
            <PromptFrameworkActivity activity={page.activity} userInput={userInput} onInputChange={onInputChange} />
          )}
          {page.id === 's5-impact-exercise' && (
            <ImpactPricingActivity activity={page.activity} userInput={userInput} onInputChange={onInputChange} />
          )}
          {page.id === 's5-client-talk' && (
            <ClientMessageActivity activity={page.activity} userInput={userInput} onInputChange={onInputChange} />
          )}

          {/* Text Area for regular activities */}
          {(!page.activity.type || page.activity.type === 'text') && (
            <>
              <textarea
                aria-labelledby={activityTitleId}
                aria-describedby={activityPromptId}
                value={userInput}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Type your answer here..."
                className={`${isFinishPage
                  ? 'min-h-[180px] w-full rounded-[20px] border border-white/18 bg-black/32 p-5 text-base text-white placeholder-white/32 focus:border-[#00DC51]'
                  : 'w-full rounded-xl border-2 border-white/20 bg-black/40 p-4 text-sm text-white placeholder-white/40 focus:border-[#00DC51]'} focus:outline-none resize-none font-medium transition-colors`}
              />

              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Answer saved locally</span>
                </motion.div>
              )}
            </>
          )}

          {/* Multi-Question Input */}
          {!usesFocusedPageActivity && page.activity.type === 'multi-question' && page.activity.questions && (
            <div className="space-y-5">
              {isCertificatePage && (
                <div className="certificate-print-area">
                  <div className="certificate-print-card relative overflow-hidden rounded-[32px] border-2 border-[#00DC51] bg-[radial-gradient(circle_at_top,_rgba(0,220,81,0.16),_rgba(0,0,0,0.96)_55%)] px-6 py-8 text-center shadow-2xl shadow-[#00DC51]/20 md:px-12 md:py-12">
                    <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-[#00DC51]/70 to-transparent md:inset-x-12" />
                    <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-[#00DC51]/50 to-transparent md:inset-x-12" />

                    <div className="relative z-10 space-y-6">
                      <div className="space-y-3">
                        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#00DC51]/90">
                          {certificateTitleBlock?.title || 'The AI Playbook for Accountants & Bookkeepers'}
                        </p>
                        <h3
                          className="text-3xl font-black text-white md:text-5xl"
                          style={{ fontFamily: 'var(--font-family-header)' }}
                        >
                          {certificateTitleBlock?.text || 'Certificate of Completion'}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">
                          Presented to
                        </p>
                        <div className="mx-auto max-w-3xl border-b border-[#00DC51]/60 px-4 pb-4">
                          <p
                            className={`text-3xl font-black md:text-5xl ${
                              certificateName ? 'text-white' : 'text-white/50'
                            }`}
                            style={{ fontFamily: 'var(--font-family-header)' }}
                          >
                            {certificateDisplayName}
                          </p>
                        </div>
                      </div>

                      <p className="mx-auto max-w-3xl text-sm font-medium leading-relaxed text-white/80 md:text-base">
                        {certificateStatement}
                      </p>

                      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#00DC51]">
                          {poweredBySageBlock?.title || 'Powered by Sage'}
                        </p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-white/70">
                          {poweredBySageBlock?.text || ''}
                        </p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2 pt-2 text-white/65 md:flex-row md:gap-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Completion Date</span>
                        <span className="text-sm font-semibold">{certificateCompletionDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {page.activity.questions.map((question, index) => {
                const questionKey = `question-${index}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  savedInputs = {};
                }
                const questionValue = savedInputs[questionKey] || '';

                // Check if this is the first question and there are dropdown options
                const isFirstQuestionWithDropdown = index === 0 && page.activity.dropdownOptions && page.activity.dropdownOptions.length > 0;

                // Detect if question asks for a list of items (e.g., "List 3 types", "List 2 types")
                const listMatch = question.match(/[Ll]ist\s+(\d+)\s+types?/);
                const itemCount = listMatch ? parseInt(listMatch[1], 10) : 0;

                return (
                  <div key={index} className={`space-y-2 ${isCertificatePage ? 'certificate-screen-only' : ''}`}>
                    <label htmlFor={`${page.id}-${questionKey}`} className="text-sm font-bold text-white/90 block">
                      {index + 1}. {question}
                    </label>

                    {isFirstQuestionWithDropdown ? (
                      <select
                        id={`${page.id}-${questionKey}`}
                        value={questionValue}
                        onChange={(e) => {
                          const newInputs = { ...savedInputs, [questionKey]: e.target.value };
                          onInputChange(JSON.stringify(newInputs));
                        }}
                        className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl px-4 py-3 text-white focus:outline-none font-medium transition-colors text-sm appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2300DC51' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.25rem',
                          paddingRight: '3rem'
                        }}
                      >
                        <option value="" disabled>Select a workflow...</option>
                        {page.activity.dropdownOptions.map((option) => (
                          <option key={option} value={option} className="bg-black text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : itemCount > 0 ? (
                      // Render multiple input boxes for list questions
                      <div className="space-y-3">
                        {Array.from({ length: itemCount }).map((_, itemIndex) => {
                          const itemKey = `${questionKey}-item-${itemIndex}`;
                          const itemValue = savedInputs[itemKey] || '';

                          return (
                            <div key={itemIndex} className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-sm shadow-lg shadow-[#00DC51]/30 mt-1">
                                {itemIndex + 1}
                              </div>
                              <input
                                id={`${page.id}-${itemKey}`}
                                aria-label={`${question} — item ${itemIndex + 1}`}
                                type="text"
                                value={itemValue}
                                onChange={(e) => {
                                  const newInputs = { ...savedInputs, [itemKey]: e.target.value };
                                  onInputChange(JSON.stringify(newInputs));
                                }}
                                placeholder={`Type item ${itemIndex + 1}...`}
                                className="flex-1 bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none font-medium transition-colors text-sm"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <textarea
                        id={`${page.id}-${questionKey}`}
                        value={questionValue}
                        onChange={(e) => {
                          const newInputs = { ...savedInputs, [questionKey]: e.target.value };
                          onInputChange(JSON.stringify(newInputs));
                        }}
                        placeholder="Type your answer here..."
                        className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl p-4 text-white placeholder-white/40 focus:outline-none resize-none font-medium transition-colors text-sm min-h-[100px]"
                      />
                    )}
                  </div>
                );
              })}

              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs ${isCertificatePage ? 'certificate-screen-only' : ''}`}
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Answers saved locally</span>
                </motion.div>
              )}
            </div>
          )}

          {/* List / Numbered List Input */}
          {(page.activity.type === 'numbered-list' || page.activity.type === 'list') && page.activity.listCount && (
            <div className="space-y-3">
              {Array.from({ length: page.activity.listCount }).map((_, index) => {
                const inputKey = `item-${index}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  // If parsing fails, start with empty object
                  savedInputs = {};
                }
                const itemValue = savedInputs[inputKey] || '';
                const placeholderPrefix = page.activity.placeholderPrefix || 'Item';

                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-sm shadow-lg shadow-[#00DC51]/30">
                      {index + 1}
                    </div>
                    <input
                      aria-label={`${placeholderPrefix} ${index + 1}`}
                      type="text"
                      value={itemValue}
                      onChange={(e) => {
                        const newInputs = { ...savedInputs, [inputKey]: e.target.value };
                        onInputChange(JSON.stringify(newInputs));
                      }}
                      placeholder={`${placeholderPrefix} ${index + 1}...`}
                      className="flex-1 bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none font-medium transition-colors text-sm"
                    />
                  </div>
                );
              })}

              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>List saved locally</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Dropdown Select */}
          {page.activity.type === 'dropdown' && page.activity.dropdownOptions && (
            <>
              <select
                aria-labelledby={activityTitleId}
                aria-describedby={activityPromptId}
                value={userInput}
                onChange={(e) => onInputChange(e.target.value)}
                className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl p-4 text-white focus:outline-none font-medium transition-colors text-sm appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300DC51' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem',
                  paddingRight: '3rem'
                }}
              >
                <option value="" className="bg-black">Select an option...</option>
                {page.activity.dropdownOptions.map((option, index) => (
                  <option key={index} value={option} className="bg-black">
                    {option}
                  </option>
                ))}
              </select>

              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Selection saved locally</span>
                </motion.div>
              )}
            </>
          )}

          {/* Yes/No Radio Buttons */}
          {page.activity.type === 'yes-no' && (
            <>
              <div className="flex flex-wrap items-center gap-6" role="group" aria-labelledby={activityTitleId} aria-describedby={activityPromptId}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center transition-all ${
                    userInput === 'yes'
                      ? 'bg-[#00DC51] border-[#00DC51] shadow-lg shadow-[#00DC51]/40'
                      : 'bg-black/40 border-white/20 group-hover:border-[#00DC51]/50'
                  }`}>
                    {userInput === 'yes' && (
                      <CheckCircle size={24} strokeWidth={3} className="text-black" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="yes-no"
                    value="yes"
                    checked={userInput === 'yes'}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-base font-bold">Yes</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center transition-all ${
                    userInput === 'no'
                      ? 'bg-[#00DC51] border-[#00DC51] shadow-lg shadow-[#00DC51]/40'
                      : 'bg-black/40 border-white/20 group-hover:border-[#00DC51]/50'
                  }`}>
                    {userInput === 'no' && (
                      <CheckCircle size={24} strokeWidth={3} className="text-black" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="yes-no"
                    value="no"
                    checked={userInput === 'no'}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-base font-bold">No</span>
                </label>
              </div>

              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Answer saved locally</span>
                </motion.div>
              )}
            </>
          )}

          {/* Fill in the Gaps */}
          {page.activity.type === 'fill-gaps' && page.activity.gapSentence && (
            <>
              <div className="space-y-4">
                <div className="text-sm text-white/80 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.activity.gapSentence.split('___').map((part, index, arr) => {
                    if (index === arr.length - 1) return <span key={index}>{part}</span>;

                    const gapKey = `gap-${index}`;
                    let savedInputs = {};
                    try {
                      savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                    } catch (e) {
                      savedInputs = {};
                    }
                    const gapValue = savedInputs[gapKey] || '';

                    return (
                      <span key={index}>
                        {part}
                        <input
                          aria-label={`${page.activity.title}, blank ${index + 1}`}
                          type="text"
                          value={gapValue}
                          onChange={(e) => {
                            const newInputs = { ...savedInputs, [gapKey]: e.target.value };
                            onInputChange(JSON.stringify(newInputs));
                          }}
                          placeholder="___"
                          className="inline-block min-w-[200px] bg-black/40 border-b-2 border-[#00DC51]/50 focus:border-[#00DC51] px-2 py-1 text-white placeholder-white/30 focus:outline-none font-medium transition-colors text-sm mx-1"
                        />
                      </span>
                    );
                  })}
                </div>
              </div>

              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Answers saved locally</span>
                </motion.div>
              )}
            </>
          )}

          {/* Checkbox Tasks */}
          {!usesFocusedPageActivity && page.activity.type === 'checkbox-tasks' && page.activity.checkboxTasks && (
            <div className="space-y-4">
              {page.id === 's6-days61-90' && (
                <div className="space-y-2">
                  <label htmlFor={`${page.id}-workflow-name`} className="text-sm font-bold text-white/90 block">
                    Define your first agent workflow:
                  </label>
                  <input
                    id={`${page.id}-workflow-name`}
                    type="text"
                    value={structuredInputs['workflow-name'] || ''}
                    onChange={(e) => {
                      const newInputs = { ...structuredInputs, ['workflow-name']: e.target.value };
                      onInputChange(JSON.stringify(newInputs));
                    }}
                    placeholder="e.g., Quarterly update preparation, Client chaser, Onboarding steps"
                    className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none font-medium transition-colors text-sm"
                  />
                </div>
              )}
              {page.activity.checkboxTasks.map((task, taskIndex) => {
                const taskKey = `task-${taskIndex}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  savedInputs = {};
                }
                const taskData = savedInputs[taskKey] || { label: '', checks: [] };
                const isControlsChecklist = page.id === 's3-controls';

                return (
                  <div key={taskIndex} className={isControlsChecklist ? 'space-y-3' : 'space-y-3 rounded-xl border border-[var(--color-rule)] bg-[var(--color-surface-1)] p-4'}>
                    {/* Task Name Input */}
                    {isControlsChecklist ? (
                      <h5 className="text-sm font-black text-white">{task.label}</h5>
                    ) : (
                      <input
                        aria-label={`Task ${taskIndex + 1} name`}
                        type="text"
                        value={taskData.label || ''}
                        onChange={(e) => {
                          const newTaskData = { ...taskData, label: e.target.value };
                          const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                          onInputChange(JSON.stringify(newInputs));
                        }}
                        placeholder={page.id === 's6-days61-90' ? 'Optional: add a short name for this checklist' : task.label}
                        className="w-full rounded-lg border border-[var(--color-rule)] bg-black px-4 py-2.5 text-sm font-bold text-white placeholder-white/40 transition-colors focus:border-[var(--color-accent)] focus:outline-none"
                      />
                    )}

                    {/* Checkboxes */}
                    <div className={isControlsChecklist ? 'grid gap-px overflow-hidden rounded-xl border border-[var(--color-rule)] bg-[var(--color-rule)] sm:grid-cols-2' : 'space-y-2 pl-2'}>
                      {task.criteria.map((criterion, criterionIndex) => {
                        const isChecked = taskData.checks?.includes(criterion) || false;

                        return (
                          <label key={criterionIndex} className={`group flex cursor-pointer items-center gap-3 ${isControlsChecklist ? 'bg-[var(--color-surface-1)] px-4 py-3' : ''}`}>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-[#00DC51] border-[#00DC51]'
                                : 'bg-black/40 border-white/30 group-hover:border-[#00DC51]/50'
                            }`}>
                              {isChecked && (
                                <CheckCircle size={14} strokeWidth={3} className="text-black" />
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                const currentChecks = taskData.checks || [];
                                const newChecks = e.target.checked
                                  ? [...currentChecks, criterion]
                                  : currentChecks.filter(c => c !== criterion);
                                const newTaskData = { ...taskData, checks: newChecks };
                                const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                                onInputChange(JSON.stringify(newInputs));
                              }}
                              className="sr-only"
                            />
                            <span className="text-xs font-medium text-[var(--color-muted-text)] transition-colors group-hover:text-white">
                              {criterion}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Tasks saved locally</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Task Classification - New improved layout for "Where AI Works Best" */}
          {page.activity.type === 'task-classification' && page.activity.taskCount && (
            <div className="space-y-3">
              {Array.from({ length: page.activity.taskCount }).map((_, taskIndex) => {
                const taskKey = `task-${taskIndex}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  savedInputs = {};
                }
                const taskData = savedInputs[taskKey] || { label: '', classification: '', topCandidate: false };

                return (
                  <div key={taskIndex} className="bg-white/5 border-2 border-white/10 rounded-xl p-4">
                    {/* Task Name Input */}
                    <input
                      type="text"
                      value={taskData.label || ''}
                      onChange={(e) => {
                        const newTaskData = { ...taskData, label: e.target.value };
                        const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                        onInputChange(JSON.stringify(newInputs));
                      }}
                      placeholder={`Task ${taskIndex + 1}`}
                      className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none font-bold transition-colors text-sm mb-3"
                    />

                    {/* Classification and Top Candidate - Side by Side */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      {/* Left: Radio buttons for classification */}
                      <div className="flex flex-1 flex-wrap items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            taskData.classification === 'ai-ready'
                              ? 'bg-[#00DC51] border-[#00DC51]'
                              : 'bg-black/40 border-white/30 group-hover:border-[#00DC51]/50'
                          }`}>
                            {taskData.classification === 'ai-ready' && (
                              <div className="w-2 h-2 bg-black rounded-full" />
                            )}
                          </div>
                    <input
                      aria-label={`Task ${taskIndex + 1}`}
                            type="radio"
                            name={`classification-${taskIndex}`}
                            checked={taskData.classification === 'ai-ready'}
                            onChange={() => {
                              const newTaskData = { ...taskData, classification: 'ai-ready' };
                              const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                              onInputChange(JSON.stringify(newInputs));
                            }}
                            className="sr-only"
                          />
                          <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors">
                            AI-ready workflow
                          </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            taskData.classification === 'human-led'
                              ? 'bg-[#00DC51] border-[#00DC51]'
                              : 'bg-black/40 border-white/30 group-hover:border-[#00DC51]/50'
                          }`}>
                            {taskData.classification === 'human-led' && (
                              <div className="w-2 h-2 bg-black rounded-full" />
                            )}
                          </div>
                          <input
                            type="radio"
                            name={`classification-${taskIndex}`}
                            checked={taskData.classification === 'human-led'}
                            onChange={() => {
                              const newTaskData = { ...taskData, classification: 'human-led' };
                              const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                              onInputChange(JSON.stringify(newInputs));
                            }}
                            className="sr-only"
                          />
                          <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors">
                            Human-led with AI support
                          </span>
                        </label>
                      </div>

                      {/* Right: Top Candidate Checkbox with vertical separator */}
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-px bg-white/20" />
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            taskData.topCandidate
                              ? 'bg-[#00DC51] border-[#00DC51]'
                              : 'bg-black/40 border-white/30 group-hover:border-[#00DC51]/50'
                          }`}>
                            {taskData.topCandidate && (
                              <CheckCircle size={14} strokeWidth={3} className="text-black" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={taskData.topCandidate || false}
                            onChange={(e) => {
                              const newTaskData = { ...taskData, topCandidate: e.target.checked };
                              const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                              onInputChange(JSON.stringify(newInputs));
                            }}
                            className="sr-only"
                          />
                          <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors whitespace-nowrap">
                            Top candidate for agent automation
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}

              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Tasks saved locally</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Spec Form */}
          {!usesFocusedPageActivity && page.activity.type === 'spec-form' && page.activity.specFields && (
            <div className="space-y-5">
              {page.activity.specFields.map((field, index) => {
                const fieldKey = `field-${index}`;
                let savedInputs = {};
                try {
                  savedInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
                } catch (e) {
                  savedInputs = {};
                }
                const fieldValue = savedInputs[fieldKey] || '';

                return (
                  <div key={index} className="space-y-2">
                    <label htmlFor={`${page.id}-${fieldKey}`} className="text-sm font-bold text-white/90 block">
                      {field.label}:
                    </label>
                    {field.helper && (
                      <p id={`${page.id}-${fieldKey}-helper`} className="text-xs text-white/60 -mt-1 mb-2">{field.helper}</p>
                    )}
                    <textarea
                      id={`${page.id}-${fieldKey}`}
                      aria-describedby={field.helper ? `${page.id}-${fieldKey}-helper` : undefined}
                      value={fieldValue}
                      onChange={(e) => {
                        const newInputs = { ...savedInputs, [fieldKey]: e.target.value };
                        onInputChange(JSON.stringify(newInputs));
                      }}
                      placeholder={field.placeholder}
                      className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-xl p-4 text-white placeholder-white/40 focus:outline-none resize-none font-medium transition-colors text-sm min-h-[80px]"
                    />
                  </div>
                );
              })}

              {userInput && userInput !== '{}' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center gap-2 text-[#00DC51] font-bold text-xs"
                >
                  <CheckCircle size={16} strokeWidth={2.5} />
                  <span>Spec saved locally</span>
                </motion.div>
              )}
            </div>
          )}
          </div>
        </motion.section>
  );
}
