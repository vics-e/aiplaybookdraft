# Working rules for AI agents (Codex, Claude) and people

## Shared folder

Codex and Claude both work in this folder (`ai-vics-playpen-desktop/aiplaybookdraft`).
Before editing, run `git status`. If there are uncommitted changes you didn't
make, another agent is mid-task: stop and ask rather than edit around them.
Commit as `vics-e <victor.egunlae@sage.com>`, naming the agent in a
`Co-Authored-By:` trailer.

## Release flow

- `main` is production: every push goes live at https://aiplaybook-ve.vercel.app/.
- Run `npm test` and `npm run build` before pushing.
- Only push or release when the owner asks for that piece of work.

## This repository is public

Anything committed here can be read by anyone. Never commit internal Sage
documents (e.g. the Confluence QA checklist PDFs), credentials or personal data.

## QA

- Start with `docs/qa/README.md`. It explains the tracker, the statuses and the folder.
- The tracker is built from `docs/qa/template/` + `docs/qa/project.json` + `docs/qa/results.json`
  with `npm run build:review-tracker`, and published at `/qa-review-tracker/`.
- Save new evidence in `docs/qa/evidence/<check-id>/` with dated names that say
  FAILED / FIXED / PASSED (e.g. `2026-10-03-FAILED-cards-spill-1080.png`).
- Never overwrite a result's history: a fix is a new entry after the failure.
- Add every failure and its fix to `docs/qa/lessons-learned.md`.
- Mark "Passed" only with proof linked; mark devices and sign-offs you can't do
  yourself as "Needs Sage or QA" with the right owner.
