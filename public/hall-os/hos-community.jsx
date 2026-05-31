// hos-community.jsx — Community / events board
// Depends on: hos-tokens, hos-data, hos-shell

function CommunityScreen() {
  const [rsvp, setRsvp] = React.useState({});
  return (
    <div style={{ paddingBottom: 28 }}>
      <CustHeader title="What's On" sub="Events at the hall" />

      {/* Featured */}
      <div style={{ padding: '14px 18px 6px' }}>
        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${HOS.ter}, #8c3f1a)`, padding: 18, minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 15%, rgba(212,168,75,0.4), transparent 50%)' }} />
          <div style={{ position: 'relative' }}>
            <span style={{ display: 'inline-block', fontFamily: HF.l, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', background: 'rgba(18,13,8,0.35)', padding: '4px 10px', borderRadius: 16, marginBottom: 10 }}>This Friday · Featured</span>
            <div style={{ fontFamily: HF.d, fontSize: 26, fontWeight: 500, color: '#fff', lineHeight: 1.05 }}>Hatch Harvest<br/>Pairing Dinner</div>
            <div style={{ fontFamily: HF.b, fontSize: 12.5, color: 'rgba(255,247,236,0.85)', marginTop: 6 }}>The Cider Bar × Yazzie · 7:00 PM · 12 seats left</div>
          </div>
        </div>
      </div>

      {/* Event list */}
      <div style={{ padding: '18px 18px 8px', fontFamily: HF.l, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>Upcoming</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '0 18px' }}>
        {EVENTS.map(ev => {
          const joined = rsvp[ev.id];
          return (
            <div key={ev.id} style={{ display: 'flex', gap: 13, background: HOS.panel, border: `1px solid ${HOS.bord}`, borderRadius: 14, padding: 13 }}>
              {/* Date block */}
              <div style={{ flexShrink: 0, width: 52, textAlign: 'center', borderRight: `1px solid ${HOS.bordS}`, paddingRight: 13, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: HF.l, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.5 }}>{ev.day}</div>
                <div style={{ fontFamily: HF.d, fontSize: 17, fontWeight: 600, color: ev.accent, lineHeight: 1.1, marginTop: 2 }}>{ev.date.split(' ')[1]}</div>
                <div style={{ fontFamily: HF.l, fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: HOS.wheat, opacity: 0.45 }}>{ev.date.split(' ')[0]}</div>
              </div>
              {/* Detail */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: 4 }}><Pill tone={ev.accent === '#c0622a' ? 'ter' : ev.accent === '#d9614b' ? 'red' : ev.accent === '#d4a84b' ? 'gold' : 'green'}>{ev.tag}</Pill></div>
                <div style={{ fontFamily: HF.d, fontSize: 16.5, color: HOS.parch, lineHeight: 1.1 }}>{ev.name}</div>
                <div style={{ fontFamily: HF.b, fontSize: 11.5, color: HOS.wheat, opacity: 0.55, marginTop: 3 }}>{ev.host}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9 }}>
                  <span style={{ fontFamily: HF.m, fontSize: 11, color: HOS.wheat, opacity: 0.6 }}>{ev.time}</span>
                  <span style={{ opacity: 0.3 }}>·</span>
                  <span style={{ fontFamily: HF.m, fontSize: 11, color: ev.price === 0 ? HOS.greenLt : HOS.gold }}>{ev.price === 0 ? 'Free' : '$' + ev.price}</span>
                  <button onClick={() => setRsvp(r => ({ ...r, [ev.id]: !r[ev.id] }))} style={{ marginLeft: 'auto', background: joined ? HOS.green : HOS.surf, color: joined ? '#fff' : HOS.ter, border: `1px solid ${joined ? HOS.green : 'rgba(192,98,42,0.4)'}`, borderRadius: 18, padding: '6px 16px', fontFamily: HF.l, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>{joined ? '✓ Going' : 'RSVP'}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Incubator callout */}
      <div style={{ margin: '20px 18px 0', padding: 16, borderRadius: 14, background: 'rgba(143,185,143,0.08)', border: `1px solid rgba(143,185,143,0.25)` }}>
        <div style={{ fontFamily: HF.l, fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: HOS.greenLt, marginBottom: 6 }}>Community Incubator</div>
        <div style={{ fontFamily: HF.d, fontSize: 18, color: HOS.parch, lineHeight: 1.15, marginBottom: 6 }}>Every order helps launch a local food entrepreneur.</div>
        <p style={{ fontFamily: HF.b, fontSize: 12.5, color: HOS.wheat, opacity: 0.62, lineHeight: 1.6, margin: 0 }}>70% of stalls are reserved for first-time, minority, veteran, and immigrant founders working through the Hub's incubator program.</p>
      </div>
    </div>
  );
}

Object.assign(window, { CommunityScreen });
