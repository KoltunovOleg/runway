# SESSION.md — Current Session State

> Tactical file. Updated at the end of every session via confirmation block.
> Written only after explicit confirmation. Previous state preserved if session interrupted.

---

## Current Session

```
date: null
week: null
day: null
status: null              ← active | completed | abandoned
energy: null              ← high | medium | low | very low
available: null
actual: null

today_objective: null

done: []
in_progress: []
blocked: []

in_progress_files: []

next: null
```

---

## Weekly Evidence

> Accumulates during the week. Transferred to PROGRESS.md on weekly review (Day 7/14/21...).
> Format: "What was demonstrated + how" — not just topic names.

```
weekly_evidence: []
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
