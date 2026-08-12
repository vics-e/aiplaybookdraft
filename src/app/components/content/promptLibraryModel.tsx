import React from 'react';
import type { PlaybookPage } from '../../data/playbookData';
export { DEFAULT_PROMPT_LIBRARY_STATE, parsePromptLibraryState } from './promptLibraryStateModel';
export type { PromptLibraryState } from './promptLibraryStateModel';

export interface PromptVariable {
  id: string;
  key: string;
  label: string;
  token: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  text: string;
  variables: PromptVariable[];
}

export function extractPromptVariables(text: string) {
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

export function stripWrappingQuotes(text: string) {
  return text.replace(/^"+|"+$/g, '');
}

export function buildPromptTemplates(content: PlaybookPage['content']): PromptTemplate[] {
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

export function renderPromptText(
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

export function buildPersonalisedPrompt(
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

export function parseNumberedSteps(text: string) {
  return text
    .split('\n')
    .map((step) => step.trim())
    .filter(Boolean)
    .map((step) => step.replace(/^\d+\.\s*/, ''));
}

export function parseStructuredInputs(userInput: string) {
  try {
    return userInput && userInput !== '' ? JSON.parse(userInput) : {};
  } catch {
    return {};
  }
}
