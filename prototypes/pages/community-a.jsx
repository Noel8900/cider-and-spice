// community-a.jsx — Direction A: "Editorial Story"
// Calm, magazine-style: narrative manifesto + commitments column, then three
// participation cards, then a partner line. Matches HP design system exactly.
// Depends on: hp-tokens.jsx, community-data.jsx

function CommunityPathCardA({ p, delay }) {
  const [hov, setHov] = React.useState(false);
  return (
    <FadeIn delay={delay} style={{ height: '100%' }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ height: '100%', padding: '30px 28px', background: hov ? 'rgba(255,255,255,.035)' : 'rgba(255,255,255,.020)', border: `1px solid ${hov ? 'rgba(196,98,45,.28)' : HP.border}`, borderLeft: `2px solid ${hov ? HP.terracotta : 'rgba(196,98,45,.22)'}`, transition: 'all .3s ease', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: hov ? HP.terracotta : `${HP.terracotta}80`, lineHeight: 1, transition: 'color .3s' }}>{p.icon}</span>
        <div>
          <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.26em', textTransform: 'uppercase', color: HP.gold, marginBottom: 8 }}>{p.kicker}</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 300, color: HP.cream, lineHeight: 1.1 }}>{p.title}</h3>
        </div>
        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.75, color: HP.wheat, opacity: .54 }}>{p.body}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {p.actions.map(a => (
            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Inter,sans-serif', fontSize: 12, color: HP.wheat, opacity: .62 }}>
              <span style={{ color: HP.terracotta, fontSize: 11 }}>✦</span>{a}
            </div>
          ))}
        </div>
        <a href={p.href} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: hov ? HP.gold : `${HP.cream}50`, textDecoration: 'none', paddingTop: 14, borderTop: `1px solid ${HP.border}`, transition: 'color .25s' }}>{p.cta} →</a>
      </div>
    </FadeIn>
  );
}

function CommunityA() {
  const [ref, inView] = useInView();
  return (
    <section id="community" style={{ background: HP.bg, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)', borderTop: `1px solid ${HP.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge={CM.badge} title="Built by the Neighborhood" subtitle="Las Cruces has the talent and the appetite. What it has been missing is the doorway." center={false} />

        {/* Manifesto + commitments */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: 'clamp(40px,5vw,72px)', alignItems: 'start', marginBottom: 72 }}>
          {/* Left — narrative */}
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,2.6vw,30px)', fontWeight: 300, fontStyle: 'italic', color: HP.cream, lineHeight: 1.4, marginBottom: 28 }}>{CM.lead}</p>
            {CM.body.map((para, i) => (
              <p key={i} style={{ fontFamily: 'Inter,sans-serif', fontSize: 14.5, lineHeight: 1.85, color: HP.wheat, opacity: .58, marginBottom: 18, maxWidth: 540 }}>{para}</p>
            ))}
            {/* Pull quote */}
            <div style={{ marginTop: 32, paddingLeft: 24, borderLeft: `2px solid ${HP.terracotta}` }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,2.3vw,27px)', fontWeight: 300, color: HP.gold, lineHeight: 1.35 }}>“{CM.pullQuote}”</p>
            </div>
          </FadeIn>

          {/* Right — commitments ledger */}
          <FadeIn delay={0.15}>
            <div style={{ background: 'rgba(255,255,255,.022)', border: `1px solid ${HP.border}`, padding: '8px 28px 12px' }}>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: HP.terracotta, padding: '22px 0 6px' }}>Our Commitments</div>
              {CM.commitments.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 18, padding: '18px 0', borderTop: i === 0 ? 'none' : `1px solid ${HP.border}` }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 300, color: HP.gold, lineHeight: 1, flexShrink: 0, minWidth: 64 }}>{c.prefix || ''}{c.value}{c.suffix}</span>
                  <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 12.5, lineHeight: 1.6, color: HP.wheat, opacity: .60 }}>{c.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Three ways in */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: HP.cream, whiteSpace: 'nowrap' }}>Three ways in</span>
            <div style={{ flex: 1, height: 1, background: HP.border }} />
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, marginBottom: 44 }}>
          {CM.paths.map((p, i) => <CommunityPathCardA key={p.title} p={p} delay={i * 0.08} />)}
        </div>

        {/* Partner line */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px 28px', paddingTop: 28, borderTop: `1px solid ${HP.border}` }}>
            <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: `${HP.cream}40` }}>In partnership with</span>
            {CM.partners.map(p => (
              <span key={p} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontWeight: 300, fontStyle: 'italic', color: `${HP.wheat}`, opacity: .55 }}>{p}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

Object.assign(window, { CommunityA });
