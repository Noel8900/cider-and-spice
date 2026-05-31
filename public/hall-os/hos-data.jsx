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

const CHANNELS = [
  { id: 'pos', name: 'Counter POS', status: 'Synced 4s ago' },
  { id: 'app', name: 'Online Ordering', status: 'API live' },
  { id: 'kiosk', name: 'Hall Kiosk', status: 'Synced 7s ago' },
  { id: 'market', name: 'Marketplace Domain', status: 'Webhook live' },
];

const INVENTORY_SEED = [
  { itemId: 'y1', vendor: 'yazzie', sku: 'YAZ-HKB', onHand: 42, reserved: 6, reorder: 18, incoming: 30, lastChannel: 'app', discrepancy: null },
  { itemId: 'y2', vendor: 'yazzie', sku: 'YAZ-CCD', onHand: 31, reserved: 4, reorder: 14, incoming: 20, lastChannel: 'pos', discrepancy: null },
  { itemId: 'y4', vendor: 'yazzie', sku: 'YAZ-SANDO', onHand: 13, reserved: 3, reorder: 16, incoming: 24, lastChannel: 'kiosk', discrepancy: 'Count variance: POS 13 vs shelf 15' },
  { itemId: 's1', vendor: 'seoul', sku: 'SEO-WINGS', onHand: 58, reserved: 9, reorder: 22, incoming: 40, lastChannel: 'app', discrepancy: null },
  { itemId: 's2', vendor: 'seoul', sku: 'SEO-FIRE', onHand: 24, reserved: 4, reorder: 18, incoming: 24, lastChannel: 'pos', discrepancy: null },
  { itemId: 'k1', vendor: 'sticky', sku: 'STK-TRIO', onHand: 36, reserved: 5, reorder: 15, incoming: 24, lastChannel: 'app', discrepancy: null },
  { itemId: 'k5', vendor: 'sticky', sku: 'STK-JAM', onHand: 9, reserved: 2, reorder: 18, incoming: 48, lastChannel: 'market', discrepancy: 'Auto-flagged after online sale exceeded shelf count' },
  { itemId: 'r1', vendor: 'rio', sku: 'RIO-XMAS', onHand: 47, reserved: 7, reorder: 20, incoming: 35, lastChannel: 'pos', discrepancy: null },
  { itemId: 'l1', vendor: 'levant', sku: 'LEV-SHAW', onHand: 28, reserved: 4, reorder: 14, incoming: 20, lastChannel: 'app', discrepancy: null },
  { itemId: 'c1', vendor: 'cider', sku: 'BAR-FLIGHT', onHand: 76, reserved: 12, reorder: 30, incoming: 60, lastChannel: 'app', discrepancy: null },
  { itemId: 'c3', vendor: 'cider', sku: 'BAR-PEAR', onHand: 18, reserved: 4, reorder: 24, incoming: 36, lastChannel: 'pos', discrepancy: 'Low keg reading reconciled with tap meter' },
];

const LOYALTY_PROGRAMS = [
  { label: 'Customer club rewards', value: '184 active', detail: 'Points, tier perks, birthday rewards, and repeat-order bonuses are built in.' },
  { label: 'Gamification', value: '7 badges', detail: 'Taste trails, vendor passport stamps, streaks, and event challenges.' },
  { label: 'Cashback wallet', value: '3-8%', detail: 'Native cashback accrues to the guest wallet after eligible orders.' },
  { label: 'Discount engine', value: '12 rules', detail: 'Configurable offers by vendor, time window, channel, tier, and cart contents.' },
  { label: 'Gift cards', value: '$18.4k open', detail: 'Stored value works across the hall without third-party plugins.' },
  { label: 'Retention incentives', value: '28% lift', detail: 'Win-back offers, milestone coupons, and VIP event access.' },
];

const PROMOTIONS = [
  { code: 'HALLPASS20', name: 'Opening Week Hall Pass', type: '20% off multi-vendor orders', status: 'Live', redemptions: 96 },
  { code: 'LUNCHSTREAK', name: '3-Day Lunch Streak', type: '$5 cashback after three weekday orders', status: 'Live', redemptions: 42 },
  { code: 'GIFTCARD10', name: 'Gift Card Bonus', type: '$10 bonus on $75 gift card purchase', status: 'Scheduled', redemptions: 18 },
];

const GIFT_CARDS = [
  { id: 'GC-2048', holder: 'Dana P.', balance: 84.50, issued: 100, status: 'Active' },
  { id: 'GC-2091', holder: 'Marcus R.', balance: 32.25, issued: 50, status: 'Active' },
  { id: 'GC-2112', holder: 'Company Catering', balance: 420.00, issued: 500, status: 'Bulk' },
];

const VENDOR_PAYOUTS = [
  { vendor: 'yazzie', sales: 2140, orders: 78, fees: 342.40, rent: 182.00, payout: 1615.60, stage: 'Ready for remittance', domain: 'yazzie.lchub-pos.netlify.app' },
  { vendor: 'seoul', sales: 2385, orders: 84, fees: 381.60, rent: 205.00, payout: 1798.40, stage: 'Payment clearing', domain: 'seoulfire.lchub-pos.netlify.app' },
  { vendor: 'sticky', sales: 1510, orders: 53, fees: 241.60, rent: 128.00, payout: 1140.40, stage: 'Fulfillment audit', domain: 'stickystack.lchub-pos.netlify.app' },
  { vendor: 'rio', sales: 1325, orders: 47, fees: 212.00, rent: 113.00, payout: 1000.00, stage: 'Ready for remittance', domain: 'rio.lchub-pos.netlify.app' },
  { vendor: 'levant', sales: 1180, orders: 39, fees: 188.80, rent: 101.00, payout: 890.20, stage: 'Ready for remittance', domain: 'levant.lchub-pos.netlify.app' },
];

const ORDER_TIMELINE = [
  { label: 'Payment authorized', time: '12:21:03', detail: 'Card token approved; gift card and cashback rules checked.' },
  { label: 'Inventory reserved', time: '12:21:04', detail: 'Central stock decremented across POS, app, kiosk, and vendor panel.' },
  { label: 'Vendor accepted', time: '12:21:11', detail: 'Kitchen queue acknowledged order and SLA timer started.' },
  { label: 'Fulfillment complete', time: '12:30:40', detail: 'Pickup handoff closes payout eligibility and rent/fee accrual.' },
];

const SYNC_EVENTS = [
  { id: 1, time: '12:21:04', channel: 'app', label: 'Online order reserved central stock', detail: 'Hatch Katsu Bowl -2, synced to POS, kiosk, vendor panel' },
  { id: 2, time: '12:22:17', channel: 'pos', label: 'Counter sale adjusted stock', detail: 'Sticky Stack Trio -1, online channel updated instantly' },
  { id: 3, time: '12:24:03', channel: 'correction', label: 'Discrepancy flag opened', detail: 'Jam Jar count mismatch routed to operator review' },
];

function inventoryForVendor(vendorId) {
  return hallStore.get().inventory.filter(row => row.vendor === vendorId);
}
function inventoryItemName(row) {
  const found = itemById(row.itemId);
  return found ? found.item.name : (row.name || row.sku);
}
function stockAvailable(row) {
  return Math.max(0, row.onHand - row.reserved);
}
function inventorySummary(rows) {
  const list = rows || hallStore.get().inventory;
  return {
    total: list.reduce((sum, r) => sum + r.onHand, 0),
    low: list.filter(r => stockAvailable(r) <= r.reorder).length,
    flagged: list.filter(r => r.discrepancy).length,
    reserved: list.reduce((sum, r) => sum + r.reserved, 0),
  };
}
function syncStamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
function readImportField(row, names) {
  for (const name of names) {
    const found = Object.keys(row).find(k => k.trim().toLowerCase() === name);
    if (found !== undefined && row[found] !== undefined && row[found] !== '') return row[found];
  }
  return undefined;
}
function numField(value, fallback) {
  const n = Number(String(value === undefined ? '' : value).replace(/[$,\s]/g, ''));
  return Number.isFinite(n) ? n : fallback;
}
function parseDelimitedInventory(text, delimiter) {
  const rows = text.trim().split(/\r?\n/).filter(Boolean).map(line => line.split(delimiter).map(v => v.trim()));
  const headers = rows.shift() || [];
  return rows.map(cols => Object.fromEntries(headers.map((h, i) => [h, cols[i] || ''])));
}
function normalizeInventoryRows(rows) {
  return rows.map(raw => {
    const sku = String(readImportField(raw, ['sku', 'item sku', 'product sku']) || '').trim();
    const itemId = String(readImportField(raw, ['itemid', 'item id', 'id', 'product id']) || '').trim();
    const existing = hallStore.get().inventory.find(r => (sku && r.sku === sku) || (itemId && r.itemId === itemId));
    const vendor = String(readImportField(raw, ['vendor', 'vendorid', 'vendor id', 'stall']) || (existing && existing.vendor) || '').trim();
    if (!sku && !itemId) return null;
    return {
      itemId: itemId || (existing && existing.itemId) || sku,
      vendor: vendor || (existing && existing.vendor) || 'unassigned',
      sku: sku || (existing && existing.sku) || itemId,
      name: String(readImportField(raw, ['name', 'item', 'product', 'product name']) || (existing && existing.name) || '').trim(),
      onHand: numField(readImportField(raw, ['onhand', 'on hand', 'stock', 'quantity', 'qty']), existing ? existing.onHand : 0),
      reserved: numField(readImportField(raw, ['reserved', 'committed']), existing ? existing.reserved : 0),
      reorder: numField(readImportField(raw, ['reorder', 'reorder point', 'par']), existing ? existing.reorder : 10),
      incoming: numField(readImportField(raw, ['incoming', 'restock', 'inbound']), existing ? existing.incoming : 0),
      lastChannel: 'excel',
      discrepancy: null,
    };
  }).filter(Boolean);
}
function mergeInventoryRows(imported) {
  const byKey = new Map(hallStore.get().inventory.map(row => [row.sku || row.itemId, row]));
  imported.forEach(row => byKey.set(row.sku || row.itemId, Object.assign({}, byKey.get(row.sku || row.itemId), row)));
  return Array.from(byKey.values());
}

const CENTRAL_DB_KEY = 'hall-os-central-inventory-v2';
const CENTRAL_SYNC_KEY = 'hall-os-sync-events-v2';
function readCentralJson(key, fallback) {
  try {
    const raw = window.localStorage && window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}
function persistCentralState(state) {
  try {
    if (!window.localStorage) return;
    window.localStorage.setItem(CENTRAL_DB_KEY, JSON.stringify(state.inventory));
    window.localStorage.setItem(CENTRAL_SYNC_KEY, JSON.stringify(state.syncEvents));
  } catch (_) {}
}

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
      persistCentralState(state);
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
  inventory: readCentralJson(CENTRAL_DB_KEY, INVENTORY_SEED),
  syncEvents: readCentralJson(CENTRAL_SYNC_KEY, SYNC_EVENTS),
  toast: null,
});

// Re-render hook: subscribes a component to ALL store changes (fine for a prototype)
function useHall() {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => hallStore.subscribe(force), []);
  return hallStore.get();
}

function logSyncEvent(channel, label, detail) {
  hallStore.set({
    syncEvents: [{
      id: Date.now(),
      time: syncStamp(),
      channel,
      label,
      detail,
    }, ...hallStore.get().syncEvents].slice(0, 12),
  });
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
    const row = hallStore.get().inventory.find(r => r.itemId === item.id);
    const inCart = cart.filter(l => l.itemId === item.id).reduce((sum, l) => sum + l.qty, 0);
      if (row && inCart + q > stockAvailable(row)) {
        actions.toast('Central inventory prevented oversell');
        logSyncEvent('correction', 'Oversell blocked', `${item.name} request exceeded ${stockAvailable(row)} sellable units`);
        return;
      }
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
    const inventory = hallStore.get().inventory.map(row => {
      const sold = cart.filter(line => line.itemId === row.itemId).reduce((sum, line) => sum + line.qty, 0);
      if (!sold) return row;
      const nextOnHand = Math.max(0, row.onHand - sold);
      const oversold = row.onHand - sold < 0;
      return Object.assign({}, row, {
        onHand: nextOnHand,
        reserved: Math.max(0, row.reserved - sold),
        lastChannel: (meta && meta.channel) || 'app',
        discrepancy: oversold ? 'Oversell prevented: order quantity exceeded central stock' : row.discrepancy,
      });
    });
    hallStore.set({ orders: [order, ...hallStore.get().orders], inventory, cart: [], screen: 'tracking', activeOrder: order.id });
    logSyncEvent((meta && meta.channel) || 'app', 'Sale adjusted central stock', `${cart.reduce((sum, line) => sum + line.qty, 0)} units synced across POS, online, kiosk, and vendor panels`);
    return order;
  },
  restock(itemId, qty) {
    const amount = qty || 12;
    hallStore.set({ inventory: hallStore.get().inventory.map(row => row.itemId === itemId ? Object.assign({}, row, {
      onHand: row.onHand + amount,
      incoming: Math.max(0, row.incoming - amount),
      discrepancy: null,
      lastChannel: 'restock',
    }) : row) });
    logSyncEvent('restock', 'Restock validated', `${amount} units added to ${itemId} and published to every channel`);
    actions.toast('Restock validated and synced');
  },
  resolveDiscrepancy(itemId) {
    hallStore.set({ inventory: hallStore.get().inventory.map(row => row.itemId === itemId ? Object.assign({}, row, {
      discrepancy: null,
      onHand: Math.max(row.onHand, row.reserved + row.reorder),
      lastChannel: 'correction',
    }) : row) });
    logSyncEvent('correction', 'Inventory discrepancy resolved', `${itemId} reconciled and audit flag cleared`);
    actions.toast('Inventory discrepancy resolved');
  },
  importInventoryDemo() {
    hallStore.set({ inventory: hallStore.get().inventory.map((row, i) => i < 4 ? Object.assign({}, row, {
      onHand: row.onHand + 18,
      incoming: Math.max(0, row.incoming - 18),
      discrepancy: null,
      lastChannel: 'excel',
    }) : row) });
    logSyncEvent('excel', 'Demo Excel inventory import applied', 'First four rows updated from sample workbook flow');
    actions.toast('Excel inventory import applied');
  },
  triggerInventoryImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv,.tsv';
    input.onchange = () => {
      const file = input.files && input.files[0];
      if (file) actions.importInventoryFile(file);
    };
    input.click();
  },
  importInventoryFile(file) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const reader = new FileReader();
    reader.onerror = () => actions.toast('Inventory import failed');
    reader.onload = () => {
      try {
        let rawRows = [];
        if ((ext === 'xlsx' || ext === 'xls') && window.XLSX) {
          const workbook = XLSX.read(new Uint8Array(reader.result), { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          rawRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        } else {
          const text = String(reader.result || '');
          rawRows = parseDelimitedInventory(text, ext === 'tsv' ? '\t' : ',');
        }
        const imported = normalizeInventoryRows(rawRows);
        if (!imported.length) {
          actions.toast('No inventory rows found');
          return;
        }
        hallStore.set({ inventory: mergeInventoryRows(imported) });
        logSyncEvent('excel', 'Inventory file imported', `${imported.length} rows from ${file.name} updated central stock`);
        actions.toast(`${imported.length} inventory rows imported`);
      } catch (err) {
        actions.toast('Inventory import failed');
        logSyncEvent('correction', 'Inventory import error', err.message || 'Could not parse workbook');
      }
    };
    if (ext === 'xlsx' || ext === 'xls') reader.readAsArrayBuffer(file);
    else reader.readAsText(file);
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
  SEED_ORDERS, STALLS, CHANNELS, INVENTORY_SEED, SYNC_EVENTS, LOYALTY_PROGRAMS, PROMOTIONS, GIFT_CARDS,
  VENDOR_PAYOUTS, ORDER_TIMELINE, hallStore, useHall, actions, cartTotals, memberDiscount,
  inventoryForVendor, inventoryItemName, stockAvailable, inventorySummary, logSyncEvent,
});
