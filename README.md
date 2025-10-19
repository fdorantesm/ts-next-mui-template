# ts-next-mui-template

Next.js 15 + TypeScript + Material-UI template using the App Router and React Server Components.

This repository is a starter template that demonstrates a production-friendly setup with server and client component separation, a centralized provider composition, and a theme system using MUI CSS variables.

## Quick Start

### Prerequisites

- Bun (recommended) — https://bun.sh/ (or Node.js 18+)

### Install

```bash
# Clone
git clone <repository-url>
cd ts-next-mui-template

# Install dependencies
bun install
```

### Development

```bash
# Start dev server (Next.js)
bun dev

# Type check + build for production
bun run build

# Start production server
bun run start

# Lint
bun run lint
```

## Project highlights

- Next.js 15 App Router with Server Components
- Material-UI v7 with SSR integration (`@mui/material-nextjs`)
- Central `AppProviders` (Theme, Localization, Snackbar)
- Path alias `@/` pointing to `src/`
- Bun-first workflow (fast deterministic installs)

## Project structure

Key folders (all under `src/`):

- `src/app/` — Next.js App Router (layouts and routes)
- `src/components/` — UI components organized by scope:
  - `components/pages/` — Full page components
  - `components/views/` — Major UI sections with business logic
  - `components/sections/` — Reusable page sections
  - `components/partials/` — Small UI pieces (buttons, cards)
- `src/providers/` — App-level providers (AppProviders, Snackbar)
- `src/hooks/` — Custom hooks (Client components)
- `src/theme/` — Theme configuration and CSS variables
- `src/routes/` — Routing utilities (`useRouter`, `paths`)

Static assets: `public/`

Docs: `docs/` contains project-specific guides such as the snackbar system and layout guidance.

## Conventions

- Server Components are the default inside `src/app/`.
- Add `'use client'` at the top of files that use hooks, state, or browser APIs.
- Export modules via `index.ts` barrels for clean imports (e.g., `import { useBoolean } from '@/hooks'`).

## Adding pages

Create routes as files inside `src/app/`, for example:

```
src/app/about/page.tsx   -> /about
src/app/blog/page.tsx    -> /blog
src/app/blog/[slug]/page.tsx -> /blog/:slug
```

## Path aliases

`tsconfig.json` includes:

```json
"paths": { "@/*": ["./src/*"] }
```

So you can import with `@/` (e.g., `@/providers`, `@/theme`).

## Contributing

Follow the existing patterns (barrel exports, `use client` where required). Open a PR and include a short description of behavior changes.

---

Updated to Next.js 15 App Router and MUI SSR (Bun-first). For more details see the `docs/` folder.
