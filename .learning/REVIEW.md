# REVIEW.md — Spaced Repetition Queue

> Updated weekly (Day 7 / 14 / 21 / 28 / 35 / 42).
> Hard cap: 20 topics maximum. Daily cap: 20 minutes maximum.
> Priority: overdue with lowest score → other overdue → scheduled today.

---

## Queue Rules

**Intervals by Min(Knowledge, Practical):**

| Min(K, P) | Next review |
|-----------|-------------|
| 1–2 | +1 day |
| 3 | +3 days |
| 4 | +7 days |
| 5 | +14 days |

**Modifiers:**
- New code evidence added → double the interval
- Error or failure during review → reset to +1 day

**Graduation:** topic leaves queue permanently at `K ≥ 5 AND P ≥ 4` or `K ≥ 4 AND P ≥ 5`

**Cap:** if adding new topics exceeds 20 → drop topics with highest Min(K, P) first

---

## Today (0)

> Empty — no reviews scheduled yet.

---

## Upcoming (2)
- React Reconciliation + Rendering Model    K:4 P:0    due: +7d (2026-08-25)
- useDebounce (custom hook)    K:3 P:3    due: +10 sessions   [custom interval, requested by user, counted in sessions not calendar days]



---

## Graduated (0)

> Topics that have permanently left the queue.
> Condition: K ≥ 5 AND P ≥ 4 or K ≥ 4 AND P ≥ 5

---

## Queue Stats

```
total_in_queue: 0
overdue: 0
due_today: 0
upcoming: 0
graduated: 0
cap: 20
last_updated: null
```

---

## Format Reference

> How topics appear once added to the queue.

```
## Today [N]
- [Topic Name]    K:N P:N    due: today
- [Topic Name]    K:N P:N    due: overdue+Nd

## Upcoming [N]
- [Topic Name]    K:N P:N    due: +Nd  (YYYY-MM-DD)
- [Topic Name]    K:N P:N    due: +Nd  (YYYY-MM-DD)

## Graduated [N]
- [Topic Name]    K:N P:N    graduated: YYYY-MM-DD
```

---

## Review Session Format

> How Claude runs a review check (max 20 min/day, 3–5 topics).

For each topic Claude picks one of:
- Conceptual question — "Explain X without notes"
- Trade-off question — "When would you NOT use X?"
- Code exercise — "Write X given only this signature: ..."
- Bug find — "What's wrong with this code?"
- Comparison — "What's the difference between X and Y?"

After response Claude proposes:
- Confirmed score → interval doubles or resets
- Topic stays in or leaves queue accordingly
