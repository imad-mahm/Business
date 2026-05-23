# DESIGN.md — SORREL, five directions

All directions use OKLCH, tinted neutrals (never pure #000/#fff), scale+weight
type hierarchy (ratio >=1.25), ease-out motion, and the shared **Service Clock**
signature. No side-stripe borders, no gradient text, no glass-by-default.

## Shared signature: The Service Clock
- Reads `new Date()` locally. Day-parts: Brunch 09-12, Lunch 12-16, Dinner 16-23,
  Late 23-01, Closed otherwise (demo hours).
- Shows: state dot (open/closed), day-part label, line like
  "Dinner service · last seating in 2h 14m", live-updating each minute.
- Sets a `data-daypart` attr on `<html>` so each direction can warm/cool its accent.
- Implemented per-file (self-contained), styled to each direction.

## Direction 01 — PRESS (editorial print)
- Strategy: Restrained. Ink on warm cream.
- Color: bg oklch(0.96 0.012 85) cream; ink oklch(0.22 0.02 60); accent
  oklch(0.55 0.17 25) (vermillion, used <10%).
- Type: serif display (Fraunces) huge, with a grotesque (Inter) for utility.
- Layout: asymmetric editorial grid, hairline rules, drop-cap, marginalia.
- Mood: a printed menu/zine made by people with taste.

## Direction 02 — EMBER (dark cinematic fine-dining)
- Strategy: Committed dark. Candlelit.
- Color: bg oklch(0.16 0.014 40) near-black warm; text oklch(0.92 0.01 80);
  accent oklch(0.78 0.13 70) warm gold.
- Type: high-contrast serif (Cormorant) for display, Inter for body.
- Layout: full-bleed dark, generous negative space, single spotlight column.
- Mood: candle on a dark table, last seating, intimate.

## Direction 03 — SUN-CURED (warm drenched maximalism)
- Strategy: Drenched. The surface IS the color.
- Color: bg oklch(0.82 0.12 55) terracotta/amber; ink oklch(0.28 0.06 40);
  pop oklch(0.6 0.18 15) and oklch(0.85 0.16 110).
- Type: big rounded grotesque (Hanken/Inter heavy), oversized.
- Layout: chunky, overlapping, playful blocks, sticker-like badges.
- Mood: sun-baked patio, loud, joyful, market-fresh.

## Direction 04 — SPEC (brutalist mono-grid)
- Strategy: Restrained, high-contrast.
- Color: bg oklch(0.95 0.004 250) paper-white; ink oklch(0.2 0.01 250); accent
  oklch(0.6 0.2 145) signal-green.
- Type: monospace (JetBrains Mono) + grotesque. Visible grid lines, spec-sheet.
- Layout: exposed grid, coordinate labels, data-dense, deadpan.
- Mood: declassified spec sheet for a restaurant. Confident, unusual.

## Direction 05 — SORREL GARDEN (soft botanical)
- Strategy: Committed soft. Sage and cream.
- Color: bg oklch(0.95 0.02 130) pale cream-green; ink oklch(0.3 0.04 150);
  accent oklch(0.6 0.11 150) sage, blush oklch(0.85 0.06 30).
- Type: humanist serif (Fraunces soft) + rounded sans.
- Layout: organic curves, soft radii, gentle float motion, generous air.
- Mood: morning light, fresh herbs, calm.
