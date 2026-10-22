# Agamathikalvi

Website and API for **Agamathikalvi (Agamathi Educational Consultancy)**, Tamil Nadu's No.1 Educational Helpline. It offers career guidance and college admission counselling for Class 10, 11 and 12 students.

See [PLAN.md](PLAN.md) for the page map, data model and build phases.

## Stack

| Part     | Tech                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| client   | React 18, Vite, TypeScript, React Router, TanStack Query                                                          |
| server   | Node.js, Express 5, TypeScript, Zod, Helmet, JWT (httpOnly cookies)                                               |
| database | PostgreSQL on [Neon](https://neon.tech) (free tier) through Prisma ORM. MySQL-portable: no Postgres-only features |
| tooling  | npm workspaces, ESLint 9, Prettier, Vitest + Supertest                                                            |

Later phases add Tailwind, shadcn/ui, i18n (English and Tamil), Framer Motion and React Three Fiber.

## Repo layout

```
client/            React app (Vite)       → http://localhost:5173
  public/images/   logos, photos, avatars carried over from the old site
  public/files/    legacy PDFs (James Webb, Neuralink)
server/            Express API            → http://localhost:4000/api
  prisma/          schema.prisma, migrations/, seed.ts, seed/*.ts
  src/modules/     one folder per feature (routes, services)
  uploads/         local upload storage (git-ignored)
legacy-assets/     large old-site files kept out of the web bundle (git-ignored)
.env.example       every environment variable, for both apps
```

## Getting started

Prerequisites: Node 20+ and a free [Neon](https://neon.tech) PostgreSQL project (Singapore region is closest to Tamil Nadu). Nothing else to install.

```bash
cp .env.example .env        # then paste the Neon strings into DATABASE_URL (pooled) and
                            # DIRECT_URL (direct), and set JWT_SECRET to a long random string
npm install                 # installs both workspaces and generates the Prisma client
npm run setup               # creates the tables on Neon and loads the seed data
npm run dev                 # starts the API (:4000) and the web app (:5173) together
```

Open http://localhost:5173. In development, the web app proxies `/api` and `/uploads` to the API.

The seed creates an admin login from `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`. Change that password before using the seed anywhere other than your own machine.

## Scripts (run from the repo root)

| Command                                 | What it does                                                   |
| --------------------------------------- | -------------------------------------------------------------- |
| `npm run dev`                           | API and web app with hot reload                                |
| `npm run build`                         | Production build of both apps                                  |
| `npm run typecheck` / `lint` / `format` | Type-check, run ESLint, format with Prettier                   |
| `npm test`                              | Server tests (Vitest + Supertest)                              |
| `npm run db:deploy`                     | Apply pending migrations to the database (no prompts)          |
| `npm run db:migrate -- --name <change>` | Create and apply a new migration after editing `schema.prisma` |
| `npm run db:seed`                       | Re-run the seed (safe to repeat, see below)                    |
| `npm run db:reset`                      | Drop all data, re-apply migrations and re-seed                 |
| `npm run db:studio`                     | Open Prisma Studio to browse the data                          |

## About the seed data

- **Real content from the old site:** testimonials, team, founder's message, stats, contact details, social links, media photos, blog cards and partner logos.
- **Draft copy:** the FAQs, careers and scholarships were written for the rebuild. They are flagged `needsReview` so the team can check them in the admin panel.
- **Sample data:** the cutoffs for the 42 colleges are **generated** and are not official TNEA data. The college names are real. Every row is flagged `isSample`, and the UI will label it. Replace the cutoffs with real data through the admin CSV import (Phase 7).
- **Re-running the seed:** CMS tables are filled only when they are empty, and existing settings and the admin account are never overwritten. Only the sample colleges and cutoffs are rebuilt.

## API (Phase 1)

| Endpoint                        | Returns                                        |
| ------------------------------- | ---------------------------------------------- |
| `GET /api/health`               | `{ status, db }` (503 if the database is down) |
| `GET /api/content/settings`     | Stats, contact details, social links           |
| `GET /api/content/testimonials` | Published testimonials                         |
| `GET /api/content/team`         | Team members                                   |
| `GET /api/content/faqs`         | Published FAQs                                 |
| `GET /api/content/partners`     | Partner college logos                          |
| `GET /api/content/blog`         | Published blog post cards                      |

## Troubleshooting

- **`P1001` / `P1002` database errors:** check `DATABASE_URL` / `DIRECT_URL` in `.env` (both need `?sslmode=require` on Neon). A free Neon database sleeps when idle, so the first request can take a second. P1002 can also mean an earlier `prisma migrate` process still holds the migration lock: close it and try again.
- **npm says install scripts were blocked:** Prisma and esbuild need their install scripts. They are already approved under `allowScripts` in the root `package.json`.
