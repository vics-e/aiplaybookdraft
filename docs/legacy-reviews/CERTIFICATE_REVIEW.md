# Certificate Review

This review explains the current end-of-playbook summary/download/print behaviour and how it could become a proper completion certificate.

The current app does **not** have a dedicated certificate. It has an activity summary page that can be printed through the browser.

## 1. What The App Currently Does At The End

At the end of the playbook, the user reaches two conclusion-style entries in `src/app/data/playbookData.ts`:

1. `s7-finish`
2. `activity-summary`

### `s7-finish`

This is a normal content page:

```ts
{
  id: 's7-finish',
  type: 'content',
  section: 'Conclusion',
  title: 'Building Your **AI-Ready** Firm',
  subtitle: 'You\'re ready to begin',
  ...
}
```

It includes a final activity:

```ts
activity: {
  title: 'Your Next Step',
  prompt: 'What is the ONE action you will take in the next 24 hours to begin your AI journey?'
}
```

### `activity-summary`

This is a special summary page:

```ts
{
  id: 'activity-summary',
  type: 'summary',
  section: 'Conclusion',
  title: 'Activity Summary',
  subtitle: 'Review and download all your responses',
  content: []
}
```

When `PageContent.tsx` sees a page with `type === 'summary'`, it renders `ActivitySummary`:

```tsx
if (page.type === 'summary' && pageInputs && onUpdatePageInput) {
  return (
    <ActivitySummary
      pageInputs={pageInputs}
      onInputChange={onUpdatePageInput}
    />
  );
}
```

The activity summary:

- Lists all activity responses.
- Shows total completed activities.
- Shows completion percentage.
- Allows the user to edit responses.
- Provides a "Download / Print Summary" button.
- Uses `window.print()` to open the browser print dialog.

Current print/download function:

```tsx
const handleDownload = () => {
  window.print();
};
```

Important note:

This is not a generated PDF download. It relies on the browser's print/save-as-PDF feature.

## 2. Files And Components That Control Final Summary, Download, And Print

### `src/app/data/playbookData.ts`

Controls the final pages:

- `s7-finish`
- `activity-summary`

This file determines where the summary page appears in the playbook order.

### `src/app/components/PageContent.tsx`

Detects summary pages and renders `ActivitySummary`.

Relevant logic:

```tsx
if (page.type === 'summary' && pageInputs && onUpdatePageInput) {
  return (
    <ActivitySummary
      pageInputs={pageInputs}
      onInputChange={onUpdatePageInput}
    />
  );
}
```

### `src/app/components/ActivitySummary.tsx`

Controls:

- Activity summary layout.
- Completed activity count.
- Completion percentage.
- Response formatting.
- Editing saved responses.
- Print/download button.
- Print footer date.

Completion calculation:

```tsx
const completedCount = activitiesWithResponses.filter(a => a.response && a.response !== '{}').length;
const totalCount = activitiesWithResponses.length;
const completionPercentage = Math.round((completedCount / totalCount) * 100);
```

Print date:

```tsx
new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
```

### `src/app/SageAIPlaybook.tsx`

Controls:

- Current page.
- Visited pages.
- User answers.
- Overall progress.
- Page navigation.

Certificate logic would probably need data from this file, especially:

```tsx
const [visitedPages, setVisitedPages] = useState<Set<number>>(new Set([0]));
const [userInputs, setUserInputs] = useState<Record<string, string>>({});
```

### `src/styles/theme.css`

Controls print styles through:

```css
@media print {
  ...
}
```

A proper printable certificate would likely need additional print-specific styles here.

## 3. What Would Need To Change To Create A Certificate

To create a proper completion certificate, the app needs a dedicated certificate experience instead of only an activity response summary.

Possible changes:

1. Add a user name input.
2. Track whether the playbook is complete.
3. Decide what "complete" means.
4. Add a certificate page or certificate section.
5. Add certificate-specific print styles.
6. Add a certificate download/print button.
7. Optionally persist completion state with `localStorage`.

### Define Completion

The app needs a clear completion rule.

Options:

- User has visited every page.
- User has completed every activity.
- User has completed a required percentage of activities.
- User reaches the final summary page.
- User clicks a "Complete playbook" button.

For a simple V1, the easiest rule is:

```text
Certificate is available when the user reaches the final summary page.
```

A stronger rule is:

```text
Certificate is available when all pages are visited and all required activities have a response.
```

### Add User Name

The app currently does not collect the user's name.

To include a name on the certificate, add either:

- A name input on the final page.
- A name input at the start of the playbook.
- A name input inside the certificate page.

For V1, the simplest option is a name field on the certificate/summary page.

### Add Certificate Layout

The certificate could be:

- A separate component, for example `Certificate.tsx`.
- A section inside `ActivitySummary.tsx`.
- A new page type such as `type: 'certificate'`.

For maintainability, a separate component is cleaner:

```text
src/app/components/Certificate.tsx
```

## 4. Can The Certificate Use User Name, Completion Date, And Completed Sections?

Yes.

### User Name

Possible, but not currently collected.

Need to add state such as:

```tsx
const [userName, setUserName] = useState('');
```

This could live in:

- `SageAIPlaybook.tsx`, if used across pages.
- `ActivitySummary.tsx`, if only used for certificate printing.

If localStorage is added, the name can be saved locally.

### Completion Date

Yes.

The app already uses:

```tsx
new Date().toLocaleDateString('en-GB', ...)
```

For a real certificate, completion date should ideally be fixed when the user completes the playbook, not recalculated every time the page renders.

For V1:

- Store `completionDate` when the user first opens or generates the certificate.
- Save it in localStorage if persistence is added.

### Completed Sections

Yes.

The app already groups pages by section and calculates progress in `SageAIPlaybook.tsx`.

Possible certificate data:

- Total pages visited.
- Total activities completed.
- Completion percentage.
- Section names completed.

Current available data:

- `visitedPages`
- `playbook`
- `userInputs`
- grouped sections calculated inside `SageAIPlaybook.tsx`
- activity completion calculated inside `ActivitySummary.tsx`

For a certificate, it would be cleaner to extract completion calculations into helper functions so both summary and certificate use the same logic.

## 5. Can This Be Done Without A Database?

Yes.

A simple V1 certificate can be done without a database.

No database is needed if:

- Certificate is generated locally in the browser.
- Certificate is printed or saved as PDF by the user.
- There is no central record of completion.
- There is no need to verify certificates later.
- There is no login/account system.

For V1, local browser state or `localStorage` is enough.

### When A Database Would Be Needed

A database would be needed if:

- Users need to log in and retrieve certificates later.
- Completion must be recorded centrally.
- Admins need to see who completed the playbook.
- Certificates need verification IDs.
- Certificates must be emailed automatically.
- Certificates are compliance or training records.
- Multiple users from the same firm need reporting.

## 6. Options For Print, PDF Download, Or HTML Certificate Page

### Option A: Browser Print Certificate

How it works:

- Render a certificate section/page in HTML.
- Add a "Print / Save as PDF" button.
- Call `window.print()`.
- Use print CSS to hide navigation/sidebar/buttons.

Pros:

- Simple.
- No extra libraries.
- Works in most browsers.
- Good for V1.

Cons:

- Browser print output can vary.
- User has to choose "Save as PDF" manually.
- Not a true one-click PDF download.

### Option B: Dedicated HTML Certificate Page

How it works:

- Add a new certificate page at the end of the playbook.
- The user can view it in the app.
- It includes name, date, completion details, and print button.

Pros:

- Simple.
- Easy to style and test.
- Can work with browser print.
- Keeps certificate separate from activity response summary.

Cons:

- Still not a true generated PDF unless combined with another approach.

### Option C: Client-Side PDF Generation

How it works:

- Use a library such as `html2canvas`, `jsPDF`, or a similar PDF tool.
- Render certificate HTML into a PDF file.
- Trigger file download.

Pros:

- More like a true download.
- Can provide a named PDF file.

Cons:

- Adds dependencies.
- More layout bugs.
- PDF quality can vary.
- Font and image rendering can be tricky.
- More testing required.

### Option D: Server-Generated PDF

How it works:

- Send completion data to a backend.
- Backend generates a PDF certificate.
- User downloads it.

Pros:

- Most reliable for formal certificates.
- Can store certificate records.
- Can create verification IDs.

Cons:

- Requires backend.
- Requires database if records are stored.
- More build complexity.
- Overkill for simple V1.

## 7. Recommended Simple V1 Certificate Approach

Recommended V1 approach:

Use a **dedicated HTML certificate section/page** with browser print/save-as-PDF.

### V1 Scope

Include:

- User name field.
- Completion date.
- Playbook title.
- Completion percentage.
- Number of activities completed.
- Optional list of completed sections.
- Print/save button.

Do not include for V1:

- Login.
- Database.
- Verification ID.
- Server-generated PDF.
- Email delivery.
- Admin reporting.

### Suggested User Flow

1. User reaches `activity-summary`.
2. User reviews answers.
3. User enters their name.
4. User clicks "Generate Certificate" or "Print Certificate".
5. App shows a certificate layout.
6. User prints or saves as PDF through browser print.

### Suggested Completion Rule For V1

Simple rule:

```text
Certificate is available when the user reaches the activity summary page.
```

Better rule:

```text
Certificate is available when the user has visited all playbook content pages.
```

Stricter rule:

```text
Certificate is available when all required activities have responses.
```

Recommended for V1:

```text
Show certificate at the end, but include the completion percentage clearly.
```

This avoids blocking users while still being transparent.

## 8. Files And Components That Would Need Changing

### `src/app/data/playbookData.ts`

Possible changes:

- Add a certificate page after `activity-summary`.
- Or change `activity-summary` title/subtitle to mention certificate.
- Or add a new page type, such as `certificate`.

Current relevant page:

```ts
{
  id: 'activity-summary',
  type: 'summary',
  section: 'Conclusion',
  title: 'Activity Summary',
  subtitle: 'Review and download all your responses',
  content: []
}
```

### `src/app/SageAIPlaybook.tsx`

Likely changes:

- Track `userName`.
- Track or calculate completion status.
- Pass `visitedPages`, `totalPages`, and possibly grouped section data to summary/certificate.
- Optionally store certificate data in localStorage.

Potential new state:

```tsx
const [userName, setUserName] = useState('');
const [completionDate, setCompletionDate] = useState<string | null>(null);
```

### `src/app/components/PageContent.tsx`

Possible changes:

- Render a new `Certificate` component when page type is `certificate`.
- Or pass more props into `ActivitySummary`.

Current summary render may need to become:

```tsx
<ActivitySummary
  pageInputs={pageInputs}
  onInputChange={onUpdatePageInput}
  visitedPages={visitedPages}
  totalPages={totalPages}
/>
```

This would require prop changes.

### `src/app/components/ActivitySummary.tsx`

Likely changes:

- Add a certificate section.
- Add name input.
- Add certificate print button.
- Possibly split response summary print and certificate print into separate actions.
- Show completion date.
- Show completion percentage and completed activity count.

Potential issue:

The current `window.print()` prints the whole page summary. A certificate should probably print only the certificate area or use print CSS to hide the response list when printing a certificate.

### New Optional Component: `src/app/components/Certificate.tsx`

Recommended for clean V1.

This component could receive:

```ts
userName
completionDate
completionPercentage
completedCount
totalCount
completedSections
```

It would render the certificate layout separately from the answer summary.

### `src/styles/theme.css`

Likely changes:

- Add print styles for certificate layout.
- Hide app sidebar, navigation, buttons, and edit controls during certificate print.
- Ensure certificate fits on one page.

Potential print classes:

```css
@media print {
  .certificate-only { ... }
  .print\:hidden { display: none !important; }
}
```

### Optional Helper File

Possible new file:

```text
src/app/utils/completion.ts
```

This could centralize:

- Activity completion calculation.
- Section completion calculation.
- Certificate eligibility.

This would avoid duplicating calculations between `SageAIPlaybook.tsx`, `ActivitySummary.tsx`, and a future `Certificate.tsx`.

## Final Recommendation

For V1, build a simple certificate without a database:

- Add a name field on the final summary/certificate page.
- Use the current completion percentage and activity counts.
- Use the current date as completion date, ideally fixed once generated.
- Add a dedicated certificate layout.
- Use browser print/save-as-PDF through `window.print()`.
- Add print CSS so the certificate prints cleanly.

This is enough for a practical V1 certificate. A database, login, certificate ID, and server-generated PDF can wait until there is a clear requirement for formal tracking or verification.
