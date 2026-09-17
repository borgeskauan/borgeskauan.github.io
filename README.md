# Kauan Borges — Portfolio

Angular portfolio with English and Portuguese support and plain CSS.

## Current pages

- `/` — portfolio homepage
- `/projects/pix` — Instant Payment System project notes

The former `/versions/32` URLs redirect to these pages. There are no historical variants or comparison pages in the application.

## Development

`npm start` runs the development server. `npm run build` generates the static site in `build/`. `npm run verify` checks build metadata, translations, evidence, and generated pages.

Project media and original test reports are in `public/`. Both pages share `layout/top-bar.component.ts` and the palette, typography, width, and spacing tokens in `src/theme.css`. Route-specific content remains independent.

## Publishing

Pushes to `main` run `.github/workflows/pages.yml`, which builds the site, runs `npm run verify`, and deploys `build/` to GitHub Pages. The workflow can also be started manually from GitHub Actions. The repository's Pages publishing source must be set to **GitHub Actions**.

The **Version** toggle at the bottom of both pages shows the loaded build's short commit ID and build time in UTC. `npm run build` and `npm start` generate this metadata automatically; local builds with tracked, uncommitted changes add `-local`. The ID is embedded in the application, so an older open tab continues to identify its own build until reloaded.
