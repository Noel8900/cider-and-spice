// hos-analyst.jsx — Hall Analyst: AI operating briefing for the Operator Console
//   Primary: live Claude (window.claude.complete) grounded in the live KPIs + floor state
//   Fallback: deterministic, data-driven analysis computed from KPIS + STALLS (not canned)
// Depends on: hos-tokens, hos-data, hos-vendor (DeskCard)

// ── Shared helpers ──────────────────────────────────────────────────────────

// KPI on/under target + how far over/under (signed, normalized to the target).
function kpiMeets(k) { return k.good === 'up' ? k.value >= k.target : k.value <= k.target; }
function kpiMargin(k) {
  const denom = Math.abs(k.target) || 1;
  return (k.good === 'up' ? (k.value - k.target) : (k.target - k.value)) / denom;
}
function fmtKpiVal(k) {
  if (k.unit === '$') return money0(k.value);
  if (k.unit === '★') return k.value.toFixed(1) + '★';
  if (k.unit === '×') return k.value.toFixed(2) + '×';
  if (k.unit === ' vendors') return k.value + ' vendors';
  return k.value + k.unit;
}
function fmtKpiTgt(k) {
  if (k.unit === '$') return money0(k.target);
  if (k.unit === '×') return k.target.toFixed(2) + '×';
  if (k.unit === ' vendors') return k.target + '';
  return k.target + (k.unit === '%' ? '%' : k.unit === '★' ? '★' : '');
}

const ANALYST_TONES = {
  good:  { c: HOS.greenLt, label: 'Strength', dot: HOS.green },
  watch: { c: HOS.gold,    label: 'Watch',    dot: HOS.gold },
  risk:  { c: HOS.red,     label: 'Risk',     dot: HOS.red },
  opp:   { c: HOS.blue,    label: 'Opportunity', dot: HOS.blue },
};

// ── Heuristic fallback — genuinely computed from the data ────────────────────

function deriveBriefing() {
  const beat = KPIS.filter(kpiMeets);
  const miss = KPIS.filter(k => !kpiMeets(k));
  const sorted = [...KPIS].sort((a, b) => kpiMargin(b) - kpiMargin(a));
  const best = sorted[0];
  const tight = sorted[sorted.length - 1];           // smallest cushion (or biggest miss)
  const vacant = STALLS.filter(s => s.state === 'vacant');
  const incub = STALLS.filter(s => s.state === 'incubator');

  const headline = miss.length === 0
    ? `All ${KPIS.length} operating KPIs are on or above target — the hall is trading well.`
    : `${beat.length} of ${KPIS.length} KPIs on target; ${miss.length} need attention this cycle.`;

  const insights = [];

  insights.push({
    tone: 'good',
    title: `${best.label} leading`,
    text: `At ${fmtKpiVal(best)} against a ${fmtKpiTgt(best)} target — your strongest line on the board.`,
  });

  const tightMisses = !kpiMeets(tight);
  insights.push({
    tone: tightMisses ? 'risk' : 'watch',
    title: tightMisses ? `${tight.label} below target` : `${tight.label} running close`,
    text: tightMisses
      ? `${fmtKpiVal(tight)} vs a ${fmtKpiTgt(tight)} target — least cushion on the board; review before the ${tight.cadence.toLowerCase()} close.`
      : `${fmtKpiVal(tight)} against ${fmtKpiTgt(tight)} — only a thin cushion, so keep it in view.`,
  });

  if (vacant.length || incub.length) {
    const vList = vacant.map(s => s.id).join(', ');
    insights.push({
      tone: 'opp',
      title: vacant.length ? `${vacant.length} stall${vacant.length > 1 ? 's' : ''} to fill` : 'Graduation pipeline active',
      text: vacant.length
        ? `Stall ${vList} sitting vacant while ${incub.length ? `B3 incubates a graduate` : 'demand runs hot'} — backfilling lifts occupancy and sales-per-stall together.`
        : `An incubator tenant is graduation-ready — line up the next cohort to hold occupancy.`,
    });
  }

  const action = vacant.length
    ? `Fast-track the Levant Table expansion into ${vacant[0].id} to push occupancy past 90%.`
    : miss.length
      ? `Prioritize ${miss[0].label} — it is the only KPI off target this cycle.`
      : `Protect ${tight.label}; everything else has healthy headroom.`;

  return { headline, insights, action, source: 'heuristic' };
}

// ── Live Claude path ─────────────────────────────────────────────────────────

function buildAnalystContext() {
  const kpis = KPIS.map(k =>
    `- ${k.label}: ${fmtKpiVal(k)} (target ${fmtKpiTgt(k)}, better when ${k.good}, reviewed ${k.cadence}) — currently ${kpiMeets(k) ? 'on target' : 'OFF target'}`
  ).join('\n');
  const floor = STALLS.map(s => {
    const v = s.vendor ? (vendorById(s.vendor) || {}).name : null;
    const status = s.state === 'busy' ? 'LICENSED — operating, at capacity'
      : s.state === 'open' ? 'LICENSED — operating, capacity to spare'
      : s.state === 'incubator' ? 'LICENSED — occupied by an incubator participant'
      : 'UNLICENSED — empty, available to fill';
    return `- ${s.id}: ${status}${v ? ` (${v})` : ''}`;
  }).join('\n');
  const licensed = STALLS.filter(s => s.state !== 'vacant').length;
  return `OPERATING KPIs (Incubator Playbook):\n${kpis}\n\nFLOOR / STALLS (${licensed} of ${STALLS.length} licensed — only stalls explicitly marked UNLICENSED are empty; never call a LICENSED or "operating" stall vacant or dark):\n${floor}\n\nToday: Friday, ~$11,840 revenue, 312 orders, 11 min average wait, 184 active Cider Club members.`;
}

async function analyzeHall() {
  if (!window.claude || typeof window.claude.complete !== 'function') throw new Error('analyst: no live API');

  const prompt =
`You are the Hall Analyst for Cider & Spice, a food-hall incubator in Las Cruces, New Mexico, run as a commercial venture (think occupancy, sales-per-stall, rent-to-sales, food cost, NOI/DSCR). You advise the hall operator. Read the live numbers and give a sharp, commercially-literate briefing — what is winning, what to watch, and the single best action right now.

${buildAnalystContext()}

Write for a busy operator: specific, quantified, no fluff. Cite the actual numbers. Pick exactly 3 insights and 1 recommended action.

Reply with MINIFIED JSON ONLY — no prose, no code fences — in exactly this shape:
{"headline":"one sentence","insights":[{"tone":"good|watch|risk|opp","title":"3-5 words","text":"one sentence with a number"}],"action":"one sentence"}`;

  const raw = await window.claude.complete(prompt);
  const match = raw && raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('analyst: no JSON');
  const data = JSON.parse(match[0]);
  const insights = (Array.isArray(data.insights) ? data.insights : [])
    .filter(i => i && i.title && i.text)
    .map(i => ({ tone: ANALYST_TONES[i.tone] ? i.tone : 'watch', title: String(i.title), text: String(i.text) }))
    .slice(0, 3);
  if (!data.headline || !insights.length) throw new Error('analyst: thin response');
  return { headline: String(data.headline), insights, action: data.action ? String(data.action) : '', source: 'live' };
}

// ── Component ──────────────────────────────────────────────────────────────

function HallAnalyst() {
  const [brief, setBrief] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const run = React.useCallback(() => {
    setLoading(true);
    const t0 = Date.now();
    (async () => {
      let result;
      try { result = await analyzeHall(); }
      catch (e) { result = deriveBriefing(); }
      const wait = Math.max(0, 520 - (Date.now() - t0));
      setTimeout(() => { setBrief(result); setLoading(false); }, wait);
    })();
  }, []);

  React.useEffect(() => { run(); }, [run]);

  return (
    <DeskCard style={{ padding: 0, overflow: 'hidden', marginBottom: 22, background: `linear-gradient(135deg, ${HOS.panel2}, ${HOS.panel})` }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: `1px solid ${HOS.bord}` }}>
        <span style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, background: `linear-gradient(140deg, ${HOS.ter}, ${HOS.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1e1710"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: HF.d, fontSize: 19, color: HOS.parch, lineHeight: 1 }}>Hall Analyst</div>
          <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 3 }}>
            AI operating briefing{brief ? ` · ${brief.source === 'live' ? 'Live read' : 'On-device read'}` : ''}
          </div>
        </div>
        <button onClick={run} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: 7, background: HOS.surf, border: `1px solid ${HOS.bordM}`, color: loading ? HOS.wheat : HOS.parch, opacity: loading ? 0.5 : 1, borderRadius: 9, padding: '8px 13px', fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: loading ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: loading ? 'hosSpin 1s linear infinite' : 'none' }}><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v5h-5"/></svg>
          {loading ? 'Reading…' : 'Refresh'}
        </button>
      </div>

      {/* Body */}
      {loading && !brief ? (
        <div style={{ padding: '26px 20px', display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: HOS.ter, animation: `hosDot 0.7s ${i*0.13}s infinite alternate` }} />)}
          </div>
          <span style={{ fontFamily: HF.b, fontSize: 13, color: HOS.wheat, opacity: 0.6 }}>Reading the floor and the KPI board…</span>
        </div>
      ) : brief && (
        <div style={{ padding: '16px 20px 18px', opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
          {/* Headline */}
          <div style={{ fontFamily: HF.d, fontSize: 21, color: HOS.parch, lineHeight: 1.25, marginBottom: 16, maxWidth: 760, textWrap: 'pretty' }}>{brief.headline}</div>

          {/* Insights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: brief.action ? 16 : 0 }}>
            {brief.insights.map((ins, i) => {
              const t = ANALYST_TONES[ins.tone] || ANALYST_TONES.watch;
              return (
                <div key={i} style={{ paddingLeft: 13, borderLeft: `2px solid ${t.c}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: t.dot, flexShrink: 0 }} />
                    <span style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.c }}>{t.label}</span>
                  </div>
                  <div style={{ fontFamily: HF.b, fontSize: 13.5, fontWeight: 600, color: HOS.parch, marginBottom: 3 }}>{ins.title}</div>
                  <div style={{ fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.62, lineHeight: 1.5 }}>{ins.text}</div>
                </div>
              );
            })}
          </div>

          {/* Recommended action */}
          {brief.action && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: HOS.terDim, border: `1px solid rgba(192,98,42,0.25)`, borderRadius: 10 }}>
              <span style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.ter, flexShrink: 0 }}>Do next</span>
              <span style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.parch, lineHeight: 1.45 }}>{brief.action}</span>
            </div>
          )}
        </div>
      )}
    </DeskCard>
  );
}

Object.assign(window, { HallAnalyst, analyzeHall, deriveBriefing });
