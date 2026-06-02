// hos-walkthrough.jsx — Hall OS Walkthrough v3
// Portal model: module grid home → click any surface → full-screen view
// Depends on: tweaks-panel, hos-tokens, hos-data, hos-shell,
//             hos-customer, hos-vendor, hos-operator, hos-pos

// ── Module grid data ──────────────────────────────────────────────────────────
// wt: surface id to open inline (null = link externally)
const WM_SECTIONS = [
  {
    label: 'Operations',
    cards: [
      { role: 'Vendor · Desktop',      title: 'Vendor Dashboard',   href: 'Hall OS Vendor Dashboard.html', band: `linear-gradient(90deg,${HOS.ter},${HOS.gold})`, desc: 'Full vendor console — live order queue, menu management, daily sales, and analytics.', tags: ['Order queue','Menu editor','Analytics'], wt: 'pos' },
      { role: 'Vendor · Mobile',        title: 'Vendor Mobile App',  href: 'Hall OS Vendor Mobile.html',  band: HOS.ter,   desc: "Phone companion for vendors on the floor. Manage orders, 86 items, and check today\u2019s stats.", tags: ['Live queue','86 toggle','Stats'], wt: 'vendor' },
      { role: 'Shared · Wall Display',  title: 'Order Status Board', href: 'Hall OS Status Board.html',   band: HOS.green, desc: 'Wall-mounted screen vendors and customers both watch. Orders cycle live through preparing, ready, and picked up.', tags: ['Auto-advance','Live timers','Ticker'], wt: null },
      { role: 'Customer · Kiosk',       title: 'Order Kiosk',        href: 'Hall OS Kiosk.html',          band: HOS.gold,  desc: 'The customer-facing ordering surface. Browse every stall, build a cart across vendors, and place a single order.', tags: ['Multi-vendor cart','Tax calc','Confirmation'], wt: 'customer' },
    ],
  },
  {
    label: 'Management',
    cards: [
      { role: 'Landlord · Admin',           title: 'Admin Console',  href: 'Hall OS Admin.html',     band: `linear-gradient(90deg,${HOS.gold},${HOS.ter})`, desc: 'Landlord view across all vendors — occupancy map, sales heatmap, license renewals, and live alerts.', tags: ['Occupancy map','Heatmap','Alerts'], wt: 'operator' },
      { role: 'Landlord · Analytics',       title: 'Analytics',      href: 'Hall OS Analytics.html', band: HOS.ter,   desc: 'Deep-dive reporting — week-over-week comps, vendor revenue share, peak hour heatmap, and foot traffic forecast.', tags: ['WoW revenue','Rev share','Forecast'], wt: null },
      { role: 'Vendor + Landlord · Finance','title': 'Finance Portal', href: 'Hall OS Finance.html',   band: HOS.green, desc: 'Vendor P&L, payout history, and rent schedule — plus the full landlord rent roll with overdue tracking.', tags: ['P&L','Rent roll','Payouts'], wt: null },
    ],
  },
  {
    label: 'Customer & Vendor Experience',
    cards: [
      { role: 'Customer · Loyalty', title: 'Loyalty & Tab',      href: 'Hall OS Loyalty.html',    band: `linear-gradient(90deg,${HOS.gold},rgba(212,168,75,0.4))`, desc: 'Scan-to-pay QR, running tab across all stalls, per-vendor punch cards, and member management.', tags: ['QR code','Running tab','Punch cards'], wt: null },
      { role: 'Vendor · Setup',     title: 'Vendor Onboarding', href: 'Hall OS Onboarding.html', band: 'rgba(196,98,45,0.55)',                                      desc: 'New vendor setup wizard — profile, menu builder, hours, payout connection, and digital license agreement.', tags: ['6-step wizard','Menu builder','License agreement'], wt: null },
    ],
  },
];

// ── Welcome mosaic (used by Hall OS Index — keep intact) ──────────────────────
function WelcomeMosaic() {
  const [hovered, setHovered] = React.useState(null);
  return (
    <div style={{ background: HOS.bg, minHeight: '100%' }}>
      <div style={{ padding: '44px 36px 36px', borderBottom: `1px solid ${HOS.bord}`, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 24 }}>
        <div>
          <div style={{ fontFamily: HF.l, fontSize: 9, letterSpacing: '0.30em', textTransform: 'uppercase', color: HOS.ter, marginBottom: 12 }}>Cider &amp; Spice Food Hall · Las Cruces, NM</div>
          <h1 style={{ fontFamily: HF.d, fontSize: 'clamp(40px,5vw,64px)', fontWeight: 300, lineHeight: 1, margin: '0 0 14px', color: HOS.parch }}>Hall <em style={{ fontStyle: 'italic', color: HOS.ter }}>OS</em></h1>
          <p style={{ fontFamily: HF.b, fontSize: 14, lineHeight: 1.65, color: 'rgba(245,236,215,0.54)', maxWidth: 520, margin: 0, textWrap: 'pretty' }}>The operating system for the hall — connecting vendors, customers, management, and the floor in real time.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
          {[['3','Active stalls'],['$18,470','Revenue today'],['75%','Occupancy']].map(([v,l]) => (
            <div key={l} style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: HF.d, fontSize: 32, color: HOS.gold, fontWeight: 300, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.30)', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {WM_SECTIONS.map(sec => (
        <div key={sec.label}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 36px 10px' }}>
            <span style={{ fontFamily: HF.l, fontSize: 9, letterSpacing: '0.30em', textTransform: 'uppercase', color: HOS.gold }}>{sec.label}</span>
            <span style={{ flex: 1, height: 1, background: HOS.bordS }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 1, background: HOS.bordS, borderTop: `1px solid ${HOS.bordS}`, borderBottom: `1px solid ${HOS.bord}` }}>
            {sec.cards.map(c => {
              const isHov = hovered === c.href;
              return (
                <a key={c.href} href={c.href} onMouseEnter={() => setHovered(c.href)} onMouseLeave={() => setHovered(null)}
                  style={{ background: isHov ? '#1a1108' : HOS.panel, display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', transition: 'background 0.18s' }}>
                  <div style={{ height: 3, flexShrink: 0, background: c.band }} />
                  <div style={{ padding: '20px 22px 18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    <span style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.36)' }}>{c.role}</span>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontFamily: HF.d, fontSize: 22, color: HOS.parch, lineHeight: 1.1 }}>{c.title}</span>
                      <span style={{ fontSize: 16, color: isHov ? HOS.ter : 'rgba(245,236,215,0.30)', flexShrink: 0, marginTop: 3, transition: 'color 0.18s, transform 0.18s', transform: isHov ? 'translateX(3px)' : 'none' }}>→</span>
                    </div>
                    <p style={{ fontFamily: HF.b, fontSize: 12, color: 'rgba(245,236,215,0.54)', lineHeight: 1.55, flex: 1, margin: 0, textWrap: 'pretty' }}>{c.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {c.tags.map(t => <span key={t} style={{ fontFamily: HF.l, fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 8px', border: `1px solid ${HOS.bord}`, color: 'rgba(245,236,215,0.36)' }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ padding: '9px 22px 12px', borderTop: `1px solid ${HOS.bordS}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: HF.m, fontSize: 9.5, color: 'rgba(245,236,215,0.28)' }}>{c.href}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: HF.m, fontSize: 9.5, color: HOS.green }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: HOS.green }} />Live</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ))}
      <div style={{ padding: '16px 36px 36px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: HF.m, fontSize: 10, color: 'rgba(245,236,215,0.40)' }}>shared store</span>
        <span style={{ flex: 1, height: 1, background: HOS.bord, minWidth: 24 }} />
        {['orders','inventory','loyalty','remittance','promotions'].map(k => <span key={k} style={{ fontFamily: HF.l, fontSize: 7.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.30)', border: `1px solid ${HOS.bordS}`, padding: '3px 8px' }}>{k}</span>)}
        <span style={{ flex: 1, height: 1, background: HOS.bord, minWidth: 24 }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: HF.m, fontSize: 10, color: HOS.green }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: HOS.green, animation: 'hosPulse 2.2s ease-in-out infinite' }} />&lt; 200ms
        </span>
      </div>
    </div>
  );
}

// ── Surface metadata for guide cards ─────────────────────────────────────────
const SURFACE_GUIDES = {
  customer: {
    label: 'Customer · Kiosk',
    color: '#c0622a',
    title: 'Browse, order, pay across every stall.',
    body:  'Guests build a cross-vendor cart in a single session — one checkout, one pickup. The AI Concierge answers questions and suggests cider pairings.',
    cta:   'Add something from Yazzie or Seoul Fire, then tap the floating cart to check out.',
  },
  vendor: {
    label: 'Vendor · Mobile',
    color: '#d4a84b',
    title: "Orders land the moment they're placed.",
    body:  'The kitchen dashboard shows every ticket in real time — status, elapsed timer, and one-tap to fire or mark ready. No printers, no third-party tablets.',
    cta:   'Advance a ticket: Queued → Cooking → Ready. App orders appear marked "New".',
  },
  pos: {
    label: 'Vendor · Desktop',
    color: '#6b88a8',
    title: 'Full vendor console for the desktop.',
    body:  'Live order queue, menu management, daily sales, and analytics — all in one place for vendors who prefer desktop over mobile.',
    cta:   'Check the live order queue and try toggling an item\'s availability.',
  },
  operator: {
    label: 'Hall Console · Admin',
    color: '#8fb98f',
    title: 'The hall, at a glance.',
    body:  'Nine live KPIs, an interactive floor map, automated rent remittance, and a real-time order feed. Promotions toggle hall-wide.',
    cta:   'Check the floor map and KPI grid. Orders from the Customer surface appear in the live feed.',
  },
};

// ── Surface order for prev / next ─────────────────────────────────────────────
const SURFACE_ORDER = ['customer', 'vendor', 'pos', 'operator'];

// ── Interactive grid (portal home) — split-screen showcase ───────────────────
function WalkthroughGrid({ onSelect }) {
  const [hov, setHov] = React.useState(null);

  function PhoneMockup() {
    return (
      <div style={{ width: 200, flexShrink: 0 }}>
        <div style={{ background: '#0e0b07', borderRadius: 32, padding: '12px 6px 16px', boxShadow: '0 28px 72px rgba(0,0,0,0.7), inset 0 0 0 1.5px rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
            <div style={{ width: 64, height: 18, background: '#0e0b07', borderRadius: 9, border: '1.5px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a1510' }} />
              <div style={{ width: 24, height: 6, borderRadius: 3, background: '#1a1510' }} />
            </div>
          </div>
          <div style={{ background: '#1e1710', borderRadius: 22, overflow: 'hidden', height: 320 }}>
            <div style={{ background: HOS.ter, padding: '9px 12px 7px' }}>
              <div style={{ fontFamily: HF.l, fontSize: 6.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 2 }}>Cider &amp; Spice</div>
              <div style={{ fontFamily: HF.d, fontSize: 15, color: '#fff', lineHeight: 1 }}>Order from every stall</div>
            </div>
            <div style={{ display: 'flex', gap: 4, padding: '7px 9px' }}>
              {['All','Popular','Under $10'].map((l,i) => (
                <span key={l} style={{ fontFamily: HF.m, fontSize: 7, padding: '2px 7px', borderRadius: 20, background: i===0 ? HOS.ter : 'rgba(245,236,215,0.07)', color: i===0 ? '#fff' : 'rgba(245,236,215,0.45)', border: `1px solid ${i===0 ? HOS.ter : 'rgba(245,236,215,0.10)'}`, whiteSpace: 'nowrap' }}>{l}</span>
              ))}
            </div>
            {[['Hatch Katsu','Yazzie · A4','$14'],['Carne Asada Burrito','Rio Grande · B1','$13'],['Korean Fried Chicken','Seoul Fire · A2','$15'],['Frybread Taco','Yazzie · A4','$10']].map(([n,v,p],i) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 9px', borderBottom: '1px solid rgba(245,236,215,0.05)' }}>
                <div style={{ width: 24, height: 24, borderRadius: 5, background: [`${HOS.ter}44`,`${HOS.gold}33`,'rgba(107,136,168,0.3)','rgba(143,185,143,0.3)'][i], flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: HF.b, fontSize: 9, color: HOS.parch, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</div>
                  <div style={{ fontFamily: HF.m, fontSize: 7, color: 'rgba(245,236,215,0.32)', marginTop: 1 }}>{v}</div>
                </div>
                <div style={{ fontFamily: HF.d, fontSize: 10, color: HOS.gold, flexShrink: 0 }}>{p}</div>
              </div>
            ))}
            <div style={{ margin: '7px 9px 0', background: HOS.ter, borderRadius: 9, padding: '7px 11px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: HF.m, fontSize: 8.5, color: 'rgba(255,255,255,0.75)' }}>2 items · $27</span>
              <span style={{ fontFamily: HF.b, fontSize: 9, color: '#fff' }}>Checkout →</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
            <div style={{ width: 56, height: 3, background: 'rgba(255,255,255,0.22)', borderRadius: 2 }} />
          </div>
        </div>
      </div>
    );
  }

  function DesktopMockup() {
    return (
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ background: '#0e0b07', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 64px rgba(0,0,0,0.65), inset 0 0 0 1.5px rgba(255,255,255,0.06)' }}>
          <div style={{ background: '#181008', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {['#e74c3c','#f39c12','#2ecc71'].map(c => <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.8 }} />)}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(245,236,215,0.05)', borderRadius: 4, padding: '1px 12px', fontFamily: HF.m, fontSize: 7, color: 'rgba(245,236,215,0.30)' }}>Hall Console · hall-os.app</div>
            </div>
          </div>
          <div style={{ background: '#160f08', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '0 12px', display: 'flex', gap: 14, alignItems: 'center', height: 28 }}>
            {['Dashboard','Vendors','Analytics','Finance'].map((l,i) => (
              <span key={l} style={{ fontFamily: HF.l, fontSize: 6.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: i===0 ? HOS.ter : 'rgba(245,236,215,0.28)', borderBottom: i===0 ? `1.5px solid ${HOS.ter}` : 'none', paddingBottom: 2 }}>{l}</span>
            ))}
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 3, fontFamily: HF.m, fontSize: 7, color: HOS.green }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: HOS.green }} />Live
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            {[['$11,840','Revenue'],['312','Orders'],['88%','Occupancy'],['97%','Compliance']].map(([v,l],i) => (
              <div key={l} style={{ padding: '9px 12px', borderRight: i<3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div style={{ fontFamily: HF.l, fontSize: 6, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.28)', marginBottom: 2 }}>{l}</div>
                <div style={{ fontFamily: HF.d, fontSize: 16, color: HOS.parch, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: HF.m, fontSize: 7, color: HOS.green, marginTop: 2 }}>On target</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ padding: '9px 12px', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontFamily: HF.l, fontSize: 6, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.28)', marginBottom: 6 }}>Floor Map</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3 }}>
                {[['A1',HOS.ter],['A2',HOS.ter],['A3',HOS.ter],['B1',HOS.gold],['B2','rgba(245,236,215,0.12)'],['B3',HOS.gold],['B4','rgba(245,236,215,0.06)'],['Bar',HOS.ter]].map(([id,c]) => (
                  <div key={id} style={{ aspectRatio: '1', background: `${c}18`, border: `1px solid ${c}44`, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HF.m, fontSize: 6, color: c }}>{id}</div>
                ))}
              </div>
            </div>
            <div style={{ padding: '9px 12px' }}>
              <div style={{ fontFamily: HF.l, fontSize: 6, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.28)', marginBottom: 6 }}>Live Orders</div>
              {[['Hatch Katsu ×2','Yazzie'],['Carne Asada','Rio Grande'],['Fried Chicken','Seoul Fire']].map(([item,vendor]) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                  <div style={{ width: 3, height: 3, borderRadius: '50%', background: HOS.green, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: HF.m, fontSize: 7.5, color: HOS.parch, lineHeight: 1.2 }}>{item}</div>
                    <div style={{ fontFamily: HF.m, fontSize: 6.5, color: 'rgba(245,236,215,0.28)' }}>{vendor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const secondarySurfaces = [
    { id: 'vendor', label: 'Vendor Mobile', sub: 'Kitchen queue on the floor', color: '#d4a84b' },
    { id: 'pos',    label: 'Vendor Desktop', sub: 'Full console for the desktop', color: '#6b88a8' },
  ];

  const externalModules = [
    { label: 'Order Status Board', role: 'Shared · Wall',       href: 'Hall OS Status Board.html', band: HOS.green },
    { label: 'Analytics',          role: 'Landlord',             href: 'Hall OS Analytics.html',    band: HOS.ter },
    { label: 'Finance Portal',     role: 'Vendor + Landlord',    href: 'Hall OS Finance.html',      band: HOS.green },
    { label: 'Loyalty & Tab',      role: 'Customer',             href: 'Hall OS Loyalty.html',      band: HOS.gold },
    { label: 'Vendor Onboarding',  role: 'Vendor · Setup',       href: 'Hall OS Onboarding.html',   band: 'rgba(196,98,45,0.55)' },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: HOS.bg }}>

      {/* Hero */}
      <div style={{ padding: '20px 32px 16px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.26em', textTransform: 'uppercase', color: HOS.ter, marginBottom: 5 }}>Cider &amp; Spice · Las Cruces, NM</div>
          <h1 style={{ fontFamily: HF.d, fontSize: 'clamp(26px,3vw,40px)', fontWeight: 300, lineHeight: 1, margin: '0 0 8px', color: HOS.parch }}>Hall <em style={{ fontStyle: 'italic', color: HOS.ter }}>OS</em></h1>
          <p style={{ fontFamily: HF.b, fontSize: 11.5, lineHeight: 1.6, color: 'rgba(245,236,215,0.40)', maxWidth: 360, margin: 0 }}>Four surfaces. One shared store. Select a live surface to explore.</p>
        </div>
        <div style={{ display: 'flex', gap: 22, flexShrink: 0 }}>
          {[['$18,470','Today'],['88%','Occupancy'],['3','Stalls']].map(([v,l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: HF.d, fontSize: 22, color: HOS.gold, fontWeight: 300, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: HF.l, fontSize: 7, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.26)', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Split hero — Customer + Hall Console */}
      <div style={{ padding: '28px 32px 24px', borderBottom: `1px solid ${HOS.bord}`, display: 'flex', gap: 36, alignItems: 'flex-start' }}>

        {/* Left — Customer Kiosk */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#c0622a', background: '#c0622a0f', border: '1px solid #c0622a40', padding: '4px 10px' }}>● Customer Experience</div>
            <div style={{ width: 20, height: 1, background: '#c0622a44' }} />
          </div>
          <PhoneMockup />
          <button onClick={() => onSelect('customer')}
            onMouseEnter={e => { e.currentTarget.style.background = '#c0622a'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c0622a'; }}
            style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.20em', textTransform: 'uppercase', padding: '8px 20px', background: 'transparent', border: '1px solid #c0622a', color: '#c0622a', cursor: 'pointer', transition: 'all 0.18s', width: '100%', maxWidth: 200 }}>
            Open live →
          </button>
        </div>

        {/* Right — Hall Console */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 1, background: '#8fb98f44' }} />
            <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#8fb98f', background: '#8fb98f0f', border: '1px solid #8fb98f40', padding: '4px 10px' }}>Hall Console ●</div>
          </div>
          <DesktopMockup />
          <button onClick={() => onSelect('operator')}
            onMouseEnter={e => { e.currentTarget.style.background = '#8fb98f'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8fb98f'; }}
            style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.20em', textTransform: 'uppercase', padding: '8px 20px', background: 'transparent', border: '1px solid #8fb98f', color: '#8fb98f', cursor: 'pointer', transition: 'all 0.18s', alignSelf: 'flex-end' }}>
            Open live →
          </button>
        </div>
      </div>

      {/* Secondary live surfaces */}
      <div style={{ borderBottom: `1px solid ${HOS.bord}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 32px 8px' }}>
          <span style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.36)' }}>Vendor Surfaces</span>
          <span style={{ flex: 1, height: 1, background: HOS.bordS }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {secondarySurfaces.map((s, i) => (
            <button key={s.id} onClick={() => onSelect(s.id)}
              onMouseEnter={() => setHov(s.id)} onMouseLeave={() => setHov(null)}
              style={{ background: hov===s.id ? '#1f160d' : 'transparent', border: 'none', borderRight: i===0 ? `1px solid ${HOS.bord}` : 'none', cursor: 'pointer', textAlign: 'left', padding: '14px 24px', color: 'inherit', display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s' }}>
              <span style={{ width: 3, height: 28, background: s.color, borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: s.color }} />
                  <span style={{ fontFamily: HF.l, fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: s.color }}>Live</span>
                </div>
                <div style={{ fontFamily: HF.d, fontSize: 17, color: HOS.parch, lineHeight: 1.15 }}>{s.label}</div>
                <div style={{ fontFamily: HF.b, fontSize: 10.5, color: 'rgba(245,236,215,0.38)', marginTop: 2 }}>{s.sub}</div>
              </div>
              <span style={{ marginLeft: 'auto', fontFamily: HF.m, fontSize: 12, color: hov===s.id ? s.color : 'rgba(245,236,215,0.20)', transition: 'color 0.15s' }}>→</span>
            </button>
          ))}
        </div>
      </div>

      {/* External modules */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 32px 8px' }}>
          <span style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.26)' }}>All modules</span>
          <span style={{ flex: 1, height: 1, background: HOS.bordS }} />
          <span style={{ fontFamily: HF.m, fontSize: 8, color: 'rgba(245,236,215,0.18)' }}>Opens standalone ↗</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', borderTop: `1px solid ${HOS.bord}` }}>
          {externalModules.map((m, i) => (
            <a key={m.href} href={m.href}
              onMouseEnter={() => setHov(m.href)} onMouseLeave={() => setHov(null)}
              style={{ textDecoration: 'none', color: 'inherit', padding: '11px 14px', borderRight: i<4 ? `1px solid ${HOS.bordS}` : 'none', background: hov===m.href ? '#1a1108' : 'transparent', transition: 'background 0.15s', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ width: 18, height: 2, background: m.band, borderRadius: 1, marginBottom: 2 }} />
              <div style={{ fontFamily: HF.l, fontSize: 6.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.26)' }}>{m.role}</div>
              <div style={{ fontFamily: HF.d, fontSize: 13, color: HOS.parch, lineHeight: 1.2 }}>{m.label}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 32px 20px', display: 'flex', alignItems: 'center', gap: 10, borderTop: `1px solid ${HOS.bord}`, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: HF.m, fontSize: 8, color: 'rgba(245,236,215,0.22)' }}>shared store</span>
        <span style={{ flex: 1, height: 1, background: HOS.bord, minWidth: 16 }} />
        {['orders','inventory','loyalty','remittance'].map(k => (
          <span key={k} style={{ fontFamily: HF.l, fontSize: 6.5, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.18)', border: `1px solid ${HOS.bordS}`, padding: '2px 6px' }}>{k}</span>
        ))}
        <span style={{ flex: 1, height: 1, background: HOS.bord, minWidth: 16 }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: HF.m, fontSize: 8, color: HOS.green }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: HOS.green, animation: 'hosPulse 2.2s ease-in-out infinite' }} />&lt; 200ms
        </span>
      </div>
    </div>
  );
}

// ── Floating guide card ───────────────────────────────────────────────────────
function GuideCard({ surfaceId, onClose }) {
  const g = SURFACE_GUIDES[surfaceId];
  if (!g) return null;
  return (
    <div style={{ position: 'absolute', bottom: 24, left: 24, width: 320, zIndex: 20, background: HOS.panel, border: `1px solid ${HOS.bord}`, boxShadow: '0 20px 60px rgba(0,0,0,0.65)', overflow: 'hidden', animation: 'hosCardIn 340ms cubic-bezier(0.16,1,0.3,1)' }}>
      <div style={{ height: 2, background: g.color }} />
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: g.color, boxShadow: `0 0 0 3px ${g.color}22` }} />
            <span style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: g.color }}>{g.label}</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(245,236,215,0.30)', cursor: 'pointer', fontSize: 17, padding: '1px 3px', lineHeight: 1, transition: 'color 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.color = HOS.parch}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,236,215,0.30)'}>×</button>
        </div>
        <div style={{ fontFamily: HF.d, fontSize: 18, lineHeight: 1.25, color: HOS.parch, marginBottom: 8, textWrap: 'pretty' }}>{g.title}</div>
        <p style={{ fontFamily: HF.b, fontSize: 11.5, lineHeight: 1.65, color: 'rgba(245,236,215,0.50)', margin: '0 0 10px', textWrap: 'pretty' }}>{g.body}</p>
        <div style={{ padding: '9px 12px', background: `${HOS.ter}0d`, border: `1px solid ${HOS.ter}36` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ width: 10, height: 1, background: HOS.ter }} />
            <span style={{ fontFamily: HF.l, fontSize: 7, letterSpacing: '0.20em', textTransform: 'uppercase', color: HOS.ter }}>Try this</span>
          </div>
          <div style={{ fontFamily: HF.b, fontSize: 11, color: HOS.wheat, lineHeight: 1.55, textWrap: 'pretty' }}>{g.cta}</div>
        </div>
      </div>
    </div>
  );
}

// ── Walkthrough shell ─────────────────────────────────────────────────────────
function WalkthroughShell() {
  const [surface,   setSurface]   = React.useState(null);   // null = grid
  const [animKey,   setAnimKey]   = React.useState(0);
  const [guideOpen, setGuideOpen] = React.useState(true);
  const [t, setTweak] = useTweaks({ accent: '#c0622a', surface: '#1e1710' });
  useHall();

  React.useEffect(() => {
    if (typeof applyPalette === 'function') applyPalette(t.accent, t.surface);
  }, [t.accent, t.surface]);

  function openSurface(id) {
    setAnimKey(k => k + 1);
    setSurface(id);
    setGuideOpen(true);
    if (id === 'customer') hallStore.set({ persona: 'customer', screen: 'browse', started: true });
    else if (id) actions.setPersona(id);
    try { localStorage.setItem('hos-wt-surface', id); } catch (e) {}
  }

  function goBack() {
    setAnimKey(k => k + 1);
    setSurface(null);
  }

  React.useEffect(() => {
    function onKey(e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'Escape') goBack();
      if (!surface) return;
      const idx = SURFACE_ORDER.indexOf(surface);
      if (e.key === 'ArrowRight') openSurface(SURFACE_ORDER[(idx + 1) % SURFACE_ORDER.length]);
      if (e.key === 'ArrowLeft')  openSurface(SURFACE_ORDER[(idx - 1 + SURFACE_ORDER.length) % SURFACE_ORDER.length]);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [surface]);

  function renderSurface() {
    if (surface === 'customer') return <CustomerApp />;
    if (surface === 'vendor')   return <VendorDashboard />;
    if (surface === 'operator') return <OperatorConsole />;
    if (surface === 'pos')      return <POSTerminal />;
    return null;
  }

  const guide    = surface ? SURFACE_GUIDES[surface] : null;
  const surfIdx  = SURFACE_ORDER.indexOf(surface);
  const prevSurf = surface ? SURFACE_ORDER[(surfIdx - 1 + SURFACE_ORDER.length) % SURFACE_ORDER.length] : null;
  const nextSurf = surface ? SURFACE_ORDER[(surfIdx + 1) % SURFACE_ORDER.length] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: HOS.bg, color: HOS.parch, fontFamily: HF.b }}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header style={{ height: 46, flexShrink: 0, background: HOS.panel, borderBottom: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10, flexShrink: 0 }}>

        {/* Brand */}
        <a href="Hall OS Index.html" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit', flexShrink: 0 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(140deg,${HOS.ter},${HOS.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HF.d, fontSize: 13, fontStyle: 'italic', color: '#1e1710', fontWeight: 600 }}>&amp;</div>
          <span style={{ fontFamily: HF.d, fontSize: 14, color: HOS.parch, lineHeight: 1 }}>Hall <em style={{ color: HOS.ter }}>OS</em></span>
        </a>

        {surface ? (
          <>
            <span style={{ width: 1, height: 14, background: HOS.bord, flexShrink: 0 }} />
            {/* Back to grid */}
            <button onClick={goBack} style={{ fontFamily: HF.l, fontSize: 7.5, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 10px', background: 'transparent', border: `1px solid ${HOS.bord}`, color: 'rgba(245,236,215,0.42)', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = HOS.ter; e.currentTarget.style.color = HOS.ter; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = HOS.bord; e.currentTarget.style.color = 'rgba(245,236,215,0.42)'; }}>
              ← All surfaces
            </button>
            {/* Surface name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: guide ? guide.color : HOS.ter, flexShrink: 0 }} />
              <span style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: guide ? guide.color : HOS.ter, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{guide ? guide.label : surface}</span>
            </div>
            {/* Prev / Next surface */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              {SURFACE_ORDER.map((id, i) => (
                <button key={id} onClick={() => openSurface(id)} style={{ width: id === surface ? 18 : 6, height: 6, borderRadius: 3, background: id === surface ? (guide ? guide.color : HOS.ter) : 'rgba(245,236,215,0.14)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)' }} />
              ))}
            </div>
            {/* Guide toggle */}
            <button onClick={() => setGuideOpen(o => !o)} style={{ fontFamily: HF.l, fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', background: guideOpen ? `${guide ? guide.color : HOS.ter}1a` : 'transparent', border: `1px solid ${guideOpen ? (guide ? guide.color : HOS.ter) : HOS.bord}`, color: guideOpen ? (guide ? guide.color : HOS.ter) : 'rgba(245,236,215,0.38)', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}>
              {guideOpen ? 'Hide guide' : 'Guide'}
            </button>
          </>
        ) : (
          <>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.28)' }}>Select a surface to explore</span>
          </>
        )}

        {/* Live dot */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, marginLeft: 8 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: HOS.green, animation: 'hosPulse 2.2s ease-in-out infinite' }} />
          <span style={{ fontFamily: HF.m, fontSize: 8.5, color: HOS.green }}>Live</span>
        </span>
      </header>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {surface ? (
          /* Surface view */
          <>
            <div key={animKey} style={{ flex: 1, overflowY: 'auto', animation: 'hosPageIn 340ms cubic-bezier(0.16,1,0.3,1)' }}>
              {renderSurface()}
            </div>
            {guideOpen && <GuideCard key={`guide-${surface}`} surfaceId={surface} onClose={() => setGuideOpen(false)} />}

            {/* Prev / Next surface bottom strip */}
            <div style={{ height: 44, flexShrink: 0, background: HOS.panel, borderTop: `1px solid ${HOS.bord}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', gap: 10 }}>
              <button onClick={() => openSurface(prevSurf)} style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 14px', background: 'transparent', border: `1px solid ${HOS.bord}`, color: 'rgba(245,236,215,0.40)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = guide ? guide.color : HOS.ter; e.currentTarget.style.color = guide ? guide.color : HOS.ter; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = HOS.bord; e.currentTarget.style.color = 'rgba(245,236,215,0.40)'; }}>
                ← {SURFACE_GUIDES[prevSurf] ? SURFACE_GUIDES[prevSurf].label : ''}
              </button>
              <button onClick={goBack} style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 18px', background: 'transparent', border: `1px solid ${HOS.bordS}`, color: 'rgba(245,236,215,0.24)', cursor: 'pointer' }}>
                ⊞ All surfaces
              </button>
              <button onClick={() => openSurface(nextSurf)} style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 14px', background: 'transparent', border: `1px solid ${HOS.bord}`, color: 'rgba(245,236,215,0.40)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = guide ? guide.color : HOS.ter; e.currentTarget.style.color = guide ? guide.color : HOS.ter; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = HOS.bord; e.currentTarget.style.color = 'rgba(245,236,215,0.40)'; }}>
                {SURFACE_GUIDES[nextSurf] ? SURFACE_GUIDES[nextSurf].label : ''} →
              </button>
            </div>
          </>
        ) : (
          /* Grid view */
          <WalkthroughGrid key="grid" onSelect={openSurface} />
        )}
      </div>

      <style>{`
        @keyframes hosPageIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
        @keyframes hosCardIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes hosPulse  { 0%,100%{box-shadow:0 0 0 3px rgba(107,140,107,0.18);}50%{box-shadow:0 0 0 6px rgba(107,140,107,0.04);} }
      `}</style>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={['#c0622a','#b5503a','#d4a84b','#6b8c6b','#6b88a8']}
          onChange={v => { setTweak('accent', v); if (typeof applyPalette === 'function') applyPalette(v, t.surface); hallStore.set({ _v: Date.now() }); }} />
        <TweakColor label="Surface" value={t.surface}
          options={['#1e1710','#211a13','#15110c','#1a1611']}
          onChange={v => { setTweak('surface', v); if (typeof applyPalette === 'function') applyPalette(t.accent, v); hallStore.set({ _v: Date.now() }); }} />
      </TweaksPanel>
    </div>
  );
}

Object.assign(window, { WalkthroughShell, WelcomeMosaic });
