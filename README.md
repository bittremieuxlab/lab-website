# Bittremieux Lab Website

Academic research lab website built with [Astro](https://astro.build/), [Preact](https://preactjs.com/), and [Bootstrap 5](https://getbootstrap.com/). Content is managed via Markdown files with YAML frontmatter; publications are generated from a BibTeX file.

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
├── pages/             # File-based routing
├── styles/            # SCSS stylesheets (Bootstrap + custom)
└── config.ts          # Site configuration (lab name, featured publications, nav)
public/
├── assets/            # Static images and logos
└── profile-images/    # Team member photos
```

## CI/CD

Two GitHub Actions workflows run automatically:

### CI (`.github/workflows/ci.yml`)

Runs on every **pull request** and push to `main`. Checks:

1. Code formatting (Prettier)
2. Linting (ESLint)
3. Full production build (catches broken imports, BibTeX parse errors, schema violations)

### Deploy (`.github/workflows/deploy.yml`)

Runs on push to `main`. Builds the site and deploys to GitHub Pages using the official [withastro/action](https://github.com/withastro/action).

**First-time setup:**

1. Update `site` in `astro.config.mjs` to your actual domain or GitHub Pages URL.
2. In the GitHub repo, go to **Settings > Pages** and set the source to **GitHub Actions**.
3. If using a custom domain: add a `public/CNAME` file containing the domain and configure DNS.

## Code Quality

```bash
npm run lint           # ESLint check
npm run lint:fix       # ESLint auto-fix
npm run format         # Prettier auto-format
npm run format:check   # Prettier check only
```

**IDE setup:** Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and enable format-on-save:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

ESLint and Prettier are configured to not conflict (`eslint-config-prettier` disables overlapping rules).

## Image Credits

- `geralt-dna-9483532_1920.jpg` — https://pixabay.com/illustrations/dna-artificial-intelligence-research-9483532/
- `geralt-dna-3539309_1920.jpg` — https://pixabay.com/illustrations/dna-analysis-research-3539309/
