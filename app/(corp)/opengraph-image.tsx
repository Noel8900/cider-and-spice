import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nexus Capital Group — Global Investment Advisory';
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
          background: '#0C1420',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top gold rule */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.7), transparent)',
          }}
        />

        {/* Subtle blue glow */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            left: '-150px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,63,122,0.25) 0%, transparent 65%)',
          }}
        />

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
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <div style={{ height: '1px', width: '40px', background: '#C9A84C', opacity: 0.5 }} />
            <span
              style={{
                fontFamily: 'serif',
                fontSize: '12px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                opacity: 0.75,
              }}
            >
              Global Investment Advisory
            </span>
            <div style={{ height: '1px', width: '40px', background: '#C9A84C', opacity: 0.5 }} />
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: '76px',
              fontFamily: 'serif',
              fontWeight: 300,
              color: '#E8EAEF',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            Nexus Capital Group
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '22px',
              fontFamily: 'sans-serif',
              color: 'rgba(136,150,179,0.8)',
              fontWeight: 300,
              marginTop: '16px',
            }}
          >
            Capital Advisory · Strategic Transformation · Private Equity
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
            background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
