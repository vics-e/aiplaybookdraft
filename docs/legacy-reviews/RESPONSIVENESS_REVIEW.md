# Responsiveness Review

This review covers the current React app across desktop, tablet, and mobile layouts.

The app is visually strong on desktop, but it is only **partly responsive**. Several fixed-width, fixed-padding, and side-by-side layout patterns will cause cramped layouts or horizontal overflow on tablets and phones.

## 1. What Currently Works Well

### Desktop

The desktop experience is the strongest.

What works:

- Fixed sidebar navigation gives a clear workbook structure.
- Main content area has a readable max width.
- Previous and next navigation is easy to find.
- Section progress and overall progress are visible.
- Content pages use cards, highlights, images, and activity panels effectively.
- Many inner grids already use responsive classes such as `grid-cols-1 md:grid-cols-2`.

Relevant files:

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`
- `src/styles/theme.css`

### Tablet

Some tablet layouts will work reasonably well, especially in landscape.

What works:

- The main content uses `max-w-5xl mx-auto`, so content does not become too wide.
- Some content sections stack at smaller breakpoints using `grid-cols-1 md:grid-cols-2`.
- The sidebar can be manually collapsed.

Current risk:

- The app starts with the sidebar open by default, which takes 320px of width before the main content is shown.

### Mobile

Mobile support exists only partially.

What works:

- The sidebar can technically be closed.
- The main content can shrink when the sidebar is closed.
- Some content grids stack on mobile.
- Text inputs and textareas generally use `w-full`.

Current risk:

- The default open sidebar, large padding, large headings, fixed two-column grids, and side-by-side activity controls make the mobile experience unreliable.

## 2. What Is Not Mobile-Friendly

The app has several desktop-first layout patterns:

- Fixed sidebar width: `w-80`
- Main content shift: `ml-80`
- Sidebar open by default: `useState(true)`
- Large main content padding: `px-12 py-12`
- Large cover page padding: `px-16 pt-24`
- Large cover headings: `text-6xl lg:text-7xl`
- Fixed two-column contents grid: `grid grid-cols-2`
- Fixed image heights: `h-96`, `h-80`, `h-56`
- Side-by-side activity controls using `flex items-center`
- Non-wrapping labels using `whitespace-nowrap`
- Inline inputs with `min-w-[200px]`
- Bottom navigation buttons and page dots competing for horizontal space

These patterns can cause:

- Horizontal scrolling.
- Text overflow.
- Cramped controls.
- Sidebar covering nearly all mobile screen width.
- Main content squeezed to an unusable width.
- Oversized headings pushing content off-screen.

## 3. Exact Files And Components Involved

### `src/app/SageAIPlaybook.tsx`

Controls the app shell:

- Sidebar.
- Sidebar toggle.
- Main content offset.
- Main content padding.
- Previous/next navigation.
- Page progress dots.
- Section and overall progress.

Main responsiveness risks are here.

### `src/app/components/PageContent.tsx`

Controls page rendering:

- Cover page layout.
- Contents page layout.
- Content page headings.
- Images.
- Cards.
- Columns.
- Activity controls.
- Form inputs.

Most mobile overflow risks inside the page body are here.

### `src/app/components/ActivitySummary.tsx`

Controls the final response summary page:

- Summary stats cards.
- Activity response cards.
- Edit controls.
- Print/download button.

The summary uses fixed two-column layout for stats and side-by-side action buttons that may need mobile stacking.

### `src/styles/theme.css`

Controls global styles:

- Base typography.
- Scrollbar styling.
- Print styles.
- CSS variables.

This file does not currently contain much mobile-specific layout CSS. Most responsive behaviour is controlled directly through Tailwind classes in TSX files.

## 4. Exact Tailwind ClassNames Or Layout Patterns Causing Issues

### Sidebar Width And Behaviour

File: `src/app/SageAIPlaybook.tsx`

Problem patterns:

```tsx
const [sidebarOpen, setSidebarOpen] = useState(true);
```

```tsx
className={`fixed left-0 top-0 h-screen ... ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-80`}
```

```tsx
className={`fixed top-6 ... ${sidebarOpen ? 'left-80' : 'left-0'}`}
```

```tsx
className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}
```

Why this is an issue:

- `w-80` is 20rem, usually 320px.
- On a 360px mobile screen, the sidebar nearly fills the whole viewport.
- `ml-80` leaves almost no usable content width if the sidebar is open.
- The sidebar starts open by default.
- The toggle button uses `left-80`, so it can sit far across the mobile viewport.

### Main Content Padding

File: `src/app/SageAIPlaybook.tsx`

Problem pattern:

```tsx
className="max-w-5xl mx-auto px-12 py-12"
```

Why this is an issue:

- `px-12` is 3rem left and right.
- On mobile this removes too much usable width.
- It should likely be something like `px-4 sm:px-6 lg:px-12`.

### Cover Page Padding

File: `src/app/components/PageContent.tsx`

Problem pattern:

```tsx
className="relative z-10 flex flex-col h-full px-16 pt-24"
```

Why this is an issue:

- `px-16` is 4rem left and right.
- `pt-24` is large top padding.
- On mobile, this can make the cover page feel cramped and push content down.

### Heading Sizes

File: `src/app/components/PageContent.tsx`

Problem patterns:

```tsx
className="text-6xl lg:text-7xl font-black text-white mb-3"
```

```tsx
className="text-6xl lg:text-7xl font-black text-[#00DC51] leading-[0.9]"
```

```tsx
className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-[1.05] tracking-tight"
```

Why this is an issue:

- The cover page starts at `text-6xl`, even on mobile.
- Long words and multi-line headings may overflow or dominate the viewport.
- The normal page heading is better because it scales from `text-3xl`, but some titles may still need wrapping checks.

Suggested pattern:

```tsx
className="text-4xl sm:text-5xl lg:text-7xl"
```

or for compact pages:

```tsx
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
```

### Two-Column Grids

File: `src/app/components/PageContent.tsx`

Problem pattern:

```tsx
className="grid grid-cols-2 gap-4 max-w-6xl mx-auto overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar"
```

Why this is an issue:

- `grid-cols-2` is always two columns, including mobile.
- Contents cards will become narrow and cramped.
- Should likely be `grid-cols-1 md:grid-cols-2`.

File: `src/app/components/ActivitySummary.tsx`

Problem pattern:

```tsx
className="grid grid-cols-2 gap-4"
```

Why this is an issue:

- Summary stat cards are always two columns.
- On mobile, two cards may be too narrow.
- Should likely be `grid-cols-1 sm:grid-cols-2`.

Patterns that are already better:

```tsx
className="grid grid-cols-1 md:grid-cols-2 gap-6"
```

```tsx
className="grid md:grid-cols-2 gap-6 mb-6"
```

These stack by default and split on larger screens.

### Cards

Files:

- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`

Problem patterns:

```tsx
className="rounded-2xl ... p-8"
```

```tsx
className="bg-white/[0.03] border-2 border-white/10 rounded-xl p-5"
```

```tsx
className="bg-white/5 border-2 border-white/10 rounded-xl p-4"
```

Why this can be an issue:

- Cards generally shrink, but large padding can make mobile layouts feel cramped.
- Cards with `flex items-center` children can overflow if text is long.
- Cards containing long labels need wrapping or vertical stacking.

Suggested mobile approach:

- Use `p-4 sm:p-5 lg:p-6`.
- Use `flex-col sm:flex-row` where content is currently always horizontal.
- Avoid fixed minimum widths unless needed.

### Activity Controls

File: `src/app/components/PageContent.tsx`

Problem patterns:

```tsx
className="flex items-center gap-6"
```

Used for yes/no controls.

Potential fix:

```tsx
className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
```

Problem pattern:

```tsx
className="inline-block min-w-[200px] ..."
```

Used for fill-in-the-gaps inputs.

Why this is an issue:

- Inline inputs with `min-w-[200px]` can overflow narrow screens.
- Multiple gaps in one sentence can become awkward on mobile.

Potential fix:

```tsx
className="inline-block w-full sm:w-auto sm:min-w-[200px] ..."
```

or render gap inputs as stacked fields on mobile.

Problem pattern:

```tsx
className="flex items-center gap-3"
```

Used in task classification controls.

Problem pattern:

```tsx
className="flex-1 flex items-center gap-4"
```

Problem pattern:

```tsx
className="text-xs ... whitespace-nowrap"
```

Why this is an issue:

- Task classification controls are dense and horizontal.
- `whitespace-nowrap` prevents the "Top candidate for agent automation" label from wrapping.
- This is a likely horizontal overflow source.

Potential fix:

```tsx
className="flex flex-col lg:flex-row gap-3"
```

and remove `whitespace-nowrap` or make it responsive:

```tsx
className="text-xs ... sm:whitespace-nowrap"
```

### Progress And Navigation UI

File: `src/app/SageAIPlaybook.tsx`

Problem patterns:

```tsx
className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10"
```

```tsx
className="flex items-center gap-2 px-6 py-3 ..."
```

```tsx
className="flex gap-1"
```

Why this is an issue:

- Previous button, page counter/dots, and next button all sit in one row.
- On mobile, this can become cramped.
- Buttons use `px-6`, which may be too wide.

Potential fix:

```tsx
className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
```

Button padding could become:

```tsx
className="px-4 sm:px-6 py-3"
```

### Horizontal Overflow

Likely overflow sources:

- Sidebar open on mobile: `w-80` plus `ml-80`.
- Cover heading: `text-6xl`.
- Contents grid: `grid-cols-2`.
- Inline fill-gap inputs: `min-w-[200px]`.
- Task classification row: nested `flex items-center`.
- Non-wrapping label: `whitespace-nowrap`.
- Previous/next navigation row with wide buttons.
- Large fixed padding: `px-12`, `px-16`.

## 5. Specific Issues By Area

### Sidebar Width And Behaviour

Current behaviour:

- Sidebar is fixed.
- Sidebar is 320px wide.
- Sidebar is open by default.
- Main content shifts right by 320px.

Desktop:

- Works well.

Tablet:

- Acceptable in landscape.
- Risky in portrait.

Mobile:

- Not mobile-friendly.
- Should default closed on mobile.
- Should probably act like an overlay drawer instead of pushing content.

### Main Content Padding

Current behaviour:

- Main content uses `px-12 py-12`.

Desktop:

- Looks spacious.

Mobile:

- Too much horizontal padding.
- Reduces readable width.

### Heading Sizes

Current behaviour:

- Cover page starts at `text-6xl`.
- Regular content starts at `text-3xl`.

Desktop:

- Visually strong.

Mobile:

- Cover heading is too large.
- Some headings may wrap awkwardly.

### Two-Column Grids

Current behaviour:

- Some grids are responsive.
- Some grids are fixed two-column.

Main issue:

- Contents page uses `grid-cols-2` with no mobile fallback.
- Activity summary stats use `grid-cols-2` with no mobile fallback.

### Cards

Current behaviour:

- Cards look good on desktop.
- Some cards use large padding.
- Some cards use horizontal flex layout.

Mobile risk:

- Long text and icons may squeeze.
- Cards may need smaller padding and stacked internal layout.

### Activity Controls

Current behaviour:

- Activities are built for desktop-style horizontal controls.
- Some forms use full-width inputs, which is good.
- Some controls use inline and non-wrapping patterns.

Mobile risk:

- Task classification is likely to overflow.
- Fill-in-the-gaps input may overflow.
- Yes/no controls may be better stacked.

### Progress And Navigation UI

Current behaviour:

- Sidebar progress works on desktop.
- Bottom previous/next navigation is a single row.

Mobile risk:

- Bottom navigation can become cramped.
- Sidebar progress may be hidden behind a closed drawer.
- Toggle button positioning may be awkward.

### Horizontal Overflow

The app should be tested specifically for horizontal scrolling at:

- 320px wide
- 360px wide
- 390px wide
- 768px wide
- 1024px wide

The most likely mobile overflow pages are:

- Cover page
- Contents page
- Task classification activity page
- Fill-in-the-gaps activity page
- Activity summary page

## 6. Suggested Fix Plan

### Step 1: Make The App Shell Mobile-Safe

File:

- `src/app/SageAIPlaybook.tsx`

Changes to consider:

- Default sidebar closed on mobile.
- Use a mobile breakpoint to avoid `ml-80` on small screens.
- Keep desktop sidebar push behaviour only on large screens.
- Treat sidebar as overlay on mobile.
- Adjust toggle button positioning for mobile.

Example direction:

```tsx
className={`fixed ... w-80 max-w-[85vw] ...`}
```

```tsx
className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'ml-0'}`}
```

### Step 2: Reduce Mobile Padding

Files:

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`

Change:

```tsx
px-12 py-12
```

to a responsive pattern like:

```tsx
px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12
```

Change:

```tsx
px-16 pt-24
```

to:

```tsx
px-4 sm:px-8 lg:px-16 pt-16 lg:pt-24
```

### Step 3: Scale Headings Responsively

File:

- `src/app/components/PageContent.tsx`

Change cover headings from:

```tsx
text-6xl lg:text-7xl
```

to:

```tsx
text-4xl sm:text-5xl lg:text-7xl
```

Review normal page headings too:

```tsx
text-3xl md:text-4xl lg:text-5xl
```

Potential mobile-safe option:

```tsx
text-2xl sm:text-3xl md:text-4xl lg:text-5xl
```

### Step 4: Fix Fixed Two-Column Grids

Files:

- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`

Change:

```tsx
grid grid-cols-2
```

to:

```tsx
grid grid-cols-1 md:grid-cols-2
```

or:

```tsx
grid grid-cols-1 sm:grid-cols-2
```

depending on content density.

### Step 5: Stack Dense Activity Controls On Mobile

File:

- `src/app/components/PageContent.tsx`

Change dense horizontal activity layouts to:

```tsx
flex flex-col sm:flex-row
```

or:

```tsx
grid grid-cols-1 md:grid-cols-2
```

Remove or limit:

```tsx
whitespace-nowrap
```

Change:

```tsx
min-w-[200px]
```

to mobile-safe input widths.

### Step 6: Make Bottom Navigation Stack On Mobile

File:

- `src/app/SageAIPlaybook.tsx`

Change the bottom navigation container from a single row to mobile-stacked layout:

```tsx
flex flex-col sm:flex-row sm:items-center sm:justify-between
```

Reduce button padding on mobile:

```tsx
px-4 sm:px-6
```

### Step 7: Review Card Padding And Images

File:

- `src/app/components/PageContent.tsx`

Make large card padding responsive:

```tsx
p-4 sm:p-6 lg:p-8
```

Make image heights responsive:

```tsx
h-56 sm:h-72 lg:h-96
```

### Step 8: Test With Real Viewports

Test at:

- 320 x 640
- 360 x 740
- 390 x 844
- 768 x 1024
- 1024 x 768
- 1440 x 900

Check:

- No horizontal scroll.
- Sidebar can open/close.
- Text does not overlap.
- Activity controls remain usable.
- Previous/next navigation remains visible.
- Print summary still works.

## 7. Priority Order For Fixes

### Priority 1: Prevent Mobile Breakage

1. Sidebar default and overlay behaviour on mobile.
2. Remove mobile `ml-80` content push.
3. Reduce main content padding on mobile.
4. Fix fixed `grid-cols-2` layouts.
5. Fix task classification horizontal overflow.

### Priority 2: Improve Mobile Usability

6. Resize cover headings for mobile.
7. Stack bottom previous/next navigation on mobile.
8. Make fill-in-the-gaps inputs mobile-safe.
9. Reduce card padding on small screens.
10. Make image heights responsive.

### Priority 3: Polish Tablet And Edge Cases

11. Improve sidebar behaviour for tablet portrait.
12. Review activity summary cards and edit controls.
13. Test long titles and long user input.
14. Confirm print styles still work after layout changes.
15. Check scroll behaviour after page navigation.

## 8. Risks Before Changing The Layout

### Risk: Sidebar Logic Affects Navigation

The sidebar is not just visual. It contains:

- Page links.
- Section grouping.
- Visited indicators.
- Section progress.
- Overall progress.

Changing sidebar behaviour should preserve these interactions.

### Risk: Main Content Margin And Sidebar Must Stay In Sync

The sidebar uses `w-80`, the toggle uses `left-80`, and the main content uses `ml-80`.

If one value changes without the others, the layout can become misaligned.

### Risk: Activities Store Answers By Page ID

Activities are tied to page IDs from `playbookData.ts`. Layout changes should not alter page IDs or answer keys unless intentionally migrating saved answers.

Current answers are only stored in React state during the session, but breaking page IDs can still affect `ActivitySummary`.

### Risk: Print Styles May Be Affected

`ActivitySummary.tsx` uses `window.print()`, and `theme.css` contains print-specific classes.

Changing summary markup or class names can affect printed output.

### Risk: Hidden Overflow Can Be Page-Specific

Some pages may look fine while others overflow because activity controls vary by page type.

Pages to test carefully:

- Contents page.
- Role/new accountant visual page.
- Where AI works best activity page.
- Minimum AI policy fill-gap page.
- Agent spec template page.
- Activity summary page.

### Risk: Unused Components Can Cause Confusion

Files like `Hero.tsx`, `TableOfContents.tsx`, and `Section1.tsx` to `Section7.tsx` are not currently used by the live app. Fixing responsiveness there will not fix the live website unless those components are reconnected.

Focus first on:

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`
- `src/styles/theme.css`
