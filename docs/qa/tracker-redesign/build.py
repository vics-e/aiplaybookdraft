"""Builds the redesigned QA tracker from tracker.template.html.

Preview pages (single files, open locally):
- index.html                 blank template: the 67 checks, nothing filled in
- ai-playbook-example.html   the same page with the live AI playbook results

Publish-ready copies for sites with a strict Content-Security-Policy
(`script-src 'self'`, as on aiplaybook-ve.vercel.app), with the code moved
into separate files:
- publish/review-tracker/            AI playbook tracker  -> /review-tracker/
- publish/review-tracker/template/   blank template       -> /review-tracker/template/

Run:  node extract-ai-playbook.mjs   (refresh results from the live tracker)
      python build.py
"""
import json, pathlib, re, shutil

here = pathlib.Path(__file__).parent
checks = json.loads((here / 'checks.json').read_text(encoding='utf-8'))
template = (here / 'tracker.template.html').read_text(encoding='utf-8')

THEME_INIT = re.compile(r'<script>\n(  // Apply the saved theme.*?)</script>', re.S)
MAIN = re.compile(r'<script>\n(/\* =+\n   PROJECT DETAILS.*?)</script>\n</body>', re.S)


def render(checks, seed=None, project=None):
    html = template.replace('/*__CHECKS__*/null', json.dumps(checks, ensure_ascii=False))
    html = html.replace('/*__SEED__*/{}', json.dumps(seed or {}, ensure_ascii=False))
    if project:
        start = html.index('/*__PROJECT__*/')
        end = html.index('};', start) + 1
        html = html[:start] + json.dumps(project, ensure_ascii=False, indent=2) + html[end:]
    return html


def write_preview(name, html):
    (here / name).write_text(html, encoding='utf-8')
    print('built', name, len(html), 'bytes')


def write_publish(folder, html):
    """Same page with its two inline scripts moved to theme-init.js and tracker.js."""
    out = here / 'publish' / folder
    out.mkdir(parents=True, exist_ok=True)
    theme = THEME_INIT.search(html)
    main = MAIN.search(html)
    assert theme and main, 'script blocks not found'
    (out / 'theme-init.js').write_text(theme.group(1).strip() + '\n', encoding='utf-8')
    (out / 'tracker.js').write_text(main.group(1).strip() + '\n', encoding='utf-8')
    page = html.replace(theme.group(0), '<script src="theme-init.js"></script>')
    page = page.replace(main.group(0), '<script src="tracker.js"></script>\n</body>')
    assert '<script>' not in page, 'inline script left in publish copy'
    (out / 'index.html').write_text(page, encoding='utf-8')
    print('published', f'publish/{folder}/')


blank = render(checks)
write_preview('index.html', blank)

results = json.loads((here / 'ai-playbook-results.json').read_text(encoding='utf-8'))
ASSESSED = '2026-09-23T17:00:00Z'  # the live tracker's assessment date
seed = {
    cid: {**row, 'history': [] if row['status'] == 'Not assessed' else [{'at': ASSESSED, 'status': row['status']}]}
    for cid, row in results['current'].items()
}
ai_checks = {**checks, 'owners': results['owners'], 'status': results['statuses'], 'applies': results['applies']}
ai_project = {
    'name': 'AI Playbook',
    'summary': 'Interactive AI playbook for accountants and bookkeepers',
    'liveUrl': 'https://aiplaybook-ve.vercel.app/',
    'repoUrl': 'https://github.com/vics-e/aiplaybookdraft',
    'version': 'fad5b8d',
    'testers': 'Victor Egunlae, Codex',
    'owner': 'Victor Egunlae',
    'started': '2026-09-09',
    'lastChecked': ASSESSED,
    'evidenceBase': 'https://aiplaybook-ve.vercel.app/review-tracker/',
    'storageKey': 'ai-playbook-qa-review',
    # The Sage checklists are internal Confluence pages: linked locally, left out of the published copy.
    'sources': [
        {'label': 'Manual Testing Checklist (PDF)', 'url': 'source/manual-testing-checklist.pdf'},
        {'label': 'QA Release Checklist (PDF)', 'url': 'source/qa-release-checklist.pdf'},
    ],
}
# The Sage source PDFs are internal reference material and are deliberately not
# copied into this repository or linked from generated pages.
ai_project['sources'] = []
write_preview('ai-playbook-example.html', render(ai_checks, seed, ai_project))

shutil.rmtree(here / 'publish', ignore_errors=True)
write_publish('review-tracker', render(ai_checks, seed, ai_project))
write_publish('review-tracker/template', render(checks, project={'sources': [], 'storageKey': 'qa-review-tracker-template'}))
