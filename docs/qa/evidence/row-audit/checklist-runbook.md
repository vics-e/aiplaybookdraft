# AI Playbook — executable checklist runbook

Prepared 10 September 2026. This documents test cases; it does not approve requirements or release. Scope: 38 manual and 29 release criteria from the two supplied PDFs.

Global prerequisites: deployment URL; isolated QA origin for edits; approved validation/design rules where a case calls for them; actual browser/device or CMS/Jira/VQA access for external cases. Never change live saved answers. A case can be documented and ready while its execution awaits its stated prerequisites.

Status rules: pass only the full expected condition; fail reproducible counterexamples; leave partial/blocked evidence uncompleted. Retain date, environment, steps, expected/actual result and an openable artifact for every executed case.

## manual-01 — Scroll bar should appear only if required.

- Owner: QA.
- Procedure: Visit all 63 pages and expanded activity states at 320, 767, 768, 1080 and 1920 CSS px. Inspect root and internal scrolling; traverse any horizontal strips by keyboard. Fail unnecessary scrollbars, inaccessible overflow or trapped scroll regions.
- Expected: Only show scrolling where content requires it. No unintended horizontal scrollbar or trapped internal scrolling.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Partial 2026-09-09: all 63 default pages measured at 320, 767, 768, 1080 and 1920 CSS px, with no root horizontal overflow. Intentional internal scroll strips identified. All expanded, populated and keyboard scroll states are not exhausted; see batch-7.md. Next: manual visual/keyboard review of populated and expanded states in both themes against Sage-approved designs; geometric scans alone are insufficient.

## manual-02 — Check enough space is applied between field labels, columns, rows and errors.

- Owner: Victor / Playbook.
- Procedure: At the same width matrix, open all activity field groups and error/help states. Inspect labels, inputs, cards and messages. Include page 43 paired time fields at 320px; capture any overlap/protrusion.
- Expected: Labels, fields, rows and error messages have consistent spacing and do not overlap or appear cramped.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/pricing-320-overlap.png; docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Passed. 18 Sep 2026: User review confirms the spacing criterion passes. Earlier 320px pricing evidence recorded cramped controls, so that narrower-layout observation remains a follow-up for manual-28/release-26; this row is marked passed by the current review decision.

## manual-03 — All text should be properly aligned.

- Owner: Victor / Playbook.
- Procedure: Inspect text grids and alignment at all widths, including page 60 glossary at 1080px and page 43 at 320px. Compare intended text containment to screenshots and approved designs.
- Expected: Text follows the intended page grid and component alignment. Deliberate exceptions are visually consistent.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/glossary-1080-overflow.png; docs/qa/evidence/row-audit/pricing-320-overlap.png.
- Current disposition: Failed. 2026-09-09: page 60 glossary at 1080px has definition headings and card text extending outside their assigned columns; pricing labels at 320px also misalign.

## manual-04 — Check the site is responsive at 767px, 768px, 1080px and 1920px.

- Owner: Victor / Playbook.
- Procedure: Render every page at exactly 767, 768, 1080 and 1920 CSS px. Check measured viewport, text containment and interactive use; root scrollWidth equality alone is insufficient.
- Expected: At every required width, content remains readable and usable with no clipping or unintended horizontal overflow.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/glossary-1080-overflow.png.
- Current disposition: Failed. 2026-09-09: 63 default pages checked at exact required widths 767, 768, 1080 and 1920. Page 60 at 1080px fails readability/containment despite no root overflow.

## manual-05 — Font should be consistent throughout the site.

- Owner: Business owner.
- Procedure: Obtain Sage font/fallback approval; inspect loaded font resources and heading/body/label styles across both themes and pages. Distinguish resource availability from typographic consistency.
- Expected: The playbook uses a deliberate type system. Headings, body text, labels and supporting text each use consistent assigned font families, sizes and weights. They do not all need to be identical.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/http-checks.json; docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Partial: declared font files 404, leaving fallback text. This proves a resource defect, not inconsistent typography by itself. Sage must confirm the intended fallback/font baseline for final visual approval.

## manual-06 — Display appropriate server-side and client-side validation for form fields.

- Owner: Victor / Playbook.
- Procedure: Obtain validation rules; enter invalid and boundary inputs, including -6/-3 in page 43 time fields. Check clear, accurate client-side feedback. Identify any server integration before testing server validation.
- Expected: Client-side validation should match agreed required fields. Server-side validation is not applicable unless the hosting or integration design introduces form submission.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/negative-pricing.txt; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Failed. 10 Sep 2026: pricing time inputs -6 and -3 yield a positive 50% / 3.0-hour reduction, with no invalid-value message. Client-side numeric interpretation fails; server submission remains absent.

## manual-07 — Check for broken links, missing images, CSS, Flash, RSS, script errors, expired domains and server configuration issues.

- Owner: Victor / Playbook.
- Procedure: Inventory deployed resources and rendered links; request them and inspect missing resources/CSP failures. Include four declared Sage font files.
- Expected: All rendered links and resources load successfully, with no missing images, stylesheet failures or script errors.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-6.md; docs/qa/evidence/row-audit/http-checks.json.
- Current disposition: Failed. 2026-09-09: four declared Sage font files again return 404. robots.txt and favicon.ico also 404. Role page checked; no rendered remote image or console error reproduced there. Resource requirement fails on fonts alone.

## manual-08 — Test all mandatory fields validate correctly based on user input.

- Owner: Business owner.
- Procedure: For every agreed required response, test blank, whitespace, boundary and valid values. Check workflow minimum-item gates through both Next and numbered step controls.
- Expected: Every field agreed as mandatory rejects invalid or empty input and provides a clear error message.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/workflow-gate.txt; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Needs Sage or QA. Partial: optional native fields have no required flag. Workflow UI says at least 3 items but a step button bypasses it (manual-18). Business owner must define mandatory responses and acceptance rules.

## manual-09 — Test accented letters are displayed correctly in Page Editor and the front end.

- Owner: CMS.
- Procedure: Enter the source PDF accent corpus into all app controls and CMS Page Editor. Save, reload, reopen output and compare characters. CMS credentials/environment are required for the editor half.
- Expected: Accented characters render and persist without corruption in all relevant content and input fields.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/spec-fields.json; docs/qa/evidence/row-audit/summary-editors.jsonl.
- Current disposition: Needs Sage or QA. Front-end accent corpus retained in default text fields, all 11 spec fields, 15 pricing fields, 16 tool fields, 24 prompt variables and all 39 available summary editors. Page Editor is unavailable and cannot be signed off from this standalone deployment.

## manual-10 — Test no mandatory error message is present for optional fields.

- Owner: Victor / Playbook.
- Procedure: Clear each optional field using keyboard deletion. Navigate away/reload where relevant. Verify no required-field error, while mandatory business rules remain separately scoped.
- Expected: Fields defined as optional can be left empty without showing a required-field error.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/input-cases.json; docs/qa/evidence/row-audit/input-observations-supplement.json; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Passed. 9–10 Sep 2026: optional text fields accepted keyboard clearing without native required errors. Source and expanded field inventories show no required attributes; summary/spec/prompt optional fields remain usable. Blank tool name reverts to its default without an error. This does not approve mandatory-field policy.

## manual-11 — Test leap years are validated correctly and do not cause errors.

- Owner: Business owner.
- Procedure: Confirm whether free-text DATE variables require calendar validation. If so, test 2028-02-29, 2027-02-29, 2000-02-29 and 2100-02-29 with valid/invalid expected outcomes.
- Expected: Only applicable if the experience introduces date entry or date calculations.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/leap-date-valid.txt; docs/qa/evidence/row-audit/leap-date-invalid.txt.
- Current disposition: Needs Sage or QA. Audit correction: there IS a free-text DATE placeholder in the prompt library. Both 2028-02-29 and invalid 2027-02-29 are accepted as literal template text. No date validation/calculation runs; Sage must confirm whether this free-form template needs calendar validation.

## manual-12 — Test negative input values for each field.

- Owner: Victor / Playbook.
- Procedure: Input negative values in all numeric or numerically interpreted controls. Specifically page 43 -6/-3 must not become a positive saving. Exercise score controls at minimum bounds.
- Expected: Numeric controls reject or safely constrain values outside their agreed range.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/negative-pricing.txt; docs/qa/evidence/row-audit/negative-pricing.png.
- Current disposition: Failed. 10 Sep 2026: -6 hours today and -3 with AI are parsed as positive values and report a 50% / 3.0-hour saving. Earlier clamp tests covered workflow scores only and missed pricing text fields.

## manual-13 — Test the maximum length of every field to ensure data is not truncated.

- Owner: Victor / Playbook.
- Procedure: Test agreed limits and over-limit values for every field; include 10,000-character input and an 83-character multiword certificate name ending LASTTOKEN. Compare saved text and final exported output for loss.
- Expected: Long input remains usable, is stored safely and is not silently truncated in the interface or output.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/certificate-truncation.json; docs/qa/evidence/row-audit/certificate-truncation.png.
- Current disposition: Failed. 10 Sep 2026: certificate name Firstpart…LASTTOKEN (83 characters) is silently cut to Firstpart Secondpart / Thirdpart Fourthpart in generated output. Matching two-line slice is present in deployed bundle. 10,000-character input retention elsewhere does not cure output truncation.

## manual-14 — Check a confirmation message is displayed for update and delete operations.

- Owner: Victor / Playbook.
- Procedure: Update through summary Save, clear page 31 prompt fields and clear page 55 specification answers. Check accurate update/delete confirmation after each action and cancel any pre-delete confirmation.
- Expected: Explicit local updates and deletions provide accurate confirmation.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/prompt-clear.txt; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Failed. 10 Sep 2026: page 31 Clear removes the prompt parts and disables Clear; no explicit cleared/deleted confirmation message appears. Agent-spec Clear has a confirmation path; local delete/update actions are applicable, contrary to original N/A.

## manual-15 — Test all input fields for special characters.

- Owner: Victor / Playbook.
- Procedure: Enter accents, punctuation, quotes, slash/backslash, ampersand and literal HTML-like strings in every text field, including expanded groups and all available summary editors. Save, reopen and compare literal values.
- Expected: Common punctuation, accented characters and HTML-like text are accepted or safely rejected without corruption or code execution.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/input-observations-supplement.json; docs/qa/evidence/row-audit/summary-editors.jsonl; docs/qa/evidence/row-audit/prompt-variables.json.
- Current disposition: Passed. 9–10 Sep 2026: accented characters, punctuation, quotes, backslash and literal script-like text tested through every default editable text control, expanded spec/pricing/tool/prompt groups and all 39 available summary editors. Values retained literally and persisted/reopened. Fixed-choice controls do not accept arbitrary text. This is the specified character test, not a penetration-test sign-off.

## manual-16 — Test the sorting and filtering functionality.

- Owner: Business owner.
- Procedure: Filter glossary and prompt library by exact, mixed-case, definition-text and unmatched terms; clear filters and inspect sorting. Select a glossary term before filtering it out; compare intended detail behaviour.
- Expected: Sorting and filters return accurate results, update predictably and can be cleared.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Needs Sage or QA. Partial / candidate QA-06: selecting AI then searching audit trail leaves only AI Audit Trail in list, but old AI definition remains. Matching list is accurate; Sage must decide whether retaining the selected detail is intended. Prompt filter/no-results/clear and expand/collapse also exercised.

## manual-17 — Test no errors are present in the browser console.

- Owner: Victor / Playbook.
- Procedure: Capture browser console/network failures on initial load and all representative interactive states. Include font errors and distinguish local analytics limitations from production failures.
- Expected: Normal journeys complete without errors in the browser console.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/pagespeed-console.txt; docs/qa/evidence/row-audit/batch-6.md.
- Current disposition: Failed. 2026-09-09: PageSpeed/Lighthouse production console audit records failed font loads (404). In-app console capture was empty, illustrating its narrower capture; it cannot support an error-free claim.

## manual-18 — Test the functionality of buttons, including enabled, disabled and hidden states.

- Owner: Victor / Playbook.
- Procedure: Exercise visible buttons plus enabled/disabled/hidden states. Include workflow Next versus numbered step navigation below three workflows, copy failures, menus, tabs, expand/collapse and output actions.
- Expected: Every visible button performs the intended action and disabled or hidden states occur only under the agreed conditions.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/workflow-gate.txt; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Failed. 10 Sep 2026: workflow Next is disabled below 3 workflows, but the 2 Score each button advances with only 1 workflow. Enabled/disabled controls enforce inconsistent gates.

## manual-19 — Test that failed functionality redirects the user to the custom error page (404).

- Owner: Victor / Playbook.
- Procedure: Request a harmless invalid deep path on deployment and inspect HTTP status plus custom error presentation. A generic Vercel 404 requires an explicit waiver to meet the custom-page requirement.
- Expected: Invalid application routes must show a custom error page. A generic hosting response is insufficient without an explicit Sage waiver.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/http-checks.json.
- Current disposition: Failed. 2026-09-09: /qa-nonexistent-20260909 returned Vercel 404: NOT_FOUND rather than a custom playbook error experience.

## manual-20 — Test all uploaded documents open correctly in a new window, new tab or intended destination.

- Owner: Victor / Playbook.
- Procedure: If uploaded-document support is introduced, open every supported file type and confirm intended destination/window. Otherwise document absent feature.
- Expected: Test all uploaded documents open correctly in a new window, new tab or intended destination.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Not applicable. 9–10 Sep 2026: no uploaded-document feature or uploaded-document links in rendered page inventory/source. Generated certificate and summary output are covered by manual-21.

## manual-21 — Test the user is able to download files.

- Owner: QA.
- Procedure: Use QA answers, click Download Certificate and Download / Print Summary, complete OS Save as PDF, reopen both files and compare content, names and pagination.
- Expected: The available certificate output opens and can be printed or saved through the browser.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Needs Sage or QA. Partial: both Download Certificate and Download / Print Summary require OS print/save. Certificate action clicked in controlled origin; no usable output tab/save dialogue exposed to browser tool. QA must save both outputs and reopen files. Certificate long-name defect is separately failed under manual-13.

## manual-22 — Test email functionality, such as feedback and order confirmation.

- Owner: Victor / Playbook.
- Procedure: If email integration is introduced, use a controlled QA recipient and verify sending, receipt and failure handling. Do not send to real clients. Otherwise document absent integration.
- Expected: Test email functionality, such as feedback and order confirmation.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Not applicable. 9–10 Sep 2026: no email submission integration exists. Prompt examples containing email text are local templates, not an email-sending feature.

## manual-23 — Validate that blank form submissions are not allowed and at least one field is required.

- Owner: Business owner.
- Procedure: Confirm mandatory response requirements; attempt blank/whitespace submission or completion. Verify the agreed minimum and feedback. Optional autosave is not a server form submission.
- Expected: At least one response is required only if the agreed business requirements define the activity as mandatory.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Needs Sage or QA. No server form submission. Activities auto-save and accept blank optional fields; business owner must decide whether any answer is mandatory before completion/output.

## manual-24 — Test external page links open in a new tab or window.

- Owner: Victor / Playbook.
- Procedure: Inventory rendered external page links, click each and confirm new tab/window behaviour; do not confuse asset/analytics requests with page links.
- Expected: Test external page links open in a new tab or window.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Not applicable. 9–10 Sep 2026: no external page-link controls found in all 63 default page DOM inventories or app source. Runtime font/analytics URLs are resources, not external page links.

## manual-25 — Check Create, Edit, Delete and Publish for a new component.

- Owner: CMS.
- Procedure: In a disposable CMS environment create, edit, delete and publish a test component; confirm page delivery. Standalone app has no such CMS controls.
- Expected: Check Create, Edit, Delete and Publish for a new component.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Not applicable. Standalone Vercel experience has no CMS/Page Editor component CRUD/publishing. Future Sage integration remains explicitly open in release-04/28 and manual-09.

## manual-26 — Verify data retrieval delivers the correct data, such as Search and News sections.

- Owner: Business owner.
- Procedure: Compare saved summary, specification, prompt and tool values to rendered retrieval after reload. Verify glossary selection/filter detail behaviour against the agreed UX rule.
- Expected: Local glossary, workflow and activity-summary retrieval displays the correct selected/saved data.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/summary-after-reload.txt.
- Current disposition: Needs Sage or QA. Local retrieval is applicable: summary values and spec/prompt/tool states persist. Candidate QA-06 retains a previously selected glossary detail after filtering it out; intended selection behaviour needs decision before full pass.

## manual-27 — Ensure search functions correctly and results are accurate and helpful to the customer.

- Owner: Business owner.
- Procedure: Search glossary and prompt library by exact/mixed-case/definition terms, unmatched text and blank input. Verify result lists and displayed detail; decide whether previously selected detail should persist.
- Expected: Search returns the expected matching playbook content and empty or cleared searches behave predictably.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Needs Sage or QA. Glossary matching, no results and clearing tested; after selecting AI then filtering audit trail, old AI definition remains beside the single Audit Trail result. Candidate QA-06 needs a selection-behaviour decision. Earlier representative search pass remains withdrawn.

## manual-28 — Test page rendering at different screen resolutions and rotations.

- Owner: Victor / Playbook.
- Procedure: Exercise portrait and landscape viewport pairs and actual device rotation where available. Check readable content and controls, including the known 320px pricing defect.
- Expected: Required portrait, landscape and viewport sizes remain readable and operable without clipping or overlap.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Failed. 2026-09-09: verified portrait 320x900 and landscape 1920x1080 CSS frames plus required widths. Page 43 narrow pricing defect and page 60 1080px glossary defect fail rendering. These are viewport simulations, not physical rotation tests.

## manual-29 — Test that the CSS and HTML used are compatible with the appropriate browser and device versions.

- Owner: QA.
- Procedure: Run the complete supported browser/device matrix, confirming versions and OS. Record missing environments rather than substituting Chromium or frame emulation.
- Expected: The supported browser and device matrix renders and behaves consistently. Missing browsers or physical devices are recorded for manual testing.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Partial: in-app Chromium only. Chrome and Edge installed but CUA reports both unavailable; no Firefox or Apple/Android device connected. No browsers installed. Physical portrait/landscape and latest-version certification remain QA work.

## manual-30 — Apply inputs that force all error messages to occur.

- Owner: Business owner.
- Procedure: Build the agreed error catalogue, then trigger every validation, storage, clipboard/output and integration error using controlled state. Check truthful recovery messages.
- Expected: Apply inputs that force all error messages to occur.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Needs Sage or QA. Partial: negative pricing input, workflow gate and quota-failure conditions exercised. Errors/mandatory rules are not fully specified; a complete expected-error catalogue requires business/QA agreement.

## manual-31 — Repeatedly attempt to submit a form by continually clicking the submit action.

- Owner: Victor / Playbook.
- Procedure: If a submit endpoint exists, rapidly repeat submission with QA data and check duplicates/debouncing. Otherwise document absent endpoint and assess local actions under manual-18.
- Expected: Repeatedly attempt to submit a form by continually clicking the submit action.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Not applicable. No form-submit endpoint exists. Local Add/Save/clear actions are covered under manual-14/18/32; source row's repeated form submission is not a backend scenario in this deployment.

## manual-32 — Force different outputs to be generated for each input.

- Owner: QA.
- Procedure: For each agreed input/output rule use contrasting values and branch/boundary cases; compare rendered outputs, saved data and refresh state. Use a requirement-to-case matrix.
- Expected: Different valid inputs produce the expected saved state, summary or output without stale data.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/input-observations-supplement.json.
- Current disposition: Needs Sage or QA. Partial: negative, accented, long and blank text inputs, all summary editors, live pricing output and workflow steps exercised. Expected conditional-output matrix requires agreed requirements. Failed pricing and quota cases remain separately recorded; no broad completion claim.

## manual-33 — Attempt to fill the file system to its capacity.

- Owner: Victor / Playbook.
- Procedure: On the isolated origin, save a baseline then use quota=full and change an answer. Verify failure feedback and preservation after reload. Never fill the real disk or user live storage.
- Expected: Controlled storage-quota failure preserves existing answers and gives truthful save feedback; do not fill the real filesystem.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/quota-false-save.txt; docs/qa/evidence/row-audit/quota-after-reload.txt; docs/qa/evidence/row-audit/quota-false-save.png.
- Current disposition: Failed. 10 Sep 2026: controlled QuotaExceededError simulation causes changed certificate name to show Answers saved locally, but reload restores the prior value. Disk was not filled; earlier saved data preserved. Browser quota is relevant to local saved answers.

## manual-34 — Attempt to submit blank forms repeatedly.

- Owner: Victor / Playbook.
- Procedure: If submission exists, repeatedly submit blank QA forms and check duplicates/errors. Otherwise document absent endpoint; test blank local edits separately.
- Expected: Attempt to submit blank forms repeatedly.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Not applicable. No submitted forms/endpoints. Repeated empty local edits are separate from source row's blank form submission; optional clearing and workflow gates were tested.

## manual-35 — Attempt to view an invalid page URL within the site.

- Owner: Victor / Playbook.
- Procedure: Request /qa-nonexistent-YYYYMMDD on deployment; record status and safe handling without exposing private data. Custom error design is separate manual-19.
- Expected: Request a harmless invalid route; it returns an error rather than crashing the application or exposing data.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/http-checks.json.
- Current disposition: Passed. 2026-09-09: invalid route safely returns HTTP 404. Custom presentation separately fails manual-19.

## manual-36 — Alter strings within the webpages where applicable and ensure an appropriate message is displayed.

- Owner: Business owner.
- Procedure: Define applicable altered-string message rules, enter malformed/HTML-like text and invalid persisted-state samples in isolated fixtures, then verify safe display and agreed feedback.
- Expected: Alter strings within the webpages where applicable and ensure an appropriate message is displayed.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-8.md.
- Current disposition: Needs Sage or QA. Literal altered/special strings retained safely in tested controls. Application intentionally lacks general validation messaging; Sage must define which altered-string states should produce messages.

## manual-37 — Run Google PageSpeed to identify performance improvements.

- Owner: Victor / Playbook.
- Procedure: Run Google PageSpeed mobile and desktop on the deployment; retain report/date, metrics, warnings and improvement recommendations. Report tool-run completion separately from performance approval.
- Expected: Run Google PageSpeed and record mobile/desktop findings and performance improvements. A run does not constitute release performance approval.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/pagespeed-mobile.txt; docs/qa/evidence/row-audit/pagespeed-desktop.txt; docs/qa/evidence/row-audit/batch-6.md.
- Current disposition: Passed. 2026-09-09 23:42 BST: Google PageSpeed web report completed after API 429. Performance 70 mobile / 90 desktop; LCP 11.3s / 2.0s; image savings ~1.4MiB, unused JS ~126KiB. Source asks to run the checker, not achieve a threshold. Scope: initial cover only.

## manual-38 — Run Lighthouse Accessibility to identify accessibility improvements.

- Owner: Victor / Playbook.
- Procedure: Run Lighthouse Accessibility; retain score, scope, findings and manual follow-ups. A cover-page score does not establish all-page keyboard/screen-reader compliance.
- Expected: Run Lighthouse Accessibility, retain results and identify follow-up work. This is the source row's tool-run requirement, not an all-page WCAG or screen-reader certification.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/pagespeed-mobile.txt; docs/qa/evidence/row-audit/pagespeed-desktop.txt; docs/qa/evidence/row-audit/batch-6.md.
- Current disposition: Passed. 2026-09-09: Lighthouse 13.4.1 via Google PageSpeed returned Accessibility 100 on mobile and desktop cover. Ten manual checks remain outside automation; keyboard, screen reader and every interactive state still require broader QA.

## release-01 — All designs are signed off.

- Owner: Business owner.
- Procedure: Obtain dated design sign-off covering the actual delivered revision.
- Expected: All designs are signed off.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Obtain dated design sign-off covering the actual delivered revision. Current local reports and git merge history do not establish this formal criterion.

## release-02 — Acceptance criteria are locked down.

- Owner: Business owner.
- Procedure: Obtain the locked acceptance criteria and revision/change baseline.
- Expected: Acceptance criteria are locked down.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Obtain the locked acceptance criteria and revision/change baseline. Current local reports and git merge history do not establish this formal criterion.

## release-03 — All code changes are complete and peer reviewed for each user story delivered.

- Owner: Other Sage team.
- Procedure: Map each delivered user story to completed commits and peer-review approval.
- Expected: All code changes are complete and peer reviewed for each user story delivered.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Map each delivered user story to completed commits and peer-review approval. Current local reports and git merge history do not establish this formal criterion.

## release-04 — The test environment is fully configured to update customer websites dynamically.

- Owner: CMS.
- Procedure: Have CMS demonstrate the configured Sage integration environment dynamically updates a QA customer site.
- Expected: The test environment is fully configured to update customer websites dynamically.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Have CMS demonstrate the configured Sage integration environment dynamically updates a QA customer site. Current local reports and git merge history do not establish this formal criterion.

## release-05 — Test cases are documented and ready for execution.

- Owner: QA.
- Procedure: Review this 67-row runbook against both source PDFs: every ID has prerequisites, procedure, expected condition, evidence and owner.
- Expected: Test cases are documented and ready for execution.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/checklist-runbook.md; docs/qa/evidence/row-audit/batch-9.md.
- Current disposition: Passed. 10 Sep 2026: 67 distinct test cases documented and checked against both PDFs. This completes test-case documentation, not execution or acceptance-criteria sign-off.

## release-06 — Unit testing and VQA are complete before changes are pushed to development.

- Owner: QA.
- Procedure: Obtain unit-test evidence and VQA completion dated before development promotion.
- Expected: Unit testing and VQA are complete before changes are pushed to development.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Obtain unit-test evidence and VQA completion dated before development promotion. Current local reports and git merge history do not establish this formal criterion.

## release-07 — Modified requirements are updated in acceptance criteria rather than Jira comments or designs.

- Owner: Business owner.
- Procedure: For modified requirements, inspect updated acceptance criteria rather than only comments/designs.
- Expected: Modified requirements are updated in acceptance criteria rather than Jira comments or designs.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: For modified requirements, inspect updated acceptance criteria rather than only comments/designs. Current local reports and git merge history do not establish this formal criterion.

## release-08 — New requirements treated as changes are addressed in a new user story.

- Owner: Business owner.
- Procedure: For new requirements, verify separate linked user stories or confirm no changes in scope.
- Expected: New requirements treated as changes are addressed in a new user story.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: For new requirements, verify separate linked user stories or confirm no changes in scope. Current local reports and git merge history do not establish this formal criterion.

## release-09 — If designs change, updated designs are recorded in Jira with the exact layouts and styles used for testing.

- Owner: Business owner.
- Procedure: For design changes, verify the precise revised layouts/styles attached to Jira.
- Expected: If designs change, updated designs are recorded in Jira with the exact layouts and styles used for testing.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: For design changes, verify the precise revised layouts/styles attached to Jira. Current local reports and git merge history do not establish this formal criterion.

## release-10 — All acceptance criteria have been verified.

- Owner: Business owner.
- Procedure: Map each locked acceptance criterion to passing executed evidence.
- Expected: All acceptance criteria have been verified.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Map each locked acceptance criterion to passing executed evidence. Current local reports and git merge history do not establish this formal criterion.

## release-11 — All targeted and integrated testing is completed.

- Owner: QA.
- Procedure: Obtain complete targeted and integrated test results, including unavailable environments.
- Expected: All targeted and integrated testing is completed.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Obtain complete targeted and integrated test results, including unavailable environments. Current local reports and git merge history do not establish this formal criterion.

## release-12 — Any bugs found are raised in Jira, assigned to the appropriate developer and linked to the parent story.

- Owner: Other Sage team.
- Procedure: Verify each confirmed defect is assigned in Jira and linked to its parent story; local files alone do not satisfy this.
- Expected: Any bugs found are raised in Jira, assigned to the appropriate developer and linked to the parent story.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Verify each confirmed defect is assigned in Jira and linked to its parent story; local files alone do not satisfy this. Current local reports and git merge history do not establish this formal criterion.

## release-13 — Bug fixes are deployed and validated as resolved.

- Owner: QA.
- Procedure: Deploy authorised fixes, rerun each defect reproduction and verify the issue is resolved in the target environment.
- Expected: Bug fixes are deployed and validated as resolved.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-6.md; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/batch-9.md.
- Current disposition: Failed. 10 Sep 2026: known font/custom-404, layout, negative-time, storage-feedback, truncation and workflow defects remain reproducible in deployed assets. No application fixes were made/deployed during assessment; resolved-fixes gate is not satisfied.

## release-14 — The automated test suite is maintained and updated for additional requirements.

- Owner: QA.
- Procedure: Map additional agreed requirements to maintained automated cases and inspect meaningful assertions, not just passing counts.
- Expected: The automated test suite is maintained and updated for additional requirements.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Map additional agreed requirements to maintained automated cases and inspect meaningful assertions, not just passing counts. Current local reports and git merge history do not establish this formal criterion.

## release-15 — Microsoft Edge, latest version, on Windows 11.

- Owner: QA.
- Procedure: Run latest Edge on Windows 11; record version and representative full journeys.
- Expected: Microsoft Edge, latest version, on Windows 11.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Installed Edge 152.0.4191.66; browser connector unavailable. No actual Edge run or latest-version verification claimed.

## release-16 — Google Chrome, latest version, on Windows 11.

- Owner: QA.
- Procedure: Run latest Chrome on Windows 11; record version and representative full journeys.
- Expected: Google Chrome, latest version, on Windows 11.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Installed Chrome 150.0.7871.125; browser connector unavailable. PageSpeed remote Chromium is not Chrome/Windows 11 compatibility evidence.

## release-17 — Mozilla Firefox, latest version, on Windows 11.

- Owner: QA.
- Procedure: Run latest Firefox on Windows 11; record version and representative full journeys.
- Expected: Mozilla Firefox, latest version, on Windows 11.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Firefox unavailable; not installed as instructed. QA must use the specified latest Firefox on Windows 11.

## release-18 — Safari, latest version, on macOS.

- Owner: QA.
- Procedure: Run latest Safari on macOS; record version and representative full journeys.
- Expected: Safari, latest version, on macOS.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Safari/macOS environment unavailable. QA must test on the actual supported environment.

## release-19 — Samsung Galaxy Tab A9+ on the latest Android version.

- Owner: QA.
- Procedure: Test physical Samsung Galaxy Tab A9+ on latest Android, portrait and landscape.
- Expected: Samsung Galaxy Tab A9+ on the latest Android version.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Galaxy Tab A9+ unavailable; CSS frame testing does not substitute for physical-device coverage.

## release-20 — iPad 10th generation and iPad Mini 2021 on the latest iOS version.

- Owner: QA.
- Procedure: Test physical iPad 10th generation and Mini 2021 on current iOS, portrait and landscape.
- Expected: iPad 10th generation and iPad Mini 2021 on the latest iOS version.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. iPad 10th generation / Mini 2021 unavailable; requires specified devices and current iOS.

## release-21 — iPhone 17 and Mini on the latest iOS version.

- Owner: QA.
- Procedure: Confirm specified Mini model with Sage, then test it and iPhone 17 on current iOS.
- Expected: iPhone 17 and Mini on the latest iOS version.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Specified iPhone 17 / Mini unavailable. Preserve PDF device wording; Sage should clarify which Mini model.

## release-22 — Samsung S25 on the latest Android version.

- Owner: QA.
- Procedure: Test physical Samsung S25 on latest Android, portrait and landscape.
- Expected: Samsung S25 on the latest Android version.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Samsung S25 unavailable; latest Android and physical rotation remain QA checks.

## release-23 — Test at a screen resolution of 1680px or wider.

- Owner: QA.
- Procedure: Test all relevant default/expanded/populated layouts at >=1680 CSS px, including both themes.
- Expected: Test at a screen resolution of 1680px or wider.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Partial: all 63 default page layouts measured at 1920x1080 (>=1680). Full populated/expanded-state visual coverage not established; no completion credit for measurements alone. Next: manual visual/keyboard review of populated and expanded states in both themes against Sage-approved designs; geometric scans alone are insufficient.

## release-24 — Test at a screen resolution of 1080px or wider.

- Owner: Victor / Playbook.
- Procedure: Test all relevant layouts at >=1080 CSS px; reproduce/fix page 60 glossary overflow.
- Expected: Test at a screen resolution of 1080px or wider.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/glossary-1080-overflow.png; docs/qa/evidence/row-audit/matrix.json.
- Current disposition: Failed. 2026-09-09: 1080px glossary rendering contains text overflow; earlier representative-width pass withdrawn.

## release-25 — Test at a screen resolution of 767px or wider.

- Owner: QA.
- Procedure: Test all relevant layouts at >=767 CSS px including exact 767 and 768 boundaries.
- Expected: Test at a screen resolution of 767px or wider.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md.
- Current disposition: Needs Sage or QA. Partial: all 63 default layouts measured at 767/768px. Internal scroll and transformed-decoration candidates distinguished from root overflow. Full expanded/populated state visual review remains. Next: manual visual/keyboard review of populated and expanded states in both themes against Sage-approved designs; geometric scans alone are insufficient.

## release-26 — Test below 767px.

- Owner: Victor / Playbook.
- Procedure: Test all relevant layouts below 767px including 320px page 43 pricing fields.
- Expected: Test below 767px.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/pricing-320-overlap.png; docs/qa/evidence/row-audit/matrix.json.
- Current disposition: Failed. 2026-09-09: 320px pricing worksheet controls/labels are cramped and extend beyond the panel. All 63 default pages measured; failure reproduced visually.

## release-27 — No known Blocker or Critical bugs are outstanding.

- Owner: QA.
- Procedure: QA reviews severity/waivers in the formal defect register and confirms no Blocker/Critical remains.
- Expected: No known Blocker or Critical bugs are outstanding.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: QA reviews severity/waivers in the formal defect register and confirms no Blocker/Critical remains. Current local reports and git merge history do not establish this formal criterion.

## release-28 — Manual and automated regression tests are complete for Sitecore, third parties, Tealium tags, market sites and ecommerce journeys.

- Owner: CMS.
- Procedure: Obtain regression completion for agreed Sitecore, third parties, Tealium, market-site and ecommerce scope; explicitly approve exclusions.
- Expected: Manual and automated regression tests are complete for Sitecore, third parties, Tealium tags, market sites and ecommerce journeys.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Obtain regression completion for agreed Sitecore, third parties, Tealium, market-site and ecommerce scope; explicitly approve exclusions. Current local reports and git merge history do not establish this formal criterion.

## release-29 — VQA has signed off the changes.

- Owner: QA.
- Procedure: Obtain dated formal VQA approval for the release revision.
- Expected: VQA has signed off the changes.
- Evidence: dated browser/HTTP/tool report or formal named approval; current pointers: docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md.
- Current disposition: Needs Sage or QA. 10 Sep 2026: Obtain dated formal VQA approval for the release revision. Current local reports and git merge history do not establish this formal criterion.
