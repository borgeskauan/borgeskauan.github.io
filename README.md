# Kauan Borges — Portfolio

Angular portfolio with English and Portuguese support and plain CSS.

## Current pages

- `/` — portfolio homepage
- `/projects/pix` — Instant Payment System project notes

The former `/versions/32` URLs redirect to these pages. There are no historical variants or comparison pages in the application.

## Development

`npm start` runs the development server. `npm run build` generates the static site in `build/`. `npm run verify` checks payment behavior, translations, reports, and generated pages.

Project media and original test reports are in `public/`. Both pages share `layout/top-bar.component.ts` and the palette, typography, width, and spacing tokens in `src/theme.css`. Route-specific content remains independent.
