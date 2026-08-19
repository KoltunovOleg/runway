# SESSION.md — Current Session State

> Tactical file. Updated at the end of every session via confirmation block.
> Written only after explicit confirmation. Previous state preserved if session interrupted.

---

## Current Session

```
date: 2026-08-19
week: 1
day: 2
status: completed
energy: low
available: 1.5h
actual: ~1.5h

today_objective: Write JobList.tsx, wire up mock data, render end-to-end

done:
  - Wrote JobList.tsx: maps Job[] to JobCard per item with job.id as key
  - Debugged own mistakes independently after hints: invalid map callback (missing return), invalid prop syntax ({ ...destructure }: job) instead of job={job}, and placing an if-statement inside JSX instead of before the return
  - Added empty-state handling (if jobs.length === 0 return fallback message)
  - Made independent architecture call to put mock data in src/mocks/ instead of a root-level dir, correctly reasoning about Vite/TS resolution constraints
  - Created src/mocks/jobs.mock.ts with 10 typed Job objects
  - Wired JobList + mockJobs into App.tsx, verified rendering in browser (npm run dev)

in_progress: []

blocked: []

in_progress_files: []

next: Day 3 — useState, batching, controlled inputs, state lifting. Build JobFilter with search + status select.
```

---

## Weekly Evidence

> Accumulates during the week. Transferred to PROGRESS.md on weekly review (Day 7/14/21...).
> Format: "What was demonstrated + how" — not just topic names.

```
weekly_evidence:
  - Explained reconciliation render/commit split and why it's split that way (visual tearing) — K:3
  - Explained index-as-key bug with a concrete stateful-list scenario without hints — K:4 level reasoning
  - Wrote Job type independently, correct TS syntax, no hints needed
  - Correctly explained why type-only imports are required under verbatimModuleSyntax — K:3 reasoning, no notes
  - Correctly distinguished when keys are/aren't needed (static JSX vs mapped array) — K:3
  - Chose <dl> over <ul> for semantic correctness independently — K:2/3 practical judgment
  - Asked why JobCardProps is named/destructured — Claude's initial explanation was incomplete (skipped "props is always an object" and destructuring-is-plain-JS); user resolved externally and via follow-up, no score claimed here
  - Wrote JobList.tsx map+key logic correctly on first attempt (structure, not syntax)
  - Self-diagnosed "array of undefined" bug from a missing return in an arrow function block body, without hints — P:3 level reasoning
  - Correctly identified JSX cannot contain statements (if) and relocated an if-check to the function body after a nudge about JS-vs-JSX zones — P:2/3
  - Independently reasoned about mock data location using Vite/TS module resolution constraints (src/ boundary) — K:2/3 practical judgment
```

---

## Session History

> Last 5 sessions for context. Older sessions are removed.

```
sessions: []
```

---

## Usage Notes

**Starting a session:**
```
Continue my learning plan.
```
or
```
Continue my learning plan. Energy: low. Time: 2 hours.
```

**Status values:**
- `active` — session in progress
- `completed` — session finished, file confirmed and written
- `abandoned` — session interrupted before confirmation

**What triggers Recovery dialog:**
- `status: active` and `date != today`
- `status: abandoned`

**Evidence format (for weekly_evidence):**
```
- Implemented useDebounce without hints (Day 4)
- Explained stale closure edge case correctly (Day 4)
- Found missing cleanup bug in provided code (Day 4)
- Wrote JobForm validation schema from scratch (Day 10)
```

**In-progress files format:**
```
in_progress_files:
  - frontend/src/shared/hooks/useDebounce.ts
  - frontend/src/features/jobs/components/JobFilter.tsx
```
