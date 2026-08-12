import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const vercelConfig = JSON.parse(read('../vercel.json'));
const index = read('../index.html');
const themeInit = read('../public/theme-init.js');
const main = read('../src/main.tsx');
const pageContent = read('../src/app/components/PageContent.tsx');
const certificatePrintController = read('../src/app/components/certificate/certificatePrintController.ts');

test('Vercel applies the browser security headers to every response', () => {
  const wildcard = vercelConfig.headers.find((entry) => entry.source === '/(.*)');
  assert.ok(wildcard, 'expected a wildcard header rule');

  const headers = Object.fromEntries(wildcard.headers.map(({ key, value }) => [key.toLowerCase(), value]));
  assert.match(headers['content-security-policy'], /default-src 'self'/);
  assert.match(headers['content-security-policy'], /script-src 'self'/);
  assert.match(headers['content-security-policy'], /frame-ancestors 'none'/);
  assert.match(headers['content-security-policy'], /object-src 'none'/);
  assert.match(headers['content-security-policy'], /style-src[^;]*https:\/\/fonts\.googleapis\.com/);
  assert.match(headers['content-security-policy'], /font-src[^;]*https:\/\/fonts\.cdnfonts\.com[^;]*https:\/\/fonts\.gstatic\.com/);
  assert.equal(headers['x-content-type-options'], 'nosniff');
  assert.equal(headers['x-frame-options'], 'DENY');
  assert.equal(headers['referrer-policy'], 'strict-origin-when-cross-origin');
  assert.match(headers['permissions-policy'], /camera=\(\)/);
});

test('the application shell has no inline executable script', () => {
  assert.doesNotMatch(index, /<script(?![^>]*\bsrc=)[^>]*>/i);
  assert.match(index, /<script src="\/theme-init\.js"><\/script>/);
  assert.match(themeInit, /localStorage\.getItem\('sage-ai-playbook-theme'\)/);
});

test('analytics removes query strings and fragments before sending a page view', () => {
  assert.match(main, /url\.search = ""/);
  assert.match(main, /url\.hash = ""/);
  assert.match(main, /<Analytics beforeSend=\{redactAnalyticsUrl\} \/>/);
});

test('certificate printing executes from trusted application code, not generated markup', () => {
  assert.match(pageContent, /openCertificatePrintDocument\(window, \(\) => buildCertificatePrintMarkup/);
  assert.match(certificatePrintController, /printWindow\.addEventListener\('afterprint'/);
  assert.match(certificatePrintController, /printWindow\.print\(\)/);
});
