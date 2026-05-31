// hos-vendor.jsx — Vendor stall operator dashboard (desktop)
// Depends on: hos-tokens, hos-data

function Sparkline({ data, color, w, h }) {
  const width = w || 90, height = h || 28;
  const min = Math.min(...data), max = Math.max(...data);
  const rng = max - min || 1;
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * width},${height - ((d - min) / rng) * (height - 4) - 2}`).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={width} cy={height - ((data[data.length-1] - min) / rng) * (height - 4) - 2} r="2.4" fill={color} />
    </svg>
  );
}

function DeskCard({ children, style }) {
  return <div style={{ background: HOS.panel, border: `1px solid ${HOS.bord}`, borderRadius: 14, ...(style || {}) }}>{children}</div>;
}

const VENDOR_QUEUE_SEED = [
  { id: 2071, items: [{ n: 'Hatch Katsu Bowl', q: 2 }, { n: 'Miso Side Soup', q: 1 }], total: 30.50, status: 'cooking', customer: 'Marcus R.', channel: 'app', ago: 4 },
  { id: 2072, items: [{ n: 'Katsu Sando', q: 1 }], total: 9.50, status: 'queued', customer: 'Priya N.', channel: 'app', ago: 1 },
  { id: 2073, items: [{ n: 'Chicken Curry Don', q: 1 }, { n: 'Karaage (5pc)', q: 1 }], total: 18.50, status: 'queued', customer: 'Walk-in', channel: 'pos', ago: 0 },
  { id: 2074, items: [{ n: 'Veggie Katsu Bowl', q: 1 }], total: 11.00, status: 'ready', customer: 'Dana P.', channel: 'app', ago: 8 },
];

const NEXT_STATUS = { queued: 'cooking', cooking: 'ready', ready: 'collected' };
const STATUS_LABEL = { queued: 'Start cooking', cooking: 'Mark ready', ready: 'Hand off', collected: 'Done' };

function VendorDashboard() {
  const s = useHall();
  const vendor = vendorById(s.vendorScope) || VENDORS[0];
  const [queue, setQueue] = React.useState(VENDOR_QUEUE_SEED);
  const [avail, setAvail] = React.useState(() => Object.fromEntries(vendor.menu.map(m => [m.id, true])));

  React.useEffect(() => { setAvail(Object.fromEntries(vendor.menu.map(m => [m.id, true]))); setQueue(VENDOR_QUEUE_SEED); }, [s.vendorScope]);

  const liveQueue = vendorOrdersFromBackend(vendor.id);
  const shownQueue = liveQueue.length ? liveQueue : queue;
  const bump = (order) => {
    const next = NEXT_STATUS[order.status] || order.status;
    if (order.backend) actions.updateOrderStatus(order.id, vendor.id, next);
    else setQueue(q => q.map(o => o.id === order.id ? { ...o, status: next } : o).filter(o => o.status !== 'collected'));
  };
  const active = shownQueue.filter(o => o.status !== 'collected');
  const cooking = active.filter(o => o.status === 'cooking').length;
  const waiting = active.filter(o => o.status === 'queued').length;

  const payout = (s.vendorPayouts || VENDOR_PAYOUTS).find(p => p.vendor === vendor.id);
  const avgTicket = payout && payout.orders ? payout.sales / payout.orders : 13.4;
  const stats = [
    { label: 'Sales Today', value: payout ? money0(payout.sales) : '$2,140', spark: [1500,1700,1650,1820,1900,2050,payout ? payout.sales : 2140], color: HOS.gold },
    { label: 'Orders', value: payout ? String(payout.orders) : '78', spark: [52,58,61,66,70,74,payout ? payout.orders : 78], color: HOS.ter },
    { label: 'Avg Ticket', value: money(avgTicket), spark: [12.1,12.5,12.8,13,13.1,13.3,avgTicket], color: HOS.greenLt },
    { label: 'Rating', value: vendor.rating.toFixed(1), spark: [4.5,4.6,4.6,4.7,4.7,4.8,vendor.rating], color: HOS.gold },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '22px 28px 60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: `linear-gradient(135deg, ${vendor.color}, ${vendor.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HF.d, fontSize: 24, color: '#fff' }}>{vendor.name[0]}</div>
          <div>
            <div style={{ fontFamily: HF.d, fontSize: 26, color: HOS.parch, lineHeight: 1 }}>{vendor.name}</div>
            <div style={{ fontFamily: HF.l, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 3 }}>Stall {vendor.stall} · {vendor.cuisine}</div>
          </div>
        </div>
        {/* Stall switcher */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.4, marginRight: 4 }}>View stall</span>
          {VENDORS.filter(v => !v.bar).map(v => (
            <button key={v.id} onClick={() => hallStore.set({ vendorScope: v.id })} style={{ width: 32, height: 32, borderRadius: 9, background: s.vendorScope === v.id ? v.color : HOS.surf, border: `1px solid ${s.vendorScope === v.id ? v.color : HOS.bord}`, color: s.vendorScope === v.id ? '#fff' : HOS.wheat, fontFamily: HF.b, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{v.stall}</button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
        {stats.map(st => (
          <DeskCard key={st.label} style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45 }}>{st.label}</div>
                <div style={{ fontFamily: HF.d, fontSize: 30, fontWeight: 500, color: HOS.parch, marginTop: 4, lineHeight: 1 }}>{st.value}</div>
              </div>
              <Sparkline data={st.spark} color={st.color} />
            </div>
          </DeskCard>
        ))}
      </div>

      {/* AI stall coach */}
      <StallCoach key={vendor.id} vendor={vendor} queue={active} stats={stats} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 16, marginBottom: 16 }}>
        <VendorInventoryPanel vendor={vendor} />
        <VendorPayoutPanel vendor={vendor} />
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        {/* Order queue */}
        <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Live Order Queue</span>
            <Pill tone="ter">{waiting} waiting</Pill>
            <Pill tone="gold">{cooking} cooking</Pill>
            <span style={{ marginLeft: 'auto', fontFamily: HF.m, fontSize: 10.5, color: s.backendReady ? HOS.green : HOS.red }}>{s.backendReady ? 'Synced' : 'Local'}</span>
            <button onClick={actions.refreshBackend} style={{ background: HOS.surf, color: HOS.wheat, border: `1px solid ${HOS.bordM}`, borderRadius: 8, padding: '6px 9px', fontFamily: HF.l, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>Refresh</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {active.length === 0 && <div style={{ padding: 40, textAlign: 'center', fontFamily: HF.b, fontSize: 13, color: HOS.wheat, opacity: 0.5 }}>All caught up — no active orders.</div>}
            {active.map(o => (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: `1px solid ${HOS.bordS}` }}>
                <div style={{ width: 52, flexShrink: 0 }}>
                  <div style={{ fontFamily: HF.m, fontSize: 13, color: HOS.parch, fontWeight: 600 }}>#{o.id}</div>
                  <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: o.channel === 'app' ? HOS.ter : HOS.blue, marginTop: 2 }}>{o.channel}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: HF.b, fontSize: 13.5, color: HOS.parch }}>{o.items.map(it => `${it.q}× ${it.n}`).join(', ')}</div>
                  <div style={{ fontFamily: HF.m, fontSize: 11, color: HOS.wheat, opacity: 0.5, marginTop: 2 }}>{o.customer} · {money(o.total)} · {o.ago === 0 ? 'just now' : o.ago + 'm ago'}</div>
                </div>
                <Pill tone={o.status === 'ready' ? 'green' : o.status === 'cooking' ? 'gold' : 'dim'}>{o.status}</Pill>
                <button onClick={() => bump(o)} style={{ flexShrink: 0, background: o.status === 'ready' ? HOS.green : HOS.ter, color: '#fff', border: 'none', borderRadius: 9, padding: '9px 16px', fontFamily: HF.l, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>{STATUS_LABEL[o.status]}</button>
              </div>
            ))}
          </div>
        </DeskCard>

        {/* Menu availability */}
        <DeskCard style={{ padding: 0, overflow: 'hidden', alignSelf: 'start' }}>
          <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}` }}>
            <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Menu Availability</span>
            <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.4, marginTop: 3 }}>Tap to 86 an item</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 420, overflowY: 'auto' }}>
            {vendor.menu.map(m => {
              const on = avail[m.id];
              return (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', borderBottom: `1px solid ${HOS.bordS}`, opacity: on ? 1 : 0.5 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: HF.b, fontSize: 13, color: HOS.parch, textDecoration: on ? 'none' : 'line-through' }}>{m.name}</div>
                    <div style={{ fontFamily: HF.m, fontSize: 11, color: HOS.gold, marginTop: 1 }}>{money(m.price)}</div>
                  </div>
                  <button onClick={() => setAvail(a => ({ ...a, [m.id]: !a[m.id] }))} style={{ width: 44, height: 24, borderRadius: 14, background: on ? HOS.green : HOS.surf2, border: `1px solid ${on ? HOS.green : HOS.bord}`, cursor: 'pointer', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', top: 1.5, left: on ? 22 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                  </button>
                </div>
              );
            })}
          </div>
        </DeskCard>
      </div>
    </div>
  );
}

function VendorInventoryPanel({ vendor }) {
  const s = useHall();
  const rows = inventoryForVendor(vendor.id);
  const summary = inventorySummary(rows);
  const channels = s.channels || CHANNELS;
  return (
    <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Real-Time Inventory Sync</span>
        <Pill tone="green">Central DB</Pill>
        <Pill tone={summary.flagged ? 'red' : 'green'}>{summary.flagged} flags</Pill>
        <Pill tone={s.backendReady ? 'green' : 'red'}>{s.backendReady ? `Synced ${s.lastSyncedAt || ''}` : 'Local fallback'}</Pill>
        <label style={{ marginLeft: 'auto', background: HOS.surf, color: HOS.gold, border: `1px solid ${HOS.bordM}`, borderRadius: 9, padding: '8px 12px', fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
          Import Excel
          <input type="file" accept=".xlsx,.xls,.csv,.tsv" onChange={(e) => e.target.files[0] && actions.importInventoryFile(e.target.files[0])} style={{ display: 'none' }} />
        </label>
      </div>
      <div style={{ padding: '12px 18px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, borderBottom: `1px solid ${HOS.bordS}` }}>
        {[['On hand', summary.total], ['Reserved', summary.reserved], ['Low stock', summary.low], ['API channels', channels.length]].map(([l, v]) => (
          <div key={l} style={{ background: HOS.surf, border: `1px solid ${HOS.bordS}`, borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontFamily: HF.d, fontSize: 22, color: HOS.parch, lineHeight: 1 }}>{v}</div>
            <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '8px 18px 14px' }}>
        {rows.map(row => {
          const available = stockAvailable(row);
          const low = available <= row.reorder;
          return (
            <div key={row.itemId} style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.7fr 0.7fr auto', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${HOS.bordS}` }}>
              <div>
                <div style={{ fontFamily: HF.b, fontSize: 13, color: HOS.parch }}>{inventoryItemName(row)}</div>
                <div style={{ fontFamily: HF.m, fontSize: 10, color: HOS.wheat, opacity: 0.45 }}>{row.sku} - last update: {row.lastChannel}</div>
                {row.discrepancy && <div style={{ fontFamily: HF.m, fontSize: 10, color: HOS.red, marginTop: 3 }}>{row.discrepancy}</div>}
              </div>
              <Pill tone={low ? 'red' : 'green'}>{available} sellable</Pill>
              <div style={{ fontFamily: HF.m, fontSize: 11, color: HOS.wheat, opacity: 0.65 }}>+{row.incoming} inbound</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => actions.restock(row.itemId, 12)} style={{ background: HOS.green, color: '#fff', border: 'none', borderRadius: 8, padding: '7px 10px', fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>Restock</button>
                {row.discrepancy && <button onClick={() => actions.resolveDiscrepancy(row.itemId)} style={{ background: HOS.red, color: '#fff', border: 'none', borderRadius: 8, padding: '7px 10px', fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>Fix</button>}
              </div>
            </div>
          );
        })}
      </div>
      <SyncEventList limit={4} />
    </DeskCard>
  );
}

function SyncEventList({ limit }) {
  const events = hallStore.get().syncEvents.slice(0, limit || 5);
  return (
    <div style={{ padding: '12px 18px 16px', borderTop: `1px solid ${HOS.bordS}`, background: 'rgba(107,136,168,0.07)' }}>
      <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.blue, marginBottom: 8 }}>API sync event stream</div>
      {events.map(e => (
        <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '58px 82px 1fr', gap: 8, alignItems: 'baseline', padding: '5px 0', borderBottom: `1px solid ${HOS.bordS}` }}>
          <span style={{ fontFamily: HF.m, fontSize: 9.5, color: HOS.wheat, opacity: 0.45 }}>{e.time}</span>
          <span style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: HOS.gold }}>{e.channel}</span>
          <span style={{ fontFamily: HF.b, fontSize: 11.5, color: HOS.wheat, opacity: 0.72 }}>{e.label}</span>
        </div>
      ))}
    </div>
  );
}

function VendorPayoutPanel({ vendor }) {
  const s = useHall();
  const payouts = s.vendorPayouts || VENDOR_PAYOUTS;
  const payout = payouts.find(p => p.vendor === vendor.id) || payouts[0];
  return (
    <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}` }}>
        <div style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Vendor Panel</div>
        <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 3 }}>Products, sales, payout, domain</div>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          {[['Sales', money0(payout.sales)], ['Orders', payout.orders], ['Auto rent/fees', money(payout.fees + payout.rent)], ['Net payout', money(payout.payout)]].map(([l, v]) => (
            <div key={l} style={{ background: HOS.surf, border: `1px solid ${HOS.bordS}`, borderRadius: 10, padding: 12 }}>
              <div style={{ fontFamily: HF.d, fontSize: 22, color: HOS.gold, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: 12, borderRadius: 10, background: 'rgba(107,140,107,0.10)', border: `1px solid rgba(107,140,107,0.28)`, fontFamily: HF.b, fontSize: 12.5, color: HOS.wheat, lineHeight: 1.5 }}>
          Automated tenant remittance: {payout.stage}. Rent and license fees are deducted from real-time sales before payout.
        </div>
        <div style={{ marginTop: 12, fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.55 }}>Domain: {payout.domain}</div>
      </div>
    </DeskCard>
  );
}

Object.assign(window, { VendorDashboard, Sparkline, DeskCard, VendorInventoryPanel, VendorPayoutPanel, SyncEventList });
