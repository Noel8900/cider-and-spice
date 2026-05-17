'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

// ─── Types ───────────────────────────────────────────────────────────────────

type Zone   = 'all' | 'vendor' | 'cider' | 'kitchen' | 'seating' | 'support';
type Status = 'available' | 'reserved' | 'anchor';

interface Stall {
  id:         string;
  label:      string;
  sqft:       number;
  rent:       string;
  status:     Status;
  zone:       Exclude<Zone, 'all'>;
  // SVG rect geometry
  x: number; y: number; w: number; h: number;
  // label anchor
  lx?: number; ly?: number;
  description: string;
}

// ─── Floor plan data — 8,000 sq ft ───────────────────────────────────────────
// Canvas: 900 × 600 viewBox units  (≈ 100 units = ~8 ft)

const STALLS: Stall[] = [
  // ── North vendor row (top)
  { id:'S01', label:'Stall 01', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',  x:60,  y:60,  w:100, h:80,  description:'8×12 ft · North row · ideal for counter-service concepts.' },
  { id:'S02', label:'Stall 02', sqft:96,  rent:'~$800/mo',   status:'reserved',  zone:'vendor',  x:168, y:60,  w:100, h:80,  description:'8×12 ft · North row · reserved — under letter of intent.' },
  { id:'S03', label:'Stall 03', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',  x:276, y:60,  w:100, h:80,  description:'8×12 ft · North row · high-visibility corner approach.' },
  { id:'S04', label:'Stall 04', sqft:120, rent:'~$1,100/mo', status:'available', zone:'vendor',  x:384, y:60,  w:120, h:80,  description:'8×15 ft · Centre-north · expanded prep line available.' },
  { id:'S05', label:'Stall 05', sqft:96,  rent:'~$800/mo',   status:'reserved',  zone:'vendor',  x:512, y:60,  w:100, h:80,  description:'8×12 ft · North row · reserved — under letter of intent.' },
  { id:'S06', label:'Stall 06', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',  x:620, y:60,  w:100, h:80,  description:'8×12 ft · North row · adjacent to Cider Bar pass-through.' },
  // ── South vendor row (bottom)
  { id:'S07', label:'Stall 07', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',  x:60,  y:450, w:100, h:80,  description:'8×12 ft · South row · near main entry — maximum foot traffic.' },
  { id:'S08', label:'Stall 08', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',  x:168, y:450, w:100, h:80,  description:'8×12 ft · South row · open.' },
  { id:'S09', label:'Stall 09', sqft:120, rent:'~$1,100/mo', status:'available', zone:'vendor',  x:276, y:450, w:120, h:80,  description:'8×15 ft · Centre-south · expanded space with extra storage.' },
  { id:'S10', label:'Stall 10', sqft:96,  rent:'~$800/mo',   status:'reserved',  zone:'vendor',  x:404, y:450, w:100, h:80,  description:'8×12 ft · South row · reserved — under letter of intent.' },
  { id:'S11', label:'Stall 11', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',  x:512, y:450, w:100, h:80,  description:'8×12 ft · South row · open.' },
  // ── Anchor: Cider Bar (east)
  { id:'CB',  label:'Cider Bar', sqft:480, rent:'Anchor',     status:'anchor',    zone:'cider',   x:728, y:60,  w:152, h:280, description:'Cider & Spice Bar · 20–25 rotating taps · 480 sq ft · bar-top seating for 14.' },
  // ── Commissary Kitchen (west)
  { id:'CK',  label:'Kitchen',   sqft:320, rent:'Shared',     status:'anchor',    zone:'kitchen', x:60,  y:180, w:152, h:200, description:'Shared commissary kitchen · 320 sq ft · licensed · available for vendor prep and private bookings.' },
  // ── Event stage (east-south)
  { id:'EV',  label:'Stage',     sqft:200, rent:'Rentable',   status:'available', zone:'seating', x:728, y:360, w:152, h:170, description:'Flexible event stage · 200 sq ft · retractable seating for 40 · available for private hire.' },
  // ── Central seating atrium
  { id:'AT',  label:'Atrium',    sqft:1800,rent:'Common',     status:'anchor',    zone:'seating', x:240, y:180, w:460, h:240, description:'Central seating atrium · 1,800 sq ft · communal tables, bar-height counters, and lounge zones.' },
  // ── Support: entry + restrooms
  { id:'EN',  label:'Entry',     sqft:120, rent:'—',          status:'anchor',    zone:'support', x:60,  y:390, w:152, h:50,  description:'Main entry vestibule · accessible entry · bike parking adjacent.' },
  { id:'RR',  label:'Restrooms', sqft:120, rent:'—',          status:'anchor',    zone:'support', x:728, y:540, w:152, h:50,  description:'ADA-compliant restrooms · gender-neutral single-occupancy.' },
];

const ZONES: { id: Zone; label: string }[] = [
  { id: 'all',     label: 'All Zones'  },
  { id: 'vendor',  label: 'Vendor Stalls' },
  { id: 'cider',   label: 'Cider Bar'  },
  { id: 'kitchen', label: 'Kitchen'    },
  { id: 'seating', label: 'Seating'    },
  { id: 'support', label: 'Support'    },
];

// ─── Style helpers ────────────────────────────────────────────────────────────

const ZONE_FILL: Record<Exclude<Zone,'all'>, string> = {
  vendor:  'rgba(212,168,75,0.07)',
  cider:   'rgba(196,93,42,0.10)',
  kitchen: 'rgba(79,152,163,0.10)',
  seating: 'rgba(255,255,255,0.03)',
  support: 'rgba(255,255,255,0.02)',
};

const ZONE_STROKE: Record<Exclude<Zone,'all'>, string> = {
  vendor:  'rgba(212,168,75,0.35)',
  cider:   'rgba(196,93,42,0.50)',
  kitchen: 'rgba(79,152,163,0.45)',
  seating: 'rgba(255,255,255,0.10)',
  support: 'rgba(255,255,255,0.08)',
};

const STATUS_COLOR: Record<Status, string> = {
  available: '#d4a84b',
  reserved:  '#c45d2a',
  anchor:    '#4f98a3',
};

const STATUS_LABEL: Record<Status, string> = {
  available: 'Available',
  reserved:  'Reserved',
  anchor:    'Anchor',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FloorPlanClient() {
  const svgRef        = useRef<SVGSVGElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const [activeZone, setActiveZone]   = useState<Zone>('all');
  const [activeStall, setActiveStall] = useState<Stall | null>(null);
  const [tooltipPos, setTooltipPos]   = useState({ x: 0, y: 0 });

  // GSAP entrance: stagger stall rects
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fp-stall', {
        opacity: 0,
        scale: 0.92,
        transformOrigin: 'center center',
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  const isVisible = useCallback((stall: Stall) => {
    return activeZone === 'all' || stall.zone === activeZone;
  }, [activeZone]);

  function handleStallClick(stall: Stall, e: React.MouseEvent) {
    if (activeStall?.id === stall.id) {
      setActiveStall(null);
      return;
    }
    // Position tooltip relative to container
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setActiveStall(stall);
  }

  function handleKeyDown(stall: Stall, e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveStall(prev => prev?.id === stall.id ? null : stall);
    }
  }

  const vendorCount     = STALLS.filter(s => s.zone === 'vendor').length;
  const availableCount  = STALLS.filter(s => s.zone === 'vendor' && s.status === 'available').length;

  return (
    <main className="min-h-screen bg-bg text-cream">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="px-6 pb-10 pt-28">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 font-label text-[9px]
                       tracking-[0.2em] uppercase text-cream/40 hover:text-gold
                       transition-colors duration-300"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to the Hub
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-px w-8 bg-gold shrink-0" />
                <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
                  Interactive Floor Plan
                </span>
              </div>
              <h1 className="font-corp-display text-5xl sm:text-6xl font-light leading-[0.92] text-cream">
                8,000 Sq Ft
              </h1>
              <p className="mt-3 font-sans text-sm text-cream/45 max-w-md">
                {vendorCount} vendor stalls · Craft Cider Bar · Commissary Kitchen · Event Stage
              </p>
            </div>

            {/* Availability pill */}
            <div className="border border-gold/20 bg-gold/[0.05] px-6 py-4 text-center">
              <div className="font-corp-display text-3xl font-light text-gold">
                {availableCount}
                <span className="font-sans text-base font-normal text-cream/40"> / {vendorCount}</span>
              </div>
              <div className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/40 mt-1">
                Vendor Spots Open
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Zone filter bar ───────────────────────────────────────────────── */}
      <div className="border-y border-cream/[0.07] px-6 py-4">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label text-[9px] tracking-[0.2em] uppercase text-cream/30 mr-2">
              Zone
            </span>
            {ZONES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => { setActiveZone(id); setActiveStall(null); }}
                aria-pressed={activeZone === id}
                className={`border px-4 py-2 font-label text-[9px] tracking-[0.18em] uppercase
                  transition-all duration-200
                  ${
                    activeZone === id
                      ? 'border-gold/50 bg-gold/[0.09] text-gold'
                      : 'border-cream/[0.10] text-cream/35 hover:border-cream/25 hover:text-cream/55'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SVG canvas ───────────────────────────────────────────────────── */}
      <div className="px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div
            ref={containerRef}
            className="relative border border-cream/[0.08] bg-[#0e0c09] overflow-hidden"
            style={{ boxShadow: '0 0 80px rgba(212,168,75,0.04) inset, 0 24px 64px rgba(0,0,0,0.5)' }}
          >
            {/* Subtle grain overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                backgroundSize: '200px 200px',
              }}
              aria-hidden="true"
            />

            <svg
              ref={svgRef}
              viewBox="0 0 900 620"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Interactive floor plan of the Las Cruces Culinary Innovation Hub"
            >
              {/* ── Background grid ── */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(212,168,75,0.04)" strokeWidth="0.5" />
                </pattern>
                {/* Gold glow filter for active stall */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {/* Ember pulse filter */}
                <filter id="ember-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect width="900" height="620" fill="url(#grid)" />

              {/* ── Outer perimeter wall ── */}
              <rect x="40" y="40" width="820" height="540" fill="none"
                stroke="rgba(212,168,75,0.25)" strokeWidth="1.5" />

              {/* ── North/South corridor lines ── */}
              <line x1="40"  y1="150" x2="860" y2="150" stroke="rgba(212,168,75,0.08)" strokeWidth="0.5" strokeDasharray="4 6" />
              <line x1="40"  y1="440" x2="860" y2="440" stroke="rgba(212,168,75,0.08)" strokeWidth="0.5" strokeDasharray="4 6" />

              {/* ── Stalls ── */}
              {STALLS.map((stall) => {
                const visible  = isVisible(stall);
                const isActive = activeStall?.id === stall.id;
                const cx       = stall.x + stall.w / 2;
                const cy       = stall.y + stall.h / 2;

                return (
                  <g
                    key={stall.id}
                    className="fp-stall"
                    role="button"
                    tabIndex={visible ? 0 : -1}
                    aria-label={`${stall.label} — ${stall.sqft} sq ft, ${STATUS_LABEL[stall.status]}`}
                    aria-pressed={isActive}
                    onClick={(e) => visible && handleStallClick(stall, e)}
                    onKeyDown={(e) => visible && handleKeyDown(stall, e)}
                    style={{
                      cursor:  visible ? 'pointer' : 'default',
                      opacity: visible ? 1 : 0.18,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {/* Active glow ring */}
                    {isActive && (
                      <rect
                        x={stall.x - 4} y={stall.y - 4}
                        width={stall.w + 8} height={stall.h + 8}
                        fill="none"
                        stroke={STATUS_COLOR[stall.status]}
                        strokeWidth="1"
                        opacity="0.5"
                        filter="url(#glow)"
                        rx="1"
                      />
                    )}

                    {/* Main rect */}
                    <rect
                      x={stall.x} y={stall.y}
                      width={stall.w} height={stall.h}
                      fill={isActive ? `${ZONE_FILL[stall.zone].replace(')', ', 0.18)')}` : ZONE_FILL[stall.zone]}
                      stroke={isActive ? STATUS_COLOR[stall.status] : ZONE_STROKE[stall.zone]}
                      strokeWidth={isActive ? 1.5 : 0.75}
                      rx="1"
                      style={{ transition: 'fill 0.2s, stroke 0.2s' }}
                    />

                    {/* Status dot */}
                    <circle
                      cx={stall.x + stall.w - 10}
                      cy={stall.y + 10}
                      r="3.5"
                      fill={STATUS_COLOR[stall.status]}
                      opacity="0.85"
                    />

                    {/* Stall ID label */}
                    <text
                      x={cx}
                      y={stall.h > 60 ? cy - 10 : cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? STATUS_COLOR[stall.status] : 'rgba(255,255,255,0.55)'}
                      fontSize={stall.zone === 'seating' ? '11' : stall.w > 120 ? '11' : '9'}
                      fontFamily="var(--font-cormorant, Georgia, serif)"
                      fontWeight="300"
                      letterSpacing="0.08em"
                      style={{ transition: 'fill 0.2s', pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {stall.label.toUpperCase()}
                    </text>

                    {/* Sq ft sub-label for larger cells */}
                    {stall.h > 80 && (
                      <text
                        x={cx}
                        y={cy + 14}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="rgba(212,168,75,0.45)"
                        fontSize="8"
                        fontFamily="var(--font-josefin, sans-serif)"
                        letterSpacing="0.12em"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {stall.sqft} SQ FT
                      </text>
                    )}
                  </g>
                );
              })}

              {/* ── Compass rose ── */}
              <g transform="translate(850,570)" opacity="0.3" aria-hidden="true">
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#d4a84b" strokeWidth="0.8" />
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#d4a84b" strokeWidth="0.8" />
                <text x="0" y="-16" textAnchor="middle" fill="#d4a84b" fontSize="7" fontFamily="var(--font-josefin, sans-serif)" letterSpacing="0.1em">N</text>
              </g>

              {/* ── Scale bar ── */}
              <g transform="translate(60,598)" opacity="0.35" aria-hidden="true">
                <line x1="0" y1="0" x2="80" y2="0" stroke="#d4a84b" strokeWidth="0.8" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#d4a84b" strokeWidth="0.8" />
                <line x1="80" y1="-4" x2="80" y2="4" stroke="#d4a84b" strokeWidth="0.8" />
                <text x="40" y="-7" textAnchor="middle" fill="#d4a84b" fontSize="7" fontFamily="var(--font-josefin, sans-serif)" letterSpacing="0.1em">~60 FT</text>
              </g>
            </svg>

            {/* ── Tooltip panel ─────────────────────────────────────────── */}
            {activeStall && (
              <div
                className="absolute z-20 w-72 border border-gold/30 bg-[#0e0c09]/95
                           backdrop-blur-sm shadow-2xl pointer-events-auto"
                style={{
                  left: Math.min(tooltipPos.x + 12, (containerRef.current?.offsetWidth ?? 600) - 300),
                  top:  Math.max(tooltipPos.y - 160, 8),
                }}
                role="dialog"
                aria-label={`Details for ${activeStall.label}`}
              >
                {/* Colour band */}
                <div
                  className="h-0.5 w-full"
                  style={{ background: STATUS_COLOR[activeStall.status] }}
                />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="font-corp-display text-xl font-light text-cream leading-tight">
                        {activeStall.label}
                      </div>
                      <div className="font-label text-[8px] tracking-[0.25em] uppercase mt-1"
                        style={{ color: STATUS_COLOR[activeStall.status] }}>
                        {STATUS_LABEL[activeStall.status]}
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveStall(null)}
                      className="text-cream/30 hover:text-cream/70 transition-colors mt-0.5"
                      aria-label="Close stall details"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-px bg-cream/[0.06] mb-4">
                    <div className="bg-[#0e0c09] px-3 py-3">
                      <div className="font-corp-display text-lg font-light text-gold">{activeStall.sqft}</div>
                      <div className="font-label text-[8px] tracking-[0.2em] uppercase text-cream/35">Sq Ft</div>
                    </div>
                    <div className="bg-[#0e0c09] px-3 py-3">
                      <div className="font-corp-display text-lg font-light text-gold">{activeStall.rent}</div>
                      <div className="font-label text-[8px] tracking-[0.2em] uppercase text-cream/35">Est. Rent</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs leading-relaxed text-cream/50 mb-5">
                    {activeStall.description}
                  </p>

                  {/* CTA */}
                  {activeStall.status === 'available' && (
                    <Link
                      href="/vendors"
                      className="flex w-full items-center justify-center gap-2
                                 bg-ember hover:bg-ember-hover px-4 py-3
                                 font-label text-[9px] tracking-[0.22em] uppercase
                                 text-white transition-colors"
                    >
                      Apply for This Stall →
                    </Link>
                  )}
                  {activeStall.status === 'reserved' && (
                    <div className="border border-ember/25 bg-ember/[0.06] px-4 py-3 text-center
                                    font-label text-[9px] tracking-[0.2em] uppercase text-ember/70">
                      Under Letter of Intent
                    </div>
                  )}
                  {activeStall.status === 'anchor' && (
                    <div className="border border-teal/25 bg-teal/[0.06] px-4 py-3 text-center
                                    font-label text-[9px] tracking-[0.2em] uppercase text-cream/40"
                      style={{ borderColor: 'rgba(79,152,163,0.25)', background: 'rgba(79,152,163,0.05)' }}>
                      Hub Anchor Space
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Legend ───────────────────────────────────────────────── */}
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 px-1">
            {(Object.entries(STATUS_COLOR) as [Status, string][]).map(([status, color]) => (
              <div key={status} className="flex items-center gap-2">
                <span className="block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                <span className="font-label text-[9px] tracking-[0.18em] uppercase text-cream/40">
                  {STATUS_LABEL[status]}
                </span>
              </div>
            ))}
            <div className="ml-auto font-label text-[9px] tracking-[0.18em] uppercase text-cream/25">
              Click any stall for details
            </div>
          </div>
        </div>
      </div>

      {/* ── Stall list (mobile fallback + detail reference) ───────────── */}
      <div className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="block h-px w-8 bg-gold/40 shrink-0" />
            <span className="font-label text-[9px] tracking-[0.3em] uppercase text-gold/60">
              Stall Directory
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px bg-cream/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {STALLS.filter(s => s.zone === 'vendor').map((stall) => (
              <button
                key={stall.id}
                onClick={(e) => { setActiveZone('all'); setActiveStall(stall); setTooltipPos({ x: 300, y: 200 }); }}
                className={`group text-left bg-bg p-5 hover:bg-white/[0.04] transition-colors duration-300
                  ${ activeStall?.id === stall.id ? 'outline outline-1 outline-gold/30' : '' }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-corp-display text-base font-light text-cream group-hover:text-gold
                                   transition-colors duration-300">
                    {stall.label}
                  </span>
                  <span
                    className="font-label text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 border"
                    style={{
                      color:        STATUS_COLOR[stall.status],
                      borderColor:  STATUS_COLOR[stall.status] + '55',
                      background:   STATUS_COLOR[stall.status] + '11',
                    }}
                  >
                    {STATUS_LABEL[stall.status]}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-xs text-cream/40">{stall.sqft} sq ft</span>
                  <span className="font-sans text-xs text-cream/40">{stall.rent}</span>
                </div>
              </button>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-10 border border-cream/[0.08] bg-white/[0.02] p-8 flex flex-col
                          items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <div className="font-corp-display text-xl font-light text-cream mb-1">
                Ready to claim your stall?
              </div>
              <p className="font-sans text-sm text-cream/45">
                {availableCount} vendor spots remain in the founding cohort.
              </p>
            </div>
            <Link
              href="/vendors"
              className="shrink-0 bg-ember hover:bg-ember-hover px-8 py-4 font-label
                         text-[10px] tracking-[0.25em] uppercase text-white
                         transition-colors whitespace-nowrap"
            >
              Apply as a Vendor →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
