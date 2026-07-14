# care-center (CaringHands)

Home care booking platform — Next.js 16 App Router, Tailwind v4, no backend/API.

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | dev server (Turbopack default) |
| `npm run build` | production build |
| `npm run start` | serve production build |
| `npm run lint` | `eslint` (NOT `next lint` — removed in v16) |

## Next.js v16 breaking changes (differs from training data)

- **`params` and `searchParams` are `Promise`** — must `await params.slug` in server components, or `use(params)` in client components. Synchronous access removed.
- **`next/image` `priority` is deprecated** — use `preload={true}` instead.
- **`next lint` removed** — run `eslint` directly.
- **`middleware` deprecated** → renamed to `proxy`.
- **`fetch` is NOT cached by default** since v15; use `cache: 'force-cache'` explicitly.

Read `node_modules/next/dist/docs/` before writing any new code.

## Tailwind v4 (differs from v3)

- **No `@tailwind` directives** — use `@import "tailwindcss"` in CSS.
- **Custom theme** uses `@theme inline { ... }` block (not `theme.extend` in config).
- All CSS config is in `globals.css`, not `tailwind.config.*`.

## Project structure

- `src/app/layout.js` — root layout (`.js` extension, provides `<html>`/`<body>`, fonts)
- `src/app/(WithComonLayout)/layout.jsx` — route-group layout wrapping most pages (Navbar + Footer)
- `src/Components/` — **capital C**, shared components in `Shared/` subfolder
- `src/assets/` — local images imported via `@/assets/...`
- Path alias `@/*` → `./src/*` (configured in `jsconfig.json` — **no TypeScript**)

## Styling conventions

Use the custom utility classes from `globals.css` rather than ad-hoc variants:
- `.glass` — frosted glass card
- `.gradient-primary`, `.gradient-hero`, `.gradient-text` — branded gradients
- `.shadow-card`, `.shadow-soft`, `.shadow-glow` — shadow levels
- `.animate-fade-in`, `.animate-fade-up`, `.animate-scale-in` — CSS-only animations
- `.delay-100` through `.delay-700` — animation delay increments
- `.cta-btn`, `.value-card`, `.card-icon` — interactive hover patterns
- Color tokens: `bg-primary`, `bg-secondary`, `bg-accent`, `text-foreground`, `text-muted-foreground`, etc.
- Dark mode via `.dark` class

## Known issues

- `src/app/(WithComonLayout)/booking/[slug]/page.jsx` is `"use client"` and expects `{ service }` as a prop, but Next.js page components receive `{ params, searchParams }` — this is currently non-functional.
- Service/booking data is hardcoded (no database, no API routes, no auth).

## Linting

ESLint flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals`. Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`.
