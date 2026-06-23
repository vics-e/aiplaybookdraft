# Content Fidelity Review

This review compares the source playbook text in src/imports/ai-playbook-accountants.txt with the live React website content, based on the analysis previously provided in chat. The live site is driven primarily by src/app/data/playbookData.ts and rendered through src/app/components/PageContent.tsx, src/app/SageAIPlaybook.tsx, and src/app/components/ActivitySummary.tsx. Additional component files exist but are not routed in the live app.

## 1) Executive summary
The website is not a strict 1:1 rendering of the source document. The React version is an adapted and expanded digital experience: many sections are reworded, expanded, or rearranged; some pages are merged or relocated; activity formats are changed; and additional web-only pages are added (Activity Summary and Certificate). The content remains broadly faithful in theme and coverage, but it is not a verbatim or page-exact implementation.

## 2) Page-by-page map of source text pages to React files/components

### Live content locations
- Primary content source: src/app/data/playbookData.ts
- Primary renderer: src/app/components/PageContent.tsx
- App routing/shell: src/app/SageAIPlaybook.tsx
- Activity summary output: src/app/components/ActivitySummary.tsx

### Section 1 (Source Pages 1–10)
- Page 1 Cover → React cover page in playbookData (cover type)
- Page 2 Shift to AI-Assisted Firms → s1-intro
- Page 3 Three Stages of AI → s1-stages
- Page 4 Sage AI Practice Framework → s1-framework
- Page 5 Where AI Works Best → s1-where
- Page 6 Capacity Opportunity → s1-capacity
- Page 7 Assistants vs Agents → moved to Section 3 (s3-difference and related pages)
- Page 8 Role of the Accountant → s1-role
- Page 9 Professional Ethics → moved to Section 2 (s2-ethics-responsibility)
- Page 10 Human-in-the-Loop → s1-human-loop

### Section 2 (Source Pages 11–20)
- Page 11 Professional Principles → s2-ethics-responsibility (expanded)
- Page 12 AI Without Process → s2-risk
- Page 13 Minimum AI Policy → s2-policy
- Page 14 Data & Confidentiality → s2-data-confidentiality
- Page 15 Legal Responsibility → s2-legal-responsibility
- Page 16 Failure Modes → s2-failure-modes
- Page 17 Over-Reliance → s2-over-reliance
- Page 18 Four Output Checks → s2-checks
- Page 19 Evidence Trail → s2-evidence-trail
- Page 20 Red-Team Exercise → s2-red-team

### Section 3 (Source Pages 21–35)
- Page 21 Where Assistants Help → s3-where-assistants
- Page 22 Where Agents Transform Work → s3-where-agents
- Page 23 Core Agent Workflows → s3-workflows (expanded)
- Page 24 Agent Maturity Ladder → s3-maturity
- Page 25 Workflow Map → s3-workflow-map
- Page 26 Choose Your First Agent → s3-first-agent
- Pages 27–30 Agent Examples → merged into s3-workflows
- Page 31 Agent Spec Template → s3-spec
- Page 32 Agent Controls Checklist → s3-controls
- Page 33 Building Confidence in Agents → s3-confidence
- Page 34 New Role of the Accountant → moved to Section 1 (s1-role)
- Page 35 AI-Enabled Workflow → s3-ai-workflow

### Section 4 (Source Pages 36–40)
- Page 36 Prompt Framework → s4-framework
- Page 37 Five Prompt Types → s4-types
- Page 38 Prompt Practice → s4-practice
- Page 39 Prompts to Workflows to Agents → s4-progression
- Page 40 Starter Prompt Library → s4-library (expanded)

### Section 5 (Source Pages 41–50)
- Page 41 AI Dividend → s5-dividend
- Page 42 Capacity Question → s5-capacity-question
- Page 43 Time-Based Pricing Unstable → s5-time-pricing
- Page 44 Four Pricing Models → s5-pricing
- Page 45 Shift Effort to Judgement → s5-shift
- Page 46 3V Framework → s5-3v-framework
- Page 47 Service Packages → s5-packages
- Page 48 AI Impact Exercise → s5-impact-exercise
- Page 49 Talking to Clients About AI → s5-client-talk
- Page 50 Pricing Action Checklist → s5-action-checklist

### Section 6 (Source Pages 51–58)
- Page 51 First 30 Days → s6-days1-30
- Page 52 Days 31–60 → s6-days31-60
- Page 53 Days 61–90 → s6-days61-90
- Page 54 Enablement Rhythm → s6-rhythm
- Page 55 AI Scorecard → s6-scorecard
- Page 56 Stop-Doing List → s6-stop-doing
- Page 57 Strategic Questions → s6-strategic-questions
- Page 58 Four Stages of AI-Ready Firm → s6-four-stages

### Section 7 (Source Pages 59–65)
- Page 59 Acceptable Use Policy → s7-policy
- Page 60 Agent Spec Template → s7-agent-spec
- Page 61 Output Review Checklist → s7-checklist
- Page 62 Tool Usage Matrix → s7-tool-matrix
- Page 63 AI File Note Template → s7-file-note
- Page 64 Client AI Communication Template → s7-client-comms
- Page 65 AI Glossary → s7-glossary

### Back Cover (Source Page 66)
- Back cover message → s7-finish (Conclusion)
- Additional React-only pages: activity-summary, certificate

### Unused/older components (content exists in repo but not live)
These are not routed by the live app but contain alternate content versions:
- src/app/components/Hero.tsx
- src/app/components/TableOfContents.tsx
- src/app/components/Section1.tsx
- src/app/components/Section2.tsx
- src/app/components/Section3.tsx
- src/app/components/Section4.tsx
- src/app/components/Section5.tsx
- src/app/components/Section6.tsx
- src/app/components/Section7.tsx

## 3) Pages where source text and website text do not match
- Page 2 Shift to AI-Assisted Firms: reworded and partially expanded.
- Page 4 Framework: expanded into “5 Principles” page with additional text.
- Page 5 Where AI Works Best: reformatted into columns with added highlights.
- Page 6 Capacity Opportunity: reworded and restructured; emphasis changed.
- Page 7 Assistants vs Agents: expanded and split across Section 3 pages.
- Page 9 Professional Ethics: expanded with additional framework text.
- Page 11 Professional Principles: expanded into ethics/responsibility page.
- Pages 16–20: expanded with additional detail, warnings, and examples.
- Pages 21–35: multiple expansions and merges (especially agent examples).
- Page 40 Starter Prompt Library: expanded from 5 prompts to 10 prompts.
- Pages 41–50: expanded with additional rationale, examples, and structure.
- Pages 51–58: condensed but reworded for the web format.
- Pages 59–65: generally similar, but expanded or reformatted in several places.

## 4) Activities/questions missing or changed in the React version
- Multiple activities have changed type or question count (e.g., dropdowns, checklists, spec forms).
- Some source activities are shortened, reworded, or merged into broader multi-question prompts.
- Several activities have added prompts or changed structure to fit web UI patterns.

## 5) Page titles that differ
- Titles often differ in formatting or emphasis (e.g., added emphasis markers, shortened titles).
- Some pages are retitled to fit web navigation or section naming.
- Several source pages are merged into a single React page with a new composite title.

## 6) Content that appears in the React website but is not in the source text
- Activity Summary page (activity-summary)
- Completion Certificate page (certificate)
- Additional expanded explanations, examples, and web-only UX copy

## 7) Verdict
The website is a summarised/adapted prototype rather than a faithful 1:1 digital version of src/imports/ai-playbook-accountants.txt.

## 8) Recommended next steps
1. Decide whether the target is a 1:1 transcription or an adapted web experience.
2. If 1:1 is required, align playbookData content page-by-page with the source, and remove or isolate web-only additions.
3. If adaptation is acceptable, document the intended changes and keep a delta list for editorial review.
4. Confirm which components are authoritative (playbookData vs. unused Section components) to avoid drift.
5. Review activity types and question counts to ensure no required prompts were removed.
