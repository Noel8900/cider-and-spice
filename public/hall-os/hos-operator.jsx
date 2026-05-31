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
    </div>
  );
}

Object.assign(window, { OperatorConsole, KpiCard });
