import type { PlaybookPage } from '../../data/playbookData';

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

export interface GlossaryPageState {
  mode: 'lab' | 'flashcards';
  searchQuery: string;
  selectedTerm: string;
  currentFlashcardIndex: number;
  learnedTerms: string[];
  flippedTerms: string[];
}

export const DEFAULT_GLOSSARY_STATE: GlossaryPageState = {
  mode: 'lab',
  searchQuery: '',
  selectedTerm: '',
  currentFlashcardIndex: 0,
  learnedTerms: [],
  flippedTerms: [],
};

export interface GlossaryHelperContent {
  plainEnglish?: string;
  example?: string;
  watchOut?: string;
  relatedTerms?: string[];
}

export const GLOSSARY_HELPER_CONTENT: Record<string, GlossaryHelperContent> = {
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


export function buildGlossaryTerms(content: PlaybookPage['content']): GlossaryTerm[] {
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

export function parseGlossaryPageState(userInput: string) {
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
