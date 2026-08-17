# Contributing — Runway

> Conventions for commits, branches, and pull requests.
> Established before first commit. Do not change without strong reason.

---

## Commit Convention

Format: `<type>(<scope>): <subject>`

```
feat(jobs): add pagination to job list
fix(auth): correct refresh token expiry check
refactor(backend): extract token logic to auth.service
docs(readme): add deployment instructions
chore(deps): update prisma to 5.10
perf(jobs): add index on jobs(user_id, status)
test(auth): add integration tests for login endpoint
style(frontend): fix eslint warnings in JobForm
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `refactor` | Code change without new functionality or bug fix |
| `docs` | Documentation only |
| `chore` | Config, dependencies, infrastructure, tooling |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `style` | Formatting, lint fixes — no logic changes |

### Scopes

| Scope | Covers |
|-------|--------|
| `auth` | Authentication and authorization flows |
| `jobs` | Jobs feature (frontend + backend) |
| `interviews` | Interviews feature (frontend + backend) |
| `frontend` | General frontend changes |
| `backend` | General backend changes |
| `db` | Prisma schema, migrations, seed |
| `docker` | Dockerfiles, docker-compose |
| `nginx` | Nginx configuration |
| `deps` | Dependency updates |
| `readme` | README changes |
| `learning` | .learning/ files updates |

### Rules

- Subject: lowercase, no period at the end
- Imperative mood: `add` not `added`, `fix` not `fixed`
- First line: max 72 characters
- Body (optional): explain *why*, not *what*
- No emoji in commit messages

### Examples

```bash
# Good
feat(jobs): add status filter to job list
fix(auth): handle expired refresh token on concurrent requests
refactor(jobs): move filtering logic from controller to service
chore(docker): add healthcheck to postgres service
test(jobs): add integration tests for pagination endpoint
docs(api): document job endpoints with request and response examples

# Bad
fixed bug
WIP
update stuff
feat: added some new features to the jobs thing
```

---

## Branch Convention

### Main branches

```
main    ← always production-ready, merged from dev at weekly milestones
dev     ← primary development branch, all work goes here
```

### Feature branches

```
feat/<description>
fix/<description>
refactor/<description>
chore/<description>
```

```bash
feat/jobs-pagination
feat/auth-refresh-token
feat/interview-management
fix/auth-middleware-401
fix/jobs-filter-query
refactor/backend-error-handler
chore/docker-compose-setup
chore/eslint-config
```

### Rules

- Always branch from `dev`, not `main`
- Delete branch after merge
- One concern per branch
- `main` only receives merges from `dev` at weekly milestones

---

## Pull Request Convention

PRs are weekly milestone merges: `dev → main`.
One PR per week, created at the end of the week as part of weekly review.

### PR Title

```
Week N — <Milestone Name>
```

```
Week 1 — React Internals + TypeScript Foundation
Week 2 — TanStack Query + Forms + Auth UI
Week 3 — Node.js + Express + PostgreSQL + Prisma
Week 4 — Authentication + Full-Stack Integration
Week 5 — Testing + TypeScript Advanced
Week 6 — Docker + Deployment + Portfolio
```

### PR Description Template

```markdown
## Week N — [Milestone Name]

### What's included
- feat(jobs): ...
- feat(auth): ...
- fix(...): ...
- chore(...): ...

### Milestone checklist
- [ ] Milestone goals from ROADMAP.md completed
- [ ] No `any` in TypeScript
- [ ] All new code is typed
- [ ] No leftover console.logs
- [ ] Tested manually (describe what was tested)
- [ ] README updated if needed
- [ ] .learning/PROGRESS.md updated (weekly review done)

### Technical decisions made this week
[What was decided and why — useful for interviews]

### What's next
[Week N+1 focus]
```

### Why bother with PRs on a solo project

- PR description becomes ready material for job interviews
- Forces a structured weekly review
- Clean git history: `main` shows only milestone-level changes
- Demonstrates professional workflow to potential employers

---

## Git Workflow

```bash
# Start of the week — create feature branch if needed
git checkout dev
git pull origin dev
git checkout -b feat/jobs-pagination

# During the day — small focused commits
git add .
git commit -m "feat(jobs): add usePagination hook"
git commit -m "feat(jobs): integrate pagination into JobList"
git commit -m "test(jobs): add usePagination hook tests"

# End of the week — merge to dev, then open PR to main
git checkout dev
git merge feat/jobs-pagination
git push origin dev

# Open PR: dev → main
# After merge — tag the release
git tag -a v0.N.0 -m "Week N: [Milestone Name]"
git push origin --tags
```

---

## Release Tags

One tag per weekly milestone:

```
v0.1.0  ← Week 1: React Internals + TypeScript Foundation
v0.2.0  ← Week 2: TanStack Query + Forms + Auth UI
v0.3.0  ← Week 3: Node.js + Express + PostgreSQL + Prisma
v0.4.0  ← Week 4: Authentication + Full-Stack Integration
v0.5.0  ← Week 5: Testing + TypeScript Advanced
v1.0.0  ← Week 6: Docker + Deployment + Portfolio
```
