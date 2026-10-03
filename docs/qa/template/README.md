# QA review tracker: template

The reusable tracker, shared by every project. The project's own details and
results live one folder up, in `docs/qa/project.json` and `docs/qa/results.json`.

| File | What it is |
|---|---|
| `tracker.template.html` | The page: Overview (results, how it was tested, fixed after failing, handover), Manual testing and Release checklist (Summary or Table view), To do, Lessons tab, About; light and dark (dark by default); a dated history on every check. Edit this to change the design. |
| `checks.json` | The 67 checks from Sage's Manual Testing (38) and QA Release (29) checklists, wording as written. |
| `build.py` | Reads `../project.json`, `../results.json` and `../lessons-learned.md`. Builds `index.html` (blank preview), `../qa-testing-tracker.html` (this project) and `publish/` (ready to deploy). |
| `index.html` | Blank template preview: open it locally. |
| `publish/` | Built copies for `/qa-review-tracker/` and `/qa-review-tracker/template/`, with the code in `tracker.js` and `theme-init.js` (the site's Content-Security-Policy blocks inline scripts). |

Build from the repo root: `npm run build:review-tracker`.

To use it in another project, see "Copy this to a new project" in `docs/qa/README.md`.
