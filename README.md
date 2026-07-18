# 🏥 Care Center (CaringHands)

A **home care booking platform** built with Next.js 16 (App Router) that connects families with trusted, vetted caregivers for babysitting, elderly care, and home nursing services.

**Live:** [care-center-liard.vercel.app](https://care-center-liard.vercel.app)

---

## ✨ Features

- **Service Catalog** — Browse care services (babysitting, elderly care, home nursing) with dynamic detail pages
- **Booking System** — Book services with date/time selection, track booking status
- **User Authentication** — Register, login, and Google OAuth via NextAuth
- **Responsive UI** — Tailwind v4 with glassmorphism, gradient effects, dark mode support
- **SEO Optimized** — Dynamic sitemap, robots.txt, JSON-LD structured data, Open Graph & Twitter cards
- **Server Actions** — Direct MongoDB operations from server components (no API route boilerplate)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | JavaScript (JSX) |
| **Styling** | Tailwind CSS v4 |
| **Database** | MongoDB (native driver) |
| **Auth** | NextAuth v4 |
| **Forms** | react-hook-form |
| **State** | TanStack React Query |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Notifications** | react-hot-toast |

---

## 📁 Project Structure

```
src/
├── action/server/          # Server actions (MongoDB operations)
│   ├── auth.js             # Authentication logic
│   ├── bookingDetails.js   # Booking CRUD
│   └── products.js         # Service products CRUD
├── api/auth/[...nextAuth]/ # NextAuth route handler
├── app/
│   ├── (WithComonLayout)/  # Route group with Navbar + Footer
│   │   ├── page.jsx        # Homepage
│   │   ├── about/page.jsx
│   │   ├── services/       # Service listing + [slug] detail
│   │   ├── booking/        # Booking list + [slug] detail
│   │   ├── login/page.jsx
│   │   ├── register/page.jsx
│   │   └── testimonials/page.jsx
│   ├── layout.jsx          # Root layout (fonts, metadata, providers)
│   ├── sitemap.js          # Dynamic XML sitemap
│   ├── robots.js           # robots.txt
│   ├── globals.css         # Tailwind v4 theme & custom utilities
│   ├── loading.jsx         # Global loading state
│   └── not-found.jsx       # 404 page
├── Components/
│   ├── Shared/             # Navbar, Footer
│   ├── BookButton.jsx      # Booking CTA (redirects to login)
│   ├── Banner.jsx
│   ├── CTA.jsx
│   ├── GooleSingInButton.jsx
│   ├── JsonLd.jsx          # JSON-LD structured data
│   ├── Services.jsx
│   ├── Status.jsx
│   ├── Testimonials.jsx
│   └── WhyUs.jsx
├── Provider/               # React context providers
├── assets/                 # Local images
└── lib/                    # Services data (hardcoded fallback)
```

---

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=care-center
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
```

### Install & Run

```bash
npm install
npm run dev        # http://localhost:3000
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## 🗺 Data Flow

```
Client Component → Server Action (src/action/server/) → MongoDB
```

Server actions are `"use server"` functions that handle all database operations — no REST API routes needed.

---

## 🔐 Authentication

- **NextAuth** configured at `src/api/auth/[...nextAuth]/`
- Providers: Google OAuth (planned) + credentials
- Current stub: `BookButton` always redirects to `/login` (no real session check)

---

## 📈 SEO

- **Sitemap** — Dynamic XML at `/sitemap.xml` (static routes + MongoDB service products)
- **Robots** — `/robots.txt` allows all, disallows `/api/` and `/booking`
- **JSON-LD** — Organization, WebSite (with SearchAction), LocalBusiness schemas
- **Metadata** — Per-page `generateMetadata` for dynamic pages; template `"%s | Care Center"`
- **OG Image** — Requires a real 1200×630 image at `public/og-image.jpg`

---

## 🎨 Styling

- **Tailwind v4** — CSS-only config via `@import "tailwindcss"` and `@theme inline` block
- **Custom utilities** — `.glass`, `.gradient-primary`, `.gradient-text`, `.shadow-glow`, `.animate-fade-in`, etc.
- **Dark mode** — Toggled via `.dark` class on `<html>`
- **Colors** — CSS tokens (`bg-primary`, `text-foreground`, `text-muted-foreground`, etc.)

---

## 📄 License

Private project — all rights reserved.
