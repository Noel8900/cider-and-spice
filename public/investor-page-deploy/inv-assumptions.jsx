// inv-assumptions.jsx — Section 08 · Assumptions & Scalability (reviewer-response appendix)

// ── Small building blocks ──────────────────────────────────────────────────

function AppxBlockHead({ kicker, title }) {
  return (
    <div style={{ marginBottom: '1.4rem' }}>
      <div style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.ter, opacity: 0.85, marginBottom: '0.55rem' }}>{kicker}</div>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.55rem', fontWeight: 400, color: INV.parch, lineHeight: 1.18 }}>{title}</div>
    </div>
  );
}

// Unit-driver "formula" rows: stalls × rent, members × dues, events × attendance × fee
function DriverRow({ stream, formula, note }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: '1.3rem', background: INV.bg, borderTop: `1px solid ${INV.bord}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: INV_F.d, fontSize: '1.18rem', color: INV.parch, lineHeight: 1.25 }}>{stream}</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.gold, whiteSpace: 'nowrap' }}>{formula}</span>
      </div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', lineHeight: 1.72, color: INV.wheat, opacity: 0.56, margin: 0, maxWidth: '56rem' }}>{note}</p>
    </div>
  );
}

// Two-up explanatory panels (used for COGS + staffing)
function SplitPanel({ tag, title, body, tone }) {
  var accent = tone === 'high' ? INV.ter : 'rgba(212,168,75,0.55)';
  return (
    <div style={{ padding: '1.6rem 1.5rem', background: INV.surf, borderTop: `2px solid ${accent}`, height: '100%' }}>
      <div style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: tone === 'high' ? INV.ter : INV.gold, opacity: 0.9, marginBottom: '0.7rem' }}>{tag}</div>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.22rem', color: INV.parch, marginBottom: '0.7rem', lineHeight: 1.22 }}>{title}</div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.83rem', lineHeight: 1.8, color: INV.wheat, opacity: 0.6, margin: 0 }}>{body}</p>
    </div>
  );
}

// Path-to-sustainability trajectory step
function TrajStep({ phase, label, revenue, result, loss, last }) {
  return (
    <div style={{ flex: '1 1 180px', position: 'relative', padding: '1.6rem 1.5rem', background: INV.bg, border: `1px solid ${INV.bord}` }}>
      <div style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.45, marginBottom: '0.7rem' }}>{phase}</div>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.18rem', color: INV.parch, marginBottom: '1rem', lineHeight: 1.2 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.3rem' }}>
        <span style={{ fontFamily: INV_F.d, fontSize: '2rem', fontWeight: 300, color: INV.gold, lineHeight: 1 }}>{revenue}</span>
        <span style={{ fontFamily: INV_F.b, fontSize: '0.66rem', color: INV.wheat, opacity: 0.5 }}>revenue</span>
      </div>
      <div style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: last ? INV.gold : INV.terHov, opacity: last ? 0.95 : 0.85 }}>{loss}</div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.76rem', lineHeight: 1.65, color: INV.wheat, opacity: 0.5, margin: '0.7rem 0 0' }}>{result}</p>
    </div>
  );
}

// Reviewer Q&A accordion item
function QAItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderTop: `1px solid ${INV.bord}` }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left', cursor: 'pointer', background: 'transparent', border: 'none',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem',
          padding: '1.35rem 0.2rem', color: 'inherit',
        }}>
        <span style={{ fontFamily: INV_F.d, fontSize: '1.18rem', color: open ? INV.parch : INV.wheat, lineHeight: 1.3, transition: 'color .25s' }}>{q}</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '1.3rem', color: INV.ter, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .3s cubic-bezier(0.16,1,0.3,1)', lineHeight: 1 }} aria-hidden="true">+</span>
      </button>
      <div style={{ maxHeight: open ? '460px' : '0', overflow: 'hidden', transition: 'max-height .45s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ paddingBottom: '1.5rem', maxWidth: '54rem' }}>
          {a.map(function(p, i) {
            return <p key={i} style={{ fontFamily: INV_F.b, fontSize: '0.86rem', lineHeight: 1.85, color: INV.wheat, opacity: 0.62, margin: i === 0 ? 0 : '0.8rem 0 0' }}>{p}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────

var DRIVERS = [
  { stream: 'Kitchen stalls & ghost kitchens', formula: 'stalls × base rent + ghost bay utilization', note: 'Year 1: 8 of 12 stalls filled at launch ($2,200/mo), growing to 10 of 12 by Year 2 ($2,350/mo, 3% CPI escalation). Two ghost kitchen bays at $400/shift avg · 3 shifts/day contribute $28.8K (Y1) and $36K (Y2).' },
  { stream: 'Cider bar & retail', formula: 'guests × ticket × open days', note: 'Daily guest counts, average ticket size, and operating days per month. Year 2 assumes higher repeat visitation, greater awareness, and expanded pairing events that lift both volume and average ticket.' },
  { stream: 'Membership & kitchen access', formula: 'active members × monthly dues', note: 'A modest but steady build-up in members as the Hub’s brand and programming become better known among food entrepreneurs and hobbyists.' },
  { stream: 'Events & training', formula: 'events × attendance × fee', note: 'A scheduled calendar of events with estimated attendance and per-attendee pricing. Both frequency and average attendance rise from Year 1 launch to a full annual calendar in Year 2.' },
];

var REVIEWER_QA = [
  {
    q: 'What drives the revenue increase from Year 1 to Year 2?',
    a: [
      'Higher stall utilization — 8 of 12 stalls filled at launch in Year 1 at $2,200/mo, growing to 10 of 12 in Year 2 at $2,350/mo (3% CPI escalation). Ghost kitchen utilization also increases from $28.8K to $36K annually.',
      'Greater commissary kitchen hours (120 hrs/mo Y1 → 200 hrs/mo Y2), expanded Cider Club membership (initial cohort → 100 members across all tiers), higher walk-in beverage covers (65/day → 110/day), and a fuller events calendar (2 events/mo → 4 events/mo).',
    ],
  },
  {
    q: 'Why does COGS not increase proportionately with revenue?',
    a: [
      'Only a subset of revenue carries direct COGS — mainly cider and retail product. Rent, memberships, kitchen rentals, and a portion of event revenue have negligible cost of goods, so the blended COGS percentage appears low even as total sales nearly double.',
      'In absolute dollars, Cost of Sales does increase — roughly $53K in Year 1 to $88.8K in Year 2 — and remains tied to revenue at a roughly constant ~7% blended ratio.',
    ],
  },
  {
    q: 'Why do staffing levels stay relatively constant despite growth?',
    a: [
      'The Hub is a multi-tenant platform; most incremental revenue is generated by vendor-staffed stalls, not by expanding the Hub’s own kitchen labor.',
      'Staffing is built around a fixed core team plus targeted additions in events, bar operations, and facility support as milestones are met — which is why personnel cost rises from ~$600K to ~$685K, but more slowly than revenue.',
    ],
  },
  {
    q: 'What facility utilization rates are assumed in each year?',
    a: [
      'Year 1 assumes a ramp from partial to near-full occupancy over the year, reflecting tenant onboarding and market penetration.',
      'Year 2 assumes near-stabilized use of stall, commissary, and event capacity, consistent with the Hub’s positioning as the region’s primary culinary incubator and gathering place.',
    ],
  },
  {
    q: 'How is long-term sustainability ensured after grant funding?',
    a: [
      'The model separates one-time capital and ramp funding from ongoing operations. The $375K in secured grants (HFFF, CDBG, EDA) and the $850K SBA 7(a) loan fund leasehold improvements, equipment, soft costs, and the $272K opening working-capital reserve — not permanent operating subsidy. Owner equity contribution is $0.',
      'The Hub crosses into operating profit in Year 2 (~+$92K operating income, ~$160K EBITDA). Monthly cash-flow breakeven is reached ~Month 17. The Year-1 EOY cash deficit of −$123.9K is covered by the working-capital reserve and a $100K SBA-backed line of credit.',
    ],
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

function InvAssumptions() {
  var isMobile = useIsMobile();
  var _o = React.useState(0); var open = _o[0]; var setOpen = _o[1];
  return (
    <section id="assumptions" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <SectionHead num="09" eyebrow="Technical Appendix · Reviewer Response" title="Assumptions & Scalability" />

      <FadeUp>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.94rem', lineHeight: 1.85, color: INV.wheat, opacity: 0.62, maxWidth: '46rem', marginBottom: '3.5rem' }}>
          Every projection below is built from operational drivers — stalls, members, hours, events — rather than a single top-down revenue guess. This appendix ties the financials to those units so each assumption is explicit and auditable.
        </p>
      </FadeUp>

      {/* Revenue build */}
      <FadeUp style={{ marginBottom: '3.5rem' }}>
        <AppxBlockHead kicker="01 · Revenue Build" title="Unit-Based Drivers, Not Top-Down Guesses" />
        <div style={{ background: INV.bord }}>
          {DRIVERS.map(function(d) { return <DriverRow key={d.stream} {...d} />; })}
        </div>
      </FadeUp>

      {/* COGS structure */}
      <FadeUp style={{ marginBottom: '3.5rem' }}>
        <AppxBlockHead kicker="02 · Cost Structure" title="Why Blended COGS Stays Near 7%" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1px', background: INV.bord }}>
          <SplitPanel tone="high" tag="Material COGS" title="Cider bar & retail product" body="Direct cost of goods is concentrated here, modeled at typical beverage and retail margins. Cost of Sales rises in absolute terms — ~$64K in Year 1 to ~$89K in Year 2 (Materials/Inventory line) — tracking sales at a steady ratio." />
          <SplitPanel tone="low" tag="Negligible COGS" title="Rent · memberships · events · training" body="Stall licenses, base and percentage rent, membership dues, kitchen rentals, and most event fees carry no ingredient or packaged-goods cost. As a platform business, this is the majority of revenue — which is why the blended COGS percentage reads low." />
        </div>
      </FadeUp>

      {/* Staffing */}
      <FadeUp style={{ marginBottom: '3.5rem' }}>
        <AppxBlockHead kicker="03 · Labor Model" title="Fixed Core Team, Scalable Support" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1px', background: INV.bord }}>
          <SplitPanel tone="high" tag="Fixed core · exists regardless of tenants" title="GM · operations · marketing · admin" body="The base team that runs the facility whether 8 or 12 stalls are occupied. Personnel cost grows from ~$597K (Year 1) to ~$686K (Year 2) including benefits and payroll taxes — deliberately slower than revenue." />
          <SplitPanel tone="low" tag="Variable · tied to thresholds" title="Events · bar · part-time facility support" body="Scales with the number of active tenants, large events per month, and members. Because each stall is independently vendor-staffed, the Hub’s own labor does not grow one-for-one with every incremental dollar of stall revenue." />
        </div>
      </FadeUp>

      {/* Path to sustainability */}
      <FadeUp style={{ marginBottom: '3.5rem' }}>
        <AppxBlockHead kicker="04 · Path to Sustainability" title="From Grant-Funded Launch to Earned Revenue" />
        <div style={{ display: 'flex', gap: '1px', flexWrap: 'wrap', background: INV.bord, marginBottom: '1.1rem' }}>
          <TrajStep phase="Year 1 · Ramp" label="Staggered open, 8 stalls building to near-full" revenue="$826K" loss="Operating loss ≈ −$262K" result="Funded by the $272K opening reserve + $100K SBA working-capital line. Monthly cash-flow breakeven reached ~Month 17." />
          <TrajStep phase="Year 2 · Near-stabilized" label="10 of 12 stalls live, full commissary & events calendar" revenue="$1.39M" loss="Operating income ≈ +$92K" result="Crosses into operating profit. EBITDA ~$160K. Year-end cash deficit narrows to −$84K as ramp losses are absorbed." last />
        </div>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', lineHeight: 1.7, color: INV.wheat, opacity: 0.45, maxWidth: '46rem', margin: 0 }}>
          Grants secured at closing ($375K) and the SBA 7(a) loan ($850K) fund buildout, equipment, soft costs, and the $272K working-capital reserve — capital and targeted innovation, never recurring operating subsidy. Owner equity contribution is $0; grants serve as the equity-equivalent layer in the capital stack.
        </p>
      </FadeUp>

      {/* Reviewer Q&A */}
      <FadeUp>
        <AppxBlockHead kicker="05 · Reviewer Questions" title="Direct Answers to the Financial Review" />
        <div>
          {REVIEWER_QA.map(function(item, i) {
            return <QAItem key={i} q={item.q} a={item.a} open={open === i} onToggle={function() { setOpen(open === i ? -1 : i); }} />;
          })}
        </div>
      </FadeUp>
    </section>
  );
}

Object.assign(window, { InvAssumptions });
