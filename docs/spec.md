# Job Tracker — Full-Stack Learning System Spec

> Специфікація навчальної системи: 42-денний план переходу від Senior Frontend до Middle Full-Stack JavaScript/TypeScript Developer із вбудованою системою відстеження прогресу.

---

## Зміст

1. [Оцінка стартової точки](#1-оцінка-стартової-точки)
2. [Кінцевий результат після 6 тижнів](#2-кінцевий-результат-після-6-тижнів)
3. [Проект: Job Tracker](#3-проект-job-tracker)
4. [Архітектура проекту](#4-архітектура-проекту)
5. [6-тижневий Roadmap](#5-6-тижневий-roadmap)
6. [Детальний план: Тиждень 1](#6-детальний-план-тиждень-1)
7. [Детальний план: Тиждень 2](#7-детальний-план-тиждень-2)
8. [Milestones: Тижні 3–6](#8-milestones-тижні-36)
9. [Архітектура .learning/ системи](#9-архітектура-learning-системи)
10. [Схема взаємодії learning state з планом](#10-схема-взаємодії-learning-state-з-планом)
11. [Приклад першої навчальної сесії](#11-приклад-першої-навчальної-сесії)
12. [Сценарії прийняття рішень](#12-сценарії-прийняття-рішень)
13. [Зниження ризиків: конкретні механізми](#13-зниження-ризиків-конкретні-механізми)
14. [Final Project Checklist](#14-final-project-checklist)
15. [Interview Readiness Checklist](#15-interview-readiness-checklist)

---

## 1. Оцінка стартової точки

### Сильні сторони (прискорюють навчання)

7+ років commercial frontend — це не просто "знаю JS". Це розуміння production code, code review, дедлайнів, того, як приймаються технічні рішення в команді. Це дає перевагу над людиною, яка "пройшла курс Node.js", бо вже є розуміння maintainability, а не тільки "щоб воно працювало".

- **Сильний JavaScript** — event loop, closures, async/await, DOM, modules — не треба повторювати. Тиждень 1 фокусується на React internals, а не на JS basics.
- **TypeScript на базовому рівні** — є розуміння типів, треба поглибити generics і advanced patterns.
- **Знайомість із Docker** — не страшно писати Dockerfile, це значно скорочує тиждень 6.

### Критичні прогалини

| Область | Проблема |
|---------|----------|
| **React** | Знаєш API, але інтерв'юери перевіряють розуміння *чому* — reconciliation, rendering model, коли useEffect не потрібен. Без цього код буде правильним, але пояснення будуть нечіткими. |
| **Backend architecture** | Курс дає знання того, *що* існує в Node.js/Express. Але проектування правильних layers — controller → service → repository, centralized error handling, middleware chain — це окрема навичка, яка приходить через практику. |
| **Authentication** | Теорія є, але production-grade реалізація (refresh token rotation, HttpOnly cookies) потребує написати її руками хоча б раз. |
| **Deployment** | Ніколи не деплоїв самостійно — жодна кількість читання не замінює того моменту, коли вперше бачиш своє application live за HTTPS. |

### Реалістична оцінка цілі

4–5 год/день × 6 днів × 6 тижнів = **168–210 годин**. При наявній frontend-базі — достатньо, щоб закрити всі прогалини і отримати переконливий Middle Full-Stack профіль. Але тільки якщо навчання йде через реальний проект, а не через tutorials.

---

## 2. Кінцевий результат після 6 тижнів

1. Реальне розуміння React + Node + PostgreSQL + Docker
2. Один повноцінний full-stack pet project, який можна показати роботодавцю
3. GitHub repository із нормальною архітектурою, README, tests і deployment
4. Learning state всередині цього repository, який зберігає навчальний прогрес
5. Можливість починати нову сесію командою `Continue my learning plan`
6. Система адаптується до фактичного прогресу, а не сліпо веде за календарем

### Що потрібно вміти пояснити на співбесіді

- Чому PostgreSQL, а не MongoDB
- Чому Prisma, а не raw SQL або інший ORM
- Чому React Query, а не Redux + thunks
- Чому саме така структура backend (modules pattern)
- Чому JWT + refresh token, а не session-based auth
- Як працює authentication end-to-end
- Як application деплоїться і перезапускається
- Де можуть виникнути bottlenecks при зростанні навантаження
- Як масштабував би application

---

## 3. Проект: Job Tracker

### Рішення щодо проекту

Job Tracker повністю відповідає всім критеріям. Залишаємо без обговорення.

### Три сутності зі зв'язками

- **User** — auth, ізоляція даних між користувачами
- **Job** — company, position, status (applied / interview / rejected / offer), notes, url, appliedAt
- **Interview** — date, type, round, notes, result (linked to Job)

### Що демонструє на співбесіді

- Повний CRUD на всіх рівнях стеку
- Auth із row-level security (user бачить тільки свої jobs)
- One-to-many relations (Job → Interviews)
- Pagination + filtering + sorting + search
- Optimistic updates
- Status transitions
- Aggregate dashboard

### Стек

| Шар | Технологія | Обґрунтування |
|-----|-----------|---------------|
| Frontend | React + TypeScript + Vite | Стандарт ринку 2025–2026 |
| Routing | React Router v6 | Nested routes, layouts, protected routes |
| Server state | TanStack Query | Спеціалізований state manager для server state |
| Forms | react-hook-form + Zod | Мінімум ре-рендерів, schema-first validation |
| Backend | Node.js + Express + TypeScript | JavaScript end-to-end |
| Database | PostgreSQL + Prisma | Реляційна БД + type-safe ORM |
| Infrastructure | Docker + Docker Compose + Nginx | Industry standard для деплою |

### Auth підхід

JWT із access token (15 хв) + refresh token (7 днів) в HttpOnly cookie.

**Чому:** industry standard, демонструє розуміння security, refresh rotation показує глибину знань — саме це перевіряють на Middle інтерв'ю.

---

## 4. Архітектура проекту

```
job-tracker/                     ← root repo
│
├── CLAUDE.md                    ← інструкції для Claude Code (навчальний режим)
│
├── .learning/                   ← система відстеження прогресу
│   ├── ROADMAP.md
│   ├── PROGRESS.md
│   ├── SESSION.md
│   └── REVIEW.md
│
├── frontend/                    ← React + TypeScript + Vite
│   ├── src/
│   │   ├── features/            ← feature-based structure
│   │   │   ├── auth/            (login, register, auth state)
│   │   │   ├── jobs/            (list, create, edit, filters, pagination)
│   │   │   └── interviews/      (interview management per job)
│   │   ├── shared/
│   │   │   ├── components/      (Button, Input, Modal, Badge, Table...)
│   │   │   ├── hooks/           (useDebounce, usePagination...)
│   │   │   └── lib/             (api client, query client config)
│   │   ├── router/              (React Router, protected routes, layouts)
│   │   └── types/               (shared TypeScript types)
│   └── Dockerfile
│
├── backend/                     ← Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/              (env validation, db config)
│   │   ├── middleware/          (auth, error handler, rate limit, logger)
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.router.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── jobs/
│   │   │   │   ├── jobs.router.ts
│   │   │   │   ├── jobs.controller.ts
│   │   │   │   └── jobs.service.ts
│   │   │   └── interviews/
│   │   │       └── ...same pattern
│   │   └── prisma/              (schema.prisma, migrations, seed)
│   └── Dockerfile
│
├── nginx/
│   └── nginx.conf               ← reverse proxy + static files + HTTPS
│
├── docker-compose.yml           ← local development
├── docker-compose.prod.yml      ← production
└── README.md
```

**Чому feature-based на frontend:** масштабується краще, легше пояснити на співбесіді — кожна feature є самодостатнім модулем.

**Чому modules-based на backend:** кожен модуль містить свій router, controller, service — легко тестувати ізольовано.

---

## 5. 6-тижневий Roadmap

| Тиждень | Фокус | Milestone |
|---------|-------|-----------|
| 1 | TypeScript + React Internals + базові компоненти | Репо із типізованими компонентами, routing, mock data |
| 2 | TanStack Query + Forms + advanced hooks | Повноцінний React frontend (mock API) |
| 3 | Node.js + Express + PostgreSQL + Prisma | Working REST API для всіх entities |
| 4 | Authentication + Full-Stack Integration | Live app: frontend ↔ backend ↔ DB |
| 5 | Testing + TypeScript Advanced + Interview Prep | Test coverage + перші mock interviews |
| 6 | Docker + Deployment + System Design + Portfolio | App live на VPS із HTTPS |

---

## 6. Детальний план: Тиждень 1

**Ціль тижня:** Підготувати фундамент. Налаштувати проект, зрозуміти React rendering model, написати перші типізовані компоненти, налаштувати routing.

**Milestone:** Репозиторій із фронтендом на mock даних. Навігація працює. Компоненти типізовані. Без `any`. README є.

---

### День 1 — Repository Setup + TypeScript Config

**Що вивчити:** Як TypeScript конфігурується для React (кожна опція в tsconfig), що таке Vite і чому не CRA, ESLint + Prettier для TypeScript.

**Концепції:**
- `tsconfig.json`: strict, noUncheckedIndexedAccess, paths aliases — що кожна опція реально означає
- Різниця між `type` і `interface` в TypeScript і коли що використовувати
- Module resolution: як Node знаходить модулі

**Що кодувати:**
- Monorepo структура: root / frontend / backend
- `frontend/` з Vite + React + TypeScript
- ESLint (typescript-eslint) + Prettier — конфіг, не просто install
- Path aliases: `@/` → `src/`
- Базова папкова структура: features / shared / router / types

**Практичне завдання:** Прочитати кожну опцію у tsconfig і пояснити собі навіщо вона. `strict: true` — що саме вона вмикає?

**Час:** Setup 2 год, tsconfig deep dive 1 год, структура + перший коміт 30 хв.

**GitHub результат:** Репо `job-tracker`, `frontend/` з Vite+React+TS, lint, format, базовий README. Commit: `chore: initial project setup`.

**Питання, які треба вміти пояснити:**
- Навіщо `strict: true`? Що саме вона вмикає?
- Чим Vite кращий за CRA?
- Яка різниця між `type` і `interface`? Коли що?
- Що таке path aliases і навіщо?

**Типові помилки:** Не вмикати strict → боляче мігрувати пізніше. Пропустити ESLint → гірший код із самого початку. Занадто складна структура папок на старті.

---

### День 2 — React Rendering Model

**Що вивчити:** Як React вирішує що і коли рендерити. Reconciliation, Virtual DOM, Fiber (концептуально). Чому keys критичні.

**Концепції:**
- Reconciliation: diffing algorithm, що відбувається при зміні state/props
- Render phase (чистий) vs Commit phase (DOM mutations)
- Keys: React використовує їх для ідентифікації елементів у списку — не як hint, а як identity
- Коли компонент рендериться повторно (і коли це не проблема)

**Що кодувати:**
- `JobCard` компонент (тільки UI, типізовані props, hardcoded дані)
- `JobList` зі списком карток і правильними keys
- Спеціально зробити помилку з `index as key` → побачити баг при видаленні → виправити

**Практичне завдання:** Відкрити React DevTools → Profiler → подивитись, що рендериться при зміні не пов'язаного стану.

**Час:** Reading (React reconciliation, Fiber basics) 1.5 год, coding 2 год, DevTools 30 хв.

**GitHub результат:**
- `src/features/jobs/components/JobCard.tsx` — типізовані props
- `src/features/jobs/components/JobList.tsx` — список карток
- `src/shared/types/job.types.ts` — тип `Job`
- Commit: `feat: job card and list components`

**Питання:**
- Що таке reconciliation?
- Чому `index as key` — погана ідея?
- Що відбувається з DOM при зміні стану?
- Яка різниця між render і commit phase?

**Типові помилки:** Вважати Virtual DOM "копією реального DOM" (це абстракція). Думати, що рендер = DOM mutation (рендер — це виклик функції компонента, DOM може не змінитись).

---

### День 3 — useState + Controlled Components

**Що вивчити:** Як useState влаштований (hooks queue, концептуально). Батчування updates. Controlled vs uncontrolled. Форми в React.

**Концепції:**
- State як snapshot: кожен render — новий snapshot, setState не змінює поточний snapshot
- Batching in React 18 (навіть в async callbacks)
- Controlled input pattern: value + onChange = повний контроль
- State lifting: коли батьківський компонент є source of truth

**Що кодувати:**
- `JobFilter` — пошук (text input) + фільтр статусу (select). Controlled inputs.
- `JobStatusBadge` — компонент для відображення статусу з кольорами
- Локальний стан для фільтрів у `JobList`

**Час:** Reading 1 год, coding 2.5 год, debugging state updates 30 хв.

**GitHub результат:**
- `src/features/jobs/components/JobFilter.tsx`
- `src/shared/types/filter.types.ts`
- `src/features/jobs/data/mock-jobs.ts` — mock дані
- Commit: `feat: job filtering with controlled components`

**Питання:**
- Чому setState не оновлює значення відразу?
- Що означає "state як snapshot"?
- Яка різниця між controlled і uncontrolled input?
- Коли піднімати state вгору?

**Типові помилки:** Мутувати state напряму (`array.push`, `obj.prop = value`). Читати state після setState і дивуватись, що воно не оновилось.

---

### День 4 — useEffect + Lifecycle

**Що вивчити:** Що таке side effect. Як useEffect моделює lifecycle. Cleanup. Dependency array. Коли useEffect НЕ потрібен.

**Концепції:**
- useEffect як "синхронізація з зовнішньою системою" — не lifecycle hook
- Dependency array: exhaustive-deps rule — чому вона правильна, а не просто lint warning
- Cleanup: для subscriptions, timers, event listeners — без cleanup = memory leak
- Strict Mode запускає effects двічі (development only) — для виявлення missing cleanup
- Коли НЕ треба useEffect: derived state, event handlers, трансформації даних

**Що кодувати:**
- Перший custom hook: `useDebounce<T>(value: T, delay: number): T`
- Інтегрувати debounce у JobFilter для пошуку
- Симуляція subscription із proper cleanup (setTimeout mock)

**Час:** Reading (React docs: Synchronizing with Effects) 1.5 год, coding 2.5 год, debugging Strict Mode double invocation 30 хв.

**GitHub результат:**
- `src/shared/hooks/useDebounce.ts` — з TypeScript generics
- Debounce інтегрований у JobFilter
- Commit: `feat: debounce hook for job search`

**Питання:**
- Коли useEffect НЕ потрібен? (мінімум 3 приклади)
- Що таке stale closure у контексті useEffect?
- Чому React Strict Mode запускає effects двічі?
- Що таке cleanup і коли він критично важливий?

**Типові помилки:** Пропускати залежності і потім дивуватись на stale closure. Використовувати useEffect для derived state. Fetching у useEffect замість TanStack Query.

---

### День 5 — useMemo + useCallback + Performance Basics

**Що вивчити:** Коли React re-renders (і що з цим робити). Referential equality. useMemo, useCallback, React.memo. Як вимірювати.

**Концепції:**
- Referential equality: `{} !== {}`, `[] !== []`, `() => {} !== () => {}` — кожен render = нові об'єкти
- useMemo: memoize результат обчислення
- useCallback: memoize функцію (особливий випадок useMemo)
- React.memo: memoize компонент (re-render тільки при зміні props)
- Коли оптимізовувати: після вимірювання, не "на всяк випадок"

**Що кодувати:**
- Мемоізована відфільтрована/відсортована list у JobList
- useCallback для event handlers, що передаються в дочірні компоненти
- React DevTools Profiler: benchmark до і після мемоізації

**Час:** Reading 1 год, coding + профілювання 3 год.

**GitHub результат:**
- Оптимізовані компоненти з коментарями *навіщо* тут memo
- Commit: `perf: memoize filtered job list computation`

**Питання:**
- Коли useMemo марний (і навіть шкідливий)?
- Яка різниця між useMemo і useCallback?
- Що таке referential equality і чому React порівнює props за reference?
- Як виміряти, чи оптимізація реально допомогла?

**Типові помилки:** Мемоізувати все підряд (overhead без benefit на простих компонентах). Не знати, що useMemo не гарантує збереження значення (React може скинути cache).

---

### День 6 — Context API + React Router

**Що вивчити:** Коли Context, а коли prop drilling — це нормально. Проблеми з Context і re-renders. React Router v6: layout routes, nested routes, Outlet. Protected routes.

**Концепції:**
- Зміна Context value → re-render усіх consumers (навіть тих, хто використовує інше поле)
- Pattern: Context для global app state (auth, theme), не для server data
- `<Outlet />` і layout components
- Protected route — redirect якщо не авторизований

**Що кодувати:**
- `AuthContext` — поточний user (null = not logged in), методи login/logout
- Router setup: два layout — `AuthLayout` (login/register) і `AppLayout` (основний app)
- Protected route wrapper
- Routes: `/login`, `/register`, `/jobs`, `/jobs/:id`, `/jobs/new`

**Час:** Reading 1 год, coding 3 год, тестування навігації 30 хв.

**GitHub результат:**
- `src/router/index.tsx` — повна структура
- `src/features/auth/context/AuthContext.tsx`
- Layout components, Protected route
- Commit: `feat: routing with auth context and protected routes`

**Питання:**
- Чому Context не замінює Redux або Zustand?
- Що відбувається при зміні будь-якого поля Context value?
- Яка різниця між `<Route>` і `<Outlet>`?
- Як redirect зберігає intended route після login?

**Типові помилки:** Класти всі дані в один Context. Не розбивати на дрібніші (UI context, auth context). Давати весь Context object як value замість мемоізованого.

---

### День 7 — Week 1 Review + Polish

**Активності:**
- Перегляд усіх компонентів: чи є `any`?
- Додати loading/error/empty states (mock)
- Написати README із local setup
- Self-review: пояснити кожну концепцію тижня вголос
- React DevTools: перевірити зайві ре-рендери

**Час:** Code review 2 год, README 1 год, self-testing 1.5 год, планування тижня 2 — 30 хв.

**GitHub результат:** README із setup інструкціями. Нуль `any` у TypeScript. Commit: `docs: readme and week 1 cleanup`.

**Milestone checklist тижня 1:**
- [ ] Пояснити reconciliation без нотаток
- [ ] Написати custom hook з нуля
- [ ] Пояснити controlled vs uncontrolled
- [ ] Назвати 3 ситуації, коли useEffect не потрібен
- [ ] Пояснити коли useCallback/useMemo реально потрібен
- [ ] Налаштувати React Router з protected routes та layout

---

## 7. Детальний план: Тиждень 2

**Ціль тижня:** TanStack Query, forms з validation, advanced TypeScript patterns, auth UI flow. До кінця тижня — повноцінний frontend на mock API.

**Milestone:** Всі flows UI: список, create, edit, delete, filter, pagination, auth. Дані приходять з mock server. TypeScript скрізь коректний.

---

### День 8 — TanStack Query: Концепція і перші queries

**Що вивчити:** Чому TanStack Query, а не useEffect + fetch. Server state vs client state. Query caching: staleTime, gcTime. Background refetching. Query keys як cache identity.

**Концепції:**
- Server state: асинхронне, зберігається в іншому місці, потенційно застаріле — принципово інша природа
- Client state: синхронне, ти контролюєш повністю
- TanStack Query = спеціалізований state manager для server state
- QueryKey: масив, що ідентифікує запис у кеші. `['jobs', { status: 'applied' }]` ≠ `['jobs', { status: 'offer' }]` — різні записи

**Що кодувати:**
- QueryClient конфіг: staleTime, retry, глобальний error handler
- Перший хук: `useJobs(filters)` — запит списку із filtering params
- Інтеграція з JobList — прибрати mock дані, підключити query
- json-server або msw для mock API

**Час:** Reading TanStack Query docs (Overview + Queries) 1.5 год, coding 2.5 год, DevTools inspection 30 хв.

**GitHub результат:**
- `src/shared/lib/query-client.ts`
- `src/features/jobs/hooks/useJobs.ts`
- Mock server налаштований
- Commit: `feat: TanStack Query jobs list`

**Питання:**
- Чому server state відрізняється від client state?
- Що таке staleTime і яке значення за замовчуванням?
- Як TanStack Query вирішує, коли робити background refetch?
- Що відбувається, якщо два компоненти викликають useJobs з однаковими filters?

**Типові помилки:** Класти server data в useState замість TanStack Query. Не розуміти, що `{ status: 'applied' }` у query key — нова референція щоразу (треба стабільний serialization). Занадто малий staleTime.

---

### День 9 — TanStack Query: Mutations + Invalidation

**Що вивчити:** useMutation, callbacks (onSuccess/onError/onSettled), cache invalidation, optimistic updates.

**Концепції:**
- Mutation відрізняється від query: side effect, не для читання
- Cache invalidation: після мутації інвалідуємо пов'язані queries → автоматичний refetch
- Optimistic update: оновлюємо UI до відповіді сервера → rollback при помилці
- Cascade invalidation: після create job → інвалідувати `['jobs']` і `['dashboard']`

**Що кодувати:**
- `useCreateJob` mutation hook
- `useUpdateJobStatus` із optimistic update (оновити статус у кеші до response)
- `useDeleteJob`
- Кнопки "Змінити статус" і "Видалити" в JobCard

**Час:** Reading (Mutations + Optimistic Updates) 1 год, coding 3 год.

**GitHub результат:**
- `src/features/jobs/hooks/mutations.ts`
- Optimistic status update в JobCard
- Commit: `feat: job mutations with optimistic updates`

**Питання:**
- Як правильно робити rollback при помилці в optimistic update?
- Коли краще invalidate query, а коли оновити кеш напряму (setQueryData)?
- Що таке onSettled і коли він корисний?

**Типові помилки:** Не обробляти помилку в mutation (user бачить "нічого"). Не думати про race conditions при швидких кліках. Занадто агресивна інвалідація.

---

### День 10 — Forms: react-hook-form + Zod

**Що вивчити:** Проблеми controlled forms у React при великих формах. react-hook-form: uncontrolled approach + ref-based. Zod: schema-first validation.

**Концепції:**
- react-hook-form: uncontrolled inputs + register → мінімум ре-рендерів
- Controller для кастомних UI компонентів (Select, DatePicker...)
- Zod: `z.object({...})`, `z.string().url()`, `z.enum([...])`
- `z.infer<typeof schema>` → TypeScript тип автоматично, без дублювання
- Server-side validation errors: як відобразити 422 response у формі

**Що кодувати:**
- `JobForm` — одна форма для create і edit (різниця тільки в defaultValues і submit handler)
- Zod schema для Job (required fields, url validation, status enum)
- Відображення errors під кожним полем
- Обробка server errors у формі

**Час:** Reading 1 год, coding 3 год, TypeScript інтеграція 30 хв.

**GitHub результат:**
- `src/features/jobs/components/JobForm.tsx`
- `src/features/jobs/schemas/job.schema.ts`
- Commit: `feat: job form with react-hook-form and zod`

**Питання:**
- Чому react-hook-form генерує менше ре-рендерів?
- Що таке `z.infer` і навіщо він?
- Яка різниця між `parse` і `safeParse`?
- Як передати server validation error у конкретне поле форми?

**Типові помилки:** Дублювати TypeScript типи і Zod schemas. Забувати `reset()` після submission. Не обробляти `422 Unprocessable Entity` від сервера.

---

### День 11 — Advanced Query Patterns: Pagination + Dependent Queries

**Що вивчити:** Pagination із TanStack Query. Dependent queries (query що чекає на дані іншого). `select` для трансформації даних.

**Концепції:**
- `placeholderData: keepPreviousData` — при зміні сторінки UI не "моргає" в loading state
- Page-based pagination vs infinite scroll — коли що
- Dependent query: `enabled: !!jobId` — query запускається тільки коли є jobId
- `select` option: трансформуємо дані всередині query, не в компоненті

**Що кодувати:**
- Pagination у JobList (page controls, показати total count)
- `usePagination` custom hook (current page, go to page, total pages)
- `useInterviews(jobId)` — dependent query, завантажується при виборі job

**Час:** Reading 1 год, coding 3 год.

**GitHub результат:**
- Pagination controls у JobList
- `src/shared/hooks/usePagination.ts`
- `src/features/interviews/hooks/useInterviews.ts`
- Commit: `feat: pagination and interview dependent query`

**Питання:**
- Що таке `keepPreviousData` і чому покращує UX?
- Коли infinite scroll краще page-based pagination?
- Що таке dependent query? Як запобігти race condition?

---

### День 12 — Loading / Error / Empty States + TypeScript Advanced

**Що вивчити:** UX pattern: завжди 3 стани (loading, error, empty). TypeScript generics, utility types, type narrowing.

**Концепції:**
- Generics: `function useAsync<T>(fn: () => Promise<T>): { data: T | undefined, ... }`
- Utility types: `Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`, `ReturnType<T>`
- Type narrowing: if checks, instanceof, `in` operator, type guards
- `unknown` vs `any`: unknown безпечніший — треба звузити перед використанням

**Що кодувати:**
- `<LoadingSpinner />`, `<ErrorMessage error={...} />`, `<EmptyState message={...} />` shared components
- Generic `<AsyncState<T> />` wrapper: приймає query result, рендерить правильний стан
- Типізувати всі API responses (повний тип, без `any`)
- Type guard для API error response

**Час:** TypeScript reading 1.5 год, coding 2.5 год.

**GitHub результат:**
- `src/shared/components/async-state/` — state components
- `src/types/api.types.ts` — типи для всіх API responses
- Commit: `feat: async state components and TypeScript API types`

**Питання:**
- Що таке generic у TypeScript? Навіщо?
- Яка різниця між `unknown` і `any`?
- Що таке type narrowing? Як написати type guard?
- Коли `Partial<T>` краще optional properties?

---

### День 13 — Auth UI Flow

**Що вивчити:** Auth state у React. Persisting state. Token refresh flow концептуально. API client з interceptors.

**Концепції:**
- AuthContext: current user + методи login, logout, isAuthenticated
- Axios/fetch interceptors: автоматично додавати Authorization header
- 401 interceptor: при 401 → redirect на `/login`
- Збереження intended route після login

**Що кодувати:**
- `LoginPage` і `RegisterPage` з react-hook-form + zod
- API client (axios або fetch wrapper) з auth interceptor
- `useAuth()` custom hook
- Redirect після login на intended route або `/jobs`

**Час:** Coding 4 год, тестування flow 30 хв.

**GitHub результат:**
- `src/features/auth/` — повна auth feature (context, hooks, pages, api)
- `src/shared/lib/api-client.ts` — з interceptors
- Commit: `feat: auth pages and API client with interceptors`

**Питання:**
- Де зберігати access token на клієнті?
- Що таке interceptor і як він допомагає уникнути дублювання коду?
- Як обробляти `401` глобально?

---

### День 14 — Week 2 Review + TypeScript Polish

**Активності:**
- TanStack Query DevTools — перевірити всі кешовані queries
- Перевірити `any` у всьому коді
- Перевірити мобільну верстку
- Self-review вголос: query lifecycle, mutation flow, optimistic update
- Питання на наступний тиждень (backend)

**GitHub результат:** Commit: `refactor: week 2 TypeScript and code quality`

**Milestone checklist тижня 2:**
- [ ] Пояснити чому client state ≠ server state
- [ ] Написати useMutation з optimistic update без підказок
- [ ] Пояснити query key caching
- [ ] Реалізувати Zod schema + react-hook-form самостійно
- [ ] Написати generic TypeScript hook

---

## 8. Milestones: Тижні 3–6

### Тиждень 3: Backend Foundation (Days 15–21)

**Ключові теми:** Node.js runtime (event loop, async I/O — концептуально). Express: routing, middleware chain, controller → service pattern. TypeScript на backend. Prisma: schema design, migrations, seeding. PostgreSQL: CRUD через Prisma, raw SQL коли треба. REST API design. Centralized error handling. Environment variables. Logging.

**Ключові завдання:**
- Самостійно спроектувати database schema (User → Jobs → Interviews)
- Написати всі migrations із правильними indexes і constraints
- Реалізувати повний Jobs CRUD API (без auth)
- `GET /api/jobs?page=1&limit=10&status=applied&search=google` — повноцінна відповідь із metadata
- Centralized error handler middleware
- Zod validation для request body на backend

**SQL, який треба знати незалежно від Prisma:**

```sql
-- Пагінація
SELECT * FROM jobs WHERE user_id = $1
  ORDER BY created_at DESC
  LIMIT 10 OFFSET 20;

-- Фільтрація + пошук
SELECT j.*, COUNT(i.id) as interview_count
  FROM jobs j
  LEFT JOIN interviews i ON i.job_id = j.id
  WHERE j.user_id = $1
    AND j.status = 'applied'
    AND j.company ILIKE '%google%'
  GROUP BY j.id;

-- EXPLAIN для query plan
EXPLAIN ANALYZE SELECT ...;
```

**Milestone перевірка:**
- [ ] `GET /api/jobs` повертає paginated result із total count
- [ ] `POST /api/jobs` з невалідним body → 422 із details
- [ ] Всі 404 і 500 мають однаковий error format
- [ ] Schema documented у prisma/schema.prisma із коментарями

---

### Тиждень 4: Authentication + Full Integration (Days 22–28)

**Ключові теми:** bcrypt для password hashing. JWT: access token (15 хв) + refresh token (7 днів) у HttpOnly cookie. Auth middleware chain. Row-level security: user бачить тільки свої jobs. CORS configuration. Rate limiting. Graceful shutdown. Full-stack integration.

**Ключові завдання:**
- `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`
- Auth middleware: extractToken → verifyToken → attachUser
- Row-level security для всіх Jobs/Interviews endpoints
- Підключити frontend до реального backend (прибрати mock server)
- Повний E2E flow: register → login → CRUD → logout → login → дані є

**Auth middleware chain:**

```
Request
  → extractToken (from Authorization header OR cookie)
  → verifyToken (JWT verify)
  → attachUser (req.user = decoded payload)
  → checkOwnership (job.userId === req.user.id)
  → Controller
```

**Milestone перевірка:**
- [ ] Register → login → create jobs → logout → login → jobs збережені
- [ ] Інший user не бачить чужі jobs (перевірити вручну)
- [ ] Refresh token rotation працює (новий refresh при кожному refresh)
- [ ] Frontend: 401 → автоматичний redirect на `/login`

---

### Тиждень 5: Quality + Advanced TypeScript + Interview Prep (Days 29–35)

**Ключові теми:** Unit tests (Vitest): сервіси, utilities. Integration tests (supertest): API endpoints. Frontend tests (Vitest + Testing Library). TypeScript advanced: discriminated unions, mapped types, conditional types. Performance: lazy loading, code splitting. SQL: EXPLAIN, indexes для Jobs queries. Interview prep: JS deep dive.

**Ключові завдання:**
- Test suite для auth.service (hashing, JWT, token validation)
- API integration tests для Jobs CRUD
- Component tests для JobForm і JobList
- Виміряти і оптимізувати bundle size (lazy routes)
- EXPLAIN на основних queries
- Mock відповіді на 20+ JS/React interview questions

**TypeScript advanced patterns:**

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

**Milestone перевірка:**
- [ ] 80%+ coverage для критичного backend коду
- [ ] 3+ frontend component tests
- [ ] Пояснити event loop з microtask/macrotask queue без нотаток
- [ ] Пояснити React rendering model без нотаток

---

### Тиждень 6: Docker + Deployment + System Design + Portfolio (Days 36–42)

**Ключові теми:** Dockerfile для frontend (multi-stage build: build → nginx). Dockerfile для backend. Docker Compose для всього (frontend, backend, postgres, nginx). VPS: SSH, базові Linux commands, restart policies. Nginx: reverse proxy, static files, SSL termination. Certbot для HTTPS. System design: load balancer, cache, queue, CDN, horizontal scaling, bottlenecks, availability. README + architecture diagram + API docs + deployment guide.

**Ключові завдання:**
- Написати всі Dockerfiles самостійно
- docker-compose.yml для local + docker-compose.prod.yml для production
- Задеплоїти на VPS (DigitalOcean, Hetzner або аналог)
- Налаштувати HTTPS через Certbot
- Написати повну документацію
- Mock interview за всіма темами

**Multi-stage Dockerfile (frontend):**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

**Базові Linux commands для VPS:**

```bash
# Логи
docker logs job-tracker-backend --follow --tail 100

# Рестарт
docker compose -f docker-compose.prod.yml restart backend

# Статус
docker compose -f docker-compose.prod.yml ps

# SSH
ssh -i ~/.ssh/id_rsa user@your-vps-ip

# Certbot
certbot --nginx -d yourdomain.com
```

**System Design концепції для Middle рівня:**

```
Internet
  → CDN (static assets)
  → Load Balancer
  → App Servers (horizontal scaling)
  → Cache Layer (Redis)
  → Database (primary + read replica)
  → Object Storage (files)
  → Message Queue (async tasks)
  → Observability (logs, metrics, traces)
```

**Milestone перевірка (Final Checklist):**
- [ ] Application live за `https://yourdomain.com`
- [ ] `docker logs` показує нормальні logs
- [ ] Можу пояснити кожне технічне рішення в проекті
- [ ] README: setup, architecture, API docs, deployment
- [ ] Готовий відповідати на будь-яке питання з проекту

---

## 9. Архітектура .learning/ системи

### Структура файлів

```
.learning/
├── ROADMAP.md    ← стратегічний план (змінюється тільки з підтвердженням)
├── PROGRESS.md   ← живий список тем: status, knowledge, practical, evidence
├── SESSION.md    ← стан поточної/останньої сесії
└── REVIEW.md     ← черга повторення (spaced repetition)
```

`CLAUDE.md` — у корені репо, не в `.learning/`. Це файл інструкцій для Claude Code.

**Відповідальність кожного файлу:**

| Файл | Відповідальність | Коли оновлюється |
|------|-----------------|------------------|
| ROADMAP.md | Стратегічний план на 6 тижнів. Незмінний без підтвердження. | Тільки після явного підтвердження змін |
| PROGRESS.md | Evidence-based прогрес по кожній темі | Раз на тиждень (weekly review, День 7/14/21...) |
| SESSION.md | Стан поточної сесії, what's in progress | Наприкінці кожної сесії (confirmation блок) |
| REVIEW.md | Черга spaced repetition | Раз на тиждень + при overdue review |

### Шкала оцінки (0–5)

| Score | Що означає | Що потрібно для досягнення |
|-------|-----------|---------------------------|
| 0 | Не знаю взагалі | — |
| 1 | Чув або читав | Прочитав документацію або вивчив тему |
| 2 | Можу приблизно пояснити | Можеш описати що це таке |
| 3 | Добре розумію | Пояснив concept + один trade-off без нотаток |
| 4 | Можу самостійно застосувати | Написав реалізацію без шаблону або підказок |
| 5 | Можу застосувати, пояснити trade-offs і допомогти іншому | Написав + пояснив trade-offs + знайшов edge case в чужому коді |

**Важливо:** Knowledge і Practical — окремі оцінки. Наприклад:

```
React Query: Knowledge: 4/5, Practical: 2/5
→ Розумію концепцію, але ще не вмію впевнено застосувати без допомоги.
```

### Формат PROGRESS.md (одна тема)

```markdown
## useEffect
status: learned
knowledge: 3/5
practical: 2/5
last_studied: 2026-08-20
last_reviewed: 2026-08-22
next_review: 2026-08-26

understand:
  - dependency array
  - cleanup mechanism
  - effect execution order

still_unclear:
  - when useEffect should NOT be used
  - derived state vs effect pattern

evidence:
  - frontend/src/shared/hooks/useDebounce.ts
  - frontend/src/features/jobs/hooks/useJobsQuery.ts

notes: Needs another practical exercise on stale closure.
```

### Формат REVIEW.md

```markdown
# Review Queue (17/20)

## Today [3]
- useEffect cleanup         K:3 P:2  due: overdue+2d
- event loop microtasks     K:3 P:3  due: overdue+1d
- JWT refresh flow          K:4 P:2  due: today

## This week [8]
- Prisma relations          K:3 P:2  due: +2d
- PostgreSQL indexes        K:3 P:3  due: +3d

## Later [6]
- SQL transactions          K:4 P:4  due: +14d

## Graduated (K:5+P:4 або K:4+P:5)
- React keys                K:5 P:5  graduated: 2026-08-20
```

### Формат SESSION.md

```markdown
# Session
date: 2026-08-23
week: 2
day: 10
status: completed           ← active | completed | abandoned
energy: medium
available: 3h
actual: 2.5h

today_objective: React Query mutations

done:
  - queries
  - caching
  - cache invalidation

in_progress:
  - mutation implementation

blocked:
  - optimistic updates rollback

in_progress_files:
  - frontend/src/features/jobs/hooks/mutations.ts
  - frontend/src/features/jobs/components/JobCard.tsx

weekly_evidence:
  - Реалізував useDebounce без підказок (Day 9)
  - Пояснив query key caching trade-offs (Day 9)

next: Finish optimistic update rollback, then write tests.
```

---

## 10. Схема взаємодії learning state з планом

```
Команда: "Continue my learning plan."
           ↓
Claude читає .learning/SESSION.md
  → Перевіряє status: active | completed | abandoned
  → Recovery dialog якщо stale state
           ↓
Claude читає .learning/ROADMAP.md
  → Визначає поточний тиждень і день
           ↓
Claude читає .learning/PROGRESS.md
  → Статус запланованих тем
  → Evidence paths для relevant topics
           ↓
Claude читає .learning/REVIEW.md
  → Overdue reviews (пріоритет перед новою темою)
           ↓
Claude читає код:
  → Directory tree: frontend/src/features/, backend/src/modules/
  → Конкретні файли з SESSION.md → in_progress_files
  → Evidence files з PROGRESS.md для сьогоднішніх тем
           ↓
Claude аналізує:
  → Що пропущено, що overdue, що наступне
  → Чи відповідає задекларований прогрес реальному коду
           ↓
Claude запитує available time / energy (якщо не вказано)
           ↓
Claude пропонує план дня (CORE / STANDARD / STRETCH)
           ↓
Навчання
           ↓
Наприкінці сесії: Claude видає confirmation блок для SESSION.md
Ти кажеш "ок" або правиш → Claude записує
           ↓
Щотижнево (День 7/14/21...):
  Claude переносить weekly_evidence з SESSION.md → PROGRESS.md
  Claude оновлює REVIEW.md на основі нових оцінок
```

---

## 11. Приклад першої навчальної сесії

**Твій ввід:** `Continue my learning plan.`

**Стан:** Всі теми `not_started`, SESSION.md порожній → перша сесія.

**Claude:**

> Перша сесія! Ми на Дні 1, Тижні 1. Overdue reviews: немає (старт).
>
> Скільки часу у тебе сьогодні і який рівень енергії?

**Твоя відповідь:** `4 години, high energy`

**Claude пропонує план:**

> **День 1 — Repository setup + TypeScript config**
>
> CORE (~2.5 год):
> 1. [30 хв] Monorepo структура — ініціалізувати root, frontend/, backend/
> 2. [45 хв] Vite + React + TypeScript setup — конфіг, path aliases
> 3. [45 хв] ESLint + Prettier — не просто install, розібратись з кожною опцією
> 4. [30 хв] Перший компонент — переконатись що все компілюється
>
> STANDARD (~1 год):
> 5. [45 хв] tsconfig.json deep dive — що кожна опція реально означає
> 6. [15 хв] type vs interface — практичні відмінності
>
> STRETCH (~30 хв):
> 7. [30 хв] Базова структура всіх feature folders
>
> Починаємо. Покажи мені: `node -v`, `npm -v`. Потім ініціалізуй monorepo структуру самостійно і покажи мені результат — я дам feedback.

**Принцип роботи під час сесії:**

Claude не дає готового коду. Він задає питання і просить показати результат. Якщо не виходить — використовує Socratic підхід:
- "Що саме не компілюється? Покажи error."
- "Як ти думаєш, чому tsconfig не підхоплює цей файл?"
- "Спробуй сам — ось тільки назва опції."

**Наприкінці сесії — confirmation блок:**

```
# Session — confirmation
date: 2026-08-18
week: 1 | day: 1
status: completed
energy: high
available: 4h | actual: 3.5h

done:
  - monorepo structure
  - Vite + React + TypeScript setup
  - ESLint + Prettier
  - tsconfig deep dive
  - type vs interface

in_progress:
  - (nothing — CORE and STANDARD completed)

weekly_evidence:
  - Пояснив навіщо strict: true (listed 5 options)
  - Написав перший типізований компонент самостійно

next: День 2 — React Rendering Model
```

---

## 12. Сценарії прийняття рішень

### Засвоїв добре (Knowledge 4+, Practical 4+)

PROGRESS.md оновлюється з evidence. REVIEW.md отримує запис із `next review: +7 days`. Claude переходить до наступної теми. Опціонально пропонує: "Хочеш розібрати складніший кейс? +20 хв, але дасть 5/5."

### Засвоїв поверхнево (Knowledge 3, Practical 2)

Claude не переходить далі. Пропонує targeted завдання:
> "Перед тим як рухатись до [наступна тема], напиши [конкретна функція] без мого шаблону. Я дам тільки сигнатуру."

Practical score підвищується тільки після виконання.

### Не засвоїв (Knowledge 1–2, Practical 0)

Claude пояснює інакше (аналогія, інший кут зору). Дає менше, achievable завдання. Не рухається далі. В REVIEW.md: `next review: +1 day`.

### Пропустив кілька днів

Claude перевіряє overdue reviews першими:
> "Минуло 5 днів. Не страшно. Спочатку швидкий check на 3 overdue теми (15 хв), потім продовжимо з Дня N."

Пріоритет: review → нова тема, не навпаки.

### Мало енергії (Energy: low / very low)

| Рівень | Що робимо |
|--------|-----------|
| high | Повний план (CORE + STANDARD + STRETCH) |
| medium | CORE + STANDARD |
| low | Тільки CORE |
| very low | Одна маленька achievable task + review теми |

Claude не трактує low-energy day як провал. Мета — зберігати continuity навчання.

### Випереджаю план

Claude не автоматично прискорює:
> "Ти попереду на 2 дні. Варіанти: А) поглибити поточну тему, Б) превʼю наступного тижня концептуально, В) зробити менше сьогодні. Що вибираєш?"

Рішення — за тобою.

---

## 13. Зниження ризиків: конкретні механізми

### Ризик 1 — Overhead на обслуговування

**Коренева причина:** Оновлення кількох файлів після кожної сесії відчувається як "домашнє завдання після навчання" — через 2 тижні перестанеш це робити.

**Механізм: два рівні оновлення.**

**Щоденне (тільки SESSION.md) — 2 хвилини або менше.**

SESSION.md живе за принципом "перезаписати, не дописувати". Наприкінці сесії Claude видає один готовий блок → ти кажеш "ок" або правиш одну-дві строки → Claude записує. Це не читання, це confirmation.

**Тижневе (PROGRESS.md + REVIEW.md) — 10 хвилин, раз на тиждень.**

PROGRESS.md і REVIEW.md не оновлюються після кожної сесії. Вони оновлюються в кінці тижня (День 7 / 14 / 21...) як частина weekly review. Протягом тижня Claude накопичує evidence у SESSION.md (розділ `weekly_evidence`), і в неділю переносить все одним проходом.

**Результат:** 6 днів із 7 ти бачиш тільки SESSION.md.

---

### Ризик 2 — Накопичення review debt

**Коренева причина:** Якщо кожна тема живе у черзі вічно, черга стає тягарем, а не інструментом.

**Три правила, жодних винятків.**

**Правило максимуму:** Черга REVIEW.md ніколи не перевищує 20 тем. Якщо при додаванні нових тем ліміт перевищено — автоматично відкидаються теми з найвищим мінімальним score (K + P). Якщо тема K:4/P:4 — вона менш критична ніж K:2/P:3.

**Правило виходу (graduation):** Тема виходить із черги назавжди при `K:5 + P:4` або `K:4 + P:5`. Не потрібен подвійний ідеал — якщо можеш написати і пояснити trade-offs, цього достатньо для Middle інтерв'ю.

**Spaced repetition алгоритм (простий):**

| Min(K, P) | Наступне повторення |
|-----------|---------------------|
| 1–2 | +1 день |
| 3 | +3 дні |
| 4 | +7 днів |
| 5 | +14 днів (і виходить із черги) |

- Є evidence в коді → подвоїти інтервал
- Помилка під час review → скинути на +1 день

**Правило daily cap:** Reviews займають максимум 20 хвилин на день. Якщо черга більша — Claude вибирає 3–5 пріоритетних (мінімальний score перший). Решта переноситься. Claude не намагається "закрити весь борг" за один день.

---

### Ризик 3 — Inflation самооцінки

**Коренева причина:** "Прочитав і зрозумів" відчувається як 4/5, але під час інтерв'ю виявляється, що не можеш пояснити базові речі.

**Механізм: жорсткі gates, закодовані в CLAUDE.md.**

Claude не запитує "яку оцінку ставиш?" — він запитує "покажи доказ" і сам пропонує score.

**Gates для переходу між рівнями:**

| Перехід | Що потрібно |
|---------|------------|
| K 1→2 | Прочитав і можеш описати що це таке |
| K 2→3 | Пояснив concept + один trade-off без нотаток |
| K 3→4 | Пояснив + назвав коли НЕ потрібно |
| K 4→5 | Знайшов помилку або anti-pattern у чужому коді |
| P 1→2 | Написав з підказками і шаблоном |
| P 2→3 | Написав із підказками, без шаблону |
| P 3→4 | Написав самостійно — тільки function signature |
| P 4→5 | Написав + обробив edge cases без підказок |

**Weekly random check:** Раз на тиждень (День 7) Claude обирає 3 рандомні теми з PROGRESS.md і робить quick verification без попередження. Страховка від drift між реальним рівнем і записаним.

**Важливо:** Claude ніколи не знижує score без підтвердження. Але якщо провалив перевірку — він показує "Схоже на K:2, а не K:4 — ось чому" і пропонує скоригувати. Остаточне рішення — за тобою.

---

### Ризик 4 — Жорсткість плану

**Коренева причина:** 42 дні розписані по темах — якщо відстав на 2 дні, відчуття "план зламався" демотивує.

**Механізм: три рівні гнучкості.**

**Рівень 1 — щоденний план має три шари:**

```
Day 10 — TanStack Query Mutations
─────────────────────────────────
CORE (обов'язково, ~2 год)
  useMutation + onSuccess/onError
  cache invalidation після create

STANDARD (якщо є час, ~1 год)
  optimistic update для status toggle

STRETCH (якщо попереду, ~1 год)
  rollback на помилці + error toast
```

Якщо закрив тільки CORE — день зараховується. Наступний день починається зі STANDARD попереднього, не з нової теми.

**Рівень 2 — тижневий milestone, не щоденний чекпоінт.**

ROADMAP.md визначає milestone для тижня в цілому. Якщо тема зайняла 3 дні замість 1 — це перерозподіл усередині тижня, не "відставання". Claude самостійно перегенерує план решти тижня на основі того, що вже закрито.

**Рівень 3 — буферні дні вбудовані.**

- Кожен тиждень: 6 активних днів + 1 review день (День 7). Review день — buffer: якщо все йде добре, він для polish. Якщо відстав — для догнати.
- Тижні 5 і 6 мають менше нового матеріалу — це absorber для накопиченого відставання.

**Що Claude робить при відставанні:**

> "Ти на 3 дні позаду milestone Тижня 2. Є два варіанти: А) скоротити STRETCH завдання до кінця тижня і закрити milestone; Б) перенести interview prep на тиждень пізніше і не поспішати. Що важливіше зараз?"

Claude не вирішує за тебе і не просто "прискорює план".

---

### Ризик 5 — Claude не бачить код

**Коренева причина:** Claude в новій сесії не знає, що реально написано — тільки те, що записано у PROGRESS.md.

**Механізм: explicit code reading protocol у CLAUDE.md.**

**Послідовність читання на початку кожної сесії:**

```
1. Read .learning/SESSION.md           ← де зупинились
2. Read .learning/PROGRESS.md          ← що вважається вивченим
3. Read .learning/REVIEW.md            ← overdue reviews
4. Read directory tree:
   - frontend/src/features/            ← feature modules
   - backend/src/modules/              ← backend modules
5. Read specific files from SESSION.md → in_progress_files
6. Read specific files from PROGRESS.md → evidence paths
   для тем, які будуть сьогодні
```

**SESSION.md явно містить in_progress_files:**

```yaml
in_progress_files:
  - frontend/src/features/jobs/hooks/useJobs.ts
  - frontend/src/shared/hooks/useDebounce.ts
```

**Evidence у PROGRESS.md — це шляхи до файлів, не описи:**

```yaml
evidence:
  - frontend/src/shared/hooks/useDebounce.ts   # реалізовано cleanup
  - frontend/src/features/jobs/hooks/useJobsQuery.ts   # dependency array
```

Якщо в PROGRESS.md написано "реалізував useDebounce" але файл порожній або містить тільки скелет — Claude це бачить і враховує при оцінці.

---

### Ризик 6 — Stale SESSION.md

**Коренева причина:** Сесія перервалась, файл лишився зі статусом `active`, наступного разу незрозуміло що було зроблено.

**Механізм: explicit status + recovery protocol.**

**SESSION.md завжди має статус:**

```yaml
status: active | completed | abandoned
```

- `active` — сесія в процесі
- `completed` — все оновлено і закрито
- `abandoned` — перервалась, потрібна перевірка

**Logic на початку кожної сесії:**

```
if status == "active" and date != today:
    → Recovery dialog
if status == "active" and date == today:
    → "Схоже ми вже почали сьогодні. Продовжуємо?"
if status == "completed":
    → Нормальний старт
if status == "abandoned":
    → Recovery dialog
```

**Recovery dialog — 3 питання, максимум 1 хвилина:**

> Остання сесія від 2026-08-21 позначена як незакінчена.
>
> Що з `useMutation` (було in_progress)?
> - `закінчив` → зараховуємо, йдемо далі
> - `не закінчив` → починаємо звідси
> - `скіп` → пропускаємо, поверне у review queue

Після відповіді Claude оновлює SESSION.md зі статусом `completed` для попередньої сесії і одразу починає нову.

**Write-after-confirmation:** Claude пропонує блок → ти кажеш "ок" → тільки тоді запис. Якщо сесія перервалась до підтвердження — попередній стан зберігається, Claude бачить невідповідність і ініціює recovery.

---

### Зведена таблиця ризиків і рішень

| Ризик | Механізм рішення |
|-------|-----------------|
| Overhead | SESSION.md щодня (2 хв), PROGRESS+REVIEW раз на тиждень (10 хв) |
| Review debt | Hard cap 20 тем, graduation rule, daily cap 20 хв |
| Score inflation | Evidence-based gates per level, weekly random check |
| Жорсткість плану | CORE/STANDARD/STRETCH per day, тижневий milestone, буфер у тижнях 5–6 |
| Код не видно | Explicit read protocol, in_progress_files у SESSION.md, evidence = file paths |
| Stale state | `status` поле, recovery dialog, write-after-confirmation |

---

## 14. Final Project Checklist

### Код і архітектура

- [ ] Feature-based frontend structure (auth / jobs / interviews / shared)
- [ ] Modules-based backend structure (auth / jobs / interviews)
- [ ] TypeScript: нуль `any`, всі API responses типізовані
- [ ] Всі форми: react-hook-form + Zod з server error handling
- [ ] TanStack Query: queries + mutations + optimistic updates
- [ ] Auth: access token + refresh token rotation + HttpOnly cookie
- [ ] Row-level security: user бачить тільки свої дані
- [ ] Pagination + filtering + sorting + search на backend
- [ ] Centralized error handling middleware
- [ ] Environment variables: всі секрети в .env, не в коді

### Testing

- [ ] Unit tests для auth.service (bcrypt, JWT)
- [ ] Integration tests для Jobs CRUD API (supertest)
- [ ] Component tests для JobForm і JobList
- [ ] Базове розуміння test pyramid

### Deployment

- [ ] Dockerfile для frontend (multi-stage build)
- [ ] Dockerfile для backend
- [ ] docker-compose.yml для local development
- [ ] docker-compose.prod.yml для production
- [ ] Nginx: reverse proxy + SSL termination
- [ ] HTTPS налаштований через Certbot
- [ ] Application live та доступний за `https://yourdomain.com`
- [ ] Restart policy: `unless-stopped`

### Documentation

- [ ] README: overview, setup instructions, architecture
- [ ] Architecture diagram (текстовий або Mermaid)
- [ ] API documentation (endpoints, params, responses)
- [ ] Database schema з коментарями у prisma/schema.prisma
- [ ] `.env.example` зі всіма змінними (без реальних значень)
- [ ] Deployment instructions

### Git

- [ ] Meaningful commits (feat / fix / refactor / docs / chore / perf / test)
- [ ] .gitignore: node_modules, .env, dist, build

---

## 15. Interview Readiness Checklist

### React

- [ ] Пояснити reconciliation і rendering model без нотаток
- [ ] Назвати 3+ ситуації, коли useEffect не потрібен
- [ ] Пояснити різницю useMemo vs useCallback vs React.memo
- [ ] Написати custom hook з нуля (наприклад, useLocalStorage)
- [ ] Пояснити client state vs server state і чому TanStack Query
- [ ] Пояснити optimistic update і rollback механізм
- [ ] Пояснити Context і його обмеження (re-render проблема)

### JavaScript / TypeScript

- [ ] Пояснити event loop, microtask queue, macrotask queue
- [ ] Пояснити closure з реальним прикладом
- [ ] Написати generic TypeScript function з нуля
- [ ] Пояснити `unknown` vs `any` і коли що
- [ ] Пояснити shallow vs deep copy і коли важливо

### Node.js / Backend

- [ ] Пояснити Node.js event loop (і чим відрізняється від browser)
- [ ] Пояснити middleware chain у Express
- [ ] Пояснити controller → service pattern і навіщо
- [ ] Написати centralized error handler middleware
- [ ] Пояснити різницю між 400 / 401 / 403 / 404 / 422 / 500

### Authentication

- [ ] Пояснити sessions vs JWT — trade-offs обох підходів
- [ ] Пояснити access token + refresh token rotation
- [ ] Пояснити чому HttpOnly cookie, а не localStorage
- [ ] Пояснити CSRF і як захиститись
- [ ] Реалізувати auth middleware з нуля (тільки сигнатура)

### PostgreSQL

- [ ] Написати JOIN query зі зв'язком jobs ↔ interviews
- [ ] Пояснити навіщо indexes і коли їх додавати
- [ ] Пояснити N+1 проблему і як Prisma її вирішує
- [ ] Пояснити ACID і навіщо транзакції

### System Design (Middle рівень)

- [ ] Намалювати базову архітектуру Job Tracker на VPS
- [ ] Пояснити де могли б виникнути bottlenecks при зростанні
- [ ] Пояснити як горизонтально масштабувати application
- [ ] Пояснити навіщо CDN, cache, load balancer

### Про проект

- [ ] Пояснити чому PostgreSQL, а не MongoDB
- [ ] Пояснити чому Prisma, а не raw SQL або Sequelize
- [ ] Пояснити чому TanStack Query, а не Redux
- [ ] Пояснити чому JWT + refresh, а не session
- [ ] Пояснити як application деплоїться і як перезапускається
- [ ] Пояснити що б змінив якщо б проект ріс до 100k users

---

*Специфікація підтверджена. Наступний крок: генерація `CLAUDE.md`, `.learning/ROADMAP.md`, `.learning/PROGRESS.md`, `.learning/SESSION.md`, `.learning/REVIEW.md`.*
