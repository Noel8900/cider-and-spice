// community-c.jsx — Direction C: "Get-Involved First"
// Action-forward: three tall participation pathways lead, with an interactive
// selected state; a compact impact strip + partner wall support below.
// Depends on: hp-tokens.jsx, community-data.jsx

function CommunityC() {
  const [active, setActive] = React.useState(0);
  const [hov, setHov] = React.useState(null);
  const [ref, inView] = useInView(0.25);

  return (
    <section id="community" style={{ background: HP.bg, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)', borderTop: `1px solid ${HP.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge={CM.badge} title="Find Your Way In" subtitle="However you come to the table — to cook, to gather, or to give — there’s a place for you in this hall." />

        {/* Pathways — lead */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, marginBottom: 56 }}>
          {CM.paths.map((p, i) => {
            const on = active === i || hov === i;
            return (
              <FadeIn key={p.title} delay={i * 0.08} style={{ height: '100%' }}>
                <div
                  onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} onClick={() => setActive(i)}
                  style={{ height: '100%', cursor: 'pointer', padding: 'clamp(28px,2.6vw,40px) clamp(24px,2.4vw,34px)', background: on ? 'rgba(196,98,45,.08)' : 'rgba(255,255,255,.020)', borderTop: `3px solid ${on ? HP.terracotta : 'rgba(196,98,45,.2)'}`, borderLeft: `1px solid ${HP.border}`, borderRight: `1px solid ${HP.border}`, borderBottom: `1px solid ${HP.border}`, transition: 'all .35s ease', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(34px,3.4vw,42px)', color: on ? HP.terracotta : `${HP.terracotta}66`, lineHeight: 1, transition: 'color .35s' }}>{p.icon}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 200, color: on ? 'rgba(212,168,75,.4)' : 'rgba(212,168,75,.12)', lineHeight: 1, transition: 'color .35s' }}>0{i + 1}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.26em', textTransform: 'uppercase', color: HP.gold, marginBottom: 10 }}>{p.kicker}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,2.7vw,32px)', fontWeight: 300, color: HP.cream, lineHeight: 1.05 }}>{p.title}</h3>
                  </div>
                  <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.75, color: HP.wheat, opacity: .55 }}>{p.body}</p>
                  {/* Action checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, paddingTop: 6 }}>
                    {p.actions.map(a => (
                      <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 11, fontFamily: 'Inter,sans-serif', fontSize: 12.5, color: HP.cream, opacity: on ? .82 : .5, transition: 'opacity .35s' }}>
                        <span style={{ width: 18, height: 18, flexShrink: 0, border: `1px solid ${on ? HP.terracotta : 'rgba(245,236,215,.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color .35s' }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={on ? HP.terracotta : 'rgba(245,236,215,.3)'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                        </span>{a}
                      </div>
                    ))}
                  </div>
                  <a href={p.href} onClick={e => e.stopPropagation()} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', padding: '13px 0', background: on ? HP.terracotta : 'transparent', color: on ? HP.parchment : `${HP.cream}55`, border: `1px solid ${on ? HP.terracotta : HP.border}`, transition: 'all .35s', fontWeight: 600 }}>{p.cta} →</a>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Impact strip */}
        <FadeIn>
          <div ref={ref} style={{ borderTop: `1px solid ${HP.border}`, borderBottom: `1px solid ${HP.border}`, padding: '36px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 28, marginBottom: 36 }}>
            {CM.commitments.map((c, i) => (
              <div key={i} style={{ flex: '1 1 160px', minWidth: 0 }}>
                <CommitmentNumber value={c.value} prefix={c.prefix} suffix={c.suffix} active={inView} size={40} />
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, lineHeight: 1.5, color: HP.wheat, opacity: .52, marginTop: 10, maxWidth: 180 }}>{c.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Partner wall */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px 26px' }}>
            <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: `${HP.cream}40` }}>Built with</span>
            {CM.partners.map(p => (
              <span key={p} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 300, fontStyle: 'italic', color: HP.wheat, opacity: .5 }}>{p}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

Object.assign(window, { CommunityC });
