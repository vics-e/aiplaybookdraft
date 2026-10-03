# Batch 8 — inputs and functional rows

Executed 9–10 September 2026, spanning midnight BST. Test target: isolated copy of deployed assets at 127.0.0.1:4181; no live saved answers were edited.

Rows: manual-06, 08–16, 18, 20–27, 30–34, 36 (25 rows).

## Actual input coverage

Every default editable text control across the 63-page inventory was exercised with `-1`, a 130-character accent/punctuation/script-like corpus, 10,000 `Q` characters, and blank keyboard deletion, then with corpus persistence through reload. Fixed-choice controls do not accept arbitrary text. Further expanded controls: all 11 specification fields, all 15 pricing service fields, all 16 tool-matrix fields, all 24 prompt template variables, and all 39 available summary editors (save, reopen, compare, cancel, final reload). These counts describe fields/editors, never completed checklist rows.

Raw early cases: `input-cases.json`. Later successful CUA call observations are transcribed explicitly in `input-observations-supplement.json`, because the REPL's aggregate variable did not preserve updates across later calls. The supplement states its provenance; it is not presented as a raw automated report. An interrupted long call was rerun in bounded groups and is not counted. Successful summaries include per-page field counts and exceptions.

`fill('')` was a browser-tool no-op; keyboard Select All / Backspace actually cleared inputs. Early blank attempts are retained as inconclusive tool results, followed by keyboard rechecks. Empty tool name normalises to a default name; it does not show a required-field error. No application defect is inferred from either tooling behaviour or that documented normalisation.

Corpus: European accented upper/lowercase letters, æ/Æ, œ/Œ, ø/Ø, ß, € and £, ampersand, angle brackets, literal `<script>QA_ONLY</script>`, single/double quotes, slash/backslash and minus. Values remained literal. This is a functional special-character test, not a claim of penetration-test coverage.

## Confirmed defects and row links

| Defect | Reproduction and observed result | Rows |
|---|---|---|
| QA-03 Negative time calculation | Page 43: name a service, enter -6 in Time today and -3 in Estimated time with AI. UI reports positive **50% · 3.0 hours**. Minus signs are discarded by numeric extraction. | manual-06, 12 |
| QA-04 Storage failure feedback | Page 63: save QA preserved baseline. Open same page with `quota=full`, enter QA unsaved quota value. UI says **Answers saved locally**. Reload returns QA preserved baseline. Test fixture throws QuotaExceededError; no disk filling or user-origin changes. | manual-33 |
| QA-05 Certificate truncation | An 83-character multiword name ending LASTTOKEN retains only Firstpart Secondpart / Thirdpart Fourthpart in generated print markup. Source builder executed and matching deployed `slice(0,2)` logic verified. Generated document inspected in browser. | manual-13 |
| QA-07 Workflow gate bypass | Page 24: add one workflow. Normal Next requires at least three, but clicking **2 Score each** enters scoring with one. Final settled DOM confirms Workflow 1 of 1. | manual-18 |
| QA-08 Clear confirmation | Page 31: populate prompt parts, click Clear. Fields clear and buttons disable; there is no explicit cleared/deleted confirmation message. | manual-14 |

Candidate **QA-06**: select AI (Artificial Intelligence), then filter `audit trail`. Only AI Audit Trail remains in the list, while the old definition remains. The list itself matches correctly. Retaining a selected detail may be intentional; this is recorded for a Sage UX decision, **not counted as a confirmed failure**. manual-16, 26, 27 remain Needs Sage or QA. Evidence: glossary-filter-selected.txt/.png.

## Full row dispositions

Passed: manual-10 (optional fields do not produce mandatory errors), manual-15 (specified special-character tests, including expanded and summary fields).

Failed: manual-06, 12, 13, 14, 18, 33.

Not applicable to this standalone deployment: manual-20 (uploads), 22 (email submission), 24 (external page links), 25 (CMS component publishing), 31 and 34 (form-submit endpoints). Runtime requests and generated local output are not uploads/email submissions. Future CMS integration remains open in the release rows.

Needs Sage or QA: manual-08, 09, 11, 16, 21, 23, 26, 27, 30, 32, 36. Front-end accents have evidence, but Page Editor is unavailable. A DATE variable exists in the prompt library: valid 2028-02-29 and invalid 2027-02-29 are accepted literally; calendar validation requirements need a decision. This corrects the earlier inaccurate claim that the app contains no date fields. Required activities, expected error/output catalogues and altered-string messaging need agreed requirements.

Both Certificate and Summary provide print/download actions. Certificate was clicked, but a usable native save dialogue/output tab was not exposed through the available browser tool. **QA must save and reopen both files.** Native print/save is not inferred from markup-builder tests.

## Artifacts

Input and expanded groups: input-cases.json, input-observations-supplement.json, spec-fields.json, spec-review.txt, spec-review-reload.txt, pricing-three-services.json, tool-matrix-four-groups.json, prompt-variables.json, summary-editors.jsonl, summary-after-reload.txt.

Defect captures: negative-pricing.txt/.png, quota-false-save.txt/.png, quota-after-reload.txt, certificate-truncation.json/.png, certificate-long-name.html, workflow-gate.txt, prompt-clear.txt. Candidate and date captures named above.

Batch 8 complete
- 20 of 67 checked
- 5 completed with evidence
- 15 failed
- remaining manual/Sage confirmations: CMS accent review, date/mandatory/error/output rules, glossary selection decision, native saving, specified browser/device and release approval
Now moving to Batch 9
