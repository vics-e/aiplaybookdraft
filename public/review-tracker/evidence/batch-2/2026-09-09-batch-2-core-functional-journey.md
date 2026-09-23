> Audit correction — 2026-09-09: legacy supporting-evidence bundle, not a completed batch of checklist rows. Historical completion totals are withdrawn. Consult row-audit/2026-09-09-audit.md and the tracker for authoritative statuses.

# Batch 2: Core functional journey

Date: 9 September 2026  
Environment: local production build at `http://localhost:4180/`  
Browser: Codex in-app Chromium on Windows

## Results

| Check | Result | Evidence |
|---|---|---|
| Start playbook and navigate between sections/pages | Pass | Start button opened Contents; sidebar navigation opened Section 1, Section 7 and Conclusion pages. |
| Save an activity answer | Pass | Selected “We are experimenting with AI assistants” on Identify Your Stage. The application displayed “Selection saved locally”. |
| Refresh persistence | Pass | After reloading the page, the selected stage and current page were restored. |
| Optional blank activity | Pass | Capacity Reflection was left blank. The summary showed “Not completed” without a required-field error. |
| Activity summary | Pass | Summary reported 2 of 57 completed activities and displayed the saved stage and certificate name. Edit and Cancel controls opened and closed correctly. |
| Glossary search | Pass | “audit trail” returned only AI Audit Trail. An unmatched search displayed “No glossary terms found”. Clearing restored the glossary. |
| Flashcards | Pass | Reveal worked and “I know this” advanced to the next card and changed progress from 0/24 to 1/24. |
| Certificate personalisation | Pass | The entered name updated the certificate preview and activity summary. HTML/script-like text remained literal text and did not execute. |
| Certificate print/save action | Partially evidenced | The button is present and automated certificate tests pass. The operating-system print/save dialogue was not completed in this browser run. |

## Automated verification

The matching automated suite was rerun after the browser journey. All 28 tests passed with no failures. It covered saved-state hydration, invalid-state recovery, navigation boundaries, activity completion, summary editing, certificate safety and printing, glossary sorting, workflow data, prompt-library data and tool-matrix data.

Command: `node --test --test-isolation=none tests/playbook-journey-state.test.mjs tests/activity-summary-journey.test.mjs tests/certificate-markup.test.mjs tests/page-content-models.test.mjs`

## Notes and limitations

- This was a representative journey, not a manual check of every page and every button.
- Two local console messages concerned Vercel Analytics not being available on the local static server. Batch 1 production testing did not show these messages, so they are not recorded as an application defect.
- Test values were entered only into the local build origin. The live application data was not changed.
