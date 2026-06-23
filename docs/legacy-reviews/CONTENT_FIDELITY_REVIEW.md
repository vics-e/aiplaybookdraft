# Content Fidelity Review

## 1. Executive Summary

This review compares `src/imports/ai-playbook-accountants.txt` with the live React website content.

The live website is **not a faithful 1:1 digital version** of the imported playbook text. It is a shortened, reworded, rearranged, and partially merged interactive version of the source playbook.

The imported source text contains a 66-page playbook. The live React website contains 32 playbook entries in `src/app/data/playbookData.ts`, including the cover, contents page, activity summary, and conclusion-style pages. Many source pages are missing entirely. Many included pages are condensed or rewritten. Several source pages are merged into one React page, and some content is moved to different sections.

The live routed website uses:

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`
- `src/app/data/playbookData.ts`

The older files `Hero.tsx`, `TableOfContents.tsx`, and `Section1.tsx` to `Section7.tsx` are present in the repo but are not used by the live router.

## 2. Page-By-Page Map

| Source text page | Source title | React data id | Rendered by |
|---|---|---|---|
| Front contents | Contents | `contents` | `PageContent` contents view |
| Page 1 | Cover | `cover` | `PageContent` cover view |
| Page 2 | Introduction: The Shift to AI-Assisted Firms | `s1-intro` | `PageContent` |
| Page 3 | The Three Stages of AI in Accountancy | `s1-stages` | `PageContent` |
| Page 4 | The Sage AI Practice Framework | `s1-framework` | `PageContent` |
| Page 5 | Where AI Works Best | `s1-where` | `PageContent` |
| Page 6 | The Capacity Opportunity | `s1-capacity` | `PageContent` |
| Page 7 | Assistants vs Agents: The New Way Work Gets Done | `s3-difference` | `PageContent` |
| Page 8 | The Role of the Accountant in an AI Firm | `s1-role` | `PageContent` |
| Page 9 | Professional Ethics and Responsibility in an AI World | Partial overlap with `s2-principles` | `PageContent` |
| Page 10 | The Human-in-the-Loop Model | `s1-human-loop` | `PageContent` |
| Page 11 | Professional Principles for AI in Accountancy | `s2-principles` | `PageContent` |
| Page 12 | The Real Risk: AI Without Process | `s2-risk` | `PageContent` |
| Page 13 | The Minimum AI Policy Every Firm Needs | `s2-policy` | `PageContent` |
| Page 14 | Data and Confidentiality in an AI World | No live page | N/A |
| Page 15 | Legal Responsibility Does Not Change | No live page | N/A |
| Page 16 | Common AI Failure Modes | No live page | N/A |
| Page 17 | Avoiding Over-Reliance on AI | No live page | N/A |
| Page 18 | The Four Output Checks | `s2-checks` | `PageContent` |
| Page 19 | Creating an AI Evidence Trail | No live page | N/A |
| Page 20 | The Red-Team Exercise | No live page | N/A |
| Page 21 | Where Assistants Help | No live page | N/A |
| Page 22 | Where Agents Transform Work | `s3-where-agents` | `PageContent` |
| Page 23 | The Core Agent Workflows in a Firm | `s3-workflows` | `PageContent` |
| Page 24 | The Agent Maturity Ladder | `s3-maturity` | `PageContent` |
| Page 25 | The Workflow Map: Where Agents Work Best | Partly compressed into `s3-where-agents` | `PageContent` |
| Page 26 | How to Choose Your First Agent | Partly compressed into `s3-workflows` | `PageContent` |
| Page 27 | Agent Example: Quarterly Update Preparation | Partly compressed into `s3-workflows` | `PageContent` |
| Page 28 | Agent Example: Period-End Preparation | Partly compressed into `s3-workflows` | `PageContent` |
| Page 29 | Agent Example: Client Onboarding | Partly compressed into `s3-workflows` | `PageContent` |
| Page 30 | Agent Example: Client Chaser | Partly compressed into `s3-workflows` | `PageContent` |
| Page 31 | The Agent Spec Template | `s3-spec` | `PageContent` |
| Page 32 | The Agent Controls Checklist | No live page | N/A |
| Page 33 | Building Confidence in Agents | `s3-confidence` | `PageContent` |
| Page 34 | The New Role of the Accountant | Partial overlap with `s1-role` | `PageContent` |
| Page 35 | The AI-Enabled Workflow | No live page | N/A |
| Page 36 | The Accountant's Prompt Framework | `s4-framework` | `PageContent` |
| Page 37 | The Five Prompt Types Every Accountant Should Know | `s4-types` | `PageContent` |
| Page 38 | Prompt Practice: From Basic to Structured | No live page | N/A |
| Page 39 | From Prompts to Workflows to Agents | `s4-progression` | `PageContent` |
| Page 40 | Your Starter Prompt Library | No live page | N/A |
| Page 41 | The AI Dividend | `s5-dividend` | `PageContent` |
| Page 42 | The Capacity Question | Partly folded into `s1-capacity` / `s5-dividend` | `PageContent` |
| Page 43 | Why Time-Based Pricing Becomes Unstable | No live page | N/A |
| Page 44 | The Four Pricing Models in an AI World | `s5-pricing` | `PageContent` |
| Page 45 | The Shift from Effort to Judgement | `s5-shift` | `PageContent` |
| Page 46 | The 3V Pricing Framework | No live page | N/A |
| Page 47 | Designing AI-Era Service Packages | No live page | N/A |
| Page 48 | The AI Impact Pricing Exercise | No live page | N/A |
| Page 49 | Talking to Clients About AI | No live page | N/A |
| Page 50 | Pricing Action Checklist | No live page | N/A |
| Page 51 | The First 30 Days: Build the Foundations | `s6-days1-30` | `PageContent` |
| Page 52 | Days 31-60: Move from Prompts to Workflows | `s6-days31-60` | `PageContent` |
| Page 53 | Days 61-90: Introduce Your First Agent | `s6-days61-90` | `PageContent` |
| Page 54 | The AI Enablement Rhythm | No live page | N/A |
| Page 55 | The AI Scorecard | No live page | N/A |
| Page 56 | The Stop-Doing List | No live page | N/A |
| Page 57 | Three Strategic Questions for the AI-Ready Firm | No live page | N/A |
| Page 58 | The Four Stages of the AI-Ready Firm | No live page | N/A |
| Page 59 | AI Acceptable Use Policy (Starter Template) | `s7-policy` | `PageContent` |
| Page 60 | Agent Specification Template | Partial overlap with `s3-spec` | `PageContent` |
| Page 61 | AI Output Review Checklist | `s7-checklist` | `PageContent` |
| Page 62 | AI Tool Usage Matrix | No live page | N/A |
| Page 63 | AI File Note Template | No live page | N/A |
| Page 64 | Client AI Communication Template | No live page | N/A |
| Page 65 | AI Glossary | No live page | N/A |
| Page 66 | Back cover | Adapted into `s7-finish` | `PageContent` |
| React-only | Activity Summary | `activity-summary` | `ActivitySummary` |

## 3. Pages Where Source Text And Website Text Do Not Match

The cover page is broadly close in intent, but most other mapped pages differ from the source text.

Common mismatch types:

- Source pages are shortened into shorter summaries.
- Paragraphs are rewritten in a more concise marketing or interactive style.
- Full pages are merged into one React page.
- Some pages are moved to different sections.
- Some pages are omitted entirely.
- Some source activities are converted into different interaction types.

Major missing source pages:

- Page 14: Data and Confidentiality in an AI World
- Page 15: Legal Responsibility Does Not Change
- Page 16: Common AI Failure Modes
- Page 17: Avoiding Over-Reliance on AI
- Page 19: Creating an AI Evidence Trail
- Page 20: The Red-Team Exercise
- Page 21: Where Assistants Help
- Page 25: The Workflow Map: Where Agents Work Best
- Page 26: How to Choose Your First Agent
- Page 27: Agent Example: Quarterly Update Preparation
- Page 28: Agent Example: Period-End Preparation
- Page 29: Agent Example: Client Onboarding
- Page 30: Agent Example: Client Chaser
- Page 32: The Agent Controls Checklist
- Page 35: The AI-Enabled Workflow
- Page 38: Prompt Practice: From Basic to Structured
- Page 40: Your Starter Prompt Library
- Page 43: Why Time-Based Pricing Becomes Unstable
- Page 46: The 3V Pricing Framework
- Page 47: Designing AI-Era Service Packages
- Page 48: The AI Impact Pricing Exercise
- Page 49: Talking to Clients About AI
- Page 50: Pricing Action Checklist
- Page 54: The AI Enablement Rhythm
- Page 55: The AI Scorecard
- Page 56: The Stop-Doing List
- Page 57: Three Strategic Questions for the AI-Ready Firm
- Page 58: The Four Stages of the AI-Ready Firm
- Page 62: AI Tool Usage Matrix
- Page 63: AI File Note Template
- Page 64: Client AI Communication Template
- Page 65: AI Glossary

Major rearrangements:

- Source page 7, "Assistants vs Agents: The New Way Work Gets Done", appears later as React `s3-difference`.
- Source page 8, "The Role of the Accountant in an AI Firm", appears earlier as React `s1-role`.
- Source page 31 and source page 60 are partly merged through React `s3-spec`.
- Source page 66, "Back cover", is replaced by React `s7-finish`, a broader conclusion page.
- Several Section 3 source pages are compressed into `s3-where-agents`, `s3-workflows`, `s3-maturity`, and `s3-spec`.

## 4. Activities Or Questions Missing Or Changed

Many source activities are missing entirely.

Missing activities include:

- Data boundary exercise
- Legal awareness check
- Failure awareness exercise
- Scepticism habit
- Apply the four checks
- Build your file note rule
- Run your first red-team test
- Assistant opportunity check
- Workflow mapping exercise
- First agent decision
- Agent example activities for quarterly updates, period-end preparation, onboarding, and client chaser
- Agent Controls Checklist activity
- Future workflow activity
- Rewrite a prompt
- Prompt improvement
- Starter prompt library
- Capacity decision
- Effort vs value
- 3V exercise
- Package design
- AI impact pricing table
- Client messaging
- Pricing action checklist
- AI enablement rhythm
- AI scorecard metrics
- Stop-doing list
- Strategic questions
- Stage assessment
- AI Tool Usage Matrix activity
- AI File Note Template activity
- Client AI Communication Template activity

Changed activities include:

| Source page | Source activity | React version |
|---|---|---|
| Page 2 | Capacity reflection asks three questions plus three areas where capacity would make a difference | React asks two broader questions only |
| Page 5 | Map ten common tasks and circle three best candidates | React asks for five tasks and marks top candidates |
| Page 6 | Capacity question asks what to stop, start/improve, invest in, then write two changes | React keeps the three questions but not the "write down two changes" instruction |
| Page 8 | Role reflection asks one task to delegate to AI and one responsibility to protect | React asks two broader questions |
| Page 12 | Process confidence check is an open reflection | React changes this into a yes/no control |
| Page 23 | Choose your first agent is tied to source's broader core workflows page | React turns it into a two-question interaction about four workflows |
| Page 31 | Agent spec template has workflow name, trigger, inputs, agent steps, review point, output, escalation rules | React adds "Goal or outcome" and changes "Agent steps" to "Agent behaviour" |
| Page 51 | Source asks users to complete a sentence about using AI in the next 30 days | React asks for three actions from the page |
| Page 52 | Source asks users to complete a sentence about the first standardised workflow | React asks for three workflow candidates |
| Page 53 | Source asks users to complete a sentence about what an agent will handle by day 90 | React asks two broader planning questions |
| Page 59 | Source asks users to adapt the acceptable use policy by adding tools, review rule, and sharing it | React asks for a one-sentence AI policy |

## 5. Page Titles That Differ

Examples of changed page titles:

| Source title | React title |
|---|---|
| The Three Stages of AI in Accountancy | The Three Stages of AI |
| The Sage AI Practice Framework | The 5 Principles of AI-Ready Firms |
| The Role of the Accountant in an AI Firm | The New Role of the Accountant |
| Professional Ethics and Responsibility in an AI World | Professional Ethics & AI |
| Professional Principles for AI in Accountancy | Professional Ethics & AI |
| The Minimum AI Policy Every Firm Needs | The Minimum AI Policy |
| The Four Output Checks | The 4 Output Checks |
| Assistants vs Agents: The New Way Work Gets Done | Assistants vs Agents |
| The Core Agent Workflows in a Firm | 4 Core Agent Workflows |
| The Accountant's Prompt Framework | The Prompt Framework |
| The Five Prompt Types Every Accountant Should Know | 5 Prompt Types to Know |
| From Prompts to Workflows to Agents | From Prompts to Agents |
| The AI Dividend | Understanding the AI Dividend |
| The First 30 Days: Build the Foundations | Days 1-30: Build Foundations |
| Days 31-60: Move from Prompts to Workflows | Days 31-60: Prompts to Workflows |
| Days 61-90: Introduce Your First Agent | Days 61-90: Your First Agent |
| AI Acceptable Use Policy (Starter Template) | AI Policy Template |
| Back cover | Building Your AI-Ready Firm |

## 6. Content In The React Website That Is Not In The Source Text

The React site includes content and functionality that is not a direct 1:1 copy of the imported source text.

React-only or adapted content includes:

- The interactive sidebar navigation with page progress and section progress.
- Overall progress tracking based on visited pages.
- A React-only `ActivitySummary` page that collects, edits, and prints user responses.
- Some page-level "takeaway" callouts that condense or reframe source material.
- Several custom visual layouts and graphics, especially in `PageContent.tsx`.
- `s7-finish`, which is a conclusion-style page rather than a direct copy of source page 66.
- Condensed "4 Core Agent Workflows" content that combines several source pages into one.
- A rewritten "Building Confidence in Agents" page with shorter guidance.
- The React contents page, which presents a shortened section structure and page counts that do not match the 66-page source.

The React website also includes embedded images and visual treatments that are not part of the source text.

## 7. Verdict

This website is **not a faithful digital version** of `src/imports/ai-playbook-accountants.txt`.

It is best described as a **summarised/adapted interactive prototype** based on the imported playbook.

The core themes are represented, but the source text has been substantially shortened, reworded, removed, rearranged, and converted into a more compact interactive experience.

## 8. Recommended Next Steps

If the goal is a faithful digital version:

1. Rebuild `playbookData.ts` from the source text page by page.
2. Preserve all 66 source pages as separate React data entries.
3. Keep source page titles exactly as written unless there is an approved editorial reason to change them.
4. Preserve every activity/action prompt exactly, including sub-questions and completion instructions.
5. Add missing pages from sections 2, 3, 4, 5, 6, and 7.
6. Separate merged pages back into individual pages.
7. Use a repeatable data shape for source page number, source title, rendered title, content blocks, and activity blocks.
8. Add a review checklist before release to compare each source page against its React page.
9. Decide whether the current interactive additions, such as progress tracking and activity summary, should remain as enhancements on top of faithful source content.

If the goal is an adapted prototype:

1. Keep the current structure, but label it clearly as an adapted interactive playbook.
2. Do not describe it as a 1:1 version of the imported Word/source playbook.
3. Consider adding an editorial note explaining that the content has been condensed for web interaction.
4. Review whether any omitted compliance, ethics, confidentiality, or responsibility content must be restored for accuracy and risk reasons.
