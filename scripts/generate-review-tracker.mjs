import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const redesignDir = path.join(root, 'docs', 'qa', 'tracker-redesign');
const publishDir = path.join(redesignDir, 'publish', 'review-tracker');
const destinationDir = path.join(root, 'public', 'review-tracker');
const templateSourceDir = path.join(publishDir, 'template');
const templateDestinationDir = path.join(destinationDir, 'template');

function assertInsideWorkspace(target, label) {
  const relative = path.relative(root, path.resolve(target));
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`${label} is outside the workspace: ${target}`);
  }
}

function copyRequired(source, destination) {
  if (!fs.existsSync(source) || !fs.statSync(source).isFile()) {
    throw new Error(`Required redesign file is missing: ${source}`);
  }
  fs.copyFileSync(source, destination);
}

assertInsideWorkspace(redesignDir, 'Redesign source');
assertInsideWorkspace(destinationDir, 'Review tracker destination');
assertInsideWorkspace(templateDestinationDir, 'Template destination');

fs.mkdirSync(destinationDir, { recursive: true });
for (const fileName of ['index.html', 'tracker.js', 'theme-init.js']) {
  copyRequired(path.join(publishDir, fileName), path.join(destinationDir, fileName));
}

// Replace only the reusable template. The evidence folder belongs to the live tracker.
fs.rmSync(templateDestinationDir, { recursive: true, force: true });
fs.mkdirSync(templateDestinationDir, { recursive: true });
for (const fileName of ['index.html', 'tracker.js', 'theme-init.js']) {
  copyRequired(path.join(templateSourceDir, fileName), path.join(templateDestinationDir, fileName));
}

copyRequired(
  path.join(redesignDir, 'ai-playbook-example.html'),
  path.join(root, 'docs', 'qa', 'qa-testing-tracker.html'),
);

if (!fs.existsSync(path.join(destinationDir, 'evidence'))) {
  throw new Error('The existing public review-tracker evidence directory was not preserved.');
}

console.log('Published the redesigned QA tracker and blank template; existing evidence was preserved.');
