// inv-floorplan.jsx — Interactive top-down floor plan for the Investors Page.
// Rendering ported from the public "Floor Plan.html" canvas (architectural grid,
// perimeter + corner ticks, guide lines, ghost zone labels, compass, scale bar,
// zoom/pan + pinch, beveled stalls with status dots & active aura) and re-skinned
// to the investor tokens + the two-revenue-engine narrative (Business Plan §3.1):
// MARKET-RATE anchors (copper) vs INCUBATOR pipeline (gold) vs SHARED/common (wheat).
// Click a room to inspect it; filter to isolate an engine; scroll/drag/pinch to navigate.
// Depends on: inv-tokens.jsx (INV, INV_F, SectionHead, useInView, useIsMobile)

// ── Engine metadata ────────────────────────────────────────────────────────────
const FP_ENGINE = {
  market: {
    color: INV.ter, fill: 'rgba(192,98,42,0.07)', fillHi: 'rgba(192,98,42,0.16)',
    stroke: 'rgba(192,98,42,0.42)',
    label: 'Market-Rate Anchors', tag: 'Stable cash flow from day one', glyph: '◆',
  },
  incubator: {
    color: INV.gold, fill: 'rgba(212,168,75,0.07)', fillHi: 'rgba(212,168,75,0.16)',
    stroke: 'rgba(212,168,75,0.42)',
    label: 'Incubator Pipeline', tag: 'Subsidized → graduating vendors', glyph: '◈',
  },
  shared: {
    color: INV.wheat, fill: 'rgba(232,193,141,0.022)', fillHi: 'rgba(232,193,141,0.07)',
    stroke: 'rgba(232,193,141,0.12)',
    label: 'Shared & Common', tag: 'Atrium · stage · support', glyph: '◇',
  },
};

// ── Rooms (viewBox 0 0 940 600) ─────────────────────────────────────────────────
const FP_ROOMS = [
  // Market-rate anchors (copper)
  { id:'cb', engine:'market', name:'Cider Bar', sub:'Hub Anchor', sqft:'~480 sf', x:766, y:24, w:150, h:300, big:true,
    role:"Southern New Mexico's only dedicated craft cider bar — 20–25 rotating NM taps, 8–10 local cideries, tasting flights, and Cider Club memberships from $25–$149/mo.",
    revenue:'Direct beverage + recurring membership' },
  { id:'ck', engine:'market', name:'Commissary', sub:'Shared · Licensed', sqft:'~320 sf', x:24, y:24, w:150, h:180,
    role:'Licensed shared-use kitchen rented to vendors, outside caterers, and NMSU/DACC culinary students — Las Cruces has no comparable facility today.',
    revenue:'$25–$35 / license hour' },
  { id:'rt', engine:'market', name:'Bottle Shop', sub:'Retail', sqft:'~180 sf', x:766, y:334, w:150, h:110,
    role:'NM cider to-go plus local maker goods and branded pantry items — a 50–65% margin retail crossover positioned at the exit for impulse capture.',
    revenue:'Retail margin (50–65%)' },
  { id:'p1', engine:'market', name:'Yazzie', sub:'Permanent Anchor · Confirmed', sqft:'~120 sf', x:184, y:24, w:140, h:130,
    role:'Confirmed concept on a market-rate license — Japanese katsu, curry & NM chile. Dedicated private kitchen, 2+ year commitment.',
    revenue:'$2,800–$3,200/mo + 6% sales' },
  { id:'p2', engine:'market', name:'Seoul Fire', sub:'Permanent Anchor · Confirmed', sqft:'~120 sf', x:334, y:24, w:140, h:130,
    role:'Confirmed concept on a market-rate license — Korean double-fry chicken. Dedicated private kitchen, 2+ year commitment.',
    revenue:'$2,800–$3,200/mo + 6% sales' },
  { id:'p3', engine:'market', name:'Sticky Stack Co.', sub:'Permanent Anchor · Confirmed', sqft:'~120 sf', x:484, y:24, w:130, h:130,
    role:'Confirmed concept on a market-rate license — artisan sliders & NM jam. Dedicated private kitchen, 2+ year commitment.',
    revenue:'$2,800–$3,200/mo + 6% sales' },
  { id:'p4', engine:'market', name:'Hub Signature', sub:'Owner-Operated', sqft:'~130 sf', x:624, y:24, w:132, h:130,
    role:'Owner-operated anchor restaurant — the Hub earns direct food margin here, not just percentage rent, anchoring the menu and the P&L.',
    revenue:'Owner-operated · direct margin' },
  { id:'p5', engine:'market', name:'NM / Mexican', sub:'Permanent Anchor', sqft:'~120 sf', x:184, y:446, w:130, h:130,
    role:'New Mexican & Mexican anchor that keeps the menu grounded in local culture — the everyday draw that builds repeat traffic.',
    revenue:'$2,800–$3,200/mo + 6% sales' },
  { id:'p6', engine:'market', name:'Southern BBQ', sub:'Permanent Anchor', sqft:'~120 sf', x:324, y:446, w:115, h:130,
    role:'Curated anchor filling a real local gap — slow-smoked Southern BBQ on a market-rate license.',
    revenue:'$2,800–$3,200/mo + 6% sales' },
  { id:'p7', engine:'market', name:'Curated', sub:'Permanent Anchor', sqft:'~120 sf', x:449, y:446, w:115, h:130,
    role:'Additional curated anchor — Mediterranean, ramen, or plant-forward, selected per validated demand to round out the 7–8 permanent stalls.',
    revenue:'$2,800–$3,200/mo + 6% sales' },

  // Incubator pipeline (gold)
  { id:'i1', engine:'incubator', name:'Incubator 01', sub:'Cohort Stall', sqft:'~96 sf', x:574, y:446, w:86, h:130,
    role:'12–18 month cohort. Subsidized ramp rent while a first-time founder proves a concept on the three-stage graduation pathway. Start dates staggered to prevent mass departure.',
    revenue:'$2,000–$2,500/mo + 8% sales' },
  { id:'i2', engine:'incubator', name:'Incubator 02', sub:'Cohort Stall', sqft:'~96 sf', x:670, y:446, w:86, h:130,
    role:'Reserved for first-generation, immigrant, veteran, and women-owned founders — 70% of incubator placements. No-cost mentorship from WESST, SCORE, and the LC SBDC.',
    revenue:'$2,000–$2,500/mo + 8% sales' },
  { id:'g1', engine:'incubator', name:'Ghost Bay 01', sub:'Delivery-Only', sqft:'~80 sf', x:24, y:214, w:150, h:80,
    role:'Delivery-only bay for low-risk format testing — the lowest-barrier entry to the pipeline. Concepts validate demand before stepping up to a stall.',
    revenue:'$1,500–$2,000/mo + 8% commissions' },
  { id:'g2', engine:'incubator', name:'Ghost Bay 02', sub:'Delivery-Only', sqft:'~80 sf', x:24, y:304, w:150, h:80,
    role:'Second delivery-only bay — incremental off-premise revenue with no front-of-house footprint, feeding the third-party delivery channel.',
    revenue:'$1,500–$2,000/mo + 8% commissions' },

  // Shared & common (wheat)
  { id:'at', engine:'shared', name:'Central Atrium', sub:'Communal Seating', sqft:'60–80 seats', x:184, y:164, w:572, h:272, big:true,
    role:'Climate-controlled communal seating that ties the floor together — flexible for live music, trivia, Loteria nights, cultural festivals, and quarterly night markets.',
    revenue:'Drives dwell time & beverage' },
  { id:'ev', engine:'shared', name:'Event Stage', sub:'Rentable', sqft:'~200 sf', x:766, y:454, w:150, h:122,
    role:'Programmable stage — Live Music Fridays, classes, pitch nights, and private hire. Programming is treated as operational infrastructure from Day 1.',
    revenue:'Rental + ticketed programming' },
  { id:'rr', engine:'shared', name:'Restrooms', sub:'Facilities', sqft:'ADA', x:24, y:394, w:150, h:60,
    role:'ADA-compliant facilities on the primary circulation path.', revenue:'—' },
  { id:'en', engine:'shared', name:'Main Entry', sub:'Arrival', sqft:'—', x:24, y:464, w:150, h:112,
    role:'Arrival vestibule off the primary circulation path, opening into the central atrium.', revenue:'—' },
];

const FP_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

// ── Interactive zoom/pan canvas (ported from Floor Plan.html FPCanvas) ──────────
const FP_MIN_SCALE = 0.75, FP_MAX_SCALE = 3.2;
const FP_DEFAULT = { scale: 1, x: 0, y: 0 };

function FPCanvas({ filter, selected, onSelect }) {
  const containerRef = React.useRef(null);
  const tRef = React.useRef(FP_DEFAULT);
  const [transform, setTransform] = React.useState(FP_DEFAULT);
  const [hov, setHov] = React.useState(null);
  const rafPending = React.useRef(null);
  const isPanning = React.useRef(false);
  const panStart = React.useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const pinchDist = React.useRef(null);
  const pinchScale = React.useRef(1);

  function flush() {
    if (rafPending.current) return;
    rafPending.current = requestAnimationFrame(() => { rafPending.current = null; setTransform({ ...tRef.current }); });
  }

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const delta = e.deltaY > 0 ? -0.12 : 0.12;
      const prev = tRef.current;
      const next = Math.min(Math.max(prev.scale + delta, FP_MIN_SCALE), FP_MAX_SCALE);
      const ratio = next / prev.scale;
      tRef.current = { scale: next, x: mx - ratio * (mx - prev.x), y: my - ratio * (my - prev.y) };
      flush();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => { el.removeEventListener('wheel', onWheel); if (rafPending.current) cancelAnimationFrame(rafPending.current); };
  }, []);

  function onMouseDown(e) { isPanning.current = true; panStart.current = { x: e.clientX, y: e.clientY, tx: tRef.current.x, ty: tRef.current.y }; }
  function onMouseMove(e) { if (!isPanning.current) return; tRef.current = { ...tRef.current, x: panStart.current.tx + e.clientX - panStart.current.x, y: panStart.current.ty + e.clientY - panStart.current.y }; flush(); }
  function onMouseUp() { isPanning.current = false; }
  function getTouchDist(t) { const dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY; return Math.sqrt(dx * dx + dy * dy); }
  function onTouchStart(e) { if (e.touches.length === 1) { isPanning.current = true; panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx: tRef.current.x, ty: tRef.current.y }; } else if (e.touches.length === 2) { isPanning.current = false; pinchDist.current = getTouchDist(e.touches); pinchScale.current = tRef.current.scale; } }
  function onTouchMove(e) { e.preventDefault(); if (e.touches.length === 1 && isPanning.current) { tRef.current = { ...tRef.current, x: panStart.current.tx + e.touches[0].clientX - panStart.current.x, y: panStart.current.ty + e.touches[0].clientY - panStart.current.y }; flush(); } else if (e.touches.length === 2 && pinchDist.current) { tRef.current = { ...tRef.current, scale: Math.min(Math.max(pinchScale.current * getTouchDist(e.touches) / pinchDist.current, FP_MIN_SCALE), FP_MAX_SCALE) }; flush(); } }
  function onTouchEnd() { isPanning.current = false; pinchDist.current = null; }

  const isVisible = (r) => filter === 'all' || r.engine === filter;

  const zoomBtn = (label, fn) => (
    <button key={label} onClick={fn} type="button"
      style={{ width: 30, height: 30, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INV_F.b, fontSize: 14, color: `${INV.wheat}70`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color .2s' }}
      onMouseEnter={(e) => e.currentTarget.style.color = INV.gold} onMouseLeave={(e) => e.currentTarget.style.color = `${INV.wheat}70`}
    >{label}</button>
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* Zoom controls */}
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(30,23,16,.88)', backdropFilter: 'blur(8px)', border: `1px solid ${INV.bord}`, padding: 2 }}>
        {zoomBtn('−', () => { const n = { ...tRef.current, scale: Math.max(tRef.current.scale - .25, FP_MIN_SCALE) }; tRef.current = n; setTransform({ ...n }); })}
        {zoomBtn('+', () => { const n = { ...tRef.current, scale: Math.min(tRef.current.scale + .25, FP_MAX_SCALE) }; tRef.current = n; setTransform({ ...n }); })}
        {zoomBtn('⊡', () => { tRef.current = FP_DEFAULT; setTransform({ ...FP_DEFAULT }); })}
        <div style={{ padding: '0 8px', fontFamily: INV_F.l, fontSize: 8, letterSpacing: '.12em', color: `${INV.gold}80`, lineHeight: '30px' }}>{Math.round(transform.scale * 100)}%</div>
      </div>

      {/* Canvas */}
      <div ref={containerRef}
        style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 78% 68% at 50% 44%, #251d12 0%, #1e1710 66%, #181109 100%)', border: `1px solid rgba(212,168,75,.10)`, boxShadow: '0 0 100px rgba(212,168,75,.04) inset, 0 24px 64px rgba(0,0,0,.5)', cursor: isPanning.current ? 'grabbing' : 'grab', touchAction: 'none', height: 'clamp(420px,56vw,600px)' }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        onClick={() => onSelect(null)}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: FP_GRAIN, opacity: .035, backgroundSize: '170px', pointerEvents: 'none' }} />
        <svg viewBox="0 0 940 600"
          style={{ width: '100%', height: '100%', transform: `translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`, transformOrigin: 'center center', transition: isPanning.current ? 'none' : 'transform .12s ease-out', userSelect: 'none' }}
          preserveAspectRatio="xMidYMid meet" role="img" aria-label="Cider & Spice interactive floor plan">
          <defs>
            <pattern id="ifp-grid-f" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0L0 0 0 20" fill="none" stroke="rgba(212,168,75,.03)" strokeWidth=".4" /></pattern>
            <pattern id="ifp-grid-m" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M100 0L0 0 0 100" fill="none" stroke="rgba(212,168,75,.05)" strokeWidth=".5" /></pattern>
            <radialGradient id="ifp-glow" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="rgba(212,168,75,.04)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient>
            <filter id="ifp-glow-line" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="ifp-aura" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          <rect width="940" height="600" fill="url(#ifp-grid-f)" />
          <rect width="940" height="600" fill="url(#ifp-grid-m)" />
          <rect width="940" height="600" fill="url(#ifp-glow)" />

          {/* Perimeter walls + corner ticks */}
          <rect x="24" y="24" width="892" height="552" fill="none" stroke="rgba(212,168,75,.22)" strokeWidth="1.5" />
          <rect x="14" y="14" width="912" height="572" fill="none" stroke="rgba(232,193,141,.06)" strokeWidth="1" />
          {([[24, 24, 1, 1], [916, 24, -1, 1], [24, 576, 1, -1], [916, 576, -1, -1]]).map(([cx, cy, sx, sy], i) => (
            <g key={i} transform={`translate(${cx},${cy})`}>
              <line x1={0} y1={0} x2={sx * 16} y2={0} stroke="rgba(192,98,42,.55)" strokeWidth="1.5" />
              <line x1={0} y1={0} x2={0} y2={sy * 16} stroke="rgba(192,98,42,.55)" strokeWidth="1.5" />
            </g>
          ))}

          {/* Guide lines */}
          <line x1="24" y1="160" x2="916" y2="160" stroke="rgba(212,168,75,.05)" strokeWidth=".5" strokeDasharray="3 7" />
          <line x1="24" y1="440" x2="916" y2="440" stroke="rgba(212,168,75,.05)" strokeWidth=".5" strokeDasharray="3 7" />
          <line x1="180" y1="24" x2="180" y2="576" stroke="rgba(212,168,75,.04)" strokeWidth=".5" strokeDasharray="3 9" />
          <line x1="760" y1="24" x2="760" y2="576" stroke="rgba(212,168,75,.04)" strokeWidth=".5" strokeDasharray="3 9" />

          {/* Ghost zone labels */}
          <text x="470" y="20" textAnchor="middle" fill="rgba(232,193,141,.06)" fontSize="16" fontFamily="var(--inv-serif,Georgia,serif)" fontWeight="300" letterSpacing=".22em">PERMANENT ANCHOR ROW</text>
          <text x="470" y="596" textAnchor="middle" fill="rgba(232,193,141,.06)" fontSize="16" fontFamily="var(--inv-serif,Georgia,serif)" fontWeight="300" letterSpacing=".22em">ANCHOR · INCUBATOR ROW</text>
          <text x="470" y="312" textAnchor="middle" fill="rgba(232,193,141,.022)" fontSize="46" fontFamily="var(--inv-serif,Georgia,serif)" fontWeight="200" letterSpacing=".22em">ATRIUM</text>

          {/* Rooms */}
          {FP_ROOMS.map(r => {
            const m = FP_ENGINE[r.engine];
            const vis = isVisible(r);
            const active = selected === r.id;
            const hovering = hov === r.id;
            const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
            const nameSize = r.big ? 16 : r.w < 100 ? 9.5 : 11.5;
            return (
              <g key={r.id} role="button" tabIndex={vis ? 0 : -1}
                aria-label={`${r.name} — ${m.label}`}
                style={{ opacity: vis ? 1 : 0.12, cursor: vis ? 'pointer' : 'default', transition: 'opacity .35s', outline: 'none' }}
                onClick={(e) => { e.stopPropagation(); if (vis) onSelect(active ? null : r.id); }}
                onMouseEnter={() => setHov(r.id)} onMouseLeave={() => setHov(null)}
                onKeyDown={(e) => { if (vis && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect(active ? null : r.id); } }}>
                {/* Hit padding */}
                <rect x={r.x - 6} y={r.y - 6} width={r.w + 12} height={r.h + 12} fill="transparent" stroke="none" />
                {/* Active aura */}
                {active && <rect x={r.x - 10} y={r.y - 10} width={r.w + 20} height={r.h + 20} fill={m.color} opacity={.2} filter="url(#ifp-aura)" />}
                {/* Active ring */}
                {active && <rect x={r.x - 3} y={r.y - 3} width={r.w + 6} height={r.h + 6} fill="none" stroke={m.color} strokeWidth=".9" opacity={.7} filter="url(#ifp-glow-line)" />}
                {/* Hover ring */}
                {hovering && !active && <rect x={r.x - 2} y={r.y - 2} width={r.w + 4} height={r.h + 4} fill="none" stroke="rgba(232,193,141,.22)" strokeWidth=".7" />}
                {/* Main rect */}
                <rect x={r.x} y={r.y} width={r.w} height={r.h}
                  fill={active || hovering ? m.fillHi : m.fill}
                  stroke={active ? m.color : hovering ? m.color : m.stroke}
                  strokeWidth={active ? 1.6 : .8}
                  style={{ transition: 'fill .22s, stroke .22s' }} />
                {/* Inner bevel */}
                <rect x={r.x + 3} y={r.y + 3} width={r.w - 6} height={r.h - 6} fill="none" stroke={active ? `${m.color}28` : 'rgba(232,193,141,.04)'} strokeWidth=".5" />
                {/* Status dot */}
                <circle cx={r.x + r.w - 10} cy={r.y + 10} r="3" fill={m.color} opacity={active ? 1 : .65} />
                {/* Name */}
                <text x={cx} y={r.big ? cy - 6 : cy - 3} textAnchor="middle"
                  fontFamily="var(--inv-serif, 'Cormorant Garamond', Georgia, serif)" fontWeight="400"
                  fontSize={nameSize} fill={active ? INV.parch : hovering ? INV.parch : INV.wheat}
                  style={{ pointerEvents: 'none', transition: 'fill .2s' }}>{r.name}</text>
                {/* Sqft */}
                <text x={cx} y={r.big ? cy + 16 : cy + 13} textAnchor="middle"
                  fontFamily="var(--inv-sans, 'Josefin Sans', sans-serif)" letterSpacing=".14em"
                  fontSize={r.w < 100 ? 6.5 : 7.5} fill={m.color}
                  style={{ pointerEvents: 'none', textTransform: 'uppercase', opacity: active ? 1 : .9 }}>{r.sqft}</text>
              </g>
            );
          })}

          {/* Compass */}
          <g transform="translate(894,548)" opacity=".42">
            <circle cx="0" cy="0" r="11" fill="none" stroke="rgba(212,168,75,.25)" strokeWidth=".5" />
            <line x1="0" y1="-13" x2="0" y2="13" stroke={INV.gold} strokeWidth=".75" />
            <line x1="-13" y1="0" x2="13" y2="0" stroke={INV.gold} strokeWidth=".75" />
            <polygon points="0,-13 3,-5 0,-2 -3,-5" fill={INV.gold} opacity=".9" />
            <text x="0" y="-17" textAnchor="middle" fill={INV.gold} fontSize="5.5" fontFamily="'Josefin Sans',sans-serif" letterSpacing=".1em">N</text>
          </g>
          {/* Scale bar */}
          <g transform="translate(44,584)" opacity=".38">
            <line x1="0" y1="0" x2="100" y2="0" stroke={INV.ter} strokeWidth=".75" />
            {[0, 25, 50, 75, 100].map(x => <line key={x} x1={x} y1="-3.5" x2={x} y2="3.5" stroke={INV.ter} strokeWidth=".75" />)}
            <text x="50" y="-7" textAnchor="middle" fill={INV.ter} fontSize="6" fontFamily="'Josefin Sans',sans-serif" letterSpacing=".12em">~75 FT</text>
          </g>
        </svg>
      </div>
      <p style={{ fontFamily: INV_F.l, fontSize: 7.5, letterSpacing: '.2em', textTransform: 'uppercase', color: `${INV.wheat}70`, textAlign: 'center', marginTop: 10, opacity: .6 }}>
        Scroll to zoom · Drag to pan · Click a space to inspect
      </p>
    </div>
  );
}

function FPDetail({ room }) {
  if (!room) {
    return (
      <div style={{ background: INV.surf, padding: '1.75rem 1.9rem', borderLeft: `2px solid ${INV.bord}` }}>
        <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, marginBottom: '0.6rem' }}>Two Revenue Engines, One Floor</div>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.86rem', color: INV.wheat, opacity: 0.6, lineHeight: 1.85, margin: 0 }}>
          <strong style={{ color: INV.ter, fontWeight: 500 }}>Market-rate anchors</strong> — the cider bar, commissary, and 7–8 permanent stalls — stabilize cash flow from day one. The <strong style={{ color: INV.gold, fontWeight: 500 }}>incubator pipeline</strong> — 2–3 cohort stalls and 2 ghost-kitchen bays — builds a graduating vendor base. <em style={{ color: INV.parch, fontStyle: 'italic' }}>Tap any space to inspect it.</em>
        </p>
      </div>
    );
  }
  const m = FP_ENGINE[room.engine];
  return (
    <div style={{ background: INV.surf, padding: '1.75rem 1.9rem', borderLeft: `2px solid ${m.color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: INV_F.d, fontSize: '1.5rem', color: m.color, lineHeight: 1 }} aria-hidden="true">{m.glyph}</span>
        <span style={{ fontFamily: INV_F.d, fontSize: '1.7rem', fontWeight: 400, color: INV.parch, lineHeight: 1.05 }}>{room.name}</span>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: m.color, border: `1px solid ${m.color}55`, padding: '3px 9px' }}>{m.label}</span>
      </div>
      <p style={{ fontFamily: INV_F.b, fontSize: '0.86rem', color: INV.wheat, opacity: 0.62, lineHeight: 1.82, marginBottom: '1.25rem' }}>{room.role}</p>
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, marginBottom: '0.3rem' }}>Footprint</div>
          <div style={{ fontFamily: INV_F.d, fontSize: '1.25rem', color: INV.parch }}>{room.sqft}</div>
        </div>
        <div>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, marginBottom: '0.3rem' }}>Revenue Role</div>
          <div style={{ fontFamily: INV_F.d, fontSize: '1.25rem', color: m.color }}>{room.revenue}</div>
        </div>
      </div>
    </div>
  );
}

function InvFloorPlan() {
  const [ref, inView] = useInView(0.12);
  const [filter, setFilter] = React.useState('all');
  const [selected, setSelected] = React.useState(null);
  const selRoom = FP_ROOMS.find(r => r.id === selected) || null;

  const FILTERS = [
    { id: 'all',       label: 'Whole Floor', color: INV.wheat },
    { id: 'market',    label: 'Market-Rate', color: INV.ter   },
    { id: 'incubator', label: 'Incubator',   color: INV.gold  },
  ];

  return (
    <section id="floorplan" ref={ref} style={{ paddingBottom: '5rem' }}>
      <SectionHead num="05" eyebrow="The Floor Plan" title="A Floor Built for Two Revenue Engines" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.42, marginBottom: '2rem', maxWidth: '44rem', lineHeight: 1.82 }}>
        The ~8,000 sq ft floor wraps a central atrium. Market-rate anchors — the cider bar, commissary, and 7–8 permanent stalls — stabilize cash flow from day one, while 2–3 incubator stalls and 2 ghost-kitchen bays feed a graduating vendor pipeline. Scroll to zoom, drag to pan, and tap any space to see how it earns.
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

      {/* Interactive schematic */}
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity .8s ease, transform .8s ease' }}>
        <FPCanvas filter={filter} selected={selected} onSelect={setSelected} />
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.75rem', marginTop: '1rem' }}>
        {Object.entries(FP_ENGINE).map(([k, m]) => (
          <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.55 }}>
            <span style={{ width: '10px', height: '10px', background: m.fillHi, border: `1px solid ${m.color}`, flexShrink: 0 }} />
            {m.label} · <span style={{ opacity: 0.7 }}>{m.tag}</span>
          </span>
        ))}
      </div>

      {/* Detail panel */}
      <div style={{ marginTop: '1.5rem' }}>
        <FPDetail room={selRoom} />
      </div>

      <p style={{ fontFamily: INV_F.b, fontSize: '0.74rem', color: INV.wheat, opacity: 0.28, lineHeight: 1.7, marginTop: '1.25rem' }}>
        Conceptual layout per Business Plan §3.1 — not a final architectural document. Unit counts (7–8 permanent, 2–3 incubator, 2 ghost bays), sizes, and rents are planning-stage estimates subject to site selection and lender review.
      </p>
    </section>
  );
}

Object.assign(window, { InvFloorPlan });
