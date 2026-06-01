// hp-sections.jsx — Gallery (A) + Features + How It Works

// ── Gallery Lightbox ────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];
  React.useEffect(() => {
    const h = e => { if (e.key==='Escape') onClose(); if (e.key==='ArrowLeft') onPrev(); if (e.key==='ArrowRight') onNext(); };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose, onPrev, onNext]);

  const btnSt = { background:'rgba(16,10,5,.72)', border:`1px solid rgba(245,236,215,.18)`, cursor:'pointer', color:`${HP.cream}75`, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)', transition:'all .2s', flexShrink:0 };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, backdropFilter:'blur(22px) saturate(150%)', WebkitBackdropFilter:'blur(22px) saturate(150%)', background:'rgba(16,10,5,.90)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}
      onClick={onClose}
    >
      <div style={{ position:'relative', maxWidth:'92vw', width:'100%' }} onClick={e=>e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} style={{ ...btnSt, position:'absolute', top:-46, right:0 }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,168,75,.4)';e.currentTarget.style.color=HP.gold;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(245,236,215,.18)';e.currentTarget.style.color=`${HP.cream}75`;}}
        ><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        {/* Image */}
        <img src={img.src} alt={img.caption} style={{ display:'block', maxWidth:'100%', maxHeight:'76vh', objectFit:'contain', margin:'0 auto' }} />
        {/* Caption + counter */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginTop:14, padding:'0 2px' }}>
          <div>
            <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.25em', textTransform:'uppercase', color:HP.gold }}>{img.caption}</div>
            {img.disclaimer && <div style={{ fontFamily:'Inter,sans-serif', fontSize:10.5, color:`${HP.cream}42`, marginTop:3 }}>Illustrative concept · Not a confirmed tenant</div>}
          </div>
          <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8, letterSpacing:'.2em', color:`${HP.cream}28`, flexShrink:0 }}>{index+1} / {images.length}</span>
        </div>
        {/* Desktop prev/next */}
        {[{d:'M15 18l-6-6 6-6',fn:onPrev,side:'left'},{d:'M9 18l6-6-6-6',fn:onNext,side:'right'}].map(({d,fn,side})=>(
          <button key={side} onClick={e=>{e.stopPropagation();fn();}} style={{ ...btnSt, position:'absolute', [side]:-50, top:'38%', transform:'translateY(-50%)' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,168,75,.4)';e.currentTarget.style.color=HP.gold;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(245,236,215,.18)';e.currentTarget.style.color=`${HP.cream}75`;}}
          ><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg></button>
        ))}
        {/* Mobile prev/next */}
        <div style={{ display:'flex', justifyContent:'center', gap:10, marginTop:18 }}>
          {[{d:'M15 18l-6-6 6-6',fn:onPrev},{d:'M9 18l6-6-6-6',fn:onNext}].map(({d,fn},i)=>(
            <button key={i} onClick={e=>{e.stopPropagation();fn();}} style={{ ...btnSt, width:44, height:44 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const GALLERY_IMGS = [
  { src: null, key:'aerial',   caption:'Exterior & Streetscape',       disclaimer:false },
  { src: null, key:'interior', caption:'Two-Level Open Kitchen',        disclaimer:false },
  { src: null, key:'bar',      caption:'Craft Cider Bar',               disclaimer:false },
  { src: null, key:'patio',    caption:'Outdoor Patio & Shade Sails',   disclaimer:false },
  { src: null, key:'stage',    caption:'Live Events Stage',             disclaimer:false },
  { src: null, key:'stalls',   caption:'Vendor Stall Row',              disclaimer:true  },
  { src: null, key:'sticky',   caption:'Sticky Stack Co.',              disclaimer:true  },
  { src: null, key:'seoul',    caption:'Seoul Fire Chicken',            disclaimer:true  },
];

// ── Gallery A: Magazine Grid ────────────────────────────────────────────────
function HPGallery() {
  const [lbIdx, setLbIdx] = React.useState(null);
  const imgs = GALLERY_IMGS.map(g => ({ ...g, src: HP_IMGS[g.key] }));
  const open  = i  => setLbIdx(i);
  const close = () => setLbIdx(null);
  const prev  = () => setLbIdx(i => (i - 1 + imgs.length) % imgs.length);
  const next  = () => setLbIdx(i => (i + 1) % imgs.length);

  const SEC = { padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)', maxWidth: 1280, margin: '0 auto' };
  return (
    <>
      {lbIdx !== null && <Lightbox images={imgs} index={lbIdx} onClose={close} onPrev={prev} onNext={next} />}
      <section id="gallery" style={{ background: HP.bg }}>
        <div style={SEC}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <SectionEyebrow badge="The Space" title="A Vision in the Making" subtitle="Concept renderings of Cider &amp; Spice — opening Q1–Q2 2027 in downtown Las Cruces, NM." center={false} />
            <FadeIn delay={0.2}>
              <a href="Floor Plan.html" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: `${HP.cream}42`, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 52, whiteSpace: 'nowrap' }}>
                View all &nbsp;<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </FadeIn>
          </div>

          <FadeIn>
            {/* Desktop grid */}
            <div className="hp-gallery-desktop">
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '300px 240px', gap: 3 }}>
                <ImgCell src={HP_IMGS.aerial}   caption="Exterior &amp; Streetscape"      onClick={() => open(0)} style={{ gridRow: '1/3', gridColumn: '1' }} />
                <ImgCell src={HP_IMGS.interior} caption="Two-Level Open Kitchen"          onClick={() => open(1)} style={{}} />
                <ImgCell src={HP_IMGS.bar}      caption="Craft Cider Bar"                 onClick={() => open(2)} style={{}} />
                <ImgCell src={HP_IMGS.patio}    caption="Outdoor Patio &amp; Shade Sails" onClick={() => open(3)} style={{}} />
                <ImgCell src={HP_IMGS.stage}    caption="Live Events Stage"               onClick={() => open(4)} style={{}} />
              </div>
            </div>
            {/* Mobile swipe strip */}
            <div className="hp-gallery-mobile" id="hp-mob-strip" style={{ gap: 3 }}>
              {imgs.map((img, i) => (
                <div key={i} onClick={() => open(i)} style={{ scrollSnapAlign: 'center', flexShrink: 0, width: '82vw', height: 240, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: i >= 5 ? 'top' : 'center' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(28,18,9,.82) 0%,transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 14 }}>
                    <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.24em', textTransform: 'uppercase', color: HP.gold }}>{img.caption}</div>
                    {img.disclaimer && <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 9.5, color: `${HP.cream}45`, marginTop: 2 }}>Illustrative concept</div>}
                  </div>
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(28,18,9,.6)', border: `1px solid rgba(245,236,215,.2)`, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={HP.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile dots indicator */}
            <div className="hp-gallery-mobile" style={{ justifyContent: 'center', gap: 6, marginTop: 12 }}>
              {imgs.map((_, i) => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: `rgba(212,168,75,.4)`, cursor: 'pointer' }}
                  onClick={() => { const el = document.getElementById('hp-mob-strip'); if (el) el.scrollTo({ left: i * (el.offsetWidth * 0.82 + 3), behavior: 'smooth' }); }}
                />
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ marginTop: 3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0 10px' }}>
                <div style={{ width: 20, height: 1, background: `rgba(212,168,75,.3)` }} />
                <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: `rgba(212,168,75,.45)` }}>Illustrative Tenant Vision · Not Confirmed Tenants</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
                <ImgCell src={HP_IMGS.stalls} caption="Vendor Stall Row"   objPos="top" onClick={() => open(5)} style={{ height: 220 }} />
                <ImgCell src={HP_IMGS.sticky} caption="Sticky Stack Co."   objPos="top" onClick={() => open(6)} style={{ height: 220 }} />
                <ImgCell src={HP_IMGS.seoul}  caption="Seoul Fire Chicken" objPos="top" onClick={() => open(7)} style={{ height: 220 }} />
              </div>
            </div>
          </FadeIn>

          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 10.5, color: `${HP.cream}26`, lineHeight: 1.55 }}>
              All imagery represents architectural concept renderings for illustrative purposes only. Subject to change prior to opening.
            </p>
            <a href="Floor Plan.html" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', padding: '12px 28px', border: `1px solid rgba(245,236,215,.14)`, color: `${HP.cream}46`, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, transition: 'all .3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(196,98,45,.5)`; e.currentTarget.style.color = HP.parchment; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,236,215,.14)'; e.currentTarget.style.color = `${HP.cream}46`; }}
            >
              Explore the Interactive Floor Plan &nbsp;
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Features: Built for Food Makers ────────────────────────────────────────
const FEATURES = [
  { icon:'◈', title:'8,000 sq ft Venue',          body:'A fully built-out food hall on East Lohman Ave — 8 dedicated vendor stalls, shared seating, and a dedicated event stage.' },
  { icon:'✦', title:'Commissary Kitchen',           body:'A licensed commercial prep kitchen available to all vendors by the hour — certified for catering, pop-ups, and food manufacturing.' },
  { icon:'◉', title:'25-Tap Craft Cider Bar',      body:'Southern New Mexico\'s only dedicated craft cider bar — 25 rotating regional and national taps plus a full Cider Club membership program.' },
  { icon:'◆', title:'Event Stage &amp; Programming', body:'A built-in stage for weekly live music, cultural markets, chile harvest festivals, cooking classes, and entrepreneurship showcases.' },
  { icon:'○', title:'Incubator Pathway',            body:'Two structured tracks — Semilla and Mariposa — with mentorship from WESST NM, SCORE, and the Las Cruces SBDC.' },
  { icon:'□', title:'Flexible Stall Leases',        body:'Month-to-month and annual lease options designed for early-stage food entrepreneurs — no prior restaurant experience required.' },
];

function FeatureRow({ icon, title, body }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 20, alignItems: 'flex-start', padding: '22px 24px', borderBottom: `1px solid ${HP.border}`, background: hov ? 'rgba(196,98,45,.05)' : 'transparent', transition: 'background .25s' }}>
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, color: hov ? HP.terracotta : `${HP.terracotta}88`, lineHeight: 1, transition: 'color .25s' }} aria-hidden="true">{icon}</span>
      <div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: HP.cream, lineHeight: 1.2, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: title }} />
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.7, color: HP.wheat, opacity: .54 }}>{body}</p>
      </div>
    </div>
  );
}

function HPFeatures() {
  const [hero, ...rest] = FEATURES;
  return (
    <section id="features" style={{ background: HP.bgDeep, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)', borderTop: `1px solid ${HP.border}` }}>
      <style>{`@media (max-width: 860px) { .hp-feat-split { grid-template-columns: 1fr !important; } .hp-feat-hero { min-height: 320px !important; } }`}</style>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge="What's Inside" title="Built for Food Makers" subtitle="Every feature of Cider &amp; Spice was designed around what local food entrepreneurs actually need." />
        <div className="hp-feat-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)', gap: 'clamp(18px,2.5vw,32px)', alignItems: 'stretch' }}>
          {/* Hero feature */}
          <FadeIn>
            <div className="hp-feat-hero" style={{ position: 'relative', height: '100%', minHeight: 460, padding: 'clamp(36px,4vw,56px)', background: 'linear-gradient(140deg, rgba(196,98,45,.10) 0%, rgba(212,168,75,.04) 100%)', border: `1px solid rgba(196,98,45,.28)`, borderLeft: `2px solid ${HP.terracotta}`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
              {/* Ghost glyph */}
              <span aria-hidden="true" style={{ position: 'absolute', top: -60, right: -30, fontFamily: "'Cormorant Garamond',serif", fontSize: 380, fontWeight: 200, color: 'rgba(196,98,45,.07)', lineHeight: .85, userSelect: 'none', pointerEvents: 'none' }}>{hero.icon}</span>
              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, position: 'relative' }}>
                <span style={{ width: 26, height: 1, background: HP.terracotta }} />
                <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.32em', textTransform: 'uppercase', color: HP.terracotta }}>The Centerpiece</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(34px,4.6vw,54px)', fontWeight: 300, color: HP.cream, lineHeight: .98, letterSpacing: '-.018em', marginBottom: 22, position: 'relative' }} dangerouslySetInnerHTML={{ __html: hero.title }} />
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14.5, lineHeight: 1.78, color: HP.wheat, opacity: .62, maxWidth: 440, position: 'relative' }}>{hero.body}</p>
            </div>
          </FadeIn>
          {/* Compact rows */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${HP.border}` }}>
            {rest.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.06} style={{ flex: 1 }}>
                <FeatureRow icon={f.icon} title={f.title} body={f.body} />
              </FadeIn>
            ))}
          </div>
        </div>
        <FadeIn delay={0.3} style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="/vendors" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', background: HP.terracotta, color: HP.parchment, textDecoration: 'none', padding: '15px 40px', fontWeight: 600, display: 'inline-block', transition: 'background .25s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#a8521f'}
            onMouseLeave={e => e.currentTarget.style.background = HP.terracotta}
          >Apply for a Stall →</a>
        </FadeIn>
      </div>
    </section>
  );
}

// ── How It Works ────────────────────────────────────────────────────────────
const STEPS = [
  { n:'01', title:'Apply for a Stall',          body:'Submit your concept — cuisine type, booth size, and vision. No prior restaurant experience required. Every application is reviewed personally.' },
  { n:'02', title:'Use the Commissary Kitchen', body:'Prep and produce in our fully equipped commercial kitchen at a fraction of the cost of building your own — certified, inspected, and ready from day one.' },
  { n:'03', title:'Get Mentored &amp; Coached', body:'Weekly sessions with WESST New Mexico and SCORE mentors cover bookkeeping, food safety, marketing, and menu pricing — at no additional cost.' },
  { n:'04', title:'Host Events',                body:'Live music nights, cultural markets, and seasonal festivals are built around your food — giving you built-in marketing and foot traffic from day one.' },
  { n:'05', title:'Grow with the Cider Bar',    body:'Partner with our craft cider bar on shared event programming, reach Cider Club members, and grow your audience beyond the food hall floor.' },
  { n:'06', title:'Graduate to Your Own Space', body:'Our alumni network, Las Cruces SBDC connections, and SBA lending partnerships help you secure financing when you\'re ready for a permanent location.' },
];

function PathRow({ n, title, body, last }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'grid', gridTemplateColumns: 'clamp(72px,11vw,140px) 1fr', gap: 'clamp(20px,3vw,44px)', padding: 'clamp(28px,4vw,44px) 0', borderBottom: last ? 'none' : `1px solid ${HP.border}`, transition: 'background .25s' }}>
      {/* Big italic step number */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(56px,8vw,96px)', fontWeight: 200, fontStyle: 'italic', color: hov ? HP.terracotta : `${HP.terracotta}c0`, lineHeight: .85, letterSpacing: '-.02em', transition: 'color .25s', userSelect: 'none' }}>{n}</span>
      </div>
      {/* Content */}
      <div style={{ paddingTop: 'clamp(8px,1vw,16px)', maxWidth: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ width: hov ? 32 : 20, height: 1, background: HP.terracotta, transition: 'width .3s ease' }} aria-hidden="true" />
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.32em', textTransform: 'uppercase', color: HP.terracotta, opacity: .85 }}>Step {n}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,2.8vw,32px)', fontWeight: 300, color: HP.cream, lineHeight: 1.15, letterSpacing: '-.008em', marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: title }} />
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14.5, lineHeight: 1.78, color: HP.wheat, opacity: .58 }}>{body}</p>
      </div>
    </div>
  );
}

function HPHowItWorks() {
  return (
    <section id="howitworks" style={{ background: HP.bg, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)', borderTop: `1px solid ${HP.border}` }}>
      <style>{`@media (max-width: 640px) { .hp-path-row { grid-template-columns: 1fr !important; gap: 8px !important; } .hp-path-row > div:first-child { justify-content: flex-start !important; } }`}</style>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <SectionEyebrow badge="How It Works" title="Your Path from Pop-Up to Permanent" subtitle="Six steps from home-kitchen dream to a thriving downtown Las Cruces business." />
        <div style={{ borderTop: `1px solid ${HP.border}` }}>
          {STEPS.map(({ n, title, body }, i) => (
            <FadeIn key={n} delay={i * 0.05}>
              <div className="hp-path-row" style={{ display: 'contents' }}>
                <PathRow n={n} title={title} body={body} last={i === STEPS.length - 1} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Cider Bar Section ───────────────────────────────────────────────────────
function HPCiderBar() {
  return (
    <section id="cider-bar" style={{ position: 'relative', overflow: 'hidden', background: HP.bgDeep, borderTop: `1px solid ${HP.border}` }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: 'clamp(440px,55vw,620px)' }}>
        {/* Image half */}
        <div style={{ flex: '1 1 420px', position: 'relative', minHeight: 340 }}>
          <img src={HP_IMGS.bar} alt="Craft cider bar" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent 55%,rgba(16,14,10,1) 100%),linear-gradient(0deg,rgba(16,14,10,.5) 0%,transparent 40%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: HP_GRAIN, opacity: .028, backgroundSize: '180px' }} />
          {/* Floating badge */}
          <div style={{ position: 'absolute', top: 28, left: 28, background: 'rgba(16,14,10,.78)', backdropFilter: 'blur(10px)', border: `1px solid rgba(212,168,75,.22)`, padding: '10px 18px' }}>
            <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.32em', textTransform: 'uppercase', color: HP.terracotta }}>Southern NM's Only</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 300, color: HP.cream, lineHeight: 1.1 }}>Dedicated Craft Cider Bar</div>
          </div>
        </div>
        {/* Content half */}
        <div style={{ flex: '1 1 360px', padding: 'clamp(52px,7vw,80px) clamp(36px,5vw,72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', background: HP.bgDeep }}>
          {/* Decorative number */}
          <div style={{ position: 'absolute', top: 24, right: 32, fontFamily: "'Cormorant Garamond',serif", fontSize: 160, fontWeight: 200, color: 'rgba(212,168,75,.05)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>25</div>
          {/* Eyebrow */}
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: HP.terracotta, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.35em', textTransform: 'uppercase', color: HP.terracotta }}>The Cider Bar</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 300, color: HP.cream, lineHeight: .95, letterSpacing: '-.018em', marginBottom: 22 }}>
              25 Taps.<br /><em style={{ fontStyle: 'italic', color: HP.terracotta }}>Zero Competitors.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.8, color: HP.wheat, opacity: .60, marginBottom: 36, maxWidth: 400 }}>
              Southern New Mexico's only dedicated craft cider bar — 25 rotating regional and national taps, 8–10 NM cideries featured, and a full Cider Club membership program launching with the Hub.
            </p>
          </FadeIn>
          {/* Stats */}
          <FadeIn delay={0.3}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 36 }}>
              {[['25','Rotating taps'],['8–10','NM cideries'],['3','Club tiers']].map(([n,l]) => (
                <div key={l} style={{ padding: '16px 14px', background: 'rgba(255,255,255,.025)', borderTop: `2px solid rgba(212,168,75,.22)` }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: HP.gold, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.2em', textTransform: 'uppercase', color: `${HP.cream}35`, marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          {/* Membership tiers preview */}
          <FadeIn delay={0.4}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {[['Taster','$25/mo'],['Enthusiast','$45/mo'],['Founding Member','$85/mo']].map(([tier,price]) => (
                <div key={tier} style={{ padding: '8px 14px', border: `1px solid rgba(212,168,75,.18)`, background: 'rgba(212,168,75,.05)' }}>
                  <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.2em', textTransform: 'uppercase', color: HP.gold }}>{tier}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 300, color: HP.cream }}>{price}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.5}>
            <a href="Cider Club.html" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', background: HP.terracotta, color: HP.parchment, textDecoration: 'none', padding: '14px 32px', fontWeight: 600, display: 'inline-block', transition: 'background .25s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#a8521f'}
              onMouseLeave={e => e.currentTarget.style.background = HP.terracotta}
            >Explore the Cider Club →</a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── Cider Club — three-tier membership ──────────────────────────────────────
const CC_TIERS = [
  {
    name: 'Taster', price: 25, kicker: 'Entry · Builds the Habit', featured: false,
    line: 'For the curious newcomer easing into the world of New Mexico cider.',
    perks: [
      'One tasting flight per month (4 ciders)',
      '10% off all pours at the bar',
      'Member newsletter & release alerts',
      'Early access to events & ticketed nights',
    ],
  },
  {
    name: 'Enthusiast', price: 45, kicker: 'Core · Most Members Land Here', featured: true,
    line: 'Steady regulars who treat the bar like a second living room.',
    perks: [
      'Two tasting flights per month',
      '15% off all pours at the bar',
      'Reserved seating at cider events',
      'Member wall listing & producer meet-and-greets',
    ],
  },
  {
    name: 'Connoisseur', price: 85, kicker: 'Ambassador · Brand Champion', featured: false,
    line: 'For the deep believers — the closest tier to the cellar.',
    perks: [
      'Unlimited tasting flights',
      '20% off all pours at the bar',
      'Private-label seasonal bottle, included',
      'Quarterly private pairing dinner with Hub chefs',
    ],
  },
];

function CiderClubTier({ tier, delay }) {
  const [hov, setHov] = React.useState(false);
  const f = tier.featured;
  return (
    <FadeIn delay={delay} style={{ height: '100%' }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
          padding: 'clamp(28px,3vw,40px) clamp(26px,3vw,36px) clamp(28px,3vw,38px)',
          background: f ? 'linear-gradient(165deg, rgba(196,98,45,.10) 0%, rgba(212,168,75,.04) 100%)' : 'rgba(255,255,255,.02)',
          border: `1px solid ${f ? 'rgba(196,98,45,.42)' : hov ? 'rgba(212,168,75,.25)' : HP.border}`,
          borderTop: f ? `2px solid ${HP.terracotta}` : `1px solid ${hov ? 'rgba(212,168,75,.25)' : HP.border}`,
          transform: f ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: f ? '0 22px 50px -28px rgba(0,0,0,.85), 0 0 0 1px rgba(196,98,45,.18) inset' : 'none',
          transition: 'border-color .25s, background .25s',
        }}>
        {/* Featured badge */}
        {f && (
          <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: HP.terracotta, color: HP.parchment, fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.3em', textTransform: 'uppercase', padding: '5px 14px', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Member Favorite
          </div>
        )}
        {/* Tier name */}
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: HP.cream, lineHeight: 1, marginBottom: 8 }}>{tier.name}</div>
        <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.26em', textTransform: 'uppercase', color: f ? HP.terracotta : `${HP.gold}aa`, marginBottom: 22 }}>{tier.kicker}</div>
        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 300, color: HP.wheat, opacity: .65, lineHeight: 1, fontStyle: 'italic' }}>$</span>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(56px,7vw,80px)', fontWeight: 200, color: HP.cream, lineHeight: .85, letterSpacing: '-.02em', fontStyle: 'italic' }}>{tier.price}</span>
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: `${HP.wheat}99`, marginLeft: 4 }}>/ month</span>
        </div>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.7, color: HP.wheat, opacity: .55, marginBottom: 22, fontStyle: 'italic' }}>{tier.line}</p>
        {/* Hairline */}
        <div style={{ height: 1, background: f ? 'rgba(196,98,45,.25)' : HP.border, marginBottom: 22 }} aria-hidden="true" />
        {/* Perks */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {tier.perks.map((p, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.55, color: HP.wheat, opacity: .82 }}>
              <span aria-hidden="true" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: f ? HP.terracotta : HP.gold, flexShrink: 0, lineHeight: 1.4 }}>◆</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {/* CTA */}
        <a href="Cider Club.html" style={{
          marginTop: 28, display: 'block', textAlign: 'center',
          fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 600,
          padding: '13px 16px', textDecoration: 'none',
          background: f ? HP.terracotta : 'transparent',
          color: f ? HP.parchment : HP.cream,
          border: f ? `1px solid ${HP.terracotta}` : `1px solid rgba(212,168,75,.32)`,
          transition: 'background .25s, border-color .25s, color .25s',
        }}
          onMouseEnter={e => { if (f) e.currentTarget.style.background = '#a8521f'; else { e.currentTarget.style.borderColor = HP.terracotta; e.currentTarget.style.color = HP.terracotta; } }}
          onMouseLeave={e => { if (f) e.currentTarget.style.background = HP.terracotta; else { e.currentTarget.style.borderColor = 'rgba(212,168,75,.32)'; e.currentTarget.style.color = HP.cream; } }}
        >Join as {tier.name} →</a>
      </div>
    </FadeIn>
  );
}

function HPCiderClub() {
  return (
    <section id="cider-club" style={{ position: 'relative', background: HP.bg, padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,72px)', borderTop: `1px solid ${HP.border}`, overflow: 'hidden' }}>
      {/* Soft radial accent at top */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,98,45,.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      {/* Subtle grain */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: HP_GRAIN, opacity: .025, backgroundSize: '180px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>
        <SectionEyebrow badge="The Membership" title="Join the Cider Club" subtitle="A monthly subscription that turns every visit into a tasting — plus early access to releases, events, and pairing dinners with the makers themselves." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(16px,2vw,24px)', alignItems: 'stretch', marginTop: 24, paddingTop: 14 }}>
          {CC_TIERS.map((t, i) => (
            <CiderClubTier key={t.name} tier={t} delay={i * 0.08} />
          ))}
        </div>

        {/* Footnote row */}
        <FadeIn delay={0.35}>
          <div style={{ marginTop: 40, padding: '22px clamp(20px,3vw,32px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, alignItems: 'center', background: 'rgba(255,255,255,.018)', border: `1px solid ${HP.border}`, borderLeft: `2px solid ${HP.terracotta}` }}>
            <div>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: HP.terracotta, marginBottom: 6 }}>Founding Members</div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.7, color: HP.wheat, opacity: .65, margin: 0 }}>Pre-register before opening day for locked-in pricing and an invite to the soft-open preview night.</p>
            </div>
            <div>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: HP.terracotta, marginBottom: 6 }}>Cancel Anytime</div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.7, color: HP.wheat, opacity: .65, margin: 0 }}>Month-to-month with no commitment — annual prepay saves one month and adds a member bottle.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a href="Cider Club.html" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', color: HP.cream, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 22px', border: `1px solid rgba(212,168,75,.32)`, transition: 'border-color .25s, color .25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = HP.terracotta; e.currentTarget.style.color = HP.terracotta; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,168,75,.32)'; e.currentTarget.style.color = HP.cream; }}
              >Full Member Benefits →</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


