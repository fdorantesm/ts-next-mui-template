````markdown
# Project Structure: src/app vs app

## ✅ Current Configuration: `src/app/`

This project uses the **`src/app/`** structure where all code is organized inside the `src/` directory, including Next.js routing directory.

### Advantages of using `src/app/`

1. **Unified organization**: All application code in one place
2. **Clear separation**: Separates source code from root configuration files
3. **Standard convention**: Common pattern in TypeScript/JavaScript projects
4. **Better navigation**: Easier to find related files
5. **Scalability**: Better for large projects with multiple directories

### Current Structure

```
ts-next-mui-template/
├── src/                          # All source code
│   ├── app/                      # 🎯 Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/               # UI components organized by scope
│   │   ├── pages/               # Full page components
│   │   ├── views/               # Major UI sections that compose pages
│   │   ├── sections/            # Reusable page sections
│   │   ├── partials/            # Small reusable UI pieces
│   │   └── layout/              # Layout components
│   ├── hooks/                    # Custom React hooks
│   ├── providers/                # Context providers
│   ├── routes/                   # Routing utilities
│   ├── theme/                    # MUI theme
│   ├── utils/                    # Utilities
│   └── index.css                # Global styles
├── public/                       # Static assets
├── docs/                         # Documentation
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies

```

## Alternative: `app/` in root

Next.js also supports having `app/` directly at the project root:

```
ts-next-mui-template/
├── app/                          # Next.js App Router (root)
│   ├── layout.tsx
│   └── page.tsx
├── src/                          # Rest of the code
│   ├── components/
│   ├── hooks/
│   └── ...
├── public/
└── ...
```

### When to use each structure?

| Feature            | `src/app/`                    | `app/` (root)        |
| ------------------ | ----------------------------- | -------------------- |
| **Organization**   | ✅ Everything in src/         | ⚠️ App separated     |
| **Scalability**    | ✅ Better for large projects  | ⚠️ Can be confusing  |
| **Clarity**        | ✅ Code vs config separated   | ⚠️ Less clear        |
| **Flexibility**    | ✅ Maintains existing pattern | ⚠️ Breaks convention |
| **Recommendation** | ✅ **Recommended**            | ⚠️ Only if necessary |

## Next.js Configuration

Next.js automatically detects whether you use `src/app/` or `app/`:

1. **Looks first** in `src/app/`
2. **If it doesn't exist**, looks in `app/` (root)
3. **Cannot coexist** both

No additional configuration is required in `next.config.ts` to use `src/app/`.

## Path Aliases

Our `tsconfig.json` is configured to use `@/` as an alias for `src/`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

This means you can import:

```tsx
import { HomePage } from "@/components/pages/home/HomePage";
import { useRouter } from "@/routes/hooks";
import { AppProviders } from "@/providers";
// etc.
```

## Component Organization

Components are organized by their scope and reusability:

### 📄 `components/pages/`

Full page components that represent complete views.

```tsx
// Example: HomePage, AboutPage, BlogPage
import { HomePage } from "@/components/pages";
```

### 🖼️ `components/views/`

Major UI sections that compose pages. Larger than sections, contain business logic.

```tsx
// Example: DashboardView, ProfileView, SettingsView
import { DashboardView } from "@/components/views";
```

### 📦 `components/sections/`

Reusable page sections that can be used across different pages.

```tsx
// Example: HeroSection, FeaturesSection, TestimonialsSection
import { HeroSection } from "@/components/sections";
```

### 🧩 `components/partials/`

Small, highly reusable UI pieces. The most granular level.

```tsx
// Example: CustomButton, UserCard, StatusBadge
import { CustomButton } from "@/components/partials";
```

### 🏗️ `components/layout/`

Layout components that define the structure of pages.

```tsx
// Example: AppLayout, DashboardLayout
import { AppLayout } from "@/components/layout";
```

## Adding New Routes

To add new pages, create them inside `src/app/`:

```bash
# Simple page
src/app/about/page.tsx              → /about

# Page with own layout
src/app/blog/
├── layout.tsx                      → Blog layout
├── page.tsx                        → /blog
└── [slug]/page.tsx                 → /blog/:slug

# API route
src/app/api/users/route.ts          → /api/users
```

## Migration Between Structures

### From `app/` to `src/app/` (already done ✅)

```bash
mv app src/app
```

### From `src/app/` to `app/` (if you need it)

```bash
mv src/app app
```

No changes required in Next.js configuration.

## Conclusion

**The `src/app/` structure is recommended for this project** because:

1. ✅ Keeps all code organized in `src/`
2. ✅ Follows the template's established pattern
3. ✅ Better separation between code and configuration
4. ✅ More scalable for large projects

If you decide to change to `app/` at the root in the future, it's a simple move of the directory.
````
