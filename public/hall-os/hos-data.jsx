// hos-data.jsx — Hall OS data layer + global store
// Depends on: hos-tokens.jsx (HOS)

// ════════════════════════════════════════════════════════════════════════════
//  VENDORS + MENUS
// ════════════════════════════════════════════════════════════════════════════

const VENDORS = [
  {
    id: 'yazzie',
    name: 'Yazzie',
    cuisine: 'Japanese · NM Fusion',
    tagline: 'Katsu · Curry · Hatch Chile',
    color: '#c0622a',
    rating: 4.8,
    reviews: 312,
    prep: 8,
    stall: 'A1',
    blurb: 'Crispy panko katsu and rich Japanese curry, built fast on a Chipotle-style line and finished with roasted Hatch green chile.',
    menu: [
      { id: 'y1', name: 'Hatch Katsu Bowl',       price: 13.50, desc: 'Panko pork katsu, Japanese curry, rice, roasted Hatch chile, pickled cabbage', tags: ['Popular'], cat: 'Bowls' },
      { id: 'y2', name: 'Chicken Curry Don',       price: 12.00, desc: 'Crispy chicken, curry roux, soft egg, scallion, rice', tags: [], cat: 'Bowls' },
      { id: 'y3', name: 'Veggie Katsu Bowl',       price: 11.00, desc: 'Sweet potato & eggplant katsu, curry, rice, Hatch chile', tags: ['Vegetarian'], cat: 'Bowls' },
      { id: 'y4', name: 'Katsu Sando',             price: 9.50,  desc: 'Pork katsu, milk bread, tonkatsu sauce, slaw', tags: ['Popular'], cat: 'Handheld' },
      { id: 'y5', name: 'Miso Side Soup',          price: 3.50,  desc: 'White miso, tofu, wakame, scallion', tags: [], cat: 'Sides' },
      { id: 'y6', name: 'Karaage (5pc)',           price: 6.50,  desc: 'Japanese fried chicken, lemon, kewpie', tags: [], cat: 'Sides' },
    ],
  },
  {
    id: 'seoul',
    name: 'Seoul Fire Chicken',
    cuisine: 'Korean',
    tagline: 'Double-Fried · Heat Ladder',
    color: '#d9614b',
    rating: 4.9,
    reviews: 428,
    prep: 11,
    stall: 'A2',
    blurb: 'Korean double-fried chicken with a five-step heat ladder from Honey-Soy to the notorious Volcano. The natural cider pairing in the hall.',
    menu: [
      { id: 's1', name: 'Heat Ladder Wings (8)',   price: 12.50, desc: 'Double-fried wings, choose your heat: Honey-Soy → Gochu → Fire → Inferno → Volcano', tags: ['Popular'], cat: 'Chicken' },
      { id: 's2', name: 'Fire Chicken Sandwich',   price: 11.00, desc: 'Crispy thigh, gochujang mayo, pickled radish, brioche', tags: ['Popular'], cat: 'Chicken' },
      { id: 's3', name: 'Korean Fried Tenders',    price: 10.50, desc: 'Four tenders, choice of sauce, sesame', tags: [], cat: 'Chicken' },
      { id: 's4', name: 'Kimchi Loaded Fries',     price: 8.50,  desc: 'Fries, kimchi, gochu aioli, scallion, sesame', tags: ['Spicy'], cat: 'Sides' },
      { id: 's5', name: 'Pickled Radish Cup',      price: 2.50,  desc: 'Cooling danmuji — heat ladder companion', tags: [], cat: 'Sides' },
      { id: 's6', name: 'Steamed Rice',            price: 3.00,  desc: 'Short-grain white rice', tags: [], cat: 'Sides' },
    ],
  },
  {
    id: 'sticky',
    name: 'Sticky Stack Co.',
    cuisine: 'American · Artisan',
    tagline: 'Sliders · House NM Jam',
    color: '#d4a84b',
    rating: 4.7,
    reviews: 286,
    prep: 7,
    stall: 'A3',
    blurb: 'Artisan sliders stacked with house-made New Mexico jam. Grab a jar to take home — the retail crossover everyone talks about.',
    menu: [
      { id: 'k1', name: 'Sticky Stack Trio',       price: 12.00, desc: 'Three sliders: beef + bacon jam, fried chicken + Hatch jam, mushroom + onion jam', tags: ['Popular'], cat: 'Sliders' },
      { id: 'k2', name: 'Bacon Jam Smashburger',   price: 10.50, desc: 'Double smash patty, NM bacon jam, aged cheddar, brioche', tags: ['Popular'], cat: 'Sliders' },
      { id: 'k3', name: 'Fried Chicken Slider (2)',price: 9.00,  desc: 'Buttermilk chicken, Hatch pepper jam, slaw', tags: [], cat: 'Sliders' },
      { id: 'k4', name: 'Duck Fat Fries',          price: 6.00,  desc: 'Hand-cut, duck fat, rosemary salt', tags: [], cat: 'Sides' },
      { id: 'k5', name: 'NM Jam Jar — Retail',     price: 11.00, desc: 'Take home: Hatch pepper, bacon, or prickly pear', tags: ['Retail'], cat: 'Take Home' },
      { id: 'k6', name: 'Jam Flight Board',        price: 7.50,  desc: 'Three jams, house crackers, NM goat cheese', tags: [], cat: 'Sides' },
    ],
  },
  {
    id: 'rio',
    name: 'Río Grande Burritos',
    cuisine: 'NM Mexican',
    tagline: 'Hatch & Red · All Day',
    color: '#b5503a',
    rating: 4.6,
    reviews: 197,
    prep: 9,
    stall: 'B1',
    blurb: 'Stacked New Mexico burritos and Christmas-style smothered plates. Born for the NMSU lunch rush.',
    menu: [
      { id: 'r1', name: 'Christmas Breakfast Burrito', price: 9.50, desc: 'Egg, potato, cheese, red + green chile, choice of meat', tags: ['Popular'], cat: 'Burritos' },
      { id: 'r2', name: 'Carne Adovada Burrito',   price: 11.00, desc: 'Red chile braised pork, beans, rice, cheese', tags: ['Popular'], cat: 'Burritos' },
      { id: 'r3', name: 'Green Chile Chicken',      price: 10.50, desc: 'Pulled chicken, Hatch green, rice, beans', tags: [], cat: 'Burritos' },
      { id: 'r4', name: 'Frito Pie',                price: 8.00,  desc: 'Fritos, red chile, beans, cheese, onion', tags: [], cat: 'Plates' },
      { id: 'r5', name: 'Sopaipilla (2)',           price: 4.00,  desc: 'Honey, cinnamon sugar', tags: [], cat: 'Sides' },
    ],
  },
  {
    id: 'levant',
    name: 'Levant Table',
    cuisine: 'Lebanese',
    tagline: 'Shawarma · Mezze',
    color: '#6b8c6b',
    rating: 4.8,
    reviews: 154,
    prep: 10,
    stall: 'B2',
    blurb: 'Lebanese mezze and spit-roasted shawarma — the cuisine Las Cruces has been missing.',
    menu: [
      { id: 'l1', name: 'Chicken Shawarma Wrap',    price: 10.50, desc: 'Garlic toum, pickles, fries, saj bread', tags: ['Popular'], cat: 'Wraps' },
      { id: 'l2', name: 'Mezze Plate',              price: 12.50, desc: 'Hummus, baba ganoush, falafel, tabbouleh, pita', tags: ['Vegetarian'], cat: 'Plates' },
      { id: 'l3', name: 'Beef & Lamb Shawarma',     price: 13.00, desc: 'Tahini, sumac onion, rice or wrap', tags: [], cat: 'Plates' },
      { id: 'l4', name: 'Falafel (6)',              price: 7.00,  desc: 'Crispy chickpea, tahini, herbs', tags: ['Vegan'], cat: 'Sides' },
      { id: 'l5', name: 'Baklava',                  price: 4.50,  desc: 'Walnut, pistachio, orange blossom', tags: [], cat: 'Sides' },
    ],
  },
  {
    id: 'cider',
    name: 'The Cider Bar',
    cuisine: 'Craft Cider · NM Taps',
    tagline: '20+ NM Ciders on Tap',
    color: '#d4a84b',
    rating: 4.9,
    reviews: 502,
    prep: 3,
    stall: 'Bar',
    bar: true,
    blurb: 'Twenty-plus New Mexico craft ciders on rotating tap. Flights, pints, and bottles to pair with every stall in the hall.',
    menu: [
      { id: 'c1', name: 'Cider Flight (4)',         price: 12.00, desc: 'Four 4oz pours — your pick from the tap wall', tags: ['Popular'], cat: 'Flights' },
      { id: 'c2', name: 'Hatch Chile Cider',        price: 8.00,  desc: 'Dry cider, roasted Hatch, subtle heat — pairs with Seoul Fire', tags: ['NM Made'], cat: 'Pints' },
      { id: 'c3', name: 'Prickly Pear Rosé',        price: 8.50,  desc: 'Semi-dry, desert prickly pear, bright finish', tags: ['Popular'], cat: 'Pints' },
      { id: 'c4', name: 'Heirloom Dry',             price: 7.50,  desc: 'Estate apples, brut, crisp', tags: ['NM Made'], cat: 'Pints' },
      { id: 'c5', name: 'Pear Perry',               price: 8.00,  desc: 'Off-dry NM pears, floral', tags: [], cat: 'Pints' },
      { id: 'c6', name: 'Non-Alc Sparkling Apple',  price: 5.00,  desc: 'House pressed, zero proof', tags: ['Zero Proof'], cat: 'Zero Proof' },
    ],
  },
];

function vendorById(id) { return VENDORS.find(v => v.id === id); }
function itemById(id) {
  for (const v of VENDORS) { const it = v.menu.find(m => m.id === id); if (it) return { item: it, vendor: v }; }
  return null;
}

// ════════════════════════════════════════════════════════════════════════════
//  CONCIERGE — scripted pairing intelligence
// ════════════════════════════════════════════════════════════════════════════

const CONCIERGE_PROMPTS = [
  'What pairs well with spicy food?',
  "I'm feeding 4 people, mix of tastes",
  'Something vegetarian and a cider',
  'Quickest lunch under $12',
];

// ════════════════════════════════════════════════════════════════════════════
//  CIDER CLUB
// ════════════════════════════════════════════════════════════════════════════

const CLUB_TIERS = [
  { id: 'passport', name: 'Tasting Passport', price: 49,  glyph: '◇', accent: '#6b8c6b',
    perks: ['10% off all cider', 'Monthly members-only pour', 'Early event access', 'Birthday flight on us'] },
  { id: 'spice',    name: 'Spice Route',      price: 89,  glyph: '◈', accent: '#c0622a', popular: true,
    perks: ['15% off cider + food', 'Two monthly reserved pours', 'Skip-the-line pickup', 'Quarterly pairing dinner invite', 'Bring-a-guest passes (2/mo)'] },
  { id: 'ember',    name: 'Ember Society',    price: 149, glyph: '◆', accent: '#d4a84b',
    perks: ['20% off everything', 'Unlimited reserved pours', 'Private cellar releases', 'Founders pairing dinner (annual)', 'Reserved hall seating', 'Vendor collab tastings'] },
];

// ════════════════════════════════════════════════════════════════════════════
//  COMMUNITY / EVENTS
// ════════════════════════════════════════════════════════════════════════════

const EVENTS = [
  { id: 'e1', date: 'JUN 06', day: 'Fri', name: 'Hatch Harvest Pairing Dinner', host: 'The Cider Bar × Yazzie', time: '7:00 PM', tag: 'Pairing Dinner', spots: 12, price: 65, accent: '#c0622a' },
  { id: 'e2', date: 'JUN 12', day: 'Thu', name: 'Live Jazz on the Mezzanine',   host: 'Las Cruces Jazz Collective', time: '6:30 PM', tag: 'Live Music', spots: 60, price: 0, accent: '#6b88a8' },
  { id: 'e3', date: 'JUN 14', day: 'Sat', name: 'Heat Ladder Challenge',        host: 'Seoul Fire Chicken', time: '2:00 PM', tag: 'Competition', spots: 24, price: 15, accent: '#d9614b' },
  { id: 'e4', date: 'JUN 20', day: 'Fri', name: 'Maker Market + Jam Tasting',   host: 'Sticky Stack Co.', time: '5:00 PM', tag: 'Market', spots: 100, price: 0, accent: '#d4a84b' },
  { id: 'e5', date: 'JUN 27', day: 'Fri', name: 'Vendor Graduation Showcase',   host: 'Culinary Hub Incubator', time: '6:00 PM', tag: 'Incubator', spots: 80, price: 0, accent: '#8fb98f' },
];

// ════════════════════════════════════════════════════════════════════════════
//  OPERATOR KPIS  (the 9 from the Incubator Playbook)
// ════════════════════════════════════════════════════════════════════════════

const KPIS = [
  { id: 'occ',   label: 'Occupancy Rate',        value: 88,    unit: '%',   target: 80,  good: 'up',   cadence: 'Weekly',  spark: [82,84,83,85,86,88,88] },
  { id: 'sales', label: 'Sales / Stall / Day',   value: 1840,  unit: '$',   target: 1500,good: 'up',   cadence: 'Weekly',  spark: [1500,1620,1580,1710,1760,1800,1840] },
  { id: 'rts',   label: 'Rent-to-Sales',         value: 14.2,  unit: '%',   target: 18,  good: 'down', cadence: 'Monthly', spark: [17,16.5,16,15.4,15,14.6,14.2] },
  { id: 'margin',label: 'Avg Food-Cost',         value: 29.5,  unit: '%',   target: 32,  good: 'down', cadence: 'Monthly', spark: [33,32.4,31.8,31,30.5,30,29.5] },
  { id: 'rating',label: 'Guest Rating',          value: 4.8,   unit: '★',   target: 4.5, good: 'up',   cadence: 'Weekly',  spark: [4.5,4.6,4.6,4.7,4.7,4.8,4.8] },
  { id: 'comp',  label: 'Compliance Score',      value: 97,    unit: '%',   target: 95,  good: 'up',   cadence: 'Monthly', spark: [94,95,95,96,96,97,97] },
  { id: 'grad',  label: 'Graduation Readiness',  value: 3,     unit: ' vendors', target: 2, good: 'up', cadence: 'Quarterly', spark: [1,1,2,2,2,3,3] },
  { id: 'event', label: 'Event Uplift',          value: 42,    unit: '%',   target: 30,  good: 'up',   cadence: 'Per Event', spark: [28,31,35,33,38,40,42] },
  { id: 'noi',   label: 'NOI / DSCR',            value: 1.42,  unit: '×',   target: 1.25,good: 'up',   cadence: 'Monthly', spark: [1.2,1.25,1.28,1.32,1.36,1.4,1.42] },
];

// Live order queue seed (vendor + operator views)
const SEED_ORDERS = [
  { id: 1042, vendor: 'yazzie', items: ['Hatch Katsu Bowl', 'Katsu Sando'], total: 23.00, status: 'cooking', mins: 4,  customer: 'Marcus R.', channel: 'app' },
  { id: 1043, vendor: 'seoul',  items: ['Heat Ladder Wings (8)', 'Kimchi Loaded Fries'], total: 21.00, status: 'queued', mins: 0, customer: 'Dana P.', channel: 'app' },
  { id: 1044, vendor: 'sticky', items: ['Sticky Stack Trio'], total: 12.00, status: 'ready', mins: 0, customer: 'Walk-in', channel: 'pos' },
  { id: 1045, vendor: 'yazzie', items: ['Chicken Curry Don'], total: 12.00, status: 'queued', mins: 0, customer: 'Priya N.', channel: 'app' },
  { id: 1046, vendor: 'seoul',  items: ['Fire Chicken Sandwich', 'Steamed Rice'], total: 14.00, status: 'cooking', mins: 6, customer: 'Walk-in', channel: 'pos' },
];

// Hall floor stalls for operator map
const STALLS = [
  { id: 'A1', vendor: 'yazzie', state: 'busy' },
  { id: 'A2', vendor: 'seoul',  state: 'busy' },
  { id: 'A3', vendor: 'sticky', state: 'open' },
  { id: 'B1', vendor: 'rio',    state: 'open' },
  { id: 'B2', vendor: 'levant', state: 'open' },
  { id: 'B3', vendor: null,     state: 'incubator' },
  { id: 'B4', vendor: null,     state: 'vacant' },
  { id: 'Bar',vendor: 'cider',  state: 'busy' },
];

// ════════════════════════════════════════════════════════════════════════════
//  GLOBAL STORE  (tiny observable; shared across all babel modules via window)
// ════════════════════════════════════════════════════════════════════════════

function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    set(patch) {
      const next = typeof patch === 'function' ? patch(state) : patch;
      state = Object.assign({}, state, next);
      listeners.forEach(l => l());
    },
    subscribe(l) { listeners.add(l); return () => listeners.delete(l); },
  };
}

const hallStore = createStore({
  persona: 'customer',          // customer | vendor | operator | pos
  screen: 'browse',             // customer screens
  activeVendor: null,
  cart: [],                     // { lineId, vendorId, itemId, name, price, qty, vendorName, vendorColor }
  orders: [],                   // placed customer orders
  member: null,                 // active Cider Club tier id
  vendorScope: 'yazzie',        // which stall the vendor dashboard shows
  toast: null,
});

// Re-render hook: subscribes a component to ALL store changes (fine for a prototype)
function useHall() {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => hallStore.subscribe(force), []);
  return hallStore.get();
}

// ── Cart + nav actions ────────────────────────────────────────────────────────

let _lineSeq = 1;
let _orderSeq = 5000;
let _toastTimer = null;

const actions = {
  go(screen, vendorId) {
    hallStore.set({ screen, activeVendor: vendorId !== undefined ? vendorId : hallStore.get().activeVendor });
    const el = document.getElementById('hos-phone-scroll'); if (el) el.scrollTop = 0;
  },
  setPersona(persona) {
    const screen = persona === 'customer' ? 'browse' : persona;
    hallStore.set({ persona, screen });
  },
  toast(msg) {
    hallStore.set({ toast: msg });
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => hallStore.set({ toast: null }), 1900);
  },
  addToCart(vendor, item, qty) {
    const q = qty || 1;
    const cart = hallStore.get().cart.slice();
    const existing = cart.find(l => l.itemId === item.id);
    if (existing) { existing.qty += q; }
    else {
      cart.push({ lineId: _lineSeq++, vendorId: vendor.id, itemId: item.id, name: item.name, price: item.price, qty: q, vendorName: vendor.name, vendorColor: vendor.color });
    }
    hallStore.set({ cart });
    actions.toast(`${item.name} added`);
  },
  setQty(lineId, qty) {
    let cart = hallStore.get().cart.slice();
    if (qty <= 0) cart = cart.filter(l => l.lineId !== lineId);
    else cart = cart.map(l => l.lineId === lineId ? Object.assign({}, l, { qty }) : l);
    hallStore.set({ cart });
  },
  clearCart() { hallStore.set({ cart: [] }); },
  placeOrder(meta) {
    const cart = hallStore.get().cart;
    if (!cart.length) return null;
    const vendorIds = [...new Set(cart.map(l => l.vendorId))];
    const order = {
      id: ++_orderSeq,
      lines: cart,
      vendorIds,
      total: cartTotals(cart, hallStore.get().member).total,
      placed: Date.now(),
      meta: meta || {},
      tracks: vendorIds.map(vid => ({ vendorId: vid, status: 'received' })),
    };
    hallStore.set({ orders: [order, ...hallStore.get().orders], cart: [], screen: 'tracking', activeOrder: order.id });
    return order;
  },
  join(tierId) { hallStore.set({ member: tierId }); actions.toast('Welcome to the Cider Club'); },
  leave() { hallStore.set({ member: null }); },
};

// ── Pricing ─────────────────────────────────────────────────────────────────

function memberDiscount(memberId) {
  if (memberId === 'passport') return 0.10;
  if (memberId === 'spice')    return 0.15;
  if (memberId === 'ember')    return 0.20;
  return 0;
}
function cartTotals(cart, memberId) {
  const sub = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const disc = sub * memberDiscount(memberId);
  const afterDisc = sub - disc;
  const tax = afterDisc * 0.08125;   // Las Cruces GRT ~8.125%
  const total = afterDisc + tax;
  const count = cart.reduce((s, l) => s + l.qty, 0);
  return { sub, disc, tax, total, count };
}

Object.assign(window, {
  VENDORS, vendorById, itemById, CONCIERGE_PROMPTS, CLUB_TIERS, EVENTS, KPIS,
  SEED_ORDERS, STALLS, hallStore, useHall, actions, cartTotals, memberDiscount,
});
