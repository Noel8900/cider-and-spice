// community-b.jsx — Direction B: "Impact Ledger"
// Data-forward: a band of count-up commitments, a wide founder spotlight with a
// quote, then a 3-up participation CTA row. Matches HP design system.
// Depends on: hp-tokens.jsx, community-data.jsx

function CommunityB() {
  const [ref, inView] = useInView(0.2);
  const [sp, setSp] = React.useState(0);
  const spot = CM.spotlights[sp];

  return (
    <section id="community" style={{ background: HP.bgDeep, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)', borderTop: `1px solid ${HP.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge={CM.badge} title="A Hub That Gives Back" subtitle="Cider & Spice is engineered as a launchpad for local food entrepreneurs — here is the model, by the numbers." />

        {/* Commitments band */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: `repeat(${CM.commitments.length}, 1fr)`, gap: 2, marginBottom: 4 }}>
          {CM.commitments.map((c, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{ height: '100%', padding: '28px 22px 24px', background: 'rgba(255,255,255,.025)', borderTop: `2px solid rgba(212,168,75,.3)` }}>
                <CommitmentNumber value={c.value} prefix={c.prefix} suffix={c.suffix} active={inView} size={46} />
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11.5, lineHeight: 1.55, color: HP.wheat, opacity: .55, marginTop: 14 }}>{c.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn><p style={{ fontFamily: 'Inter,sans-serif', fontSize: 10.5, color: `${HP.cream}28`, marginBottom: 56 }}>Figures describe the Hub's founding operating model and reservation commitments. Subject to change prior to opening Q1–Q2 2027.</p></FadeIn>

        {/* Founder spotlight */}
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', minHeight: 360, border: `1px solid ${HP.border}`, marginBottom: 18 }}>
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 300 }}>
              <img src={spot.img} alt={spot.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent 60%,rgba(16,14,10,.9) 100%),linear-gradient(0deg,rgba(16,14,10,.55),transparent 45%)' }} />
              <div style={{ position: 'absolute', top: 22, left: 22, background: 'rgba(16,14,10,.78)', backdropFilter: 'blur(8px)', border: `1px solid rgba(212,168,75,.24)`, padding: '7px 14px' }}>
                <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.26em', textTransform: 'uppercase', color: HP.gold }}>{spot.track}</span>
              </div>
            </div>
            {/* Quote */}
            <div style={{ padding: 'clamp(36px,4vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(255,255,255,.022)' }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 60, color: 'rgba(212,168,75,.28)', lineHeight: .6, height: 28 }}>“</span>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,2.4vw,28px)', fontWeight: 300, fontStyle: 'italic', color: HP.cream, lineHeight: 1.4, marginBottom: 26 }}>{spot.quote}</p>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: HP.gold }}>{spot.name}</div>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.24em', textTransform: 'uppercase', color: `${HP.cream}45`, marginTop: 5 }}>{spot.cuisine}</div>
              {/* Spotlight switcher */}
              <div style={{ display: 'flex', gap: 8, marginTop: 30 }}>
                {CM.spotlights.map((s, i) => (
                  <button key={s.name} onClick={() => setSp(i)} aria-label={s.name} style={{ width: i === sp ? 26 : 9, height: 9, borderRadius: 5, border: 'none', cursor: 'pointer', background: i === sp ? HP.terracotta : 'rgba(245,236,215,.18)', transition: 'all .3s' }} />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn><CMDisclaimer style={{ marginBottom: 56 }} /></FadeIn>

        {/* Participation CTA row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
          {CM.paths.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08} style={{ height: '100%' }}>
              <a href={p.href} style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                <div style={{ height: '100%', padding: '30px 26px', background: i === 0 ? 'rgba(196,98,45,.07)' : 'rgba(255,255,255,.020)', border: `1px solid ${i === 0 ? 'rgba(196,98,45,.28)' : HP.border}`, display: 'flex', flexDirection: 'column', gap: 12, transition: 'all .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,98,45,.4)'; e.currentTarget.style.background = 'rgba(196,98,45,.07)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = i === 0 ? 'rgba(196,98,45,.28)' : HP.border; e.currentTarget.style.background = i === 0 ? 'rgba(196,98,45,.07)' : 'rgba(255,255,255,.020)'; }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: HP.terracotta }}>{p.icon}</span>
                  <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.24em', textTransform: 'uppercase', color: HP.gold }}>{p.kicker}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 23, fontWeight: 300, color: HP.cream, lineHeight: 1.1 }}>{p.title}</h3>
                  <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 12.5, lineHeight: 1.7, color: HP.wheat, opacity: .52, flex: 1 }}>{p.body}</p>
                  <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: HP.parchment }}>{p.cta} →</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CommunityB });
