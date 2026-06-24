export interface PlaybookPage {
  id: string;
  type: 'cover' | 'contents' | 'content' | 'summary';
  section?: string;
  title: string;
  subtitle?: string;
  image?: string;
  content: ContentBlock[];
  activity?: Activity;
  takeaway?: string;
  sections?: TableOfContentsItem[];
}

export interface ContentBlock {
  type: 'text' | 'highlight' | 'list' | 'numbered-list' | 'box' | 'quote' | 'columns';
  text?: string;
  title?: string;
  items?: any[];
  style?: 'green' | 'dark' | 'light';
  columns?: Column[];
  boxTitle?: string; // Title to show above numbered list in a box
}

export interface Column {
  title: string;
  text: string;
  icon?: string;
  highlight?: boolean;
}

export interface Activity {
  title: string;
  prompt: string;
  type?: 'text' | 'list' | 'numbered-list' | 'multi-question' | 'dropdown' | 'checkbox-tasks' | 'yes-no' | 'fill-gaps' | 'task-classification' | 'spec-form';
  listCount?: number;
  placeholderPrefix?: string; // e.g., "Task", "Area", "Action", "Workflow"
  questions?: string[]; // For multi-question activities
  dropdownOptions?: string[]; // For dropdown selection
  checkboxTasks?: { label: string; criteria: string[] }[]; // For checkbox task evaluation
  gapSentence?: string; // For fill-in-the-gaps activities
  taskCount?: number; // For task classification activities
  specFields?: { label: string; placeholder: string; helper?: string }[]; // For spec form activities
}

export interface TableOfContentsItem {
  title: string;
  sectionLabel?: string;
  pages: string;
  icon: string;
  pageNumber: string;
  startPageIndex: number;
}

export const playbook: PlaybookPage[] = [
  // COVER
  {
    id: 'cover',
    type: 'cover',
    title: 'The AI Playbook',
    content: []
  },

  // TABLE OF CONTENTS
  {
    id: 'contents',
    type: 'contents',
    title: 'Contents',
    content: [],
    sections: [
      { title: 'Understanding AI in Accountancy', sectionLabel: 'Section 1', pages: '7 pages', icon: 'BookOpen', pageNumber: '3', startPageIndex: 2 },
      { title: 'Professional Guardrails', sectionLabel: 'Section 2', pages: '10 pages', icon: 'Shield', pageNumber: '10', startPageIndex: 9 },
      { title: 'Assistants & Agents', sectionLabel: 'Section 3', pages: '11 pages', icon: 'Bot', pageNumber: '20', startPageIndex: 19 },
      { title: 'Prompting Skills', sectionLabel: 'Section 4', pages: '5 pages', icon: 'MessageSquare', pageNumber: '31', startPageIndex: 30 },
      { title: 'Pricing & Economics', sectionLabel: 'Section 5', pages: '10 pages', icon: 'DollarSign', pageNumber: '36', startPageIndex: 35 },
      { title: '90-Day Adoption Plan', sectionLabel: 'Section 6', pages: '8 pages', icon: 'Calendar', pageNumber: '46', startPageIndex: 45 },
      { title: 'Templates & Tools', sectionLabel: 'Section 7', pages: '7 pages', icon: 'FileText', pageNumber: '54', startPageIndex: 53 },
      { title: 'Completion & Certificate', sectionLabel: 'Conclusion', pages: '2 pages', icon: 'Award', pageNumber: '61', startPageIndex: 60 }
    ]
  },

  // SECTION 1: UNDERSTANDING AI
  {
    id: 's1-intro',
    type: 'content',
    section: 'Section 1: Understanding AI',
    title: 'The Shift to **AI-Assisted** Firms',
    subtitle: 'AI is not about replacing accountants—it\'s about giving you time back',
    image: 'https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhY2NvdW50YW50JTIwb2ZmaWNlJTIwbW9kZXJuJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzI2MTk3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    content: [
      {
        type: 'text',
        text: 'Over the past two decades, we\'ve seen desktop software, cloud accounting, and automation transform the profession. AI represents the next major shift—but it\'s not about replacement. It\'s about partnership.'
      },
      {
        type: 'text',
        text: 'The firms that succeed with AI won\'t be the ones that use it the most. They\'ll be the ones that use it most strategically: embedding AI into structured workflows, maintaining professional oversight, and turning recovered capacity into client value.'
      },
      {
        type: 'highlight',
        text: 'AI removes repetitive effort, improves consistency, and gives professionals more time for judgement, advice, and client relationships.'
      },
      {
        type: 'text',
        text: 'Many firms have experimented with AI—drafting emails, summarising notes, generating checklists. But experimentation alone doesn\'t create real change. What matters is structured adoption built around workflows, safeguards, and measurable outcomes.'
      },
      {
        type: 'box',
        title: 'The Real Question:',
        text: 'Not "Can we use AI?" but "How do we use AI responsibly, effectively, and profitably while maintaining professional standards?"',
        style: 'green'
      }
    ],
    activity: {
      title: 'Capacity Reflection',
      prompt: 'Reflect on where your team spends time and what you could do with that time back:',
      type: 'multi-question',
      questions: [
        'Where does your team spend the most repetitive time?',
        'What would you do if those tasks took 30-50% less time?'
      ]
    },
    takeaway: 'The firms that succeed with AI will turn time saved into better outcomes—for clients and teams.'
  },

  {
    id: 's1-stages',
    type: 'content',
    section: 'Section 1: Understanding AI',
    title: 'The Three **Stages** of AI',
    content: [
      {
        type: 'numbered-list',
        items: [
          {
            title: 'Automation',
            desc: 'Rules-based systems: bank feeds, automated postings, OCR. Predictable but limited.'
          },
          {
            title: 'AI Assistants',
            desc: 'AI helps with tasks: drafting emails, summarising info, explaining figures. Requires prompts and human direction.'
          },
          {
            title: 'AI Agents',
            desc: 'AI operates with a defined goal: performs multiple steps, works inside systems, presents results for approval.'
          }
        ]
      },
      {
        type: 'quote',
        text: 'Assistants respond. Agents act.'
      }
    ],
    activity: {
      title: 'Identify Your Stage',
      prompt: 'Which stage best describes your firm today?',
      type: 'dropdown',
      dropdownOptions: [
        'We rely on traditional processes, without automation or AI.',
        'We rely mostly on automation.',
        'We are experimenting with AI assistants.',
        'We are using AI inside some workflows.',
        'We are moving toward agent-driven processes.'
      ]
    }
  },

  {
    id: 's1-framework',
    type: 'content',
    section: 'Section 1: Understanding AI',
    title: 'The **5 Principles** of AI-Ready Firms',
    subtitle: 'The Sage AI Practice Framework',
    content: [
      {
        type: 'numbered-list',
        items: [
          {
            title: 'Start with the workflow',
            desc: 'AI works best when processes are defined and repeatable.'
          },
          {
            title: 'Keep the accountant in control',
            desc: 'AI may draft, check, summarise or prepare—but the accountant reviews, applies judgement, signs off and presses send. The accountant is the one in control.'
          },
          {
            title: 'Trust structured data over clever prompts',
            desc: 'AI output quality depends on the data, context, and process behind it, and the quality of the instructions provided. Clear prompts improve results, but clean, structured records and defined workflows create reliable AI outcomes.'
          },
          {
            title: 'Turn capacity into value',
            desc: 'Reinvest the AI dividend into client value and growth. Improve margins, deliver a better client experience, deepen client relationships, take on new clients or introduce new advisory services.'
          },
          {
            title: 'Build for agents, not just assistants',
            desc: 'Today: AI helps with individual tasks. Tomorrow: AI systems will take responsibility for defined outcomes across workflows. Firms should design clear processes, outcomes and review points, and stay open to new ways of working.'
          }
        ]
      }
    ],
    takeaway: 'Don\'t just experiment with prompts. Build structured, agent-ready processes.'
  },

  {
    id: 's1-where',
    type: 'content',
    section: 'Section 1: Understanding AI',
    title: 'Where AI **Works Best**',
    subtitle: 'AI is not equally effective at every task',
    content: [
      {
        type: 'columns',
        columns: [
          {
            title: 'AI-Ready Workflows',
            text: 'Data is structured, steps are repeatable and outcomes are predictable.\n\nExamples: Transaction reviews, anomaly detection, quarterly updates, payroll queries, variance explanations, client onboarding',
            icon: 'Bot',
            highlight: true
          },
          {
            title: 'Human-Led with AI Support',
            text: 'Requires professional judgement, ethical consideration or contextual decision-making.\n\nExamples: Tax treatments, advisory conversations, judgement-heavy decisions, ethical considerations, client negotiations',
            icon: 'Target'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'Tasks requiring human responsibility and interpretation may not be complex, but they demand professional accountability.'
      }
    ],
    activity: {
      title: 'Task Assessment',
      prompt: 'List 5 common tasks in your firm. For each, identify whether it\'s AI-ready or Human-Led, then mark your top candidates for agent automation.',
      type: 'task-classification',
      taskCount: 5
    }
  },

  {
    id: 's1-capacity',
    type: 'content',
    section: 'Section 1: Understanding AI',
    title: 'The **Capacity** Opportunity',
    subtitle: 'What to do with the time you save',
    content: [
      {
        type: 'text',
        text: 'AI doesn\'t just speed up tasks—it changes your firm\'s entire capacity. When repetitive work is reduced, turnaround times improve, stress decreases, and space opens up for higher-value work.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'What firms can do with the AI dividend:',
        items: [
          { title: 'Give it away — Reduce prices (not recommended)', icon: 'X', warning: true },
          { title: 'Keep it as margin — Same services, more profit', icon: 'DollarSign' },
          { title: 'Reinvest into value — Add insight, planning, proactive support', icon: 'TrendingUp' },
          { title: 'Invest in people & growth — Train teams, take on more clients, expand services', icon: 'Users' }
        ]
      }
    ],
    activity: {
      title: 'The Capacity Question',
      prompt: 'Consider the impact of recovered capacity on your firm:',
      type: 'multi-question',
      questions: [
        'If your firm recovered 25% of compliance time, what would you stop doing?',
        'What would you start offering or improving?',
        'Where would you invest in your team?'
      ]
    },
    takeaway: 'The most successful firms reinvest the AI dividend into client value and sustainable growth.'
  },

  {
    id: 's1-role',
    type: 'content',
    section: 'Section 1: Understanding AI',
    title: 'The **New Role** of the Accountant',
    subtitle: 'AI changes how work is done. It does not change the need for professional judgement.',
    image: 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzI0NTE0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    content: [
      {
        type: 'columns',
        columns: [
          {
            title: 'What AI Can Do Well',
            text: '✓ Draft communications\n✓ Summarise data\n✓ Check consistency\n✓ Spot errors\n✓ Prepare reports\n✓ Follow workflows',
            icon: 'Bot'
          },
          {
            title: 'What Accountants Must Still Do',
            text: '! Apply judgement\n! Make decisions\n! Interpret context\n! Advise clients\n! Strengthen relationships\n! Take responsibility',
            icon: 'Target',
            highlight: true
          }
        ]
      },
      {
        type: 'box',
        title: 'The Shift:',
        text: 'Processor → Reviewer → Adviser | Data Handler → Insight Provider → Trusted Partner',
        style: 'green'
      }
    ],
    activity: {
      title: 'Role Reflection',
      prompt: 'Think about how AI can support your work:',
      type: 'multi-question',
      questions: [
        'Which of your current tasks could AI assist with?',
        'Which responsibilities should remain fully human?'
      ]
    }
  },

  {
    id: 's1-human-loop',
    type: 'content',
    section: 'Section 1: Understanding AI',
    title: 'The **Human-in-the-Loop** Model',
    subtitle: 'AI works best as part of a controlled, supervised process',
    content: [
      {
        type: 'numbered-list',
        items: [
          {
            title: 'Step 1: Assistant or Agent',
            desc: 'AI collects information, performs checks, drafts outputs, prepares summaries'
          },
          {
            title: 'Step 2: Accountant Review',
            desc: 'The accountant reviews the results, applies judgement, makes adjustments'
          },
          {
            title: 'Step 3: Accountant Approval',
            desc: 'The accountant signs off the final output, sends it to the client or authority, and takes responsibility'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'AI performs the steps. The accountant remains accountable.'
      },
      {
        type: 'box',
        title: 'Why This Matters:',
        text: 'This model protects quality, preserves accountability, aligns with professional standards, and builds confidence in AI use.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Define Your Review Rule',
      prompt: 'At what stage must a human review AI outputs in your firm? (e.g., before anything sent to clients, before tax submissions, before final reports)',
      type: 'text'
    },
    takeaway: 'All AI-assisted work should follow a human-in-the-loop model, where the professional remains accountable for the result.'
  },

  // SECTION 2: PROFESSIONAL GUARDRAILS
  {
    id: 's2-ethics-responsibility',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'Professional **Ethics** and Responsibility in an AI World',
    subtitle: 'Your responsibilities don\'t change',
    image: 'section-opener',
    content: [
      {
        type: 'text',
        text: 'Artificial intelligence does not change the professional responsibilities of accountants. Professional codes of ethics—whether IESBA, APES, or firm-specific—make it clear that responsibility always remains with the accountant and the firm.'
      },
      {
        type: 'box',
        title: 'The PCRT Framework',
        text: 'Professional accountancy bodies worldwide follow the IESBA Code of Ethics, which establishes fundamental principles often remembered as PCRT: Professional behaviour, Confidentiality, objectivity (Respect), and inTegrity, along with professional competence and due care.',
        style: 'dark'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The Five Fundamental Principles:',
        items: [
          {
            title: 'Integrity',
            desc: 'Be honest and straightforward in all professional and business relationships.'
          },
          {
            title: 'Objectivity',
            desc: 'Do not allow bias, conflict of interest, or undue influence of others to override professional judgement.'
          },
          {
            title: 'Professional Competence and Due Care',
            desc: 'Maintain professional knowledge and skill at the level required to ensure clients receive competent professional service, and act diligently in accordance with applicable technical and professional standards.'
          },
          {
            title: 'Confidentiality',
            desc: 'Respect the confidentiality of information acquired as a result of professional relationships, and not disclose such information without proper authority unless there is a legal or professional right or duty to disclose.'
          },
          {
            title: 'Professional Behaviour',
            desc: 'Comply with relevant laws and regulations and avoid any action that discredits the profession.'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'These principles apply whether work is performed by a human, assisted by AI, or delegated to an AI agent. The accountant remains responsible.'
      },
      {
        type: 'box',
        title: 'The Practical Rule:',
        text: 'Do not send work produced by AI directly to a client, authority, or third party without checking it first. If you wouldn\'t sign it without reviewing it, you shouldn\'t send it.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Professional Judgement Reflection',
      prompt: 'Reflect on how you would apply professional judgement when using AI in your work:',
      type: 'multi-question',
      questions: [
        'What types of AI outputs would require your most careful review before sending to clients?',
        'How would you explain your AI-assisted process to a client or regulator if asked?',
        'What checks would you apply to ensure AI outputs meet your professional standards?'
      ]
    },
    takeaway: 'AI can assist the process. The professional remains responsible for the outcome.'
  },

  {
    id: 's2-data-confidentiality',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'Data and **Confidentiality** in an AI World',
    subtitle: 'Understanding data boundaries when using AI',
    content: [
      {
        type: 'text',
        text: 'Confidentiality is a cornerstone of professional accountancy. When using AI tools, accountants must be especially careful about what data is entered, where it goes, and who can access it.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Key Confidentiality Risks with AI:',
        items: [
          {
            title: 'Data sent to external AI providers',
            desc: 'Information entered into public AI tools may be stored, used for training, or accessed by third parties.'
          },
          {
            title: 'Inadequate data controls',
            desc: 'Staff may not understand which data is safe to share and which must remain confidential.'
          },
          {
            title: 'Lack of audit trail',
            desc: 'Without proper logging, firms cannot track what data was sent where, or by whom.'
          },
          {
            title: 'Client consent and disclosure',
            desc: 'Clients may not be aware their data is being processed by AI systems.'
          }
        ]
      },
      {
        type: 'box',
        title: 'The Data Boundary Principle:',
        text: 'Before entering any data into an AI system, ask:\n\n• Is this data confidential?\n• Does the AI provider store or train on this data?\n• Do I have permission to share this data with a third party?\n• Would the client be comfortable with this use?\n\nIf the answer to any question raises concern, do not proceed without proper safeguards.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'Never assume an AI tool is confidential by default. Check the provider\'s data handling policy and understand where information goes.'
      },
      {
        type: 'text',
        text: 'Many firms establish clear rules: anonymise client data before using external AI, use only approved enterprise AI tools with data protection agreements, or prohibit the use of public AI tools for client work entirely.'
      }
    ],
    activity: {
      title: 'Data Boundary Exercise',
      prompt: 'Identify which types of data in your firm should never be entered into external AI tools, and which might be acceptable with appropriate controls:',
      type: 'multi-question',
      questions: [
        'List 3 types of data that must NEVER be entered into public AI tools (e.g., client financial records, personal information)',
        'List 2 types of data that might be acceptable to enter if anonymised or de-identified (e.g., general tax questions, process templates)',
        'What safeguards would you put in place to prevent accidental data exposure through AI tools?'
      ]
    },
    takeaway: 'Confidentiality obligations do not disappear when using AI. Establish clear data boundaries and ensure your team understands them.'
  },

  {
    id: 's2-legal-responsibility',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'Legal **Responsibility** Does Not Change',
    content: [
      {
        type: 'text',
        text: 'Using AI to assist with professional work does not transfer legal responsibility to the AI provider or the technology. The accountant and the firm remain fully accountable for the work product, regardless of how it was produced.'
      },
      {
        type: 'box',
        title: 'Legal Reality:',
        text: 'If an AI-generated tax return contains errors, the accountant is responsible.\n\nIf an AI-drafted client letter misstates facts, the accountant is responsible.\n\nIf an AI-prepared report omits material information, the accountant is responsible.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: '"The AI made a mistake" is not a legal defence. Professional liability, negligence claims, and regulatory sanctions apply to the accountant, not the tool.'
      },
      {
        type: 'text',
        text: 'This principle is well-established in professional standards. The IESBA Code, APES standards, and most professional bodies worldwide are clear: when a professional delegates work—whether to a junior staff member, an outsourced provider, or an AI system—the professional remains responsible for the output.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'What This Means in Practice:',
        items: [
          {
            title: 'Review is mandatory',
            desc: 'Every AI output must be reviewed by a qualified professional before use.'
          },
          {
            title: 'Sign-off is personal',
            desc: 'The accountant who signs or sends the work is accountable for its accuracy and completeness.'
          },
          {
            title: 'Due care applies',
            desc: 'Professional standards of competence and diligence apply to AI-assisted work just as they do to manual work.'
          },
          {
            title: 'Disclosure may be required',
            desc: 'Some jurisdictions or clients may require disclosure that AI was used in preparing work.'
          }
        ]
      },
      {
        type: 'box',
        title: 'The Bottom Line:',
        text: 'AI is a tool, not a professional. Responsibility always sits with the accountant.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Responsibility Reflection',
      prompt: 'Consider how you would handle responsibility and accountability when using AI:',
      type: 'multi-question',
      questions: [
        'If an AI tool produced an error that reached a client, how would you explain what happened?',
        'What review processes would you implement to ensure you can stand behind AI-assisted work?',
        'Would you disclose to clients when AI has been used to assist with their work? Why or why not?'
      ]
    },
    takeaway: 'You cannot outsource professional responsibility. AI assists. You remain accountable.'
  },

  {
    id: 's2-risk',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'The Real **Risk**: AI Without Process',
    content: [
      {
        type: 'text',
        text: 'AI itself isn\'t the biggest risk. The real risk is unstructured AI use—staff using unapproved tools, pasting client data into personal accounts, not reviewing outputs, keeping no audit trail.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Unstructured AI Use Creates:',
        items: [
          'Inconsistent work',
          'Data risks',
          'Ethical concerns',
          'Loss of professional confidence'
        ]
      },
      {
        type: 'box',
        title: 'Why Structured Workflows Matter:',
        text: 'Accountants trust: checklists, defined processes, and repeatable steps.\n\nAI works best when: it follows those same structures, inside defined workflows, with clear human review points.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'Structure creates confidence. Confidence enables adoption. Adoption delivers value.'
      }
    ],
    activity: {
      title: 'Process Confidence Check',
      prompt: 'Think of one documented process in your firm that has clear steps and produces consistent results. Could AI assist or follow this process safely?',
      type: 'yes-no'
    }
  },

  {
    id: 's2-policy',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'The **Minimum** AI Policy',
    subtitle: 'Every firm needs this',
    content: [
      {
        type: 'text',
        text: 'Every firm needs a simple, practical AI policy. It does not need to be long or complex. But it must be clear, understood, and followed.'
      },
      {
        type: 'numbered-list',
        items: [
          {
            title: 'Approved tools',
            desc: 'Which AI systems staff are allowed to use'
          },
          {
            title: 'Prohibited data',
            desc: 'What must never be entered into AI tools'
          },
          {
            title: 'Review requirements',
            desc: 'What must be checked before outputs are used'
          },
          {
            title: 'Responsibility',
            desc: 'Who signs off the final work'
          },
          {
            title: 'Escalation',
            desc: 'What to do when AI outputs are uncertain or incorrect'
          }
        ]
      }
    ],
    activity: {
      title: 'Your Starting Rule',
      prompt: 'In our firm, AI is allowed for ___. But it must never be used for ___.',
      type: 'fill-gaps',
      gapSentence: 'In our firm, AI is allowed for ___. But it must never be used for ___.'
    }
  },

  {
    id: 's2-failure-modes',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'Common AI **Failure Modes**',
    subtitle: 'What goes wrong and how to catch it',
    content: [
      {
        type: 'text',
        text: 'AI systems fail in predictable ways. Understanding these common failure modes helps accountants recognise problems early and implement appropriate safeguards.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The Most Common AI Failures:',
        items: [
          {
            title: 'Hallucination',
            desc: 'AI generates plausible-sounding information that is factually incorrect. It may invent case law, regulations, or client details that do not exist.'
          },
          {
            title: 'Outdated information',
            desc: 'AI training data has a cut-off date. It may not know about recent law changes, tax updates, or new standards.'
          },
          {
            title: 'Misunderstanding context',
            desc: 'AI may misinterpret ambiguous instructions, overlook critical nuances, or apply general rules to exceptional situations.'
          },
          {
            title: 'Inconsistent outputs',
            desc: 'The same prompt may produce different results at different times, making outputs unreliable without human review.'
          },
          {
            title: 'Bias and assumptions',
            desc: 'AI may reflect biases present in training data or make unwarranted assumptions based on patterns rather than facts.'
          },
          {
            title: 'Overconfidence',
            desc: 'AI presents all outputs with equal confidence, even when wrong. It does not signal uncertainty the way a human would.'
          }
        ]
      },
      {
        type: 'box',
        title: 'Why This Matters:',
        text: 'A junior accountant who is unsure will ask for help. AI will not. It will deliver a confident answer whether it\'s right or wrong.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'The best defence against AI failures is structured review. Never assume AI outputs are correct without verification.'
      }
    ],
    activity: {
      title: 'Failure-Spotting Activity',
      prompt: 'Think about a recent AI output you reviewed or a type of work AI might assist with in your firm. Identify which failure modes pose the greatest risk:',
      type: 'multi-question',
      questions: [
        'Which of the six failure modes would be most dangerous in your work (e.g., hallucination in tax advice, outdated info in compliance)?',
        'What checks would you implement to catch this type of failure before it reaches a client?',
        'How would you train your team to recognise when AI outputs might be unreliable?'
      ]
    },
    takeaway: 'AI fails predictably. Build your review process to catch the most common failure modes.'
  },

  {
    id: 's2-over-reliance',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'Avoiding **Over-Reliance** on AI',
    content: [
      {
        type: 'text',
        text: 'One of the most insidious risks of AI is not that it fails, but that humans stop checking. Over-reliance occurs when professionals trust AI outputs without adequate review, assume AI is always correct, or defer judgement to the system.'
      },
      {
        type: 'box',
        title: 'The Automation Bias Problem:',
        text: 'Research shows that humans tend to trust automated systems even when they produce errors. This is called automation bias. When AI is fast, confident, and usually correct, people stop questioning it—even when it\'s wrong.',
        style: 'dark'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Signs of Over-Reliance:',
        items: [
          {
            title: 'Rubber-stamping outputs',
            desc: 'Approving AI work without meaningful review or understanding.'
          },
          {
            title: 'Skipping verification steps',
            desc: 'Assuming AI has checked facts, figures, or compliance requirements that it has not.'
          },
          {
            title: 'Deskilling',
            desc: 'Loss of competence because professionals no longer perform tasks manually and cannot recognise errors.'
          },
          {
            title: 'Blind trust in efficiency',
            desc: 'Prioritizing speed over accuracy because AI makes work faster.'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'Over-reliance is not just a risk for junior staff. Experienced professionals can fall into the same trap when AI outputs are consistently good.'
      },
      {
        type: 'box',
        title: 'The Safeguard:',
        text: 'Maintain professional scepticism. Treat AI outputs the way you would treat work from a capable but unqualified assistant: useful, but requiring review.',
        style: 'green'
      },
      {
        type: 'text',
        text: 'Firms should establish review protocols that remain in place even when AI performance is strong. This prevents erosion of review standards over time.'
      }
    ],
    activity: {
      title: 'Over-Reliance Reflection',
      prompt: 'Reflect on how you can avoid over-reliance on AI in your firm:',
      type: 'multi-question',
      questions: [
        'What review checkpoints would ensure AI outputs are always verified before use?',
        'How would you maintain professional skills and judgement in areas where AI performs most of the work?',
        'What would you do if you noticed team members routinely approving AI outputs without proper review?'
      ]
    },
    takeaway: 'Professional scepticism applies to AI just as it does to any other source of information.'
  },

  {
    id: 's2-checks',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'The **4 Output Checks**',
    subtitle: 'Before using any AI output',
    content: [
      {
        type: 'text',
        text: 'AI can draft, summarise, and suggest—but the accountant must review. These four checks ensure quality, compliance, and professional responsibility.'
      },
      {
        type: 'numbered-list',
        items: [
          {
            title: 'Accuracy',
            desc: 'Are the facts, figures, and statements correct? Does the AI output reflect reality?'
          },
          {
            title: 'Completeness',
            desc: 'Is anything missing? Are there unanswered questions? Does it address the full scope?'
          },
          {
            title: 'Professional Tone',
            desc: 'Is the wording appropriate, clear, and suitable for the client or authority?'
          },
          {
            title: 'Compliance & Ethics',
            desc: 'Does it follow professional standards, regulations, and firm policies?'
          }
        ]
      },
      {
        type: 'box',
        title: 'Why These Checks Matter:',
        text: 'AI can be confidently wrong. It can miss context. It can use inappropriate tone. Only human review catches these issues.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'Make these checks a non-negotiable part of your workflow. Every time. No exceptions.'
      },
      {
        type: 'text',
        text: 'If you wouldn\'t send it to a client without checking it, don\'t let AI skip that step. Review is not optional—it\'s professional responsibility.'
      }
    ],
    takeaway: 'Review AI outputs with the same rigor you\'d apply to your own work.'
  },

  {
    id: 's2-evidence-trail',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'Creating an AI **Evidence Trail**',
    subtitle: 'Documentation and audit requirements',
    content: [
      {
        type: 'text',
        text: 'Professional work requires documentation. When AI is involved, the audit trail becomes even more important. Firms must be able to demonstrate what AI did, what was reviewed, and who approved the final output.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Why an AI Evidence Trail Matters:',
        items: [
          {
            title: 'Professional accountability',
            desc: 'Demonstrates that proper review and oversight occurred, protecting the firm in disputes or regulatory reviews.'
          },
          {
            title: 'Quality control',
            desc: 'Allows firms to track AI performance, identify recurring errors, and refine workflows.'
          },
          {
            title: 'Client transparency',
            desc: 'Enables firms to explain their process when clients or regulators ask how work was performed.'
          },
          {
            title: 'Continuous improvement',
            desc: 'Provides data to assess which AI applications work well and which need adjustment.'
          }
        ]
      },
      {
        type: 'box',
        title: 'What to Document:',
        text: '• Which AI tool was used\n• What task it performed\n• What input/prompts were provided\n• What output it generated\n• Who reviewed the output\n• What changes were made during review\n• Who approved the final work\n• Date and context of the work',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'In many firms, this documentation takes the form of a simple AI file note attached to client records or working papers.'
      },
      {
        type: 'text',
        text: 'The evidence trail does not need to be complex, but it must be consistent. A standard template or workflow ensures that documentation happens every time AI is used, not just when someone remembers to do it.'
      },
      {
        type: 'box',
        title: 'Connection to Section 7:',
        text: 'This playbook includes a ready-to-use AI File Note Template in Section 7: Templates & Tools. That template provides a structured format for documenting AI use in client files.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Build a File Note Rule',
      prompt: 'Design a simple rule for when and how AI use should be documented in your firm:',
      type: 'multi-question',
      questions: [
        'For which types of AI-assisted work would you require a file note? (e.g., client advice, tax returns, reports)',
        'What key information should every AI file note contain?',
        'Who would be responsible for creating and reviewing these file notes?'
      ]
    },
    takeaway: 'Document AI use the same way you document other professional work. A clear audit trail protects the firm and maintains professional standards.'
  },

  {
    id: 's2-red-team',
    type: 'content',
    section: 'Section 2: Professional Guardrails',
    title: 'The **Red-Team Exercise**',
    subtitle: 'Stress-testing your AI safeguards',
    content: [
      {
        type: 'text',
        text: 'The best way to test whether your AI guardrails work is to deliberately try to break them. A red-team exercise involves simulating risky or problematic AI use to identify gaps in your policies, processes, and controls.'
      },
      {
        type: 'box',
        title: 'What is Red-Teaming?',
        text: 'Red-teaming is a practice borrowed from cybersecurity and risk management. A "red team" takes on the role of an attacker or bad actor, attempting to find weaknesses in defences. In the AI context, the red team tries to misuse AI or bypass safeguards to see what happens.',
        style: 'dark'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Red-Team Scenarios to Test:',
        items: [
          {
            title: 'Unreviewed output',
            desc: 'What if a team member sends an AI-drafted email directly to a client without checking it? Would anyone notice?'
          },
          {
            title: 'Confidential data exposure',
            desc: 'What if someone pastes client financial data into a public AI tool? Would the firm detect it?'
          },
          {
            title: 'Unapproved AI use',
            desc: 'What if a staff member uses a free AI tool not on the approved list? How would the firm find out?'
          },
          {
            title: 'Fabricated information',
            desc: 'What if AI hallucinates a regulation or case that doesn\'t exist, and the accountant doesn\'t catch it?'
          },
          {
            title: 'Missing documentation',
            desc: 'What if AI-assisted work is performed but no file note is created? Who would know?'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'The goal is not to punish mistakes—it\'s to identify where policies, training, or controls need strengthening before real problems occur.'
      },
      {
        type: 'box',
        title: 'How to Run a Red-Team Exercise:',
        text: '1. Choose 2-3 realistic risk scenarios\n2. Simulate them in a controlled way (e.g., draft a test email, use dummy data)\n3. See whether existing safeguards catch the issue\n4. Document what worked and what didn\'t\n5. Update policies, training, or controls based on findings',
        style: 'green'
      },
      {
        type: 'text',
        text: 'Red-teaming is especially valuable when a firm is rolling out new AI tools or workflows. It provides confidence that guardrails are effective, not just theoretical.'
      }
    ],
    activity: {
      title: 'Red-Team Exercise',
      prompt: 'Plan a simple red-team exercise for your firm to test AI safeguards:',
      type: 'multi-question',
      questions: [
        'Choose one realistic AI risk scenario to test (e.g., unreviewed output sent to a client, confidential data entered into a public tool)',
        'How would you simulate this scenario safely without creating real risk?',
        'What safeguards or controls should catch this issue? If they don\'t, what would you change?'
      ]
    },
    takeaway: 'Test your AI safeguards before they\'re needed. Red-teaming reveals gaps that policies alone may not catch.'
  },

  // SECTION 3: ASSISTANTS & AGENTS
  {
    id: 's3-where-assistants',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'Where **Assistants** Help',
    subtitle: 'Understanding when to use AI assistants vs. when to build agent workflows',
    image: 'section-opener',
    content: [
      {
        type: 'text',
        text: 'AI assistants are powerful tools for everyday tasks. They help accountants draft communications, summarise information, explain concepts, and check work. But assistants work best when the accountant is driving the process, not when the process itself is repeatable and structured.'
      },
      {
        type: 'columns',
        columns: [
          {
            title: 'Assistant Tasks',
            text: 'One-off requests\nVarying contexts\nHuman-directed\nRequire interpretation\n\nExamples:\n• Draft a client email\n• Explain a variance\n• Summarise meeting notes\n• Suggest ways to improve cash flow',
            icon: 'MessageSquare'
          },
          {
            title: 'Agent Workflows',
            text: 'Repeatable processes\nStructured data\nGoal-driven\nClear outcomes\n\nExamples:\n• Quarterly update preparation\n• Period-end review\n• Client onboarding\n• Outstanding item chasing',
            icon: 'Bot',
            highlight: true
          }
        ]
      },
      {
        type: 'box',
        title: 'The Key Distinction:',
        text: 'If you ask AI "help me with this one thing," it\'s an assistant task.\n\nIf you say "here\'s a goal, here\'s the data, perform these steps and show me the result," it\'s an agent workflow.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'Both are valuable. Assistants support ad-hoc work. Agents transform repeatable workflows.'
      },
      {
        type: 'text',
        text: 'Many firms make the mistake of using assistants for everything, including tasks that would benefit from structured agent workflows. This limits the impact AI can have on capacity and consistency.'
      }
    ],
    activity: {
      title: 'Assistant vs. Agent Assessment',
      prompt: 'Think about tasks you perform regularly. Classify them as assistant tasks or agent workflow candidates:',
      type: 'multi-question',
      questions: [
        'List 2 tasks that are best handled as assistant tasks (one-off, varying contexts)',
        'List 2 tasks that could become agent workflows (repeatable, structured data, clear outcomes)'
      ]
    },
    takeaway: 'Use assistants for ad-hoc tasks. Build agents for repeatable workflows.'
  },

  {
    id: 's3-difference',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: '**Assistants** vs **Agents**: The New Way Work Gets Done',
    subtitle: 'Understanding the fundamental shift',
    image: 'https://images.unsplash.com/photo-1770220742903-f113513d0194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBhaSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MXx8fHwxNzcyNTQwODMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    content: [
      {
        type: 'text',
        text: 'Most firms start with AI assistants—tools that respond to prompts and help with individual tasks. But the real transformation happens when you move to AI agents: systems that work autonomously toward defined goals.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Assistant-Led Work:',
        items: [
          {
            title: 'You define each step',
            desc: 'The accountant tells AI exactly what to do at each stage'
          },
          {
            title: 'You provide all context',
            desc: 'AI has no memory of previous interactions or access to systems'
          },
          {
            title: 'You control the sequence',
            desc: 'AI waits for your next instruction before proceeding'
          },
          {
            title: 'Output is immediate',
            desc: 'AI responds to each prompt individually'
          }
        ]
      },
      {
        type: 'numbered-list',
        boxTitle: 'Agent-Led Work:',
        items: [
          {
            title: 'You define the goal',
            desc: 'The agent determines the steps needed to achieve the outcome'
          },
          {
            title: 'Agent accesses systems',
            desc: 'It can retrieve data, check records, perform calculations within defined boundaries'
          },
          {
            title: 'Agent follows the workflow',
            desc: 'It works through the process autonomously until complete or blocked'
          },
          {
            title: 'Output is reviewed',
            desc: 'Agent presents completed work for human review and approval'
          }
        ]
      },
      {
        type: 'box',
        title: 'The Key Shift:',
        text: 'With assistants, you are the workflow engine—AI helps with tasks.\n\nWith agents, AI is the workflow engine—you define goals and review outcomes.',
        style: 'green'
      },
      {
        type: 'quote',
        text: 'Assistants respond to what you ask. Agents work toward what you want to achieve.'
      },
      {
        type: 'highlight',
        text: 'The shift from assistants to agents isn\'t just technological—it changes how work is structured, reviewed, and delivered.'
      }
    ],
    activity: {
      title: 'Identify Agent-Suitable Processes',
      prompt: 'Think about workflows in your firm that could shift from assistant-led to agent-led:',
      type: 'multi-question',
      questions: [
        'List 3 processes where you currently use AI assistants for multiple steps in sequence',
        'For each process, could an agent handle the full workflow if given a clear goal and access to the right data?',
        'What would need to be in place for you to trust an agent with this workflow (e.g., review points, escalation rules)?'
      ]
    },
    takeaway: 'Assistants support tasks. Agents complete workflows.'
  },

  {
    id: 's3-where-agents',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'Where **Agents** Transform Work',
    subtitle: 'Understanding what agents can do and where they operate best',
    content: [
      {
        type: 'text',
        text: 'Agents aren\'t suited to every task. But where they work, the impact is significant. Unlike assistants that respond to individual prompts, agents can operate autonomously within defined boundaries to achieve specific outcomes.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The Four Agent Capabilities:',
        items: [
          {
            title: 'Data retrieval',
            desc: 'Agents can access systems, pull records, gather information from multiple sources, and compile data sets for analysis.'
          },
          {
            title: 'Automated checks',
            desc: 'Agents can perform completeness checks, identify missing information, flag anomalies, compare figures, and validate consistency.'
          },
          {
            title: 'Analysis and classification',
            desc: 'Agents can analyse trends, categorise transactions, identify patterns, calculate variances, and summarise results.'
          },
          {
            title: 'Output preparation',
            desc: 'Agents can draft reports, prepare summaries, generate client communications, create workpapers, and format deliverables for review.'
          }
        ]
      },
      {
        type: 'box',
        title: 'Operating Constraints:',
        text: 'Agents work within guardrails:\n\n• They only access systems and data you authorize\n• They follow defined workflows, not improvised approaches\n• They escalate to humans when encountering uncertainty, errors, or exceptions\n• They present outputs for review—they do not send, file, or finalize work without approval',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'Agents operate with autonomy inside boundaries, not unlimited freedom. The boundaries are defined by you.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'What Makes a Strong Agent Candidate:',
        items: [
          {
            title: 'Clear outcome',
            desc: 'The goal is well-defined and measurable'
          },
          {
            title: 'Structured data',
            desc: 'Information is organised and accessible in systems'
          },
          {
            title: 'Repeatable process',
            desc: 'The workflow follows consistent steps each time'
          },
          {
            title: 'Low judgement requirement',
            desc: 'Decisions follow rules and standards, not subjective interpretation'
          },
          {
            title: 'Human review points',
            desc: 'Clear stages where accountant oversight and approval occur'
          }
        ]
      },
      {
        type: 'box',
        title: 'Examples of Strong Agent Workflows:',
        text: 'Quarterly business reviews • Period-end close support • Client onboarding • Outstanding item management • Payroll query handling • Compliance deadline tracking',
        style: 'green'
      }
    ],
    activity: {
      title: 'Agent Candidate Check',
      prompt: 'Evaluate workflows in your firm using the four-question check. For each workflow you assess, answer:',
      type: 'checkbox-tasks',
      checkboxTasks: [
        { label: 'Workflow 1', criteria: ['Is the outcome clearly defined?', 'Does it rely on structured data?', 'Is it repeated regularly?', 'Can a human review results before finalization?'] },
        { label: 'Workflow 2', criteria: ['Is the outcome clearly defined?', 'Does it rely on structured data?', 'Is it repeated regularly?', 'Can a human review results before finalization?'] },
        { label: 'Workflow 3', criteria: ['Is the outcome clearly defined?', 'Does it rely on structured data?', 'Is it repeated regularly?', 'Can a human review results before finalization?'] }
      ]
    },
    takeaway: 'If the outcome is predictable and the process is repeatable, it\'s likely a good fit for agent support.'
  },

  {
    id: 's3-workflows',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'The **Core Agent Workflows** in a Firm',
    subtitle: 'Real examples with detailed actions and review points',
    content: [
      {
        type: 'text',
        text: 'These four workflows represent the most common agent applications in accountancy firms. Each has a clear goal, relies on structured data, follows repeatable steps, and includes defined human review points.'
      },
      {
        type: 'box',
        title: '1. Quarterly Update Preparation',
        text: 'Goal: Prepare a draft quarterly business review for the accountant to review and finalise.\n\nAgent Actions:\n• Collect management accounts, bank statements, and prior quarter comparisons\n• Check completeness of data (missing months, incomplete records)\n• Analyse revenue and cost trends vs. prior periods\n• Identify significant variances (e.g., revenue down 15%, costs up 20%)\n• Flag anomalies or unexpected movements\n• Prepare draft commentary explaining key changes\n• Generate summary report with charts and comparisons\n\nReview Point: Accountant reviews the analysis, applies judgement to explanations, adds context, and approves the final update before sending to the client.',
        style: 'dark'
      },
      {
        type: 'box',
        title: '2. Period-End Preparation',
        text: 'Goal: Prepare year-end or period-end workpapers and identify items requiring accountant attention.\n\nAgent Actions:\n• Review general ledger for the period\n• Identify unusual postings or out-of-pattern transactions\n• Perform variance analysis against budget or prior period\n• Check for incomplete journal entries or missing descriptions\n• Prepare reconciliation workpapers\n• Draft variance explanations based on data patterns\n• Flag items requiring professional judgement (e.g., provisions, accruals)\n\nReview Point: Accountant reviews the workpapers, validates variance explanations, applies professional judgement to flagged items, and finalises the close.',
        style: 'dark'
      },
      {
        type: 'box',
        title: '3. Client Onboarding',
        text: 'Goal: Complete the client onboarding process and ensure all required information is collected and verified.\n\nAgent Actions:\n• Send initial welcome email and information request to new client\n• Track receipt of requested documents (ID, company records, bank details, etc.)\n• Perform completeness checks against onboarding checklist\n• Follow up on missing items with reminder emails\n• Verify information format and completeness (e.g., correct file types, readable scans)\n• Prepare onboarding status report showing what\'s complete and what\'s outstanding\n• Escalate to accountant if client is non-responsive after multiple reminders\n\nReview Point: Accountant reviews the completed onboarding file, confirms all compliance checks are satisfied, and approves the client for active service.',
        style: 'dark'
      },
      {
        type: 'box',
        title: '4. Client Chaser (Outstanding Items)',
        text: 'Goal: Manage and chase outstanding client items until resolved or escalated.\n\nAgent Actions:\n• Monitor list of outstanding items (missing invoices, unsigned documents, overdue information)\n• Send polite reminder emails at defined intervals (e.g., 7 days, 14 days)\n• Track client responses and update status\n• Identify items that remain outstanding beyond firm thresholds\n• Escalate to accountant when: client is unresponsive, item is critical and overdue, or deadline is approaching\n• Log all communications and status updates in client file\n\nReview Point: Accountant reviews escalated items and decides whether to contact the client directly, adjust timelines, or take other action.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'Each workflow has a clear outcome, structured steps, and human oversight. The agent performs the process; the accountant reviews and approves the result.'
      }
    ],
    activity: {
      title: 'Choose Your Starting Workflow',
      prompt: 'Select one of these workflows as your starting point for agent adoption:',
      type: 'multi-question',
      questions: [
        'Which workflow would have the biggest impact in your firm?',
        'What makes this workflow a good candidate? (e.g., high volume, time-consuming, repeatable)',
        'What review process would you put in place to ensure quality and accountability?'
      ]
    },
    takeaway: 'Start with one high-impact workflow. Build confidence. Expand from there.'
  },

  {
    id: 's3-workflow-map',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'The **Workflow Map**: Where Agents Work Best',
    subtitle: 'Mapping your firm\'s processes to identify agent opportunities',
    content: [
      {
        type: 'text',
        text: 'Not all workflows are equal candidates for agent automation. Some are perfectly suited; others require too much judgement, involve unstructured data, or occur too infrequently to justify the setup effort.'
      },
      {
        type: 'box',
        title: 'The Workflow Mapping Exercise:',
        text: 'This exercise helps you identify which workflows in your firm are strong agent candidates and which should remain human-led or assistant-supported.',
        style: 'green'
      },
      {
        type: 'numbered-list',
        boxTitle: 'How to Map Your Workflows:',
        items: [
          {
            title: 'Step 1: List your workflows',
            desc: 'Write down 10-15 common workflows or processes in your firm (e.g., monthly reporting, client onboarding, tax return preparation, payroll processing).'
          },
          {
            title: 'Step 2: Score each workflow',
            desc: 'For each workflow, rate it on two dimensions:\n• Repeatability (1-5): How often is this done? How consistent are the steps?\n• Judgement Requirement (1-5): How much professional interpretation is needed?'
          },
          {
            title: 'Step 3: Plot the results',
            desc: 'High repeatability + Low judgement = Strong agent candidate\nHigh repeatability + High judgement = Human-led with assistant support\nLow repeatability + Low judgement = Assistant task\nLow repeatability + High judgement = Fully human-led'
          },
          {
            title: 'Step 4: Prioritise',
            desc: 'From your strong agent candidates, choose 1-2 workflows to start with based on impact, data availability, and team readiness.'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'The goal is not to automate everything. It\'s to identify where agents create the most value with the least risk.'
      },
      {
        type: 'box',
        title: 'Common High-Impact Agent Candidates:',
        text: '• Quarterly business reviews\n• Period-end preparation\n• Client onboarding and document collection\n• Outstanding item chasing\n• Compliance deadline tracking\n• Payroll query handling\n• Expense claim review\n• Bank reconciliation support',
        style: 'dark'
      }
    ],
    activity: {
      title: 'Map Your Workflows',
      prompt: 'Complete the workflow mapping exercise for your firm:',
      type: 'multi-question',
      questions: [
        'List 5 workflows or processes you perform regularly',
        'For each, assess: Is it highly repeatable? Does it require significant professional judgement?',
        'Based on your assessment, which 2 workflows are the strongest agent candidates?'
      ]
    },
    takeaway: 'Use workflow mapping to focus agent adoption where it will have the greatest impact with the lowest risk.'
  },

  {
    id: 's3-first-agent',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'How to Choose Your **First Agent**',
    subtitle: 'Selection criteria and decision framework',
    content: [
      {
        type: 'text',
        text: 'Your first agent sets the tone for AI adoption in your firm. Choose well, and you build confidence, demonstrate value, and create momentum. Choose poorly, and you risk setbacks, skepticism, and wasted effort.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The First-Agent Selection Criteria:',
        items: [
          {
            title: 'High volume, low complexity',
            desc: 'The workflow happens frequently (weekly or monthly), but each instance is straightforward and predictable.'
          },
          {
            title: 'Clear success measures',
            desc: 'You can easily measure whether the agent succeeded (e.g., all items collected, report generated, variances identified).'
          },
          {
            title: 'Structured data',
            desc: 'The information the agent needs is already in systems, organised, and accessible.'
          },
          {
            title: 'Low risk if wrong',
            desc: 'Mistakes are caught in review before they reach clients or regulators. Errors are correctable without serious consequences.'
          },
          {
            title: 'High team frustration',
            desc: 'The workflow is repetitive, time-consuming, and tedious—staff will welcome the change.'
          },
          {
            title: 'Visible time savings',
            desc: 'Success is obvious: tasks that took hours now take minutes. The impact is tangible and immediate.'
          }
        ]
      },
      {
        type: 'box',
        title: 'What to Avoid for Your First Agent:',
        text: '✗ Workflows requiring significant judgement or interpretation\n✗ Client-facing work with no review step\n✗ Processes with incomplete or unstructured data\n✗ High-stakes compliance tasks (save these for later, once confidence is built)\n✗ Workflows that occur infrequently (annual tasks are harder to refine and optimise)',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'Your first agent should be a confidence-builder, not a stress test. Choose a workflow where success is likely and value is clear.'
      },
      {
        type: 'box',
        title: 'Recommended First-Agent Workflows:',
        text: '1. Client chaser (outstanding items)\n2. Client onboarding document collection\n3. Quarterly update preparation\n4. Expense claim review\n\nAll four are high-volume, low-risk, and have clear review points.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Select Your First Agent',
      prompt: 'Use the selection criteria to choose your first agent workflow:',
      type: 'multi-question',
      questions: [
        'Which workflow best meets the first-agent criteria? (high volume, low complexity, structured data, low risk, high frustration, visible savings)',
        'What would success look like for this agent? (How will you know it\'s working?)',
        'What review process will you implement to ensure quality before the agent\'s outputs reach clients?'
      ]
    },
    takeaway: 'Start with a high-volume, low-risk workflow. Build confidence. Expand systematically from there.'
  },

  {
    id: 's3-maturity',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'The Agent **Maturity Ladder**',
    subtitle: 'Your progression path',
    content: [
      {
        type: 'numbered-list',
        items: [
          {
            title: 'Stage 1 - Prompts',
            desc: 'Staff use AI to answer questions or draft text. Work is still entirely human-led.'
          },
          {
            title: 'Stage 2 - Assistants',
            desc: 'AI is used regularly for defined tasks. It helps with drafting, checking, and summarising, while the accountant remains in control.'
          },
          {
            title: 'Stage 3 - Workflow Packs',
            desc: 'Prompts, checklists, and processes are standardised across the firm. Work becomes more consistent and repeatable.'
          },
          {
            title: 'Stage 4 - Agents',
            desc: 'AI operates inside systems to achieve defined goals or outputs. It can perform multiple steps, gather information, carry out checks, and prepare results for review.'
          },
          {
            title: 'Stage 5 - Orchestrated Agents',
            desc: 'Multiple agents work together across systems. They coordinate tasks, share data, and deliver end-to-end outcomes across entire workflows.'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'AI maturity is not about using smarter prompts. It is about moving from manual effort, to assisted tasks, to goal-driven agent outcomes.'
      },
      {
        type: 'box',
        title: 'Where to Focus:',
        text: 'Most firms should aim to reach Stage 3-4 (Workflow Packs to Agents) within 90 days.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Identify Your Stage',
      prompt: 'Plan your progression on the maturity ladder:',
      type: 'multi-question',
      questions: [
        'Which stage are you at today?',
        'What\'s your target for 90 days from now?'
      ],
      dropdownOptions: [
        'Stage 1 - Prompts',
        'Stage 2 - Assistants',
        'Stage 3 - Workflow Packs',
        'Stage 4 - Agents',
        'Stage 5 - Orchestrated Agents'
      ]
    }
  },

  {
    id: 's3-spec',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'The **Agent Spec** Template',
    subtitle: 'Define your agent clearly',
    content: [
      {
        type: 'text',
        text: 'Before introducing an agent, define the workflow clearly using this structured template. A well-defined spec ensures your agent operates reliably within guardrails and produces consistent results.'
      },
      {
        type: 'highlight',
        text: 'Every agent needs: a clear goal, defined inputs, specific behaviours, human review points, and escalation rules.'
      }
    ],
    activity: {
      title: 'Plan Your First Agent',
      prompt: 'Complete the agent specification template for your first workflow:',
      type: 'spec-form',
      specFields: [
        { 
          label: 'Workflow name', 
          placeholder: 'e.g., Quarterly update preparation',
          helper: ''
        },
        { 
          label: 'Goal or outcome', 
          placeholder: 'What result should the agent achieve?',
          helper: ''
        },
        { 
          label: 'Trigger', 
          placeholder: 'What starts the process?',
          helper: ''
        },
        { 
          label: 'Inputs required', 
          placeholder: 'What information or data is needed?',
          helper: ''
        },
        { 
          label: 'Agent behaviour', 
          placeholder: 'e.g., gather data, run checks, identify issues, prepare outputs',
          helper: 'What types of actions is the agent expected to perform?'
        },
        { 
          label: 'Human review point', 
          placeholder: 'Where does the accountant step in?',
          helper: 'What must be reviewed before anything is finalised?'
        },
        { 
          label: 'Final output', 
          placeholder: 'e.g., draft update, exception report, completed return',
          helper: 'What does the agent produce?'
        },
        { 
          label: 'Escalation rules', 
          placeholder: 'e.g., missing data, unusual results, policy breaches',
          helper: 'When must the agent stop and alert a human?'
        }
      ]
    },
    takeaway: 'Start with a workflow where the goal is clear, data is structured, and review steps are defined.'
  },

  {
    id: 's3-controls',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'The **Agent Controls** Checklist',
    subtitle: 'Safeguards to implement before deploying any agent',
    content: [
      {
        type: 'text',
        text: 'Agents operate with autonomy, which creates efficiency—but also risk if not properly controlled. Before deploying an agent, ensure these controls are in place.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The Agent Controls Checklist:',
        items: [
          {
            title: '1. Goal and scope definition',
            desc: 'The agent has a clearly defined goal, and operates only within the specified workflow or process. It does not improvise or extend beyond its defined boundaries.'
          },
          {
            title: '2. Data access controls',
            desc: 'The agent can only access systems and data it needs for the workflow. Access is limited to read-only where possible, and write access is restricted and logged.'
          },
          {
            title: '3. Escalation rules',
            desc: 'The agent knows when to stop and alert a human: missing data, anomalies, errors, threshold breaches, or anything outside normal parameters.'
          },
          {
            title: '4. Human review point',
            desc: 'Every agent output is reviewed by a qualified professional before it is sent to a client, filed with authorities, or treated as final.'
          },
          {
            title: '5. Audit trail',
            desc: 'All agent actions are logged: what it accessed, what it did, what it produced, and who reviewed the output. This log is stored and retrievable.'
          },
          {
            title: '6. Output validation',
            desc: 'Agent outputs are checked for accuracy, completeness, professional tone, and compliance with firm policies and professional standards.'
          },
          {
            title: '7. Fallback process',
            desc: 'If the agent fails, encounters an error, or produces unusable output, there is a defined manual process to complete the work.'
          },
          {
            title: '8. Performance monitoring',
            desc: 'Agent performance is tracked over time: success rate, time saved, error rate, escalation frequency, and user satisfaction.'
          }
        ]
      },
      {
        type: 'box',
        title: 'Connection to Agent Spec Template:',
        text: 'The Agent Spec Template (previous page) defines what the agent does. The Agent Controls Checklist defines the safeguards that ensure it operates safely and reliably.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'Controls are not optional. They are the guardrails that allow agents to operate with autonomy while maintaining professional standards and accountability.'
      }
    ],
    activity: {
      title: 'Control Assessment',
      prompt: 'For your planned first agent, check which controls are already in place and which need to be implemented:',
      type: 'checkbox-tasks',
      checkboxTasks: [
        {
          label: 'My First Agent Controls',
          criteria: [
            'Goal and scope clearly defined',
            'Data access controls in place',
            'Escalation rules established',
            'Human review point defined',
            'Audit trail implemented',
            'Output validation process ready',
            'Fallback process documented',
            'Performance monitoring planned'
          ]
        }
      ]
    },
    takeaway: 'Controls create confidence. Implement them before deploying your first agent, not after problems occur.'
  },

  {
    id: 's3-confidence',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'Building **Confidence** in Agents',
    subtitle: 'How to create trust in agent-driven workflows',
    content: [
      {
        type: 'text',
        text: 'Confidence in agents doesn\'t happen automatically. It\'s built through visibility, control, and consistent positive outcomes. Firms that succeed with agents focus on building trust deliberately and systematically.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'How to Build Confidence:',
        items: [
          {
            title: 'Start with low-risk processes',
            desc: 'Choose workflows where mistakes are caught in review, consequences are low, and success is easy to measure. Build confidence before tackling higher-stakes work.'
          },
          {
            title: 'Maintain visibility',
            desc: 'Accountants must be able to see what the agent did, why it made certain decisions, and what data it used. Transparency builds trust; black boxes do not.'
          },
          {
            title: 'Keep humans in control',
            desc: 'Agents prepare; humans approve. Review points ensure that professional judgement remains in the workflow and final accountability sits with the accountant.'
          },
          {
            title: 'Implement clear review processes',
            desc: 'Define exactly what gets reviewed, by whom, and using what criteria (e.g., the 4 Output Checks from Section 2). Consistency in review creates confidence in the process.'
          },
          {
            title: 'Monitor outcomes',
            desc: 'Track agent performance: time saved, error rates, escalation frequency, team feedback. Use this data to refine workflows and demonstrate value.'
          },
          {
            title: 'Expand gradually',
            desc: 'Move from one agent to multiple workflows only after the first agent has proven reliable. Gradual expansion reduces risk and builds organisational confidence.'
          }
        ]
      },
      {
        type: 'box',
        title: 'What Builds Trust Fastest:',
        text: 'Consistent, visible success.\n\nWhen an agent reliably produces good outputs, when review processes work smoothly, and when accountants see tangible time savings—confidence grows naturally.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'Confidence is earned through performance, not promises. Let results speak.'
      }
    ],
    activity: {
      title: 'Confidence-Building Plan',
      prompt: 'Design a confidence-building approach for your first agent:',
      type: 'multi-question',
      questions: [
        'What low-risk workflow will you start with to build confidence?',
        'What control or review process will help your team trust the agent\'s outputs?',
        'How will you measure success? (e.g., time saved, error rate, user satisfaction)'
      ]
    },
    takeaway: 'Confidence comes from visibility, control, and consistent success. Build it deliberately.'
  },

  {
    id: 's3-ai-workflow',
    type: 'content',
    section: 'Section 3: Assistants & Agents',
    title: 'The **AI-Enabled Workflow**',
    subtitle: 'What the future of accountancy work looks like',
    content: [
      {
        type: 'text',
        text: 'The future of accountancy is not "humans replaced by AI." It\'s humans and AI working together in structured, goal-driven workflows where each does what they do best.'
      },
      {
        type: 'box',
        title: 'The AI-Enabled Workflow Model:',
        text: '1. Accountant defines the goal and constraints\n2. Agent retrieves data, performs checks, analyses results, prepares outputs\n3. Accountant reviews agent outputs, applies professional judgement, makes adjustments\n4. Accountant approves and finalises work\n5. Agent handles follow-up tasks (filing, documentation, status updates)\n\nThe accountant remains in control. The agent handles execution.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'AI doesn\'t replace the accountant. It changes what the accountant spends time on: less execution, more judgement and advice.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'What Changes in AI-Enabled Workflows:',
        items: [
          {
            title: 'Speed',
            desc: 'Work that took hours now takes minutes. Turnaround times improve dramatically.'
          },
          {
            title: 'Consistency',
            desc: 'Agents follow the same process every time. Outputs are more uniform and reliable.'
          },
          {
            title: 'Capacity',
            desc: 'Accountants have more time for client relationships, advisory work, and strategic thinking.'
          },
          {
            title: 'Scalability',
            desc: 'Firms can take on more clients or expand services without proportional increases in headcount.'
          }
        ]
      },
      {
        type: 'box',
        title: 'What Doesn\'t Change:',
        text: '• Professional responsibility remains with the accountant\n• Judgement, ethics, and client relationships remain human\n• Regulatory and compliance obligations are unchanged\n• Review and sign-off are still required',
        style: 'dark'
      },
      {
        type: 'quote',
        text: 'AI-enabled workflows don\'t eliminate the accountant. They free the accountant to focus on what machines cannot do: interpret, advise, and build trust.'
      }
    ],
    activity: {
      title: 'Envision Your AI-Enabled Workflow',
      prompt: 'Imagine one of your current workflows reimagined as an AI-enabled process:',
      type: 'multi-question',
      questions: [
        'Choose a workflow you perform regularly. Describe how it works today (manual steps, time required).',
        'Reimagine it as an AI-enabled workflow: What would the agent handle? What would you review and approve?',
        'What would you do with the time saved? (e.g., more advisory work, better client service, business development)'
      ]
    },
    takeaway: 'The AI-enabled workflow is not a distant future. It\'s happening now in leading firms. The question is: when will you start building it?'
  },

  // SECTION 4: PROMPTING SKILLS
  {
    id: 's4-framework',
    type: 'content',
    section: 'Section 4: Prompting Skills',
    title: 'The Accountant\'s **Prompt Framework**',
    subtitle: 'How to get better results from AI assistants',
    image: 'section-opener',
    content: [
      {
        type: 'text',
        text: 'A vague question produces a vague answer. A structured prompt produces a useful result. Most people ask AI to "help with something" and get generic outputs. Accountants who use a simple framework get outputs they can actually use.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Every Effective Prompt Has 4 Parts:',
        items: [
          {
            title: '1. Role',
            desc: 'Tell AI who it should act as. This sets the professional context and tone.\n\nExamples:\n• "You are a bookkeeper..."\n• "You are a tax accountant..."\n• "You are a business advisor..."\n• "You are a practice manager..."'
          },
          {
            title: '2. Task',
            desc: 'State clearly what you want AI to do. Be specific.\n\nExamples:\n• "Draft an email explaining..."\n• "Summarise this report into..."\n• "Create a checklist for..."\n• "Review this document and check..."'
          },
          {
            title: '3. Context',
            desc: 'Provide the situation, background, or data AI needs to understand the request.\n\nExamples:\n• "For a retail client whose revenue has dropped 20% this quarter..."\n• "The client is a sole trader with no employees..."\n• "This is for a first-time limited company director..."\n• "The client has just received an HMRC compliance check notice..."'
          },
          {
            title: '4. Constraints',
            desc: 'Set rules, limits, or format requirements. This keeps outputs professional and appropriate.\n\nExamples:\n• "Keep it under 100 words"\n• "Use a reassuring, professional tone"\n• "Avoid technical jargon"\n• "Format as a bullet-point list"\n• "Do not mention specific figures"'
          }
        ]
      },
      {
        type: 'box',
        title: 'Complete Example:',
        text: 'Role: "You are an accountant."\n\nTask: "Draft a short, professional email to a retail client explaining that their quarterly profit has decreased."\n\nContext: "The decrease is due to higher supplier costs, which increased by 15% this quarter."\n\nConstraints: "Keep it under 120 words and use a supportive tone."',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'Role + Task + Context + Constraints = A prompt that produces useful, professional outputs.'
      },
      {
        type: 'box',
        title: 'Why This Works:',
        text: 'Without structure, AI guesses what you want. With structure, AI knows exactly what to produce and how to produce it.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Rewrite a Weak Prompt',
      prompt: 'Practice applying the framework by rewriting this weak prompt into a structured one:',
      type: 'multi-question',
      questions: [
        'Weak prompt: "Write an email about the results." — Rewrite this using Role + Task + Context + Constraints to make it specific and useful.',
        'What role would you give AI?',
        'What task should it perform?',
        'What context does it need?',
        'What constraints would improve the output (e.g., tone, length, format)?'
      ]
    },
    takeaway: 'Structured prompts produce structured results. Role + Task + Context + Constraints is your foundation.'
  },

  {
    id: 's4-types',
    type: 'content',
    section: 'Section 4: Prompting Skills',
    title: 'The Five **Prompt Types** Every Accountant Should Know',
    subtitle: 'Mastering these five covers most accounting use cases',
    content: [
      {
        type: 'text',
        text: 'Accountants use AI for a limited set of tasks—not infinite possibilities. Mastering five core prompt types will cover 90% of everyday AI use in a firm.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The Five Prompt Types:',
        items: [
          {
            title: '1. Draft Prompts',
            desc: 'Use AI to create client communications, reports, letters, or explanations.\n\nWhen to use: You need to communicate information to a client, authority, or colleague.\n\nExample: "You are an accountant. Draft a professional email to a retail client explaining that their quarterly profit has decreased due to higher supplier costs. Keep it under 100 words and use a supportive tone."'
          },
          {
            title: '2. Summary Prompts',
            desc: 'Use AI to condense long documents, meeting notes, reports, or data into key points.\n\nWhen to use: You have too much information and need to extract what matters.\n\nExample: "You are an accountant. Summarise this 12-page board report into 5 key points for the finance committee. Focus on financial performance and major risks."'
          },
          {
            title: '3. Explanation Prompts',
            desc: 'Use AI to simplify complex concepts, regulations, or technical information for clients.\n\nWhen to use: A client asks about something they don\'t understand, or you need to explain a technical matter in plain language.\n\nExample: "You are a tax accountant. Explain what R&D tax credits are to a small manufacturing client who has never claimed them before. Use simple language and avoid jargon."'
          },
          {
            title: '4. Check Prompts',
            desc: 'Use AI to review work for errors, completeness, consistency, or compliance.\n\nWhen to use: You want a second pair of eyes on a document, form, or process before finalizing.\n\nExample: "You are a bookkeeper. Review this expense claim for completeness. Check that all receipts are dated, amounts match the claim form, and expense categories are appropriate."'
          },
          {
            title: '5. Question Prompts',
            desc: 'Use AI to answer technical questions, look up information, or provide guidance.\n\nWhen to use: You need information quickly or want to confirm your understanding of a rule, process, or requirement.\n\nExample: "You are a tax accountant. What are the current VAT registration thresholds in the UK? When must a business register?"'
          }
        ]
      },
      {
        type: 'box',
        title: 'Why These Five?',
        text: 'Most AI use in accountancy falls into these categories:\n\n• Drafting client communications\n• Summarizing reports or data\n• Explaining complex topics\n• Checking work for errors\n• Answering technical questions\n\nMaster these five, and you cover the majority of everyday assistant use.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'You don\'t need to memorize hundreds of prompts. You need to recognise which of the five types fits the situation.'
      }
    ],
    activity: {
      title: 'Prompt Type Exercise',
      prompt: 'Reflect on recent tasks where AI could have helped. For each situation below, identify which of the five prompt types would have been most useful:',
      type: 'multi-question',
      questions: [
        'A client asked you what Making Tax Digital (MTD) means and whether it applies to them. Which prompt type? (Draft, Summary, Explanation, Check, or Question)',
        'You have a 20-page management report and need to present the highlights to a client in a 5-minute call. Which prompt type?',
        'You need to send a client an update on their year-end accounts, which are delayed due to missing invoices. Which prompt type?',
        'You want to verify that a tax return has all required fields completed before submission. Which prompt type?',
        'You need to confirm the current Corporation Tax rate for a small company. Which prompt type?'
      ]
    },
    takeaway: 'Five prompt types—Draft, Summary, Explanation, Check, Question—cover most accounting AI use. Learn these, and you have a toolkit for everyday work.'
  },

  {
    id: 's4-practice',
    type: 'content',
    section: 'Section 4: Prompting Skills',
    title: 'Prompt **Practice**: From Basic to Structured',
    subtitle: 'See the difference structure makes',
    content: [
      {
        type: 'text',
        text: 'The best way to understand the value of structured prompts is to compare outputs. A basic prompt produces generic results. A structured prompt produces outputs you can actually use.'
      },
      {
        type: 'box',
        title: 'Example 1: Client Email',
        text: '❌ Basic Prompt:\n"Write an email to a client about their accounts."\n\nProblem: Too vague. AI doesn\'t know what to say, what tone to use, or how long it should be.\n\n✓ Structured Prompt:\n"You are an accountant. Draft a professional email to a retail client explaining that their year-end accounts are ready for review. Let them know the accounts show a 10% revenue increase compared to last year. Keep it under 80 words and use a positive, client-friendly tone."\n\nResult: Specific, professional, ready to review and send.',
        style: 'dark'
      },
      {
        type: 'box',
        title: 'Example 2: Explaining a Concept',
        text: '❌ Basic Prompt:\n"What is MTD?"\n\nProblem: AI will give a general definition, not client-ready language.\n\n✓ Structured Prompt:\n"You are a bookkeeper. Explain what Making Tax Digital (MTD) for VAT means to a small business owner who has never heard of it. Use simple language, avoid jargon, and keep the explanation under 100 words."\n\nResult: Client-ready explanation, appropriate tone, right length.',
        style: 'dark'
      },
      {
        type: 'box',
        title: 'Example 3: Checking Work',
        text: '❌ Basic Prompt:\n"Check this document."\n\nProblem: AI doesn\'t know what to check for.\n\n✓ Structured Prompt:\n"You are a bookkeeper. Review this expense claim and check for the following: all receipts are dated, amounts on receipts match the claim form, expense categories are appropriate for a small retail business, and VAT is correctly identified. List any issues you find."\n\nResult: Specific, actionable feedback based on clear criteria.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'The difference between basic and structured prompts is the difference between "AI tried" and "AI delivered."'
      },
      {
        type: 'text',
        text: 'Structured prompts take 20 seconds longer to write. But they save minutes—or hours—by producing outputs that don\'t need major rework.'
      }
    ],
    activity: {
      title: 'Basic-to-Structured Practice',
      prompt: 'Take these basic prompts and rewrite them as structured prompts using Role + Task + Context + Constraints:',
      type: 'multi-question',
      questions: [
        'Basic: "Summarise this report." — Rewrite as a structured prompt.',
        'Basic: "Draft an email to the client." — Rewrite as a structured prompt.',
        'Basic: "Explain Corporation Tax." — Rewrite as a structured prompt.'
      ]
    },
    takeaway: 'Basic prompts waste time. Structured prompts deliver usable results. The 20 seconds spent structuring a prompt saves hours of rework.'
  },

  {
    id: 's4-progression',
    type: 'content',
    section: 'Section 4: Prompting Skills',
    title: 'From **Prompts** to Workflows to **Agents**',
    subtitle: 'The progression path most firms follow',
    content: [
      {
        type: 'text',
        text: 'AI adoption usually follows a simple progression.'
      },
      {
        type: 'numbered-list',
        items: [
          {
            title: 'Individual Prompts',
            desc: 'Staff use AI:\n• Occasionally\n• For specific tasks'
          },
          {
            title: 'Standard Prompts',
            desc: 'The firm:\n• Documents useful prompts\n• Shares them internally\n• Builds consistency'
          },
          {
            title: 'Workflow Packs',
            desc: 'Prompts become part of:\n• Checklists\n• Procedures\n• Defined processes\n\nAI is now embedded into the workflow.'
          },
          {
            title: 'Agents',
            desc: 'The workflow is:\n• Structured\n• Goal-driven\n• Executed by an agent\n\nAgents may still use prompts internally to perform tasks.\n\nThe accountant:\n• Defines the goal or outcome\n• Reviews the result\n• Approves and advises'
          }
        ]
      },
      {
        type: 'box',
        title: 'Core Message:',
        text: 'Prompts are the starting point.\nWorkflows create consistency.\nAgents create transformation.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Workflow Progression',
      prompt: 'Choose one task you currently perform and map its progression:',
      type: 'multi-question',
      questions: [
        'What prompt could assist this task?',
        'How could it become part of a checklist?',
        'Could it eventually become an agent workflow?'
      ]
    },
    takeaway: 'Don\'t stop at prompts. Build them into workflows, then let agents handle the execution.'
  },

  {
    id: 's4-library',
    type: 'content',
    section: 'Section 4: Prompting Skills',
    title: 'Your **Starter Prompt Library**',
    subtitle: 'Ready-to-use prompts for common accounting tasks',
    content: [
      {
        type: 'text',
        text: 'You don\'t need to write every prompt from scratch. This starter library provides tested, professional prompts for the most common accounting tasks. Copy them, adapt them, and use them as templates for your own prompts.'
      },
      {
        type: 'box',
        title: '1. Draft Client Email - Accounts Ready',
        text: '"You are an accountant. Draft a professional email to [CLIENT NAME], a [CLIENT TYPE] client, letting them know their [ACCOUNTS TYPE] are now ready for review. Mention that [KEY FINDING - e.g., revenue increased by X%, profit margin improved]. Keep it under 100 words and use a positive, client-friendly tone."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '2. Draft Client Email - Missing Information',
        text: '"You are a bookkeeper. Draft a polite, professional email to [CLIENT NAME] requesting [SPECIFIC ITEMS - e.g., missing bank statements for March, supplier invoices]. Explain that we need these to complete their [TASK - e.g., VAT return, year-end accounts]. Keep it under 80 words and use a friendly but clear tone."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '3. Draft Client Email - Deadline Reminder',
        text: '"You are an accountant. Draft a reminder email to [CLIENT NAME] about an upcoming deadline for [TASK - e.g., Self-Assessment tax return, Corporation Tax payment]. The deadline is [DATE]. Keep it under 60 words, use a helpful tone, and remind them what action they need to take."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '4. Explain a Tax Concept',
        text: '"You are a tax accountant. Explain [CONCEPT - e.g., Capital Gains Tax, IR35, VAT Flat Rate Scheme] to a [CLIENT TYPE - e.g., sole trader, first-time company director] who has never encountered this before. Use simple language, avoid jargon, and keep it under 120 words."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '5. Summarise Financial Results',
        text: '"You are an accountant. Summarise the key financial results from [DOCUMENT TYPE - e.g., management accounts, year-end report] for [CLIENT NAME]. Focus on: revenue performance, profit or loss, major cost changes, and cash position. Present as 4-5 bullet points suitable for a client meeting."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '6. Check for Completeness',
        text: '"You are a bookkeeper. Review [DOCUMENT TYPE - e.g., this expense claim, this invoice, this timesheet] and check for completeness. Verify: all required fields are filled in, amounts are clear and legible, dates are present, and [SPECIFIC REQUIREMENT - e.g., VAT is correctly identified, receipts are attached]. List any issues or missing items."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '7. Draft Variance Explanation',
        text: '"You are an accountant. Draft a brief explanation for why [METRIC - e.g., revenue, costs, profit] changed by [AMOUNT/PERCENTAGE] compared to [COMPARISON PERIOD - e.g., last quarter, prior year]. Base the explanation on [DATA/CONTEXT - e.g., higher supplier costs, seasonal demand]. Keep it under 60 words and use professional language suitable for a client report."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '8. Create a Checklist',
        text: '"You are a practice manager. Create a checklist for [PROCESS - e.g., client onboarding, year-end close, VAT return preparation] for a [CLIENT TYPE - e.g., small limited company, sole trader with employees]. Include all key steps, required documents, and deadlines. Format as a numbered list."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '9. Answer a Technical Question',
        text: '"You are a tax accountant. What is [QUESTION - e.g., the current VAT registration threshold, the deadline for Self-Assessment registration, the Corporation Tax rate for small companies]? Provide a clear, factual answer with the current figures and any relevant conditions."',
        style: 'dark'
      },
      {
        type: 'box',
        title: '10. Draft Meeting Summary',
        text: '"You are an accountant. Summarise the key points from a client meeting about [TOPIC - e.g., year-end planning, tax strategy, business growth]. Include: decisions made, actions required, deadlines, and who is responsible for each action. Format as bullet points under clear headings."',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'These prompts are templates. Replace the [BRACKETED PLACEHOLDERS] with your specific details, and you have a professional, structured prompt ready to use.'
      },
      {
        type: 'text',
        text: 'As you use these prompts, you\'ll notice patterns. You\'ll start adapting them without thinking. Eventually, structured prompts become second nature—not because you\'ve memorized them, but because you\'ve practiced them.'
      },
      {
        type: 'box',
        title: 'How to Use This Library:',
        text: '1. Choose the prompt type that matches your task\n2. Copy the template\n3. Replace the [PLACEHOLDERS] with your specific details\n4. Run the prompt and review the output\n5. Refine if needed\n6. Save successful adaptations to your firm\'s internal library',
        style: 'green'
      }
    ],
    activity: {
      title: 'Build Your Prompt Library',
      prompt: 'Start building your own prompt library based on the tasks you perform most often:',
      type: 'multi-question',
      questions: [
        'Choose one prompt from the starter library above. Adapt it to a real task you have this week by filling in the placeholders.',
        'Identify one task you perform regularly that is NOT in the starter library. Write a new structured prompt for it using Role + Task + Context + Constraints.',
        'Where will you store your firm\'s prompt library so the team can access and share useful prompts?'
      ]
    },
    takeaway: 'A good prompt library is not built overnight. Start with these 10, adapt them to your work, and add new ones as you discover what works.'
  },

  // SECTION 5: PRICING & ECONOMICS
  {
    id: 's5-dividend',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'Understanding the **AI Dividend**',
    subtitle: 'AI creates capacity. Firms must decide what to do with it.',
    image: 'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjUzNDkzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    content: [
      {
        type: 'text',
        text: 'Artificial intelligence changes the economics of accounting work. When repetitive tasks are reduced, work takes less time, errors decrease, turnaround improves, and capacity is created. This is not a marginal gain—it is a fundamental shift in how value is produced.'
      },
      {
        type: 'highlight',
        text: 'This is known as the AI dividend—the efficiency gained when assistants help with tasks and agents take over structured workflows.'
      },
      {
        type: 'box',
        title: 'Where the Dividend Comes From:',
        text: 'In most firms, AI reduces time spent on:\n\n• Data checking and reconciliation\n• Drafting client communications\n• Chasing clients for missing information\n• Preparing summaries and variance reports\n• Reviewing standard compliance outputs\n• Repetitive period-end steps\n\nThis creates time that did not exist before.',
        style: 'green'
      },
      {
        type: 'text',
        text: 'The key insight is this: if a task previously took three hours and now takes forty minutes, the firm has not just saved time. It has recovered two hours and twenty minutes that can be directed elsewhere. Multiplied across all clients, all workflows, and all team members—the dividend is substantial.'
      },
      {
        type: 'text',
        text: 'But capacity alone is not the goal. What matters is what you do with it.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Four Ways to Use the AI Dividend:',
        items: [
          {
            title: 'Give it away',
            desc: 'Reduce prices to pass efficiency savings to clients. This is the most common mistake. It erodes margin without creating any new value, and trains clients to expect lower prices every time technology improves.',
            icon: 'X',
            warning: true
          },
          {
            title: 'Keep it as margin',
            desc: 'Deliver the same services, with the same fees, at lower cost. The firm is more profitable. This is a legitimate short-term strategy, particularly for firms under cost pressure.',
            icon: 'DollarSign'
          },
          {
            title: 'Reinvest into value',
            desc: 'Use recovered time to add insight, planning, and proactive support. Do more for the same clients. Improve the quality and depth of the service they receive.',
            icon: 'TrendingUp'
          },
          {
            title: 'Invest in growth',
            desc: 'Train teams, expand services, take on more clients, develop advisory capability. The firm grows without proportionally growing its cost base.',
            icon: 'Users'
          }
        ]
      },
      {
        type: 'quote',
        text: 'The most successful firms reinvest the dividend into client value and sustainable growth—not lower prices.'
      },
      {
        type: 'box',
        title: 'The Strategic Decision:',
        text: 'The AI dividend is a one-time windfall only if you give it away. If you reinvest it—into better services, deeper relationships, and scalable capacity—it compounds over time.',
        style: 'dark'
      }
    ],
    activity: {
      title: 'Identify Your AI Dividend',
      prompt: 'List 3 areas where AI could reduce time, remove repetition, or improve consistency in your firm. For each, note what you would do with the time recovered:',
      type: 'list',
      listCount: 3,
      placeholderPrefix: 'Area'
    },
    takeaway: 'AI creates capacity. Strategic firms turn that capacity into client value, not just lower prices.'
  },

  {
    id: 's5-capacity-question',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'The **Capacity Question**',
    subtitle: 'What will your firm do when AI gives time back?',
    content: [
      {
        type: 'text',
        text: 'Most conversations about AI focus on what it can do. The more important question for firm leaders is: what will we do differently once it starts doing it?'
      },
      {
        type: 'text',
        text: 'Capacity is only valuable if it is directed. A firm that recovers 25% of its compliance time and fills it with more compliance work at the same price has not progressed. A firm that uses that time to deepen client relationships, introduce advisory services, or take on better-fit clients has transformed its business.'
      },
      {
        type: 'box',
        title: 'The Three Directions for Recovered Capacity:',
        text: '1. Deepen existing client relationships — More frequent contact, proactive insights, faster turnaround\n\n2. Develop new services — Financial planning, cash flow forecasting, tax strategy, advisory packages\n\n3. Grow the client base — Take on new clients without adding proportionate headcount',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'Recovered capacity is not a bonus. It is a strategic resource. Firms that treat it as such build sustainable competitive advantage.'
      },
      {
        type: 'text',
        text: 'The firms that lead in the AI era are not necessarily those that adopt AI earliest. They are those that are most deliberate about what they do with the capacity AI creates. They have a clear answer to the capacity question before AI even goes live.'
      },
      {
        type: 'box',
        title: 'The Capacity Question in Practice:',
        text: 'If your firm recovered 25% of its compliance processing time this year—what would change?\n\n• Which clients would get more attention?\n• Which new services would you introduce?\n• Which team members would you develop?\n• What would your firm look like in 12 months?',
        style: 'dark'
      }
    ],
    activity: {
      title: 'The Capacity Question',
      prompt: 'Consider the impact of recovered capacity on your firm:',
      type: 'multi-question',
      questions: [
        'If your firm recovered 25% of compliance time, what would you stop doing or reduce?',
        'What new services, activities, or client relationships would you invest that time in?',
        'Where would you develop your team—and which skills would matter most in an AI-assisted firm?'
      ]
    },
    takeaway: 'Answer the capacity question before AI goes live. Firms with a clear plan for recovered time get far more from AI adoption.'
  },

  {
    id: 's5-time-pricing',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'Why **Time-Based Pricing** Becomes Unstable',
    subtitle: 'The structural problem with hourly billing in an AI world',
    content: [
      {
        type: 'text',
        text: 'Time-based pricing is the oldest and most common billing model in professional services. You charge for the hours spent. The more work required, the higher the fee. The model is intuitive and easy to explain.'
      },
      {
        type: 'text',
        text: 'But AI breaks its logic.'
      },
      {
        type: 'box',
        title: 'The Core Problem:',
        text: 'If AI reduces the time required to complete a task, a time-based firm faces a direct choice:\n\n• Charge less (because less time was spent) — revenue falls\n• Charge the same (but the client knows AI sped it up) — trust erodes\n• Charge more per hour (to maintain revenue) — harder to justify\n\nNone of these outcomes is comfortable. The model becomes structurally unstable.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'Time-based pricing turns efficiency into a penalty. The better your AI, the lower your revenue—unless the pricing model changes.'
      },
      {
        type: 'text',
        text: 'This is not a hypothetical. Firms charging by the hour for data entry, reconciliation, basic compliance work, and document preparation are already seeing this pressure. As AI handles more of the manual processing, hourly fees for those tasks face increasing client scrutiny.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Why Hourly Billing Becomes Harder:',
        items: [
          {
            title: 'Transparency increases',
            desc: 'Clients are becoming more aware that AI can complete tasks faster. They begin to question whether they are paying for the accountant\'s expertise or for the time a machine spent on their file.'
          },
          {
            title: 'Efficiency creates pressure',
            desc: 'Firms that invest in AI and become more efficient should be rewarded, not penalized. Hourly billing reverses this incentive—the faster you work, the less you earn.'
          },
          {
            title: 'Value is decoupled from time',
            desc: 'A 20-minute conversation that saves a client £50,000 in tax is worth far more than 20 minutes of billing time. Time is an increasingly poor proxy for value.'
          },
          {
            title: 'Market comparison accelerates',
            desc: 'As AI commoditises compliance work, price comparison becomes easier. Hourly rates are visible and comparable. Value is not.'
          }
        ]
      },
      {
        type: 'box',
        title: 'The Strategic Response:',
        text: 'Firms that move away from time-based pricing toward fixed, value-based, or outcome-based models can capture the full benefit of AI efficiency—without giving it away through lower hourly fees.',
        style: 'green'
      },
      {
        type: 'quote',
        text: 'The question is not how long it took. The question is what it was worth.'
      }
    ],
    activity: {
      title: 'Pricing Pressure Reflection',
      prompt: 'Think about your current pricing model and where AI might create pressure:',
      type: 'multi-question',
      questions: [
        'Which services in your firm are currently charged by the hour? How much of that time is spent on tasks AI could assist with?',
        'If AI reduced your time on those tasks by 40%, what would happen to your revenue under the current model?',
        'What would you need to change about your pricing to ensure AI efficiency improves your margin rather than reducing your fees?'
      ]
    },
    takeaway: 'Time-based pricing turns AI efficiency into a revenue problem. Moving toward fixed or value-based models captures the benefit instead.'
  },

  {
    id: 's5-pricing',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'The **Four Pricing Models** in an AI World',
    subtitle: 'Understanding which model fits your firm and where you want to go',
    content: [
      {
        type: 'text',
        text: 'There is no single right pricing model for every firm. But AI changes the economics of each model differently. Understanding the options—and how AI affects each—is essential to making a deliberate choice about your firm\'s direction.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The Four Models:',
        items: [
          {
            title: 'Time-based pricing',
            desc: 'The firm charges by the hour for work performed. Revenue is directly tied to time spent.\n\nAI impact: As AI reduces processing time, hourly revenue falls unless rates increase. Efficiency becomes a penalty. This model becomes increasingly difficult to sustain for high-volume compliance work.'
          },
          {
            title: 'Fixed compliance pricing',
            desc: 'The firm charges a set fee for defined deliverables—annual accounts, tax returns, payroll, bookkeeping. The fee is agreed upfront, regardless of time spent.\n\nAI impact: AI improves margin directly. The fee stays the same; the cost of delivery falls. This is the most immediate pricing benefit from AI adoption.'
          },
          {
            title: 'Outcome-based pricing',
            desc: 'The firm charges based on results delivered—tax saved, costs reduced, growth achieved, problems solved. Fees are tied to client outcomes, not firm effort.\n\nAI impact: AI helps firms deliver better outcomes more consistently. Pricing reflects the value of the result, not the process used to get there.'
          },
          {
            title: 'Tiered value pricing',
            desc: 'The firm offers structured service tiers with different price points, covering different levels of service, support, and advisory depth.\n\nAI impact: AI enables firms to deliver the lower tiers (compliance and reporting) more efficiently, freeing capacity to deepen the higher tiers (advisory and strategic).\n\nThe tiers:\n• Core — Compliance, bookkeeping, reporting. AI handles much of the processing.\n• Growth — Core services plus regular reviews, cash flow support, tax planning.\n• Strategic — Full advisory partnership. Proactive planning, board-level support, business guidance.'
          }
        ]
      },
      {
        type: 'box',
        title: 'The Direction of Travel:',
        text: 'Most firms are moving from time-based toward fixed compliance pricing as an immediate step, and toward tiered value pricing as a longer-term goal.\n\nThe AI-era firm captures efficiency gains through fixed pricing and captures advisory value through tiered packages.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'The goal is not to abandon compliance pricing. It is to ensure compliance is priced for profitability while advisory value is priced for growth.'
      }
    ],
    activity: {
      title: 'Pricing Model Review',
      prompt: 'Reflect honestly on your firm\'s current and ideal pricing approach:',
      type: 'multi-question',
      questions: [
        'Which pricing model best describes how your firm prices most of its services today? (Time-based pricing, Fixed compliance pricing, Outcome-based pricing, or Tiered value pricing)',
        'Which model do you want to move toward over the next 12–24 months? What would need to change to get there?',
        'For your tiered value model: what services would belong in Core, Growth, and Strategic tiers for your typical client?'
      ]
    },
    takeaway: 'Choose your pricing model deliberately. AI rewards fixed and value-based pricing. Time-based pricing punishes efficiency.'
  },

  {
    id: 's5-shift',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'The Shift from **Effort** to **Judgement**',
    subtitle: 'What clients are really paying for is changing',
    content: [
      {
        type: 'text',
        text: 'For most of the profession\'s history, the value accountants delivered was inseparable from the effort they invested. Doing the work, in detail and at scale, was the service. Clients paid for the time and processing that produced a reliable, accurate result.'
      },
      {
        type: 'text',
        text: 'AI fundamentally changes this relationship.'
      },
      {
        type: 'columns',
        columns: [
          {
            title: 'The Old Value Model',
            text: '• Time — hours invested in producing the work\n• Processing — data entry, checking, reconciling, calculating\n• Task completion — returns filed, accounts prepared, payroll run\n\nValue was measured in volume and effort.',
            icon: 'Clock'
          },
          {
            title: 'The New Value Model',
            text: '• Availability — accessible, responsive, proactive\n• Judgement — applying expertise to complex situations\n• Experience — pattern recognition built over years of practice\n• Insight — spotting what the numbers mean, not just what they say\n• Confidence — giving clients certainty in uncertain situations\n\nValue is measured in outcomes and relationships.',
            icon: 'Target',
            highlight: true
          }
        ]
      },
      {
        type: 'highlight',
        text: 'AI can process. AI can check. AI can prepare. But AI cannot replace the confidence a client feels when a trusted adviser says: "Here\'s what I think you should do, and here\'s why."'
      },
      {
        type: 'text',
        text: 'This is the core insight that should shape how AI-era firms price their services. When AI handles the processing, the firm\'s value becomes even more concentrated in the elements that are irreducibly human: the judgement, the relationship, and the professional accountability that comes with it.'
      },
      {
        type: 'box',
        title: 'The Pricing Implication:',
        text: 'Firms that price for effort will struggle as AI reduces visible effort.\n\nFirms that price for outcomes, relationships, and expertise will thrive—because those elements become more visible and more valuable as AI commoditises processing.',
        style: 'dark'
      },
      {
        type: 'quote',
        text: 'Pricing should reflect this shift. Charge for the outcomes you enable, not just the hours you log.'
      }
    ],
    activity: {
      title: 'The 70% Question',
      prompt: 'If AI handled 70% of the processing in your firm, what would clients still pay you for? List three specific things—be as concrete as possible:',
      type: 'list',
      listCount: 3,
      placeholderPrefix: 'Clients would still pay for'
    },
    takeaway: 'The shift from effort to judgement is the central pricing challenge of the AI era. Build your model around what only humans can deliver.'
  },

  {
    id: 's5-3v-framework',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'The **3V Pricing Framework**',
    subtitle: 'A practical framework for pricing in the AI era',
    content: [
      {
        type: 'text',
        text: 'Pricing decisions are rarely simple. Firms must balance what clients will pay, what the work costs to deliver, and what the outcome is worth. The 3V Pricing Framework provides a structured way to think through all three dimensions before setting a price.'
      },
      {
        type: 'box',
        title: 'The Three Vs:',
        text: 'Every pricing decision should consider Volume, Value, and Visibility.',
        style: 'green'
      },
      {
        type: 'numbered-list',
        items: [
          {
            title: 'V1 — Volume',
            desc: 'What is the scope and complexity of the work?\n\nConsider: How much data? How many entities? How frequently? How complex is the compliance situation? What is the risk profile?\n\nAI impact: AI reduces the cost and time of high-volume, repeatable work. Volume alone is a weaker justification for price than it once was. The floor price for compliance is falling.'
          },
          {
            title: 'V2 — Value',
            desc: 'What outcome does the client receive—and what is that outcome worth to them?\n\nConsider: What tax savings result from good planning? What risk is removed by accurate compliance? What decisions are enabled by timely reporting? What growth is supported by good advisory work?\n\nAI impact: AI can help deliver more value more consistently. Firms that use AI to deepen client outcomes can justify stronger value-based pricing.'
          },
          {
            title: 'V3 — Visibility',
            desc: 'How clearly does the client see and understand the value you deliver?\n\nConsider: Do clients understand what you do and why it matters? Do they see the effort, expertise, and insight that goes into their work? Do they know what problems you are preventing?\n\nAI impact: As AI makes processing invisible, the value of advisory and relationship work must be made explicit. Clients who cannot see value do not pay for it.'
          }
        ]
      },
      {
        type: 'box',
        title: 'Using the Framework:',
        text: 'For each service or client relationship, ask:\n\n1. What is the volume and complexity? (Sets your floor price)\n2. What outcomes and value does the client receive? (Sets your ceiling)\n3. How visible is that value to the client? (Determines how close to the ceiling you can price)\n\nThe gap between your floor and ceiling is your pricing opportunity.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'Most firms undercharge because they price for Volume alone. The 3V Framework ensures Value and Visibility shape the price as well.'
      },
      {
        type: 'box',
        title: 'The AI Era Shift:',
        text: 'V1 (Volume) matters less — processing costs are falling.\n\nV2 (Value) matters more — advisory outcomes are increasingly differentiated.\n\nV3 (Visibility) matters most — clients who cannot see your value will not pay for it.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Apply the 3V Framework',
      prompt: 'Choose one service or client relationship and apply the 3V Framework:',
      type: 'multi-question',
      questions: [
        'V1 — Volume: What is the scope and complexity of the work for this service or client?',
        'V2 — Value: What outcomes, savings, or benefits does the client actually receive from this service?',
        'V3 — Visibility: How clearly does the client see and understand the value you deliver? What could you do to make it more visible?'
      ]
    },
    takeaway: 'Price for Volume, Value, and Visibility. In an AI world, V2 and V3 matter most.'
  },

  {
    id: 's5-packages',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'Designing **AI-Era Service Packages**',
    subtitle: 'Building Core, Growth, and Strategic tiers',
    content: [
      {
        type: 'text',
        text: 'Tiered service packaging is not new to professional services. But AI changes what belongs in each tier—and what is possible to deliver profitably at each price point.'
      },
      {
        type: 'text',
        text: 'The AI-era firm uses AI to make compliance and reporting more efficient, freeing capacity to deepen advisory services. This creates natural tiers: clients who want reliable compliance at a fair price, clients who want regular advisory support alongside compliance, and clients who want a genuine strategic partnership.'
      },
      {
        type: 'box',
        title: 'Core Package — Reliable Compliance',
        text: 'What\'s included:\n• Annual accounts and tax returns\n• Bookkeeping and VAT returns\n• Payroll processing\n• Statutory compliance\n• Cloud accounting setup and support\n• Email and phone support for routine queries\n\nAI role: AI handles much of the data processing, checking, and drafting. The firm delivers reliable, accurate compliance efficiently.\n\nPricing basis: Fixed annual fee based on size, complexity, and entity type.',
        style: 'dark'
      },
      {
        type: 'box',
        title: 'Growth Package — Informed Decisions',
        text: 'What\'s included:\n• Everything in Core\n• Quarterly management accounts and review meetings\n• Cash flow monitoring and forecasting\n• Tax planning and proactive advice\n• KPI reporting and performance tracking\n• Priority response times\n• Annual business review\n\nAI role: AI prepares draft reports, identifies variances, and flags issues. The accountant focuses on interpretation, conversation, and advice.\n\nPricing basis: Fixed fee, typically 30–60% above Core, depending on frequency and complexity of advisory work.',
        style: 'dark'
      },
      {
        type: 'box',
        title: 'Strategic Package — Trusted Partnership',
        text: 'What\'s included:\n• Everything in Growth\n• Monthly or more frequent reviews\n• Strategic financial planning and modelling\n• Board reporting and investor-ready financials\n• Funding and growth support\n• Direct access to a senior adviser\n• Ad-hoc project work included or discounted\n• Proactive regulatory and opportunity monitoring\n\nAI role: AI handles background data processing and reporting infrastructure. The accountant serves as a genuine strategic partner.\n\nPricing basis: Higher fixed retainer or outcome-based elements. Priced for relationship depth, not service volume.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'AI makes Core more profitable and Growth more deliverable. The Strategic tier becomes the differentiator—where human judgement and relationships create irreplaceable value.'
      },
      {
        type: 'box',
        title: 'Positioning the Tiers:',
        text: 'Core: "We handle everything you\'re required to do, accurately and on time."\n\nGrowth: "We handle compliance and help you make better decisions throughout the year."\n\nStrategic: "We are your financial partner—here whenever you need us, proactively working on your behalf."',
        style: 'green'
      }
    ],
    activity: {
      title: 'Design Your Package',
      prompt: 'Draft the three service tiers for your firm using the framework above:',
      type: 'multi-question',
      questions: [
        'Core Package: What services would you include? What would you charge? What is the AI role in delivery?',
        'Growth Package: What advisory services would you add? What is the price uplift over Core? What does the client receive that they cannot get from Core alone?',
        'Strategic Package: What makes this your premium offer? Who are your ideal Strategic clients, and what do they need most from you?'
      ]
    },
    takeaway: 'Tiered packaging lets you serve different clients appropriately while creating a clear upgrade path from compliance to advisory.'
  },

  {
    id: 's5-impact-exercise',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'The **AI Impact Pricing Exercise**',
    subtitle: 'Mapping the financial impact of AI across your services',
    content: [
      {
        type: 'text',
        text: 'Before restructuring pricing, it helps to understand exactly where AI creates efficiency in your firm—and what that efficiency is worth. This exercise maps the time, cost, and pricing implications of AI across your key services.'
      },
      {
        type: 'text',
        text: 'For each service, you need to understand four things: how long it takes today, how long it will take with AI assistance, what human value remains after AI does its work, and what the pricing implication is.'
      },
      {
        type: 'box',
        title: 'How to Complete the Exercise:',
        text: 'For each service or task type in your firm:\n\n1. Estimate the current time to complete (e.g., 6 hours for a standard set of accounts)\n2. Estimate the time with AI assistance (e.g., 3.5 hours)\n3. Identify what human activity remains and why it matters (e.g., review, judgement, client conversation)\n4. Decide the pricing implication: maintain fee (improve margin), increase fee (if value increases), or restructure (move to fixed/tiered model)\n\nThis gives you a clear picture of where AI improves economics and where pricing changes are needed.',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'The goal is not to lower prices because AI is faster. It is to understand where margin improves, where you can invest more advisory time, and where pricing needs to evolve.'
      },
      {
        type: 'box',
        title: 'Example Completed Row:',
        text: 'Service: Quarterly VAT return\nTime today: 2.5 hours\nTime with AI: 1.0 hours\nHuman value remaining: Exception review, client query handling, professional sign-off\nPricing implication: Maintain fixed fee — margin improves by 60% per return',
        style: 'dark'
      }
    ],
    activity: {
      title: 'AI Impact Pricing Worksheet',
      prompt: 'Complete the AI Impact Pricing Exercise for three services in your firm. For each, estimate time today, time with AI, the human value that remains, and the pricing implication:',
      type: 'spec-form',
      specFields: [
        {
          label: 'Service 1 — Name',
          placeholder: 'e.g., Annual accounts, VAT returns, Payroll, Tax return',
          helper: 'Identify a common service in your firm'
        },
        {
          label: 'Service 1 — Time today',
          placeholder: 'e.g., 6 hours per client per year',
          helper: 'How long does this currently take on average?'
        },
        {
          label: 'Service 1 — Estimated time with AI',
          placeholder: 'e.g., 3 hours (50% reduction)',
          helper: 'How long would this take with AI assistance?'
        },
        {
          label: 'Service 1 — Human value remaining',
          placeholder: 'e.g., Review, judgement calls, client conversation, professional sign-off',
          helper: 'What human activity is still required and why does it matter?'
        },
        {
          label: 'Service 1 — Pricing implication',
          placeholder: 'e.g., Maintain fixed fee (margin improves), or move to tiered package',
          helper: 'What does this mean for how you price this service?'
        },
        {
          label: 'Service 2 — Name',
          placeholder: 'e.g., Quarterly management accounts, Bookkeeping, Payroll',
          helper: ''
        },
        {
          label: 'Service 2 — Time today',
          placeholder: 'e.g., 4 hours per quarter',
          helper: ''
        },
        {
          label: 'Service 2 — Estimated time with AI',
          placeholder: 'e.g., 2 hours (50% reduction)',
          helper: ''
        },
        {
          label: 'Service 2 — Human value remaining',
          placeholder: 'e.g., Variance analysis, client insight, advisory conversation',
          helper: ''
        },
        {
          label: 'Service 2 — Pricing implication',
          placeholder: 'e.g., Increase fee (more advisory value delivered), restructure to Growth package',
          helper: ''
        },
        {
          label: 'Service 3 — Name',
          placeholder: 'e.g., Client onboarding, Year-end close, Tax planning review',
          helper: ''
        },
        {
          label: 'Service 3 — Time today',
          placeholder: 'e.g., 8 hours per new client',
          helper: ''
        },
        {
          label: 'Service 3 — Estimated time with AI',
          placeholder: 'e.g., 4.5 hours',
          helper: ''
        },
        {
          label: 'Service 3 — Human value remaining',
          placeholder: 'e.g., Relationship building, professional judgement, complex queries',
          helper: ''
        },
        {
          label: 'Service 3 — Pricing implication',
          placeholder: 'e.g., Reduce onboarding costs, invest savings in client relationship depth',
          helper: ''
        }
      ]
    },
    takeaway: 'The AI Impact Pricing Exercise turns abstract efficiency gains into concrete pricing decisions. Complete it before restructuring fees.'
  },

  {
    id: 's5-client-talk',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: '**Talking to Clients** About AI',
    subtitle: 'How to communicate AI use confidently and professionally',
    content: [
      {
        type: 'text',
        text: 'One of the most common concerns firms have about using AI is how clients will react. Will they feel undervalued? Will they expect lower prices? Will they trust outputs that AI assisted with?'
      },
      {
        type: 'text',
        text: 'The answer depends almost entirely on how you frame it. Firms that apologise for AI use, or that treat it as a secret, create exactly the anxiety they are trying to avoid. Firms that communicate AI use confidently—as a professional enhancement, not a shortcut—find that most clients respond positively.'
      },
      {
        type: 'box',
        title: 'The Core Messaging Principle:',
        text: 'Position AI as a tool that helps your team do more for clients—not as a replacement for the expertise, judgement, and relationships that clients value.\n\nThe message is: "AI handles more of the routine processing, which means our team spends more time on what matters most to you—reviewing, advising, and being available."',
        style: 'green'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Client Messaging Guidance:',
        items: [
          {
            title: 'Lead with benefit, not process',
            desc: 'Don\'t start by explaining how AI works. Start by explaining what it means for the client.\n\nInstead of: "We\'re now using AI to process your data."\nSay: "We\'ve invested in tools that help our team turn your figures around faster and catch issues earlier."'
          },
          {
            title: 'Be clear that professional oversight remains',
            desc: 'Clients want to know that a qualified professional is still responsible for their work. Emphasise that AI assists but accountants review, approve, and sign off.\n\nSay: "Every output is reviewed by one of our qualified team before it reaches you. AI helps with the processing. We handle the judgement."'
          },
          {
            title: 'Address the price question proactively',
            desc: 'If you are maintaining fees while AI improves efficiency, be ready to explain why.\n\nSay: "Our investment in better technology means we can spend more time on your accounts, not less. You\'re getting more adviser time, not less of it."'
          },
          {
            title: 'Avoid defensive or apologetic language',
            desc: 'Saying "We hope you don\'t mind that we use AI" signals that something is wrong. Position it as a professional enhancement, not a compromise.'
          },
          {
            title: 'Match the conversation to the client',
            desc: 'Tech-savvy clients may want to understand more about your tools. Traditional clients may simply want reassurance that quality and relationships are unchanged. Read the room and adapt accordingly.'
          }
        ]
      },
      {
        type: 'box',
        title: 'Sample Client Language:',
        text: '"As part of our ongoing investment in the quality and responsiveness of our service, we use AI-assisted tools to help with data processing, report preparation, and routine checking. All work is reviewed and approved by a qualified member of our team before it reaches you. This means faster turnaround, fewer errors, and more time for the conversations that matter."\n\nAdapt this for your firm\'s tone and client relationships.',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'Clients trust firms, not tools. Position AI as an enhancement to your professional service—not a replacement for it.'
      }
    ],
    activity: {
      title: 'Draft Your Client Message',
      prompt: 'Prepare how you would talk to clients about AI use in your firm:',
      type: 'multi-question',
      questions: [
        'Write a 2–3 sentence statement explaining how your firm uses AI, suitable for including in a client engagement letter or service update.',
        'How would you respond if a client asked: "Does this mean you\'re charging me the same for work that now takes half the time?"',
        'Which clients in your firm might need the most reassurance about AI use? What specific concerns might they have, and how would you address them?'
      ]
    },
    takeaway: 'Confident, client-focused communication about AI builds trust. Silence or defensiveness creates the concerns you are trying to avoid.'
  },

  {
    id: 's5-action-checklist',
    type: 'content',
    section: 'Section 5: Pricing & Economics',
    title: 'Pricing **Action Checklist**',
    subtitle: 'Your practical next steps on pricing and economics',
    content: [
      {
        type: 'text',
        text: 'Use this checklist to work through the pricing and economics decisions your firm needs to make as AI adoption progresses. Not all items will apply immediately—some are immediate actions, others are 3–12 month goals.'
      },
      {
        type: 'box',
        title: 'How to Use This Checklist:',
        text: 'Work through each item and mark it as:\n\n✓ Done — Already in place\n→ In progress — Working on it\n○ To do — Not yet started\n\nRevisit this checklist every quarter as your AI adoption progresses.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Pricing Action Checklist',
      prompt: 'Review each area and check off what your firm has already addressed. Use this as your pricing roadmap for the next 12 months:',
      type: 'checkbox-tasks',
      checkboxTasks: [
        {
          label: 'Understanding the AI Dividend',
          criteria: [
            'I have identified at least 3 services where AI will reduce processing time',
            'I have decided how to reinvest recovered capacity (margin, value, or growth)',
            'I have NOT committed to passing AI savings to clients as lower prices'
          ]
        },
        {
          label: 'Reviewing Current Pricing Model',
          criteria: [
            'I know which pricing model best describes my firm today',
            'I have identified which services are time-based and most at risk from AI efficiency pressure',
            'I have a clear direction for where I want my pricing model to go'
          ]
        },
        {
          label: 'Moving Away from Time-Based Billing',
          criteria: [
            'I have identified at least one service to convert from hourly to fixed-fee pricing',
            'I understand how to set a fixed fee that improves margin when AI reduces delivery time',
            'I have communicated the change to relevant clients'
          ]
        },
        {
          label: 'Designing Service Packages',
          criteria: [
            'I have drafted a Core (compliance) package with a defined scope and fixed price',
            'I have drafted a Growth (advisory) package with clear additions over Core',
            'I have defined a Strategic tier for my highest-value client relationships'
          ]
        },
        {
          label: 'Completing the AI Impact Pricing Exercise',
          criteria: [
            'I have mapped current vs. AI-assisted time for at least 3 key services',
            'I understand where AI improves margin and where pricing needs to change',
            'I have a plan for repricing services where the model is no longer sustainable'
          ]
        },
        {
          label: 'Preparing for Client Conversations',
          criteria: [
            'I have a clear statement explaining how my firm uses AI',
            'I can respond confidently to "why are you charging the same if AI does the work?"',
            'I have identified which clients need proactive reassurance about AI use'
          ]
        },
        {
          label: 'Applying the 3V Framework',
          criteria: [
            'I price for Volume (scope/complexity), Value (client outcomes), and Visibility (perceived value)',
            'I have reviewed at least one client relationship using all three lenses',
            'I have a plan to make my value more visible to clients who may not fully appreciate what they receive'
          ]
        }
      ]
    },
    takeaway: 'Pricing in an AI era is a deliberate choice, not a default. Use this checklist to make that choice systematically and confidently.'
  },

  // SECTION 6: 90-DAY PLAN
  {
    id: 's6-days1-30',
    type: 'content',
    section: 'Section 6: 90-Day Plan',
    title: 'The First **30 Days**: Build the Foundations',
    subtitle: 'Clarity, control, and confidence',
    image: 'section-opener',
    content: [
      {
        type: 'text',
        text: 'The first 30 days are about clarity, control, and confidence. You are not trying to transform the entire firm. You are building a safe, structured starting point.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Your 30-day priorities:',
        items: [
          {
            title: '1. Choose approved AI tools',
            desc: 'Decide which tools staff can use, and which are not allowed.'
          },
          {
            title: '2. Create a simple AI policy',
            desc: 'Define what AI can be used for, what data must never be entered, and what review is required.'
          },
          {
            title: '3. Identify three assistant use cases',
            desc: 'Choose tasks such as drafting client emails, summarising notes, or explaining variances.'
          },
          {
            title: '4. Nominate two AI champions',
            desc: 'Select team members who will test tools, share prompts, and support colleagues.'
          }
        ]
      },
    ],
    activity: {
      title: 'Your 30-Day Action Plan',
      prompt: 'Check off each milestone as you complete it, then define your commitment:',
      type: 'checkbox-tasks',
      checkboxTasks: [
        {
          label: '30-Day Checklist',
          criteria: [
            'Approved tools selected',
            'AI policy written',
            'Three assistant use cases chosen',
            'Two AI champions nominated'
          ]
        }
      ]
    },
    takeaway: 'In the next 30 days, our firm will start using AI for: [your answer from the activity above]'
  },

  {
    id: 's6-days31-60',
    type: 'content',
    section: 'Section 6: 90-Day Plan',
    title: 'Days **31–60**: Move from Prompts to Workflows',
    subtitle: 'Consistency, structure, and repeatable outcomes',
    content: [
      {
        type: 'text',
        text: 'The next phase is about consistency, structure, and repeatable outcomes. In the first 30 days, your team experimented with AI through individual prompts. Now the focus shifts from one-off prompts to standardised workflows where prompts are embedded inside the process.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Your 60-day priorities:',
        items: [
          {
            title: '1. Build a shared AI prompt library',
            desc: 'Create 10–15 standard prompts for common firm tasks. These should be clearly named, stored in one shared location, and used consistently across the team. The goal is not more prompts—the goal is consistent outputs.'
          },
          {
            title: '2. Standardise one workflow',
            desc: 'Choose one process, such as quarterly updates, onboarding, or period-end preparation. Define the desired outcome, the key steps, the prompts used at each step, and the human review points. The workflow should be repeatable, easy to follow, and produce consistent results.'
          },
          {
            title: '3. Introduce the four output checks',
            desc: 'Ensure staff review accuracy, check completeness, confirm tone, and consider compliance. This reinforces the principle that AI prepares the work—the accountant remains in control.'
          }
        ]
      },
    ],
    activity: {
      title: 'Your 60-Day Action Plan',
      prompt: 'Check off each milestone as you complete it, then define your first workflow:',
      type: 'checkbox-tasks',
      checkboxTasks: [
        {
          label: '60-Day Checklist',
          criteria: [
            'Prompt library created',
            'One workflow standardised',
            'Output review rules adopted'
          ]
        }
      ]
    },
    takeaway: 'Our first standardised AI workflow will be: [your answer from the activity above]'
  },

  {
    id: 's6-days61-90',
    type: 'content',
    section: 'Section 6: 90-Day Plan',
    title: 'Days **61–90**: Introduce Your First Agent',
    subtitle: 'Move from assistants to agents',
    content: [
      {
        type: 'text',
        text: 'By the final 30 days, the firm should be ready to move from assistants to agents, and automate one structured workflow.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Your 90-day priorities:',
        items: [
          {
            title: '1. Choose your first agent workflow',
            desc: 'Select a process that is repetitive, structured, and low in judgement. Examples: quarterly update preparation, client chaser, onboarding steps.'
          },
          {
            title: '2. Create the agent specification',
            desc: 'Define the trigger, the steps, the review point, and the output.'
          },
          {
            title: '3. Apply agent controls',
            desc: 'Ensure data boundaries are clear, review points exist, and outputs are logged.'
          }
        ]
      },
    ],
    activity: {
      title: 'Your 90-Day Action Plan',
      prompt: 'Check off each milestone as you complete it, then define your first agent workflow:',
      type: 'checkbox-tasks',
      checkboxTasks: [
        {
          label: '90-Day Checklist',
          criteria: [
            'First agent workflow selected',
            'Agent specification completed',
            'Controls applied',
            'Success measure defined'
          ]
        }
      ]
    },
    takeaway: 'By day 90, our firm will have an agent handling: [your answer from the activity above]'
  },

  {
    id: 's6-rhythm',
    type: 'content',
    section: 'Section 6: 90-Day Plan',
    title: 'The **AI Enablement Rhythm**',
    subtitle: 'An ongoing process, not a one-off project',
    content: [
      {
        type: 'text',
        text: 'AI adoption is not a one-off project. It is an ongoing process. Firms need a simple rhythm to build skills, share learning, and maintain control.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'A simple enablement cadence:',
        items: [
          {
            title: 'Weekly',
            desc: '15-minute prompt or workflow clinic: share prompts, discuss results, identify improvements.'
          },
          {
            title: 'Monthly',
            desc: 'Workflow design session: review one process, identify automation opportunities, update procedures.'
          },
          {
            title: 'Quarterly',
            desc: 'Governance review: review policies, assess risks, update tool approvals.'
          }
        ]
      },
      {
        type: 'box',
        title: 'Key roles:',
        text: '• AI champion\n• Workflow owner\n• Partner sponsor',
        style: 'green'
      }
    ],
    activity: {
      title: 'Set Your Rhythm',
      prompt: 'Decide:',
      questions: [
        'Who will your AI champion be?',
        'When will your first prompt clinic take place?'
      ],
      type: 'multi-question'
    }
  },

  {
    id: 's6-scorecard',
    type: 'content',
    section: 'Section 6: 90-Day Plan',
    title: 'The **AI Scorecard**',
    subtitle: 'Measure what matters',
    content: [
      {
        type: 'text',
        text: 'AI adoption should be measured. Without measurement, success is unclear, and confidence is harder to build.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Five simple AI metrics:',
        items: [
          {
            title: '1. Time saved',
            desc: 'Reduction in time spent on key workflows.'
          },
          {
            title: '2. Turnaround time',
            desc: 'Speed from client data to final output.'
          },
          {
            title: '3. Rework rate',
            desc: 'How often work needs correction.'
          },
          {
            title: '4. Adoption rate',
            desc: 'Percentage of jobs using approved AI.'
          },
          {
            title: '5. Team capacity',
            desc: 'Hours freed up for higher-value work.'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'Start simple. Track two metrics consistently. Add more only when the first two are embedded in your rhythm.'
      }
    ],
    activity: {
      title: 'Choose Your Metrics',
      prompt: 'Select two metrics to track for the next 90 days:',
      questions: [
        'Metric 1:',
        'Metric 2:'
      ],
      type: 'multi-question'
    }
  },

  {
    id: 's6-stop-doing',
    type: 'content',
    section: 'Section 6: 90-Day Plan',
    title: 'The **Stop-Doing List**',
    subtitle: 'Remove unnecessary steps, simplify processes',
    content: [
      {
        type: 'text',
        text: 'AI adoption is not just about adding new tools. It is also about removing unnecessary steps, and simplifying processes.'
      },
      {
        type: 'box',
        title: 'Common tasks firms stop doing:',
        text: 'After adopting AI, many firms reduce or remove:\n• Manual chasing processes\n• Duplicate data entry\n• Repetitive internal reports\n• Unnecessary formatting tasks\n• Manual summary writing',
        style: 'dark'
      },
      {
        type: 'highlight',
        text: 'The stop-doing exercise: Ask your team—What do we do because we always have? What could AI remove or simplify?'
      }
    ],
    activity: {
      title: 'Your Stop-Doing List',
      prompt: 'List three tasks your firm could stop doing:',
      questions: [
        'Task 1:',
        'Task 2:',
        'Task 3:'
      ],
      type: 'multi-question'
    }
  },

  {
    id: 's6-strategic-questions',
    type: 'content',
    section: 'Section 6: 90-Day Plan',
    title: 'Three **Strategic Questions** for the AI-Ready Firm',
    subtitle: 'Reflect regularly on what matters',
    content: [
      {
        type: 'text',
        text: 'Every firm should regularly reflect on three key questions.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The Three Questions:',
        items: [
          {
            title: 'Question 1: What is no longer useful?',
            desc: 'Which processes exist only because of old technology, or manual limitations?'
          },
          {
            title: 'Question 2: What is now possible?',
            desc: 'Which services could be delivered faster, more frequently, or more proactively?'
          },
          {
            title: 'Question 3: Where will we create value?',
            desc: 'How will the firm use new capacity, new insight, and new workflows?'
          }
        ]
      },
      {
        type: 'box',
        title: 'How to use these questions:',
        text: 'Discuss at your next partner or leadership meeting. Write down one answer to each. Revisit quarterly.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Your Strategic Answers',
      prompt: 'Write down one answer to each question:',
      questions: [
        'What is no longer useful?',
        'What is now possible?',
        'Where will we create value?'
      ],
      type: 'multi-question'
    }
  },

  {
    id: 's6-four-stages',
    type: 'content',
    section: 'Section 6: 90-Day Plan',
    title: 'The **Four Stages** of the AI-Ready Firm',
    subtitle: 'Progression happens gradually',
    content: [
      {
        type: 'text',
        text: 'AI adoption does not happen overnight. Firms typically progress through four stages.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The Four Stages:',
        items: [
          {
            title: 'Stage 1 - Experimentation',
            desc: 'Occasional AI use. No standard processes. Individual prompts.'
          },
          {
            title: 'Stage 2 - Structured assistants',
            desc: 'Shared prompts. Defined review rules. Basic policies.'
          },
          {
            title: 'Stage 3 - Workflow integration',
            desc: 'AI embedded in processes. Standardised steps. Measurable time savings.'
          },
          {
            title: 'Stage 4 - Agent-driven firm',
            desc: 'Agents handle structured workflows. Accountants focus on judgement. Capacity redirected into advisory.'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'The goal is not to use more AI. The goal is to build a better firm.'
      },
      {
        type: 'box',
        title: 'Where should you be after 90 days?',
        text: 'Most firms reach Stage 2 (Structured assistants) or Stage 3 (Workflow integration) after completing the 90-day plan. Stage 4 (Agent-driven) typically takes 6-12 months.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Stage Assessment',
      prompt: 'Assess your current position and next step:',
      questions: [
        'Which stage best describes your firm today?',
        'What is the next step forward?'
      ],
      type: 'multi-question'
    },
    takeaway: 'Progress through the stages deliberately. Each stage builds the foundation for the next.'
  },

  // SECTION 7: TEMPLATES & TOOLS
  {
    id: 's7-policy',
    type: 'content',
    section: 'Section 7: Templates & Tools',
    title: 'AI **Acceptable Use Policy** (Starter Template)',
    subtitle: 'Simple, clear expectations for AI use',
    image: 'section-opener',
    content: [
      {
        type: 'text',
        text: 'Every firm should have a simple, clear policy for AI use. This does not need to be complex. It just needs to set expectations.'
      },
      {
        type: 'box',
        title: 'Purpose',
        text: 'Our firm uses AI tools to improve efficiency, reduce repetitive tasks, and enhance client service. All work remains subject to professional review and approval.',
        style: 'green'
      },
      {
        type: 'box',
        title: 'Approved uses',
        text: 'AI may be used for:\n• Drafting communications\n• Summarising notes\n• Preparing explanations\n• Internal checklists\n• And other low-risk tasks',
        style: 'dark'
      },
      {
        type: 'box',
        title: 'Restricted uses',
        text: 'AI must not be used for:\n• Final client outputs without review\n• High-judgement decisions\n• Unapproved workflows',
        style: 'dark'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Data rules:',
        items: [
          {
            title: 'Public or generic data',
            desc: 'May be used in general AI tools.'
          },
          {
            title: 'Internal firm data',
            desc: 'May only be used in approved systems.'
          },
          {
            title: 'Client confidential data',
            desc: 'Must only be used in approved, secure environments.'
          }
        ]
      },
      {
        type: 'box',
        title: 'Review rule',
        text: 'All AI-assisted outputs must be reviewed by a member of staff, and approved before being shared externally.',
        style: 'green'
      },
      {
        type: 'box',
        title: 'Responsibility',
        text: 'The accountant remains responsible for the accuracy, the compliance, and the professional quality of the work.',
        style: 'green'
      }
    ],
    activity: {
      title: 'Adapt This Policy',
      prompt: 'Customise this policy for your firm:',
      questions: [
        'List your approved AI tools:',
        'Define your review rule:',
        'Who will you share this policy with first?'
      ],
      type: 'multi-question'
    }
  },

  {
    id: 's7-agent-spec',
    type: 'content',
    section: 'Section 7: Templates & Tools',
    title: 'Agent **Specification Template**',
    subtitle: 'Define your agent workflow clearly',
    content: [
      {
        type: 'text',
        text: 'Before introducing an agent, define the workflow clearly using this structured template.'
      },
      {
        type: 'highlight',
        text: 'This template helps ensure your agent operates reliably within guardrails and produces consistent results.'
      }
    ],
    activity: {
      title: 'Agent Specification Template',
      prompt: 'Complete this template for your first agent workflow:',
      type: 'spec-form',
      specFields: [
        {
          label: 'Workflow name',
          placeholder: 'e.g., Quarterly update preparation',
          helper: ''
        },
        {
          label: 'Trigger',
          placeholder: 'What starts the process?',
          helper: ''
        },
        {
          label: 'Inputs required',
          placeholder: 'What information is needed?',
          helper: ''
        },
        {
          label: 'Agent step 1',
          placeholder: 'First action the agent performs',
          helper: ''
        },
        {
          label: 'Agent step 2',
          placeholder: 'Second action',
          helper: ''
        },
        {
          label: 'Agent step 3',
          placeholder: 'Third action',
          helper: ''
        },
        {
          label: 'Agent step 4',
          placeholder: 'Fourth action (optional)',
          helper: ''
        },
        {
          label: 'Agent step 5',
          placeholder: 'Fifth action (optional)',
          helper: ''
        },
        {
          label: 'Human review point',
          placeholder: 'Where does the accountant step in?',
          helper: ''
        },
        {
          label: 'Final output',
          placeholder: 'What does the agent produce?',
          helper: ''
        },
        {
          label: 'Escalation rules',
          placeholder: 'When must the agent stop and alert a human?',
          helper: ''
        }
      ]
    },
    takeaway: 'Use this template when designing any agent workflow. Clear specification leads to reliable performance.'
  },

  {
    id: 's7-checklist',
    type: 'content',
    section: 'Section 7: Templates & Tools',
    title: 'AI Output **Review Checklist**',
    subtitle: 'Simple review process for every AI output',
    content: [
      {
        type: 'text',
        text: 'Every AI output should follow a simple review process.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'The four output checks:',
        items: [
          {
            title: '1. Accuracy',
            desc: 'Are the facts and figures correct?'
          },
          {
            title: '2. Completeness',
            desc: 'Is anything missing?'
          },
          {
            title: '3. Professional tone',
            desc: 'Is the wording appropriate and clear?'
          },
          {
            title: '4. Compliance and ethics',
            desc: 'Does the output align with professional standards, firm policies, and confidentiality rules?'
          }
        ]
      },
      {
        type: 'box',
        title: 'Quick review checklist — Before sending or using an AI output:',
        text: '☐ Facts checked\n☐ Key points covered\n☐ Tone appropriate\n☐ Compliance confirmed',
        style: 'green'
      }
    ],
    activity: {
      title: 'Embed the Checklist',
      prompt: 'Where will you add this checklist?',
      questions: [
        'Add this checklist to: (e.g., internal procedures, workflow documentation, client file templates)'
      ],
      type: 'multi-question'
    },
    takeaway: 'Make these checks a habit. Print them. Put them on your desk. Use them every time.'
  },

  {
    id: 's7-tool-matrix',
    type: 'content',
    section: 'Section 7: Templates & Tools',
    title: 'AI **Tool Usage Matrix**',
    subtitle: 'Different tools for different types of work',
    content: [
      {
        type: 'text',
        text: 'Different tools should be used for different types of work. Use this matrix to define clear boundaries for AI tool usage in your firm.'
      },
      {
        type: 'numbered-list',
        boxTitle: 'Tool Usage Matrix:',
        items: [
          {
            title: 'General AI Assistant',
            desc: 'Allowed tasks: Drafting, summaries, checklists\nData allowed: Public or generic data only\nReview required: Yes, always',
            icon: 'MessageSquare'
          },
          {
            title: 'Firm-Approved AI Assistant',
            desc: 'Allowed tasks: Internal documents, structured prompts\nData allowed: Internal firm data\nReview required: Yes, before sending externally',
            icon: 'Shield'
          },
          {
            title: 'AI Embedded in Accounting Systems',
            desc: 'Allowed tasks: Bookkeeping, reporting, compliance workflows\nData allowed: Client confidential data\nReview required: Yes, at defined review points',
            icon: 'Database'
          },
          {
            title: 'Agent Workflows',
            desc: 'Allowed tasks: Structured, repeatable processes\nData allowed: Approved system data only\nReview required: Yes, at human review points',
            icon: 'Bot'
          }
        ]
      },
      {
        type: 'highlight',
        text: 'Clear tool boundaries reduce risk and help staff know which AI tools to use for which tasks.'
      }
    ],
    activity: {
      title: 'Create Your Matrix',
      prompt: 'Build your firm\'s AI tool usage matrix:',
      questions: [
        'List the AI tools your firm uses:',
        'Define allowed tasks for your primary AI tool:',
        'What data boundaries will you set?'
      ],
      type: 'multi-question'
    }
  },

  {
    id: 's7-file-note',
    type: 'content',
    section: 'Section 7: Templates & Tools',
    title: 'AI **File Note Template**',
    subtitle: 'Create a simple evidence trail',
    content: [
      {
        type: 'text',
        text: 'AI-assisted work should have a simple evidence trail.'
      },
      {
        type: 'box',
        title: 'AI File Note Template:',
        text: 'AI tool used:\nTask assisted:\nType of output: (e.g., email draft, summary, variance explanation)\n\nKey checks performed:\n• Accuracy\n• Completeness\n• Tone\n• Compliance\n\nChanges made after AI output:\nApproved by:\nDate:',
        style: 'dark'
      },
      {
        type: 'box',
        title: 'When to use this:',
        text: 'Create an AI file note when:\n• The output is client-facing\n• The work involves judgement\n• The task is material',
        style: 'green'
      }
    ],
    activity: {
      title: 'Define Your File Note Policy',
      prompt: 'Decide when your firm will require an AI file note:',
      questions: [
        'When will your firm require an AI file note?'
      ],
      type: 'multi-question'
    },
    takeaway: 'File notes create accountability and build confidence in AI-assisted work.'
  },

  {
    id: 's7-client-comms',
    type: 'content',
    section: 'Section 7: Templates & Tools',
    title: 'Client **AI Communication Template**',
    subtitle: 'Build client confidence with clear explanations',
    content: [
      {
        type: 'text',
        text: 'Clients may ask how AI is used in your firm. A simple, clear explanation builds confidence.'
      },
      {
        type: 'box',
        title: 'Standard client AI statement:',
        text: '"We use modern technology, including artificial intelligence, to reduce repetitive work and improve accuracy. All outputs are reviewed by qualified professionals, and your data remains protected within approved systems. Our use of AI allows us to spend more time providing insight, advice, and proactive support."',
        style: 'green'
      },
      {
        type: 'box',
        title: 'Short version:',
        text: '"We use AI to reduce manual work, improve accuracy, and spend more time advising you. All work is reviewed by our team."',
        style: 'dark'
      }
    ],
    activity: {
      title: 'Write Your AI Statement',
      prompt: 'Create your firm\'s AI statement in your own tone and style:',
      questions: [
        'Write your firm\'s client AI statement:'
      ],
      type: 'multi-question'
    }
  },

  {
    id: 's7-glossary',
    type: 'content',
    section: 'Section 7: Templates & Tools',
    title: 'AI **Glossary**',
    subtitle: 'Quick reference to common AI terms',
    content: [
      {
        type: 'numbered-list',
        boxTitle: 'AI Terms:',
        items: [
          {
            title: 'AI (Artificial Intelligence)',
            desc: 'Technology that performs tasks normally requiring human intelligence, such as analysing data or generating text.'
          },
          {
            title: 'AI Agent',
            desc: 'An AI system that works towards a defined goal or outcome, can perform multiple steps across systems or data sources, makes decisions within set rules or constraints, and prepares results for human review and approval. Agents focus on achieving outcomes, not just completing individual tasks.'
          },
          {
            title: 'AI Assistant',
            desc: 'An AI tool that helps with individual tasks, such as drafting emails, summarising notes, or explaining figures. Assistants respond to prompts and require human direction.'
          },
          {
            title: 'AI Audit Trail',
            desc: 'A record showing how AI was used, what outputs were generated, and who approved the final result.'
          },
          {
            title: 'AI Dividend',
            desc: 'The time and efficiency gained from using AI and agents.'
          },
          {
            title: 'AI Policy',
            desc: 'A firm\'s internal rules governing how AI can be used, what data is allowed, and what review is required.'
          },
          {
            title: 'Automation',
            desc: 'Technology that performs tasks using fixed rules and processes, without human intervention. Examples: bank feeds, recurring journals, rules-based expense coding. Automation is different from generative AI, which creates new content.'
          },
          {
            title: 'Bias (in AI)',
            desc: 'When an AI system produces skewed or unfair results because of incomplete data, unbalanced training, or incorrect assumptions.'
          },
          {
            title: 'Context',
            desc: 'The background information provided to an AI system. Better context usually leads to more accurate, more relevant, and more useful outputs.'
          },
          {
            title: 'Context Window',
            desc: 'The amount of information an AI system can consider at one time when producing a response. Larger context windows allow AI to analyse longer documents, or consider more data at once.'
          },
          {
            title: 'Data Minimisation',
            desc: 'The principle of only sharing the minimum amount of data needed to complete a task.'
          },
          {
            title: 'Fine-Tuning',
            desc: 'The process of adjusting an AI model using specific data to improve performance for a particular task or industry.'
          },
          {
            title: 'Generative AI',
            desc: 'AI that creates new content, such as text, summaries, explanations, code, images, audio, or video. Generative AI produces original outputs based on patterns learned from large sets of training data.'
          },
          {
            title: 'Hallucination (AI)',
            desc: 'When an AI system produces incorrect, fabricated, or misleading information that appears confident and believable. This is why all AI outputs must be reviewed.'
          },
          {
            title: 'Human-in-the-loop',
            desc: 'A process where AI performs tasks, and a human reviews and approves the outcome.'
          },
          {
            title: 'LLM (Large Language Model)',
            desc: 'A type of AI trained on large amounts of text data. It can understand language, generate responses, summarise information, and assist with writing or analysis. Most modern AI assistants are powered by LLMs.'
          },
          {
            title: 'Machine Learning (ML)',
            desc: 'A type of AI where systems learn patterns from data and improve over time without being explicitly programmed for every rule. Used in fraud detection, expense categorisation, and forecasting tools.'
          },
          {
            title: 'Model',
            desc: 'The AI system itself, trained on data to perform tasks such as prediction, classification, or content generation.'
          },
          {
            title: 'Natural Language Processing (NLP)',
            desc: 'Technology that allows computers to understand, interpret, and generate human language. NLP enables AI tools to read emails, interpret text, and answer questions.'
          },
          {
            title: 'Prompt',
            desc: 'The instruction given to an AI system.'
          },
          {
            title: 'Prompt Engineering',
            desc: 'The practice of writing clear, structured prompts to improve AI results. This includes defining the role, setting the task, providing context, and adding constraints.'
          },
          {
            title: 'Structured Data',
            desc: 'Organised, consistent information that AI systems can process reliably.'
          },
          {
            title: 'Training Data',
            desc: 'The information used to teach an AI model how to recognise patterns, generate responses, and perform tasks. The quality of the training data affects the quality of the results.'
          },
          {
            title: 'Workflow',
            desc: 'A defined sequence of steps used to complete a task or service.'
          }
        ]
      }
    ]
  },

  {
    id: 's7-finish',
    type: 'content',
    section: 'Conclusion',
    title: 'Building Your **AI-Ready** Firm',
    subtitle: 'You\'re ready to begin',
    content: [
      {
        type: 'text',
        text: 'You now have everything you need:'
      },
      {
        type: 'list',
        items: [
          'The framework (5 principles)',
          'The guardrails (ethics, policy, checks)',
          'The skills (prompts, workflows, agents)',
          'The plan (90 days)',
          'The templates (policy, specs, checklists)'
        ]
      },
      {
        type: 'highlight',
        text: 'AI adoption is not about using the most advanced tools. It\'s about building structured, confident processes that turn capacity into value.'
      },
      {
        type: 'quote',
        text: 'AI will not replace accountants. But accountants who use AI effectively will replace those who do not. The future firm is structured, agent-enabled, and led by human judgement.'
      }
    ],
    activity: {
      title: 'Your Next Step',
      prompt: 'What is the ONE action you will take in the next 24 hours to begin your AI journey?'
    },
    takeaway: 'Start with the foundations. Build structured workflows. Deploy your first agent. The future of accountancy is here.'
  },

  {
    id: 'activity-summary',
    type: 'summary',
    section: 'Conclusion',
    title: 'Activity Summary',
    subtitle: 'Review and download all your responses',
    content: []
  },

  {
    id: 'certificate',
    type: 'content',
    section: 'Conclusion',
    title: 'Completion **Certificate**',
    subtitle: 'Unlocked by completing the entire playbook',
    content: [
      {
        type: 'box',
        title: 'The AI Playbook for Accountants & Bookkeepers',
        text: 'Certificate of Completion',
        style: 'green'
      },
      {
        type: 'highlight',
        text: 'This certificate recognises the successful completion of The AI Playbook for Accountants & Bookkeepers, demonstrating commitment to AI-ready practice development.'
      },
      {
        type: 'text',
        text: 'By completing this playbook, you have gained essential knowledge in:'
      },
      {
        type: 'list',
        items: [
          'AI fundamentals and the shift to AI-assisted firms',
          'Professional guardrails: ethics, responsibility, and data confidentiality',
          'AI assistants, agents, and workflow transformation',
          'Prompting skills and practical AI application',
          'Pricing strategies for the AI era',
          'The 90-day AI adoption plan',
          'Templates, tools, and practical resources'
        ]
      },
      {
        type: 'box',
        title: 'Powered by Sage',
        text: 'This playbook was created to support accountants and bookkeepers in building AI-ready practices while maintaining professional standards and delivering exceptional client value.',
        style: 'dark'
      }
    ],
    activity: {
      title: 'Personalise Your Certificate',
      prompt: 'Enter your name or practice name to personalise this certificate:',
      type: 'multi-question',
      questions: [
        'Name / Practice Name:'
      ]
    },
    takeaway: 'You are now equipped with the framework, guardrails, skills, and plan to build an AI-ready firm. The future of accountancy is here—and you\'re ready.'
  }
];
