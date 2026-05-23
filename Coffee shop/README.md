# Coffee shop — four brand directions

A demo to show a coffee shop owner four complete brand directions. Each one is a fully designed sample homepage. Open `index.html` and click between them in the top bar (or press `1`–`4`). No build, no install.

## How the app works

`index.html` is the shell — a dark agency-style top bar with a chooser for the four variants. Below it sits an `<iframe>` that loads the selected variant. The shell stays fixed; only the preview swaps. The URL updates with `?v=<variant>` so a specific variant can be linked or refreshed-into directly.

```
Coffee shop/
├── index.html        — app shell with variant chooser
├── editorial.html  + editorial.css   — 01 · Halfway
├── industrial.html + industrial.css  — 02 · Drum & Burr
├── botanical.html  + botanical.css   — 03 · Verdant Hours
├── studio.html     + studio.css      — 04 · Halftone
├── script.js        — shared interactions (used by editorial)
└── README.md
```

## The four directions

These are not four color reskins of the same site. Each is a different brand identity with its own typography, color, layout treatment, voice, and signature components. A real shop would pick the direction that fits its personality, and we'd adapt it to their name, copy, and photography.

### 01 · Halfway — Editorial · print zine
A coffee shop that frames itself as a publication. Best for neighborhood institutions with strong narrative and a quiet, owner-led voice.

- **Signature moves** — newspaper dateline masthead, Roman-numeral sections (I–V), cupping-notes detail card with hand-drawn roast curve, dot-leader editorial menu, live shop pulse widget, hand-drawn block map
- **Type** — Fraunces (display serif) + Inter Tight + JetBrains Mono
- **Color** — warm cream paper + deep roast brown + ember accent (restrained, <10% non-neutral surface)

### 02 · Drum & Burr — Industrial · spec sheet
A working roastery aesthetic. Best for craft-technical shops that want to position around the roast itself.

- **Signature moves** — batch-number masthead with lat/long coords and live timestamp, equipment spec card, animated bean-temp indicator, thermograph SVG (bean & environment temp over time), SKU'd weight-grid menu (D-01, F-02, etc.), operator's log timeline as the story, blueprint-style schematic map with dimension lines, kanban hours grid
- **Type** — IBM Plex Sans + IBM Plex Mono
- **Color** — bone paper + pitch text + flame orange accent (industrial, full borders, hard edges)

### 03 · Verdant Hours — Botanical · apothecary
A slow-living coffee apothecary. Best for shops with herbal/wellness adjacencies, plant-led palettes, or quiet contemplative voice.

- **Signature moves** — folio numbering (No. II · iv), ornamental SVG dividers between sections, hand-drawn coffee plant illustration, recipe-style menu (each drink lists its ingredients), italic-heavy classical typography, garden-plot map (shop placed among trees and herb patches), field-notes essay with drop cap
- **Type** — Cormorant Garamond + Inter
- **Color** — bone with green tint + sage green + terracotta accent

### 04 · Halftone — Studio · block poster
Loud, confident, designer-aware. Best for shops in design districts, with younger crowds and strong opinions.

- **Signature moves** — block-typography hero (huge stacked type with color blocks), section bar with checkered rule, full-bleed yellow poster for today's coffee, tiled menu grid (each item is a colored block with feature tiles in cobalt and red), numbered six-rule manifesto on black, color-coded hours grid, schematic block-map of the neighborhood (buildings as colored rectangles)
- **Type** — Archivo Black (display) + Archivo + JetBrains Mono
- **Color** — paper white + pitch black + cobalt + process yellow + red

## What's shared across all four (our agency's recognizable spine)

Even though each direction has its own voice, all four are built on the same disciplines that distinguish our work from template builders:

- **OKLCH color throughout** — every neutral is tinted toward the brand hue. No `#000`, no `#fff`.
- **No template shortcuts banned** — no gradient text, no glassmorphism cards, no identical icon-and-title feature grids, no Google Maps iframe, no em dashes, no AI-slop hero-metric template.
- **Color strategy is committed, not default** — each variant picks an explicit color commitment (Restrained for Editorial, Industrial-accented for Drum & Burr, Restrained-with-warmth for Verdant, Full-palette for Halftone) instead of one safe default.
- **Domain-literate components** — every variant has at least one component that reflects deep coffee knowledge (cupping notes, roast curve, harvest details, varietal callouts) — never generic feature cards.
- **Custom SVG maps** — every variant draws its own neighborhood map (hand-drawn, blueprint, garden-plot, schematic) in service of its identity. No iframes.

## What we'd add for the production build of whichever direction is chosen

- Real shop pulse / live data hooked up where present (Editorial, Industrial)
- Real photography commissioned for the shop — the demo deliberately uses no photos, to prove the design holds on typography and layout alone
- Online ordering integration (Square or Toast)
- Newsletter capture wired to ConvertKit or Buttondown
- CMS for the owner to swap "this week's roast" or "this week's harvest" without a developer
- Mobile polish pass — all four are responsive but a production build would tune mobile spacing and re-time the masthead/nav on small screens
