import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const appShell = readFileSync(new URL('../src/app/SageAIPlaybook.tsx', import.meta.url), 'utf8');
const pageContent = readFileSync(new URL('../src/app/components/PageContent.tsx', import.meta.url), 'utf8');
const imageWithFallback = readFileSync(new URL('../src/app/components/media/ImageWithFallback.tsx', import.meta.url), 'utf8');
const sectionOpener = readFileSync(new URL('../src/app/components/SectionOpener.tsx', import.meta.url), 'utf8');
const genericActivity = readFileSync(new URL('../src/app/components/content/GenericActivityRenderer.tsx', import.meta.url), 'utf8');
const focusedActivities = readFileSync(new URL('../src/app/components/FocusedPageActivities.tsx', import.meta.url), 'utf8');

test('page changes move focus to the current content heading', () => {
  assert.match(appShell, /const contentRegionRef = useRef<HTMLDivElement>\(null\)/);
  assert.match(appShell, /shouldFocusContentRef\.current = true/);
  assert.match(appShell, /const focusTimer = window\.setTimeout\(\(\) => \{/);
  assert.match(appShell, /querySelector<HTMLElement>\('h1, h2'\)/);
  assert.match(appShell, /heading\?\.focus\(\)/);
  assert.match(pageContent, /<h2 tabIndex=\{-1\}/);
  assert.match(sectionOpener, /tabIndex=\{-1\}/);
});

test('motion and animated media respect reduced-motion preferences', () => {
  assert.match(appShell, /<MotionConfig reducedMotion="user">/);
  assert.match(sectionOpener, /prefers-reduced-motion: reduce/);
  assert.match(sectionOpener, /autoPlay/);
});

test('saved-answer feedback is announced without requiring colour perception', () => {
  const statusPattern = /role="status" aria-live="polite" aria-atomic="true"/g;
  assert.ok((genericActivity.match(statusPattern) || []).length >= 9);
  assert.match(focusedActivities, /role="status" aria-live="polite" aria-atomic="true"/);
});

test('editorial imagery is hidden while meaningful image alternatives are preserved', () => {
  assert.match(pageContent, /const DECORATIVE_PAGE_IMAGE_IDS = new Set\(\[/);
  assert.match(pageContent, /alt=\{isDecorativePageImage \? '' : page\.title\}/);
  assert.match(imageWithFallback, /alt=\{alt \?\? ''\}/);
});
