// inv-hero.jsx — Nav, Hero (with bg image), Metrics bar, Trust strip

const HERO_BG = 'https://lc-culinary-hub.vercel.app/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png';

function InvNav({ scrolled }) {
  const links = [
    { label: 'Opportunity', href: '#opportunity' },
    { label: 'Financials',  href: '#financials'  },
    { label: 'Tiers',       href: '#tiers'        },
    { label: 'Ask the Plan',href: '#search'       },
    { label: 'Incubator',   href: 'Incubator Program.html' },
    { label: 'Kitchen',     href: 'Commercial Kitchen.html' },
  ];
  const isMobile = useIsMobile();
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '12px 2.5rem' : '22px 2.5rem',
      background: scrolled ? 'rgba(22,14,7,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${INV.bord}` : 'none',
      transition: 'all 0.4s ease',
    }}>
      <a href="#top" style={{ textDecoration: 'none' }}>
        <div style={{ fontFamily: INV_F.d, fontSize: '1.25rem', color: INV.parch, letterSpacing: '0.02em' }}>
          Cider <em style={{ fontStyle: 'italic', color: INV.ter }}>&amp;</em> Spice
        </div>
        <div style={{ fontFamily: INV_F.l, fontSize: '0.49rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.32, marginTop: '2px' }}>
          Investor Overview · Las Cruces, NM
        </div>
      </a>

      {!isMobile ? (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href}
              style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.52, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.52'}>
              {label}
            </a>
          ))}
          <a href="#inquiry"
            style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.ter, border: `1px solid rgba(192,98,42,0.45)`, padding: '8px 20px', textDecoration: 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = INV.ter; e.currentTarget.style.color = INV.parch; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = INV.ter; }}>
            Request Package
          </a>
        </nav>
      ) : (
        <a href="#inquiry"
          style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.ter, border: `1px solid rgba(192,98,42,0.45)`, padding: '7px 14px', textDecoration: 'none' }}>
          Request
        </a>
      )}
    </header>
  );
}

function InvHero() {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setVis(true), 120); return () => clearTimeout(t); }, []);
  const a = (d) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(18px)',
    transition: `opacity .9s ease ${d}s, transform .9s ease ${d}s`,
  });

  return (
    <section id="top" style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>

      {/* Background image */}
      <img
        src={HERO_BG} alt="" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.2 }} />

      {/* Dark base */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: INV.bg, opacity: 0.72 }} />

      {/* Radial warm glow */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 55% at 50% 30%, rgba(192,98,42,0.2) 0%, transparent 65%)' }} />

      {/* Grid texture */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(232,193,141,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,193,141,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.018 }} />

      {/* Bottom vignette */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%', background: `linear-gradient(to bottom, transparent, ${INV.bg})` }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '880px', padding: '9rem 2rem 5rem', width: '100%' }}>

        <div style={{ ...a(0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <span style={{ height: '1px', width: '32px', background: INV.ter, display: 'block' }} />
          <span style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: INV.ter }}>Private Investor Overview · Las Cruces, NM</span>
          <span style={{ height: '1px', width: '32px', background: INV.ter, display: 'block' }} />
        </div>

        <h1 style={{ ...a(0.3), fontFamily: INV_F.d, fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 1.0, color: INV.parch, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          A Resilient, Diversified<br />
          <em style={{ fontStyle: 'italic', color: INV.ter }}>Revenue Platform</em>
        </h1>

        <div style={{ ...a(0.42), width: '64px', height: '1px', background: `linear-gradient(to right, transparent, ${INV.wheat}55, transparent)`, margin: '0 auto 1.75rem' }} />

        <p style={{ ...a(0.52), fontFamily: INV_F.b, fontSize: '1.05rem', lineHeight: 1.85, color: INV.wheat, opacity: 0.65, maxWidth: '540px', margin: '0 auto 3rem', letterSpacing: '0.01em' }}>
          Southern New Mexico's first food hall and craft cider bar. Six revenue streams. Conservative GAAP underwriting. Zero direct competition within 200 miles.
        </p>

        <div style={{ ...a(0.65), display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <a href="#inquiry"
            style={{ display: 'inline-block', background: INV.ter, color: INV.parch, padding: '16px 46px', fontFamily: INV_F.l, fontSize: '0.66rem', letterSpacing: '0.26em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = INV.terHov; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = INV.ter; e.currentTarget.style.transform = 'none'; }}>
            Request Investor Package
          </a>
          <a href="#opportunity"
            style={{ display: 'inline-block', border: `1px solid rgba(232,193,141,0.2)`, color: `${INV.wheat}bb`, padding: '15px 46px', fontFamily: INV_F.l, fontSize: '0.66rem', letterSpacing: '0.26em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(192,98,42,0.5)'; e.currentTarget.style.color = INV.parch; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,193,141,0.2)'; e.currentTarget.style.color = `${INV.wheat}bb`; }}>
            Explore the Opportunity
          </a>
        </div>

        <div style={{ ...a(0.82), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
          {[['$1.505M', 'Total Raise'], ['17–20%', 'Illustrative IRR'], ['Q1–Q2 2027', 'Grand Opening']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.4rem', fontWeight: 300, color: INV.ter, lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.38, marginTop: '0.3rem' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ ...a(1.1), marginTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.28 }}>
          <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: INV.wheat }}>Scroll</span>
          <div style={{ width: '1px', height: '36px', background: `linear-gradient(to bottom, ${INV.wheat}, transparent)` }} />
        </div>
      </div>
    </section>
  );
}

// ── Metrics bar ───────────────────────────────────────────────────────────────

function MetricCell({ item, active }) {
  const val = useCountUp(item.target || 0, active && !!item.target);
  let text;
  if (item.display != null) {
    text = item.display;
  } else if (item.range) {
    // Range metric (e.g. 17–20%): both bounds rise together from zero.
    const lo = item.target ? Math.round((val / item.target) * item.rangeLo) : 0;
    text = `${lo}\u2013${val}${item.suffix || ''}`;
  } else {
    text = `${item.prefix || ''}${val.toLocaleString()}${item.suffix || ''}`;
  }
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? INV.surf : INV.bgMid, padding: '2.5rem 1.5rem', textAlign: 'center', transition: 'background 0.25s', cursor: 'default' }}>
      <div style={{ fontFamily: INV_F.d, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: INV.ter, marginBottom: '0.5rem', lineHeight: 1, transition: 'color 0.25s' }}>{text}</div>
      <div style={{ fontFamily: INV_F.l, fontSize: '0.57rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.42, lineHeight: 1.5 }}>{item.label}</div>
    </div>
  );
}

function InvMetrics() {
  const [ref, inView] = useInView(0.3);
  const isMobile = useIsMobile();
  const ITEMS = [
    { label: 'Total Project Capital',          display: '$1.505M' },
    { label: 'Year 1 Revenue · Appendix F',    target: 822,  prefix: '$', suffix: 'K' },
    { label: 'Illustrative 3-Year IRR',         range: true, rangeLo: 17, target: 20, suffix: '%' },
    { label: 'FTE Jobs Created · Year 1',       target: 34 },
  ];
  return (
    <div ref={ref} style={{ background: INV.bgMid, borderBottom: `1px solid ${INV.bord}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {ITEMS.map((item, i) => <MetricCell key={i} item={item} active={inView} />)}
      </div>
    </div>
  );
}

// ── Trust strip ───────────────────────────────────────────────────────────────

function InvTrustStrip() {
  const ORGS = ['Elevate Las Cruces', 'Visit Las Cruces', 'NM MainStreet', 'East Lohman Dev. Plan', 'W. Picacho MRA'];
  return (
    <div style={{ background: INV.surf, borderBottom: `1px solid ${INV.bord}`, padding: '0.85rem 2.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem 2rem' }}>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.28 }}>Aligned With</span>
        {ORGS.map((org, i) => (
          <React.Fragment key={org}>
            <span style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.48 }}>{org}</span>
            {i < ORGS.length - 1 && <span style={{ color: INV.ter, opacity: 0.3, fontSize: '0.4rem' }} aria-hidden="true">✦</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { InvNav, InvHero, InvMetrics, InvTrustStrip });
