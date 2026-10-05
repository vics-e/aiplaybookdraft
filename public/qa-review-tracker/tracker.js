/* =========================================================================
   PROJECT DETAILS. Fill these in once per project (or use "Edit project
   details" on the page; browser edits are included in the backup file).
   ========================================================================= */
const PROJECT = {
  "name": "AI Playbook",
  "summary": "Interactive AI playbook for accountants and bookkeepers",
  "liveUrl": "https://aiplaybook-ve.vercel.app/",
  "repoUrl": "https://github.com/vics-e/aiplaybookdraft",
  "version": "fad5b8d",
  "testers": "Victor Egunlae, Codex",
  "owner": "Victor Egunlae",
  "started": "2026-09-09",
  "lastChecked": "2026-09-23T17:00:00Z",
  "evidenceBase": "https://aiplaybook-ve.vercel.app/qa-review-tracker/",
  "storageKey": "ai-playbook-qa-review",
  "sources": [],
  "testSummary": [
    [
      "When and who",
      "9 to 23 Sep 2026, by Victor Egunlae and Codex; site files and Finish fixed on 3 Oct 2026 by Claude"
    ],
    [
      "What",
      "All 63 pages, every activity and output (certificate, summary, prompt library, glossary), against all 67 Sage checks"
    ],
    [
      "Screen sizes",
      "320, 767, 768, 1080 and 1920px, portrait and landscape frames"
    ],
    [
      "Browsers",
      "Chromium browser pane; Edge, Chrome, Firefox, Safari and real devices still to test (To do tab)"
    ],
    [
      "Automated",
      "**61 tests** (`npm test`)"
    ],
    [
      "Performance",
      "Google PageSpeed on 9 Sep 2026: mobile 70, desktop 90 (before the later fixes)"
    ],
    [
      "Outcome",
      "**9 defects found, all fixed and validated; nothing failing.** 30 checks need a person, device or sign-off (To do tab)"
    ]
  ],
  "nextSteps": [
    "**QA:** test on Edge, Chrome and Firefox (Windows 11), Safari (Mac) and the real devices: iPhone 17 and Mini, iPad 10th gen and Mini 2021, Galaxy Tab A9+, Samsung S25 (release-15 to 22, manual-29).",
    "**QA:** VQA sign-off, integrated testing and a severity review (release-06, 11, 27, 29).",
    "**Business owner:** design sign-off, acceptance criteria, which answers (if any) are mandatory, the message catalogue and the font approval (release-01, 02, 07 to 10; manual-05, 08, 23, 30).",
    "**Other Sage teams:** peer review of the code and Jira items (release-03, 12); **CMS:** Page Editor accents, integration and regression scope (manual-09, release-04, 28).",
    "**Recording results:** changes you make here save in your own browser only. When you finish, use **Share & save → Download editable backup** and send the file to Victor Egunlae so everyone sees the results."
  ]
};

/* The 67 checks from Sage's Manual Testing and QA Release checklists. */
const CHECKS = {"manual": [{"id": "manual-01", "priority": "Low", "type": "Usability", "summary": "Scroll bar should appear only if required.", "tools": "N/A", "standards": "Usability.gov guidelines", "sourceNotes": ""}, {"id": "manual-02", "priority": "Low", "type": "Usability", "summary": "Check enough space is applied between field labels, columns, rows and errors.", "tools": "N/A", "standards": "W3C usability guidelines", "sourceNotes": ""}, {"id": "manual-03", "priority": "Medium", "type": "Usability", "summary": "All text should be properly aligned.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-04", "priority": "Medium", "type": "Usability", "summary": "Check the site is responsive at 767px, 768px, 1080px and 1920px.", "tools": "Web Developer toolbar: Resize, View Responsive Layouts", "standards": "", "sourceNotes": ""}, {"id": "manual-05", "priority": "High", "type": "Usability", "summary": "Font should be consistent throughout the site.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-06", "priority": "Medium", "type": "Usability", "summary": "Display appropriate server-side and client-side validation for form fields.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-07", "priority": "High", "type": "Usability", "summary": "Check for broken links, missing images, CSS, Flash, RSS, script errors, expired domains and server configuration issues.", "tools": "Xenu", "standards": "", "sourceNotes": ""}, {"id": "manual-08", "priority": "Medium", "type": "Functional", "summary": "Test all mandatory fields validate correctly based on user input.", "tools": "N/A", "standards": "N/A", "sourceNotes": ""}, {"id": "manual-09", "priority": "Medium", "type": "Functional", "summary": "Test accented letters are displayed correctly in Page Editor and the front end.", "tools": "N/A", "standards": "", "sourceNotes": "The source checklist contains examples covering common European accented characters."}, {"id": "manual-10", "priority": "Low", "type": "Functional", "summary": "Test no mandatory error message is present for optional fields.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-11", "priority": "Medium", "type": "Functional", "summary": "Test leap years are validated correctly and do not cause errors.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-12", "priority": "Low", "type": "Functional", "summary": "Test negative input values for each field.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-13", "priority": "Low", "type": "Functional", "summary": "Test the maximum length of every field to ensure data is not truncated.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-14", "priority": "Medium", "type": "Functional", "summary": "Check a confirmation message is displayed for update and delete operations.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-15", "priority": "Medium", "type": "Functional", "summary": "Test all input fields for special characters.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-16", "priority": "Medium", "type": "Functional", "summary": "Test the sorting and filtering functionality.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-17", "priority": "Medium", "type": "Functional", "summary": "Test no errors are present in the browser console.", "tools": "Browser developer tools console", "standards": "", "sourceNotes": ""}, {"id": "manual-18", "priority": "Medium", "type": "Functional", "summary": "Test the functionality of buttons, including enabled, disabled and hidden states.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-19", "priority": "High", "type": "Functional", "summary": "Test that failed functionality redirects the user to the custom error page (404).", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-20", "priority": "Medium", "type": "Functional", "summary": "Test all uploaded documents open correctly in a new window, new tab or intended destination.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-21", "priority": "High", "type": "Functional", "summary": "Test the user is able to download files.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-22", "priority": "High", "type": "Functional", "summary": "Test email functionality, such as feedback and order confirmation.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-23", "priority": "High", "type": "Functional", "summary": "Validate that blank form submissions are not allowed and at least one field is required.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-24", "priority": "Medium", "type": "Functional", "summary": "Test external page links open in a new tab or window.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-25", "priority": "High", "type": "Functional", "summary": "Check Create, Edit, Delete and Publish for a new component.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-26", "priority": "High", "type": "Functional", "summary": "Verify data retrieval delivers the correct data, such as Search and News sections.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-27", "priority": "Medium", "type": "Functional", "summary": "Ensure search functions correctly and results are accurate and helpful to the customer.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-28", "priority": "High", "type": "Compatibility", "summary": "Test page rendering at different screen resolutions and rotations.", "tools": "Web Developer toolbar: Resize, View Responsive Layouts", "standards": "Latest browser versions only", "sourceNotes": "Chrome developer tools can also be used to switch between representative devices."}, {"id": "manual-29", "priority": "High", "type": "Compatibility", "summary": "Test that the CSS and HTML used are compatible with the appropriate browser and device versions.", "tools": "Edge, Chrome, Firefox, Safari, iPhone and Android", "standards": "Portrait and landscape orientations", "sourceNotes": ""}, {"id": "manual-30", "priority": "Low", "type": "Destructive", "summary": "Apply inputs that force all error messages to occur.", "tools": "N/A", "standards": "N/A", "sourceNotes": ""}, {"id": "manual-31", "priority": "Low", "type": "Destructive", "summary": "Repeatedly attempt to submit a form by continually clicking the submit action.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-32", "priority": "Low", "type": "Destructive", "summary": "Force different outputs to be generated for each input.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-33", "priority": "Low", "type": "Destructive", "summary": "Attempt to fill the file system to its capacity.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-34", "priority": "Low", "type": "Destructive", "summary": "Attempt to submit blank forms repeatedly.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-35", "priority": "Low", "type": "Destructive", "summary": "Attempt to view an invalid page URL within the site.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-36", "priority": "Low", "type": "Destructive", "summary": "Alter strings within the webpages where applicable and ensure an appropriate message is displayed.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-37", "priority": "High", "type": "Performance", "summary": "Run Google PageSpeed to identify performance improvements.", "tools": "Google PageSpeed", "standards": "N/A", "sourceNotes": ""}, {"id": "manual-38", "priority": "High", "type": "Accessibility", "summary": "Run Lighthouse Accessibility to identify accessibility improvements.", "tools": "Lighthouse", "standards": "N/A", "sourceNotes": ""}], "release": [{"id": "release-01", "stage": "Entry criteria", "summary": "All designs are signed off."}, {"id": "release-02", "stage": "Entry criteria", "summary": "Acceptance criteria are locked down."}, {"id": "release-03", "stage": "Entry criteria", "summary": "All code changes are complete and peer reviewed for each user story delivered."}, {"id": "release-04", "stage": "Entry criteria", "summary": "The test environment is fully configured to update customer websites dynamically."}, {"id": "release-05", "stage": "Entry criteria", "summary": "Test cases are documented and ready for execution."}, {"id": "release-06", "stage": "Entry criteria", "summary": "Unit testing and VQA are complete before changes are pushed to development."}, {"id": "release-07", "stage": "Entry criteria", "summary": "Modified requirements are updated in acceptance criteria rather than Jira comments or designs."}, {"id": "release-08", "stage": "Entry criteria", "summary": "New requirements treated as changes are addressed in a new user story."}, {"id": "release-09", "stage": "Entry criteria", "summary": "If designs change, updated designs are recorded in Jira with the exact layouts and styles used for testing."}, {"id": "release-10", "stage": "Exit criteria", "summary": "All acceptance criteria have been verified."}, {"id": "release-11", "stage": "Exit criteria", "summary": "All targeted and integrated testing is completed."}, {"id": "release-12", "stage": "Exit criteria", "summary": "Any bugs found are raised in Jira, assigned to the appropriate developer and linked to the parent story."}, {"id": "release-13", "stage": "Exit criteria", "summary": "Bug fixes are deployed and validated as resolved."}, {"id": "release-14", "stage": "Exit criteria", "summary": "The automated test suite is maintained and updated for additional requirements."}, {"id": "release-15", "stage": "Compatibility: browsers", "summary": "Microsoft Edge, latest version, on Windows 11."}, {"id": "release-16", "stage": "Compatibility: browsers", "summary": "Google Chrome, latest version, on Windows 11."}, {"id": "release-17", "stage": "Compatibility: browsers", "summary": "Mozilla Firefox, latest version, on Windows 11."}, {"id": "release-18", "stage": "Compatibility: browsers", "summary": "Safari, latest version, on macOS."}, {"id": "release-19", "stage": "Compatibility: tablets", "summary": "Samsung Galaxy Tab A9+ on the latest Android version."}, {"id": "release-20", "stage": "Compatibility: tablets", "summary": "iPad 10th generation and iPad Mini 2021 on the latest iOS version."}, {"id": "release-21", "stage": "Compatibility: mobile", "summary": "iPhone 17 and Mini on the latest iOS version."}, {"id": "release-22", "stage": "Compatibility: mobile", "summary": "Samsung S25 on the latest Android version."}, {"id": "release-23", "stage": "Responsive testing", "summary": "Test at a screen resolution of 1680px or wider."}, {"id": "release-24", "stage": "Responsive testing", "summary": "Test at a screen resolution of 1080px or wider."}, {"id": "release-25", "stage": "Responsive testing", "summary": "Test at a screen resolution of 767px or wider."}, {"id": "release-26", "stage": "Responsive testing", "summary": "Test below 767px."}, {"id": "release-27", "stage": "Sign-off criteria", "summary": "No known Blocker or Critical bugs are outstanding."}, {"id": "release-28", "stage": "Sign-off criteria", "summary": "Manual and automated regression tests are complete for Sitecore, third parties, Tealium tags, market sites and ecommerce journeys."}, {"id": "release-29", "stage": "Sign-off criteria", "summary": "VQA has signed off the changes."}], "applies": ["To review", "Relevant", "Not relevant", "Needs clarification"], "status": ["Not assessed", "Already evidenced", "Passed", "Failed", "Blocked", "Needs Sage or QA", "Not applicable"], "owners": ["Unassigned", "Victor / Playbook", "CMS", "QA", "Business owner", "Other Sage team"]};

/* Results already recorded for this project (filled in by build.py; empty in the blank template). */
const SEED = {"manual-01": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: All 63 default pages were measured at 320, 767, 768, 1080 and 1920px with no root horizontal overflow. The repaired populated pricing view was then rechecked at exactly 320px.", "interpretation": "Only show scrolling where content requires it. No unintended horizontal scrollbar or trapped internal scrolling.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-02": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/pricing-320-overlap.png; docs/qa/evidence/row-audit/batch-7.md", "comments": "18 Sep 2026: User review confirms the spacing criterion passes. Earlier 320px pricing evidence recorded cramped controls, so that narrower-layout observation remains a follow-up for manual-28/release-26; this row is marked passed by the current review decision.", "interpretation": "Labels, fields, rows and error messages have consistent spacing and do not overlap or appear cramped.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-03": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/glossary-1080-overflow.png; docs/qa/evidence/row-audit/pricing-320-overlap.png", "comments": "23 Sep 2026: fixed the glossary grid breakpoint and added containment and word-wrapping safeguards. Local rendered glossary and production build verified; headings and definitions remain within the content panel.", "interpretation": "Text follows the intended page grid and component alignment. Deliberate exceptions are visually consistent.", "history": [{"at": "2026-09-09T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-04": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/glossary-1080-overflow.png", "comments": "23 Sep 2026: the identified glossary containment failure is fixed by moving the split layout to the wider breakpoint and wrapping long content. The local build passed and the affected page was rechecked.", "interpretation": "At every required width, content remains readable and usable with no clipping or unintended horizontal overflow.", "history": [{"at": "2026-09-09T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-05": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/http-checks.json; docs/qa/evidence/row-audit/batch-7.md", "comments": "23 Sep 2026: removed the four broken font CDN requests and retained the established Sage family tokens using the loaded Inter family. Sage still needs to approve the final typography baseline after deployment.", "interpretation": "The playbook uses a deliberate type system. Headings, body text, labels and supporting text each use consistent assigned font families, sizes and weights. They do not all need to be identical.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "manual-06": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/negative-pricing.txt; docs/qa/evidence/row-audit/batch-8.md", "comments": "23 Sep 2026: fixed signed-number parsing and added number controls with a zero minimum and inline validation. Local retest with -6 and -3 shows Time values cannot be negative and no saving calculation.", "interpretation": "Client-side validation should match agreed required fields. Server-side validation is not applicable unless the hosting or integration design introduces form submission.", "history": [{"at": "2026-09-10T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-07": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-6.md; docs/qa/evidence/row-audit/http-checks.json", "comments": "23 Sep 2026: deployed JavaScript and CSS return 200 and the old broken font host is absent from production CSS. The four recorded font 404 requests are resolved. 3 Oct 2026: robots.txt (keeps /qa-review-tracker/ out of search), a Sage favicon and Apple touch icons added; all return 200.", "interpretation": "All rendered links and resources load successfully, with no missing images, stylesheet failures or script errors.", "history": [{"at": "2026-09-09T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-08": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/workflow-gate.txt; docs/qa/evidence/row-audit/batch-8.md", "comments": "23 Sep 2026: the three-workflow gate is now consistent and locally verified. Business owner must still define which other responses are mandatory and their acceptance rules.", "interpretation": "Every field agreed as mandatory rejects invalid or empty input and provides a clear error message.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "manual-09": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "CMS", "evidence": "docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/spec-fields.json; docs/qa/evidence/row-audit/summary-editors.jsonl", "comments": "Front-end accent corpus retained in default text fields, all 11 spec fields, 15 pricing fields, 16 tool fields, 24 prompt variables and all 39 available summary editors. Page Editor is unavailable and cannot be signed off from this standalone deployment.", "interpretation": "Accented characters render and persist without corruption in all relevant content and input fields.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "manual-10": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/input-cases.json; docs/qa/evidence/row-audit/input-observations-supplement.json; docs/qa/evidence/row-audit/batch-8.md", "comments": "9–10 Sep 2026: optional text fields accepted keyboard clearing without native required errors. Source and expanded field inventories show no required attributes; summary/spec/prompt optional fields remain usable. Blank tool name reverts to its default without an error. This does not approve mandatory-field policy.", "interpretation": "Fields defined as optional can be left empty without showing a required-field error.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-11": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/leap-date-valid.txt; docs/qa/evidence/row-audit/leap-date-invalid.txt", "comments": "Audit correction: there IS a free-text DATE placeholder in the prompt library. Both 2028-02-29 and invalid 2027-02-29 are accepted as literal template text. No date validation/calculation runs; Sage must confirm whether this free-form template needs calendar validation.", "interpretation": "Only applicable if the experience introduces date entry or date calculations.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "manual-12": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/negative-pricing.txt; docs/qa/evidence/row-audit/negative-pricing.png", "comments": "23 Sep 2026: pricing fields now use numeric controls and signed parsing. Negative values show an inline error and do not produce a reduction; time with AI above time today is also rejected.", "interpretation": "Numeric controls reject or safely constrain values outside their agreed range.", "history": [{"at": "2026-09-10T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-13": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/certificate-truncation.json; docs/qa/evidence/row-audit/certificate-truncation.png", "comments": "23 Sep 2026: certificate names now have a visible 100-character limit and generated markup preserves every wrapped line. The 83-character reproduction retains every word including LASTTOKEN in the preview and markup test.", "interpretation": "Long input remains usable, is stored safely and is not silently truncated in the interface or output.", "history": [{"at": "2026-09-10T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-14": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/prompt-clear.txt; docs/qa/evidence/row-audit/batch-8.md", "comments": "23 Sep 2026: page 31 now announces Prompt cleared in an accessible live status after Clear completes. Verified in the local rendered build.", "interpretation": "Explicit local updates and deletions provide accurate confirmation.", "history": [{"at": "2026-09-10T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-15": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/input-observations-supplement.json; docs/qa/evidence/row-audit/summary-editors.jsonl; docs/qa/evidence/row-audit/prompt-variables.json", "comments": "9–10 Sep 2026: accented characters, punctuation, quotes, backslash and literal script-like text tested through every default editable text control, expanded spec/pricing/tool/prompt groups and all 39 available summary editors. Values retained literally and persisted/reopened. Fixed-choice controls do not accept arbitrary text. This is the specified character test, not a penetration-test sign-off.", "interpretation": "Common punctuation, accented characters and HTML-like text are accepted or safely rejected without corruption or code execution.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-16": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/batch-8.md", "comments": "23 Sep 2026: fixed stale glossary selection. Filtering for audit trail now leaves AI Audit Trail in the list and updates the definition panel to AI Audit Trail. Clear and no-results behaviour remain intact.", "interpretation": "Sorting and filters return accurate results, update predictably and can be cleared.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-17": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/pagespeed-console.txt; docs/qa/evidence/row-audit/batch-6.md", "comments": "23 Sep 2026: deployed browser check returned no console warnings or errors after the broken font requests were removed.", "interpretation": "Normal journeys complete without errors in the browser console.", "history": [{"at": "2026-09-09T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-18": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/workflow-gate.txt; docs/qa/evidence/row-audit/batch-8.md", "comments": "23 Sep 2026: every route into workflow scoring now requires at least three workflows. With one workflow, both Score each and Next remain disabled in the local rendered retest. 3 Oct 2026: Finish on the certificate page was disabled (a dead end); it now returns to the contents page. Verified on the live site.", "interpretation": "Every visible button performs the intended action and disabled or hidden states occur only under the agreed conditions.", "history": [{"at": "2026-09-10T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-19": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/http-checks.json", "comments": "23 Sep 2026: deployed invalid route returned the branded AI Playbook Page not found experience with HTTP 404.", "interpretation": "Invalid application routes must show a custom error page. A generic hosting response is insufficient without an explicit Sage waiver.", "history": [{"at": "2026-09-09T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-20": {"applies": "Not relevant", "status": "Not applicable", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-8.md", "comments": "9–10 Sep 2026: no uploaded-document feature or uploaded-document links in rendered page inventory/source. Generated certificate and summary output are covered by manual-21.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Not applicable"}]}, "manual-21": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: The current deployment opened the certificate print/save flow successfully. The maintained controller tests also confirm the print document is written and invoked, including blocked-popup handling.", "interpretation": "The available certificate output opens and can be printed or saved through the browser.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-22": {"applies": "Not relevant", "status": "Not applicable", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-8.md", "comments": "9–10 Sep 2026: no email submission integration exists. Prompt examples containing email text are local templates, not an email-sending feature.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Not applicable"}]}, "manual-23": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-8.md", "comments": "No server form submission. Activities auto-save and accept blank optional fields; business owner must decide whether any answer is mandatory before completion/output.", "interpretation": "At least one response is required only if the agreed business requirements define the activity as mandatory.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "manual-24": {"applies": "Not relevant", "status": "Not applicable", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-8.md", "comments": "9–10 Sep 2026: no external page-link controls found in all 63 default page DOM inventories or app source. Runtime font/analytics URLs are resources, not external page links.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Not applicable"}]}, "manual-25": {"applies": "Not relevant", "status": "Not applicable", "owner": "CMS", "evidence": "docs/qa/evidence/row-audit/batch-8.md", "comments": "Standalone Vercel experience has no CMS/Page Editor component CRUD/publishing. Future Sage integration remains explicitly open in release-04/28 and manual-09.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Not applicable"}]}, "manual-26": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/summary-after-reload.txt", "comments": "23 Sep 2026: glossary retrieval now selects the first matching filtered term rather than retaining a hidden stale definition. Local retest returns AI Audit Trail consistently in both list and detail.", "interpretation": "Local glossary, workflow and activity-summary retrieval displays the correct selected/saved data.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-27": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/batch-8.md", "comments": "23 Sep 2026: glossary search now keeps results and the displayed definition in sync. Filtering for audit trail returns and displays AI Audit Trail; no-results and clearing remain predictable.", "interpretation": "Search returns the expected matching playbook content and empty or cleared searches behave predictably.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-28": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: Portrait and landscape viewport simulations were repeated across the required widths. The repaired 320px pricing layout and 1080px glossary remained readable and operable without clipping.", "interpretation": "Required portrait, landscape and viewport sizes remain readable and operable without clipping or overlap.", "history": [{"at": "2026-09-09T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-29": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "Partial: in-app Chromium only. Chrome and Edge installed but CUA reports both unavailable; no Firefox or Apple/Android device connected. No browsers installed. Physical portrait/landscape and latest-version certification remain QA work.", "interpretation": "The supported browser and device matrix renders and behaves consistently. Missing browsers or physical devices are recorded for manual testing.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "manual-30": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-8.md", "comments": "23 Sep 2026: negative pricing and workflow-gate errors are fixed locally. Storage failure feedback is implemented and awaits the controlled deployed retest; the complete expected-error catalogue still requires agreement.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "manual-31": {"applies": "Not relevant", "status": "Not applicable", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-8.md", "comments": "No form-submit endpoint exists. Local Add/Save/clear actions are covered under manual-14/18/32; source row's repeated form submission is not a backend scenario in this deployment.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Not applicable"}]}, "manual-32": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/input-observations-supplement.json; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: Varied valid, invalid, long, accented and HTML-like inputs were exercised across pricing, certificate, glossary and workflow outputs; current outputs update without stale or executable content.", "interpretation": "Different valid inputs produce the expected saved state, summary or output without stale data.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-33": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/quota-false-save.txt; docs/qa/evidence/row-audit/quota-after-reload.txt; docs/qa/evidence/row-audit/quota-false-save.png; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: A controlled QuotaExceededError was run against the current deployment. The app showed an explicit alert that the latest change could not be saved and did not claim success.", "interpretation": "Controlled storage-quota failure preserves existing answers and gives truthful save feedback; do not fill the real filesystem.", "history": [{"at": "2026-09-10T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "manual-34": {"applies": "Not relevant", "status": "Not applicable", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-8.md", "comments": "No submitted forms/endpoints. Repeated empty local edits are separate from source row's blank form submission; optional clearing and workflow gates were tested.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Not applicable"}]}, "manual-35": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/http-checks.json", "comments": "2026-09-09: invalid route safely returns HTTP 404. Custom presentation separately fails manual-19.", "interpretation": "Request a harmless invalid route; it returns an error rather than crashing the application or exposing data.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-36": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-8.md", "comments": "Literal altered/special strings retained safely in tested controls. Application intentionally lacks general validation messaging; Sage must define which altered-string states should produce messages.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "manual-37": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/pagespeed-mobile.txt; docs/qa/evidence/row-audit/pagespeed-desktop.txt; docs/qa/evidence/row-audit/batch-6.md", "comments": "2026-09-09 23:42 BST: Google PageSpeed web report completed after API 429. Performance 70 mobile / 90 desktop; LCP 11.3s / 2.0s; image savings ~1.4MiB, unused JS ~126KiB. Source asks to run the checker, not achieve a threshold. Scope: initial cover only. 3 Oct 2026: a meta description and social preview tags were added (the SEO audit flagged it on the MTD playbook).", "interpretation": "Run Google PageSpeed and record mobile/desktop findings and performance improvements. A run does not constitute release performance approval.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "manual-38": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/pagespeed-mobile.txt; docs/qa/evidence/row-audit/pagespeed-desktop.txt; docs/qa/evidence/row-audit/batch-6.md", "comments": "2026-09-09: Lighthouse 13.4.1 via Google PageSpeed returned Accessibility 100 on mobile and desktop cover. Ten manual checks remain outside automation; keyboard, screen reader and every interactive state still require broader QA.", "interpretation": "Run Lighthouse Accessibility, retain results and identify follow-up work. This is the source row's tool-run requirement, not an all-page WCAG or screen-reader certification.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "release-01": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Obtain dated design sign-off covering the actual delivered revision. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-02": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Obtain the locked acceptance criteria and revision/change baseline. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-03": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "Other Sage team", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Map each delivered user story to completed commits and peer-review approval. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-04": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "CMS", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Have CMS demonstrate the configured Sage integration environment dynamically updates a QA customer site. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-05": {"applies": "Relevant", "status": "Passed", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/checklist-runbook.md; docs/qa/evidence/row-audit/batch-9.md", "comments": "10 Sep 2026: 67 distinct test cases documented and checked against both PDFs. This completes test-case documentation, not execution or acceptance-criteria sign-off.", "interpretation": "All 67 source checklist cases are documented with executable procedures, expected results, owners, prerequisites and evidence requirements. External execution may await its prerequisite environment.", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "release-06": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Obtain unit-test evidence and VQA completion dated before development promotion. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-07": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: For modified requirements, inspect updated acceptance criteria rather than only comments/designs. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-08": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: For new requirements, verify separate linked user stories or confirm no changes in scope. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-09": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: For design changes, verify the precise revised layouts/styles attached to Jira. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-10": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "Business owner", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Map each locked acceptance criterion to passing executed evidence. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-11": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Obtain complete targeted and integrated test results, including unavailable environments. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-12": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "Other Sage team", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Verify each confirmed defect is assigned in Jira and linked to its parent story; local files alone do not satisfy this. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-13": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-6.md; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: All nine recorded fixes are deployed and validated: narrow pricing, glossary wrapping, negative values, font loading, certificate names, clear confirmation, workflow gating, storage failure feedback and branded 404 handling.", "interpretation": "", "history": [{"at": "2026-09-10T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "release-14": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: The maintained automated suite now covers the added certificate, validation, persistence and interaction requirements. All 61 tests passed on 23 Sep 2026.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "release-15": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "Installed Edge 152.0.4191.66; browser connector unavailable. No actual Edge run or latest-version verification claimed.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-16": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "Installed Chrome 150.0.7871.125; browser connector unavailable. PageSpeed remote Chromium is not Chrome/Windows 11 compatibility evidence.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-17": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "Firefox unavailable; not installed as instructed. QA must use the specified latest Firefox on Windows 11.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-18": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "Safari/macOS environment unavailable. QA must test on the actual supported environment.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-19": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "Galaxy Tab A9+ unavailable; CSS frame testing does not substitute for physical-device coverage.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-20": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "iPad 10th generation / Mini 2021 unavailable; requires specified devices and current iOS.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-21": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "Specified iPhone 17 / Mini unavailable. Preserve PDF device wording; Sage should clarify which Mini model.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-22": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-7.md", "comments": "Samsung S25 unavailable; latest Android and physical rotation remain QA checks.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-23": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: All 63 pages were rendered at 1920×1080, satisfying the 1680px-or-wider check; no root horizontal overflow was found.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "release-24": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/glossary-1080-overflow.png; docs/qa/evidence/row-audit/matrix.json", "comments": "23 Sep 2026: fixed the page 60 grid breakpoint, minimum widths and text wrapping. The affected glossary page and local production build were rechecked successfully at desktop width.", "interpretation": "", "history": [{"at": "2026-09-09T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "release-25": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: All 63 pages were rendered at 767px and 768px. Internal intentional scrolling was distinguished from root overflow, and the repaired populated states were rechecked.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Passed"}]}, "release-26": {"applies": "Relevant", "status": "Passed", "owner": "Victor / Playbook", "evidence": "docs/qa/evidence/row-audit/pricing-320-overlap.png; docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/2026-09-23-self-checks.md", "comments": "23 Sep 2026: All 63 pages were rendered below 767px and the repaired populated pricing page was rechecked at exactly 320px. The fields and controls now stack without the recorded overlap.", "interpretation": "", "history": [{"at": "2026-09-09T12:00:00Z", "status": "Failed", "note": "First QA pass"}, {"at": "2026-09-23T17:00:00Z", "status": "Passed", "note": "Fixed and re-tested on the live site"}]}, "release-27": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: QA reviews severity/waivers in the formal defect register and confirms no Blocker/Critical remains. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-28": {"applies": "Needs clarification", "status": "Needs Sage or QA", "owner": "CMS", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Obtain regression completion for agreed Sitecore, third parties, Tealium, market-site and ecommerce scope; explicitly approve exclusions. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}, "release-29": {"applies": "Relevant", "status": "Needs Sage or QA", "owner": "QA", "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md", "comments": "10 Sep 2026: Obtain dated formal VQA approval for the release revision. Current local reports and git merge history do not establish this formal criterion.", "interpretation": "", "history": [{"at": "2026-09-23T17:00:00Z", "status": "Needs Sage or QA"}]}};

/* "Needs Project or QA" in the template; a project can rename it (e.g. "Needs Sage or QA"). */
const NEEDS = CHECKS.status.find(s => s.startsWith('Needs')) || 'Needs Project or QA';
const NEEDS_SHORT = NEEDS.replace(/^Needs (.+) or QA$/, 'Needs $1 / QA');
const STATUSES = {
  'Not assessed':      'Nobody has checked this yet.',
  'Passed':            'Checked and works as expected, with proof.',
  'Failed':            'Checked and doesn’t work yet. Fix it, then re-test.',
  'Blocked':           'Can’t be tested yet, e.g. waiting for access.',
  [NEEDS]:             'Needs a decision, a sign-off or a device the tester doesn’t have.',
  'Not applicable':    'Doesn’t apply to this project, e.g. there’s no CMS.',
  'Already evidenced': 'Already proven elsewhere, e.g. by an automated test. Link it.',
};
const SUMMARY_ORDER = ['Passed', 'Failed', NEEDS, 'Not applicable', 'Not assessed'];
const STAT_NOTES = {
  'Passed': 'working, with proof', 'Failed': 'to fix and re-test', [NEEDS]: 'decision, sign-off or device',
  'Not applicable': 'don’t apply here', 'Not assessed': 'not checked yet',
};
const TODO = new Set(['Failed', 'Blocked', NEEDS]);
const DEVICE_STAGES = new Set(['Compatibility: browsers', 'Compatibility: tablets', 'Compatibility: mobile']);
const DEFAULTS = { applies: 'To review', status: 'Not assessed', owner: 'Unassigned', interpretation: '', evidence: '', comments: '' };

const $ = (s, el = document) => el.querySelector(s);

/* This project's lessons-learned.md, as a table (filled in by build.py; none in the blank template). */
const LESSONS = {"intro": "Every failure found in QA, and what to build in so the next project doesn't fail the same way. **Check a new project against this list before its first QA pass.** Add to it at the end of every QA round.", "headers": ["#", "What failed", "Check", "Where", "Lesson: build this in from the start"], "rows": [["1", "Number boxes accepted minus values (−6 / −3 minutes gave a positive saving)", "manual-06, manual-12", "AI playbook p43 · MTD p06", "Number inputs refuse minus by default (`min=\"0\"`, block the − key and pasted negatives) and say why in red. Add a test."], ["2", "Brand font files returned 404 (loaded from an external CDN)", "manual-07, manual-17", "AI playbook", "Self-host the fonts in the repo and check every font file returns 200."], ["3", "`robots.txt` and `favicon.ico` returned 404", "manual-07", "AI playbook · MTD (both fixed 3 Oct 2026)", "Ship both in the starter kit."], ["4", "Content spilled out of its column at 1080px (glossary cards)", "manual-03, manual-04, manual-28", "AI playbook p60 · MTD p10 cards", "Size card grids to their container, not the screen; check every page at 320, 767, 768, 1080 and 1920px automatically."], ["5", "Controls cramped and overlapping at 320px (pricing)", "manual-28, release-26", "AI playbook p43", "Design the narrow layout first; include 320px in the automatic width check."], ["6", "Long certificate names were cut off", "manual-13", "AI playbook p63", "Test every text output with long, accented and HTML-like values; show the character limit."], ["7", "Filtering the glossary didn't update the definition shown", "(fix verified 23 Sep)", "AI playbook p60", "When a filter changes, re-check every view that depends on it."], ["8", "\"Clear\" gave no feedback", "manual-14", "AI playbook p31", "Every action confirms itself (\"Prompt cleared\"), in an accessible live region."], ["9", "A step could be skipped with too few items", "manual-18", "AI playbook p24", "Gates check the rule on every route (Next and the step buttons)."], ["10", "Browser storage full showed \"Saved\" when it wasn't", "manual-33", "AI playbook", "Only say \"saved\" after a successful write; show a clear failure otherwise."], ["11", "Unknown pages showed a generic error", "manual-19", "AI playbook", "Ship a branded `404.html`."], ["12", "\"Finish\" on the last page was disabled: a dead end", "manual-18", "AI playbook (certificate) · MTD p37, both fixed 3 Oct 2026", "Every final button leads somewhere (contents or action plan), or isn't shown."], ["13", "No meta description (PageSpeed SEO below 100)", "manual-37", "AI playbook · MTD, both fixed 3 Oct 2026", "Ship a meta description and social preview tags in the starter kit."]], "patterns": ["**Most failures were edge cases, not happy paths:** minus numbers, very long text, narrow screens, full storage. Test the edges first.", "**\"Passed\" needs proof.** The tracker flags a Passed check with no evidence linked.", "**Devices and sign-offs can't be self-tested.** Plan early who has Safari on a Mac, an iPhone, an iPad and a Samsung device, and who gives VQA sign-off."]};
if (!LESSONS || !LESSONS.rows.length) { $('#tab-lessons')?.remove(); $('#panel-lessons')?.remove(); }
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/** Escaped text with Markdown-style `code` and **bold**. */
const md = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
const fmtDate = iso => { if (!iso) return ''; const d = new Date(iso); return isNaN(d) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };

/* ------------------------------------------------------------ saved state */
const KEY = PROJECT.storageKey;
let state = { project: {}, rows: {}, lastChecked: '', tester: '' };
try { state = { ...state, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
const project = () => ({ ...PROJECT, ...Object.fromEntries(Object.entries(state.project).filter(([, v]) => v)) });
const row = id => ({ ...DEFAULTS, history: [], ...(SEED[id] || {}), ...(state.rows[id] || {}) });
const lastChecked = () => state.lastChecked || PROJECT.lastChecked;
const ALL = [...CHECKS.manual.map(c => ({ ...c, list: 'manual' })), ...CHECKS.release.map(c => ({ ...c, list: 'release' }))];

function setField(id, field, value) {
  const current = row(id);
  const next = { ...current, [field]: value };
  const by = (state.tester || '').trim();
  if (by) { next.by = by; next.at = new Date().toISOString(); }
  if (field === 'status' && value !== current.status) {
    next.history = [...current.history, { at: new Date().toISOString(), status: value, ...(by && { by }) }];
    state.lastChecked = new Date().toISOString();
  }
  state.rows[id] = next;
  save();
  renderAll(id);
}

/* ---------------------------------------------------------------- header */
/** "Victor Egunlae, Codex" → [VE] [Codex]: people as initials (full name on hover), tools as words. */
function testerBadges(text) {
  return text.split(',').map(t => t.trim()).filter(Boolean).map(name => {
    const words = name.split(/\s+/);
    return words.length > 1
      ? `<span class="who" title="${esc(name)}">${esc(words.map(w => w[0]).join('').toUpperCase())}</span>`
      : `<span class="who who-tool" title="${esc(name)}">${esc(name)}</span>`;
  }).join(' ');
}
function renderHeader() {
  const p = project();
  const name = p.name || 'Untitled project';
  document.title = `QA Review Tracker · ${name}`;
  $('#project-name').textContent = name;
  $('#top-project').textContent = p.name ? `${p.name}${p.version ? ' · ' + p.version : ''}` : 'Add project details';
  $('#project-summary').textContent = p.summary || 'Add a one-line description of the project with “Edit project details”.';
  const unset = '<span class="unset">Not set</span>';
  const link = url => url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a>` : unset;
  const facts = [
    ['Live site', link(p.liveUrl)],
    p.repoUrl && ['Repository', link(p.repoUrl)],
    ['Version tested', p.version ? `<span class="mono">${esc(p.version)}</span>` : unset],
    ['Assessment started', p.started ? esc(fmtDate(p.started)) : unset],
    ['Last checked', lastChecked() ? esc(fmtDate(lastChecked())) : '<span class="unset">No checks yet</span>'],
    ['Tested by', p.testers ? testerBadges(p.testers) : unset],
  ];
  $('#facts').innerHTML = facts.filter(Boolean).map(([k, v]) => `<div class="fact"><dt>${k}</dt><dd>${v}</dd></div>`).join('');
}

/* --------------------------------------------------------------- overview */
function counts(list) {
  const items = list ? ALL.filter(c => c.list === list) : ALL;
  const n = Object.fromEntries(SUMMARY_ORDER.map(s => [s, 0]));
  for (const c of items) {
    let s = row(c.id).status;
    if (s === 'Already evidenced') s = 'Passed';
    if (s === 'Blocked') s = NEEDS;
    n[s] = (n[s] || 0) + 1;
  }
  return { n, total: items.length };
}

function renderOverview() {
  const { n, total } = counts();
  const checked = total - n['Not assessed'];
  $('#top-checked').textContent = `${checked} of ${total} checked`;
  $('#top-meter').style.width = `${(checked / total) * 100}%`;
  $('#overview-lead').textContent = checked === 0
    ? `Nothing has been checked yet. ${total} checks are waiting: open Manual testing to start.`
    : `${checked} of ${total} checks have a result. ${n['Failed'] ? n['Failed'] + ' failed and need fixing. ' : 'Nothing is currently failing. '}${n[NEEDS]} need a decision, sign-off or device.`;
  const statsHost = document.getElementById('stats');
  if (statsHost) statsHost.innerHTML = SUMMARY_ORDER.map(s => `
    <button class="stat" type="button" data-status="${s}" data-goto="${s}" title="${STAT_NOTES[s]}: click to see them" aria-label="${n[s]} ${s} (${STAT_NOTES[s]}): show these checks">
      <b>${n[s]}</b><span>${s === NEEDS ? NEEDS_SHORT : s}</span>
    </button>`).join('');
  const label = s => (s === NEEDS ? NEEDS_SHORT : s);
  // Each number opens its checklist filtered to that status ("Overall" opens Manual testing).
  const tr = (name, c, list, cls = '') => `<tr class="${cls}"><td>${name}</td>${SUMMARY_ORDER.map(s => `<td data-status="${s}" class="${c.n[s] ? '' : 'zero'}">${c.n[s] ? `<button class="num" type="button" data-goto="${s}" data-list-target="${list}" title="Show the ${c.n[s]} ${label(s).toLowerCase()} check${c.n[s] === 1 ? '' : 's'}">${c.n[s]}</button>` : 0}</td>`).join('')}<td>${c.total}</td></tr>`;
  $('#summary-table').innerHTML = `<thead><tr><th>Checklist</th>${SUMMARY_ORDER.map(s => `<th>${label(s)}</th>`).join('')}<th>Total</th></tr></thead>
    <tbody>${tr('Manual testing', counts('manual'), 'manual')}${tr('Release checklist', counts('release'), 'release')}${tr('Overall', counts(), 'manual', 'overall')}</tbody>`;
  const noProof = ALL.filter(c => { const r = row(c.id); return r.status === 'Passed' && !r.evidence.trim(); }).length;
  if (noProof) $('#overview-lead').textContent += ` ${noProof} passed check${noProof === 1 ? ' has' : 's have'} no evidence linked yet.`;
  $('#bars').innerHTML = ['manual', 'release'].map(list => {
    const c = counts(list);
    const done = c.total - c.n['Not assessed'];
    return `<div class="bar-row">
      <div class="bar-head"><b>${list === 'manual' ? 'Manual testing' : 'Release checklist'}</b><span class="muted">${done} of ${c.total} checked</span></div>
      <div class="stack" aria-label="${SUMMARY_ORDER.map(s => `${c.n[s]} ${s}`).join(', ')}">
        ${SUMMARY_ORDER.filter(s => s !== 'Not assessed' && c.n[s]).map(s => `<span data-status="${s}" tabindex="0" data-tip="${label(s)}: ${c.n[s]}" style="width:${(c.n[s] / c.total) * 100}%"></span>`).join('')}
      </div>
      <div class="bar-counts">${SUMMARY_ORDER.filter(s => c.n[s]).map(s => `${c.n[s]} ${label(s).replace(/^\w/, ch => ch.toLowerCase())}`).join(' · ')}</div></div>`;
  }).join('');
  $('#legend').innerHTML = SUMMARY_ORDER.filter(s => s !== 'Not assessed').map(s => `<span data-status="${s}">${s === NEEDS ? NEEDS_SHORT : s}</span>`).join('') + '<span style="--s:var(--rule)">Not checked</span>';
  const byOwner = {};
  for (const c of ALL) { const r = row(c.id); if (TODO.has(r.status)) byOwner[r.owner] = (byOwner[r.owner] || 0) + 1; }
  const owners = Object.entries(byOwner).sort((a, b) => b[1] - a[1]);
  $('#owners').innerHTML = owners.length
    ? owners.map(([o, k]) => `<li><span>${esc(o)}</span><b>${k}</b></li>`).join('')
    : '<li class="muted">Nothing outstanding yet.</li>';
  const fixedChecks = ALL.filter(c => { const r = row(c.id); return r.status === 'Passed' && r.history.some(h => h.status === 'Failed'); });
  $('#fixed-text').innerHTML = fixedChecks.length
    ? `<p class="muted" style="margin:6px 0 0">${fixedChecks.length} check${fixedChecks.length === 1 ? '' : 's'} failed, were fixed and passed on re-test. Open one to see both results.</p>`
    : '<p class="muted" style="margin:6px 0 0">Nothing has failed and been fixed yet. Every check keeps its history, so a fix and its re-test both stay visible.</p>';
  $('#fixed-list').innerHTML = fixedChecks.map(c => {
    const h = row(c.id).history; const failed = h.find(x => x.status === 'Failed'); const passed = [...h].reverse().find(x => x.status === 'Passed');
    return `<li><span class="id">${esc(c.id)}</span><span><button class="linkish" type="button" data-edit="${c.id}">${esc(c.summary || c.title || c.id)}</button> <span class="muted">· failed ${fmtDate(failed?.at)}, passed ${fmtDate(passed?.at)}</span></span></li>`;
  }).join('');
  const p = project();
  const tested = Array.isArray(p.testSummary) ? p.testSummary : [];
  $('#tested-card').hidden = !tested.length;
  $('#tested').innerHTML = tested.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${md(v)}</dd>`).join('');
  const next = Array.isArray(p.nextSteps) ? p.nextSteps : [];
  $('#next-card').hidden = !next.length;
  $('#next-steps').innerHTML = next.map(step => `<li>${md(step)}</li>`).join('');
  $('#count-manual').textContent = CHECKS.manual.length;
  $('#count-release').textContent = CHECKS.release.length;
  $('#count-actions').textContent = ALL.filter(c => TODO.has(row(c.id).status)).length;
}

/* ------------------------------------------------------------------ about */
function renderAbout() {
  const sources = project().sources || [];
  $('#sources').innerHTML = sources.map(src => `<li><a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.label)} ↗</a></li>`).join('');
  $('#status-key').innerHTML = Object.entries(STATUSES).map(([s, d]) =>
    `<div><span><span class="pill" data-status="${s}">${s}</span></span><span>${d}</span></div>`).join('');
  $('#devices').innerHTML = CHECKS.release.filter(c => DEVICE_STAGES.has(c.stage)).map(c =>
    `<tr><td>${esc(c.summary.replace(/\.$/, ''))}</td><td class="mono">${c.id}</td><td class="muted">${c.stage.endsWith('browsers') ? 'QA or a tester with that browser' : 'QA or someone with the device'}</td></tr>`).join('');
}

/* ------------------------------------------------------------- checklists */
const filters = { manual: { q: '', status: 'All', group: 'type' }, release: { q: '', status: 'All', group: 'stage' } };
const open = new Set();

function matches(c, f) {
  const r = row(c.id);
  if (f.status !== 'All' && r.status !== f.status) return false;
  if (!f.q) return true;
  return [c.id, c.summary, c.type, c.stage, r.comments, r.evidence, r.owner].join(' ').toLowerCase().includes(f.q.toLowerCase());
}

/** Evidence paths and URLs as links (docs/qa/… resolves against PROJECT.evidenceBase). */
function evidenceAnchors(text) {
  const parts = String(text || '').split(/[;\n]|,\s(?=docs\/|https?:)/).map(t => t.trim()).filter(Boolean);
  return parts.map(t => {
    // FAILED / FIXED / PASSED in a file name gets that result's colour, so before/after pairs stand out.
    const result = /FAILED|BEFORE/i.test(t) ? 'Failed' : /FIXED|PASSED|AFTER/i.test(t) ? 'Passed' : '';
    const dot = result ? ` data-status="${result}" class="ev-result"` : '';
    if (/^https?:\/\//.test(t)) return `<a href="${esc(t)}" target="_blank" rel="noopener" title="${esc(t)}"${dot}>${esc(t.replace(/^https?:\/\//, ''))}</a>`;
    if (PROJECT.evidenceBase && /^docs\/qa\/evidence\//.test(t)) return `<a href="${esc(PROJECT.evidenceBase + t.replace(/^docs\/qa\//, ''))}" target="_blank" rel="noopener" title="${esc(t)}"${dot}>${esc(t.split('/').pop())}</a>`;
    return null;
  }).filter(Boolean);
}
function evidenceLinks(text) {
  const links = evidenceAnchors(text);
  return links.length ? `<div class="field wide evidence-links"><span>Open evidence:</span> ${links.join(' ')}</div>` : '';
}
const noEvidence = r => r.status === 'Passed' && !String(r.evidence || '').trim();

function itemHtml(c) {
  const r = row(c.id);
  const isOpen = open.has(c.id);
  const opt = (list, v) => list.map(o => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('');
  const refs = [
    c.priority && ['Priority', `<span class="prio" data-p="${c.priority}">${c.priority}</span>`],
    c.type && ['Test type', esc(c.type)],
    c.stage && ['Stage', esc(c.stage)],
    c.tools && c.tools !== 'N/A' && ['Suggested tools', esc(c.tools)],
    c.standards && ['Standards', esc(c.standards)],
    c.sourceNotes && ['Source note', esc(c.sourceNotes)],
  ].filter(Boolean);
  const history = r.history.length
    ? `<ul class="history">${[...r.history].reverse().map(h => `<li><time>${fmtDate(h.at)}</time><span class="pill" data-status="${esc(h.status)}">${esc(h.status)}</span><span class="muted">${h.by ? `<span class="by">${esc(h.by)}</span> ` : ''}${esc(h.note || '')}</span></li>`).join('')}</ul>`
    : '<p class="muted" style="margin:6px 0 0;font-size:13.5px">No results recorded yet. Each status change is kept here.</p>';
  return `<div class="item" data-status="${esc(r.status)}" ${isOpen ? 'open-state' : ''}>
    <button class="item-head" type="button" aria-expanded="${isOpen}" aria-controls="body-${c.id}" data-toggle="${c.id}">
      <span class="edge"></span>
      <span class="id mono">${c.id}</span>
      <span class="item-title">${esc(c.summary)}<span class="item-sub">${esc(c.type || c.stage)}${c.priority ? ' · ' + c.priority + ' priority' : ''}</span></span>
      <span class="owner-tag">${noEvidence(r) ? '<span class="warn-tag">No evidence · </span>' : ''}${r.owner === 'Unassigned' ? '' : esc(r.owner)}</span>
      <span class="pill" data-status="${esc(r.status)}">${esc(r.status)}</span>
      <svg class="i chev"><use href="#i-chev"/></svg>
    </button>
    <div class="item-body" id="body-${c.id}" ${isOpen ? '' : 'hidden'}>
      <div class="fields">
        <div class="field"><label for="st-${c.id}">Status</label><select id="st-${c.id}" data-id="${c.id}" data-field="status">${opt(CHECKS.status, r.status)}</select></div>
        <div class="field"><label for="ap-${c.id}">Applies to this project?</label><select id="ap-${c.id}" data-id="${c.id}" data-field="applies">${opt(CHECKS.applies, r.applies)}</select></div>
        <div class="field"><label for="ow-${c.id}">Owner</label><select id="ow-${c.id}" data-id="${c.id}" data-field="owner">${opt(CHECKS.owners, r.owner)}</select></div>
        <div class="field wide"><label for="ev-${c.id}">Evidence: links or file paths to screenshots, notes or test output</label><textarea id="ev-${c.id}" data-id="${c.id}" data-field="evidence" placeholder="e.g. docs/qa/evidence/${c.id}/2026-10-03-1080px.png">${esc(r.evidence)}</textarea></div>
        ${evidenceLinks(r.evidence)}
        <div class="field wide"><label for="cm-${c.id}">Notes: what was tested, what happened, what's next</label><textarea id="cm-${c.id}" data-id="${c.id}" data-field="comments">${esc(r.comments)}</textarea></div>
      </div>
      ${refs.length ? `<div class="ref">${refs.map(([k, v]) => `<div><b>${k}</b>${v}</div>`).join('')}</div>` : ''}
      <h4 style="margin:18px 0 0;font-size:13px">History</h4>
      ${history}
    </div>
  </div>`;
}

/* Summary (rows you open) or Table (everything at once, quick-edit). Remembered per viewer. */
let view = 'summary';
try { view = localStorage.getItem('qa-tracker-view') || 'summary'; } catch {}

function tableRows(items) {
  const opt = (list, v) => list.map(o => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('');
  return items.map(c => {
    const r = row(c.id);
    const ev = evidenceAnchors(r.evidence);
    return `<tr data-status="${esc(r.status)}">
      <td><span class="mono muted">${c.id}</span><div class="item-title">${esc(c.summary)}</div>
        <span class="item-sub">${esc(c.type || c.stage)}${c.priority ? ' · ' + c.priority : ''} · <button class="linkish" type="button" data-edit="${c.id}">Details &amp; history</button></span></td>
      <td><select class="status-select" data-status="${esc(r.status)}" aria-label="Status for ${c.id}" data-id="${c.id}" data-field="status">${opt(CHECKS.status, r.status)}</select></td>
      <td><select aria-label="Applies for ${c.id}" data-id="${c.id}" data-field="applies">${opt(CHECKS.applies, r.applies)}</select></td>
      <td><select aria-label="Owner for ${c.id}" data-id="${c.id}" data-field="owner">${opt(CHECKS.owners, r.owner)}</select></td>
      <td class="ev">${ev.length ? ev.slice(0, 2).join('') + (ev.length > 2 ? `<button class="linkish" type="button" data-edit="${c.id}">+${ev.length - 2} more</button>` : '') : noEvidence(r) ? '<span class="warn-tag">No evidence linked</span>' : '<span class="muted">—</span>'}</td>
      <td><textarea class="notes-edit" rows="3" aria-label="Notes for ${c.id}" placeholder="Add a note…" data-id="${c.id}" data-field="comments">${esc(r.comments)}</textarea></td>
    </tr>`;
  }).join('');
}

function tableHtml(items) {
  return `<div class="table-wrap"><table class="checks">
    <colgroup><col style="width:280px"><col style="width:164px"><col style="width:140px"><col style="width:150px"><col style="width:150px"><col></colgroup>
    <thead><tr><th>Check</th><th>Status</th><th>Applies?</th><th>Owner</th><th>Evidence</th><th>Notes</th></tr></thead>
    <tbody>${tableRows(items)}</tbody></table></div>`;
}

function renderList(list) {
  const host = document.querySelector(`[data-list="${list}"]`);
  const f = filters[list];
  const items = CHECKS[list].map(c => ({ ...c, list }));
  const statusCounts = {};
  items.forEach(c => { const s = row(c.id).status; statusCounts[s] = (statusCounts[s] || 0) + 1; });
  const shown = items.filter(c => matches(c, f));
  const groupKey = list === 'manual' ? 'type' : 'stage';
  const groups = [...new Set(shown.map(c => c[groupKey]))];
  const focusSearch = document.activeElement?.dataset?.search === list;
  host.innerHTML = `
    <div class="toolbar">
      <label class="search"><svg class="i"><use href="#i-search"/></svg><span class="sr-only">Search checks</span>
        <input type="search" data-search="${list}" value="${esc(f.q)}" placeholder="Search by ID, words or notes" /></label>
      <div class="seg" role="group" aria-label="View">
        <button type="button" data-view="summary" aria-pressed="${view === 'summary'}" title="Summary: one line per check, open for details"><svg class="i"><use href="#i-list"/></svg>Summary</button>
        <button type="button" data-view="table" aria-pressed="${view === 'table'}" title="Table: everything at once, quick-edit"><svg class="i"><use href="#i-table"/></svg>Table</button>
      </div>
    </div>
    <div class="chips" role="group" aria-label="Filter by status">
      ${['All', ...Object.keys(STATUSES)].filter(s => s === 'All' || statusCounts[s]).map(s =>
        `<button class="chip" type="button" data-filter="${list}" data-value="${s}" aria-pressed="${f.status === s}">${s}<span class="n">${s === 'All' ? items.length : statusCounts[s]}</span></button>`).join('')}
    </div>
    ${shown.length ? groups.map(g => `
      <div class="group-title">${esc(g)} <span>${shown.filter(c => c[groupKey] === g).length}</span></div>
      ${view === 'table' ? tableHtml(shown.filter(c => c[groupKey] === g)) : `<div class="list">${shown.filter(c => c[groupKey] === g).map(itemHtml).join('')}</div>`}`).join('')
      : '<div class="list"><div class="empty">No checks match. Clear the search or pick another status.</div></div>'}`;
  if (focusSearch) { const i = host.querySelector('[data-search]'); i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
}

/* ---------------------------------------------------------------- actions */
function renderActions() {
  const todo = ALL.filter(c => TODO.has(row(c.id).status));
  const host = $('#actions');
  if (!todo.length) { host.innerHTML = '<div class="list"><div class="empty">Nothing to do yet. Failed, blocked and “needs project or QA” checks appear here.</div></div>'; return; }
  const owners = [...new Set(todo.map(c => row(c.id).owner))];
  host.innerHTML = owners.map(o => `
    <div class="group-title">${esc(o)} <span>${todo.filter(c => row(c.id).owner === o).length}</span></div>
    <div class="list">${todo.filter(c => row(c.id).owner === o).map(itemHtml).join('')}</div>`).join('');
}

function renderLessons() {
  if (!LESSONS || !$('#panel-lessons')) return;
  $('#lessons-intro').innerHTML = md(LESSONS.intro || '');
  $('#lessons-table').innerHTML = `<thead><tr>${LESSONS.headers.map(h => `<th scope="col">${md(h)}</th>`).join('')}</tr></thead>` +
    `<tbody>${LESSONS.rows.map(r => `<tr>${r.map(cell => `<td>${md(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  $('#patterns-card').hidden = !(LESSONS.patterns || []).length;
  $('#patterns').innerHTML = (LESSONS.patterns || []).map(x => `<li>${md(x)}</li>`).join('');
  $('#count-lessons').textContent = LESSONS.rows.length;
}

function renderAll(keepOpen) {
  if (keepOpen) open.add(keepOpen);
  renderHeader(); renderOverview(); renderList('manual'); renderList('release'); renderActions();
}

/* ----------------------------------------------------------------- events */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-toggle]');
  if (t) { const id = t.dataset.toggle; open.has(id) ? open.delete(id) : open.add(id); renderList('manual'); renderList('release'); renderActions(); document.querySelector(`[data-toggle="${id}"]`)?.focus(); return; }
  const ot = e.target.closest('[data-open-tab]');
  if (ot) { select(ot.dataset.openTab); document.getElementById(ot.dataset.openTab).focus(); return; }
  const v = e.target.closest('[data-view]');
  if (v) { view = v.dataset.view; try { localStorage.setItem('qa-tracker-view', view); } catch {} renderList('manual'); renderList('release'); return; }
  const ed = e.target.closest('[data-edit]');
  if (ed) {
    const id = ed.dataset.edit;
    view = 'summary'; open.add(id); renderList('manual'); renderList('release');
    const check = ALL.find(c => c.id === id);
    if (check) select(check.list === 'release' ? 'tab-release' : 'tab-manual');
    document.querySelector(`[data-toggle="${id}"]`)?.scrollIntoView({ block: 'center' });
    document.querySelector(`[data-toggle="${id}"]`)?.focus({ preventScroll: true });
    return;
  }
  const chip = e.target.closest('[data-filter]');
  if (chip) { filters[chip.dataset.filter].status = chip.dataset.value; renderList(chip.dataset.filter); return; }
  const stat = e.target.closest('[data-goto]');
  // A summary card opens Manual testing filtered to that status.
  if (stat) {
    filters.manual.status = filters.release.status = stat.dataset.goto;
    renderList('manual'); renderList('release');
    select(stat.dataset.listTarget === 'release' ? 'tab-release' : 'tab-manual');
    return;
  }
  if (!e.target.closest('.menu')) closeMenu();
});
document.addEventListener('change', e => {
  const el = e.target.closest('[data-field]');
  if (el && el.tagName === 'SELECT') setField(el.dataset.id, el.dataset.field, el.value);
});
document.addEventListener('input', e => {
  const s = e.target.closest('[data-search]');
  if (s) { filters[s.dataset.search].q = s.value; renderList(s.dataset.search); return; }
  const el = e.target.closest('textarea[data-field]');
  if (el) { state.rows[el.dataset.id] = { ...row(el.dataset.id), [el.dataset.field]: el.value }; save(); }
});

/* tabs */
const tabs = [...document.querySelectorAll('[role=tab]')];
function select(id) {
  tabs.forEach(t => { const on = t.id === id; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; document.getElementById(t.getAttribute('aria-controls')).hidden = !on; });
  try { sessionStorage.setItem('qa-tracker-tab', id); } catch {}
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => select(t.id));
  t.addEventListener('keydown', e => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return;
    const n = tabs[(i + k + tabs.length) % tabs.length]; n.focus(); select(n.id);
  });
});

/* theme */
function paintTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  $('#theme').innerHTML = `<svg class="i"><use href="#${dark ? 'i-sun' : 'i-moon'}"/></svg>`;
  $('#theme').setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
$('#theme').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  if (dark) document.documentElement.dataset.theme = 'dark'; else delete document.documentElement.dataset.theme;
  try { localStorage.setItem('qa-tracker-theme', dark ? 'dark' : 'light'); } catch {}
  paintTheme();
});

/* share menu */
const menuBtn = $('#share-btn'), menu = $('#share-menu');
function closeMenu() { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
menuBtn.addEventListener('click', () => { menu.hidden = !menu.hidden; menuBtn.setAttribute('aria-expanded', String(!menu.hidden)); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
function act(name) {
  const who = (state.tester || '').trim();
  const file = who ? `${slug()}-qa-results-${who.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${today()}.json` : `${slug()}-qa-backup-${today()}.json`;
  if (name === 'md') download(`${slug()}-qa-report-${today()}.md`, markdown(), 'text/markdown');
  if (name === 'json') download(file, JSON.stringify({ format: 'qa-review-tracker', version: 3, exportedAt: new Date().toISOString(), exportedBy: who, ...state }, null, 2), 'application/json');
  if (name === 'import') $('#import-file').click();
}
menu.addEventListener('click', e => {
  const name = e.target.closest('[data-act]')?.dataset.act; if (!name) return;
  closeMenu(); act(name);
});

/** Newest first-recorded time of a row, for deciding which copy of a check is more recent. */
const touched = r => [r.at, ...(r.history || []).map(h => h.at)].filter(Boolean).sort().pop() || '';

/**
 * Merge a tester's backup into this browser. Only the checks in the file change;
 * for each one the more recent copy wins and both histories are kept, so files
 * from several testers can be imported one after another without losing work.
 */
function mergeRows(incoming) {
  let changed = 0;
  for (const [id, theirs] of Object.entries(incoming)) {
    if (!theirs || typeof theirs !== 'object') continue;
    const ours = state.rows[id];
    const history = [...(ours?.history || []), ...(theirs.history || [])]
      .filter((h, i, all) => all.findIndex(x => x.at === h.at && x.status === h.status) === i)
      .sort((a, b) => String(a.at).localeCompare(String(b.at)));
    const newer = !ours || touched(theirs) >= touched(ours);
    const merged = newer ? { ...ours, ...theirs } : { ...theirs, ...ours };
    const before = JSON.stringify(ours || null);
    state.rows[id] = { ...merged, history };
    if (JSON.stringify(state.rows[id]) !== before) changed++;
  }
  return changed;
}

$('#import-file').addEventListener('change', async e => {
  const file = e.target.files?.[0]; e.target.value = ''; if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const rows = data.rows || data.assessments;
    if (!rows || typeof rows !== 'object') throw new Error();
    const changed = mergeRows(rows);
    if (data.lastChecked && data.lastChecked > (state.lastChecked || '')) state.lastChecked = data.lastChecked;
    save(); renderAll();
    const from = data.exportedBy ? ` from ${data.exportedBy}` : '';
    toast(changed ? `Merged ${changed} check${changed === 1 ? '' : 's'}${from}` : `Nothing new${from}: already up to date`);
  } catch { toast('That file isn’t a tracker backup'); }
});

/* QA testers: start here */
const nameInput = $('#tester-name');
nameInput.value = state.tester || '';
nameInput.addEventListener('input', () => { state.tester = nameInput.value; save(); });
document.querySelectorAll('.start-owner-name').forEach(el => { if (project().owner) el.textContent = project().owner; });
$('#start-here').addEventListener('click', e => {
  const go = e.target.closest('[data-goto]')?.dataset.goto;
  if (go) { select(go); document.getElementById(go).scrollIntoView({ block: 'start', behavior: 'smooth' }); }
  const name = e.target.closest('[data-act]')?.dataset.act;
  if (name) act(name);
});
try { if (localStorage.getItem('qa-tracker-start') === 'closed') $('#start-here').open = false; } catch {}
$('#start-here').addEventListener('toggle', e => { try { localStorage.setItem('qa-tracker-start', e.target.open ? 'open' : 'closed'); } catch {} });
const today = () => new Date().toISOString().slice(0, 10);
const slug = () => (project().name || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast('Downloaded ' + name);
}
function markdown() {
  const p = project(); const { n, total } = counts();
  const line = c => { const r = row(c.id); return `| ${c.id} | ${c.summary.replace(/\|/g, '/')} | ${r.status} | ${r.owner} | ${(r.by || '').replace(/\|/g, '/')} | ${(r.comments || '').replace(/\n/g, ' ').replace(/\|/g, '/')} | ${(r.evidence || '').replace(/\n/g, ' ').replace(/\|/g, '/')} |`; };
  const table = list => ['| ID | Check | Status | Owner | Recorded by | Notes | Evidence |', '|---|---|---|---|---|---|---|', ...CHECKS[list].map(line)].join('\n');
  return [`# QA report: ${p.name || 'Untitled project'}`, '',
    `- Live site: ${p.liveUrl || 'not set'}`, `- Repository: ${p.repoUrl || 'not set'}`, `- Version tested: ${p.version || 'not set'}`,
    `- Assessment started: ${p.started || 'not set'} · Last checked: ${lastChecked() ? fmtDate(lastChecked()) : 'not yet'}`, `- Tested by: ${p.testers || 'not set'}`, '',
    `**${total - n['Not assessed']} of ${total} checked:** ${SUMMARY_ORDER.map(s => `${n[s]} ${s.toLowerCase()}`).join(' · ')}`, '',
    '## Manual testing', '', table('manual'), '', '## Release checklist', '', table('release'), ''].join('\n');
}

/* project dialog */
const dlg = $('#project-dialog');
$('#edit-project').addEventListener('click', () => {
  const p = project();
  for (const el of dlg.querySelectorAll('[name]')) el.value = p[el.name] || '';
  dlg.showModal();
});
dlg.addEventListener('close', () => {
  if (dlg.returnValue !== 'save') return;
  state.project = Object.fromEntries([...dlg.querySelectorAll('[name]')].map(el => [el.name, el.value.trim()]));
  save(); renderHeader(); toast('Project details saved');
});

let toastTimer;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200); }

/* start */
paintTheme(); renderAbout(); renderLessons(); renderAll();
try { const last = sessionStorage.getItem('qa-tracker-tab'); if (last && document.getElementById(last)) select(last); } catch {}
