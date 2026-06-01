// hp-tokens.jsx — shared brand tokens, hooks, and atoms for full homepage

const HP = {
  bg:        '#1C1209',
  bgDeep:    '#100E0A',
  bgSurface: 'rgba(255,255,255,0.025)',
  cream:     '#F5ECD7',
  parchment: '#F7F3EC',
  terracotta:'#C4622D',
  gold:      '#D4A84B',
  wheat:     '#E8C18D',
  border:    'rgba(245,236,215,0.08)',
  borderMid: 'rgba(245,236,215,0.13)',
};

const HP_IMGS = {
  bar:       'https://lc-culinary-hub.vercel.app/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png',
  interior:  'https://lc-culinary-hub.vercel.app/images/cider-spice-interior-two-level-open-kitchen-concept-rendering.png',
  aerial:    'https://lc-culinary-hub.vercel.app/images/cider-spice-gallery-aerial-outdoor-exterior-collage-vision-image.png',
  stage:     'https://lc-culinary-hub.vercel.app/images/cider-spice-concept-overhead-stage-full-crowd-concept-rendering.png',
  patio:     'https://lc-culinary-hub.vercel.app/images/cider-spice-outdoor-indoor-patio-shade-sails-concept-rendering.png',
  mezzanine: 'https://lc-culinary-hub.vercel.app/images/cider-spice-concept-indoor-mezzanine-flow-concept-rendering.png',
  stalls:    'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-three-stall-row-vision-image.png',
  sticky:    'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-sticky-stack-co-stall-vision-image.png',
  seoul:     'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-seoul-fire-chicken-stall-vision-image.png',
};

const HP_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

// ── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    // Escape hatch: in static comparison contexts (e.g. the design canvas) the
    // pan/zoom transform can keep the IntersectionObserver from firing, leaving
    // everything at opacity 0. The homepage never sets this flag.
    if (typeof window !== 'undefined' && window.__HP_REVEAL_ALL) { setInView(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, active, decimals = 0, duration = 2000) {
  const [val, setVal] = React.useState(0);
  const started = React.useRef(false);
  React.useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(e * target);
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val);
}

// ── Shared atoms ────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(22px)', transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SectionEyebrow({ badge, title, subtitle, center = true }) {
  const [ref, inView] = useInView();
  const align = center ? 'center' : 'left';
  return (
    <div ref={ref} style={{ textAlign: align, maxWidth: center ? 620 : 'none', margin: center ? '0 auto' : 0, marginBottom: 52, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: 'all .7s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: center ? 'center' : 'flex-start', gap: 12, marginBottom: 14 }}>
        {center && <div style={{ width: 24, height: 1, background: HP.terracotta }} />}
        {!center && <div style={{ width: 28, height: 1, background: HP.terracotta, flexShrink: 0 }} />}
        <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.35em', textTransform: 'uppercase', color: HP.terracotta }}>{badge}</span>
        {center && <div style={{ width: 24, height: 1, background: HP.terracotta }} />}
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 300, color: HP.cream, lineHeight: 1.0, marginBottom: subtitle ? 18 : 0 }}>{title}</h2>
      {subtitle && <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.8, color: HP.wheat, opacity: .56, marginTop: 4 }}>{subtitle}</p>}
    </div>
  );
}

function ImgCell({ src, caption, style = {}, objPos = 'center', onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', ...style }}>
      <img src={src} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: objPos, transition: 'transform .65s ease', transform: hov ? 'scale(1.05)' : 'scale(1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,18,9,.36)', opacity: hov ? 1 : 0, transition: 'opacity .4s' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 16px', background: 'linear-gradient(0deg,rgba(28,18,9,.85) 0%,transparent 100%)', transform: hov ? 'translateY(0)' : 'translateY(6px)', opacity: hov ? 1 : 0, transition: 'all .35s ease' }}>
        <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.25em', textTransform: 'uppercase', color: HP.gold }}>{caption}</div>
      </div>
      <div style={{ position: 'absolute', top: 10, right: 10, width: 26, height: 26, border: '1px solid rgba(245,236,215,.28)', background: 'rgba(28,18,9,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hov ? 1 : 0, transition: 'opacity .3s' }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={HP.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
      </div>
    </div>
  );
}

Object.assign(window, { HP, HP_IMGS, HP_GRAIN, useInView, useCountUp, FadeIn, SectionEyebrow, ImgCell });
