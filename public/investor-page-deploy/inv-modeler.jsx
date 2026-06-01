// inv-modeler.jsx — Interactive Investment Modeler for the Investors Page
// Investor sets a check size + hold; sees the tier it unlocks and an ILLUSTRATIVE
// projected value / multiple / profit range driven by the page's stated 17–20% IRR.
// Deterministic math only. Heavy "illustrative · not a guarantee" framing.
// Depends on: inv-tokens.jsx (INV, INV_F, SectionHead, FadeUp, useIsMobile)

const IRR_LO = 0.17, IRR_HI = 0.20;
const MOD_MIN = 10000, MOD_MAX = 500000, MOD_STEP = 5000;

function modFmtUSD(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
function modFmtK(n)  { return '$' + Math.round(n / 1000) + 'K'; }

function ModStat({ label, value, sub, color }) {
  return (
    <div style={{ padding: '1.1rem 1.2rem', background: INV.bg, borderLeft: `2px solid rgba(192,98,42,0.3)` }}>
      <div style={{ fontFamily: INV_F.l, fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.4, marginBottom: '0.5rem' }}>{label}</div>
      <div style={{ fontFamily: INV_F.d, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 300, color: color || INV.ter, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.34, marginTop: '0.4rem' }}>{sub}</div>}
    </div>
  );
}

// Growth curve: principal compounding at IRR_LO and IRR_HI across the hold.
function ModCurve({ amount, years }) {
  const W = 320, H = 104, padT = 10, padB = 18;
  const maxV = amount * Math.pow(1 + IRR_HI, years);
  const x = (y) => (years === 0 ? 0 : (y / years) * W);
  const yc = (v) => H - padB - (v / maxV) * (H - padT - padB);
  const line = (rate) => {
    const pts = [];
    for (let y = 0; y <= years; y++) pts.push(x(y).toFixed(1) + ',' + yc(amount * Math.pow(1 + rate, y)).toFixed(1));
    return pts.join(' ');
  };
  const areaHi = `0,${H - padB} ${line(IRR_HI)} ${W},${H - padB}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id="modFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={INV.ter} stopOpacity="0.22" />
          <stop offset="100%" stopColor={INV.ter} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* baseline */}
      <line x1="0" y1={H - padB} x2={W} y2={H - padB} stroke="rgba(232,193,141,0.14)" strokeWidth="1" />
      <polygon points={areaHi} fill="url(#modFill)" />
      <polyline points={line(IRR_LO)} fill="none" stroke={INV.gold} strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
      <polyline points={line(IRR_HI)} fill="none" stroke={INV.ter} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* endpoint dot */}
      <circle cx={W} cy={yc(amount * Math.pow(1 + IRR_HI, years))} r="3" fill={INV.ter} />
      {/* year ticks */}
      {Array.from({ length: years + 1 }).map((_, y) => (
        <text key={y} x={x(y)} y={H - 4} fill="rgba(232,193,141,0.4)" fontSize="7" fontFamily={INV_F.l} textAnchor={y === 0 ? 'start' : y === years ? 'end' : 'middle'}>Y{y}</text>
      ))}
    </svg>
  );
}

function InvModeler() {
  const isMobile = useIsMobile();
  const [amount, setAmount] = React.useState(75000);
  const [years, setYears] = React.useState(5);

  React.useEffect(function () {
    if (document.getElementById('mod-range-css')) return;
    var st = document.createElement('style');
    st.id = 'mod-range-css';
    st.textContent = '.mod-range{-webkit-appearance:none;appearance:none;height:5px;outline:none}'
      + '.mod-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;border-radius:50%;background:' + INV.ter + ';border:3px solid ' + INV.bg + ';box-shadow:0 0 0 1px ' + INV.ter + ';cursor:pointer}'
      + '.mod-range::-moz-range-thumb{width:15px;height:15px;border:3px solid ' + INV.bg + ';border-radius:50%;background:' + INV.ter + ';cursor:pointer}'
      + '.mod-range::-moz-range-track{height:5px;border-radius:3px;background:transparent}';
    document.head.appendChild(st);
  }, []);

  const valLo = amount * Math.pow(1 + IRR_LO, years);
  const valHi = amount * Math.pow(1 + IRR_HI, years);
  const presets = [25000, 50000, 100000, 250000];
  const pct = ((amount - MOD_MIN) / (MOD_MAX - MOD_MIN)) * 100;

  return (
    <section id="modeler" style={{ paddingBottom: '5rem' }}>
      <SectionHead num="07" eyebrow="Model Your Participation" title="Model Your Return" />
      <p style={{ fontFamily: INV_F.b, fontSize: '0.84rem', color: INV.wheat, opacity: 0.4, marginBottom: '2.5rem', maxWidth: '40rem' }}>
        Set a check size and holding period to see the tier it unlocks and an illustrative return range. Figures apply the base-case 17–20% IRR — they are not a forecast, offer, or guarantee.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.92fr 1.08fr', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
        {/* ── Controls ── */}
        <div style={{ background: INV.bg, padding: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
          {/* Amount */}
          <div style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5, marginBottom: '0.55rem' }}>Your Investment</div>
          <div style={{ fontFamily: INV_F.d, fontSize: 'clamp(2.2rem, 4.5vw, 3rem)', fontWeight: 300, color: INV.ter, lineHeight: 1, marginBottom: '1.1rem' }}>{modFmtUSD(amount)}</div>
          <input
            className="mod-range"
            type="range" min={MOD_MIN} max={MOD_MAX} step={MOD_STEP} value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-label="Investment amount"
            style={{ width: '100%', cursor: 'pointer', margin: '0 0 0.5rem', borderRadius: '3px', background: `linear-gradient(to right, ${INV.ter} ${pct}%, rgba(232,193,141,0.18) ${pct}%)` }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.3, marginBottom: '1.5rem' }}>
            <span>$10K min</span><span>$500K+</span>
          </div>

          {/* Presets */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {presets.map(p => {
              const on = amount === p;
              return (
                <button key={p} onClick={() => setAmount(p)}
                  style={{ flex: '1 1 auto', padding: '9px 4px', background: on ? 'rgba(192,98,42,0.14)' : 'transparent', border: `1px solid ${on ? INV.ter : INV.bord}`, color: on ? INV.ter : `${INV.wheat}80`, fontFamily: INV_F.l, fontSize: '0.62rem', letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {modFmtK(p)}
                </button>
              );
            })}
          </div>

          {/* Hold period */}
          <span style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Holding Period</span>
          <div style={{ display: 'flex', gap: '1px', background: INV.bord }}>
            {[3, 5, 7].map(y => {
              const on = years === y;
              return (
                <button key={y} onClick={() => setYears(y)}
                  style={{ flex: 1, padding: '12px 0', background: on ? INV.ter : INV.surf, color: on ? INV.parch : `${INV.wheat}75`, border: 'none', fontFamily: INV_F.l, fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {y} Years
                </button>
              );
            })}
          </div>


        </div>

        {/* ── Results ── */}
        <div style={{ background: INV.bg, padding: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.35, marginBottom: '0.4rem' }}>Illustrative Value at Year {years}</div>
          <div style={{ fontFamily: INV_F.d, fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 300, color: INV.ter, lineHeight: 1, marginBottom: '0.3rem' }}>
            {modFmtUSD(valLo)} <span style={{ color: `${INV.wheat}40`, fontSize: '0.55em' }}>–</span> {modFmtUSD(valHi)}
          </div>
          <div style={{ fontFamily: INV_F.l, fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: INV.gold, opacity: 0.7, marginBottom: '1.5rem' }}>
            At 17% — 20% illustrative IRR
          </div>

          <ModCurve amount={amount} years={years} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '1.5rem' }}>
            <ModStat label="Return Multiple" value={(valLo / amount).toFixed(2) + '× – ' + (valHi / amount).toFixed(2) + '×'} sub="MOIC range" />
            <ModStat label="Illustrative Profit" value={modFmtK(valLo - amount) + ' – ' + modFmtK(valHi - amount)} sub={'Over ' + years + ' years'} color={INV.gold} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#inquiry" style={{ display: 'inline-block', background: INV.ter, color: INV.parch, padding: '12px 28px', fontFamily: INV_F.l, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = INV.terHov}
              onMouseLeave={e => e.currentTarget.style.background = INV.ter}>
              Discuss {modFmtK(amount)} →
            </a>
            <span style={{ fontFamily: INV_F.l, fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: INV.wheat, opacity: 0.32 }}>Private conversation · no online transaction</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ marginTop: '1.5rem', padding: '1.5rem 2rem', background: INV.surf, borderLeft: `3px solid rgba(192,98,42,0.35)` }}>
        <p style={{ fontFamily: INV_F.b, fontSize: '0.8rem', color: INV.wheat, opacity: 0.48, lineHeight: 1.8, marginBottom: '0.5rem' }}>
          Illustrative model only. Projected value compounds your selected amount at the base-case 17–20% illustrative IRR over the selected hold — it is not a forecast, an offer of securities, or a guarantee of returns. Distributions are modeled to begin after cash-flow breakeven (~Mo. 17); the Year 1 ramp loss (EOY cash −$123.9K) is covered by the $272K working-capital reserve and $100K SBA line in the $1.578M raise.
        </p>
        <span style={{ fontFamily: INV_F.l, fontSize: '0.54rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: INV.ter, opacity: 0.62 }}>Planning-stage estimates · CPA and lender review required before commitment</span>
      </div>
    </section>
  );
}

Object.assign(window, { InvModeler });
