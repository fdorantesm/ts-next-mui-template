# Components Organization

This directory contains all UI components organized by their scope and reusability level.

## Directory Structure

```
components/
├── pages/          # Full page components
├── views/          # Major UI sections that compose pages
├── sections/       # Reusable page sections
├── partials/       # Small reusable UI pieces
└── layout/         # Layout components
```

## Component Hierarchy

### 📄 Pages (`pages/`)

**Full page components** that represent complete views.

**When to use:**

- Complete page implementations
- Directly rendered by route components in `src/app/`
- Top-level component for a specific route

**Examples:**

- `HomePage` - Landing page
- `AboutPage` - About us page
- `BlogPage` - Blog listing page
- `ProductDetailPage` - Product detail view

**Usage:**

```tsx
// In src/app/page.tsx
import { HomePage } from "@/components/pages";

export default function Home() {
  return <HomePage />;
}
```

---

### 🖼️ Views (`views/`)

**Major UI sections** that compose pages. Contains significant business logic and state management.

**When to use:**

- Large feature sections within a page
- Contains complex business logic
- Manages its own state and data fetching
- Can be composed of multiple sections and partials

**Examples:**

- `DashboardView` - Dashboard overview with multiple widgets
- `ProfileView` - User profile with tabs and forms
- `SettingsView` - Settings panel with multiple sections
- `CheckoutView` - Checkout flow with multiple steps

**Usage:**

```tsx
// In a page component
import { DashboardView } from "@/components/views";

export function DashboardPage() {
  return (
    <AppLayout>
      <DashboardView />
    </AppLayout>
  );
}
```

---

### 📦 Sections (`sections/`)

**Reusable page sections** that can be used across different pages.

**When to use:**

- Self-contained sections that make sense in multiple contexts
- Marketing sections (hero, features, testimonials, etc.)
- Common page sections (headers, footers, sidebars)
- Less business logic, more presentational

**Examples:**

- `HeroSection` - Hero banner with CTA
- `FeaturesSection` - Features showcase grid
- `TestimonialsSection` - Customer testimonials carousel
- `PricingSection` - Pricing table
- `ContactFormSection` - Contact form with validation

**Usage:**

```tsx
// Composing a landing page
import { HeroSection, FeaturesSection } from "@/components/sections";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}
```

---

### 🧩 Partials (`partials/`)

**Small, highly reusable UI pieces.** The most granular level of components.

**When to use:**

- Small, focused components
- Reusable across many different contexts
- Minimal business logic, mostly presentational
- Can be composed to build larger components

**Examples:**

- `CustomButton` - Styled button variants
- `UserCard` - User info card
- `StatusBadge` - Status indicator
- `LoadingSpinner` - Loading animation
- `EmptyState` - Empty state placeholder
- `SearchInput` - Search input field

**Usage:**

```tsx
// Used within any component
import { CustomButton, StatusBadge } from "@/components/partials";

export function UserProfile() {
  return (
    <div>
      <StatusBadge status="active" />
      <CustomButton variant="primary">Edit Profile</CustomButton>
    </div>
  );
}
```

---

### 🏗️ Layout (`layout/`)

**Layout components** that define the structure of pages.

**When to use:**

- Define overall page structure
- Provide navigation, headers, footers
- Consistent layouts across multiple pages
- Container for page content

**Examples:**

- `AppLayout` - Main application layout with navbar and footer
- `DashboardLayout` - Dashboard layout with sidebar
- `AuthLayout` - Authentication pages layout (centered, minimal)
- `BlogLayout` - Blog layout with sidebar

**Usage:**

```tsx
// Wrapping page content
import { AppLayout } from "@/components/layout";

export function AboutPage() {
  return (
    <AppLayout>
      <h1>About Us</h1>
      <p>Content here...</p>
    </AppLayout>
  );
}
```

---

## Best Practices

### ✅ DO:

- Place components in the appropriate directory based on their scope
- Export through barrel exports (`index.ts`) for clean imports
- Use descriptive names that indicate the component's purpose
- Keep components focused and single-responsibility
- Document complex components with JSDoc comments

### ❌ DON'T:

- Mix different component types in the same directory
- Create deeply nested component structures
- Put business logic in partial components
- Duplicate components across directories
- Import components using relative paths (use `@/components` alias)

---

## Migration Guide

If you're moving from a flat structure, here's how to categorize your components:

1. **Full pages?** → `pages/`
2. **Large feature section?** → `views/`
3. **Reusable section?** → `sections/`
4. **Small UI element?** → `partials/`
5. **Layout wrapper?** → `layout/`

---

## Import Patterns

### ✅ Recommended:

```tsx
// Import from category barrel export
import { HomePage } from "@/components/pages";
import { DashboardView } from "@/components/views";
import { HeroSection } from "@/components/sections";
import { CustomButton } from "@/components/partials";
import { AppLayout } from "@/components/layout";

// Or from main barrel export
import { HomePage, CustomButton, AppLayout } from "@/components";
```

### ⚠️ Acceptable (when you need specific file):

```tsx
// Direct import for specific component
import { HomePage } from "@/components/pages/home/HomePage";
```

### ❌ Avoid:

```tsx
// Don't use relative paths
import { HomePage } from "../../components/pages/home/HomePage";
```
