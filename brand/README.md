# Brand Style Guide — Scrubs &amp; Scripture

Reference for anyone editing the playbook after delivery. Every color and
font below is already wired as a CSS variable or `font-family` in
`styles.css`; this doc is the explanatory layer.

For a **visual preview** of all palette + typography tokens, open
[`palette.html`](./palette.html) in a browser.

---

## 1. Voice

Warm but plainspoken. Business-forward. The document is a **playbook** —
a small-business advisory guide — not a devotional, not liturgical copy.
Its subject matter touches faith + healthcare because that's the client's
niche; the deliverable itself stays in business-advisor register.

**Voice reference phrases (already in the site):**
- "Come Say Hello"
- "Start a Conversation"
- "Schedule a Free Site Walkthrough"
- "Let's Talk"
- "Reach us at contact@bayoubuilt-digital.com"

Use those as a tuning fork. When a sentence starts to drift devotional,
pull it back to that register.

---

## 2. Color Palette

All colors are defined as CSS custom properties on `:root` in `styles.css`.
Use the variable name, never a literal hex, when editing the stylesheet.

### 2.1 Primary ink

| Role | Token | Hex | Usage |
| --- | --- | --- | --- |
| Primary text | `--ink` | `#1c1832` | Body copy, headings, high-emphasis text |
| Secondary text | `--ink-soft` | `#4a4363` | Muted copy, lede paragraphs, footnotes |

### 2.2 Rose — primary brand accent

Used for italic emphasis in titles, section numbering, primary callouts,
and the Encourager-voice accents.

| Role | Token | Hex | Usage |
| --- | --- | --- | --- |
| Rose | `--rose` | `#a64e5c` | Links, section numbers, italic emphasis |
| Rose — soft | `--rose-soft` | `#c77d88` | Hover tints, muted italic |
| Rose — wash | `--rose-wash` | `#fbeaed` | Default callout background |

### 2.3 Lilac — secondary brand accent

Used on the cover page, the Key Insight standout section, and Table of
Contents Part-labels.

| Role | Token | Hex | Usage |
| --- | --- | --- | --- |
| Lilac | `--lilac` | `#8b7bb0` | Cover title italic `&`, diamond ornaments |
| Lilac — soft | `--lilac-soft` | `#b4a5d1` | Ornament rules, dividers, path-card border |
| Lilac — wash | `--lilac-wash` | `#f2ecf7` | Cover background, OG card background |
| Lilac — deep | `--lilac-deep` | `#6b5d8c` | Cover metadata eyebrows, deep accents |

### 2.4 Sage — supporting (CTA + D&amp;G Fuzion companion blocks)

Sage is the "BayouBuilt Digital" voice color. Used for all primary
call-to-action buttons, the Companion block, the Site Audit showcase,
and the Storyteller-voice archetype.

| Role | Token / Hex | Usage |
| --- | --- | --- |
| Sage — primary | `--sage` &nbsp;`#6b7f5c` | Storyteller archetype, affirmative callouts |
| Sage — wash | `--sage-wash` &nbsp;`#eef3e8` | `.callout.good` background |
| Sage — CTA | `#4a6b3f` | Primary button background (CTAs, Save-PDF) |
| Sage — CTA hover | `#3a5330` | CTA hover state |
| Sage — mid | `#6b8a5f` | Companion block top-rule, audit eyebrow |
| Sage — text | `#4a5e3f` / `#3a5330` | Dark sage text on wash backgrounds |

These darker sages are intentional literals (not variables) because they
only appear inside the companion/audit composition and don't belong in
the general palette surface.

### 2.5 Gold — caution + Stretch grants

| Role | Token | Hex | Usage |
| --- | --- | --- | --- |
| Gold | `--gold` | `#b8924a` | Cover volume/edition marker, Teacher archetype, caution callouts |
| Gold — wash | `--gold-wash` | `#fbf3df` | `.callout.caution` background, gap-card background |

Gold text on gold-wash: `#8a6a1f` (caution label color, not variabled).

### 2.6 Neutrals

| Role | Token | Hex | Usage |
| --- | --- | --- | --- |
| Cream / paper | `--cream`, `--paper` | `#ffffff` | Card backgrounds, body background |
| Cream — deep | `--cream-deep` | `#f7f4fb` | Subtle tinted surface (TH backgrounds) |
| Rule | `--rule` | `#ddd4e8` | Default divider line |
| Rule — soft | `--rule-soft` | `#ebe5f1` | Dashed inner dividers |

### 2.7 Key-insight / Advocate archetype (dark)

The `.key-insight` standout at §2 uses a dark gradient:

| Role | Hex | Usage |
| --- | --- | --- |
| Ink — dark start | `#1c1832` | Gradient start (same as `--ink`) |
| Ink — dark mid | `#2d2547` | Gradient mid |
| Ink — dark end | `#3a2d4d` | Gradient end |
| Warm cream | `#faf5ed` | Text on dark ink |

The **Advocate** archetype border uses `#4a5775` (navy-lilac), also a
one-off literal.

### 2.8 "Don't use" rules

- Don't introduce a new hex outside this palette. If a section needs a
  new color, add a variable on `:root` first and document it here.
- Don't swap rose and lilac arbitrarily — rose is the primary voice
  accent, lilac is decorative/cover. Mixing them flattens the hierarchy.
- Don't use the darker sages (`#4a6b3f`, `#3a5330`) as text body color —
  they only survive as CTA backgrounds with white text on top.

---

## 3. Typography

Three web fonts, all loaded from Google Fonts with `display=swap`. The
system fallback stack is deliberately restrained so the document degrades
gracefully if fonts fail.

### 3.1 Cormorant Garamond — display serif

**`font-family: 'Cormorant Garamond', serif`**

All display-scale type: the cover title, part dividers, section titles,
card titles, brand wordmark.

Weights used: **400** (regular display), **500** (semi-bold display),
**600** (bold display), **700** (heaviest accents). Italics 400–600.

Sizes in use run from `13px` (toc-part-label roman numerals) up to
`clamp(52px, 11vw, 96px)` (cover title). Letter-spacing is almost always
negative (`-0.005em` to `-0.025em`) at display sizes.

### 3.2 Fraunces — italic accent serif

**`font-family: 'Fraunces', serif`**

Reserved for italic accents that need more personality than Cormorant's
italic: subtitles, pullquotes, archetype voice examples, section ledes,
the soft-note eyebrow, closing signature, framing-note signature.

Weights used: **400** (regular), **500** (semi-bold), always italic
in the playbook.

### 3.3 Inter — UI sans

**`font-family: 'Inter', -apple-system, sans-serif`**

Body copy, all UI chrome (nav, buttons, badges), eyebrows, section
numbers, and small uppercase labels.

Weights used: **300** (light body — rare), **400** (body), **500**
(emphasis), **600** (UI / CTA / strong), **700** (eyebrow caps).

Body base size: `16px` desktop, `15.5px` mobile, line-height `1.7`.

### 3.4 Courier New — code monospace

Used only inside `.search-example` chips and `.prompt-box` code samples.
System Courier New is fine; no web font needed.

### 3.5 Font-pairing rules

- **Headings are always Cormorant.** Never Fraunces for a heading.
- **Italics inside Cormorant headings are Fraunces** (a size-compensated
  italic face — see `.cover-title em` and `.hero h1 em`).
- **Standalone italic subtitles / ledes / pullquotes are Fraunces.**
- **Eyebrows, numbers, tags, all-caps UI are Inter.** Never Cormorant.
- **Body copy is Inter.** Long-form body never uses Cormorant or Fraunces.

### 3.6 Letter-spacing conventions

| Purpose | Tracking |
| --- | --- |
| All-caps eyebrow (10–11 px) | `0.22em` – `0.38em` |
| All-caps section label | `0.18em` – `0.25em` |
| Display heading | `-0.005em` – `-0.025em` |
| Body copy | `0` (default) |
| Cover title | `-0.025em` |

The tight negative tracking on headings is the single biggest reason the
playbook reads "premium serif" rather than generic. Don't flatten it to
`0` when adding new sections.

---

## 4. Component color conventions

When a modifier variant on a card needs a color, pair it with an existing
palette token, never a new hex.

| Modifier class | Role | Token |
| --- | --- | --- |
| `.callout` (default) | Neutral note | `--rose` border + `--rose-wash` bg |
| `.callout.good` | Affirmative | `--sage` border + `--sage-wash` bg |
| `.callout.caution` | Caution | `--gold` border + `--gold-wash` bg |
| `.grant-card.realistic` | Primary green | `#4a6b3f` border |
| `.grant-card.stretch` | Caution gold | `--gold` border |
| `.grant-card.skip` | Deprioritized | `#9a7d85` border (muted rose) |
| `.niche-card.viable` | Affirmative | `--sage` |
| `.niche-card.hard` | Caution | `--gold` |
| `.compare-card.good` | Affirmative | `--sage` |
| `.compare-card.bad` | Warning | `--rose` |
| `.voice-example.yours` | Affirmative | `--sage` |
| `.voice-example.bland` | Caution | `--gold` |
| `.archetype.encourager` | Rose | `--rose-soft` |
| `.archetype.teacher` | Gold | `--gold` |
| `.archetype.storyteller` | Sage | `--sage` |
| `.archetype.advocate` | Navy | `#4a5775` |

The pattern: **affirmative = sage, caution = gold, warning = rose,
neutral = lilac.** If you add a new variant, follow that mapping.

---

## 5. Favicon + social preview

Also at the repo root:

- `favicon.svg` — rose italic `&` on lilac-wash, matches the cover
- `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-180.png`,
  `favicon-512.png` — raster fallbacks
- `og-image.png` — 1200 × 630 social preview, built from
  `/tmp/work/og_card.html` template (see commit `674b728` for the source)

To refresh the OG card after a copy change, re-render the HTML template
at 1200 × 630 and save over `og-image.png`. Rebuild `dist` with
`python3 tools/build.py`.

---

*Owned by BayouBuilt Digital, a service of D&amp;G Fuzion LLC. Questions:
contact@bayoubuilt-digital.com.*
