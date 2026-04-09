# Bittremieux Lab Website

Lab website built with [Astro](https://astro.build/), [Preact](https://preactjs.com/), and [Bootstrap 5](https://getbootstrap.com/). Content is managed via Markdown files with YAML frontmatter; publications are generated from a BibTeX file.

## How to contribute

See [CONTRIBUTING](CONTRIBUTING.md).

## Getting Started

**Requirements:** Node.js >= 22.12.0

```bash
npm install            # Install dependencies
npm run dev            # Dev server at localhost:4321
npm run build          # Production build (includes Pagefind search indexing)
npm run preview        # Preview production build locally
```

## Project Structure

```text
public/
└── assets/            # Static images and logos served as-is
scripts/
└── validate-images.mjs    # Profile image validation (size and dimensions)
src/
├── components/        # Preact (TSX) interactive components + Astro components
├── content/           # Markdown content collections
│   ├── news/          #   News articles
│   ├── people/        #   Team member profiles
│   ├── positions/     #   Job openings
│   ├── research/      #   Research areas
│   └── theses/        #   Thesis opportunities
├── data/
│   └── publications.bib   # BibTeX file (parsed at build time by citation-js)
├── layouts/           # Astro page layouts
├── pages/             # Website pages
├── styles/            # SCSS stylesheets (Bootstrap + custom)
├── assets/
│   └── profile-images/    # Team member photos (optimized at build time)
├── scripts/           # TypeScript utility scripts (BibTeX parsing, theme mode)
├── config.ts          # Site configuration (lab name, featured publications, nav)
└── content.config.ts  # Content collection Zod schemas
templates/             # Markdown templates for new content entries
```

## CI/CD

Two GitHub Actions workflows run automatically:

### CI (`.github/workflows/ci.yml`)

Runs on every **pull request** and push to `main`. Checks:

1. Code formatting (Prettier)
2. Linting (ESLint)
3. Profile image validation (size and dimensions — see below)
4. Full production build (catches broken imports, BibTeX parse errors, schema violations)

### Deploy (`.github/workflows/deploy.yml`)

Runs on push to `main`. Builds the site and deploys to GitHub Pages using the official [withastro/action](https://github.com/withastro/action).

**First-time setup:**

1. Update `site` in `astro.config.mjs` to your actual domain or GitHub Pages URL.
2. In the GitHub repo, go to **Settings > Pages** and set the source to **GitHub Actions**.
3. If using a custom domain: add a `public/CNAME` file containing the domain and configure DNS.

## Linter

```bash
npm run lint           # ESLint check
npm run lint:fix       # ESLint auto-fix
npm run format         # Prettier auto-format
npm run format:check   # Prettier check only
```

ESLint and Prettier are configured to not conflict (`eslint-config-prettier` disables overlapping rules).

## Profile image optimization

Profile photos are stored in `src/assets/profile-images/` and automatically optimized at build time by Astro's image pipeline (`astro:assets`).

Each photo is:

- Converted to **WebP** format
- Resized to **360 × 360 px** (2× the CSS display size for sharp rendering on retina screens)
- Given a cache-busted filename so browsers always fetch the latest version

The original file is committed to the repository; the optimized output is generated into `dist/` on each build and never committed.

Contributors only need to:

1. Drop the photo in `src/assets/profile-images/` with a lowercase, hyphen-separated filename (e.g. `jane-smith.jpg`)
2. Set `photo: 'jane-smith.jpg'` in the person's Markdown frontmatter

Any common format works (JPEG, PNG, WebP, AVIF). No manual compression is required. The photo should be a square crop at a minimum of 360 × 360 px.

### Image validation

Photos are validated automatically by `scripts/validate-images.mjs` using `sharp`. Two rules are enforced:

- **File size** must not exceed 5 MB
- **Dimensions** must be square (width = height)

Validation runs in two places:

- **Pre-commit hook** (Husky + lint-staged) — checks all profile images on local commits
- **CI workflow** — checks all images on every push and pull request

Run it manually with:

```bash
npm run validate-images
```

## Image Credits

- `geralt-dna-3539309_1920.jpg` — https://pixabay.com/illustrations/dna-analysis-research-3539309/
