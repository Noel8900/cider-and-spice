// inv-bottom.jsx — FAQs + Form side-by-side, Footer

const FAQS_DATA = [
  { q: 'What is the minimum investment?', a: 'The minimum check size is $25,000 (Community Investor tier). All discussions are conducted privately — there are no online transactions. Submit a request and we\'ll follow up within 48 hours.' },
  { q: 'What investment structures are available?', a: 'The Hub supports direct equity, convertible notes, and grant co-investment. Structure is discussed individually based on each investor\'s profile, timeline, and objectives.' },
  { q: 'When is the expected cash flow breakeven?', a: 'The Appendix F model projects breakeven between months 18 and 20. The Year 1 ramp loss (−$287K) is fully modeled and covered by the working capital reserve built into the $1.505M raise.' },
  { q: 'Can I review the full financial model?', a: 'Yes. The complete Appendix F Cashflow Model is shared after your initial inquiry is reviewed. We respond within 48 hours with the executive summary, capital stack, and Appendix F snapshot.' },
  { q: 'What if targeted grants are not awarded?', a: 'The SBA 7(a) + owner equity stack fully covers the build without any grant. Grants reduce investor equity and improve returns — but the capital structure is not grant-dependent. No capital is committed before a documented award.' },
  { q: 'Has a site been selected?', a: 'Four candidates are under parallel diligence: West Picacho/Motel Blvd MRA, Pan Am/University Ave, 3400 W Picacho, and Mesilla Valley Mall. No capital is committed until broker, zoning, cost, and site terms are fully confirmed.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: `1px solid rgba(232,193,141,0.1)` }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.3rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1.25rem' }}>
        <span style={{ fontFamily: INV_F.d, fontSize: '1.08rem', fontWeight: 400, color: INV.parch, lineHeight: 1.3 }}>{q}</span>
        <span style={{ color: INV.ter, fontSize: '1.2rem', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: '1.3rem' }}>
          <p style={{ fontFamily: INV_F.b, fontSize: '0.875rem', color: INV.wheat, opacity: 0.6, lineHeight: 1.88 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Inquiry Form ──────────────────────────────────────────────────────────────

const RANGES = [
  { value: '',              label: 'Select a range…',           disabled: true },
  { value: '$25K–$74,999', label: '$25,000 – $74,999'                         },
  { value: '$75K–$199,999',label: '$75,000 – $199,999'                        },
  { value: '$200K+',       label: '$200,000+'                                 },
  { value: 'grant',        label: 'Grant / Non-dilutive Funder'               },
  { value: 'other',        label: 'Other / Not yet determined'                },
];

function InvFaqAndForm() {
  const isMobile = useIsMobile();
  const [form, setForm]   = React.useState({ name: '', email: '', org: '', range: '', msg: '' });
  const [status, setStatus] = React.useState('idle');

  const field = {
    width: '100%', background: INV.surf, border: `1px solid rgba(192,98,42,0.2)`,
    padding: '12px 16px', color: INV.parch, fontFamily: INV_F.b, fontSize: '0.875rem',
    outline: 'none', transition: 'border-color 0.2s', display: 'block',
  };
  const upd = key => e => setForm(p => ({ ...p, [key]: e.target.value }));
  const fOn  = e => e.target.style.borderColor = 'rgba(192,98,42,0.5)';
  const fOff = e => e.target.style.borderColor = 'rgba(192,98,42,0.2)';

  async function submit(e) {
    e.preventDefault(); setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xlgzzezb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, organization: form.org, investment_range: form.range, message: form.msg }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  }

  function Lbl({ children }) {
    return <label style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, display: 'block', marginBottom: '6px' }}>{children}</label>;
  }

  return (
    <section id="inquiry" style={{ borderTop: `1px solid ${INV.bord}`, paddingTop: '5.5rem', paddingBottom: '6rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '4rem' : '5rem', alignItems: 'start' }}>

        {/* ── FAQ column ── */}
        <div>
          <SectionHead num="07" eyebrow="Due Diligence" title="Frequently Asked Questions" style={{ marginBottom: '2rem' }} />
          {FAQS_DATA.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}

          {/* Quick contact */}
          <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: INV.surf, borderLeft: `2px solid rgba(192,98,42,0.3)` }}>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.ter, marginBottom: '0.5rem' }}>Direct Contact</div>
            <a href="mailto:noelj0858@gmail.com" style={{ fontFamily: INV_F.b, fontSize: '0.88rem', color: INV.parch, textDecoration: 'none', opacity: 0.75 }}>noelj0858@gmail.com</a>
            <p style={{ fontFamily: INV_F.b, fontSize: '0.78rem', color: INV.wheat, opacity: 0.35, marginTop: '0.4rem', lineHeight: 1.65 }}>All inquiries reviewed within 48 hours.</p>
          </div>
        </div>

        {/* ── Form column ── */}
        <div>
          <SectionHead num="08" eyebrow="Get Started" title="Request the Investor Package" style={{ marginBottom: '2rem' }} />
          <p style={{ fontFamily: INV_F.b, fontSize: '0.88rem', color: INV.wheat, opacity: 0.45, lineHeight: 1.85, marginBottom: '2rem' }}>
            Submit your details. We respond within 48 hours with the executive summary, capital stack overview, and Appendix F financial snapshot.
          </p>

          {status === 'success' ? (
            <div style={{ padding: '3rem 2rem', background: INV.surf, textAlign: 'center' }}>
              <span style={{ fontFamily: INV_F.d, fontSize: '3rem', color: INV.ter, display: 'block', marginBottom: '1.25rem', lineHeight: 1 }} aria-hidden="true">◈</span>
              <h3 style={{ fontFamily: INV_F.d, fontSize: '2rem', fontWeight: 300, color: INV.parch, marginBottom: '0.75rem', lineHeight: 1.1 }}>Inquiry Received</h3>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.88rem', color: INV.wheat, opacity: 0.58, lineHeight: 1.82 }}>
                We'll follow up within <strong style={{ color: INV.parch }}>48 hours</strong> with the executive summary, capital stack, and Appendix F snapshot.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <Lbl>Full Name *</Lbl>
                  <input type="text" required value={form.name} onChange={upd('name')} placeholder="Jane Smith" style={field} onFocus={fOn} onBlur={fOff} />
                </div>
                <div>
                  <Lbl>Email *</Lbl>
                  <input type="email" required value={form.email} onChange={upd('email')} placeholder="jane@example.com" style={field} onFocus={fOn} onBlur={fOff} />
                </div>
              </div>
              <div>
                <Lbl>Organization / Fund <span style={{ opacity: 0.5 }}>— optional</span></Lbl>
                <input type="text" value={form.org} onChange={upd('org')} placeholder="Acme Capital" style={field} onFocus={fOn} onBlur={fOff} />
              </div>
              <div>
                <Lbl>Investment Range *</Lbl>
                <select required value={form.range} onChange={upd('range')} style={{ ...field, appearance: 'none', cursor: 'pointer' }} onFocus={fOn} onBlur={fOff}>
                  {RANGES.map(({ value, label, disabled }) => (
                    <option key={value} value={value} disabled={!!disabled}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Lbl>Message <span style={{ opacity: 0.5 }}>— optional</span></Lbl>
                <textarea rows={4} value={form.msg} onChange={upd('msg')} placeholder="Questions, context, or timeline…" style={{ ...field, resize: 'vertical', minHeight: '90px' }} onFocus={fOn} onBlur={fOff} />
              </div>
              {status === 'error' && (
                <p role="alert" style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: '#f87171', padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)' }}>
                  Something went wrong. Email <a href="mailto:noelj0858@gmail.com" style={{ color: '#f87171' }}>noelj0858@gmail.com</a> directly.
                </p>
              )}
              <button type="submit" disabled={status === 'sending'}
                style={{ background: INV.ter, color: INV.parch, border: 'none', padding: '16px 44px', fontFamily: INV_F.l, fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.6 : 1, transition: 'all 0.2s', alignSelf: 'flex-start' }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = INV.terHov; }}
                onMouseLeave={e => e.currentTarget.style.background = INV.ter}>
                {status === 'sending' ? 'Submitting…' : 'Request Investor Package'}
              </button>
              <p style={{ fontFamily: INV_F.b, fontSize: '0.7rem', color: INV.wheat, opacity: 0.22, lineHeight: 1.65, marginTop: '0.25rem' }}>
                Not a registered securities offering. All discussions conducted privately with qualified reviewers.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function InvFooter() {
  const ALIGNED = ['Elevate Las Cruces', 'Visit Las Cruces', 'NM MainStreet', 'East Lohman Dev. Plan', 'Opportunity Zone Program'];
  return (
    <footer style={{ background: INV.bgDark, borderTop: `1px solid ${INV.bord}`, padding: '3.5rem 2.5rem 2.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontFamily: INV_F.d, fontSize: '1.45rem', color: INV.parch, marginBottom: '0.4rem' }}>
              Cider <em style={{ fontStyle: 'italic', color: INV.ter }}>&amp;</em> Spice
            </div>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.28, marginBottom: '1rem' }}>Las Cruces Food Hall · Opening Q1–Q2 2027</div>
            <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.3, lineHeight: 1.75 }}>
              Southern New Mexico's first food hall and craft cider destination.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: INV.ter, marginBottom: '1.2rem' }}>Investor Contact</div>
            <p style={{ fontFamily: INV_F.b, fontSize: '0.82rem', color: INV.wheat, opacity: 0.4, lineHeight: 1.75, marginBottom: '0.75rem' }}>Reviewed within 48 hours. Full financial package shared upon qualification.</p>
            <a href="mailto:noelj0858@gmail.com" style={{ fontFamily: INV_F.l, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.ter, textDecoration: 'none' }}>noelj0858@gmail.com</a>
          </div>
          <div>
            <div style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: INV.ter, marginBottom: '1.2rem' }}>Aligned With</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {ALIGNED.map(org => <span key={org} style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.32 }}>{org}</span>)}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(232,193,141,0.07)`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-start' }}>
          <p style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.2 }}>© 2026 Cider &amp; Spice LLC · Las Cruces, NM</p>
          <p style={{ fontFamily: INV_F.b, fontSize: '0.68rem', color: INV.wheat, opacity: 0.18, maxWidth: '500px', lineHeight: 1.68, textAlign: 'right' }}>Forward-looking projections are planning-stage estimates and do not constitute an offer of securities. CPA and lender review required before any commitment.</p>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { InvFaqAndForm, InvFooter });
