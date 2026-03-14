# CLAUDE.md — a-responsive-viewer

## Project Overview

**a-responsive-viewer** is a vanilla HTML/CSS/JavaScript tool that lets users preview any website simultaneously across three device viewports (laptop, tablet, phone) using iframes. There are no build tools, frameworks, or package managers — the entire project is plain web standards.

## Tech Stack

- **HTML5** — semantic markup, single `index.html` entry point
- **CSS3** — custom properties, Grid, Flexbox, media queries (`assets/css/styles.css`)
- **Vanilla JavaScript** — no dependencies, no bundler (`script.js`)
- **SVG** — favicon and logo assets

## Repository Structure

```
a-responsive-viewer/
├── index.html              # Single-page app entry point
├── script.js               # Active JavaScript (loaded by index.html)
├── script1.js              # Experimental: basic scroll-sync implementation
├── script2.js              # Experimental: refactored scroll-sync with helpers
├── script3.js              # Experimental: optimized scroll-sync with rAF + error handling
├── favicon.svg             # Browser favicon (purple bg, yellow circle)
├── README.md               # Brief project description
├── TODO.txt                # Pending tasks
└── assets/
    ├── css/
    │   └── styles.css      # All styles
    └── img/
        └── logoipsum-332.svg
```

> **Note:** Only `script.js` is referenced by `index.html`. The numbered scripts (`script1.js`–`script3.js`) are experimental iterations and are **not** active.

## Architecture

### Single Page, Iframe-Based

The app renders three `<iframe>` elements side-by-side inside a CSS Grid container. Each iframe simulates a different device viewport by being constrained to a fixed width via grid column sizing:

| Viewport | Grid column | Element ID  |
|----------|-------------|-------------|
| Laptop   | `1024fr`    | `laptopView`  |
| Tablet   | `768fr`     | `tabletView`  |
| Phone    | `375fr`     | `phoneView`   |

### JavaScript Responsibilities (`script.js`)

- `updateHeaderHeight()` — measures the header's rendered height and writes it to the CSS variable `--js-header-height`. Called on `load`, `resize`, and `scroll`.
- `updateIframes()` — reads the URL input value and sets it as the `src` of all three iframes.
- Event wiring: Enter key on the input and click on the "View" button both call `updateIframes()`.

### CSS Design System

All design tokens are CSS custom properties defined in `:root`:

| Variable           | Value     | Purpose                        |
|--------------------|-----------|--------------------------------|
| `--c-bg`           | `#9c7bff` | Primary background (purple)    |
| `--c-bg-alt`       | `#00ff9f` | Secondary / scrollbar track    |
| `--c-accent`       | `#f8ff1d` | Accent / scrollbar thumb       |
| `--c-text`         | `black`   | Body text                      |
| `--js-header-height` | dynamic | Set by JS; used to size iframes|

**Visual style:** Neobrutalist — thick black borders (`5px solid black`), `8px` border-radius, `5px 5px black` box-shadows.

**Font:** "Work Sans" loaded from Google Fonts, bold weight throughout.

### Responsive Breakpoints

| Breakpoint   | Behaviour                                                                 |
|--------------|---------------------------------------------------------------------------|
| `≥ 1241px`   | All three iframes visible                                                  |
| `≤ 1240px`   | Laptop iframe hidden; tablet + phone remain                               |
| `≤ 1024px`   | Header collapses to single column; form goes full-width                   |

## Conventions

### HTML

- Use semantic HTML5 elements.
- The `<header>` uses a 3-column grid: logo | form | social icons.
- Keep the viewport meta tag (`width=device-width, initial-scale=1`).

### CSS

- Add new design tokens as CSS custom properties in `:root`.
- Follow the existing neobrutalist style: solid black borders, box shadows, bright accent colours.
- New responsive rules go in `assets/css/styles.css`, grouped with related media queries.
- Custom scrollbar styles use `::-webkit-scrollbar` — maintain them for cross-browser consistency.

### JavaScript

- Keep `script.js` as the single active script loaded by the HTML.
- Do **not** load `script1.js`, `script2.js`, or `script3.js` — they are experimental archives.
- If scroll synchronisation is added to `script.js`, prefer the `script3.js` pattern: `requestAnimationFrame`, an `isScrolling` guard flag, and a `try/catch` around cross-origin scroll calls (which will throw for sites that block embedding).
- No build step — write plain ES6+ that runs directly in modern browsers.
- Avoid external dependencies.

### Naming

- CSS classes: kebab-case (e.g., `iframe-container`, `social-icons`)
- JS functions: camelCase (e.g., `updateIframes`, `syncScroll`)
- HTML element IDs for iframes: camelCase device name + "View" (e.g., `laptopView`)

## Development Workflow

There are no build tools or scripts. To develop:

1. Open `index.html` directly in a browser, or serve the folder with any static server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
2. Edit HTML, CSS, or JS files and refresh the browser.
3. No compilation, transpilation, or bundling needed.

## Testing

There is currently **no automated test suite**. Manual testing is the only approach:

- Test iframe loading with a variety of URLs (note: many sites block embedding via `X-Frame-Options` / CSP headers — this is expected behaviour, not a bug).
- Test responsive layout at the defined breakpoints (1240px, 1024px).
- Verify the "View" button and Enter-key trigger both update all three iframes.
- Verify header height recalculates correctly on window resize.

## Known Limitations / Open Items (from TODO.txt)

- Input and button styling should be updated to full neobrutalist style.
- Additional responsive/media-query polish is planned.
- Scroll synchronisation across iframes is not yet implemented in the active `script.js` (prototyped in `script1–3.js`).
- Many websites will refuse to load inside iframes (CSP / `X-Frame-Options`); this is a browser security constraint, not an app bug.

## Branch & Commit Conventions

- Feature work goes on named branches (`claude/...`, `feature/...`).
- Commit messages are concise imperative statements describing the change (e.g., `Add svg favicon`, `Avoid vertical scroll overflow`).
- No commit signing key is required for day-to-day work; the repository uses SSH-based signing configured in `.gitattributes`.
