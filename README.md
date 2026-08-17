# Runway

Runway is a full-stack job application tracker, built as a guided 6-week learning project to go from Senior Frontend to Middle Full-Stack JavaScript/TypeScript developer.

## Status

Early scaffolding stage — project structure and learning system are set up, application code has not been written yet. See [`.learning/ROADMAP.md`](.learning/ROADMAP.md) and [`.learning/PROGRESS.md`](.learning/PROGRESS.md) for current progress.

## Stack

- **Frontend:** React, TypeScript, Vite, TanStack Query
- **Backend:** Node.js, Express, PostgreSQL, Prisma
- **Infra:** Docker, Nginx

## Project structure

```
runway/
├── CLAUDE.md               ← learning session protocol for Claude Code
├── .learning/               ← learning state (roadmap, progress, session, review)
├── frontend/src/
│   ├── features/            ← auth / jobs / interviews
│   ├── shared/               ← components / hooks / lib
│   ├── router/
│   └── types/
├── backend/src/
│   ├── modules/               ← auth / jobs / interviews
│   ├── middleware/
│   ├── config/
│   └── prisma/
├── nginx/
├── docs/spec.md              ← full project and learning system specification
├── docker-compose.yml
└── docker-compose.prod.yml
```

## Documentation

- [`docs/spec.md`](docs/spec.md) — full project and learning system specification
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — commit, branch, and PR conventions
- [`CLAUDE.md`](CLAUDE.md) — Claude Code learning session protocol

## License

See [`LICENSE`](LICENSE).
