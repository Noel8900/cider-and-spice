// inv-search.jsx — Interactive Business Plan AI Search

const BP_CONTEXT = `You are an investor assistant for Cider & Spice (Las Cruces Culinary Innovation Hub). Answer investor questions precisely and professionally using only the data below. Keep answers under 130 words. Cite specific numbers. Do not speculate. Never invent vendors, names, counts, or figures not explicitly listed below — when a count is given (e.g. 3 confirmed vendors, 4 pipeline concepts), state it exactly and never pad the list with an "additional" or "unnamed" operator.

FORMATTING: Write for a busy institutional investor. Lead with a one-sentence direct answer. Use **bold** only for the key figures and labels (dollar amounts, percentages, dates). When listing three or more items, use "- " bullet points, one per line. Keep paragraphs to 1–2 sentences. Do not use markdown headings (#).

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

CAPITAL — TOTAL PROJECT COST $1,502,000 (canonical "Uses of Funds," v22 financial model / Appendix F.1; owner cash equity = $0, funded by pre-opening grants). Risk-adjusted planning range $1.50M–$1.65M.
USES OF FUNDS breakdown:
- Buildout, Equipment & Systems: $945,000 (63%) — leasehold improvements $580K; kitchen equipment & FFE $195K; cider bar buildout $65K; POS/IT/security $40K; grease interceptor $35K; signage & interior finishes $30K
- Working-capital reserve: $272,000 (18%) — funds Year-1 operating cash burn through Month 12
- Soft costs & professional fees: $166,000 (11%) — GC overhead & contingency $60K; architecture/design/engineering $45K; permits/inspections/liquor license $35K; legal & entity $18K; pre-opening insurance $8K
- Pre-opening & launch: $119,000 (8%) — pre-opening staff salaries $62K; launch marketing & grand opening $35K; opening inventory $22K
At ~$188/sf all-in across 8,000 sq ft (leasehold portion ~$72–$75/sf), the build is lean but defensible for a leased shell in a secondary market vs. national restaurant norms of $200–$500/sf.
Stress case: if utilities run hot or occupancy ramps slowly, Year-1 cash need could rise to ~$369,000 — buffered by a $100,000 SBA-backed working-capital line of credit (in addition to the $272K reserve).

SOURCES / CAPITAL STACK:
- SBA 7(a) loan: $850,000 — pre-qualification in progress
- NMFA + HFFF + EPE/MVEDA grants: $205,000–$410,000 (applications Q1–Q2 2026)
- DLCP Renovate Main Street + other grants: $30,000–$75,000 (Q2 2026)
- Plus $100K SBA working-capital LOC buffer.
Non-dilutive grant target across 6 categories: $405,000–$595,000+.
  Largest categories: Small Business Incubator Infrastructure (NMFA/HFFF/DLCP) $125K–$275K; Downtown Revitalization (EPE/MVEDA, TIDD) $65K–$80K; Local Agriculture (USDA LFPP/RBDG) $50K–$75K; Workforce (DWS/DACC/WESST) $25K–$50K.
  Note: DLCP Renovate Main Street cap is $25K (not $75K — corrected in Supplement N).

INVESTOR TERMS (binding legal structure, from Supplement D / Tear Sheet):
- Entity: New Mexico multi-member LLC, two-class structure — Class A (operator/founder, full voting + management) and Class B (outside investors, economic rights + major-transaction consent only).
- Preferred return: 8% annual on invested capital, cumulative; shortfalls accrue.
- Distribution waterfall: (1) SBA debt service first, DSCR kept ≥1.0x; (2) replenish 3-month operating reserve ($60K–$75K); (3) Class B 8% preferred return; (4) profit-sharing split ~51–60% Class A / ~40–49% Class B (exact % per Operating Agreement).
- Investor exit (primary): Year-5 operator buyout at 3.0x trailing-12-month EBITDA, with a minimum floor of 1.5x invested capital; 25–35% lump sum at closing, remainder in installments over 3–5 years at 6–8%.
- Secondary exit: business sale (unanimous consent, or Year 7 if IRR <12%); Class B right of first refusal on transfers.
- Illustrative IRR: 17–20% at base case on a $100,000 investment over 5 years.

PARTICIPATION TIERS (how the raise is presented on this portal — participation levels with perks; all are Class B investors governed by the legal terms above; investment details are discussed privately; all discussions private, no online transactions):
- Community Investor ($25K–$74,999): investor newsletter & quarterly updates, named recognition, early Cider Club access.
- Growth Partner ($75K–$199,999): + quarterly investor briefings, priority commissary bookings, full Appendix F model.
- Founding Investor ($200K+): + named feature in Hub signage & website, annual private cider pairing dinner, direct founder access.

9 DIVERSIFIED REVENUE STREAMS (Year 1 conservative, summing to ~$1,005,000):
- Permanent stall rent + 6% of sales (7–8 stalls): $310K–$407K ($2,800–$3,200/mo base)
- Incubator stall rent + 8% sales (2–3 stalls): $66K–$120K ($2,000–$2,500/mo; staggered cohorts)
- Ghost kitchen bays (2): $36K–$48K ($1,500–$2,000/mo + 8% delivery commissions)
- Craft cider bar + Cider Club: $157K–$223K (20–25 taps; 8–10 NM cideries; membership)
- Commissary kitchen rentals: $35K–$50K ($25–$35/hr)
- Event programming: $35K–$65K
- Vendor shared-services fees: $60K–$72K (10 stalls × $600–$750/mo; utility cost recovery)
- Marketing & ancillary (merch, gift cards): $25K–$45K
Diversification across streams prevents single-point failure.

CONFIRMED VENDORS (exactly 3 — do not add others): Yazzie (Japanese katsu+curry+NM chile), Seoul Fire Chicken (Korean double-fry), Sticky Stack Co. (artisan sliders+NM jam)
PIPELINE VENDORS (exactly 4 named concepts — there is no 5th; never invent an "additional operator"): Río Grande Burritos (NM Mexican), Levant Table (Lebanese/Middle Eastern), Sweet Elevation (NM desserts/bakery), Mesita Noodle Co. (ramen w/ NM twist). Pipeline vendors are in the academy or pre-application stage — no commitments signed.

MARKET:
- 115K city / 219,561 Doña Ana County / 300K–350K regional draw
- 2.5M out-of-market visitors (2025 Placer data via Visit Las Cruces)
- Zero food halls within 200 miles. Zero craft cider bars within 300 miles.
- NMSU ~20,000-student campus, Fort Bliss adjacent, AI data center / aerospace / renewable-energy workforce incoming
- West Picacho MRA survey (703 respondents): 51% said restaurants #1 most needed business
- Full-service restaurant receipts: $178.7M (NMTR RP-80)

4 SITE CANDIDATES (parallel diligence):
1. West Picacho / Motel Blvd MRA — strongest grants, TIF up to 75%, city-preferred catalytic site
2. Pan Am / University Ave — NMSU-adjacent, 9,550 SF Colliers listing $14–35/SF NNN
3. 3400 W Picacho Ave — high phasing potential
4. Mesilla Valley Mall — large-format, I-25/I-10 traffic

CITY ALIGNMENT: Directly implements 4 adopted city plans — Elevate Las Cruces (2020), East Lohman Development Plan (2021), W. Picacho/Motel MRA Plan (2026), El Paseo/S. Solano MRA Plan (2025).

JOBS / IMPACT: 60+ direct jobs Year 1 (hub + vendors), 120+ by Year 5; 25–35 indirect jobs Y1 (suppliers/farms/services); 12 food-entrepreneur businesses launched Y1 (30+ over 5 yrs); 10–15 paid apprenticeships/yr; local agriculture purchases $200K–$300K/yr ($1M–$1.5M cumulative); 12+ cultural events annually.

INCUBATOR: 8-stage vendor lifecycle (Outreach → Application → Selection → Academy → Onboarding → Soft Launch → Growth → Graduation). Two-track academy: Track A (8–12 wks, experienced operators) / Track B (24 wks, Semilla-model). 70% of stalls reserved for first-time/minority/veteran/immigrant entrepreneurs. 9 KPIs. Stall backfill within 48 hrs.

KITCHEN: No shared commercial kitchen in Las Cruces today. 7-zone production workflow. NMED compliant. Nearest NM comparable: Kitchen Table Santa Fe (opened 2023, 34 members). Albuquerque waitlists: 18 months.

TIMELINE: SBA pre-qual ✓, capital close ✓, construction Q1 2026, soft open Q3 2026, full ops Q4 2026, breakeven Mo. 18–20.

COMPARABLES: Krog Street (Atlanta) $8–12M, Politan Row (Houston) $6–9M, Findlay Market (Cincinnati) $4–7M. C&S Y3 target ($1.7M) well below comps.

RISK CONTROLS: Y1 GAAP loss modeled and reserved. SBA+grant stack sufficient without any single grant. 4 parallel sites. Liquor license has non-alcoholic fallback. Vendor KPI scorecard + replacement pipeline.
---
If asked about something not covered, say so and suggest emailing noelj0858@gmail.com.`;

const SUGGESTED_QS = [
  'What are the Year 3 financials?',
  'How is the $1.502M budget allocated?',
  'How is the capital stack structured?',
  'What are the investor terms and exit?',
  'When is cash flow breakeven?',
  'Who are the confirmed vendors?',
];

// ── Lightweight markdown renderer (bold, bullet/numbered lists, paragraphs) ───
// The model returns markdown; without this, investors see literal ** and - .
function mdInline(str, keyPrefix) {
  const out = [];
  const re = /(\*\*([^*]+)\*\*|__([^_]+)__|`([^`]+)`)/;
  let rest = str, k = 0, m;
  while ((m = rest.match(re))) {
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const bold = m[2] || m[3];
    if (bold) {
      out.push(React.createElement('strong', { key: keyPrefix + '-' + (k++), style: { color: INV.parch, fontWeight: 600 } }, bold));
    } else if (m[4]) {
      out.push(React.createElement('span', { key: keyPrefix + '-' + (k++), style: { fontFamily: INV_F.l, fontSize: '0.9em', color: INV.ter, letterSpacing: '0.02em' } }, m[4]));
    }
    rest = rest.slice(m.index + m[0].length);
  }
  if (rest) out.push(rest);
  return out;
}

function MD({ text }) {
  const lines = String(text || '').replace(/\r/g, '').split('\n');
  const blocks = [];
  let i = 0;
  const isBullet = (s) => /^\s*[-*•]\s+/.test(s);
  const isNum = (s) => /^\s*\d+[.)]\s+/.test(s);
  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) { i++; continue; }
    if (isBullet(lines[i])) {
      const items = [];
      while (i < lines.length && isBullet(lines[i])) { items.push(lines[i].trim().replace(/^[-*•]\s+/, '')); i++; }
      blocks.push({ type: 'ul', items });
    } else if (isNum(lines[i])) {
      const items = [];
      while (i < lines.length && isNum(lines[i])) { items.push(lines[i].trim().replace(/^\d+[.)]\s+/, '')); i++; }
      blocks.push({ type: 'ol', items });
    } else {
      const para = [];
      while (i < lines.length && lines[i].trim() && !isBullet(lines[i]) && !isNum(lines[i])) {
        para.push(lines[i].trim().replace(/^#{1,6}\s+/, '')); i++;
      }
      blocks.push({ type: 'p', text: para.join(' ') });
    }
  }
  const pStyle = { fontFamily: INV_F.b, fontSize: '0.875rem', lineHeight: 1.78, color: INV.wheat, opacity: 0.82, margin: 0 };
  const liStyle = { fontFamily: INV_F.b, fontSize: '0.86rem', lineHeight: 1.6, color: INV.wheat, opacity: 0.82, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
      {blocks.map((b, bi) => {
        if (b.type === 'p') return <p key={bi} style={pStyle}>{mdInline(b.text, 'p' + bi)}</p>;
        return (
          <div key={bi} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {b.items.map((it, ii) => (
              <div key={ii} style={liStyle}>
                <span aria-hidden="true" style={{ color: INV.ter, flexShrink: 0, marginTop: b.type === 'ol' ? 0 : '2px', fontSize: b.type === 'ol' ? '0.78rem' : '0.55rem', fontFamily: b.type === 'ol' ? INV_F.l : 'inherit', minWidth: b.type === 'ol' ? '1.1rem' : 'auto', letterSpacing: '0.06em' }}>
                  {b.type === 'ol' ? (ii + 1) + '.' : '◈'}
                </span>
                <span style={{ flex: 1 }}>{mdInline(it, 'li' + bi + '-' + ii)}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

const PLAN_REF = 'Business Plan v12.0 · April 2026';

function InvSearch() {
  const [msgs, setMsgs] = React.useState([{
    role: 'ai',
    welcome: true,
    text: 'This assistant answers directly from the consolidated Cider & Spice business plan — financials, capital structure, grant strategy, vendors, site diligence, and investment terms.\n\nEvery response is drawn from the source document below. Select a question to begin, or ask your own.',
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
      setMsgs(prev => [...prev, { role: 'ai', text: answer, sourced: true }]);
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
        @keyframes inv-dot-pulse { 0% { opacity: 0.3; transform: translateY(0); } 100% { opacity: 1; transform: translateY(-4px); } }
        @keyframes inv-msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .inv-msg { animation: inv-msg-in 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .inv-chat-input::placeholder { color: rgba(232,193,141,0.28); }
        .inv-chat-input:focus { outline: none; border-color: rgba(192,98,42,0.45) !important; }
        .inv-chip { transition: all 0.2s; }
        .inv-chip:hover:not(:disabled) { border-color: rgba(192,98,42,0.5) !important; color: #f7f3ec !important; opacity: 1 !important; background: rgba(192,98,42,0.07) !important; }
        .inv-send-btn:hover:not(:disabled) { background: #d4673a !important; }
      `}</style>

      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Header — institutional */}
        <InvEyebrow text="Consolidated Business Plan" />
        <h2 style={{ fontFamily: INV_F.d, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', fontWeight: 300, color: INV.parch, lineHeight: 1.15, marginBottom: '1rem', maxWidth: '34ch' }}>
          Examine the Business Plan Directly
        </h2>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.9rem', color: INV.wheat, opacity: 0.46, maxWidth: '600px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          A research assistant with the full consolidated plan in context. Pose any question on financials, capital structure, grant strategy, vendors, site diligence, or investment terms — answered with figures cited directly from the source document.
        </p>

        {/* Credibility bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem 1.4rem', paddingBottom: '1.75rem', marginBottom: '1.75rem', borderBottom: `1px solid ${INV.bord}` }}>
          {[
            ['◈', PLAN_REF],
            ['✓', 'Figures cross-checked to source'],
            ['⚌', 'Private & confidential'],
          ].map(([g, t]) => (
            <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: INV_F.l, fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5 }}>
              <span aria-hidden="true" style={{ color: INV.ter, fontSize: '0.7rem', opacity: 0.85 }}>{g}</span>
              {t}
            </span>
          ))}
        </div>

        {/* Suggested questions */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.32, marginBottom: '0.85rem' }}>Frequent Investor Questions</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {SUGGESTED_QS.map(q => (
              <button key={q} className="inv-chip" onClick={() => send(q)} disabled={loading}
                style={{ fontFamily: INV_F.l, fontSize: '0.57rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: INV.wheat, opacity: loading ? 0.3 : 0.55, background: 'none', border: `1px solid rgba(232,193,141,0.16)`, padding: '7px 14px', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div style={{ border: `1px solid ${INV.bordM}`, background: INV.bgMid, marginBottom: '0.85rem', boxShadow: '0 24px 60px -30px rgba(0,0,0,0.7)' }}>
          <div style={{ padding: '0.6rem 1rem', borderBottom: `1px solid ${INV.bord}`, display: 'flex', alignItems: 'center', gap: '0.6rem', background: INV.bgDark }}>
            <span aria-hidden="true" style={{ fontFamily: INV_F.d, fontSize: '0.95rem', color: INV.ter, lineHeight: 1 }}>◈</span>
            <span style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4 }}>Business Plan Research Assistant</span>
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', flexShrink: 0, boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
              <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#4ade80', opacity: 0.75 }}>Plan Loaded</span>
            </span>
          </div>

          <div id="inv-chat-area" ref={chatRef} style={{ padding: '1.75rem', minHeight: '280px', maxHeight: '440px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {msgs.map((m, i) => (
              <div key={i} className="inv-msg" style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {m.role === 'ai' && (
                  <div style={{ maxWidth: '84%', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <span aria-hidden="true" style={{ fontFamily: INV_F.d, fontSize: '1.05rem', color: INV.ter, flexShrink: 0, marginTop: '1px', lineHeight: 1, opacity: m.welcome ? 0.6 : 1 }}>◈</span>
                    <div>
                      {m.welcome
                        ? <p style={{ fontFamily: INV_F.b, fontSize: '0.875rem', lineHeight: 1.82, color: INV.wheat, opacity: 0.6, whiteSpace: 'pre-line', margin: 0 }}>{m.text}</p>
                        : <MD text={m.text} />}
                      {m.sourced && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.85rem' }}>
                          <span style={{ height: '1px', width: '16px', background: INV.ter, opacity: 0.4, display: 'block' }} />
                          <span style={{ fontFamily: INV_F.l, fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.34 }}>Sourced from {PLAN_REF}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {m.role === 'user' && (
                  <div style={{ maxWidth: '72%', background: 'rgba(192,98,42,0.12)', border: `1px solid rgba(192,98,42,0.2)`, padding: '0.75rem 1rem' }}>
                    <p style={{ fontFamily: INV_F.b, fontSize: '0.85rem', lineHeight: 1.72, color: INV.parch, opacity: 0.9, margin: 0 }}>{m.text}</p>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="inv-msg" style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                <span aria-hidden="true" style={{ fontFamily: INV_F.d, fontSize: '1.05rem', color: INV.ter, lineHeight: 1 }}>◈</span>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {[0, 1, 2].map(j => (
                    <div key={j} style={{ width: '5px', height: '5px', background: INV.ter, borderRadius: '50%', animation: `inv-dot-pulse 0.7s ease ${j * 0.14}s infinite alternate` }} />
                  ))}
                </div>
                <span style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4 }}>Consulting the plan</span>
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

        <p style={{ fontFamily: INV_F.b, fontSize: '0.7rem', color: INV.wheat, opacity: 0.28, marginTop: '0.85rem', lineHeight: 1.7, maxWidth: '640px' }}>
          Responses are generated from the consolidated business plan and are for informational purposes only — not an offer to sell securities. For the full Appendix F model and audited assumptions,{' '}
          <a href="#inquiry" style={{ color: INV.ter, textDecoration: 'none', borderBottom: `1px solid rgba(192,98,42,0.4)` }}>request the investor package</a>.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { InvSearch });
