import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const appShell = readFileSync(new URL('../src/app/SageAIPlaybook.tsx', import.meta.url), 'utf8');
const sectionOpener = readFileSync(new URL('../src/app/components/SectionOpener.tsx', import.meta.url), 'utf8');
const pageContent = readFileSync(new URL('../src/app/components/PageContent.tsx', import.meta.url), 'utf8');

test('all eight section and conclusion openers are unnumbered entrances to their existing first lessons', () => {
  for (const sectionNumber of [1, 2, 3, 4, 5, 6, 7]) {
    assert.match(sectionOpener, new RegExp(`'section-${sectionNumber}': \\{`));
  }
  assert.match(sectionOpener, /'conclusion': \{/);

  assert.match(appShell, /SECTION_OPENER_NAVIGATION/);
  assert.match(appShell, /getSectionOpenerByStartPage\(currentPage \+ 1\)/);
  assert.match(appShell, /getSectionOpenerByStartPage\(currentPage\)/);
  assert.match(appShell, /const goToPageFromContent/);
  assert.match(appShell, /getSectionOpenerByStartPage\(page\)/);
  assert.match(appShell, /goToPage=\{goToPageFromContent\}/);
  assert.match(appShell, /const handleSectionHeaderClick/);
  assert.match(appShell, /if \(!sectionOpener \|\| isExpanded\)[\s\S]*toggleSection\(sectionName\)/);
  assert.match(appShell, /handleSectionHeaderClick\(sectionName, isExpanded, sectionOpener\)/);
  assert.match(appShell, /sectionName === 'Introduction'/);
  assert.match(appShell, /setExpandedSections\(prev => new Set\(prev\)\.add\(sectionName\)\)[\s\S]*goToPage\(0\)/);
  assert.match(appShell, /sectionName === 'Introduction' && page\.type === 'cover'/);
  assert.match(pageContent, /<motion\.button[\s\S]*onClick=\{\(\) => goToPage\(section\.startPageIndex\)\}/);
  assert.doesNotMatch(appShell, /Section [1-7] opener/);
  assert.match(appShell, /activeSectionOpener \? 'Start section'/);
  assert.doesNotMatch(appShell, /totalPages\s*\+\s*1/);
});

test('section openers retain the approved V3 content and shared learning structure', () => {
  assert.match(sectionOpener, /Section 1 \\u00B7 Understanding AI/);
  assert.match(sectionOpener, /Section 2 \\u00B7 Professional Guardrails/);
  assert.match(sectionOpener, /Section 3 \\u00B7 Assistants & Agents/);
  assert.match(sectionOpener, /Section 4 \\u00B7 Prompting Skills/);
  assert.match(sectionOpener, /Section 5 \\u00B7 Pricing & Economics/);
  assert.match(sectionOpener, /Section 6 \\u00B7 90-Day Plan/);
  assert.match(sectionOpener, /Section 7 \\u00B7 Templates & Tools/);
  assert.match(sectionOpener, /Conclusion \\u00B7 Completion & Certificate/);
  assert.match(sectionOpener, /The Shift to /);
  assert.match(sectionOpener, /AI-Assisted/);
  assert.match(sectionOpener, /Prompt Framework/);
  assert.match(sectionOpener, /AI Dividend/);
  assert.match(sectionOpener, /30 Days/);
  assert.match(sectionOpener, /Acceptable Use Policy/);
  assert.match(sectionOpener, /Building Your /);
  assert.match(sectionOpener, /What you\\u2019ll take forward/);
  assert.match(sectionOpener, /Why AI changes firm capacity/);
  assert.match(sectionOpener, /min-\[1101px\]:grid-cols/);
});

test('all section motion uses matched MP4 assets and accessible autoplay settings', () => {
  const assetNames = [
    'auto-entry-1',
    'data-security',
    'connect-your-accounts',
    'create',
    'bank-feed',
    'announcements',
    'compliant',
    'celebration-1'
  ];

  for (const assetName of assetNames) {
    for (const theme of ['dark', 'light']) {
      const asset = new URL(`../src/assets/section-openers/${assetName}--over-${theme}--1416w1416h.mp4`, import.meta.url);
      assert.equal(existsSync(asset), true, `${assetName} ${theme} MP4 should exist`);
    }
  }

  assert.match(sectionOpener, /autoPlay/);
  assert.match(sectionOpener, /muted/);
  assert.match(sectionOpener, /loop/);
  assert.match(sectionOpener, /playsInline/);
  assert.match(sectionOpener, /prefers-reduced-motion: reduce/);
  assert.match(sectionOpener, /data-theme/);
});
