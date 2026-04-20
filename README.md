# Scrubs & Scripture Playbook

**Private deliverable — Wanda Pizzolato, LPN (Covington, LA)**
Prepared by BayouBuilt Digital, a service of D&G Fuzion LLC
Delivered April 2026

---

## What's here

The playbook is split into a readable **working copy** at the repo root and a
minified **production bundle** under `/dist`.

### Working copy (edit these)

| File | Purpose |
| --- | --- |
| `index.html` | Structure + body copy only |
| `styles.css` | All styling, with labeled section TOC at the top |
| `script.js` | Nav toggle, anchor-close behavior, "Save as PDF" trigger |
| `playbook.pdf` | Print-ready version (81 pages, 1.28 MB) |

### Production bundle (deploy these)

| File | Purpose |
| --- | --- |
| `dist/index.html` | Minified HTML, points at the minified CSS/JS |
| `dist/styles.min.css` | Minified stylesheet |
| `dist/script.min.js` | Minified script |

Ship the three files in `/dist` to GitHub Pages. The root files stay as the
maintenance source.

## Live URL

`https://bayoubuilt-digital.github.io/scrubs-scripture-playbook/`

> **Privacy note:** This repo is private. GitHub Pages still publishes it at
> the URL above, but the URL is only shared directly with Wanda. Not indexed,
> not linked from any public site.

## Updates

When Wanda pivots, when Louisiana rule changes, when a grant deadline updates:

1. Edit the root files (`index.html` / `styles.css` / `script.js`)
2. Regenerate the `/dist` bundle (see **Build steps** below)
3. Regenerate `playbook.pdf` via the Playwright script (see **PDF generation**)
4. Commit and push — GitHub Pages redeploys in ~30 seconds

### Build steps (regenerate /dist)

The minifier lives in `tools/build.py` (plain Python, no deps). From the repo
root:

```bash
python3 tools/build.py
# or:  npm run build
```

It rewrites `dist/index.html`, `dist/styles.min.css`, and `dist/script.min.js`
from the root source files.

### PDF generation

The PDF is produced by Playwright printing the rendered page. The script
reads `index.html` (root source) — not the minified bundle — so styling and
content stay in sync with whatever you just edited:

```bash
npm install            # first time only, installs playwright
npx playwright install chromium   # first time only
npm run pdf            # or:  node tools/make-pdf.js
```

This writes `playbook.pdf`. The built-in `Save as PDF` button on the web
version works identically for one-off exports.

## Version history

- **v1.0** — April 2026 — initial delivery (81 pages, v1 framing note, v1 grants section)
- **v1.1** — April 2026 — split single-file HTML into `index.html` / `styles.css` / `script.js`; added `/dist` minified bundle; removed 7 dead CSS rules; consolidated duplicate media queries (340px, 380px, print); added proper meta tags (description, robots, author), `preload` hints for Google Fonts and the stylesheet, and `defer` on the script tag. No visible content, voice, or design changes.

### What v1.1 removed (dead code)

These CSS rules were defined but never used in the HTML and were deleted:

- `.hero-meta`, `.hero-meta strong`
- `.hero .tagline`
- `.hero .prep-credit`, `.hero .prep-credit strong`
- `.pillar`, `.process-step`, `.price-line`, `.testimonial` (referenced only in the print `break-inside` rule)

### v1.1 file-size comparison

| | Before | After (source) | After (dist) |
| --- | --- | --- | --- |
| HTML | 258,451 B | 178,768 B | 165,513 B |
| CSS | (inline) | 74,912 B | 55,889 B |
| JS | (inline) | 1,652 B | 1,026 B |
| **Total transferred** | **258,451 B** | **255,332 B** | **222,428 B** |

Deploying the `/dist` bundle saves ~36 KB over the original single file
(~13.9%), with the biggest win being the minified CSS. Browsers cache
`styles.min.css` and `script.min.js` separately from the HTML, so repeat
visits become cheaper.

---

*For internal reference only. Do not share publicly.*
