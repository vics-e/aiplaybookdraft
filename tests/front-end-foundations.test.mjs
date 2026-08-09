import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const appShell = readFileSync(new URL('../src/app/SageAIPlaybook.tsx', import.meta.url), 'utf8');
const pageContent = readFileSync(new URL('../src/app/components/PageContent.tsx', import.meta.url), 'utf8');
const focusedPageActivities = readFileSync(new URL('../src/app/components/FocusedPageActivities.tsx', import.meta.url), 'utf8');
const theme = readFileSync(new URL('../src/styles/theme.css', import.meta.url), 'utf8');
const fonts = readFileSync(new URL('../src/styles/fonts.css', import.meta.url), 'utf8');
const tracker = readFileSync(new URL('../ai-playbook-project-tracker.html', import.meta.url), 'utf8');
const compositionMap = readFileSync(new URL('../docs/wave-1-composition-map.md', import.meta.url), 'utf8');

test('mobile navigation starts from the viewport state and exposes drawer controls', () => {
  assert.match(appShell, /const DESKTOP_NAVIGATION_QUERY = '\(min-width: 1024px\)'/);
  assert.match(appShell, /useState\(getInitialDesktopState\)/);
  assert.match(appShell, /aria-label="Close navigation menu"/);
  assert.match(appShell, /aria-controls="playbook-sidebar"/);
  assert.match(appShell, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(theme, /@media \(max-width: 1023px\)[\s\S]*\.playbook-main\.sidebar-is-open[\s\S]*margin-left: 0/);
});

test('essential page navigation controls have names and touch targets', () => {
  assert.match(appShell, /aria-label="Go to previous page"/);
  assert.match(appShell, /aria-label=\{currentPage === totalPages - 1 \? 'Finish playbook' : 'Go to next page'\}/);
  assert.match(appShell, /aria-label=\{`Go to page \$\{pageIdx \+ 1\}`\}/);
  assert.match(appShell, /className="inline-flex min-h-11 min-w-11/);
  assert.match(theme, /:where\(button, a, input, textarea, select, summary, \[tabindex\]\):focus-visible/);
});

test('sidebar and footer use the same one-based page numbering', () => {
  const sidebarPageNumber = (index) => String(index + 1).padStart(2, '0');
  const footerPageNumber = (index) => index + 1;

  for (const index of [2, 30, 32]) {
    assert.equal(Number(sidebarPageNumber(index)), footerPageNumber(index));
  }

  assert.equal(sidebarPageNumber(2), '03');
  assert.equal(sidebarPageNumber(30), '31');
  assert.equal(sidebarPageNumber(32), '33');
  assert.match(appShell, /String\(index \+ 1\)\.padStart\(2, '0'\)/);
  assert.match(appShell, /Page \{currentPage \+ 1\} of \{totalPages\}/);
});

test('shared activity frames associate prompts, labels, and fields', () => {
  assert.match(pageContent, /aria-labelledby=\{activityTitleId\}/);
  assert.match(pageContent, /aria-describedby=\{activityPromptId\}/);
  assert.match(pageContent, /htmlFor=\{`\$\{page\.id\}-\$\{questionKey\}`\}/);
  assert.match(pageContent, /aria-label=\{`\$\{placeholderPrefix\} \$\{index \+ 1\}`\}/);
  assert.match(pageContent, /htmlFor=\{`\$\{page\.id\}-\$\{fieldKey\}`\}/);
});

test('priority activity pages use the focused interactive treatments', () => {
  for (const pageId of [
    's3-where-agents',
    's3-workflows',
    's3-ai-workflow',
    's4-framework',
    's5-impact-exercise',
    's5-client-talk',
  ]) {
    assert.match(pageContent, new RegExp(`page\\.id === '${pageId}'`));
  }

  assert.match(focusedPageActivities, /Strongest candidate/);
  assert.match(focusedPageActivities, /Current workflow/);
  assert.match(focusedPageActivities, /AI-enabled workflow/);
  assert.match(focusedPageActivities, /Structured prompt preview/);
  assert.match(focusedPageActivities, /On-page comparison/);
  assert.match(focusedPageActivities, /Client conversation preview/);
  assert.match(focusedPageActivities, /Copy prompt/);
  assert.match(focusedPageActivities, /Copy summary/);
  assert.match(focusedPageActivities, /Guidance for/);
  assert.match(focusedPageActivities, /role="tablist"/);
  assert.match(focusedPageActivities, /aria-live="polite"/);
  assert.match(focusedPageActivities, /sm:grid-cols-2/);
  assert.match(pageContent, /xl:grid-cols-4/);
  assert.match(pageContent, /INTERACTIVE FRAMEWORK SELECTORS/);
  assert.match(focusedPageActivities, /\.join\(' '\)/);
  assert.match(pageContent, /COMPACT GUIDANCE ACCORDION/);
  assert.doesNotMatch(focusedPageActivities, /Download|window\.print/);
});

test('brand font families remain Sage Header and Sage Text', () => {
  assert.match(fonts, /font-family: 'Sage Header'/);
  assert.match(fonts, /font-family: 'Sage Text'/);
  assert.match(theme, /--font-family-header: 'Sage Header'/);
  assert.match(theme, /--font-family-body: 'Sage Text'/);
});

test('Wave 1 uses semantic colour roles and restrained shared titles', () => {
  for (const token of [
    '--color-accent: #00D639',
    '--color-page-background: #000000',
    '--color-text-primary: #FFFFFF',
    '--color-text-muted: #C6C6C6',
    '--color-surface-1: #1B1B1B',
    '--color-surface-2: #303030',
    '--color-rule: #474747',
    '--color-light-background: #FFFFFF',
    '--color-light-background-soft: #FAFAFA',
    '--color-light-text-primary: #000000',
    '--color-light-green: #008A21',
    '--color-light-link: #006716',
  ]) {
    assert.match(theme, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(theme, /\.playbook-page-title[\s\S]*font-size: clamp\(2\.25rem, 4\.5vw, 3\.75rem\)/);
  assert.match(pageContent, /return title\.replace\(\/\\\*\\\*\/g, ''\)/);
  assert.doesNotMatch(appShell, /#00DC51|#00FF5F|rgba\(0,220,81/);
  assert.match(appShell, /rgba\(0,214,57,0\.5\)/);
});

test('Wave 1 composition inventory covers the four approved intent patterns', () => {
  for (const pattern of ['Editorial Split', 'Process Lane', 'Joined Comparison', 'Selector + Canvas']) {
    assert.match(compositionMap, new RegExp(pattern.replace('+', '\\+')));
  }
  assert.match(compositionMap, /does not authorise page conversion/);
});

test('shared activity, takeaway, and footer treatments retain purposeful emphasis', () => {
  assert.match(pageContent, /overflow-hidden rounded-2xl border-\[1\.5px\] accent-border bg-\[var\(--color-surface-1\)\]/);
  assert.match(pageContent, /rounded-2xl p-5 border-\[1\.5px\]/);
  assert.match(pageContent, /TAKEAWAY_BAND_PAGE_IDS/);
  assert.match(pageContent, /border-t-\[var\(--color-accent\)\]/);
  assert.match(pageContent, /grid-cols-\[48px_1fr\]/);
  assert.match(pageContent, /sm:grid-cols-\[64px_1fr\]/);
  assert.doesNotMatch(pageContent, /sm:grid-cols-\[76px_1fr\]/);
  assert.doesNotMatch(pageContent, /hover:shadow-\[#00DC51\]\/20/);
  assert.match(appShell, /accent-bg-medium w-2/);
  assert.match(appShell, /accent-action-shadow/);
  assert.doesNotMatch(pageContent, /accent-surface/);
});

test('local tracker script remains valid and retains its saved-progress features', () => {
  const script = tracker.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'tracker script should exist');
  assert.doesNotThrow(() => new Function(script));
  assert.match(script, /localStorage\.getItem\(STORAGE_KEY\)/);
  assert.match(script, /localStorage\.setItem\(STORAGE_KEY/);
  assert.match(script, /data-roadmap-outcome/);
  assert.match(script, /JSON\.stringify\(payload, null, 2\)/);
  assert.match(script, /implementationUpdates/);
});
