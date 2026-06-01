# Cider & Spice — Design Prototypes

High-fidelity HTML prototypes for the Las Cruces Culinary Innovation Hub website redesign. Built with React (via CDN) + Babel — no build step required. Open any `.html` file directly in a browser.

---

## Pages

| File | Description |
|---|---|
| `Cider & Spice — Homepage.html` | Full scrollable homepage — hero, gallery, cider bar section, features, how it works, stats, timeline, FAQ, ask a question, CTA, footer |
| `Floor Plan.html` | Interactive SVG floor plan — zone filter, pan/zoom canvas, stall detail panel, vendor directory |
| `Cider Club.html` | Cider Club membership page — 3 tiers, comparison table, FAQ, pre-registration form |
| `Question Review.html` | Admin dashboard for reviewing visitor questions (passcode: `2027`) |

---

## Brand Tokens

All design tokens live in `hp-tokens.jsx`:

```js
bg:         '#1C1209'   // near-black warm brown
bgDeep:     '#100E0A'   // deeper bg for alternating sections
cream:      '#F5ECD7'   // primary text
parchment:  '#F7F3EC'   // headings
terracotta: '#C4622D'   // primary accent / CTAs
gold:       '#D4A84B'   // secondary accent / stats
wheat:      '#E8C18D'   // body text on dark bg
```

**Fonts** (Google Fonts):
- `Cormorant Garamond` — display / headlines (wt 300, 400; italic variants)
- `Josefin Sans` — labels, eyebrows, CTAs (wt 400, 600)
- `Inter` — body text (wt 300, 400, 500)

---

## Component Files

```
hp-tokens.jsx     — brand tokens, shared hooks (useInView, useCountUp), atoms (FadeIn, SectionEyebrow, ImgCell)
hp-nav-hero.jsx   — sticky nav + urgency ribbon + hero section + trust bar marquee + mobile CTA bar
hp-sections.jsx   — gallery (lightbox + mobile swipe), cider bar section, features grid, how it works
hp-bottom.jsx     — stats + count-up, investment tiers, milestone timeline, FAQ accordion, ask a question, CTA, footer
```

---

## Key Design Decisions

### Hero
- **Ken Burns** zoom (1.09→1.0 over 14s) on background image
- **Parallax** scroll at 28% of scroll speed
- **Staggered entrance** — eyebrow → headline → rule → body → CTAs → stats (0.2s increments)

### Gallery
- **Desktop**: magazine grid — hero image spans 2 rows left + 2×2 right
- **Mobile (≤640px)**: horizontal scroll-snap filmstrip, 82vw per card
- **Lightbox**: full-screen overlay, blur backdrop, keyboard nav (←/→/Esc)
- Tenant vision row (3 vendor stall concepts) clearly labelled as illustrative

### Navigation
- Transparent over hero → darkens + blurs on scroll
- **Urgency ribbon**: "4 vendor spots remaining" (dismissable, localStorage persists dismiss)
- **Mobile sticky CTA**: slides up after hero, disappears near the CTA section

### Interactions
- All scroll-triggered elements use `IntersectionObserver` (no GSAP dependency)
- Stat counters use `requestAnimationFrame` count-up with cubic ease-out
- FAQ + Ask a Question use React state accordion (no library)

### Question System
- Visitor submissions stored in `localStorage` under key `cs_questions`
- Admin page reads the same key — questions submitted on homepage appear live in `Question Review.html`
- Admin passcode: `2027` (session-persisted via `sessionStorage`)
- Status flow: **New → Reviewed → Answered → Archived**

---

## How to Add to the Repo

```bash
# Clone your repo
git clone https://github.com/Noel8900/lc-culinary-hub.git
cd lc-culinary-hub

# Copy this folder into a /design directory
cp -r design-prototypes/ design/

# Commit
git add design/
git commit -m "Add HTML design prototypes — homepage, floor plan, cider club, admin"
git push origin main
```

The prototypes live in `/design` and are independent of the Next.js app — they're reference designs for your dev team to implement.

---

## Image URLs

All images are loaded from the live Vercel deployment:

```
https://lc-culinary-hub.vercel.app/images/
  cider-spice-bar-craft-cider-tap-pour-concept-rendering.png
  cider-spice-interior-two-level-open-kitchen-concept-rendering.png
  cider-spice-gallery-aerial-outdoor-exterior-collage-vision-image.png
  cider-spice-concept-overhead-stage-full-crowd-concept-rendering.png
  cider-spice-outdoor-indoor-patio-shade-sails-concept-rendering.png
  cider-spice-concept-indoor-mezzanine-flow-concept-rendering.png
  cider-spice-tenant-vision-three-stall-row-vision-image.png
  cider-spice-tenant-vision-sticky-stack-co-stall-vision-image.png
  cider-spice-tenant-vision-seoul-fire-chicken-stall-vision-image.png
```

---

## Design Explorations (in `/explorations`)

| File | Description |
|---|---|
| `Homepage Redesign.html` | Side-by-side design canvas — 3 hero directions, 3 gallery directions, 2 mobile directions |
| `hero-artboards.jsx` | Hero A (Cinematic), B (Editorial Split), C (Atmospheric Anchor) |
| `gallery-artboards.jsx` | Gallery A (Magazine Grid), B (Editorial Asymmetric), C (Feature+Filmstrip) |
| `mobile-artboards.jsx` | Mobile A (Full-Bleed Anchor), B (Split Layout) |

**Chosen directions**: Hero A · Gallery A · Mobile A

---

*Built June 2026 · Las Cruces Culinary Innovation Hub*
