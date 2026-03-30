# lab-website

Bittremieux lab website

## Linter

### Run

Only checks:

```
npm run lint          # Check code quality
npm run format:check  # Check if formatting is needed
```

Before committing, run:

```
npm run format      # Auto-fix formatting with Prettier
```

IDE configuration: auto-formats on save and fixes prettier issues automatically

```
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

### How it works:

[Prettier](https://prettier.io/) for code formatting. - enforces consistent formatting (spacing, quotes, line length) - `.prettierrc.json` — Prettier configuration
[ESLint](https://eslint.org/) for static code analysis. - code quality issues (unused variables, potential bugs) - `eslint.config.js` — ESLint configuration (flat config format for ESLint 9)

They're configured to not conflict with each other: - `eslint-config-prettier` is installed and disables all ESLint formatting rules that Prettier handles.

TODO: Husky and lint-staged for pre-commit checks.
TODO: Maybe opt-in auto-fixer for ESLint so that `npm run lint:fix` would work.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
