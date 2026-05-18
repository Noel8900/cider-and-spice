'use client';

const D3 = { walnut: '#2c2416', terracotta: '#c0622a', wheat: '#e8c18d' } as const;

export default function Loading() {
  return (
    <div style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', background: D3.walnut, gap: '1.25rem',
    }}>
      <div style={{
        width: '36px', height: '36px', border: `2px solid ${D3.terracotta}30`,
        borderTop: `2px solid ${D3.terracotta}`, borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <span style={{
        fontFamily: 'var(--font-josefin), system-ui, sans-serif',
        fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase',
        color: `${D3.wheat}55`,
      }}>Loading</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
