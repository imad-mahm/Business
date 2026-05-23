# design.md — The Directions Menu ("Studio Switcher")

The shared shell that wraps every multi-direction project in this workspace. It
is the chrome around the previews: a studio rail on the left that lists the
design directions, and a stage on the right that renders the selected one in an
iframe. It is **not** part of any single project's aesthetic; it is the neutral
ATELIER frame that lets a client compare directions.

Use this file as the single source of truth. Future projects reference *this*
spec, not another project's full design, so the menus stay identical while the
work inside them stays free.

Every rule below is tagged with the skill it derives from, so a decision can be
re-derived from first principles instead of copied blindly:

- **[IMP]** — `impeccable` (color, motion, type, copy laws, anti-patterns)
- **[PMX]** — `ui-ux-pro-max` (layout patterns, navigation, responsive, states)
- **[TASTE]** — `design-taste-frontend` (metric-based rules, component
  architecture, hardware-accelerated CSS, performance)

Reference implementations (kept byte-identical except for content/data):
`Coffee shop/index.html` and `restaurant/index.html`.

---

## 1. Shell layout

- **Two-pane shell: fixed rail + fluid stage.** `grid-template-columns: 340px 1fr`,
  full `100dvh`, `overflow: hidden` on the body. The rail persists; only the
  stage changes. **[PMX]** persistent-nav + content-stage is the admin/dashboard
  navigation pattern, reused here because comparing variants is a navigation task.
- **Rail width is a hard 340px, never a percentage.** Fixed measure keeps the
  direction names, tags, and swatches on one predictable line. **[TASTE]** metric-based
  layout over fluid guesswork.
- **The stage is a single `<iframe>`** so each direction stays a fully isolated
  document with its own fonts, tokens, and scripts; nothing leaks between them.
  **[TASTE]** strict component isolation.
- **Do not wrap the rail contents in cards.** The rail is one surface; sections are
  divided by hairline rules and spacing, not nested boxes. **[IMP]** cards-are-the-lazy-answer;
  nested cards are always wrong.

## 2. Color & tokens

- **OKLCH only, tinted neutrals.** The shell is a warm dark neutral
  (`oklch(0.17 0.012 65)` → `0.25 0.016 65`); never `#000`/`#fff`. Chroma stays
  low (0.012–0.016) so the dark stays a *color*, not a void. **[IMP]**
- **Restrained strategy: one accent, used sparingly.** A single warm amber
  (`--accent: oklch(0.78 0.15 70)`) marks the active number, the live dot, and the
  load bar, and nothing else. It covers well under 10% of the surface. **[IMP]**
  restrained color strategy.
- **Dark by intent, not reflex.** The scene: a reviewer comparing bright design
  comps side by side. A dark rail recedes so the lit previews in the stage carry the
  color; a light rail would compete with them. The theme is forced by the scene,
  not chosen for "tools look cool dark." **[IMP]** theme = physical-scene reasoning.
- **Tokens live in `:root`** as `--bg / --bg-2 / --bg-3 / --line / --line-soft /
  --text / --mute / --dim / --accent / --stage-bg / --ease`. Projects may override
  `--accent` only. **[TASTE]** centralized, named, single-override token system.

## 3. Typography

- **Two families, clear roles.** A serif (`Fraunces`) for direction names and the
  studio mark; a grotesque (`Inter`) for body and the project blurb; a monospace
  (`JetBrains Mono`) for labels, tags, counts, and the keyboard hint. **[PMX]**
  deliberate font pairing by role.
- **Hierarchy by scale + weight, ratio ≥ 1.25.** Studio mark 24px, direction name
  16px, body 12.5px, tags/labels 9–10px. Mono labels carry wide tracking
  (0.18–0.22em, uppercase) so they read as system text, not prose. **[IMP]**
- **Labels are mono + uppercase + tracked; names are serif.** The contrast between
  "machine voice" (mono labels) and "authored voice" (serif names) is the rail's
  signature. **[TASTE]** typographic role rules over ad-hoc sizing.

## 4. Component anatomy (`.rail`)

A strict, flat class system. Same markup in every project. **[TASTE]** component architecture.

```
.rail
  .rail__head      → .brand (.brand__mark "ATELIER" + .brand__kind "identity studio")
                     .rail__sub  (one line of project context)
  .rail__listlabel ("N directions", mono uppercase)
  .nav
    .opt[.active][data-variant]
      .opt__no     (mono index, 01…)
      .opt__body   (.opt__name serif + .opt__tag mono)
      .opt__sw     (3 × <i> palette swatches pulled from the variant's real tokens)
  .rail__foot      → .sig (.sig__dot pulsing + .sig__txt project promise)
                     .kbd (keyboard hint)
.stage
  .stage__bar      (load indicator)
  iframe#frame
```

- **Swatches are required and must be the variant's real colors** (bg / ink /
  accent), so the rail previews each direction honestly before it loads. **[PMX]**
  give the user a visual cue before navigation.
- **The `.sig` slot is project-specific copy in a fixed design** — e.g. the
  restaurant's live "Service Clock" note, the coffee study's "no templates"
  promise. Design fixed, words free. **[IMP]** every word earns its place.

## 5. Motion

- **Animate only `transform` and `opacity`.** Option hover is
  `translateX(2px)`; active is a background/border swap; the load bar is a
  `scaleX` sweep. No animating width, height, margin, or color-as-layout. **[IMP]** +
  **[TASTE]** hardware-accelerated, compositor-only properties.
- **Ease-out expo, ~240–320ms, no bounce.** `--ease: cubic-bezier(0.16,1,0.3,1)`
  on every transition. **[IMP]** ease-out exponential, never elastic.
- **The live `.sig__dot` pulses** via an expanding `box-shadow` ring (opacity only),
  signalling the rail is "live" without animating layout. **[TASTE]**

## 6. Responsive

- **Breakpoint at 880px.** Above: two-pane grid. Below: the rail becomes a fixed
  off-canvas drawer (`translateX(-102%)` → `0`) behind a backdrop, opened from a
  compact top bar (`.mtop`) showing the studio mark + current direction. **[PMX]**
  off-canvas drawer is the standard mobile navigation collapse.
- **The stage stays full-bleed on mobile;** the drawer overlays it rather than
  pushing it, so the preview never reflows. **[PMX]** + **[TASTE]**.

## 7. Interaction & state

- **Click, number keys (1–N), and a `?v=` URL param** all drive the same
  `select(name)` function; selection is one source of truth. **[TASTE]** single
  state path. **[PMX]** multiple discoverable affordances for one action.
- **`Escape` closes the drawer; typing in a field never triggers a hotkey.**
  Guard `INPUT/TEXTAREA/SELECT` and modifier combos. **[PMX]** interaction-state hygiene.
- **Re-selecting the active direction is a no-op** (no reload flash). **[TASTE]** guard
  redundant work.

## 8. Accessibility & copy

- **Real `<button>`s in a `<nav aria-label>`,** `aria-expanded` on the toggle,
  `aria-hidden` on decorative swatches. **[PMX]**
- **No em dashes, no gradient text, no side-stripe borders, no glassmorphism.**
  These are banned in the shell as everywhere. **[IMP]** absolute bans.
- **Copy is sparse and concrete:** the blurb states what is being reviewed and what
  to do ("Pick the one that feels like your place"), nothing more. **[IMP]**

---

## How to reuse for a new project

1. Copy either reference `index.html` into the new project folder.
2. Change only: `.rail__sub` blurb, `.rail__listlabel` count, the `.opt` list
   (names, tags, `data-variant`, swatches from the new variants' real tokens), the
   `.sig__txt` promise, the `order` array, and the default iframe `src`.
3. Leave the shell CSS, tokens, motion, and script untouched. Override `--accent`
   only if the studio accent must shift.
4. If a rule here ever feels wrong for the project, re-derive it from the tagged
   skill rather than improvising.
