// inv-imagery.jsx — Venue gallery + vendor concept sections

const INV_IMGS = {
  bar:      'https://lc-culinary-hub.vercel.app/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png',
  interior: 'https://lc-culinary-hub.vercel.app/images/cider-spice-interior-two-level-open-kitchen-concept-rendering.png',
  aerial:   'https://lc-culinary-hub.vercel.app/images/cider-spice-gallery-aerial-outdoor-exterior-collage-vision-image.png',
  stage:    'https://lc-culinary-hub.vercel.app/images/cider-spice-concept-overhead-stage-full-crowd-concept-rendering.png',
  patio:    'https://lc-culinary-hub.vercel.app/images/cider-spice-outdoor-indoor-patio-shade-sails-concept-rendering.png',
  mezzanine:'https://lc-culinary-hub.vercel.app/images/cider-spice-concept-indoor-mezzanine-flow-concept-rendering.png',
  stalls:   'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-three-stall-row-vision-image.png',
  sticky:   'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-sticky-stack-co-stall-vision-image.png',
  seoul:    'https://lc-culinary-hub.vercel.app/images/cider-spice-tenant-vision-seoul-fire-chicken-stall-vision-image.png',
};

function GalleryImg({ src, caption, style = {}, objPos = 'center' }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <img
        src={src} alt="" aria-hidden="true"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: objPos, display: 'block', transition: 'transform .75s ease', transform: hov ? 'scale(1.05)' : 'scale(1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,18,9,0.32)', opacity: hov ? 1 : 0, transition: 'opacity .4s' }} />
      {/* Caption */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.75rem', background: 'linear-gradient(to top, rgba(28,18,9,0.88), transparent)', transform: hov ? 'translateY(0)' : 'translateY(8px)', opacity: hov ? 1 : 0, transition: 'all .32s ease' }}>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.wheat }}>{caption}</span>
      </div>
      {/* Top accent on hover */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: INV.ter, opacity: hov ? 1 : 0, transition: 'opacity .3s' }} />
    </div>
  );
}

function InvVenueGallery() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div style={{ borderTop: `1px solid ${INV.bord}`, borderBottom: `1px solid ${INV.bord}`, overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', display: 'flex', gap: '2px', height: '300px' }}>
        <GalleryImg src={INV_IMGS.interior} caption="Two-Level Open Kitchen · Concept Rendering" style={{ flex: '0 0 90vw', scrollSnapAlign: 'start' }} />
        <GalleryImg src={INV_IMGS.patio}    caption="Outdoor Patio · Shade Sails · Concept Rendering" style={{ flex: '0 0 90vw', scrollSnapAlign: 'start' }} />
        <GalleryImg src={INV_IMGS.stage}    caption="Entertainment Stage · Concept Rendering" style={{ flex: '0 0 90vw', scrollSnapAlign: 'start' }} />
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gridTemplateRows: '1fr 1fr', height: '540px', gap: '2px', borderTop: `1px solid ${INV.bord}`, borderBottom: `1px solid ${INV.bord}` }}>
      {/* Left: large feature spanning both rows */}
      <GalleryImg src={INV_IMGS.interior} caption="Two-Level Open Kitchen · Concept Rendering" style={{ gridRow: '1 / 3' }} objPos="center" />
      {/* Right: two stacked */}
      <GalleryImg src={INV_IMGS.patio}  caption="Outdoor Patio · Shade Sails" objPos="center bottom" />
      <GalleryImg src={INV_IMGS.stage}  caption="Entertainment Stage · Full Hall" objPos="center top" />
    </div>
  );
}

// ── Vendor concept images ─────────────────────────────────────────────────────

function VendorImgCard({ src, name, desc, delay, objPos }) {
  const [ref, inView] = useInView(0.08);
  const [hov, setHov] = React.useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', overflow: 'hidden', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: `opacity .72s ease ${delay}s, transform .72s ease ${delay}s` }}>
      <img
        src={src} alt={name}
        style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: objPos || 'center', display: 'block', transition: 'transform .68s ease', transform: hov ? 'scale(1.04)' : 'scale(1)' }} />
      {/* Gradient overlay always present */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,18,9,0.88) 0%, rgba(28,18,9,0.18) 55%, transparent 100%)' }} />
      {/* Top accent on hover */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: INV.ter, opacity: hov ? 1 : 0, transition: 'opacity .3s' }} />
      {/* Text always visible */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.75rem' }}>
        <div style={{ fontFamily: INV_F.d, fontSize: '1.35rem', fontWeight: 400, color: INV.parch, lineHeight: 1.15, marginBottom: '0.35rem' }}>{name}</div>
        <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.58 }}>{desc}</div>
      </div>
    </div>
  );
}

function InvVendorConcepts() {
  return (
    <section style={{ paddingBottom: '5rem' }}>
      <SectionHead num="04" eyebrow="Confirmed Anchor Concepts" title="Three Developed Brands, Ready for Buildout" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.82 }}>
        Full brand identities, tested menus, New Mexico regional integration baked in. Concept renderings — not confirmed final buildout.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px', background: 'rgba(232,193,141,0.07)' }}>
        <VendorImgCard src={INV_IMGS.sticky} name="Sticky Stack Co."  desc="Artisan Sliders · NM House Jam · Retail Crossover"       delay={0}    />
        <VendorImgCard src={INV_IMGS.stalls} name="Three Anchor Stalls" desc="Culet · Curry · Chile · Concept Vision"    delay={0.1}  objPos="center" />
        <VendorImgCard src={INV_IMGS.seoul}  name="Seoul Fire Chicken" desc="Korean Double-Fry · Heat Ladder · Cider Bar Synergy"    delay={0.2}  />
      </div>
    </section>
  );
}

Object.assign(window, { INV_IMGS, InvVenueGallery, InvVendorConcepts });
