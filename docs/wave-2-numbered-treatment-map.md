# Wave 2 numbered-content treatment map

This is the approved implementation map for numbered teaching content. It does not authorise changes to activities, saved answers, specialist tools, page wording or page order.

| Treatment | Count | Pages and intent |
|---|---:|---|
| Filled white marker | 3 | 7 `s1-capacity`; 13 `s2-risk`; 17 `s2-checks` — short priority lists whose items should remain visible. |
| Numbered accordion | 16 | 5 `s1-framework`; 10 `s2-ethics-responsibility`; 11 `s2-data-confidentiality`; 12 `s2-legal-responsibility`; 15 `s2-failure-modes`; 19 `s2-red-team`; 28 `s3-controls`; 29 `s3-confidence`; 32 `s4-types`; 36 `s5-dividend`; 39 `s5-pricing`; 41 `s5-3v-framework`; 44 `s5-client-talk`; 46 `s6-days1-30`; 47 `s6-days31-60`; 48 `s6-days61-90` — dense explanations that benefit from progressive disclosure. |
| Editorial numbers | 6 | 4 `s1-stages`; 16 `s2-over-reliance`; 49 `s6-rhythm`; 52 `s6-strategic-questions`; 54 `s7-policy`; 56 `s7-checklist` — short content whose supporting wording should remain visible without a connector line. |
| Joined handoff | 1 | 9 `s1-human-loop` — three related responsibilities shown in one shared frame, with no connector line or hidden copy. |
| Selector + canvas | 8 | 18 `s2-evidence-trail`; 24 `s3-workflow-map`; 25 `s3-first-agent`; 26 `s3-maturity`; 31 `s4-framework`; 34 `s4-progression`; 38 `s5-time-pricing`; 53 `s6-four-stages` — denser multi-part content where readers can deliberately switch between numbered entries. |
| Metric strip | 1 | 50 `s6-scorecard` — five joined measures shown as one scorecard row, with horizontal scrolling on small screens. |

The former horizontal connector-line treatment has been retired. Plain `1, 2, 3` numbering is used throughout—never `01, 02, 03`. Page 5 includes one restrained “Select a principle to explore” cue, while selector pages use a short content-specific instruction. Accordion disclosures still start closed; selector pages open on their first item so the canvas is never empty.

The following numbered-source pages retain their existing specialist presentation: 14 `s2-policy`, 21 `s3-difference`, 22 `s3-where-agents`, 30 `s3-ai-workflow`, 57 `s7-tool-matrix`, and 60 `s7-glossary`.

The shared implementation lives in `src/app/components/NumberedContentTreatments.tsx`. Pages absent from its mapping continue through the existing render path.

## Follow-up visual corrections

- Editorial groups containing two to four items share one desktop row with restrained numerals; they stack naturally on small screens.
- The Page 53 stage selector uses a shorter, top-aligned canvas while the other selector pages retain their original dense-content height.
- A `style: green` source flag no longer creates a generic green-railed card. Genuine learning, control and principle messages use the approved V5 message band; routine supporting content uses a quiet editorial treatment.
- The Page 29 controls activity uses a compact two-column checklist, and the Page 56 quick-review checklist is directly tickable. These are presentation and interaction corrections only; wording and activity intent remain unchanged.
