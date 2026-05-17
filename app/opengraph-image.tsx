import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Las Cruces Culinary Innovation Hub — Cider & Spice';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1C1209',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ember glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,98,45,0.18) 0%, transparent 65%)',
          }}
        />
        {/* Gold glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,168,75,0.10) 0%, transparent 65%)',
          }}
        />

        {/* Top gold rule */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(212,168,75,0.6), transparent)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0px',
            padding: '0 80px',
            textAlign: 'center',
          }}
        >
          {/* Glyph */}
          <div
            style={{
              fontSize: '52px',
              color: '#d4a84b',
              marginBottom: '24px',
              opacity: 0.8,
            }}
          >
            ◈
          </div>

          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div style={{ height: '1px', width: '40px', background: '#d4a84b', opacity: 0.6 }} />
            <span
              style={{
                fontFamily: 'serif',
                fontSize: '13px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#d4a84b',
                opacity: 0.8,
              }}
            >
              Opening Q1–Q2 2027 · Downtown Las Cruces, NM
            </span>
            <div style={{ height: '1px', width: '40px', background: '#d4a84b', opacity: 0.6 }} />
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: '88px',
              fontFamily: 'serif',
              fontWeight: 300,
              color: '#F5ECD7',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Cider &amp; Spice
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '24px',
              fontFamily: 'sans-serif',
              color: 'rgba(245,236,215,0.5)',
              fontWeight: 300,
              marginTop: '20px',
            }}
          >
            Food Hall · Craft Cider Bar · Culinary Incubator
          </div>
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(212,168,75,0.3), transparent)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
