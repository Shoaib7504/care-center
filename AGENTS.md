# Care Center (CaringHands)

Home care booking platform — Next.js 16 App Router, Tailwind v4, MongoDB, NextAuth.

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | dev server (Turbopack default) |
| `npm run build` | production build |
| `npm run start` | serve production build |
| `npm run lint` | `eslint` (NOT `next lint` — removed in v16) |

## Next.js v16 quirks

- **`params` / `searchParams` are `Promise`** — must `await params.slug` in server components, or `use(params)` in client components.
- **`next/image` `priority` is deprecated** — use `preload={true}` instead.
- **`next lint` removed** — run `eslint` directly.
- **`middleware` deprecated** → renamed to `proxy`.
- **`fetch` NOT cached by default** since v15; use `cache: 'force-cache'` explicitly.
- **Server components** with `async` are the default; `"use client"` only when interactivity (state, effects, event handlers) is needed.

## Tailwind v4

- `@import "tailwindcss"` (no `@tailwind` directives).
- Custom theme in `@theme inline { ... }` block in `globals.css`.
- No `tailwind.config.*` — all config is CSS-only.

## Architecture & data flow

```
client component  →  server action (src/action/server/)  →  MongoDB (src/app/lib/dbConnect.js)
```
- **MongoDB** connection via `src/app/lib/dbConnect.js` (lazy-init, reads `MONGODB_URI` + `DB_NAME` from env).
- **Server actions** in `src/action/server/products.js` — `getProducts()`, `getSingleProduct(slug)`. The slug field is the document's `id` string, not `_id`.
- **NextAuth** setup at `src/api/auth/[...nextAuth]/route.js` — but **no providers configured** in `src/app/lib/authOption.js`. GitHub import is unused.
- `src/lib/services-data.js` contains hardcoded fallback data (unused by pages — pages use MongoDB via server actions).
- `src/app/(WithComonLayout)/booking/page.jsx` uses hardcoded sample bookings (`sampleBookings` array). Performs `confirm()` for cancel — blocks the event loop.
- **Forms** use `react-hook-form` (login, register, booking form).

## Environment

- Required vars: `MONGODB_URI`, `DB_NAME`. Stored in `.env` (checked into git despite `.gitignore` pattern).
- `.env` is in the repo — the gitignore rule is broken for this file.

## Project structure

- `src/app/layout.jsx` — root layout (`.jsx` extension, provides `<html>`/`<body>`, fonts, metadata).
- `src/app/(WithComonLayout)/layout.jsx` — route-group layout (Navbar + Footer, wraps most pages).
- `src/Components/` — capitalized, shared components in `Shared/` subfolder (Navbar, Footer).
- `src/assets/` — local images imported via `@/assets/...`.
- `src/app/lib/` — dbConnect, authOption (not `src/lib/`).
- Path alias `@/*` → `./src/*` (jsconfig.json, no TypeScript).

## Styling

Use custom utility classes from `globals.css` (`.glass`, `.gradient-primary`, `.gradient-hero`, `.gradient-text`, `.shadow-card`, `.shadow-soft`, `.shadow-glow`, `.animate-fade-in`, `.animate-fade-up`, `.animate-scale-in`, `.delay-{100..700}`, `.cta-btn`, `.value-card`, `.card-icon`, `.glass`). Colors via CSS tokens (`bg-primary`, `text-foreground`, `text-muted-foreground`, etc.). Dark mode via `.dark` class.

## Known issues & quirks

- **Auth stub**: `BookButton` always redirects to `/login` (`const user = false`). No real session check.
- **App name inconsistency**: Navbar brand is "CaringHands", metadata/SEO title uses "Care Center".
- **`next/image` remote pattern**: configured only for `care-village-app.lovable.app` — add entries for other image hosts.
- **Loading state**: `src/app/loading.jsx` is a basic text placeholder.
- **`not-found` page**: bare-bones, no navbar/footer (renders outside the route-group layout).

## SEO

| Asset | Location | Description |
|-------|----------|-------------|
| Sitemap | `src/app/sitemap.js` | Dynamic XML sitemap (static routes + all MongoDB service products). Served at `/sitemap.xml`. |
| Robots | `src/app/robots.js` | `robots.txt` — allows all, disallows `/api/` and `/booking`, references sitemap. Served at `/robots.txt`. |
| JSON-LD | `src/Components/JsonLd.jsx` | Injected in root layout: `Organization`, `WebSite` (with `SearchAction`), `LocalBusiness` schemas. |
| OG image | `/og-image.jpg` | Reference in metadata — **must add a real 1200×630 image** to `public/og-image.jpg`. Current build fallback is local. |

### Metadata conventions

- **Static pages**: export `metadata` object with `title`, `description`, `alternates.canonical`, `openGraph`, `twitter`.
- **Dynamic pages** (`[slug]`): export `async generateMetadata({ params })` — fetches product and generates per-item metadata with dynamic title/description/OG image.
- **Client components**: cannot export `metadata`. Use `useEffect(() => { document.title = "..." }, [])` as fallback.
- **Title template**: root layout uses `"%s | Care Center"`. Page titles should NOT include the suffix (e.g. `"Services"` not `"Services | Care Center"`).
- **Booking pages** (`/booking/*`): set `robots: { index: false }` — user-specific content.

### Verification
Google Search Console verification via `NEXT_PUBLIC_GOOGLE_VERIFICATION` env var (currently empty string fallback).

## Linting

ESLint flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals`. Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`.
