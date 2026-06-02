// vendor-sections.jsx — Vendors & Pipeline page sections

const CONFIRMED_VENDORS = [
  {
    name: 'Yazzie',
    cuisine: 'Japanese · NM Fusion',
    tagline: 'Katsu + Curry + Hatch Chile',
    img: 'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-three-stall-row-vision-image.png',
    desc: 'Chipotle-assembly model with <90-second build time. Japanese katsu and curry with New Mexico Hatch chile integration. High throughput, low complexity per ticket, strong lunch and dinner performance.',
    metrics: [['Cuisine Gap', 'Japanese · NM Fusion — no direct competitor in Las Cruces'], ['Service Model', 'Assembly line, <90 sec / ticket'], ['Revenue Synergy', 'High-volume lunch, cider bar pairing at dinner']],
    status: 'confirmed',
  },
  {
    name: 'Seoul Fire Chicken',
    cuisine: 'Korean',
    tagline: 'Double-Fried · Heat Ladder',
    img: 'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-seoul-fire-chicken-stall-vision-image.png',
    desc: 'Korean double-fried chicken with a structured heat ladder from mild to extreme. Natural pairing with the craft cider bar — spicy food and cold cider are one of the strongest complementary pairings in food service.',
    metrics: [['Cuisine Gap', 'Korean — not represented in Las Cruces market'], ['Differentiator', 'Structured heat ladder drives repeat visits and social media'], ['Cider Synergy', 'Strongest direct cross-sell with bar revenue']],
    status: 'confirmed',
  },
  {
    name: 'Sticky Stack Co.',
    cuisine: 'American · Artisan',
    tagline: 'Artisan Sliders · NM House Jam',
    img: 'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-sticky-stack-co-stall-vision-image.png',
    desc: 'Artisan sliders with house-made New Mexico jam and locally sourced ingredients. Built-in retail crossover revenue through bottled jam — one of the few stall concepts with a natural path to packaged retail without operational complexity.',
    metrics: [['Retail Crossover', 'Bottled NM jam → gift shop / retail revenue'], ['Local Sourcing', 'NM ingredients — strong grant and impact narrative'], ['Incubator Stage', 'Accelerated toward graduation track']],
    status: 'confirmed',
  },
];

const PIPELINE_VENDORS = [
  { name: 'Río Grande Burritos', cuisine: 'NM Mexican', desc: 'New Mexico-style burritos with regional ingredients. High lunch volume potential, familiar local cuisine with strong NMSU and Fort Bliss customer base.' },
  { name: 'Levant Table',        cuisine: 'Lebanese / Middle Eastern', desc: 'Lebanese and broader Middle Eastern cuisine — shawarma, mezze, falafel. No direct competitor in Las Cruces. Aligns with Hub\'s diverse cuisine mix objectives and minority entrepreneurship goals.' },
  { name: 'Sweet Elevation',     cuisine: 'NM Desserts / Bakery', desc: 'New Mexico-themed desserts and baked goods. Natural retail extension into gift shop. Strong event programming tie-in (wedding tastings, private events). Margin profile significantly better than savory.' },
  { name: 'Mesita Noodle Co.',   cuisine: 'Ramen · NM Twist', desc: 'Ramen with New Mexico flavor integration — green chile broth, NM-sourced proteins. Differentiated from pure Japanese ramen by the regional twist. Cider bar pairing potential similar to Seoul Fire.' },
];

const SCORING = [
  ['Concept Fit',           '1–5', 'Menu fills a cuisine gap. Complements mix without internal competition.'],
  ['Financial Readiness',   '1–5', 'Understands COGS, labor, packaging, break-even, and working capital.'],
  ['Operations Capability', '1–5', 'Prior pop-up, truck, catering, or academy history with strong evaluations.'],
  ['Compliance Readiness',  '1–5', 'Food handler/CFPM training plan. NMED permit awareness. Insurance plan.'],
  ['Mission Alignment',     '1–5', 'Supports inclusive goals. Interest in local sourcing. Willing to participate in coaching.'],
  ['Coachability',          '1–5', 'Responds to feedback. Meets deadlines. Proactive communication.'],
  ['Launch Timeline',       '1–5', 'Realistic and specific. Not attempting to open before infrastructure is ready.'],
];

// ── Hero ──────────────────────────────────────────────────────────────────────

function VHero() {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);
  const a = d => ({ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: `opacity .8s ease ${d}s, transform .8s ease ${d}s` });
  return (
    <section style={{ position: 'relative', minHeight: '55vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: `1px solid ${INV.bord}` }}>
      <img src="https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-three-stall-row-vision-image.png" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.18 }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: INV.bg, opacity: 0.75 }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,98,42,0.12) 0%, transparent 60%)' }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '72rem', margin: '0 auto', padding: '8rem 2rem 5rem', width: '100%' }}>
        <div style={{ ...a(0.1), display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ height: '1px', width: '28px', background: INV.ter, display: 'block' }} />
          <span style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: INV.ter }}>Vendor Concepts · Las Cruces Culinary Innovation Hub</span>
        </div>
        <h1 style={{ ...a(0.25), fontFamily: INV_F.d, fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', fontWeight: 300, lineHeight: 1.05, color: INV.parch, marginBottom: '1.5rem', letterSpacing: '-0.015em' }}>
          3 Confirmed Anchors,<br /><em style={{ fontStyle: 'italic', color: INV.ter }}>4 in the Pipeline</em>
        </h1>
        <p style={{ ...a(0.4), fontFamily: INV_F.b, fontSize: '1rem', lineHeight: 1.85, color: INV.wheat, opacity: 0.62, maxWidth: '560px', marginBottom: '2rem' }}>
          Every confirmed vendor brings a developed brand identity, tested menu, and New Mexico regional integration. No cuisine duplicates. Each was selected against a seven-criterion scored rubric — not intuition.
        </p>
        <div style={{ ...a(0.52), display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
          {[['3', 'Confirmed Anchors'], ['4', 'Pipeline Concepts'], ['70%', 'First-time/Minority Reserved'], ['48 hr', 'Stall Backfill SLA']].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: INV_F.d, fontSize: '2rem', fontWeight: 300, color: INV.ter, lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.38, marginTop: '0.3rem' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Confirmed vendors ─────────────────────────────────────────────────────────

function VendorCard({ vendor, delay }) {
  const [ref, inView] = useInView(0.06);
  const [hov, setHov] = React.useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s` }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
        <img src={vendor.img} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform .65s ease', transform: hov ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,18,9,0.9) 0%, rgba(28,18,9,0.1) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: INV.ter, opacity: hov ? 1 : 0, transition: 'opacity 0.3s' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, marginBottom: '0.25rem' }}>{vendor.cuisine}</div>
          <div style={{ fontFamily: INV_F.d, fontSize: '1.75rem', color: INV.parch, lineHeight: 1 }}>{vendor.name}</div>
          <div style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.58 }}>{vendor.tagline}</div>
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: '1.75rem', background: INV.bg }}>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.58, lineHeight: 1.82, marginBottom: '1.25rem' }}>{vendor.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {vendor.metrics.map(([l, v]) => (
            <div key={l} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.ter, opacity: 0.65, flexShrink: 0, marginTop: '3px', minWidth: '90px' }}>{l}</span>
              <span style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.62, lineHeight: 1.6 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VConfirmed() {
  return (
    <section id="confirmed" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <SectionHead num="01" eyebrow="Confirmed Anchor Vendors" title="Three Developed Brands, Ready for Buildout" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.82 }}>
        Full brand identities, tested menus, and NM regional integration confirmed. Concept renderings — not final buildout design. Final stall design and permitting confirmed after site selection.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '4rem' }}>
        {CONFIRMED_VENDORS.map((v, i) => <VendorCard key={v.name} vendor={v} delay={i * 0.1} />)}
      </div>

      {/* Cuisine mix analysis */}
      <div style={{ padding: '2rem', background: INV.surf, borderLeft: `3px solid rgba(192,98,42,0.35)` }}>
        <div style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, marginBottom: '0.75rem' }}>Cuisine Mix Analysis</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {[['No internal competition', 'Japanese, Korean, and American artisan — three completely distinct cuisine categories'], ['Zero duplication', 'No confirmed Las Cruces competitor in any of the three cuisine categories'], ['Bar synergy', 'All three stalls have natural craft cider pairing potential at different price points and day-parts']].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontFamily: INV_F.d, fontSize: '1rem', color: INV.parch, marginBottom: '0.3rem' }}>◈ {l}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.72 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pipeline ──────────────────────────────────────────────────────────────────

function VPipeline() {
  return (
    <section id="pipeline" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="02" eyebrow="Vendor Pipeline" title="Four Concepts in Active Development" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.82 }}>
        Pipeline vendors are in the academy or pre-application stage. No commitments made — pipeline depth demonstrates the Hub's qualified waitlist and reduces occupancy risk.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '3rem' }}>
        {PIPELINE_VENDORS.map(({ name, cuisine, desc }, i) => (
          <FadeUp key={name} delay={i * 0.07} style={{ height: '100%' }}>
            <div style={{ padding: '2.25rem 2rem', background: INV.bg, height: '100%' }}>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.ter, opacity: 0.65, marginBottom: '0.4rem' }}>{cuisine}</div>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.3rem', color: INV.parch, marginBottom: '0.65rem' }}>{name}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.52, lineHeight: 1.8 }}>{desc}</p>
              <div style={{ marginTop: '1.25rem', display: 'inline-block', fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.28, border: `1px solid rgba(232,193,141,0.15)`, padding: '3px 10px' }}>Pipeline</div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Equity stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {[
          ['70%', 'Stalls reserved for first-time, minority, veteran, or immigrant entrepreneurs'],
          ['48 hr', 'Maximum stall backfill SLA — qualified waitlist maintained at all times'],
          ['8',    'Scored criteria applied to every vendor — selection is a documented process, not intuition'],
          ['Month 1', 'Academy pre-application coaching available before formal selection — reduces failure rate'],
        ].map(([v, l]) => (
          <FadeUp key={v + l} style={{ height: '100%' }}>
            <div style={{ padding: '2rem 1.75rem', background: INV.bg, height: '100%' }}>
              <div style={{ fontFamily: INV_F.d, fontSize: '2.2rem', fontWeight: 300, color: INV.ter, lineHeight: 1, marginBottom: '0.5rem' }}>{v}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.75 }}>{l}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── Selection scoring ─────────────────────────────────────────────────────────

function VScoring() {
  return (
    <section id="scoring" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="03" eyebrow="Selection Rubric" title="Seven Criteria — Scored 1–5, Every Time" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2rem', maxWidth: '540px', lineHeight: 1.82 }}>
        Consistent application of a documented rubric reduces selection bias and builds a defensible record for grant reporting — particularly HFFF and WIOA, which require diversity and readiness documentation.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {SCORING.map(([crit, scale, desc], i) => (
          <FadeUp key={crit} delay={i * 0.04}>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 60px 1fr', background: INV.bg, alignItems: 'center' }}>
              <div style={{ padding: '1.25rem 1.5rem', borderRight: `1px solid rgba(232,193,141,0.08)`, background: INV.bgMid }}>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.05rem', color: INV.parch }}>{crit}</div>
              </div>
              <div style={{ padding: '1.25rem 1rem', borderRight: `1px solid rgba(232,193,141,0.08)`, textAlign: 'center' }}>
                <span style={{ fontFamily: INV_F.d, fontSize: '1rem', color: INV.ter }}>{scale}</span>
              </div>
              <div style={{ padding: '1.25rem 1.75rem' }}>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.55, lineHeight: 1.75 }}>{desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── CTA + Footer ──────────────────────────────────────────────────────────────

function VCTA() {
  return (
    <section style={{ borderTop: `1px solid ${INV.bord}`, padding: '5rem 0 4rem', textAlign: 'center' }}>
      <InvEyebrow text="Ready to Invest?" center />
      <h2 style={{ fontFamily: INV_F.d, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: INV.parch, marginBottom: '1rem', lineHeight: 1.15 }}>Strong Vendors Drive Strong Returns</h2>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.9rem', color: INV.wheat, opacity: 0.45, margin: '0 auto 2rem', maxWidth: '440px', lineHeight: 1.82 }}>The full financial model and capital structure are on the investor overview.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="Investors Page v2.html#inquiry" style={{ display: 'inline-block', background: INV.ter, color: INV.parch, padding: '14px 40px', fontFamily: INV_F.l, fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.25s' }} onMouseEnter={e => e.currentTarget.style.background = INV.terHov} onMouseLeave={e => e.currentTarget.style.background = INV.ter}>Request Investor Package</a>
        <a href="Incubator Program.html" style={{ display: 'inline-block', border: `1px solid rgba(232,193,141,0.2)`, color: `${INV.wheat}bb`, padding: '13px 40px', fontFamily: INV_F.l, fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s' }} onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(192,98,42,0.5)'; e.currentTarget.style.color=INV.parch; }} onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(232,193,141,0.2)'; e.currentTarget.style.color=`${INV.wheat}bb`; }}>Incubator Program →</a>
      </div>
    </section>
  );
}

function VFooter() {
  return (
    <footer style={{ background: INV.bgDark, borderTop: `1px solid ${INV.bord}`, padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: INV.parch }}>Cider <em style={{ fontStyle: 'italic', color: INV.ter }}>&amp;</em> Spice <span style={{ fontFamily: INV_F.l, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.25, marginLeft: '0.75rem' }}>Las Cruces, NM · Opening 2027</span></div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.68rem', color: INV.wheat, opacity: 0.2, maxWidth: '500px', lineHeight: 1.65, textAlign: 'right' }}>Vendor concepts and images are planning-stage renderings. Final stall design, permitting, and license agreement terms confirmed after site selection. Not a securities offering.</p>
    </footer>
  );
}

Object.assign(window, { VHero, VConfirmed, VPipeline, VScoring, VCTA, VFooter });
