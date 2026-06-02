// hp-bottom.jsx — Stats + Timeline + CTA + Footer

// ── Impact Stats ────────────────────────────────────────────────────────────
function StatBlock({ target, suffix, prefix, label, decimals, delay }) {
  const [ref, inView] = useInView(0.5);
  const val = useCountUp(target, inView, decimals);
  return (
    <FadeIn delay={delay}>
      <div ref={ref} style={{ textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(48px,6vw,72px)', fontWeight: 300, color: HP.terracotta, lineHeight: 1, marginBottom: 10 }}>
          {prefix}{val}{suffix}
        </div>
        <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.28em', textTransform: 'uppercase', color: `${HP.cream}40` }}>{label}</div>
      </div>
    </FadeIn>
  );
}

function HPStats() {
  return (
    <section id="stats" style={{ background: HP.bgDeep, borderTop: `1px solid ${HP.border}`, borderBottom: `1px solid ${HP.border}`, padding: 'clamp(72px,9vw,100px) clamp(24px,5vw,72px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge="Community Impact" title="Rooted in Las Cruces" subtitle="The food here comes from people who have been waiting for a place like this — and so have you." />

        {/* Main stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: HP.border, marginBottom: 3 }}>
          {[
            { target:90000, suffix:'',  prefix:'',  label:'Projected Annual Visitors', decimals:0 },
            { target:5.6,   suffix:'M', prefix:'$', label:'Est. Tourism Multiplier Effect', decimals:1 },
            { target:50,    suffix:'+', prefix:'',  label:'Permanent Jobs Created', decimals:0 },
            { target:200,   suffix:' mi', prefix:'', label:'Nearest Competitor (mi)', decimals:0 },
          ].map((s, i) => (
            <div key={s.label} style={{ background: HP.bgDeep, padding: 'clamp(36px,4vw,48px) 20px' }}>
              <StatBlock {...s} delay={i * 0.1} />
            </div>
          ))}
        </div>

        {/* Secondary grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1px', background: HP.border, marginBottom: 56 }}>
          {[
            ['34','FTE Jobs, Year 1'],['12+','Vendor Stalls Available'],['~60%','Cost Savings vs. Solo'],['$0','Franchise Fees. Ever.'],
          ].map(([n, l], i) => (
            <FadeIn key={l} delay={i * 0.07}>
              <div style={{ background: HP.bgDeep, padding: '28px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 300, color: HP.gold, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.22em', textTransform: 'uppercase', color: `${HP.cream}38`, lineHeight: 1.5 }}>{l}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Investment tiers */}
        <SectionEyebrow badge="Invest" title="Investment Tiers" subtitle="All investment discussions are conducted privately. No online transactions." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 3 }}>
          {[
            { tier:'Community Investor', range:'$25K – $74,999', hot:false, perks:['Investor newsletter & quarterly updates','Named recognition in Hub materials','Early access to Cider Club founding membership'] },
            { tier:'Growth Partner',     range:'$75K – $199,999', hot:true, perks:['All Community Investor perks','Quarterly investor briefings','Hub Advisory Board observer seat','Full Appendix F Cashflow Model'] },
            { tier:'Founding Investor',  range:'$200K+',          hot:false, perks:['All Growth Partner perks','Named feature in Hub signage','Annual private cider pairing dinner','Equity participation eligible'] },
          ].map(({ tier, range, hot, perks }) => (
            <FadeIn key={tier}>
              <div style={{ padding: '32px 28px', background: hot ? 'rgba(196,98,45,.08)' : 'rgba(255,255,255,.020)', border: `1px solid ${hot ? 'rgba(196,98,45,.32)' : HP.border}`, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {hot && <div style={{ position: 'absolute', top: -1, left: 28, right: 28, height: 2, background: `linear-gradient(90deg,${HP.terracotta},${HP.gold})` }} />}
                <div>
                  <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.28em', textTransform: 'uppercase', color: hot ? HP.terracotta : `${HP.cream}35`, marginBottom: 6 }}>{hot ? '★ Most Inquired' : '\u00A0'}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: HP.cream, marginBottom: 4 }}>{tier}</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {perks.map(p => (
                    <li key={p} style={{ fontFamily: 'Inter,sans-serif', fontSize: 12.5, color: `${HP.wheat}`, opacity: .52, display: 'flex', gap: 8, lineHeight: 1.5 }}>
                      <span style={{ color: HP.terracotta, flexShrink: 0 }}>◈</span>{p}
                    </li>
                  ))}
                </ul>
                <a href="/investors" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', textDecoration: 'none', padding: '13px 24px', textAlign: 'center', background: hot ? HP.terracotta : 'transparent', color: hot ? HP.parchment : `${HP.cream}42`, border: hot ? 'none' : `1px solid rgba(245,236,215,.12)`, transition: 'all .25s', fontWeight: hot ? 600 : 400 }}
                  onMouseEnter={e => { if (!hot) { e.currentTarget.style.borderColor='rgba(196,98,45,.4)'; e.currentTarget.style.color=HP.cream; } else e.currentTarget.style.background='#a8521f'; }}
                  onMouseLeave={e => { if (!hot) { e.currentTarget.style.borderColor='rgba(245,236,215,.12)'; e.currentTarget.style.color=`${HP.cream}42`; } else e.currentTarget.style.background=HP.terracotta; }}
                >Request Info</a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Milestone Timeline ──────────────────────────────────────────────────────
const ROAD_PHASES = [
  {
    num: '01', name: 'The Foundation', status: 'complete', badge: '✓ Complete',
    items: [
      { title: 'Operational Blueprint', body: 'With our business plan and financial modeling complete, we have established a robust framework for financial sustainability, market success, and grant eligibility.' },
      { title: 'Site Secured',          body: 'We identified our home in the East Lohman Ave corridor, anchoring the West Picacho MRA redevelopment.' },
      { title: 'Building Partnerships', body: 'We have cultivated a strong network of support, including key regional organizations like WESST, SCORE, NMSU/DACC, the Las Cruces SBDC, Elevate Las Cruces, and Visit Las Cruces.' },
    ],
  },
  {
    num: '02', name: 'Building Momentum', status: 'active', badge: 'In Progress',
    items: [
      { title: 'Scaling Up',     body: 'We are currently in the midst of our capital raise and are curating an exceptional founding cohort of 10–13 local vendors.' },
      { title: 'The Build-Out',  body: 'Moving from plans to physical space, we will begin permitting and construction, transforming our site into a state-of-the-art culinary destination.' },
      { title: 'The Big Reveal', body: 'Following a private soft-launch for our closest partners and supporters, we will open our doors to the public for our Grand Opening.' },
    ],
  },
];

function RoadPhaseBlock({ phase, delay }) {
  const complete = phase.status === 'complete';
  const active = phase.status === 'active';
  const accent = complete ? HP.terracotta : HP.gold;
  return (
    <FadeIn delay={delay} style={{ height: '100%' }}>
      <div style={{
        position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
        padding: 'clamp(32px,3.5vw,48px)',
        background: active ? 'linear-gradient(165deg, rgba(212,168,75,.06) 0%, rgba(196,98,45,.03) 100%)' : 'rgba(255,255,255,.018)',
        border: `1px solid ${active ? 'rgba(212,168,75,.28)' : HP.border}`,
        borderTop: `2px solid ${accent}`,
      }}>
        {/* Phase header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span aria-hidden="true" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(48px,6vw,72px)', fontWeight: 200, fontStyle: 'italic', color: accent, lineHeight: .85, letterSpacing: '-.02em', opacity: complete ? 1 : .9 }}>{phase.num}</span>
            <div>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.32em', textTransform: 'uppercase', color: `${accent}cc`, marginBottom: 6 }}>Phase {phase.num}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px,3vw,34px)', fontWeight: 300, color: HP.cream, lineHeight: 1.05, letterSpacing: '-.01em' }}>{phase.name}</h3>
            </div>
          </div>
          <span style={{
            fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.24em', textTransform: 'uppercase', color: accent,
            border: `1px solid ${accent}55`, background: `${accent}10`, padding: '5px 12px', whiteSpace: 'nowrap', marginTop: 18,
          }}>{phase.badge}</span>
        </div>

        {/* Items */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Vertical connector */}
          <div aria-hidden="true" style={{ position: 'absolute', left: 6, top: 16, bottom: 16, width: 1, background: `linear-gradient(180deg, ${accent}80 0%, ${accent}25 80%, transparent)` }} />
          {phase.items.map((item, i) => (
            <li key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 16, padding: '14px 0', alignItems: 'flex-start' }}>
              {/* Dot */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: 8 }}>
                <span aria-hidden="true" style={{
                  width: 13, height: 13, borderRadius: '50%',
                  border: `1.5px solid ${accent}`,
                  background: complete ? accent : (active && i === 0 ? `${accent}30` : 'transparent'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active && i === 0 ? `0 0 0 4px ${accent}18` : 'none',
                }}>
                  {complete && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={HP.parchment} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                </span>
              </div>
              {/* Content */}
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 400, color: HP.cream, lineHeight: 1.25, marginBottom: 6, letterSpacing: '-.003em' }}>{item.title}</div>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13.5, lineHeight: 1.72, color: HP.wheat, opacity: .58, margin: 0 }}>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

function HPTimeline() {
  return (
    <section id="timeline" style={{ background: HP.bg, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)', borderTop: `1px solid ${HP.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge="The Road Ahead" title="The Road to Cider &amp; Spice" subtitle="We are building more than a food hall — we are building a community hub. Here is how we have arrived at this stage and where we are headed." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(16px,2.5vw,28px)', alignItems: 'stretch', marginTop: 12 }}>
          {ROAD_PHASES.map((phase, i) => (
            <RoadPhaseBlock key={phase.num} phase={phase} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA / Newsletter ────────────────────────────────────────────────────────
function HPCta() {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  return (
    <section id="cta" style={{ background: HP.bgDeep, borderTop: `1px solid ${HP.border}`, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge="Get Involved" title="Join the Movement" subtitle="Las Cruces is ready for something like this. Here's how to be part of it from the very beginning." />

        {/* 3 action cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 3, marginBottom: 64 }}>
          {[
            { icon:'◈', title:'Apply as a Vendor',      body:"Have a food concept? Applications are open for our founding cohort of 10–13 stall vendors launching Q1–Q2 2027.", cta:'Start Your Application →', href:'/vendors', hot:true },
            { icon:'◉', title:'Join the Cider Club',    body:'Get early access, exclusive event invitations, and member pricing at the craft cider bar. Three tiers available.', cta:'Explore Membership →', href:'/cider-club', hot:false },
            { icon:'✦', title:'Invest in the Hub',      body:'Seeking $1.5M in total capital — qualifying for six grant categories with 17–20% illustrative projected IRR.', cta:'View Investor Overview →', href:'/investors', hot:false },
          ].map(({ icon, title, body, cta, href, hot }) => (
            <FadeIn key={title}>
              <div style={{ padding: '36px 28px', background: hot ? 'rgba(196,98,45,.07)' : 'rgba(255,255,255,.020)', border: `1px solid ${hot ? 'rgba(196,98,45,.28)' : HP.border}`, height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: hot ? HP.terracotta : `${HP.gold}80` }}>{icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 300, color: HP.cream }}>{title}</h3>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.75, color: HP.wheat, opacity: .53, flex: 1 }}>{body}</p>
                <a href={href} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: hot ? HP.parchment : `${HP.cream}44`, textDecoration: 'none', padding: '13px 0', borderTop: `1px solid ${hot ? 'rgba(196,98,45,.28)' : HP.border}`, transition: 'color .25s' }}
                  onMouseEnter={e => e.currentTarget.style.color = hot ? HP.gold : HP.cream}
                  onMouseLeave={e => e.currentTarget.style.color = hot ? HP.parchment : `${HP.cream}44`}
                >{cta}</a>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Newsletter */}
        <FadeIn>
          <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: HP.cream, marginBottom: 8 }}>Be First to Know</div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: HP.wheat, opacity: .50, marginBottom: 24 }}>Opening announcements, vendor spotlights, and early-access invitations — straight to your inbox.</p>
            {sent ? (
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', color: HP.terracotta, padding: '20px', border: `1px solid rgba(196,98,45,.28)` }}>✓ You're on the list</div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSent(true); }} style={{ display: 'flex', gap: 0 }}>
                <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ flex: 1, background: 'rgba(255,255,255,.04)', border: `1px solid ${HP.border}`, borderRight: 'none', padding: '13px 18px', fontFamily: 'Inter,sans-serif', fontSize: 13, color: HP.cream, outline: 'none' }} />
                <button type="submit" style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', background: HP.terracotta, color: HP.parchment, border: 'none', padding: '13px 28px', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap', transition: 'background .25s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#a8521f'}
                  onMouseLeave={e => e.currentTarget.style.background = HP.terracotta}
                >Notify Me →</button>
              </form>
            )}
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 10.5, color: `${HP.cream}28`, marginTop: 10 }}>No spam · Unsubscribe anytime</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function HPFooter() {
  const col = [
    { title:'The Space', links:[['The Hub','#'],['How It Works','#howitworks'],['Cider Bar','#'],['Interactive Floor Plan','/floor-plan']] },
    { title:'Join Us',   links:[['Apply as a Vendor','/vendors'],['Vendor Onboarding','/vendors/onboarding'],['Incubator Program','/incubator'],['Cider Club','/cider-club']] },
    { title:'Invest',    links:[['Investor Overview','/investors'],['FAQ','#'],['Contact Us','mailto:info@lccullinaryhub.com']] },
  ];
  return (
    <footer style={{ background: HP.bgDeep, borderTop: `1px solid ${HP.border}`, padding: 'clamp(56px,7vw,80px) clamp(24px,5vw,72px) 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(3,1fr)', gap: 40, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, fontWeight: 300, color: HP.cream, marginBottom: 6 }}>Cider <em style={{ fontStyle:'italic', color:HP.terracotta }}>&amp;</em> Spice</div>
            <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.28em', textTransform: 'uppercase', color: `${HP.cream}35`, marginBottom: 18 }}>Las Cruces Culinary Innovation Hub</div>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 12.5, lineHeight: 1.7, color: `${HP.wheat}`, opacity: .40, maxWidth: 280, marginBottom: 24 }}>Opening Q1–Q2 2027 · Downtown Las Cruces, NM</p>
            <div style={{ display: 'flex', gap: 14 }}>
              {[['IG','https://instagram.com/lccullinaryhub'],['FB','https://facebook.com/lccullinaryhub'],['TK','https://tiktok.com/@lccullinaryhub']].map(([l,h]) => (
                <a key={l} href={h} style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.18em', textTransform: 'uppercase', color: `${HP.cream}30`, textDecoration: 'none', border: `1px solid ${HP.border}`, padding: '7px 11px', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,98,45,.35)'; e.currentTarget.style.color = HP.terracotta; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = HP.border; e.currentTarget.style.color = `${HP.cream}30`; }}
                >{l}</a>
              ))}
            </div>
          </div>
          {/* Link cols */}
          {col.map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.32em', textTransform: 'uppercase', color: `${HP.cream}30`, marginBottom: 20 }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(([l, h]) => (
                  <a key={l} href={h} style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: `${HP.cream}45`, textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = HP.cream}
                    onMouseLeave={e => e.currentTarget.style.color = `${HP.cream}45`}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${HP.border}`, paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 11.5, color: `${HP.cream}25` }}>© 2026 Cider &amp; Spice LLC · Las Cruces, New Mexico</span>
          <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.28em', textTransform: 'uppercase', color: `${HP.cream}20` }}>✦ Opening Q1–Q2 2027 ✦</span>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: `${HP.cream}18`, maxWidth: 500, textAlign: 'right' }}>Forward-looking financial projections are for informational purposes only and do not constitute an offer of securities.</span>
        </div>
      </div>
    </footer>
  );
}

// ── FAQ Accordion ───────────────────────────────────────────────────────────
const FAQS = [
  { q:'When does the Hub open?', a:"We're targeting a Grand Opening in Q1–Q2 2027 in downtown Las Cruces, New Mexico. Pre-register for the Cider Club or sign up for our newsletter to be the first to know when we announce the exact date." },
  { q:'What cuisines will be available?', a:"The Hub will feature 10–13 distinct food concepts: traditional New Mexican, Mexican street food, Southern BBQ, Mediterranean and plant-forward cuisine, Asian fusion and ramen, desserts and baked goods, and 2–3 rotating incubator stalls showcasing emerging local chefs." },
  { q:'What is the Cider Club and how do I join?', a:"The Cider Club is our tiered monthly membership — Taster ($25/mo) for tasting flights and discounts, Enthusiast ($45/mo) for reserved seating and producer events, and Founding Member ($85/mo) for unlimited flights, a private-label seasonal bottle, and quarterly pairing dinners." },
  { q:'How do I apply for a vendor or incubator stall?', a:"Stalls start at $800–$1,100/month and include access to a fully equipped commercial kitchen. Every vendor receives weekly coaching, NMED permitting guidance, POS training, and a clear three-stage pathway. 70% of stalls are reserved for first-time, minority, veteran, or immigrant entrepreneurs." },
  { q:'Where exactly will the Hub be located?', a:"The Hub will be located on East Lohman Ave in downtown Las Cruces — within a zoning area designated Urban Character under the Realize Las Cruces 2025 Zoning Code, directly within an active MRA redevelopment zone. The exact address will be announced when the site agreement is finalized." },
  { q:'How can I invest or provide grant funding?', a:"The Hub is seeking $1,505,000 in total project capital through an SBA 7(a) loan and complementary grant sources including CDBG, NM MainStreet, EDA, and USDA Rural Development. Visit the Investors section above or contact us at info@lccullinaryhub.com." },
];

function HPFaq() {
  const [open, setOpen] = React.useState(null);
  return (
    <section id="faq" style={{ background: HP.bgDeep, borderTop: `1px solid ${HP.border}`, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow badge="FAQ" title="Common Questions" subtitle="Everything you need to know before opening day." />
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ borderTop: `1px solid ${isOpen ? 'rgba(196,98,45,.22)' : HP.border}`, transition: 'border-color .3s' }}>
                  <button onClick={() => setOpen(isOpen ? null : i)} style={{ width:'100%', background:'none', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 0', gap:20, textAlign:'left' }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:21, fontWeight:300, color:isOpen?HP.cream:`${HP.cream}cc`, lineHeight:1.2, transition:'color .25s' }}>{faq.q}</span>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:isOpen?HP.terracotta:`${HP.cream}28`, lineHeight:1, flexShrink:0, transition:'all .3s ease', transform:isOpen?'rotate(45deg)':'rotate(0deg)', display:'block' }}>+</span>
                  </button>
                  <div style={{ overflow:'hidden', maxHeight:isOpen?360:0, opacity:isOpen?1:0, transition:'max-height .42s ease, opacity .35s ease' }}>
                    <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, lineHeight:1.82, color:HP.wheat, opacity:.58, paddingBottom:26 }}>{faq.a}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
          <div style={{ borderTop: `1px solid ${HP.border}` }} />
        </div>
      </div>
    </section>
  );
}

// ── Ask a Question ──────────────────────────────────────────────────────────
function HPAskQuestion() {
  const [name,  setName]  = React.useState('');
  const [email, setEmail] = React.useState('');
  const [q,     setQ]     = React.useState('');
  const [sent,  setSent]  = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    try { setCount(JSON.parse(localStorage.getItem('cs_questions') || '[]').length); } catch {}
  }, []);

  const submit = e => {
    e.preventDefault();
    if (!name.trim() || !q.trim()) return;
    const entry = { id: Date.now(), name: name.trim(), email: email.trim(), question: q.trim(), ts: new Date().toISOString(), status: 'new' };
    try {
      const existing = JSON.parse(localStorage.getItem('cs_questions') || '[]');
      localStorage.setItem('cs_questions', JSON.stringify([entry, ...existing]));
    } catch {}
    setSent(true);
  };

  const inputSt = { width: '100%', background: 'rgba(255,255,255,.04)', border: `1px solid ${HP.border}`, padding: '13px 16px', fontFamily: 'Inter,sans-serif', fontSize: 14, color: HP.cream, display: 'block', outline: 'none', transition: 'border-color .25s' };
  const labelSt = { fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.24em', textTransform: 'uppercase', color: `${HP.cream}45`, display: 'block', marginBottom: 7 };

  return (
    <section id="ask" style={{ background: HP.bg, borderTop: `1px solid ${HP.border}`, padding: 'clamp(80px,10vw,112px) clamp(24px,5vw,72px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(40px,6vw,96px)', alignItems: 'start' }}>

        {/* Left — context */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: HP.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 9, letterSpacing: '.35em', textTransform: 'uppercase', color: HP.terracotta }}>Questions &amp; Answers</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,5vw,54px)', fontWeight: 300, color: HP.cream, lineHeight: .95, marginBottom: 22 }}>
            Something on<br /><em style={{ fontStyle: 'italic', color: HP.terracotta }}>Your Mind?</em>
          </h2>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, lineHeight: 1.82, color: HP.wheat, opacity: .56, marginBottom: 36, maxWidth: 400 }}>
            Whether you're curious about vendor stalls, the Cider Club, investment tiers, or just want to know more about what's coming — ask us directly. We read every question personally.
          </p>
          {/* Trust signals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['◈', 'Every question is read by the founding team'],
              ['◉', 'We respond by email within 2 business days'],
              ['✦', 'Great questions may be added to the FAQ'],
            ].map(([icon, txt]) => (
              <div key={txt} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: HP.terracotta, fontFamily: "'Cormorant Garamond',serif", fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 13.5, color: HP.wheat, opacity: .52, lineHeight: 1.5 }}>{txt}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Right — form */}
        <FadeIn delay={0.15}>
          {sent ? (
            <div style={{ padding: '48px 36px', border: `1px solid rgba(196,98,45,.3)`, background: 'rgba(196,98,45,.06)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, color: HP.terracotta, marginBottom: 12 }}>◉</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 300, color: HP.cream, marginBottom: 10 }}>Question received</h3>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, lineHeight: 1.7, color: HP.wheat, opacity: .52 }}>Thanks {name.split(' ')[0]} — we'll get back to you within 2 business days.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ padding: 'clamp(24px,3vw,36px)', background: 'rgba(255,255,255,.022)', border: `1px solid ${HP.border}`, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: HP.cream, marginBottom: 4 }}>Ask a Question</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelSt}>Your Name *</label>
                  <input required type="text" placeholder="First Last" value={name} onChange={e => setName(e.target.value)} style={inputSt}
                    onFocus={e => e.target.style.borderColor='rgba(196,98,45,.5)'} onBlur={e => e.target.style.borderColor=HP.border} />
                </div>
                <div>
                  <label style={labelSt}>Email (for reply)</label>
                  <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputSt}
                    onFocus={e => e.target.style.borderColor='rgba(196,98,45,.5)'} onBlur={e => e.target.style.borderColor=HP.border} />
                </div>
              </div>
              <div>
                <label style={labelSt}>Your Question *</label>
                <textarea required rows={5} placeholder="What would you like to know about Cider &amp; Spice?" value={q} onChange={e => setQ(e.target.value)}
                  style={{ ...inputSt, resize: 'vertical', lineHeight: 1.65 }}
                  onFocus={e => e.target.style.borderColor='rgba(196,98,45,.5)'} onBlur={e => e.target.style.borderColor=HP.border} />
              </div>
              {/* Topic chips */}
              <div>
                <div style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 7.5, letterSpacing: '.22em', textTransform: 'uppercase', color: `${HP.cream}35`, marginBottom: 8 }}>Quick topic — tap to fill</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Vendor stall availability','Cider Club membership','Investment tiers','Opening date','Commissary kitchen','Incubator program'].map(topic => (
                    <button key={topic} type="button" onClick={() => setQ(prev => prev ? prev : `I have a question about: ${topic}. `)}
                      style={{ fontFamily: "'Josefin Sans',sans-serif", fontSize: 8, letterSpacing: '.16em', textTransform: 'uppercase', padding: '6px 12px', border: `1px solid rgba(245,236,215,.10)`, background: 'transparent', color: `${HP.cream}42`, cursor: 'pointer', transition: 'all .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(196,98,45,.35)'; e.currentTarget.style.color=HP.parchment; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(245,236,215,.10)'; e.currentTarget.style.color=`${HP.cream}42`; }}
                    >{topic}</button>
                  ))}
                </div>
              </div>
              <button type="submit" style={{ background: HP.terracotta, color: HP.parchment, border: 'none', padding: '15px 24px', fontFamily: "'Josefin Sans',sans-serif", fontSize: 9.5, letterSpacing: '.24em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600, transition: 'background .25s' }}
                onMouseEnter={e => e.currentTarget.style.background='#a8521f'} onMouseLeave={e => e.currentTarget.style.background=HP.terracotta}
              >Send Your Question →</button>
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: `${HP.cream}28`, textAlign: 'center' }}>We do not sell or share your information.</p>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

Object.assign(window, { HPStats, HPTimeline, HPFaq, HPAskQuestion, HPCta, HPFooter });
