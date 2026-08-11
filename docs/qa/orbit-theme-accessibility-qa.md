# Orbit theme accessibility and responsive QA

Checked locally on 11 August 2026. This is an implementation QA record, not a claim of formal WCAG certification.

## Accessibility checks

- Both Orbit themes use Sage semantic roles: dark uses Brilliant Green for interactive emphasis; light uses Hero Green for UI emphasis and the approved darker link green for focus/link use.
- Light-theme page text, muted text, rules, surfaces, sidebar, activity controls and navigation were visually checked; content no longer relies on white utility text in the light theme.
- The Orbit control is a native button with an accessible next-action name, `aria-pressed` state, pointer/keyboard operation, visible focus, tooltip and reduced-motion handling.
- Existing navigation drawer buttons retain labels, expanded state and controls relationships. Mobile drawer checks covered open, close, backdrop and Escape behaviour in code and local browser use.
- Representative interactive activities expose labelled fields, prompt/help descriptions, tabs and disclosure states. Existing automated checks cover these semantics.
- Reflow was checked at 390px, 768px and 1280px without horizontal overflow. The Orbit control remains in the same top-right position.
- Reduced motion disables transitions and animations globally; section opener video already avoids autoplay for users who prefer reduced motion.

## Browser QA

- Chromium local QA: dark and light themes; Orbit hover/focus/keyboard and click activation; cover, contents, activity page, section opener/video and conclusion; sidebar open/closed desktop and mobile states.
- No console errors were recorded during the local QA run. No horizontal overflow was detected at the tested sizes.
- Safari and Firefox were not available locally. Code-level compatibility was reviewed: the implementation uses native buttons, CSS custom properties, `color-mix()`, `@media (prefers-reduced-motion)` and standard focus styles. `color-mix()` requires current Safari/Firefox versions; older browser support has not been manually verified.

## Known limitations

- Manual testing does not replace assistive-technology testing with a screen reader, keyboard-only user, or automated contrast analyser across every individual activity state.
- The project has pre-existing dependency audit findings from `npm ci`; they were not changed as part of this visual/accessibility task.
