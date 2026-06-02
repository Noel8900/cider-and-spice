// hos-checkout.jsx — Unified multi-stall cart + checkout
// Depends on: hos-tokens, hos-data, hos-shell, hos-flow

function CheckoutScreen() {
  const s = useHall();
  const [pickup, setPickup] = React.useState('asap');
  const totals = cartTotals(s.cart, s.member);
  const giftCards = s.giftCards || [];

  // Group cart lines by vendor
  const groups = {};
  s.cart.forEach(l => { (groups[l.vendorId] = groups[l.vendorId] || []).push(l); });
  const groupIds = Object.keys(groups);

  if (!s.cart.length) {
    return (
      <div>
        <CustHeader title="Your Order" sub="Cart" onBack={() => actions.go('browse')} />
        <div style={{ padding: '70px 30px', textAlign: 'center' }}>
          <div style={{ fontSize: 46, marginBottom: 16, opacity: 0.5 }}>🛒</div>
          <div style={{ fontFamily: HF.d, fontSize: 22, color: HOS.parch, marginBottom: 8 }}>Your cart is empty</div>
          <p style={{ fontFamily: HF.b, fontSize: 13.5, color: HOS.wheat, opacity: 0.55, lineHeight: 1.6, marginBottom: 22 }}>Browse the kitchens or ask the concierge to build you an order across every stall.</p>
          <button onClick={() => actions.go('browse')} style={{ background: HOS.ter, color: '#fff', border: 'none', borderRadius: 26, padding: '13px 30px', fontFamily: HF.l, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer' }}>Browse the Hall</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 20 }}>
      <CustHeader title="Your Order" sub={`${totals.count} items · ${groupIds.length} ${groupIds.length === 1 ? 'stall' : 'stalls'}`} onBack={() => actions.go('browse')} />

      {/* One cart, many stalls banner */}
      <div style={{ margin: '14px 18px', padding: '11px 14px', background: HOS.terDim, border: `1px solid rgba(192,98,42,0.25)`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: HOS.ter, fontSize: 16 }}>✦</span>
        <span style={{ fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.85, lineHeight: 1.45 }}>One cart across {groupIds.length} kitchens — we time everything to a single pickup.</span>
      </div>

      {/* Vendor groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 18px', marginBottom: 18 }}>
        {groupIds.map(vid => {
          const v = vendorById(vid);
          const lines = groups[vid];
          return (
            <div key={vid} style={{ border: `1px solid ${HOS.bord}`, borderRadius: 14, overflow: 'hidden', background: HOS.panel }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', borderBottom: `1px solid ${HOS.bordS}` }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.color }} />
                <span style={{ fontFamily: HF.d, fontSize: 16, color: HOS.parch }}>{v.name}</span>
                <span style={{ marginLeft: 'auto', fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.45 }}>Stall {v.stall} · {v.prep}m</span>
              </div>
              {lines.map(l => (
                <div key={l.lineId} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: HF.b, fontSize: 13.5, color: HOS.parch, fontWeight: 500 }}>{l.name}</div>
                    <div style={{ fontFamily: HF.m, fontSize: 11.5, color: HOS.gold, marginTop: 2 }}>{money(l.price)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', background: HOS.surf, borderRadius: 18, border: `1px solid ${HOS.bord}` }}>
                    <button onClick={() => actions.setQty(l.lineId, l.qty - 1)} style={{ width: 30, height: 32, background: 'none', border: 'none', color: HOS.ter, fontSize: 18, cursor: 'pointer' }}>−</button>
                    <span style={{ fontFamily: HF.b, fontSize: 13, fontWeight: 700, color: HOS.parch, minWidth: 18, textAlign: 'center' }}>{l.qty}</span>
                    <button onClick={() => actions.setQty(l.lineId, l.qty + 1)} style={{ width: 30, height: 32, background: 'none', border: 'none', color: HOS.ter, fontSize: 18, cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Cross-sell */}
      <CrossSell />

      {/* Pickup */}
      <div style={{ padding: '0 18px', marginBottom: 18 }}>
        <div style={{ fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 9 }}>Pickup time</div>
        <PickupSelector value={pickup} onChange={setPickup} />
      </div>

      {/* Member nudge / discount line */}
      {s.member ? (
        <div style={{ margin: '0 18px 14px', padding: '10px 14px', background: 'rgba(107,140,107,0.12)', border: `1px solid rgba(107,140,107,0.3)`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ color: HOS.greenLt }}>◈</span>
          <span style={{ fontFamily: HF.b, fontSize: 12, color: HOS.greenLt }}>Cider Club {Math.round(memberDiscount(s.member) * 100)}% discount applied</span>
        </div>
      ) : (
        <button onClick={() => actions.go('loyalty')} style={{ margin: '0 18px 14px', width: 'calc(100% - 36px)', padding: '11px 14px', background: 'rgba(212,168,75,0.1)', border: `1px solid rgba(212,168,75,0.3)`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}>
          <span style={{ color: HOS.gold }}>★</span>
          <span style={{ fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.85, textAlign: 'left' }}>Join the Cider Club — save up to 20% on this order</span>
          <span style={{ marginLeft: 'auto', color: HOS.gold }}>→</span>
        </button>
      )}

      {/* Hall promotion (auto-detected) */}
      {totals.promo && (
        <div style={{ margin: '0 18px 14px', padding: '11px 14px', background: 'rgba(212,168,75,0.10)', border: `1px solid rgba(212,168,75,0.32)`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ color: HOS.gold }}>%</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.parch, fontWeight: 600 }}>{totals.promo.label} applied</div>
            <div style={{ fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.55 }}>{totals.promo.desc}</div>
          </div>
          <span style={{ fontFamily: HF.d, fontSize: 14, color: HOS.gold }}>−{money(totals.promoDisc)}</span>
        </div>
      )}

      {/* Gift card */}
      {giftCards.length > 0 && (
        <div style={{ padding: '0 18px', marginBottom: 14 }}>
          <div style={{ fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 8 }}>Gift card</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {giftCards.map(gc => {
              const on = s.appliedGift === gc.id;
              return (
                <button key={gc.id} onClick={() => on ? actions.clearGiftCard() : actions.applyGiftCard(gc.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: on ? 'rgba(192,98,42,0.12)' : HOS.surf, border: `1px solid ${on ? HOS.ter : HOS.bord}`, borderRadius: 10, cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ width: 26, height: 26, borderRadius: 6, background: HOS.gold, color: '#241a0e', fontFamily: HF.d, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>$</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: HF.m, fontSize: 12, color: HOS.parch, fontWeight: 600 }}>{gc.code}</div>
                    <div style={{ fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.55 }}>Balance {money(gc.balance)}</div>
                  </div>
                  <span style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: on ? HOS.ter : HOS.wheat, opacity: on ? 1 : 0.5 }}>{on ? 'Applied' : 'Apply'}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Totals */}
      <div style={{ padding: '0 18px', marginBottom: 8 }}>
        <Row label="Subtotal" val={money(totals.sub)} />
        {totals.disc > 0 && <Row label="Club discount" val={`−${money(totals.disc)}`} accent={HOS.greenLt} />}
        {totals.promoDisc > 0 && <Row label={`Promo · ${totals.promo.label}`} val={`−${money(totals.promoDisc)}`} accent={HOS.gold} />}
        <Row label="Tax (8.125%)" val={money(totals.tax)} dim />
        {totals.giftApplied > 0 && <Row label={`Gift · ${totals.gift.code}`} val={`−${money(totals.giftApplied)}`} accent={HOS.gold} />}
        <div style={{ height: 1, background: HOS.bord, margin: '8px 0' }} />
        <Row label="Total" val={money(totals.total)} big />
      </div>

      {/* Place order */}
      <div style={{ padding: '12px 18px 0' }}>
        <button onClick={() => actions.placeOrder({ pickup })} style={{ width: '100%', background: HOS.ter, color: '#fff', border: 'none', borderRadius: 14, padding: '16px', fontFamily: HF.l, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 22px rgba(192,98,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          Place Order · {money(totals.total)}
        </button>
        <div style={{ textAlign: 'center', fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.4, marginTop: 10 }}>Demo checkout · no payment processed</div>
      </div>
    </div>
  );
}

function Row({ label, val, big, dim, accent }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '4px 0' }}>
      <span style={{ fontFamily: big ? HF.d : HF.b, fontSize: big ? 19 : 13, color: big ? HOS.parch : HOS.wheat, opacity: dim ? 0.5 : big ? 1 : 0.8 }}>{label}</span>
      <span style={{ fontFamily: big ? HF.d : HF.m, fontSize: big ? 21 : 13, color: accent || (big ? HOS.gold : HOS.parch), fontWeight: big ? 500 : 400 }}>{val}</span>
    </div>
  );
}

Object.assign(window, { CheckoutScreen });
