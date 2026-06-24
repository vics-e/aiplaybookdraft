# Activity Variety Plan

This document reviews every activity page in the playbook and separates three different problems that can easily get mixed together:

- genuine functionality issues
- repetitive but working activities
- pages that would be more valuable if they produced a reusable output

Source of truth for activity inventory: `docs/page-audit.md`

Additional review inputs:

- `docs/clickthrough-notes-2026-06-24.md`
- `docs/activity-functionality-review.md`
- `docs/design-references/activity-treatment-selector-v3-fixed.html`
- `docs/design-references/workflow-mapper.jsx`
- `docs/design-references/agent-spec-wizard.jsx`
- `https://thariqs.github.io/html-effectiveness/`
- `https://thariqs.github.io/html-effectiveness/08-prototype-interaction.html`
- `https://thariqs.github.io/html-effectiveness/10-svg-illustrations.html`
- `https://thariqs.github.io/html-effectiveness/13-flowchart-diagram.html`
- `https://thariqs.github.io/html-effectiveness/15-research-concept-explainer.html`
- `https://thariqs.github.io/html-effectiveness/20-editor-prompt-tuner.html`

These references can be copied or closely adapted where they are the best fit, but the final implementation should still be rebuilt inside the existing React/Tailwind/localStorage playbook structure, use approved playbook wording, and feel native to this app rather than like disconnected mini-apps.

## 1. Full page-by-page activity map

| Page | Title | Current type | Category | Current issue | Why this feels repetitive, weak, broken, or fine | Recommended treatment | Useful output? | Priority | Reference |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 3 | The Shift to AI-Assisted Firms | `multi-question` | `repetitive but functional` | Standard reflection textarea pair | Good prompt, but no artifact beyond reflection | Keep textarea reflection; only revisit if section-level reflection styling is standardised later | No - reflection only | Park | None |
| 4 | The Three Stages of AI | `dropdown` | `keep as-is` | Simple single-select | Low-friction self-assessment already fits the page | Keep as-is | No - self-identification only | Park | None |
| 6 | Where AI Works Best | `task-classification` | `keep as-is` | Works and already has mixed controls | One of the better early-page activity formats already | Keep as-is | Yes - rough task inventory | Park | None |
| 7 | The Capacity Opportunity | `multi-question` | `repetitive but functional` | Three more reflection boxes | Useful thinking prompt, but format is familiar by this point | Keep content; only refresh if a shared reflection-card treatment is introduced | No - reflection only | Park | None |
| 8 | The New Role of the Accountant | `multi-question` | `repetitive but functional` | Standard two-answer reflection | Works, but does not create anything reusable | Keep as-is | No - reflection only | Park | None |
| 9 | The Human-in-the-Loop Model | `text` | `quick visual polish` | Single textarea is fine, surrounding model could feel more alive | The activity itself is not broken; the page could better teach the three-step flow | Keep the input; consider a lightweight framework visual later | Yes - review rule sentence | V2 | `13-flowchart-diagram.html` |
| 10 | Professional Ethics and Responsibility in an AI World | `multi-question` | `repetitive but functional` | Standard three-answer reflection | Content is important, but interaction is generic | Keep as-is | No - reflection only | Park | None |
| 11 | Data and Confidentiality in an AI World | `multi-question` | `repetitive but functional` | Standard three-answer reflection | Good prompt, no distinct output needed | Keep as-is | No - reflection only | Park | None |
| 12 | Legal Responsibility Does Not Change | `multi-question` | `repetitive but functional` | Standard three-answer reflection | Works, but does not need a custom pattern | Keep as-is | No - reflection only | Park | None |
| 13 | The Real Risk: AI Without Process | `yes-no` | `quick visual polish` | Yes/no works, but surrounding explanation feels static | The decision interaction is fine; the teaching layer is what feels dead | Keep yes/no; add reveal-card or animated response only if a reusable pattern exists | Yes - simple confidence signal | V2 | `activity-treatment-selector-v3-fixed.html` |
| 14 | The Minimum AI Policy | `fill-gaps` | `should become a more useful interactive activity` | Fill-gaps is useful but stops short of generating a usable policy line | This page should create a copyable starter rule, not just collect fragments | Turn into a small policy builder with live populated preview and copyable output | Yes - copyable minimum AI policy statement | V1.5 | `20-editor-prompt-tuner.html` |
| 15 | Common AI Failure Modes | `multi-question` | `repetitive but functional` | Reflection-only | Fine as a thinking checkpoint | Keep as-is | No - reflection only | Park | None |
| 16 | Avoiding Over-Reliance on AI | `multi-question` | `quick visual polish` | Input works, supporting list feels static | More of a presentation issue than a broken activity | Keep activity; optionally pair with reveal cards later | No - reflection only | Park | `activity-treatment-selector-v3-fixed.html` |
| 18 | Creating an AI Evidence Trail | `multi-question` | `quick visual polish` | Works, but "what to document" feels static | The activity is usable; the surrounding teaching treatment is the weak part | Keep the input; add checklist/reveal support only if reused elsewhere | Yes - documentation rule | V2 | `activity-treatment-selector-v3-fixed.html` |
| 19 | The Red-Team Exercise | `multi-question` | `repetitive but functional` | Standard three-answer reflection | Exercise is conceptually strong but still just textarea capture | Keep as-is | No - reflection only | Park | None |
| 20 | Where Assistants Help | `multi-question` | `repetitive but functional` | Standard two-answer reflection | Works, but no reusable artifact | Keep as-is | No - reflection only | Park | None |
| 21 | Assistants vs Agents: The New Way Work Gets Done | `multi-question` | `repetitive but functional` | Standard three-answer reflection | Good thinking prompt, not broken | Keep as-is | No - reflection only | Park | None |
| 22 | Where Agents Transform Work | `checkbox-tasks` | `should become a more useful interactive activity` | Checklist works, but the candidate-screening concept deserves a clearer scoring treatment | This is a strong decision page and should help users shortlist candidate workflows, not just tick boxes | Upgrade to interactive cards or candidate scorecards with visible fit criteria and prioritised result | Yes - shortlist of strongest agent candidates | V1 | `activity-treatment-selector-v3-fixed.html` |
| 23 | The Core Agent Workflows in a Firm | `multi-question` | `repetitive but functional` | Standard three-answer reflection | More useful as a follow-on after better workflow mapping elsewhere | Keep as-is for now | No - reflection only | Park | None |
| 24 | The Workflow Map: Where Agents Work Best | `multi-question` | `should become a more useful interactive activity` | Current activity asks for workflow mapping but does not actually map anything on screen | This page is central and should build a real workflow view, not just capture notes | Upgrade to workflow builder / mapper with scoring and plotting | Yes - prioritised workflow map with top agent candidates | V1 | `workflow-mapper.jsx`, `13-flowchart-diagram.html` |
| 25 | How to Choose Your First Agent | `multi-question` | `repetitive but functional` | Standard three-answer decision prompt | Works, but would benefit more after page 22/24 patterns land | Keep for now, revisit after workflow/candidate tools exist | Yes - first-agent decision rationale | V1.5 | `activity-treatment-selector-v3-fixed.html` |
| 26 | The Agent Maturity Ladder | `multi-question` | `should become a more useful interactive activity` | Maturity concept is stronger than the plain textareas | This is a framework page that should feel like exploration, not just note-taking | Turn into confidence / maturity slider with stage detail and next-step summary | Yes - stage assessment and next move | V1.5 | `activity-treatment-selector-v3-fixed.html` |
| 27 | The Agent Spec Template | `spec-form` | `repetitive but functional` | Structured form works, but overlaps with page 55's higher-value template | It is usable now; the richer wizard pattern should be reserved for the later, fuller spec page | Keep current form until page 55 pattern is established | Yes - draft first-agent spec | Park | `agent-spec-wizard.jsx` |
| 28 | The Agent Controls Checklist | `checkbox-tasks` | `keep as-is` | Already more varied than textarea-heavy pages | This page benefits from staying simple and checklist-like | Keep as-is | Yes - controls checklist | Park | None |
| 29 | Building Confidence in Agents | `multi-question` | `repetitive but functional` | Good content, familiar format | Better solved with shared styling than a bespoke activity | Keep content; optionally move to checklist-style reflection later | Yes - confidence-building plan | V1.5 | `activity-treatment-selector-v3-fixed.html` |
| 30 | The AI-Enabled Workflow | `multi-question` | `should become a more useful interactive activity` | Core workflow page is only textarea-based today | This is central to the playbook and should let users shape a before/after process | Upgrade to workflow builder or before/after comparison with copyable workflow summary | Yes - AI-enabled workflow draft | V1 | `workflow-mapper.jsx`, `08-prototype-interaction.html`, `13-flowchart-diagram.html` |
| 31 | The Accountant's Prompt Framework | `multi-question` | `repetitive but functional` | Framework practice works, but page 35 now carries the richer prompt interactivity | The prompt area already has a stronger interactive page elsewhere | Keep as-is | Yes - improved prompt examples | Park | `20-editor-prompt-tuner.html` |
| 32 | The Five Prompt Types Every Accountant Should Know | `multi-question` | `repetitive but functional` | Multiple short answers, but still basically prompt practice | Serviceable now that page 35 handles richer prompt interaction | Keep as-is | Yes - prompt examples by type | Park | None |
| 33 | Prompt Practice: From Basic to Structured | `multi-question` | `repetitive but functional` | Practice page works, but remains text-only | Good enough after page 35 upgrade | Keep as-is | Yes - before/after prompt practice | Park | None |
| 34 | From Prompts to Workflows to Agents | `multi-question` | `should become a more useful interactive activity` | Important concept page still feels static | This page should help users understand progression, not just answer prompts | Use framework visual or path chooser showing prompt -> workflow -> agent progression | Yes - chosen progression path and next step | V1.5 | `15-research-concept-explainer.html`, `activity-treatment-selector-v3-fixed.html` |
| 35 | Your Starter Prompt Library | `multi-question` | `broken already fixed` | Previously weak/broken, now upgraded and functional | The page already has prompt cards, variables, personalisation, filter, preview, and copy | Keep current implementation; only minor polish later if needed | Yes - personalised copyable prompts | V1.5 | `20-editor-prompt-tuner.html` |
| 36 | Understanding the AI Dividend | `list` | `keep as-is` | Simple numbered inputs work | Output is already clear and concise | Keep as-is | Yes - numbered AI dividend list | Park | None |
| 37 | The Capacity Question | `multi-question` | `repetitive but functional` | Reflection-only | Works, but familiar | Keep as-is | No - reflection only | Park | None |
| 38 | Why Time-Based Pricing Becomes Unstable | `multi-question` | `repetitive but functional` | Standard three-answer reflection | Good learning prompt, no special artifact needed | Keep as-is | No - reflection only | Park | None |
| 39 | The Four Pricing Models in an AI World | `multi-question` | `should become a more useful interactive activity` | Pricing-model comparison is stronger than a plain textarea review | This should feel comparative and evaluative, not just reflective | Upgrade to comparison cards or path chooser with a recommended pricing direction | Yes - preferred pricing model rationale | V1.5 | `activity-treatment-selector-v3-fixed.html`, `15-research-concept-explainer.html` |
| 40 | The Shift from Effort to Judgement | `list` | `broken already fixed` | Activity renderer was broken; now fixed | Inputs now work, but the page could still be richer later | Keep the fixed list; only revisit if pricing framework pages get a shared upgrade pattern | Yes - three judgment/value examples | V1.5 | `activity-treatment-selector-v3-fixed.html` |
| 41 | The 3V Pricing Framework | `multi-question` | `should become a more useful interactive activity` | Strong framework, weak interaction | Framework content should be explored/applied visually | Turn into framework visual with guided application and summary output | Yes - filled 3V assessment summary | V1.5 | `15-research-concept-explainer.html`, `10-svg-illustrations.html` |
| 42 | Designing AI-Era Service Packages | `multi-question` | `should become a more useful interactive activity` | Package design content is too text-heavy for the concept | This page naturally fits structured package comparison/building | Upgrade to comparison cards or package builder with copyable tier summary | Yes - draft service package structure | V1.5 | `activity-treatment-selector-v3-fixed.html` |
| 43 | The AI Impact Pricing Exercise | `spec-form` | `should become a more useful interactive activity` | Structured worksheet is usable but dull for a high-value output page | This page should produce something users can reuse directly after completion | Upgrade to guided worksheet / summary builder with copyable pricing output | Yes - copyable AI impact pricing worksheet summary | V1 | `activity-treatment-selector-v3-fixed.html` |
| 44 | Talking to Clients About AI | `multi-question` | `repetitive but functional` | Works, but output could be more directly usable | Still usable now; copyable messaging can wait until pricing/package work lands | Keep as-is for now | Yes - draft client message | V2 | `20-editor-prompt-tuner.html` |
| 45 | Pricing Action Checklist | `checkbox-tasks` | `keep as-is` | Already action-oriented and structured | The checklist format matches the page well | Keep as-is | Yes - action checklist | Park | None |
| 46 | The First 30 Days: Build the Foundations | `checkbox-tasks` | `repetitive but functional` | Useful, but same family as later action-plan pages | Better solved as a reusable roadmap pattern across pages 46-48 | Later upgrade all three pages together if prioritised | Yes - 30-day action plan | V1.5 | `activity-treatment-selector-v3-fixed.html`, `08-prototype-interaction.html` |
| 47 | Days 31–60: Move from Prompts to Workflows | `checkbox-tasks` | `repetitive but functional` | Useful, but same family as 46 and 48 | Works now; stronger if upgraded as one roadmap set | Upgrade later as a shared timeline/checklist pattern with 46 and 48 | Yes - 60-day action plan | V1.5 | `activity-treatment-selector-v3-fixed.html`, `08-prototype-interaction.html` |
| 48 | Days 61–90: Introduce Your First Agent | `checkbox-tasks` | `broken already fixed` | Workflow/takeaway linkage was broken and is now fixed | Functional now, but still part of a repetitive 46-48 trio | Keep current fix; consider shared roadmap treatment later | Yes - 90-day plan plus first-agent workflow | V1.5 | `activity-treatment-selector-v3-fixed.html`, `08-prototype-interaction.html` |
| 49 | The AI Enablement Rhythm | `multi-question` | `should become a more useful interactive activity` | Roles/rhythm concept wants a clearer operational view | Better as an operating rhythm or role-flow visual than plain notes | Upgrade to flow or rhythm builder with role ownership summary | Yes - meeting rhythm and role ownership summary | V1.5 | `13-flowchart-diagram.html`, `10-svg-illustrations.html` |
| 50 | The AI Scorecard | `multi-question` | `repetitive but functional` | Simple metrics choice prompt | Fine as-is; stronger work happens on output-heavy pages first | Keep as-is | Yes - chosen metrics | Park | None |
| 51 | The Stop-Doing List | `multi-question` | `repetitive but functional` | Straightforward note capture | Works and intentionally stays simple | Keep as-is | Yes - stop-doing list | Park | None |
| 52 | Three Strategic Questions for the AI-Ready Firm | `multi-question` | `repetitive but functional` | Reflection-only | Important questions, but no special UI required | Keep as-is | No - reflection only | Park | None |
| 53 | The Four Stages of the AI-Ready Firm | `multi-question` | `repetitive but functional` | Stage reflection works, but shares format fatigue | Enough for now, especially if page 26 matures first | Keep as-is | Yes - stage self-assessment | Park | None |
| 54 | AI Acceptable Use Policy (Starter Template) | `multi-question` | `should become a more useful interactive activity` | Page should help users adapt policy choices into something reusable | This page naturally fits side-by-side comparison and policy adaptation output | Upgrade to comparison cards plus summary builder for approved/restricted use choices | Yes - adapted acceptable use policy notes | V1.5 | `activity-treatment-selector-v3-fixed.html`, `15-research-concept-explainer.html` |
| 55 | Agent Specification Template | `spec-form` | `should become a more useful interactive activity` | Form works, but this is one of the clearest candidates for a guided wizard | High-value artifact page; should feel deliberate and exportable | Upgrade to agent spec wizard with steps, progress, review, and copyable final spec | Yes - complete agent specification | V1 | `agent-spec-wizard.jsx` |
| 56 | AI Output Review Checklist | `multi-question` | `keep as-is` | One-answer implementation prompt | The page's main value is the embedded checklist above it, not a complex activity | Keep as-is | Yes - checklist embedding note | Park | None |
| 57 | AI Tool Usage Matrix | `multi-question` | `should become a more useful interactive activity` | Current questions are usable but do not actually build a matrix | This page should generate a practical governance artifact, not only notes | Upgrade to matrix builder with copyable usage policy output | Yes - AI tool usage matrix | V1 | `activity-treatment-selector-v3-fixed.html` |
| 58 | AI File Note Template | `multi-question` | `should become a more useful interactive activity` | Current page captures policy notes but does not generate a strong template output | Better as a small template builder or copyable note pattern | Upgrade later to summary builder with copyable file note template | Yes - copyable AI file note template | V2 | `20-editor-prompt-tuner.html` |
| 59 | Client AI Communication Template | `multi-question` | `should become a more useful interactive activity` | Current activity works, but the page is really about generating usable communication copy | Better as a builder with live output than a plain textarea | Upgrade later to copyable statement builder | Yes - client AI statement | V2 | `20-editor-prompt-tuner.html` |
| 61 | Building Your AI-Ready Firm | `text` | `keep as-is` | Single closing prompt works well | Final page should stay lightweight | Keep as-is | Yes - next-step statement | Park | None |
| 63 | Completion Certificate | `multi-question` | `broken already fixed` | Previously broken print/certificate flow is now implemented | The certificate now works; further work is polish only | Keep current certificate flow | Yes - personalised downloadable certificate | Park | None |

## 2. Recommended V1 shortlist

These are the best 4 to 6 upgrades for V1 because they either create high-value outputs, unlock reusable patterns, or sit at the heart of the playbook journey. Page 35 is intentionally not included because it is already functional.

| Page | Why this page made V1 | Treatment to use | Reference / mock-up to use | Useful output created | Implementation complexity |
| ---: | --- | --- | --- | --- | --- |
| 22 | Early, high-value decision page that can help users identify what work is genuinely agent-ready | Interactive cards + checklist scorecard | `activity-treatment-selector-v3-fixed.html` | Prioritised shortlist of strong agent candidates | Medium |
| 24 | Central workflow page currently asks users to map workflows without actually mapping them | Workflow builder / workflow mapper | `workflow-mapper.jsx`, `13-flowchart-diagram.html` | Prioritised workflow map with top opportunities | Medium |
| 30 | Core transformation page should let users shape an AI-enabled workflow rather than only describe it | Workflow builder + before/after comparison | `workflow-mapper.jsx`, `08-prototype-interaction.html`, `13-flowchart-diagram.html` | AI-enabled workflow draft and before/after summary | Medium |
| 43 | Strong candidate for a more useful, reusable pricing artifact | Guided worksheet + summary builder | `activity-treatment-selector-v3-fixed.html` | Copyable AI impact pricing worksheet summary | Medium |
| 55 | One of the highest-value practical deliverables in the playbook and the best fit for a wizard pattern | Agent spec wizard | `agent-spec-wizard.jsx` | Complete copyable/exportable agent specification | High |
| 57 | Governance page should create a real usable matrix, not just note fields | Matrix builder + copyable output | `activity-treatment-selector-v3-fixed.html` | Copyable AI tool usage matrix | Medium |

## 3. V1.5 list

These are worthwhile next, but either depend on patterns from V1, are more polish-oriented, or are less central than the shortlist above.

- **p14 - The Minimum AI Policy**
  - Turn the fill-gaps activity into a live policy builder with copyable output.
- **p25 - How to Choose Your First Agent**
  - Improve after page 22 and page 24 patterns exist, so it can consume shortlist/map decisions.
- **p26 - The Agent Maturity Ladder**
  - Best revisited as a slider or maturity explorer once a framework visual pattern exists.
- **p29 - Building Confidence in Agents**
  - Good candidate for a checklist-led plan once a reusable checklist summary pattern is established.
- **p34 - From Prompts to Workflows to Agents**
  - Strong concept page for a progression/path visual, but not as urgent as workflow/pricing/spec outputs.
- **p35 - Your Starter Prompt Library**
  - Functional now; only polish or refinement later, not a V1 priority.
- **p39 - The Four Pricing Models in an AI World**
  - Good candidate for comparison cards or path-chooser once pricing pages are upgraded.
- **p41 - The 3V Pricing Framework**
  - Upgrade after page 43 if a reusable framework visual pattern is needed.
- **p42 - Designing AI-Era Service Packages**
  - Good package-builder candidate, but can follow pricing worksheet improvements.
- **p46 - The First 30 Days: Build the Foundations**
  - Upgrade later as part of a shared 30/60/90 roadmap pattern.
- **p47 - Days 31–60: Move from Prompts to Workflows**
  - Same roadmap-family upgrade as page 46.
- **p48 - Days 61–90: Introduce Your First Agent**
  - Functionality is fixed; only revisit when the shared roadmap pattern is built.
- **p49 - The AI Enablement Rhythm**
  - Strong fit for a role/rhythm visual once flowchart/diagram treatments are in use.
- **p54 - AI Acceptable Use Policy (Starter Template)**
  - Worth upgrading after policy/matrix patterns are stronger.

## 4. Park list

These pages are either already varied enough, primarily reflective, or not worth a bespoke upgrade in the near term.

- **Keep as-is / Park**
  - p4, p6, p28, p36, p45, p56, p61
- **Repetitive but functional / Park**
  - p3, p7, p8, p10, p11, p12, p15, p19, p20, p21, p23, p31, p32, p33, p37, p38, p50, p51, p52, p53
- **Quick visual polish or later V2 only**
  - p9, p13, p16, p18, p44, p58, p59
- **Broken already fixed and now stable**
  - p40, p63

## Notes on prioritisation

- The playbook does **not** need every textarea page redesigned.
- V1 should focus on reusable patterns that create outputs people can actually use after the course.
- Workflow, matrix, pricing, and agent-spec patterns have better reuse potential than one-off cosmetic upgrades.
- Page 35 should stay out of V1 because it is already functional and materially improved.
