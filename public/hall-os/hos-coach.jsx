// hos-coach.jsx — Stall Coach: AI expediter for a single vendor stall (vendor dashboard)
//   Primary: live Claude (window.claude.complete) grounded in the live order queue + day stats
//   Fallback: deterministic moves computed from the queue (busiest item, longest wait, fastest mover)
// Depends on: hos-tokens, hos-data, hos-vendor (DeskCard)

const COACH_TONES = {
  prep:     { c: HOS.gold,    label: 'Prep' },
  expedite: { c: HOS.ter,     label: 'Expedite' },
  push:     { c: HOS.greenLt, label: 'Push' },
  watch:    { c: HOS.red,     label: 'Watch' },
};

// ── Heuristic fallback — computed from the live queue ────────────────────────

function deriveCoach(vendor, queue, stats) {
  const active = (queue || []).filter(o => o.status !== 'collected');

  // Tally item demand across the queue
  const counts = {};
  active.forEach(o => (o.items || []).forEach(it => { counts[it.n] = (counts[it.n] || 0) + (it.q || 1); }));
  const busiest = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

  const waiting = active.filter(o => o.status === 'queued');
  const longest = [...active].sort((a, b) => (b.ago || 0) - (a.ago || 0))[0];
  const pop = vendor.menu.find(m => m.tags.includes('Popular')) || vendor.menu[0];

  const moves = [];
  if (busiest && busiest[1] >= 2) {
    moves.push({ tone: 'prep', title: `Batch ${busiest[0]}`, text: `${busiest[1]} in the queue right now — fire them together to save the line.` });
  }
  if (longest && (longest.ago || 0) >= 6) {
    moves.push({ tone: 'expedite', title: `Push #${longest.id} out`, text: `Waiting ${longest.ago}m — oldest ticket on the rail. Clear it before it sours the rating.` });
  } else if (waiting.length) {
    moves.push({ tone: 'expedite', title: `${waiting.length} queued`, text: `${waiting.length} ticket${waiting.length > 1 ? 's' : ''} not started — fire the next one now to hold wait times.` });
  }
  moves.push({ tone: 'push', title: `Sell the ${pop.name}`, text: `Your signature mover at ${money(pop.price)} — suggest it on walk-up tickets.` });

  const focus = active.length
    ? `${active.length} active ticket${active.length > 1 ? 's' : ''}${waiting.length ? `, ${waiting.length} not started` : ''} — keep the rail moving.`
    : `Line is clear — prep ahead for the next rush.`;

  return { focus, moves: moves.slice(0, 3), source: 'heuristic' };
}

// ── Live Claude path ─────────────────────────────────────────────────────────

function buildCoachContext(vendor, queue, stats) {
  const active = (queue || []).filter(o => o.status !== 'collected');
  const q = active.length
    ? active.map(o => `- #${o.id} [${o.status}, ${o.ago === 0 ? 'just now' : o.ago + 'm waiting'}]: ${(o.items || []).map(it => `${it.q}× ${it.n}`).join(', ')} (${o.customer})`).join('\n')
    : '(queue empty)';
  const s = (stats || []).map(x => `${x.label}: ${x.value}`).join(' · ');
  const menu = vendor.menu.map(m => `${m.name} ($${m.price.toFixed(2)})${m.tags.length ? ` {${m.tags.join(', ')}}` : ''}`).join('; ');
  return `STALL: ${vendor.name} — ${vendor.cuisine}, Stall ${vendor.stall}, ~${vendor.prep} min tickets, ${vendor.rating}★.\nTODAY: ${s}.\n\nLIVE ORDER QUEUE:\n${q}\n\nMENU: ${menu}`;
}

async function coachStall(vendor, queue, stats) {
  if (!window.claude || typeof window.claude.complete !== 'function') throw new Error('coach: no live API');

  const prompt =
`You are the Stall Coach — a sharp kitchen expediter advising the cook/owner running a single food-hall stall during service. Read the live queue and give terse, tactical moves a line cook can act on in seconds: what to batch or prep ahead, which ticket to expedite, what to upsell. Talk like the kitchen, not a consultant.

${buildCoachContext(vendor, queue, stats)}

Pick exactly 2-3 moves. Each move has a tone: "prep" (batch/prep ahead), "expedite" (hurry a waiting ticket — reference its #), "push" (upsell a menu item), or "watch" (a risk). Be specific and cite the queue.

Reply with MINIFIED JSON ONLY — no prose, no code fences — in exactly this shape:
{"focus":"one short sentence","moves":[{"tone":"prep|expedite|push|watch","title":"2-4 words","text":"one sentence"}]}`;

  const raw = await window.claude.complete(prompt);
  const match = raw && raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('coach: no JSON');
  const data = JSON.parse(match[0]);
  const moves = (Array.isArray(data.moves) ? data.moves : [])
    .filter(m => m && m.title && m.text)
    .map(m => ({ tone: COACH_TONES[m.tone] ? m.tone : 'prep', title: String(m.title), text: String(m.text) }))
    .slice(0, 3);
  if (!moves.length) throw new Error('coach: thin response');
  return { focus: data.focus ? String(data.focus) : '', moves, source: 'live' };
}

// ── Component ──────────────────────────────────────────────────────────────

function StallCoach({ vendor, queue, stats }) {
  const [plan, setPlan] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const run = React.useCallback(() => {
    setLoading(true);
    const t0 = Date.now();
    (async () => {
      let result;
      try { result = await coachStall(vendor, queue, stats); }
      catch (e) { result = deriveCoach(vendor, queue, stats); }
      const wait = Math.max(0, 480 - (Date.now() - t0));
      setTimeout(() => { setPlan(result); setLoading(false); }, wait);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor.id]);

  React.useEffect(() => { run(); }, [run]);

  return (
    <DeskCard style={{ padding: 0, overflow: 'hidden', marginBottom: 18, background: `linear-gradient(135deg, ${HOS.panel2}, ${HOS.panel})` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 18px', borderBottom: `1px solid ${HOS.bord}` }}>
        <span style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: `linear-gradient(140deg, ${vendor.color}, ${HOS.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#1e1710"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: HF.d, fontSize: 18, color: HOS.parch, lineHeight: 1 }}>Stall Coach</div>
          <div style={{ fontFamily: HF.l, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45, marginTop: 3 }}>
            Live expediter{plan ? ` · ${plan.source === 'live' ? 'Live read' : 'On-device read'}` : ''}
          </div>
        </div>
        {plan && plan.focus && !loading && (
          <span style={{ fontFamily: HF.b, fontSize: 12, color: HOS.wheat, opacity: 0.7, marginRight: 4, textAlign: 'right', maxWidth: 360, lineHeight: 1.35 }}>{plan.focus}</span>
        )}
        <button onClick={run} disabled={loading} title="Re-read the line" style={{ display: 'flex', alignItems: 'center', gap: 6, background: HOS.surf, border: `1px solid ${HOS.bordM}`, color: loading ? HOS.wheat : HOS.parch, opacity: loading ? 0.5 : 1, borderRadius: 8, padding: '7px 11px', fontFamily: HF.l, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: loading ? 'default' : 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: loading ? 'hosSpin 1s linear infinite' : 'none' }}><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v5h-5"/></svg>
          {loading ? 'Reading' : 'Re-read'}
        </button>
      </div>

      {loading && !plan ? (
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: vendor.color, animation: `hosDot 0.7s ${i*0.13}s infinite alternate` }} />)}
          </div>
          <span style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.wheat, opacity: 0.6 }}>Reading the rail…</span>
        </div>
      ) : plan && (
        <div style={{ padding: '14px 18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14, opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
          {plan.moves.map((mv, i) => {
            const t = COACH_TONES[mv.tone] || COACH_TONES.prep;
            return (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: `${t.c}1f`, border: `1px solid ${t.c}55`, color: t.c, fontFamily: HF.b, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: HF.b, fontSize: 13, fontWeight: 600, color: HOS.parch }}>{mv.title}</span>
                    <span style={{ fontFamily: HF.l, fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.c, border: `1px solid ${t.c}55`, padding: '2px 5px', borderRadius: 3 }}>{t.label}</span>
                  </div>
                  <div style={{ fontFamily: HF.b, fontSize: 11.5, color: HOS.wheat, opacity: 0.62, lineHeight: 1.5 }}>{mv.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DeskCard>
  );
}

Object.assign(window, { StallCoach, coachStall, deriveCoach });
