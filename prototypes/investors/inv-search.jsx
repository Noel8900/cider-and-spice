// inv-search.jsx — Interactive Business Plan AI Search

const BP_CONTEXT = `You are an investor assistant for Cider & Spice (Las Cruces Culinary Innovation Hub). Answer investor questions precisely and professionally using only the data below. Keep answers under 130 words. Cite specific numbers. Do not speculate.

---
COMPANY: Cider & Spice — Southern NM's first food hall, culinary incubator, commissary kitchen & craft cider bar. Las Cruces, NM. Q1–Q2 2027 opening. ~8,000 sq ft. Business Plan v12.0 (April 2026). Contact: noelj0858@gmail.com.

FINANCIALS — TWO VIEWS (both valid, different purposes):
VIEW 1 — Stabilized run-rate (Section 7, for investor return modeling):
  Year 1: $1,005,000 revenue / $114,000 EBITDA (11%) at 70% occupancy
  Year 2: $1,430,000 / $384,000 EBITDA (27%)
  Year 3: $1,700,000 / $570,000 EBITDA (34%)
  3-yr cumulative EBITDA: $1.068M | Investor ROI: 85% (3-yr) | IRR: 17–20% illustrative

VIEW 2 — GAAP ramp model (Appendix F.2, PRIMARY for SBA/grant use):
  Year 1: $757,000 revenue / ($287,400) EBITDA loss — ramp year, funded by working capital reserve
  Year 2: $55,000 EBITDA
  Year 3: $317,000 EBITDA
  Cumulative 3-yr GAAP net loss: ($344,100)
  Cash flow breakeven: Month 18–20

CAPITAL ($1.3M–$1.4M total project requirement):
- Owner equity: $0 cash (funded by pre-opening grants)
- SBA 7(a) loan: $700K–$900K — pre-qualification in progress
- Grants targeted: $405K–$595K total
  WIOA/EmployNM wage reimbursement: $135K–$185K (LARGEST grant — apply Month 1)
  NMFA: $100K–$200K
  HFFF: $75K–$125K
  EPE via MVEDA: $65K–$80K (confirmed $100K precedent for LC businesses)
  DLCP Renovate Main Street: $25K cap
  Workforce/USDA/Tourism: $50K–$100K+
Total available funding: $1.705M–$2.035M (exceeds project need)
Working capital reserve covers Y1 GAAP ramp loss of $287K.

INVESTMENT TIERS (all discussions private, min. $25K):
Community ($25K–$74,999): updates, recognition, Cider Club access, Appendix F summary
Growth Partner ($75K–$199,999): + quarterly briefings, Advisory Board observer, commissary priority, full Appendix F model
Founding ($200K+): + Hub signage, annual cider dinner, equity discussion, 5–15% co-invest in graduating vendors

6 REVENUE STREAMS:
1. Permanent stall rent: $2,800–$3,200/mo × 7–8 stalls
2. Permanent stall % rent: 6% of vendor sales
3. Incubator stall: $2,000–$2,500/mo + 8% sales
4. Ghost kitchen: $1,500–$2,000/mo + 8% commissions
5. Cider bar + Cider Club ($49/$89/$149/mo tiers)
6. Commissary kitchen: $25–$35/hr
7. Event programming, gift shop/retail (50–65% margins), marketing/ancillary

CONFIRMED VENDORS: Yazzie (Japanese katsu+curry+NM chile), Seoul Fire Chicken (Korean double-fry), Sticky Stack Co. (artisan sliders+NM jam)
Pipeline: Río Grande Burritos, Levant Table (Lebanese), Sweet Elevation (NM desserts), Mesita Noodle Co.

MARKET:
- 115K city / 219,561 Doña Ana County / 300K–350K regional draw
- 2.5M out-of-market visitors (2025 Placer data via Visit Las Cruces)
- Zero food halls within 200 miles. Zero craft cider bars within 300 miles.
- NMSU 12,000+ students, Fort Bliss adjacent, AI data center workforce incoming
- West Picacho MRA survey (703 respondents): 51% said restaurants #1 most needed business
- Full-service restaurant receipts: $178.7M (NMTR RP-80)

4 SITE CANDIDATES (parallel diligence):
1. West Picacho / Motel Blvd MRA — strongest grants, TIF up to 75%, city-preferred catalytic site
2. Pan Am / University Ave — NMSU-adjacent, 9,550 SF Colliers listing $14–35/SF NNN
3. 3400 W Picacho Ave — high phasing potential
4. Mesilla Valley Mall — large-format, I-25/I-10 traffic

CITY ALIGNMENT: Directly implements 4 adopted city plans — Elevate Las Cruces (2020), East Lohman Development Plan (2021), W. Picacho/Motel MRA Plan (2026), El Paseo/S. Solano MRA Plan (2025).

JOBS: 50–70 total (16 direct Hub FTE + 18–30 vendor/incubator staff + 1.5× indirect multiplier)

INCUBATOR: 8-stage vendor lifecycle (Outreach → Application → Selection → Academy → Onboarding → Soft Launch → Growth → Graduation). Two-track academy: Track A (8–12 wks, experienced operators) / Track B (24 wks, Semilla-model). 70% of stalls reserved for first-time/minority/veteran/immigrant entrepreneurs. 9 KPIs. Stall backfill within 48 hrs.

KITCHEN: No shared commercial kitchen in Las Cruces today. 7-zone production workflow. NMED compliant. Nearest NM comparable: Kitchen Table Santa Fe (opened 2023, 34 members). Albuquerque waitlists: 18 months.

TIMELINE: SBA pre-qual ✓, capital close ✓, construction Q1 2026, soft open Q3 2026, full ops Q4 2026, breakeven Mo. 18–20.

COMPARABLES: Krog Street (Atlanta) $8–12M, Politan Row (Houston) $6–9M, Findlay Market (Cincinnati) $4–7M. C&S Y3 target ($1.7M) well below comps.

RISK CONTROLS: Y1 GAAP loss modeled and reserved. SBA+grant stack sufficient without any single grant. 4 parallel sites. Liquor license has non-alcoholic fallback. Vendor KPI scorecard + replacement pipeline.
---
If asked about something not covered, say so and suggest emailing noelj0858@gmail.com.`;

const SUGGESTED_QS = [
  'What are the Year 3 financials?',
  'How is the $1.505M structured?',
  'When is cash flow breakeven?',
  'What grants are you targeting?',
  'Who are the confirmed vendors?',
  'What investment tiers are available?',
];

function InvSearch() {
  const [msgs, setMsgs] = React.useState([{
    role: 'ai',
    text: 'I have the full Cider & Spice consolidated business plan in context. Ask me about financials, capital structure, grant programs, vendors, site selection, investment tiers, or anything else.',
  }]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const chatRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [msgs, loading]);

  async function send(question) {
    const q = (typeof question === 'string' ? question : input).trim();
    if (!q || loading) return;
    setInput('');
    setMsgs(prev => [...prev, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const answer = await window.claude.complete({
        messages: [{ role: 'user', content: BP_CONTEXT + '\n\n---\n\nInvestor question: ' + q }],
      });
      setMsgs(prev => [...prev, { role: 'ai', text: answer }]);
    } catch (err) {
      setMsgs(prev => [...prev, { role: 'ai', text: 'I\'m unable to retrieve an answer right now. Please email noelj0858@gmail.com directly for the full investor package — we respond within 48 hours.' }]);
    }
    setLoading(false);
    if (inputRef.current) inputRef.current.focus();
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <section id="search" style={{ background: INV.bgDark, borderTop: `1px solid ${INV.bord}`, borderBottom: `1px solid ${INV.bord}`, padding: '5.5rem 1.5rem' }}>
      <style>{`
        @keyframes inv-dot-pulse { 0% { opacity: 0.35; transform: translateY(0); } 100% { opacity: 1; transform: translateY(-4px); } }
        .inv-chat-input::placeholder { color: rgba(232,193,141,0.28); }
        .inv-chat-input:focus { outline: none; border-color: rgba(192,98,42,0.45) !important; }
        .inv-chip:hover { border-color: rgba(192,98,42,0.5) !important; color: #f7f3ec !important; opacity: 1 !important; }
        .inv-send-btn:hover:not(:disabled) { background: #d4673a !important; }
      `}</style>

      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '2rem' }}>
          <SectionHead num="06" eyebrow="Ask the Business Plan" title="Get Instant Answers from the Consolidated Plan" style={{ marginBottom: '0.75rem' }} />
          <p style={{ fontFamily: INV_F.b, fontSize: '0.85rem', color: INV.wheat, opacity: 0.42, maxWidth: '560px', lineHeight: 1.8 }}>
            Ask anything — financials, capital structure, grant programs, vendors, site options, or investment terms. Powered by AI with the full plan in context.
          </p>
        </div>

        {/* Suggested questions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {SUGGESTED_QS.map(q => (
            <button key={q} className="inv-chip" onClick={() => send(q)} disabled={loading}
              style={{ fontFamily: INV_F.l, fontSize: '0.57rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.55, background: 'none', border: `1px solid rgba(232,193,141,0.16)`, padding: '7px 14px', cursor: 'pointer', transition: 'all 0.2s' }}>
              {q}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div style={{ border: `1px solid ${INV.bord}`, background: INV.bgMid, marginBottom: '0.85rem' }}>
          <div style={{ padding: '2px 1rem', borderBottom: `1px solid ${INV.bord}`, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.28, padding: '0.5rem 0' }}>Cider &amp; Spice Business Plan · AI Assistant</span>
            <span style={{ marginLeft: 'auto', width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', flexShrink: 0 }} />
          </div>

          <div ref={chatRef} style={{ padding: '1.5rem', minHeight: '260px', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {m.role === 'ai' && (
                  <div style={{ maxWidth: '82%', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: INV_F.d, fontSize: '1rem', color: INV.ter, flexShrink: 0, marginTop: '1px', lineHeight: 1 }} aria-hidden="true">◈</span>
                    <p style={{ fontFamily: INV_F.b, fontSize: '0.875rem', lineHeight: 1.82, color: INV.wheat, opacity: 0.8 }}>{m.text}</p>
                  </div>
                )}
                {m.role === 'user' && (
                  <div style={{ maxWidth: '72%', background: 'rgba(192,98,42,0.12)', border: `1px solid rgba(192,98,42,0.2)`, padding: '0.75rem 1rem' }}>
                    <p style={{ fontFamily: INV_F.b, fontSize: '0.85rem', lineHeight: 1.72, color: INV.parch, opacity: 0.9 }}>{m.text}</p>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontFamily: INV_F.d, fontSize: '1rem', color: INV.ter, lineHeight: 1 }} aria-hidden="true">◈</span>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {[0, 1, 2].map(j => (
                    <div key={j} style={{ width: '5px', height: '5px', background: INV.ter, borderRadius: '50%', animation: `inv-dot-pulse 0.7s ease ${j * 0.14}s infinite alternate` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input row */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            ref={inputRef}
            className="inv-chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            placeholder="Ask anything about the business plan…"
            style={{ flex: 1, background: INV.surf, border: `1px solid ${INV.bord}`, padding: '12px 16px', fontFamily: INV_F.b, fontSize: '0.875rem', color: INV.parch, borderColor: INV.bord, transition: 'border-color 0.2s' }}
          />
          <button
            className="inv-send-btn"
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{ background: INV.ter, color: INV.parch, border: 'none', padding: '12px 28px', fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: (loading || !input.trim()) ? 'not-allowed' : 'pointer', opacity: (loading || !input.trim()) ? 0.45 : 1, transition: 'opacity 0.2s, background 0.2s', flexShrink: 0 }}>
            Send
          </button>
        </div>

        <p style={{ fontFamily: INV_F.b, fontSize: '0.7rem', color: INV.wheat, opacity: 0.25, marginTop: '0.75rem', lineHeight: 1.65 }}>
          Answers drawn from the consolidated business plan. For the full Appendix F model,{' '}
          <a href="#inquiry" style={{ color: INV.ter, textDecoration: 'none' }}>request the investor package</a>.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { InvSearch });
