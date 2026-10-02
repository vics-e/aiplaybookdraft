import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'docs', 'qa', 'qa-testing-tracker.html');
const outputDir = path.join(root, 'docs', 'qa', 'template');
const outputPath = path.join(outputDir, 'qa-review-tracker-template.html');

let html = fs.readFileSync(sourcePath, 'utf8');

function removeBlock(start, end) {
  const startIndex = html.indexOf(start);
  if (startIndex === -1) throw new Error(`Template start marker was not found: ${start}`);
  const endIndex = html.indexOf(end, startIndex);
  if (endIndex === -1) throw new Error(`Template end marker was not found: ${end}`);
  html = html.slice(0, startIndex) + html.slice(endIndex + end.length);
}

html = html
  .replace('<title>QA Review Tracker — AI Playbook</title>', '<title>QA Review Tracker — [PROJECT NAME]</title>')
  .replace('<span>AI Playbook · Assessment date: 23rd Sept 2026</span>', '<span>[PROJECT NAME] · Assessment date: [ASSESSMENT DATE]</span>')
  .replace('<p class="eyebrow">AI Playbook</p>', '<p class="eyebrow">[PROJECT NAME]</p>')
  .replace('<p><strong>Assessment date:</strong> 23rd Sept 2026</p>', '<p><strong>Assessment date:</strong> [ASSESSMENT DATE]</p>')
  .replace('<h3>Current assessment · 23rd Sept 2026</h3>', '<h3>Current assessment · [ASSESSMENT DATE]</h3>')
  .replace('<p><strong>There are no recorded failures.</strong> The remaining checks require business decisions, delivery evidence, browser or device testing, CMS integration checks, or formal QA approval.</p>', '<p>Complete the checks that can be evidenced directly. Leave business decisions, unavailable browsers or devices, external integrations and formal release approval with the appropriate project or QA owner.</p>')
  .replaceAll('Needs Sage/QA', 'Needs Project/QA')
  .replaceAll('Needs Sage or QA', 'Needs Project or QA')
  .replaceAll('need Sage or QA', 'need Project or QA')
  .replaceAll('Victor / Playbook', 'Project team')
  .replaceAll('Other Sage team', 'Other team')
  .replaceAll('Sage or QA', 'Project or QA')
  .replaceAll('future Sage integration', 'future integration')
  .replaceAll('Sage can change that applicability decision', 'The project or QA owner can change that applicability decision')
  .replaceAll('ai-playbook-qa-before-row-audit', 'qa-review-tracker-[PROJECT-SLUG]-before-update')
  .replaceAll('ai-playbook-qa-audit-revision', 'qa-review-tracker-[PROJECT-SLUG]-revision')
  .replaceAll('ai-playbook-qa-tracker', 'qa-review-tracker-[PROJECT-SLUG]')
  .replace("const revision = 'self-checks-2026-09-23-v2';", "const revision = 'template-initial-v1';")
  .replace("'# AI Playbook QA Review Tracker'", "'# QA Review Tracker — [PROJECT NAME]'")
  .replace('ai-playbook-qa-tracker-${date}.md', '[PROJECT-SLUG]-qa-review-${date}.md')
  .replace('ai-playbook-qa-tracker-editable-${date}.json', '[PROJECT-SLUG]-qa-review-editable-${date}.json')
  .replace("format: 'qa-review-tracker-[PROJECT-SLUG]'", "format: 'qa-review-tracker'")
  .replace("payload?.format !== 'qa-review-tracker-[PROJECT-SLUG]'", "payload?.format !== 'qa-review-tracker'")
  .replace('The selected file is not a valid AI Playbook QA tracker backup.', 'The selected file is not a valid QA tracker backup.');

removeBlock('          <section aria-labelledby="remaining-groups-title">', '          </section>');
removeBlock('          <details class="compact-details">\n            <summary>Reuse this QA process on another project</summary>', '          </details>');
removeBlock('          <details class="legacy-evidence"><summary>Archived evidence and testing history</summary>', '          </details>');

const seedStart = html.indexOf('      const seedAssessments = {');
const previousStart = html.indexOf('      const previousSeedAssessments = ', seedStart);
if (seedStart === -1 || previousStart === -1) throw new Error('Assessment seed markers were not found.');
html = html.slice(0, seedStart)
  + '      const seedAssessments = {};\n'
  + html.slice(previousStart);
html = html.replace(/      const previousSeedAssessments = [\s\S]*?;\r?\n\r?\n      let assessments = \{\};/, '      const previousSeedAssessments = {};\n\n      let assessments = {};');

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, html);
console.log(`Generated reusable QA tracker template at ${path.relative(root, outputPath)}.`);
