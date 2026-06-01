// kitchen-sections.jsx — Commercial Kitchen page sections

const ZONES = [
  { num: '01', zone: 'Receiving',          color: '#6b8c6b', desc: 'Accept or reject deliveries. Verify supplier, condition, temperature, labels, and quantity. Log all TCS items before moving to storage.' },
  { num: '02', zone: 'Dry & Cold Storage', color: '#5c7a5c', desc: 'FIFO rotation enforced. Raw animal protein stored lowest. Allergen isolation in sealed labeled containers. Operator-specific storage assignments enforced.' },
  { num: '03', zone: 'Prep',               color: '#c0622a', desc: 'Surface sanitation between tasks. Allergen cross-contact prevention. All batches labeled with product, date/time, preparer, and use-by date.' },
  { num: '04', zone: 'Cooking',            color: '#d4673a', desc: 'Cook to required internal temperature per NM food code. Verify with calibrated probe thermometer. Document temperature for all high-risk items.' },
  { num: '05', zone: 'Cooling & Reheating', color: '#d4a84b', desc: 'Two-stage cooling: 135°F → 70°F within 2 hours; 70°F → 41°F within 4 more. Reheat to 165°F within 2 hours. Both stages monitored and logged.' },
  { num: '06', zone: 'Plating & Service',  color: '#c0622a', desc: 'Holding equipment verified every 2 hours. Allergen accuracy confirmed on labels and verbal communication. Final quality check before customer.' },
  { num: '07', zone: 'Dishwashing',        color: '#5c7a5c', desc: 'Dirty-to-clean directional flow enforced. Sanitizer concentration verified each shift. Air dry all food-contact items. Chemical storage secured and labeled.' },
];

const COMPLIANCE = [
  { area: 'NMED Food Permits', req: 'Permit class confirmed for each food establishment, shared kitchen, vendor stall, and mobile unit under 7.6.2 NMAC', impact: 'Do not open or expand food operations until permit path and inspection requirements are confirmed' },
  { area: 'NM Food Code', req: 'NM 7.6.2 NMAC incorporates the 2017 FDA Food Code with NM-specific modifications', impact: 'Train to local NM requirements — not generic national food safety content' },
  { area: 'CFPM Certification', req: 'Certified Food Protection Manager records maintained where required; retrievable at inspection within 2 minutes', impact: 'At least one supervisory manager holds current CFPM before the kitchen opens' },
  { area: 'Food Handler Records', req: 'Food handler cards or approved training records maintained and available before onboarding any vendor or staff', impact: 'Training files must be accessible at every inspection visit' },
  { area: 'Alcohol / Cider', req: 'ABC/RLD license class, server permit requirements, and event permissions confirmed before any bar service', impact: 'Cider and bar service planned, permitted, and staffed entirely separately from food operations' },
  { area: 'Packaged Retail', req: 'Manufactured-food registration, labeling, and storage confirmed under 7.6.2.11 NMAC before any retail shelf sales', impact: 'Every retail product requires approved labels, batch records, and traceable documentation' },
];

const MAINTENANCE = [
  { cadence: 'Daily',     owner: 'Shift Lead',       tasks: 'Log refrigeration/freezer temps; inspect equipment; clean and sanitize food-contact surfaces; verify sanitizer concentrations; empty waste receptacles' },
  { cadence: 'Weekly',    owner: 'Kitchen Manager',  tasks: 'Deep-clean equipment zones; inspect door gaskets; clean hood filters; descale beverage equipment; review open work orders and escalate overdue items' },
  { cadence: 'Monthly',   owner: 'Kitchen Manager',  tasks: 'Calibrate all probe thermometers; replace worn smallwares; review pest control reports; audit chemical storage for labeling and SDS availability' },
  { cadence: 'Quarterly', owner: 'Facilities Lead',  tasks: 'Hood and fire suppression inspection (code required); commercial refrigeration service; grease interceptor pumping; pest control full service; commercial dish machine service' },
];

const SHARED_RULES = [
  { rule: 'Scheduling', detail: 'All commissary and ghost-kitchen time blocks must be reserved in advance. Unscheduled use creates compliance risk and stall conflicts.' },
  { rule: 'Storage Assignments', detail: 'Each operator has a designated dry, cold, and frozen storage area. Cross-contamination of storage zones is a corrective action trigger.' },
  { rule: 'Cleaning Verification', detail: 'Operators must clean their assigned zones after each session. The Hall Manager conducts a documented post-use verification before the space is reassigned.' },
  { rule: 'Allergen Separation', detail: 'Allergen-containing ingredients must be stored in sealed, labeled containers. Shared equipment must be fully cleaned between operators with different allergen profiles.' },
  { rule: 'Batch Labeling', detail: 'Every batch produced in the kitchen must be labeled with product name, production date/time, preparer, and use-by date before moving to storage or service.' },
  { rule: 'Incident Reporting', detail: 'Equipment damage, spills, pest sightings, injury, and suspected foodborne illness events must be reported to the Hall Manager immediately — not at end of shift.' },
];

// ── Nav ───────────────────────────────────────────────────────────────────────

function KNav() {
  const links = [
    { label: 'Overview',   href: '#overview' },
    { label: '7 Zones',    href: '#zones' },
    { label: 'Compliance', href: '#compliance' },
    { label: 'Shared Use', href: '#shared' },
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
      <a href="Incubator Program.html" style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.45, textDecoration: 'none', transition: 'opacity 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.45'}>
        Incubator Playbook →
      </a>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function KHero() {
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);
  const a = d => ({ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: `opacity .8s ease ${d}s, transform .8s ease ${d}s` });
  return (
    <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', background: `radial-gradient(ellipse 65% 50% at 60% 35%, rgba(107,140,107,0.1) 0%, transparent 60%), ${INV.bg}`, borderBottom: `1px solid ${INV.bord}`, overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(232,193,141,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,193,141,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.018 }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '72rem', margin: '0 auto', padding: '8rem 2rem 5rem', width: '100%' }}>
        <div style={{ ...a(0.1), display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ height: '1px', width: '28px', background: INV.ter, display: 'block' }} />
          <span style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: INV.ter }}>Operations Manual · Las Cruces Culinary Innovation Hub</span>
        </div>
        <h1 style={{ ...a(0.25), fontFamily: INV_F.d, fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', fontWeight: 300, lineHeight: 1.05, color: INV.parch, marginBottom: '1.5rem', letterSpacing: '-0.015em', maxWidth: '800px' }}>
          Commercial Kitchen<br />
          <em style={{ fontStyle: 'italic', color: INV.ter }}>Operations Manual</em>
        </h1>
        <p style={{ ...a(0.4), fontFamily: INV_F.b, fontSize: '1rem', lineHeight: 1.85, color: INV.wheat, opacity: 0.65, maxWidth: '560px', marginBottom: '2rem' }}>
          A licensed, multi-operator shared production environment with seven-zone food safety workflow, full NM regulatory compliance, and investor-grade governance documentation.
        </p>
        <div style={{ ...a(0.52), display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
          {[['7', 'Production Zones'], ['NMED', 'Compliant Framework'], ['4', 'Maintenance Cadences'], ['0', 'Shared Kitchens in LC']].map(([v, l]) => (
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

// ── Context ───────────────────────────────────────────────────────────────────

function KOverview() {
  return (
    <section id="overview" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <SectionHead num="01" eyebrow="Las Cruces Context" title="A Gap No Other Facility Fills" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '3rem' }}>
        {[
          { stat: '0', label: 'Shared Commercial Kitchens in Las Cruces', body: 'Las Cruces currently has no licensed shared commercial kitchen. Food entrepreneurs must either build their own (~$250K–$500K) or drive to Albuquerque or El Paso.' },
          { stat: '18 mo', label: 'Albuquerque Shared Kitchen Waitlist', body: 'Shared-kitchen waitlists in Albuquerque currently run as long as 18 months — demonstrating genuine statewide unmet demand. The Hub fills this gap in Southern NM.' },
          { stat: '2023', label: 'Kitchen Table Santa Fe — Nearest NM Comparable', body: 'Opened May 2023 with 2,500 sq ft, 14 workstations, 24/7 access, and 34 members. The Hub models its commissary governance on KTSF: formal onboarding, documented compliance requirements, scheduling software, and event space.' },
        ].map(({ stat, label, body }) => (
          <FadeUp key={stat} style={{ height: '100%' }}>
            <div style={{ padding: '2.25rem 2rem', background: INV.bg, height: '100%' }}>
              <div style={{ fontFamily: INV_F.d, fontSize: '2.5rem', fontWeight: 300, color: INV.ter, marginBottom: '0.4rem', lineHeight: 1 }}>{stat}</div>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.45, marginBottom: '1rem' }}>{label}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.55, lineHeight: 1.8 }}>{body}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
        {[
          { title: 'Food Safety', sys: 'Active managerial control, training, temperature control, separation, sanitation, corrective action' },
          { title: 'Consistency', sys: 'Standard recipes, prep sheets, batch controls, portion tools, plate and package standards' },
          { title: 'Efficiency', sys: 'Logical layout, station readiness, accurate par levels, clear ticket and service flow, maintenance planning' },
          { title: 'Compliance', sys: 'Permit files, plan-review approvals, food handler/CFPM records, local business approvals, alcohol/retail files' },
          { title: 'Shared-Use Accountability', sys: 'User agreements, storage assignments, schedules, cleaning verification, damage and incident reporting' },
        ].map(({ title, sys }) => (
          <FadeUp key={title}>
            <div style={{ padding: '1.5rem', background: INV.surf, borderLeft: `2px solid rgba(192,98,42,0.25)` }}>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.15rem', color: INV.parch, marginBottom: '0.4rem' }}>{title}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.75 }}>{sys}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── 7 Zones ───────────────────────────────────────────────────────────────────

function KZones() {
  return (
    <section id="zones" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="02" eyebrow="Production Workflow" title="Seven-Zone Food Safety System" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.8 }}>
        Food moves in one direction — raw to finished, high-risk to progressively lower-risk — without doubling back through zones contaminated by earlier production stages.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {ZONES.map(({ num, zone, color, desc }, i) => (
          <FadeUp key={num} delay={i * 0.06}>
            <div style={{ display: 'grid', gridTemplateColumns: '72px 200px 1fr', background: INV.bg, alignItems: 'stretch' }}>
              <div style={{ background: color, opacity: 0.18, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid rgba(232,193,141,0.08)` }}>
                <div style={{ opacity: 1 }}>
                  <span style={{ fontFamily: INV_F.d, fontSize: '1.6rem', fontWeight: 300, color: color === '#6b8c6b' || color === '#5c7a5c' ? '#a8d5a8' : INV.parch, opacity: 1 }}>{num}</span>
                </div>
              </div>
              <div style={{ padding: '1.5rem', borderRight: `1px solid rgba(232,193,141,0.08)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: `rgba(${color === '#6b8c6b' ? '107,140,107' : color === '#5c7a5c' ? '92,122,92' : color === '#d4a84b' ? '212,168,75' : '192,98,42'},0.06)` }}>
                <div style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.ter, marginBottom: '0.3rem', opacity: 0.7 }}>Zone {num}</div>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.2rem', color: INV.parch }}>{zone}</div>
              </div>
              <div style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center' }}>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.83rem', color: INV.wheat, opacity: 0.58, lineHeight: 1.8 }}>{desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── NM Compliance ─────────────────────────────────────────────────────────────

function KCompliance() {
  return (
    <section id="compliance" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="03" eyebrow="New Mexico Regulatory Framework" title="Six Compliance Areas — All Verified Before Launch" />
      <div style={{ padding: '1rem 1.5rem', background: 'rgba(192,98,42,0.07)', borderLeft: `3px solid rgba(192,98,42,0.4)`, marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.58, lineHeight: 1.78 }}>
          All regulatory references are verification prompts — not final requirements. Exact permit class, plan-review scope, alcohol license pathway, packaged-food approval, zoning status, fees, timelines, and inspection requirements must be confirmed with the applicable NM agencies before launch.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {COMPLIANCE.map(({ area, req, impact }, i) => (
          <FadeUp key={area} delay={i * 0.04}>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', background: INV.bg, alignItems: 'stretch' }}>
              <div style={{ padding: '1.5rem', borderRight: `1px solid rgba(232,193,141,0.08)`, display: 'flex', alignItems: 'center', background: INV.bgMid }}>
                <div style={{ fontFamily: INV_F.d, fontSize: '1.05rem', color: INV.parch, lineHeight: 1.3 }}>{area}</div>
              </div>
              <div style={{ padding: '1.5rem 1.75rem', borderRight: `1px solid rgba(232,193,141,0.08)` }}>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.55, lineHeight: 1.78 }}>{req}</p>
              </div>
              <div style={{ padding: '1.5rem 1.75rem' }}>
                <div style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.ter, marginBottom: '0.4rem', opacity: 0.7 }}>Operating Impact</div>
                <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.52, lineHeight: 1.75 }}>{impact}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── Shared Use ────────────────────────────────────────────────────────────────

function KSharedUse() {
  return (
    <section id="shared" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="04" eyebrow="Shared-Use Governance" title="Six House Rules — Consistently Enforced" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.8 }}>
        In a shared kitchen, multiple operators use the same facility under assigned schedules. House rules protect every operator's product from the risk created by every other operator's work.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '3rem' }}>
        {SHARED_RULES.map(({ rule, detail }, i) => (
          <FadeUp key={rule} delay={i * 0.05} style={{ height: '100%' }}>
            <div style={{ padding: '2rem', background: INV.bg, height: '100%' }}>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.15rem', color: INV.parch, marginBottom: '0.65rem' }}>{rule}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.52, lineHeight: 1.8 }}>{detail}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <SectionHead num="05" eyebrow="Maintenance System" title="Four Cadences — Equipment Failure Is a Food Safety Event" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {MAINTENANCE.map(({ cadence, owner, tasks }, i) => (
          <FadeUp key={cadence} delay={i * 0.07} style={{ height: '100%' }}>
            <div style={{ padding: '2rem', background: INV.bg, height: '100%' }}>
              <div style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, marginBottom: '0.4rem' }}>{cadence}</div>
              <div style={{ fontFamily: INV_F.d, fontSize: '1.3rem', color: INV.parch, marginBottom: '0.3rem' }}>{owner}</div>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.8 }}>{tasks}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function KCTA() {
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
        <a href="Incubator Program.html" style={{ display: 'inline-block', border: `1px solid rgba(232,193,141,0.2)`, color: `${INV.wheat}bb`, padding: '13px 40px', fontFamily: INV_F.l, fontSize: '0.63rem', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(192,98,42,0.5)'; e.currentTarget.style.color = INV.parch; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,193,141,0.2)'; e.currentTarget.style.color = `${INV.wheat}bb`; }}>
          Incubator Playbook →
        </a>
      </div>
    </section>
  );
}

function KFooter() {
  return (
    <footer style={{ background: INV.bgDark, borderTop: `1px solid ${INV.bord}`, padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <div style={{ fontFamily: INV_F.d, fontSize: '1.1rem', color: INV.parch }}>Cider <em style={{ fontStyle: 'italic', color: INV.ter }}>&amp;</em> Spice <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.28, marginLeft: '0.75rem' }}>Las Cruces, NM · Opening 2027</span></div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.68rem', color: INV.wheat, opacity: 0.2, maxWidth: '500px', lineHeight: 1.65, textAlign: 'right' }}>Operations and planning document — not legal advice. All regulatory requirements must be confirmed with applicable NM agencies before launch.</p>
    </footer>
  );
}

Object.assign(window, { KNav, KHero, KOverview, KZones, KCompliance, KSharedUse, KCTA, KFooter });
