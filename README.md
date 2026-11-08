# Aastha Gupta · Product Manager portfolio

Live: https://aastha2811.github.io/aastha-portfolio/

Plain HTML, CSS and JavaScript with no build step, served by GitHub Pages from `main`.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home page (about, case study cards, how I work, experience, toolkit, contact) |
| `work/<case>/index.html` | One page per case study, each with its own URL |
| `assets/css/style.css` | All styles; colours are tokens in `:root` |
| `assets/css/theme-v2.css` | v2 "Soft Peach" colour theme (overrides tokens only) |
| `assets/js/main.js` | Fit check panel, interactive toolkit, sticky nav, copy buttons |
| `v2/` | Same site with the v2 theme, marked `noindex` while it's being reviewed |
| `img/` | Photos, share images (`og-*.png`) |
| `sitemap.xml` | For Google Search Console |

## SEO

- Every page has a unique title, description, canonical URL, Open Graph and Twitter tags.
- Structured data: `ProfilePage` + `Person` on the home page, `Article` + `BreadcrumbList` on case studies.
- All content, including the toolkit evidence, is in the HTML; JavaScript only adds interaction.
- Submit `https://aastha2811.github.io/aastha-portfolio/sitemap.xml` in Google Search Console.

## Switching to v2

Add `<link rel="stylesheet" href="assets/css/theme-v2.css">` after `style.css` on the root pages (or ask Claude), then delete `v2/`.
