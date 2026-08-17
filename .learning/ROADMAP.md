# ROADMAP.md — Runway Learning Plan

> Strategic 6-week plan. Do not modify without explicit confirmation.
> Last confirmed: 2026-08-17
> Target: Middle Full-Stack JavaScript/TypeScript Developer

---

## Overview

| Week | Focus | Project Milestone |
|------|-------|-------------------|
| 1 | TypeScript + React Internals | Typed components, routing, mock data |
| 2 | TanStack Query + Forms + Auth UI | Full frontend on mock API |
| 3 | Node.js + Express + PostgreSQL + Prisma | Working REST API for all entities |
| 4 | Authentication + Full-Stack Integration | Live app: frontend ↔ backend ↔ DB |
| 5 | Testing + TypeScript Advanced + Interview Prep | Test coverage + mock interviews |
| 6 | Docker + Deployment + System Design + Portfolio | App live on VPS with HTTPS |

---

## Week 1 — React Internals + TypeScript Foundation

**Days:** 1–7
**Hours:** ~4–5h/day

### Topics

| Day | Topic | Project Task |
|-----|-------|--------------|
| 1 | Repo setup · tsconfig · ESLint · Prettier · path aliases | Initialize monorepo, `frontend/` with Vite+React+TS |
| 2 | Reconciliation · Virtual DOM · Fiber · keys | `JobCard`, `JobList` with typed props |
| 3 | useState · batching · controlled inputs · state lifting | `JobFilter` with search + status select |
| 4 | useEffect · cleanup · dependency array · when NOT to use | `useDebounce` custom hook |
| 5 | useMemo · useCallback · React.memo · referential equality | Memoized filtered list, DevTools profiling |
| 6 | Context API · React Router v6 · protected routes · layouts | `AuthContext`, routing, `ProtectedRoute` |
| 7 | **Weekly review** · random knowledge check · README | Zero `any`, README with local setup |

### Milestone Checklist

- [ ] Explain reconciliation without notes
- [ ] Write a custom hook from scratch
- [ ] Explain controlled vs uncontrolled inputs
- [ ] Name 3 situations where useEffect is NOT needed
- [ ] Explain when useCallback/useMemo is actually useful
- [ ] Set up React Router with protected routes and layouts

### Interview Questions (Week 1)

- What is reconciliation? What happens to the DOM when state changes?
- Why is `index as key` a bad idea?
- What does "state as a snapshot" mean?
- When does a component re-render?
- What is the difference between render phase and commit phase?
- Why does React Strict Mode run effects twice?
- What is a stale closure in the context of useEffect?
- When is useMemo harmful?

---

## Week 2 — TanStack Query + Forms + Auth UI

**Days:** 8–14
**Hours:** ~4–5h/day

### Topics

| Day | Topic | Project Task |
|-----|-------|--------------|
| 8 | Server state vs client state · query keys · staleTime · gcTime | `useJobs` hook, QueryClient config, mock server |
| 9 | useMutation · onSuccess/onError · cache invalidation · optimistic updates | `useCreateJob`, `useUpdateJobStatus`, `useDeleteJob` |
| 10 | react-hook-form · Controller · Zod · z.infer · server errors | `JobForm` (create + edit), `job.schema.ts` |
| 11 | Pagination · keepPreviousData · dependent queries · select | Pagination controls, `usePagination`, `useInterviews(jobId)` |
| 12 | Loading/error/empty states · generics · utility types · type narrowing | `AsyncState<T>`, typed API responses, type guards |
| 13 | AuthContext · API client · interceptors · 401 handling · intended route | `LoginPage`, `RegisterPage`, `api-client.ts` |
| 14 | **Weekly review** · random knowledge check · TypeScript polish | Zero `any`, TanStack DevTools audit |

### Milestone Checklist

- [ ] Explain why client state ≠ server state
- [ ] Write useMutation with optimistic update without hints
- [ ] Explain query key caching
- [ ] Implement Zod schema + react-hook-form independently
- [ ] Write a generic TypeScript hook

### Interview Questions (Week 2)

- Why does TanStack Query exist? What problem does it solve?
- What is staleTime and what is the default value?
- How does cache invalidation work after a mutation?
- How does optimistic update rollback work on error?
- Why does react-hook-form generate fewer re-renders?
- What is `z.infer` and why use it?
- What is the difference between `unknown` and `any`?
- What is type narrowing? How do you write a type guard?

---

## Week 3 — Node.js + Express + PostgreSQL + Prisma

**Days:** 15–21
**Hours:** ~4–5h/day

### Topics

| Day | Topic | Project Task |
|-----|-------|--------------|
| 15 | Node.js runtime · event loop · async I/O · modules · env vars | `backend/` setup, `tsconfig.json`, env validation with Zod |
| 16 | Express · routing · middleware chain · controller→service pattern | App structure, `app.ts`, `server.ts`, graceful shutdown |
| 17 | Prisma schema · migrations · relations · seed | `schema.prisma` (User, Job, Interview, RefreshToken), first migration |
| 18 | PostgreSQL · SELECT/INSERT/UPDATE/DELETE · JOIN · GROUP BY · indexes | Raw SQL practice, EXPLAIN, understand what Prisma generates |
| 19 | REST API design · HTTP status codes · Zod validation · error handler | Jobs CRUD API (without auth), centralized error middleware |
| 20 | Pagination · filtering · sorting · search on backend | `GET /api/jobs?page=1&limit=10&status=applied&search=google` |
| 21 | **Weekly review** · random knowledge check · API testing with REST client | All endpoints tested, schema documented |

### Milestone Checklist

- [ ] `GET /api/jobs` returns paginated result with total count
- [ ] `POST /api/jobs` with invalid body → 422 with field details
- [ ] All 404 and 500 errors have the same format
- [ ] Schema documented in `prisma/schema.prisma` with comments
- [ ] Explain middleware chain execution order
- [ ] Write a controller → service without a template

### SQL to Know (independent of Prisma)

```sql
-- Pagination
SELECT * FROM jobs WHERE user_id = $1
  ORDER BY created_at DESC LIMIT 10 OFFSET 20;

-- Filtering + search + aggregate
SELECT j.*, COUNT(i.id) AS interview_count
  FROM jobs j
  LEFT JOIN interviews i ON i.job_id = j.id
  WHERE j.user_id = $1
    AND j.status = 'applied'
    AND j.company ILIKE '%google%'
  GROUP BY j.id;

-- Query plan
EXPLAIN ANALYZE SELECT ...;
```

### Interview Questions (Week 3)

- How does Node.js handle async I/O without threads?
- What is the middleware chain in Express?
- Why controller → service pattern?
- What is the difference between 400 / 401 / 403 / 422 / 500?
- What are indexes and when should you add them?
- What is the N+1 problem?
- What is a database transaction and when is it needed?

---

## Week 4 — Authentication + Full-Stack Integration

**Days:** 22–28
**Hours:** ~4–5h/day

### Topics

| Day | Topic | Project Task |
|-----|-------|--------------|
| 22 | bcrypt · password hashing · salt rounds · timing attacks | `auth.service.ts`: register, hash, compare |
| 23 | JWT · access token · refresh token · token rotation · HttpOnly cookie | `auth.service.ts`: login, generateTokens, refreshToken |
| 24 | Auth middleware chain · extractToken → verifyToken → attachUser | `auth.middleware.ts`, protect all routes |
| 25 | Row-level security · CORS · rate limiting | Jobs/Interviews: `WHERE user_id = req.user.id` on every query |
| 26 | Connect frontend to real backend · remove mock server | Replace mock API with real endpoints, fix CORS |
| 27 | E2E flow testing · error handling audit · logging | Full flow: register → login → CRUD → logout → login → data persists |
| 28 | **Weekly review** · random knowledge check · security audit | 401 auto-redirect, refresh rotation verified |

### Auth Middleware Chain

```
Request
  → extractToken (Authorization header OR cookie)
  → verifyToken (JWT verify, check expiry)
  → attachUser (req.user = decoded payload)
  → checkOwnership (resource.userId === req.user.id)
  → Controller
```

### Milestone Checklist

- [ ] Register → login → create jobs → logout → login → jobs persisted
- [ ] Another user cannot see someone else's jobs
- [ ] Refresh token rotation works (new refresh token on every refresh)
- [ ] Frontend: 401 → automatic redirect to `/login`
- [ ] Explain sessions vs JWT trade-offs
- [ ] Explain why HttpOnly cookie, not localStorage

### Interview Questions (Week 4)

- What is the difference between authentication and authorization?
- Why bcrypt and not MD5/SHA?
- What is refresh token rotation and why does it matter?
- What is CSRF and how to protect against it?
- What is CORS and why is it needed?
- How does the auth middleware chain work?
- Where do you store access tokens on the client?

---

## Week 5 — Testing + TypeScript Advanced + Interview Prep

**Days:** 29–35
**Hours:** ~4–5h/day

### Topics

| Day | Topic | Project Task |
|-----|-------|--------------|
| 29 | Test pyramid · unit tests · Vitest setup | `auth.service.test.ts`: bcrypt, JWT, token validation |
| 30 | Integration tests · supertest · test database | `jobs.integration.test.ts`: CRUD with real DB |
| 31 | Frontend testing · Vitest + Testing Library | `JobForm.test.tsx`, `JobList.test.tsx` |
| 32 | TypeScript advanced: discriminated unions · mapped types · conditional types | Refactor API types, typed error responses |
| 33 | Performance: lazy loading · code splitting · bundle analysis | Lazy routes, measure bundle size before/after |
| 34 | SQL: EXPLAIN · indexes · query optimization | Add indexes on `jobs(user_id, status)`, measure query time |
| 35 | **Weekly review** · mock interview session · gap analysis | Answer 20+ interview questions out loud |

### TypeScript Advanced Patterns

```typescript
// Discriminated unions
type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// Mapped types
type ReadonlyJob = { readonly [K in keyof Job]: Job[K] };

// Conditional types
type Awaited<T> = T extends Promise<infer U> ? U : T;
```

### Milestone Checklist

- [ ] 80%+ coverage for critical backend code
- [ ] 3+ frontend component tests
- [ ] Explain event loop with microtask/macrotask queue without notes
- [ ] Explain React rendering model without notes
- [ ] Explain discriminated unions and when to use them

### Interview Questions (Week 5)

- What is the test pyramid?
- What is the difference between unit and integration tests?
- What is a microtask vs macrotask? Give examples.
- What is a closure? Give a real-world example.
- What is a discriminated union?
- How does code splitting work in Vite?
- How do you optimize a slow SQL query?

---

## Week 6 — Docker + Deployment + System Design + Portfolio

**Days:** 36–42
**Hours:** ~4–5h/day

### Topics

| Day | Topic | Project Task |
|-----|-------|--------------|
| 36 | Docker basics · Dockerfile · multi-stage build | `frontend/Dockerfile` (build → nginx), `backend/Dockerfile` |
| 37 | Docker Compose · networking · volumes · env vars | `docker-compose.yml` (all services), `docker-compose.prod.yml` |
| 38 | Linux basics · SSH · VPS setup · deploy | Provision VPS, SSH in, clone repo, run docker compose |
| 39 | Nginx · reverse proxy · static files · SSL · Certbot | `nginx.conf`, HTTPS live |
| 40 | System design: load balancer · cache · queue · CDN · scaling · bottlenecks | Architecture diagram, explain Runway's bottlenecks |
| 41 | Portfolio: README · API docs · architecture diagram · deployment guide | Full documentation |
| 42 | **Final review** · mock Middle Full-Stack interview · submission checklist | Everything checked off |

### Multi-Stage Dockerfile (Frontend)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

### System Design (Middle Level)

```
Internet
  → CDN (static assets: JS, CSS, images)
  → Load Balancer (distribute traffic)
  → App Servers × N (horizontal scaling)
  → Cache Layer (Redis: sessions, frequent queries)
  → PostgreSQL (primary + read replica)
  → Object Storage (file uploads)
  → Message Queue (async jobs: emails, notifications)
  → Observability (logs, metrics, traces)

Runway bottlenecks:
  - Single DB instance → add read replica
  - No cache → add Redis for job list queries
  - Single server → stateless app enables horizontal scaling
```

### Milestone Checklist

- [ ] Application live at `https://yourdomain.com`
- [ ] `docker logs` shows clean logs
- [ ] Can explain every technical decision in the project
- [ ] README: setup, architecture, API docs, deployment
- [ ] Ready to answer any question about the project

### Interview Questions (Week 6)

- Walk me through how Runway is deployed.
- What happens when you run `docker compose up`?
- What does Nginx do in your setup?
- Where are the bottlenecks in Runway at scale?
- How would you scale Runway to 100k users?
- What is a CDN and when would you add one?
- What is horizontal scaling and what does it require?

---

## Final Interview Readiness Checklist

### React
- [ ] Explain reconciliation and rendering model without notes
- [ ] Name 3+ situations where useEffect is not needed
- [ ] Explain useMemo vs useCallback vs React.memo
- [ ] Write a custom hook from scratch
- [ ] Explain client state vs server state and why TanStack Query
- [ ] Explain optimistic update and rollback mechanism

### JavaScript / TypeScript
- [ ] Explain event loop, microtask queue, macrotask queue
- [ ] Explain closure with a real example
- [ ] Write a generic TypeScript function from scratch
- [ ] Explain `unknown` vs `any` and when to use each
- [ ] Explain shallow vs deep copy and when it matters

### Node.js / Backend
- [ ] Explain Node.js event loop vs browser event loop
- [ ] Explain the middleware chain in Express
- [ ] Explain controller → service pattern and why
- [ ] Write a centralized error handler middleware
- [ ] Explain 400 / 401 / 403 / 404 / 422 / 500 differences

### Authentication
- [ ] Explain sessions vs JWT trade-offs
- [ ] Explain access token + refresh token rotation
- [ ] Explain why HttpOnly cookie, not localStorage
- [ ] Explain CSRF and how to protect against it
- [ ] Implement auth middleware from scratch (signature only)

### PostgreSQL
- [ ] Write a JOIN query with jobs ↔ interviews
- [ ] Explain indexes and when to add them
- [ ] Explain the N+1 problem and how Prisma handles it
- [ ] Explain ACID and why transactions are needed

### System Design (Middle level)
- [ ] Draw basic Runway architecture on a VPS
- [ ] Explain where bottlenecks appear at scale
- [ ] Explain how to horizontally scale a stateless app
- [ ] Explain CDN, cache, load balancer roles

### About the Project
- [ ] Why PostgreSQL and not MongoDB?
- [ ] Why Prisma and not raw SQL or Sequelize?
- [ ] Why TanStack Query and not Redux?
- [ ] Why JWT + refresh and not sessions?
- [ ] How is the app deployed and how does it restart?
- [ ] What would you change if Runway grew to 100k users?
