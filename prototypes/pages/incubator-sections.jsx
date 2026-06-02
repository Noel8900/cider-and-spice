// incubator-sections.jsx — Incubator Program page sections

// ── Static data ───────────────────────────────────────────────────────────────

const PROGRAM_GOALS = [
  { glyph: '◆', title: 'Support First-Time Entrepreneurs', metric: 'Vendors admitted, trained, launched, retained & graduated per year' },
  { glyph: '◈', title: 'De-Risk Startup Costs',            metric: 'Startup cost avoided vs. $250K–$500K standalone restaurant build' },
  { glyph: '◉', title: 'Generate Sustainable NOI',         metric: 'Occupancy rate, license revenue, bar/events/retail, DSCR' },
  { glyph: '◇', title: 'Community Impact',                 metric: '50–70 jobs, apprenticeships, minority/veteran/immigrant participation, local sourcing' },
  { glyph: '✦', title: 'Build a Durable Pipeline',        metric: 'Qualified waitlist depth, academy graduates, alumni tracked, backfill speed' },
];

const JOURNEY_STAGES = [
  { num: '01', stage: 'Outreach',       owner: 'Program Coordinator', gate: 'Prospect matches mission, cuisine mix, and readiness profile' },
  { num: '02', stage: 'Application',    owner: 'Incubator Director',  gate: 'Application complete enough for substantive review' },
  { num: '03', stage: 'Selection',      owner: 'Selection Committee', gate: 'Accept, waitlist, academy-first, or decline with feedback' },
  { num: '04', stage: 'Academy',        owner: 'Program Team',        gate: 'Vendor ready for license and onboarding' },
  { num: '05', stage: 'Onboarding',     owner: 'Operations Manager',  gate: 'Vendor approved for soft launch' },
  { num: '06', stage: 'Soft Launch',    owner: 'Hall Manager',        gate: 'Cleared for regular schedule with corrections documented' },
  { num: '07', stage: 'Growth Support', owner: 'Incubator Director',  gate: 'On track toward graduation or improvement plan initiated' },
  { num: '08', stage: 'Graduation',     owner: 'Incubator Director',  gate: 'Permanent stall upgrade, brick-and-mortar, food truck, or packaged product' },
];

const CRITERIA = [
  { c: 'Concept Fit',          ev: 'Menu fills a cuisine gap; complements mix without internal competition',              flag: 'Duplicates existing vendor without clear differentiation' },
  { c: 'Financial Readiness',  ev: 'Understands COGS, labor, packaging, break-even volume, and working capital needs',   flag: 'Cannot explain how costs are covered at realistic sales volumes' },
  { c: 'Operations Capability',ev: 'Prior pop-up, truck, catering, or academy history with strong evaluations',          flag: 'Cannot produce a consistent product during selection tasting' },
  { c: 'Compliance Readiness', ev: 'Food handler/CFPM training plan; NMED permit awareness; insurance plan',             flag: 'Resistant to documentation; dismissive of health code obligations' },
  { c: 'Mission Alignment',    ev: 'Supports inclusive goals; interest in local sourcing; willing to participate in coaching', flag: 'Only wants cheap space; no interest in accountability' },
  { c: 'Coachability',         ev: 'Responds to feedback constructively; meets deadlines; proactive communication',      flag: 'Missed assignments without communication; defensive about feedback' },
  { c: 'Launch Timeline',      ev: 'Realistic and specific; not attempting to launch before infrastructure is ready',    flag: "Wants to open 'as soon as possible' without understanding what ready means" },
];

const TRACK_A = [
  ['1',  'Concept Validation',    'One-page concept brief'],
  ['2',  'Menu Costing',          'Costed worksheet (5+ core items)'],
  ['3',  'Unit Economics',        'Stall economics model + break-even'],
  ['4',  'Food Safety & Permits', 'Compliance readiness checklist'],
  ['5',  'Operations Workflow',   'Prep/production sheet for one service day'],
  ['6',  'Branding & CX',         'Draft brand and menu package'],
  ['7',  'POS & Bookkeeping',     'Reporting workflow + chart of accounts'],
  ['8',  'Staffing & Service',    'Staffing plan for opening day'],
  ['9',  'Pop-Up Proof Test',     'Proof-event report with sales data'],
  ['10', 'Capital Readiness',     'Capital needs summary document'],
  ['11', 'Compliance Review',     'Complete onboarding file draft'],
  ['12', 'Launch Pitch',          'Launch-readiness presentation to committee'],
];

const KPIS_DATA = [
  { kpi: 'Occupancy Rate',           cadence: 'Weekly',    why: 'Below 80% for 60+ days is an early warning signal' },
  { kpi: 'Vendor Sales / Stall / Day', cadence: 'Weekly',  why: 'Concept demand and hub foot traffic effectiveness' },
  { kpi: 'Rent-to-Sales Ratio',      cadence: 'Monthly',   why: 'Excessive burden accelerates vendor failure' },
  { kpi: 'Gross Margin / Food Cost', cadence: 'Monthly',   why: 'Operator financial health at unit economics level' },
  { kpi: 'Guest Ratings / Complaints', cadence: 'Weekly',  why: 'Quality and reputation — drives repeat visits' },
  { kpi: 'Compliance Score',         cadence: 'Monthly',   why: 'Cleanliness audit, training currency, permit status' },
  { kpi: 'Graduation Readiness',     cadence: 'Quarterly', why: 'Vendors on track to graduate — ultimate program KPI' },
  { kpi: 'Event Uplift',             cadence: 'Per Event', why: 'Sales on event days vs. comparable non-event days' },
  { kpi: 'NOI / DSCR',              cadence: 'Monthly',   why: 'Lender and investor confidence in debt service capacity' },
];

// ── Shared atoms ──────────────────────────────────────────────────────────────

function INav({ active }) {
  const links = [
    { label: 'Program', href: '#overview' },
    { label: 'Journey', href: '#journey' },
    { label: 'Academy', href: '#academy' },
    { label: 'KPIs',    href: '#kpis' },
  ];
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 2.5rem', background: 'rgba(22,14,7,0.97)', backdropFilter: 'blur(18px)', borderBottom: `1px solid ${INV.bord}` }}>
      <a href="Investors Page v2.html" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: INV.ter, fontSize: '0.75rem' }}>←</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5 }}>Investor Overview</span>
      </a>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        {links.map(({ label, href }) => (
          <a key={label} href={href} style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}>
            {label}
          </a>
        ))}
      </nav>
      <a href="Commercial Kitchen.html" style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.45, textDecoration: 'none', transition: 'opacity 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.45'}>
        Kitchen Manual →
      </a>
    </header>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function IHero() {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);
  const a = d => ({ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: `opacity .8s ease ${d}s, transform .8s ease ${d}s` });
  return (
    <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', background: `radial-gradient(ellipse 70% 50% at 40% 40%, rgba(192,98,42,0.14) 0%, transparent 65%), ${INV.bg}`, borderBottom: `1px solid ${INV.bord}`, overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(232,193,141,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,193,141,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.018 }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '72rem', margin: '0 auto', padding: '8rem 2rem 5rem', width: '100%' }}>
        <div style={{ ...a(0.1), display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ height: '1px', width: '28px', background: INV.ter, display: 'block' }} />
          <span style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: INV.ter }}>Operating Playbook · Las Cruces Culinary Innovation Hub</span>
        </div>
        <h1 style={{ ...a(0.25), fontFamily: INV_F.d, fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', fontWeight: 300, lineHeight: 1.05, color: INV.parch, marginBottom: '1.5rem', letterSpacing: '-0.015em', maxWidth: '800px' }}>
          Food Hall Incubator<br />
          <em style={{ fontStyle: 'italic', color: INV.ter }}>Operations Playbook</em>
        </h1>
        <p style={{ ...a(0.4), fontFamily: INV_F.b, fontSize: '1rem', lineHeight: 1.85, color: INV.wheat, opacity: 0.65, maxWidth: '560px', marginBottom: '2rem' }}>
          A structured path from concept to graduation — not a passive stall license. Every vendor moves through a defined eight-stage lifecycle with coaching, KPIs, and documented graduation criteria.
        </p>
        <div style={{ ...a(0.52), display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
          {[['8', 'Journey Stages'], ['12+', 'Vendors · Year 1'], ['24 wk', 'Deep Track Academy'], ['9', 'Monthly KPIs']].map(([v, l]) => (
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

function IOverview() {
  return (
    <section id="overview" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <SectionHead num="01" eyebrow="Program Model" title="What a Food Hall Incubator Is — and Isn't" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '4rem' }}>
        {[
          { model: 'Standard Food Hall', purpose: 'Curated dining destination with multiple vendors and shared seating', lacks: 'May not provide structured training, coaching, or graduation pathways', featured: false },
          { model: 'Shared Commissary',  purpose: 'Licensed production space for caterers, packaged-food makers, trucks', lacks: 'Does not provide customer-facing retail traffic or business development support', featured: false },
          { model: 'Food Hall Incubator', purpose: 'Customer-facing launch platform + coaching, KPIs, graduation support, and community impact', lacks: null, featured: true },
        ].map(({ model, purpose, lacks, featured }) => (
          <FadeUp key={model} style={{ height: '100%' }}>
            <div style={{ padding: '2.25rem 2rem', background: featured ? 'rgba(192,98,42,0.09)' : INV.bg, borderTop: `2px solid ${featured ? INV.ter : 'transparent'}`, height: '100%' }}>
              {featured && <span style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.ter, display: 'block', marginBottom: '0.75rem' }}>◆ The Hub Model</span>}
              <div style={{ fontFamily: INV_F.d, fontSize: '1.3rem', color: INV.parch, marginBottom: '0.75rem' }}>{model}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.62, lineHeight: 1.8, marginBottom: lacks ? '1rem' : 0 }}>{purpose}</p>
              {lacks && <p style={{ fontFamily: INV_F.b, fontSize: '0.78rem', color: INV.wheat, opacity: 0.35, lineHeight: 1.7, borderTop: `1px solid rgba(232,193,141,0.1)`, paddingTop: '0.75rem' }}><em>Does not provide:</em> {lacks}</p>}
            </div>
          </FadeUp>
        ))}
      </div>

      <SectionHead num="02" eyebrow="Program Goals" title="Five Measurable Outcomes" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {PROGRAM_GOALS.map((g, i) => (
          <FadeUp key={g.title} delay={i * 0.06} style={{ height: '100%' }}>
            <div style={{ padding: '2rem', background: INV.bg, height: '100%' }}>
              <span style={{ fontFamily: INV_F.d, fontSize: '1.4rem', color: INV.ter, opacity: 0.5, display: 'block', marginBottom: '1rem' }} aria-hidden="true">{g.glyph}</span>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.2rem', color: INV.parch, marginBottom: '0.5rem', lineHeight: 1.25 }}>{g.title}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.8 }}>{g.metric}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function IJourney() {
  const isMobile = useIsMobile();
  return (
    <section id="journey" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="03" eyebrow="Vendor Lifecycle" title="Eight Stages — Concept to Graduation" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.8 }}>
        Every vendor moves through the same defined pipeline. No stage is skipped. Stall backfill begins within 48 hours of any vacancy.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {JOURNEY_STAGES.map(({ num, stage, owner, gate }, i) => (
          <FadeUp key={num} delay={i * 0.05}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '80px 1fr 1.5fr 1.5fr', gap: '0', background: INV.bg, alignItems: 'stretch' }}>
              <div style={{ padding: '1.5rem', background: INV.bgMid, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid rgba(232,193,141,0.08)` }}>
                <span style={{ fontFamily: INV_F.d, fontSize: '1.75rem', fontWeight: 300, color: INV.ter, opacity: 0.6 }}>{num}</span>
              </div>
              <div style={{ padding: '1.5rem 1.75rem', borderRight: `1px solid rgba(232,193,141,0.08)` }}>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.2rem', color: INV.parch, lineHeight: 1.2 }}>{stage}</div>
                <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.38, marginTop: '0.3rem' }}>{owner}</div>
              </div>
              <div style={{ padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center' }}>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.58, lineHeight: 1.7 }}>{gate}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function IAcademy() {
  const [track, setTrack] = React.useState('A');
  return (
    <section id="academy" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="04" eyebrow="Food Entrepreneur Academy" title="Two Tracks, One Goal: Stall Readiness" />
      <div style={{ display: 'flex', gap: '1px', marginBottom: '2.5rem', background: 'rgba(232,193,141,0.08)', width: 'fit-content' }}>
        {[['A', 'Track A — 8–12 Weeks', 'Launch-Ready Operators'], ['B', 'Track B — 24 Weeks', 'Early-Stage Entrepreneurs']].map(([id, label, sub]) => (
          <button key={id} onClick={() => setTrack(id)}
            style={{ padding: '1rem 2rem', background: track === id ? 'rgba(192,98,42,0.12)' : INV.bg, border: 'none', cursor: 'pointer', borderBottom: track === id ? `2px solid ${INV.ter}` : '2px solid transparent', transition: 'all 0.2s', textAlign: 'left' }}>
            <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: track === id ? INV.parch : `${INV.wheat}66`, marginBottom: '0.2rem' }}>{label}</div>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: track === id ? INV.ter : `${INV.wheat}40` }}>{sub}</div>
          </button>
        ))}
      </div>

      {track === 'A' ? (
        <div>
          <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.45, marginBottom: '2rem', maxWidth: '540px', lineHeight: 1.8 }}>
            For vendors with prior food business experience who are close to stall readiness. Twelve modules close specific knowledge and compliance gaps.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
            {TRACK_A.map(([wk, title, output]) => (
              <div key={wk} style={{ padding: '1.5rem', background: INV.bg }}>
                <div style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, opacity: 0.65, marginBottom: '0.5rem' }}>Module {wk}</div>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: INV.parch, marginBottom: '0.5rem' }}>{title}</div>
                <div style={{ fontFamily: INV_F.b, fontSize: '0.78rem', color: INV.wheat, opacity: 0.45, lineHeight: 1.6 }}>→ {output}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.45, marginBottom: '2.5rem', maxWidth: '540px', lineHeight: 1.8 }}>
            Modeled on SVEDC's Semilla program — a 24-week, three-phase track for entrepreneurs not yet ready for stall obligations. Concept validation comes before market risk.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
            {[
              { phase: 'Validate', weeks: 'Weeks 1–8',   desc: 'Define the customer and differentiation. Conduct customer interviews and recipe testing. Estimate demand and price sensitivity. Map competition and document cuisine gaps.' },
              { phase: 'Verify',   weeks: 'Weeks 9–16',  desc: 'Test concept in Hub commissary or at proof events. Collect structured customer feedback. Achieve initial compliance readiness. Develop and iterate on pricing and costing.' },
              { phase: 'Launch',   weeks: 'Weeks 17–24', desc: 'Build the full launch package (brand, ops, compliance, financials). Complete a significant proof event. Finalize capital plan. Present to selection committee for stall assignment.' },
            ].map(({ phase, weeks, desc }) => (
              <div key={phase} style={{ padding: '2.5rem 2rem', background: INV.bg }}>
                <div style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, marginBottom: '0.4rem' }}>{weeks}</div>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.75rem', color: INV.parch, marginBottom: '0.75rem', lineHeight: 1 }}>{phase}</div>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.83rem', color: INV.wheat, opacity: 0.55, lineHeight: 1.82 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.75rem', background: INV.surf, borderLeft: `2px solid rgba(192,98,42,0.32)` }}>
            <span style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.ter }}>NM Benchmark</span>
            <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.75, marginTop: '0.4rem' }}>
              South Valley Economic Development Center (SVEDC) in Albuquerque — operating since 2005 — is the direct NM precedent. SVEDC's Semilla pathway (Validate → Verify → Launch) and public outcome reporting (jobs, revenue, local purchases, women/minority-owned participation) inform the Hub's two-track academy design and impact metrics framework.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function ICriteria() {
  return (
    <section style={{ paddingBottom: '5rem' }}>
      <SectionHead num="05" eyebrow="Selection" title="Seven Scored Criteria — Consistently Applied" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2rem', maxWidth: '560px', lineHeight: 1.8 }}>
        Selection is the most consequential act in the incubator lifecycle. Criteria are scored 1–5 with a minimum combined score required for stall placement.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {CRITERIA.map(({ c, ev, flag }, i) => (
          <FadeUp key={c} delay={i * 0.04}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: INV.bg }}>
              <div style={{ padding: '1.5rem 2rem', borderRight: `1px solid rgba(232,193,141,0.08)` }}>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: INV.parch, marginBottom: '0.4rem' }}>{c}</div>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.55, lineHeight: 1.75 }}>{ev}</p>
              </div>
              <div style={{ padding: '1.5rem 2rem', background: 'rgba(239,68,68,0.03)' }}>
                <div style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f87171', opacity: 0.55, marginBottom: '0.4rem' }}>Red Flag</div>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: '#f87171', opacity: 0.5, lineHeight: 1.75 }}>{flag}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function IKPIs() {
  return (
    <section id="kpis" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="06" eyebrow="Performance Management" title="Nine KPIs — Reviewed on a Defined Schedule" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.8 }}>
        KPIs are reviewed before problems become crises — not after. Each metric has a defined review cadence, owner, and escalation threshold.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {KPIS_DATA.map(({ kpi, cadence, why }, i) => (
          <FadeUp key={kpi} delay={i * 0.04} style={{ height: '100%' }}>
            <div style={{ padding: '1.75rem', background: INV.bg, height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', gap: '1rem' }}>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.15rem', color: INV.parch, lineHeight: 1.2 }}>{kpi}</div>
                <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.ter, border: `1px solid rgba(192,98,42,0.3)`, padding: '3px 8px', flexShrink: 0 }}>{cadence}</span>
              </div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.48, lineHeight: 1.72 }}>{why}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function ICTA() {
  return (
    <section style={{ borderTop: `1px solid ${INV.bord}`, padding: '5rem 0 4rem', textAlign: 'center' }}>
      <InvEyebrow text="Ready to Invest?" center />
      <h2 style={{ fontFamily: INV_F.d, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: INV.parch, marginBottom: '1rem', lineHeight: 1.15 }}>
        See the Full Investment Case
      </h2>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.9rem', color: INV.wheat, opacity: 0.48, marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
        Full financial model, capital structure, investment tiers, and the AI-powered business plan assistant.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="Investors Page v2.html#inquiry" style={{ display: 'inline-block', background: INV.ter, color: INV.parch, padding: '14px 40px', fontFamily: INV_F.l, fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.25s' }}
          onMouseEnter={e => e.currentTarget.style.background = INV.terHov}
          onMouseLeave={e => e.currentTarget.style.background = INV.ter}>
          Request Investor Package
        </a>
        <a href="Commercial Kitchen.html" style={{ display: 'inline-block', border: `1px solid rgba(232,193,141,0.2)`, color: `${INV.wheat}bb`, padding: '13px 40px', fontFamily: INV_F.l, fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(192,98,42,0.5)'; e.currentTarget.style.color = INV.parch; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,193,141,0.2)'; e.currentTarget.style.color = `${INV.wheat}bb`; }}>
          Kitchen Manual →
        </a>
      </div>
    </section>
  );
}

function IFooter() {
  return (
    <footer style={{ background: INV.bgDark, borderTop: `1px solid ${INV.bord}`, padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: INV.parch }}>Cider <em style={{ fontStyle: 'italic', color: INV.ter }}>&amp;</em> Spice <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.28, marginLeft: '0.75rem' }}>Las Cruces, NM · Opening 2027</span></div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.68rem', color: INV.wheat, opacity: 0.2, maxWidth: '500px', lineHeight: 1.65, textAlign: 'right' }}>Operations and planning document — not legal advice. All regulatory requirements must be confirmed with applicable NM agencies before launch.</p>
    </footer>
  );
}

Object.assign(window, { INav, IHero, IOverview, IJourney, IAcademy, ICriteria, IKPIs, ICTA, IFooter });
