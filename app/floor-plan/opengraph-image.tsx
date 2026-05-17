import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size    = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function FloorPlanOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, #1A1510 0%, #100E0A 70%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ width: 64, height: 1, background: 'rgba(212,168,75,0.60)', marginBottom: 36 }} />
        <div style={{ color: '#C97A3E', fontSize: 17, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 28, fontFamily: 'system-ui, sans-serif' }}>
          INTERACTIVE FLOOR PLAN · PLAN A-1 · 2027
        </div>
        <div style={{ color: '#E8D3A5', fontSize: 80, fontWeight: 300, lineHeight: 0.92, marginBottom: 16 }}>
          8,000 Sq Ft
        </div>
        <div style={{ color: '#D4A84B', fontSize: 36, fontWeight: 300, marginBottom: 36 }}>
          Las Cruces Culinary Innovation Hub
        </div>
        <div style={{ color: 'rgba(232,211,165,0.45)', fontSize: 26, fontWeight: 300 }}>
          13 vendor stalls · Craft Cider Bar · Commissary Kitchen · Event Stage
        </div>
        <div style={{
          position: 'absolute', bottom: 60, right: 80,
          color: 'rgba(212,168,75,0.35)', fontSize: 18, letterSpacing: '0.22em',
          textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif',
        }}>
          LC Culinary Hub · Plan A-1
        </div>
      </div>
    ),
    { ...size }
  );
}
