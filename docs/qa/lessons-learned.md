# Lessons learned

Every failure found in QA, and what to build in so the next project doesn't
fail the same way. **Check a new project against this list before its first
QA pass.** Add to it at the end of every QA round.

| # | What failed | Check | Where | Lesson: build this in from the start |
|---|---|---|---|---|
| 1 | Number boxes accepted minus values (−6 / −3 minutes gave a positive saving) | manual-06, manual-12 | AI playbook p43 · MTD p06 | Number inputs refuse minus by default (`min="0"`, block the − key and pasted negatives) and say why in red. Add a test. |
| 2 | Brand font files returned 404 (loaded from an external CDN) | manual-07, manual-17 | AI playbook | Self-host the fonts in the repo and check every font file returns 200. |
| 3 | `robots.txt` and `favicon.ico` returned 404 | manual-07 | AI playbook · MTD | Ship both in the starter kit. |
| 4 | Content spilled out of its column at 1080px (glossary cards) | manual-03, manual-04, manual-28 | AI playbook p60 · MTD p10 cards | Size card grids to their container, not the screen; check every page at 320, 767, 768, 1080 and 1920px automatically. |
| 5 | Controls cramped and overlapping at 320px (pricing) | manual-28, release-26 | AI playbook p43 | Design the narrow layout first; include 320px in the automatic width check. |
| 6 | Long certificate names were cut off | manual-13 | AI playbook p63 | Test every text output with long, accented and HTML-like values; show the character limit. |
| 7 | Filtering the glossary didn't update the definition shown | (fix verified 23 Sep) | AI playbook p60 | When a filter changes, re-check every view that depends on it. |
| 8 | "Clear" gave no feedback | manual-14 | AI playbook p31 | Every action confirms itself ("Prompt cleared"), in an accessible live region. |
| 9 | A step could be skipped with too few items | manual-18 | AI playbook p24 | Gates check the rule on every route (Next and the step buttons). |
| 10 | Browser storage full showed "Saved" when it wasn't | manual-33 | AI playbook | Only say "saved" after a successful write; show a clear failure otherwise. |
| 11 | Unknown pages showed a generic error | manual-19 | AI playbook | Ship a branded `404.html`. |

## Patterns

- **Most failures were edge cases, not happy paths:** minus numbers, very long
  text, narrow screens, full storage. Test the edges first.
- **"Passed" needs proof.** The tracker flags a Passed check with no evidence linked.
- **Devices and sign-offs can't be self-tested.** Plan early who has Safari on a
  Mac, an iPhone, an iPad and a Samsung device, and who gives VQA sign-off.
