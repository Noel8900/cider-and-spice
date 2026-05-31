import { getStore } from "@netlify/blobs";

export type InventoryRow = {
  itemId: string;
  vendor: string;
  sku: string;
  name?: string;
  onHand: number;
  reserved: number;
  reorder: number;
  incoming: number;
  lastChannel: string;
  discrepancy: string | null;
};

export type OrderLine = {
  itemId: string;
  vendorId: string;
  name: string;
  price: number;
  qty: number;
  vendorName?: string;
  vendorColor?: string;
};

export type HallOrder = {
  id: number;
  lines: OrderLine[];
  vendorIds: string[];
  total: number;
  placed: number;
  meta: Record<string, unknown>;
  tracks: Array<{ vendorId: string; status: string }>;
};

export type HallState = {
  schemaVersion: number;
  nextOrderSeq: number;
  inventory: InventoryRow[];
  orders: HallOrder[];
  syncEvents: Array<{ id: number; time: string; channel: string; label: string; detail: string }>;
  loyaltyPrograms: Array<Record<string, unknown>>;
  promotions: Array<Record<string, unknown>>;
  giftCards: Array<Record<string, unknown>>;
  vendorPayouts: Array<Record<string, unknown>>;
  orderTimeline: Array<Record<string, unknown>>;
  channels: Array<Record<string, unknown>>;
  updatedAt: string;
};

const STORE_KEY = "state.json";

const inventorySeed: InventoryRow[] = [
  { itemId: "y1", vendor: "yazzie", sku: "YAZ-HKB", onHand: 42, reserved: 6, reorder: 18, incoming: 30, lastChannel: "app", discrepancy: null },
  { itemId: "y2", vendor: "yazzie", sku: "YAZ-CCD", onHand: 31, reserved: 4, reorder: 14, incoming: 20, lastChannel: "pos", discrepancy: null },
  { itemId: "y4", vendor: "yazzie", sku: "YAZ-SANDO", onHand: 13, reserved: 3, reorder: 16, incoming: 24, lastChannel: "kiosk", discrepancy: "Count variance: POS 13 vs shelf 15" },
  { itemId: "s1", vendor: "seoul", sku: "SEO-WINGS", onHand: 58, reserved: 9, reorder: 22, incoming: 40, lastChannel: "app", discrepancy: null },
  { itemId: "s2", vendor: "seoul", sku: "SEO-FIRE", onHand: 24, reserved: 4, reorder: 18, incoming: 24, lastChannel: "pos", discrepancy: null },
  { itemId: "k1", vendor: "sticky", sku: "STK-TRIO", onHand: 36, reserved: 5, reorder: 15, incoming: 24, lastChannel: "app", discrepancy: null },
  { itemId: "k5", vendor: "sticky", sku: "STK-JAM", onHand: 9, reserved: 2, reorder: 18, incoming: 48, lastChannel: "market", discrepancy: "Auto-flagged after online sale exceeded shelf count" },
  { itemId: "r1", vendor: "rio", sku: "RIO-XMAS", onHand: 47, reserved: 7, reorder: 20, incoming: 35, lastChannel: "pos", discrepancy: null },
  { itemId: "l1", vendor: "levant", sku: "LEV-SHAW", onHand: 28, reserved: 4, reorder: 14, incoming: 20, lastChannel: "app", discrepancy: null },
  { itemId: "c1", vendor: "cider", sku: "BAR-FLIGHT", onHand: 76, reserved: 12, reorder: 30, incoming: 60, lastChannel: "app", discrepancy: null },
  { itemId: "c3", vendor: "cider", sku: "BAR-PEAR", onHand: 18, reserved: 4, reorder: 24, incoming: 36, lastChannel: "pos", discrepancy: "Low keg reading reconciled with tap meter" },
];

const vendorPayoutSeed = [
  { vendor: "yazzie", sales: 2140, orders: 78, fees: 342.4, rent: 182, payout: 1615.6, stage: "Ready for remittance", domain: "yazzie.lchub-pos.netlify.app" },
  { vendor: "seoul", sales: 2385, orders: 84, fees: 381.6, rent: 205, payout: 1798.4, stage: "Payment clearing", domain: "seoulfire.lchub-pos.netlify.app" },
  { vendor: "sticky", sales: 1510, orders: 53, fees: 241.6, rent: 128, payout: 1140.4, stage: "Fulfillment audit", domain: "stickystack.lchub-pos.netlify.app" },
  { vendor: "rio", sales: 1325, orders: 47, fees: 212, rent: 113, payout: 1000, stage: "Ready for remittance", domain: "rio.lchub-pos.netlify.app" },
  { vendor: "levant", sales: 1180, orders: 39, fees: 188.8, rent: 101, payout: 890.2, stage: "Ready for remittance", domain: "levant.lchub-pos.netlify.app" },
];

export function createSeedState(): HallState {
  return {
    schemaVersion: 1,
    nextOrderSeq: 5000,
    inventory: inventorySeed,
    orders: [],
    syncEvents: [
      { id: 1, time: "12:21:04", channel: "app", label: "Online order reserved central stock", detail: "Hatch Katsu Bowl -2, synced to POS, kiosk, vendor panel" },
      { id: 2, time: "12:22:17", channel: "pos", label: "Counter sale adjusted stock", detail: "Sticky Stack Trio -1, online channel updated instantly" },
      { id: 3, time: "12:24:03", channel: "correction", label: "Discrepancy flag opened", detail: "Jam Jar count mismatch routed to operator review" },
    ],
    loyaltyPrograms: [
      { label: "Customer club rewards", value: "184 active", detail: "Points, tier perks, birthday rewards, and repeat-order bonuses are built in." },
      { label: "Gamification", value: "7 badges", detail: "Taste trails, vendor passport stamps, streaks, and event challenges." },
      { label: "Cashback wallet", value: "3-8%", detail: "Native cashback accrues to the guest wallet after eligible orders." },
      { label: "Discount engine", value: "12 rules", detail: "Configurable offers by vendor, time window, channel, tier, and cart contents." },
      { label: "Gift cards", value: "$18.4k open", detail: "Stored value works across the hall without third-party plugins." },
      { label: "Retention incentives", value: "28% lift", detail: "Win-back offers, milestone coupons, and VIP event access." },
    ],
    promotions: [
      { code: "HALLPASS20", name: "Opening Week Hall Pass", type: "20% off multi-vendor orders", status: "Live", redemptions: 96 },
      { code: "LUNCHSTREAK", name: "3-Day Lunch Streak", type: "$5 cashback after three weekday orders", status: "Live", redemptions: 42 },
      { code: "GIFTCARD10", name: "Gift Card Bonus", type: "$10 bonus on $75 gift card purchase", status: "Scheduled", redemptions: 18 },
    ],
    giftCards: [
      { id: "GC-2048", holder: "Dana P.", balance: 84.5, issued: 100, status: "Active" },
      { id: "GC-2091", holder: "Marcus R.", balance: 32.25, issued: 50, status: "Active" },
      { id: "GC-2112", holder: "Company Catering", balance: 420, issued: 500, status: "Bulk" },
    ],
    vendorPayouts: vendorPayoutSeed,
    orderTimeline: [
      { label: "Payment authorized", time: "12:21:03", detail: "Card token approved; gift card and cashback rules checked." },
      { label: "Inventory reserved", time: "12:21:04", detail: "Central stock decremented across POS, app, kiosk, and vendor panel." },
      { label: "Vendor accepted", time: "12:21:11", detail: "Kitchen queue acknowledged order and SLA timer started." },
      { label: "Fulfillment complete", time: "12:30:40", detail: "Pickup handoff closes payout eligibility and rent/fee accrual." },
    ],
    channels: [
      { id: "pos", name: "Counter POS", status: "Synced through API" },
      { id: "app", name: "Online Ordering", status: "API live" },
      { id: "kiosk", name: "Hall Kiosk", status: "Synced through API" },
      { id: "market", name: "Marketplace Domain", status: "Webhook live" },
    ],
    updatedAt: new Date().toISOString(),
  };
}

function store() {
  return getStore({ name: "hall-os", consistency: "strong" });
}

export async function getHallState(): Promise<HallState> {
  const state = await store().get(STORE_KEY, { type: "json" }) as HallState | null;
  if (state?.schemaVersion) return state;
  const seed = createSeedState();
  await saveHallState(seed);
  return seed;
}

export async function saveHallState(state: HallState): Promise<HallState> {
  state.updatedAt = new Date().toISOString();
  await store().setJSON(STORE_KEY, state);
  return state;
}

export function stockAvailable(row: InventoryRow) {
  return Math.max(0, Number(row.onHand || 0) - Number(row.reserved || 0));
}

export function appendSyncEvent(state: HallState, channel: string, label: string, detail: string) {
  state.syncEvents = [{
    id: Date.now(),
    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    channel,
    label,
    detail,
  }, ...state.syncEvents].slice(0, 24);
}

export function normalizeInventoryRow(raw: Record<string, unknown>, existing?: InventoryRow): InventoryRow | null {
  const itemId = String(raw.itemId || raw.id || existing?.itemId || raw.sku || "").trim();
  const sku = String(raw.sku || existing?.sku || itemId || "").trim();
  if (!itemId && !sku) return null;
  const numberOr = (value: unknown, fallback: number) => {
    const parsed = Number(String(value ?? "").replace(/[$,\s]/g, ""));
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  return {
    itemId: itemId || sku,
    vendor: String(raw.vendor || raw.vendorId || existing?.vendor || "unassigned").trim(),
    sku: sku || itemId,
    name: String(raw.name || existing?.name || "").trim(),
    onHand: numberOr(raw.onHand, existing?.onHand ?? 0),
    reserved: numberOr(raw.reserved, existing?.reserved ?? 0),
    reorder: numberOr(raw.reorder, existing?.reorder ?? 10),
    incoming: numberOr(raw.incoming, existing?.incoming ?? 0),
    lastChannel: "excel",
    discrepancy: null,
  };
}

export function recalculatePayouts(state: HallState) {
  const byVendor = new Map<string, { sales: number; orders: number }>();
  for (const p of vendorPayoutSeed) byVendor.set(String(p.vendor), { sales: Number(p.sales), orders: Number(p.orders) });
  for (const order of state.orders) {
    for (const line of order.lines) {
      const current = byVendor.get(line.vendorId) || { sales: 0, orders: 0 };
      current.sales += Number(line.price || 0) * Number(line.qty || 0);
      current.orders += 1;
      byVendor.set(line.vendorId, current);
    }
  }
  state.vendorPayouts = vendorPayoutSeed.map(seed => {
    const totals = byVendor.get(seed.vendor) || { sales: seed.sales, orders: seed.orders };
    const fees = Number((totals.sales * 0.16).toFixed(2));
    const rent = Number((totals.sales * 0.085).toFixed(2));
    return {
      ...seed,
      sales: Number(totals.sales.toFixed(2)),
      orders: totals.orders,
      fees,
      rent,
      payout: Number((totals.sales - fees - rent).toFixed(2)),
      stage: "Ready for remittance",
    };
  });
}
