/* =========================================================================
   PROJECT DETAILS. Fill these in once per project (or use "Edit project
   details" on the page; browser edits are included in the backup file).
   ========================================================================= */
const PROJECT = {
  "sources": [],
  "storageKey": "qa-review-tracker-template"
};

/* The 67 checks from Sage's Manual Testing and QA Release checklists. */
const CHECKS = {"manual": [{"id": "manual-01", "priority": "Low", "type": "Usability", "summary": "Scroll bar should appear only if required.", "tools": "N/A", "standards": "Usability.gov guidelines", "sourceNotes": ""}, {"id": "manual-02", "priority": "Low", "type": "Usability", "summary": "Check enough space is applied between field labels, columns, rows and errors.", "tools": "N/A", "standards": "W3C usability guidelines", "sourceNotes": ""}, {"id": "manual-03", "priority": "Medium", "type": "Usability", "summary": "All text should be properly aligned.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-04", "priority": "Medium", "type": "Usability", "summary": "Check the site is responsive at 767px, 768px, 1080px and 1920px.", "tools": "Web Developer toolbar: Resize, View Responsive Layouts", "standards": "", "sourceNotes": ""}, {"id": "manual-05", "priority": "High", "type": "Usability", "summary": "Font should be consistent throughout the site.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-06", "priority": "Medium", "type": "Usability", "summary": "Display appropriate server-side and client-side validation for form fields.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-07", "priority": "High", "type": "Usability", "summary": "Check for broken links, missing images, CSS, Flash, RSS, script errors, expired domains and server configuration issues.", "tools": "Xenu", "standards": "", "sourceNotes": ""}, {"id": "manual-08", "priority": "Medium", "type": "Functional", "summary": "Test all mandatory fields validate correctly based on user input.", "tools": "N/A", "standards": "N/A", "sourceNotes": ""}, {"id": "manual-09", "priority": "Medium", "type": "Functional", "summary": "Test accented letters are displayed correctly in Page Editor and the front end.", "tools": "N/A", "standards": "", "sourceNotes": "The source checklist contains examples covering common European accented characters."}, {"id": "manual-10", "priority": "Low", "type": "Functional", "summary": "Test no mandatory error message is present for optional fields.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-11", "priority": "Medium", "type": "Functional", "summary": "Test leap years are validated correctly and do not cause errors.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-12", "priority": "Low", "type": "Functional", "summary": "Test negative input values for each field.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-13", "priority": "Low", "type": "Functional", "summary": "Test the maximum length of every field to ensure data is not truncated.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-14", "priority": "Medium", "type": "Functional", "summary": "Check a confirmation message is displayed for update and delete operations.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-15", "priority": "Medium", "type": "Functional", "summary": "Test all input fields for special characters.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-16", "priority": "Medium", "type": "Functional", "summary": "Test the sorting and filtering functionality.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-17", "priority": "Medium", "type": "Functional", "summary": "Test no errors are present in the browser console.", "tools": "Browser developer tools console", "standards": "", "sourceNotes": ""}, {"id": "manual-18", "priority": "Medium", "type": "Functional", "summary": "Test the functionality of buttons, including enabled, disabled and hidden states.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-19", "priority": "High", "type": "Functional", "summary": "Test that failed functionality redirects the user to the custom error page (404).", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-20", "priority": "Medium", "type": "Functional", "summary": "Test all uploaded documents open correctly in a new window, new tab or intended destination.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-21", "priority": "High", "type": "Functional", "summary": "Test the user is able to download files.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-22", "priority": "High", "type": "Functional", "summary": "Test email functionality, such as feedback and order confirmation.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-23", "priority": "High", "type": "Functional", "summary": "Validate that blank form submissions are not allowed and at least one field is required.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-24", "priority": "Medium", "type": "Functional", "summary": "Test external page links open in a new tab or window.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-25", "priority": "High", "type": "Functional", "summary": "Check Create, Edit, Delete and Publish for a new component.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-26", "priority": "High", "type": "Functional", "summary": "Verify data retrieval delivers the correct data, such as Search and News sections.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-27", "priority": "Medium", "type": "Functional", "summary": "Ensure search functions correctly and results are accurate and helpful to the customer.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-28", "priority": "High", "type": "Compatibility", "summary": "Test page rendering at different screen resolutions and rotations.", "tools": "Web Developer toolbar: Resize, View Responsive Layouts", "standards": "Latest browser versions only", "sourceNotes": "Chrome developer tools can also be used to switch between representative devices."}, {"id": "manual-29", "priority": "High", "type": "Compatibility", "summary": "Test that the CSS and HTML used are compatible with the appropriate browser and device versions.", "tools": "Edge, Chrome, Firefox, Safari, iPhone and Android", "standards": "Portrait and landscape orientations", "sourceNotes": ""}, {"id": "manual-30", "priority": "Low", "type": "Destructive", "summary": "Apply inputs that force all error messages to occur.", "tools": "N/A", "standards": "N/A", "sourceNotes": ""}, {"id": "manual-31", "priority": "Low", "type": "Destructive", "summary": "Repeatedly attempt to submit a form by continually clicking the submit action.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-32", "priority": "Low", "type": "Destructive", "summary": "Force different outputs to be generated for each input.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-33", "priority": "Low", "type": "Destructive", "summary": "Attempt to fill the file system to its capacity.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-34", "priority": "Low", "type": "Destructive", "summary": "Attempt to submit blank forms repeatedly.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-35", "priority": "Low", "type": "Destructive", "summary": "Attempt to view an invalid page URL within the site.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-36", "priority": "Low", "type": "Destructive", "summary": "Alter strings within the webpages where applicable and ensure an appropriate message is displayed.", "tools": "N/A", "standards": "", "sourceNotes": ""}, {"id": "manual-37", "priority": "High", "type": "Performance", "summary": "Run Google PageSpeed to identify performance improvements.", "tools": "Google PageSpeed", "standards": "N/A", "sourceNotes": ""}, {"id": "manual-38", "priority": "High", "type": "Accessibility", "summary": "Run Lighthouse Accessibility to identify accessibility improvements.", "tools": "Lighthouse", "standards": "N/A", "sourceNotes": ""}], "release": [{"id": "release-01", "stage": "Entry criteria", "summary": "All designs are signed off."}, {"id": "release-02", "stage": "Entry criteria", "summary": "Acceptance criteria are locked down."}, {"id": "release-03", "stage": "Entry criteria", "summary": "All code changes are complete and peer reviewed for each user story delivered."}, {"id": "release-04", "stage": "Entry criteria", "summary": "The test environment is fully configured to update customer websites dynamically."}, {"id": "release-05", "stage": "Entry criteria", "summary": "Test cases are documented and ready for execution."}, {"id": "release-06", "stage": "Entry criteria", "summary": "Unit testing and VQA are complete before changes are pushed to development."}, {"id": "release-07", "stage": "Entry criteria", "summary": "Modified requirements are updated in acceptance criteria rather than Jira comments or designs."}, {"id": "release-08", "stage": "Entry criteria", "summary": "New requirements treated as changes are addressed in a new user story."}, {"id": "release-09", "stage": "Entry criteria", "summary": "If designs change, updated designs are recorded in Jira with the exact layouts and styles used for testing."}, {"id": "release-10", "stage": "Exit criteria", "summary": "All acceptance criteria have been verified."}, {"id": "release-11", "stage": "Exit criteria", "summary": "All targeted and integrated testing is completed."}, {"id": "release-12", "stage": "Exit criteria", "summary": "Any bugs found are raised in Jira, assigned to the appropriate developer and linked to the parent story."}, {"id": "release-13", "stage": "Exit criteria", "summary": "Bug fixes are deployed and validated as resolved."}, {"id": "release-14", "stage": "Exit criteria", "summary": "The automated test suite is maintained and updated for additional requirements."}, {"id": "release-15", "stage": "Compatibility: browsers", "summary": "Microsoft Edge, latest version, on Windows 11."}, {"id": "release-16", "stage": "Compatibility: browsers", "summary": "Google Chrome, latest version, on Windows 11."}, {"id": "release-17", "stage": "Compatibility: browsers", "summary": "Mozilla Firefox, latest version, on Windows 11."}, {"id": "release-18", "stage": "Compatibility: browsers", "summary": "Safari, latest version, on macOS."}, {"id": "release-19", "stage": "Compatibility: tablets", "summary": "Samsung Galaxy Tab A9+ on the latest Android version."}, {"id": "release-20", "stage": "Compatibility: tablets", "summary": "iPad 10th generation and iPad Mini 2021 on the latest iOS version."}, {"id": "release-21", "stage": "Compatibility: mobile", "summary": "iPhone 17 and Mini on the latest iOS version."}, {"id": "release-22", "stage": "Compatibility: mobile", "summary": "Samsung S25 on the latest Android version."}, {"id": "release-23", "stage": "Responsive testing", "summary": "Test at a screen resolution of 1680px or wider."}, {"id": "release-24", "stage": "Responsive testing", "summary": "Test at a screen resolution of 1080px or wider."}, {"id": "release-25", "stage": "Responsive testing", "summary": "Test at a screen resolution of 767px or wider."}, {"id": "release-26", "stage": "Responsive testing", "summary": "Test below 767px."}, {"id": "release-27", "stage": "Sign-off criteria", "summary": "No known Blocker or Critical bugs are outstanding."}, {"id": "release-28", "stage": "Sign-off criteria", "summary": "Manual and automated regression tests are complete for Sitecore, third parties, Tealium tags, market sites and ecommerce journeys."}, {"id": "release-29", "stage": "Sign-off criteria", "summary": "VQA has signed off the changes."}], "applies": ["To review", "Relevant", "Not relevant", "Needs clarification"], "status": ["Not assessed", "Already evidenced", "Passed", "Failed", "Blocked", "Needs Project or QA", "Not applicable"], "owners": ["Unassigned", "Project team", "CMS", "QA", "Business owner", "Other team"]};

/* Results already recorded for this project (filled in by build.py; empty in the blank template). */
const SEED = {};

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
const LESSONS = null;
if (!LESSONS || !LESSONS.rows.length) { $('#tab-lessons')?.remove(); $('#panel-lessons')?.remove(); }
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/** Escaped text with Markdown-style `code` and **bold**. */
const md = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
const fmtDate = iso => { if (!iso) return ''; const d = new Date(iso); return isNaN(d) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };

/* ------------------------------------------------------------ saved state */
const KEY = PROJECT.storageKey;
let state = { project: {}, rows: {}, lastChecked: '' };
try { state = { ...state, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
const project = () => ({ ...PROJECT, ...Object.fromEntries(Object.entries(state.project).filter(([, v]) => v)) });
const row = id => ({ ...DEFAULTS, history: [], ...(SEED[id] || {}), ...(state.rows[id] || {}) });
const lastChecked = () => state.lastChecked || PROJECT.lastChecked;
const ALL = [...CHECKS.manual.map(c => ({ ...c, list: 'manual' })), ...CHECKS.release.map(c => ({ ...c, list: 'release' }))];

function setField(id, field, value) {
  const current = row(id);
  const next = { ...current, [field]: value };
  if (field === 'status' && value !== current.status) {
    next.history = [...current.history, { at: new Date().toISOString(), status: value }];
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
    return `<li><span class="id">${esc(c.id)}</span><span><button class="linkish" type="button" data-edit="${c.id}">${esc(c.title)}</button> <span class="muted">· failed ${fmtDate(failed?.at)}, passed ${fmtDate(passed?.at)}</span></span></li>`;
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
    ? `<ul class="history">${[...r.history].reverse().map(h => `<li><time>${fmtDate(h.at)}</time><span class="pill" data-status="${esc(h.status)}">${esc(h.status)}</span><span class="muted">${esc(h.note || '')}</span></li>`).join('')}</ul>`
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
    <colgroup><col style="width:26%"><col style="width:178px"><col style="width:166px"><col style="width:168px"><col style="width:16%"><col></colgroup>
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
menu.addEventListener('click', e => {
  const act = e.target.closest('[data-act]')?.dataset.act; if (!act) return;
  closeMenu();
  if (act === 'md') download(`${slug()}-qa-report-${today()}.md`, markdown(), 'text/markdown');
  if (act === 'json') download(`${slug()}-qa-backup-${today()}.json`, JSON.stringify({ format: 'qa-review-tracker', version: 2, exportedAt: new Date().toISOString(), ...state }, null, 2), 'application/json');
  if (act === 'import') $('#import-file').click();
});
$('#import-file').addEventListener('change', async e => {
  const file = e.target.files?.[0]; e.target.value = ''; if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const rows = data.rows || data.assessments;
    if (!rows || typeof rows !== 'object') throw new Error();
    state = { project: data.project || state.project, rows, lastChecked: data.lastChecked || state.lastChecked };
    save(); renderAll(); toast('Backup imported');
  } catch { toast('That file isn’t a tracker backup'); }
});
const today = () => new Date().toISOString().slice(0, 10);
const slug = () => (project().name || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast('Downloaded ' + name);
}
function markdown() {
  const p = project(); const { n, total } = counts();
  const line = c => { const r = row(c.id); return `| ${c.id} | ${c.summary.replace(/\|/g, '/')} | ${r.status} | ${r.owner} | ${(r.comments || '').replace(/\n/g, ' ').replace(/\|/g, '/')} | ${(r.evidence || '').replace(/\n/g, ' ').replace(/\|/g, '/')} |`; };
  const table = list => ['| ID | Check | Status | Owner | Notes | Evidence |', '|---|---|---|---|---|---|', ...CHECKS[list].map(line)].join('\n');
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
