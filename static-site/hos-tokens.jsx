// hos-tokens.jsx — Hall OS design tokens, hooks, and shared atoms

const HOS = {
  bg:     '#1e1710',
  panel:  '#251d12',
  panel2: '#2c2416',
  surf:   '#33291a',
  surf2:  '#3a2e1e',
  ter:    '#c0622a',
  terHov: '#d4673a',
  terDim: 'rgba(192,98,42,0.12)',
  wheat:  '#e8c18d',
  parch:  '#f7f3ec',
  gold:   '#d4a84b',
  green:  '#6b8c6b',
  greenLt:'#8fb98f',
  red:    '#d9614b',
  blue:   '#6b88a8',
  bord:   'rgba(232,193,141,0.10)',
  bordM:  'rgba(232,193,141,0.18)',
  bordS:  'rgba(232,193,141,0.06)',
};

const HF = {
  d: "'Cormorant Garamond', Georgia, serif",
  b: "'Inter', system-ui, sans-serif",
  m: "'JetBrains Mono', ui-monospace, monospace",
  l: "'Josefin Sans', system-ui, sans-serif",
};

function useFit(baseH, pad) {
  const p = pad === undefined ? 150 : pad;
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    function fn() {
      const avail = window.innerHeight - p;
      setScale(Math.min(1, Math.max(0.45, avail / baseH)));
    }
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, [baseH, p]);
  return scale;
}

function useCount(target, active, dur) {
  const d = dur === undefined ? 1400 : dur;
  const [v, setV] = React.useState(0);
  const started = React.useRef(false);
  React.useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const t0 = Date.now();
    function tick() {
      const p = Math.min((Date.now() - t0) / d, 1);
      setV((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick); else setV(target);
    }
    requestAnimationFrame(tick);
  }, [active, target, d]);
  return v;
}

function money(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function money0(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

// ── Atoms ─────────────────────────────────────────────────────────────────────

function Pill({ children, tone, style }) {
  const tones = {
    ter:   { c: HOS.ter,   b: 'rgba(192,98,42,0.32)',  bg: 'rgba(192,98,42,0.10)' },
    green: { c: HOS.greenLt, b: 'rgba(107,140,107,0.4)', bg: 'rgba(107,140,107,0.12)' },
    gold:  { c: HOS.gold,  b: 'rgba(212,168,75,0.35)', bg: 'rgba(212,168,75,0.10)' },
    red:   { c: HOS.red,   b: 'rgba(217,97,75,0.4)',   bg: 'rgba(217,97,75,0.12)' },
    dim:   { c: HOS.wheat, b: 'rgba(232,193,141,0.18)', bg: 'transparent' },
  };
  const t = tones[tone] || tones.dim;
  return (
    <span style={{ fontFamily: HF.l, fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: t.c, border: `1px solid ${t.b}`, background: t.bg, padding: '3px 8px', borderRadius: '2px', whiteSpace: 'nowrap', ...(style || {}) }}>
      {children}
    </span>
  );
}

function Stars({ rating, size }) {
  const s = size || 11;
  return (
    <span style={{ display: 'inline-flex', gap: '1px', color: HOS.gold, fontSize: `${s}px`, lineHeight: 1 }} aria-label={`${rating} stars`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ opacity: i <= Math.round(rating) ? 1 : 0.22 }}>★</span>
      ))}
    </span>
  );
}

function Avatar({ name, color, size }) {
  const s = size || 34;
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return (
    <div style={{ width: s, height: s, borderRadius: '50%', background: color || HOS.surf, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: HF.l, fontSize: `${s * 0.36}px`, letterSpacing: '0.04em', color: HOS.parch, textTransform: 'uppercase' }}>
      {initials}
    </div>
  );
}

Object.assign(window, { HOS, HF, useFit, useCount, money, money0, Pill, Stars, Avatar });
