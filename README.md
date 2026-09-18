# Kauan Borges — Portfolio

Angular portfolio with English and Portuguese support and plain CSS.

## Current pages

- `/` — portfolio homepage
- `/projects/pix` — Instant Payment System project notes

The former `/versions/32` URLs redirect to these pages. There are no historical variants or comparison pages in the application.

## Development

`npm start` runs the development server. `npm run build` generates the static site in `build/`. `npm run verify` checks translations, evidence, generated pages, and the absence of the removed debug interface.

Project media and original test reports are in `public/`. Both pages share `layout/top-bar.component.ts` and the palette, typography, width, and spacing tokens in `src/theme.css`. Route-specific content remains independent.

## Publishing

Pushes to `main` run `.github/workflows/pages.yml`, which builds the site, runs `npm run verify`, and deploys `build/` to GitHub Pages. The workflow can also be started manually from GitHub Actions. The repository's Pages publishing source must be set to **GitHub Actions**.

Deployment status and the published commit are available in GitHub Actions. The site has no visitor-facing version control.

## Styles

`src/styles.css` contains the shared foundation and fonts; `src/home.css` contains the homepage layout. The Pix page owns its styles in `src/app/projects/pix/payment-study.component.css`. Old design variants and their style layers have been removed.
