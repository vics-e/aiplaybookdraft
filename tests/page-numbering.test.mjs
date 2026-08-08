import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const appShell = readFileSync(new URL('../src/app/SageAIPlaybook.tsx', import.meta.url), 'utf8');

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
