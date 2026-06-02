// inv-floorplan.jsx — Interactive, color-coded 50/50 floor plan for the Investors Page
// Reinforces the dual-revenue model: COMMERCIAL anchors (market-rate, terracotta)
// vs INCUBATOR Semilla/Mariposa stalls (subsidized → graduating, gold).
// Click a unit to inspect it. Filter to dim the other side. Fully responsive.
// Depends on: inv-tokens.jsx (INV, INV_F, SectionHead, useInView, useIsMobile)

const FLOOR_UNITS = [
  // ── Commercial wing (market-rate revenue engine) ─────────────────────────
  { id:'cb', wing:'commercial', name:'Cider Bar',           sub:'Hub Anchor',   sqft:'480 sf', big:true,
    role:'Southern New Mexico\'s only dedicated craft cider bar — 20–25 rotating NM taps, a 14-seat bar top, and Cider Club memberships from $25–$149/mo.',
    revenue:'Direct beverage + recurring membership' },
  { id:'ck', wing:'commercial', name:'Commissary Kitchen',  sub:'Shared',       sqft:'320 sf',
    role:'Licensed shared kitchen rented to vendors, outside caterers, and NMSU/DACC students at $25–$35/hr.',
    revenue:'License-hour revenue' },
  { id:'rt', wing:'commercial', name:'Bottle Shop & Retail',sub:'Retail',       sqft:'180 sf',
    role:'NM cider to-go plus local maker goods — a high-margin retail crossover off the bar.',
    revenue:'Retail margin' },
  { id:'ev', wing:'commercial', name:'Event Stage',         sub:'Rentable',     sqft:'200 sf',
    role:'Programmable stage — Live Music Fridays, classes, pitch nights, and private hire.',
    revenue:'Rental + ticketed programming' },
  { id:'a1', wing:'commercial', name:'Yazzie',              sub:'Anchor Stall', sqft:'120 sf',
    role:'Confirmed concept on a market-rate license agreement — Japanese katsu, curry, and NM chile.',
    revenue:'Market-rate stall rent' },
  { id:'a2', wing:'commercial', name:'Seoul Fire',          sub:'Anchor Stall', sqft:'96 sf',
    role:'Confirmed concept on a market-rate license agreement — Korean double-fry chicken.',
    revenue:'Market-rate stall rent' },

  // ── Incubator wing (Semilla → Mariposa pipeline) ─────────────────────────
  { id:'sm1', wing:'incubator', track:'Semilla',  name:'Semilla 01',  sub:'Validate', sqft:'96 sf',
    role:'24-week validation track. Subsidized ramp rent while a first-time founder proves the concept.',
    revenue:'Subsidized → ramping rent' },
  { id:'sm2', wing:'incubator', track:'Semilla',  name:'Semilla 02',  sub:'Validate', sqft:'96 sf',
    role:'Concept-validation stall paired with no-cost mentorship from WESST, SCORE, and the LC SBDC.',
    revenue:'Subsidized → ramping rent' },
  { id:'sm3', wing:'incubator', track:'Semilla',  name:'Semilla 03',  sub:'Validate', sqft:'96 sf',
    role:'Entry stall reserved for first-generation, immigrant, veteran, and women-owned founders.',
    revenue:'Subsidized → ramping rent' },
  { id:'mp1', wing:'incubator', track:'Mariposa', name:'Mariposa 01', sub:'Grow',     sqft:'120 sf',
    role:'Growth track — graduating vendors stepping up toward a full market-rate license agreement.',
    revenue:'Graduating to market rate' },
  { id:'mp2', wing:'incubator', track:'Mariposa', name:'Mariposa 02', sub:'Grow',     sqft:'120 sf',
    role:'Scale-up stall with full commissary access and built-in event-programming tie-ins.',
    revenue:'Graduating to market rate' },
  { id:'mp3', wing:'incubator', track:'Mariposa', name:'Mariposa 03', sub:'Grow',     sqft:'120 sf',
    role:'Final incubator step before graduation into a commercial anchor stall.',
    revenue:'Graduating to market rate' },
];

const WING_META = {
  commercial: { color: INV.ter,  fill: 'rgba(192,98,42,0.10)', fillHi: 'rgba(192,98,42,0.20)', label: 'Commercial Anchors', tag: 'Market-Rate Revenue', glyph: '◆' },
  incubator:  { color: INV.gold, fill: 'rgba(212,168,75,0.09)',fillHi: 'rgba(212,168,75,0.18)', label: 'Incubator Stalls',   tag: 'Semilla · Mariposa Tracks', glyph: '◈' },
};

function FloorUnit({ unit, selected, dimmed, onSelect }) {
  const [hov, setHov] = React.useState(false);
  const m = WING_META[unit.wing];
  const active = selected || hov;
  return (
    <button
      type="button"
      onClick={() => onSelect(unit.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-pressed={selected}
      style={{
        textAlign: 'left', cursor: 'pointer', font: 'inherit',
        gridColumn: unit.big ? 'span 2' : 'span 1',
        background: active ? m.fillHi : m.fill,
        borderTop: `2px solid ${selected ? m.color : active ? m.color : 'rgba(232,193,141,0.16)'}`,
        borderRight: 'none', borderBottom: 'none', borderLeft: 'none',
        padding: '1.1rem 1.15rem',
        opacity: dimmed ? 0.22 : 1,
        transform: active && !dimmed ? 'translateY(-3px)' : 'none',
        boxShadow: selected ? `0 10px 26px -12px ${m.color}66` : 'none',
        transition: 'all 0.25s ease',
        minHeight: unit.big ? '118px' : '92px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.5rem',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.46rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: m.color, opacity: 0.92 }}>{unit.sub}</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.46rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.42 }}>{unit.sqft}</span>
      </div>
      <span style={{ fontFamily: INV_F.d, fontSize: unit.big ? '1.55rem' : '1.18rem', fontWeight: 400, color: INV.parch, lineHeight: 1.05 }}>{unit.name}</span>
    </button>
  );
}

function FloorWing({ wing, units, filter, selected, onSelect }) {
  const m = WING_META[wing];
  const dimmed = filter !== 'all' && filter !== wing;
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem', opacity: dimmed ? 0.5 : 1, transition: 'opacity 0.3s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingBottom: '0.15rem' }}>
        <span style={{ width: '9px', height: '9px', background: m.color, flexShrink: 0 }} aria-hidden="true" />
        <span style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.parch }}>{m.label}</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: m.color, opacity: 0.7 }}>· {m.tag}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: 'rgba(232,193,141,0.06)' }}>
        {units.map(u => (
          <FloorUnit key={u.id} unit={u} selected={selected === u.id} dimmed={dimmed} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function FloorDetail({ unit }) {
  if (!unit) {
    return (
      <div style={{ background: INV.surf, padding: '1.75rem 1.9rem', borderLeft: `2px solid ${INV.bord}` }}>
        <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, marginBottom: '0.6rem' }}>Two Revenue Engines, One Floor</div>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.86rem', color: INV.wheat, opacity: 0.6, lineHeight: 1.85, margin: 0 }}>
          Roughly half the floor runs on <strong style={{ color: INV.ter, fontWeight: 500 }}>market-rate commercial anchors</strong> — the cider bar, commissary, retail, stage, and confirmed stalls. The other half is the <strong style={{ color: INV.gold, fontWeight: 500 }}>Semilla &amp; Mariposa incubator</strong>, where founders graduate from subsidized ramp rent into full license agreements. <em style={{ color: INV.parch, fontStyle: 'italic' }}>Select any space to inspect its role.</em>
        </p>
      </div>
    );
  }
  const m = WING_META[unit.wing];
  return (
    <div style={{ background: INV.surf, padding: '1.75rem 1.9rem', borderLeft: `2px solid ${m.color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: INV_F.d, fontSize: '1.5rem', color: m.color, lineHeight: 1 }} aria-hidden="true">{m.glyph}</span>
        <span style={{ fontFamily: INV_F.d, fontSize: '1.7rem', fontWeight: 400, color: INV.parch, lineHeight: 1.05 }}>{unit.name}</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: m.color, border: `1px solid ${m.color}55`, padding: '3px 9px' }}>{unit.track || m.label}</span>
      </div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.86rem', color: INV.wheat, opacity: 0.62, lineHeight: 1.82, marginBottom: '1.25rem' }}>{unit.role}</p>
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, marginBottom: '0.3rem' }}>Footprint</div>
          <div style={{ fontFamily: INV_F.d, fontSize: '1.25rem', color: INV.parch }}>{unit.sqft}</div>
        </div>
        <div>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, marginBottom: '0.3rem' }}>Revenue Role</div>
          <div style={{ fontFamily: INV_F.d, fontSize: '1.25rem', color: m.color }}>{unit.revenue}</div>
        </div>
      </div>
    </div>
  );
}

function InvFloorPlan() {
  const isMobile = useIsMobile();
  const [ref, inView] = useInView(0.12);
  const [filter, setFilter] = React.useState('all');
  const [selected, setSelected] = React.useState(null);

  const commercial = FLOOR_UNITS.filter(u => u.wing === 'commercial');
  const incubator  = FLOOR_UNITS.filter(u => u.wing === 'incubator');
  const selUnit = FLOOR_UNITS.find(u => u.id === selected) || null;

  const FILTERS = [
    { id: 'all',        label: 'Whole Floor',  color: INV.wheat },
    { id: 'commercial', label: 'Commercial',   color: INV.ter   },
    { id: 'incubator',  label: 'Incubator',    color: INV.gold  },
  ];

  return (
    <section id="floorplan" ref={ref} style={{ paddingBottom: '5rem' }}>
      <SectionHead num="05" eyebrow="The 50/50 Floor" title="A Floor Built for Two Revenue Engines" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.42, marginBottom: '2rem', maxWidth: '42rem', lineHeight: 1.82 }}>
        The plan is deliberately split: market-rate commercial anchors stabilize cash flow from day one, while the Semilla &amp; Mariposa incubator stalls build a durable vendor pipeline. Click any space to see how it earns.
      </p>

      {/* Filter toggle */}
      <div style={{ display: 'flex', gap: '1px', background: INV.bord, marginBottom: '1.5rem', width: 'fit-content' }}>
        {FILTERS.map(f => {
          const on = filter === f.id;
          return (
            <button key={f.id} type="button" onClick={() => setFilter(f.id)}
              style={{ padding: '9px 20px', background: on ? 'rgba(192,98,42,0.12)' : INV.surf, border: 'none', borderTop: `2px solid ${on ? f.color : 'transparent'}`, color: on ? INV.parch : `${INV.wheat}70`, fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}>
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Building schematic */}
      <div style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #251d12 0%, #1e1710 70%)',
        border: `1px solid ${INV.bord}`, padding: isMobile ? '1.25rem' : '1.75rem',
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity .8s ease, transform .8s ease',
      }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '1.75rem' : '0' }}>
          <FloorWing wing="incubator"  units={incubator}  filter={filter} selected={selected} onSelect={setSelected} />

          {/* Atrium spine */}
          {!isMobile && (
            <div style={{ flex: '0 0 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', margin: '0 1.25rem', borderLeft: `1px dashed rgba(232,193,141,0.16)`, borderRight: `1px dashed rgba(232,193,141,0.16)` }}>
              <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4 }}>Central Atrium · Communal Seating</span>
            </div>
          )}
          {isMobile && (
            <div style={{ textAlign: 'center', fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.32, borderTop: `1px dashed rgba(232,193,141,0.16)`, borderBottom: `1px dashed rgba(232,193,141,0.16)`, padding: '0.6rem 0' }}>Central Atrium · Communal Seating</div>
          )}

          <FloorWing wing="commercial" units={commercial} filter={filter} selected={selected} onSelect={setSelected} />
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ marginTop: '1.5rem' }}>
        <FloorDetail unit={selUnit} />
      </div>

      <p style={{ fontFamily: INV_F.b, fontSize: '0.74rem', color: INV.wheat, opacity: 0.28, lineHeight: 1.7, marginTop: '1.25rem' }}>
        Conceptual layout — not a final architectural document. Unit counts, sizes, and rents are planning-stage estimates subject to site selection and lender review.
      </p>
    </section>
  );
}

Object.assign(window, { InvFloorPlan });
