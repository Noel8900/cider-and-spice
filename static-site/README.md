# Hall OS — Design Prototype

**Cider & Spice Food Hall · Las Cruces, NM**

This repository contains the Hall OS design prototype — a fully interactive, browser-based prototype built in HTML/JSX. All files are **design references**, not production code. They are meant to be opened directly in a browser (no build step required) and used as a visual + behavioral spec for implementation.

---

## How to run locally

1. Clone the repo
2. Serve from a local HTTP server (required for JSX script imports):
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
3. Open `Hall OS Index.html` as the entry point

> **Do not open HTML files directly via `file://`** — cross-origin JSX imports won't load.

---

## Entry point

| File | Purpose |
|------|---------|
| `Hall OS Index.html` | **Main entry** — module grid, links to all surfaces |
| `Hall OS.html` | Marketing/landing page for Hall OS |

---

## Surface pages

Each page is a standalone interactive prototype of one operational surface:

| File | Surface | Persona |
|------|---------|---------|
| `Hall OS Vendor Dashboard.html` | Vendor desktop console | Vendor |
| `Hall OS Vendor Mobile.html` | Vendor mobile app | Vendor |
| `Hall OS Kiosk.html` | Customer ordering kiosk | Customer |
| `Hall OS Status Board.html` | Wall-mounted order status display | Shared |
| `Hall OS Admin.html` | Landlord admin console | Landlord |
| `Hall OS Analytics.html` | Deep-dive analytics | Landlord |
| `Hall OS Finance.html` | Finance portal — P&L + rent roll | Vendor + Landlord |
| `Hall OS Loyalty.html` | Loyalty, tab, and member management | Customer |
| `Hall OS Onboarding.html` | Vendor onboarding wizard | Vendor |

---

## Shared component files

All JSX files are loaded via `<script type="text/babel">` — Babel transpiles them in-browser. No build step needed.

| File | Contents |
|------|---------|
| `hos-tokens.jsx` | Design tokens (`HOS`, `HF` objects) — colors, fonts, spacing |
| `hos-data.jsx` | Shared state store (`hallStore`), actions, seed data |
| `hos-shell.jsx` | `useHall()` hook, shared layout primitives |
| `hos-nav.js` | Page transition engine — fade in/out between all pages |
| `tweaks-panel.jsx` | In-prototype Tweaks panel (color/surface picker) |
| `hos-customer.jsx` | Customer App component (`CustomerApp`) |
| `hos-concierge.jsx` | AI Concierge component |
| `hos-checkout.jsx` | Checkout flow |
| `hos-tracking.jsx` | Order tracking |
| `hos-loyalty.jsx` | Loyalty UI |
| `hos-vendor.jsx` | Vendor Desktop Dashboard (`VendorDashboard`) |
| `vendor-sections.jsx` | Vendor dashboard sub-sections |
| `hos-coach.jsx` | AI Stall Coach component (`StallCoach`) |
| `hos-operator.jsx` | Operator / Hall Console (`OperatorConsole`) |
| `hos-analyst.jsx` | Hall Analyst AI briefing |
| `hos-pos.jsx` | Counter POS terminal (`POSTerminal`) |
| `hos-walkthrough.jsx` | Module grid + walkthrough portal shell |
| `hos-app.jsx` | App root / entry mount |
| `hos-flow.jsx` | Flow orchestration |
| `hos-community.jsx` | Community features |
| `hos-claude.jsx` | Claude AI integration layer |
| `hos-intro.jsx` | Intro / splash screen |

---

## Design tokens

Defined in `hos-tokens.jsx` as the `HOS` and `HF` global objects:

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `HOS.bg` | `#1e1710` | Page background |
| `HOS.panel` | `#251d12` | Card / panel surface |
| `HOS.ter` | `#c4622d` | Primary / terracotta accent |
| `HOS.gold` | `#d4a84b` | Secondary gold accent |
| `HOS.green` | `#4b9b6e` | Success / live indicator |
| `HOS.parch` | `#f7f3ec` | Primary text (parchment) |
| `HOS.wheat` | `#e8c18d` | Secondary text |
| `HOS.bord` | `rgba(245,236,215,0.10)` | Default border |
| `HOS.bordS` | `rgba(245,236,215,0.06)` | Subtle border |

### Fonts
| Token | Family | Usage |
|-------|--------|-------|
| `HF.d` | Cormorant Garamond | Display / headings |
| `HF.b` | Inter | Body text |
| `HF.l` | Josefin Sans | Labels / caps |
| `HF.m` | Inter 500 | Mono / data |

---

## Page transitions

`hos-nav.js` is injected into every HTML page's `<head>`. It:
- Pins `html { background: #1C1209 }` immediately to prevent white flash
- Fades body in on load (`opacity: 0 → 1`, 300ms)
- Intercepts same-origin link clicks → fades out → navigates (seamless transitions)

---

## State architecture

`hos-data.jsx` exports a lightweight shared store (`hallStore`) using a pub/sub pattern. All surfaces subscribe via `useHall()` from `hos-shell.jsx`. State changes (orders, inventory, persona) propagate across components in real time within a single page session.

---

## Terminology

- **License agreement** — vendors sign license agreements (not leases)
- **License renewal / pipeline** — used in Admin console for contract management
- **Shared store** — the single backend all surfaces read/write to
- **Surfaces** — the four interactive operator views (Customer, Vendor, POS, Operator)

---

## File naming convention

All HTML surface files follow `Hall OS [Surface Name].html`. All shared React/JSX component files follow `hos-[module].jsx`.

---

*Built as a design prototype — open in a browser via local server. Not for direct production deployment.*
