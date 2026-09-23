import assert from 'node:assert/strict';
import test from 'node:test';

import { buildCertificatePrintMarkup } from '../src/app/components/certificate/certificateMarkup.ts';
import {
  CERTIFICATE_PRINT_DELAY_MS,
  openCertificatePrintDocument,
} from '../src/app/components/certificate/certificatePrintController.ts';

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
  assert.doesNotMatch(markup, /<script\b/i);
});

test('certificate markup escapes user-controlled text for HTML and SVG', () => {
  const markup = buildCertificatePrintMarkup({
    ...certificateInput,
    subtitle: 'Completion <Approved>',
    displayName: 'A & B <script>alert("test")</script>',
  });

  assert.match(markup, /<title>Completion &lt;Approved&gt;<\/title>/);
  assert.match(markup, /A &amp; B/);
  assert.match(markup, /&lt;script&gt;alert\(&quot;test&quot;\)&lt;\/script&gt;/);
  assert.doesNotMatch(markup, /<script\b/i);
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

test('certificate markup preserves every word in a long supported name', () => {
  const displayName = 'Firstpart Secondpart Thirdpart Fourthpart Fifthpart Sixthpart Seventhpart LASTTOKEN';
  const markup = buildCertificatePrintMarkup({ ...certificateInput, displayName });

  for (const word of displayName.split(' ')) assert.match(markup, new RegExp(word));
  assert.match(markup, /LASTTOKEN/);
});

function createFakePrintHost({ blocked = false } = {}) {
  const calls = [];
  let afterPrint;
  let scheduled;
  const printWindow = {
    closed: false,
    document: {
      open: () => calls.push('document.open'),
      write: (markup) => calls.push(['document.write', markup]),
      close: () => calls.push('document.close'),
    },
    addEventListener: (type, listener, options) => {
      calls.push(['addEventListener', type, options]);
      afterPrint = listener;
    },
    close: () => {
      calls.push('window.close');
      printWindow.closed = true;
    },
    focus: () => calls.push('window.focus'),
    print: () => calls.push('window.print'),
  };
  const host = {
    open: (...args) => {
      calls.push(['window.open', ...args]);
      return blocked ? null : printWindow;
    },
    setTimeout: (callback, delay) => {
      calls.push(['setTimeout', delay]);
      scheduled = callback;
      return 1;
    },
  };

  return {
    calls,
    host,
    printWindow,
    runAfterPrint: () => afterPrint?.(),
    runScheduled: () => scheduled?.(),
  };
}

test('certificate print controller reports a blocked popup without scheduling work', () => {
  const fake = createFakePrintHost({ blocked: true });
  let markupBuilt = false;

  assert.equal(openCertificatePrintDocument(fake.host, () => {
    markupBuilt = true;
    return '<!doctype html>';
  }), false);
  assert.equal(markupBuilt, false);
  assert.deepEqual(fake.calls, [[
    'window.open', '', '_blank', 'width=1280,height=900',
  ]]);
});

test('certificate print controller writes, delays printing and closes after print', () => {
  const fake = createFakePrintHost();
  const markup = '<!doctype html><title>Certificate</title>';

  assert.equal(openCertificatePrintDocument(fake.host, () => markup), true);
  assert.deepEqual(fake.calls, [
    ['window.open', '', '_blank', 'width=1280,height=900'],
    'document.open',
    ['document.write', markup],
    'document.close',
    ['addEventListener', 'afterprint', { once: true }],
    ['setTimeout', CERTIFICATE_PRINT_DELAY_MS],
  ]);

  fake.runScheduled();
  assert.deepEqual(fake.calls.slice(-2), ['window.focus', 'window.print']);

  fake.runAfterPrint();
  assert.equal(fake.printWindow.closed, true);
  assert.equal(fake.calls.at(-1), 'window.close');
});

test('certificate print controller does not print a window closed during the delay', () => {
  const fake = createFakePrintHost();

  openCertificatePrintDocument(fake.host, () => '<!doctype html>');
  fake.printWindow.closed = true;
  fake.runScheduled();

  assert.doesNotMatch(JSON.stringify(fake.calls), /window\.focus|window\.print/);
});
