// hos-app.jsx — Top-level HallOS component (assembles personas + tweaks)
// Depends on: all hos-* modules + tweaks-panel.jsx

// Inject keyframes + base once
(function injectKeyframes() {
  if (document.getElementById('hos-kf')) return;
  const st = document.createElement('style');
  st.id = 'hos-kf';
  st.textContent = `
    @keyframes hosDot { from { opacity: 0.3; transform: translateY(0); } to { opacity: 1; transform: translateY(-3px); } }
    @keyframes hosSpin { to { transform: rotate(360deg); } }
    @keyframes hosSlideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: none; } }
    @keyframes hosPersonaFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    #hos-phone-scroll::-webkit-scrollbar { width: 0; }
  `;
  document.head.appendChild(st);
})();

const HOS_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c0622a",
  "surface": "#1e1710"
}/*EDITMODE-END*/;

// Shade helper
function hosShade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 0xff) + amt, b = (n & 0xff) + amt;
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}
function hosRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 0xff},${n & 0xff},${a})`;
}

function applyPalette(accent, surface) {
  HOS.ter = accent;
  HOS.terHov = hosShade(accent, 20);
  HOS.terDim = hosRgba(accent, 0.12);
  HOS.bg = surface;
  document.body.style.background = surface;
}

function HallOS() {
  const [t, setTweak] = useTweaks(HOS_TWEAK_DEFAULTS);
  const s = useHall();

  // Apply palette on every render (cheap; keeps tokens in sync with tweaks)
  applyPalette(t.accent, t.surface);

  // Intro / persona-picker landing — shown until the user picks a surface
  if (!s.started) {
    return (
      <div style={{ minHeight: '100vh', background: HOS.bg }}>
        <DemoIntro />
        <TweaksPanel title="Tweaks">
          <TweakSection label="Brand" />
          <TweakColor label="Accent" value={t.accent}
            options={['#c0622a', '#b5503a', '#d4a84b', '#6b8c6b', '#a0524e']}
            onChange={(v) => { setTweak('accent', v); applyPalette(v, t.surface); hallStore.set({ _v: Date.now() }); }} />
          <TweakColor label="Surface" value={t.surface}
            options={['#1e1710', '#1a1611', '#211a13', '#15110c']}
            onChange={(v) => { setTweak('surface', v); applyPalette(t.accent, v); hallStore.set({ _v: Date.now() }); }} />
          <TweakSection label="Jump straight in" />
          <TweakRadio label="Persona" value={s.persona}
            options={['customer', 'vendor', 'operator', 'pos']}
            onChange={(v) => actions.start(v)} />
        </TweaksPanel>
      </div>
    );
  }

  let view;
  if (s.persona === 'customer')      view = <CustomerApp />;
  else if (s.persona === 'vendor')   view = <VendorDashboard />;
  else if (s.persona === 'operator') view = <OperatorConsole />;
  else                                view = <POSTerminal />;

  return (
    <div style={{ minHeight: '100vh', background: HOS.bg }}>
      <PersonaBar persona={s.persona} />
      <div key={s.persona} style={{ animation: 'hosPersonaFade 220ms ease-out' }}>
        {view}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={['#c0622a', '#b5503a', '#d4a84b', '#6b8c6b', '#a0524e']}
          onChange={(v) => { setTweak('accent', v); applyPalette(v, t.surface); hallStore.set({ _v: Date.now() }); }} />
        <TweakColor label="Surface" value={t.surface}
          options={['#1e1710', '#1a1611', '#211a13', '#15110c']}
          onChange={(v) => { setTweak('surface', v); applyPalette(t.accent, v); hallStore.set({ _v: Date.now() }); }} />
        <TweakSection label="Jump to persona" />
        <TweakRadio label="Persona" value={s.persona}
          options={['customer', 'vendor', 'operator', 'pos']}
          onChange={(v) => actions.setPersona(v)} />
      </TweaksPanel>
    </div>
  );
}

Object.assign(window, { HallOS, applyPalette });

// ── Error boundary so a single broken card doesn't blank the page ───────────
class HallOSBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
    this.reset = this.reset.bind(this);
  }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[HallOS] caught', error, info);
    this.setState({ info });
  }
  reset() { this.setState({ error: null, info: null }); }
  render() {
    if (!this.state.error) return this.props.children;
    const msg = this.state.error && this.state.error.message ? this.state.error.message : String(this.state.error);
    return (
      <div style={{
        minHeight: '100vh',
        background: HOS.bg, color: HOS.parch,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32, fontFamily: HF.b,
      }}>
        <div style={{ maxWidth: 480, width: '100%', border: `1px solid ${HOS.bord}`, padding: 28, background: HOS.panel }}>
          <div style={{ fontFamily: HF.l, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: HOS.red, marginBottom: 10 }}>Something fell over</div>
          <div style={{ fontFamily: HF.d, fontSize: 26, color: HOS.parch, lineHeight: 1.2, marginBottom: 12 }}>A surface crashed inside the demo.</div>
          <p style={{ fontSize: 13.5, color: 'rgba(245,236,215,0.62)', lineHeight: 1.6, marginBottom: 16 }}>
            The rest of Hall OS is fine — just this surface failed to render. Reset to go back to the picker.
          </p>
          <pre style={{ background: HOS.bg, border: `1px solid ${HOS.bordS}`, padding: 12, fontFamily: HF.m, fontSize: 11, color: HOS.wheat, overflowX: 'auto', marginBottom: 18, whiteSpace: 'pre-wrap' }}>{msg}</pre>
          <button onClick={() => { this.reset(); actions.goHome(); }} style={{
            background: HOS.ter, color: '#fff', border: 'none',
            fontFamily: HF.l, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
            fontWeight: 600, padding: '12px 22px', cursor: 'pointer',
          }}>Reset to intro →</button>
        </div>
      </div>
    );
  }
}

Object.assign(window, { HallOSBoundary });
