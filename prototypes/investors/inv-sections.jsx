// inv-sections.jsx — Opportunity, Financials, Comparables, Tiers, Timeline (redesigned)

// ── Opportunity / Why Now ─────────────────────────────────────────────────────

const WHY_NOW_DATA = [
  { glyph: '◆', title: 'Zero Direct Competitors',     body: 'No food hall exists within 200 miles. Cider & Spice enters an uncontested market in a 215,000-person metro with a rapidly growing food tourism scene.' },
  { glyph: '◈', title: '6 Grant Categories Targeted', body: 'Structured for CDBG, NM MainStreet, USDA RBDG, EDA, SBA 7(a), and Opportunity Zone funding — meaningfully reducing equity requirements and investor risk.' },
  { glyph: '◉', title: 'Six Revenue Streams',         body: 'Vendor rents, cider bar, memberships ($49–$149/mo), event rental, commissary kitchen, and local retail — diversified cash flow from day one.' },
  { glyph: '◇', title: 'SBA 7(a) Senior Debt',        body: 'Pre-qualification in progress. SBA covers 56.5% of the raise — investor equity benefits from leverage and the federal guarantee reduces senior risk.' },
  { glyph: '✦', title: 'City & State Alignment',      body: 'Endorsed by Elevate Las Cruces and aligned with the East Lohman Development Plan and West Picacho MRA — grant-favorable positioning across multiple programs.' },
  { glyph: '◇', title: 'Conservative Underwriting',   body: 'Appendix F model uses deliberately conservative ramp assumptions. Breakeven month 18–20. 17–20% illustrative IRR from base-case projections only.' },
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
  { metric: 'Revenue',       vals: ['$822K',  '$1.43M', '$1.70M'] },
  { metric: 'EBITDA',        vals: ['\u2013$287K', '$384K',  '$570K'], note: 'Y1 ramp loss covered by reserve' },
  { metric: 'EBITDA Margin', vals: ['\u201335%',   '26.9%',  '33.5%'] },
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

function InvFinancials() {
  const [ref, inView] = useInView(0.18);
  const isMobile = useIsMobile();
  return (
    <section id="financials" ref={ref} style={{ paddingBottom: '5rem' }}>
      <SectionHead num="02" eyebrow="3-Year Conservative Model" title="Disciplined Financials, Built to Survive the Ramp" />

      {/* Big revenue arc */}
      <FadeUp style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {[['$822K', 'Year 1'], ['→', null], ['$1.43M', 'Year 2'], ['→', null], ['$1.70M', 'Year 3']].map(([v, l], i) => (
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
          <FinBar label="Year 1 · 2027" display="$822K"  pct={48}  active={inView} delay={0.1} />
          <FinBar label="Year 2 · 2028" display="$1.43M" pct={84}  active={inView} delay={0.2} />
          <FinBar label="Year 3 · 2029" display="$1.70M" pct={100} active={inView} delay={0.3} />
          <p style={{ fontFamily: INV_F.b, fontSize: '0.78rem', color: INV.wheat, opacity: 0.32, marginTop: '1.25rem', lineHeight: 1.75 }}>
            Conservative Appendix F ramp. Comparable food halls generate $4M–$12M at stabilization.
          </p>
        </div>

        {/* EBITDA + stat tiles */}
        <div>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.35, marginBottom: '1.75rem' }}>EBITDA</div>
          <FinBar label="Year 1 · 2027" display="Ramp"  pct={0}   active={inView} color={`${INV.wheat}25`} delay={0.1} />
          <FinBar label="Year 2 · 2028" display="$384K" pct={67}  active={inView} color={INV.gold}         delay={0.2} />
          <FinBar label="Year 3 · 2029" display="$570K" pct={100} active={inView} color={INV.gold}         delay={0.3} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '1.75rem' }}>
            {[['Y1 EOY Cash', '$60.1K'], ['Breakeven', 'Mo. 18–20'], ['Y3 Margin', '33.5%'], ['Illustrative IRR', '17–20%']].map(([l, v]) => (
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
          Appendix F GAAP ramp is the governing investor and lender model. (−$287K) is expected, modeled, and covered by the working capital reserve in the $1.505M raise. EBITDA turns positive in Year 2.
        </p>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, opacity: 0.62 }}>Planning-stage estimates · CPA and lender review required before commitment</span>
      </div>
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
  { name: 'Community Investor', range: '$25K – $74,999',  glyph: '◇', featured: false, perks: ['Investor newsletter & quarterly updates', 'Named recognition in Hub materials', 'Early access to Cider Club founding membership', 'Appendix F 3-year projection summary'] },
  { name: 'Growth Partner',     range: '$75K – $199,999', glyph: '◈', featured: true,  perks: ['All Community Investor perks', 'Quarterly investor briefings', 'Priority commissary kitchen bookings', 'Hub Advisory Board observer seat', 'Full Appendix F Cashflow Model access'] },
  { name: 'Founding Investor',  range: '$200K+',          glyph: '◆', featured: false, perks: ['All Growth Partner perks', 'Named feature in Hub signage & website', 'Annual private cider pairing dinner', 'Equity participation discussion eligible', 'Co-investment in graduating vendors (5–15%)'] },
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
      <div style={{ fontFamily: INV_F.l, fontSize: '0.75rem', letterSpacing: '0.1em', color: INV.ter, marginBottom: '1.75rem' }}>{tier.range}</div>
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
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.38, marginBottom: '2.5rem' }}>All discussions conducted privately. No online transactions. Min. check size $25K.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {TIERS_DATA.map((tier, i) => <TierCard key={tier.name} tier={tier} delay={i * 0.1} />)}
      </div>
    </section>
  );
}

// ── Timeline — horizontal track ───────────────────────────────────────────────

const TIMELINE_DATA = [
  { label: 'Q3 2025',    event: 'SBA 7(a) Pre-Qualification', done: true  },
  { label: 'Q4 2025',    event: 'Capital Close & Permits',    done: true  },
  { label: 'Q1 2026',    event: 'Construction Start',         done: false },
  { label: 'Q3 2026',    event: 'Soft Open — Anchors',        done: false },
  { label: 'Q4 2026',    event: 'Full Ops + Cider Bar',       done: false },
  { label: 'Mo. 18–20',  event: 'Cash Flow Breakeven',        done: false },
];

function InvTimeline() {
  const [ref, inView] = useInView(0.18);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section id="timeline" style={{ paddingBottom: '5rem' }}>
        <SectionHead num="08" eyebrow="Milestones" title="Project Timeline" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
          {TIMELINE_DATA.map(({ label, event, done }, i) => (
            <FadeUp key={label} delay={i * 0.05}>
              <div style={{ padding: '1.25rem 1.5rem', background: INV.bg, borderLeft: `2px solid ${done ? INV.ter : 'rgba(232,193,141,0.12)'}`, display: 'flex', gap: '1.5rem', alignItems: 'flex-start', opacity: done ? 1 : 0.62 }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: done ? INV.ter : `${INV.wheat}45`, marginBottom: '0.3rem' }}>{label}</div>
                  {done && <div style={{ fontFamily: INV_F.l, fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.ter, opacity: 0.6 }}>✓ Done</div>}
                </div>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: done ? INV.parch : `${INV.wheat}58`, lineHeight: 1.25, paddingTop: '2px' }}>{event}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" ref={ref} style={{ paddingBottom: '6rem' }}>
      <SectionHead num="08" eyebrow="Milestones" title="Project Timeline" />
      <div style={{ position: 'relative', paddingTop: '2.5rem' }}>
        {/* Track line */}
        <div style={{ position: 'absolute', top: '2.5rem', left: '8.33%', right: '8.33%', height: '1px', background: 'rgba(232,193,141,0.14)' }} aria-hidden="true" />
        {/* Filled progress line */}
        <div style={{ position: 'absolute', top: '2.5rem', left: '8.33%', width: inView ? '16.67%' : '0%', height: '1px', background: INV.ter, transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }} aria-hidden="true" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0 }}>
          {TIMELINE_DATA.map(({ label, event, done }, i) => (
            <div key={label} style={{ position: 'relative', paddingTop: '2rem', paddingRight: '0.75rem', opacity: done ? 1 : 0.58 }}>
              {/* Node dot */}
              <div style={{
                position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) translateY(-5.5px)',
                width: done ? '12px' : '8px', height: done ? '12px' : '8px',
                background: done ? INV.ter : INV.bgMid,
                border: `2px solid ${done ? INV.ter : 'rgba(232,193,141,0.22)'}`,
                borderRadius: done ? '0' : '50%',
                transition: `all 1s ease ${i * 0.12}s`,
                transform: `translateX(-50%) translateY(-5.5px) ${inView ? 'scale(1)' : 'scale(0)'}`,
              }} aria-hidden="true" />
              <div style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: done ? INV.ter : `${INV.wheat}42`, marginBottom: '0.6rem' }}>{label}</div>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.05rem', color: done ? INV.parch : `${INV.wheat}58`, lineHeight: 1.3 }}>{event}</div>
              {done && <div style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.ter, opacity: 0.58, marginTop: '0.5rem' }}>Complete ✓</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { InvOpportunity, InvFinancials, InvComparables, InvTiers, InvTimeline });
