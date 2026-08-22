---
name: explanation-style
description: Use whenever explaining a new React/TypeScript/Node concept to the learner during a Runway learning session — how to explain why code is written a certain way, or teach a new topic. Covers explanation depth (full mechanical chain, not just top-level "why") and structure/language style (esp. for Ukrainian-language sessions). Trigger on "explain", "why is this written this way", "поясни", "чому так написано", or any conceptual teaching moment.
---

# Explanation Style for Runway Learning Sessions

Two rules, both learned from direct user feedback during sessions. Apply both together — completeness and structure are separate axes.

## 1. Completeness — cover the full mechanical chain

When explaining why a piece of code is written a certain way (e.g. why a prop type is named and destructured a certain way), explain the full chain down to fundamentals — not just the highest-level rationale.

**Why this matters:** Skipping foundational links makes the higher-level answer land as unclear even when it's technically correct. Incident: explained why `JobCardProps` is a named type (readability/reuse) but skipped that React always passes a single object as props, and that destructuring is plain JS, not React-specific — the user had to fill the gap themselves.

**How to apply:** Before answering a "why is it written this way" question, mentally lay out the full chain of facts from language/framework fundamentals up to the specific pattern, and check each link is stated — not assumed obvious. Prefer being slightly more thorough over concise when answering a "why" the learner raised themselves (as opposed to a Socratic question posed to test them).

## 2. Structure and language style

**Structure, in order:**
1. Short direct answer first.
2. Separate distinct concepts explicitly rather than blending them in one paragraph — e.g. `.filter()`, memory, the React tree, the DOM, and `React.memo` each get their own labeled section.
3. Step-by-step example with real code, concrete before/after states (e.g. `filteredJobs = [job1, job2, job3]` → `[job1, job3]`).
4. Nuances/caveats — state the conditions under which a claim holds, not just the claim. E.g. "React.memo can skip a re-render" needs the full condition list (wrapped in memo, stable key, same prop reference, no internal state/context change), not an unconditional statement.
5. Short summary at the end, ideally as compact "X ≠ Y" contrasts (Data ≠ UI, Array ≠ objects inside it, re-render ≠ remount, React.memo ≠ useMemo).

**Content precision:**
- Don't overgeneralize the data source — e.g. don't say "jobs is state in the parent" when it may be an imported constant or props. Say "jobs is a data source — could be state, props, an imported array, or an API result."
- Distinguish "not rendered this render" from "was mounted before and got unmounted" — different mechanisms (absence vs. unmount), both worth stating.
- State React.memo's skip-condition as conditional, never absolute.

**Language, for Ukrainian-language sessions:**
- Avoid casual/metaphorical phrasing that can confuse a learner — e.g. "переможці", "вижила після фільтрації", "чекають в памʼяті". Prefer literal terms: "елементи, які пройшли фільтр", "дані існують окремо від UI".
- Use consistent Ukrainian technical terms rather than mixed anglicisms: рендер, ререндер (not "ре-рендер"), перерендерюється, розмонтовується, посилання, поверхневе порівняння.
- Prefer "збігається" over "співпадає".
