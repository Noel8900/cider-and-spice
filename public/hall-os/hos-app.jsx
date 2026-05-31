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

  let view;
  if (s.persona === 'customer')      view = <CustomerApp />;
  else if (s.persona === 'vendor')   view = <VendorDashboard />;
  else if (s.persona === 'operator') view = <OperatorConsole />;
  else                                view = <POSTerminal />;

  return (
    <div style={{ minHeight: '100vh', background: HOS.bg }}>
      <PersonaBar persona={s.persona} />
      {view}

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
