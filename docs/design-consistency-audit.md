# Pattern-Based Design Consistency Audit

**Completed:** 8 August 2026  
**Working branch:** `codex/ai-playbook-foundations`  
**Verified production mapping:** `vics-e/aiplaybookdraft` `main` at `2b9431f` → `https://aiplaybook-ve.vercel.app/`

## Executive summary

The playbook has a recognisable and generally strong visual foundation: a dark workbook shell, clear desktop navigation, bold headings, Sage green accents, persistent progress, and several genuinely useful advanced activities. The consistency problem is not that all 63 pages need individual redesigns. It is that a small set of shared patterns has accumulated many page-specific variants inside one 6,055-line renderer.

The best next move is to standardise the shell, typography, spacing, colour roles, containers, activity controls and output treatment once, then reuse those decisions. Bespoke experiences should remain only where the interaction warrants them. The most urgent issue is the mobile shell: at a 390 × 844 test viewport the default-open 320px sidebar pushed the main content to `left: 320px`, created a 751px document width for a 375px viewport, and produced horizontal scrolling.

No approved playbook wording was changed during this audit.

## Evidence and method

This was a pattern audit, not a 63-page visual diary.

- Reused `docs/page-audit.md`, `docs/clickthrough-notes-2026-06-24.md`, `docs/activity-variety-plan.md`, `docs/activity-functionality-review.md`, and the relevant responsiveness, project, asset, progress and certificate legacy reviews.
- Statistically inspected all 63 entries in `src/app/data/playbookData.ts` and the conditional render branches in `src/app/components/PageContent.tsx`.
- Visually inspected 14 representative production pages: 1, 2, 3, 5, 10, 24, 35, 41, 43, 55, 57, 60, 62 and 63.
- Checked the desktop shell and a 390 × 844 mobile viewport. No browser console errors appeared during the sample.

### Pattern inventory

| Signal | Evidence | Meaning |
| --- | ---: | --- |
| Page types | 60 content, 1 cover, 1 contents, 1 summary | A shared content-page system can cover most of the product. |
| Content blocks | 262 across 7 block types | Text, boxes, highlights and numbered lists form the main reusable language. |
| Activities | 57 activity pages; 40 use `multi-question` | About 70% of activities use the same reflection family; variety should be selective. |
| Images | 9 pages | One shared image recipe can resolve most crop/loading inconsistency. |
| Green content boxes | 43 blocks across 40 pages | Green is doing too many jobs and loses emphasis through repetition. |
| Dense pages | 28 pages contain at least 5 content blocks | Progressive layout rules matter more than isolated page polish. |
| Renderer exceptions | 38 `page.id` comparisons covering 17 unique page IDs | One-off treatments are embedded in the shared renderer and are hard to keep aligned. |
| Green implementation | 479 `#00DC51` occurrences in `PageContent.tsx` | Colour roles are encoded ad hoc rather than through a small token system. |

## Findings by action

### Keep

- **Desktop workbook shell and progress model.** The fixed navigation, section grouping, visited state and previous/next controls make the long playbook understandable.
- **Core content hierarchy.** Section chip → page title → subtitle → content → activity → takeaway is a clear recurring sequence.
- **Simple activities that match the learning goal.** Dropdown, yes/no, short reflection, task classification and checklists do not need bespoke redesign merely for variety.
- **Advanced patterns with a real purpose.** The workflow map (24), prompt library (35), agent-spec wizard (55), tool matrix (57), glossary lab (60), activity summary (62) and certificate (63) justify specialist interaction.
- **Local persistence and completion flow.** Saved answers, progress, summary and certificate create continuity and should survive any visual refactor.

### Standardise

- **Typography:** define responsive title, subtitle, body, label and helper-text styles. Long titles currently rely on page-specific wrapping and oversized desktop values.
- **Spacing and containers:** reduce the mix of 20/24/28/32px radii, border strengths, padding scales and shadow treatments to a small card taxonomy: content, emphasis, activity and output.
- **Green usage:** reserve bright green for current navigation, primary actions, progress, focus and success. Use neutral borders/backgrounds for ordinary content; avoid stacking green chip + green border + green number + green panel on the same viewport.
- **Activity frame:** give all activity types the same header, instruction, save state, validation/focus state and footer/action placement. Specialist tools can vary internally while keeping the same frame.
- **Outputs:** standardise preview, copy, download/print and “saved” feedback so useful artifacts feel related across workflow, pricing, policy, agent and matrix builders.
- **Navigation and accessibility:** add accessible names to the sidebar toggle and page-dot buttons, visible keyboard focus, reliable control labels, and a minimum contrast rule for muted text and placeholders.

### Minor polish

- **Contents page:** keep the two-column desktop roadmap, but make its entrance motion subtler and ensure the cards have consistent heights. Stack it at narrow widths.
- **Images:** use one aspect-ratio/crop rule, stable dimensions, lazy loading below the fold and optimised assets. This addresses the earlier grainy/slow-image notes without changing content.
- **Repeated card groups:** equalise heights and internal alignment for workflow/package/policy comparisons, including the issues previously noted around pages 23 and 54.
- **30/60/90 pages:** treat pages 46–48 as one roadmap family rather than polishing each independently.
- **Hover and muted states:** ensure hover is additive, not the only way to reveal structure, and review the low-emphasis text used in dense tools such as page 35.

### Redesign

- **Responsive shell:** on small screens the sidebar should be a closed-by-default overlay/drawer; the main content must not retain `ml-80`; padding should step from compact mobile values to the existing desktop spacing. This is a shared fix for all pages.
- **High-value output family:** pages 22, 24, 30 and 43 should converge on reusable shortlist/workflow/worksheet/output primitives instead of separate form layouts. Page 43 currently presents 15 textareas but no equally strong reusable result view.
- **Mobile advanced activities:** workflow mapping, wizard steps, matrix rows and certificate actions need responsive control grouping, touch targets and overflow checks as one system.
- **Renderer structure:** extract shared content blocks, the activity frame and specialist tools from `PageContent.tsx`. The current 17 page-specific IDs and 38 comparisons make design consistency costly to maintain.

### Outlier / separate review

- **Cover and contents (1–2):** intentionally editorial and navigation-led; keep separate templates but apply the same responsive type and spacing tokens.
- **Workflow map (24), prompt library (35), agent spec (55), tool matrix (57) and glossary (60):** justified specialist tools. Review them as a family for shared framing, controls, outputs and mobile behavior rather than forcing one identical layout.
- **Summary and certificate (62–63):** completion surfaces have different goals from learning pages. Keep their specialist layouts, but align action labels, progress meaning, print behavior and accessibility.

## Ranked shared recommendations

| Rank | Recommendation | Impact | Effort | Reuse |
| ---: | --- | --- | --- | --- |
| 1 | Make the sidebar a mobile overlay, remove the mobile content offset, and introduce responsive page padding | Critical | Medium | All 63 pages |
| 2 | Add accessible names/focus states for navigation, page dots and activity controls | High | Low–Medium | Whole application |
| 3 | Define shared type, spacing, radius, border and colour-role tokens | High | Medium | All content and activities |
| 4 | Create one content-card taxonomy and reduce routine green borders/backgrounds | High | Medium | 40+ pages |
| 5 | Create one activity frame with consistent labels, inputs, saved state and actions | High | Medium | 57 activity pages |
| 6 | Create reusable output-preview/copy/print primitives | High | Medium | Workflow, pricing, policy, agent and matrix pages |
| 7 | Extract specialist renderers from `PageContent.tsx` behind stable shared interfaces | High | High | 17 current outlier IDs and future tools |
| 8 | Apply one responsive image component and loading/crop policy | Medium | Low–Medium | 9 image pages |
| 9 | Standardise the 30/60/90 roadmap family and repeated comparison-card families | Medium | Medium | Multiple related pages |
| 10 | Polish summary/certificate wording of actions and print states without altering approved learning content | Medium | Low–Medium | Pages 62–63 |

## Representative visual sample

| Pages | Pattern checked | Result |
| --- | --- | --- |
| 1–2 | Cover, navigation and contents | Strong desktop identity; contents and shell need mobile stacking/overlay behavior. |
| 3, 10 | Image-led and dense reflection pages | Shared hierarchy works; image rules and green density need standardisation. |
| 5, 41 | Framework/numbered content | Clear scan pattern, but the same green-number/green-border treatment becomes repetitive. |
| 24, 35 | Workflow and prompt tools | Useful bespoke interactions; framing, muted contrast and control patterns should be shared. |
| 43, 55, 57 | Worksheet, wizard and matrix | Functionally distinct; page 55/57 demonstrate stronger guided patterns that can inform page 43. |
| 60 | Glossary lab | A successful justified outlier; retain while adopting shared controls and mobile rules. |
| 62–63 | Summary and certificate | Clear completion surfaces; keep separate while standardising actions, accessibility and print states. |

## Boundaries

This audit recommends shared design work; it does not approve wording changes, select a final delivery roadmap, or change production. During the audit, `playbookData.ts`, `PageContent.tsx` and all other production application files remained unchanged.

## Immediate foundations implemented — 8 August 2026

The approved first package is now implemented locally on `codex/ai-playbook-foundations`:

- Mobile navigation is closed by default below 1024px and operates as a drawer with a backdrop, Escape/backdrop/toggle close paths, scroll locking, no persistent content offset and compact responsive padding/navigation.
- Essential navigation and shared activity accessibility now includes accessible control names, page-dot names/current state, visible focus, 44px essential targets, and programmatic field/instruction associations.
- Common page titles/subtitles and shared spacing use restrained responsive rules while retaining `Sage Header`, `Sage Text`, all approved wording and the existing green treatment.
- The shared activity frame received necessary label, instruction, focus, alignment and responsive fixes; specialist activity internals, the output system and the `PageContent` refactor remain parked.

Evidence: `npm test` passes 4/4 focused foundation checks; `npm run build` succeeds. Browser checks at 1440 × 900 and 390 × 844 covered the cover/drawer plus pages 24, 35, 55, 57, 60, 62 and 63. The settled mobile document width matched the 375px browser content viewport, main content returned to `left: 0`, all sampled desktop pages reported zero horizontal overflow, and no browser console errors were recorded. The existing 729.29kB JavaScript bundle warning remains for the separate performance review.
