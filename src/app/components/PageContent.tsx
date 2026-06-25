import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Shield, Bot, MessageSquare, DollarSign, Calendar, FileText, CheckCircle, Lightbulb, Target, Zap, X, TrendingUp, Users, Download, ClipboardList, AlertCircle, ArrowRight, Database, Eye, Sparkles, ChevronDown, Lock, UserX, FileWarning, Users as UsersIcon, HelpCircle, Ban, XCircle, Search, Copy, RotateCcw, Check } from 'lucide-react';
import type { PlaybookPage } from '../data/playbookData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ActivitySummary } from './ActivitySummary';
import coverBackground from 'figma:asset/7d10c58b13d65e57e14197ae9cce3c931f5cc649.png';
import sageLogo from 'figma:asset/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png';
import aiAssistedFirmsImage from '../../assets/images/optimised/ai-assisted-firms.jpg';
import aiDividendImage from '../../assets/images/optimised/ai-dividend.jpg';
import ethicsResponsibilityImage from '../../assets/images/optimised/ethics-responsibility.jpg';
import assistantsAgentsImage from '../../assets/images/optimised/assistants-agents.jpg';
import promptingFrameworkImage from '../../assets/images/optimised/prompting-framework.jpg';
import firstThirtyDaysImage from '../../assets/images/optimised/first-30-days.jpg';
import acceptableUsePolicyImage from '../../assets/images/optimised/acceptable-use-policy.jpg';

interface PageContentProps {
  page: PlaybookPage;
  userInput: string;
  onInputChange: (value: string) => void;
  goToPage: (page: number) => void;
  pageInputs?: Record<string, string>;
  onUpdatePageInput?: (pageId: string, value: string) => void;
}

const SECTION_IMAGE_BY_PAGE_ID: Record<string, string> = {
  's1-intro': aiAssistedFirmsImage,
  's2-ethics-responsibility': ethicsResponsibilityImage,
  's3-where-assistants': assistantsAgentsImage,
  's4-framework': promptingFrameworkImage,
  's5-dividend': aiDividendImage,
  's6-days1-30': firstThirtyDaysImage,
  's7-policy': acceptableUsePolicyImage,
};

const CERTIFICATE_NAME_PLACEHOLDER = '[Name / Practice Name]';

interface PromptVariable {
  id: string;
  key: string;
  label: string;
  token: string;
}

interface PromptTemplate {
  id: string;
  title: string;
  text: string;
  variables: PromptVariable[];
}

interface PromptLibraryState {
  searchQuery: string;
  expandedPromptIds: string[];
  promptValues: Record<string, Record<string, string>>;
  activityAnswers: Record<string, string>;
  activityCompleted: string[];
}

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

interface GlossaryHelperContent {
  plainEnglish?: string;
  example?: string;
  watchOut?: string;
  relatedTerms?: string[];
}

interface GlossaryPageState {
  mode: 'lab' | 'flashcards';
  searchQuery: string;
  selectedTerm: string;
  currentFlashcardIndex: number;
  learnedTerms: string[];
  flippedTerms: string[];
}

interface WorkflowMapEntry {
  id: string;
  name: string;
  repeatability: number;
  judgement: number;
}

interface WorkflowMapPageState {
  workflows: WorkflowMapEntry[];
  draftName: string;
  scoringIndex: number;
  selectedWorkflowIds: string[];
  currentStep: number;
}

interface ToolMatrixRow {
  id: string;
  toolName: string;
  allowedTasks: string;
  dataBoundaries: string;
  reviewRequired: string;
}

interface ToolMatrixPageState {
  rows: ToolMatrixRow[];
  activeRowId: string;
}

const DEFAULT_PROMPT_LIBRARY_STATE: PromptLibraryState = {
  searchQuery: '',
  expandedPromptIds: [],
  promptValues: {},
  activityAnswers: {},
  activityCompleted: [],
};

const DEFAULT_GLOSSARY_STATE: GlossaryPageState = {
  mode: 'lab',
  searchQuery: '',
  selectedTerm: '',
  currentFlashcardIndex: 0,
  learnedTerms: [],
  flippedTerms: [],
};

const DEFAULT_WORKFLOW_MAP_STATE: WorkflowMapPageState = {
  workflows: [],
  draftName: '',
  scoringIndex: 0,
  selectedWorkflowIds: [],
  currentStep: 0,
};

const GLOSSARY_HELPER_CONTENT: Record<string, GlossaryHelperContent> = {
  'AI (Artificial Intelligence)': {
    plainEnglish: 'Software that can help with tasks that usually need human thinking.',
    example: 'An AI tool summarises client notes or helps draft a professional email.',
    watchOut: 'AI can sound confident even when the answer still needs checking.',
    relatedTerms: ['Generative AI', 'Machine Learning (ML)', 'Model'],
  },
  'AI Agent': {
    plainEnglish: 'An agent works through several steps to achieve an outcome, not just a single task.',
    example: 'An agent gathers information, checks it against rules, and prepares a draft result for approval.',
    watchOut: 'Agents should operate inside clear guardrails, permissions, and review points.',
    relatedTerms: ['AI Assistant', 'Human-in-the-loop', 'Workflow'],
  },
  'AI Assistant': {
    plainEnglish: 'An assistant helps when you ask. It does not run a whole process by itself.',
    example: 'Use an assistant to summarise a meeting note or rewrite a client message.',
    watchOut: 'Assistants still need clear prompts and human review.',
    relatedTerms: ['Prompt', 'AI Agent', 'Context'],
  },
  'AI Audit Trail': {
    plainEnglish: 'A record of what AI did and who checked it.',
    example: 'A file note records the prompt, output, reviewer, and final decision.',
    watchOut: 'Without a trail, it is harder to evidence judgement or responsibility.',
    relatedTerms: ['Human-in-the-loop', 'AI Policy', 'Data Minimisation'],
  },
  'AI Dividend': {
    plainEnglish: 'The benefit you get back when AI reduces effort.',
    example: 'A task that took two hours now takes 30 minutes, creating capacity for higher-value work.',
    watchOut: 'Saved time only creates value if the firm decides how to use it.',
    relatedTerms: ['Workflow', 'Automation', 'AI Agent'],
  },
  'AI Policy': {
    plainEnglish: 'Your firm’s rules for safe and approved AI use.',
    example: 'A policy might say client confidential data can only go into approved secure systems.',
    watchOut: 'Rules that are too vague will not guide real day-to-day behaviour.',
    relatedTerms: ['Data Minimisation', 'AI Audit Trail', 'Human-in-the-loop'],
  },
  'Automation': {
    plainEnglish: 'Automation follows rules. AI can generate or interpret.',
    example: 'Bank feeds and recurring journals follow defined rules without new reasoning.',
    watchOut: 'Automation is not the same as generative AI.',
    relatedTerms: ['Workflow', 'AI Agent', 'Generative AI'],
  },
  'Bias (in AI)': {
    plainEnglish: 'AI can reflect problems in the data or assumptions behind it.',
    example: 'A model gives weaker suggestions because the source data is incomplete or skewed.',
    watchOut: 'Bias can be hidden inside outputs that look polished or confident.',
    relatedTerms: ['Training Data', 'Human-in-the-loop', 'Hallucination (AI)'],
  },
  'Context': {
    plainEnglish: 'Context is the useful background you give the AI.',
    example: 'Tell the AI the client type, audience, goal, tone, and constraints.',
    watchOut: 'Weak context often creates generic or less relevant answers.',
    relatedTerms: ['Prompt', 'Prompt Engineering', 'Context Window'],
  },
  'Context Window': {
    plainEnglish: 'The amount of information the AI can hold in mind at once.',
    example: 'A larger context window can work with longer reports or multiple documents together.',
    watchOut: 'More context does not automatically mean better context.',
    relatedTerms: ['Context', 'Prompt', 'LLM (Large Language Model)'],
  },
  'Data Minimisation': {
    plainEnglish: 'Only give the AI what it actually needs.',
    example: 'Remove unnecessary personal data before asking an AI tool to summarise a document.',
    watchOut: 'Sharing more data than needed creates avoidable confidentiality risk.',
    relatedTerms: ['AI Policy', 'AI Audit Trail', 'Human-in-the-loop'],
  },
  'Fine-Tuning': {
    plainEnglish: 'Customising a model with additional training for a specific use case.',
    example: 'A model is further trained on industry material to improve performance on specialist tasks.',
    watchOut: 'Fine-tuning does not remove the need for review, testing, or governance.',
    relatedTerms: ['Model', 'Training Data', 'Machine Learning (ML)'],
  },
  'Generative AI': {
    plainEnglish: 'AI that creates something new from your instructions.',
    example: 'A tool drafts a client email or summarises a meeting from rough notes.',
    watchOut: 'Generated content still needs checking before you rely on it.',
    relatedTerms: ['AI Assistant', 'LLM (Large Language Model)', 'Prompt'],
  },
  'Hallucination (AI)': {
    plainEnglish: 'The AI can make things up.',
    example: 'The AI invents a rule, figure, or source that does not actually exist.',
    watchOut: 'Confident wording can make errors harder to spot.',
    relatedTerms: ['Human-in-the-loop', 'AI Audit Trail', 'Prompt'],
  },
  'Human-in-the-loop': {
    plainEnglish: 'A human stays in control of important moments.',
    example: 'AI drafts a client message, but a qualified person approves it before sending.',
    watchOut: 'The review step must be clear, owned, and documented.',
    relatedTerms: ['AI Audit Trail', 'AI Policy', 'AI Agent'],
  },
  'LLM (Large Language Model)': {
    plainEnglish: 'The engine behind many AI chat tools.',
    example: 'Modern AI assistants often rely on large language models to understand and generate text.',
    watchOut: 'An LLM predicts language, so outputs still need judgement and review.',
    relatedTerms: ['Model', 'Generative AI', 'Prompt'],
  },
  'Machine Learning (ML)': {
    plainEnglish: 'Systems learn patterns from data instead of being told every rule directly.',
    example: 'ML helps with fraud detection, categorisation, and forecasting.',
    watchOut: 'The results depend heavily on the quality of the data and setup.',
    relatedTerms: ['AI (Artificial Intelligence)', 'Model', 'Training Data'],
  },
  'Model': {
    plainEnglish: 'The trained AI system that does the work.',
    example: 'A model can classify information, generate text, or predict outcomes.',
    watchOut: 'Different models have different strengths, weaknesses, and limits.',
    relatedTerms: ['LLM (Large Language Model)', 'Machine Learning (ML)', 'Training Data'],
  },
  'Natural Language Processing (NLP)': {
    plainEnglish: 'Technology that helps computers work with human language.',
    example: 'NLP helps tools read emails, interpret text, and answer questions.',
    watchOut: 'Useful language handling still does not guarantee correct meaning or judgement.',
    relatedTerms: ['LLM (Large Language Model)', 'Prompt', 'Context'],
  },
  'Prompt': {
    plainEnglish: 'The instruction you give the AI.',
    example: 'A prompt can ask the AI to explain, summarise, draft, check, or rewrite something.',
    watchOut: 'Vague prompts usually produce weaker results.',
    relatedTerms: ['Prompt Engineering', 'Context', 'AI Assistant'],
  },
  'Prompt Engineering': {
    plainEnglish: 'Writing clearer, more structured instructions to get better AI outputs.',
    example: 'Set the role, define the task, add context, and state constraints.',
    watchOut: 'A good prompt helps, but it does not replace review or good source data.',
    relatedTerms: ['Prompt', 'Context', 'Structured Data'],
  },
  'Structured Data': {
    plainEnglish: 'Information arranged consistently so systems can process it reliably.',
    example: 'Clean ledgers, standard fields, and consistent formats are all structured data.',
    watchOut: 'Messy or inconsistent data weakens AI performance.',
    relatedTerms: ['Workflow', 'Automation', 'Context'],
  },
  'Training Data': {
    plainEnglish: 'The information used to teach a model how to perform.',
    example: 'Training data shapes what patterns the model learns and what outputs it can produce.',
    watchOut: 'Poor or biased training data leads to poorer or biased results.',
    relatedTerms: ['Machine Learning (ML)', 'Model', 'Bias (in AI)'],
  },
  'Workflow': {
    plainEnglish: 'The step-by-step way work gets done.',
    example: 'Collect documents, review them, prepare a draft, approve, then send to the client.',
    watchOut: 'AI works best when the workflow is clear and repeatable.',
    relatedTerms: ['Automation', 'AI Agent', 'AI Audit Trail'],
  },
};

const WORKFLOW_QUADRANTS = {
  strongAgentCandidate: {
    label: 'Strong agent candidate',
    guidance: 'Automate first',
    colorClass: 'text-[#00DC51]',
    borderClass: 'border-[#00DC51]/35',
    bgClass: 'bg-[#00DC51]/10',
  },
  humanLedWithAssistant: {
    label: 'Human-led with assistant support',
    guidance: 'AI supports your judgement',
    colorClass: 'text-[#FFD84D]',
    borderClass: 'border-[#FFD84D]/30',
    bgClass: 'bg-[#FFD84D]/10',
  },
  assistantTask: {
    label: 'Assistant task',
    guidance: 'Delegate to AI tools',
    colorClass: 'text-[#7AB8FF]',
    borderClass: 'border-[#7AB8FF]/30',
    bgClass: 'bg-[#7AB8FF]/10',
  },
  fullyHumanLed: {
    label: 'Fully human-led',
    guidance: 'Keep human for now',
    colorClass: 'text-[#FF8B8B]',
    borderClass: 'border-[#FF8B8B]/30',
    bgClass: 'bg-[#FF8B8B]/10',
  },
} as const;

function clampScore(value: unknown) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 3;
  }

  return Math.min(5, Math.max(1, Math.round(value)));
}

function getWorkflowQuadrant(repeatability: number, judgement: number) {
  if (repeatability >= 4 && judgement <= 2) {
    return 'strongAgentCandidate' as const;
  }
  if (repeatability >= 3 && judgement >= 3) {
    return 'humanLedWithAssistant' as const;
  }
  if (repeatability <= 3 && judgement <= 3) {
    return 'assistantTask' as const;
  }
  return 'fullyHumanLed' as const;
}

const WORKFLOW_MAP_POINT_INSET_PERCENT = 12;

function clampPercentage(value: number, min = 0, max = 100) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

function getWorkflowPlotPosition(workflow: WorkflowMapEntry) {
  const left = ((clampScore(workflow.repeatability) - 1) / 4) * 100;
  const top = (1 - ((clampScore(workflow.judgement) - 1) / 4)) * 100;

  return {
    left: clampPercentage(left, WORKFLOW_MAP_POINT_INSET_PERCENT, 100 - WORKFLOW_MAP_POINT_INSET_PERCENT),
    top: clampPercentage(top, WORKFLOW_MAP_POINT_INSET_PERCENT, 100 - WORKFLOW_MAP_POINT_INSET_PERCENT),
  };
}

function updateSelectedWorkflowIds(selectedWorkflowIds: string[], workflowId: string, nextSelected?: boolean) {
  const isSelected = selectedWorkflowIds.includes(workflowId);
  const shouldSelect = nextSelected ?? !isSelected;

  if (!shouldSelect) {
    return selectedWorkflowIds.filter((id) => id !== workflowId);
  }

  if (isSelected || selectedWorkflowIds.length >= 2) {
    return selectedWorkflowIds;
  }

  return [...selectedWorkflowIds, workflowId];
}

function formatWorkflowNameList(names: string[]) {
  if (names.length === 0) {
    return '';
  }

  if (names.length === 1) {
    return names[0];
  }

  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }

  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

function sanitiseWorkflowEntries(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<WorkflowMapEntry[]>((acc, entry, index) => {
    if (!entry || typeof entry !== 'object') {
      return acc;
    }

    const name = typeof (entry as Record<string, unknown>).name === 'string'
      ? (entry as Record<string, unknown>).name.trim()
      : '';

    if (!name) {
      return acc;
    }

    const id = typeof (entry as Record<string, unknown>).id === 'string' && (entry as Record<string, unknown>).id
      ? String((entry as Record<string, unknown>).id)
      : `workflow-${index + 1}`;

    acc.push({
      id,
      name,
      repeatability: clampScore((entry as Record<string, unknown>).repeatability),
      judgement: clampScore((entry as Record<string, unknown>).judgement),
    });

    return acc;
  }, []);
}

function buildWorkflowMapSummary(state: WorkflowMapPageState) {
  const selectedWorkflows = state.workflows.filter((workflow) => state.selectedWorkflowIds.includes(workflow.id));

  const question0 = state.workflows.map((workflow) => workflow.name).join('\n');
  const question1 = state.workflows
    .map((workflow) => {
      const quadrant = WORKFLOW_QUADRANTS[getWorkflowQuadrant(workflow.repeatability, workflow.judgement)];
      return `${workflow.name} - Repeatability ${workflow.repeatability}/5, Judgement ${workflow.judgement}/5 (${quadrant.label})`;
    })
    .join('\n');
  const question2 = selectedWorkflows.map((workflow) => workflow.name).join('\n');

  const copyText = [
    'Workflow map summary',
    '',
    'Mapped workflows',
    ...(state.workflows.length > 0
      ? state.workflows.map((workflow) => {
          const quadrant = WORKFLOW_QUADRANTS[getWorkflowQuadrant(workflow.repeatability, workflow.judgement)];
          return `- ${workflow.name}: Repeatability ${workflow.repeatability}/5, Judgement ${workflow.judgement}/5, ${quadrant.label}`;
        })
      : ['- No workflows added yet']),
    '',
    'Priority workflows',
    ...(selectedWorkflows.length > 0
      ? selectedWorkflows.map((workflow) => `- ${workflow.name}`)
      : ['- No priority workflows selected yet']),
  ].join('\n');

  return { question0, question1, question2, copyText };
}

function parseWorkflowMapState(userInput: string) {
  if (!userInput || userInput === '') {
    return DEFAULT_WORKFLOW_MAP_STATE;
  }

  try {
    const parsed = JSON.parse(userInput) as Record<string, unknown>;
    const workflows = sanitiseWorkflowEntries(parsed.workflows);
    const selectedWorkflowIds = Array.isArray(parsed.selectedWorkflowIds)
      ? parsed.selectedWorkflowIds.filter((value): value is string => typeof value === 'string')
      : [];

    return {
      workflows,
      draftName: typeof parsed.draftName === 'string' ? parsed.draftName : '',
      scoringIndex: typeof parsed.scoringIndex === 'number' && Number.isFinite(parsed.scoringIndex)
        ? Math.min(Math.max(Math.round(parsed.scoringIndex), 0), Math.max(workflows.length - 1, 0))
        : 0,
      selectedWorkflowIds,
      currentStep: typeof parsed.currentStep === 'number' && Number.isFinite(parsed.currentStep)
        ? Math.min(Math.max(Math.round(parsed.currentStep), 0), 3)
        : 0,
    };
  } catch {
    return DEFAULT_WORKFLOW_MAP_STATE;
  }
}

function parseSpecFormFields(userInput: string, fieldCount: number) {
  try {
    const parsed = userInput && userInput !== '' ? JSON.parse(userInput) as Record<string, unknown> : {};
    return Array.from({ length: fieldCount }).reduce<Record<string, string>>((acc, _, index) => {
      const key = `field-${index}`;
      acc[key] = typeof parsed[key] === 'string' ? parsed[key] as string : '';
      return acc;
    }, {});
  } catch {
    return Array.from({ length: fieldCount }).reduce<Record<string, string>>((acc, _, index) => {
      acc[`field-${index}`] = '';
      return acc;
    }, {});
  }
}

function parseToolMatrixRows(content: PlaybookPage['content']) {
  const matrixBlock = content.find((block) => block.type === 'numbered-list');
  if (!matrixBlock?.items) {
    return [];
  }

  return matrixBlock.items.reduce<ToolMatrixRow[]>((acc, item, index) => {
    if (!item?.title || !item?.desc) {
      return acc;
    }

    const lines = item.desc.split('\n').map((line) => line.trim()).filter(Boolean);
    const readLine = (prefix: string) => {
      const match = lines.find((line) => line.startsWith(prefix));
      return match ? match.slice(prefix.length).trim() : '';
    };

    acc.push({
      id: `matrix-row-${index}`,
      toolName: item.title,
      allowedTasks: readLine('Allowed tasks:'),
      dataBoundaries: readLine('Data allowed:'),
      reviewRequired: readLine('Review required:'),
    });

    return acc;
  }, []);
}

function sanitiseToolMatrixRows(value: unknown, fallbackRows: ToolMatrixRow[]) {
  if (!Array.isArray(value)) {
    return fallbackRows;
  }

  const rows = value.reduce<ToolMatrixRow[]>((acc, row, index) => {
    if (!row || typeof row !== 'object') {
      return acc;
    }

    const rowRecord = row as Record<string, unknown>;
    const fallback = fallbackRows[index];

    acc.push({
      id: typeof rowRecord.id === 'string' && rowRecord.id ? String(rowRecord.id) : fallback?.id || `matrix-row-${index}`,
      toolName: typeof rowRecord.toolName === 'string' && rowRecord.toolName.trim()
        ? rowRecord.toolName
        : fallback?.toolName || '',
      allowedTasks: typeof rowRecord.allowedTasks === 'string'
        ? rowRecord.allowedTasks
        : fallback?.allowedTasks || '',
      dataBoundaries: typeof rowRecord.dataBoundaries === 'string'
        ? rowRecord.dataBoundaries
        : fallback?.dataBoundaries || '',
      reviewRequired: typeof rowRecord.reviewRequired === 'string'
        ? rowRecord.reviewRequired
        : fallback?.reviewRequired || '',
    });

    return acc;
  }, []);

  return rows.length > 0 ? rows : fallbackRows;
}

function parseToolMatrixState(userInput: string, fallbackRows: ToolMatrixRow[]) {
  if (!userInput || userInput === '') {
    return {
      rows: fallbackRows,
      activeRowId: fallbackRows[0]?.id || '',
    };
  }

  try {
    const parsed = JSON.parse(userInput) as Record<string, unknown>;
    const rows = sanitiseToolMatrixRows(parsed.rows, fallbackRows);
    return {
      rows,
      activeRowId: typeof parsed.activeRowId === 'string' && parsed.activeRowId
        ? parsed.activeRowId
        : rows[0]?.id || '',
    };
  } catch {
    return {
      rows: fallbackRows,
      activeRowId: fallbackRows[0]?.id || '',
    };
  }
}

function buildToolMatrixSummary(rows: ToolMatrixRow[]) {
  const question0 = rows.map((row) => row.toolName).join('\n');
  const question1 = rows.map((row) => `${row.toolName}: ${row.allowedTasks || '(not defined)'}`).join('\n');
  const question2 = rows.map((row) => `${row.toolName}: ${row.dataBoundaries || '(not defined)'}`).join('\n');

  const copyText = [
    'AI tool usage matrix',
    '',
    ...rows.map((row) => [
      row.toolName,
      `Allowed tasks: ${row.allowedTasks || '(not defined)'}`,
      `Data boundaries: ${row.dataBoundaries || '(not defined)'}`,
      `Review required: ${row.reviewRequired || '(not defined)'}`,
      '',
    ].join('\n')),
  ].join('\n');

  return { question0, question1, question2, copyText };
}

function buildAgentSpecCopyText(
  specFields: { label: string; placeholder: string; helper?: string }[],
  fieldValues: Record<string, string>,
) {
  return [
    'Agent specification',
    '',
    ...specFields.map((field, index) => `${field.label}:\n${fieldValues[`field-${index}`]?.trim() || '(not completed)'}`),
  ].join('\n\n');
}

function extractPromptVariables(text: string) {
  return [...text.matchAll(/\[([^\]]+)\]/g)].map((match, index) => {
    const label = match[1];
    return {
      id: `var-${index}`,
      key: label.split(' - ')[0].trim(),
      label,
      token: match[0],
    };
  });
}

function stripWrappingQuotes(text: string) {
  return text.replace(/^"+|"+$/g, '');
}

function buildPromptTemplates(content: PlaybookPage['content']): PromptTemplate[] {
  return content
    .filter((block) => block.type === 'box' && block.style === 'dark' && typeof block.title === 'string' && /^\d+\./.test(block.title))
    .map((block, index) => {
      const text = stripWrappingQuotes(block.text || '');
      return {
        id: `prompt-${index}`,
        title: block.title || '',
        text,
        variables: extractPromptVariables(text),
      };
    });
}

function parsePromptLibraryState(userInput: string) {
  if (!userInput || userInput === '') {
    return DEFAULT_PROMPT_LIBRARY_STATE;
  }

  try {
    const parsed = JSON.parse(userInput) as Record<string, unknown>;
    const hasPromptLibraryShape =
      typeof parsed.searchQuery === 'string' ||
      Array.isArray(parsed.expandedPromptIds) ||
      (parsed.promptValues && typeof parsed.promptValues === 'object') ||
      (parsed.activityAnswers && typeof parsed.activityAnswers === 'object') ||
      Array.isArray(parsed.activityCompleted);

    if (!hasPromptLibraryShape) {
      const legacyActivityAnswers = Object.entries(parsed).reduce<Record<string, string>>((acc, [key, value]) => {
        if (key.startsWith('question-') && typeof value === 'string') {
          acc[key] = value;
        }
        return acc;
      }, {});

      return {
        ...DEFAULT_PROMPT_LIBRARY_STATE,
        activityAnswers: legacyActivityAnswers,
      };
    }

    const promptValues = parsed.promptValues && typeof parsed.promptValues === 'object' && !Array.isArray(parsed.promptValues)
      ? Object.entries(parsed.promptValues as Record<string, unknown>).reduce<Record<string, Record<string, string>>>((acc, [promptId, values]) => {
          if (values && typeof values === 'object' && !Array.isArray(values)) {
            acc[promptId] = Object.entries(values as Record<string, unknown>).reduce<Record<string, string>>((valueAcc, [variableId, variableValue]) => {
              if (typeof variableValue === 'string') {
                valueAcc[variableId] = variableValue;
              }
              return valueAcc;
            }, {});
          }
          return acc;
        }, {})
      : {};

    const activityAnswers = parsed.activityAnswers && typeof parsed.activityAnswers === 'object' && !Array.isArray(parsed.activityAnswers)
      ? Object.entries(parsed.activityAnswers as Record<string, unknown>).reduce<Record<string, string>>((acc, [key, value]) => {
          if (typeof value === 'string') {
            acc[key] = value;
          }
          return acc;
        }, {})
      : {};

    return {
      searchQuery: typeof parsed.searchQuery === 'string' ? parsed.searchQuery : '',
      expandedPromptIds: Array.isArray(parsed.expandedPromptIds)
        ? parsed.expandedPromptIds.filter((value): value is string => typeof value === 'string')
        : [],
      promptValues,
      activityAnswers,
      activityCompleted: Array.isArray(parsed.activityCompleted)
        ? parsed.activityCompleted.filter((value): value is string => typeof value === 'string')
        : [],
    };
  } catch {
    return DEFAULT_PROMPT_LIBRARY_STATE;
  }
}

function renderPromptText(
  text: string,
  variables: PromptVariable[],
  values: Record<string, string> = {},
) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  variables.forEach((variable) => {
    const startIndex = text.indexOf(variable.token, cursor);
    if (startIndex < 0) {
      return;
    }

    if (startIndex > cursor) {
      nodes.push(text.slice(cursor, startIndex));
    }

    const replacement = values[variable.id]?.trim() ? values[variable.id].trim() : variable.token;
    nodes.push(
      <span key={`${variable.id}-${startIndex}`} className="font-black text-[#00DC51]">
        {replacement}
      </span>
    );

    cursor = startIndex + variable.token.length;
  });

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function buildPersonalisedPrompt(
  text: string,
  variables: PromptVariable[],
  values: Record<string, string> = {},
) {
  let output = text;

  variables.forEach((variable) => {
    const replacement = values[variable.id]?.trim() ? values[variable.id].trim() : variable.token;
    output = output.split(variable.token).join(replacement);
  });

  return output;
}

function parseNumberedSteps(text: string) {
  return text
    .split('\n')
    .map((step) => step.trim())
    .filter(Boolean)
    .map((step) => step.replace(/^\d+\.\s*/, ''));
}

function parseStructuredInputs(userInput: string) {
  try {
    return userInput && userInput !== '' ? JSON.parse(userInput) : {};
  } catch {
    return {};
  }
}

function buildGlossaryTerms(content: PlaybookPage['content']): GlossaryTerm[] {
  const glossaryBlock = content.find((block) => block.type === 'numbered-list');
  if (!glossaryBlock?.items) {
    return [];
  }

  return glossaryBlock.items
    .filter((item): item is { title: string; desc: string } => typeof item?.title === 'string' && typeof item?.desc === 'string')
    .map((item, index) => ({
      id: `glossary-${index}`,
      term: item.title,
      definition: item.desc,
    }))
    .sort((a, b) => a.term.localeCompare(b.term));
}

function parseGlossaryPageState(userInput: string) {
  if (!userInput || userInput === '') {
    return DEFAULT_GLOSSARY_STATE;
  }

  try {
    const parsed = JSON.parse(userInput) as Record<string, unknown>;
    const hasGlossaryShape =
      parsed.mode === 'lab' ||
      parsed.mode === 'flashcards' ||
      typeof parsed.searchQuery === 'string' ||
      typeof parsed.selectedTerm === 'string' ||
      typeof parsed.currentFlashcardIndex === 'number' ||
      Array.isArray(parsed.learnedTerms) ||
      Array.isArray(parsed.flippedTerms);

    if (!hasGlossaryShape) {
      return DEFAULT_GLOSSARY_STATE;
    }

    return {
      mode: parsed.mode === 'flashcards' ? 'flashcards' : 'lab',
      searchQuery: typeof parsed.searchQuery === 'string' ? parsed.searchQuery : '',
      selectedTerm: typeof parsed.selectedTerm === 'string' ? parsed.selectedTerm : '',
      currentFlashcardIndex: typeof parsed.currentFlashcardIndex === 'number' && Number.isFinite(parsed.currentFlashcardIndex)
        ? parsed.currentFlashcardIndex
        : 0,
      learnedTerms: Array.isArray(parsed.learnedTerms)
        ? parsed.learnedTerms.filter((value): value is string => typeof value === 'string')
        : [],
      flippedTerms: Array.isArray(parsed.flippedTerms)
        ? parsed.flippedTerms.filter((value): value is string => typeof value === 'string')
        : [],
    };
  } catch {
    return DEFAULT_GLOSSARY_STATE;
  }
}

function escapeForXml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeForHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function wrapText(text: string, maxCharacters: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length <= maxCharacters) {
      currentLine = nextLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function createTspans(lines: string[], x: number, firstY: number, lineHeight: number) {
  return lines
    .map((line, index) => {
      const y = firstY + (index * lineHeight);
      return `<tspan x="${x}" y="${y}">${escapeForXml(line)}</tspan>`;
    })
    .join('');
}

function buildCertificatePrintMarkup({
  title,
  subtitle,
  displayName,
  statement,
  poweredByTitle,
  poweredByText,
  completionDate,
}: {
  title: string;
  subtitle: string;
  displayName: string;
  statement: string;
  poweredByTitle: string;
  poweredByText: string;
  completionDate: string;
}) {
  const nameLines = wrapText(displayName, 28).slice(0, 2);
  const statementLines = wrapText(statement, 74).slice(0, 3);
  const poweredLines = wrapText(poweredByText, 60).slice(0, 3);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1123 794" role="img" aria-label="${escapeForXml(subtitle)}">
      <defs>
        <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00DC51" stop-opacity="1"/>
          <stop offset="100%" stop-color="#6BFF9D" stop-opacity="0.9"/>
        </linearGradient>
        <radialGradient id="heroGlow" cx="50%" cy="0%" r="95%">
          <stop offset="0%" stop-color="#0E5F2E" stop-opacity="0.55"/>
          <stop offset="55%" stop-color="#050505" stop-opacity="1"/>
          <stop offset="100%" stop-color="#020202" stop-opacity="1"/>
        </radialGradient>
      </defs>

      <rect width="1123" height="794" fill="#050505"/>
      <rect x="22" y="22" width="1079" height="750" rx="28" fill="url(#heroGlow)" stroke="url(#borderGlow)" stroke-width="4"/>
      <rect x="42" y="42" width="1039" height="710" rx="22" fill="none" stroke="#00DC51" stroke-opacity="0.22" stroke-width="1.5"/>

      <line x1="110" y1="118" x2="1013" y2="118" stroke="#00DC51" stroke-opacity="0.58" stroke-width="1.2"/>
      <line x1="110" y1="676" x2="1013" y2="676" stroke="#00DC51" stroke-opacity="0.44" stroke-width="1.2"/>

      <text x="561.5" y="105" text-anchor="middle" fill="#8DFFB3" font-size="15" font-weight="700" letter-spacing="5.4" font-family="Georgia, 'Times New Roman', serif">
        ${escapeForXml(title.toUpperCase())}
      </text>

      <text x="561.5" y="182" text-anchor="middle" fill="#FFFFFF" font-size="40" font-weight="700" font-family="Georgia, 'Times New Roman', serif">
        ${escapeForXml(subtitle)}
      </text>

      <text x="561.5" y="238" text-anchor="middle" fill="#A7B1AB" font-size="13" font-weight="700" letter-spacing="4" font-family="Arial, Helvetica, sans-serif">
        PRESENTED TO
      </text>

      <text x="561.5" y="302" text-anchor="middle" fill="#FFFFFF" font-size="${nameLines.length > 1 ? 34 : 40}" font-weight="700" font-family="Georgia, 'Times New Roman', serif">
        ${createTspans(nameLines, 561.5, 302, 42)}
      </text>

      <line x1="230" y1="350" x2="893" y2="350" stroke="#00DC51" stroke-opacity="0.72" stroke-width="2"/>

      <text x="561.5" y="404" text-anchor="middle" fill="#F5F7F6" font-size="18" font-weight="500" font-family="Arial, Helvetica, sans-serif">
        ${createTspans(statementLines, 561.5, 404, 24)}
      </text>

      <rect x="212" y="500" width="699" height="104" rx="18" fill="#0E1210" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1.5"/>
      <text x="561.5" y="534" text-anchor="middle" fill="#00DC51" font-size="18" font-weight="700" letter-spacing="3.2" font-family="Arial, Helvetica, sans-serif">
        ${escapeForXml(poweredByTitle.toUpperCase())}
      </text>
      <text x="561.5" y="564" text-anchor="middle" fill="#EAF3EE" font-size="13.5" font-weight="500" font-family="Arial, Helvetica, sans-serif">
        ${createTspans(poweredLines, 561.5, 564, 18)}
      </text>

      <text x="330" y="648" text-anchor="middle" fill="#9AA39E" font-size="12" font-weight="700" letter-spacing="2.4" font-family="Arial, Helvetica, sans-serif">
        COMPLETION DATE
      </text>
      <text x="330" y="671" text-anchor="middle" fill="#FFFFFF" font-size="17" font-weight="600" font-family="Arial, Helvetica, sans-serif">
        ${escapeForXml(completionDate)}
      </text>

      <text x="792" y="648" text-anchor="middle" fill="#9AA39E" font-size="12" font-weight="700" letter-spacing="2.4" font-family="Arial, Helvetica, sans-serif">
        POWERED BY
      </text>
      <text x="792" y="671" text-anchor="middle" fill="#00DC51" font-size="20" font-weight="700" font-family="Arial, Helvetica, sans-serif">
        Sage
      </text>
    </svg>
  `;

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${escapeForHtml(subtitle)}</title>
      <style>
        @page { size: A4 landscape; margin: 10mm; }
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          background: #050505;
          color: #ffffff;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
          font-family: Arial, Helvetica, sans-serif;
        }
        body {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .certificate-sheet {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .certificate-sheet svg {
          display: block;
          width: 100%;
          max-width: 277mm;
          height: auto;
          max-height: 185mm;
          page-break-inside: avoid;
          break-inside: avoid;
        }
      </style>
    </head>
    <body>
      <div class="certificate-sheet">${svg}</div>
      <script>
        window.addEventListener('load', () => {
          window.setTimeout(() => {
            window.focus();
            window.print();
          }, 150);
        });
        window.addEventListener('afterprint', () => {
          window.close();
        });
      </script>
    </body>
  </html>`;
}

export function PageContent({ page, userInput, onInputChange, goToPage, pageInputs, onUpdatePageInput }: PageContentProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [workflowMapExplainerStep, setWorkflowMapExplainerStep] = useState(0);
  const [toolMatrixGuideIndex, setToolMatrixGuideIndex] = useState(0);
  const sectionImageSrc = SECTION_IMAGE_BY_PAGE_ID[page.id];
  const usesSectionImageTreatment = Boolean(sectionImageSrc);
  const isCertificatePage = page.id === 'certificate';
  let parsedCertificateInputs: Record<string, string> = {};
  if (isCertificatePage) {
    try {
      parsedCertificateInputs = userInput && userInput !== '' ? JSON.parse(userInput) : {};
    } catch {
      parsedCertificateInputs = {};
    }
  }
  const certificateName = isCertificatePage ? (parsedCertificateInputs['question-0'] || '').trim() : '';
  const certificateDisplayName = certificateName || CERTIFICATE_NAME_PLACEHOLDER;
  const certificateTitleBlock = isCertificatePage ? page.content.find(block => block.type === 'box') : undefined;
  const certificateStatement = isCertificatePage ? page.content.find(block => block.type === 'highlight')?.text || '' : '';
  const poweredBySageBlock = isCertificatePage
    ? page.content.find(block => block.type === 'box' && block.title === 'Powered by Sage')
    : undefined;
  const certificateCompletionDate = isCertificatePage
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
    : '';
  const isPromptLibraryPage = page.id === 's4-library';
  const isGlossaryPage = page.id === 's7-glossary';
  const isWorkflowMapPage = page.id === 's3-workflow-map';
  const isAgentSpecWizardPage = page.id === 's7-agent-spec';
  const isToolMatrixPage = page.id === 's7-tool-matrix';
  const isFinishPage = page.id === 's7-finish';
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const promptLibraryState = isPromptLibraryPage
    ? parsePromptLibraryState(userInput)
    : DEFAULT_PROMPT_LIBRARY_STATE;
  const promptTemplates = isPromptLibraryPage ? buildPromptTemplates(page.content) : [];
  const promptSearchQuery = promptLibraryState.searchQuery.trim().toLowerCase();
  const filteredPromptTemplates = promptTemplates.filter((template) =>
    !promptSearchQuery ||
    template.title.toLowerCase().includes(promptSearchQuery) ||
    template.text.toLowerCase().includes(promptSearchQuery)
  );
  const promptIntroText = isPromptLibraryPage
    ? page.content.find((block) => block.type === 'text')?.text || ''
    : '';
  const promptNoteText = isPromptLibraryPage
    ? page.content.find((block) => block.type === 'highlight')?.text || ''
    : '';
  const promptPracticeText = isPromptLibraryPage
    ? page.content.filter((block) => block.type === 'text')[1]?.text || ''
    : '';
  const promptHowToBlock = isPromptLibraryPage
    ? page.content.find((block) => block.type === 'box' && block.style === 'green')
    : undefined;
  const promptHowToSteps = promptHowToBlock?.text ? parseNumberedSteps(promptHowToBlock.text) : [];
  const promptActivityQuestions = isPromptLibraryPage ? page.activity?.questions || [] : [];
  const completedPromptActivityCount = promptActivityQuestions.filter((_, index) =>
    promptLibraryState.activityCompleted.includes(`question-${index}`)
  ).length;
  const promptActivityProgress = promptActivityQuestions.length > 0
    ? (completedPromptActivityCount / promptActivityQuestions.length) * 100
    : 0;

  const updatePromptLibraryState = (updater: (current: PromptLibraryState) => PromptLibraryState) => {
    if (!isPromptLibraryPage) {
      return;
    }

    const nextState = updater(promptLibraryState);
    onInputChange(JSON.stringify(nextState));
  };
  const glossaryTerms = isGlossaryPage ? buildGlossaryTerms(page.content) : [];
  const glossaryState = isGlossaryPage ? parseGlossaryPageState(userInput) : DEFAULT_GLOSSARY_STATE;
  const filteredGlossaryTerms = glossaryTerms.filter((term) => {
    const query = glossaryState.searchQuery.trim().toLowerCase();
    return !query || term.term.toLowerCase().includes(query) || term.definition.toLowerCase().includes(query);
  });
  const selectedGlossaryTerm = isGlossaryPage
    ? filteredGlossaryTerms.find((term) => term.term === glossaryState.selectedTerm)
      || glossaryTerms.find((term) => term.term === glossaryState.selectedTerm)
      || filteredGlossaryTerms[0]
      || glossaryTerms[0]
    : undefined;
  const glossaryFlashcardIndex = isGlossaryPage && glossaryTerms.length > 0
    ? Math.min(Math.max(glossaryState.currentFlashcardIndex, 0), glossaryTerms.length - 1)
    : 0;
  const activeFlashcard = isGlossaryPage ? glossaryTerms[glossaryFlashcardIndex] : undefined;
  const activeFlashcardIsFlipped = activeFlashcard ? glossaryState.flippedTerms.includes(activeFlashcard.term) : false;
  const glossaryLearnedTerms = isGlossaryPage
    ? glossaryTerms.filter((term) => glossaryState.learnedTerms.includes(term.term))
    : [];
  const glossaryProgress = glossaryTerms.length > 0
    ? (glossaryLearnedTerms.length / glossaryTerms.length) * 100
    : 0;
  const structuredInputs = parseStructuredInputs(userInput) as Record<string, any>;
  const workflowMapState = isWorkflowMapPage
    ? parseWorkflowMapState(userInput)
    : DEFAULT_WORKFLOW_MAP_STATE;
  const workflowMapSummary = isWorkflowMapPage
    ? buildWorkflowMapSummary(workflowMapState)
    : { question0: '', question1: '', question2: '', copyText: '' };
  const workflowCandidates = workflowMapState.workflows.filter((workflow) => (
    getWorkflowQuadrant(workflow.repeatability, workflow.judgement) === 'strongAgentCandidate'
  ));
  const selectedPriorityWorkflows = workflowMapState.workflows.filter((workflow) => (
    workflowMapState.selectedWorkflowIds.includes(workflow.id)
  ));
  const workflowWizardStep = isWorkflowMapPage
    ? Math.min(Math.max(workflowMapState.currentStep, 0), 3)
    : 0;
  const workflowScoringIndex = isWorkflowMapPage && workflowMapState.workflows.length > 0
    ? Math.min(Math.max(workflowMapState.scoringIndex, 0), workflowMapState.workflows.length - 1)
    : 0;
  const activeWorkflowForScoring = isWorkflowMapPage ? workflowMapState.workflows[workflowScoringIndex] : undefined;
  const isLastWorkflowScoringStep = workflowMapState.workflows.length > 0 && workflowScoringIndex >= workflowMapState.workflows.length - 1;
  const workflowWizardSteps = ['List workflows', 'Score each', 'See results', 'Prioritise'];
  const scoredWorkflowCount = workflowMapState.workflows.filter((workflow) => (
    workflow.repeatability >= 1
    && workflow.repeatability <= 5
    && workflow.judgement >= 1
    && workflow.judgement <= 5
  )).length;
  const canAdvanceWorkflowListStep = workflowMapState.workflows.length >= 3 && workflowMapState.workflows.length <= 15;
  const canAdvanceWorkflowPriorities = workflowMapState.selectedWorkflowIds.length > 0 && workflowMapState.selectedWorkflowIds.length <= 2;
  const hasReachedWorkflowPriorityLimit = workflowMapState.selectedWorkflowIds.length >= 2;
  const selectedPriorityWorkflowNames = formatWorkflowNameList(selectedPriorityWorkflows.map((workflow) => workflow.name));
  const agentSpecFields = isAgentSpecWizardPage ? page.activity?.specFields || [] : [];
  const agentSpecFieldValues = isAgentSpecWizardPage ? parseSpecFormFields(userInput, agentSpecFields.length) : {};
  const agentSpecMeta = structuredInputs as Record<string, unknown>;
  const agentSpecCurrentStep = isAgentSpecWizardPage && typeof agentSpecMeta.currentStep === 'number' && Number.isFinite(agentSpecMeta.currentStep)
    ? Math.min(Math.max(Math.round(agentSpecMeta.currentStep), 0), Math.max(agentSpecFields.length - 1, 0))
    : 0;
  const agentSpecReviewMode = isAgentSpecWizardPage ? agentSpecMeta.reviewMode === true : false;
  const completedAgentSpecFields = isAgentSpecWizardPage
    ? agentSpecFields.filter((_, index) => (agentSpecFieldValues[`field-${index}`] || '').trim() !== '').length
    : 0;
  const defaultToolMatrixRows = isToolMatrixPage ? parseToolMatrixRows(page.content) : [];
  const toolMatrixState = isToolMatrixPage
    ? parseToolMatrixState(userInput, defaultToolMatrixRows)
    : { rows: [], activeRowId: '' };
  const activeToolMatrixRow = isToolMatrixPage
    ? toolMatrixState.rows.find((row) => row.id === toolMatrixState.activeRowId) || toolMatrixState.rows[0]
    : undefined;
  const toolMatrixSummary = isToolMatrixPage
    ? buildToolMatrixSummary(toolMatrixState.rows)
    : { question0: '', question1: '', question2: '', copyText: '' };
  const agentSpecCopyText = isAgentSpecWizardPage
    ? buildAgentSpecCopyText(agentSpecFields, agentSpecFieldValues)
    : '';
  const hasUsefulAgentSpecContent = isAgentSpecWizardPage && completedAgentSpecFields > 0;
  const ninetyDayWorkflowAnswer = page.id === 's6-days61-90'
    ? (structuredInputs['workflow-name'] || structuredInputs['task-0']?.label || '').trim()
    : '';

  const updateGlossaryState = (updater: (current: GlossaryPageState) => GlossaryPageState) => {
    if (!isGlossaryPage) {
      return;
    }

    const nextState = updater(glossaryState);
    onInputChange(JSON.stringify(nextState));
  };

  const updateWorkflowMapState = (updater: (current: WorkflowMapPageState) => WorkflowMapPageState) => {
    if (!isWorkflowMapPage) {
      return;
    }

    const nextState = updater(workflowMapState);
    const summary = buildWorkflowMapSummary(nextState);
    onInputChange(JSON.stringify({
      ...nextState,
      'question-0': summary.question0,
      'question-1': summary.question1,
      'question-2': summary.question2,
    }));
  };

  const updateAgentSpecState = (updater: (current: Record<string, unknown>) => Record<string, unknown>) => {
    if (!isAgentSpecWizardPage) {
      return;
    }

    const nextState = updater(structuredInputs);
    onInputChange(JSON.stringify(nextState));
  };

  const clearAgentSpecAnswers = () => {
    if (!isAgentSpecWizardPage || !hasUsefulAgentSpecContent) {
      return;
    }

    if (!window.confirm('Clear all answers for this agent specification?')) {
      return;
    }

    updateAgentSpecState(() => ({
      currentStep: 0,
      reviewMode: false,
    }));
  };

  const updateToolMatrixState = (updater: (current: ToolMatrixPageState) => ToolMatrixPageState) => {
    if (!isToolMatrixPage) {
      return;
    }

    const nextState = updater(toolMatrixState);
    const summary = buildToolMatrixSummary(nextState.rows);
    onInputChange(JSON.stringify({
      ...nextState,
      'question-0': summary.question0,
      'question-1': summary.question1,
      'question-2': summary.question2,
    }));
  };

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

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      BookOpen, Shield, Bot, MessageSquare, DollarSign, Calendar, FileText,
      CheckCircle, Lightbulb, Target, Zap, X, TrendingUp, Users, Download, ClipboardList
    };
    return icons[iconName] || BookOpen;
  };

  // Helper to render title with green highlights
  const renderTitle = (title: string) => {
    return title.split('**').map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className="relative inline-block">
          <span className="relative z-10">{part}</span>
          <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#00DC51] -z-10 opacity-30" />
        </span>
      ) : part
    );
  };

  const handleCertificatePrint = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1280,height=900');
    if (!printWindow) {
      return;
    }

    const printDocument = buildCertificatePrintMarkup({
      title: certificateTitleBlock?.title || 'The AI Playbook for Accountants & Bookkeepers',
      subtitle: certificateTitleBlock?.text || 'Certificate of Completion',
      displayName: certificateDisplayName,
      statement: certificateStatement,
      poweredByTitle: poweredBySageBlock?.title || 'Powered by Sage',
      poweredByText: poweredBySageBlock?.text || '',
      completionDate: certificateCompletionDate,
    });

    printWindow.document.open();
    printWindow.document.write(printDocument);
    printWindow.document.close();
  };

  const handlePromptCopy = async (text: string, promptId: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptId(promptId);
      window.setTimeout(() => {
        setCopiedPromptId((current) => (current === promptId ? null : current));
      }, 1400);
    } catch {
      setCopiedPromptId(null);
    }
  };

  if (page.type === 'cover') {
    return (
      <div className="relative flex flex-col h-full overflow-hidden bg-black">
        {/* Background Image - Full Cover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src={coverBackground} 
            alt="" 
            className="absolute w-full h-full object-cover"
          />
        </div>

        {/* Content Container - Flexbox Layout */}
        <div className="relative z-10 flex flex-col h-full px-16 pt-24">
          {/* Title Section - Top */}
          <div className="flex-shrink-0 mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="leading-[0.9] tracking-tight"
              style={{ fontFamily: 'var(--font-family-header)', fontWeight: 900 }}
            >
              <div className="text-6xl lg:text-7xl font-black text-white mb-3">
                THE AI PLAYBOOK
              </div>
              <div className="text-6xl lg:text-7xl font-black text-[#00DC51] leading-[0.9]">
                For Accountants &<br />
                Bookkeepers
              </div>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex-shrink-0 max-w-2xl mb-12"
          >
            <p className="text-base text-white/95 leading-relaxed font-medium">
              From assistants to agents: building the AI-ready firm.<br />
              Artificial intelligence is now part of everyday accountancy.
            </p>
          </motion.div>

          {/* Spacer to push button down */}
          <div className="flex-grow" />

          {/* Start Playbook Button - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex-shrink-0 pb-24"
          >
            <button
              onClick={() => goToPage(1)}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#00DC51] text-black font-black rounded-full hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/40 hover:shadow-[#00DC51]/60 hover:scale-105 text-base"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              <span>Start Playbook</span>
              <span className="text-xl font-black group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>

        {/* Sage Logo - Bottom Right Corner */}
        <motion.img 
          src={sageLogo} 
          alt="Sage" 
          className="absolute bottom-4 right-8 h-14 w-auto z-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
      </div>
    );
  }

  if (page.type === 'contents') {
    return (
      <div className="h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>Contents</h2>
          <p className="text-lg text-white/70 font-medium mb-2">Your roadmap to AI adoption</p>
          <p className="text-sm text-white/50 font-medium max-w-2xl mx-auto">
            This playbook is designed to help firms move from experimentation to structured, confident adoption.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
          {page.sections?.map((section, index) => {
            const Icon = getIcon(section.icon);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group bg-white/[0.03] border-2 border-white/10 rounded-xl p-5 hover:bg-white/[0.06] hover:border-[#00DC51]/50 transition-all cursor-pointer"
                onClick={() => goToPage(section.startPageIndex)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00DC51]/15 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#00DC51]/30 group-hover:bg-[#00DC51]/25 group-hover:scale-110 transition-all">
                    <Icon className="text-[#00DC51]" size={22} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    {section.sectionLabel && (
                      <p className="text-[#00DC51] font-black text-xs uppercase tracking-wider mb-1">{section.sectionLabel}</p>
                    )}
                    <h3 className="font-bold text-base mb-0.5 group-hover:text-[#00DC51] transition-colors">{section.title}</h3>
                    <p className="text-xs text-white/50 font-medium">{section.pages}</p>
                  </div>
                  <div className="text-[#00DC51] font-black text-sm tabular-nums">{section.pageNumber}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  if (page.type === 'summary' && pageInputs && onUpdatePageInput) {
    return (
      <ActivitySummary 
        pageInputs={pageInputs} 
        onInputChange={onUpdatePageInput}
      />
    );
  }

  return (
    <div className={`space-y-8 ${isWorkflowMapPage ? 'mx-auto max-w-[860px] space-y-7' : ''} ${isCertificatePage ? 'certificate-page-root' : ''}`}>
      {/* Section Badge */}
      {page.section && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`inline-block ${
            isWorkflowMapPage
              ? 'rounded-md border border-[#00DC51]/35 bg-[#00DC51] px-3 py-1.5'
              : 'rounded-full border-2 border-[#00DC51]/40 bg-[#00DC51]/15 px-4 py-2 backdrop-blur-sm'
          } ${
            isCertificatePage ? 'certificate-screen-only' : ''
          }`}
        >
          <span className={`${isWorkflowMapPage ? 'text-black' : 'text-[#00DC51]'} font-bold text-xs tracking-wide uppercase`}>{page.section}</span>
        </motion.div>
      )}

      {/* Title */}
      <div className={`${isWorkflowMapPage ? 'max-w-4xl space-y-3' : ''} ${isCertificatePage ? 'certificate-screen-only' : ''}`}>
        <h2 className={`${isWorkflowMapPage ? 'mb-2 text-[2.45rem] leading-[1.08] md:text-[3.2rem]' : 'mb-4 text-3xl md:text-4xl lg:text-5xl leading-[1.05]'} font-black tracking-tight`} style={{ fontFamily: 'var(--font-family-header)' }}>
          {renderTitle(page.title)}
        </h2>

        {/* Subtitle */}
        {page.subtitle && (
          <p className={`${isWorkflowMapPage ? 'text-[1.05rem] italic text-white/58 md:text-[1.15rem]' : 'text-base md:text-lg text-white/70'} font-medium leading-relaxed`}>{page.subtitle}</p>
        )}
      </div>

      {/* Image */}
      {(page.image || sectionImageSrc) && page.id !== 's3-difference' && page.id !== 's1-stages' && (
        <div
          className={`rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 ${
            usesSectionImageTreatment ? 'mx-auto w-full max-w-3xl aspect-[3/2]' : ''
          } ${
            isCertificatePage ? 'certificate-screen-only' : ''
          }`}
        >
          <ImageWithFallback
            src={sectionImageSrc ?? page.image}
            alt={page.title}
            className={
              usesSectionImageTreatment ? 'w-full h-full object-cover object-center' :
              'w-full h-56 object-cover'
            }
            style={
              usesSectionImageTreatment 
                ? { filter: 'contrast(1.05) saturate(1.1) brightness(1.02)' } 
                : undefined
            }
          />
        </div>
      )}

      {/* Custom Graphic for New Role of the Accountant */}
      {page.id === 's1-role' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* What AI Can Do vs What Accountants Must Do */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Can Do Well */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/5 border-2 border-white/20 rounded-xl p-6 hover:border-white/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border-2 border-blue-400/50">
                  <Bot className="text-blue-400" size={24} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-lg">What AI Can Do Well</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Draft communications</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Summarise data</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Check consistency</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Spot errors</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Prepare reports</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all">
                    <CheckCircle className="text-blue-400" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Follow workflows</p>
                </li>
              </ul>
            </motion.div>

            {/* What Accountants Must Do */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#00DC51]/30 rounded-xl flex items-center justify-center border-2 border-[#00DC51]">
                  <Target className="text-[#00DC51]" size={24} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-lg text-[#00DC51]">What Accountants Must Still Do</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Apply judgement</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Make decisions</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Interpret context</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Advise clients</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Strengthen relationships</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-[#00DC51]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#00DC51] group-hover:bg-[#00DC51]/40 transition-all">
                    <AlertCircle className="text-[#00DC51]" size={14} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Take responsibility</p>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* The Shift - Enhanced Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="rounded-2xl overflow-hidden border-2 border-[#00DC51]/40 shadow-2xl shadow-[#00DC51]/20 bg-gradient-to-br from-[#00DC51]/10 to-[#00DC51]/5 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#00DC51] rounded-xl flex items-center justify-center shadow-lg shadow-[#00DC51]/40">
                <TrendingUp className="text-black" size={24} strokeWidth={2.5} />
              </div>
              <h4 className="font-black text-xl text-[#00DC51]">The Shift</h4>
            </div>
            
            <div className="flex items-center gap-3 justify-between">
              {/* Stage 1: Processor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/30 rounded-xl p-5 text-center flex-1 shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-white/40"
                >
                  <Database className="text-white" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-white">Processor</p>
                <p className="text-xs text-white/70 font-semibold mt-2">Data Handler</p>
                <p className="text-xs text-white/50 mt-3 leading-relaxed">Enters & manages data</p>
              </motion.div>

              {/* Arrow 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="flex items-center gap-1 flex-shrink-0"
              >
                <div className="h-px w-8 bg-gradient-to-r from-white/30 to-white/50"></div>
                <ArrowRight className="text-white/50" size={28} strokeWidth={3} />
                <div className="h-px w-8 bg-gradient-to-r from-white/50 to-white/30"></div>
              </motion.div>

              {/* Stage 2: Reviewer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="bg-gradient-to-br from-white/15 to-white/8 border-2 border-white/40 rounded-xl p-5 text-center flex-1 shadow-lg"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-white/25 rounded-lg flex items-center justify-center mx-auto mb-3 border border-white/50"
                >
                  <Eye className="text-white" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-white">Reviewer</p>
                <p className="text-xs text-white/80 font-semibold mt-2">Insight Provider</p>
                <p className="text-xs text-white/60 mt-3 leading-relaxed">Validates & spots patterns</p>
              </motion.div>

              {/* Arrow 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                className="flex items-center gap-1 flex-shrink-0"
              >
                <div className="h-px w-8 bg-gradient-to-r from-white/40 to-[#00DC51]/60"></div>
                <ArrowRight className="text-[#00DC51]" size={28} strokeWidth={3} />
                <div className="h-px w-8 bg-gradient-to-r from-[#00DC51]/60 to-[#00DC51]/40"></div>
              </motion.div>

              {/* Stage 3: Adviser */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                className="bg-gradient-to-br from-[#00DC51]/30 to-[#00DC51]/15 border-2 border-[#00DC51] rounded-xl p-5 text-center shadow-xl shadow-[#00DC51]/40 flex-1"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
                  className="w-12 h-12 bg-[#00DC51]/40 rounded-lg flex items-center justify-center mx-auto mb-3 border border-[#00DC51]"
                >
                  <Sparkles className="text-[#00DC51]" size={24} strokeWidth={2.5} />
                </motion.div>
                <p className="font-black text-lg text-[#00DC51]">Adviser</p>
                <p className="text-xs text-[#00DC51]/90 font-bold mt-2">Trusted Partner</p>
                <p className="text-xs text-[#00DC51]/70 mt-3 leading-relaxed">Provides strategy & growth</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Custom Graphic for Three Stages */}
      {page.id === 's1-stages' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Stage 1 - Automation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/5 border-2 border-white/20 rounded-xl p-6 flex flex-col hover:border-white/40 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border-2 border-white/30">
                  <div className="text-white font-black text-sm">Step 1</div>
                </div>
                <h3 className="text-2xl font-black mb-3">Automation</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">Rules-based systems: bank feeds, automated postings, OCR. Predictable but limited.</p>
              </div>
            </motion.div>

            {/* Arrow 1 */}
            <div className="hidden md:flex absolute top-[120px] left-[30%] items-center justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-[#00DC51] font-black text-2xl"
              >
                →
              </motion.div>
            </div>

            {/* Stage 2 - AI Assistants */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/5 border-2 border-[#00DC51]/30 rounded-xl p-6 flex flex-col hover:border-[#00DC51]/50 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-[#00DC51]/20 rounded-2xl flex items-center justify-center mb-4 border-2 border-[#00DC51]/40">
                  <div className="text-[#00DC51] font-black text-sm">Step 2</div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-white">AI Assistants</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">AI helps with tasks: drafting emails, summarizing info, explaining figures. Requires prompts and human direction.</p>
              </div>
            </motion.div>

            {/* Arrow 2 */}
            <div className="hidden md:flex absolute top-[120px] left-[63.5%] items-center justify-center pointer-events-none z-10">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-[#00DC51] font-black text-2xl"
              >
                →
              </motion.div>
            </div>

            {/* Stage 3 - AI Agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 flex flex-col shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-[#00DC51]/30 rounded-2xl flex items-center justify-center mb-4 border-2 border-[#00DC51] shadow-lg shadow-[#00DC51]/30">
                  <div className="text-[#00DC51] font-black text-sm">Step 3</div>
                </div>
                <h3 className="text-2xl font-black mb-3 text-[#00DC51]">AI Agents</h3>
                <p className="text-sm text-white/70 font-medium leading-relaxed">AI operates with a defined goal: performs multiple steps, works inside systems, presents results for approval.</p>
              </div>
            </motion.div>
          </div>

          {/* Evolution Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center mt-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-white/20 to-[#00DC51]/40" />
              <div className="text-xs font-black text-white/40 uppercase tracking-wider">Evolution of AI</div>
              <div className="h-px w-12 bg-gradient-to-r from-[#00DC51]/40 to-[#00DC51]" />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Custom Graphic for Assistants vs Agents */}
      {page.id === 's3-difference' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-blue-500/10 border-2 border-blue-400/40 rounded-xl p-6 flex flex-col shadow-lg shadow-blue-500/10 hover:border-blue-400/60 transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 border-2 border-blue-400/50 shadow-lg shadow-blue-500/20">
                  <MessageSquare className="text-blue-400" size={26} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-blue-400">AI Assistant</h3>
                
                {/* Subtitle */}
                <div className="mb-4 pb-4 border-b border-blue-400/20">
                  <p className="text-sm font-bold text-blue-400/80 italic">
                    Assistants respond to what you ask.
                  </p>
                </div>
                
                <p className="text-sm text-white/80 font-medium leading-relaxed mb-5">
                  You drive the process. AI responds to prompts and helps with tasks along the way. You remain in control at every step.
                </p>
                
                {/* Examples */}
                <div className="bg-blue-500/20 border-2 border-blue-400/30 rounded-lg p-4 mt-auto">
                  <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-3">Examples in Practice</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Summarise this client email"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Draft a response to this query"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(96,165,250,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Explain this variance"
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* AI Agent */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-xl p-6 flex flex-col shadow-lg shadow-[#00DC51]/20 hover:shadow-[#00DC51]/30 transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-[#00DC51]/30 rounded-xl flex items-center justify-center mb-4 border-2 border-[#00DC51] shadow-lg shadow-[#00DC51]/30">
                  <Bot className="text-[#00DC51]" size={26} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-[#00DC51]">AI Agent</h3>
                
                {/* Subtitle */}
                <div className="mb-4 pb-4 border-b border-[#00DC51]/20">
                  <p className="text-sm font-bold text-[#00DC51]/80 italic">
                    Agents work toward what you want to achieve.
                  </p>
                </div>
                
                <p className="text-sm text-white/80 font-medium leading-relaxed mb-5">
                  Agent works autonomously toward a goal. It determines the steps, performs actions within guardrails, and presents results for your review.
                </p>
                
                {/* Examples */}
                <div className="bg-[#00DC51]/20 border-2 border-[#00DC51]/30 rounded-lg p-4 mt-auto">
                  <div className="text-xs font-black text-[#00DC51] uppercase tracking-wider mb-3">Examples in Practice</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Prepare the quarterly update for Client X, identify any issues, and draft the client communication"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Review all outstanding items for clients in Group A, send reminders where needed, and flag urgent cases"
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-[#00DC51] rounded-full flex-shrink-0 mt-1.5 shadow-[0_0_4px_rgba(0,220,81,0.8)]" />
                      <p className="text-xs text-white/80 font-medium leading-relaxed">
                        "Complete the month-end close checks and prepare the management report"
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

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
              const [isExpanded, setIsExpanded] = React.useState(false);
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
                    onClick={() => setIsExpanded(!isExpanded)}
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

      {/* Custom Interactive Graphic for Agent Maturity Ladder - Timeline Scrubber */}
      {page.id === 's3-maturity' && (() => {
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

        const [currentStage, setCurrentStage] = React.useState(0);

        const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percentage = x / rect.width;
          const stageIndex = Math.min(Math.floor(percentage * stages.length), stages.length - 1);
          setCurrentStage(stageIndex);
        };

        const progressPercentage = (currentStage / (stages.length - 1)) * 100;

        return (
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
        );
      })()}

      {isGlossaryPage ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-6 xl:-mx-4 xl:w-[calc(100%+2rem)] 2xl:-mx-6 2xl:w-[calc(100%+3rem)]"
        >
          <style>{`
            .glossary-term-list {
              scrollbar-width: thin;
              scrollbar-color: #00DC51 #030604;
            }

            .glossary-term-list::-webkit-scrollbar {
              width: 10px;
            }

            .glossary-term-list::-webkit-scrollbar-track {
              background: #030604;
              border-radius: 999px;
            }

            .glossary-term-list::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #00DC51 0%, #00b842 100%);
              border-radius: 999px;
              border: 2px solid #030604;
            }

            .glossary-term-list::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #00ff5f 0%, #00c948 100%);
            }
          `}</style>
          <div className="rounded-[28px] border border-white/12 bg-gradient-to-br from-white/[0.05] via-[#00DC51]/[0.05] to-transparent p-5 shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:p-6">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">Glossary Lab</h3>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/68 md:text-base">
                  Explore terms as a reference tool, then switch into flashcards to remember the key ideas.
                </p>
              </div>
              <div className="inline-flex w-full max-w-full rounded-full border border-white/12 bg-[#101310] p-1 sm:w-auto max-[380px]:flex-col">
                <button
                  type="button"
                  onClick={() => {
                    updateGlossaryState((current) => ({ ...current, mode: 'lab' }));
                  }}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-black transition-colors sm:flex-none ${
                    glossaryState.mode === 'lab'
                      ? 'bg-[#00DC51] text-black'
                      : 'bg-transparent text-white hover:text-[#00DC51]'
                  }`}
                >
                  Glossary Lab
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateGlossaryState((current) => ({ ...current, mode: 'flashcards' }));
                  }}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-black transition-colors sm:flex-none ${
                    glossaryState.mode === 'flashcards'
                      ? 'bg-[#00DC51] text-black'
                      : 'bg-transparent text-white hover:text-[#00DC51]'
                  }`}
                >
                  Flashcards
                </button>
              </div>
            </div>

            {glossaryState.mode === 'lab' ? (
              <div className="space-y-5">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00DC51]" size={18} strokeWidth={2.5} />
                  <input
                    value={glossaryState.searchQuery}
                    onChange={(e) => {
                      const nextSearchQuery = e.target.value;
                      updateGlossaryState((current) => ({
                        ...current,
                        mode: 'lab',
                        searchQuery: nextSearchQuery,
                      }));
                    }}
                    placeholder="Search glossary terms..."
                    className="w-full rounded-2xl border border-white/15 bg-[#030604] py-3 pl-12 pr-4 text-sm font-bold text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00DC51]"
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
                  <aside className="glossary-term-list grid content-start gap-2 rounded-3xl border border-white/12 bg-[#030604] p-3 lg:max-h-[560px] lg:overflow-auto">
                    {filteredGlossaryTerms.length > 0 ? filteredGlossaryTerms.map((term) => (
                      <button
                        key={term.id}
                        type="button"
                        onClick={() => {
                          updateGlossaryState((current) => ({
                            ...current,
                            mode: 'lab',
                            selectedTerm: term.term,
                          }));
                        }}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                          selectedGlossaryTerm?.term === term.term
                            ? 'border-[#00DC51] bg-[#00DC51]/12'
                            : 'border-white/12 bg-white/[0.035] hover:border-[#00DC51]/60 hover:bg-[#00DC51]/8'
                        }`}
                      >
                        <p className="text-sm font-black text-white">{term.term}</p>
                      </button>
                    )) : (
                      <div className="rounded-2xl border border-dashed border-white/15 px-4 py-6 text-center text-sm font-medium text-white/55">
                        No glossary terms found.
                      </div>
                    )}
                  </aside>

                  <section className="rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_top_right,_rgba(0,214,57,0.12),_transparent_34%),linear-gradient(145deg,#07140b,#020403)] p-6 md:p-7">
                    {selectedGlossaryTerm ? (
                      <>
                        <div className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Definition</div>
                        <h3 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">{selectedGlossaryTerm.term}</h3>
                        <p className="mb-6 max-w-4xl text-base font-medium leading-relaxed text-white/86 md:text-lg">
                          {selectedGlossaryTerm.definition}
                        </p>

                        {(() => {
                          const helper = GLOSSARY_HELPER_CONTENT[selectedGlossaryTerm.term];
                          const helperCards = [
                            helper?.example ? { label: 'Example', value: helper.example } : null,
                            helper?.watchOut ? { label: 'Watch out', value: helper.watchOut } : null,
                            helper?.plainEnglish ? { label: 'Plain English', value: helper.plainEnglish } : null,
                          ].filter((item): item is { label: string; value: string } => Boolean(item));

                          return helperCards.length > 0 ? (
                            <div className="mb-5 grid gap-3 md:grid-cols-3">
                              {helperCards.map((card) => (
                                <div key={card.label} className="min-h-[132px] rounded-2xl border border-white/12 bg-white/[0.035] p-4">
                                  <p className="mb-2 text-xs font-black uppercase tracking-[0.12em] text-[#00DC51]">{card.label}</p>
                                  <p className="text-sm font-medium leading-relaxed text-white/82">{card.value}</p>
                                </div>
                              ))}
                            </div>
                          ) : null;
                        })()}

                        {GLOSSARY_HELPER_CONTENT[selectedGlossaryTerm.term]?.relatedTerms?.length ? (
                          <div className="mb-5">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#00DC51]">Related terms</p>
                            <div className="flex flex-wrap gap-2">
                              {GLOSSARY_HELPER_CONTENT[selectedGlossaryTerm.term]?.relatedTerms?.map((relatedTerm) => (
                                <button
                                  key={relatedTerm}
                                  type="button"
                                  onClick={() => {
                                    updateGlossaryState((current) => ({
                                      ...current,
                                      mode: 'lab',
                                      selectedTerm: relatedTerm,
                                    }));
                                  }}
                                  className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-black text-white/75 transition-colors hover:border-[#00DC51]/60 hover:bg-[#00DC51]/10 hover:text-white"
                                >
                                  {relatedTerm}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => handlePromptCopy(`${selectedGlossaryTerm.term}\n\n${selectedGlossaryTerm.definition}`, `glossary-${selectedGlossaryTerm.term}`)}
                            className="inline-flex items-center gap-2 rounded-full bg-[#00DC51] px-4 py-2.5 text-sm font-black text-black transition-colors hover:bg-[#00FF5F]"
                          >
                            {copiedPromptId === `glossary-${selectedGlossaryTerm.term}` ? <Check size={16} strokeWidth={3} /> : <Copy size={16} strokeWidth={2.5} />}
                            <span>{copiedPromptId === `glossary-${selectedGlossaryTerm.term}` ? 'Copied' : 'Copy explanation'}</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center text-sm font-medium text-white/55">
                        Select a term to view the official definition.
                      </div>
                    )}
                  </section>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div>
                  {activeFlashcard ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          updateGlossaryState((current) => {
                            const isFlipped = current.flippedTerms.includes(activeFlashcard.term);
                            return {
                              ...current,
                              flippedTerms: isFlipped
                                ? current.flippedTerms.filter((term) => term !== activeFlashcard.term)
                                : [...current.flippedTerms, activeFlashcard.term],
                            };
                          });
                        }}
                        className="flex min-h-[390px] w-full flex-col items-center justify-center rounded-[24px] border border-[#00DC51] bg-[radial-gradient(circle_at_top_right,_rgba(0,214,57,0.16),_transparent_38%),linear-gradient(135deg,#03170b,#010201)] p-8 text-center shadow-[0_22px_80px_rgba(0,214,57,0.08)]"
                      >
                        <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Click to reveal</p>
                        {!activeFlashcardIsFlipped ? (
                          <h3 className="text-4xl font-black tracking-tight text-white md:text-6xl">{activeFlashcard.term}</h3>
                        ) : (
                          <p className="max-w-3xl text-lg font-medium leading-relaxed text-white/88 md:text-2xl">
                            {activeFlashcard.definition}
                          </p>
                        )}
                      </button>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateGlossaryState((current) => ({
                              ...current,
                              currentFlashcardIndex: current.currentFlashcardIndex <= 0 ? glossaryTerms.length - 1 : current.currentFlashcardIndex - 1,
                            }));
                          }}
                          className="rounded-full border border-white/15 bg-[#101310] px-4 py-2.5 text-sm font-black text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateGlossaryState((current) => ({
                              ...current,
                              learnedTerms: current.learnedTerms.includes(activeFlashcard.term)
                                ? current.learnedTerms
                                : [...current.learnedTerms, activeFlashcard.term],
                              currentFlashcardIndex: current.currentFlashcardIndex >= glossaryTerms.length - 1 ? 0 : current.currentFlashcardIndex + 1,
                            }));
                          }}
                          className="rounded-full bg-[#00DC51] px-4 py-2.5 text-sm font-black text-black transition-colors hover:bg-[#00FF5F]"
                        >
                          I know this
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateGlossaryState((current) => ({
                              ...current,
                              currentFlashcardIndex: current.currentFlashcardIndex >= glossaryTerms.length - 1 ? 0 : current.currentFlashcardIndex + 1,
                            }));
                          }}
                          className="rounded-full border border-white/15 bg-[#101310] px-4 py-2.5 text-sm font-black text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>

                <aside className="rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_top_right,_rgba(0,214,57,0.14),_transparent_38%),#030604] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Flashcard progress</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-white">Learning mode</h3>
                  <p className="mt-3 text-sm font-medium text-white/65">
                    {glossaryLearnedTerms.length} / {glossaryTerms.length} learned
                  </p>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/12">
                    <motion.div
                      className="h-full rounded-full bg-[#00DC51]"
                      animate={{ width: `${glossaryProgress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  <div className="mt-5 space-y-2">
                    {glossaryLearnedTerms.length > 0 ? glossaryLearnedTerms.map((term) => (
                      <div key={term.term} className="rounded-2xl border border-white/12 bg-white/[0.035] px-4 py-3 text-sm font-medium text-white/78">
                        {term.term}
                      </div>
                    )) : (
                      <div className="rounded-2xl border border-dashed border-white/15 px-4 py-5 text-sm font-medium text-white/55">
                        Terms you mark as known will appear here.
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </motion.div>
      ) : isPromptLibraryPage ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-8"
        >
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div className="space-y-5">
              <p className="max-w-4xl text-sm font-medium leading-relaxed text-white/82 md:text-base">
                {promptIntroText}
              </p>

              <div className="grid gap-3 sm:grid-cols-[auto_auto_minmax(0,1fr)]">
                <button
                  type="button"
                  onClick={() => {
                    updatePromptLibraryState((current) => ({
                      ...current,
                      expandedPromptIds: promptTemplates.map((template) => template.id),
                    }));
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                >
                  <ChevronDown className="rotate-180" size={16} strokeWidth={2.5} />
                  <span>Expand All</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updatePromptLibraryState((current) => ({
                      ...current,
                      expandedPromptIds: [],
                    }));
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                >
                  <ChevronDown size={16} strokeWidth={2.5} />
                  <span>Collapse All</span>
                </button>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00DC51]" size={18} strokeWidth={2.5} />
                  <input
                    value={promptLibraryState.searchQuery}
                    onChange={(e) => {
                      const nextSearchQuery = e.target.value;
                      updatePromptLibraryState((current) => ({
                        ...current,
                        searchQuery: nextSearchQuery,
                      }));
                    }}
                    placeholder="Filter prompts..."
                    className="w-full rounded-xl border border-white/15 bg-black/60 py-3 pl-12 pr-4 text-sm font-bold text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00DC51] xl:ml-auto xl:max-w-sm"
                  />
                </div>
              </div>
            </div>

            <aside className="rounded-2xl border-2 border-[#00DC51] bg-gradient-to-br from-[#00DC51]/16 via-[#00DC51]/7 to-transparent p-5 shadow-lg shadow-[#00DC51]/10">
              <h3 className="mb-4 text-base font-black text-white">{promptHowToBlock?.title || 'How to Use This Library:'}</h3>
              <div className="space-y-3">
                {promptHowToSteps.map((step, index) => (
                  <div key={step} className="grid grid-cols-[28px_1fr] items-start gap-3">
                    <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#00DC51] text-xs font-black text-[#00DC51]">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-white/85">{step}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="space-y-3">
            {filteredPromptTemplates.map((template, index) => {
              const isExpanded = promptLibraryState.expandedPromptIds.includes(template.id);
              const variableValues = promptLibraryState.promptValues[template.id] || {};
              const personalisedPrompt = buildPersonalisedPrompt(template.text, template.variables, variableValues);
              const copyOriginalId = `${template.id}-original`;
              const copyPersonalisedId = `${template.id}-personalised`;

              return (
                <motion.article
                  key={template.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-[#00DC51]/55 bg-gradient-to-br from-[#00DC51]/10 via-white/[0.03] to-white/[0.01] shadow-xl shadow-[#00DC51]/10'
                      : 'border-white/12 bg-gradient-to-r from-white/[0.05] to-white/[0.02]'
                  }`}
                >
                  <div className="grid gap-4 p-5 md:grid-cols-[44px_minmax(0,1fr)_auto] md:items-center">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#00DC51]/30 bg-[#00DC51]/15 text-sm font-black text-[#00DC51]">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-black text-white">{template.title}</h3>
                      <p className="text-sm font-medium leading-relaxed text-white/82">
                        {renderPromptText(template.text, template.variables, variableValues)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          updatePromptLibraryState((current) => {
                            const isOpen = current.expandedPromptIds.includes(template.id);
                            return {
                              ...current,
                              expandedPromptIds: isOpen
                                ? current.expandedPromptIds.filter((id) => id !== template.id)
                                : [...current.expandedPromptIds, template.id],
                            };
                          });
                        }}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                      >
                        <Sparkles size={14} strokeWidth={2.5} />
                        <span>{isExpanded ? 'Hide' : 'Personalise'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePromptCopy(template.text, copyOriginalId)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#00DC51] px-3 py-2 text-xs font-black uppercase tracking-wide text-black transition-colors hover:bg-[#00FF5F]"
                      >
                        {copiedPromptId === copyOriginalId ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                        <span>{copiedPromptId === copyOriginalId ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updatePromptLibraryState((current) => {
                            const isOpen = current.expandedPromptIds.includes(template.id);
                            return {
                              ...current,
                              expandedPromptIds: isOpen
                                ? current.expandedPromptIds.filter((id) => id !== template.id)
                                : [...current.expandedPromptIds, template.id],
                            };
                          });
                        }}
                        aria-label={isExpanded ? 'Collapse prompt' : 'Expand prompt'}
                        className="rounded-xl p-2 text-white/70 transition-colors hover:text-[#00DC51]"
                      >
                        <ChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-white/10"
                      >
                        <div className="grid gap-5 p-5 lg:grid-cols-[340px_minmax(0,1fr)]">
                          <div className="rounded-2xl border border-white/12 bg-[#00DC51]/6 p-4">
                            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Type values here</h4>
                            <div className="space-y-4">
                              {template.variables.map((variable) => (
                                <div key={variable.id} className="space-y-2">
                                  <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-white/90">
                                    {variable.label}
                                  </label>
                                  <input
                                    value={variableValues[variable.id] || ''}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      updatePromptLibraryState((current) => ({
                                        ...current,
                                        promptValues: {
                                          ...current.promptValues,
                                          [template.id]: {
                                            ...(current.promptValues[template.id] || {}),
                                            [variable.id]: value,
                                          },
                                        },
                                      }));
                                    }}
                                    placeholder={`Type ${variable.key.toLowerCase()}...`}
                                    className="w-full rounded-xl border border-white/15 bg-black/70 px-4 py-3 text-sm font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00DC51]"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/12 bg-[#00DC51]/6 p-4">
                            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Live prompt</h4>
                            <div className="min-h-[128px] whitespace-pre-wrap text-sm font-medium leading-relaxed text-white/86">
                              {renderPromptText(template.text, template.variables, variableValues)}
                            </div>
                            <div className="mt-5 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handlePromptCopy(personalisedPrompt, copyPersonalisedId)}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#00DC51] px-4 py-2.5 text-xs font-black uppercase tracking-wide text-black transition-colors hover:bg-[#00FF5F]"
                              >
                                {copiedPromptId === copyPersonalisedId ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                                <span>{copiedPromptId === copyPersonalisedId ? 'Copied personalised prompt' : 'Copy personalised prompt'}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  updatePromptLibraryState((current) => ({
                                    ...current,
                                    promptValues: {
                                      ...current.promptValues,
                                      [template.id]: {},
                                    },
                                  }));
                                }}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-white transition-colors hover:border-[#00DC51]/60 hover:text-[#00DC51]"
                              >
                                <RotateCcw size={14} strokeWidth={2.5} />
                                <span>Reset fields</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}

            {filteredPromptTemplates.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-5 py-8 text-center">
                <p className="text-sm font-medium text-white/65">
                  No prompts match your filter yet. Try a different keyword.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-[#00DC51] bg-gradient-to-r from-[#00DC51]/18 to-[#00DC51]/5 px-5 py-5">
            <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[#00DC51] bg-[#00DC51]/20 text-[#00DC51]">
              <span className="text-lg font-black">i</span>
            </div>
            <p className="text-sm font-bold leading-relaxed text-white">{renderPromptText(promptNoteText, extractPromptVariables(promptNoteText))}</p>
          </div>

          <p className="max-w-4xl text-sm font-medium leading-relaxed text-white/78 md:text-base">
            {promptPracticeText}
          </p>
        </motion.div>
      ) : (
      /* Content Blocks */
      <div className={`space-y-5 ${isCertificatePage ? 'certificate-screen-only' : ''}`}>
        {page.content.map((block, index) => {
          // Skip the numbered-list and quote on s1-stages page since they're in the custom graphic
          if (page.id === 's1-stages' && (block.type === 'numbered-list' || block.type === 'quote')) {
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
          if (page.id === 's3-maturity' && (block.type === 'numbered-list' || block.type === 'highlight' || block.type === 'box')) {
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
                isFinishPage ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-r-xl border-l-[4px] border-[#00DC51] bg-gradient-to-r from-[#00DC51]/16 to-transparent px-5 py-5"
                  >
                    <div className="flex items-start gap-3">
                      <Lightbulb className="mt-0.5 flex-shrink-0 text-[#00DC51]" size={18} strokeWidth={2.5} />
                      <div className="flex-1">
                        <p className="text-base font-bold leading-relaxed text-white">{block.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={page.section?.includes('Section 2') ? { x: 4 } : {}}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative bg-gradient-to-r from-[#00DC51]/15 to-transparent border-l-4 border-[#00DC51] rounded-r-xl p-5 backdrop-blur-sm group"
                  >
                    {page.section?.includes('Section 2') && (
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00DC51]/20 rounded-full blur-xl group-hover:bg-[#00DC51]/30 transition-all" />
                    )}
                    <div className="relative flex items-start gap-3">
                      {page.section?.includes('Section 2') && (
                        <Lightbulb className="text-[#00DC51] flex-shrink-0 mt-0.5" size={20} strokeWidth={2.5} />
                      )}
                      <p className="font-bold text-base leading-relaxed flex-1">{block.text}</p>
                    </div>
                  </motion.div>
                )
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

              {block.type === 'box' && (
                <motion.div
                  whileHover={page.section?.includes('Section 2') ? { scale: 1.01 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`rounded-xl p-5 border-2 transition-all ${
                    page.id === 's3-workflow-map' && block.title === 'Common High-Impact Agent Candidates:'
                      ? 'bg-white/[0.03] border-white/12 hover:border-white/20'
                      : page.id === 's7-tool-matrix'
                      ? block.style === 'green'
                        ? 'bg-white/[0.03] border-white/12 text-white hover:border-white/20'
                        : block.style === 'dark'
                        ? 'bg-black/35 border-white/12 hover:border-white/20'
                        : 'bg-white/[0.04] border-white/12 hover:border-white/20'
                      : block.style === 'green'
                      ? 'bg-[#00DC51]/10 border-[#00DC51] hover:shadow-lg hover:shadow-[#00DC51]/20'
                      : block.style === 'dark'
                      ? 'bg-black/40 border-white/20 hover:border-white/30'
                      : 'bg-white/5 border-white/20 hover:border-white/30'
                  }`}>
                  {block.title && !(page.id === 's3-workflow-map' && block.title === 'Common High-Impact Agent Candidates:') && (
                    <div className="flex items-start gap-3 mb-2.5">
                      {page.section?.includes('Section 2') && block.style === 'green' && (
                        <div className="w-8 h-8 bg-[#00DC51] rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="text-black" size={16} strokeWidth={3} />
                        </div>
                      )}
                      {page.section?.includes('Section 2') && block.style === 'dark' && (
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="text-white/60" size={16} strokeWidth={3} />
                        </div>
                      )}
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
      )}

      {isPromptLibraryPage && page.activity && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="rounded-2xl border-2 border-[#00DC51] bg-gradient-to-br from-[#00DC51]/12 via-[#00DC51]/6 to-transparent p-6 shadow-lg shadow-[#00DC51]/10"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00DC51] shadow-lg shadow-[#00DC51]/40">
                <Lightbulb className="text-black" size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#00DC51]">Activity</span>
                  <div className="h-px flex-1 bg-[#00DC51]/30" />
                </div>
                <h4 className="mb-2 text-lg font-black text-white">{page.activity.title}</h4>
                <p className="text-sm font-medium leading-relaxed text-white/72">{page.activity.prompt}</p>
              </div>
            </div>

            <div className="space-y-2 lg:min-w-[220px]">
              <p className="text-right text-sm font-black text-white">
                {completedPromptActivityCount} / {promptActivityQuestions.length} completed
              </p>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full bg-[#00DC51]"
                  animate={{ width: `${promptActivityProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {promptActivityQuestions.map((question, index) => {
              const questionKey = `question-${index}`;
              const isCompleted = promptLibraryState.activityCompleted.includes(questionKey);

              return (
                <div
                  key={questionKey}
                  className={`rounded-2xl border p-4 transition-colors ${
                    isCompleted
                      ? 'border-[#00DC51] bg-[#00DC51]/10'
                      : 'border-white/12 bg-black/25'
                  }`}
                >
                  <div className="mb-4 grid grid-cols-[34px_1fr] gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#00DC51] text-xs font-black text-[#00DC51]">
                      {index + 1}
                    </div>
                    <p className="text-sm font-bold leading-relaxed text-white">{question}</p>
                  </div>

                  <textarea
                    value={promptLibraryState.activityAnswers[questionKey] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      updatePromptLibraryState((current) => ({
                        ...current,
                        activityAnswers: {
                          ...current.activityAnswers,
                          [questionKey]: value,
                        },
                      }));
                    }}
                    placeholder="Type your answer here..."
                    className="min-h-[104px] w-full resize-y rounded-xl border border-white/15 bg-black/75 p-3 text-sm font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#00DC51]"
                  />

                  <label className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/68">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        updatePromptLibraryState((current) => ({
                          ...current,
                          activityCompleted: checked
                            ? [...current.activityCompleted, questionKey]
                            : current.activityCompleted.filter((item) => item !== questionKey),
                        }));
                      }}
                      className="h-4 w-4 accent-[#00DC51]"
                    />
                    <span>Mark as complete</span>
                  </label>
                </div>
              );
            })}
          </div>

          {(Object.keys(promptLibraryState.activityAnswers).length > 0 || promptLibraryState.activityCompleted.length > 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2 text-xs font-bold text-[#00DC51]"
            >
              <CheckCircle size={16} strokeWidth={2.5} />
              <span>Prompt library activity saved locally</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {isWorkflowMapPage && page.activity && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-[28px] border border-white/12 bg-[#131313] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-8"
        >
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0E0E0E]">
              <ClipboardList className="text-[#00DC51]" size={24} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#00DC51]">Activity</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h4 className="text-xl font-black text-white">{page.activity.title}</h4>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-white/72">{page.activity.prompt}</p>
            </div>
          </div>

          {workflowWizardStep >= 0 ? (
            <>
              <div className="mb-6 overflow-hidden rounded-[24px] border border-white/10 bg-[#0E0E0E]">
                <div className="relative px-4 pt-5 sm:px-6">
                  <div className="absolute left-10 right-10 top-9 hidden h-px bg-white/10 sm:block" />
                  <div className="grid gap-3 sm:grid-cols-4">
                    {workflowWizardSteps.map((label, index) => {
                      const isActive = workflowWizardStep === index;
                      const isComplete = workflowWizardStep > index;

                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => {
                            if (index === 0 || workflowMapState.workflows.length > 0) {
                              updateWorkflowMapState((current) => ({ ...current, currentStep: index }));
                            }
                          }}
                          className="relative flex flex-col items-center gap-2 pb-4 text-center"
                        >
                          <span className={`flex h-9 w-9 items-center justify-center rounded-[10px] border text-sm font-black transition-colors ${
                            isActive
                              ? 'border-[#00DC51] bg-[#00DC51] text-black'
                              : isComplete
                                ? 'border-[#00DC51]/35 bg-[#00DC51]/10 text-[#00DC51]'
                                : 'border-white/10 bg-[#131313] text-white/40'
                          }`}>
                            {index + 1}
                          </span>
                                  <span className={`text-center text-[12px] font-bold ${isActive ? 'text-[#00DC51]' : 'text-white/55'}`}>{label}</span>
                                </button>
                              );
                            })}
                          </div>
                </div>

                <div className="border-t border-white/8 px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">
                        Step {workflowWizardStep + 1} of 4
                      </p>
                      <h5 className="mt-2 text-lg font-black text-white">{workflowWizardSteps[workflowWizardStep]}</h5>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/60">
                      {workflowMapState.workflows.length} workflow{workflowMapState.workflows.length === 1 ? '' : 's'}
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {workflowWizardStep === 0 && (
                  <motion.div
                    key="workflow-step-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="rounded-[24px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="text"
                          value={workflowMapState.draftName}
                          onChange={(e) => updateWorkflowMapState((current) => ({ ...current, draftName: e.target.value }))}
                          placeholder="Add a workflow or process, e.g. Monthly reporting"
                          className="flex-1 rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const name = workflowMapState.draftName.trim();
                            if (!name || workflowMapState.workflows.length >= 15) {
                              return;
                            }

                            updateWorkflowMapState((current) => ({
                              ...current,
                              workflows: [
                                ...current.workflows,
                                {
                                  id: `workflow-${Date.now()}-${current.workflows.length}`,
                                  name,
                                  repeatability: 3,
                                  judgement: 3,
                                },
                              ],
                              draftName: '',
                              scoringIndex: current.workflows.length === 0 ? 0 : current.scoringIndex,
                            }));
                          }}
                          disabled={!workflowMapState.draftName.trim() || workflowMapState.workflows.length >= 15}
                          className="inline-flex items-center justify-center rounded-2xl bg-[#00DC51] px-5 py-3 text-sm font-black text-black transition-all hover:bg-[#00F25B] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
                        >
                          Add workflow
                        </button>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          {workflowMapState.workflows.length} / 15 workflows added
                        </p>
                        <p className="text-xs font-medium text-white/45">Write down 10-15 common workflows.</p>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#00DC51] transition-all"
                          style={{ width: `${Math.min((workflowMapState.workflows.length / 15) * 100, 100)}%` }}
                        />
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {workflowMapState.workflows.length > 0 ? workflowMapState.workflows.map((workflow) => (
                          <div
                            key={workflow.id}
                            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/82"
                          >
                            <span>{workflow.name}</span>
                            <button
                              type="button"
                              onClick={() => {
                                updateWorkflowMapState((current) => {
                                  const remaining = current.workflows.filter((item) => item.id !== workflow.id);
                                  return {
                                    ...current,
                                    workflows: remaining,
                                    selectedWorkflowIds: current.selectedWorkflowIds.filter((id) => id !== workflow.id),
                                    scoringIndex: Math.min(current.scoringIndex, Math.max(remaining.length - 1, 0)),
                                  };
                                });
                              }}
                              className="text-white/45 transition-colors hover:text-white"
                              aria-label={`Remove ${workflow.name}`}
                            >
                              <X size={14} strokeWidth={3} />
                            </button>
                          </div>
                        )) : (
                          <p className="text-sm font-medium text-white/45">Add at least 3 workflows to build your first map.</p>
                        )}
                      </div>
                      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Getting started</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-white/72">Add at least 3 workflows to build your first map. Continue unlocks once you have 3.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {workflowWizardStep === 1 && (
                  <motion.div
                    key="workflow-step-score"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="rounded-[24px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6">
                      {activeWorkflowForScoring ? (
                        <>
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">
                                Workflow {workflowScoringIndex + 1} of {workflowMapState.workflows.length}
                              </p>
                              <h5 className="mt-2 text-2xl font-black text-white">{activeWorkflowForScoring.name}</h5>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/55">
                              {scoredWorkflowCount} scored
                            </div>
                          </div>

                          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-[#00DC51] transition-all"
                              style={{ width: `${workflowMapState.workflows.length > 0 ? ((workflowScoringIndex + 1) / workflowMapState.workflows.length) * 100 : 0}%` }}
                            />
                          </div>

                          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p className="text-sm font-medium leading-relaxed text-white/70">
                              Score one workflow at a time. Higher repeatability means the process happens often and follows consistent steps. Higher judgement means it needs more professional interpretation.
                            </p>
                          </div>

                          <div className="mt-5 space-y-4">
                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-white/82">Repeatability</span>
                                <span className="text-base font-black text-[#00DC51]">{activeWorkflowForScoring.repeatability}/5</span>
                              </div>
                              <div className="grid grid-cols-5 gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <button
                                    key={`repeatability-${value}`}
                                    type="button"
                                    onClick={() => {
                                      updateWorkflowMapState((current) => ({
                                        ...current,
                                        workflows: current.workflows.map((item) => item.id === activeWorkflowForScoring.id ? { ...item, repeatability: value } : item),
                                      }));
                                    }}
                                    className={`h-11 rounded-lg text-sm font-black transition-colors ${
                                      value <= activeWorkflowForScoring.repeatability
                                        ? 'bg-[#00DC51] text-black'
                                        : 'bg-[#1A1A1A] text-white/25'
                                    }`}
                                  >
                                    {value}
                                  </button>
                                ))}
                              </div>
                              <p className="mt-3 text-sm font-medium text-white/55">1 = rare/ad-hoc, 5 = daily and highly repeatable.</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                              <div className="mb-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-white/82">Judgement required</span>
                                <span className="text-base font-black text-[#FFB800]">{activeWorkflowForScoring.judgement}/5</span>
                              </div>
                              <div className="grid grid-cols-5 gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                  <button
                                    key={`judgement-${value}`}
                                    type="button"
                                    onClick={() => {
                                      updateWorkflowMapState((current) => ({
                                        ...current,
                                        workflows: current.workflows.map((item) => item.id === activeWorkflowForScoring.id ? { ...item, judgement: value } : item),
                                      }));
                                    }}
                                    className={`h-11 rounded-lg text-sm font-black transition-colors ${
                                      value <= activeWorkflowForScoring.judgement
                                        ? 'bg-[#FFB800] text-black'
                                        : 'bg-[#1A1A1A] text-white/25'
                                    }`}
                                  >
                                    {value}
                                  </button>
                                ))}
                              </div>
                              <p className="mt-3 text-sm font-medium text-white/55">1 = pure data entry, 5 = deep professional interpretation.</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-white/45">Add workflows first to begin scoring.</p>
                      )}
                    </div>

                    <div className="rounded-[20px] border border-white/10 bg-[#111111] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Workflows in this step</p>
                      {workflowMapState.workflows.length > 1 && (
                        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                          {workflowMapState.workflows.map((workflow, index) => (
                            <button
                              key={workflow.id}
                              type="button"
                              onClick={() => updateWorkflowMapState((current) => ({ ...current, scoringIndex: index }))}
                              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                                workflowScoringIndex === index
                                  ? 'border-[#00DC51]/40 bg-[#00DC51]/10 text-white'
                                  : 'border-white/10 bg-black/20 text-white/70 hover:border-white/15 hover:text-white'
                              }`}
                            >
                              <span className="font-semibold">{workflow.name}</span>
                              <span className="text-xs font-black text-white/45">{index + 1}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {workflowWizardStep === 2 && (
                  <motion.div
                    key="workflow-step-map"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="rounded-[24px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div>
                          <h5 className="text-lg font-black text-white">Workflow map</h5>
                          <p className="mt-1 text-sm font-medium text-white/72">High repeatability and low judgement point to the strongest starting agents.</p>
                        </div>
                        <div className="rounded-full border border-[#00DC51]/25 bg-[#00DC51]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#00DC51]">
                          {workflowCandidates.length} candidates
                        </div>
                      </div>

                      <div className="relative h-[280px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] sm:h-[300px]">
                        <div className="absolute inset-y-10 left-1/2 w-px bg-white/10" />
                        <div className="absolute inset-x-6 top-1/2 h-px bg-white/10 sm:inset-x-8" />
                        <div className="absolute left-4 top-4 max-w-[38%] text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFD84D] sm:text-[11px]">Human-led + assistant</div>
                        <div className="absolute right-4 top-4 max-w-[38%] text-right text-[10px] font-bold uppercase tracking-[0.16em] text-[#00DC51] sm:text-[11px]">Strong agent candidate</div>
                        <div className="absolute bottom-5 left-4 max-w-[38%] text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF8B8B] sm:text-[11px]">Fully human-led</div>
                        <div className="absolute bottom-5 right-4 max-w-[38%] text-right text-[10px] font-bold uppercase tracking-[0.16em] text-[#7AB8FF] sm:text-[11px]">Assistant task</div>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                          Repeatability →
                        </div>
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                          Judgement →
                        </div>

                        {workflowMapState.workflows.map((workflow) => {
                          const quadrant = WORKFLOW_QUADRANTS[getWorkflowQuadrant(workflow.repeatability, workflow.judgement)];
                          const { left, top } = getWorkflowPlotPosition(workflow);

                          return (
                            <div
                              key={workflow.id}
                              title={workflow.name}
                              className={`absolute flex max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border bg-black/90 px-3 py-2 text-[11px] font-black text-white shadow-lg sm:max-w-[11rem] ${quadrant.borderClass}`}
                              style={{ left: `${left}%`, top: `${top}%` }}
                            >
                              <span className="block truncate">{workflow.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {Object.entries(WORKFLOW_QUADRANTS).map(([key, quadrant]) => {
                        const matchingWorkflows = workflowMapState.workflows.filter((workflow) => (
                          getWorkflowQuadrant(workflow.repeatability, workflow.judgement) === key
                        ));

                        return (
                          <div key={key} className={`rounded-2xl border p-4 ${quadrant.borderClass} ${quadrant.bgClass}`}>
                            <p className={`text-xs font-black uppercase tracking-[0.16em] ${quadrant.colorClass}`}>{quadrant.label}</p>
                            <p className="mt-2 text-sm font-semibold text-white">{matchingWorkflows.length} workflow{matchingWorkflows.length === 1 ? '' : 's'}</p>
                            <p className="mt-2 text-xs font-medium leading-relaxed text-white/55">{quadrant.guidance}</p>
                            {matchingWorkflows.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {matchingWorkflows.map((workflow) => (
                                  <span
                                    key={workflow.id}
                                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] font-semibold text-white/72"
                                  >
                                    {workflow.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {workflowWizardStep === 3 && (
                  <motion.div
                    key="workflow-step-prioritise"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    <div className="rounded-[24px] border border-white/10 bg-[#0E0E0E] p-5 sm:p-6">
                      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Step 4 of 4</p>
                          <h5 className="mt-2 text-2xl font-black text-white">Choose 1 to 2 priority workflows</h5>
                          <p className="mt-3 max-w-3xl text-base font-medium leading-relaxed text-white/82">
                            These workflows scored high on repeatability and low on judgement. Pick 1-2 to start with based on impact, data availability, and team readiness.
                          </p>
                        </div>
                        <div className="rounded-full border border-[#00DC51]/25 bg-[#00DC51]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#00DC51]">
                          {workflowMapState.selectedWorkflowIds.length} selected
                        </div>
                      </div>

                      {workflowCandidates.length > 0 ? (
                        <div className="space-y-4">
                          {workflowCandidates.map((workflow) => {
                            const quadrant = WORKFLOW_QUADRANTS.strongAgentCandidate;
                            const isSelected = workflowMapState.selectedWorkflowIds.includes(workflow.id);
                            const isDisabled = !isSelected && hasReachedWorkflowPriorityLimit;

                            return (
                              <button
                                key={workflow.id}
                                type="button"
                                disabled={isDisabled}
                                aria-pressed={isSelected}
                                onClick={() => {
                                  updateWorkflowMapState((current) => ({
                                    ...current,
                                    selectedWorkflowIds: updateSelectedWorkflowIds(current.selectedWorkflowIds, workflow.id),
                                  }));
                                }}
                                className={`w-full rounded-[22px] border p-5 text-left transition-all disabled:cursor-not-allowed ${
                                  isSelected
                                    ? 'border-[#00DC51]/45 bg-[#0F2417] shadow-[0_0_0_1px_rgba(0,220,81,0.1)]'
                                    : isDisabled
                                      ? 'border-white/8 bg-black/20 opacity-60'
                                      : 'border-white/10 bg-black/20 hover:border-white/18 hover:bg-white/[0.03]'
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <h6 className="text-lg font-black text-white">{workflow.name}</h6>
                                      <span className={`rounded-full bg-[#00DC51]/12 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] ${quadrant.colorClass}`}>
                                        {quadrant.label}
                                      </span>
                                    </div>
                                    <p className="mt-3 text-sm font-semibold text-white">
                                      Repeatability {workflow.repeatability}/5 · Judgement {workflow.judgement}/5
                                    </p>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-white/72">
                                      Start here if the workflow already follows consistent steps, the data is accessible, and the team can review the output reliably.
                                    </p>
                                  </div>
                                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border-2 transition-colors ${
                                    isSelected
                                      ? 'border-[#00DC51] bg-[#00DC51] text-black'
                                      : 'border-white/18 bg-transparent text-transparent'
                                  }`}>
                                    <Check size={18} strokeWidth={3.2} />
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-white/12 bg-black/20 p-4 text-sm font-medium leading-relaxed text-white/72">
                          No strong agent candidates are available yet. Go back to the scoring step and increase repeatability or lower judgement on one or two workflows to create a starting shortlist.
                        </div>
                      )}
                      {workflowCandidates.length > 0 && (
                        <p className="mt-4 text-sm font-medium text-white/62">
                          {hasReachedWorkflowPriorityLimit
                            ? 'You have selected the maximum of 2 workflows. Deselect one to choose a different starting point.'
                            : 'Select up to 2 workflows. Your starting point appears below once you choose one.'}
                        </p>
                      )}

                      {selectedPriorityWorkflows.length > 0 && (
                        <div className="mt-6 rounded-[22px] border border-[#00DC51]/20 bg-[#102016] p-5 sm:p-6">
                          <p className="text-lg font-black text-[#00DC51]">Your starting point</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {selectedPriorityWorkflows.map((workflow) => (
                              <span
                                key={workflow.id}
                                className="rounded-full border border-[#00DC51]/18 bg-white/[0.03] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                              >
                                {workflow.name}
                              </span>
                            ))}
                          </div>
                          <p className="mt-4 text-base font-medium leading-relaxed text-white/88">
                            Start with {selectedPriorityWorkflowNames}. Map the end-to-end steps, identify the data inputs, and run a small test with one team member before scaling.
                          </p>
                        </div>
                      )}

                      <details className="group mt-6 rounded-[20px] border border-white/10 bg-black/20">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left">
                          <div>
                            <p className="text-sm font-black text-white">Copy summary</p>
                            <p className="mt-1 text-sm font-medium text-white/62">Keep this secondary and use it when you want a portable page 24 summary.</p>
                          </div>
                          <ChevronDown className="transition-transform group-open:rotate-180" size={18} strokeWidth={2.8} />
                        </summary>

                        <div className="border-t border-white/8 px-4 pb-4 pt-4">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => handlePromptCopy(workflowMapSummary.copyText, 'workflow-map-summary')}
                              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-colors hover:border-[#00DC51]/40"
                            >
                              {copiedPromptId === 'workflow-map-summary' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                              <span>{copiedPromptId === 'workflow-map-summary' ? 'Copied' : 'Copy summary'}</span>
                            </button>
                          </div>

                          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#050805] p-4 text-xs font-medium leading-relaxed text-white/88">
                            {workflowMapSummary.copyText}
                          </pre>
                        </div>
                      </details>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (workflowWizardStep === 1 && workflowScoringIndex > 0) {
                      updateWorkflowMapState((current) => ({ ...current, scoringIndex: Math.max(current.scoringIndex - 1, 0) }));
                      return;
                    }

                    updateWorkflowMapState((current) => ({ ...current, currentStep: Math.max(current.currentStep - 1, 0) }));
                  }}
                  disabled={workflowWizardStep === 0}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white/72 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Back
                </button>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (workflowWizardStep === 0) {
                        if (!canAdvanceWorkflowListStep) {
                          return;
                        }

                        updateWorkflowMapState((current) => ({
                          ...current,
                          currentStep: 1,
                          scoringIndex: 0,
                        }));
                        return;
                      }

                      if (workflowWizardStep === 1) {
                        updateWorkflowMapState((current) => {
                          if (current.scoringIndex < current.workflows.length - 1) {
                            return { ...current, scoringIndex: current.scoringIndex + 1 };
                          }

                          return { ...current, currentStep: 2 };
                        });
                        return;
                      }

                      if (workflowWizardStep === 2) {
                        updateWorkflowMapState((current) => ({ ...current, currentStep: 3 }));
                      }
                    }}
                    disabled={
                      (workflowWizardStep === 0 && !canAdvanceWorkflowListStep)
                      || (workflowWizardStep === 1 && workflowMapState.workflows.length === 0)
                      || (workflowWizardStep === 3 && !canAdvanceWorkflowPriorities)
                    }
                    className="inline-flex items-center justify-center rounded-full bg-[#00DC51] px-5 py-2.5 text-sm font-black text-black transition-all hover:bg-[#00F25B] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
                  >
                    {workflowWizardStep === 1
                      ? (isLastWorkflowScoringStep ? 'See results' : 'Next')
                      : workflowWizardStep < 3
                        ? 'Next'
                        : 'Ready to use'}
                  </button>
                  {workflowWizardStep === 0 && !canAdvanceWorkflowListStep && (
                    <p className="text-xs font-medium text-white/45">Continue unlocks once you have 3 workflows.</p>
                  )}
                  {workflowWizardStep === 3 && !canAdvanceWorkflowPriorities && (
                    <p className="text-xs font-medium text-white/45">Select 1 or 2 strong candidates to complete the exercise.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/12 bg-black/30 p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={workflowMapState.draftName}
                    onChange={(e) => updateWorkflowMapState((current) => ({ ...current, draftName: e.target.value }))}
                    placeholder="Add a workflow or process, e.g. Monthly reporting"
                    className="flex-1 rounded-2xl border-2 border-white/15 bg-black/40 px-4 py-3 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                  />
                  <button
                    onClick={() => {
                      const name = workflowMapState.draftName.trim();
                      if (!name || workflowMapState.workflows.length >= 15) {
                        return;
                      }

                      updateWorkflowMapState((current) => ({
                        ...current,
                        workflows: [
                          ...current.workflows,
                          {
                            id: `workflow-${Date.now()}-${current.workflows.length}`,
                            name,
                            repeatability: 3,
                            judgement: 3,
                          },
                        ],
                        draftName: '',
                        scoringIndex: current.workflows.length,
                      }));
                    }}
                    disabled={!workflowMapState.draftName.trim() || workflowMapState.workflows.length >= 15}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#00DC51] px-5 py-3 text-sm font-black text-black transition-all hover:bg-[#00F25B] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
                  >
                    Add workflow
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                    {workflowMapState.workflows.length} / 15 workflows mapped
                  </p>
                  <p className="text-xs font-medium text-white/45">Score repeatability and judgement for each one.</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {workflowMapState.workflows.length > 0 ? workflowMapState.workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80"
                    >
                      <span>{workflow.name}</span>
                      <button
                        onClick={() => {
                          updateWorkflowMapState((current) => {
                            const remaining = current.workflows.filter((item) => item.id !== workflow.id);
                            return {
                              ...current,
                              workflows: remaining,
                              selectedWorkflowIds: current.selectedWorkflowIds.filter((id) => id !== workflow.id),
                              scoringIndex: Math.min(current.scoringIndex, Math.max(remaining.length - 1, 0)),
                            };
                          });
                        }}
                        className="text-white/45 transition-colors hover:text-white"
                        aria-label={`Remove ${workflow.name}`}
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                    </div>
                  )) : (
                    <p className="text-sm font-medium text-white/45">Add 5 to 15 workflows to build your map.</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {workflowMapState.workflows.map((workflow, index) => {
                  const quadrantKey = getWorkflowQuadrant(workflow.repeatability, workflow.judgement);
                  const quadrant = WORKFLOW_QUADRANTS[quadrantKey];
                  const isSelected = workflowMapState.selectedWorkflowIds.includes(workflow.id);
                  const canSelect = quadrantKey === 'strongAgentCandidate';

                  return (
                    <div key={workflow.id} className={`rounded-3xl border p-5 ${quadrant.borderClass} ${quadrant.bgClass}`}>
                      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-black/35 text-xs font-black text-white/70">
                              {index + 1}
                            </span>
                            <h5 className="text-base font-black text-white">{workflow.name}</h5>
                          </div>
                          <p className={`text-xs font-bold uppercase tracking-[0.18em] ${quadrant.colorClass}`}>
                            {quadrant.label}
                          </p>
                          <p className="mt-1 text-xs font-medium text-white/55">{quadrant.guidance}</p>
                        </div>

                        <label className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${
                          canSelect
                            ? isSelected
                              ? 'border-[#00DC51] bg-[#00DC51] text-black'
                              : 'border-white/15 bg-black/30 text-white/75'
                            : 'border-white/10 bg-black/20 text-white/35'
                        }`}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={!canSelect}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              updateWorkflowMapState((current) => ({
                                ...current,
                                selectedWorkflowIds: checked
                                  ? [...current.selectedWorkflowIds.filter((id) => id !== workflow.id), workflow.id].slice(0, 2)
                                  : current.selectedWorkflowIds.filter((id) => id !== workflow.id),
                              }));
                            }}
                            className="sr-only"
                          />
                          <Target size={14} strokeWidth={2.5} />
                          <span>{canSelect ? 'Prioritise this workflow' : 'Not a first agent candidate'}</span>
                        </label>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Repeatability</span>
                            <span className="text-sm font-black text-[#00DC51]">{workflow.repeatability}/5</span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={5}
                            step={1}
                            value={workflow.repeatability}
                            onChange={(e) => {
                              const nextValue = clampScore(Number(e.target.value));
                              updateWorkflowMapState((current) => ({
                                ...current,
                                workflows: current.workflows.map((item) => item.id === workflow.id ? { ...item, repeatability: nextValue } : item),
                              }));
                            }}
                            className="w-full accent-[#00DC51]"
                          />
                          <p className="mt-2 text-xs font-medium text-white/45">1 = rare or ad hoc, 5 = frequent and highly repeatable.</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Judgement required</span>
                            <span className="text-sm font-black text-[#00DC51]">{workflow.judgement}/5</span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={5}
                            step={1}
                            value={workflow.judgement}
                            onChange={(e) => {
                              const nextValue = clampScore(Number(e.target.value));
                              updateWorkflowMapState((current) => ({
                                ...current,
                                workflows: current.workflows.map((item) => item.id === workflow.id ? { ...item, judgement: nextValue } : item),
                              }));
                            }}
                            className="w-full accent-[#00DC51]"
                          />
                          <p className="mt-2 text-xs font-medium text-white/45">1 = low judgement, 5 = high professional interpretation.</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/12 bg-[#050805] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h5 className="text-lg font-black text-white">Workflow map</h5>
                    <p className="mt-1 text-sm font-medium text-white/55">High repeatability and low judgement point to the strongest starting agents.</p>
                  </div>
                  <div className="rounded-full border border-[#00DC51]/25 bg-[#00DC51]/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#00DC51]">
                    {workflowCandidates.length} candidates
                  </div>
                </div>

                <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
                  <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
                  <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                  <div className="absolute left-4 top-4 max-w-[38%] text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFD84D]">Human-led + assistant</div>
                  <div className="absolute right-4 top-4 max-w-[38%] text-right text-[11px] font-bold uppercase tracking-[0.14em] text-[#00DC51]">Strong agent candidate</div>
                  <div className="absolute bottom-4 left-4 max-w-[38%] text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF8B8B]">Fully human-led</div>
                  <div className="absolute bottom-4 right-4 max-w-[38%] text-right text-[11px] font-bold uppercase tracking-[0.14em] text-[#7AB8FF]">Assistant task</div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Repeatability →
                  </div>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Judgement →
                  </div>

                  {workflowMapState.workflows.map((workflow) => {
                    const quadrant = WORKFLOW_QUADRANTS[getWorkflowQuadrant(workflow.repeatability, workflow.judgement)];
                    const left = ((workflow.repeatability - 1) / 4) * 100;
                    const top = (1 - ((workflow.judgement - 1) / 4)) * 100;
                    const isSelected = workflowMapState.selectedWorkflowIds.includes(workflow.id);

                    return (
                      <button
                        key={workflow.id}
                        onClick={() => {
                          if (getWorkflowQuadrant(workflow.repeatability, workflow.judgement) !== 'strongAgentCandidate') {
                            return;
                          }

                          updateWorkflowMapState((current) => {
                            const isCurrentlySelected = current.selectedWorkflowIds.includes(workflow.id);
                            return {
                              ...current,
                              selectedWorkflowIds: isCurrentlySelected
                                ? current.selectedWorkflowIds.filter((id) => id !== workflow.id)
                                : [...current.selectedWorkflowIds.filter((id) => id !== workflow.id), workflow.id].slice(0, 2),
                            };
                          });
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-3 py-2 text-[11px] font-black shadow-lg transition-all ${
                          isSelected
                            ? 'border-[#00DC51] bg-[#00DC51] text-black shadow-[#00DC51]/40'
                            : `bg-black/85 text-white ${quadrant.borderClass}`
                        }`}
                        style={{ left: `${left}%`, top: `${top}%` }}
                      >
                        {workflow.name}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {Object.entries(WORKFLOW_QUADRANTS).map(([key, quadrant]) => {
                    const count = workflowMapState.workflows.filter((workflow) => (
                      getWorkflowQuadrant(workflow.repeatability, workflow.judgement) === key
                    )).length;

                    return (
                      <div key={key} className={`rounded-2xl border p-3 ${quadrant.borderClass} ${quadrant.bgClass}`}>
                        <p className={`text-xs font-black uppercase tracking-[0.16em] ${quadrant.colorClass}`}>{quadrant.label}</p>
                        <p className="mt-1 text-sm font-semibold text-white">{count} workflow{count === 1 ? '' : 's'}</p>
                        <p className="mt-1 text-xs font-medium text-white/50">{quadrant.guidance}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-white/12 bg-black/30 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h5 className="text-lg font-black text-white">Copyable workflow summary</h5>
                    <p className="mt-1 text-sm font-medium text-white/55">Use this output to decide which workflows to test first.</p>
                  </div>
                  <button
                    onClick={() => handlePromptCopy(workflowMapSummary.copyText, 'workflow-map-summary')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-[#00DC51]/40 hover:text-white"
                  >
                    {copiedPromptId === 'workflow-map-summary' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                    <span>{copiedPromptId === 'workflow-map-summary' ? 'Copied' : 'Copy summary'}</span>
                  </button>
                </div>

                <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#050805] p-4 text-xs font-medium leading-relaxed text-white/72">
                  {workflowMapSummary.copyText}
                </pre>
              </div>
            </div>
          </div>

          )}

          {userInput && userInput !== '{}' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2 text-xs font-bold text-[#00DC51]"
            >
              <CheckCircle size={16} strokeWidth={2.5} />
              <span>Workflow map saved locally</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {isAgentSpecWizardPage && page.activity && page.activity.specFields && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-[28px] border border-white/12 bg-[#131313] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-8"
        >
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0E0E0E]">
              <Bot className="text-[#00DC51]" size={24} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#00DC51]">Activity</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h4 className="text-xl font-black text-white">{page.activity.title}</h4>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-white/72">{page.activity.prompt}</p>
            </div>
          </div>

          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              <span>Step {agentSpecCurrentStep + 1} of {agentSpecFields.length}</span>
              <span>{completedAgentSpecFields} completed</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#00DC51] transition-all"
                style={{ width: `${agentSpecFields.length > 0 ? ((agentSpecCurrentStep + 1) / agentSpecFields.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          {!agentSpecReviewMode ? (
            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[24px] border border-white/10 bg-[#101010] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">
                  {agentSpecFields[agentSpecCurrentStep]?.label}
                </p>
                <h5 className="mt-3 text-2xl font-black text-white">
                  {agentSpecFields[agentSpecCurrentStep]?.label}
                </h5>
                <p className="mt-3 text-sm font-medium leading-relaxed text-white/60">
                  {agentSpecFields[agentSpecCurrentStep]?.placeholder}
                </p>

                <div className="mt-5 grid gap-2">
                  {agentSpecFields.map((field, index) => (
                    <button
                      key={field.label}
                      onClick={() => updateAgentSpecState((current) => ({ ...current, currentStep: index, reviewMode: false }))}
                      className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition-colors ${
                        index === agentSpecCurrentStep
                          ? 'border-white/14 bg-white/[0.04] text-white'
                          : 'border-white/10 bg-black/15 text-white/60 hover:border-white/15 hover:text-white/80'
                      }`}
                    >
                      <span>{field.label}</span>
                      {(agentSpecFieldValues[`field-${index}`] || '').trim() ? (
                        <CheckCircle size={16} className="text-[#00DC51]" strokeWidth={2.5} />
                      ) : (
                        <span className="text-[11px] uppercase tracking-[0.16em] text-white/30">Pending</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#101010] p-5">
                <label className="mb-2 block text-sm font-bold text-white/90">
                  {agentSpecFields[agentSpecCurrentStep]?.label}
                </label>
                <textarea
                  value={agentSpecFieldValues[`field-${agentSpecCurrentStep}`] || ''}
                  onChange={(e) => {
                    const fieldKey = `field-${agentSpecCurrentStep}`;
                    updateAgentSpecState((current) => ({
                      ...current,
                      [fieldKey]: e.target.value,
                    }));
                  }}
                  placeholder={agentSpecFields[agentSpecCurrentStep]?.placeholder}
                  className="min-h-[240px] w-full rounded-3xl border border-white/12 bg-black/25 p-4 text-sm font-medium leading-relaxed text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                />

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      onClick={() => updateAgentSpecState((current) => ({
                        ...current,
                        currentStep: Math.max(agentSpecCurrentStep - 1, 0),
                        reviewMode: false,
                      }))}
                      disabled={agentSpecCurrentStep === 0}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-3 text-sm font-bold text-white/75 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <RotateCcw size={16} strokeWidth={2.5} />
                      Back
                    </button>

                    <button
                      onClick={clearAgentSpecAnswers}
                      disabled={!hasUsefulAgentSpecContent}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/55 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Clear answers
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => updateAgentSpecState((current) => ({
                        ...current,
                        currentStep: Math.min(agentSpecCurrentStep + 1, Math.max(agentSpecFields.length - 1, 0)),
                        reviewMode: agentSpecCurrentStep >= agentSpecFields.length - 1,
                      }))}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00DC51] px-5 py-3 text-sm font-black text-black transition-all hover:bg-[#00F25B]"
                    >
                      <span>{agentSpecCurrentStep >= agentSpecFields.length - 1 ? 'Review spec' : 'Next step'}</span>
                      <ArrowRight size={16} strokeWidth={2.8} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-[24px] border border-white/10 bg-[#101010] p-4">
                <p className="text-sm font-semibold leading-relaxed text-white/78">
                  Review the final specification, then copy it into a brief, SOP, or implementation handover.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {agentSpecFields.map((field, index) => {
                  const value = agentSpecFieldValues[`field-${index}`] || '';

                  return (
                    <button
                      key={field.label}
                      onClick={() => updateAgentSpecState((current) => ({ ...current, currentStep: index, reviewMode: false }))}
                      className="rounded-[24px] border border-white/10 bg-[#101010] p-5 text-left transition-colors hover:border-white/20"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#00DC51]">{field.label}</p>
                        {(value || '').trim() ? (
                          <CheckCircle size={16} className="text-[#00DC51]" strokeWidth={2.5} />
                        ) : (
                          <AlertCircle size={16} className="text-[#FFD84D]" strokeWidth={2.5} />
                        )}
                      </div>
                      <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-white/72">
                        {value || 'Not completed yet'}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#101010] p-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#00DC51]">Preview & copy</p>
                    <h5 className="text-lg font-black text-white">Agent specification preview</h5>
                    <p className="mt-1 text-sm font-medium text-white/55">Review the final specification, then copy it into a brief, SOP, or implementation handover.</p>
                  </div>
                  <button
                    onClick={() => handlePromptCopy(agentSpecCopyText, 'agent-spec-review-copy')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-[#00DC51]/40 hover:text-white"
                  >
                    {copiedPromptId === 'agent-spec-review-copy' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                    <span>{copiedPromptId === 'agent-spec-review-copy' ? 'Copied' : 'Copy spec'}</span>
                  </button>
                </div>

                <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-xs font-medium leading-relaxed text-white/72">
                  {agentSpecCopyText}
                </pre>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => updateAgentSpecState((current) => ({ ...current, reviewMode: false }))}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-3 text-sm font-bold text-white/75 transition-colors hover:border-white/25 hover:text-white"
                >
                  <RotateCcw size={16} strokeWidth={2.5} />
                  Edit answers
                </button>
                <button
                  onClick={clearAgentSpecAnswers}
                  disabled={!hasUsefulAgentSpecContent}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-3 text-sm font-bold text-white/55 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Clear answers
                </button>
              </div>
            </div>
          )}

          {userInput && userInput !== '{}' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2 text-xs font-bold text-[#00DC51]"
            >
              <CheckCircle size={16} strokeWidth={2.5} />
              <span>Agent specification saved locally</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {isToolMatrixPage && page.activity && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-[28px] border border-white/12 bg-[#131313] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-8"
        >
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0E0E0E]">
              <Shield className="text-[#00DC51]" size={24} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#00DC51]">Activity</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h4 className="text-xl font-black text-white">{page.activity.title}</h4>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-white/72">{page.activity.prompt}</p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
            <aside className="space-y-3 rounded-[24px] border border-white/10 bg-[#101010] p-4 sm:p-5">
              <div>
                <h5 className="text-lg font-black text-white">Tool boundaries</h5>
                <p className="mt-1 text-sm font-medium text-white/55">Select a row to define tasks, data boundaries, and review requirements.</p>
              </div>

              <div className="space-y-2">
                {toolMatrixState.rows.map((row, index) => {
                  const icons = [MessageSquare, Shield, Database, Bot];
                  const Icon = icons[index] || Lock;

                  return (
                    <button
                    key={row.id}
                    onClick={() => updateToolMatrixState((current) => ({ ...current, activeRowId: row.id }))}
                    className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                      activeToolMatrixRow?.id === row.id
                          ? 'border-white/14 bg-white/[0.04]'
                          : 'border-white/10 bg-black/20 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl ${
                          activeToolMatrixRow?.id === row.id ? 'bg-[#00DC51]/10 text-[#00DC51]' : 'bg-black/35 text-white/60'
                        }`}>
                          <Icon size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white">{row.toolName || 'Untitled tool'}</p>
                          <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-white/50">
                            {row.allowedTasks || 'Add the tasks this tool is allowed to support.'}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="space-y-5">
              {activeToolMatrixRow && (
                <div className="rounded-[24px] border border-white/10 bg-[#101010] p-5 sm:p-6">
                  <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00DC51]">Matrix row</p>
                      <h5 className="mt-2 text-2xl font-black text-white">{activeToolMatrixRow.toolName}</h5>
                      <p className="mt-2 text-sm font-medium text-white/55">Define exactly what this tool can do, what data it can use, and where review stays mandatory.</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white">Tool or category name</label>
                      <input
                        type="text"
                        value={activeToolMatrixRow.toolName}
                        onChange={(e) => {
                          const value = e.target.value;
                          updateToolMatrixState((current) => ({
                            ...current,
                            rows: current.rows.map((row) => row.id === activeToolMatrixRow.id ? { ...row, toolName: value } : row),
                          }));
                        }}
                        className="w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-3 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white">Allowed tasks</label>
                      <textarea
                        value={activeToolMatrixRow.allowedTasks}
                        onChange={(e) => {
                          const value = e.target.value;
                          updateToolMatrixState((current) => ({
                            ...current,
                            rows: current.rows.map((row) => row.id === activeToolMatrixRow.id ? { ...row, allowedTasks: value } : row),
                          }));
                        }}
                        placeholder="Define the tasks this tool is allowed to support."
                        className="min-h-[110px] w-full rounded-2xl border border-white/12 bg-black/25 p-4 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Data boundaries</label>
                        <textarea
                          value={activeToolMatrixRow.dataBoundaries}
                          onChange={(e) => {
                            const value = e.target.value;
                            updateToolMatrixState((current) => ({
                              ...current,
                              rows: current.rows.map((row) => row.id === activeToolMatrixRow.id ? { ...row, dataBoundaries: value } : row),
                            }));
                          }}
                          placeholder="What data can this tool use?"
                          className="min-h-[110px] w-full rounded-2xl border border-white/12 bg-black/25 p-4 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Review required</label>
                        <textarea
                          value={activeToolMatrixRow.reviewRequired}
                          onChange={(e) => {
                            const value = e.target.value;
                            updateToolMatrixState((current) => ({
                              ...current,
                              rows: current.rows.map((row) => row.id === activeToolMatrixRow.id ? { ...row, reviewRequired: value } : row),
                            }));
                          }}
                          placeholder="Explain where review or approval is mandatory."
                          className="min-h-[110px] w-full rounded-2xl border border-white/12 bg-black/25 p-4 text-sm font-medium text-white placeholder-white/35 outline-none transition-colors focus:border-[#00DC51]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <details className="group rounded-[24px] border border-white/10 bg-[#101010] p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <div>
                    <h5 className="text-lg font-black text-white">Preview & copy</h5>
                    <p className="mt-1 text-sm font-medium text-white/55">Use this output for internal guidance, policy notes, or staff training material.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-xs font-bold text-white/72 transition-colors group-hover:border-white/20">
                    <span>Show preview</span>
                    <ChevronDown className="transition-transform group-open:rotate-180" size={14} strokeWidth={2.8} />
                  </div>
                </summary>

                <div className="mt-4 border-t border-white/8 pt-4">
                  <div className="mb-4 flex justify-end">
                    <button
                      onClick={() => handlePromptCopy(toolMatrixSummary.copyText, 'tool-matrix-summary')}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-bold text-white/80 transition-colors hover:border-[#00DC51]/40 hover:text-white"
                    >
                      {copiedPromptId === 'tool-matrix-summary' ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                      <span>{copiedPromptId === 'tool-matrix-summary' ? 'Copied' : 'Copy matrix'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/25 p-4 text-xs font-medium leading-relaxed text-white/72">
                    {toolMatrixSummary.copyText}
                  </pre>
                </div>
              </details>
            </div>
          </div>

          {userInput && userInput !== '{}' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2 text-xs font-bold text-[#00DC51]"
            >
              <CheckCircle size={16} strokeWidth={2.5} />
              <span>Tool usage matrix saved locally</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Interactive Activity */}
      {page.activity && !isPromptLibraryPage && !isWorkflowMapPage && !isAgentSpecWizardPage && !isToolMatrixPage && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${isFinishPage
            ? 'rounded-[28px] border border-[#00DC51] bg-gradient-to-br from-[#00DC51]/14 to-[#00DC51]/5 p-6 md:p-7'
            : 'bg-gradient-to-br from-[#00DC51]/15 to-[#00DC51]/5 border-2 border-[#00DC51] rounded-2xl p-6 backdrop-blur-sm'} ${
            isCertificatePage ? 'certificate-activity-shell' : ''
          }`}
        >
          <div className={`flex items-start gap-4 mb-5 ${isCertificatePage ? 'certificate-screen-only' : ''}`}>
            <div className={`${isFinishPage
              ? 'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00DC51] shadow-lg shadow-[#00DC51]/35'
              : 'w-11 h-11 bg-[#00DC51] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00DC51]/40'}`}>
              <Lightbulb className={isFinishPage ? 'text-black' : 'text-black'} size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black text-[#00DC51] uppercase tracking-wider">Activity</span>
                <div className={`h-px flex-1 ${isFinishPage ? 'bg-[#00DC51]/30' : 'bg-[#00DC51]/30'}`} />
              </div>
              <h4 className={`font-black mb-2 ${isFinishPage ? 'text-xl text-white' : 'text-lg'}`}>{page.activity.title}</h4>
              <p className={`${isFinishPage ? 'max-w-3xl text-base text-white/72' : 'text-sm text-white/70'} font-medium leading-relaxed`}>{page.activity.prompt}</p>
            </div>
          </div>
          
          {/* Text Area for regular activities */}
          {(!page.activity.type || page.activity.type === 'text') && (
            <>
              <textarea
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
          {page.activity.type === 'multi-question' && page.activity.questions && (
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
                    <label className="text-sm font-bold text-white/90 block">
                      {index + 1}. {question}
                    </label>

                    {isFirstQuestionWithDropdown ? (
                      <select
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
              <div className="flex items-center gap-6">
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
          {page.activity.type === 'checkbox-tasks' && page.activity.checkboxTasks && (
            <div className="space-y-4">
              {page.id === 's6-days61-90' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/90 block">
                    Define your first agent workflow:
                  </label>
                  <input
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

                return (
                  <div key={taskIndex} className="bg-white/5 border-2 border-white/10 rounded-xl p-4 space-y-3">
                    {/* Task Name Input */}
                    <input
                      type="text"
                      value={taskData.label || ''}
                      onChange={(e) => {
                        const newTaskData = { ...taskData, label: e.target.value };
                        const newInputs = { ...savedInputs, [taskKey]: newTaskData };
                        onInputChange(JSON.stringify(newInputs));
                      }}
                      placeholder={page.id === 's6-days61-90' ? 'Optional: add a short name for this checklist' : task.label}
                      className="w-full bg-black/40 border-2 border-white/20 focus:border-[#00DC51] rounded-lg px-4 py-2.5 text-white placeholder-white/40 focus:outline-none font-bold transition-colors text-sm"
                    />
                    
                    {/* Checkboxes */}
                    <div className="space-y-2 pl-2">
                      {task.criteria.map((criterion, criterionIndex) => {
                        const isChecked = taskData.checks?.includes(criterion) || false;
                        
                        return (
                          <label key={criterionIndex} className="flex items-center gap-3 cursor-pointer group">
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
                            <span className="text-xs font-medium text-white/70 group-hover:text-white/90 transition-colors">
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
                    <div className="flex items-center gap-3">
                      {/* Left: Radio buttons for classification */}
                      <div className="flex-1 flex items-center gap-4">
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
          {page.activity.type === 'spec-form' && page.activity.specFields && (
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
                    <label className="text-sm font-bold text-white/90 block">
                      {field.label}:
                    </label>
                    {field.helper && (
                      <p className="text-xs text-white/60 -mt-1 mb-2">{field.helper}</p>
                    )}
                    <textarea
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
        </motion.div>
      )}

      {/* Certificate Download Button */}
      {page.id === 'certificate' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 certificate-screen-only"
        >
          <button
            onClick={handleCertificatePrint}
            className="certificate-print-button w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00DC51] text-black font-black rounded-xl hover:bg-[#00FF5F] transition-all shadow-lg shadow-[#00DC51]/40 hover:shadow-[#00DC51]/60 hover:scale-105 text-base"
          >
            <Download size={22} strokeWidth={2.5} />
            <span>Download Certificate</span>
          </button>
          <p className="text-xs text-white/50 text-center mt-3 font-medium">
            Click to print or save as PDF
          </p>
        </motion.div>
      )}

      {/* Key Takeaway */}
      {page.takeaway && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${isFinishPage
            ? 'rounded-[24px] border border-[#00DC51] bg-gradient-to-br from-[#00DC51]/14 to-[#00DC51]/5 p-5 sm:p-6'
            : 'bg-[#00DC51]/10 border-2 border-[#00DC51] rounded-2xl p-6 backdrop-blur-sm'} ${
            isCertificatePage ? 'certificate-screen-only' : ''
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`${isFinishPage
              ? 'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#00DC51] shadow-lg shadow-[#00DC51]/35'
              : 'w-11 h-11 bg-[#00DC51] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00DC51]/40'}`}>
              <Zap className={isFinishPage ? 'text-black' : 'text-black'} size={22} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className={`mb-2 text-xs font-black uppercase tracking-wider ${isFinishPage ? 'text-[#00DC51]' : 'text-[#00DC51]'}`}>Key Takeaway</div>
              <p className={`font-bold leading-relaxed ${isFinishPage ? 'text-white text-[15px] sm:text-base' : 'text-base'}`}>
                {page.id === 's6-days61-90' && page.takeaway.includes('[your answer from the activity above]')
                  ? page.takeaway.replace(
                      '[your answer from the activity above]',
                      ninetyDayWorkflowAnswer || '[your answer from the activity above]'
                    )
                  : page.takeaway}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
