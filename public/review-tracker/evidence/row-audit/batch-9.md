# Batch 9 — release criteria and handoff

Date: 10 September 2026. Rows: release-01–14, 27–29 (17 rows).

Tracker decision update, 18 September 2026: the user reviewed manual-02 and accepted its spacing criterion as passed. The earlier narrow pricing observation remains attached to manual-28/release-26. The current tracker therefore shows 7 completed, 15 failed, 39 needing Sage or QA and 6 not applicable (22 checked of 67).

Reviewed both source checklists, architecture/security/design/activity reports, current git history and existing evidence. Git HEAD is d7b8dc4 (merged PR #7); a merged PR and passing build do not prove peer review and acceptance coverage for every user story. No application source, dependency or test changes were made during this assessment (`application-change-check.txt` is empty).

**release-05 Passed:** `checklist-runbook.md` now contains one actionable case for each of the 67 source IDs, with procedure, expected condition, evidence, owner and global prerequisites. The source condition is documentation/readiness of cases, not completed execution or approved requirements. The latter remain separate open rows.

**release-13 Failed:** unresolved defects remain reproducible in deployed assets, so the deployed-and-validated-fixes gate is not satisfied. No application fixes or deployment occurred.

All other batch rows remain **Needs Sage or QA**:

- release-01–03: dated design approval, locked acceptance criteria and per-story completion/review mapping.
- release-04: Sage/CMS integration environment and ownership.
- release-06–10: VQA chronology, changed/new requirements in Jira, exact design baseline, acceptance verification.
- release-11–12: full integrated test completion; formal Jira defect assignment and story links.
- release-14: additional requirements mapped to maintained automated cases. Sixty historical passing assertions do not prove coverage of unspecified requirements.
- release-27–29: formal severity/register clearance, integrated regression across agreed Sage systems and VQA sign-off.

Existing source files describe approved wording and approved implementation packages; these are not treated as blanket release design/VQA approvals. Formal evidence was not supplied. No Jira records were created or messages sent.

Previously Partial manual-01/release-23/release-25 are handed to QA for manual visual and keyboard review of populated/expanded states in both themes against the approved design baseline. Their 315 default-layout observations remain supporting evidence only.

## Final cumulative disposition

| Disposition | Rows |
|---|---:|
| Passed with evidence | 7 |
| Failed | 15 |
| Needs Sage or QA | 39 |
| Not applicable | 6 |
| Total | 67 |

Checked = 7 passed + 15 failed = **22 of 67**. No partial or N/A row is included in that count. Failed rows are **not** necessarily distinct defects: one defect can violate several source checklist conditions.

Seven completed IDs: manual-02, manual-10, manual-15, manual-35, manual-37, manual-38, release-05.

Remaining execution needs specified browsers/devices, native save/reopen, CMS Page Editor, agreed validation/date/output/selection rules, approved visual baseline and formal Sage/Jira/VQA records. Defects are recorded for a separate authorised remediation phase; this assessment did not fix them.

Batch 9 complete
- 22 of 67 checked
- 6 completed with evidence
- 16 failed
- remaining manual/Sage confirmations: 39 rows; 6 not applicable
Now moving to Batch 10: manual/Sage handoff; no further automatic execution is claimed.
