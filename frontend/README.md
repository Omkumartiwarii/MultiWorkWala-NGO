# MultiWorkWala NGO/Trust Website (frontend)

React + Vite + TypeScript + Tailwind CSS + React Router frontend for the MultiWorkWala Pvt. Ltd. website.
The frontend talks to the Django API in `../backend` through `VITE_API_URL`.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run preview    # serve the production build
```

Copy `.env.example` to `.env` to configure the API URL, site URL and UPI details.
Only public, non-secret values belong in `VITE_` variables.

## Build status

| Phase | Scope | Status |
| --- | --- | --- |
| 1–4 | Setup, design system, shared components, layout/navigation | Done |
| 5 | Home page (all 14 sections) | Done |
| 6–19 | About, Programs, Projects, Impact, Events, News, Gallery, Donate, Volunteer, Partnership, Team, Reports, Contact, FAQ, legal | Implemented |
| 20–24 | Responsive, accessibility, performance, SEO, QA passes | Pending |

Every route is registered in `src/routes/index.tsx` and uses the current page/API architecture.

## Architecture

```
API  →  services/*  →  useAsync  →  AsyncContent  →  sections/*  →  components/cards/*
  (REST client)  (hook)       (loading/empty/    (page parts)    (reusable UI)
              error states)
```

- **API:** `src/api/client.ts` calls the versioned Django API. Set `VITE_API_URL` before starting the frontend.
- **Copy:** home page text lives in `src/data/homeContent.ts`.
- **Organization details:** `src/config/organization.ts` (contact info copied from multiworkwala.com; confirm
  before launch) and `src/config/social.ts` (placeholder links, not official accounts).
- **SEO:** `src/config/seo.ts` holds per-page metadata; `<Seo />` renders it (React 19 hoists tags into `<head>`).
- **Images:** every image goes through `placeholderImage()` in `src/config/images.ts`. The included artwork is
  abstract and does not depict real people. Replace with real WebP/AVIF photography.

## Demo content: replace before launch

Everything below is placeholder/demo and is marked in source (`// DEMO DATA`):

- Impact statistics, programs, projects, events, articles, testimonials, partner tiles
- Testimonials carry `isDemo: true` and show an "Illustrative story" badge. Set to `false` for verified stories.
- Event and article dates are generated relative to today (`daysFromNow`) so the demo never looks stale.

Two launch switches live in `src/config/site.ts`:

- `showDemoNotice` shows a "Preview build" bar. Set to `false` when content is verified.
- `allowIndexing` is `false`, so pages send `noindex` while in demo. Set to `true` at launch.

Also replace `/images/og-default.svg` with a 1200×630 JPG/PNG, since most social crawlers ignore SVG.

## Accessibility notes

Skip link, landmarks, one `h1` per page, labelled sections, visible focus, keyboard-operable menus, a
focus-trapped mobile dialog, `aria-live` toasts and loading states, `prefers-reduced-motion` support
(animations and counters render statically).
