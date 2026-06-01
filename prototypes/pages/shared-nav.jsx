// shared-nav.jsx — Universal nav used across all five pages

const NAV_PAGES = [
  { label: 'Investors',  href: 'Investors Page v2.html' },
  { label: 'Grants',     href: 'Grant Programs.html'    },
  { label: 'Vendors',    href: 'Vendors.html'            },
  { label: 'Incubator',  href: 'Incubator Program.html'  },
  { label: 'Kitchen',    href: 'Commercial Kitchen.html'  },
];

function SharedNav({ current, scrolled }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isScrolled = scrolled !== undefined ? scrolled : true;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '13px 2.5rem',
      background: isScrolled ? 'rgba(20,13,7,0.97)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? `1px solid ${INV.bord}` : 'none',
      transition: 'all 0.35s ease',
    }}>
      {/* Logo */}
      <a href="Investors Page v2.html" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <div style={{ fontFamily: INV_F.d, fontSize: '1.15rem', color: INV.parch, letterSpacing: '0.01em', lineHeight: 1.1 }}>
          Cider <em style={{ fontStyle: 'italic', color: INV.ter }}>&amp;</em> Spice
        </div>
        <div style={{ fontFamily: INV_F.l, fontSize: '0.46rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.28 }}>Las Cruces Culinary Hub</div>
      </a>

      {!isMobile ? (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
          {NAV_PAGES.map(({ label, href }) => {
            const active = label === current;
            return (
              <a key={label} href={href} style={{
                fontFamily: INV_F.l, fontSize: '0.57rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: active ? INV.parch : INV.wheat,
                opacity: active ? 1 : 0.45,
                textDecoration: 'none',
                padding: '6px 12px',
                borderBottom: active ? `1px solid ${INV.ter}` : '1px solid transparent',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderBottomColor = 'rgba(192,98,42,0.4)'; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.opacity = '0.45'; e.currentTarget.style.borderBottomColor = 'transparent'; }}}>
                {label}
              </a>
            );
          })}
          <span style={{ width: '1px', height: '16px', background: INV.bordM, margin: '0 0.5rem' }} />
          <a href="Hall OS.html" style={{
            fontFamily: INV_F.l, fontSize: '0.57rem', letterSpacing: '0.16em', textTransform: 'uppercase',
            color: current === 'Hall OS' ? INV.parch : INV.ter,
            opacity: 1, textDecoration: 'none', padding: '7px 16px',
            border: `1px solid ${current === 'Hall OS' ? INV.ter : 'rgba(192,98,42,0.42)'}`,
            background: current === 'Hall OS' ? INV.ter : 'transparent',
            transition: 'all 0.22s', display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}
            onMouseEnter={e => { if (current !== 'Hall OS') { e.currentTarget.style.background = INV.ter; e.currentTarget.style.color = INV.parch; } }}
            onMouseLeave={e => { if (current !== 'Hall OS') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INV.ter; } }}>
            Hall OS <span style={{ fontSize: '0.7em' }}>↗</span>
          </a>
        </nav>
      ) : (
        <button onClick={() => setMenuOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: INV.wheat, opacity: 0.75, padding: '4px' }}>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      )}

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', inset: 0, top: '50px', background: 'rgba(20,13,7,0.98)', zIndex: 99, display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem', gap: '0.5rem' }}>
          {NAV_PAGES.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: INV_F.d, fontSize: '2rem', fontWeight: 300, color: label === current ? INV.ter : INV.parch, textDecoration: 'none', padding: '0.5rem 0', borderBottom: `1px solid rgba(232,193,141,0.08)` }}>{label}</a>
          ))}
          <a href="Hall OS.html" onClick={() => setMenuOpen(false)} style={{ fontFamily: INV_F.d, fontSize: '2rem', fontWeight: 300, fontStyle: 'italic', color: INV.ter, textDecoration: 'none', padding: '0.5rem 0', borderBottom: `1px solid rgba(232,193,141,0.08)` }}>Hall OS ↗</a>
          <a href="Investors Page v2.html#inquiry" onClick={() => setMenuOpen(false)} style={{ fontFamily: INV_F.l, fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, marginTop: '1.5rem', textDecoration: 'none' }}>Request Investor Package →</a>
        </div>
      )}
    </header>
  );
}

Object.assign(window, { SharedNav, NAV_PAGES });
