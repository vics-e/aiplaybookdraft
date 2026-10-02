# Reusable QA Review Tracker

This folder contains a blank, self-contained QA tracker that can be copied into another project.

## Start a new project

1. Copy `qa-review-tracker-template.html` into the new project's QA folder.
2. Replace `[PROJECT NAME]`, `[PROJECT-SLUG]` and `[ASSESSMENT DATE]` throughout the file.
3. Give the agent `QA-RUNBOOK.md` and the project URL, repository guidance, requirements and supported browser/device list.
4. Let the agent complete directly testable checks and record evidence against each row.
5. Ask project owners or QA to complete items that need decisions, external systems, physical devices or formal approval.

## Editing and sharing

The tracker saves edits in the current browser only. It does not write directly to GitHub or synchronise between people.

- **Download report (.md)** creates a readable snapshot.
- **Download editable backup (.json)** preserves the current editable state.
- **Import backup** loads an editable JSON file into another browser or back into the source owner's browser.

To update the official version, return the JSON backup to the project owner or agent. They must import it, verify the changes, update the project source, commit it and redeploy.

## Evidence

Keep durable evidence in the project repository when appropriate. Screenshots are useful for visual defects and responsive states; test output and short Markdown reports are better for repeatable automated or technical checks. Avoid committing temporary browser logs, secrets or unnecessary duplicate files.
