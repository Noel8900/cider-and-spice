'use client';
// VendorSpotsBar — Direction 3: Artisan Collective
// Luxury upgrades:
//   • Badge counter animates from TOTAL → OPEN via GSAP + IntersectionObserver.
//   • Badge pulses with @keyframes spots-pulse when OPEN_SPOTS ≤ 5.
//   • Fill bar scaleX animation preserved.

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const TOTAL_SPOTS:  number = 13;
const FILLED_SPOTS: number = 4;
const OPEN_SPOTS   = TOTAL_SPOTS - FILLED_SPOTS;
const IS_URGENT    = OPEN_SPOTS <= 5;

export default function VendorSpotsBar() {
  const barRef   = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(TOTAL_SPOTS);

  const pct = Math.round((FILLED_SPOTS / TOTAL_SPOTS) * 100);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(barRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.4, ease: 'power3.out', delay: 0.3 }
      );
    }
    const badge = badgeRef.current;
    if (!badge) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        const obj = { val: TOTAL_SPOTS };
        gsap.to(obj, {
          val: OPEN_SPOTS, duration: 1.1, ease: 'power2.out', delay: 0.5,
          onUpdate()  { setDisplayed(Math.round(obj.val)); },
          onComplete() { setDisplayed(OPEN_SPOTS); },
        });
      }
    }, { threshold: 0.6 });
    observer.observe(badge);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ border: '1px solid rgba(232,193,141,0.1)', background: 'rgba(92,74,48,0.18)', padding: '1.25rem 1.5rem' }}>
      <style>{`
        @keyframes spots-pulse {
          0%, 100% { box-shadow: 0 0 0 0   rgba(192,98,42,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(192,98,42,0);   }
        }
        .spots-badge-urgent { animation: spots-pulse 1.8s ease-out infinite; }
      `}</style>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: D3.terracotta }}>Founding Cohort</span>
          <span
            ref={badgeRef}
            className={IS_URGENT ? 'spots-badge-urgent' : ''}
            style={{ border: '1px solid rgba(192,98,42,0.4)', background: 'rgba(192,98,42,0.08)', padding: '2px 10px', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: D3.terracotta }}
          >
            {displayed} of {TOTAL_SPOTS} Remaining
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${D3.wheat}40` }}>
          {FILLED_SPOTS} spot{FILLED_SPOTS !== 1 ? 's' : ''} reserved
        </span>
      </div>

      <div style={{ height: '1px', background: 'rgba(232,193,141,0.08)', position: 'relative', overflow: 'visible' }}>
        <div
          ref={barRef}
          style={{ position: 'absolute', inset: '0 auto 0 0', width: `${pct}%`, background: D3.terracotta }}
          role="progressbar" aria-valuenow={FILLED_SPOTS} aria-valuemin={0} aria-valuemax={TOTAL_SPOTS}
          aria-label={`${FILLED_SPOTS} of ${TOTAL_SPOTS} founding vendor spots reserved`}
        />
      </div>

      <p style={{ marginTop: '0.75rem', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.75rem', color: `${D3.wheat}35`, lineHeight: 1.65 }}>
        We&apos;re curating a founding cohort of {TOTAL_SPOTS} distinctive food concepts for our
        Q1&ndash;Q2 2027 opening. Applications close permanently once all {TOTAL_SPOTS} stalls are
        reserved &mdash; no waitlist.
      </p>
    </div>
  );
}
