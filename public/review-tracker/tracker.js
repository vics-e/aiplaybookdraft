const manualChecks = [
        { id: 'manual-01', priority: 'Low', type: 'Usability', summary: 'Scroll bar should appear only if required.', tools: 'N/A', standards: 'Usability.gov guidelines', sourceNotes: '' },
        { id: 'manual-02', priority: 'Low', type: 'Usability', summary: 'Check enough space is applied between field labels, columns, rows and errors.', tools: 'N/A', standards: 'W3C usability guidelines', sourceNotes: '' },
        { id: 'manual-03', priority: 'Medium', type: 'Usability', summary: 'All text should be properly aligned.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-04', priority: 'Medium', type: 'Usability', summary: 'Check the site is responsive at 767px, 768px, 1080px and 1920px.', tools: 'Web Developer toolbar: Resize, View Responsive Layouts', standards: '', sourceNotes: '' },
        { id: 'manual-05', priority: 'High', type: 'Usability', summary: 'Font should be consistent throughout the site.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-06', priority: 'Medium', type: 'Usability', summary: 'Display appropriate server-side and client-side validation for form fields.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-07', priority: 'High', type: 'Usability', summary: 'Check for broken links, missing images, CSS, Flash, RSS, script errors, expired domains and server configuration issues.', tools: 'Xenu', standards: '', sourceNotes: '' },
        { id: 'manual-08', priority: 'Medium', type: 'Functional', summary: 'Test all mandatory fields validate correctly based on user input.', tools: 'N/A', standards: 'N/A', sourceNotes: '' },
        { id: 'manual-09', priority: 'Medium', type: 'Functional', summary: 'Test accented letters are displayed correctly in Page Editor and the front end.', tools: 'N/A', standards: '', sourceNotes: 'The source checklist contains examples covering common European accented characters.' },
        { id: 'manual-10', priority: 'Low', type: 'Functional', summary: 'Test no mandatory error message is present for optional fields.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-11', priority: 'Medium', type: 'Functional', summary: 'Test leap years are validated correctly and do not cause errors.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-12', priority: 'Low', type: 'Functional', summary: 'Test negative input values for each field.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-13', priority: 'Low', type: 'Functional', summary: 'Test the maximum length of every field to ensure data is not truncated.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-14', priority: 'Medium', type: 'Functional', summary: 'Check a confirmation message is displayed for update and delete operations.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-15', priority: 'Medium', type: 'Functional', summary: 'Test all input fields for special characters.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-16', priority: 'Medium', type: 'Functional', summary: 'Test the sorting and filtering functionality.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-17', priority: 'Medium', type: 'Functional', summary: 'Test no errors are present in the browser console.', tools: 'Browser developer tools console', standards: '', sourceNotes: '' },
        { id: 'manual-18', priority: 'Medium', type: 'Functional', summary: 'Test the functionality of buttons, including enabled, disabled and hidden states.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-19', priority: 'High', type: 'Functional', summary: 'Test that failed functionality redirects the user to the custom error page (404).', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-20', priority: 'Medium', type: 'Functional', summary: 'Test all uploaded documents open correctly in a new window, new tab or intended destination.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-21', priority: 'High', type: 'Functional', summary: 'Test the user is able to download files.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-22', priority: 'High', type: 'Functional', summary: 'Test email functionality, such as feedback and order confirmation.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-23', priority: 'High', type: 'Functional', summary: 'Validate that blank form submissions are not allowed and at least one field is required.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-24', priority: 'Medium', type: 'Functional', summary: 'Test external page links open in a new tab or window.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-25', priority: 'High', type: 'Functional', summary: 'Check Create, Edit, Delete and Publish for a new component.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-26', priority: 'High', type: 'Functional', summary: 'Verify data retrieval delivers the correct data, such as Search and News sections.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-27', priority: 'Medium', type: 'Functional', summary: 'Ensure search functions correctly and results are accurate and helpful to the customer.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-28', priority: 'High', type: 'Compatibility', summary: 'Test page rendering at different screen resolutions and rotations.', tools: 'Web Developer toolbar: Resize, View Responsive Layouts', standards: 'Latest browser versions only', sourceNotes: 'Chrome developer tools can also be used to switch between representative devices.' },
        { id: 'manual-29', priority: 'High', type: 'Compatibility', summary: 'Test that the CSS and HTML used are compatible with the appropriate browser and device versions.', tools: 'Edge, Chrome, Firefox, Safari, iPhone and Android', standards: 'Portrait and landscape orientations', sourceNotes: '' },
        { id: 'manual-30', priority: 'Low', type: 'Destructive', summary: 'Apply inputs that force all error messages to occur.', tools: 'N/A', standards: 'N/A', sourceNotes: '' },
        { id: 'manual-31', priority: 'Low', type: 'Destructive', summary: 'Repeatedly attempt to submit a form by continually clicking the submit action.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-32', priority: 'Low', type: 'Destructive', summary: 'Force different outputs to be generated for each input.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-33', priority: 'Low', type: 'Destructive', summary: 'Attempt to fill the file system to its capacity.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-34', priority: 'Low', type: 'Destructive', summary: 'Attempt to submit blank forms repeatedly.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-35', priority: 'Low', type: 'Destructive', summary: 'Attempt to view an invalid page URL within the site.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-36', priority: 'Low', type: 'Destructive', summary: 'Alter strings within the webpages where applicable and ensure an appropriate message is displayed.', tools: 'N/A', standards: '', sourceNotes: '' },
        { id: 'manual-37', priority: 'High', type: 'Performance', summary: 'Run Google PageSpeed to identify performance improvements.', tools: 'Google PageSpeed', standards: 'N/A', sourceNotes: '' },
        { id: 'manual-38', priority: 'High', type: 'Accessibility', summary: 'Run Lighthouse Accessibility to identify accessibility improvements.', tools: 'Lighthouse', standards: 'N/A', sourceNotes: '' }
      ];

      const releaseChecks = [
        { id: 'release-01', stage: 'Entry criteria', summary: 'All designs are signed off.' },
        { id: 'release-02', stage: 'Entry criteria', summary: 'Acceptance criteria are locked down.' },
        { id: 'release-03', stage: 'Entry criteria', summary: 'All code changes are complete and peer reviewed for each user story delivered.' },
        { id: 'release-04', stage: 'Entry criteria', summary: 'The test environment is fully configured to update customer websites dynamically.' },
        { id: 'release-05', stage: 'Entry criteria', summary: 'Test cases are documented and ready for execution.' },
        { id: 'release-06', stage: 'Entry criteria', summary: 'Unit testing and VQA are complete before changes are pushed to development.' },
        { id: 'release-07', stage: 'Entry criteria', summary: 'Modified requirements are updated in acceptance criteria rather than Jira comments or designs.' },
        { id: 'release-08', stage: 'Entry criteria', summary: 'New requirements treated as changes are addressed in a new user story.' },
        { id: 'release-09', stage: 'Entry criteria', summary: 'If designs change, updated designs are recorded in Jira with the exact layouts and styles used for testing.' },
        { id: 'release-10', stage: 'Exit criteria', summary: 'All acceptance criteria have been verified.' },
        { id: 'release-11', stage: 'Exit criteria', summary: 'All targeted and integrated testing is completed.' },
        { id: 'release-12', stage: 'Exit criteria', summary: 'Any bugs found are raised in Jira, assigned to the appropriate developer and linked to the parent story.' },
        { id: 'release-13', stage: 'Exit criteria', summary: 'Bug fixes are deployed and validated as resolved.' },
        { id: 'release-14', stage: 'Exit criteria', summary: 'The automated test suite is maintained and updated for additional requirements.' },
        { id: 'release-15', stage: 'Compatibility: browsers', summary: 'Microsoft Edge, latest version, on Windows 11.' },
        { id: 'release-16', stage: 'Compatibility: browsers', summary: 'Google Chrome, latest version, on Windows 11.' },
        { id: 'release-17', stage: 'Compatibility: browsers', summary: 'Mozilla Firefox, latest version, on Windows 11.' },
        { id: 'release-18', stage: 'Compatibility: browsers', summary: 'Safari, latest version, on macOS.' },
        { id: 'release-19', stage: 'Compatibility: tablets', summary: 'Samsung Galaxy Tab A9+ on the latest Android version.' },
        { id: 'release-20', stage: 'Compatibility: tablets', summary: 'iPad 10th generation and iPad Mini 2021 on the latest iOS version.' },
        { id: 'release-21', stage: 'Compatibility: mobile', summary: 'iPhone 17 and Mini on the latest iOS version.' },
        { id: 'release-22', stage: 'Compatibility: mobile', summary: 'Samsung S25 on the latest Android version.' },
        { id: 'release-23', stage: 'Responsive testing', summary: 'Test at a screen resolution of 1680px or wider.' },
        { id: 'release-24', stage: 'Responsive testing', summary: 'Test at a screen resolution of 1080px or wider.' },
        { id: 'release-25', stage: 'Responsive testing', summary: 'Test at a screen resolution of 767px or wider.' },
        { id: 'release-26', stage: 'Responsive testing', summary: 'Test below 767px.' },
        { id: 'release-27', stage: 'Sign-off criteria', summary: 'No known Blocker or Critical bugs are outstanding.' },
        { id: 'release-28', stage: 'Sign-off criteria', summary: 'Manual and automated regression tests are complete for Sitecore, third parties, Tealium tags, market sites and ecommerce journeys.' },
        { id: 'release-29', stage: 'Sign-off criteria', summary: 'VQA has signed off the changes.' }
      ];

      const assessmentDefaults = {
        applies: 'To review',
        status: 'Not assessed',
        owner: 'Unassigned',
        interpretation: '',
        evidence: '',
        comments: ''
      };

      const evidenceSeed = (applies, status, owner, evidence, comments, interpretation = '') => ({
        applies, status, owner, evidence, comments, interpretation
      });

      const seedAssessments = {
  "manual-01": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: All 63 default pages were measured at 320, 767, 768, 1080 and 1920px with no root horizontal overflow. The repaired populated pricing view was then rechecked at exactly 320px.",
    "interpretation": "Only show scrolling where content requires it. No unintended horizontal scrollbar or trapped internal scrolling."
  },
  "manual-02": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/pricing-320-overlap.png; docs/qa/evidence/row-audit/batch-7.md",
    "comments": "18 Sep 2026: User review confirms the spacing criterion passes. Earlier 320px pricing evidence recorded cramped controls, so that narrower-layout observation remains a follow-up for manual-28/release-26; this row is marked passed by the current review decision.",
    "interpretation": "Labels, fields, rows and error messages have consistent spacing and do not overlap or appear cramped."
  },
  "manual-03": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/glossary-1080-overflow.png; docs/qa/evidence/row-audit/pricing-320-overlap.png",
    "comments": "23 Sep 2026: fixed the glossary grid breakpoint and added containment and word-wrapping safeguards. Local rendered glossary and production build verified; headings and definitions remain within the content panel.",
    "interpretation": "Text follows the intended page grid and component alignment. Deliberate exceptions are visually consistent."
  },
  "manual-04": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/glossary-1080-overflow.png",
    "comments": "23 Sep 2026: the identified glossary containment failure is fixed by moving the split layout to the wider breakpoint and wrapping long content. The local build passed and the affected page was rechecked.",
    "interpretation": "At every required width, content remains readable and usable with no clipping or unintended horizontal overflow."
  },
  "manual-05": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/http-checks.json; docs/qa/evidence/row-audit/batch-7.md",
    "comments": "23 Sep 2026: removed the four broken font CDN requests and retained the established Sage family tokens using the loaded Inter family. Sage still needs to approve the final typography baseline after deployment.",
    "interpretation": "The playbook uses a deliberate type system. Headings, body text, labels and supporting text each use consistent assigned font families, sizes and weights. They do not all need to be identical."
  },
  "manual-06": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/negative-pricing.txt; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "23 Sep 2026: fixed signed-number parsing and added number controls with a zero minimum and inline validation. Local retest with -6 and -3 shows Time values cannot be negative and no saving calculation.",
    "interpretation": "Client-side validation should match agreed required fields. Server-side validation is not applicable unless the hosting or integration design introduces form submission."
  },
  "manual-07": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-6.md; docs/qa/evidence/row-audit/http-checks.json",
    "comments": "23 Sep 2026: deployed JavaScript and CSS return 200 and the old broken font host is absent from production CSS. The four recorded font 404 requests are resolved.",
    "interpretation": "All rendered links and resources load successfully, with no missing images, stylesheet failures or script errors."
  },
  "manual-08": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/workflow-gate.txt; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "23 Sep 2026: the three-workflow gate is now consistent and locally verified. Business owner must still define which other responses are mandatory and their acceptance rules.",
    "interpretation": "Every field agreed as mandatory rejects invalid or empty input and provides a clear error message."
  },
  "manual-09": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "CMS",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/spec-fields.json; docs/qa/evidence/row-audit/summary-editors.jsonl",
    "comments": "Front-end accent corpus retained in default text fields, all 11 spec fields, 15 pricing fields, 16 tool fields, 24 prompt variables and all 39 available summary editors. Page Editor is unavailable and cannot be signed off from this standalone deployment.",
    "interpretation": "Accented characters render and persist without corruption in all relevant content and input fields."
  },
  "manual-10": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/input-cases.json; docs/qa/evidence/row-audit/input-observations-supplement.json; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "9–10 Sep 2026: optional text fields accepted keyboard clearing without native required errors. Source and expanded field inventories show no required attributes; summary/spec/prompt optional fields remain usable. Blank tool name reverts to its default without an error. This does not approve mandatory-field policy.",
    "interpretation": "Fields defined as optional can be left empty without showing a required-field error."
  },
  "manual-11": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/leap-date-valid.txt; docs/qa/evidence/row-audit/leap-date-invalid.txt",
    "comments": "Audit correction: there IS a free-text DATE placeholder in the prompt library. Both 2028-02-29 and invalid 2027-02-29 are accepted as literal template text. No date validation/calculation runs; Sage must confirm whether this free-form template needs calendar validation.",
    "interpretation": "Only applicable if the experience introduces date entry or date calculations."
  },
  "manual-12": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/negative-pricing.txt; docs/qa/evidence/row-audit/negative-pricing.png",
    "comments": "23 Sep 2026: pricing fields now use numeric controls and signed parsing. Negative values show an inline error and do not produce a reduction; time with AI above time today is also rejected.",
    "interpretation": "Numeric controls reject or safely constrain values outside their agreed range."
  },
  "manual-13": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/certificate-truncation.json; docs/qa/evidence/row-audit/certificate-truncation.png",
    "comments": "23 Sep 2026: certificate names now have a visible 100-character limit and generated markup preserves every wrapped line. The 83-character reproduction retains every word including LASTTOKEN in the preview and markup test.",
    "interpretation": "Long input remains usable, is stored safely and is not silently truncated in the interface or output."
  },
  "manual-14": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/prompt-clear.txt; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "23 Sep 2026: page 31 now announces Prompt cleared in an accessible live status after Clear completes. Verified in the local rendered build.",
    "interpretation": "Explicit local updates and deletions provide accurate confirmation."
  },
  "manual-15": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/input-observations-supplement.json; docs/qa/evidence/row-audit/summary-editors.jsonl; docs/qa/evidence/row-audit/prompt-variables.json",
    "comments": "9–10 Sep 2026: accented characters, punctuation, quotes, backslash and literal script-like text tested through every default editable text control, expanded spec/pricing/tool/prompt groups and all 39 available summary editors. Values retained literally and persisted/reopened. Fixed-choice controls do not accept arbitrary text. This is the specified character test, not a penetration-test sign-off.",
    "interpretation": "Common punctuation, accented characters and HTML-like text are accepted or safely rejected without corruption or code execution."
  },
  "manual-16": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "23 Sep 2026: fixed stale glossary selection. Filtering for audit trail now leaves AI Audit Trail in the list and updates the definition panel to AI Audit Trail. Clear and no-results behaviour remain intact.",
    "interpretation": "Sorting and filters return accurate results, update predictably and can be cleared."
  },
  "manual-17": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/pagespeed-console.txt; docs/qa/evidence/row-audit/batch-6.md",
    "comments": "23 Sep 2026: deployed browser check returned no console warnings or errors after the broken font requests were removed.",
    "interpretation": "Normal journeys complete without errors in the browser console."
  },
  "manual-18": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/workflow-gate.txt; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "23 Sep 2026: every route into workflow scoring now requires at least three workflows. With one workflow, both Score each and Next remain disabled in the local rendered retest.",
    "interpretation": "Every visible button performs the intended action and disabled or hidden states occur only under the agreed conditions."
  },
  "manual-19": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/http-checks.json",
    "comments": "23 Sep 2026: deployed invalid route returned the branded AI Playbook Page not found experience with HTTP 404.",
    "interpretation": "Invalid application routes must show a custom error page. A generic hosting response is insufficient without an explicit Sage waiver."
  },
  "manual-20": {
    "applies": "Not relevant",
    "status": "Not applicable",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "9–10 Sep 2026: no uploaded-document feature or uploaded-document links in rendered page inventory/source. Generated certificate and summary output are covered by manual-21.",
    "interpretation": ""
  },
  "manual-21": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: The current deployment opened the certificate print/save flow successfully. The maintained controller tests also confirm the print document is written and invoked, including blocked-popup handling.",
    "interpretation": "The available certificate output opens and can be printed or saved through the browser."
  },
  "manual-22": {
    "applies": "Not relevant",
    "status": "Not applicable",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md",
    "comments": "9–10 Sep 2026: no email submission integration exists. Prompt examples containing email text are local templates, not an email-sending feature.",
    "interpretation": ""
  },
  "manual-23": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md",
    "comments": "No server form submission. Activities auto-save and accept blank optional fields; business owner must decide whether any answer is mandatory before completion/output.",
    "interpretation": "At least one response is required only if the agreed business requirements define the activity as mandatory."
  },
  "manual-24": {
    "applies": "Not relevant",
    "status": "Not applicable",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "9–10 Sep 2026: no external page-link controls found in all 63 default page DOM inventories or app source. Runtime font/analytics URLs are resources, not external page links.",
    "interpretation": ""
  },
  "manual-25": {
    "applies": "Not relevant",
    "status": "Not applicable",
    "owner": "CMS",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md",
    "comments": "Standalone Vercel experience has no CMS/Page Editor component CRUD/publishing. Future Sage integration remains explicitly open in release-04/28 and manual-09.",
    "interpretation": ""
  },
  "manual-26": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/summary-after-reload.txt",
    "comments": "23 Sep 2026: glossary retrieval now selects the first matching filtered term rather than retaining a hidden stale definition. Local retest returns AI Audit Trail consistently in both list and detail.",
    "interpretation": "Local glossary, workflow and activity-summary retrieval displays the correct selected/saved data."
  },
  "manual-27": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/glossary-filter-selected.txt; docs/qa/evidence/row-audit/batch-8.md",
    "comments": "23 Sep 2026: glossary search now keeps results and the displayed definition in sync. Filtering for audit trail returns and displays AI Audit Trail; no-results and clearing remain predictable.",
    "interpretation": "Search returns the expected matching playbook content and empty or cleared searches behave predictably."
  },
  "manual-28": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: Portrait and landscape viewport simulations were repeated across the required widths. The repaired 320px pricing layout and 1080px glossary remained readable and operable without clipping.",
    "interpretation": "Required portrait, landscape and viewport sizes remain readable and operable without clipping or overlap."
  },
  "manual-29": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "Partial: in-app Chromium only. Chrome and Edge installed but CUA reports both unavailable; no Firefox or Apple/Android device connected. No browsers installed. Physical portrait/landscape and latest-version certification remain QA work.",
    "interpretation": "The supported browser and device matrix renders and behaves consistently. Missing browsers or physical devices are recorded for manual testing."
  },
  "manual-30": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md",
    "comments": "23 Sep 2026: negative pricing and workflow-gate errors are fixed locally. Storage failure feedback is implemented and awaits the controlled deployed retest; the complete expected-error catalogue still requires agreement.",
    "interpretation": ""
  },
  "manual-31": {
    "applies": "Not relevant",
    "status": "Not applicable",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md",
    "comments": "No form-submit endpoint exists. Local Add/Save/clear actions are covered under manual-14/18/32; source row's repeated form submission is not a backend scenario in this deployment.",
    "interpretation": ""
  },
  "manual-32": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/input-observations-supplement.json; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: Varied valid, invalid, long, accented and HTML-like inputs were exercised across pricing, certificate, glossary and workflow outputs; current outputs update without stale or executable content.",
    "interpretation": "Different valid inputs produce the expected saved state, summary or output without stale data."
  },
  "manual-33": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/quota-false-save.txt; docs/qa/evidence/row-audit/quota-after-reload.txt; docs/qa/evidence/row-audit/quota-false-save.png; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: A controlled QuotaExceededError was run against the current deployment. The app showed an explicit alert that the latest change could not be saved and did not claim success.",
    "interpretation": "Controlled storage-quota failure preserves existing answers and gives truthful save feedback; do not fill the real filesystem."
  },
  "manual-34": {
    "applies": "Not relevant",
    "status": "Not applicable",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md",
    "comments": "No submitted forms/endpoints. Repeated empty local edits are separate from source row's blank form submission; optional clearing and workflow gates were tested.",
    "interpretation": ""
  },
  "manual-35": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/http-checks.json",
    "comments": "2026-09-09: invalid route safely returns HTTP 404. Custom presentation separately fails manual-19.",
    "interpretation": "Request a harmless invalid route; it returns an error rather than crashing the application or exposing data."
  },
  "manual-36": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-8.md",
    "comments": "Literal altered/special strings retained safely in tested controls. Application intentionally lacks general validation messaging; Sage must define which altered-string states should produce messages.",
    "interpretation": ""
  },
  "manual-37": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/pagespeed-mobile.txt; docs/qa/evidence/row-audit/pagespeed-desktop.txt; docs/qa/evidence/row-audit/batch-6.md",
    "comments": "2026-09-09 23:42 BST: Google PageSpeed web report completed after API 429. Performance 70 mobile / 90 desktop; LCP 11.3s / 2.0s; image savings ~1.4MiB, unused JS ~126KiB. Source asks to run the checker, not achieve a threshold. Scope: initial cover only.",
    "interpretation": "Run Google PageSpeed and record mobile/desktop findings and performance improvements. A run does not constitute release performance approval."
  },
  "manual-38": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/pagespeed-mobile.txt; docs/qa/evidence/row-audit/pagespeed-desktop.txt; docs/qa/evidence/row-audit/batch-6.md",
    "comments": "2026-09-09: Lighthouse 13.4.1 via Google PageSpeed returned Accessibility 100 on mobile and desktop cover. Ten manual checks remain outside automation; keyboard, screen reader and every interactive state still require broader QA.",
    "interpretation": "Run Lighthouse Accessibility, retain results and identify follow-up work. This is the source row's tool-run requirement, not an all-page WCAG or screen-reader certification."
  },
  "release-01": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Obtain dated design sign-off covering the actual delivered revision. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-02": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Obtain the locked acceptance criteria and revision/change baseline. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-03": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "Other Sage team",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Map each delivered user story to completed commits and peer-review approval. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-04": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "CMS",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Have CMS demonstrate the configured Sage integration environment dynamically updates a QA customer site. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-05": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/checklist-runbook.md; docs/qa/evidence/row-audit/batch-9.md",
    "comments": "10 Sep 2026: 67 distinct test cases documented and checked against both PDFs. This completes test-case documentation, not execution or acceptance-criteria sign-off.",
    "interpretation": "All 67 source checklist cases are documented with executable procedures, expected results, owners, prerequisites and evidence requirements. External execution may await its prerequisite environment."
  },
  "release-06": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Obtain unit-test evidence and VQA completion dated before development promotion. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-07": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: For modified requirements, inspect updated acceptance criteria rather than only comments/designs. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-08": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: For new requirements, verify separate linked user stories or confirm no changes in scope. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-09": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: For design changes, verify the precise revised layouts/styles attached to Jira. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-10": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "Business owner",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Map each locked acceptance criterion to passing executed evidence. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-11": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Obtain complete targeted and integrated test results, including unavailable environments. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-12": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "Other Sage team",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Verify each confirmed defect is assigned in Jira and linked to its parent story; local files alone do not satisfy this. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-13": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-6.md; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/batch-8.md; docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: All nine recorded fixes are deployed and validated: narrow pricing, glossary wrapping, negative values, font loading, certificate names, clear confirmation, workflow gating, storage failure feedback and branded 404 handling.",
    "interpretation": ""
  },
  "release-14": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: The maintained automated suite now covers the added certificate, validation, persistence and interaction requirements. All 61 tests passed on 23 Sep 2026.",
    "interpretation": ""
  },
  "release-15": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "Installed Edge 152.0.4191.66; browser connector unavailable. No actual Edge run or latest-version verification claimed.",
    "interpretation": ""
  },
  "release-16": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "Installed Chrome 150.0.7871.125; browser connector unavailable. PageSpeed remote Chromium is not Chrome/Windows 11 compatibility evidence.",
    "interpretation": ""
  },
  "release-17": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "Firefox unavailable; not installed as instructed. QA must use the specified latest Firefox on Windows 11.",
    "interpretation": ""
  },
  "release-18": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "Safari/macOS environment unavailable. QA must test on the actual supported environment.",
    "interpretation": ""
  },
  "release-19": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "Galaxy Tab A9+ unavailable; CSS frame testing does not substitute for physical-device coverage.",
    "interpretation": ""
  },
  "release-20": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "iPad 10th generation / Mini 2021 unavailable; requires specified devices and current iOS.",
    "interpretation": ""
  },
  "release-21": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "Specified iPhone 17 / Mini unavailable. Preserve PDF device wording; Sage should clarify which Mini model.",
    "interpretation": ""
  },
  "release-22": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-7.md",
    "comments": "Samsung S25 unavailable; latest Android and physical rotation remain QA checks.",
    "interpretation": ""
  },
  "release-23": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: All 63 pages were rendered at 1920×1080, satisfying the 1680px-or-wider check; no root horizontal overflow was found.",
    "interpretation": ""
  },
  "release-24": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/glossary-1080-overflow.png; docs/qa/evidence/row-audit/matrix.json",
    "comments": "23 Sep 2026: fixed the page 60 grid breakpoint, minimum widths and text wrapping. The affected glossary page and local production build were rechecked successfully at desktop width.",
    "interpretation": ""
  },
  "release-25": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/batch-7.md; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: All 63 pages were rendered at 767px and 768px. Internal intentional scrolling was distinguished from root overflow, and the repaired populated states were rechecked.",
    "interpretation": ""
  },
  "release-26": {
    "applies": "Relevant",
    "status": "Passed",
    "owner": "Victor / Playbook",
    "evidence": "docs/qa/evidence/row-audit/pricing-320-overlap.png; docs/qa/evidence/row-audit/matrix.json; docs/qa/evidence/row-audit/2026-09-23-self-checks.md",
    "comments": "23 Sep 2026: All 63 pages were rendered below 767px and the repaired populated pricing page was rechecked at exactly 320px. The fields and controls now stack without the recorded overlap.",
    "interpretation": ""
  },
  "release-27": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: QA reviews severity/waivers in the formal defect register and confirms no Blocker/Critical remains. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-28": {
    "applies": "Needs clarification",
    "status": "Needs Sage or QA",
    "owner": "CMS",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Obtain regression completion for agreed Sitecore, third parties, Tealium, market-site and ecommerce scope; explicitly approve exclusions. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  },
  "release-29": {
    "applies": "Relevant",
    "status": "Needs Sage or QA",
    "owner": "QA",
    "evidence": "docs/qa/evidence/row-audit/batch-9.md; docs/qa/evidence/row-audit/checklist-runbook.md",
    "comments": "10 Sep 2026: Obtain dated formal VQA approval for the release revision. Current local reports and git merge history do not establish this formal criterion.",
    "interpretation": ""
  }
};
      const previousSeedAssessments = {"manual-01":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"tests/front-end-foundations.test.mjs; docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/evidence/batch-3/2026-09-09-batch-3-structure-and-visual-foundations.md","comments":"Automated layout safeguards passed and sampled widths had no horizontal overflow, but this has not been checked across every page.","interpretation":"Only show scrolling where content requires it. No unintended horizontal scrollbar or trapped internal scrolling."},"manual-02":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"docs/design-consistency-audit.md; tests/front-end-foundations.test.mjs","comments":"Shared spacing improvements are documented, but there is no complete visual spacing audit.","interpretation":"Labels, fields, rows and error messages have consistent spacing and do not overlap or appear cramped."},"manual-03":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"docs/design-consistency-audit.md","comments":"Some alignment improvements are documented. All pages and states still need a visual check.","interpretation":"Text follows the intended page grid and component alignment. Deliberate exceptions are visually consistent."},"manual-04":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"docs/qa/orbit-theme-accessibility-qa.md; docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/evidence/batch-3/2026-09-09-batch-3-structure-and-visual-foundations.md","comments":"Mobile navigation and responsive foundations passed. Prior samples cover 320px, 390px, 768px, 1280px and 1440px, but the full required width and page matrix remains incomplete.","interpretation":"At every required width, content remains readable and usable with no clipping or unintended horizontal overflow."},"manual-05":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"tests/front-end-foundations.test.mjs; src/styles/fonts.css; src/styles/theme.css; docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md","comments":"The code defines a deliberate type hierarchy, but the four intended Sage font files returned 404 in production. Visual consistency still needs checking after the font issue is resolved.","interpretation":"The playbook uses a deliberate type system. Headings, body text, labels and supporting text each use consistent assigned font families, sizes and weights. They do not all need to be identical."},"manual-06":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Business owner","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/security/internal-security-review-2026-08-12.md","comments":"There is no server-side form handling. Activities save locally and empty inputs are intentionally allowed. Expected validation needs agreement.","interpretation":"Client-side validation should match agreed required fields. Server-side validation is not applicable unless the hosting or integration design introduces form submission."},"manual-07":{"applies":"Relevant","status":"Failed","owner":"Victor / Playbook","evidence":"docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md; docs/qa/evidence/batch-5/2026-09-09-batch-5-production-readiness.md","comments":"All 25 bundled application assets returned 200, but four Sage font URLs returned 404. Batch 5 also confirmed missing robots.txt and favicon resources. One external-image CSP risk needs a targeted page check.","interpretation":"All rendered links and resources load successfully, with no missing images, stylesheet failures or script errors."},"manual-08":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Business owner","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"No fields are formally defined as mandatory. Required fields and validation rules need agreement first.","interpretation":"Every field agreed as mandatory rejects invalid or empty input and provides a clear error message."},"manual-09":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"tests/page-content-models.test.mjs; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md","comments":"Accented and script-like certificate text rendered safely, but the full character set has not been checked across all relevant inputs. Page Editor is outside the standalone application.","interpretation":"Accented characters render and persist without corruption in all relevant content and input fields."},"manual-10":{"applies":"Relevant","status":"Passed","owner":"Victor / Playbook","evidence":"docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md","comments":"A blank optional activity remained valid and appeared as Not completed in the summary without a required-field error.","interpretation":"Fields defined as optional can be left empty without showing a required-field error."},"manual-11":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"src/app","comments":"The application has no date fields or date calculations.","interpretation":"Only applicable if the experience introduces date entry or date calculations."},"manual-12":{"applies":"Relevant","status":"Already evidenced","owner":"Victor / Playbook","evidence":"tests/page-content-models.test.mjs","comments":"Negative and excessive workflow scores are tested and clamped to the permitted 1 to 5 range. Other fields are text.","interpretation":"Numeric controls reject or safely constrain values outside their agreed range."},"manual-13":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"tests/certificate-markup.test.mjs; docs/security/internal-security-review-2026-08-12.md","comments":"Long certificate names are tested, but maximum length and truncation have not been assessed for every input.","interpretation":"Long input remains usable, is stored safely and is not silently truncated in the interface or output."},"manual-14":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"docs/security/internal-security-review-2026-08-12.md","comments":"The app has no server-side create, update or delete operations. Answers auto-save locally.","interpretation":"Only applicable to explicit update or delete actions that need user confirmation."},"manual-15":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"docs/security/internal-security-review-2026-08-12.md; tests/certificate-markup.test.mjs; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md","comments":"A script-like certificate value remained literal text in the preview and summary. Every application input has not yet been covered.","interpretation":"Common punctuation, accented characters and HTML-like text are accepted or safely rejected without corruption or code execution."},"manual-16":{"applies":"Relevant","status":"Passed","owner":"Victor / Playbook","evidence":"tests/page-content-models.test.mjs; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md","comments":"Glossary matching, no-results and clear states passed. Flashcard reveal, learned-state and progression controls also passed.","interpretation":"Sorting and filters return accurate results, update predictably and can be cleared."},"manual-17":{"applies":"Relevant","status":"Passed","owner":"Victor / Playbook","evidence":"docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md","comments":"A representative production journey covering reload, navigation and an activity produced zero console logs, warnings or errors. This is representative coverage, not a full 63-page crawl.","interpretation":"Normal journeys complete without errors in the browser console."},"manual-18":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"tests/front-end-foundations.test.mjs; tests/playbook-journey-state.test.mjs; docs/activity-functionality-review.md; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md; docs/qa/evidence/batch-3/2026-09-09-batch-3-structure-and-visual-foundations.md","comments":"Representative controls and structural navigation tests passed. Every enabled, disabled and hidden state across all 63 pages has not been manually checked.","interpretation":"Every visible button performs the intended action and disabled or hidden states occur only under the agreed conditions."},"manual-19":{"applies":"Relevant","status":"Failed","owner":"Victor / Playbook","evidence":"docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md; docs/qa/evidence/batch-5/2026-09-09-batch-5-production-readiness.md","comments":"Batch 5 reconfirmed that invalid deep paths return the hosting provider's generic 404 rather than a custom application error page.","interpretation":"Invalid application routes show the agreed error experience or a documented acceptable hosting response."},"manual-20":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"docs/security/internal-security-review-2026-08-12.md","comments":"The application has no document-upload feature or uploaded-document links.","interpretation":""},"manual-21":{"applies":"Relevant","status":"Already evidenced","owner":"Victor / Playbook","evidence":"docs/activity-functionality-review.md; tests/certificate-markup.test.mjs; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md","comments":"The certificate preview updated correctly and automated print/download tests pass. The operating-system print/save dialogue still needs a final manual confirmation.","interpretation":"The available certificate output opens and can be printed or saved through the browser."},"manual-22":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"docs/security/internal-security-review-2026-08-12.md","comments":"No email integration or submission endpoint exists.","interpretation":""},"manual-23":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Business owner","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"Blank activities are currently permitted by design. Sage must decide whether any response is required before this can be tested.","interpretation":"At least one response is required only if the agreed business requirements define the activity as mandatory."},"manual-24":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"src/app","comments":"No external page-link interactions were found in the current application interface.","interpretation":""},"manual-25":{"applies":"Not relevant","status":"Not applicable","owner":"CMS","evidence":"docs/security/internal-security-review-2026-08-12.md","comments":"Sitecore component creation, editing, deletion and publishing are CMS integration checks rather than standalone application behaviour.","interpretation":""},"manual-26":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"docs/security/internal-security-review-2026-08-12.md","comments":"The application has no backend data retrieval, Search feed or News feed.","interpretation":""},"manual-27":{"applies":"Relevant","status":"Passed","owner":"Victor / Playbook","evidence":"src/app/components/content/GlossaryExperience.tsx; tests/page-content-models.test.mjs; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md","comments":"Glossary search returned the expected single match, showed a clear no-results message and restored results when cleared.","interpretation":"Search returns the expected matching playbook content and empty or cleared searches behave predictably."},"manual-28":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/orbit-theme-accessibility-qa.md","comments":"Several desktop and mobile widths passed without horizontal overflow. Rotation and the full resolution matrix remain untested.","interpretation":"Required portrait, landscape and viewport sizes remain readable and operable without clipping or overlap."},"manual-29":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/orbit-theme-accessibility-qa.md","comments":"Chromium on Windows was tested. Separate Edge, Firefox, Safari, iPhone and Android coverage remains incomplete.","interpretation":"The supported browser and device matrix renders and behaves consistently. Missing browsers or physical devices are recorded for manual testing."},"manual-30":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Business owner","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"Most activities intentionally have no error messages. Expected required and error states must be defined first.","interpretation":""},"manual-31":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"docs/security/internal-security-review-2026-08-12.md","comments":"There are no submitted forms or submission endpoints to repeatedly trigger.","interpretation":""},"manual-32":{"applies":"Relevant","status":"Passed","owner":"Victor / Playbook","evidence":"tests/page-content-models.test.mjs; tests/activity-summary-journey.test.mjs; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md","comments":"A selected activity answer and a certificate name persisted and appeared correctly in the activity summary. Edit and Cancel controls behaved correctly.","interpretation":"Different valid inputs produce the expected saved state, summary or output without stale data."},"manual-33":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"docs/security/internal-security-review-2026-08-12.md","comments":"The static application has no server filesystem. Browser localStorage quota exhaustion is a separate local scenario.","interpretation":""},"manual-34":{"applies":"Not relevant","status":"Not applicable","owner":"Victor / Playbook","evidence":"docs/security/internal-security-review-2026-08-12.md","comments":"The application does not submit forms to a server.","interpretation":""},"manual-35":{"applies":"Relevant","status":"Passed","owner":"Victor / Playbook","evidence":"docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md; docs/qa/evidence/batch-5/2026-09-09-batch-5-production-readiness.md","comments":"A random invalid deep path safely returned 404 again. This passes the destructive invalid-URL check, although manual-19 still fails because the page is generic.","interpretation":""},"manual-36":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Business owner","evidence":"docs/security/internal-security-review-2026-08-12.md; tests/certificate-markup.test.mjs","comments":"Altered and script-like strings remain safe literal text, but the application intentionally gives no validation message. Desired messaging needs definition.","interpretation":""},"manual-37":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md; docs/qa/evidence/batch-5/2026-09-09-batch-5-production-readiness.md","comments":"The production build passed again. Its main JavaScript bundle is about 802 kB before compression and triggered the existing size warning. A Google PageSpeed run is still required.","interpretation":"Record mobile and desktop PageSpeed results and review any agreed performance threshold or major warning."},"manual-38":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/orbit-theme-accessibility-qa.md; tests/accessibility-browser-qa.test.mjs; docs/qa/evidence/batch-4/2026-09-09-batch-4-accessibility.md","comments":"All four accessibility regression checks passed, but no Lighthouse Accessibility result or complete manual keyboard and screen-reader review is recorded.","interpretation":"Run Lighthouse and record the score, findings and any manual accessibility limitations."},"release-01":{"applies":"Relevant","status":"Needs Sage or QA","owner":"Business owner","evidence":"docs/design-consistency-audit.md; docs/qa/wave-1/","comments":"Design work is documented, but no formal design sign-off is recorded.","interpretation":""},"release-02":{"applies":"Relevant","status":"Needs Sage or QA","owner":"Business owner","evidence":"docs/page-audit.md; docs/activity-functionality-review.md","comments":"No locked functional requirements or acceptance-criteria document was found.","interpretation":""},"release-03":{"applies":"Relevant","status":"Not assessed","owner":"Other Sage team","evidence":"Git history; docs/technical-architecture/ai-playbook-technical-architecture.md; docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md","comments":"The current code builds successfully, but completion and peer review for every user story are not proven.","interpretation":""},"release-04":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"CMS","evidence":"docs/technical-architecture/ai-playbook-technical-architecture.md","comments":"The current application is statically hosted on Vercel. A Sage.com integration test environment is not documented.","interpretation":""},"release-05":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"tests/*.test.mjs; docs/qa/qa-testing-tracker.html","comments":"Automated cases and this checklist exist, but the complete agreed release scope has not yet been approved as executable test cases.","interpretation":""},"release-06":{"applies":"Relevant","status":"Needs Sage or QA","owner":"QA","evidence":"tests/*.test.mjs; docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md; docs/qa/evidence/batch-3/2026-09-09-batch-3-structure-and-visual-foundations.md; docs/qa/evidence/batch-4/2026-09-09-batch-4-accessibility.md","comments":"The relevant automated suites pass, but there is no VQA completion or sign-off evidence.","interpretation":""},"release-07":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Business owner","evidence":"","comments":"Only applicable where requirements changed. This needs acceptance-criteria and Jira process evidence.","interpretation":""},"release-08":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Business owner","evidence":"","comments":"Only applicable if new requirements were raised. Jira must confirm whether separate user stories were created.","interpretation":""},"release-09":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Business owner","evidence":"docs/design-consistency-audit.md; docs/qa/wave-1/","comments":"Visual evidence exists locally, but Jira recording and formal design approval are unverified.","interpretation":""},"release-10":{"applies":"Relevant","status":"Needs Sage or QA","owner":"Business owner","evidence":"","comments":"Acceptance criteria must first be agreed and then formally verified.","interpretation":""},"release-11":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"tests/*.test.mjs; docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/security/internal-security-review-2026-08-12.md","comments":"Substantial technical testing exists, but the full agreed and Sage.com integration scope is incomplete.","interpretation":""},"release-12":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"Other Sage team","evidence":"docs/activity-functionality-review.md; docs/security/internal-security-review-2026-08-12.md","comments":"Findings are documented locally, but formal Jira defects, assignment and parent-story links are not evidenced.","interpretation":""},"release-13":{"applies":"Needs clarification","status":"Not assessed","owner":"QA","evidence":"docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md; docs/qa/evidence/batch-5/2026-09-09-batch-5-production-readiness.md","comments":"Production security headers were verified, but recorded defects and readiness gaps are still open. The wider defect list has not been formally validated as resolved.","interpretation":""},"release-14":{"applies":"Relevant","status":"Passed","owner":"Victor / Playbook","evidence":"tests/*.test.mjs; package.json; docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md; docs/qa/evidence/batch-2/2026-09-09-batch-2-core-functional-journey.md; docs/qa/evidence/batch-3/2026-09-09-batch-3-structure-and-visual-foundations.md; docs/qa/evidence/batch-4/2026-09-09-batch-4-accessibility.md; docs/qa/evidence/batch-5/2026-09-09-batch-5-production-readiness.md","comments":"The automated suite remains maintained and the grouped Batch 2 to 5 reruns all passed.","interpretation":""},"release-15":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"Chromium testing is not explicit latest Edge testing on Windows 11.","interpretation":""},"release-16":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"The report explicitly says Chrome desktop was not separately tested.","interpretation":""},"release-17":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/orbit-theme-accessibility-qa.md","comments":"Firefox is explicitly recorded as untested.","interpretation":""},"release-18":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/orbit-theme-accessibility-qa.md","comments":"Safari on macOS is explicitly recorded as untested.","interpretation":""},"release-19":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"No Samsung Galaxy Tab A9+ physical-device evidence exists.","interpretation":""},"release-20":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"No iPad 10th generation or iPad Mini 2021 evidence exists.","interpretation":""},"release-21":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"No specified iPhone physical-device evidence exists.","interpretation":""},"release-22":{"applies":"Relevant","status":"Not assessed","owner":"QA","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md","comments":"No Samsung S25 physical-device evidence exists.","interpretation":""},"release-23":{"applies":"Relevant","status":"Not assessed","owner":"Victor / Playbook","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/orbit-theme-accessibility-qa.md","comments":"Existing checks reached 1440px and 1280px, not 1680px or wider.","interpretation":""},"release-24":{"applies":"Relevant","status":"Already evidenced","owner":"Victor / Playbook","evidence":"docs/qa/orbit-theme-accessibility-qa.md; docs/design-consistency-audit.md","comments":"Checks at 1280px and 1440px satisfy the 1080px or wider range.","interpretation":""},"release-25":{"applies":"Relevant","status":"Already evidenced","owner":"Victor / Playbook","evidence":"docs/qa/orbit-theme-accessibility-qa.md","comments":"A 768px reflow check satisfies the 767px or wider range.","interpretation":""},"release-26":{"applies":"Relevant","status":"Already evidenced","owner":"Victor / Playbook","evidence":"docs/accessibility/2026-08-12-accessibility-browser-qa.md; docs/qa/orbit-theme-accessibility-qa.md","comments":"Checks at 390px and 320px cover below 767px with no horizontal overflow recorded.","interpretation":""},"release-27":{"applies":"Relevant","status":"Needs Sage or QA","owner":"QA","evidence":"docs/security/internal-security-review-2026-08-12.md; docs/qa/evidence/batch-1/2026-09-09-batch-1-technical-checks.md; docs/qa/evidence/batch-5/2026-09-09-batch-5-production-readiness.md","comments":"The dependency audit found zero vulnerabilities and the security suites passed. Sage or QA still needs to confirm the formal defect register contains no Blocker or Critical bugs.","interpretation":""},"release-28":{"applies":"Needs clarification","status":"Needs Sage or QA","owner":"CMS","evidence":"tests/*.test.mjs; docs/technical-architecture/ai-playbook-technical-architecture.md","comments":"Application regression exists. Sitecore, third-party, Tealium, market-site and ecommerce coverage needs Sage scoping.","interpretation":""},"release-29":{"applies":"Relevant","status":"Needs Sage or QA","owner":"QA","evidence":"","comments":"Only Sage's VQA process can provide this sign-off.","interpretation":""}};

      let assessments = {};
      try {
        assessments = JSON.parse(localStorage.getItem('ai-playbook-qa-tracker') || '{}');
      } catch {
        assessments = {};
      }

      try {
        const revision = 'self-checks-2026-09-23-v2';
        if (localStorage.getItem('ai-playbook-qa-audit-revision') !== revision) {
          localStorage.setItem('ai-playbook-qa-before-row-audit', JSON.stringify(assessments));
          const refreshedIds = new Set(['manual-01', 'manual-03', 'manual-04', 'manual-05', 'manual-06', 'manual-07', 'manual-08', 'manual-12', 'manual-13', 'manual-14', 'manual-16', 'manual-17', 'manual-18', 'manual-19', 'manual-21', 'manual-26', 'manual-27', 'manual-28', 'manual-30', 'manual-32', 'manual-33', 'release-13', 'release-14', 'release-23', 'release-24', 'release-25', 'release-26']);
          for (const [id, fields] of Object.entries(assessments)) {
            if (refreshedIds.has(id)) {
              delete fields.status;
              delete fields.owner;
              delete fields.comments;
            }
            for (const [field, value] of Object.entries(fields)) {
              if (value === previousSeedAssessments[id]?.[field]) delete fields[field];
            }
          }
          localStorage.setItem('ai-playbook-qa-tracker', JSON.stringify(assessments));
          localStorage.setItem('ai-playbook-qa-audit-revision', revision);
        }
      } catch { /* Retain in-memory assessment if browser storage is unavailable. */ }

      function getAssessment(id) {
        return { ...assessmentDefaults, ...(seedAssessments[id] || {}), ...(assessments[id] || {}) };
      }

      function saveAssessment(id, field, value) {
        assessments[id] = { ...(assessments[id] || {}), [field]: value };
        if (value === (seedAssessments[id]?.[field] ?? assessmentDefaults[field])) delete assessments[id][field];
        const indicator = document.getElementById('saved-indicator');
        try {
          localStorage.setItem('ai-playbook-qa-tracker', JSON.stringify(assessments));
          indicator.textContent = `Saved locally on this device at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } catch {
          indicator.textContent = 'This change could not be saved locally. Download a JSON backup before closing.';
        }
        updateSummary();
        renderOutstandingActions();
      }

      const appliesOptions = ['To review', 'Relevant', 'Not relevant', 'Needs clarification'];
      const statusOptions = ['Not assessed', 'Already evidenced', 'Passed', 'Failed', 'Blocked', 'Needs Sage or QA', 'Not applicable'];
      const ownerOptions = ['Unassigned', 'Victor / Playbook', 'CMS', 'QA', 'Business owner', 'Other Sage team'];

      function makeSelect(id, field, value, options, label) {
        const select = document.createElement('select');
        select.className = 'row-control';
        select.setAttribute('aria-label', label);
        options.forEach((optionText) => {
          const option = document.createElement('option');
          option.textContent = optionText;
          option.selected = optionText === value;
          select.appendChild(option);
        });
        select.addEventListener('change', () => saveAssessment(id, field, select.value));
        return select;
      }

      function makeTextInput(id, field, value, label, multiline = false) {
        const input = document.createElement(multiline ? 'textarea' : 'input');
        input.className = 'row-control';
        input.value = value;
        input.placeholder = field === 'evidence'
          ? 'Link, file path or description'
          : field === 'interpretation'
            ? 'Define what passing means here'
            : 'Add testing notes';
        input.setAttribute('aria-label', label);
        input.addEventListener('input', () => saveAssessment(id, field, input.value));
        return input;
      }

      function addCell(row, content, className = '') {
        const cell = document.createElement('td');
        if (className) cell.className = className;
        if (content instanceof Node) cell.appendChild(content);
        else cell.textContent = content === 0 ? '0' : (content || 'N/A');
        row.appendChild(cell);
      }

      function statusRowClass(status) {
        if (status === 'Failed') return 'failed';
        if (['Passed', 'Already evidenced'].includes(status)) return 'passed';
        if (status === 'Needs Sage or QA') return 'status-needs-sage';
        if (status === 'Not applicable') return 'status-not-applicable';
        return '';
      }

      function makeStatusBadge(status) {
        const badge = document.createElement('span');
        badge.className = `status-pill ${status === 'Passed' || status === 'Already evidenced' ? 'status-passed' : status === 'Failed' ? 'status-failed' : status === 'Needs Sage or QA' ? 'status-needs-sage-badge' : status === 'Not applicable' ? 'status-not-applicable-badge' : 'status-neutral'}`;
        badge.textContent = status;
        return badge;
      }

      function renderManualChecks() {
        const body = document.getElementById('manual-checks-body');
        const query = document.getElementById('manual-search').value.trim().toLowerCase();
        const priorityFilter = document.getElementById('manual-priority-filter').value;
        const statusFilter = document.getElementById('manual-status-filter').value;
        const ownerFilter = document.getElementById('manual-owner-filter').value;
        const sortMode = document.getElementById('manual-sort').value;
        body.replaceChildren();

        const priorityRank = { High: 3, Medium: 2, Low: 1 };
        const filtered = manualChecks.filter((check) => {
          const assessment = getAssessment(check.id);
          const haystack = [check.id, check.priority, check.type, check.summary, check.tools, check.standards, check.sourceNotes, assessment.interpretation, assessment.evidence, assessment.comments].join(' ').toLowerCase();
          return (!query || haystack.includes(query))
            && (priorityFilter === 'All priorities' || check.priority === priorityFilter)
            && (statusFilter === 'All statuses' || assessment.status === statusFilter)
            && (ownerFilter === 'All owners' || assessment.owner === ownerFilter);
        }).sort((left, right) => {
          if (sortMode === 'priority-desc') return priorityRank[right.priority] - priorityRank[left.priority];
          if (sortMode === 'priority-asc') return priorityRank[left.priority] - priorityRank[right.priority];
          return manualChecks.indexOf(left) - manualChecks.indexOf(right);
        });

        filtered.forEach((check) => {
          const assessment = getAssessment(check.id);
          const row = document.createElement('tr');
          row.className = statusRowClass(assessment.status);
          const priority = document.createElement('span');
          priority.className = `priority priority-${check.priority.toLowerCase()}`;
          priority.textContent = check.priority;
          addCell(row, priority);
          addCell(row, check.type);
          addCell(row, `${check.id}: ${check.summary}`, 'summary-text');
          addCell(row, makeStatusBadge(assessment.status));
          addCell(row, makeSelect(check.id, 'status', assessment.status, statusOptions, `Status for ${check.summary}`));
          addCell(row, makeSelect(check.id, 'applies', assessment.applies, appliesOptions, `Applicability for ${check.summary}`));
          addCell(row, makeSelect(check.id, 'owner', assessment.owner, ownerOptions, `Owner for ${check.summary}`));
          addCell(row, check.tools, 'source-detail');
          addCell(row, check.standards, 'source-detail');
          addCell(row, check.sourceNotes, 'source-detail');
          addCell(row, makeTextInput(check.id, 'interpretation', assessment.interpretation, `Interpretation for ${check.summary}`, true));
          addCell(row, makeTextInput(check.id, 'evidence', assessment.evidence, `Evidence for ${check.summary}`));
          addCell(row, makeTextInput(check.id, 'comments', assessment.comments, `Comments for ${check.summary}`, true));
          body.appendChild(row);
        });

        if (!filtered.length) body.appendChild(makeNoResultsRow(13));
      }

      function renderReleaseChecks() {
        const body = document.getElementById('release-checks-body');
        const query = document.getElementById('release-search').value.trim().toLowerCase();
        const stageFilter = document.getElementById('release-stage-filter').value;
        const statusFilter = document.getElementById('release-status-filter').value;
        const ownerFilter = document.getElementById('release-owner-filter').value;
        body.replaceChildren();

        const filtered = releaseChecks.filter((check) => {
          const assessment = getAssessment(check.id);
          const haystack = `${check.id} ${check.stage} ${check.summary} ${assessment.interpretation} ${assessment.evidence} ${assessment.comments}`.toLowerCase();
          return (!query || haystack.includes(query))
            && (stageFilter === 'All stages' || check.stage === stageFilter)
            && (statusFilter === 'All statuses' || assessment.status === statusFilter)
            && (ownerFilter === 'All owners' || assessment.owner === ownerFilter);
        });

        filtered.forEach((check) => {
          const assessment = getAssessment(check.id);
          const row = document.createElement('tr');
          row.className = statusRowClass(assessment.status);
          const stage = document.createElement('span');
          stage.className = 'stage-label';
          stage.textContent = check.stage;
          addCell(row, stage);
          addCell(row, `${check.id}: ${check.summary}`, 'summary-text');
          addCell(row, makeStatusBadge(assessment.status));
          addCell(row, makeSelect(check.id, 'status', assessment.status, statusOptions, `Status for ${check.summary}`));
          addCell(row, makeSelect(check.id, 'applies', assessment.applies, appliesOptions, `Applicability for ${check.summary}`));
          addCell(row, makeSelect(check.id, 'owner', assessment.owner, ownerOptions, `Owner for ${check.summary}`));
          addCell(row, makeTextInput(check.id, 'interpretation', assessment.interpretation, `Interpretation for ${check.summary}`, true));
          addCell(row, makeTextInput(check.id, 'evidence', assessment.evidence, `Evidence for ${check.summary}`));
          addCell(row, makeTextInput(check.id, 'comments', assessment.comments, `Comments for ${check.summary}`, true));
          body.appendChild(row);
        });

        if (!filtered.length) body.appendChild(makeNoResultsRow(9));
      }

      function makeNoResultsRow(colspan) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.className = 'empty-cell';
        cell.colSpan = colspan;
        cell.textContent = 'No checks match the current filters.';
        row.appendChild(cell);
        return row;
      }

      function renderOutstandingActions() {
        const body = document.getElementById('outstanding-actions-body');
        const query = document.getElementById('actions-search').value.trim().toLowerCase();
        const ownerFilter = document.getElementById('actions-owner-filter').value;
        const actionStatuses = ['Failed', 'Blocked', 'Needs Sage or QA', 'Not assessed'];
        const allChecks = [
          ...manualChecks.map((check) => ({ ...check, source: 'Manual Testing' })),
          ...releaseChecks.map((check) => ({ ...check, source: 'QA Release Checklist' }))
        ];
        const actions = allChecks.filter((check) => {
          const assessment = getAssessment(check.id);
          const haystack = `${check.summary} ${check.source} ${assessment.owner} ${assessment.status} ${assessment.evidence} ${assessment.comments}`.toLowerCase();
          return actionStatuses.includes(assessment.status)
            && (!query || haystack.includes(query))
            && (ownerFilter === 'All owners' || assessment.owner === ownerFilter);
        });
        body.replaceChildren();

        if (!actions.length) {
          const row = document.createElement('tr');
          const cell = document.createElement('td');
          cell.className = 'empty-cell';
          cell.colSpan = 7;
          const wrapper = document.createElement('div');
          wrapper.className = 'empty-state';
          wrapper.innerHTML = '<div class="empty-icon" aria-hidden="true">0</div><strong>No outstanding actions</strong><p>Failed, blocked and Sage or QA items will appear here automatically.</p>';
          cell.appendChild(wrapper);
          row.appendChild(cell);
          body.appendChild(row);
          return;
        }

        actions.forEach((check) => {
          const assessment = getAssessment(check.id);
          const row = document.createElement('tr');
          row.className = statusRowClass(assessment.status);
          addCell(row, `${check.id}: ${check.summary}`, 'summary-text');
          addCell(row, check.source);
          addCell(row, check.priority || check.stage);
          addCell(row, assessment.owner);
          addCell(row, assessment.status);
          addCell(row, assessment.evidence || 'Evidence not added');
          addCell(row, assessment.comments || 'No comments added');
          body.appendChild(row);
        });
      }


      function evidenceLinks(value) {
        const links = document.createElement('div'); links.className = 'evidence-links';
        String(value || '').split(';').map(v => v.trim()).filter(Boolean).forEach(path => {
          if (!path.startsWith('docs/qa/evidence/') && !/^https?:\/\//.test(path)) return;
          const a = document.createElement('a');
          a.href = path.startsWith('docs/qa/') ? path.slice('docs/qa/'.length) : path;
          a.textContent = path.split('/').pop(); a.target = '_blank'; a.rel = 'noopener'; links.appendChild(a);
        }); return links;
      }
      function renderChecklistSplit() {
        const body = document.getElementById('checklist-split-rows'); if (!body) return;
        body.replaceChildren();
        [['Manual Testing', manualChecks], ['QA Release Checklist', releaseChecks]].forEach(([label, checks]) => {
          const counts = { Passed: 0, Failed: 0, 'Needs Sage or QA': 0, 'Not applicable': 0 };
          checks.forEach(check => { const status = getAssessment(check.id).status; if (counts[status] !== undefined) counts[status]++; });
          const row = document.createElement('tr');
          addCell(row, label); addCell(row, checks.length); addCell(row, counts.Passed, 'passed'); addCell(row, counts.Failed, 'failed');
          addCell(row, counts['Needs Sage or QA'], 'status-needs-sage'); addCell(row, counts['Not applicable'], 'status-not-applicable');
          addCell(row, counts.Passed + counts.Failed); body.appendChild(row);
        });
      }
      function renderReview() {
        const tbody = document.getElementById('review-rows'); if (!tbody) return;
        const query = document.getElementById('review-search').value.trim().toLowerCase();
        const filter = document.getElementById('review-status').value;
        tbody.replaceChildren();
        const checks = [...manualChecks, ...releaseChecks].filter(check => {
          const a = getAssessment(check.id);
          return (filter === 'All statuses' || filter === a.status) && (!query || [check.id, check.summary, a.owner, a.status, a.comments, a.interpretation].join(' ').toLowerCase().includes(query));
        });
        checks.forEach(check => {
          const a=getAssessment(check.id); const tr=document.createElement('tr');
          tr.className = statusRowClass(a.status);
          addCell(tr,check.id);addCell(tr,manualChecks.includes(check) ? 'Manual Testing' : 'QA Release Checklist');addCell(tr,check.summary);addCell(tr,a.status,'review-status');addCell(tr,a.owner);
          const cell=document.createElement('td');cell.textContent=a.comments||'Evidence and next action not yet recorded.';cell.appendChild(evidenceLinks(a.evidence));tr.appendChild(cell);tbody.appendChild(tr);
        });
        document.getElementById('review-count').textContent = checks.length + ' of 67 rows shown';
      }

      function updateSummary() {
        const ids = [...manualChecks, ...releaseChecks].map((check) => check.id);
        const values = ids.map((id) => getAssessment(id).status);
        const cards = document.querySelectorAll('.summary-card strong');
        cards[0].textContent = String(ids.length);
        cards[1].textContent = String(values.filter((status) => ['Already evidenced', 'Passed'].includes(status)).length);
        cards[2].textContent = String(values.filter((status) => status === 'Failed').length);
        cards[3].textContent = String(values.filter((status) => status === 'Needs Sage or QA').length);
        const completedCount = values.filter((status) => ['Already evidenced', 'Passed'].includes(status)).length;
        const failedCount = values.filter((status) => status === 'Failed').length;
        const checkedCount = completedCount + failedCount;
        document.getElementById('current-assessment-counts').textContent = `${checkedCount} of ${ids.length} checked · ${completedCount} completed with evidence · ${failedCount} failed · ${values.filter(s => s === 'Needs Sage or QA').length} need Sage or QA · ${values.filter(s => s === 'Not applicable').length} not applicable`;
        renderChecklistSplit();
        renderReview();
        document.getElementById('summary-indicator').textContent = checkedCount
          ? `${checkedCount} of ${ids.length} checked · ${completedCount} completed · ${failedCount} failed`
          : `0 of ${ids.length} checked`;
      }

      function markdownCell(value) {
        return String(value || '').replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
      }

      function makeMarkdownTable(headers, rows) {
        return [
          `| ${headers.join(' | ')} |`,
          `| ${headers.map(() => '---').join(' | ')} |`,
          ...rows.map((row) => `| ${row.map(markdownCell).join(' | ')} |`)
        ].join('\n');
      }

      function downloadMarkdown() {
        const allStatuses = [...manualChecks, ...releaseChecks].map((check) => getAssessment(check.id).status);
        const lines = [
          '# AI Playbook Review Tracker',
          '',
          `Exported: ${new Date().toLocaleString()}`,
          '',
          `- Total checks: ${manualChecks.length + releaseChecks.length}`,
          `- Completed with evidence: ${allStatuses.filter((status) => ['Already evidenced', 'Passed'].includes(status)).length}`,
          `- Failed: ${allStatuses.filter((status) => status === 'Failed').length}`,
          `- Needs Sage or QA: ${allStatuses.filter((status) => status === 'Needs Sage or QA').length}`,
          '',
          'Checked counts include completed-with-evidence and failed rows only. Partial, Needs Sage or QA and Not applicable are not completed. Multiple rows can refer to one defect.',
          '',
          '## Manual Testing',
          '',
          makeMarkdownTable(
            ['ID', 'Priority', 'Test type', 'Summary', 'Tools or add-ons', 'Standards', 'Checklist notes', 'Interpretation / pass condition', 'Applies?', 'Status', 'Owner', 'Evidence', 'Tester comments'],
            manualChecks.map((check) => {
              const assessment = getAssessment(check.id);
              return [check.id, check.priority, check.type, check.summary, check.tools, check.standards, check.sourceNotes, assessment.interpretation, assessment.applies, assessment.status, assessment.owner, assessment.evidence, assessment.comments];
            })
          ),
          '',
          '## QA Release Checklist',
          '',
          makeMarkdownTable(
            ['ID', 'Stage', 'Criterion', 'Interpretation / pass condition', 'Applies?', 'Status', 'Owner', 'Evidence', 'Tester comments'],
            releaseChecks.map((check) => {
              const assessment = getAssessment(check.id);
              return [check.id, check.stage, check.summary, assessment.interpretation, assessment.applies, assessment.status, assessment.owner, assessment.evidence, assessment.comments];
            })
          )
        ];

        const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        const today = new Date();
        const date = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
        anchor.href = url;
        anchor.download = `ai-playbook-qa-tracker-${date}.md`;
        anchor.click();
        URL.revokeObjectURL(url);
      }

      function downloadJsonBackup() {
        const currentRows = {};
        [...manualChecks, ...releaseChecks].forEach((check) => {
          currentRows[check.id] = getAssessment(check.id);
        });
        const payload = {
          format: 'ai-playbook-qa-tracker',
          version: 1,
          exportedAt: new Date().toISOString(),
          assessments: currentRows
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        const date = new Date().toISOString().slice(0, 10);
        anchor.href = url;
        anchor.download = `ai-playbook-qa-tracker-editable-${date}.json`;
        anchor.click();
        URL.revokeObjectURL(url);
      }

      async function importJsonBackup(file) {
        const indicator = document.getElementById('saved-indicator');
        try {
          const payload = JSON.parse(await file.text());
          if (payload?.format !== 'ai-playbook-qa-tracker' || !payload.assessments || typeof payload.assessments !== 'object') {
            throw new Error('Unsupported tracker backup');
          }
          const knownIds = new Set([...manualChecks, ...releaseChecks].map((check) => check.id));
          const imported = {};
          Object.entries(payload.assessments).forEach(([id, value]) => {
            if (knownIds.has(id) && value && typeof value === 'object') imported[id] = value;
          });
          assessments = imported;
          localStorage.setItem('ai-playbook-qa-tracker', JSON.stringify(assessments));
          indicator.textContent = `Imported and saved locally at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          renderManualChecks();
          renderReleaseChecks();
          renderOutstandingActions();
          updateSummary();
        } catch {
          indicator.textContent = 'The selected file is not a valid AI Playbook QA tracker backup.';
        }
      }

      const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
      const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

      function selectTab(nextTab) {
        tabs.forEach((tab) => {
          const selected = tab === nextTab;
          tab.setAttribute('aria-selected', String(selected));
          tab.tabIndex = selected ? 0 : -1;
        });

        panels.forEach((panel) => {
          const selected = panel.id === nextTab.getAttribute('aria-controls');
          panel.hidden = !selected;
          panel.classList.toggle('active', selected);
        });
      }

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectTab(tab));
        tab.addEventListener('keydown', (event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          let nextIndex = index;
          if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
          if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
          if (event.key === 'Home') nextIndex = 0;
          if (event.key === 'End') nextIndex = tabs.length - 1;
          tabs[nextIndex].focus();
          selectTab(tabs[nextIndex]);
        });
      });

      document.getElementById('review-search').addEventListener('input', renderReview);
      document.getElementById('review-status').addEventListener('change', renderReview);
      document.getElementById('manual-search').addEventListener('input', renderManualChecks);
      document.getElementById('manual-priority-filter').addEventListener('change', renderManualChecks);
      document.getElementById('manual-status-filter').addEventListener('change', renderManualChecks);
      document.getElementById('manual-owner-filter').addEventListener('change', renderManualChecks);
      document.getElementById('manual-sort').addEventListener('change', renderManualChecks);
      document.getElementById('release-search').addEventListener('input', renderReleaseChecks);
      document.getElementById('release-stage-filter').addEventListener('change', renderReleaseChecks);
      document.getElementById('release-status-filter').addEventListener('change', renderReleaseChecks);
      document.getElementById('release-owner-filter').addEventListener('change', renderReleaseChecks);
      document.getElementById('actions-search').addEventListener('input', renderOutstandingActions);
      document.getElementById('actions-owner-filter').addEventListener('change', renderOutstandingActions);
      document.getElementById('download-markdown').addEventListener('click', downloadMarkdown);
      document.getElementById('download-json').addEventListener('click', downloadJsonBackup);
      document.getElementById('import-json').addEventListener('click', () => document.getElementById('import-json-file').click());
      document.getElementById('import-json-file').addEventListener('change', (event) => {
        const file = event.target.files?.[0];
        if (file) importJsonBackup(file);
        event.target.value = '';
      });

      renderManualChecks();
      renderReleaseChecks();
      renderOutstandingActions();
      updateSummary();
