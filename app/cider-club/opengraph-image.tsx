import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size    = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function CiderClubOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #1C1209 0%, #2A1506 50%, #1C1209 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Gold accent line */}
        <div style={{ width: 64, height: 2, background: 'linear-gradient(90deg, #C97A3E, #D4A84B)', marginBottom: 32 }} />
        {/* Eyebrow */}
        <div style={{ color: '#C97A3E', fontSize: 18, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'system-ui, sans-serif' }}>
          CIDER &amp; SPICE BAR · FOUNDING MEMBERSHIP
        </div>
        {/* Headline */}
        <div style={{ color: '#F5EFE6', fontSize: 72, fontWeight: 300, lineHeight: 1, marginBottom: 28 }}>
          Cider Club
        </div>
        <div style={{ color: '#D4A84B', fontSize: 72, fontWeight: 300, lineHeight: 1, marginBottom: 40 }}>
          Founding Pour
        </div>
        {/* Sub */}
        <div style={{ color: 'rgba(245,239,230,0.55)', fontSize: 28, fontWeight: 300, maxWidth: 640 }}>
          20–25 rotating craft taps · Exclusive founding member perks · Las Cruces, NM · Opening 2027
        </div>
        {/* Brand */}
        <div style={{
          position: 'absolute', bottom: 60, right: 80,
          color: 'rgba(212,168,75,0.45)', fontSize: 20, letterSpacing: '0.2em',
          textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif',
        }}>
          LC Culinary Hub
        </div>
      </div>
    ),
    { ...size }
  );
}
