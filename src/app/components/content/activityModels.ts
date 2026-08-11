import type { PlaybookPage } from '../../data/playbookData';

export interface ToolMatrixRow {
  id: string;
  toolName: string;
  allowedTasks: string;
  dataBoundaries: string;
  reviewRequired: string;
}

export interface ToolMatrixPageState {
  rows: ToolMatrixRow[];
  activeRowId: string;
}

export function parseSpecFormFields(userInput: string, fieldCount: number) {
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

export function parseToolMatrixRows(content: PlaybookPage['content']) {
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

export function sanitiseToolMatrixRows(value: unknown, fallbackRows: ToolMatrixRow[]) {
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

export function parseToolMatrixState(userInput: string, fallbackRows: ToolMatrixRow[]) {
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

export function buildToolMatrixSummary(rows: ToolMatrixRow[]) {
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

export function buildAgentSpecCopyText(
  specFields: { label: string; placeholder: string; helper?: string }[],
  fieldValues: Record<string, string>,
) {
  return [
    'Agent specification',
    '',
    ...specFields.map((field, index) => `${field.label}:\n${fieldValues[`field-${index}`]?.trim() || '(not completed)'}`),
  ].join('\n\n');
}
