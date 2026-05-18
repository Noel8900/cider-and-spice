'use client';
// Direction 3 — Artisan Collective: six-step incubator pathway.
// Luxury upgrades:
//   • Step dots enlarged to 14px, glow terracotta on row hover via CSS class.
//   • hiw-arrow reveals on row hover as before.

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

const steps = [
  {
    number: '01',
    title: 'Apply for a Stall',
    body: 'Submit your concept — cuisine type, booth size, and vision. No prior restaurant experience required. Every application is reviewed personally.',
  },
  {
    number: '02',
    title: 'Use the Commissary Kitchen',
    body: 'Prep and produce in our fully equipped commercial kitchen at a fraction of the cost of building your own — certified, inspected, and ready from day one.',
  },
  {
    number: '03',
    title: 'Get Mentored & Coached',
    body: 'Weekly sessions with WESST New Mexico and SCORE mentors cover bookkeeping, food safety, marketing, and menu pricing — at no additional cost.',
  },
  {
    number: '04',
    title: 'Host Events',
    body: 'Live music nights, cultural markets, and seasonal festivals are built around your food — giving you built-in marketing and foot traffic from day one.',
  },
  {
    number: '05',
    title: 'Grow with the Cider Bar',
    body: 'Partner with our craft cider bar on shared event programming, reach Cider Club members, and grow your audience beyond the food hall floor.',
  },
  {
    number: '06',
    title: 'Graduate to Your Own Space',
    body: 'Our alumni network, Las Cruces SBDC connections, and SBA lending partnerships help you secure financing when you're ready for a permanent location.',
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hiw-spine', {
        scaleY: 0, transformOrigin: 'top', duration: 1.4, ease: 'power2.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      });
      gsap.from('.hiw-step', {
        opacity: 0, x: -24, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="concept" ref={ref} style={{ background: `linear-gradient(to bottom, ${D3.walnut}, #1e1710)`, padding: '8rem 1.5rem' }}>
      <style>{`
        .hiw-step:hover .hiw-dot {
          border-color: ${D3.terracotta} !important;
          background:   ${D3.terracotta} !important;
          box-shadow:   0 0 0 4px rgba(192,98,42,0.18), 0 0 14px rgba(192,98,42,0.45) !important;
          transform:    scale(1.2);
        }
        .hiw-dot {
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s, transform 0.3s;
        }
      `}</style>

      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>How It Works</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>
            Your Path from Pop-Up to Permanent
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '480px', lineHeight: 1.75 }}>
            Six steps from home-kitchen dream to a thriving downtown Las Cruces business.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div className="hiw-spine" style={{ position: 'absolute', left: '1.6rem', top: '1rem', bottom: '1rem', width: '1px', background: `linear-gradient(to bottom, ${D3.sage}, rgba(107,140,107,0.12))` }} aria-hidden="true" />
          <div style={{ position: 'absolute', left: '1.6rem', top: '1rem', bottom: '1rem', width: '1px', background: 'rgba(247,243,236,0.05)' }} aria-hidden="true" />

          <div>
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="hiw-step"
                style={{
                  display: 'flex', gap: '3rem', alignItems: 'flex-start',
                  borderBottom: i < steps.length - 1 ? `1px solid rgba(232,193,141,0.07)` : 'none',
                  padding: '2.25rem 1rem',
                  transition: 'background 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget.style.background = 'rgba(92,74,48,0.18)');
                  const arrow = e.currentTarget.querySelector<HTMLDivElement>('.hiw-arrow');
                  if (arrow) arrow.style.opacity = '1';
                }}
                onMouseLeave={e => {
                  (e.currentTarget.style.background = 'transparent');
                  const arrow = e.currentTarget.querySelector<HTMLDivElement>('.hiw-arrow');
                  if (arrow) arrow.style.opacity = '0';
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0, width: '2.5rem', textAlign: 'right', paddingTop: '0.2rem' }}>
                  <div
                    className="hiw-dot"
                    style={{
                      position: 'absolute',
                      right: '-1.7rem', top: '0.45rem',
                      width: '14px', height: '14px',
                      borderRadius: '50%',
                      border: `2px solid rgba(192,98,42,0.45)`,
                      background: D3.walnut,
                      boxShadow: '0 0 0 0 transparent',
                    }}
                    aria-hidden="true"
                  />
                  <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.75rem', fontWeight: 300, color: `${D3.terracotta}60`, lineHeight: 1 }}>
                    {step.number}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.5rem', lineHeight: 1.25 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.55, maxWidth: '42rem' }}>{step.body}</p>
                </div>

                <div className="hiw-arrow" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', opacity: 0, transition: 'opacity 0.3s', paddingTop: '0.4rem' }} aria-hidden="true">
                  <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: D3.terracotta, fontSize: '1.25rem' }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
