# Fix Plan

This plan consolidates the findings from:

- `CONTENT_FIDELITY_REVIEW.md`
- `PROJECT_OVERVIEW.md`
- `RESPONSIVENESS_REVIEW.md`
- `ASSET_PERFORMANCE_REVIEW.md`
- `PROGRESS_AND_ANSWERS_REVIEW.md`
- `CERTIFICATE_REVIEW.md`

It is split into:

1. Must fix for V1
2. Should fix after V1
3. Nice to have later

## 1. Must Fix For V1

These items affect whether the project is usable, accurate enough to position honestly, or practical for real users.

### 1. Decide And Label The Content Fidelity Position

**Issue**

The website is not a faithful 1:1 version of `src/imports/ai-playbook-accountants.txt`. It is a shortened, reworded, rearranged, and partially merged interactive prototype.

**Why It Matters**

If the site is presented as a faithful digital version of the Word/source playbook, that would be inaccurate. Many source pages and activities are missing. Some risk, ethics, confidentiality, pricing, and practical tool pages are removed or compressed.

**Files Involved**

- `src/app/data/playbookData.ts`
- `src/imports/ai-playbook-accountants.txt`
- `CONTENT_FIDELITY_REVIEW.md`
- Potentially `README.md` or visible in-app copy if adding a disclaimer

**Risk**

Low if the decision is documentation or label-only.

High if attempting to rebuild all content to match the 66-page source.

**Can Codex Safely Attempt It?**

Yes for adding a clear documentation note or in-app label.

Codex can also rebuild toward 1:1 fidelity, but that should be treated as a larger content migration task with careful review.

### 2. Optimize The Two Huge PNG Images

**Issue**

Two local PNG files are extremely large:

- `src/assets/401a764ba6882b8cc4eaee28ab8349b4feeb6652.png`, about 43.9 MB
- `src/assets/c4dcd24a1a26454f51b76968c451f7d30c463cc8.png`, about 38.3 MB

Together they add about 82 MB of image payload.

**Why It Matters**

This is the biggest performance problem in the project. It can make the site slow, especially on mobile or normal office networks. The production build currently ships these large assets.

**Files Involved**

- `src/assets/401a764ba6882b8cc4eaee28ab8349b4feeb6652.png`
- `src/assets/c4dcd24a1a26454f51b76968c451f7d30c463cc8.png`
- `src/app/components/PageContent.tsx`
- `vite.config.ts`, indirectly through the Figma asset resolver

**Risk**

Low to medium.

The visual result needs checking, but replacing large PNGs with optimized WebP versions should not change app logic.

**Can Codex Safely Attempt It?**

Yes, if image conversion tools are available locally or if replacement optimized assets are provided.

If no image tool is available, Codex can still update imports once optimized assets are supplied.

### 3. Make The App Shell Mobile-Safe

**Issue**

The sidebar is fixed at `w-80`, opens by default, and pushes main content with `ml-80`. On small screens this can leave the page cramped or unusable.

Problem patterns:

- `useState(true)` for `sidebarOpen`
- `w-80`
- `left-80`
- `ml-80`

**Why It Matters**

The site is currently desktop-first. Mobile and portrait tablet users may see horizontal overflow, covered content, or an awkward sidebar experience.

**Files Involved**

- `src/app/SageAIPlaybook.tsx`
- `src/styles/theme.css`, possibly for supporting responsive/global styles

**Risk**

Medium.

The sidebar controls navigation, visited pages, section progress, and overall progress. Changing it requires careful testing.

**Can Codex Safely Attempt It?**

Yes. This is a contained layout refactor in `SageAIPlaybook.tsx`, but it should be tested at mobile, tablet, and desktop widths.

### 4. Fix The Most Obvious Mobile Overflow Patterns

**Issue**

Several layout patterns are likely to overflow or become cramped on mobile:

- `px-12 py-12`
- `px-16 pt-24`
- `text-6xl lg:text-7xl`
- `grid grid-cols-2`
- `min-w-[200px]`
- `whitespace-nowrap`
- dense `flex items-center` activity controls

**Why It Matters**

Even if the sidebar is fixed, individual pages can still break on mobile. The most likely problem pages are the cover page, contents page, fill-in-the-gaps activity, task classification activity, and activity summary page.

**Files Involved**

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`

**Risk**

Medium.

Most changes are Tailwind class changes, but activity controls need careful interaction testing.

**Can Codex Safely Attempt It?**

Yes. Codex can safely adjust responsive Tailwind classes and then run a build. Visual browser testing is recommended.

### 5. Add Simple Progress And Answer Persistence

**Issue**

Progress and answers are stored only in React state:

- `currentPage`
- `visitedPages`
- `userInputs`

They disappear on refresh, tab close, or browser close.

**Why It Matters**

This is an interactive workbook. Losing answers or progress after refresh is a poor V1 experience.

**Files Involved**

- `src/app/SageAIPlaybook.tsx`
- Optional new file: `src/app/utils/playbookStorage.ts`
- Optional: `src/app/data/playbookData.ts` for a content version constant

**Risk**

Medium.

The main technical risk is serializing and restoring `Set<number>` safely and avoiding stale saved answers after content changes.

**Can Codex Safely Attempt It?**

Yes. A localStorage V1 is straightforward and does not require a backend.

Recommended scope:

- Save current page.
- Save visited pages.
- Save user answers.
- Restore on reload.
- Add a reset option.
- Add a content version.

### 6. Clarify Print/Download Wording

**Issue**

The current button says "Download / Print Summary", but the implementation only calls `window.print()`.

**Why It Matters**

Users may expect a direct file download. The current behaviour opens the browser print dialog, where users can choose print or save as PDF.

**Files Involved**

- `src/app/components/ActivitySummary.tsx`
- `src/styles/theme.css`

**Risk**

Low.

This can be a label/help-text change.

**Can Codex Safely Attempt It?**

Yes.

Suggested wording:

- "Print / Save as PDF"
- "Open print dialog"

### 7. Run A Production Build After V1 Fixes

**Issue**

Any changes to layout, persistence, assets, or data should be verified with a production build.

**Why It Matters**

The app uses Vite, Tailwind, local assets, and generated route output. Build verification catches syntax, import, and bundling problems.

**Files Involved**

- `package.json`
- `vite.config.ts`
- All changed files

**Risk**

Low.

**Can Codex Safely Attempt It?**

Yes. `npm run build` previously required elevated execution because Vite/esbuild needed to spawn a process, but the build itself is standard.

## 2. Should Fix After V1

These items improve quality, maintainability, and user experience, but can follow a usable V1.

### 1. Restore Or Rebuild Full Source Content Fidelity

**Issue**

The current website has 32 playbook entries, while the source text has 66 pages. Many pages and activities are missing or changed.

**Why It Matters**

If the desired product is a true digital version of the source playbook, the content needs a full rebuild. Some omitted sections cover important governance, confidentiality, legal responsibility, pricing, scorecards, file notes, and client communication topics.

**Files Involved**

- `src/imports/ai-playbook-accountants.txt`
- `src/app/data/playbookData.ts`
- `src/app/components/PageContent.tsx`, if new block/activity types are needed
- `src/app/components/ActivitySummary.tsx`, if activities are expanded

**Risk**

High.

This is primarily a content/data migration, but it affects navigation, activities, progress, and summary.

**Can Codex Safely Attempt It?**

Yes, but not as a casual patch. It should be done in phases with review checkpoints.

Recommended approach:

1. Add source page numbers to data.
2. Add missing pages section by section.
3. Preserve page IDs carefully.
4. Verify every activity.
5. Review with a human editor.

### 2. Add A Simple Completion Certificate

**Issue**

The app currently has an activity summary, not a certificate.

**Why It Matters**

A certificate can give users a clearer completion moment and a more polished end state.

**Files Involved**

- `src/app/data/playbookData.ts`
- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`
- Optional new file: `src/app/components/Certificate.tsx`
- `src/styles/theme.css`

**Risk**

Medium.

Print styling and completion rules need care, but this can be built without a database.

**Can Codex Safely Attempt It?**

Yes.

Recommended post-V1 approach:

- Add a name field.
- Use completion percentage and activity count.
- Use browser print/save-as-PDF.
- Avoid login/database initially.

### 3. Improve Print Styling For Summary And Certificate

**Issue**

Print behaviour currently depends on `window.print()` and existing print CSS. It is not a dedicated print/export system.

**Why It Matters**

Printed summaries or certificates should hide navigation, avoid broken cards, and fit cleanly on pages.

**Files Involved**

- `src/app/components/ActivitySummary.tsx`
- `src/styles/theme.css`
- Optional `Certificate.tsx`

**Risk**

Medium.

Print CSS can affect multiple layouts and needs browser testing.

**Can Codex Safely Attempt It?**

Yes, with visual print preview testing.

### 4. Extract Storage And Completion Helpers

**Issue**

Progress, answer state, completion calculation, and future certificate logic currently live or would live across components.

**Why It Matters**

As persistence and certificates are added, `SageAIPlaybook.tsx` and `ActivitySummary.tsx` can become harder to maintain.

**Files Involved**

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/ActivitySummary.tsx`
- Optional new file: `src/app/utils/playbookStorage.ts`
- Optional new file: `src/app/utils/completion.ts`

**Risk**

Medium.

Refactoring shared logic can introduce regressions if not tested.

**Can Codex Safely Attempt It?**

Yes, preferably after V1 persistence works.

### 5. Add Better Responsive Image Handling

**Issue**

The immediate V1 fix should optimize image files, but the app still does not use `srcset`, multiple image sizes, or more advanced responsive image loading.

**Why It Matters**

Mobile users should not download desktop-sized images if smaller images would work.

**Files Involved**

- `src/assets/`
- `src/app/components/PageContent.tsx`
- `src/app/components/figma/ImageWithFallback.tsx`
- `vite.config.ts`, if asset handling changes

**Risk**

Medium.

Image behaviour needs visual testing across viewports.

**Can Codex Safely Attempt It?**

Yes, if image variants are available or can be generated.

### 6. Review And Remove Unused Components

**Issue**

Files such as `Hero.tsx`, `TableOfContents.tsx`, and `Section1.tsx` to `Section7.tsx` exist but are not used by the live route.

**Why It Matters**

Unused files can confuse future editors. People may edit them and see no website change.

**Files Involved**

- `src/app/components/Hero.tsx`
- `src/app/components/TableOfContents.tsx`
- `src/app/components/Section1.tsx`
- `src/app/components/Section2.tsx`
- `src/app/components/Section3.tsx`
- `src/app/components/Section4.tsx`
- `src/app/components/Section5.tsx`
- `src/app/components/Section6.tsx`
- `src/app/components/Section7.tsx`
- `src/app/routes.ts`
- `src/app/SageAIPlaybook.tsx`

**Risk**

Low to medium.

Deleting unused files is safe only after confirming they are not imported anywhere and not intentionally kept as references.

**Can Codex Safely Attempt It?**

Yes, after a final `rg` import check and build.

## 3. Nice To Have Later

These are useful enhancements but should not block V1.

### 1. Database, Login, Or Cross-Device Sync

**Issue**

localStorage only saves progress on the same browser and device.

**Why It Matters**

Some future users may expect to resume on another device, retrieve certificates later, or share progress with admins.

**Files Involved**

- New backend/API files
- Authentication provider setup
- Database schema
- `src/app/SageAIPlaybook.tsx`
- `src/app/components/ActivitySummary.tsx`
- Potential certificate components

**Risk**

High.

This changes product architecture, privacy obligations, and data handling.

**Can Codex Safely Attempt It?**

Not without a clear product decision and technical stack choice. Codex can help design or implement once requirements are defined.

### 2. True One-Click PDF Generation

**Issue**

Current print/download uses browser print. A true generated PDF would require client-side or server-side PDF generation.

**Why It Matters**

A one-click PDF certificate or summary is more polished than asking users to save from the print dialog.

**Files Involved**

- `src/app/components/ActivitySummary.tsx`
- Optional `src/app/components/Certificate.tsx`
- `package.json`, if adding PDF libraries
- Potential backend files if server-generated

**Risk**

Medium to high.

Client-side PDF generation can create layout/font issues. Server-side PDF generation adds backend complexity.

**Can Codex Safely Attempt It?**

Yes for a prototype, but not recommended before simpler print-based V1 is stable.

### 3. Certificate Verification IDs

**Issue**

A local certificate has no external verification.

**Why It Matters**

If certificates become formal training evidence, they may need unique IDs or verification URLs.

**Files Involved**

- Certificate component
- Backend/database
- Potential verification route

**Risk**

High.

Requires backend persistence if verification must be meaningful.

**Can Codex Safely Attempt It?**

Only after database/login or backend decisions are made.

### 4. Automated Image Optimization Pipeline

**Issue**

Asset optimization is currently manual.

**Why It Matters**

Future image replacements could accidentally reintroduce huge assets.

**Files Involved**

- `package.json`
- Build scripts
- `vite.config.ts`
- `src/assets/`

**Risk**

Medium.

Build tooling changes need testing.

**Can Codex Safely Attempt It?**

Yes, but this can wait until after manual V1 optimization.

### 5. Full Accessibility Review

**Issue**

The current reviews focused on content, responsiveness, assets, progress, and certificate behaviour. Accessibility was not deeply reviewed.

**Why It Matters**

The app uses many custom buttons, icon controls, hidden inputs, contrast-heavy dark UI, and animated transitions. Accessibility should be verified before wider release.

**Files Involved**

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`
- `src/app/components/ui/`
- `src/styles/theme.css`

**Risk**

Medium.

Accessibility changes can affect markup and interaction behaviour.

**Can Codex Safely Attempt It?**

Yes, with browser testing and ideally automated accessibility checks.

### 6. Deeper Bundle Analysis And Code Splitting

**Issue**

The JavaScript bundle is not the main current performance problem, but deeper analysis may reveal unused dependencies or opportunities for lazy loading.

**Why It Matters**

After image optimization, JS/CSS size may become the next performance target.

**Files Involved**

- `package.json`
- `vite.config.ts`
- Route/component imports
- Potential lazy-loaded components

**Risk**

Medium.

Code splitting can affect loading states and route behaviour.

**Can Codex Safely Attempt It?**

Yes, but only after V1 blockers are resolved.

## Recommended Order Of Work

1. Decide whether V1 is explicitly an adapted prototype or a faithful digital playbook.
2. Optimize the two huge PNG assets.
3. Fix the mobile sidebar and main content layout.
4. Fix fixed two-column grids and dense activity controls.
5. Add localStorage persistence for progress and answers.
6. Clarify print/download wording.
7. Build and test desktop, tablet, and mobile.
8. After V1, decide whether to restore full 66-page source fidelity.
9. Add a simple certificate page or certificate section.
10. Improve print styling and optional PDF behaviour.

## V1 Scope Recommendation

For V1, do **not** try to solve everything.

The practical V1 target should be:

- Clear positioning as an adapted interactive playbook, unless the full 66-page rebuild is explicitly approved.
- Optimized image assets.
- Mobile-safe navigation and layout.
- Persistent progress and answers using localStorage.
- Clear print/save-as-PDF wording.
- Successful production build.

That gives the project a stable, usable baseline before larger content reconstruction, certificates, backend persistence, or PDF generation are added.
