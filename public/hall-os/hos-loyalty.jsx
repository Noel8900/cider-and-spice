// hos-loyalty.jsx — Cider Club membership screen
// Depends on: hos-tokens, hos-data, hos-shell

function LoyaltyScreen() {
  const s = useHall();
  const current = CLUB_TIERS.find(t => t.id === s.member);

  return (
    <div style={{ paddingBottom: 28 }}>
      {/* Header */}
      <div style={{ position: 'relative', padding: '22px 18px 24px', background: `linear-gradient(155deg, ${HOS.gold} 0%, #a9802f 60%, ${HOS.panel} 130%)`, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 90%, rgba(255,255,255,0.2), transparent 50%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(30,23,16,0.7)', marginBottom: 6 }}>Cider &amp; Spice</div>
          <div style={{ fontFamily: HF.d, fontSize: 32, fontWeight: 600, color: '#241a0e', lineHeight: 1 }}>The Cider Club</div>
          <div style={{ fontFamily: HF.b, fontSize: 13, color: 'rgba(30,23,16,0.78)', marginTop: 7, maxWidth: 270, lineHeight: 1.5 }}>Members save on every order, taste reserve pours, and get into pairing dinners first.</div>
        </div>
      </div>

      {/* Active membership card */}
      {current && (
        <div style={{ margin: '16px 18px 4px', padding: 16, borderRadius: 16, background: `linear-gradient(135deg, ${current.accent}, ${current.accent}88)`, position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(255,255,255,0.22), transparent 45%)' }} />
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>Active Member</div>
              <div style={{ fontFamily: HF.d, fontSize: 26, fontWeight: 600, color: '#fff', marginTop: 3 }}>{current.name}</div>
              <div style={{ fontFamily: HF.b, fontSize: 12.5, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>{Math.round(memberDiscount(current.id) * 100)}% off every order · renews monthly</div>
            </div>
            <span style={{ fontSize: 30 }}>{current.glyph}</span>
          </div>
          <button onClick={() => actions.leave()} style={{ position: 'relative', marginTop: 14, background: 'rgba(18,13,8,0.25)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 20, padding: '7px 16px', fontFamily: HF.l, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Cancel membership</button>
        </div>
      )}

      {/* Tiers */}
      <div style={{ padding: '16px 18px 0', fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>{current ? 'Change tier' : 'Choose a tier'}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 18px 0' }}>
        {CLUB_TIERS.map(tier => {
          const active = s.member === tier.id;
          return (
            <div key={tier.id} style={{ border: `1px solid ${active ? tier.accent : tier.popular ? 'rgba(192,98,42,0.4)' : HOS.bord}`, borderRadius: 16, overflow: 'hidden', background: HOS.panel, position: 'relative' }}>
              {tier.popular && !active && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: HOS.ter, color: '#fff', fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 12px', borderBottomLeftRadius: 10 }}>Most popular</div>
              )}
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24, color: tier.accent }}>{tier.glyph}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: HF.d, fontSize: 20, color: HOS.parch, lineHeight: 1 }}>{tier.name}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: HF.d, fontSize: 26, color: tier.accent, fontWeight: 500 }}>${tier.price}</span>
                    <span style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>/mo</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
                  {tier.perks.map(p => (
                    <div key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: tier.accent, fontSize: 11, flexShrink: 0, marginTop: 2 }}>◈</span>
                      <span style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.wheat, opacity: 0.72, lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => active ? actions.leave() : actions.join(tier.id)} style={{ width: '100%', background: active ? 'transparent' : tier.accent, color: active ? tier.accent : '#fff', border: `1px solid ${tier.accent}`, borderRadius: 12, padding: '12px', fontFamily: HF.l, fontSize: 11.5, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
                  {active ? 'Current Plan' : `Join ${tier.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <LoyaltyFeatureStack />
      <div style={{ textAlign: 'center', fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.4, marginTop: 16, padding: '0 30px', lineHeight: 1.5 }}>Demo membership · no payment processed. Discount applies instantly at checkout.</div>
    </div>
  );
}

function LoyaltyFeatureStack() {
  return (
    <>
      <div style={{ padding: '18px 18px 0', fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>Rewards OS</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '12px 18px 0' }}>
        {LOYALTY_PROGRAMS.map(p => (
          <div key={p.label} style={{ background: HOS.panel, border: `1px solid ${HOS.bord}`, borderRadius: 14, padding: 13 }}>
            <div style={{ fontFamily: HF.d, fontSize: 21, color: HOS.gold, lineHeight: 1 }}>{p.value}</div>
            <div style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.parch, marginTop: 5 }}>{p.label}</div>
            <div style={{ fontFamily: HF.b, fontSize: 10.8, color: HOS.wheat, opacity: 0.58, lineHeight: 1.45, marginTop: 5 }}>{p.detail}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '18px 18px 0', fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>Promotions + gift cards</div>
      <div style={{ padding: '12px 18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PROMOTIONS.map(p => (
          <div key={p.code} style={{ background: HOS.panel, border: `1px solid ${p.status === 'Live' ? 'rgba(107,140,107,0.35)' : HOS.bord}`, borderRadius: 14, padding: 13, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: HF.m, fontSize: 10, color: HOS.gold }}>{p.code}</div>
              <div style={{ fontFamily: HF.b, fontSize: 13, color: HOS.parch, marginTop: 3 }}>{p.name}</div>
              <div style={{ fontFamily: HF.b, fontSize: 11, color: HOS.wheat, opacity: 0.55, marginTop: 2 }}>{p.type}</div>
            </div>
            <Pill tone={p.status === 'Live' ? 'green' : 'gold'}>{p.status}</Pill>
          </div>
        ))}
        {GIFT_CARDS.map(card => (
          <div key={card.id} style={{ background: `linear-gradient(135deg, ${HOS.surf}, ${HOS.panel})`, border: `1px solid ${HOS.bordM}`, borderRadius: 14, padding: 13, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 28, borderRadius: 8, background: HOS.gold, color: HOS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HF.m, fontSize: 10, fontWeight: 700 }}>GC</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: HF.b, fontSize: 13, color: HOS.parch }}>{card.holder}</div>
              <div style={{ fontFamily: HF.m, fontSize: 10, color: HOS.wheat, opacity: 0.52 }}>{card.id} - {card.status}</div>
            </div>
            <div style={{ fontFamily: HF.d, fontSize: 20, color: HOS.gold }}>{money(card.balance)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

Object.assign(window, { LoyaltyScreen, LoyaltyFeatureStack });
