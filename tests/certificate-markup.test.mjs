import assert from 'node:assert/strict';
import test from 'node:test';

import { buildCertificatePrintMarkup } from '../src/app/components/certificate/certificateMarkup.ts';

const certificateInput = {
  title: 'The AI Playbook for Accountants & Bookkeepers',
  subtitle: 'Certificate of Completion',
  displayName: 'Example Practice',
  statement: 'Completed the AI Playbook and defined practical next steps.',
  poweredByTitle: 'Powered by Sage',
  poweredByText: 'Built for responsible AI adoption.',
  completionDate: '9 August 2026',
};

test('certificate markup preserves the print contract', () => {
  const markup = buildCertificatePrintMarkup(certificateInput);

  assert.match(markup, /<!doctype html>/);
  assert.match(markup, /@page \{ size: A4 landscape; margin: 10mm; \}/);
  assert.match(markup, /Certificate of Completion/);
  assert.match(markup, /Example Practice/);
  assert.match(markup, /window\.print\(\)/);
  assert.match(markup, /afterprint/);
  assert.match(markup, /window\.close\(\)/);
});

test('certificate markup escapes user-controlled text for HTML and SVG', () => {
  const markup = buildCertificatePrintMarkup({
    ...certificateInput,
    subtitle: 'Completion <Approved>',
    displayName: 'A & B <script>',
  });

  assert.match(markup, /<title>Completion &lt;Approved&gt;<\/title>/);
  assert.match(markup, /A &amp; B &lt;script&gt;/);
  assert.doesNotMatch(markup, /<script>\s*<\/script>/);
});

test('certificate markup wraps long names without dropping the certificate structure', () => {
  const markup = buildCertificatePrintMarkup({
    ...certificateInput,
    displayName: 'A Particularly Long Accountancy and Bookkeeping Practice Name',
  });

  assert.match(markup, /font-size="34"/);
  assert.match(markup, /<tspan x="561\.5" y="302">/);
  assert.match(markup, /<tspan x="561\.5" y="344">/);
});
