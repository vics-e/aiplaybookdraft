# Project Overview

This project is a React website built with Vite. It presents an interactive AI playbook for accountants and bookkeepers.

The main website content lives in `src/app/data/playbookData.ts`. The main screen and navigation logic live in `src/app/SageAIPlaybook.tsx`. Most page rendering happens in `src/app/components/PageContent.tsx`.

## Most Important Files

These are the files you are most likely to edit:

| File | What it controls |
|---|---|
| `src/app/data/playbookData.ts` | Playbook text, page order, page titles, activities, sections, and table of contents data |
| `src/app/SageAIPlaybook.tsx` | Sidebar navigation, current page state, progress tracking, previous/next buttons |
| `src/app/components/PageContent.tsx` | How each playbook page is visually rendered |
| `src/app/components/ActivitySummary.tsx` | Summary page, editing answers, print/download behaviour |
| `src/styles/theme.css` | Colours, fonts, design tokens, global typography, print styles |
| `src/styles/index.css` | Main stylesheet entry point |
| `src/styles/fonts.css` | Font definitions |
| `src/assets/` | Local image files used by the site |
| `vite.config.ts` | Vite setup, aliases, and Figma asset resolver |

## Simple App Flow

The app starts like this:

1. `index.html` provides the empty page shell with a root element.
2. `src/main.tsx` starts React and renders the app into the root element.
3. `src/app/App.tsx` loads the React router.
4. `src/app/routes.ts` sends `/` and all unknown paths to `SageAIPlaybook`.
5. `src/app/SageAIPlaybook.tsx` loads the playbook data and manages the current page.
6. `PageContent.tsx` renders the active page based on the page type.
7. If the page is the activity summary, `ActivitySummary.tsx` renders all saved answers.

In simple terms:

```text
index.html
  -> main.tsx
    -> App.tsx
      -> routes.ts
        -> SageAIPlaybook.tsx
          -> PageContent.tsx
          -> ActivitySummary.tsx when needed
```

## File-By-File Guide

### `index.html`

This is the browser entry file.

You usually do not edit this unless you need to change page metadata, add external scripts, or change the root HTML shell.

### `package.json`

Defines project scripts and dependencies.

Important scripts:

- `npm run dev`: starts the local development server.
- `npm run build`: builds the production version.

Usually do not edit this unless adding/removing packages or changing scripts.

### `vite.config.ts`

Configures Vite.

This project has a custom `figmaAssetResolver()` so imports like this work:

```ts
import sageLogo from 'figma:asset/85dce1db2c171f8d15f5e966d3ca5f37099a8078.png';
```

Usually do not edit this unless you need to change build settings, path aliases, or asset handling.

### `src/main.tsx`

Starts the React app:

```tsx
createRoot(document.getElementById("root")!).render(<App />);
```

Usually do not edit this.

### `src/app/App.tsx`

Loads the router:

```tsx
function App() {
  return <RouterProvider router={router} />;
}
```

Usually do not edit this unless you are changing the routing structure.

### `src/app/routes.ts`

Defines the website routes.

Currently both `/` and any unknown path render `SageAIPlaybook`.

Edit this if you want separate pages or URLs.

### `src/app/SageAIPlaybook.tsx`

This is one of the most important files.

It controls:

- Which playbook page is currently visible.
- Sidebar open/closed state.
- Visited pages.
- Overall progress.
- Section progress.
- Previous and next buttons.
- Sidebar navigation.
- User answer storage.

Important state examples:

```tsx
const [currentPage, setCurrentPage] = useState(0);
const [userInputs, setUserInputs] = useState<Record<string, string>>({});
const [sidebarOpen, setSidebarOpen] = useState(true);
const [visitedPages, setVisitedPages] = useState<Set<number>>(new Set([0]));
```

Edit this file to change:

- Page navigation behaviour.
- Progress tracking.
- Sidebar layout.
- Previous/next controls.
- How user answers are stored while using the site.
- Mobile sidebar behaviour.

Be careful editing this file because it affects the whole app.

### `src/app/data/playbookData.ts`

This is the main content file.

Edit this file to change:

- Text/content.
- Page titles.
- Page order.
- Section names.
- Table of contents.
- Activities/questions.
- Page images.
- Key takeaways.

Each page is an object in the `playbook` array:

```ts
{
  id: 's1-intro',
  type: 'content',
  section: 'Section 1: Understanding AI',
  title: 'The Shift to **AI-Assisted** Firms',
  subtitle: 'AI is not about replacing accountants...',
  content: [
    {
      type: 'text',
      text: 'Over the past two decades...'
    }
  ],
  activity: {
    title: 'Capacity Reflection',
    prompt: 'Reflect on where your team spends time...',
    type: 'multi-question',
    questions: [
      'Where does your team spend the most repetitive time?',
      'What would you do if those tasks took 30-50% less time?'
    ]
  }
}
```

To change page order, move objects around in the `playbook` array.

To add a page, add a new object to the array.

To remove a page, remove its object from the array.

### `src/app/components/PageContent.tsx`

This is another very important file.

It controls how each page type is displayed.

It renders:

- Cover page.
- Contents page.
- Normal content pages.
- Images.
- Highlights.
- Boxes.
- Quotes.
- Columns.
- Activities.
- Different input types.

Edit this file to change:

- Layout and page design.
- How text blocks look.
- How activities look.
- How images are displayed.
- Mobile layout inside page content.
- Visual treatment of cover, contents, and normal pages.

Example:

```tsx
if (page.type === 'cover') {
  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-black">
      ...
    </div>
  );
}
```

This means: if the current page is a cover page, render the special cover design.

### `src/app/components/ActivitySummary.tsx`

This controls the final response summary page.

It:

- Collects every page with an activity.
- Shows completed and total activity count.
- Shows completion percentage.
- Allows answers to be edited.
- Calls `window.print()` for download/print behaviour.

Edit this file to change:

- Activity summary layout.
- Print/download button.
- How answers are formatted.
- Whether users can edit responses.
- What appears in the printed summary.

Important print/download line:

```tsx
const handleDownload = () => {
  window.print();
};
```

This does not generate a PDF directly. It opens the browser print dialog, where the user can print or save as PDF.

### `src/app/components/ProgressBar.tsx`

This file exists, but the main visible progress bars are mostly handled inside `SageAIPlaybook.tsx`.

Check whether this component is actively used before editing it.

### `src/app/components/Hero.tsx`

This file exists but is not used by the current routed app.

Usually do not edit it unless you reconnect it into the route.

### `src/app/components/TableOfContents.tsx`

This file exists but is not used by the current routed app.

The live contents page is rendered from `PageContent.tsx` using the `contents` object in `playbookData.ts`.

Usually do not edit this file unless you reconnect it.

### `src/app/components/Section1.tsx` to `Section7.tsx`

These files contain older section-based page components.

They are not used by the live app route.

Usually do not edit them unless you plan to rebuild the app around these section components.

### `src/app/components/ui/`

This folder contains reusable UI components such as buttons, dialogs, accordions, tabs, forms, and other building blocks.

Most look like generated or library-style components.

Usually do not edit these unless you know you need to change a shared UI primitive.

### `src/app/components/figma/ImageWithFallback.tsx`

Renders images with fallback behaviour.

Edit this only if images fail or you want to change how broken image loading is handled.

### `src/styles/index.css`

Main CSS entry file.

It imports:

```css
@import './fonts.css';
@import './tailwind.css';
@import './theme.css';
```

Usually do not add lots of CSS here. Prefer `theme.css` for global styling.

### `src/styles/theme.css`

This is the main global styling file.

It controls:

- CSS variables.
- Colours.
- Font families.
- Base typography.
- Scrollbar styling.
- Print styles.

Important variables:

```css
:root {
  --sage-green: #00DC51;
  --font-family-header: 'Sage Header', 'Inter', sans-serif;
  --font-family-body: 'Sage Text', 'Inter', sans-serif;
}
```

Edit this file to change:

- Site-wide colours.
- Global font choices.
- Default typography.
- Print styling.
- Reusable design tokens.

### `src/styles/fonts.css`

Controls custom font loading.

Edit this if changing font files or font family names.

### `src/styles/tailwind.css`

Tailwind setup file.

Usually do not edit unless changing Tailwind setup.

### `src/assets/`

Contains local images used by the website.

Edit this folder to add, remove, replace, or compress images.

Important note: some image files are very large. Large images can slow down the website. If performance matters, compress these assets or replace them with smaller files.

### `src/imports/ai-playbook-accountants.txt`

This is the imported source playbook text.

It is not directly rendered by the app.

Edit this only if the source reference text changes. Changing this file alone will not update the website unless `playbookData.ts` is also updated.

### `CONTENT_FIDELITY_REVIEW.md`

This is a review document explaining how the React website differs from the imported source playbook.

It is documentation only.

### `README.md`

Basic project instructions.

Edit this if you want to improve setup or running instructions.

### `ATTRIBUTIONS.md`

Attribution information.

Usually do not edit unless assets or sources change.

## What To Edit For Common Changes

### 1. Text And Content

Edit:

- `src/app/data/playbookData.ts`

Change page titles, subtitles, text blocks, lists, boxes, quotes, takeaways, and activities here.

Do not edit `src/imports/ai-playbook-accountants.txt` expecting the website to update automatically.

### 2. Page Order And Navigation

Edit:

- `src/app/data/playbookData.ts`
- `src/app/SageAIPlaybook.tsx`

The page order comes from the order of objects in the `playbook` array.

Navigation buttons and sidebar behaviour are controlled by `SageAIPlaybook.tsx`.

### 3. Layout And Page Design

Edit:

- `src/app/components/PageContent.tsx`
- `src/app/SageAIPlaybook.tsx`
- `src/app/components/ActivitySummary.tsx`

Use `PageContent.tsx` for individual page layouts.

Use `SageAIPlaybook.tsx` for the overall app shell, sidebar, and main content spacing.

### 4. Styling, Colours, And Fonts

Edit:

- `src/styles/theme.css`
- `src/styles/fonts.css`
- Tailwind class names inside `.tsx` files

Colours are often hardcoded in Tailwind class strings, for example:

```tsx
className="bg-[#00DC51] text-black"
```

That means changing only `theme.css` may not update every green colour. You may also need to search for `#00DC51`.

### 5. Images And Assets

Edit:

- `src/assets/`
- Image imports in `src/app/components/PageContent.tsx`
- Image values in `src/app/data/playbookData.ts`

Some pages use imported local assets. Other pages use image URLs stored in `playbookData.ts`.

### 6. Progress Tracking

Edit:

- `src/app/SageAIPlaybook.tsx`

Progress is based on visited pages:

```tsx
const [visitedPages, setVisitedPages] = useState<Set<number>>(new Set([0]));
```

Overall progress is calculated from `visitedPages.size / totalPages`.

### 7. Activities And User Answers

Edit:

- `src/app/data/playbookData.ts`
- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`

Activity definitions live in `playbookData.ts`.

The current answers are stored in `SageAIPlaybook.tsx`:

```tsx
const [userInputs, setUserInputs] = useState<Record<string, string>>({});
```

Activity input UI is rendered in `PageContent.tsx`.

The final summary is rendered in `ActivitySummary.tsx`.

Important limitation: user answers are stored in React state only. They are not persisted to a database or local storage. Refreshing the page will lose answers.

### 8. Certificate, Download, And Print Behaviour

There is no separate certificate system in the current app.

Print/download behaviour is in:

- `src/app/components/ActivitySummary.tsx`
- `src/styles/theme.css`

The download button calls:

```tsx
window.print();
```

Print-specific CSS is in `theme.css` under:

```css
@media print {
  ...
}
```

To add a certificate, you would probably add a new page type or expand `ActivitySummary.tsx`.

### 9. Responsiveness And Mobile Layout

Edit:

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`
- `src/styles/theme.css`

The current app is only partly responsive.

Things to check:

- Fixed sidebar width: `w-80`
- Main content shift: `ml-80`
- Large padding: `px-12`, `px-16`
- Large headings: `text-6xl`, `lg:text-7xl`
- Fixed two-column grids: `grid-cols-2`
- Side-by-side controls that should stack on mobile

Tailwind responsive classes look like this:

```tsx
className="grid grid-cols-1 md:grid-cols-2"
```

This means:

- `grid-cols-1`: one column by default, usually mobile.
- `md:grid-cols-2`: two columns on medium screens and larger.

## Beginner-Friendly Concepts

### What Is React?

React is a JavaScript library for building user interfaces from small pieces called components.

In this project:

- `SageAIPlaybook` is a component.
- `PageContent` is a component.
- `ActivitySummary` is a component.

A component is just a function that returns UI:

```tsx
function App() {
  return <RouterProvider router={router} />;
}
```

### What Is Vite?

Vite is the tool that runs and builds the website.

During development, Vite starts a local server with:

```bash
npm run dev
```

For production, Vite builds the site with:

```bash
npm run build
```

### What Is TypeScript?

TypeScript is JavaScript with types.

Types help describe what shape data should have. In `playbookData.ts`, this interface describes a playbook page:

```ts
export interface PlaybookPage {
  id: string;
  type: 'cover' | 'contents' | 'content' | 'summary';
  section?: string;
  title: string;
  subtitle?: string;
  content: ContentBlock[];
}
```

This helps prevent mistakes, such as using an invalid page type.

### What Is TSX?

TSX is TypeScript plus JSX.

JSX lets React components write HTML-like code inside TypeScript:

```tsx
return (
  <div className="bg-black text-white">
    Hello
  </div>
);
```

Files ending in `.tsx` usually contain React components.

### What Are Tailwind Classes?

Tailwind classes are short utility classes used inside `className`.

Example:

```tsx
className="bg-black text-white min-h-screen flex"
```

This means:

- `bg-black`: black background
- `text-white`: white text
- `min-h-screen`: at least full screen height
- `flex`: use flexbox layout

Responsive examples:

```tsx
className="text-3xl md:text-4xl lg:text-5xl"
```

This means:

- `text-3xl`: default size
- `md:text-4xl`: larger on medium screens
- `lg:text-5xl`: larger on large screens

### What Is State?

State is data React remembers while the user interacts with the page.

In this project:

```tsx
const [currentPage, setCurrentPage] = useState(0);
```

This means:

- `currentPage` stores the current page number.
- `setCurrentPage` changes it.
- When it changes, React updates the screen.

Another example:

```tsx
const [userInputs, setUserInputs] = useState<Record<string, string>>({});
```

This stores the user's activity answers.

### What Are Components?

Components are reusable UI pieces.

For example, `SageAIPlaybook.tsx` passes page data into `PageContent`:

```tsx
<PageContent
  page={currentPageData}
  userInput={userInputs[currentPageData.id] || ''}
  onInputChange={(value) => handleInputChange(currentPageData.id, value)}
  goToPage={goToPage}
/>
```

This means `SageAIPlaybook` controls the app state, while `PageContent` handles how the page looks.

## Files Usually Not To Edit

Usually avoid editing:

- `node_modules/`
- `package-lock.json`
- Most files in `src/app/components/ui/`
- `src/main.tsx`
- `src/app/App.tsx`
- `postcss.config.mjs`
- `vite.config.ts`, unless changing build or asset behaviour
- Unused old components such as `Section1.tsx` to `Section7.tsx`, unless you reconnect them

## Practical Editing Advice

For content changes, start with `src/app/data/playbookData.ts`.

For design changes, start with `src/app/components/PageContent.tsx`.

For sidebar, navigation, progress, and mobile shell layout, start with `src/app/SageAIPlaybook.tsx`.

For print/download summary behaviour, start with `src/app/components/ActivitySummary.tsx`.

For global colours and fonts, start with `src/styles/theme.css`.

Before making large changes, decide whether the app should remain an adapted interactive prototype or become a faithful page-by-page version of the imported source playbook.
