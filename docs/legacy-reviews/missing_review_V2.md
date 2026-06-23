# Missing Review V2

## Purpose

This review checks whether the "missing" items from the restoration work are:

1. Actually present in the original source document.
2. Missing from the live website.
3. Already covered somewhere else in the live website.
4. Repeated or duplicated inside the original source document.
5. Not part of the original source document at all.

Source of truth checked:

- `src/imports/ai-playbook-accountants.txt`

Live website content checked:

- `src/app/data/playbookData.ts`

Supporting reference checked:

- `V2_CONTENT_RESTORATION_CHECKLIST.md`

No app code was changed.

## Executive Summary

The original source document does contain some repeated themes, but they are mostly intentional rather than accidental duplicates. The same ideas appear first as teaching content, then later as templates, checklists, or practical tools.

The main issue is not duplicate content in the source document. The main issue is that many source pages are missing from the live website, while a few missing-looking topics are already partially covered elsewhere in the live site.

There are also some website features and future ideas that are not in the Word/source playbook at all. Those should not be treated as "missing source content" unless the project owner deliberately wants to add them as web-only enhancements.

Important source-document note: page 43, "Why Time-Based Pricing Becomes Unstable", exists in the body of the source text, but it is missing from the source document's table of contents. That is a source TOC issue, not a live website issue.

## Duplicate or Repeated Areas in the Original Source Document

| Topic | Source locations | Duplicate or intentional repeat? | What is different between the repeats? | Recommendation |
|---|---|---|---|---|
| AI capacity / AI dividend | Page 6, Page 41, Page 42 | Intentional repeat | Page 6 introduces firm capacity. Page 41 defines the AI dividend. Page 42 applies the capacity question to pricing/economics. | Do not delete as duplicate. Represent all three angles, but they can be merged carefully if the distinctions remain clear. |
| Accountant role / judgement | Page 8, Page 34, Page 45 | Intentional repeat | Page 8 explains the human role generally. Page 34 explains the role shift in agent workflows. Page 45 connects judgement to pricing/value. | Do not treat as duplicate. Keep all three because each supports a different section. |
| Ethics / professional responsibility | Page 9, Page 11 | Partial overlap | Page 9 is broader ethics and responsibility framing. Page 11 is the formal professional principles page for Section 2. | Can merge, but only if page 9's PCRT framing, practical rule, and judgement activity are preserved. |
| Human-in-the-loop | Page 4, Page 7, Page 10, Page 11, Page 18, Page 22, Page 31, Page 53 | Intentional recurring principle | The source repeats human review because it is a core safety control. Page 10 is the dedicated model. Other pages reference it in context. | Keep the dedicated page 10 and repeat shorter reminders where needed. |
| Output checks / output review checklist | Page 18, Page 61 | Intentional repeat | Page 18 teaches the four output checks. Page 61 provides the reusable checklist/template. | Keep both. Link them in the live site rather than removing one. |
| AI policy | Page 13, Page 59 | Intentional repeat | Page 13 explains the minimum policy. Page 59 provides the starter template. | Keep both. Page 13 should teach; page 59 should be the template/resource. |
| Agent specification | Page 31, Page 60 | Similar but not identical | Page 31 has `Goal or outcome` and `Agent behaviour`. Page 60 has `Agent steps` 1-5 and no explicit `Goal or outcome` field. | Treat as a real template mismatch. Either keep both or create one reconciled template that includes all fields. |
| Workflow map / agent opportunities | Page 5, Page 22, Page 25, Page 26 | Intentional progression | Page 5 is broad AI fit. Page 22 explains agent opportunities. Page 25 maps workflows. Page 26 helps choose the first agent. | Do not collapse into one short page unless all exercises remain. |
| Agent examples | Page 23, Pages 27-30 | Intentional repeat/expansion | Page 23 lists four core workflows. Pages 27-30 expand them as individual examples. | Keep Page 23 as overview and restore pages 27-30 as examples or detailed expandable blocks. |
| AI maturity / firm stages | Page 24, Page 58 | Related but different | Page 24 has five agent maturity stages. Page 58 has four AI-ready firm stages. | Do not treat as duplicate. They measure different things. |
| Client AI messaging | Page 49, Page 64 | Intentional repeat | Page 49 teaches how to talk to clients. Page 64 gives a reusable communication template. | Keep both; link page 49 to page 64. |
| Evidence trail / file note | Page 19, Page 63 | Intentional repeat | Page 19 explains the evidence trail. Page 63 provides the file note template. | Keep both; page 63 supports page 19. |
| Glossary terms repeated in body | Page 65 plus earlier pages | Intentional reference | Glossary defines terms used throughout the playbook. | Keep glossary as a resource. Do not remove repeated terminology from teaching pages. |

## Source Document Structural Issues

| Issue | Location | What it means | Recommendation |
|---|---|---|---|
| Page 43 missing from source table of contents | TOC jumps from Page 42 to Page 44 | Page 43 still exists in the source body as "Why Time-Based Pricing Becomes Unstable". | Restore page 43 in the website. Also consider correcting the source TOC if the Word document is updated later. |
| Page 31 and Page 60 template mismatch | Page 31 and Page 60 | The source contains two versions of an agent specification template with different fields. | For V1, include all unique fields or explicitly choose one canonical version. |
| Page 8 and Page 34 are easy to confuse | Page 8 and Page 34 | They both discuss accountant role, but page 34 is agent-workflow-specific. | Keep page 34 content separate or clearly label it as "role in agent workflows". |
| Page 6, Page 41, and Page 42 overlap | Pages 6, 41, 42 | They all discuss capacity/value, but in different contexts. | Merging is acceptable only if the capacity, AI dividend, and pricing question remain distinct. |

## Missing from Live Website, But Present in the Original Source Document

These are real source-document items that are missing from the live website. They should be restored if the goal is a faithful digital version.

| Source page | Source content | Current live status | Already covered elsewhere in live site? | Recommendation |
|---:|---|---|---|---|
| 14 | Data and Confidentiality in an AI World | Missing from live site | No | Add as Section 2 governance page/block. |
| 15 | Legal Responsibility Does Not Change | Missing from live site | No | Add as Section 2 page/block. |
| 16 | Common AI Failure Modes | Missing from live site | No | Add as Section 2 page/block. |
| 17 | Avoiding Over-Reliance on AI | Missing from live site | No | Add as Section 2 page/block. |
| 19 | Creating an AI Evidence Trail | Missing from live site | No | Add to Section 2 and link to file note template. |
| 20 | The Red-Team Exercise | Missing from live site | No | Restore as a live activity. |
| 21 | Where Assistants Help | Missing from live site | Partly implied by assistant/agent pages, but not enough | Add as a separate page or expand assistant content before agent content. |
| 25 | The Workflow Map: Where Agents Work Best | Missing from live site | Partly implied by `s3-where-agents` | Add the actual workflow map exercise. |
| 26 | How to Choose Your First Agent | Missing from live site | Partly implied by `s3-workflows` | Add first-agent choice criteria/activity. |
| 27-30 | Individual agent examples | Compressed into `s3-workflows` | Partly | Expand each example or add separate example pages. |
| 32 | The Agent Controls Checklist | Missing from live site | No | Add checklist near agent spec or in resources. |
| 35 | The AI-Enabled Workflow | Missing from live site | No | Add as Section 3 closing page/block. |
| 38 | Prompt Practice: From Basic to Structured | Missing from live site | No | Add prompt practice activity. |
| 40 | Your Starter Prompt Library | Missing from live site | No | Add as prompt resource page/block. |
| 42 | The Capacity Question | Missing from live site | Partly covered by `s1-capacity` and `s5-dividend` | Add the pricing-specific version or explicitly merge into Section 5. |
| 43 | Why Time-Based Pricing Becomes Unstable | Missing from live site | No | Add before pricing models. |
| 46 | The 3V Pricing Framework | Missing from live site | No | Add as Section 5 page/block. |
| 47 | Designing AI-Era Service Packages | Missing from live site | No | Add Core/Growth/Strategic package content. |
| 48 | The AI Impact Pricing Exercise | Missing from live site | No | Add pricing exercise table. |
| 49 | Talking to Clients About AI | Missing from live site | No | Add client messaging page and link to page 64 template. |
| 50 | Pricing Action Checklist | Missing from live site | No | Add as checklist/resource. |
| 54 | The AI Enablement Rhythm | Missing from live site | No | Add weekly/monthly/quarterly rhythm content. |
| 55 | The AI Scorecard | Missing from live site | Exists only in unused `Section6.tsx`, but changed | Add source scorecard metrics to live site. |
| 56 | The Stop-Doing List | Missing from live site | No | Add stop-doing activity. |
| 57 | Three Strategic Questions for the AI-Ready Firm | Missing from live site | No | Add strategic questions and activity. |
| 58 | The Four Stages of the AI-Ready Firm | Missing from live site | Exists only in unused `Section6.tsx`, but changed | Add source four stages to live site. |
| 62 | AI Tool Usage Matrix | Missing from live site | No | Add as Section 7 template/resource. |
| 63 | AI File Note Template | Missing from live site | No | Add as Section 7 template/resource. |
| 64 | Client AI Communication Template | Missing from live site | No | Add as Section 7 template/resource. |
| 65 | AI Glossary | Missing from live site | Exists only in unused `Section7.tsx`, but incomplete | Add full source glossary to live site. |

## Missing-Looking Items That Are Already Covered Elsewhere

These should not automatically become new pages. They are already partly or mostly represented somewhere else, but may need expansion or clearer cross-linking.

| Item | Source location | Live location | Coverage judgement | Recommendation |
|---|---:|---|---|---|
| Assistants vs Agents | Page 7 | `s3-difference` | Present but moved and shortened | Keep in Section 3, but restore full source wording/activity. |
| Professional Ethics and Responsibility | Page 9 | `s2-principles` partial | Partly covered, not enough | Merge into `s2-principles` only if page 9's unique content is preserved. |
| Human-in-the-loop model | Page 10 | `s1-human-loop` | Mostly covered | Expand wording, but no need for a brand-new concept page if current page remains. |
| AI capacity opportunity | Page 6 | `s1-capacity` and `s5-dividend` | Partly covered | Expand `s1-capacity`; keep Section 5 pricing context separate. |
| Agent workflow examples | Pages 27-30 | `s3-workflows` partial | Covered only as compressed cards | Expand inside `s3-workflows` or add detailed expandable blocks. |
| Agent Spec Template | Page 31 and Page 60 | `s3-spec` | Page 31 mostly covered; page 60 not fully covered | Reconcile fields rather than duplicating confusingly. |
| AI Output Review Checklist | Page 61 | `s7-checklist` | Present but shortened | Expand checklist; do not create a separate duplicate unless needed. |
| Back cover message | Page 66 | `s7-finish` partial | Adapted, not source-faithful | Add exact final message to existing final page. |

## Areas That Are Not in the Original Word/Source Playbook

These are not missing from the Word/source document because they were never part of it. They may still be useful website features, but they should be treated as web enhancements, not content restoration gaps.

| Area or feature | Present in original source document? | Present in live website/project? | Recommendation |
|---|---|---|---|
| Activity Summary page | No | Yes, `activity-summary` and `ActivitySummary.tsx` | Keep as a web enhancement. Do not treat as source content. |
| Download / print summary behaviour | No | Yes, `ActivitySummary.tsx` uses `window.print()` | Keep as a web enhancement. |
| Progress tracking / visited pages | No | Yes, `SageAIPlaybook.tsx` | Keep as a web enhancement. |
| Sidebar navigation and section progress | No | Yes, `SageAIPlaybook.tsx` | Keep as app UI, not source content. |
| Certificate/completion certificate | No | Not currently a proper certificate | Do not call this "missing from source"; it is a new product feature if wanted. |
| Database, login, saved accounts | No | No | Not a source-content gap. Only add if product requirements change. |
| LocalStorage persistence | No | No | Not a source-content gap. It is a possible V1 app feature. |
| Images/illustrations | No | Yes, live app uses images/assets | Treat as design enhancement. |
| "The Real Question" callout on intro | No exact source equivalent | Yes, live `s1-intro` | This is editorial/adapted content. Keep only if an adapted prototype is acceptable. |
| Extra "takeaway" callouts | No exact source equivalent | Yes, several live pages | Treat as editorial additions. They should not replace source content. |
| Additional checks for complex outputs: context, confidentiality, citations | Not in page 61 as written, though confidentiality appears elsewhere | Yes, `s7-checklist` | Keep as optional enhancement, but restore the source checklist first. |

## Highest-Risk Missing Areas

These are the most important missing areas because they are in the source document and are not adequately covered elsewhere in the live website.

| Priority | Missing area | Why it matters |
|---:|---|---|
| 1 | Data and Confidentiality | Core professional risk topic. Not meaningfully covered in live playbook. |
| 2 | Legal Responsibility Does Not Change | Important accountability message. Not live. |
| 3 | Common AI Failure Modes | Needed to help users understand AI risks. Not live. |
| 4 | Avoiding Over-Reliance on AI | Important human judgement guardrail. Not live. |
| 5 | Evidence Trail and File Note Template | Needed for auditability and responsible AI use. Not live. |
| 6 | Red-Team Exercise | Practical safety exercise. Not live. |
| 7 | Agent Controls Checklist | Important for agent governance. Not live. |
| 8 | Pricing pages 43 and 46-50 | The pricing argument is incomplete without them. |
| 9 | 90-day follow-through pages 54-58 | The adoption plan currently lacks rhythm, metrics, stop-doing, strategy, and maturity assessment. |
| 10 | Section 7 templates 62-65 | The practical tools section is incomplete. |

## Practical Decision Rules

Use these rules before adding new pages:

1. If the content exists in the source document and is not live anywhere, restore it.
2. If the content exists in the source document and is partly live, expand the existing live page before creating a duplicate page.
3. If the content exists only in unused `Section1.tsx` to `Section7.tsx`, mark it as "exists in repo but not live" until migrated.
4. If the content is a repeated source theme, preserve the different purpose of each occurrence.
5. If the content is not in the source document, treat it as a product/design enhancement, not a source restoration requirement.

## Bottom-Line Verdict

The original source document has repeated themes, but they mostly serve different purposes: teaching page, practical exercise, template, checklist, or glossary.

The live website is still missing many real source-document areas. The most important gaps are professional guardrails, agent controls, pricing exercises, 90-day adoption follow-through, and Section 7 templates.

Some items that look missing are already partly covered elsewhere, but they are often shortened. These should be expanded or clearly merged rather than duplicated.

Items such as certificates, persistence, progress tracking, print/download behaviour, and images are not in the original Word/source playbook. They should be handled as web product features, not content fidelity gaps.
