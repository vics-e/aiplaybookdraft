# Activity Functionality Review

Review scope:

- page 35
- page 40
- page 43
- page 48
- page 55
- page 57
- page 63

Goal:

- identify what was genuinely broken
- separate that from visual polish
- fix functionality issues only

## Summary

Two page-level functionality issues were confirmed and fixed:

- page 40 activity inputs were not rendering correctly
- page 48 did not properly capture the first agent workflow for the intended takeaway output

One supporting issue was also fixed:

- structured responses for several activity types were saving correctly, but the Activity Summary could show raw JSON instead of readable answers

## Page-by-Page Findings

### Page 35 — Your Starter Prompt Library

Status:

- working

Checks:

- prompt variables are clear
- prompt personalisation works
- copy buttons work
- state persists through existing localStorage-backed page input

Assessment:

- not broken
- remaining work is polish only

### Page 40 — The 70% Question

Status:

- broken before fix

Issue:

- the activity is defined as type `list`
- the renderer only handled `numbered-list`
- result: the intended inputs did not render through the structured list activity path

Fix:

- updated the renderer to support both `list` and `numbered-list` through the same saved-input flow

Assessment:

- genuine functionality issue

### Page 43 — AI Impact Pricing Worksheet

Status:

- working

Checks:

- spec-form fields were usable
- saved state persisted
- no dynamic output was expected on-page

Assessment:

- not broken
- only polish opportunities remain

### Page 48 — Your 90-Day Action Plan

Status:

- broken before fix

Issue:

- the activity prompt says users should define their first agent workflow
- the checkbox-tasks layout did not provide a dedicated workflow answer field
- the takeaway text expected that answer but did not populate from saved input

Fix:

- added a dedicated workflow input above the checklist
- wired that value into saved structured page input
- populated the key takeaway from that saved answer when available

Assessment:

- genuine functionality issue

### Page 55 — Agent Specification Template

Status:

- working

Checks:

- spec-form fields were usable
- saved state persisted
- no dynamic output was expected on-page

Assessment:

- not broken
- mostly polish if further improvements are desired

### Page 57 — AI Tool Usage Matrix

Status:

- working

Checks:

- multi-question inputs were usable
- saved state persisted
- no dynamic output was expected on-page

Assessment:

- not broken
- simple rather than rich, but not dead

### Page 63 — Completion Certificate

Status:

- working

Checks:

- live certificate preview works
- saved name restores correctly
- download/print flow works

Assessment:

- not broken
- any remaining work is polish only

## Supporting Fix

The Activity Summary needed better formatting for saved structured responses.

Before fix:

- some `list`, `spec-form`, and `checkbox-tasks` answers could appear as raw JSON in the summary

After fix:

- those responses are rendered in a readable structured format

## Files Changed

- `src/app/components/PageContent.tsx`
- `src/app/components/ActivitySummary.tsx`

