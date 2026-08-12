# Accessibility and browser QA — 12 August 2026

Scope: production review of [aiplaybook-ve.vercel.app](https://aiplaybook-ve.vercel.app/) plus focused remediation in this branch. This is not a conformance certification.

## Result

The reviewed production experience has a sound accessibility baseline: named navigation and page controls, visible keyboard focus, labelled form fields, a labelled main landmark, theme toggle semantics, and responsive navigation all worked in the available Chromium-based browser. Two WCAG-oriented issues were remediated in source: virtual page changes did not place keyboard/screen-reader focus on the new content heading, and several saved-answer confirmations were visual-only. Reduced-motion support was extended to the Motion component tree.

## Evidence and findings

| Area | Evidence / finding | Result |
| --- | --- | --- |
| Keyboard and focus | Production exposes named sidebar, menu, theme, previous/next, and page controls. The shared `:focus-visible` rule supplies a 3px outline. Focus had no programmatic destination after virtual page navigation. | Fixed: a user-initiated page/section change focuses the current `h1`/`h2` after the transition; headings use `tabIndex={-1}` so they do not enter normal tab order. Relevant: 2.1.1, 2.4.3, 2.4.7. |
| Semantics and names | Production snapshot contained one site `h1`, content `h2`, labelled `main`, labelled navigation `aside`, `nav`, named buttons, `aria-current` page state, and labelled activity regions. | Pass in reviewed routes. Heading levels below the page title vary with supplied content, so a full all-63-page heading audit remains a release check. Relevant: 1.3.1, 2.4.2, 2.4.6, 4.1.2. |
| Forms and saved answers | Textareas, selects, and list fields have visible labels or accessible names and instructions. Answers are saved locally without submission. Empty optional activities intentionally have no validation. Several generic and specialist "saved locally" messages had no status semantics. | Fixed: all reviewed save confirmations are polite, atomic status messages and retain the icon plus text cue. Relevant: 3.3.2, 4.1.3, 1.4.1. |
| Images and visual media | The seven local section photos and the one rendered remote photo are editorial stock photography. They contain no lesson content, text, chart, or instruction not already in the adjacent heading/body copy. Their former alt text repeated the page heading. The cover background is already decorative; opener videos are already `aria-hidden`. | Fixed: editorial photos now use empty alt text, so they are skipped by screen readers. The named Sage logo remains `alt="Sage"`. The fallback image preserves the supplied alt text rather than announcing a generic error. Relevant: 1.1.1. |
| Theme, contrast, and non-colour cues | Light and dark theme toggling works and persists. No horizontal overflow was found at desktop, 390px, or 320px widths. Completion and selection use text, check icons, `aria-current`, or labels in addition to colour. | Pass for sampled paths. Token-level colour assertions exist; this review did not use a separate colour-contrast analyser for every content treatment. Relevant: 1.4.1, 1.4.3, 1.4.11. |
| Motion and media | Global CSS already reduces CSS transition/animation duration; opener videos check `prefers-reduced-motion` before calling `play()`. Motion transitions could still run. Videos are decorative (`aria-hidden`) and retain their first frame if autoplay fails. | Fixed: `MotionConfig reducedMotion="user"` applies the user preference to Motion transitions. Relevant: 2.2.2, 2.3.3. |
| Reflow and responsive layout | At 1440×900, 390×844, and 320×700 CSS-pixel viewports, `scrollWidth` equalled `clientWidth`. The mobile drawer changed to an explicitly named open control; desktop retained the visible sidebar. | Pass for sampled pages. The 320px check is representative of 400% reflow from a 1280px-wide desktop viewport. Relevant: 1.4.10, 2.5.8. |

## Changes in this branch

- Moved focus to the newly rendered page/section heading after keyboard or pointer navigation.
- Applied `reducedMotion="user"` to the Motion tree.
- Added `role="status"`, `aria-live="polite"`, and `aria-atomic="true"` to generic and specialist saved-answer feedback.
- Completed the image inventory: made the eight rendered editorial photos decorative, retained the Sage logo name, and preserved image fallback semantics.
- Added static regression coverage in `tests/accessibility-browser-qa.test.mjs`.

## Image inventory

| Asset / placement | Alt treatment | Reason |
| --- | --- | --- |
| Cover background | Empty | Decorative background only. |
| Sage logos in the sidebar and cover | `Sage` | Identifies the visible brand mark. |
| Section 1 intro, Section 1 role, Section 2, Section 3, Section 4, Section 5, Section 6, and Section 7 photos | Empty | Editorial workplace photography; the surrounding lesson content supplies all instructional meaning. |
| Section opener videos | Hidden from assistive technology | Decorative motion paired with textual section content. |
| Non-rendered data-image references | Not exposed | The corresponding image is replaced by a local section treatment or excluded from rendering. |

If a future photo, screenshot, chart, or diagram adds information not repeated in the text, it must receive a concise description of that information rather than an empty alt text.

## Browser and device matrix

| Browser / device | Status | Coverage |
| --- | --- | --- |
| Codex in-app Browser (Chromium), Windows desktop | Tested | Production keyboard semantics, dark/light toggle, answer-save feedback, desktop reflow, and 390px/320px responsive widths. |
| Chrome desktop outside the in-app browser | Not separately tested | Same rendering engine is represented, but browser-extension, zoom UI, and assistive-technology combinations were not tested. |
| Firefox desktop | Untested | No Firefox instance was available. |
| Safari on macOS / iOS | Untested | No Apple device/browser was available; visual-viewport and media behaviour need device QA. |
| Android Chrome / TalkBack | Untested | No Android device or screen reader was available. |
| Screen readers (NVDA, JAWS, VoiceOver, TalkBack) | Untested | Semantic snapshots and status messaging were reviewed; audible output and browse-mode order require manual assistive-technology QA. |

## Verification

- `npm test` — 35 passing tests, including the new accessibility regression tests.
- `npm run build` — production build succeeded.
- The build reports an existing Vite advisory for a JavaScript chunk over 500kB; it is performance-related, not an accessibility failure.

The production URL reflects the deployed baseline, not this unmerged branch. A local dev-server runtime retest of the new focus behaviour was attempted, but the isolated environment could not expose the freshly started server to the in-app browser; the source regression test and successful production bundle are the available verification for that focused change.
