// hos-tracking.jsx — Live multi-stall order tracking
// Depends on: hos-tokens, hos-data, hos-shell

const TRACK_STEPS = ['received', 'cooking', 'ready', 'collected'];
const TRACK_LABELS = { received: 'Order received', cooking: 'In the kitchen', ready: 'Ready for pickup', collected: 'Collected' };

function TrackingScreen() {
  const s = useHall();
  const order = s.orders.find(o => o.id === s.activeOrder) || s.orders[0];

  // Advance each vendor track on a timer for a live feel
  React.useEffect(() => {
    if (!order) return;
    const timers = order.tracks.map((t, idx) => {
      const delay = 3200 + idx * 1500;
      return setInterval(() => {
        const cur = hallStore.get().orders.find(o => o.id === order.id);
        if (!cur) return;
        let changed = false;
        const tracks = cur.tracks.map(tr => {
          if (tr.vendorId !== t.vendorId) return tr;
          const i = TRACK_STEPS.indexOf(tr.status);
          if (i < TRACK_STEPS.length - 2) { changed = true; return Object.assign({}, tr, { status: TRACK_STEPS[i + 1] }); }
          return tr;
        });
        if (changed) hallStore.set({ orders: hallStore.get().orders.map(o => o.id === order.id ? Object.assign({}, o, { tracks }) : o) });
      }, delay);
    });
    return () => timers.forEach(clearInterval);
  }, [order && order.id]);

  if (!order) {
    return (
      <div>
        <CustHeader title="Orders" onBack={() => actions.go('browse')} />
        <div style={{ padding: '70px 30px', textAlign: 'center' }}>
          <div style={{ fontFamily: HF.d, fontSize: 22, color: HOS.parch, marginBottom: 8 }}>No active orders</div>
          <button onClick={() => actions.go('browse')} style={{ marginTop: 14, background: HOS.ter, color: '#fff', border: 'none', borderRadius: 26, padding: '13px 30px', fontFamily: HF.l, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer' }}>Start an order</button>
        </div>
      </div>
    );
  }

  const allReady = order.tracks.every(t => t.status === 'ready');
  const minStep = Math.min(...order.tracks.map(t => TRACK_STEPS.indexOf(t.status)));

  return (
    <div style={{ paddingBottom: 24 }}>
      <CustHeader title="Order Status" sub={`#${order.id}`} onBack={() => actions.go('browse')} />

      {/* Big status hero */}
      <div style={{ padding: '24px 20px 20px', textAlign: 'center', background: allReady ? 'rgba(107,140,107,0.12)' : `linear-gradient(160deg, ${HOS.terDim}, transparent)` }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', margin: '0 auto 14px', background: allReady ? HOS.green : HOS.surf2, border: `2px solid ${allReady ? HOS.greenLt : HOS.bordM}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {!allReady && <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: `2px solid ${HOS.ter}`, borderTopColor: 'transparent', animation: 'hosSpin 1.1s linear infinite' }} />}
          <span style={{ fontSize: 34 }}>{allReady ? '✓' : minStep >= 1 ? '🔥' : '📋'}</span>
        </div>
        <div style={{ fontFamily: HF.d, fontSize: 25, color: HOS.parch, lineHeight: 1.1, marginBottom: 5 }}>
          {allReady ? 'Ready for pickup!' : minStep >= 1 ? 'Your order is cooking' : 'Order received'}
        </div>
        <div style={{ fontFamily: HF.b, fontSize: 13, color: HOS.wheat, opacity: 0.6 }}>
          {allReady ? 'Collect from each stall — show order #' + order.id : `Estimated ${order.meta.pickup === 'asap' ? '12–15 min' : 'your selected time'} · Pickup counter`}
        </div>
      </div>

      {/* Per-stall progress */}
      <div style={{ padding: '18px 18px 0' }}>
        <div style={{ fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 12 }}>By stall</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {order.tracks.map(t => {
            const v = vendorById(t.vendorId);
            const stepIdx = TRACK_STEPS.indexOf(t.status);
            const lines = order.lines.filter(l => l.vendorId === t.vendorId);
            return (
              <div key={t.vendorId} style={{ border: `1px solid ${HOS.bord}`, borderRadius: 14, padding: 14, background: HOS.panel }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.color }} />
                  <span style={{ fontFamily: HF.d, fontSize: 16, color: HOS.parch }}>{v.name}</span>
                  <span style={{ marginLeft: 'auto' }}><Pill tone={t.status === 'ready' ? 'green' : t.status === 'cooking' ? 'ter' : 'dim'}>{TRACK_LABELS[t.status]}</Pill></span>
                </div>
                {/* Step dots */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                  {TRACK_STEPS.slice(0, 3).map((st, i) => (
                    <React.Fragment key={st}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, background: i <= stepIdx ? v.color : HOS.surf2, border: `2px solid ${i <= stepIdx ? v.color : HOS.bord}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11 }}>{i < stepIdx ? '✓' : ''}</div>
                      {i < 2 && <div style={{ flex: 1, height: 2, background: i < stepIdx ? v.color : HOS.surf2 }} />}
                    </React.Fragment>
                  ))}
                </div>
                <div style={{ fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.6, lineHeight: 1.5 }}>{lines.map(l => `${l.qty}× ${l.name}`).join(' · ')}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '20px 18px 0' }}>
        <button onClick={() => actions.go('browse')} style={{ width: '100%', background: HOS.surf, color: HOS.parch, border: `1px solid ${HOS.bordM}`, borderRadius: 14, padding: '14px', fontFamily: HF.l, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer' }}>Back to the Hall</button>
      </div>
    </div>
  );
}

Object.assign(window, { TrackingScreen });
