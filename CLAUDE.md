# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic research lab website for the Bittremieux Lab (University of Antwerp). Built with **Astro 6** for static site generation, **Preact** for interactive components, and **Bootstrap 5** for styling. Content is managed via Markdown files with YAML frontmatter; publications come from a BibTeX file parsed by citation-js.

## Commands

```bash
npm run dev            # Dev server at localhost:4321
npm run build          # Production build + Pagefind search indexing
npm run preview        # Preview production build
npm run lint           # ESLint check
npm run lint:fix       # ESLint auto-fix
npm run format         # Prettier auto-format
npm run format:check   # Prettier check only
npm run validate-images  # Check profile image consistency (scripts/validate-images.mjs)
```

Pre-commit hooks run lint + format checks automatically via **husky** + **lint-staged**.

## Architecture

### Routing & Pages

Astro file-based routing in `src/pages/`. Dynamic routes use `[slug].astro` with `getStaticPaths()`:

- `/people/[slug]` — individual team member pages
- `/news/[slug]` — individual news articles
- `/research/[slug]` — individual research area pages

Static pages: `publications.astro`, `softwareTools.astro`, `contact.astro`, `positions.astro`, `thesis.astro`.

### Content Collections

Defined in `src/content.config.ts` using Zod schemas. Five collections loaded via glob from `src/content/`:

- **people/** — team member profiles (name, email, role, status, tags, photo, bio_short, pronouns, affiliation, links, selected_publications, awards, education)
- **news/** — news articles (title, date, description, optional url)
- **research/** — research areas (name, description, tags)
- **positions/** — open/closed job positions (title, type: phd|postdoc|internship|other, status, duration, location). Content directory `src/content/positions/` must be created to use this.
- **theses/** — thesis topics (title, type: bachelor|master|bachelor/master|phd, topics, status: available|ongoing|completed, student, year). Content directory `src/content/theses/` must be created to use this.

Valid person roles: `Professor`, `Assistant Professor`, `PI`, `Postdoc`, `PhD Student`, `MSc Student`, `Software Engineer`, `Machine Learning Engineer`.
Valid person statuses: `active`, `alumni`, `collaborator`.

### Publications

BibTeX data lives in `src/data/publications.bib`, parsed at build time with citation-js. Featured publications are configured by citation key in `src/config.ts`. Person pages link to publications via the `selected_publications` frontmatter field (array of citation keys).

### Interactive Components (Preact, in `src/components/`)

TSX components hydrated client-side with `client:load`:

- **PeopleGrid.tsx** — filterable people grid (role/team/tags)
- **PeopleCards.tsx** — alternative people card layout
- **PublicationList.tsx** — year-filtered publication list (supports Shift+click range selection)
- **ResearchGrid.tsx** — tag-filtered research grid
- **NewsGrid.tsx** — news card layout
- **Search.tsx** — full-text search via Pagefind (requires production build)

### Layouts

Three-tier: `RootLayout.astro` (HTML shell + Header/Footer) → `BaseLayout.astro` (standard page wrapper) / `HomeLayout.astro` (home-specific).

### Styling & Theme

Bootstrap 5 + custom SCSS in `src/styles/`. Inter font from Google Fonts. Bootstrap Icons for iconography. Light/dark mode is enabled (`lightAndDarkMode: true` in `src/config.ts`), toggled via `src/scripts/themeMode.ts`.

### Site Configuration

`src/config.ts` exports two things:

- `SITE` — lab name, university, hero text, featured publication keys, `lightAndDarkMode` flag
- `navLinks` — navigation structure (supports dropdown children, e.g. the Career submenu)

## Code Style

- **TypeScript strict mode** (extends `astro/tsconfigs/strict`)
- **Preact JSX** — uses `h` pragma, not React (`jsxImportSource: "preact"`)
- **ESLint 9 flat config** — TypeScript + React (Preact) + jsx-a11y rules
- **Prettier** — semicolons, single quotes, trailing commas (es5), 100 char width, 2-space indent
- Profile photos go in `src/assets/profile-images/` (optimized at build time via `astro:assets`); other static assets go in `public/assets/`
- Requires Node.js >= 22.12.0

## Deployment

`.github/workflows/deploy.yml` exists but is currently commented out. Deployment workflow is not yet active.
