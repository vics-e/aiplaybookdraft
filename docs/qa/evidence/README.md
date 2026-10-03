# AI Playbook QA evidence

The current review is in the [AI Playbook QA Testing Tracker](../qa-testing-tracker.html). Start with its overview, then filter by status or search for a checklist ID. Each row identifies its owner, result, next action and evidence.

The current handoff records **67 of 67 assessed: 31 passed, 0 failed, 30 need Sage or QA and 6 are not applicable**. Historical failures remain in the evidence so later reviewers can see what was fixed and re-tested. See the [final assessment](row-audit/batch-9.md), [67-case runbook](../checklist-runbook.md) and [lessons learned](../lessons-learned.md).

Tracker edits are saved in the current browser. Export Markdown to share changes with another reviewer; local browser edits do not update everyone else's copy automatically. The saved HTML contains the current assessment baseline.

Evidence scope: default layout measurements do not complete review of every expanded or populated state. Later input observations are in `row-audit/input-observations-supplement.json`; the earlier aggregate JSON is incomplete, and interrupted calls are not counted. Legacy bundles 1–5 are supporting evidence, not completed checklist batches. Internal Sage source documents and captures are excluded because this repository is public.

Store new QA evidence in a folder named after the tracker check ID, for example:

```text
docs/qa/evidence/manual-04/
docs/qa/evidence/release-16/
```

Use clear dated filenames such as:

```text
2026-09-09-1920px-home-page.png
2026-09-09-chrome-windows-console.txt
```

For each tracker item, record:

- what was tested;
- the result;
- the date;
- the browser, device or viewport where relevant;
- any limitation; and
- the relative path to the screenshot, report or test output.

A screenshot supports a visual result, but it should be paired with a short tester comment explaining what the screenshot proves.
