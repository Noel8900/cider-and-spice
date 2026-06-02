// hos-customer.jsx — Customer browse home + vendor menu
// Depends on: hos-tokens, hos-data, hos-shell

// ── Shared customer header ────────────────────────────────────────────────────

function CustHeader({ title, sub, onBack, right }) {
  return (
    <div style={{ padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, background: 'rgba(30,23,16,0.96)', backdropFilter: 'blur(10px)', zIndex: 10, borderBottom: `1px solid ${HOS.bordS}` }}>
      {onBack && (
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: '50%', background: HOS.surf, border: `1px solid ${HOS.bord}`, color: HOS.parch, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: HF.d, fontSize: 22, color: HOS.parch, lineHeight: 1.05 }}>{title}</div>
        {sub && <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 3 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// ── Browse home ───────────────────────────────────────────────────────────────

function CustomerBrowse() {
  const s = useHall();
  const food = VENDORS.filter(v => !v.bar);
  const bar = VENDORS.find(v => v.bar);

  return (
    <div style={{ paddingBottom: 24 }}>
      {/* Hero banner */}
      <div style={{ position: 'relative', padding: '20px 18px 22px', background: `linear-gradient(150deg, ${HOS.ter} 0%, #9c4a1f 55%, ${HOS.panel} 130%)`, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 10%, rgba(212,168,75,0.4), transparent 45%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,247,236,0.8)', marginBottom: 6 }}>Welcome to the hall</div>
          <div style={{ fontFamily: HF.d, fontSize: 30, fontWeight: 500, color: '#fff', lineHeight: 1.02, marginBottom: 4 }}>Order from every<br/>stall at once.</div>
          <div style={{ fontFamily: HF.b, fontSize: 13, color: 'rgba(255,247,236,0.82)', lineHeight: 1.5, maxWidth: 260 }}>One cart, one pickup time. Six kitchens, twenty ciders.</div>

          <button onClick={() => actions.go('concierge')} style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(18,13,8,0.34)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,247,236,0.28)', borderRadius: 30, padding: '11px 16px', cursor: 'pointer', width: '100%' }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: HOS.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#3a2410"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>
            </span>
            <span style={{ fontFamily: HF.b, fontSize: 13, color: '#fff', fontWeight: 500, textAlign: 'left', flex: 1 }}>Ask the Hall Concierge…</span>
            <span style={{ color: 'rgba(255,247,236,0.7)' }}>→</span>
          </button>
        </div>
      </div>

      {/* Quick filters */}
      <div style={{ display: 'flex', gap: 8, padding: '16px 18px 4px', overflowX: 'auto' }}>
        {['All', 'Popular', 'Under $10', 'Vegetarian', 'Spicy', 'Quick'].map((f, i) => (
          <span key={f} style={{ flexShrink: 0, fontFamily: HF.l, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === 0 ? '#1e1710' : HOS.wheat, background: i === 0 ? HOS.wheat : HOS.surf, border: `1px solid ${i === 0 ? HOS.wheat : HOS.bord}`, padding: '7px 14px', borderRadius: 20, cursor: 'pointer' }}>{f}</span>
        ))}
      </div>

      {/* Section label */}
      <div style={{ padding: '18px 18px 10px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Kitchens</span>
        <span style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.4 }}>{food.length} stalls open</span>
      </div>

      {/* Vendor cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 18px' }}>
        {food.map(v => <VendorCardLg key={v.id} vendor={v} />)}
      </div>

      {/* Bar feature */}
      <div style={{ padding: '20px 18px 10px' }}>
        <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>From the Bar</span>
      </div>
      <div style={{ padding: '0 18px' }}>
        <button onClick={() => actions.go('vendor', bar.id)} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: `1px solid ${HOS.bord}`, borderRadius: 16, overflow: 'hidden', background: `linear-gradient(120deg, rgba(212,168,75,0.16), ${HOS.panel})`, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: HOS.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: HF.d, fontSize: 26, color: '#3a2410' }}>🍎</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch, lineHeight: 1 }}>{bar.name}</div>
            <div style={{ fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.62, marginTop: 4 }}>{bar.tagline}</div>
          </div>
          <Pill tone="gold">20+ Taps</Pill>
        </button>
      </div>
    </div>
  );
}

function VendorCardLg({ vendor }) {
  const [hover, setHover] = React.useState(false);
  const popular = vendor.menu.find(m => m.tags.includes('Popular'));
  return (
    <button
      onClick={() => actions.go('vendor', vendor.id)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: `1px solid ${hover ? HOS.bordM : HOS.bord}`, borderRadius: 16, overflow: 'hidden', background: HOS.panel, transition: 'all 0.2s', padding: 0 }}>
      {/* Color band */}
      <div style={{ height: 80, background: `linear-gradient(125deg, ${vendor.color}, ${vendor.color}99)`, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 12 }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(255,255,255,0.18), transparent 50%)' }} />
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
          <span style={{ fontFamily: HF.m, fontSize: 10, letterSpacing: '0.05em', color: '#fff', background: 'rgba(18,13,8,0.4)', padding: '4px 9px', borderRadius: 20 }}>Stall {vendor.stall}</span>
        </div>
        <div style={{ position: 'relative', fontFamily: HF.d, fontSize: 25, fontWeight: 500, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>{vendor.name}</div>
      </div>
      {/* Body */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
          <span style={{ fontFamily: HF.l, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: vendor.color === '#d4a84b' ? HOS.gold : HOS.ter }}>{vendor.cuisine}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Stars rating={vendor.rating} size={11} />
            <span style={{ fontFamily: HF.b, fontSize: 11.5, color: HOS.wheat, opacity: 0.7 }}>{vendor.rating}</span>
          </span>
        </div>
        <div style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.wheat, opacity: 0.6, lineHeight: 1.55, marginBottom: 10 }}>{vendor.blurb}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: HF.m, fontSize: 11, color: HOS.wheat, opacity: 0.5 }}>
          <span>⏱ {vendor.prep} min</span>
          <span>·</span>
          <span>{vendor.reviews} reviews</span>
          {popular && <><span>·</span><span style={{ color: HOS.ter, opacity: 0.9 }}>★ {popular.name}</span></>}
        </div>
      </div>
    </button>
  );
}

// ── Vendor menu ───────────────────────────────────────────────────────────────

function VendorMenu({ vendorId }) {
  const s = useHall();
  const vendor = vendorById(vendorId) || VENDORS[0];
  const cats = [...new Set(vendor.menu.map(m => m.cat))];
  const inCart = (id) => { const l = s.cart.find(x => x.itemId === id); return l ? l.qty : 0; };

  return (
    <div style={{ paddingBottom: 28 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 150, background: `linear-gradient(135deg, ${vendor.color}, ${vendor.color}88)`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 18 }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 15%, rgba(255,255,255,0.2), transparent 50%)' }} />
        <button onClick={() => actions.go('browse')} style={{ position: 'absolute', top: 14, left: 14, width: 36, height: 36, borderRadius: '50%', background: 'rgba(18,13,8,0.4)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: HF.l, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,247,236,0.85)', marginBottom: 4 }}>{vendor.cuisine} · Stall {vendor.stall}</div>
          <div style={{ fontFamily: HF.d, fontSize: 32, fontWeight: 500, color: '#fff', lineHeight: 1, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{vendor.name}</div>
        </div>
      </div>

      {/* Info strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px', borderBottom: `1px solid ${HOS.bordS}`, fontFamily: HF.m, fontSize: 11.5, color: HOS.wheat }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Stars rating={vendor.rating} size={12} /> <b style={{ color: HOS.parch, fontFamily: HF.b }}>{vendor.rating}</b></span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.65 }}>⏱ {vendor.prep} min</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.65 }}>{vendor.reviews} reviews</span>
      </div>

      <div style={{ padding: '14px 18px 6px' }}>
        <p style={{ fontFamily: HF.b, fontSize: 13, color: HOS.wheat, opacity: 0.62, lineHeight: 1.6, margin: 0 }}>{vendor.blurb}</p>
      </div>

      {/* Menu by category */}
      {cats.map(cat => (
        <div key={cat}>
          <div style={{ padding: '16px 18px 8px', fontFamily: HF.l, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: HOS.ter }}>{cat}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {vendor.menu.filter(m => m.cat === cat).map(item => (
              <MenuRow key={item.id} item={item} vendor={vendor} qty={inCart(item.id)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MenuRow({ item, vendor, qty }) {
  useHall();   // subscribe so 86 toggles + stock changes re-render the customer menu
  const stock = itemStock(item.id);
  const available = itemAvailable(item.id);
  const low = available && stock > 0 && stock <= 6;

  return (
    <div style={{ display: 'flex', gap: 12, padding: '13px 18px', borderBottom: `1px solid ${HOS.bordS}`, alignItems: 'flex-start', opacity: available ? 1 : 0.5 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 3 }}>
          <span style={{ fontFamily: HF.b, fontSize: 14.5, fontWeight: 600, color: HOS.parch, textDecoration: available ? 'none' : 'line-through' }}>{item.name}</span>
          {!available && <Pill tone="red">Sold out · 86</Pill>}
          {low && <Pill tone="gold">Only {stock} left</Pill>}
          {item.tags.map(t => <Pill key={t} tone={t === 'Popular' ? 'ter' : t === 'Spicy' ? 'red' : t === 'Retail' ? 'gold' : 'green'}>{t}</Pill>)}
        </div>
        <div style={{ fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.55, lineHeight: 1.5, marginBottom: 7, maxWidth: 230 }}>{item.desc}</div>
        <div style={{ fontFamily: HF.m, fontSize: 13.5, color: HOS.gold, fontWeight: 500 }}>{money(item.price)}</div>
      </div>
      {!available ? (
        <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: '50%', background: HOS.surf, border: `1px dashed ${HOS.bordM}`, color: HOS.wheat, opacity: 0.5, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>—</div>
      ) : qty > 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0, background: HOS.surf, borderRadius: 20, border: `1px solid ${HOS.bordM}` }}>
          <Stepper onClick={() => { const l = hallStore.get().cart.find(x => x.itemId === item.id); actions.setQty(l.lineId, qty - 1); }} sign="−" />
          <span style={{ fontFamily: HF.b, fontSize: 14, fontWeight: 700, color: HOS.parch, minWidth: 22, textAlign: 'center' }}>{qty}</span>
          <Stepper onClick={() => qty < stock && actions.addToCart(vendor, item)} sign="+" />
        </div>
      ) : (
        <button onClick={() => actions.addToCart(vendor, item)} style={{ flexShrink: 0, width: 38, height: 38, borderRadius: '50%', background: HOS.ter, border: 'none', color: '#fff', fontSize: 22, fontWeight: 300, cursor: 'pointer', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(192,98,42,0.3)' }}>+</button>
      )}
    </div>
  );
}

function Stepper({ onClick, sign }) {
  return (
    <button onClick={onClick} style={{ width: 34, height: 36, background: 'none', border: 'none', color: HOS.ter, fontSize: 20, fontWeight: 400, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sign}</button>
  );
}

Object.assign(window, { CustHeader, CustomerBrowse, VendorCardLg, VendorMenu, MenuRow });
