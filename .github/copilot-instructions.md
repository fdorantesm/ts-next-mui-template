# Copilot Instructions - Next.js + MUI Template

## Architecture Overview

This is a **Next.js 15 + TypeScript + Material-UI** template using App Router with React Server Components (RSC). The architecture follows this hierarchy:

```
RootLayout (RSC) → AppRouterCacheProvider → AppProviders (Client) → Page Components
```

**Key architectural decisions:**

- **App Router**: Uses Next.js 15 file-based routing with `/src/app` directory (all code in src/)
- **Server/Client Component Split**: Providers are Client Components (`'use client'`), pages can be RSC
- **Provider composition**: All global providers centralized in `AppProviders.tsx` (Theme, Localization, Snackbar)
- **Path aliases**: Use `@/` prefix for all src imports (e.g., `@/hooks/useBoolean`, `@/theme/types`)
- **Bun-first**: This project uses Bun as the primary package manager and runtime
- **Emotion Cache**: Uses `@mui/material-nextjs` for proper SSR hydration

## Critical Developer Workflows

### Development Commands

```bash
bun dev           # Start Next.js dev server (NOT npm/pnpm/yarn)
bun run build     # Type check + production build
bun run start     # Start production server
bun run lint      # ESLint with Next.js rules
```

### Build Optimization Strategy

The `next.config.ts` implements **intelligent chunking and optimization**:

- Automatic code splitting per route in App Router
- Optimized package imports for MUI libraries (`experimental.optimizePackageImports`)
- Custom webpack config for vendor chunking (React, MUI, Emotion, etc.)
- Framework, MUI Material, MUI Icons, and Emotion get separate chunks

## Project-Specific Patterns

### 1. Server vs Client Components

**CRITICAL**: Understand when to use `'use client'` directive:

```tsx
// ✅ Server Component (default) - Can fetch data, use async/await
export default async function Page() {
  const data = await fetch("...");
  return <div>{data}</div>;
}

// ✅ Client Component - Required for hooks, context, event handlers
("use client");
export function InteractiveComponent() {
  const [state, setState] = useState(false);
  return <button onClick={() => setState(!state)}>Click</button>;
}
```

**Components requiring `'use client'`:**

- All providers (ThemeProvider, SnackbarProvider, AppProviders)
- All custom hooks (useRouter, useBoolean, useSnackbar, etc.)
- Components using `useState`, `useEffect`, `useContext`, event handlers
- Components using browser APIs (localStorage, window, etc.)

### 2. Barrel Export Organization

**Every directory exports through `index.ts`** for clean imports:

```typescript
// ✅ Correct pattern
import { useBoolean, useResponsive } from "@/hooks";
import { HomePage } from "@/components/pages";

// ❌ Avoid direct file imports
import { useBoolean } from "@/hooks/useBoolean";
```

### 3. Theme System with CSS Variables

Theme uses MUI's CSS variables mode with data attribute selector:

```typescript
// Theme configuration in create-theme.ts
cssVariables: {
  colorSchemeSelector: "data",  // Uses [data-mui-color-scheme]
  cssVarPrefix: "mui",
}
```

**To customize themes**: Override `themeOverrides` prop in `AppProviders`:

```tsx
<AppProviders themeOverrides={{ /* your overrides */ }}>
```

Theme structure in `src/theme/core/`:

- `palette.ts` - Color definitions for light/dark modes
- `typography.ts` - Font families and sizes
- `shadows.ts` + `custom-shadows.ts` - Elevation system
- `components.tsx` - MUI component default props/styles

### 4. Snackbar Notification System

**Custom queue-based notification system** (not MUI's default Snackbar):

```tsx
import { useSnackbar } from "@/providers";

const { enqueueSnackbar } = useSnackbar();

enqueueSnackbar("Success message", {
  severity: "success",
  autoHideDuration: 3000,
});
```

**Key features** (see `docs/SNACKBAR_SYSTEM.md`):

- Visual queue with "+X more" indicator when maxSnackbars exceeded
- Expand/collapse functionality to show all queued notifications
- Notifications are NOT discarded, they stack in a queue
- Configurable positioning (9 positions: top/bottom × left/center/right)

Configuration in `AppProviders`:

```tsx
<AppProviders snackbarConfig={{ maxSnackbars: 5, position: { vertical: 'top', horizontal: 'right' } }}>
```

### 5. Hook Conventions

Custom hooks in `src/hooks/` follow specific patterns:

- **useBoolean**: Return object with `{ value, onTrue, onFalse, toggle }` (not array destructuring)
- **useResponsive**: Query types are `'up' | 'down' | 'between' | 'only'` matching MUI breakpoints
- **useRouter**: Wraps react-router-dom with consistent API
- All hooks export through barrel pattern

### 6. Type Safety Practices

TypeScript config uses relaxed strictness for faster prototyping:

```jsonc
"noUnusedLocals": false,      // Allows unused vars during development
"noUnusedParameters": false,
"noImplicitAny": false,        // Allows implicit any
```

**For production**: The README documents how to enable stricter rules with `recommendedTypeChecked`.

## ESLint Configuration

Uses Next.js config with these project-specific rules:

```javascript
// Allow ts-ignore with descriptions
'@typescript-eslint/ban-ts-comment': 'allow-with-description'

// Allow unused vars with underscore prefix
'@typescript-eslint/no-unused-vars': allow _prefixed variables

// Next.js specific rules enabled
'@next/next/no-html-link-for-pages': error
'@next/next/no-img-element': warn (use next/image instead)
```

## Routing Patterns

Routes use Next.js App Router file-based routing (inside `src/app/`):

```
src/app/
├── layout.tsx          # Root layout (RSC)
├── page.tsx           # Home page (/)
├── about/
│   └── page.tsx       # About page (/about)
└── blog/
    ├── page.tsx       # Blog list (/blog)
    └── [slug]/
        └── page.tsx   # Dynamic blog post (/blog/[slug])
```

Path constants live in `src/routes/paths.ts`:

```typescript
export const paths = {
  home: "/",
  about: "/about",
  blog: "/blog",
};
```

**Navigation**: Use Next.js `<Link>` component or `useRouter` hook:

```tsx
import Link from "next/link";
import { useRouter } from "@/routes/hooks";

// Declarative navigation
<Link href="/about">About</Link>;

// Programmatic navigation
const router = useRouter();
router.push("/about");
```

## Localization Setup

Uses `@mui/x-date-pickers` with `date-fns`:

```tsx
// Already configured in AppProviders
<LocalizationProvider dateAdapter={AdapterDateFns}>
```

Locale files in `public/locales/{lang}/theme.json` for i18n support.

## Component Organization

Components are organized by scope and reusability in `src/components/`:

- **`pages/`**: Full page components (e.g., HomePage, AboutPage)
- **`views/`**: Major UI sections with business logic (e.g., DashboardView, ProfileView)
- **`sections/`**: Reusable page sections (e.g., HeroSection, FeaturesSection)
- **`partials/`**: Small reusable UI pieces (e.g., CustomButton, UserCard)
- **`layout/`**: Layout components (e.g., AppLayout, DashboardLayout)

```tsx
// Import examples
import { HomePage } from "@/components/pages";
import { DashboardView } from "@/components/views";
import { HeroSection } from "@/components/sections";
import { CustomButton } from "@/components/partials";
import { AppLayout } from "@/components/layout";
```

## When Adding New Features

1. **New page route**: Create in `src/app/{route}/page.tsx` (Server Component by default)
2. **New page component**: Add to `src/components/pages/` and export through index.ts
3. **New view**: Add to `src/components/views/` for major UI sections
4. **New section**: Add to `src/components/sections/` for reusable page sections
5. **New partial**: Add to `src/components/partials/` for small UI pieces
6. **Client-side features**: Add `'use client'` at top of file
7. **New utility**: Add to `src/utils/` with category file (array.ts, date.ts, etc.)
8. **New hook**: Add to `src/hooks/` and export through index.ts (must be Client Component)
9. **Theme changes**: Modify files in `src/theme/core/` for global changes
10. **API routes**: Create in `src/app/api/{route}/route.ts` (optional)

## Important Files to Reference

- `next.config.ts` - Build configuration and optimization strategy
- `src/app/layout.tsx` - Root layout with metadata and providers
- `src/providers/AppProviders.tsx` - Provider composition (Client Component)
- `src/theme/create-theme.ts` - Theme structure and CSS variables setup
- `src/routes/hooks/useRouter.ts` - Next.js router wrapper for consistent API
- `docs/SNACKBAR_SYSTEM.md` - Complete notification system documentation
- `tsconfig.json` - Path mapping and TypeScript configuration
