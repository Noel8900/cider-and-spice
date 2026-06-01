// hp-community.jsx — Community section for the Cider & Spice homepage
// Hybrid of explored directions A (editorial story) + C (get-involved-first).
// Self-contained: brand atoms come from hp-tokens.jsx (HP, FadeIn, SectionEyebrow,
// useInView, useCountUp). Honest framing — Hub opens 2027, so impact = commitments.

const HPC = {
  badge: 'Community',
  lead: 'Cider & Spice is more than a food hall. It is a launchpad — built by Las Cruces, for Las Cruces.',
  body: [
    'Seventy percent of our stalls are reserved for first-generation, immigrant, veteran, and women-owned food businesses — neighbors with a recipe and a dream, but not yet a storefront.',
    'Through the Semilla and Mariposa tracks, founders get a licensed commissary kitchen, no-cost mentorship from WESST New Mexico, SCORE, and the Las Cruces SBDC, and a built-in audience from the day they open.',
  ],
  pullQuote: 'Every plate served here helps a neighbor build a business that stays in the neighborhood.',
  commitments: [
    { value: 70,  suffix: '%', label: 'Stalls reserved for first-gen, immigrant, veteran & women founders' },
    { value: 8,   suffix: '',  label: 'Founding-cohort businesses launching together' },
    { value: 0,   prefix: '$', suffix: '', label: 'Cost of mentorship & coaching to every vendor' },
    { value: 100, suffix: '%', label: 'New Mexico cider & locally sourced produce' },
    { value: 2,   suffix: '',  label: 'Incubator tracks — Semilla & Mariposa' },
  ],
  paths: [
    { icon: '◈', kicker: 'For Food Entrepreneurs', title: 'Bring Your Food',
      body: 'Have a concept and the drive? Apply to the incubator — no prior restaurant experience required. We provide the kitchen, the mentors, and the crowd.',
      actions: ['Submit your concept', 'Cook in the shared commissary', 'Get matched with a mentor'],
      cta: 'Apply to the incubator', href: 'Incubator Program.html' },
    { icon: '✦', kicker: 'For Neighbors & Diners', title: 'Show Up & Pitch In',
      body: 'The hall comes alive through the people in it. Come for the markets and chile-harvest nights — stay to volunteer, mentor, or simply spread the word.',
      actions: ['RSVP to markets & festivals', 'Volunteer on community nights', 'Join the Cider Club'],
      cta: 'See what’s on', href: '#cta' },
    { icon: '◉', kicker: 'For Partners & Nonprofits', title: 'Build It With Us',
      body: 'Schools, farms, lenders, and nonprofits make this work. Sponsor a founder’s first season, lead a workshop, or supply the line with local produce.',
      actions: ['Sponsor a founder’s first season', 'Lead a skills workshop', 'Supply local produce'],
      cta: 'Become a partner', href: 'Grant Programs.html' },
  ],
  partners: ['WESST New Mexico', 'SCORE', 'Las Cruces SBDC', 'SBA Lending', 'Local Farms & Growers', 'Community Microlenders'],
};

function HPCCommitment({ c, active }) {
  const n = useCountUp(c.value, active, 0, 1500);
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, padding: '18px 0', borderTop: `1px solid ${HP.border}` }}>
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 300, color: HP.gold, lineHeight: 1, flexShrink: 0, minWidth: 78 }}>{c.prefix || ''}{n}{c.suffix}</span>
      <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 12.5, lineHeight: 1.6, color: HP.wheat, opacity: .60 }}>{c.label}</span>
    </div>
  );
}

function HPCPathway({ p, i, active, hov, setActive, setHov }) {
  const on = active === i || hov === i;
  return (
    <div
      onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} onClick={() => setActive(i)}
      style={{ height: '100%', cursor: 'pointer', padding: 'clamp(28px,2.6vw,38px) clamp(24px,2.4vw,32px)', background: on ? 'rgba(196,98,45,.08)' : 'rgba(255,255,255,.020)', borderTop: `3px solid ${on ? HP.terracotta : 'rgba(196,98,45,.2)'}`, borderLeft: `1px solid ${HP.border}`, borderRight: `1px solid ${HP.border}`, borderBottom: `1px solid ${HP.border}`, transition: 'all .35s ease', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,3.2vw,40px)', color: on ? HP.terracotta : `${HP.terracotta}66`, lineHeight: 1, transition: 'color .35s' }}>{p.icon}</span>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, fontWeight: 200, color: on ? 'rgba(212,168,75,.4)' : 'rgba(212,168,75,.12)', lineHeight: 1, transition: 'color .35s' }}>0{i + 1}</span>
      </div>
      <div>
        <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.26em', textTransform: 'uppercase', color: HP.gold, marginBottom: 10 }}>{p.kicker}</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(25px,2.6vw,30px)', fontWeight: 300, color: HP.cream, lineHeight: 1.05 }}>{p.title}</h3>
      </div>
      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.75, color: HP.wheat, opacity: .55 }}>{p.body}</p>
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
  );
}

function HPCommunity() {
  const [ledgerRef, ledgerIn] = useInView(0.25);
  const [active, setActive] = React.useState(0);
  const [hov, setHov] = React.useState(null);

  return (
    <section id="community" style={{ background: HP.bg, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)', borderTop: `1px solid ${HP.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge={HPC.badge} title="Built by the Neighborhood" subtitle="Las Cruces has the talent and the appetite. What it has been missing is the doorway." center={false} />

        {/* Manifesto + commitments (Direction A) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(36px,5vw,72px)', alignItems: 'start', marginBottom: 80 }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,2.6vw,30px)', fontWeight: 300, fontStyle: 'italic', color: HP.cream, lineHeight: 1.4, marginBottom: 30 }}>{HPC.lead}</p>
            {HPC.body.map((para, i) => (
              <p key={i} style={{ fontFamily: 'Inter,sans-serif', fontSize: 14.5, lineHeight: 1.85, color: HP.wheat, opacity: .58, marginBottom: 18, maxWidth: 540 }}>{para}</p>
            ))}
            <div style={{ marginTop: 32, paddingLeft: 24, borderLeft: `2px solid ${HP.terracotta}` }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,2.3vw,27px)', fontWeight: 300, color: HP.gold, lineHeight: 1.35 }}>“{HPC.pullQuote}”</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div ref={ledgerRef} style={{ background: 'rgba(255,255,255,.022)', border: `1px solid ${HP.border}`, padding: '8px 28px 14px' }}>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: HP.terracotta, padding: '22px 0 6px' }}>Our Commitments</div>
              {HPC.commitments.map((c, i) => <HPCCommitment key={i} c={c} active={ledgerIn} />)}
            </div>
          </FadeIn>
        </div>

        {/* Find Your Way In (Direction C) */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 30 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,34px)', fontWeight: 300, color: HP.cream, whiteSpace: 'nowrap' }}>Find Your Way In</span>
            <div style={{ flex: 1, height: 1, background: HP.border }} />
            <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.24em', textTransform: 'uppercase', color: `${HP.cream}38`, whiteSpace: 'nowrap' }}>To cook · to gather · to give</span>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3, marginBottom: 48 }}>
          {HPC.paths.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08} style={{ height: '100%' }}>
              <HPCPathway p={p} i={i} active={active} hov={hov} setActive={setActive} setHov={setHov} />
            </FadeIn>
          ))}
        </div>

        {/* Partner wall */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px 26px', paddingTop: 30, borderTop: `1px solid ${HP.border}` }}>
            <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: `${HP.cream}40` }}>In partnership with</span>
            {HPC.partners.map(p => (
              <span key={p} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontWeight: 300, fontStyle: 'italic', color: HP.wheat, opacity: .55 }}>{p}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

Object.assign(window, { HPCommunity });
