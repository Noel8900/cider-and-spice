// inv-sections.jsx — Opportunity, Financials, Comparables, Tiers, Timeline (redesigned)

// ── Opportunity / Why Now ─────────────────────────────────────────────────────

const WHY_NOW_DATA = [
  { glyph: '◆', title: 'Zero Direct Competitors',     body: 'No food hall exists within 200 miles. Cider & Spice enters an uncontested market in a 215,000-person metro with a rapidly growing food tourism scene.' },
  { glyph: '◈', title: '6 Grant Categories Targeted', body: 'Structured for CDBG, NM MainStreet, USDA RBDG, EDA, SBA 7(a), and Opportunity Zone funding — meaningfully reducing equity requirements and investor risk.' },
  { glyph: '◉', title: 'Seven Revenue Streams',        body: 'Vendor stall licenses, ghost kitchen bays, commissary kitchen rentals, Cider Club memberships ($25–$85/mo), cider bar beverage sales, events & space rental, and gift shop/retail — diversified cash flow from day one.' },
  { glyph: '◇', title: 'SBA 7(a) Senior Debt',        body: 'Pre-qualification in progress. SBA covers 56.5% of the raise — investor equity benefits from leverage and the federal guarantee reduces senior risk.' },
  { glyph: '✦', title: 'City & State Alignment',      body: 'Endorsed by Elevate Las Cruces and aligned with the East Lohman Development Plan and West Picacho MRA — grant-favorable positioning across multiple programs.' },
  { glyph: '◇', title: 'Conservative Underwriting',   body: 'Appendix F model uses deliberately conservative ramp assumptions. Monthly cash-flow breakeven ~Month 17. 17–20% illustrative IRR from base-case projections only.' },
];

function WhyCard({ glyph, title, body, delay }) {
  const [ref, inView] = useInView(0.08);
  const [hov, setHov] = React.useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? INV.surf : INV.bg,
        padding: '2.5rem 2rem',
        borderTop: `2px solid ${hov ? INV.ter : 'transparent'}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: `opacity .72s ease ${delay}s, transform .72s ease ${delay}s, border-color .25s, background .25s`,
      }}>
      <span style={{ fontFamily: INV_F.d, fontSize: '1.5rem', color: INV.ter, opacity: 0.5, display: 'block', marginBottom: '1.2rem', lineHeight: 1 }} aria-hidden="true">{glyph}</span>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.3rem', fontWeight: 400, color: INV.parch, marginBottom: '0.7rem', lineHeight: 1.2 }}>{title}</div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', lineHeight: 1.82, color: INV.wheat, opacity: 0.58 }}>{body}</p>
    </div>
  );
}

function InvOpportunity() {
  var isMobile = useIsMobile();
  return (
    <section id="opportunity" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <SectionHead num="01" eyebrow="Why This Opportunity" title="Six Reasons the Timing Is Right" />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {WHY_NOW_DATA.map((item, i) => <WhyCard key={item.title} {...item} delay={i * 0.07} />)}
      </div>
    </section>
  );
}

// ── Financials ────────────────────────────────────────────────────────────────

function FinBar({ label, display, pct, active, color, delay }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5 }}>{label}</span>
        <span style={{ fontFamily: INV_F.d, fontSize: '1.4rem', fontWeight: 300, color: color || INV.ter }}>{display}</span>
      </div>
      <div style={{ height: '3px', background: 'rgba(232,193,141,0.1)' }}>
        <div style={{ height: '100%', width: active ? `${pct}%` : '0%', background: color || INV.ter, transition: `width 1.3s cubic-bezier(0.16, 1, 0.3, 1) ${delay || 0}s` }} />
      </div>
    </div>
  );
}

// 3-Year financials data table — horizontal scroll on tablet, card-collapse on mobile
const FIN_YEARS = ['Year 1 · 2027', 'Year 2 · 2028', 'Year 3 · 2029'];
const FIN_ROWS = [
  { metric: 'Revenue',       vals: ['$826K',  '$1.39M', '$1.70M'] },
  { metric: 'EBITDA',        vals: ['\u2013$194K', '$160K',  '$570K'], note: 'Y1 ramp loss covered by reserve' },
  { metric: 'EBITDA Margin', vals: ['\u201323.5%', '11.5%',  '33.5%'] },
];

function FinTable() {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Collapse to a stacked card per year
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '2.5rem' }}>
        {FIN_YEARS.map((yr, yi) => (
          <div key={yr} style={{ background: INV.bg, padding: '1.4rem 1.5rem' }}>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.ter, marginBottom: '1rem' }}>{yr}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {FIN_ROWS.map(row => (
                <div key={row.metric} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid rgba(232,193,141,0.07)`, paddingBottom: '0.6rem' }}>
                  <span style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5 }}>{row.metric}</span>
                  <span style={{ fontFamily: INV_F.d, fontSize: '1.4rem', fontWeight: 300, color: INV.ter }}>{row.vals[yi]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop / tablet — real table, horizontally scrollable if cramped
  const th = { fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5, padding: '0 0 1rem', textAlign: 'right', fontWeight: 400 };
  const thFirst = { ...th, textAlign: 'left' };
  return (
    <div style={{ overflowX: 'auto', marginBottom: '2.5rem', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', minWidth: '520px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${INV.bordM}` }}>
            <th style={thFirst}>Metric</th>
            {FIN_YEARS.map(yr => <th key={yr} style={{ ...th, color: INV.ter, opacity: 0.85 }}>{yr}</th>)}
          </tr>
        </thead>
        <tbody>
          {FIN_ROWS.map((row, ri) => (
            <tr key={row.metric} style={{ borderBottom: `1px solid rgba(232,193,141,0.07)` }}>
              <td style={{ padding: '1.05rem 0', textAlign: 'left' }}>
                <span style={{ fontFamily: INV_F.l, fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.62, display: 'block' }}>{row.metric}</span>
                {row.note && <span style={{ fontFamily: INV_F.b, fontSize: '0.66rem', color: INV.wheat, opacity: 0.3 }}>{row.note}</span>}
              </td>
              {row.vals.map((v, vi) => (
                <td key={vi} style={{ padding: '1.05rem 0 1.05rem 1.5rem', textAlign: 'right', fontFamily: INV_F.d, fontSize: '1.55rem', fontWeight: 300, color: ri === 0 ? INV.ter : INV.gold }}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Uses of Funds / Capital Budget ─────────────────────────────────────────────

const USES_TOTAL = 1578000;
const USES_GROUPS = [
  {
    name: 'Buildout, Equipment & Systems', total: 1021000, pct: 65, shade: INV.ter,
    items: [
      ['Leasehold improvements & construction', '$656,000'],
      ['Kitchen equipment & FFE', '$195,000'],
      ['Cider bar buildout', '$65,000'],
      ['POS / IT / security systems', '$40,000'],
      ['Grease interceptor', '$35,000'],
      ['Signage & interior finishes', '$30,000'],
    ],
  },
  {
    name: 'Working-Capital Reserve', total: 272000, pct: 17, shade: INV.gold,
    items: [
      ['Year-1 operating cash burn through Month 12', '$272,000'],
    ],
  },
  {
    name: 'Soft Costs & Professional Fees', total: 166000, pct: 11, shade: 'rgba(192,98,42,0.62)',
    items: [
      ['GC overhead & contingency (~10%)', '$60,000'],
      ['Architecture, design & engineering', '$45,000'],
      ['Permits, inspections & liquor license', '$35,000'],
      ['Legal & entity formation', '$18,000'],
      ['Pre-opening insurance', '$8,000'],
    ],
  },
  {
    name: 'Pre-Opening & Launch', total: 119000, pct: 7, shade: 'rgba(212,168,75,0.55)',
    items: [
      ['Pre-opening staff salaries', '$62,000'],
      ['Launch marketing & grand opening', '$35,000'],
      ['Opening inventory (bar & commissary)', '$22,000'],
    ],
  },
];

function UsesOfFunds() {
  const [ref, inView] = useInView(0.12);
  const isMobile = useIsMobile();
  return (
    <div ref={ref} style={{ marginTop: '3.5rem', paddingTop: '3rem', borderTop: `1px solid ${INV.bordM}` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.4rem' }}>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.45 }}>Total Project Cost · Sources &amp; Uses</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.3 }}>Revised Cash Flow Model · Appendix F</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginBottom: '1.75rem' }}>
        <span style={{ fontFamily: INV_F.d, fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 300, color: INV.ter, lineHeight: 1 }}>$1,578,000</span>
        <span style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.4 }}>base plan · ~$197/sf all-in across 8,000 sq ft</span>
      </div>

      {/* Stacked allocation bar */}
      <div style={{ display: 'flex', width: '100%', height: '14px', marginBottom: '0.85rem', overflow: 'hidden' }}>
        {USES_GROUPS.map((g, i) => (
          <div key={g.name} title={`${g.name} — ${g.pct}%`}
            style={{ width: inView ? g.pct + '%' : '0%', background: g.shade, height: '100%', marginRight: i < USES_GROUPS.length - 1 ? '2px' : 0, transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s` }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1.5rem', marginBottom: '2.5rem' }}>
        {USES_GROUPS.map(g => (
          <span key={g.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5 }}>
            <span style={{ width: '9px', height: '9px', background: g.shade, flexShrink: 0 }} />
            {g.name.split(' ')[0]} · {g.pct}%
          </span>
        ))}
      </div>

      {/* Group breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {USES_GROUPS.map((g, gi) => (
          <FadeUp key={g.name} delay={gi * 0.07} style={{ height: '100%' }}>
            <div style={{ background: INV.bg, padding: '1.9rem 1.85rem', height: '100%', borderTop: `2px solid ${g.shade}` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: INV_F.d, fontSize: '1.25rem', fontWeight: 400, color: INV.parch, lineHeight: 1.2 }}>{g.name}</span>
                <span style={{ fontFamily: INV_F.d, fontSize: '1.5rem', fontWeight: 300, color: INV.ter, whiteSpace: 'nowrap', lineHeight: 1 }}>${(g.total / 1000).toFixed(0)}K</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {g.items.map(([label, amt]) => (
                  <li key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'baseline', borderBottom: `1px solid rgba(232,193,141,0.06)`, paddingBottom: '0.5rem' }}>
                    <span style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.6, lineHeight: 1.5 }}>{label}</span>
                    <span style={{ fontFamily: INV_F.l, fontSize: '0.74rem', letterSpacing: '0.04em', color: INV.gold, opacity: 0.85, whiteSpace: 'nowrap' }}>{amt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1.35rem 1.75rem', background: INV.surf, borderLeft: `3px solid rgba(192,98,42,0.35)` }}>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.81rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.8, margin: 0 }}>
          <span style={{ color: INV.parch, fontWeight: 600 }}>Capital structure: SBA 7(a) $850K · Grants $375K · Owner equity $0.</span> Construction + FF&amp;E + soft costs = $1,306K (Appendix F revised model); $272K working-capital reserve covers the Year-1 ramp (EOY cash −$123.9K). A $100K SBA-backed working-capital line of credit provides additional buffer. SBA debt service: $10,042/mo at 9.625% / 25 yr.
        </p>
      </div>
    </div>
  );
}

function InvFinancials() {
  const [ref, inView] = useInView(0.18);
  const isMobile = useIsMobile();
  return (
    <section id="financials" ref={ref} style={{ paddingBottom: '5rem' }}>
      <SectionHead num="02" eyebrow="3-Year Conservative Model" title="Disciplined Financials, Built to Survive the Ramp" />

      {/* Big revenue arc */}
      <FadeUp style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {[['$826K', 'Year 1'], ['→', null], ['$1.39M', 'Year 2'], ['→', null], ['$1.70M', 'Year 3']].map(([v, l], i) => (
            v === '→'
              ? <span key={i} style={{ fontFamily: INV_F.d, fontSize: '1.75rem', color: `${INV.ter}40`, lineHeight: 1 }}>→</span>
              : <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: INV_F.d, fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: INV.ter, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.35, marginTop: '0.3rem' }}>{l} Revenue</div>
                </div>
          ))}
        </div>
      </FadeUp>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4rem', marginBottom: '2.5rem' }}>
        {/* Revenue bars */}
        <div>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.35, marginBottom: '1.75rem' }}>Annual Revenue</div>
          <FinBar label="Year 1 · 2027" display="$826K"  pct={49}  active={inView} delay={0.1} />
          <FinBar label="Year 2 · 2028" display="$1.39M" pct={82}  active={inView} delay={0.2} />
          <FinBar label="Year 3 · 2029" display="$1.70M" pct={100} active={inView} delay={0.3} />
          <p style={{ fontFamily: INV_F.b, fontSize: '0.78rem', color: INV.wheat, opacity: 0.32, marginTop: '1.25rem', lineHeight: 1.75 }}>
            Conservative Appendix F ramp. Comparable food halls generate $4M–$12M at stabilization.
          </p>
        </div>

        {/* EBITDA + stat tiles */}
        <div>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.35, marginBottom: '1.75rem' }}>EBITDA</div>
          <FinBar label="Year 1 · 2027" display="−$194K" pct={0}   active={inView} color={`${INV.wheat}25`} delay={0.1} />
          <FinBar label="Year 2 · 2028" display="$160K"  pct={28}  active={inView} color={INV.gold}         delay={0.2} />
          <FinBar label="Year 3 · 2029" display="$570K"  pct={100} active={inView} color={INV.gold}         delay={0.3} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '1.75rem' }}>
            {[['Y1 EOY Cash', '−$123.9K'], ['Breakeven', 'Mo. 17'], ['Y3 Margin', '33.5%'], ['Illustrative IRR', '17–20%']].map(([l, v]) => (
              <div key={l} style={{ padding: '1rem 1.1rem', background: INV.surf, borderLeft: `2px solid rgba(192,98,42,0.28)` }}>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.3rem', fontWeight: 300, color: INV.ter, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.36, marginTop: '0.3rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FinTable />

      <div style={{ padding: '1.5rem 2rem', background: INV.surf, borderLeft: `3px solid rgba(192,98,42,0.35)` }}>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.48, lineHeight: 1.8, marginBottom: '0.5rem' }}>
          Appendix F GAAP ramp is the governing investor and lender model. (−$194K EBITDA) is expected, modeled, and covered by the $272K working capital reserve. EBITDA turns positive in Year 2 ($160K); monthly cash-flow breakeven reached ~Month 17.
        </p>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, opacity: 0.62 }}>Planning-stage estimates · CPA and lender review required before commitment</span>
      </div>

      <UsesOfFunds />
    </section>
  );
}

// ── Comparables ───────────────────────────────────────────────────────────────

const COMPS = [
  { name: 'Krog Street Market', city: 'Atlanta, GA',    sf: '~9,000 sf',  rev: '$8M–$12M' },
  { name: 'Politan Row',        city: 'Houston, TX',    sf: '~10,000 sf', rev: '$6M–$9M'  },
  { name: 'Findlay Market',     city: 'Cincinnati, OH', sf: '~8,000 sf',  rev: '$4M–$7M'  },
];

function InvComparables() {
  return (
    <section style={{ paddingBottom: '5rem' }}>
      <SectionHead num="03" eyebrow="Market Comparables" title="Year 3 Target Well Below Stabilized Peers" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '1.5rem' }}>
        {COMPS.map((c, i) => (
          <FadeUp key={c.name} delay={i * 0.08} style={{ height: '100%' }}>
            <div style={{ background: INV.bg, padding: '2rem 1.75rem', height: '100%' }}>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.2rem', color: INV.parch, marginBottom: '0.3rem' }}>{c.name}</div>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.35, marginBottom: '1.25rem' }}>{c.city} · {c.sf}</div>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.5rem', color: INV.gold }}>{c.rev}</div>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.28, marginTop: '0.3rem' }}>Stabilized Revenue</div>
            </div>
          </FadeUp>
        ))}
        <FadeUp delay={0.24} style={{ height: '100%' }}>
          <div style={{ background: 'rgba(192,98,42,0.09)', padding: '2rem 1.75rem', borderTop: `2px solid ${INV.ter}`, height: '100%' }}>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.ter, marginBottom: '0.55rem' }}>Cider &amp; Spice</div>
            <div style={{ fontFamily: INV_F.d, fontSize: '1.2rem', color: INV.parch, marginBottom: '0.3rem' }}>Year 3 Conservative Target</div>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.35, marginBottom: '1.25rem' }}>Las Cruces, NM · 8K–10K sf · First-Mover</div>
            <div style={{ fontFamily: INV_F.d, fontSize: '1.5rem', color: INV.ter }}>$1.70M</div>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.ter, opacity: 0.55, marginTop: '0.3rem' }}>Significant upside vs. comps</div>
          </div>
        </FadeUp>
      </div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.78rem', color: INV.wheat, opacity: 0.3, lineHeight: 1.72 }}>
        Comparable revenues are publicly referenced estimates. C&S Year 3 target sits well below stabilized comps — first-mover in an uncontested market.
      </p>
    </section>
  );
}

// ── Tiers ─────────────────────────────────────────────────────────────────────

const TIERS_DATA = [
  { name: 'Community Investor', range: '',           glyph: '◇', featured: false, perks: ['Investor newsletter & quarterly updates', 'Named recognition in Hub materials', 'Early access to Cider Club founding membership', 'Appendix F 3-year projection summary'] },
  { name: 'Growth Partner',     range: '',           glyph: '◈', featured: true,  perks: ['All Community Investor perks', 'Quarterly investor briefings', 'Priority commissary kitchen bookings', 'Hub Advisory Board observer seat', 'Full Appendix F Cashflow Model access'] },
  { name: 'Founding Investor',  range: '',           glyph: '◆', featured: false, perks: ['All Growth Partner perks', 'Named feature in Hub signage & website', 'Annual private cider pairing dinner', 'Equity participation discussion eligible', 'Co-investment in graduating vendors (5–15%)'] },
];

function TierCard({ tier, delay }) {
  const [ref, inView] = useInView(0.08);
  const [hov, setHov] = React.useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '3rem 2.5rem',
        background: tier.featured ? 'rgba(192,98,42,0.09)' : INV.bg,
        borderTop: `2px solid ${tier.featured ? INV.ter : hov ? 'rgba(192,98,42,0.38)' : 'transparent'}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(24px)',
        transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s, border-color .25s`,
      }}>
      {tier.featured && (
        <span style={{ display: 'inline-block', border: `1px solid rgba(192,98,42,0.4)`, padding: '4px 14px', fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, marginBottom: '1.5rem' }}>Most Inquired</span>
      )}
      <span style={{ fontFamily: INV_F.d, fontSize: '2rem', color: tier.featured ? INV.ter : `${INV.ter}55`, display: 'block', marginBottom: '1.25rem', lineHeight: 1 }} aria-hidden="true">{tier.glyph}</span>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.6rem', fontWeight: 400, color: INV.parch, marginBottom: '0.3rem', lineHeight: 1.15 }}>{tier.name}</div>
      {tier.range && <div style={{ fontFamily: INV_F.l, fontSize: '0.75rem', letterSpacing: '0.1em', color: INV.ter, marginBottom: '1.75rem' }}>{tier.range}</div>}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2.25rem' }}>
        {tier.perks.map(perk => (
          <li key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: INV_F.b, fontSize: '0.83rem', color: `${INV.wheat}65`, lineHeight: 1.65 }}>
            <span style={{ color: INV.ter, flexShrink: 0, marginTop: '3px', fontSize: '0.6rem' }} aria-hidden="true">◈</span>
            {perk}
          </li>
        ))}
      </ul>
      <a href="#inquiry"
        style={{ display: 'inline-block', border: `1px solid rgba(192,98,42,${tier.featured ? '0.6' : '0.28'})`, padding: '11px 26px', fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: tier.featured ? INV.ter : `${INV.ter}82`, textDecoration: 'none', transition: 'all 0.25s' }}
        onMouseEnter={e => { e.currentTarget.style.background = INV.ter; e.currentTarget.style.color = INV.parch; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = tier.featured ? INV.ter : `${INV.ter}82`; }}>
        Request Info
      </a>
    </div>
  );
}

function InvTiers() {
  return (
    <section id="tiers" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="06" eyebrow="Participation" title="Investment Tiers" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.38, marginBottom: '2.5rem' }}>All discussions conducted privately. No online transactions.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {TIERS_DATA.map((tier, i) => <TierCard key={tier.name} tier={tier} delay={i * 0.1} />)}
      </div>
    </section>
  );
}

// ── Timeline — four-phase roadmap (vertical mobile → horizontal stepped desktop) ─

const PHASES = [
  {
    num: '01', title: 'Planning & Compliance', time: 'In Progress · 2026', status: 'current',
    detail: 'Active now — consolidating the business plan, advancing SBA 7(a) pre-qualification, preparing grant applications, and running four-site diligence with zoning verification.',
    items: ['Business plan v22', 'SBA 7(a) pre-qual', 'Grant applications drafted', 'Site & zoning diligence'],
  },
  {
    num: '02', title: 'Capital Deployment', time: 'Q3–Q4 2026', status: 'upcoming',
    detail: 'Close the SBA 7(a) loan, submit NMFA / HFFF / EPE grant applications, finalize site lease, and complete the investor capital raise.',
    items: ['SBA 7(a) close ($850K)', 'Grant submissions', 'Site lease / LOI', 'Investor capital close'],
  },
  {
    num: '03', title: 'Construction', time: 'Q4 2026 – Q1 2027', status: 'upcoming',
    detail: 'Leasehold buildout — stall kitchens, cider bar tap system, HVAC and MEP, plus permits, inspections, and the liquor license.',
    items: ['Leasehold buildout', 'Stall + cider bar systems', 'Permits & inspections', 'Liquor license'],
  },
  {
    num: '04', title: 'Launch', time: 'Q1 2027', status: 'upcoming',
    detail: 'Vendor onboarding, soft open with confirmed anchors, Cider Club founding members, grand opening, and full operations.',
    items: ['Vendor onboarding', 'Soft open — anchors', 'Cider Club launch', 'Grand opening'],
  },
];

const PH_META = {
  complete: { color: INV.ter,  badge: 'Complete',     dim: 1 },
  current:  { color: INV.ter,  badge: 'Current Phase', dim: 1 },
  upcoming: { color: INV.wheat, badge: 'Upcoming',     dim: 0.62 },
};

const TL_STYLE = `
  @keyframes inv-tl-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(192,98,42,0.55); } 70% { box-shadow: 0 0 0 11px rgba(192,98,42,0); } }
  @keyframes inv-tl-core { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
  .inv-tl-card { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, background 0.25s; }
  .inv-tl-card:hover { transform: translateY(-4px); }
`;

function PhaseMarker({ status, glyph }) {
  const m = PH_META[status];
  if (status === 'current') {
    return (
      <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: INV.ter, animation: 'inv-tl-glow 2.2s ease-out infinite', flexShrink: 0 }} aria-hidden="true">
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: INV.bgDark, animation: 'inv-tl-core 2.2s ease infinite' }} />
      </span>
    );
  }
  if (status === 'complete') {
    return <span style={{ width: '14px', height: '14px', background: INV.ter, flexShrink: 0, display: 'inline-block' }} aria-hidden="true" />;
  }
  return <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: INV.bgMid, border: `2px solid rgba(232,193,141,0.28)`, flexShrink: 0, display: 'inline-block' }} aria-hidden="true" />;
}

function PhaseCard({ phase, vertical }) {
  const [hov, setHov] = React.useState(false);
  const m = PH_META[phase.status];
  const isCurrent = phase.status === 'current';
  return (
    <div className="inv-tl-card"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: isCurrent ? 'rgba(192,98,42,0.08)' : INV.bg,
        border: `1px solid ${isCurrent ? 'rgba(192,98,42,0.42)' : hov ? 'rgba(192,98,42,0.3)' : INV.bord}`,
        boxShadow: isCurrent ? '0 16px 40px -22px rgba(192,98,42,0.6)' : hov ? '0 14px 34px -24px rgba(0,0,0,0.7)' : 'none',
        padding: vertical ? '1.5rem 1.6rem' : '1.6rem 1.5rem',
        opacity: m.dim, height: '100%',
        display: 'flex', flexDirection: 'column', gap: '0.85rem',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <span style={{ fontFamily: INV_F.d, fontSize: '0.95rem', color: `${m.color}${phase.status === 'upcoming' ? '70' : ''}`, opacity: phase.status === 'upcoming' ? 0.7 : 1 }}>Phase {phase.num}</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: m.color, opacity: isCurrent ? 0.95 : 0.62, border: `1px solid ${m.color}${isCurrent ? '66' : '33'}`, padding: '3px 9px', whiteSpace: 'nowrap' }}>
          {phase.status === 'complete' ? '✓ ' : ''}{m.badge}
        </span>
      </div>
      <div>
        <div style={{ fontFamily: INV_F.d, fontSize: '1.45rem', fontWeight: 400, color: INV.parch, lineHeight: 1.15, marginBottom: '0.3rem' }}>{phase.title}</div>
        <div style={{ fontFamily: INV_F.l, fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: m.color, opacity: 0.85 }}>{phase.time}</div>
      </div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.78rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.7, margin: 0 }}>{phase.detail}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0.1rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {phase.items.map(it => (
          <li key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontFamily: INV_F.b, fontSize: '0.76rem', color: `${INV.wheat}9a`, lineHeight: 1.5 }}>
            <span style={{ color: m.color, flexShrink: 0, marginTop: '1px', fontSize: '0.5rem', opacity: 0.8 }} aria-hidden="true">◆</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InvTimeline() {
  const [ref, inView] = useInView(0.16);
  const isMobile = useIsMobile();
  // Progress runs to the center of the current phase (phase 2 of 4 → 3/8 across).
  const currentIdx = PHASES.findIndex(p => p.status === 'current');
  const progressPct = ((currentIdx + 0.5) / PHASES.length) * 100;

  if (isMobile) {
    return (
      <section id="timeline" style={{ paddingBottom: '5rem' }}>
        <style>{TL_STYLE}</style>
        <SectionHead num="08" eyebrow="Roadmap" title="A Four-Phase Path to Launch" />
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical connector */}
          <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: 'rgba(232,193,141,0.14)' }} aria-hidden="true" />
          <div style={{ position: 'absolute', left: '7px', top: '8px', height: `${progressPct}%`, width: '2px', background: INV.ter }} aria-hidden="true" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {PHASES.map((p, i) => (
              <FadeUp key={p.num} delay={i * 0.06}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '-2rem', top: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px' }}>
                    <PhaseMarker status={p.status} />
                  </span>
                  <PhaseCard phase={p} vertical />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" ref={ref} style={{ paddingBottom: '6rem' }}>
      <style>{TL_STYLE}</style>
      <SectionHead num="08" eyebrow="Roadmap" title="A Four-Phase Path to Launch" />

      {/* Marker track */}
      <div style={{ position: 'relative', height: '40px', marginBottom: '0.25rem' }}>
        <div style={{ position: 'absolute', top: '19px', left: '12.5%', right: '12.5%', height: '2px', background: 'rgba(232,193,141,0.14)' }} aria-hidden="true" />
        <div style={{ position: 'absolute', top: '19px', left: '12.5%', width: inView ? `${progressPct - 12.5}%` : '0%', height: '2px', background: INV.ter, transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s' }} aria-hidden="true" />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PHASES.length}, 1fr)`, height: '100%' }}>
          {PHASES.map((p, i) => (
            <div key={p.num} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.4)', transition: `opacity 0.6s ease ${0.2 + i * 0.12}s, transform 0.6s ease ${0.2 + i * 0.12}s` }}>
              <PhaseMarker status={p.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Phase cards */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PHASES.length}, 1fr)`, gap: '1rem' }}>
        {PHASES.map((p, i) => (
          <FadeUp key={p.num} delay={0.3 + i * 0.1} style={{ height: '100%' }}>
            <PhaseCard phase={p} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { InvOpportunity, InvFinancials, InvComparables, InvTiers, InvTimeline });
