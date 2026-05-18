'use client';
// SevenZoneWorkflow — Direction 3: Artisan Collective
// Standalone component used inside KitchenPoliciesSection > Production Workflow tab.
//
// Desktop (≥ 640 px): vertical terracotta spine with absolute step dots,
//                       numbered badges offset left of each row.
// Mobile  (< 640 px):  no absolute spine — each zone renders as a full-width
//                       numbered card stack; dot is inline at the top-left of
//                       the card header, chip row wraps freely.
//
// Responsive logic uses a single CSS class + <style> block — no JS resize
// listener needed. GSAP stagger fires once on scroll enter.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const zones = [
  {
    zone: 'Receiving & Dry Storage',
    purpose: 'Verify supplier condition, packaging integrity, and temperature of incoming goods.',
    ccp: 'TCS temperature verification, packaging integrity, allergen segregation, FIFO rotation',
  },
  {
    zone: 'Cold & Frozen Storage',
    purpose: 'Hold TCS ingredients, proteins, dairy, and prepped goods safely.',
    ccp: 'Cold-holding temp range, covered containers, raw proteins below RTE items',
  },
  {
    zone: 'Prep Zone',
    purpose: 'Wash, cut, portion, thaw, marinate, and stage mise en place.',
    ccp: 'Handwashing frequency, deep sanitation between tasks, allergen cross-contact prevention',
  },
  {
    zone: 'Cooking Zone',
    purpose: 'Cook products to approved internal temperatures.',
    ccp: 'Internal cooking temp verification, batch traceability logs',
  },
  {
    zone: 'Cooling & Reheating',
    purpose: 'Safely cool cooked foods; reheat held items for service.',
    ccp: 'Two-stage cooling monitoring and logging, rapid reheating execution',
  },
  {
    zone: 'Holding & Service',
    purpose: 'Maintain food safety from production until service or packaging.',
    ccp: 'Continuous holding temp logging, time-marking protocols',
  },
  {
    zone: 'Dishwashing & Cleaning',
    purpose: 'Wash, rinse, sanitize, and air-dry wares; deep clean surfaces.',
    ccp: 'Sanitizer concentration verification, dirty-to-clean directional flow',
  },
];

export default function SevenZoneWorkflow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.szw-row', {
        opacity: 0, y: 20, duration: 0.65, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <style>{`
        /* ── Desktop spine ──────────────────────────────────────────── */
        .szw-spine {
          display: block;
        }
        .szw-row {
          position: relative;
          padding-left: 2.75rem;
          padding-right: 1.25rem;
          padding-top: 1.1rem;
          padding-bottom: 1.1rem;
        }
        .szw-dot {
          position: absolute;
          left: -7px;
          top: 1.1rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${D3.chestnut};
          border: 2px solid ${D3.terracotta};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-josefin), system-ui, sans-serif;
          font-size: 0.52rem;
          letter-spacing: 0.08em;
          color: ${D3.wheat};
          font-weight: 600;
          flex-shrink: 0;
        }
        .szw-header {
          display: block;
          margin-bottom: 0.35rem;
        }
        /* ── Mobile overrides (< 640 px) ────────────────────────────── */
        @media (max-width: 639px) {
          .szw-spine {
            display: none;
          }
          .szw-row {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .szw-dot {
            position: static;
            margin-bottom: 0.75rem;
            width: 28px;
            height: 28px;
            font-size: 0.6rem;
          }
          .szw-header {
            display: flex;
            align-items: center;
            gap: 0.65rem;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>

      {/* Vertical spine — hidden on mobile via .szw-spine */}
      <div
        className="szw-spine"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '1.25rem',
          bottom: '1.25rem',
          left: '10px',
          width: '2px',
          background: 'linear-gradient(to bottom, rgba(192,98,42,0.5), rgba(232,193,141,0.15))',
          borderRadius: '2px',
        }}
      />

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {zones.map((row, index) => {
          const chips = row.ccp.split(',').map(s => s.trim()).filter(Boolean);
          const borderAccent =
            index === 0 ? D3.terracotta
            : index < 3  ? `${D3.terracotta}bb`
            : index < 6  ? `${D3.terracotta}77`
            :               `${D3.terracotta}44`;

          return (
            <li
              key={row.zone}
              className="szw-row"
              style={{
                background: index % 2 === 0 ? 'rgba(44,36,22,0.30)' : 'rgba(44,36,22,0.15)',
                border: '1px solid rgba(232,193,141,0.1)',
                borderLeft: `3px solid ${borderAccent}`,
              }}
            >
              <div className="szw-header">
                <div className="szw-dot" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '1.1rem', fontWeight: 400,
                  color: D3.parchment, lineHeight: 1.2,
                }}>
                  {row.zone}
                </span>
              </div>

              <p style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.85rem', lineHeight: 1.7,
                color: `${D3.wheat}75`, margin: '0 0 0.7rem',
              }}>
                {row.purpose}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {chips.map(chip => (
                  <span
                    key={chip}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      padding: '0.22rem 0.65rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(232,193,141,0.22)',
                      background: 'rgba(92,74,48,0.55)',
                      fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                      fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: `${D3.wheat}80`,
                    }}
                  >
                    <span aria-hidden="true" style={{ width: '4px', height: '4px', borderRadius: '50%', background: D3.terracotta, flexShrink: 0 }} />
                    {chip}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      <div
        aria-hidden="true"
        style={{
          marginTop: '1.25rem',
          marginLeft: '0.5rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontFamily: 'var(--font-josefin), system-ui, sans-serif',
          fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: `${D3.wheat}35`,
        }}
      >
        <span style={{ display: 'block', width: '16px', height: '1px', background: `${D3.wheat}25` }} />
        End of production cycle
      </div>
    </div>
  );
}
