// inv-nextsteps.jsx — "What Happens Next": the investor's path from first
// contact through the Q1 2027 launch. Mirrors the Class A/B LLC terms and the
// four-phase roadmap established elsewhere on the page.
// Depends on: inv-tokens.jsx (INV, INV_F, SectionHead, useInView, FadeUp)

const NEXT_STEPS = [
  {
    n: '1', title: 'Express Interest', when: 'Within 48 hours',
    body: 'Submit the form below. We respond within two business days with the executive summary, capital-stack overview, and Appendix F financial snapshot. Private, no obligation.',
    who: 'You → Founder',
  },
  {
    n: '2', title: 'Introductory Call & NDA', when: 'Week 1',
    body: 'A direct conversation with the founder. A mutual NDA is executed, and we align on participation tier, check size, and timeline. All discussions are confidential — no online transactions.',
    who: 'Founder · Investor',
  },
  {
    n: '3', title: 'Due Diligence', when: 'Weeks 1–3',
    body: 'Full access to the consolidated business plan (v22), the three-statement model, sensitivity analysis, site diligence, and references. Independent CPA and legal review is encouraged.',
    who: 'Investor · CPA / Counsel',
  },
  {
    n: '4', title: 'Terms & Operating Agreement', when: 'Weeks 3–5',
    body: 'Class B subscription under the two-class New Mexico LLC: 8% cumulative preferred return, the SBA-first distribution waterfall, and a Year-5 operator buyout at 3.0× trailing EBITDA (1.5× floor). Reviewed and signed.',
    who: 'Both parties',
  },
  {
    n: '5', title: 'Capital Close', when: 'Q3–Q4 2026',
    body: 'Funds are committed alongside the SBA 7(a) close and grant deployment, completing the $1.502M capital stack. You become a Class B member of the LLC.',
    who: 'Investor · Lender · Grants',
  },
  {
    n: '6', title: 'Construction → Launch', when: 'Q4 2026 – Q1 2027',
    body: 'Leasehold buildout, vendor onboarding, and grand opening in Q1 2027. Quarterly investor reporting and the 8% preferred-return waterfall begin once the Hub is operating.',
    who: 'Founder · Investors',
    current: true,
  },
];

function NextStepRow({ step, inView, delay }) {
  const [hov, setHov] = React.useState(false);
  return (
    <FadeUp delay={delay}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch', position: 'relative' }}>
        {/* Marker */}
        <div style={{ flexShrink: 0, width: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '48px', height: '48px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: INV.bgDark, border: `1px solid ${step.current ? INV.ter : 'rgba(192,98,42,0.4)'}`,
            boxShadow: step.current ? '0 0 0 4px rgba(192,98,42,0.12)' : 'none',
            position: 'relative', zIndex: 1,
          }}>
            <span style={{ fontFamily: INV_F.d, fontSize: '1.5rem', fontWeight: 400, color: INV.ter, lineHeight: 1 }}>{step.n}</span>
          </div>
        </div>
        {/* Card */}
        <div
          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{
            flex: 1, marginBottom: '1rem',
            background: step.current ? 'rgba(192,98,42,0.07)' : INV.bg,
            border: `1px solid ${step.current ? 'rgba(192,98,42,0.38)' : hov ? 'rgba(192,98,42,0.28)' : INV.bord}`,
            boxShadow: hov ? '0 14px 34px -24px rgba(0,0,0,0.7)' : 'none',
            transform: hov ? 'translateY(-3px)' : 'none',
            transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, box-shadow 0.25s',
            padding: '1.4rem 1.6rem',
          }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.55rem' }}>
            <span style={{ fontFamily: INV_F.d, fontSize: '1.4rem', fontWeight: 400, color: INV.parch, lineHeight: 1.15 }}>{step.title}</span>
            <span style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.ter, opacity: 0.85, whiteSpace: 'nowrap' }}>{step.when}</span>
          </div>
          <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.56, lineHeight: 1.8, margin: '0 0 0.85rem' }}>{step.body}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4 }}>
            <span style={{ width: '14px', height: '1px', background: INV.ter, opacity: 0.6, display: 'block' }} aria-hidden="true" />
            {step.who}
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

function InvNextSteps() {
  const [ref, inView] = useInView(0.08);
  return (
    <section id="next-steps" ref={ref} style={{ paddingBottom: '5rem' }}>
      <SectionHead num="10" eyebrow="What Happens Next" title="From First Conversation to Opening Day" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.42, marginBottom: '2.5rem', maxWidth: '44rem', lineHeight: 1.82 }}>
        Expressing interest starts a private, no-obligation conversation. Here is the path from your first message to a built, open Hub in Q1 2027 — typically four to five weeks from intro to signed terms, then through the capital close and buildout.
      </p>

      <div style={{ position: 'relative' }}>
        {/* Connector rail (behind markers) */}
        <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '60px', width: '2px', background: 'rgba(232,193,141,0.13)' }} aria-hidden="true" />
        <div style={{ position: 'absolute', left: '23px', top: '24px', height: inView ? 'calc(100% - 110px)' : '0%', width: '2px', background: INV.ter, opacity: 0.55, transition: 'height 1.8s cubic-bezier(0.16,1,0.3,1) 0.25s' }} aria-hidden="true" />

        {NEXT_STEPS.map((step, i) => (
          <NextStepRow key={step.n} step={step} inView={inView} delay={i * 0.08} />
        ))}
      </div>

      {/* Closing note + CTA */}
      <div style={{ marginTop: '1.75rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', padding: '1.6rem 1.9rem', background: INV.surf, borderLeft: `3px solid rgba(192,98,42,0.35)` }}>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.5, lineHeight: 1.75, margin: 0, maxWidth: '40rem' }}>
          Minimum check $25K. All discussions are conducted privately. This page is informational only and is not an offer to sell securities — any investment is made solely under the executed Operating Agreement.
        </p>
        <a href="#inquiry"
          style={{ display: 'inline-block', flexShrink: 0, background: INV.ter, color: INV.parch, textDecoration: 'none', padding: '13px 30px', fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'background 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = INV.terHov; }}
          onMouseLeave={e => { e.currentTarget.style.background = INV.ter; }}>
          Request the Investor Package
        </a>
      </div>
    </section>
  );
}

Object.assign(window, { InvNextSteps });
