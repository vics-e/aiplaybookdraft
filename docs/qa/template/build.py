"""Builds the QA review tracker from tracker.template.html.

Reads (template, shared by every project):
- tracker.template.html   the page
- checks.json             the 67 checks from Sage's Manual Testing (38) and QA Release (29) checklists

Reads (this project, one folder up in docs/qa/):
- project.json            name, live site, repository, version, testers, dates…
- results.json            recorded results (optional; leave it out for a fresh project)

Writes:
- template/index.html                         blank template preview (open locally)
- ../qa-testing-tracker.html                  this project's tracker as one file (open locally)
- template/publish/review-tracker/            this project's tracker, ready for /review-tracker/
- template/publish/review-tracker/template/   blank template, ready for /review-tracker/template/

The publish copies keep their code in theme-init.js and tracker.js, because the
site's Content-Security-Policy (`script-src 'self'`) blocks inline scripts.

Run from the repo root:  npm run build:review-tracker
"""
import json, pathlib, re, shutil

here = pathlib.Path(__file__).parent
qa = here.parent
checks = json.loads((here / 'checks.json').read_text(encoding='utf-8'))
template = (here / 'tracker.template.html').read_text(encoding='utf-8')

THEME_INIT = re.compile(r'<script>\n(  // Apply the saved theme.*?)</script>', re.S)
MAIN = re.compile(r'<script>\n(/\* =+\n   PROJECT DETAILS.*?)</script>\n</body>', re.S)


def read_lessons(path):
    """lessons-learned.md -> {intro, headers, rows, patterns} for the tracker's Lessons tab."""
    if not path.exists():
        return None
    lines = path.read_text(encoding='utf-8').splitlines()
    split = lambda line: [cell.strip() for cell in line.strip().strip('|').split('|')]
    table = [l for l in lines if l.lstrip().startswith('|')]
    if len(table) < 3:
        return None
    first = lines.index(table[0])
    intro = ' '.join(l.strip() for l in lines[1:first] if l.strip() and not l.startswith('#'))
    patterns, in_patterns = [], False
    for l in lines:
        if l.startswith('## '):
            in_patterns = l.strip().lower() == '## patterns'
        elif in_patterns and l.startswith('- '):
            patterns.append(l[2:].strip())
        elif in_patterns and l.startswith('  ') and patterns:
            patterns[-1] += ' ' + l.strip()
    return {'intro': intro, 'headers': split(table[0]), 'rows': [split(l) for l in table[2:]], 'patterns': patterns}


def render(checks, seed=None, project=None, lessons=None):
    html = template.replace('/*__CHECKS__*/null', json.dumps(checks, ensure_ascii=False))
    html = html.replace('/*__LESSONS__*/null', json.dumps(lessons, ensure_ascii=False))
    html = html.replace('/*__SEED__*/{}', json.dumps(seed or {}, ensure_ascii=False))
    if project:
        start = html.index('/*__PROJECT__*/')
        end = html.index('};', start) + 1
        html = html[:start] + json.dumps(project, ensure_ascii=False, indent=2) + html[end:]
    return html


def write_file(path, html):
    path.write_text(html, encoding='utf-8')
    print('built', path.relative_to(qa), len(html), 'bytes')


def write_publish(folder, html):
    """Same page with its two inline scripts moved to theme-init.js and tracker.js."""
    out = here / 'publish' / folder
    out.mkdir(parents=True, exist_ok=True)
    theme, main = THEME_INIT.search(html), MAIN.search(html)
    assert theme and main, 'script blocks not found'
    (out / 'theme-init.js').write_text(theme.group(1).strip() + '\n', encoding='utf-8')
    (out / 'tracker.js').write_text(main.group(1).strip() + '\n', encoding='utf-8')
    page = html.replace(theme.group(0), '<script src="theme-init.js"></script>')
    page = page.replace(main.group(0), '<script src="tracker.js"></script>\n</body>')
    assert '<script>' not in page, 'inline script left in publish copy'
    (out / 'index.html').write_text(page, encoding='utf-8')
    print('published', f'template/publish/{folder}/')


# Blank template.
blank_project = {'sources': [], 'storageKey': 'qa-review-tracker-template'}
write_file(here / 'index.html', render(checks, project=blank_project))

# This project.
project = json.loads((qa / 'project.json').read_text(encoding='utf-8'))
project_checks, seed = checks, {}
results_file = qa / 'results.json'
if results_file.exists():
    results = json.loads(results_file.read_text(encoding='utf-8'))
    project_checks = {**checks, 'owners': results['owners'], 'status': results['statuses'], 'applies': results['applies']}
    assessed = project.get('lastChecked')
    seed = {
        # A row may carry its own history (e.g. Failed, then Passed after a fix); otherwise one entry is made.
        cid: {**row, 'history': row.get('history') or ([] if row['status'] == 'Not assessed' or not assessed else [{'at': assessed, 'status': row['status']}])}
        for cid, row in results['current'].items()
    }
lessons = read_lessons(qa / 'lessons-learned.md')
write_file(qa / 'qa-testing-tracker.html', render(project_checks, seed, project, lessons))

shutil.rmtree(here / 'publish', ignore_errors=True)
write_publish('review-tracker', render(project_checks, seed, project, lessons))
write_publish('review-tracker/template', render(checks, project=blank_project))
