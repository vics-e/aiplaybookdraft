# QA Review Tracker (redesign)

A cleaner version of the AI playbook's QA review tracker: Overview with one
summary table, Manual testing and Release checklist in Summary or Table view,
a To do list by owner, an About tab, light/dark (dark by default), and a dated
history on every check so fails and fixes stay visible.

## What's here

| File | What it is |
|---|---|
| `tracker.template.html` | The source page. Edit this, then run `build.py`. |
| `checks.json` | The 67 checks from Sage's Manual Testing (38) and QA Release (29) checklists. |
| `build.py` | Builds the preview pages and the publish-ready copies below. |
| `index.html` | Preview: blank template (open locally). |
| `ai-playbook-example.html` | Preview: filled in with the live AI playbook results. |
| `publish/review-tracker/` | **Ready to deploy** as `/review-tracker/` on the AI playbook site. |
| `publish/review-tracker/template/` | **Ready to deploy** as `/review-tracker/template/` (blank template). |

The Sage checklist PDFs are internal source material. They are deliberately
excluded from this repository and every generated or published tracker.

## Publishing

The AI playbook site's Content-Security-Policy is `script-src 'self'`, so the
publish copies keep their code in `theme-init.js` and `tracker.js` (no inline
scripts). Tested under that exact policy.

From the repository root, run `npm run build:review-tracker`. This rebuilds the
source and copies the live tracker and blank template into
`public/review-tracker/` while preserving its existing `evidence/` folder.

## Updating

    npm run build:review-tracker

Results people enter save in their own browser (key `ai-playbook-qa-review`).
Use **Share & save → Download editable backup** to hand results over.
