# Page Audit

Audit source: `src/app/data/playbookData.ts` and page-number labels rendered from the contents page in `PageContent.tsx`.

## Summary

| Activity type | Total |
| --- | ---: |
| `checkbox-tasks` | 6 |
| `dropdown` | 1 |
| `fill-gaps` | 1 |
| `list` | 2 |
| `multi-question` | 40 |
| `spec-form` | 3 |
| `task-classification` | 1 |
| `text` | 2 |
| `yes-no` | 1 |

Pages with displayed page-number mismatches from the contents page:

| Section start page | Contents page label | Actual sequence position |
| --- | ---: | ---: |
| The Shift to AI-Assisted Firms | 2 | 3 |
| Professional Ethics and Responsibility in an AI World | 9 | 10 |
| Where Assistants Help | 19 | 20 |
| The Accountant's Prompt Framework | 30 | 31 |
| Understanding the AI Dividend | 35 | 36 |
| The First 30 Days: Build the Foundations | 38 | 46 |
| AI Acceptable Use Policy (Starter Template) | 46 | 54 |
| Building Your AI-Ready Firm | 53 | 61 |

## Pages

| Seq. | Page | Interactive activity / control(s) | Image? | Displayed page no. | Actual position | Mismatch? | Notes |
| ---: | --- | --- | :---: | --- | ---: | :---: | --- |
| 1 | 1. The AI Playbook | None | Yes | 1 | 1 | No |  |
| 2 | 2. Contents | None | No | 2 | 2 | No |  |
| 3 | 3. The Shift to AI-Assisted Firms | Capacity Reflection - 2 textarea answer(s) (multi-question) | Yes | 3 (footer), 2 (contents) | 3 | Yes | Contents page shows 2; actual section start is 3. |
| 4 | 4. The Three Stages of AI | Identify Your Stage - single select dropdown with 5 option(s) (dropdown) | No | 4 | 4 | No |  |
| 5 | 5. The 5 Principles of AI-Ready Firms | None | No | 5 | 5 | No |  |
| 6 | 6. Where AI Works Best | Task Assessment - 5 task row(s), each with text input + radio classification + checkbox (task-classification) | No | 6 | 6 | No |  |
| 7 | 7. The Capacity Opportunity | The Capacity Question - 3 textarea answer(s) (multi-question) | No | 7 | 7 | No |  |
| 8 | 8. The New Role of the Accountant | Role Reflection - 2 textarea answer(s) (multi-question) | Yes | 8 | 8 | No |  |
| 9 | 9. The Human-in-the-Loop Model | Define Your Review Rule - single long-text textarea (text) | No | 9 | 9 | No |  |
| 10 | 10. Professional Ethics and Responsibility in an AI World | Professional Judgement Reflection - 3 textarea answer(s) (multi-question) | No | 10 (footer), 9 (contents) | 10 | Yes | Contents page shows 9; actual section start is 10. |
| 11 | 11. Data and Confidentiality in an AI World | Data Boundary Exercise - 3 textarea answer(s) (multi-question) | No | 11 | 11 | No |  |
| 12 | 12. Legal Responsibility Does Not Change | Responsibility Reflection - 3 textarea answer(s) (multi-question) | No | 12 | 12 | No |  |
| 13 | 13. The Real Risk: AI Without Process | Process Confidence Check - yes/no radio choice (yes-no) | No | 13 | 13 | No |  |
| 14 | 14. The Minimum AI Policy | Your Starting Rule - fill-in-the-blanks text inputs (fill-gaps) | No | 14 | 14 | No |  |
| 15 | 15. Common AI Failure Modes | Failure-Spotting Activity - 3 textarea answer(s) (multi-question) | No | 15 | 15 | No |  |
| 16 | 16. Avoiding Over-Reliance on AI | Over-Reliance Reflection - 3 textarea answer(s) (multi-question) | No | 16 | 16 | No |  |
| 17 | 17. The 4 Output Checks | None | No | 17 | 17 | No |  |
| 18 | 18. Creating an AI Evidence Trail | Build a File Note Rule - 3 textarea answer(s) (multi-question) | No | 18 | 18 | No |  |
| 19 | 19. The Red-Team Exercise | Red-Team Exercise - 3 textarea answer(s) (multi-question) | No | 19 | 19 | No |  |
| 20 | 20. Where Assistants Help | Assistant vs. Agent Assessment - 2 textarea answer(s) (multi-question) | No | 20 (footer), 19 (contents) | 20 | Yes | Contents page shows 19; actual section start is 20. |
| 21 | 21. Assistants vs Agents: The New Way Work Gets Done | Identify Agent-Suitable Processes - 3 textarea answer(s) (multi-question) | Yes | 21 | 21 | No |  |
| 22 | 22. Where Agents Transform Work | Agent Candidate Check - 3 task block(s) with text input(s) and checklist criteria (checkbox-tasks) | No | 22 | 22 | No |  |
| 23 | 23. The Core Agent Workflows in a Firm | Choose Your Starting Workflow - 3 textarea answer(s) (multi-question) | No | 23 | 23 | No |  |
| 24 | 24. The Workflow Map: Where Agents Work Best | Map Your Workflows - 3 textarea answer(s) (multi-question) | No | 24 | 24 | No |  |
| 25 | 25. How to Choose Your First Agent | Select Your First Agent - 3 textarea answer(s) (multi-question) | No | 25 | 25 | No |  |
| 26 | 26. The Agent Maturity Ladder | Identify Your Stage - 2 textarea answer(s) (multi-question) | No | 26 | 26 | No |  |
| 27 | 27. The Agent Spec Template | Plan Your First Agent - 8 structured textarea field(s) (spec-form) | No | 27 | 27 | No |  |
| 28 | 28. The Agent Controls Checklist | Control Assessment - 1 task block(s) with text input(s) and checklist criteria (checkbox-tasks) | No | 28 | 28 | No |  |
| 29 | 29. Building Confidence in Agents | Confidence-Building Plan - 3 textarea answer(s) (multi-question) | No | 29 | 29 | No |  |
| 30 | 30. The AI-Enabled Workflow | Envision Your AI-Enabled Workflow - 3 textarea answer(s) (multi-question) | No | 30 | 30 | No |  |
| 31 | 31. The Accountant's Prompt Framework | Rewrite a Weak Prompt - 5 textarea answer(s) (multi-question) | No | 31 (footer), 30 (contents) | 31 | Yes | Contents page shows 30; actual section start is 31. |
| 32 | 32. The Five Prompt Types Every Accountant Should Know | Prompt Type Exercise - 5 textarea answer(s) (multi-question) | No | 32 | 32 | No |  |
| 33 | 33. Prompt Practice: From Basic to Structured | Basic-to-Structured Practice - 3 textarea answer(s) (multi-question) | No | 33 | 33 | No |  |
| 34 | 34. From Prompts to Workflows to Agents | Workflow Progression - 3 textarea answer(s) (multi-question) | No | 34 | 34 | No |  |
| 35 | 35. Your Starter Prompt Library | Build Your Prompt Library - 3 textarea answer(s) (multi-question) | No | 35 | 35 | No |  |
| 36 | 36. Understanding the AI Dividend | Identify Your AI Dividend - 3 numbered text input(s) (list) | Yes | 36 (footer), 35 (contents) | 36 | Yes | Contents page shows 35; actual section start is 36. |
| 37 | 37. The Capacity Question | The Capacity Question - 3 textarea answer(s) (multi-question) | No | 37 | 37 | No |  |
| 38 | 38. Why Time-Based Pricing Becomes Unstable | Pricing Pressure Reflection - 3 textarea answer(s) (multi-question) | No | 38 | 38 | No |  |
| 39 | 39. The Four Pricing Models in an AI World | Pricing Model Review - 3 textarea answer(s) (multi-question) | No | 39 | 39 | No |  |
| 40 | 40. The Shift from Effort to Judgement | The 70% Question - 3 numbered text input(s) (list) | No | 40 | 40 | No |  |
| 41 | 41. The 3V Pricing Framework | Apply the 3V Framework - 3 textarea answer(s) (multi-question) | No | 41 | 41 | No |  |
| 42 | 42. Designing AI-Era Service Packages | Design Your Package - 3 textarea answer(s) (multi-question) | No | 42 | 42 | No |  |
| 43 | 43. The AI Impact Pricing Exercise | AI Impact Pricing Worksheet - 15 structured textarea field(s) (spec-form) | No | 43 | 43 | No |  |
| 44 | 44. Talking to Clients About AI | Draft Your Client Message - 3 textarea answer(s) (multi-question) | No | 44 | 44 | No |  |
| 45 | 45. Pricing Action Checklist | Pricing Action Checklist - 7 task block(s) with text input(s) and checklist criteria (checkbox-tasks) | No | 45 | 45 | No |  |
| 46 | 46. The First 30 Days: Build the Foundations | Your 30-Day Action Plan - 1 task block(s) with text input(s) and checklist criteria (checkbox-tasks) | No | 46 (footer), 38 (contents) | 46 | Yes | Contents page shows 38; actual section start is 46. |
| 47 | 47. Days 31–60: Move from Prompts to Workflows | Your 60-Day Action Plan - 1 task block(s) with text input(s) and checklist criteria (checkbox-tasks) | No | 47 | 47 | No |  |
| 48 | 48. Days 61–90: Introduce Your First Agent | Your 90-Day Action Plan - 1 task block(s) with text input(s) and checklist criteria (checkbox-tasks) | No | 48 | 48 | No |  |
| 49 | 49. The AI Enablement Rhythm | Set Your Rhythm - 2 textarea answer(s) (multi-question) | No | 49 | 49 | No |  |
| 50 | 50. The AI Scorecard | Choose Your Metrics - 2 textarea answer(s) (multi-question) | No | 50 | 50 | No |  |
| 51 | 51. The Stop-Doing List | Your Stop-Doing List - 3 textarea answer(s) (multi-question) | No | 51 | 51 | No |  |
| 52 | 52. Three Strategic Questions for the AI-Ready Firm | Your Strategic Answers - 3 textarea answer(s) (multi-question) | No | 52 | 52 | No |  |
| 53 | 53. The Four Stages of the AI-Ready Firm | Stage Assessment - 2 textarea answer(s) (multi-question) | No | 53 | 53 | No |  |
| 54 | 54. AI Acceptable Use Policy (Starter Template) | Adapt This Policy - 3 textarea answer(s) (multi-question) | No | 54 (footer), 46 (contents) | 54 | Yes | Contents page shows 46; actual section start is 54. |
| 55 | 55. Agent Specification Template | Agent Specification Template - 11 structured textarea field(s) (spec-form) | No | 55 | 55 | No |  |
| 56 | 56. AI Output Review Checklist | Embed the Checklist - 1 textarea answer(s) (multi-question) | No | 56 | 56 | No |  |
| 57 | 57. AI Tool Usage Matrix | Create Your Matrix - 3 textarea answer(s) (multi-question) | No | 57 | 57 | No |  |
| 58 | 58. AI File Note Template | Define Your File Note Policy - 1 textarea answer(s) (multi-question) | No | 58 | 58 | No |  |
| 59 | 59. Client AI Communication Template | Write Your AI Statement - 1 textarea answer(s) (multi-question) | No | 59 | 59 | No |  |
| 60 | 60. AI Glossary | None | No | 60 | 60 | No |  |
| 61 | 61. Building Your AI-Ready Firm | Your Next Step - single long-text textarea (text) | No | 61 (footer), 53 (contents) | 61 | Yes | Contents page shows 53; actual section start is 61. |
| 62 | 62. Activity Summary | None | No | 62 | 62 | No |  |
| 63 | 63. Completion Certificate | Personalize Your Certificate - 1 textarea answer(s) (multi-question) | No | 63 | 63 | No |  |
