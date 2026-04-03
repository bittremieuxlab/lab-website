# Contributing to the Lab Website

This guide explains how to add and update content on the lab website. Most contributions only require editing Markdown files — no programming knowledge needed.

## Workflow

1. Fork or create a branch from `main`
2. Make your changes (see sections below)
3. Open a pull request — the CI checks will run automatically
4. A maintainer reviews and merges

The CI pipeline runs formatting, linting, and a full build check on every PR. If any check fails, it will be shown on the PR.

## Adding or updating a person

1. Copy `templates/person.md` to `src/content/people/firstname-lastname.md`
   - Use lowercase, hyphen-separated filename (e.g., `jane-smith.md`)
2. Fill in the frontmatter fields (required fields are marked in the template)
3. Optionally write a longer bio below the frontmatter `---` separator
4. Add a profile photo to `public/profile-images/`

**Photo requirements:**

- Format: JPEG
- Crop: square
- Minimum size: 300 × 300 px
- Maximum file size: 1 MB
- Filename: `firstname-lastname.jpg` (lowercase, hyphens, matching the Markdown filename)
- Compress before uploading: use [Squoosh](https://squoosh.app/) or similar

**Roles:** use a clear display title such as `PhD Student`, `Postdoc`, `Professor`, `Research Engineer`, `Master Student`, `Intern`.

**Status values:**

- `active` — current lab member (shown on the main people grid)
- `alumni` — former member (shown in the alumni section)
- `collaborator` — external collaborator (add `affiliation:` for their institution)

## Adding a publication

Publications are managed in `src/data/publications.bib`. Add a new BibTeX entry to this file.

**Supported entry types:** `@article`, `@inproceedings`, `@book`, `@thesis`, `@misc` (for preprints)

**Recommended fields:**

```bibtex
@article{authoryear,
  author  = {Last, First and Last2, First2},
  title   = {Title of the Paper},
  journal = {Journal Name},
  year    = {2025},
  doi     = {10.xxxx/xxxxx},
}
```

**Optional custom fields** (supported by the website):

```bibtex
  code    = {https://github.com/lab/repo},
  website = {https://project-website.com},
  slides  = {https://link-to-slides},
```

The CI build will fail if the BibTeX cannot be parsed, catching syntax errors early.

To feature a publication on the home page, add its citation key to `featuredPublications` in `src/config.ts`. To show it on a person's page, add the key to their `selected_publications` list.

## Adding a news item

1. Copy `templates/news.md` to `src/content/news/YYYY-MM-short-title.md`
   - Example: `2025-06-grant-awarded.md`
2. Fill in the frontmatter — `title`, `date`, `description` are required
3. Add a `url` if there is an external link (DOI, press release, etc.)

News items have no body text — only the frontmatter fields are displayed.

## Adding a position

1. Copy `templates/position.md` to `src/content/positions/short-title.md`
2. Set `type` to `phd`, `postdoc`, `internship`, or `other`
3. Write the full position description in the body (Markdown)
4. When the position is filled, set `status: closed` rather than deleting the file

## Adding a thesis topic

1. Copy `templates/thesis.md` to `src/content/theses/short-title.md`
2. Set `type` to `bachelor`, `master`, `bachelor/master`, or `phd`
3. Update `status` as the project progresses:
   - `available` → `ongoing` (add `student: 'Name'`) → `completed` (add `year: 20XX`)

## Adding a research area

1. Copy `templates/research.md` to `src/content/research/short-name.md`
2. Fill in `name`, `description`, and `tags`
3. Write a detailed description in the body

## Running checks locally

Before opening a PR, verify your changes build correctly:

```bash
npm install           # only needed once
npm run format        # auto-fix formatting
npm run lint          # check for code issues
npm run build         # full build (catches schema errors, broken imports)
```

Pre-commit hooks (Husky + lint-staged) run formatting and linting automatically when you commit, so most issues are caught before you push.

## IDE setup

Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and enable format-on-save:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
