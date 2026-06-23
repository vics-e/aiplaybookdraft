# Progress And Answers Review

This review explains how the app currently handles user progress, visited pages, activity answers, and final summary/download behaviour.

The current implementation works during a single browser session, but it does **not** save progress or answers after refresh, closing the tab, or closing the browser.

## 1. Where Progress Is Tracked In The Code

Progress is tracked in:

- `src/app/SageAIPlaybook.tsx`

The main state variables are:

```tsx
const [currentPage, setCurrentPage] = useState(0);
const [visitedPages, setVisitedPages] = useState<Set<number>>(new Set([0]));
```

### Current Page

`currentPage` stores the index of the page currently being displayed.

It is updated by:

```tsx
const goToPage = (page: number) => {
  if (page >= 0 && page < totalPages) {
    setCurrentPage(page);
    setVisitedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(page);
      return newSet;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
```

This function is used by:

- Sidebar page links.
- Previous button.
- Next button.
- Page dot buttons.
- Cover page start button.
- Contents page cards.

### Visited Pages

`visitedPages` is a `Set<number>` of page indexes that the user has opened.

It is used to:

- Mark pages as visited in the sidebar.
- Show checkmarks for visited pages.
- Calculate section completion.
- Calculate overall progress.
- Highlight visited page dots.

Overall progress is calculated here:

```tsx
Math.round((visitedPages.size / totalPages) * 100)
```

Progress bar width is set with:

```tsx
style={{ width: `${(visitedPages.size / totalPages) * 100}%` }}
```

Section completion is calculated with:

```tsx
const visitedInSection = section.pages.filter(p => visitedPages.has(p.index)).length;
return (visitedInSection / section.pages.length) * 100;
```

### Current Section Progress

The current section progress is also calculated in `SageAIPlaybook.tsx`.

It is based on:

- Current page index.
- Section start page.
- Next section start page.
- Total number of pages.

This is display-only progress. It is not stored separately.

## 2. Where User Answers Are Tracked In The Code

User answers are tracked in:

- `src/app/SageAIPlaybook.tsx`
- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`

The main state variable is in `SageAIPlaybook.tsx`:

```tsx
const [userInputs, setUserInputs] = useState<Record<string, string>>({});
```

Answers are stored by page ID.

Example shape:

```ts
{
  "s1-intro": "{\"question-0\":\"...\",\"question-1\":\"...\"}",
  "s2-policy": "{\"gap-0\":\"...\",\"gap-1\":\"...\"}",
  "s5-shift": "{\"item-0\":\"...\",\"item-1\":\"...\",\"item-2\":\"...\"}"
}
```

The update function is:

```tsx
const handleInputChange = (pageId: string, value: string) => {
  setUserInputs(prev => ({ ...prev, [pageId]: value }));
};
```

`SageAIPlaybook.tsx` passes answers into `PageContent`:

```tsx
<PageContent
  page={currentPageData}
  userInput={userInputs[currentPageData.id] || ''}
  onInputChange={(value) => handleInputChange(currentPageData.id, value)}
  pageInputs={userInputs}
  onUpdatePageInput={handleInputChange}
/>
```

`PageContent.tsx` renders the activity controls and calls `onInputChange`.

Different activity types store data differently:

- Simple text activity: plain string.
- Multi-question activity: JSON string containing question keys.
- Numbered-list activity: JSON string containing item keys.
- Fill-in-the-gaps activity: JSON string containing gap keys.
- Checkbox/task/classification/spec activities: JSON string containing structured values.
- Yes/no activity: plain string, usually `yes` or `no`.

## 3. Are Progress And Answers Saved After Closing The Browser?

No.

The current app does not save progress or answers after:

- Refreshing the page.
- Closing the tab.
- Closing the browser.
- Opening the site on another device.

There is no current use of:

- `localStorage`
- `sessionStorage`
- IndexedDB
- Cookies
- API/backend persistence
- Database
- Login/account system

Progress and answers live only in React state. React state is memory-only and disappears when the page is unloaded.

## 4. Final Summary And Download Behaviour

The final summary is handled by:

- `src/app/components/ActivitySummary.tsx`

It receives all answers through props:

```tsx
export function ActivitySummary({ pageInputs, onInputChange }: ActivitySummaryProps)
```

It builds a list of activities from `playbookData.ts`:

```tsx
const activitiesWithResponses = playbook
  .filter(page => page.activity)
  .map((page, index) => ({
    id: page.id,
    response: pageInputs[page.id] || '',
    ...
  }));
```

It calculates completion:

```tsx
const completedCount = activitiesWithResponses.filter(a => a.response && a.response !== '{}').length;
const totalCount = activitiesWithResponses.length;
const completionPercentage = Math.round((completedCount / totalCount) * 100);
```

It allows editing responses and writes changes back through:

```tsx
onInputChange(activityId, value);
```

The download button uses:

```tsx
const handleDownload = () => {
  window.print();
};
```

Important note:

This is not a real file download system. It opens the browser print dialog. The user can print or save as PDF using browser functionality.

Print styling is partly controlled in:

- `src/styles/theme.css`

inside:

```css
@media print {
  ...
}
```

## 5. Would localStorage Be Enough For A Simple V1?

Yes, for a simple V1, `localStorage` would probably be enough.

It would allow:

- Saving current page.
- Saving visited pages.
- Saving activity answers.
- Restoring progress after refresh.
- Restoring answers after closing and reopening the browser on the same device.

This would be suitable if:

- Users do not need accounts.
- Users only need progress on the same browser and same device.
- The content is not highly sensitive.
- The app is primarily a lightweight interactive workbook.

Suggested V1 storage keys:

```ts
ai-playbook:currentPage
ai-playbook:visitedPages
ai-playbook:userInputs
ai-playbook:version
```

A single state object may be cleaner:

```ts
ai-playbook:progress
```

Example stored shape:

```json
{
  "version": 1,
  "currentPage": 12,
  "visitedPages": [0, 1, 2, 3, 12],
  "userInputs": {
    "s1-intro": "{\"question-0\":\"...\"}",
    "s2-policy": "{\"gap-0\":\"...\"}"
  },
  "updatedAt": "2026-05-07T15:00:00.000Z"
}
```

## 6. Is A Database Or Login Needed?

Not for a simple V1.

You probably do **not** need a database or login if the goal is:

- Single-user local workbook.
- Progress saved only on the same browser.
- No admin dashboard.
- No cross-device sync.
- No central reporting.
- No team tracking.

A database or login would be needed if the goal is:

- Users can return from any device.
- Users can create accounts.
- Progress must sync across browsers.
- Answers must be submitted to an admin or CRM.
- Certificates must be permanently issued.
- Completion must be audited.
- Multiple users in a firm need tracking.
- Data must be retained centrally.

For V1, localStorage is a pragmatic starting point. A backend can be added later if product requirements grow.

## 7. Recommended V1 Approach For Saving Progress And Answers

Recommended V1 approach:

1. Keep the current React state model.
2. Add localStorage persistence around the existing state.
3. Restore saved progress on app load.
4. Save updates whenever progress or answers change.
5. Add a "Reset progress" option.
6. Add a lightweight version number so old saved data can be cleared if the playbook structure changes.

### What To Save

Save:

- `currentPage`
- `visitedPages`
- `userInputs`
- optional `updatedAt`
- optional `contentVersion`

### What Not To Save

Do not bother saving:

- `sidebarOpen`, unless you want to remember user preference.
- `expandedSections`, unless preserving sidebar UI state matters.
- Animation state.
- Derived progress percentages.

Progress percentages can be recalculated from saved `visitedPages`.

### Suggested Behaviour

On page load:

- Read localStorage.
- Validate that saved data exists.
- Validate that saved page IDs still exist in `playbookData.ts`.
- Restore `currentPage`, `visitedPages`, and `userInputs`.
- Fall back to page 0 if saved data is invalid.

On page change or answer change:

- Write the updated state to localStorage.

On reset:

- Clear the localStorage key.
- Reset `currentPage` to 0.
- Reset `visitedPages` to `new Set([0])`.
- Reset `userInputs` to `{}`.

### Recommended Implementation Style

Keep persistence logic in `SageAIPlaybook.tsx` for V1, because that is where the relevant state already lives.

If the file becomes too complex, extract persistence helpers into a small utility file such as:

```text
src/app/utils/playbookStorage.ts
```

## 8. Risks Or Limitations Of localStorage

### Same Browser And Same Device Only

localStorage does not sync across devices.

If the user starts on a laptop and opens the site on a phone, their progress will not be there.

### Can Be Cleared By The User Or Browser

Saved progress can disappear if:

- The user clears browser data.
- The browser clears site storage.
- The user uses private/incognito mode.
- Device management policies clear storage.

### Not Secure For Sensitive Data

localStorage is not appropriate for highly sensitive information.

Activity answers may include firm or client details if users type them in. If confidentiality matters, the app should warn users not to enter sensitive client data or should use a more secure backend design.

### No Built-In Expiry

localStorage persists until removed.

If needed, store an `updatedAt` timestamp and clear old data after a defined period.

### Content Changes Can Break Old Saved Answers

Answers are keyed by page ID and internal field names such as `question-0`, `item-0`, or `gap-0`.

If activities are reordered or changed, old saved answers may map to the wrong question.

Mitigation:

- Add a `contentVersion`.
- Clear or migrate saved data when the playbook changes.

### Storage Size Limits

localStorage is limited, usually around 5 MB per origin.

For text answers in this app, that is likely enough. It would not be enough for file uploads or large generated documents.

### JSON Parsing Risks

Some activity answers are already stored as JSON strings.

Saving the whole `userInputs` object to localStorage means nested JSON strings inside another JSON object. This can work, but parsing and validation should be careful.

## 9. Files And Components That Would Need Changing

### Required For V1 localStorage Persistence

File:

- `src/app/SageAIPlaybook.tsx`

Changes needed:

- Import `useEffect` from React.
- Load saved state on first render.
- Save `currentPage`, `visitedPages`, and `userInputs`.
- Convert `visitedPages` between `Set<number>` and `number[]` for JSON storage.
- Add validation for saved page index and saved page IDs.

Possible new helper file:

- `src/app/utils/playbookStorage.ts`

This could contain:

- `loadPlaybookProgress()`
- `savePlaybookProgress()`
- `clearPlaybookProgress()`
- validation helpers

### Optional Reset Button

File:

- `src/app/SageAIPlaybook.tsx`

Potential placement:

- Sidebar footer near overall progress.
- Activity summary page.

Would need:

- A reset handler.
- Confirmation UI if desired.

### Optional Activity Summary Enhancements

File:

- `src/app/components/ActivitySummary.tsx`

Changes to consider:

- Show "last saved" time.
- Show a clearer "Print / Save as PDF" label instead of "Download / Print Summary".
- Add reset progress or clear answers link.
- Add a note that answers are saved on this device only.

### Optional Print Styling

File:

- `src/styles/theme.css`

Changes to consider:

- Improve printed layout.
- Hide reset buttons in print.
- Add date, completion percentage, or user-entered name if needed.

### No Changes Needed For Activities Data

File:

- `src/app/data/playbookData.ts`

No changes are required just to add localStorage persistence.

However, if adding content versioning, it may be useful to define a constant near the playbook data:

```ts
export const PLAYBOOK_CONTENT_VERSION = 1;
```

Then storage can clear old progress if the structure changes.

## 10. Recommended V1 Decision

For V1, use **localStorage**.

Recommended scope:

- Save current page.
- Save visited pages.
- Save all user answers.
- Restore state on reload.
- Add a clear/reset progress option.
- Add a small note that progress is saved only in this browser.

Do not add login or database unless there is a clear requirement for cross-device access, central reporting, long-term records, certificates, or compliance-grade audit trails.

The current app is already structured in a way that makes localStorage a straightforward upgrade because `SageAIPlaybook.tsx` owns both progress and answer state.
