## Project
Cider & Spice Culinary Hub — Static marketing site (Next.js migration planned)

## Stack (current)
- Frontend: Vanilla HTML / CSS / JavaScript (index.html, styles.css, main.js)
- Deploy: Vercel (static, no build step — `npx vercel --prod` to deploy)
- Images: /images/ directory (PNG concept renderings)

## Stack (target — Next.js migration)
- Frontend: Next.js (App Router) + Tailwind CSS + Pagedone components
- Backend: NoCodeBackend REST API
- Deploy: Vercel

## Conventions
- Keep all sections in the order: Hero → Trust Bar → Gallery → Opportunity →
  Concept → Cider Bar → Vendor Model → Financials → Impact → Comparables →
  FAQ → Newsletter → Contact → Footer
- CSS custom properties (design tokens) live at the top of styles.css — always
  use tokens, never hardcode brand colours
- JS is a single main.js file — use IIFEs or clearly named function blocks
- All form submissions go to Formspree: https://formspree.io/f/xlgzzezb
- Never hardcode API keys; use .env.local for Next.js migration

## Design Tokens (CSS vars)
- --red / --red-dark / --red-light: Chile-brick red
- --amber / --amber-light: Saffron gold
- --sage / --sage-light: Desert sage
- --sand / --sand-dark / --cream: Warm parchment backgrounds
- --charcoal / --charcoal2 / --charcoal3: Dark text / backgrounds
- --ember-bg (#1a0f08): Midnight ember — cider bar dark background
- --gold (#d4a84b): Gold accent for ember-dark sections
- --font-display: Abril Fatface (display)
- --font-serif: Playfair Display (headings)
- --font-sans: Inter (body)
- --font-label: Josefin Sans (labels, overlines, badges)

## Section IDs (nav anchors)
- #top — site header
- #opportunity — Why Las Cruces / market data
- #concept — How It Works (6 program cards)
- #cider — Craft Cider Bar + Cider Club tiers
- #incubator — Vendor Model + incubator pathway
- #financials — Investor Overview + financial table
- #impact — Community Impact + grant categories
- #faq — FAQ accordion
- #newsletter — Newsletter signup
- #contact — Contact form + CTA cards

## Data Models (for Next.js migration)
- Vendors: name, contact, cuisine_type, booth_preference, status
- Leads: name, email, interest, source
- Applications: vendor_id, submitted_at, status
- CiderClub: email, tier (taster/enthusiast/connoisseur), submitted_at

## Content Notes
- Financial figures are from May 2026 Appendix F model (governing document)
- Year 1: $822K revenue / $60.1K EOY cash
- Year 2: $1.43M revenue / $384K EBITDA
- Year 3: $1.7M revenue / $570K EBITDA
- Total capital: $1,505,000
- SBA 7(a) pre-qualification in progress ($850K)
- Grand Opening target: Q1–Q2 2027
- Content warnings required on all tenant-vision gallery images
  (fictitious brands / pricing — not confirmed tenants)
