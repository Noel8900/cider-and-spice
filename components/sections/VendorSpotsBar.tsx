'use client';
// VendorSpotsBar — Direction 3: Artisan Collective
// D3 palette throughout. Terracotta fill bar, wheat labels.
// Grammar: clearer reserved vs. remaining copy.
// ARIA updated to match new label text.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const TOTAL_SPOTS  = 13;
const FILLED_SPOTS = 4;   // UPDATE as applications come in
const OPEN_SPOTS   = TOTAL_SPOTS - FILLED_SPOTS;

export default function VendorSpotsBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.4, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  const pct = Math.round((FILLED_SPOTS / TOTAL_SPOTS) * 100);

  return (
    <div style={{
      border: `1px solid rgba(232,193,141,0.1)`,
      background: 'rgba(92,74,48,0.18)',
      padding: '1.25rem 1.5rem',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: D3.terracotta }}>
            Founding Cohort
          </span>
          <span style={{
            border: `1px solid rgba(192,98,42,0.4)`,
            background: 'rgba(192,98,42,0.08)',
            padding: '2px 10px',
            fontFamily: 'var(--font-josefin), system-ui, sans-serif',
            fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: D3.terracotta,
          }}>
            {OPEN_SPOTS} of {TOTAL_SPOTS} Remaining
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${D3.wheat}40` }}>
          {FILLED_SPOTS} spot{FILLED_SPOTS !== 1 ? 's' : ''} reserved
        </span>
      </div>

      {/* Progress track */}
      <div style={{ height: '1px', background: 'rgba(232,193,141,0.08)', position: 'relative', overflow: 'visible' }}>
        <div
          ref={barRef}
          style={{ position: 'absolute', inset: '0 auto 0 0', width: `${pct}%`, background: D3.terracotta }}
          role="progressbar"
          aria-valuenow={FILLED_SPOTS}
          aria-valuemin={0}
          aria-valuemax={TOTAL_SPOTS}
          aria-label={`${FILLED_SPOTS} of ${TOTAL_SPOTS} founding vendor spots reserved`}
        />
      </div>

      <p style={{ marginTop: '0.75rem', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.75rem', color: `${D3.wheat}35`, lineHeight: 1.65 }}>
        We&apos;re curating a founding cohort of {TOTAL_SPOTS} distinctive food concepts.
        Once the founding cohort is full, applications will close until a stall becomes available.
      </p>
    </div>
  );
}
