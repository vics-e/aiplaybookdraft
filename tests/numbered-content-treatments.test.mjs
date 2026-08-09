import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const treatmentSource = readFileSync(new URL('../src/app/components/NumberedContentTreatments.tsx', import.meta.url), 'utf8');
const pageContent = readFileSync(new URL('../src/app/components/PageContent.tsx', import.meta.url), 'utf8');
const mappingDocument = readFileSync(new URL('../docs/wave-2-numbered-treatment-map.md', import.meta.url), 'utf8');

const mappingEntries = [...treatmentSource.matchAll(/^\s+'([^']+)': '(filled-marker|accordion|horizontal)',$/gm)]
  .map(([, pageId, treatment]) => ({ pageId, treatment }));

test('approved numbered-content mapping has the reviewed treatment counts', () => {
  const count = (treatment) => mappingEntries.filter((entry) => entry.treatment === treatment).length;

  assert.equal(mappingEntries.length, 33);
  assert.equal(count('filled-marker'), 6);
  assert.equal(count('accordion'), 19);
  assert.equal(count('horizontal'), 8);
});

test('specialist numbered pages stay outside the shared treatment mapping', () => {
  const mappedPageIds = new Set(mappingEntries.map((entry) => entry.pageId));
  for (const pageId of [
    's2-policy',
    's3-difference',
    's3-where-agents',
    's3-controls',
    's3-ai-workflow',
    's7-checklist',
    's7-tool-matrix',
    's7-glossary',
  ]) {
    assert.equal(mappedPageIds.has(pageId), false, `${pageId} should retain its specialist presentation`);
  }
});

test('accordion and horizontal treatments expose accessible interaction and overflow cues', () => {
  assert.match(treatmentSource, /aria-expanded=\{isExpanded\}/);
  assert.match(treatmentSource, /aria-controls=\{panelId\}/);
  assert.match(treatmentSource, /role="region"/);
  assert.match(treatmentSource, /aria-labelledby=\{triggerId\}/);
  assert.match(treatmentSource, /snap-x snap-mandatory/);
  assert.match(treatmentSource, /overflow-x-auto/);
  assert.match(treatmentSource, /Swipe to follow the full sequence/);
  assert.doesNotMatch(treatmentSource, /new Set\(\[0\]\)/);
});

test('horizontal connectors are limited to genuine paths', () => {
  const connectorMap = treatmentSource.match(/const CONNECTED_HORIZONTAL_PAGE_IDS = new Set\(\[([\s\S]*?)\]\);/)?.[1] || '';
  assert.match(connectorMap, /'s1-stages'/);
  assert.match(connectorMap, /'s3-maturity'/);
  assert.match(connectorMap, /'s6-four-stages'/);
  assert.doesNotMatch(connectorMap, /'s4-framework'/);
});

test('PageContent delegates only mapped numbered blocks to the shared renderer', () => {
  assert.match(pageContent, /const numberedTreatment = NUMBERED_TREATMENT_BY_PAGE_ID\[page\.id\]/);
  assert.match(pageContent, /<NumberedContentTreatment/);
  assert.match(pageContent, /treatment=\{numberedTreatment\}/);
});

test('review document records the approved counts and activity boundary', () => {
  assert.match(mappingDocument, /Filled white marker \| 6/);
  assert.match(mappingDocument, /Numbered accordion \| 19/);
  assert.match(mappingDocument, /Horizontal 1–5 \| 8/);
  assert.match(mappingDocument, /does not authorise changes to activities/);
});
