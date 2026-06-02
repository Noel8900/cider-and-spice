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

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '22px 28px 60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: HF.d, fontSize: 27, color: HOS.parch, lineHeight: 1 }}>Hall Console</div>
          <div style={{ fontFamily: HF.l, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 4 }}>Friday · Jun 6 · 12:34 PM · Live</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[['Today\'s Revenue', '$11,840'], ['Orders', '312'], ['Avg Wait', '11m'], ['Active Members', '184']].map(([l, v]) => (
            <DeskCard key={l} style={{ padding: '10px 18px', textAlign: 'center' }}>
              <div style={{ fontFamily: HF.d, fontSize: 22, fontWeight: 500, color: HOS.ter, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 3 }}>{l}</div>
            </DeskCard>
          ))}
        </div>
      </div>

      {/* AI operating briefing */}
      <HallAnalyst />

      {/* KPI grid */}
      <div style={{ fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 12 }}>9 Operating KPIs · Incubator Playbook</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 22 }}>
        {KPIS.map(k => <KpiCard key={k.id} k={k} />)}
      </div>

      {/* Floor + feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
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
            {feed.map((o, i) => {
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

      {/* Commerce stack row: Promotions + Tenant Remittance */}
      <div style={{ fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 12 }}>Commerce stack · Promotions &amp; payouts</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <PromotionsPanel />
        <RemittancePanel />
      </div>
    </div>
  );
}

// ── Promotions panel (hall-wide discount engine) ─────────────────────────────

function PromotionsPanel() {
  const s = useHall();
  const promos = s.promotions || [];
  const liveCount = promos.filter(p => p.active).length;

  return (
    <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Hall Promotions</span>
        <Pill tone="ter">{liveCount} live</Pill>
        <span style={{ marginLeft: 'auto', fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45 }}>Discount engine</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {promos.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderBottom: `1px solid ${HOS.bordS}`, opacity: p.active ? 1 : 0.55 }}>
            <div style={{ width: 64, flexShrink: 0 }}>
              <div style={{ fontFamily: HF.d, fontSize: 17, color: p.active ? HOS.gold : HOS.wheat, fontWeight: 600, letterSpacing: '0.04em' }}>{p.label}</div>
              <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginTop: 2 }}>{p.kind === 'pct' ? `${Math.round(p.value*100)}% off` : `$${p.value} off`}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.parch }}>{p.desc}</div>
              <div style={{ fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.5, marginTop: 2 }}>{p.uses} redemptions · scope: {p.scope}</div>
            </div>
            <button onClick={() => actions.togglePromotion(p.id)} style={{ width: 44, height: 24, borderRadius: 14, background: p.active ? HOS.green : HOS.surf2, border: `1px solid ${p.active ? HOS.green : HOS.bord}`, cursor: 'pointer', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: 1.5, left: p.active ? 22 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
            </button>
          </div>
        ))}
      </div>
    </DeskCard>
  );
}

// ── Tenant remittance panel (automated weekly payouts) ───────────────────────

function RemittancePanel() {
  const vendors = VENDORS.filter(v => REMITTANCE_CONFIG[v.id]);
  const totals = vendors.reduce((acc, v) => {
    const r = calcRemittance(v.id);
    acc.sales += r.sales; acc.rent += r.rent; acc.fee += r.fee; acc.payout += r.payout;
    return acc;
  }, { sales: 0, rent: 0, fee: 0, payout: 0 });

  return (
    <DeskCard style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Tenant Remittance</span>
        <Pill tone="gold">Week 22</Pill>
        <span style={{ marginLeft: 'auto', fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.green }}>● Auto-deducted</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `1px solid ${HOS.bord}` }}>
        {[
          ['Gross sales',  money0(totals.sales), HOS.parch],
          ['Stall rent',   money0(totals.rent),  HOS.wheat],
          ['Hub fees',     money0(totals.fee),   HOS.wheat],
          ['Net payouts',  money0(totals.payout), HOS.gold],
        ].map(([l, v, c]) => (
          <div key={l} style={{ padding: '12px 14px', borderRight: l === 'Net payouts' ? 'none' : `1px solid ${HOS.bordS}` }}>
            <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>{l}</div>
            <div style={{ fontFamily: HF.d, fontSize: 18, color: c, fontWeight: 500, marginTop: 3 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.7fr 0.7fr 0.9fr', padding: '8px 18px', borderBottom: `1px solid ${HOS.bordS}`, fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45 }}>
        <span>Stall</span><span style={{ textAlign: 'right' }}>Sales</span><span style={{ textAlign: 'right' }}>Rent</span><span style={{ textAlign: 'right' }}>Fee</span><span style={{ textAlign: 'right' }}>Payout</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {vendors.map(v => {
          const r = calcRemittance(v.id);
          return (
            <div key={v.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.7fr 0.7fr 0.9fr', alignItems: 'center', padding: '11px 18px', borderBottom: `1px solid ${HOS.bordS}`, gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{ width: 6, height: 22, borderRadius: 3, background: v.color, flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.parch, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</div>
                  <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>Stall {v.stall} · {Math.round(r.rate*100)}% fee</div>
                </div>
              </div>
              <span style={{ textAlign: 'right', fontFamily: HF.m, fontSize: 12.5, color: HOS.parch }}>{money0(r.sales)}</span>
              <span style={{ textAlign: 'right', fontFamily: HF.m, fontSize: 12, color: HOS.wheat, opacity: 0.75 }}>−{money0(r.rent)}</span>
              <span style={{ textAlign: 'right', fontFamily: HF.m, fontSize: 12, color: HOS.wheat, opacity: 0.75 }}>−{money0(r.fee)}</span>
              <span style={{ textAlign: 'right', fontFamily: HF.d, fontSize: 13, color: HOS.gold, fontWeight: 600 }}>{money0(r.payout)}</span>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '11px 18px', background: HOS.surf, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: HOS.green }}>✓</span>
        <span style={{ fontFamily: HF.b, fontSize: 11.5, color: HOS.wheat, opacity: 0.85, flex: 1 }}>Friday 5pm — automated ACH remittance scheduled. No spreadsheets, no invoice fight.</span>
        <button style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: HOS.ter, background: 'none', border: `1px solid ${HOS.bord}`, borderRadius: 6, padding: '5px 9px', cursor: 'pointer' }}>Export CSV</button>
      </div>
    </DeskCard>
  );
}

Object.assign(window, { OperatorConsole, KpiCard, PromotionsPanel, RemittancePanel });
