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

      {current && <MemberProgress current={current} />}

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
      <div style={{ textAlign: 'center', fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.4, marginTop: 16, padding: '0 30px', lineHeight: 1.5 }}>Demo membership · no payment processed. Discount applies instantly at checkout.</div>

      <GiftCardSection />
    </div>
  );
}

// ── Gift cards (native — no plugin) ──────────────────────────────────────────

function GiftCardSection() {
  const s = useHall();
  const [amount, setAmount] = React.useState(50);
  const [recipient, setRecipient] = React.useState('');
  const cards = s.giftCards || [];

  return (
    <div style={{ marginTop: 28, padding: '0 18px' }}>
      <div style={{ fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 10 }}>Gift cards</div>
      <div style={{ padding: 16, background: HOS.panel, border: `1px solid ${HOS.bord}`, borderRadius: 14 }}>
        <div style={{ fontFamily: HF.d, fontSize: 18, color: HOS.parch, marginBottom: 4 }}>Send a Hall gift card</div>
        <div style={{ fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.6, lineHeight: 1.5, marginBottom: 14 }}>Spendable at any stall and the bar. No plugin — built into the operating system.</div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          {GIFT_CARD_AMOUNTS.map(a => (
            <button key={a} onClick={() => setAmount(a)} style={{ flex: '1 1 60px', padding: '10px 6px', background: amount === a ? HOS.gold : HOS.surf, border: `1px solid ${amount === a ? HOS.gold : HOS.bord}`, borderRadius: 10, color: amount === a ? '#241a0e' : HOS.parch, fontFamily: HF.d, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>${a}</button>
          ))}
        </div>

        <input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Recipient name (or yourself)" style={{ width: '100%', padding: '10px 12px', background: HOS.surf, border: `1px solid ${HOS.bord}`, borderRadius: 10, color: HOS.parch, fontFamily: HF.b, fontSize: 13, marginBottom: 10, outline: 'none' }} />

        <button onClick={() => { actions.buyGiftCard(amount, recipient || 'Self'); setRecipient(''); }} style={{ width: '100%', padding: '12px', background: HOS.ter, color: '#fff', border: 'none', borderRadius: 10, fontFamily: HF.l, fontSize: 11.5, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>Issue gift card · ${amount}</button>
      </div>

      {cards.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, padding: '2px 2px 4px' }}>Your wallet ({cards.length})</div>
          {cards.map(gc => (
            <div key={gc.id} style={{ padding: '10px 12px', background: `linear-gradient(125deg, ${HOS.gold}22, ${HOS.panel})`, border: `1px solid ${HOS.bord}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: HOS.gold, color: '#241a0e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HF.d, fontWeight: 700 }}>$</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: HF.m, fontSize: 12.5, color: HOS.parch, fontWeight: 600 }}>{gc.code}</div>
                <div style={{ fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.55 }}>For {gc.recipient} · {money(gc.balance)} of {money(gc.original)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { LoyaltyScreen, GiftCardSection });

// ── Member progress: KPIs, next reward, redemption ledger ─────────────────────

const MEMBER_LEDGER = [
  { id: 'r1', icon: '◇', label: '10% off · Yazzie order',         when: 'Yesterday',    delta: '-$3.20' },
  { id: 'r2', icon: '◇', label: '10% off · Seoul Fire Chicken',   when: 'May 27',       delta: '-$1.85' },
  { id: 'r3', icon: '★', label: 'Members-only pour · Stone Fruit', when: 'May 24',      delta: 'Free' },
  { id: 'r4', icon: '◇', label: '10% off · Bar tab',              when: 'May 22',       delta: '-$2.40' },
  { id: 'r5', icon: '✦', label: 'Early access · Hatch Pairing Dinner', when: 'May 18',  delta: 'Booked' },
];

function MemberProgress({ current }) {
  // Synthetic but coherent: visits-this-month and savings-to-date scale loosely with tier
  const tierIndex = CLUB_TIERS.findIndex(t => t.id === current.id);
  const visits = 6 + tierIndex * 3;          // 6 / 9 / 12
  const goal   = 10 + tierIndex * 5;         // 10 / 15 / 20
  const savedYTD = 84 + tierIndex * 72;      // $84 / $156 / $228
  const pct = Math.min(100, Math.round((visits / goal) * 100));
  const nextTier = CLUB_TIERS[tierIndex + 1];
  const nextReward = nextTier
    ? `Bonus pairing flight at ${visits}/${goal} visits`
    : `Reserve cellar drop at ${visits}/${goal} visits`;

  return (
    <div style={{ margin: '18px 18px 0', padding: 16, background: HOS.panel, border: `1px solid ${HOS.bord}`, borderRadius: 14 }}>
      <div style={{ fontFamily: HF.l, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 12 }}>Your progress</div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div style={{ border: `1px solid ${HOS.bordS}`, padding: '10px 12px', borderRadius: 10 }}>
          <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>Visits this month</div>
          <div style={{ fontFamily: HF.d, fontSize: 22, color: HOS.parch, marginTop: 2, lineHeight: 1 }}>{visits} <span style={{ fontSize: 13, color: HOS.wheat, opacity: 0.45 }}>/ {goal}</span></div>
        </div>
        <div style={{ border: `1px solid ${HOS.bordS}`, padding: '10px 12px', borderRadius: 10 }}>
          <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>Saved this year</div>
          <div style={{ fontFamily: HF.d, fontSize: 22, color: current.accent, marginTop: 2, lineHeight: 1 }}>${savedYTD}</div>
        </div>
      </div>

      {/* Next reward */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ color: current.accent, fontSize: 13 }}>★</span>
        <span style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.parch, flex: 1 }}>{nextReward}</span>
        <span style={{ fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.6 }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: HOS.surf, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${current.accent}, ${HOS.gold})` }} />
      </div>

      {/* Redemption ledger */}
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${HOS.bordS}` }}>
        <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginBottom: 8 }}>Recent perks</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {MEMBER_LEDGER.map(r => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: `1px dashed ${HOS.bordS}` }}>
              <span style={{ color: current.accent, fontSize: 13, width: 14, textAlign: 'center', flexShrink: 0 }}>{r.icon}</span>
              <span style={{ fontFamily: HF.b, fontSize: 12, color: HOS.parch, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</span>
              <span style={{ fontFamily: HF.m, fontSize: 10, color: HOS.wheat, opacity: 0.5, flexShrink: 0 }}>{r.when}</span>
              <span style={{ fontFamily: HF.m, fontSize: 10.5, color: r.delta.startsWith('-') ? current.accent : HOS.gold, flexShrink: 0, minWidth: 50, textAlign: 'right' }}>{r.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MemberProgress });
