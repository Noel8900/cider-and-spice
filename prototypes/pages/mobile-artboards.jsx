// mobile-artboards.jsx — Mobile hero redesign directions A / B

const { B, IMGS } = window._CS;

const GRAIN_M = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

function DirLabel({ text }) {
  return (
    <div style={{ position:'absolute', bottom:12, right:14, fontFamily:"'Josefin Sans',sans-serif", fontSize:7.5, letterSpacing:'.28em', textTransform:'uppercase', color:`${B.cream}25`, pointerEvents:'none' }}>
      {text}
    </div>
  );
}

// Simulated iOS status bar
function StatusBar() {
  return (
    <div style={{ height:44, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', flexShrink:0 }}>
      <span style={{ fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:600, color:B.cream, letterSpacing:'-.01em' }}>9:41</span>
      <div style={{ display:'flex', gap:5, alignItems:'center' }}>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <rect x="1" y="3" width="2" height="7" rx="0.5" fill={B.cream} opacity=".4"/>
          <rect x="5" y="2" width="2" height="8" rx="0.5" fill={B.cream} opacity=".55"/>
          <rect x="9" y="1" width="2" height="9" rx="0.5" fill={B.cream} opacity=".7"/>
          <rect x="13" y="0" width="2" height="10" rx="0.5" fill={B.cream}/>
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M7 2C9.8 2 12.3 3.2 14 5.2L12.5 6.5C11.2 5 9.2 4 7 4C4.8 4 2.8 5 1.5 6.5L0 5.2C1.7 3.2 4.2 2 7 2Z" fill={B.cream} opacity=".5"/>
          <path d="M7 5C8.9 5 10.6 5.8 11.8 7.1L10.3 8.4C9.4 7.5 8.3 7 7 7C5.7 7 4.6 7.5 3.7 8.4L2.2 7.1C3.4 5.8 5.1 5 7 5Z" fill={B.cream} opacity=".75"/>
          <circle cx="7" cy="10" r="1.5" fill={B.cream}/>
        </svg>
        <div style={{ width:22, height:11, border:`1.5px solid ${B.cream}`, borderRadius:3, position:'relative', display:'flex', alignItems:'center', padding:'1.5px' }}>
          <div style={{ height:'100%', width:'75%', background:B.cream, borderRadius:1.5 }} />
          <div style={{ position:'absolute', right:-4, top:'50%', transform:'translateY(-50%)', width:2.5, height:5, background:`${B.cream}50`, borderRadius:1 }} />
        </div>
      </div>
    </div>
  );
}

// Mobile nav bar
function MobileNav({ transparent }) {
  return (
    <div style={{ height:52, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 20px', flexShrink:0, background:transparent?'transparent':B.bg, borderBottom:transparent?'none':`1px solid rgba(245,236,215,.07)` }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:300, color:B.cream, letterSpacing:'-.01em' }}>
        Cider <em style={{ fontStyle:'italic', color:B.terracotta }}>&amp;</em> Spice
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:4.5, cursor:'pointer' }}>
        <div style={{ width:22, height:1.5, background:`${B.cream}75` }} />
        <div style={{ width:16, height:1.5, background:`${B.cream}50` }} />
        <div style={{ width:22, height:1.5, background:`${B.cream}75` }} />
      </div>
    </div>
  );
}

// ── A: Full-Bleed Anchored ──────────────────────────────────────────────────
function MobileHeroA() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background:B.bg, display:'flex', flexDirection:'column' }}>
      {/* Full-bleed image */}
      <img src={IMGS.bar} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 28%' }} />
      {/* Gradient: heavy at bottom, lighter at top */}
      <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, rgba(28,18,9,.50) 0%, rgba(28,18,9,.55) 35%, rgba(28,18,9,.90) 65%, rgba(28,18,9,1) 100%)` }} />
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 80% 60% at 20% 80%, rgba(196,98,45,.12) 0%, transparent 60%)` }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:GRAIN_M, opacity:.03, backgroundSize:'160px' }} />

      {/* Top nav */}
      <StatusBar />
      <MobileNav transparent />

      {/* Spacer */}
      <div style={{ flex:1 }} />

      {/* Anchored content */}
      <div style={{ position:'relative', zIndex:2, padding:'0 22px 42px' }}>
        {/* Eyebrow */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
          <div style={{ width:20, height:1, background:B.terracotta, flexShrink:0 }} />
          <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7.5, letterSpacing:'.3em', textTransform:'uppercase', color:B.terracotta }}>Q1–Q2 2027 · Las Cruces, NM</span>
        </div>
        {/* Headline */}
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:54, fontWeight:300, lineHeight:.88, letterSpacing:'-.02em', color:B.parchment, marginBottom:18 }}>
          Where Las Cruces<br /><em style={{ fontStyle:'italic', color:B.terracotta }}>Eats the World</em>
        </h1>
        {/* Sub */}
        <p style={{ fontFamily:"Inter,sans-serif", fontSize:13, lineHeight:1.7, color:B.wheat, opacity:.62, marginBottom:26 }}>
          Southern NM's first food hall, craft cider bar &amp; culinary incubator.
        </p>
        {/* CTAs — full width, large tap targets */}
        <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:24 }}>
          <button style={{ background:B.terracotta, color:B.parchment, border:'none', padding:'17px 20px', fontFamily:"'Josefin Sans',sans-serif", fontSize:10, letterSpacing:'.24em', textTransform:'uppercase', cursor:'pointer', fontWeight:600, width:'100%', textAlign:'center' }}>
            Apply for a Stall →
          </button>
          <button style={{ background:'transparent', color:`${B.wheat}a0`, border:`1px solid rgba(245,236,215,.18)`, padding:'16px 20px', fontFamily:"'Josefin Sans',sans-serif", fontSize:10, letterSpacing:'.24em', textTransform:'uppercase', cursor:'pointer', width:'100%', textAlign:'center' }}>
            Investor Overview
          </button>
        </div>
        {/* Stat strip */}
        <div style={{ borderTop:`1px solid rgba(245,236,215,.08)`, paddingTop:20, display:'grid', gridTemplateColumns:'1fr 1fr 1fr' }}>
          {[['8K sq ft','Venue'],['13','Concepts'],['25 taps','Cider']].map(([n,l],i) => (
            <div key={l} style={{ textAlign:'center', borderLeft:i>0?`1px solid rgba(245,236,215,.07)`:'none' }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:300, color:B.gold }}>{n}</div>
              <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7, letterSpacing:'.18em', textTransform:'uppercase', color:`${B.cream}28`, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <DirLabel text="Mobile A · Full-Bleed Anchor" />
    </div>
  );
}

// ── B: Image Top / Content Bottom (Split) ───────────────────────────────────
function MobileHeroB() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden', background:B.bg, display:'flex', flexDirection:'column' }}>
      {/* Status bar + nav — on solid bg */}
      <div style={{ background:B.bg, flexShrink:0, zIndex:2, position:'relative' }}>
        <StatusBar />
        <MobileNav />
      </div>

      {/* Image — top 42% */}
      <div style={{ height:'42%', position:'relative', flexShrink:0 }}>
        <img src={IMGS.interior} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, transparent 45%, ${B.bg} 100%)` }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:GRAIN_M, opacity:.028, backgroundSize:'160px' }} />
        {/* Floating opening badge */}
        <div style={{ position:'absolute', top:14, right:14, background:'rgba(28,18,9,.80)', backdropFilter:'blur(10px)', padding:'10px 16px', border:`1px solid rgba(212,168,75,.22)` }}>
          <div style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7, letterSpacing:'.3em', textTransform:'uppercase', color:B.terracotta }}>Opening</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:300, color:B.cream, lineHeight:1.1 }}>Q1–Q2 2027</div>
        </div>
      </div>

      {/* Content — fills remaining height */}
      <div style={{ flex:1, background:B.bg, padding:'20px 22px 32px', display:'flex', flexDirection:'column', minHeight:0 }}>
        {/* Eyebrow */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, flexShrink:0 }}>
          <div style={{ width:18, height:1, background:B.terracotta }} />
          <span style={{ fontFamily:"'Josefin Sans',sans-serif", fontSize:7, letterSpacing:'.3em', textTransform:'uppercase', color:B.terracotta }}>Food Hall · Cider Bar · Incubator</span>
        </div>
        {/* Headline */}
        <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:46, fontWeight:300, lineHeight:.9, letterSpacing:'-.016em', color:B.parchment, marginBottom:14, flexShrink:0 }}>
          Where Las Cruces<br /><em style={{ fontStyle:'italic', color:B.terracotta }}>Eats the World</em>
        </h1>
        {/* Sub */}
        <p style={{ fontFamily:"Inter,sans-serif", fontSize:12.5, lineHeight:1.7, color:B.wheat, opacity:.60, marginBottom:20, flex:1 }}>
          10–13 global concepts, 25-tap cider bar, and a culinary incubator. Downtown Las Cruces.
        </p>
        {/* CTAs — 2-col grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, flexShrink:0 }}>
          <button style={{ background:B.terracotta, color:B.parchment, border:'none', padding:'15px 10px', fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer', fontWeight:600 }}>
            Apply Now
          </button>
          <button style={{ background:'transparent', color:`${B.gold}cc`, border:`1px solid rgba(212,168,75,.28)`, padding:'15px 10px', fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer' }}>
            Invest →
          </button>
          <button style={{ gridColumn:'1/3', background:'transparent', color:`${B.cream}38`, border:`1px solid rgba(245,236,215,.09)`, padding:'14px 10px', fontFamily:"'Josefin Sans',sans-serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer' }}>
            ✦ Floor Plan
          </button>
        </div>
      </div>
      <DirLabel text="Mobile B · Split Layout" />
    </div>
  );
}

Object.assign(window, { MobileHeroA, MobileHeroB });
