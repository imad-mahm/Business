# Cakes & Cookies — Website (Phase 1 Frontend)

A self-contained static site. No build step, no dependencies — just open `index.html` in a browser.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, collections, how-it-works, story, Instagram strip, CTAs |
| `gallery.html` | Filterable portfolio (Luxury 3D / Weddings / Birthdays / Kids / Treats) |
| `menu.html` | Menu & collections; each item links into the order form pre-filled |
| `order.html` | 3-step Order/Quote funnel → opens a pre-filled WhatsApp message |
| `delivery.html` | Lebanon vs UAE delivery zones + FAQ |
| `about.html` | Brand story (since 2009), stats, craft values |
| `contact.html` | Phones, WhatsApp, socials, map link |

## How the order funnel works
The form (`order.html`) collects occasion, item, flavour, market, date, servings, budget,
name and phone, then builds a formatted message and opens **WhatsApp**:
- **Lebanon** market → `+961 76 177 785`
- **UAE** market → `+971 52 136 0218`

The customer attaches their reference photo inside WhatsApp and sends. No backend required for
Phase 1 — this matches how the brand already converts customers. (Phase 2 can add a real backend
+ admin dashboard + online checkout, per the proposal.)

## Adding the real photos  ⚠️ IMPORTANT
The design uses graceful blush-coloured placeholders that show a label until you add images.
Drop the brand's own **high-resolution** photos (from Instagram/Facebook) into `assets/images/`
using these exact filenames:

**Home:** `hero.jpg` (portrait 4:5), `collection-3d.jpg`, `collection-birthday.jpg`,
`collection-treats.jpg`, `story.jpg`, `ig-1.jpg` … `ig-6.jpg`

**Gallery:** `g-1.jpg` … `g-12.jpg`

**Menu:** `m-3d.jpg`, `m-tier.jpg`, `m-bday.jpg`, `m-number.jpg`, `m-cupcake.jpg`,
`m-cookie.jpg`, `m-pop.jpg`, `m-dessert.jpg`

**About:** `about-team.jpg`, `about-craft.jpg`

Use real photos the brand owns. Prefer original high-res files over screenshots so they stay crisp.

## Confirm with the owner before launch
- Exact branches (Naccache/Antelias vs Bayada vs Achrafieh) and delivery zones/lead times per country.
- Whether to add Phase 2 online checkout for fixed-price boxes.
See `../Cakes-and-Cookies-Website-Proposal.md` for the full plan and sales pitch.

## Design system
Fonts: Playfair Display (headings) + Inter (body). Palette: warm stone + gold `#A16207`.
Mobile-first, responsive at 600 / 860 / 1100px, respects `prefers-reduced-motion`.
