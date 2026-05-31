// hos-operator.jsx — Hall operator console: 9 KPIs, floor map, live feed (desktop)
// Depends on: hos-tokens, hos-data, hos-vendor (Sparkline, DeskCard)

function fmtKpi(k) {
  if (k.unit === '$') return money0(k.value);
  if (k.unit === '★') return k.value.toFixed(1);
  if (k.unit === '×') return k.value.toFixed(2) + '×';
  if (k.unit === ' vendors') return k.value + '';
  return k.value + k.unit;
}

function KpiCard({ k }) {
  const meets = k.good === 'up' ? k.value >= k.target : k.value <= k.target;
  const accent = meets ? HOS.greenLt : HOS.red;
  return (
    <DeskCard style={{ padding: '15px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ fontFamily: HF.l, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, lineHeight: 1.4, maxWidth: 110 }}>{k.label}</div>
        <span style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.35, border: `1px solid ${HOS.bordS}`, padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0 }}>{k.cadence}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <div style={{ fontFamily: HF.d, fontSize: 30, fontWeight: 500, color: HOS.parch, lineHeight: 1 }}>
            {k.unit === '★' && <span style={{ color: HOS.gold, fontSize: 22 }}>★ </span>}{fmtKpi(k)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent }} />
            <span style={{ fontFamily: HF.m, fontSize: 10, color: accent }}>{meets ? 'On target' : 'Watch'}</span>
            <span style={{ fontFamily: HF.m, fontSize: 10, color: HOS.wheat, opacity: 0.4 }}>· tgt {k.unit === '$' ? money0(k.target) : k.target}{k.unit === '%' ? '%' : ''}</span>
          </div>
        </div>
        <Sparkline data={k.spark} color={accent} w={70} h={30} />
      </div>
    </DeskCard>
  );
}

function OperatorConsole() {
  const s = useHall();
  const [feed, setFeed] = React.useState(SEED_ORDERS);

  // Inject a new live order periodically
  React.useEffect(() => {
    let seq = 1100;
    const names = ['Alex T.', 'Sam K.', 'Jordan M.', 'Casey L.', 'Walk-in', 'Robin H.'];
    const t = setInterval(() => {
      const v = VENDORS[Math.floor(Math.random() * 5)];
      const item = v.menu[Math.floor(Math.random() * v.menu.length)];
      setFeed(f => [{ id: ++seq, vendor: v.id, items: [item.name], total: item.price, status: 'queued', mins: 0, customer: names[Math.floor(Math.random()*names.length)], channel: Math.random() > 0.4 ? 'app' : 'pos' }, ...f].slice(0, 9));
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const stateColor = { busy: HOS.ter, open: HOS.green, incubator: HOS.gold, vacant: HOS.surf2 };
  const stateLabel = { busy: 'Busy', open: 'Open', incubator: 'Incubator', vacant: 'Vacant' };
  const liveFeed = orderFeedFromBackend();
  const combinedFeed = liveFeed.length ? liveFeed.concat(feed).slice(0, 9) : feed;
  const liveRevenue = (s.vendorPayouts || VENDOR_PAYOUTS).reduce((sum, p) => sum + p.sales, 0);
  const liveOrderCount = (s.vendorPayouts || VENDOR_PAYOUTS).reduce((sum, p) => sum + p.orders, 0);

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '22px 28px 60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: HF.d, fontSize: 27, color: HOS.parch, lineHeight: 1 }}>Hall Console</div>
          <div style={{ fontFamily: HF.l, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 4 }}>{s.backendReady ? `Central database synced ${s.lastSyncedAt || ''}` : 'Local fallback mode'}</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[['Today\'s Revenue', money0(liveRevenue)], ['Orders', liveOrderCount], ['Avg Wait', '11m'], ['Active Members', '184']].map(([l, v]) => (
            <DeskCard key={l} style={{ padding: '10px 18px', textAlign: 'center' }}>
              <div style={{ fontFamily: HF.d, fontSize: 22, fontWeight: 500, color: HOS.ter, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 3 }}>{l}</div>
            </DeskCard>
          ))}
        </div>
      </div>

      {/* AI operating briefing */}
      <HallAnalyst />

      <OperatorMarketplacePanel feed={combinedFeed} />

      {/* KPI grid */}
      <div style={{ fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 12 }}>9 Operating KPIs · Incubator Playbook</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 22 }}>
        {KPIS.map(k => <KpiCard key={k.id} k={k} />)}
      </div>

      {/* Floor + feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Floor map */}
        <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Floor Map</span>
            <span style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
              {Object.keys(stateColor).map(st => (
                <span key={st} style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: stateColor[st] }} />{stateLabel[st]}
                </span>
              ))}
            </span>
          </div>
          <div style={{ padding: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {STALLS.map(st => {
                const v = st.vendor ? vendorById(st.vendor) : null;
                return (
                  <div key={st.id} style={{ aspectRatio: '1', borderRadius: 11, background: st.state === 'vacant' ? HOS.surf : `${stateColor[st.state]}1f`, border: `1.5px solid ${stateColor[st.state]}${st.state === 'vacant' ? '55' : ''}`, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: HF.m, fontSize: 11, fontWeight: 600, color: HOS.parch }}>{st.id}</span>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: stateColor[st.state] }} />
                    </div>
                    <div style={{ fontFamily: HF.b, fontSize: 11, color: v ? HOS.parch : HOS.wheat, opacity: v ? 0.9 : 0.45, lineHeight: 1.2 }}>{v ? v.name : stateLabel[st.state]}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, padding: '11px 14px', background: 'rgba(212,168,75,0.08)', border: `1px solid rgba(212,168,75,0.25)`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ color: HOS.gold }}>⚑</span>
              <span style={{ fontFamily: HF.b, fontSize: 11.5, color: HOS.wheat, opacity: 0.8 }}>Stall B3 graduating Q3 — backfill candidate ready (Levant Table expansion)</span>
            </div>
          </div>
        </DeskCard>

        {/* Live feed */}
        <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Live Order Feed</span>
            <span style={{ marginLeft: 'auto', fontFamily: HF.m, fontSize: 10.5, color: HOS.green }}>● Streaming</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 460, overflowY: 'auto' }}>
            {combinedFeed.map((o, i) => {
              const v = vendorById(o.vendor);
              return (
                <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: `1px solid ${HOS.bordS}`, animation: i === 0 ? 'hosSlideIn 0.4s ease' : 'none' }}>
                  <div style={{ width: 6, height: 38, borderRadius: 4, background: v.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: HF.b, fontSize: 13, color: HOS.parch }}>{o.items.join(', ')}</div>
                    <div style={{ fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.5, marginTop: 2 }}>{v.name} · #{o.id} · {o.customer}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: HF.m, fontSize: 12.5, color: HOS.gold }}>{money(o.total)}</div>
                    <span style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: o.channel === 'app' ? HOS.ter : HOS.blue }}>{o.channel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </DeskCard>
      </div>
    </div>
  );
}

function OperatorMarketplacePanel({ feed }) {
  const s = useHall();
  const summary = inventorySummary();
  const payouts = s.vendorPayouts || VENDOR_PAYOUTS;
  const channels = s.channels || CHANNELS;
  const timeline = s.orderTimeline || ORDER_TIMELINE;
  const ready = payouts.filter(p => p.stage === 'Ready for remittance').length;
  const gross = payouts.reduce((sum, p) => sum + p.sales, 0);
  const net = payouts.reduce((sum, p) => sum + p.payout, 0);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
      <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Unified Inventory Command</span>
          <Pill tone="green">Live API sync</Pill>
          <Pill tone={s.backendReady ? 'green' : 'red'}>{s.backendReady ? `Synced ${s.lastSyncedAt || ''}` : 'Local fallback'}</Pill>
          <label style={{ marginLeft: 'auto', background: HOS.surf, color: HOS.gold, border: `1px solid ${HOS.bordM}`, borderRadius: 9, padding: '8px 12px', fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Bulk Excel Import
            <input type="file" accept=".xlsx,.xls,.csv,.tsv" onChange={(e) => e.target.files[0] && actions.importInventoryFile(e.target.files[0])} style={{ display: 'none' }} />
          </label>
          <button onClick={actions.refreshBackend} style={{ background: HOS.surf, color: HOS.wheat, border: `1px solid ${HOS.bordM}`, borderRadius: 9, padding: '8px 12px', fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>Refresh</button>
        </div>
        <div style={{ padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
            {[['Central stock', summary.total], ['Reserved', summary.reserved], ['Low items', summary.low], ['Auto flags', summary.flagged]].map(([l, v]) => (
              <div key={l} style={{ background: HOS.surf, border: `1px solid ${HOS.bordS}`, borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontFamily: HF.d, fontSize: 23, color: HOS.parch, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {channels.map(ch => (
              <div key={ch.id} style={{ padding: '10px 12px', borderRadius: 10, border: `1px solid ${HOS.bordS}`, background: 'rgba(107,140,107,0.08)' }}>
                <div style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.parch }}>{ch.name}</div>
                <div style={{ fontFamily: HF.m, fontSize: 10, color: HOS.greenLt, marginTop: 3 }}>{ch.status}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.72, lineHeight: 1.5 }}>
            Sales from every online and offline channel reserve against the same stock table, preventing oversells and pushing instant changes to vendor panels, POS, kiosk, and marketplace domains.
          </div>
          <SyncEventList limit={5} />
        </div>
      </DeskCard>

      <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Marketplace Payouts</span>
          <Pill tone="gold">Tier 3</Pill>
          <Pill tone="green">{ready} ready</Pill>
        </div>
        <div style={{ padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            {[['Gross sales', money0(gross)], ['Net remittance', money0(net)]].map(([l, v]) => (
              <div key={l} style={{ background: HOS.surf, border: `1px solid ${HOS.bordS}`, borderRadius: 10, padding: 12 }}>
                <div style={{ fontFamily: HF.d, fontSize: 24, color: HOS.gold, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ maxHeight: 180, overflowY: 'auto' }}>
            {payouts.map(p => {
              const v = vendorById(p.vendor);
              return (
                <div key={p.vendor} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, padding: '9px 0', borderBottom: `1px solid ${HOS.bordS}` }}>
                  <div>
                    <div style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.parch }}>{v.name}</div>
                    <div style={{ fontFamily: HF.m, fontSize: 10, color: HOS.wheat, opacity: 0.5 }}>{p.orders} orders - {p.stage}</div>
                  </div>
                  <div style={{ textAlign: 'right', fontFamily: HF.m, fontSize: 11, color: HOS.gold }}>{money(p.payout)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </DeskCard>

      <DeskCard style={{ gridColumn: '1 / -1', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Complete Order Timeline</span>
          <Pill tone="ter">Payment to fulfillment</Pill>
          <span style={{ marginLeft: 'auto', fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.5 }}>Latest #{feed[0] && feed[0].id}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {timeline.map((step, i) => (
            <div key={step.label} style={{ padding: 16, borderRight: i < timeline.length - 1 ? `1px solid ${HOS.bordS}` : 'none' }}>
              <div style={{ fontFamily: HF.m, fontSize: 10, color: HOS.gold }}>{step.time}</div>
              <div style={{ fontFamily: HF.b, fontSize: 13.5, color: HOS.parch, marginTop: 5 }}>{step.label}</div>
              <div style={{ fontFamily: HF.b, fontSize: 11.5, color: HOS.wheat, opacity: 0.62, lineHeight: 1.45, marginTop: 5 }}>{step.detail}</div>
            </div>
          ))}
        </div>
      </DeskCard>
    </div>
  );
}

Object.assign(window, { OperatorConsole, KpiCard, OperatorMarketplacePanel });
