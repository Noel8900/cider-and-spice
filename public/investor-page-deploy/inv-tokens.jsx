// inv-tokens.jsx — Design tokens, hooks, and shared atoms for Investors Page v2

const INV = {
  bg:     '#2c2416',
  bgDark: '#1e1710',
  bgMid:  '#231c10',
  surf:   '#33291a',
  surf2:  '#3a2e1e',
  ter:    '#c0622a',
  terHov: '#d4673a',
  wheat:  '#e8c18d',
  parch:  '#f7f3ec',
  bord:   'rgba(232,193,141,0.10)',
  bordM:  'rgba(232,193,141,0.18)',
  gold:   '#d4a84b',
};

const INV_F = {
  d: "'Cormorant Garamond', Georgia, serif",
  l: "'Josefin Sans', system-ui, sans-serif",
  b: "'Inter', system-ui, sans-serif",
};

function useInView(threshold) {
  var t = threshold === undefined ? 0.1 : threshold;
  var ref = React.useRef(null);
  var _s = React.useState(false);
  var inView = _s[0]; var setInView = _s[1];
  React.useEffect(function() {
    var el = ref.current; if (!el) return;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: t });
    obs.observe(el);
    return function() { obs.disconnect(); };
  }, [t]);
  return [ref, inView];
}

function useCountUp(target, active, duration) {
  var dur = duration === undefined ? 2200 : duration;
  var _s = React.useState(0); var val = _s[0]; var setVal = _s[1];
  var started = React.useRef(false);
  React.useEffect(function() {
    if (!active || started.current || !target) return;
    started.current = true;
    var t0 = Date.now();
    function tick() {
      var p = Math.min((Date.now() - t0) / dur, 1);
      setVal((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick); else setVal(target);
    }
    requestAnimationFrame(tick);
  }, [active, target, dur]);
  return Math.round(val);
}

function useIsMobile() {
  var _s = React.useState(false); var m = _s[0]; var setM = _s[1];
  React.useEffect(function() {
    function fn() { setM(window.innerWidth < 768); }
    fn();
    window.addEventListener('resize', fn);
    return function() { window.removeEventListener('resize', fn); };
  }, []);
  return m;
}

function FadeUp(props) {
  var children = props.children; var delay = props.delay || 0; var style = props.style || {};
  var res = useInView(); var ref = res[0]; var inView = res[1];
  return React.createElement('div', {
    ref: ref,
    style: Object.assign({ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity .7s ease ' + delay + 's, transform .7s ease ' + delay + 's' }, style)
  }, children);
}

function InvEyebrow(props) {
  var text = props.text; var center = props.center;
  return React.createElement('div', {
    style: { display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: center ? 'center' : 'flex-start', marginBottom: '0.8rem' }
  },
    React.createElement('span', { style: { height: '1px', width: '28px', background: INV.ter, display: 'block', flexShrink: 0 } }),
    React.createElement('span', { style: { fontFamily: INV_F.l, fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: INV.ter } }, text),
    center && React.createElement('span', { style: { height: '1px', width: '28px', background: INV.ter, display: 'block', flexShrink: 0 } })
  );
}

function SectionHead(props) {
  var num = props.num; var eyebrow = props.eyebrow; var title = props.title; var style = props.style || {};
  return React.createElement('div', { style: Object.assign({ position: 'relative', marginBottom: '3rem' }, style) },
    React.createElement('span', {
      'aria-hidden': 'true',
      style: { position: 'absolute', top: '-2rem', left: '-0.75rem', fontFamily: INV_F.d, fontSize: 'clamp(5rem, 10vw, 9rem)', fontWeight: 700, color: 'rgba(232,193,141,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }
    }, num),
    React.createElement('div', { style: { position: 'relative', zIndex: 1 } },
      React.createElement(InvEyebrow, { text: eyebrow }),
      React.createElement('h2', { style: { fontFamily: INV_F.d, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', fontWeight: 300, color: INV.parch, lineHeight: 1.15 } }, title)
    )
  );
}

Object.assign(window, { INV, INV_F, useInView, useCountUp, useIsMobile, FadeUp, InvEyebrow, SectionHead });
