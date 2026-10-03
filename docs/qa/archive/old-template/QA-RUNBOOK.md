# QA Review Tracker agent runbook

Use this runbook when applying the QA tracker to a new project. The tracker contains 38 Manual Testing checks and 29 QA Release checks.

## 1. Create the project tracker

1. Copy `qa-review-tracker-template.html` into the project's QA folder.
2. Replace every placeholder: `[PROJECT NAME]`, `[PROJECT-SLUG]`, `[ASSESSMENT DATE]` and any project URLs or source-checklist links you add.
3. Use a unique project slug. It forms the browser-storage key and prevents one project's answers overwriting another project's answers.
4. Keep the checklist row IDs stable unless the source checklist itself changes.

## 2. Establish the test scope

Read the project requirements, repository guidance, acceptance criteria, supported browsers and release process before assigning results. Record any missing decision rather than inventing it.

Classify each row as:

- **Relevant** when the project contains the feature or the release requirement applies.
- **Not relevant** when the feature does not exist. Record the reason.
- **Needs clarification** when a business rule, supported platform or acceptance criterion is missing.

## 3. Run checks efficiently

Batch related observations when one controlled run can provide valid evidence for several rows. Useful batches include:

- Responsive layout: widths, clipping, root scrollbars, field spacing, alignment and control visibility.
- Functional forms: required, optional, invalid, boundary, long-text and special-character inputs.
- Navigation and persistence: buttons, filters, saved answers, reload, reset and summaries.
- Technical health: tests, production build, assets, console, invalid routes, dependency audit and performance.
- Accessibility: keyboard, focus, labels, announcements, contrast, zoom and reduced motion.
- Browser/device matrix: repeat the agreed journey on every required environment.

A batch is only an efficient way to collect evidence. Update every checklist row separately with its own status and reasoning. Do not assume that passing one representative screen proves every page or state.

Use browser automation or browser-control skills for observable interface checks. Capture screenshots when they clarify layout, visual states or a defect. Prefer concise evidence that another reviewer can open and reproduce.

## 4. Assign statuses consistently

- **Passed** — the full condition was checked and the evidence supports it.
- **Failed** — a current defect was reproduced. Record exact steps, expected behaviour and actual behaviour.
- **Needs Project or QA** — completion needs a business decision, formal process evidence, unavailable browser/device, external system, CMS access or release sign-off.
- **Not applicable** — the requirement does not apply to this project. Record why.
- **Blocked** — a temporary dependency prevents the check. Name the dependency and owner.
- **Not assessed** — no reliable assessment has been made yet.

Automated tests can support a result, but they do not replace a required visual, browser, physical-device or formal-approval check.

## 5. Record evidence

For each assessed row, record:

- What was tested and where.
- Browser, device or viewport when relevant.
- Evidence file, test output or accessible link.
- A concise conclusion.
- Reproduction steps for every failure.
- The owner and next action for anything outstanding.

Do not include secrets, personal data or disposable logs in the tracker.

## 6. Verify and publish

1. Confirm all checklist rows appear once and the totals are correct.
2. Run the repository's required tests and production build.
3. Review the tracker at desktop and mobile widths.
4. Commit the tracker, durable evidence and runbook updates to the project repository.
5. Publish through the project's approved release process.

Browser edits are local. A human reviewer must download the editable JSON backup and return it to the project owner or agent. Import the backup, verify the changed rows, commit the updated official tracker and republish it.
