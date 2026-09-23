import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceFile = path.join(root, 'docs', 'qa', 'qa-testing-tracker.html');
const outputDir = path.join(root, 'public', 'review-tracker');
const sourceHtml = fs.readFileSync(sourceFile, 'utf8');
const scriptMatch = sourceHtml.match(/\n    <script>([\s\S]*?)\n    <\/script>\n  <\/body>/);

if (!scriptMatch) throw new Error('Tracker script block was not found.');

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const hostedHtml = sourceHtml
  .replace(scriptMatch[0], '\n    <script src="/review-tracker/tracker.js"></script>\n  </body>')
  .replaceAll('AI Playbook QA Testing Tracker', 'AI Playbook Review Tracker')
  .replace('<p class="eyebrow">Testing workspace</p>', '<p class="eyebrow">Review workspace</p>')
  .replace('<h1 id="page-title">QA testing overview</h1>', '<h1 id="page-title">Review overview</h1>');

fs.writeFileSync(path.join(outputDir, 'index.html'), hostedHtml);
fs.writeFileSync(
  path.join(outputDir, 'tracker.js'),
  scriptMatch[1].trimStart().replaceAll('AI Playbook QA Testing Tracker', 'AI Playbook Review Tracker') + '\n'
);

const evidencePaths = new Set();
for (const match of sourceHtml.matchAll(/docs\/qa\/(evidence\/[A-Za-z0-9_./ -]+)/g)) {
  evidencePaths.add(match[1].trim().replace(/[.;]+$/, ''));
}
for (const match of sourceHtml.matchAll(/href="(evidence\/[^"]+)"/g)) {
  evidencePaths.add(match[1]);
}

for (const relativePath of evidencePaths) {
  const sourcePath = path.join(root, 'docs', 'qa', relativePath);
  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) continue;
  const destinationPath = path.join(outputDir, relativePath);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

console.log(`Generated AI Playbook Review Tracker with ${evidencePaths.size} evidence references.`);
