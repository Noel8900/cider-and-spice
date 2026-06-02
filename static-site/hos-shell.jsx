// hos-shell.jsx — App frame, persona switcher, phone device, screen router
// Depends on: hos-tokens, hos-data

// ── Phone device frame ────────────────────────────────────────────────────────

const PHONE_W = 392;
const PHONE_H = 844;

function PhoneFrame({ children, tabBar }) {
  const scale = useFit(PHONE_H + 40, 120);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '24px 0 40px' }}>
      <div style={{ width: PHONE_W * scale, height: (PHONE_H) * scale, position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, transformOrigin: 'top left', transform: `scale(${scale})`,
          width: PHONE_W, height: PHONE_H,
          background: HOS.bg, borderRadius: 46, border: `1px solid ${HOS.bordM}`,
          boxShadow: '0 0 0 9px #120d08, 0 0 0 10px #2a2114, 0 36px 80px rgba(0,0,0,0.6)',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          {/* Status bar */}
          <div style={{ height: 50, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', paddingTop: 10, position: 'relative', zIndex: 5 }}>
            <span style={{ fontFamily: HF.b, fontSize: 13, fontWeight: 600, color: HOS.parch }}>9:41</span>
            <div style={{ position: 'absolute', left: '50%', top: 9, transform: 'translateX(-50%)', width: 108, height: 26, background: '#000', borderRadius: 14 }} />
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: HOS.parch }}>
              <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
              <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><path d="M8 2.5c2 0 3.8.8 5.2 2.1l1.1-1.2A9.4 9.4 0 0 0 8 .8 9.4 9.4 0 0 0 1.7 3.4l1.1 1.2A7.4 7.4 0 0 1 8 2.5z" opacity="0.9"/><path d="M8 6c1 0 2 .4 2.7 1.1l1.1-1.2A5.5 5.5 0 0 0 8 4.2c-1.5 0-2.9.6-3.8 1.7l1.1 1.2A3.7 3.7 0 0 1 8 6z"/><circle cx="8" cy="9.2" r="1.5"/></svg>
              <div style={{ width: 24, height: 12, border: `1px solid ${HOS.parch}`, borderRadius: 3, opacity: 0.85, position: 'relative', padding: 1.5 }}>
                <div style={{ width: '72%', height: '100%', background: HOS.parch, borderRadius: 1 }} />
                <div style={{ position: 'absolute', right: -3, top: 3.5, width: 2, height: 5, background: HOS.parch, borderRadius: 1 }} />
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div id="hos-phone-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
            {children}
          </div>

          {/* Tab bar */}
          {tabBar}
        </div>
      </div>
    </div>
  );
}

// ── Bottom tab bar (customer) ─────────────────────────────────────────────────

function CustTabBar({ screen, cartCount }) {
  const tabs = [
    { id: 'browse',    label: 'Hall',      icon: 'grid' },
    { id: 'concierge', label: 'Concierge', icon: 'spark' },
    { id: 'community', label: 'Events',    icon: 'cal' },
    { id: 'loyalty',   label: 'Club',      icon: 'star' },
  ];
  const isActive = (id) => screen === id || (id === 'browse' && (screen === 'vendor'));
  return (
    <div style={{ flexShrink: 0, height: 78, background: 'rgba(18,13,8,0.96)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'flex-start', paddingTop: 10, position: 'relative' }}>
      {tabs.map(t => {
        const active = isActive(t.id);
        return (
          <button key={t.id} onClick={() => actions.go(t.id)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, color: active ? HOS.ter : HOS.wheat, opacity: active ? 1 : 0.42, transition: 'all 0.2s' }}>
            <TabIcon name={t.icon} active={active} />
            <span style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: active ? 600 : 400 }}>{t.label}</span>
          </button>
        );
      })}
      {/* Floating cart */}
      {cartCount > 0 && (
        <button onClick={() => actions.go('checkout')} style={{ position: 'absolute', right: 16, top: -26, width: 54, height: 54, borderRadius: '50%', background: HOS.ter, border: `3px solid ${HOS.bg}`, cursor: 'pointer', boxShadow: '0 8px 22px rgba(192,98,42,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: HOS.parch }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 20, height: 20, padding: '0 5px', borderRadius: 10, background: HOS.gold, color: '#3a2410', fontFamily: HF.b, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${HOS.bg}` }}>{cartCount}</span>
        </button>
      )}
    </div>
  );
}

function TabIcon({ name, active }) {
  const sw = active ? 2.2 : 1.8;
  const common = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (name === 'grid')  return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (name === 'spark') return <svg {...common}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>;
  if (name === 'cal')   return <svg {...common}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>;
  if (name === 'star')  return <svg {...common}><path d="M12 2l2.9 6.3 6.6.6-5 4.4 1.5 6.5L12 16.9 6 19.8l1.5-6.5-5-4.4 6.6-.6z"/></svg>;
  return null;
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ position: 'absolute', bottom: 92, left: '50%', transform: 'translateX(-50%)', background: HOS.surf2, border: `1px solid ${HOS.bordM}`, color: HOS.parch, fontFamily: HF.b, fontSize: 13, padding: '10px 18px', borderRadius: 30, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 50, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: HOS.ter }}>✓</span>{msg}
    </div>
  );
}

// ── Persona switcher (top chrome) ─────────────────────────────────────────────

function PersonaBar({ persona }) {
  const personas = [
    { id: 'customer', label: 'Customer App',     sub: 'Order & discover' },
    { id: 'vendor',   label: 'Vendor Stall',     sub: 'Kitchen dashboard' },
    { id: 'operator', label: 'Operator Console',  sub: 'Hall management' },
    { id: 'pos',      label: 'POS Terminal',      sub: 'Counter service' },
  ];
  return (
    <div style={{ borderBottom: `1px solid ${HOS.bord}`, background: 'rgba(18,13,8,0.92)', backdropFilter: 'blur(14px)', position: 'sticky', top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        {/* Brand — click to return to intro */}
        <button onClick={() => actions.goHome()} title="Back to intro" style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, background: 'transparent', border: 0, padding: 0, cursor: 'pointer', color: 'inherit', textAlign: 'left' }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(140deg, ${HOS.ter}, ${HOS.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HF.d, fontSize: 19, fontStyle: 'italic', color: '#1e1710', fontWeight: 600 }}>&amp;</div>
          <div>
            <div style={{ fontFamily: HF.d, fontSize: 17, color: HOS.parch, lineHeight: 1 }}>Hall <span style={{ fontStyle: 'italic', color: HOS.ter }}>OS</span></div>
            <div style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.26em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.4, marginTop: 2 }}>Cider &amp; Spice · Las Cruces</div>
          </div>
        </button>

        {/* Persona tabs */}
        <div style={{ display: 'flex', gap: 3, background: HOS.panel, padding: 4, borderRadius: 12, border: `1px solid ${HOS.bord}` }}>
          {personas.map(p => {
            const active = persona === p.id;
            return (
              <button key={p.id} onClick={() => actions.setPersona(p.id)} title={p.sub} style={{ background: active ? HOS.surf2 : 'transparent', border: active ? `1px solid ${HOS.bordM}` : '1px solid transparent', borderRadius: 9, padding: '8px 16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', minWidth: 0 }}>
                <div style={{ fontFamily: HF.b, fontSize: 12.5, fontWeight: 600, color: active ? HOS.parch : HOS.wheat, opacity: active ? 1 : 0.6, whiteSpace: 'nowrap' }}>{p.label}</div>
                <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: active ? HOS.ter : HOS.wheat, opacity: active ? 0.85 : 0.32, marginTop: 1, whiteSpace: 'nowrap' }}>{p.sub}</div>
              </button>
            );
          })}
        </div>

        <div style={{ flexShrink: 0, fontFamily: HF.m, fontSize: 10.5, color: HOS.wheat, opacity: 0.32, letterSpacing: '0.05em' }}>
          <span style={{ color: HOS.green }}>●</span> Live demo · seed data
        </div>
      </div>
    </div>
  );
}

// ── Customer router (inside phone) ────────────────────────────────────────────

function CustomerApp() {
  const s = useHall();
  const totals = cartTotals(s.cart, s.member);
  let screen;
  switch (s.screen) {
    case 'browse':    screen = <CustomerBrowse />; break;
    case 'vendor':    screen = <VendorMenu vendorId={s.activeVendor} />; break;
    case 'concierge': screen = <Concierge />; break;
    case 'checkout':  screen = <CheckoutScreen />; break;
    case 'tracking':  screen = <TrackingScreen />; break;
    case 'loyalty':   screen = <LoyaltyScreen />; break;
    case 'community': screen = <CommunityScreen />; break;
    default:          screen = <CustomerBrowse />;
  }
  return (
    <PhoneFrame tabBar={<CustTabBar screen={s.screen} cartCount={totals.count} />}>
      {screen}
      <Toast msg={s.toast} />
    </PhoneFrame>
  );
}

Object.assign(window, { PhoneFrame, CustTabBar, Toast, PersonaBar, CustomerApp, PHONE_W, PHONE_H });
