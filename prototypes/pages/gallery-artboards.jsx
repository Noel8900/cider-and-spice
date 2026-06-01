// gallery-artboards.jsx — Gallery section redesign directions A / B / C

const { B, IMGS } = window._CS;

const GRAIN_G = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

function DirLabel({ text }) {
  return (
    <div style={{ position:'absolute', bottom:12, right:16, fontFamily:"'Josefin Sans',sans-serif", fontSize:8, letterSpacing:'.28em', textTransform:'uppercase', color:`${B.cream}28`, pointerEvents:'none' }}>
      {text}
    </div>
  );
}

function SectionEyebrow({ badge, title }) {
  return (
    <div style={{ marginBottom:32 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
        <div style={{ width:28, height:1, background:B.terracotta, flexShrink:0 }} />
        <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8.5, letterSpacing:'.32em', textTransform:'uppercase', color:B.terracotta }}>{badge}</span>
      </div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:44, fontWeight:300, color:B.cream, lineHeight:1 }}>{title}</h2>
    </div>
  );
}

// Hoverable image cell with reveal caption
function ImgCell({ src, caption, style, objPos = 'center', onClickIdx, idx }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClickIdx && onClickIdx(idx)}
      style={{ position:'relative', overflow:'hidden', cursor:'pointer', ...style }}
    >
      <img
        src={src} alt={caption}
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:objPos, transition:'transform .65s ease', transform:hov?'scale(1.045)':'scale(1)' }}
      />
      {/* Dark hover tint */}
      <div style={{ position:'absolute', inset:0, background:'rgba(28,18,9,.38)', opacity:hov?1:0, transition:'opacity .4s' }} />
      {/* Caption reveal */}
      <div style={{ position:'absolute', inset:'0 0 0', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 18px 16px', background:'linear-gradient(0deg,rgba(28,18,9,.82) 0%,transparent 55%)', transform:hov?'translateY(0)':'translateY(6px)', opacity:hov?1:0, transition:'all .35s ease' }}>
        <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8.5, letterSpacing:'.25em', textTransform:'uppercase', color:B.gold }}>{caption}</div>
      </div>
      {/* Expand icon */}
      <div style={{ position:'absolute', top:10, right:10, width:26, height:26, border:'1px solid rgba(245,236,215,.3)', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(28,18,9,.55)', opacity:hov?1:0, transition:'opacity .3s' }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={B.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
      </div>
    </div>
  );
}

// ── A: Magazine Grid ────────────────────────────────────────────────────────
function GalleryA() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', background:B.bg, padding:'48px 72px 44px', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28, flexShrink:0 }}>
        <SectionEyebrow badge="The Space" title="A Vision in the Making" />
        <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', color:`${B.cream}40`, display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
          View All
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>

      {/* Grid: hero (left, 2 rows) + 2×2 right */}
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridTemplateRows:'1fr 1fr', gap:3, minHeight:0 }}>
        <ImgCell src={IMGS.aerial}    caption="Exterior &amp; Streetscape"  style={{ gridRow:'1/3', gridColumn:'1' }} />
        <ImgCell src={IMGS.interior}  caption="Two-Level Open Kitchen"    style={{}} />
        <ImgCell src={IMGS.bar}       caption="Craft Cider Bar"           style={{}} />
        <ImgCell src={IMGS.patio}     caption="Outdoor Patio"             style={{}} />
        <ImgCell src={IMGS.stage}     caption="Event Stage"               style={{}} />
      </div>

      {/* Footer */}
      <div style={{ marginTop:14, display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
        <p style={{ fontFamily:"Inter,sans-serif", fontSize:10, color:`${B.cream}25`, lineHeight:1.5 }}>
          All imagery represents architectural concept renderings. Subject to change prior to opening.
        </p>
        <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8.5, letterSpacing:'.2em', textTransform:'uppercase', padding:'11px 24px', border:`1px solid rgba(245,236,215,.15)`, color:`${B.cream}45`, cursor:'pointer', display:'flex', alignItems:'center', gap:10, position:'relative', overflow:'hidden' }}>
          <span>Explore Interactive Floor Plan</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
      <DirLabel text="A · Magazine Grid" />
    </div>
  );
}

// ── B: Editorial Asymmetric ─────────────────────────────────────────────────
function GalleryB() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', background:B.bg, overflow:'hidden', display:'flex' }}>
      {/* Left: narrow editorial column */}
      <div style={{ width:'28%', height:'100%', display:'flex', flexDirection:'column', borderRight:`1px solid rgba(212,168,75,.07)`, flexShrink:0 }}>
        <div style={{ padding:'48px 36px 36px', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <div style={{ width:22, height:1, background:B.terracotta }} />
            <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8, letterSpacing:'.32em', textTransform:'uppercase', color:B.terracotta }}>The Space</span>
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:300, color:B.cream, lineHeight:1.05, marginBottom:18 }}>A Vision<br />in the Making</h2>
          <p style={{ fontFamily:"Inter,sans-serif", fontSize:12, lineHeight:1.75, color:`${B.cream}50`, marginBottom:24 }}>Concept renderings of Cider &amp; Spice — opening Q1–Q2 2027 in downtown Las Cruces, NM.</p>
          {/* Stat pills */}
          <div style={{ display:'flex', flexDirection:'column', gap:1, marginBottom:28 }}>
            {[['9','Images'],['8,000 sq ft','Venue'],['1','Location']].map(([n,l]) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'10px 14px', background:'rgba(255,255,255,.025)', borderLeft:`2px solid rgba(212,168,75,.22)` }}>
                <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7.5, letterSpacing:'.2em', textTransform:'uppercase', color:`${B.cream}38` }}>{l}</span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:300, color:B.gold, lineHeight:1 }}>{n}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8, letterSpacing:'.22em', textTransform:'uppercase', color:`${B.cream}38`, display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
            Floor Plan <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
        {/* Portrait fill image */}
        <ImgCell src={IMGS.mezzanine} caption="Mezzanine Level" style={{ flex:1 }} />
      </div>

      {/* Right: 2-col grid */}
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'55% 45%', gap:3 }}>
        <ImgCell src={IMGS.aerial}   caption="Exterior &amp; Streetscape"  style={{ gridColumn:'1/3' }} />
        <ImgCell src={IMGS.interior} caption="Open Kitchen"     style={{}} />
        <ImgCell src={IMGS.bar}      caption="Craft Cider Bar"  style={{}} />
      </div>
      <DirLabel text="B · Editorial Asymmetric" />
    </div>
  );
}

// ── C: Feature + Filmstrip ──────────────────────────────────────────────────
function GalleryC() {
  const imgs = [
    { src:IMGS.aerial,    cap:'Exterior &amp; Streetscape' },
    { src:IMGS.interior,  cap:'Two-Level Open Kitchen'     },
    { src:IMGS.stage,     cap:'Live Events Stage'          },
    { src:IMGS.bar,       cap:'Craft Cider Bar'            },
    { src:IMGS.patio,     cap:'Outdoor Patio'              },
    { src:IMGS.mezzanine, cap:'Mezzanine Level'            },
  ];
  const [activeIdx, setActiveIdx] = React.useState(0);
  const active = imgs[activeIdx];

  return (
    <div style={{ position:'relative', width:'100%', height:'100%', background:B.bgDeep, overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {/* Header bar */}
      <div style={{ padding:'36px 60px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
            <div style={{ width:24, height:1, background:B.terracotta }} />
            <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8, letterSpacing:'.32em', textTransform:'uppercase', color:B.terracotta }}>The Space</span>
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:300, color:B.cream }}>A Vision in the Making</h2>
        </div>
        {/* Counter */}
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:200, color:`rgba(212,168,75,.10)`, lineHeight:1 }}>
          {String(activeIdx+1).padStart(2,'0')}<span style={{ fontSize:28 }}>/{imgs.length}</span>
        </div>
      </div>

      {/* Body: feature + strip */}
      <div style={{ flex:1, display:'flex', gap:0, minHeight:0, padding:'0 60px 36px' }}>
        {/* Feature image */}
        <div style={{ flex:1, position:'relative', overflow:'hidden', marginRight:12 }}>
          {imgs.map((img,i) => (
            <img
              key={img.src} src={img.src} alt={img.cap}
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:i===activeIdx?1:0, transition:'opacity .55s ease', objectPosition:'center' }}
            />
          ))}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(16,14,10,.75) 0%,transparent 40%)' }} />
          <div style={{ position:'absolute', inset:0, backgroundImage:GRAIN_G, opacity:.028, backgroundSize:'180px' }} />
          {/* Caption */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'18px 24px' }}>
            <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.25em', textTransform:'uppercase', color:B.gold }}
              dangerouslySetInnerHTML={{ __html: active.cap }} />
          </div>
          {/* Nav arrows */}
          <div style={{ position:'absolute', bottom:18, right:20, display:'flex', gap:6 }}>
            {[
              { d:'M15 18l-6-6 6-6', fn:()=>setActiveIdx(i=>(i-1+imgs.length)%imgs.length) },
              { d:'M9 18l6-6-6-6',   fn:()=>setActiveIdx(i=>(i+1)%imgs.length) },
            ].map(({ d, fn }, i) => (
              <button key={i} onClick={fn} style={{ width:32, height:32, border:`1px solid rgba(245,236,215,.22)`, background:'rgba(16,14,10,.6)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity:.7 }}><path d={d}/></svg>
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{ width:160, display:'flex', flexDirection:'column', gap:3, overflowY:'auto' }}>
          {imgs.map((img,i) => {
            const active_t = i===activeIdx;
            return (
              <button
                key={img.src} onClick={()=>setActiveIdx(i)}
                style={{ position:'relative', height:96, flexShrink:0, overflow:'hidden', border:'none', padding:0, cursor:'pointer', outline:active_t?`2px solid ${B.terracotta}`:'none', outlineOffset:-2 }}
              >
                <img src={img.src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:active_t?1:.42, transition:'opacity .3s' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'6px 8px', background:'linear-gradient(0deg,rgba(16,14,10,.9) 0%,transparent 100%)' }}>
                  <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7, letterSpacing:'.18em', textTransform:'uppercase', color:active_t?B.gold:`${B.cream}45` }}
                    dangerouslySetInnerHTML={{ __html: img.cap }} />
                </div>
                {active_t && <div style={{ position:'absolute', left:0, top:0, bottom:0, width:2, background:B.terracotta }} />}
              </button>
            );
          })}
        </div>
      </div>
      <DirLabel text="C · Feature + Filmstrip — interactive" />
    </div>
  );
}

Object.assign(window, { GalleryA, GalleryB, GalleryC });
