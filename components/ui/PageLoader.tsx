'use client';
// PageLoader — branded full-screen loader shown via app/loading.tsx Suspense boundary.
// Luxury upgrade:
//   • Terracotta progress bar animates 0 → 85% over 1.8s (indeterminate feel),
//     then snaps to 100% + fades the whole loader out when component unmounts.
//   • Wordmark fades in below the bar for brand recall during load.
//   • Thin shimmer highlight sweeps left → right on the bar via @keyframes.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const D3 = {
  walnut:     '#2c2416',
  terracotta: '#c0622a',
  wheat:      '#e8c18d',
} as const;

export default function PageLoader() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar  = barRef.current;
    const wrap = wrapRef.current;
    if (!bar || !wrap) return;

    gsap.fromTo(bar,
      { width: '0%' },
      { width: '85%', duration: 1.8, ease: 'power1.inOut' }
    );

    gsap.fromTo('.pl-wordmark',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.3 }
    );

    return () => {
      gsap.killTweensOf(bar);
      gsap.to(bar,  { width: '100%', duration: 0.25, ease: 'power2.out' });
      gsap.to(wrap, { opacity: 0, duration: 0.4, ease: 'power2.in', delay: 0.2 });
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-label="Loading page"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        background: D3.walnut,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <style>{`
        @keyframes pl-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>

      <div style={{
        width: 'min(320px, 80vw)',
        height: '1px',
        background: 'rgba(232,193,141,0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          ref={barRef}
          style={{
            position: 'absolute', inset: '0 auto 0 0',
            width: '0%', height: '100%',
            background: D3.terracotta,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '25%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(247,243,236,0.35), transparent)',
            animation: 'pl-shimmer 1.6s ease-in-out infinite',
          }}
        />
      </div>

      <p
        className="pl-wordmark"
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '1rem', fontWeight: 300, letterSpacing: '0.35em',
          textTransform: 'uppercase', color: `${D3.wheat}40`,
          opacity: 0,
        }}
      >
        Cider &amp; Spice
      </p>
    </div>
  );
}
