// grant-sections.jsx — Grant Programs page sections

const GRANTS = [
  {
    name: 'WIOA / EmployNM Wage Reimbursement',
    amount: '$135K – $185K',
    priority: 'APPLY MONTH 1',
    category: 'Workforce Development',
    eligibility: 'Hire workers from WIOA-eligible populations (low-income, unemployed, veterans, youth, reentry). Reimburses 50–100% of wages during a training period, often 6 months.',
    timeline: 'Rolling applications through NM Workforce Solutions. Apply immediately at launch — every week of delay is lost reimbursable wages.',
    strategy: 'Largest single grant in the stack. Structure hiring pipeline before opening. Coordinate with WIOA case managers at NM Workforce Solutions Las Cruces office.',
    color: '#c0622a',
    featured: true,
  },
  {
    name: 'NM Finance Authority (NMFA)',
    amount: '$100K – $200K',
    priority: 'PHASE 1',
    category: 'Capital / Infrastructure',
    eligibility: 'Public-purpose capital projects that create jobs and serve underserved communities. Hub\'s incubator mission and community impact metrics align strongly.',
    timeline: 'Competitive grant rounds. Pre-application contact with NMFA loan/grant officers recommended before formal submission.',
    strategy: 'Pair with city council resolution of support and letters from Elevate Las Cruces and Visit Las Cruces. City alignment with 4 adopted plans is a strong differentiator.',
    color: '#d4a84b',
    featured: false,
  },
  {
    name: 'Healthy Food Financing Initiative (HFFF)',
    amount: '$75K – $125K',
    priority: 'PHASE 1',
    category: 'Food Access / Equity',
    eligibility: 'CDFI-channeled federal funding targeting food access in underserved communities. Hub\'s 70% first-time/minority/immigrant vendor reservation and Las Cruces market demographics qualify.',
    timeline: '6–12 month application cycle via CDFI intermediaries (NMCDC, Self-Help, etc.).',
    strategy: 'Document food access gap (zero food hall in 200 miles), demographic data from MRA survey, and vendor equity targets. Engage NM CDFI intermediaries early.',
    color: '#6b8c6b',
    featured: false,
  },
  {
    name: 'EPE / MVEDA Economic Development',
    amount: '$65K – $80K',
    priority: 'PHASE 1',
    category: 'Regional Economic Development',
    eligibility: 'El Paso Electric and Mesilla Valley Economic Development Alliance support job-creating business development in the Borderplex region. $100K precedent confirmed for a Las Cruces business.',
    timeline: 'Relationship-driven; schedule introductory meeting before formal application.',
    strategy: 'Lead with job creation numbers (50–70 total), NMSU/Fort Bliss proximity, and data center workforce pipeline. Emphasize regional economic multiplier effect.',
    color: '#8c7a6b',
    featured: false,
  },
  {
    name: 'DLCP Renovate Main Street',
    amount: '$25K cap',
    priority: 'PHASE 2',
    category: 'Downtown / MRA Revitalization',
    eligibility: 'NM MainStreet program for downtown commercial property improvement in designated MainStreet districts. West Picacho MRA site qualifies.',
    timeline: 'Annual grant cycle. Site selection must be finalized before application — tied to West Picacho/Motel Blvd MRA site.',
    strategy: 'Cap is firm at $25K but relatively straightforward to qualify for once site is in a designated district. Stack with MRA TIF and city revitalization narrative.',
    color: '#7a6b8c',
    featured: false,
  },
  {
    name: 'Workforce / USDA / Tourism Bundle',
    amount: '$50K – $100K+',
    priority: 'PHASE 2',
    category: 'Multiple Programs',
    eligibility: 'USDA Rural Business Development Grant (RBDG), NM Tourism Destination Forward, NM JTIP (Job Training Incentive), NMEDD LEDA — all have overlapping eligibility with the Hub mission.',
    timeline: 'Staggered by program. USDA RBDG has competitive annual cycle. NM JTIP is employer-driven and rolling.',
    strategy: 'Layer these programs after WIOA and NMFA are secured. Each requires separate documentation but shares the same core job creation and economic impact narrative.',
    color: '#5c6b7a',
    featured: false,
  },
];

const MRA_DATA = [
  { plan: 'Elevate Las Cruces (2020)',         alignment: 'Hub is a direct implementation of the economic diversification and entrepreneurship development goals in the city\'s primary economic strategy document.' },
  { plan: 'East Lohman Development Plan (2021)', alignment: 'Identified food hall / culinary destination as a target development typology for the East Lohman corridor — a category the Hub fills precisely.' },
  { plan: 'W. Picacho / Motel Blvd MRA (2026)', alignment: 'West Picacho site is in a newly designated MRA with TIF authority up to 75% tax increment. Hub is a catalytic anchor-use project the MRA plan specifically anticipates.' },
  { plan: 'El Paseo / S. Solano MRA (2025)',    alignment: 'Broader Southwest Las Cruces revitalization — Hub participation in MRA planning creates access to TIF and façade grant programs across multiple MRA districts.' },
];

// ── Hero ─────────────────────────────────────────────────────────────────────

function GHero() {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);
  const a = d => ({ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: `opacity .8s ease ${d}s, transform .8s ease ${d}s` });
  return (
    <section style={{ position: 'relative', minHeight: '58vh', display: 'flex', alignItems: 'center', background: `radial-gradient(ellipse 65% 45% at 30% 50%, rgba(192,98,42,0.13) 0%, transparent 60%), ${INV.bg}`, borderBottom: `1px solid ${INV.bord}`, overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(232,193,141,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,193,141,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.018 }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '72rem', margin: '0 auto', padding: '8rem 2rem 5rem', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{ ...a(0.1), display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ height: '1px', width: '28px', background: INV.ter, display: 'block' }} />
            <span style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: INV.ter }}>Non-Dilutive Capital Stack · Las Cruces Culinary Hub</span>
          </div>
          <h1 style={{ ...a(0.25), fontFamily: INV_F.d, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.06, color: INV.parch, marginBottom: '1.5rem', letterSpacing: '-0.015em' }}>
            Grant Programs<br /><em style={{ fontStyle: 'italic', color: INV.ter }}>&amp; City Alignment</em>
          </h1>
          <p style={{ ...a(0.4), fontFamily: INV_F.b, fontSize: '1rem', lineHeight: 1.85, color: INV.wheat, opacity: 0.62, maxWidth: '520px' }}>
            Six grant categories totaling $405K–$595K in non-dilutive capital. Four adopted city plans that directly name the Hub as a target development type. No grant is committed before award — the SBA stack stands alone.
          </p>
        </div>
        {/* Summary tiles */}
        <div style={{ ...a(0.45), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
          {[['$405K–$595K', 'Total Grants Targeted'], ['$135–185K', 'WIOA — Apply Month 1'], ['4', 'City Plans Aligned'], ['75%', 'MRA TIF Authority']].map(([v, l]) => (
            <div key={l} style={{ padding: '1.75rem 1.5rem', background: INV.bgMid }}>
              <div style={{ fontFamily: INV_F.d, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 300, color: INV.ter, lineHeight: 1, marginBottom: '0.4rem' }}>{v}</div>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Grant cards ───────────────────────────────────────────────────────────────

function GrantCard({ grant, delay }) {
  const [ref, inView] = useInView(0.06);
  const [open, setOpen] = React.useState(grant.featured);
  return (
    <div ref={ref} style={{ background: grant.featured ? 'rgba(192,98,42,0.07)' : INV.bg, borderTop: `2px solid ${grant.featured ? INV.ter : 'rgba(232,193,141,0.1)'}`, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: `opacity .72s ease ${delay}s, transform .72s ease ${delay}s` }}>
      <button onClick={() => setOpen(v => !v)} style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: '1.25rem', padding: '2rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            {grant.featured && <span style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f87171', border: '1px solid rgba(248,113,113,0.35)', padding: '2px 10px' }}>⚑ {grant.priority}</span>}
            <span style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.38 }}>{grant.category}</span>
          </div>
          <div style={{ fontFamily: INV_F.d, fontSize: '1.25rem', color: INV.parch, lineHeight: 1.2, marginBottom: '0.3rem' }}>{grant.name}</div>
          <div style={{ fontFamily: INV_F.d, fontSize: '1.5rem', fontWeight: 300, color: grant.color }}>{grant.amount}</div>
        </div>
        <span style={{ color: INV.ter, fontSize: '1.1rem', flexShrink: 0, marginTop: '4px', display: 'inline-block', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.28s' }}>+</span>
      </button>

      {open && (
        <div style={{ padding: '0 2rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[['Eligibility', grant.eligibility], ['Timeline', grant.timeline], ['Strategy', grant.strategy]].map(([lbl, txt]) => (
            <div key={lbl}>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.ter, opacity: 0.7, marginBottom: '0.4rem' }}>{lbl}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.55, lineHeight: 1.8 }}>{txt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GGrants() {
  return (
    <section id="grants" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <SectionHead num="01" eyebrow="Grant Matrix" title="Six Categories — Priority Order" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.85rem', color: INV.wheat, opacity: 0.4, marginBottom: '2rem', maxWidth: '560px', lineHeight: 1.82 }}>
        No grant capital is committed before a documented award. The SBA 7(a) + owner equity stack fully funds the project without any grant. Grants reduce investor equity requirements and improve return math.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '4rem' }}>
        {GRANTS.map((g, i) => <GrantCard key={g.name} grant={g} delay={i * 0.06} />)}
      </div>

      {/* WIOA spotlight */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(192,98,42,0.1)', border: `1px solid rgba(192,98,42,0.25)`, marginBottom: '1.5rem' }}>
        <div style={{ padding: '2.5rem 2rem' }}>
          <InvEyebrow text="Priority Application — Month 1" />
          <h3 style={{ fontFamily: INV_F.d, fontSize: '2rem', fontWeight: 300, color: INV.parch, lineHeight: 1.1, marginBottom: '0.75rem' }}>WIOA is the single most important grant in the stack</h3>
          <p style={{ fontFamily: INV_F.b, fontSize: '0.85rem', color: INV.wheat, opacity: 0.58, lineHeight: 1.82 }}>Every week of delay after opening is money left on the table. Wage reimbursements are tied to actual payroll — the clock starts when staff are hired. The WIOA application should be submitted before the first employee is onboarded.</p>
        </div>
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[['Reimbursement rate', '50–100% of qualifying wages'], ['Eligible period', 'Typically 6 months per worker'], ['Populations', 'Low-income, unemployed, veterans, youth, reentry'], ['Application', 'NM Workforce Solutions — Las Cruces office']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid rgba(232,193,141,0.1)`, paddingBottom: '0.5rem' }}>
              <span style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4 }}>{l}</span>
              <span style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.parch, opacity: 0.8 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.75rem', color: INV.wheat, opacity: 0.28, lineHeight: 1.7 }}>Grant amounts are estimated ranges based on comparable projects and program guidelines. Actual awards depend on application quality, available program funds, and agency discretion. All amounts must be confirmed with applicable program officers.</p>
    </section>
  );
}

// ── City Alignment ────────────────────────────────────────────────────────────

function GCityAlignment() {
  return (
    <section id="alignment" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="02" eyebrow="Policy Alignment" title="Four Adopted City Plans That Name the Hub" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.85rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.82 }}>
        Most food businesses apply for grants. The Hub is a direct implementation of adopted public policy — a categorically different position in grant review.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '3rem' }}>
        {MRA_DATA.map(({ plan, alignment }, i) => (
          <FadeUp key={plan} delay={i * 0.06}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', background: INV.bg }}>
              <div style={{ padding: '2rem', borderRight: `1px solid rgba(232,193,141,0.08)`, background: INV.bgMid }}>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: INV.parch, lineHeight: 1.3 }}>{plan}</div>
              </div>
              <div style={{ padding: '2rem 2.25rem' }}>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.58, lineHeight: 1.82 }}>{alignment}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* MRA TIF explanation */}
      <SectionHead num="03" eyebrow="MRA Tax Increment Financing" title="Up to 75% Tax Increment — West Picacho Site" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {[
          { title: 'What is TIF?', body: 'Tax Increment Financing captures the new property and gross receipts tax revenue generated by a development project within a designated MRA district, and redirects a portion back to the developer for eligible capital improvements.' },
          { title: 'West Picacho MRA Advantage', body: 'The W. Picacho/Motel Blvd MRA (adopted 2026) is a newly designated district with up to 75% TIF authority. A Hub development on this corridor is the exact catalytic anchor-use project the plan anticipates.' },
          { title: 'Combined Grant Stack', body: 'West Picacho site activates MRA TIF + Renovate Main Street ($25K) + city revitalization narrative across all other grants. The strongest grant stack of the four candidate sites.' },
        ].map(({ title, body }, i) => (
          <FadeUp key={title} delay={i * 0.08} style={{ height: '100%' }}>
            <div style={{ padding: '2.25rem 2rem', background: INV.bg, height: '100%' }}>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.25rem', color: INV.parch, marginBottom: '0.75rem', lineHeight: 1.2 }}>{title}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.55, lineHeight: 1.82 }}>{body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── CTA + Footer ──────────────────────────────────────────────────────────────

function GCTA() {
  return (
    <section style={{ borderTop: `1px solid ${INV.bord}`, padding: '5rem 0 4rem', textAlign: 'center' }}>
      <InvEyebrow text="Ready to Invest?" center />
      <h2 style={{ fontFamily: INV_F.d, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, color: INV.parch, marginBottom: '1rem', lineHeight: 1.15 }}>See the Full Capital Structure</h2>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.9rem', color: INV.wheat, opacity: 0.45, margin: '0 auto 2rem', maxWidth: '440px', lineHeight: 1.82 }}>Full financial model, SBA stack, investment tiers, and the AI-powered business plan assistant — on the investor overview.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="Investors Page v2.html#inquiry" style={{ display: 'inline-block', background: INV.ter, color: INV.parch, padding: '14px 40px', fontFamily: INV_F.l, fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.25s' }} onMouseEnter={e => e.currentTarget.style.background = INV.terHov} onMouseLeave={e => e.currentTarget.style.background = INV.ter}>Request Investor Package</a>
        <a href="Investors Page v2.html#search" style={{ display: 'inline-block', border: `1px solid rgba(232,193,141,0.2)`, color: `${INV.wheat}bb`, padding: '13px 40px', fontFamily: INV_F.l, fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s' }} onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(192,98,42,0.5)'; e.currentTarget.style.color=INV.parch; }} onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(232,193,141,0.2)'; e.currentTarget.style.color=`${INV.wheat}bb`; }}>Ask the Business Plan →</a>
      </div>
    </section>
  );
}

function GFooter() {
  return (
    <footer style={{ background: INV.bgDark, borderTop: `1px solid ${INV.bord}`, padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: INV.parch }}>Cider <em style={{ fontStyle: 'italic', color: INV.ter }}>&amp;</em> Spice <span style={{ fontFamily: INV_F.l, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.25, marginLeft: '0.75rem' }}>Las Cruces, NM · Opening 2027</span></div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.68rem', color: INV.wheat, opacity: 0.2, maxWidth: '500px', lineHeight: 1.65, textAlign: 'right' }}>Grant amounts are estimated ranges. All programs require separate applications and are subject to eligibility, fund availability, and agency discretion. Not legal or financial advice.</p>
    </footer>
  );
}

Object.assign(window, { GHero, GGrants, GCityAlignment, GCTA, GFooter });
