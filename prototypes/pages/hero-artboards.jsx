// hero-artboards.jsx — Hero section redesign directions A / B / C
// Brand tokens + image URLs shared with gallery & mobile via window._CS

const B = {
  bg:         '#1C1209',
  bgDeep:     '#100E0A',
  cream:      '#F5ECD7',
  parchment:  '#F7F3EC',
  terracotta: '#C4622D',
  gold:       '#D4A84B',
  wheat:      '#E8C18D',
};

const IMG_BASE = 'https://lc-culinary-hub.vercel.app/images/';
const IMGS = {
  bar:       IMG_BASE + 'cider-spice-bar-craft-cider-tap-pour-concept-rendering.png',
  interior:  IMG_BASE + 'cider-spice-interior-two-level-open-kitchen-concept-rendering.png',
  aerial:    IMG_BASE + 'cider-spice-gallery-aerial-outdoor-exterior-collage-vision-image.png',
  stage:     IMG_BASE + 'cider-spice-concept-overhead-stage-full-crowd-concept-rendering.png',
  patio:     IMG_BASE + 'cider-spice-outdoor-indoor-patio-shade-sails-concept-rendering.png',
  mezzanine: IMG_BASE + 'cider-spice-concept-indoor-mezzanine-flow-concept-rendering.png',
  stalls:    IMG_BASE + 'cider-spice-tenant-vision-three-stall-row-vision-image.png',
};

// Expose shared resources
window._CS = { B, IMGS };

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

function DirLabel({ text }) {
  return (
    <div style={{ position:'absolute', bottom:14, right:16, fontFamily:"'Josefin Sans',sans-serif", fontSize:8, letterSpacing:'0.28em', textTransform:'uppercase', color:`${B.cream}28`, pointerEvents:'none' }}>
      {text}
    </div>
  );
}

function NavBar({ light }) {
  const tc = light ? B.terracotta : B.terracotta;
  const cc = light ? B.parchment : B.parchment;
  return (
    <div style={{ position:'absolute', top:0, left:0, right:0, height:72, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 72px', zIndex:10 }}>
      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:20, fontWeight:300, color:cc, letterSpacing:'-0.01em' }}>
        Cider <em style={{ fontStyle:'italic', color:tc }}>&amp;</em> Spice
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:32 }}>
        {['The Space','Vendors','Incubator','Invest'].map(l => (
          <span key={l} style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8.5, letterSpacing:'0.22em', textTransform:'uppercase', color:`${cc}55`, cursor:'pointer' }}>{l}</span>
        ))}
        <div style={{ height:14, width:1, background:`${cc}20` }} />
        <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8.5, letterSpacing:'0.22em', textTransform:'uppercase', background:tc, color:B.parchment, padding:'9px 20px', cursor:'pointer', fontWeight:600 }}>
          Claim Your Stall
        </div>
      </div>
    </div>
  );
}

// ── A: Cinematic (Refined Current) ─────────────────────────────────────────
function HeroA() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background:B.bg, fontFamily:"Inter,sans-serif" }}>
      <img src={IMGS.bar} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 25%' }} />
      {/* Gradient stack */}
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(110deg, rgba(28,18,9,.97) 0%, rgba(28,18,9,.70) 48%, rgba(28,18,9,.22) 100%)` }} />
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(0deg, rgba(28,18,9,.96) 0%, transparent 52%)` }} />
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 50% 80% at 5% 50%, rgba(196,98,45,.16) 0%, transparent 60%)` }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:GRAIN, opacity:.032, backgroundSize:'180px' }} />
      {/* Corner accents */}
      {[[40,40,'top:0;right:0',1,0],[40,40,'bottom:0;left:0',0,1]].map((_,i) => (
        <div key={i} style={{ position:'absolute', ...(i===0?{top:36,right:36}:{bottom:36,left:36}), width:52, height:52 }}>
          <div style={{ position:'absolute', ...(i===0?{top:0,right:0}:{bottom:0,left:0}), width:52, height:1, background:'rgba(212,168,75,.22)' }} />
          <div style={{ position:'absolute', ...(i===0?{top:0,right:0}:{bottom:0,left:0}), width:1, height:52, background:'rgba(212,168,75,.22)' }} />
        </div>
      ))}
      <NavBar />
      {/* Content */}
      <div style={{ position:'absolute', top:0, bottom:0, left:0, right:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 72px', paddingTop:80, maxWidth:860 }}>
        {/* Eyebrow */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:36 }}>
          <div style={{ width:36, height:1, background:B.terracotta, flexShrink:0 }} />
          <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.35em', textTransform:'uppercase', color:B.terracotta }}>Opening Q1–Q2 2027 · Downtown Las Cruces, NM</span>
        </div>
        {/* Headline */}
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:90, fontWeight:300, lineHeight:.9, letterSpacing:'-.022em', color:B.parchment, marginBottom:28 }}>
          Where Las Cruces<br />
          <em style={{ fontStyle:'italic', color:B.terracotta }}>Eats the World</em>
        </h1>
        {/* Wheat rule */}
        <div style={{ width:56, height:1, background:`linear-gradient(90deg,${B.wheat},transparent)`, marginBottom:28 }} />
        {/* Sub */}
        <p style={{ fontSize:14, lineHeight:1.85, color:B.wheat, opacity:.68, maxWidth:480, marginBottom:44 }}>
          The Borderland has extraordinary food talent — street cooks, home chefs, generational recipes. Cider &amp; Spice gives that talent a permanent downtown address.
        </p>
        {/* CTAs */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:52 }}>
          {[
            { label:'See the Opportunity', fill:true },
            { label:'Investor Overview',   fill:false },
            { label:'✦ Floor Plan',        fill:false },
          ].map(({ label, fill }) => (
            <div key={label} style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.25em', textTransform:'uppercase', padding:'14px 34px', cursor:'pointer', fontWeight:fill?600:400, background:fill?B.terracotta:'transparent', color:fill?B.parchment:`${B.wheat}aa`, border:fill?'none':`1px solid rgba(245,236,215,.18)` }}>
              {label}
            </div>
          ))}
        </div>
        {/* Stat badges */}
        <div style={{ display:'flex', gap:8 }}>
          {[['8,000 sq ft','Indoor Venue'],['Up to 13','Global Concepts'],['Up to 25 taps','Rotating Cider']].map(([n,l]) => (
            <div key={l} style={{ padding:'16px 20px', background:'rgba(44,36,22,.62)', backdropFilter:'blur(8px)', border:'1px solid rgba(245,236,215,.11)' }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:300, color:B.terracotta, lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7.5, letterSpacing:'.22em', textTransform:'uppercase', marginTop:5, color:`${B.wheat}48` }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <DirLabel text="A · Cinematic — refined current" />
    </div>
  );
}

// ── B: Editorial Split ──────────────────────────────────────────────────────
function HeroB() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background:B.bg, display:'flex' }}>
      {/* Left panel */}
      <div style={{ width:'46%', height:'100%', background:B.bg, display:'flex', flexDirection:'column', justifyContent:'center', padding:'72px 64px', position:'relative', flexShrink:0, zIndex:2 }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${B.terracotta},${B.gold})` }} />
        {/* Brand mark */}
        <div style={{ marginBottom:44 }}>
          <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8.5, letterSpacing:'.42em', textTransform:'uppercase', color:B.terracotta, marginBottom:8 }}>Cider &amp; Spice</div>
          <div style={{ width:28, height:1, background:`rgba(212,168,75,.35)` }} />
        </div>
        {/* Ghost watermark */}
        <div style={{ position:'absolute', left:48, top:'18%', fontFamily:"'Cormorant Garamond',serif", fontSize:180, fontWeight:200, lineHeight:1, color:'rgba(212,168,75,.035)', userSelect:'none', letterSpacing:'-.04em', whiteSpace:'nowrap' }}>C&S</div>
        {/* Headline */}
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:70, fontWeight:300, lineHeight:.9, letterSpacing:'-.016em', color:B.parchment, marginBottom:28, position:'relative' }}>
          Where Las<br />Cruces<br /><em style={{ fontStyle:'italic', color:B.terracotta }}>Eats the World</em>
        </h1>
        {/* Rule */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24 }}>
          <div style={{ width:36, height:1, background:`rgba(212,168,75,.28)` }} />
          <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:8, letterSpacing:'.28em', textTransform:'uppercase', color:`rgba(212,168,75,.38)` }}>Las Cruces, NM</span>
        </div>
        {/* Body */}
        <p style={{ fontFamily:"Inter,sans-serif", fontSize:13, lineHeight:1.9, color:B.wheat, opacity:.62, marginBottom:36 }}>
          Southern New Mexico's first food hall, craft cider bar, and culinary incubator. Opening Q1–Q2 2027.
        </p>
        {/* CTAs — stacked for authority */}
        <div style={{ display:'flex', flexDirection:'column', gap:9, maxWidth:270 }}>
          {[
            { l:'See the Opportunity →', fill:true  },
            { l:'Investor Overview →',   fill:false, gold:true },
            { l:'✦ Explore Floor Plan',  fill:false },
          ].map(({ l, fill, gold }) => (
            <div key={l} style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', padding:'15px 28px', cursor:'pointer', fontWeight:fill?600:400, background:fill?B.terracotta:'transparent', color:fill?B.parchment:gold?`${B.gold}cc`:`${B.cream}42`, border:fill?'none':gold?`1px solid rgba(212,168,75,.28)`:`1px solid rgba(245,236,215,.10)` }}>
              {l}
            </div>
          ))}
        </div>
        {/* Stat strip bottom */}
        <div style={{ position:'absolute', bottom:40, left:64, display:'flex', gap:28 }}>
          {[['8K','sq ft'],['13','concepts'],['25','cider taps']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300, color:B.gold }}>{n}</div>
              <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7, letterSpacing:'.2em', textTransform:'uppercase', color:`${B.cream}28`, marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`rgba(212,168,75,.08)` }} />
      </div>
      {/* Right image */}
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <img src={IMGS.interior} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(90deg,${B.bg} 0%,transparent 18%),linear-gradient(0deg,rgba(28,18,9,.45) 0%,transparent 40%)` }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:GRAIN, opacity:.032, backgroundSize:'180px' }} />
        {/* Floating tag */}
        <div style={{ position:'absolute', top:40, right:40, background:'rgba(28,18,9,.78)', backdropFilter:'blur(12px)', padding:'12px 20px', border:`1px solid rgba(212,168,75,.22)` }}>
          <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7.5, letterSpacing:'.32em', textTransform:'uppercase', color:B.terracotta }}>Opening</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300, color:B.cream, lineHeight:1.1 }}>Q1–Q2 2027</div>
        </div>
        {/* Bottom label */}
        <div style={{ position:'absolute', bottom:40, left:24, fontFamily:"'Josefin Sans',sans-serif", fontSize:8, letterSpacing:'.28em', textTransform:'uppercase', color:`${B.cream}28` }}>Two-Level Open Kitchen · Concept Rendering</div>
      </div>
      <DirLabel text="B · Editorial Split" />
    </div>
  );
}

// ── C: Atmospheric Anchor ───────────────────────────────────────────────────
function HeroC() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background:B.bgDeep }}>
      <img src={IMGS.stage} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 35%' }} />
      {/* Heavy bottom anchor gradient */}
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(0deg, rgba(16,14,10,1) 0%, rgba(16,14,10,.88) 28%, rgba(16,14,10,.45) 52%, rgba(16,14,10,.18) 100%)` }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'30%', background:`linear-gradient(180deg,rgba(16,14,10,.55) 0%,transparent 100%)` }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:GRAIN, opacity:.032, backgroundSize:'180px' }} />
      {/* Ghost headline watermark */}
      <div style={{ position:'absolute', top:'28%', left:'50%', transform:'translateX(-50%) translateY(-50%)', whiteSpace:'nowrap', fontFamily:"'Cormorant Garamond',serif", fontSize:168, fontWeight:200, color:'rgba(245,236,215,.03)', letterSpacing:'.06em', userSelect:'none', pointerEvents:'none' }}>
        CIDER &amp; SPICE
      </div>
      {/* Thin gold rule across full width */}
      <div style={{ position:'absolute', bottom:280, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, rgba(212,168,75,.18) 20%, rgba(212,168,75,.18) 80%, transparent)` }} />
      <NavBar />
      {/* Content anchored bottom */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 72px 52px' }}>
        {/* Eyebrow */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:22 }}>
          <div style={{ width:32, height:1, background:B.terracotta, flexShrink:0 }} />
          <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.35em', textTransform:'uppercase', color:B.terracotta }}>Opening Q1–Q2 2027 · Downtown Las Cruces, NM</span>
        </div>
        {/* Headline — very large */}
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:104, fontWeight:300, lineHeight:.87, letterSpacing:'-.024em', color:B.parchment, marginBottom:36 }}>
          Where Las Cruces<br /><em style={{ fontStyle:'italic', color:B.terracotta }}>Eats the World</em>
        </h1>
        {/* Bottom row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:32 }}>
          <div style={{ maxWidth:440 }}>
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:13.5, lineHeight:1.8, color:B.wheat, opacity:.62, marginBottom:28 }}>
              The Borderland has extraordinary food talent. Cider &amp; Spice gives that talent a permanent downtown address.
            </p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {[
                { l:'See the Opportunity', fill:true },
                { l:'Invest →', fill:false },
              ].map(({ l, fill }) => (
                <div key={l} style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.25em', textTransform:'uppercase', padding:'14px 32px', cursor:'pointer', fontWeight:fill?600:400, background:fill?B.terracotta:'transparent', color:fill?B.parchment:`${B.wheat}aa`, border:fill?'none':`1px solid rgba(245,236,215,.18)` }}>{l}</div>
              ))}
            </div>
          </div>
          {/* Stats strip — high-contrast cards */}
          <div style={{ display:'flex', gap:2 }}>
            {[['8,000','sq ft','Indoor Venue',true],['13','','Global Concepts',false],['25',' taps','Cider Bar',false]].map(([n,sfx,l,hot]) => (
              <div key={l} style={{ padding:'20px 26px', background:hot?'rgba(196,98,45,.88)':'rgba(28,18,9,.72)', backdropFilter:'blur(10px)', borderTop:`2px solid ${hot?B.terracotta:'rgba(212,168,75,.28)'}` }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:300, color:hot?B.parchment:B.gold, lineHeight:1 }}>{n}{sfx}</div>
                <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7.5, letterSpacing:'.22em', textTransform:'uppercase', marginTop:5, color:hot?'rgba(247,243,236,.65)':`${B.wheat}40` }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DirLabel text="C · Atmospheric Anchor" />
    </div>
  );
}

Object.assign(window, { HeroA, HeroB, HeroC });
