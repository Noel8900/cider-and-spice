// hos-flow.jsx — Ordering flow helpers: pickup selector, cross-sell
// Depends on: hos-tokens, hos-data

function PickupSelector({ value, onChange }) {
  const opts = [
    { id: 'asap', label: 'ASAP', sub: '~15 min' },
    { id: 't1',   label: '12:30', sub: 'PM' },
    { id: 't2',   label: '12:45', sub: 'PM' },
    { id: 't3',   label: '1:00',  sub: 'PM' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {opts.map(o => {
        const active = value === o.id;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={{ flex: 1, background: active ? HOS.terDim : HOS.surf, border: `1px solid ${active ? HOS.ter : HOS.bord}`, borderRadius: 12, padding: '10px 4px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s' }}>
            <div style={{ fontFamily: HF.b, fontSize: 14, fontWeight: 700, color: active ? HOS.ter : HOS.parch }}>{o.label}</div>
            <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginTop: 2 }}>{o.sub}</div>
          </button>
        );
      })}
    </div>
  );
}

// Cross-sell: recommend a cider if none in cart, else a popular dish from an un-ordered stall
function CrossSell() {
  const s = useHall();
  const cartVendorIds = new Set(s.cart.map(l => l.vendorId));
  const hasCider = cartVendorIds.has('cider');

  let suggestion;
  if (!hasCider) {
    const v = vendorById('cider');
    suggestion = { vendor: v, item: v.menu.find(m => m.id === 'c1'), reason: 'Pair your order with a flight' };
  } else {
    const v = VENDORS.find(x => !x.bar && !cartVendorIds.has(x.id)) || VENDORS[0];
    const item = v.menu.find(m => m.tags.includes('Popular')) || v.menu[0];
    suggestion = { vendor: v, item, reason: `Popular at ${v.name}` };
  }
  if (!suggestion || !suggestion.item) return null;
  const { vendor, item, reason } = suggestion;

  return (
    <div style={{ padding: '0 18px', marginBottom: 18 }}>
      <div style={{ fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 9 }}>Add to your order</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: HOS.panel, border: `1px solid ${HOS.bord}`, borderRadius: 14, padding: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg, ${vendor.color}, ${vendor.color}99)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HF.d, fontSize: 20, color: '#fff' }}>{vendor.name[0]}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: HF.b, fontSize: 13.5, fontWeight: 600, color: HOS.parch }}>{item.name}</div>
          <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: HOS.ter, opacity: 0.85, marginTop: 2 }}>{reason} · {money(item.price)}</div>
        </div>
        <button onClick={() => actions.addToCart(vendor, item)} style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: HOS.ter, border: 'none', color: '#fff', fontSize: 21, fontWeight: 300, cursor: 'pointer', lineHeight: 1 }}>+</button>
      </div>
    </div>
  );
}

Object.assign(window, { PickupSelector, CrossSell });
