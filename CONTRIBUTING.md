# Contributing to the Lab Website

This guide explains how to add and update the lab website. Content contributions only require editing Markdown files.

## Workflow

1. Create a branch from `main` or work on existing branch to add content.
2. Make your changes (see sections below).
3. Open a pull request — the CI checks will run automatically.
4. A maintainer reviews and merges.

The CI pipeline runs formatting, linting, and a full build check on every PR. If any check fails, it will be shown on the PR.

## Content Contributions

Content that can be added:

- [Person](#adding-or-updating-a-person)
- [Publication](#adding-a-publication)
- [News](#adding-a-news-item)
- [Research Area](#adding-a-research-area)
- [Position](#adding-a-position)
- [Thesis](#adding-a-thesis-topic)

### Adding or updating a person

1. Copy `templates/person.md` to `src/content/people/firstname-lastname.md`
   - Use lowercase, hyphen-separated filename (e.g., `jane-smith.md`)
2. Fill in the frontmatter fields (required fields are marked in the template)
3. Optionally write a longer text below the frontmatter `---` separator
4. Add a profile photo to `src/assets/profile-images/` and reference it properly in the frontmatter field `photo`.

**Photo requirements:**

- Format: JPEG, PNG, WebP, or AVIF
- Crop: square
- Minimum size: 360 × 360 px
- Filename: `firstname-lastname.jpg` (lowercase, hyphens, matching the Markdown filename)

No manual compression is needed — Astro automatically converts photos to WebP and resizes them at build time. See the [README](README.md) for details.

**Roles:** Choose from the list of possible values indicated in the template.

**Status values:**

- `active` — current lab member (shown on the main people grid)
- `alumni` — former member (shown in the alumni section)
- `collaborator` — external collaborator (add `affiliation:` for their institution)

### Adding a publication

Publications are managed in `src/data/publications.bib`. Add a new BibTeX entry to this file.

Publications are linked as follows:

- If the entry has a `url` field, that link is displayed
- If no `url` but a `doi` field exists, the publication links to `https://doi.org/{doi}`
- If neither `url` nor `doi` are present, the publication is not linked

The CI build will fail if the BibTeX cannot be parsed, catching syntax errors early.

To feature a publication on the home page, add its citation key to `featuredPublications` in `src/config.ts`. To show it on a person's page, add the key to their `selected_publications` list.

### Adding a news item

1. Copy `templates/news.md` to `src/content/news/YYYY-MM-short-title.md`
   - Example: `2025-06-grant-awarded.md`
2. Fill in the frontmatter — `title`, `date`, `description` are required
3. Add a `url` if there is an external link (DOI, press release, etc.)

### Adding a research area

1. Copy `templates/research.md` to `src/content/research/short-name.md`
2. Fill in `name`, `description`, `tags`, and optionally further content below the frontmatter.

### Adding a position

1. Copy `templates/position.md` to `src/content/positions/short-title.md`
2. Set `type` to `phd`, `postdoc`, `internship`, or `other`
3. Write the full position description in the body (Markdown)
4. When the position is filled, set `status: closed` rather than deleting the file

### Adding a thesis topic

1. Copy `templates/thesis.md` to `src/content/theses/short-title.md`
2. Set `type` to `bachelor`, `master`, `bachelor/master`, or `phd`
3. Add `topics` — keywords used for display and filtering (lowercase, space-separated)
4. Update `status` as the project progresses:
   - `available` → `ongoing` (add `student: 'Name'`) → `completed` (add `year: 20XX`)

## Code Contribution

### Running checks locally

Before opening a PR, verify your changes build correctly:

```bash
npm install           # only needed once
npm run format        # auto-fix formatting
npm run lint          # check for code issues
npm run build         # full build (catches schema errors, broken imports)
```

Pre-commit hooks (Husky + lint-staged) run on every commit and check:

- **Formatting** (Prettier) and **linting** (ESLint) on code files
- **Profile image validation**: validates all images in `src/assets/profile-images/`

If a check fails, fix the issue (`npm run format`, `npm run lint:fix`, correct the image, or other fixes), re-stage the files, and commit again.

### IDE setup

Recommended VS Code extensions:

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) — syntax highlighting and intellisense for `.astro` files
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — code formatting
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — linting feedback

Enable format-on-save in your VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
