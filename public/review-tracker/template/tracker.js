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

      const seedAssessments = {};
      const previousSeedAssessments = {};

      let assessments = {};
      try {
        assessments = JSON.parse(localStorage.getItem('qa-review-tracker-[PROJECT-SLUG]') || '{}');
      } catch {
        assessments = {};
      }

      try {
        const revision = 'template-initial-v1';
        if (localStorage.getItem('qa-review-tracker-[PROJECT-SLUG]-revision') !== revision) {
          localStorage.setItem('qa-review-tracker-[PROJECT-SLUG]-before-update', JSON.stringify(assessments));
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
          localStorage.setItem('qa-review-tracker-[PROJECT-SLUG]', JSON.stringify(assessments));
          localStorage.setItem('qa-review-tracker-[PROJECT-SLUG]-revision', revision);
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
          localStorage.setItem('qa-review-tracker-[PROJECT-SLUG]', JSON.stringify(assessments));
          indicator.textContent = `Saved locally on this device at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } catch {
          indicator.textContent = 'This change could not be saved locally. Download a JSON backup before closing.';
        }
        updateSummary();
        renderOutstandingActions();
      }

      const appliesOptions = ['To review', 'Relevant', 'Not relevant', 'Needs clarification'];
      const statusOptions = ['Not assessed', 'Already evidenced', 'Passed', 'Failed', 'Blocked', 'Needs Project or QA', 'Not applicable'];
      const ownerOptions = ['Unassigned', 'Project team', 'CMS', 'QA', 'Business owner', 'Other team'];

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
        if (status === 'Needs Project or QA') return 'status-needs-sage';
        if (status === 'Not applicable') return 'status-not-applicable';
        return '';
      }

      function makeStatusBadge(status) {
        const badge = document.createElement('span');
        badge.className = `status-pill ${status === 'Passed' || status === 'Already evidenced' ? 'status-passed' : status === 'Failed' ? 'status-failed' : status === 'Needs Project or QA' ? 'status-needs-sage-badge' : status === 'Not applicable' ? 'status-not-applicable-badge' : 'status-neutral'}`;
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
        const actionStatuses = ['Failed', 'Blocked', 'Needs Project or QA', 'Not assessed'];
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
          wrapper.innerHTML = '<div class="empty-icon" aria-hidden="true">0</div><strong>No outstanding actions</strong><p>Failed, blocked and Project or QA items will appear here automatically.</p>';
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
        [['Manual Testing', manualChecks], ['QA Release Checklist', releaseChecks], ['Overall', [...manualChecks, ...releaseChecks]]].forEach(([label, checks]) => {
          const counts = { Passed: 0, Failed: 0, 'Needs Project or QA': 0, 'Not applicable': 0 };
          checks.forEach(check => {
            const status = getAssessment(check.id).status;
            if (status === 'Already evidenced') counts.Passed++;
            else if (counts[status] !== undefined) counts[status]++;
          });
          const row = document.createElement('tr');
          addCell(row, label); addCell(row, counts.Passed, 'passed'); addCell(row, counts.Failed, 'failed');
          addCell(row, counts['Needs Project or QA'], 'status-needs-sage'); addCell(row, counts['Not applicable'], 'status-not-applicable');
          addCell(row, checks.length); body.appendChild(row);
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
        const completedCount = values.filter((status) => ['Already evidenced', 'Passed'].includes(status)).length;
        const failedCount = values.filter((status) => status === 'Failed').length;
        const checkedCount = completedCount + failedCount;
        const needsCount = values.filter(s => s === 'Needs Project or QA').length;
        const notApplicableCount = values.filter(s => s === 'Not applicable').length;
        document.getElementById('current-assessment-counts').textContent = `${completedCount} passed · ${failedCount} failed · ${needsCount} need Project or QA · ${notApplicableCount} not applicable`;
        renderChecklistSplit();
        renderReview();
        const manualStatuses = manualChecks.map(check => getAssessment(check.id).status);
        const releaseStatuses = releaseChecks.map(check => getAssessment(check.id).status);
        document.getElementById('manual-tab-summary').textContent = `· ${manualStatuses.filter(s => ['Passed', 'Already evidenced'].includes(s)).length} passed / ${manualStatuses.filter(s => s === 'Needs Project or QA').length} need QA`;
        document.getElementById('release-tab-summary').textContent = `· ${releaseStatuses.filter(s => ['Passed', 'Already evidenced'].includes(s)).length} passed / ${releaseStatuses.filter(s => s === 'Needs Project or QA').length} need QA`;
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
          '# QA Review Tracker — [PROJECT NAME]',
          '',
          `Exported: ${new Date().toLocaleString()}`,
          '',
          `- Total checks: ${manualChecks.length + releaseChecks.length}`,
          `- Completed with evidence: ${allStatuses.filter((status) => ['Already evidenced', 'Passed'].includes(status)).length}`,
          `- Failed: ${allStatuses.filter((status) => status === 'Failed').length}`,
          `- Needs Project or QA: ${allStatuses.filter((status) => status === 'Needs Project or QA').length}`,
          '',
          'Checked counts include completed-with-evidence and failed rows only. Partial, Needs Project or QA and Not applicable are not completed. Multiple rows can refer to one defect.',
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
        anchor.download = `qa-review-tracker-[PROJECT-SLUG]-${date}.md`;
        anchor.click();
        URL.revokeObjectURL(url);
      }

      function downloadJsonBackup() {
        const currentRows = {};
        [...manualChecks, ...releaseChecks].forEach((check) => {
          currentRows[check.id] = getAssessment(check.id);
        });
        const payload = {
          format: 'qa-review-tracker',
          version: 1,
          exportedAt: new Date().toISOString(),
          assessments: currentRows
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        const date = new Date().toISOString().slice(0, 10);
        anchor.href = url;
        anchor.download = `qa-review-tracker-[PROJECT-SLUG]-editable-${date}.json`;
        anchor.click();
        URL.revokeObjectURL(url);
      }

      async function importJsonBackup(file) {
        const indicator = document.getElementById('saved-indicator');
        try {
          const payload = JSON.parse(await file.text());
          if (payload?.format !== 'qa-review-tracker' || !payload.assessments || typeof payload.assessments !== 'object') {
            throw new Error('Unsupported tracker backup');
          }
          const knownIds = new Set([...manualChecks, ...releaseChecks].map((check) => check.id));
          const imported = {};
          Object.entries(payload.assessments).forEach(([id, value]) => {
            if (knownIds.has(id) && value && typeof value === 'object') imported[id] = value;
          });
          assessments = imported;
          localStorage.setItem('qa-review-tracker-[PROJECT-SLUG]', JSON.stringify(assessments));
          indicator.textContent = `Imported and saved locally at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          renderManualChecks();
          renderReleaseChecks();
          renderOutstandingActions();
          updateSummary();
        } catch {
          indicator.textContent = 'The selected file is not a valid QA tracker backup.';
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

      document.querySelectorAll('[data-open-tab]').forEach((button) => {
        button.addEventListener('click', () => {
          const tab = document.getElementById(button.dataset.openTab);
          if (!tab) return;
          selectTab(tab);
          tab.focus();
          document.querySelector('.workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });

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
