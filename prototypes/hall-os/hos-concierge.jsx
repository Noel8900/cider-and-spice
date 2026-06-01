// hos-concierge.jsx — Hall Concierge chat screen (scripted engine)
// Depends on: hos-tokens, hos-data, hos-shell, hos-claude

function Concierge() {
  const [msgs, setMsgs] = React.useState([
    { role: 'ai', ...conciergeRespond('') },
  ]);
  const [input, setInput] = React.useState('');
  const [thinking, setThinking] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, thinking]);

  function send(text) {
    const q = (text != null ? text : input).trim();
    if (!q || thinking) return;
    setInput('');
    const userMsg = { role: 'user', text: q };
    const history = msgs.concat(userMsg).slice(-7);
    setMsgs(m => [...m, userMsg]);
    setThinking(true);

    const t0 = Date.now();
    (async () => {
      let reply;
      try {
        reply = await conciergeAsk(q, history);          // live Claude
      } catch (e) {
        reply = conciergeRespond(q);                      // scripted fallback
      }
      // Keep the thinking indicator visible a beat even if the path was instant.
      const wait = Math.max(0, 480 - (Date.now() - t0));
      setTimeout(() => {
        setMsgs(m => [...m, { role: 'ai', ...reply }]);
        setThinking(false);
      }, wait);
    })();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <CustHeader title="Hall Concierge" sub="Your pairing guide" onBack={() => actions.go('browse')}
        right={<div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(140deg, ${HOS.ter}, ${HOS.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="#1e1710"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>
        </div>} />

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {msgs.map((m, i) => m.role === 'user'
          ? (
            <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '80%', background: HOS.ter, color: '#fff', fontFamily: HF.b, fontSize: 13.5, lineHeight: 1.5, padding: '10px 14px', borderRadius: '16px 16px 4px 16px' }}>{m.text}</div>
          )
          : (
            <div key={i} style={{ alignSelf: 'flex-start', maxWidth: '92%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: `linear-gradient(140deg, ${HOS.ter}, ${HOS.gold})`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#1e1710"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>
                </span>
                <div style={{ background: HOS.panel2, border: `1px solid ${HOS.bord}`, color: HOS.parch, fontFamily: HF.b, fontSize: 13.5, lineHeight: 1.6, padding: '11px 14px', borderRadius: '4px 16px 16px 16px' }}>{m.text}</div>
              </div>
              {/* Suggested items */}
              {m.items && m.items.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 35 }}>
                  {m.items.map(({ item, vendor }) => <ConciergeItem key={item.id} item={item} vendor={vendor} />)}
                </div>
              )}
              {/* Followups */}
              {m.followups && m.followups.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, paddingLeft: 35 }}>
                  {m.followups.map(f => (
                    <button key={f} onClick={() => send(f)} style={{ fontFamily: HF.l, fontSize: 11, letterSpacing: '0.04em', color: HOS.wheat, background: HOS.surf, border: `1px solid ${HOS.bord}`, borderRadius: 16, padding: '7px 12px', cursor: 'pointer' }}>{f}</button>
                  ))}
                </div>
              )}
            </div>
          )
        )}
        {thinking && (
          <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 9, alignItems: 'center', paddingLeft: 0 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: `linear-gradient(140deg, ${HOS.ter}, ${HOS.gold})`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#1e1710"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>
            </span>
            <div style={{ display: 'flex', gap: 4, padding: '12px 14px', background: HOS.panel2, border: `1px solid ${HOS.bord}`, borderRadius: 16 }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: HOS.ter, animation: `hosDot 0.7s ${i*0.13}s infinite alternate` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div style={{ flexShrink: 0, padding: '10px 14px 16px', borderTop: `1px solid ${HOS.bordS}`, background: HOS.bg }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: HOS.surf, border: `1px solid ${HOS.bordM}`, borderRadius: 26, padding: '5px 5px 5px 16px' }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send(); }}
            placeholder="Ask for a pairing, a quick lunch…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: HOS.parch, fontFamily: HF.b, fontSize: 13.5 }} />
          <button onClick={() => send()} disabled={!input.trim()} style={{ width: 38, height: 38, borderRadius: '50%', background: input.trim() ? HOS.ter : HOS.surf2, border: 'none', cursor: input.trim() ? 'pointer' : 'default', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ConciergeItem({ item, vendor }) {
  const s = useHall();
  const inCart = s.cart.find(x => x.itemId === item.id);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: HOS.panel, border: `1px solid ${HOS.bord}`, borderRadius: 12, padding: 10 }}>
      <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 4, background: vendor.color, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: HF.b, fontSize: 13, fontWeight: 600, color: HOS.parch }}>{item.name}</div>
        <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5, marginTop: 2 }}>{vendor.name} · {money(item.price)}</div>
      </div>
      <button onClick={() => actions.addToCart(vendor, item)} style={{ flexShrink: 0, height: 32, padding: inCart ? '0 12px' : 0, width: inCart ? 'auto' : 32, borderRadius: 16, background: inCart ? HOS.green : HOS.ter, border: 'none', color: '#fff', cursor: 'pointer', fontFamily: HF.b, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        {inCart ? <>✓ {inCart.qty}</> : <span style={{ fontSize: 20, fontWeight: 300, lineHeight: 1 }}>+</span>}
      </button>
    </div>
  );
}

Object.assign(window, { Concierge, ConciergeItem });
