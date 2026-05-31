// hos-pos.jsx — Counter POS terminal (desktop)
// Depends on: hos-tokens, hos-data, hos-vendor (DeskCard)

function POSTerminal() {
  const [vid, setVid] = React.useState('yazzie');
  const [ticket, setTicket] = React.useState([]);
  const [charged, setCharged] = React.useState(false);
  const vendor = vendorById(vid);

  const add = (item) => {
    setCharged(false);
    setTicket(t => {
      const ex = t.find(l => l.id === item.id);
      if (ex) return t.map(l => l.id === item.id ? { ...l, q: l.q + 1 } : l);
      return [...t, { id: item.id, name: item.name, price: item.price, q: 1 }];
    });
  };
  const setQ = (id, q) => setTicket(t => q <= 0 ? t.filter(l => l.id !== id) : t.map(l => l.id === id ? { ...l, q } : l));

  const sub = ticket.reduce((s, l) => s + l.price * l.q, 0);
  const tax = sub * 0.08125;
  const total = sub + tax;
  const count = ticket.reduce((s, l) => s + l.q, 0);

  const cats = [...new Set(vendor.menu.map(m => m.cat))];

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '22px 28px 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 18, alignItems: 'start' }}>
      {/* Left: menu */}
      <div>
        <div style={{ fontFamily: HF.d, fontSize: 26, color: HOS.parch, marginBottom: 12, lineHeight: 1 }}>Counter POS</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
          {VENDORS.map(v => (
            <button key={v.id} onClick={() => setVid(v.id)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: vid === v.id ? v.color : HOS.surf, border: `1px solid ${vid === v.id ? v.color : HOS.bord}`, borderRadius: 9, padding: '8px 14px', cursor: 'pointer' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: vid === v.id ? '#fff' : v.color }} />
              <span style={{ fontFamily: HF.b, fontSize: 12.5, fontWeight: 600, color: vid === v.id ? '#fff' : HOS.wheat }}>{v.name}</span>
            </button>
          ))}
        </div>

        {cats.map(cat => (
          <div key={cat} style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: HF.l, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: HOS.ter, marginBottom: 10 }}>{cat}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
              {vendor.menu.filter(m => m.cat === cat).map(item => (
                <button key={item.id} onClick={() => add(item)} style={{ textAlign: 'left', background: HOS.panel, border: `1px solid ${HOS.bord}`, borderRadius: 12, padding: 14, cursor: 'pointer', transition: 'all 0.15s', minHeight: 92, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = vendor.color; e.currentTarget.style.background = HOS.panel2; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = HOS.bord; e.currentTarget.style.background = HOS.panel; }}>
                  <div style={{ fontFamily: HF.b, fontSize: 13.5, fontWeight: 600, color: HOS.parch, lineHeight: 1.25 }}>{item.name}</div>
                  <div style={{ fontFamily: HF.m, fontSize: 14, color: HOS.gold, marginTop: 8 }}>{money(item.price)}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right: ticket */}
      <DeskCard style={{ padding: 0, overflow: 'hidden', position: 'sticky', top: 90 }}>
        <div style={{ padding: '15px 18px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch, whiteSpace: 'nowrap' }}>Current Ticket</span>
          {count > 0 && <Pill tone="ter">{count} items</Pill>}
          {ticket.length > 0 && <button onClick={() => { setTicket([]); setCharged(false); }} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: HOS.wheat, opacity: 0.5, fontFamily: HF.l, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Clear</button>}
        </div>

        <div style={{ minHeight: 200, maxHeight: 380, overflowY: 'auto' }}>
          {charged ? (
            <div style={{ padding: '50px 24px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: HOS.green, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color: '#fff' }}>✓</div>
              <div style={{ fontFamily: HF.d, fontSize: 22, color: HOS.parch }}>Payment complete</div>
              <div style={{ fontFamily: HF.b, fontSize: 13, color: HOS.wheat, opacity: 0.55, marginTop: 6 }}>Order fired to {vendor.name}'s kitchen queue</div>
            </div>
          ) : ticket.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', fontFamily: HF.b, fontSize: 13, color: HOS.wheat, opacity: 0.45, lineHeight: 1.6 }}>Tap menu items to build a ticket.</div>
          ) : (
            ticket.map(l => (
              <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 18px', borderBottom: `1px solid ${HOS.bordS}` }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: HF.b, fontSize: 13, color: HOS.parch }}>{l.name}</div>
                  <div style={{ fontFamily: HF.m, fontSize: 11, color: HOS.gold, marginTop: 2 }}>{money(l.price * l.q)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', background: HOS.surf, borderRadius: 16, border: `1px solid ${HOS.bord}` }}>
                  <button onClick={() => setQ(l.id, l.q - 1)} style={{ width: 28, height: 30, background: 'none', border: 'none', color: HOS.ter, fontSize: 17, cursor: 'pointer' }}>−</button>
                  <span style={{ fontFamily: HF.b, fontSize: 13, fontWeight: 700, color: HOS.parch, minWidth: 16, textAlign: 'center' }}>{l.q}</span>
                  <button onClick={() => setQ(l.id, l.q + 1)} style={{ width: 28, height: 30, background: 'none', border: 'none', color: HOS.ter, fontSize: 17, cursor: 'pointer' }}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {ticket.length > 0 && !charged && (
          <div style={{ padding: 18, borderTop: `1px solid ${HOS.bord}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: HF.b, fontSize: 12.5, color: HOS.wheat, opacity: 0.7, marginBottom: 5 }}><span>Subtotal</span><span style={{ fontFamily: HF.m }}>{money(sub)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: HF.b, fontSize: 12.5, color: HOS.wheat, opacity: 0.5, marginBottom: 10 }}><span>Tax</span><span style={{ fontFamily: HF.m }}>{money(tax)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 10, borderTop: `1px solid ${HOS.bord}`, marginBottom: 14 }}>
              <span style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch }}>Total</span>
              <span style={{ fontFamily: HF.d, fontSize: 24, color: HOS.gold, fontWeight: 500 }}>{money(total)}</span>
            </div>
            <button onClick={() => setCharged(true)} style={{ width: '100%', background: HOS.ter, color: '#fff', border: 'none', borderRadius: 12, padding: 15, fontFamily: HF.l, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 22px rgba(192,98,42,0.4)' }}>Charge {money(total)}</button>
          </div>
        )}
        {charged && (
          <div style={{ padding: 18, borderTop: `1px solid ${HOS.bord}` }}>
            <button onClick={() => { setTicket([]); setCharged(false); }} style={{ width: '100%', background: HOS.surf, color: HOS.parch, border: `1px solid ${HOS.bordM}`, borderRadius: 12, padding: 14, fontFamily: HF.l, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer' }}>New Ticket</button>
          </div>
        )}
      </DeskCard>
    </div>
  );
}

Object.assign(window, { POSTerminal });
