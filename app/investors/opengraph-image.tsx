import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size    = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function InvestorsOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(160deg, #1C1209 0%, #14100A 60%, #0E0C08 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ width: 48, height: 1, background: '#D4A84B', marginBottom: 36 }} />
        <div style={{ color: '#C97A3E', fontSize: 17, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 28, fontFamily: 'system-ui, sans-serif' }}>
          INVESTOR OVERVIEW · LAS CRUCES, NM
        </div>
        <div style={{ color: '#E8D3A5', fontSize: 72, fontWeight: 300, lineHeight: 0.95, marginBottom: 24 }}>
          A Once-in-a-City<br />Opportunity
        </div>
        <div style={{ color: 'rgba(232,211,165,0.50)', fontSize: 26, fontWeight: 300, maxWidth: 640 }}>
          Southern NM's first food hall and culinary incubator. 8,000 sq ft · 13 concepts · Opening Q1–Q2 2027
        </div>
        <div style={{
          position: 'absolute', bottom: 60, right: 80,
          color: 'rgba(212,168,75,0.35)', fontSize: 18, letterSpacing: '0.22em',
          textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif',
        }}>
          LC Culinary Hub
        </div>
      </div>
    ),
    { ...size }
  );
}
