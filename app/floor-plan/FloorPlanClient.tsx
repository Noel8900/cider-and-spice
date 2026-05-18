'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

type Zone   = 'all' | 'vendor' | 'cider' | 'kitchen' | 'seating' | 'support';
type Status = 'available' | 'reserved' | 'anchor';

interface Stall {
  id:          string;
  label:       string;
  sqft:        number;
  rent:        string;
  status:      Status;
  zone:        Exclude<Zone, 'all'>;
  x: number;  y: number;  w: number;  h: number;
  description: string;
  conceptType: string;
  story:       string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STALLS: Stall[] = [
  {
    id:'S01', label:'Stall 01', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',
    x:60,  y:60,  w:100, h:80,
    description:'8×12 ft · North row · ideal for counter-service concepts.',
    conceptType:'Open — Any Cuisine',
    story:'A prime north-row position with natural flow from the main atrium. Ideal for a fast-casual counter concept — tacos, Vietnamese bowls, wraps, or anything with a tight ticket time and wide appeal. 8×12 ft with shared commissary access included.',
  },
  {
    id:'S02', label:'Stall 02', sqft:96,  rent:'~$800/mo',   status:'reserved',  zone:'vendor',
    x:168, y:60,  w:100, h:80,
    description:'8×12 ft · North row · reserved — under letter of intent.',
    conceptType:'Reserved',
    story:'This stall is currently under letter of intent. A founding vendor has expressed strong interest and is in the final review stage. Check back or join the waitlist via the vendor application.',
  },
  {
    id:'S03', label:'Stall 03', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',
    x:276, y:60,  w:100, h:80,
    description:'8×12 ft · North row · high-visibility corner approach.',
    conceptType:'Open — Any Cuisine',
    story:'High-visibility corner approach with sightlines from both the entry corridor and the central atrium. Perfect for a concept with strong visual branding — desserts, specialty drinks, or a showstopper open-flame station.',
  },
  {
    id:'S04', label:'Stall 04', sqft:120, rent:'~$1,100/mo', status:'available', zone:'vendor',
    x:384, y:60,  w:120, h:80,
    description:'8×15 ft · Centre-north · expanded prep line available.',
    conceptType:'Open — Expanded Format',
    story:'The largest north-row stall at 8×15 ft. Extra depth supports a longer prep line or a double-station setup — great for a Mediterranean spread, a Southern BBQ concept with a smoker connection, or a ramen bar with visible broth work.',
  },
  {
    id:'S05', label:'Stall 05', sqft:96,  rent:'~$800/mo',   status:'reserved',  zone:'vendor',
    x:512, y:60,  w:100, h:80,
    description:'8×12 ft · North row · reserved — under letter of intent.',
    conceptType:'Reserved',
    story:'This stall is currently under letter of intent. A founding vendor has expressed strong interest and is in the final review stage. Check back or join the waitlist via the vendor application.',
  },
  {
    id:'S06', label:'Stall 06', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',
    x:620, y:60,  w:100, h:80,
    description:'8×12 ft · North row · adjacent to Cider Bar pass-through.',
    conceptType:'Open — Cider Pairing Preferred',
    story:'Positioned directly adjacent to the Cider Bar pass-through corridor — the highest foot-traffic lane in the building. A food pairing-friendly concept (charcuterie, elevated snacks, small plates) would have a built-in audience here every evening.',
  },
  {
    id:'S07', label:'Stall 07', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',
    x:60,  y:450, w:100, h:80,
    description:'8×12 ft · South row · near main entry — maximum foot traffic.',
    conceptType:'Open — High Velocity',
    story:'First stall visible from the main entry — the highest foot-traffic position in the south row. Suited for a concept with instant recognizability and quick service. Mexican street food, elotes, or a loaded fries concept would thrive here.',
  },
  {
    id:'S08', label:'Stall 08', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',
    x:168, y:450, w:100, h:80,
    description:'8×12 ft · South row · open.',
    conceptType:'Open — Any Cuisine',
    story:'Open south-row stall with direct atrium visibility. A New Mexican, Asian fusion, or plant-forward concept would complement the existing mix and draw repeat weekday lunch traffic from the downtown corridor.',
  },
  {
    id:'S09', label:'Stall 09', sqft:120, rent:'~$1,100/mo', status:'available', zone:'vendor',
    x:276, y:450, w:120, h:80,
    description:'8×15 ft · Centre-south · expanded space with extra storage.',
    conceptType:'Open — Expanded Format',
    story:'The largest south-row stall at 8×15 ft with extra cold storage access. Ideal for a concept with higher ingredient volume — sushi, a full BBQ operation, or a multicultural tasting menu format. The extra depth also supports a small chef’s counter for visibility.',
  },
  {
    id:'S10', label:'Stall 10', sqft:96,  rent:'~$800/mo',   status:'reserved',  zone:'vendor',
    x:404, y:450, w:100, h:80,
    description:'8×12 ft · South row · reserved — under letter of intent.',
    conceptType:'Reserved',
    story:'This stall is currently under letter of intent. A founding vendor has expressed strong interest and is in the final review stage. Check back or join the waitlist via the vendor application.',
  },
  {
    id:'S11', label:'Stall 11', sqft:96,  rent:'~$800/mo',   status:'available', zone:'vendor',
    x:512, y:450, w:100, h:80,
    description:'8×12 ft · South row · open.',
    conceptType:'Open — Any Cuisine',
    story:'Open south-row position near the event stage — stalls near live programming benefit from elevated evening dwell time and impulse orders. Any cuisine welcome; a dessert or late-night concept would have a natural competitive advantage here.',
  },
  {
    id:'CB',  label:'Cider Bar', sqft:480, rent:'Anchor',    status:'anchor',    zone:'cider',
    x:728, y:60,  w:152, h:280,
    description:'Cider & Spice Bar · 20–25 rotating taps · 480 sq ft · bar-top seating for 14.',
    conceptType:'Hub Anchor — Craft Cider',
    story:'The 480 sq ft Cider & Spice Bar is the anchor experience of the Hub — Southern New Mexico’s only dedicated craft cider bar. 20–25 rotating taps featuring 8–10 NM cideries. Bar-top seating for 14. Cider Club membership tiers from $25/mo. Food pairing menus rotate monthly with vendor concepts.',
  },
  {
    id:'CK',  label:'Kitchen',   sqft:320, rent:'Shared',    status:'anchor',    zone:'kitchen',
    x:60,  y:180, w:152, h:200,
    description:'Shared commissary kitchen · 320 sq ft · licensed · available for vendor prep and private bookings.',
    conceptType:'Hub Anchor — Commissary',
    story:'The 320 sq ft shared commissary kitchen is licensed and available to all vendors for prep work outside peak service hours. Also available for external food entrepreneurs, catering operators, and NMSU/DACC culinary students at $25–35/hr. A core piece of the Hub’s incubator mission.',
  },
  {
    id:'EV',  label:'Stage',     sqft:200, rent:'Rentable',  status:'available', zone:'seating',
    x:728, y:360, w:152, h:170,
    description:'Flexible event stage · 200 sq ft · retractable seating for 40 · available for private hire.',
    conceptType:'Event & Live Programming',
    story:'A 200 sq ft flexible event stage with retractable seating for 40. Live Music Fridays, Chile Harvest Festival sets, cooking classes, and entrepreneur pitch nights all anchor here. Available for private hire — weddings, corporate events, cultural programming. Connects directly to the Cider Bar for seamless service.',
  },
  {
    id:'AT',  label:'Atrium',    sqft:1800,rent:'Common',    status:'anchor',    zone:'seating',
    x:240, y:180, w:460, h:240,
    description:'Central seating atrium · 1,800 sq ft · communal tables, bar-height counters, and lounge zones.',
    conceptType:'Common Area — Communal Seating',
    story:'The 1,800 sq ft central atrium is the heart of the Hub — climate-controlled, flexible, and designed for lingering. Communal tables seat 60–80 guests. Bar-height counters ring the perimeter. Lounge zones with low seating anchor the corners. Reconfigures for events, markets, and night programming.',
  },
  {
    id:'EN',  label:'Entry',     sqft:120, rent:'—',         status:'anchor',    zone:'support',
    x:60,  y:390, w:152, h:50,
    description:'Main entry vestibule · accessible entry · bike parking adjacent.',
    conceptType:'Entry & Arrival',
    story:'The main entry vestibule creates a moment of arrival — a brief transition from the street into the atmosphere of the Hub. ADA-accessible. Bike parking adjacent. Digital event board at entry announces daily programming and specials.',
  },
  {
    id:'RR',  label:'Restrooms', sqft:120, rent:'—',         status:'anchor',    zone:'support',
    x:728, y:540, w:152, h:50,
    description:'ADA-compliant restrooms · gender-neutral single-occupancy.',
    conceptType:'Facilities',
    story:'ADA-compliant, gender-neutral single-occupancy restrooms serving the full hall. Positioned at the far corner to minimize traffic disruption through vendor and bar zones. Designed to hospitality standard with tile, lighting, and materials consistent with the overall design language.',
  },
];

const ZONES: { id: Zone; label: string }[] = [
  { id: 'all',     label: 'All Zones'    },
  { id: 'vendor',  label: 'Vendor Stalls'},
  { id: 'cider',   label: 'Cider Bar'   },
  { id: 'kitchen', label: 'Kitchen'     },
  { id: 'seating', label: 'Seating'     },
  { id: 'support', label: 'Support'     },
];

const ZONE_FILL: Record<Exclude<Zone,'all'>, string> = {
  vendor:  'rgba(201,122,62,0.06)',
  cider:   'rgba(196,93,42,0.09)',
  kitchen: 'rgba(79,152,163,0.08)',
  seating: 'rgba(232,211,165,0.025)',
  support: 'rgba(255,255,255,0.015)',
};

const ZONE_STROKE: Record<Exclude<Zone,'all'>, string> = {
  vendor:  'rgba(212,168,75,0.28)',
  cider:   'rgba(201,122,62,0.55)',
  kitchen: 'rgba(79,152,163,0.40)',
  seating: 'rgba(232,211,165,0.12)',
  support: 'rgba(232,211,165,0.07)',
};

const STATUS_COLOR: Record<Status, string> = {
  available: '#D4A84B',
  reserved:  '#C45D2A',
  anchor:    '#4F98A3',
};

const STATUS_LABEL: Record<Status, string> = {
  available: 'Available',
  reserved:  'Reserved',
  anchor:    'Anchor',
};

// ─── Zoom levels per zone ─────────────────────────────────────────────────────────────
const FOCUS_ZOOM: Record<Exclude<Zone,'all'>, number> = {
  vendor:  1.9,
  cider:   1.45,
  kitchen: 1.45,
  seating: 1.45,
  support: 1.45,
};

// ─── Story Drawer ─────────────────────────────────────────────────────────────

function StallDrawer({ stall, onClose }: { stall: Stall | null; onClose: () => void }) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const prevStall = useRef<Stall | null>(null);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    if (stall) {
      gsap.fromTo(el, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' });
    } else if (prevStall.current) {
      gsap.to(el, { y: '100%', opacity: 0, duration: 0.35, ease: 'power3.in' });
    }
    prevStall.current = stall;
  }, [stall]);

  useEffect(() => {
    if (!stall) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [stall, onClose]);

  const s = stall ?? prevStall.current;
  if (!s) return null;

  return (
    <div
      ref={drawerRef}
      role="dialog" aria-modal="true" aria-label={`Stall story: ${s.label}`}
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 80,
        background: 'linear-gradient(160deg, #1A1510 0%, #100E0A 100%)',
        borderTop: `1px solid ${STATUS_COLOR[s.status]}44`,
        boxShadow: '0 -24px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(232,211,165,0.04) inset',
        transform: 'translateY(100%)', opacity: 0, willChange: 'transform, opacity',
      }}
    >
      <div style={{ height: 2, background: `linear-gradient(90deg, ${STATUS_COLOR[s.status]}, transparent)` }} />
      <div className="flex justify-center pt-3 pb-1">
        <div style={{ width: 36, height: 3, borderRadius: 2, background: 'rgba(232,211,165,0.12)' }} />
      </div>
      <div className="max-w-5xl mx-auto px-6 pb-8 pt-2">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h2 className="font-corp-display text-2xl sm:text-3xl font-light leading-tight" style={{ color: '#E8D3A5' }}>{s.label}</h2>
              <span className="font-label text-[8px] tracking-[0.25em] uppercase px-2.5 py-1 shrink-0"
                style={{ color: STATUS_COLOR[s.status], border: `1px solid ${STATUS_COLOR[s.status]}44`, background: `${STATUS_COLOR[s.status]}11` }}
              >{STATUS_LABEL[s.status]}</span>
            </div>
            <p className="font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: 'rgba(201,122,62,0.65)' }}>{s.conceptType}</p>
          </div>
          <button onClick={onClose} aria-label="Close stall story"
            className="shrink-0 w-9 h-9 flex items-center justify-center transition-colors duration-300"
            style={{ border: '1px solid rgba(232,211,165,0.12)', color: 'rgba(232,211,165,0.35)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#D4A84B'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,168,75,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(232,211,165,0.35)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(232,211,165,0.12)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="md:col-span-2">
            <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: 'rgba(232,211,165,0.55)' }}>{s.story}</p>
            {s.status === 'available' && (
              <Link href={`/vendors?stall=${s.id}`}
                className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #C97A3E 0%, #D4A84B 100%)', padding: '13px 28px', color: '#100E0A', fontWeight: 600, boxShadow: '0 8px 32px rgba(212,168,75,0.20)' }}
              >Apply for This Stall <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            )}
            {s.status === 'reserved' && (
              <Link href="/vendors"
                className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300"
                style={{ border: '1px solid rgba(196,93,42,0.30)', background: 'rgba(196,93,42,0.06)', padding: '13px 28px', color: 'rgba(196,93,42,0.75)' }}
              >Join the Waitlist →</Link>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-px self-start" style={{ background: 'rgba(232,211,165,0.06)' }}>
            <div style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-2xl font-light" style={{ color: '#D4A84B' }}>{s.sqft.toLocaleString()}</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Square Feet</div>
            </div>
            <div style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-2xl font-light" style={{ color: '#D4A84B' }}>{s.rent}</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Est. Rent</div>
            </div>
            {s.zone === 'vendor' && (
              <div style={{ background: '#13110D', padding: '16px 18px' }} className="col-span-2 md:col-span-1">
                <div className="font-corp-display text-2xl font-light" style={{ color: '#C97A3E' }}>2 yr</div>
                <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>License Term</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Zoom Controls ──────────────────────────────────────────────────────────────

const MIN_SCALE = 0.75;
const MAX_SCALE = 3;
const DEFAULT_MOBILE: { scale: number; x: number; y: number } = { scale: 1.15, x: -30, y: 0 };
const DEFAULT_DESKTOP: { scale: number; x: number; y: number } = { scale: 1, x: 0, y: 0 };

function ZoomControls({
  scale, onZoomIn, onZoomOut, onReset, onFit,
}: {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFit: () => void;
}) {
  const btnBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32,
    border: '1px solid rgba(232,211,165,0.10)',
    background: 'rgba(16,14,10,0.90)',
    color: 'rgba(232,211,165,0.45)',
    cursor: 'pointer',
    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
    backdropFilter: 'blur(8px)',
  };
  const hover = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = '#D4A84B';
    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,168,75,0.35)';
    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,168,75,0.07)';
  };
  const leave = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(232,211,165,0.45)';
    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(232,211,165,0.10)';
    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(16,14,10,0.90)';
  };

  return (
    <div className="flex items-center gap-px"
      style={{ border: '1px solid rgba(232,211,165,0.08)', background: 'rgba(16,14,10,0.6)', backdropFilter: 'blur(10px)' }}
    >
      <button style={btnBase} onMouseEnter={hover} onMouseLeave={leave} onClick={onZoomOut} disabled={scale <= MIN_SCALE} aria-label="Zoom out" title="Zoom out">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>
      </button>
      <div className="font-label text-[8px] tracking-[0.12em] uppercase px-3" style={{ color: 'rgba(212,168,75,0.50)', minWidth: 42, textAlign: 'center', lineHeight: '32px' }}>
        {Math.round(scale * 100)}%
      </div>
      <button style={btnBase} onMouseEnter={hover} onMouseLeave={leave} onClick={onZoomIn} disabled={scale >= MAX_SCALE} aria-label="Zoom in" title="Zoom in">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
      </button>
      <div style={{ width: 1, height: 20, background: 'rgba(232,211,165,0.08)', margin: '0 2px' }} />
      <button style={btnBase} onMouseEnter={hover} onMouseLeave={leave} onClick={onFit} aria-label="Fit plan to view" title="Fit to view">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
      </button>
      <button style={btnBase} onMouseEnter={hover} onMouseLeave={leave} onClick={onReset} aria-label="Reset view" title="Reset view">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      </button>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FloorPlanClient() {
  const svgRef        = useRef<SVGSVGElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const glowRef       = useRef<gsap.core.Tween | null>(null);
  const activeGlowRef = useRef<SVGRectElement | null>(null);
  const entranceDone  = useRef(false);
  // Tracks the in-flight camera tween so we can kill it on manual interaction
  const cameraTween   = useRef<gsap.core.Tween | null>(null);

  const [activeZone, setActiveZone]   = useState<Zone>('all');
  const [activeStall, setActiveStall] = useState<Stall | null>(null);
  const [tooltipPos, setTooltipPos]   = useState({ x: 0, y: 0 });
  const [hoverStall, setHoverStall]   = useState<string | null>(null);
  const [legendOpen, setLegendOpen]   = useState(false);
  const [isMobile, setIsMobile]       = useState(false);

  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  // transformRef mirrors state so the tween onUpdate can read/write without
  // stale closures while still driving a React re-render.
  const transformRef = useRef({ scale: 1, x: 0, y: 0 });

  const isPanning  = useRef(false);
  const panStart   = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const pinchDist  = useRef<number | null>(null);
  const pinchScale = useRef(1);

  // ── Detect mobile
  useEffect(() => {
    const mobile = window.innerWidth < 640;
    setIsMobile(mobile);
    if (mobile) {
      setTransform(DEFAULT_MOBILE);
      transformRef.current = DEFAULT_MOBILE;
    }
  }, []);

  // ── ScrollTrigger-gated cinematic entrance
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    gsap.set('#fp-perimeter', { opacity: 0 });
    gsap.set('.fp-zone-label', { opacity: 0 });
    gsap.set('.fp-stall-anchor', { opacity: 0, scale: 0.97, transformOrigin: 'center center' });
    gsap.set('.fp-stall-vendor', { opacity: 0, y: 6 });
    gsap.set('.fp-stall-support', { opacity: 0 });
    gsap.set('#fp-instruments', { opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, onComplete: () => { entranceDone.current = true; } });
      tl.to('#fp-perimeter',    { opacity: 1, duration: 1.2, ease: 'power2.out' });
      tl.to('.fp-zone-label',   { opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power1.out' }, '-=0.6');
      tl.to('.fp-stall-anchor', { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.4');
      tl.to('.fp-stall-vendor', { opacity: 1, y: 0, duration: 0.55, stagger: 0.045, ease: 'power2.out' }, '-=0.3');
      tl.to('.fp-stall-support',{ opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power1.out' }, '-=0.2');
      tl.to('#fp-instruments',  { opacity: 1, duration: 0.8, ease: 'power1.out' }, '-=0.1');

      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: 'top 80%',
        once: true,
        onEnter: () => { if (!entranceDone.current) tl.play(); },
      });

      ScrollTrigger.refresh();
      const bounds = containerRef.current?.getBoundingClientRect();
      if (bounds && bounds.top < window.innerHeight * 0.8) {
        setTimeout(() => { if (!entranceDone.current) tl.play(); }, 100);
      }
    }, svgRef);

    return () => ctx.revert();
  }, []);

  // ── Breathing glow
  useEffect(() => {
    glowRef.current?.kill();
    glowRef.current = null;
    if (activeGlowRef.current) {
      glowRef.current = gsap.to(activeGlowRef.current, {
        opacity: 0.15, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }
    return () => { glowRef.current?.kill(); };
  }, [activeStall]);

  const isVisible = useCallback((stall: Stall) =>
    activeZone === 'all' || stall.zone === activeZone,
  [activeZone]);

  // ─────────────────────────────────────────────────────────────────
  // focusOnStall
  // Tweens the camera (transform state) so the stall center sits in the middle
  // of the SVG container at the zone-appropriate zoom level.
  //
  // SVG viewBox is 900 × 620. The SVG is rendered with width=100% h=auto inside
  // the container, so the displayed size scales with the container width.
  // We work entirely in SVG coordinate-space relative to the viewBox center
  // (450, 310) and convert to the CSS translate needed by the SVG’s style prop.
  //
  // Formula (derived from the existing CSS transform):
  //   rendered_SVG_px = container.offsetWidth  (h = container.offsetWidth * 620/900)
  //   svgScale = container.offsetWidth / 900
  //   stalCenter in CSS px (at scale=1, no pan) = stall_svgCoord * svgScale
  //   containerCenter = (container.offsetWidth/2, container.offsetHeight/2)
  //   targetX = containerCenter.x - stallCenter_px.x * focusZoom
  //   targetY = containerCenter.y - stallCenter_px.y * focusZoom
  // ─────────────────────────────────────────────────────────────────
  const focusOnStall = useCallback((stall: Stall) => {
    const container = containerRef.current;
    if (!container) return;

    cameraTween.current?.kill();

    const targetScale = FOCUS_ZOOM[stall.zone];
    const cW = container.offsetWidth;
    const cH = container.offsetHeight;
    const svgNativeW = 900;
    const svgNativeH = 620;
    const svgScale   = cW / svgNativeW;

    // Stall center in SVG user-units
    const stallCX = stall.x + stall.w / 2;
    const stallCY = stall.y + stall.h / 2;

    // Convert to CSS pixels at scale=1 (the SVG rendered size before our
    // transform), then apply target scale to get where the stall center lands.
    // We want that position to equal the container center.
    const targetX = cW / 2 - stallCX * svgScale * targetScale;
    const targetY = cH / 2 - stallCY * svgScale * targetScale;

    // Animate via a proxy object so GSAP drives the values smoothly
    const proxy = { scale: transformRef.current.scale, x: transformRef.current.x, y: transformRef.current.y };

    cameraTween.current = gsap.to(proxy, {
      scale: targetScale,
      x: targetX,
      y: targetY,
      duration: 1.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        const next = { scale: proxy.scale, x: proxy.x, y: proxy.y };
        transformRef.current = next;
        setTransform({ ...next });
      },
      onComplete: () => { cameraTween.current = null; },
    });
  }, []);

  // ── Kill camera tween the moment user starts interacting manually
  function killCamera() {
    if (cameraTween.current) {
      cameraTween.current.kill();
      cameraTween.current = null;
    }
  }

  // ── Zoom helpers (also kill any in-flight camera tween)
  const STEP = 0.25;
  const zoomIn   = () => { killCamera(); setTransform(t => { const n = { ...t, scale: Math.min(t.scale + STEP, MAX_SCALE) }; transformRef.current = n; return n; }); };
  const zoomOut  = () => { killCamera(); setTransform(t => { const n = { ...t, scale: Math.max(t.scale - STEP, MIN_SCALE) }; transformRef.current = n; return n; }); };
  const resetView = () => { killCamera(); const n = isMobile ? DEFAULT_MOBILE : DEFAULT_DESKTOP; transformRef.current = n; setTransform(n); };
  const fitView   = () => { killCamera(); const n = { scale: 0.92, x: 0, y: 0 }; transformRef.current = n; setTransform(n); };

  // ── Mouse pan
  function onMouseDown(e: React.MouseEvent) {
    killCamera();
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isPanning.current) return;
    setTransform(t => {
      const n = { ...t, x: panStart.current.tx + e.clientX - panStart.current.x, y: panStart.current.ty + e.clientY - panStart.current.y };
      transformRef.current = n;
      return n;
    });
  }
  function onMouseUp() { isPanning.current = false; }

  // ── Touch pan + pinch
  function getTouchDist(touches: React.TouchList) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function onTouchStart(e: React.TouchEvent) {
    killCamera();
    if (e.touches.length === 1) {
      isPanning.current = true;
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx: transform.x, ty: transform.y };
    } else if (e.touches.length === 2) {
      isPanning.current = false;
      pinchDist.current = getTouchDist(e.touches);
      pinchScale.current = transform.scale;
    }
  }
  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 1 && isPanning.current) {
      setTransform(t => {
        const n = { ...t, x: panStart.current.tx + e.touches[0].clientX - panStart.current.x, y: panStart.current.ty + e.touches[0].clientY - panStart.current.y };
        transformRef.current = n;
        return n;
      });
    } else if (e.touches.length === 2 && pinchDist.current !== null) {
      const ratio = getTouchDist(e.touches) / pinchDist.current;
      setTransform(t => {
        const n = { ...t, scale: Math.min(Math.max(pinchScale.current * ratio, MIN_SCALE), MAX_SCALE) };
        transformRef.current = n;
        return n;
      });
    }
  }
  function onTouchEnd() { isPanning.current = false; pinchDist.current = null; }

  // ── Stall click: activate + fire cinematic camera move
  function handleStallClick(stall: Stall, e: React.MouseEvent) {
    e.stopPropagation();
    if (activeStall?.id === stall.id) {
      setActiveStall(null);
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setActiveStall(stall);
    focusOnStall(stall);
  }

  function handleKeyDown(stall: Stall, e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (activeStall?.id === stall.id) { setActiveStall(null); return; }
      setActiveStall(stall);
      focusOnStall(stall);
    }
  }

  const vendorCount    = STALLS.filter(s => s.zone === 'vendor').length;
  const availableCount = STALLS.filter(s => s.zone === 'vendor' && s.status === 'available').length;

  return (
    <main className="min-h-screen text-cream" style={{ background: '#100E0A' }}>

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="relative px-6 pb-12 pt-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,168,75,0.07) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="mx-auto max-w-5xl relative">
          <Link href="/" className="mb-12 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.25em] uppercase text-cream/35 hover:text-gold transition-colors duration-500">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to the Hub
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="block h-px w-12 shrink-0" style={{ background: 'linear-gradient(90deg, #C97A3E, #D4A84B)' }} />
                <span className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: '#C97A3E' }}>Las Cruces Culinary Hub · Plan A-1</span>
              </div>
              <h1 className="font-corp-display text-5xl sm:text-6xl font-light leading-[0.92]" style={{ color: '#E8D3A5' }}>8,000 Sq Ft</h1>
              <p className="mt-4 font-sans text-sm leading-relaxed max-w-md" style={{ color: 'rgba(232,211,165,0.40)' }}>
                {vendorCount} vendor stalls &nbsp;·&nbsp; Craft Cider Bar &nbsp;·&nbsp; Commissary Kitchen &nbsp;·&nbsp; Event Stage
              </p>
              <p className="mt-2 font-label text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(232,211,165,0.20)' }}>Conceptual plan — subject to refinement with anchor tenants</p>
            </div>
            <div className="px-8 py-5 text-center"
              style={{ border: '1px solid rgba(212,168,75,0.18)', background: 'linear-gradient(135deg, rgba(212,168,75,0.06) 0%, rgba(201,122,62,0.04) 100%)', boxShadow: '0 0 40px rgba(212,168,75,0.04) inset' }}
            >
              <div className="font-corp-display text-4xl font-light" style={{ color: '#D4A84B' }}>
                {availableCount}<span className="font-sans text-lg font-normal" style={{ color: 'rgba(232,211,165,0.35)' }}> / {vendorCount}</span>
              </div>
              <div className="font-label text-[8px] tracking-[0.3em] uppercase mt-1.5" style={{ color: 'rgba(232,211,165,0.35)' }}>Vendor Spots Open</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Zone filter bar ──────────────────────────────────────────────── */}
      <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(232,211,165,0.07)', borderBottom: '1px solid rgba(232,211,165,0.07)' }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-label text-[8px] tracking-[0.25em] uppercase mr-2" style={{ color: 'rgba(232,211,165,0.25)' }}>Filter Zone</span>
            {ZONES.map(({ id, label }) => (
              <button key={id} onClick={() => { setActiveZone(id); setActiveStall(null); }} aria-pressed={activeZone === id}
                className="px-4 py-2 font-label text-[8px] tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  border: activeZone === id ? '1px solid rgba(212