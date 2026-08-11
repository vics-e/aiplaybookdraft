import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const treatmentSource = readFileSync(new URL('../src/app/components/NumberedContentTreatments.tsx', import.meta.url), 'utf8');
const pageContent = readFileSync(new URL('../src/app/components/PageContent.tsx', import.meta.url), 'utf8');
const genericContent = readFileSync(new URL('../src/app/components/content/GenericContentRenderer.tsx', import.meta.url), 'utf8');
const contentPanels = readFileSync(new URL('../src/app/components/content/ContentPanels.tsx', import.meta.url), 'utf8');
const mappingDocument = readFileSync(new URL('../docs/wave-2-numbered-treatment-map.md', import.meta.url), 'utf8');

const mappingEntries = [...treatmentSource.matchAll(/^\s+'([^']+)': '(filled-marker|accordion|editorial|handoff|selector|metric-strip)',$/gm)]
  .map(([, pageId, treatment]) => ({ pageId, treatment }));

test('approved numbered-content mapping has the reviewed treatment counts', () => {
  const count = (treatment) => mappingEntries.filter((entry) => entry.treatment === treatment).length;

  assert.equal(mappingEntries.length, 35);
  assert.equal(count('filled-marker'), 3);
  assert.equal(count('accordion'), 16);
  assert.equal(count('editorial'), 6);
  assert.equal(count('handoff'), 1);
  assert.equal(count('selector'), 8);
  assert.equal(count('metric-strip'), 1);
});

test('specialist numbered pages stay outside the shared treatment mapping', () => {
  const mappedPageIds = new Set(mappingEntries.map((entry) => entry.pageId));
  for (const pageId of [
    's2-policy',
    's3-difference',
    's3-where-agents',
    's3-ai-workflow',
    's7-tool-matrix',
    's7-glossary',
  ]) {
    assert.equal(mappedPageIds.has(pageId), false, `${pageId} should retain its specialist presentation`);
  }
});

test('accordion and selector treatments expose accessible interaction and mobile overflow handling', () => {
  assert.match(treatmentSource, /aria-expanded=\{isExpanded\}/);
  assert.match(treatmentSource, /aria-controls=\{panelId\}/);
  assert.match(treatmentSource, /role="region"/);
  assert.match(treatmentSource, /aria-labelledby=\{triggerId\}/);
  assert.match(treatmentSource, /role="tablist"/);
  assert.match(treatmentSource, /role="tabpanel"/);
  assert.match(treatmentSource, /aria-selected=\{isSelected\}/);
  assert.match(treatmentSource, /overflow-x-auto/);
  assert.match(treatmentSource, /Select a principle to explore\./);
});

test('line-based horizontal treatment has been retired', () => {
  assert.doesNotMatch(treatmentSource, /CONNECTED_HORIZONTAL_PAGE_IDS/);
  assert.doesNotMatch(treatmentSource, /data-numbered-treatment="horizontal"/);
  assert.match(treatmentSource, /'s1-stages': 'editorial'/);
  assert.match(treatmentSource, /'s1-human-loop': 'handoff'/);
  assert.match(treatmentSource, /'s4-framework': 'selector'/);
});

test('numbered hierarchy and highlight variants stay restrained and reusable', () => {
  assert.match(treatmentSource, /splitTitleAndDetail/);
  assert.match(treatmentSource, /motion-safe:hover:translate-x-1/);
  assert.match(treatmentSource, /text-\[var\(--color-muted-text\)\]/);
  assert.match(treatmentSource, /items\.length === 4[\s\S]*md:grid-cols-4/);
  assert.match(treatmentSource, /text-3xl font-black/);
  assert.match(treatmentSource, /md:min-h-\[14rem\]/);
  assert.match(contentPanels, /HIGHLIGHT_BAND_PAGE_IDS/);
  assert.match(contentPanels, /function HighlightMessage/);
  assert.match(contentPanels, /Connection to Agent Spec Template/);
  assert.match(genericContent, /<HighlightMessage pageId=\{page\.id\}/);
});

test('PageContent delegates only mapped numbered blocks to the shared renderer', () => {
  assert.match(pageContent, /const numberedTreatment = NUMBERED_TREATMENT_BY_PAGE_ID\[page\.id\]/);
  assert.match(genericContent, /<NumberedContentTreatment/);
  assert.match(genericContent, /treatment=\{numberedTreatment\}/);
});

test('review document records the approved counts and activity boundary', () => {
  assert.match(mappingDocument, /Filled white marker \| 3/);
  assert.match(mappingDocument, /Numbered accordion \| 16/);
  assert.match(mappingDocument, /Editorial numbers \| 6/);
  assert.match(mappingDocument, /Joined handoff \| 1/);
  assert.match(mappingDocument, /Selector \+ canvas \| 8/);
  assert.match(mappingDocument, /Metric strip \| 1/);
  assert.match(mappingDocument, /does not authorise changes to activities/);
});
