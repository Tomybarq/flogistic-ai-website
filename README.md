# Flogistic Solutions Co. — Corporate Website

A premium, corporate-branded marketing website for **Flogistic Solutions Co.**, built with a modern React stack on the [Base44](https://base44.com) platform. The site features a dark, silver-metallic aesthetic, bilingual (English/Arabic) support with RTL layout, an interactive customer-journey flowchart, and an AI-powered chatbot.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture & Directory Structure](#architecture--directory-structure)
- [Clean Code & Coding Standards](#clean-code--coding-standards)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Publishing](#publishing)
- [Docs & Support](#docs--support)

---

## Project Overview

Flogistic Solutions Co. is a corporate landing experience that communicates the company's AI-driven logistics and automation services. Key features include:

- **Hero & Services** — animated, localized marketing sections.
- **Testimonials** — auto-playing client-feedback carousel.
- **Contact** — validated inquiry form with email submission via Base44 integrations.
- **Customer Journey** (`/customer-journey`) — an interactive, drag-and-drop flowchart for mapping customer stages.
- **AI Chatbot** — a floating assistant answering questions about the company's services.
- **Bilingual UI** — full English/Arabic translation with automatic RTL switching.

---

## Tech Stack

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| Framework    | React 18 + Vite                                                   |
| Styling      | Tailwind CSS + shadcn/ui (Radix primitives)                       |
| Animation    | Framer Motion                                                     |
| Routing      | React Router DOM                                                  |
| Data / API   | Base44 SDK (`@/api/base44Client`) — entities, integrations, auth  |
| Backend      | Base44 serverless functions (`base44/functions/`)                |
| Icons        | lucide-react                                                      |
| Fonts        | Playfair Display + Inter (Google Fonts, via `src/index.css`)      |

> **Note:** This is a **Vite + React** project (not Next.js). The clean-code standards below are adapted to this stack — Server Components map to presentational/container component separation, and `next/image`/`next/font` map to lazy-loaded images and CSS `@import` fonts respectively.

---

## Architecture & Directory Structure

The project follows a **modular, feature-oriented** layout that separates concerns and keeps files small and focused.

```
/
├── index.html                  # HTML entry, meta tags, fonts, favicon
├── tailwind.config.js          # Tailwind theme + design-token mapping
├── vite.config.js              # Vite build config
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # Router, providers, auth orchestration
│   ├── index.css               # Design tokens (:root/.dark), global styles
│   ├── pages.config.js         # Page registry consumed by App.jsx
│   ├── api/
│   │   └── base44Client.js     # Pre-initialized Base44 SDK client
│   ├── pages/                  # Route-level views (one file per route)
│   │   ├── Home.jsx            # Landing page composition
│   │   └── CustomerJourney.jsx  # Interactive flowchart page
│   ├── components/
│   │   ├── landing/            # Feature-specific: landing-page sections
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── translations.jsx   # i18n content (en/ar)
│   │   └── ui/                 # Shared/global UI primitives (shadcn/ui)
│   ├── hooks/                  # Custom React hooks (e.g., use-mobile)
│   ├── lib/                    # Cross-cutting utilities & context
│   │   ├── AuthContext.jsx
│   │   ├── query-client.js
│   │   ├── utils.js
│   │   └── ...
│   └── utils/                  # General-purpose helpers
├── base44/
│   ├── entities/               # JSON-schema data models (*.jsonc)
│   ├── functions/              # Serverless backend handlers (entry.ts)
│   └── agents/                 # AI agent configurations (*.jsonc)
└── README.md
```

### Organization Principles

- **Pages** are thin compositions — they assemble sections and manage page-level state only.
- **Feature components** live under `components/landing/` and are scoped to the landing experience.
- **Shared UI primitives** live under `components/ui/` (shadcn/ui) and are reusable across any page.
- **Cross-cutting logic** (auth, query client, utils) lives in `lib/`.
- **Custom hooks** live in `hooks/` and encapsulate reusable stateful logic.
- **Backend logic** is isolated in `base44/functions/` and `base44/entities/`, never mixed into the frontend.

---

## Clean Code & Coding Standards

These standards are enforced across the codebase to keep the project maintainable, performant, and predictable.

### 1. Single Responsibility Principle (SRP)

- Keep components **small, focused, and isolated** — one component, one purpose.
- Abstract complex or reusable logic into **custom React hooks** (`src/hooks/`).
- Pages compose sections; sections compose primitives — no component does too much.
- Target **≤ 50 lines per component file**; split when a file grows beyond that.

### 2. Component Organization

- **Shared/global UI** (`components/ui/`) vs. **feature-specific** (`components/landing/`) — never mix the two.
- Use a **consistent folder pattern**: one component per file, file name matches the default export.
- Export every page/component as **default**, named identically to its file.
- Group related small components into a subfolder rather than a single large file.

### 3. Type Safety & Clarity

- Prefer **explicit, descriptive prop types**; avoid `any`.
- Keep type/interface definitions **co-located** with the component that owns them, or in a shared `types/` folder when reused.
- Name types clearly (`NavbarProps`, `ServiceCardProps`) — no ambiguous single-letter names.
- Validate external/API data shapes before rendering.

### 4. State Management & Data Fetching

- Use the **Base44 SDK** (`@/api/base44Client`) for all entity, integration, and auth calls.
- Separate **API call logic** into a dedicated layer — backend functions (`base44/functions/`) for server-side, `lib/` for client-side helpers.
- Use **React Query** (`@tanstack/react-query`) for client-side fetching, caching, and loading/empty states.
- Lift state only as high as needed; prefer local component state for UI-only concerns.
- Use **React Context** (`LanguageContext`) for truly cross-cutting state — not for everything.

### 5. Styling & Maintainability

- Use **Tailwind CSS utility classes** consistently; map design tokens via `tailwind.config.js` and `src/index.css`.
- Write class names as **literal strings** — never dynamic (`bg-${color}-500`) since the build purges non-literal classes.
- Use **semantic token classes** (`bg-primary`, `font-heading`) in JSX; no hardcoded hex values.
- **Eliminate dead code**: remove commented-out blocks, unused imports, and unreachable branches.
- Keep the **design system** in `src/index.css` (tokens) and `tailwind.config.js` (mappings) — theme changes happen there, not inline.

### 6. Performance & Optimization

- **Lazy-load** heavy, below-the-fold, or route-specific components with `React.lazy` + `Suspense`.
- **Optimize images** — use appropriate formats, explicit `width`/`height` to prevent layout shift, and lazy-load offscreen media.
- **Load fonts** via `@import` in `src/index.css` and map to font-role tokens; avoid inline `fontFamily` styles.
- **Code-split** by route to keep the initial bundle lean.
- Avoid unnecessary re-renders — memoize expensive computations and stabilize callback identities where it matters.

### 7. General Engineering Hygiene

- Every import must resolve to a **real file or installed package**.
- Let errors **bubble up** unless user-facing form/auth flows require inline error display.
- Handle **loading and empty states** on every data-driven view.
- Design **responsively** (mobile + desktop) — the same code ships to iOS/Android.
- Keep **commits focused**; one logical change per commit.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <project-directory>

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local   # then fill in values
```

`.env.local` should contain:

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url
```

### Development

```bash
npm run dev        # Start the Vite dev server (hot reload)
```

### Build & Preview

```bash
npm run build      # Production build to /dist
npm run preview    # Preview the production build locally
```

### Lint

```bash
npm run lint        # Run ESLint
```

---

## Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server with HMR       |
| `npm run build`   | Production build                     |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint over the codebase        |

---

## Publishing

Open [Base44.com](https://base44.com) and click **Publish**. Any change pushed to the repo is also reflected in the Base44 Builder.

---

## Docs & Support

- **Documentation:** [https://docs.base44.com](https://docs.base44.com)
- **Support:** [https://app.base44.com/support](https://app.base44.com/support)

---

## Top Refactoring Priorities

Apply these in order to bring the existing codebase fully in line with the standards above:

- [ ] **Split oversized components** — `CustomerJourney.jsx` (~360 lines) and `HeroSection.jsx` should be broken into smaller sub-components (canvas, node, toolbar, connector).
- [ ] **Extract custom hooks** — move drag-and-drop, carousel, and scroll logic out of components into `src/hooks/` (e.g., `useDragNode`, `useCarousel`, `useScrollPosition`).
- [ ] **Centralize i18n** — `translations.jsx` is large; consider splitting per-section translation files or loading on demand.
- [ ] **Add prop type definitions** — define explicit `Props` interfaces for all landing components (currently rely on implicit/context props).
- [ ] **Lazy-load the Customer Journey page** — it's a heavy interactive route; wrap in `React.lazy` + `Suspense` to keep the landing bundle lean.
- [ ] **Audit for dead code** — remove unused imports, commented blocks, and any legacy `pagesConfig` entries that duplicate explicit routes.
- [ ] **Consolidate design tokens** — ensure all colors/fonts use semantic tokens (`bg-primary`, `font-heading`) instead of hardcoded hex values like `bg-[#0a0f1c]`.
- [ ] **Add loading/empty states** — verify every data-driven view (contact form, chatbot) handles pending and error states explicitly.
- [ ] **Extract API/service layer** — move Base44 integration calls (email send, LLM invoke) behind a `lib/services/` wrapper so components stay UI-focused.
- [ ] **Enforce lint + type checks in CI** — add a pre-commit or CI step to catch unused vars, missing imports, and type drift before merge.