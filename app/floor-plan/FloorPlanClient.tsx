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

// ─── Zoom levels per zone ──────────────────────────────────────────────────────
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
        maxHeight: '80dvh',
        overflowY: 'auto',
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
  const svgRef         = useRef<SVGSVGElement>(null);
  const containerRef   = useRef<HTMLDivElement>(null);
  const drawerShellRef = useRef<HTMLDivElement>(null);
  const glowRef        = useRef<gsap.core.Tween | null>(null);
  const activeGlowRef  = useRef<SVGRectElement | null>(null);
  const entranceDone   = useRef(false);
  const cameraTween    = useRef<gsap.core.Tween | null>(null);

  const [activeZone, setActiveZone]   = useState<Zone>('all');
  const [activeStall, setActiveStall] = useState<Stall | null>(null);
  const [tooltipPos, setTooltipPos]   = useState({ x: 0, y: 0 });
  const [hoverStall, setHoverStall]   = useState<string | null>(null);
  const [legendOpen, setLegendOpen]   = useState(false);
  const [isMobile, setIsMobile]       = useState(false);

  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const transformRef = useRef({ scale: 1, x: 0, y: 0 });

  const isPanning  = useRef(false);
  const panStart   = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const pinchDist  = useRef<number | null>(null);
  const pinchScale = useRef(1);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      const defaults = mobile ? DEFAULT_MOBILE : DEFAULT_DESKTOP;
      transformRef.current = defaults;
      setTransform(defaults);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

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
      ScrollTrigger.create({ trigger: containerRef.current!, start: 'top 80%', once: true, onEnter: () => { if (!entranceDone.current) tl.play(); } });
      ScrollTrigger.refresh();
      const bounds = containerRef.current?.getBoundingClientRect();
      if (bounds && bounds.top < window.innerHeight * 0.8) setTimeout(() => { if (!entranceDone.current) tl.play(); }, 100);
    }, svgRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      killCamera();
      const rect   = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const delta  = e.deltaY > 0 ? -0.12 : 0.12;
      const prev   = transformRef.current;
      const next   = Math.min(Math.max(prev.scale + delta, MIN_SCALE), MAX_SCALE);
      const ratio  = next / prev.scale;
      const newX   = mouseX - ratio * (mouseX - prev.x);
      const newY   = mouseY - ratio * (mouseY - prev.y);
      const n = { scale: next, x: newX, y: newY };
      transformRef.current = n;
      setTransform(n);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    glowRef.current?.kill();
    glowRef.current = null;
    if (activeGlowRef.current) {
      glowRef.current = gsap.to(activeGlowRef.current, { opacity: 0.15, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
    return () => { glowRef.current?.kill(); };
  }, [activeStall]);

  const isVisible = useCallback((stall: Stall) =>
    activeZone === 'all' || stall.zone === activeZone,
  [activeZone]);

  const focusOnStall = useCallback((stall: Stall) => {
    const container = containerRef.current;
    if (!container) return;
    cameraTween.current?.kill();
    const targetScale = FOCUS_ZOOM[stall.zone];
    const cW = container.offsetWidth;
    const cH = container.offsetHeight;
    const svgScale = cW / 900;
    const stallCX  = stall.x + stall.w / 2;
    const stallCY  = stall.y + stall.h / 2;
    const targetX  = cW / 2 - stallCX * svgScale * targetScale;
    const targetY  = cH / 2 - stallCY * svgScale * targetScale;
    const proxy = { ...transformRef.current };
    cameraTween.current = gsap.to(proxy, {
      scale: targetScale, x: targetX, y: targetY,
      duration: 1.2, ease: 'power3.inOut',
      onUpdate: () => {
        const next = { scale: proxy.scale, x: proxy.x, y: proxy.y };
        transformRef.current = next;
        setTransform({ ...next });
      },
      onComplete: () => { cameraTween.current = null; },
    });
  }, []);

  function killCamera() {
    if (cameraTween.current) { cameraTween.current.kill(); cameraTween.current = null; }
  }

  const STEP = 0.25;
  const zoomIn    = () => { killCamera(); setTransform(t => { const n = { ...t, scale: Math.min(t.scale + STEP, MAX_SCALE) }; transformRef.current = n; return n; }); };
  const zoomOut   = () => { killCamera(); setTransform(t => { const n = { ...t, scale: Math.max(t.scale - STEP, MIN_SCALE) }; transformRef.current = n; return n; }); };
  const resetView = () => { killCamera(); const n = isMobile ? DEFAULT_MOBILE : DEFAULT_DESKTOP; transformRef.current = n; setTransform(n); };
  const fitView   = () => { killCamera(); const n = { scale: 0.92, x: 0, y: 0 }; transformRef.current = n; setTransform(n); };

  function onMouseDown(e: React.MouseEvent) {
    killCamera();
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY, tx: transformRef.current.x, ty: transformRef.current.y };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isPanning.current) return;
    const n = {
      ...transformRef.current,
      x: panStart.current.tx + e.clientX - panStart.current.x,
      y: panStart.current.ty + e.clientY - panStart.current.y,
    };
    transformRef.current = n;
    setTransform(n);
  }
  function onMouseUp() { isPanning.current = false; }

  function getTouchDist(touches: React.TouchList) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function onTouchStart(e: React.TouchEvent) {
    killCamera();
    if (e.touches.length === 1) {
      isPanning.current = true;
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx: transformRef.current.x, ty: transformRef.current.y };
    } else if (e.touches.length === 2) {
      isPanning.current = false;
      pinchDist.current = getTouchDist(e.touches);
      pinchScale.current = transformRef.current.scale;
    }
  }
  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 1 && isPanning.current) {
      const n = {
        ...transformRef.current,
        x: panStart.current.tx + e.touches[0].clientX - panStart.current.x,
        y: panStart.current.ty + e.touches[0].clientY - panStart.current.y,
      };
      transformRef.current = n;
      setTransform(n);
    } else if (e.touches.length === 2 && pinchDist.current !== null) {
      const ratio = getTouchDist(e.touches) / pinchDist.current;
      const n = { ...transformRef.current, scale: Math.min(Math.max(pinchScale.current * ratio, MIN_SCALE), MAX_SCALE) };
      transformRef.current = n;
      setTransform(n);
    }
  }
  function onTouchEnd() { isPanning.current = false; pinchDist.current = null; }

  function handleStallClick(stall: Stall, e: React.MouseEvent) {
    e.stopPropagation();
    if (activeStall?.id === stall.id) { setActiveStall(null); return; }
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const canvasH = containerRef.current?.offsetHeight ?? 0;
      setTooltipPos({
        x: e.clientX - rect.left,
        y: Math.min(Math.max(e.clientY - rect.top, 8), canvasH - 8),
      });
    }
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

  function handleDirectoryClick(stall: Stall) {
    setActiveZone('all');
    setActiveStall(stall);
    setTooltipPos({ x: 300, y: 200 });
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => focusOnStall(stall), 350);
  }

  // FIX 4 — openFullStory: The drawer is position:fixed so it doesn’t live
  // in the scroll flow — scrolling to body.scrollHeight does nothing useful.
  // Instead, scroll the drawerShellRef anchor (the in-flow div that wraps the
  // drawer) into view so the page smoothly advances to the bottom section,
  // which gives the visual impression of “going to” the full story. The
  // activeStall state is already set; no no-op setState needed.
  function openFullStory() {
    drawerShellRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
                  border: activeZone === id ? '1px solid rgba(212,168,75,0.45)' : '1px solid rgba(232,211,165,0.09)',
                  background: activeZone === id ? 'linear-gradient(135deg, rgba(212,168,75,0.10), rgba(201,122,62,0.07))' : 'transparent',
                  color: activeZone === id ? '#D4A84B' : 'rgba(232,211,165,0.30)',
                  boxShadow: activeZone === id ? '0 0 16px rgba(212,168,75,0.08) inset' : 'none',
                }}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Canvas toolbar ───────────────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-1">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
          <span className="font-label text-[8px] tracking-[0.22em] uppercase sm:hidden" style={{ color: 'rgba(232,211,165,0.20)' }}>Pinch to zoom · drag to explore</span>
          <span className="font-label text-[8px] tracking-[0.22em] uppercase hidden sm:block" style={{ color: 'rgba(232,211,165,0.20)' }}>Interactive Plan · Scroll to Zoom · Drag to Pan</span>
          <ZoomControls scale={transform.scale} onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetView} onFit={fitView} />
        </div>
      </div>

      {/* ── SVG canvas ───────────────────────────────────────────────────── */}
      <div className="px-4 pb-10 pt-3">
        <div className="mx-auto max-w-5xl">
          <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 45%, #1A1510 0%, #100E0A 65%, #0C0A07 100%)',
              border: '1px solid rgba(212,168,75,0.12)',
              boxShadow: '0 0 120px rgba(212,168,75,0.05) inset, 0 0 1px rgba(232,211,165,0.08) inset, 0 32px 80px rgba(0,0,0,0.7)',
              cursor: isPanning.current ? 'grabbing' : 'grab',
              touchAction: 'none',
            }}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
            onClick={() => setActiveStall(null)}
          >
            <div className="pointer-events-none absolute inset-0 z-10"
              style={{ opacity: 0.035, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '180px 180px' }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 z-10"
              style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(10,8,5,0.6) 100%)' }}
              aria-hidden="true"
            />
            <svg
              ref={svgRef}
              viewBox="0 0 900 620"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Interactive floor plan of the Las Cruces Culinary Innovation Hub"
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                transformOrigin: 'center center',
                transition: isPanning.current ? 'none' : 'transform 0.15s ease-out',
              }}
            >
              <defs>
                <pattern id="grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(212,168,75,0.03)" strokeWidth="0.4" />
                </pattern>
                <pattern id="grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(212,168,75,0.055)" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="canvas-light" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="rgba(212,168,75,0.04)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <filter id="glow-gold" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="aura" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="bevel" x="-5%" y="-5%" width="110%" height="110%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.6)" floodOpacity="1" />
                </filter>
                <linearGradient id="copper-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(212,168,75,0.14)" />
                  <stop offset="100%" stopColor="rgba(201,122,62,0.09)" />
                </linearGradient>
              </defs>

              <rect width="900" height="620" fill="url(#grid-fine)" />
              <rect width="900" height="620" fill="url(#grid-major)" />
              <rect width="900" height="620" fill="url(#canvas-light)" />

              <g id="fp-perimeter">
                <rect x="30" y="30" width="840" height="560" fill="none" stroke="rgba(232,211,165,0.06)" strokeWidth="1" />
                <rect x="40" y="40" width="820" height="540" fill="none" stroke="rgba(212,168,75,0.22)" strokeWidth="1.5" />
                {([[40,40],[860,40],[40,580],[860,580]] as [number,number][]).map(([cx,cy], i) => (
                  <g key={i} transform={`translate(${cx},${cy})`}>
                    <line x1={i%2===0?0:-10} y1="0" x2={i%2===0?10:0} y2="0" stroke="rgba(201,122,62,0.50)" strokeWidth="1.5" />
                    <line x1="0" y1={i<2?0:-10} x2="0" y2={i<2?10:0} stroke="rgba(201,122,62,0.50)" strokeWidth="1.5" />
                  </g>
                ))}
                <line x1="40" y1="150" x2="860" y2="150" stroke="rgba(212,168,75,0.06)" strokeWidth="0.5" strokeDasharray="3 7" />
                <line x1="40" y1="440" x2="860" y2="440" stroke="rgba(212,168,75,0.06)" strokeWidth="0.5" strokeDasharray="3 7" />
                <line x1="220" y1="40" x2="220" y2="580" stroke="rgba(212,168,75,0.04)" strokeWidth="0.5" strokeDasharray="3 9" />
                <line x1="720" y1="40" x2="720" y2="580" stroke="rgba(212,168,75,0.04)" strokeWidth="0.5" strokeDasharray="3 9" />
              </g>

              <g className="fp-zone-label" aria-hidden="true">
                <text x="340" y="40" textAnchor="middle" fill="rgba(212,168,75,0.06)" fontSize="22" fontFamily="var(--font-cormorant, Georgia, serif)" fontWeight="300" letterSpacing="0.18em">NORTH VENDOR ROW</text>
                <text x="340" y="612" textAnchor="middle" fill="rgba(212,168,75,0.06)" fontSize="22" fontFamily="var(--font-cormorant, Georgia, serif)" fontWeight="300" letterSpacing="0.18em">SOUTH VENDOR ROW</text>
                <text x="470" y="308" textAnchor="middle" fill="rgba(232,211,165,0.03)" fontSize="42" fontFamily="var(--font-cormorant, Georgia, serif)" fontWeight="200" letterSpacing="0.22em">ATRIUM</text>
              </g>

              {STALLS.map((stall) => {
                const visible  = isVisible(stall);
                const isActive = activeStall?.id === stall.id;
                const isHover  = hoverStall === stall.id;
                const cx = stall.x + stall.w / 2;
                const cy = stall.y + stall.h / 2;
                const hitPad = 6;
                return (
                  <g key={stall.id} className={`fp-stall fp-stall-${stall.zone}`}
                    role="button" tabIndex={visible ? 0 : -1}
                    aria-label={`${stall.label} — ${stall.sqft} sq ft, ${STATUS_LABEL[stall.status]}`}
                    aria-pressed={isActive}
                    onClick={(e) => visible && handleStallClick(stall, e)}
                    onKeyDown={(e) => visible && handleKeyDown(stall, e)}
                    onMouseEnter={() => visible && setHoverStall(stall.id)}
                    onMouseLeave={() => setHoverStall(null)}
                    style={{ cursor: visible ? 'pointer' : 'default', opacity: visible ? 1 : 0.12, transition: 'opacity 0.4s ease' }}
                  >
                    <rect x={stall.x-hitPad} y={stall.y-hitPad} width={stall.w+hitPad*2} height={stall.h+hitPad*2} fill="transparent" stroke="none" style={{ pointerEvents: 'all' }} />
                    {isActive && <rect ref={activeGlowRef} x={stall.x-8} y={stall.y-8} width={stall.w+16} height={stall.h+16} fill={STATUS_COLOR[stall.status]} opacity={0.25} filter="url(#aura)" rx="2" style={{ pointerEvents:'none' }} />}
                    {isActive && <rect x={stall.x-3} y={stall.y-3} width={stall.w+6} height={stall.h+6} fill="none" stroke={STATUS_COLOR[stall.status]} strokeWidth="0.8" opacity={0.6} filter="url(#glow-gold)" rx="1" style={{ pointerEvents:'none' }} />}
                    {isHover && !isActive && <rect x={stall.x-2} y={stall.y-2} width={stall.w+4} height={stall.h+4} fill="none" stroke="rgba(232,211,165,0.25)" strokeWidth="0.75" rx="1" style={{ pointerEvents:'none' }} />}
                    <rect x={stall.x} y={stall.y} width={stall.w} height={stall.h}
                      fill={isActive?'url(#copper-fill)':ZONE_FILL[stall.zone]}
                      stroke={isActive?STATUS_COLOR[stall.status]:ZONE_STROKE[stall.zone]}
                      strokeWidth={isActive?1.2:0.65} rx="1"
                      filter={isActive?'url(#bevel)':undefined}
                      style={{ transition:'fill 0.25s, stroke 0.25s' }}
                    />
                    <rect x={stall.x+3} y={stall.y+3} width={stall.w-6} height={stall.h-6} fill="none"
                      stroke={isActive?`${STATUS_COLOR[stall.status]}33`:'rgba(232,211,165,0.04)'}
                      strokeWidth="0.5" rx="0.5" style={{ pointerEvents:'none', transition:'stroke 0.25s' }}
                    />
                    <circle cx={stall.x+stall.w-10} cy={stall.y+10} r="3" fill={STATUS_COLOR[stall.status]} opacity={isActive?1:0.75} />
                    <text x={cx} y={stall.h>100?cy-12:stall.h>60?cy-8:cy} textAnchor="middle" dominantBaseline="middle"
                      fill={isActive?STATUS_COLOR[stall.status]:isHover?'#E8D3A5':'rgba(232,211,165,0.50)'}
                      fontSize={stall.zone==='seating'?'12':stall.w>140?'11':'9'}
                      fontFamily="var(--font-cormorant, Georgia, serif)" fontWeight="300" letterSpacing="0.10em"
                      style={{ transition:'fill 0.2s', pointerEvents:'none', userSelect:'none' }}
                    >{stall.label.toUpperCase()}</text>
                    {stall.h > 80 && (
                      <text x={cx} y={stall.h>100?cy+8:cy+14} textAnchor="middle" dominantBaseline="middle"
                        fill={isActive?'rgba(201,122,62,0.75)':'rgba(201,122,62,0.35)'}
                        fontSize="7.5" fontFamily="var(--font-josefin, sans-serif)" letterSpacing="0.14em"
                        style={{ transition:'fill 0.2s', pointerEvents:'none', userSelect:'none' }}
                      >{stall.sqft.toLocaleString()} SQ FT</text>
                    )}
                    {(stall.zone==='cider'||stall.zone==='kitchen') && stall.h>180 && (
                      <text x={cx} y={cy+26} textAnchor="middle" dominantBaseline="middle"
                        fill="rgba(79,152,163,0.45)" fontSize="6.5"
                        fontFamily="var(--font-josefin, sans-serif)" letterSpacing="0.18em"
                        style={{ pointerEvents:'none', userSelect:'none' }}
                      >ANCHOR TENANT</text>
                    )}
                  </g>
                );
              })}

              <g id="fp-instruments" opacity="1">
                <g transform="translate(845,562)" opacity="0.45">
                  <circle cx="0" cy="0" r="12" fill="none" stroke="rgba(212,168,75,0.25)" strokeWidth="0.5" />
                  <line x1="0" y1="-14" x2="0" y2="14" stroke="#D4A84B" strokeWidth="0.75" />
                  <line x1="-14" y1="0" x2="14" y2="0" stroke="#D4A84B" strokeWidth="0.75" />
                  {[45,135,225,315].map(deg => (
                    <line key={deg} x1={Math.cos(deg*Math.PI/180)*6} y1={Math.sin(deg*Math.PI/180)*6} x2={Math.cos(deg*Math.PI/180)*10} y2={Math.sin(deg*Math.PI/180)*10} stroke="rgba(212,168,75,0.30)" strokeWidth="0.5" />
                  ))}
                  <polygon points="0,-14 3,-6 0,-2 -3,-6" fill="#D4A84B" opacity="0.9" />
                  <polygon points="0,14 3,6 0,2 -3,6" fill="rgba(212,168,75,0.35)" />
                  <text x="0" y="-18" textAnchor="middle" fill="#D4A84B" fontSize="6" fontFamily="var(--font-josefin, sans-serif)" letterSpacing="0.1em">N</text>
                </g>
                <g transform="translate(60,604)" opacity="0.38">
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#C97A3E" strokeWidth="0.75" />
                  {[0,25,50,75,100].map(x => <line key={x} x1={x} y1="-3.5" x2={x} y2="3.5" stroke="#C97A3E" strokeWidth="0.75" />)}
                  <text x="50" y="-7" textAnchor="middle" fill="#C97A3E" fontSize="6.5" fontFamily="var(--font-josefin, sans-serif)" letterSpacing="0.12em">~75 FT</text>
                </g>
                <g transform="translate(640,594)" opacity="0.30">
                  <rect x="0" y="-14" width="180" height="20" fill="none" stroke="rgba(212,168,75,0.20)" strokeWidth="0.5" />
                  <text x="90" y="0" textAnchor="middle" fill="#E8D3A5" fontSize="6.5" fontFamily="var(--font-josefin, sans-serif)" letterSpacing="0.18em">LC CULINARY HUB · PLAN A-1 · 2027</text>
                </g>
              </g>
            </svg>

            {/* Desktop tooltip */}
            {activeStall && (
              <div className="absolute z-20 w-[288px] pointer-events-auto hidden sm:block"
                style={{
                  left: Math.min(tooltipPos.x + 14, (containerRef.current?.offsetWidth ?? 600) - 304),
                  top: Math.min(
                    Math.max(tooltipPos.y - 170, 8),
                    (containerRef.current?.offsetHeight ?? 400) - 340,
                  ),
                  border: `1px solid ${STATUS_COLOR[activeStall.status]}44`,
                  background: 'linear-gradient(160deg, rgba(26,21,16,0.97) 0%, rgba(16,14,10,0.99) 100%)',
                  boxShadow: `0 0 40px ${STATUS_COLOR[activeStall.status]}18, 0 24px 48px rgba(0,0,0,0.7)`,
                  backdropFilter: 'blur(16px)',
                }}
                role="tooltip" aria-label={`Quick stats for ${activeStall.label}`}
                onClick={e => e.stopPropagation()}
              >
                <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${STATUS_COLOR[activeStall.status]}, transparent)` }} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="font-corp-display text-xl font-light leading-tight" style={{ color: '#E8D3A5' }}>{activeStall.label}</div>
                      <div className="font-label text-[7.5px] tracking-[0.28em] uppercase mt-1.5" style={{ color: STATUS_COLOR[activeStall.status] }}>{STATUS_LABEL[activeStall.status]}</div>
                    </div>
                    <button
                      onClick={() => setActiveStall(null)}
                      style={{ color: 'rgba(232,211,165,0.25)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = STATUS_COLOR[activeStall.status]; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(232,211,165,0.25)'; }}
                      aria-label="Close stall details"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 mb-4" style={{ gap: '1px', background: 'rgba(232,211,165,0.06)' }}>
                    <div style={{ background: 'rgba(26,21,16,1)', padding: '10px 12px' }}>
                      <div className="font-corp-display text-xl font-light" style={{ color: '#D4A84B' }}>{activeStall.sqft.toLocaleString()}</div>
                      <div className="font-label text-[7px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.30)' }}>Sq Ft</div>
                    </div>
                    <div style={{ background: 'rgba(26,21,16,1)', padding: '10px 12px' }}>
                      <div className="font-corp-display text-xl font-light" style={{ color: '#D4A84B' }}>{activeStall.rent}</div>
                      <div className="font-label text-[7px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.30)' }}>Est. Rent</div>
                    </div>
                  </div>
                  <p className="font-sans text-xs leading-relaxed mb-4" style={{ color: 'rgba(232,211,165,0.40)' }}>{activeStall.description}</p>
                  <p className="font-label text-[7.5px] tracking-[0.18em] uppercase mb-5" style={{ color: 'rgba(201,122,62,0.55)' }}>{activeStall.conceptType}</p>
                  {activeStall.status === 'available' && (
                    <Link href={`/vendors?stall=${activeStall.id}`}
                      className="flex w-full items-center justify-center gap-2 font-label text-[8.5px] tracking-[0.24em] uppercase transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, #C97A3E, #D4A84B)', padding: '12px 16px', color: '#100E0A', fontWeight: 500 }}
                    >Apply for This Stall →</Link>
                  )}
                  {activeStall.status === 'reserved' && (
                    <div className="px-4 py-3 text-center font-label text-[8px] tracking-[0.22em] uppercase"
                      style={{ border: '1px solid rgba(196,93,42,0.25)', background: 'rgba(196,93,42,0.06)', color: 'rgba(196,93,42,0.65)' }}
                    >Under Letter of Intent</div>
                  )}
                  {activeStall.status === 'anchor' && (
                    <div className="px-4 py-3 text-center font-label text-[8px] tracking-[0.22em] uppercase"
                      style={{ border: '1px solid rgba(79,152,163,0.20)', background: 'rgba(79,152,163,0.05)', color: 'rgba(79,152,163,0.55)' }}
                    >Hub Anchor Space</div>
                  )}
                  <button
                    onClick={openFullStory}
                    className="mt-3 w-full font-label text-[8px] tracking-[0.2em] uppercase transition-colors duration-300 py-2"
                    style={{ color: 'rgba(212,168,75,0.45)', borderTop: '1px solid rgba(232,211,165,0.07)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#D4A84B'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(212,168,75,0.45)'; }}
                  >Read full stall story ↓</button>
                </div>
              </div>
            )}
          </div>

          {/* ── Collapsible legend ── */}
          <div className="mt-5 px-1">
            <button className="sm:hidden w-full flex items-center justify-between py-3"
              style={{ borderBottom: legendOpen ? 'none' : '1px solid rgba(232,211,165,0.08)' }}
              onClick={() => setLegendOpen(o => !o)} aria-expanded={legendOpen}
            >
              <span className="font-label text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(232,211,165,0.35)' }}>Status Legend</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(232,211,165,0.35)" strokeWidth="2"
                style={{ transform: legendOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
              ><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div
              className={`flex flex-wrap items-center gap-x-8 gap-y-3 ${legendOpen ? 'block' : 'hidden'} sm:flex`}
              style={{ paddingTop: legendOpen ? 12 : 0, borderBottom: '1px solid rgba(232,211,165,0.06)', paddingBottom: 12 }}
            >
              {(Object.entries(STATUS_COLOR) as [Status, string][]).map(([status, color]) => (
                <div key={status} className="flex items-center gap-2.5">
                  <span className="block h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}55` }} />
                  <span className="font-label text-[8px] tracking-[0.20em] uppercase" style={{ color: 'rgba(232,211,165,0.35)' }}>{STATUS_LABEL[status]}</span>
                </div>
              ))}
              <div className="ml-auto font-label text-[8px] tracking-[0.18em] uppercase hidden sm:block" style={{ color: 'rgba(232,211,165,0.18)' }}>Click any stall for details</div>
              <div className="font-label text-[8px] tracking-[0.18em] uppercase sm:hidden" style={{ color: 'rgba(232,211,165,0.18)' }}>Tap any stall for details</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stall directory ───────────────────────────────────────────────── */}
      <div className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-5 mb-8">
            <span className="block h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(201,122,62,0.30), transparent)' }} />
            <span className="font-label text-[8.5px] tracking-[0.35em] uppercase shrink-0" style={{ color: 'rgba(201,122,62,0.55)' }}>Stall Directory</span>
            <span className="block h-px flex-1" style={{ background: 'linear-gradient(270deg, rgba(201,122,62,0.30), transparent)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '1px', background: 'rgba(232,211,165,0.05)' }}>
            {STALLS.filter(s => s.zone === 'vendor').map((stall) => (
              <button key={stall.id}
                onClick={() => handleDirectoryClick(stall)}
                className="group text-left transition-all duration-400"
                style={{
                  background: activeStall?.id === stall.id ? 'linear-gradient(135deg, rgba(212,168,75,0.08), rgba(201,122,62,0.05))' : 'rgba(16,14,10,1)',
                  padding: '20px',
                  outline: activeStall?.id === stall.id ? '1px solid rgba(212,168,75,0.25)' : 'none',
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-corp-display text-base font-light transition-colors duration-300" style={{ color: activeStall?.id === stall.id ? '#D4A84B' : '#E8D3A5' }}>{stall.label}</span>
                  <span className="font-label text-[7.5px] tracking-[0.16em] uppercase px-2 py-0.5"
                    style={{ color: STATUS_COLOR[stall.status], border: `1px solid ${STATUS_COLOR[stall.status]}44`, background: `${STATUS_COLOR[stall.status]}11` }}
                  >{STATUS_LABEL[stall.status]}</span>
                </div>
                <p className="font-label text-[7.5px] tracking-[0.15em] uppercase mb-2" style={{ color: 'rgba(201,122,62,0.50)' }}>{stall.conceptType}</p>
                <div className="flex items-center gap-4">
                  <span className="font-sans text-xs" style={{ color: 'rgba(232,211,165,0.32)' }}>{stall.sqft} sq ft</span>
                  <span className="font-sans text-xs" style={{ color: 'rgba(232,211,165,0.32)' }}>{stall.rent}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-10 p-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left"
            style={{ borderTop: '1px solid rgba(212,168,75,0.20)', borderBottom: '1px solid rgba(212,168,75,0.08)', background: 'linear-gradient(135deg, rgba(212,168,75,0.05) 0%, rgba(201,122,62,0.03) 100%)', boxShadow: '0 -1px 0 rgba(212,168,75,0.06)' }}
          >
            <div>
              <div className="font-corp-display text-2xl font-light mb-1.5" style={{ color: '#E8D3A5' }}>Ready to claim your stall?</div>
              <p className="font-sans text-sm" style={{ color: 'rgba(232,211,165,0.38)' }}>{availableCount} vendor spots remain in the founding cohort.</p>
            </div>
            <Link href="/vendors"
              className="shrink-0 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #C97A3E 0%, #D4A84B 100%)', padding: '16px 36px', color: '#100E0A', fontWeight: 500, boxShadow: '0 8px 32px rgba(212,168,75,0.18)' }}
            >Apply as a Vendor →</Link>
          </div>
        </div>
      </div>

      {/* ── Story Drawer ─────────────────────────────────────────────────── */}
      <div ref={drawerShellRef}>
        <StallDrawer stall={activeStall} onClose={() => setActiveStall(null)} />
      </div>
    </main>
  );
}
