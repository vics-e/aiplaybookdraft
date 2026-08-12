export interface WorkflowMapEntry {
  id: string;
  name: string;
  repeatability: number;
  judgement: number;
}

export interface WorkflowMapPageState {
  workflows: WorkflowMapEntry[];
  draftName: string;
  scoringIndex: number;
  selectedWorkflowIds: string[];
  currentStep: number;
}

export const DEFAULT_WORKFLOW_MAP_STATE: WorkflowMapPageState = {
  workflows: [],
  draftName: '',
  scoringIndex: 0,
  selectedWorkflowIds: [],
  currentStep: 0,
};

export const WORKFLOW_QUADRANTS = {
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

export function clampScore(value: unknown) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 3;
  }

  return Math.min(5, Math.max(1, Math.round(value)));
}

export function getWorkflowQuadrant(repeatability: number, judgement: number) {
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

export const WORKFLOW_MAP_POINT_INSET_PERCENT = 12;

export function clampPercentage(value: number, min = 0, max = 100) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

export function getWorkflowPlotPosition(workflow: WorkflowMapEntry) {
  const left = ((clampScore(workflow.repeatability) - 1) / 4) * 100;
  const top = (1 - ((clampScore(workflow.judgement) - 1) / 4)) * 100;

  return {
    left: clampPercentage(left, WORKFLOW_MAP_POINT_INSET_PERCENT, 100 - WORKFLOW_MAP_POINT_INSET_PERCENT),
    top: clampPercentage(top, WORKFLOW_MAP_POINT_INSET_PERCENT, 100 - WORKFLOW_MAP_POINT_INSET_PERCENT),
  };
}

export function updateSelectedWorkflowIds(selectedWorkflowIds: string[], workflowId: string, nextSelected?: boolean) {
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

export function formatWorkflowNameList(names: string[]) {
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

export function sanitiseWorkflowEntries(value: unknown) {
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

export function buildWorkflowMapSummary(state: WorkflowMapPageState) {
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

export function parseWorkflowMapState(userInput: string) {
  if (!userInput || userInput === '') {
    return DEFAULT_WORKFLOW_MAP_STATE;
  }

  try {
    const parsed = JSON.parse(userInput) as Record<string, unknown>;
    const workflows = sanitiseWorkflowEntries(parsed.workflows);
    const workflowIds = new Set(workflows.map((workflow) => workflow.id));
    const selectedWorkflowIds = Array.isArray(parsed.selectedWorkflowIds)
      ? parsed.selectedWorkflowIds
          .filter((value): value is string => typeof value === 'string' && workflowIds.has(value))
          .filter((value, index, values) => values.indexOf(value) === index)
          .slice(0, 2)
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
