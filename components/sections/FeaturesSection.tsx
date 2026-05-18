'use client';
// Direction 3 — Artisan Collective: key features / amenities.
// Luxury upgrades:
//   • Cards stagger in from y:32 + opacity:0 via GSAP on scroll.
//   • Each card gets a CSS perspective tilt on mouse move (rotateX/Y ±4°).
//   • Card resets smoothly on mouseleave via transition.
//   • Terracotta top-border accent slides from width:0 → 100% on hover.

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

const features = [
  {
    glyph:   '◈',
    title:   '8,000 sq ft Venue',
    body:    'A fully built-out food hall floor on East Lohman Ave — eight dedicated vendor stalls, shared seating, and a dedicated event stage.',
  },
  {
    glyph:   '✦',
    title:   'Commissary Kitchen',
    body:    'A licensed, inspected commercial prep kitchen available to all vendors by the hour — certified for catering, pop-ups, and food product manufacturing.',
  },
  {
    glyph:   '◉',
    title:   '25-Tap Craft Cider Bar',
    body:    "Southern New Mexico's only dedicated craft cider bar — 25 rotating regional and national taps plus a full Cider Club membership program.",
  },
  {
    glyph:   '◆',
    title:   'Event Stage & Programming',
    body:    'A built-in stage for weekly live music, cultural markets, chile harvest festivals, cooking classes, and entrepreneurship showcases.',
  },
  {
    glyph:   '○',
    title:   'Incubator Pathway',
    body:    'Two structured tracks — Semilla (seed) and Mariposa (growth) — with mentorship from WESST NM, SCORE, and the Las Cruces SBDC.',
  },
  {
    glyph:   '□',
    title:   'Flexible Stall Leases',
    body:    'Month-to-month and annual lease options designed for early-stage food entrepreneurs — no prior restaurant experience required to apply.',
  },
];

function tilt(e: React.MouseEvent<HTMLDivElement>) {
  const el   = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x    = (e.clientX - rect.left) / rect.width  - 0.5;
  const y    = (e.clientY - rect.top)  / rect.height - 0.5;
  el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-2px)`;
}

function resetTilt(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)';
}

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        opacity: 0, y: 32, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.features-grid', start: 'top 78%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} style={{ background: `linear-gradient(to bottom, #1e1710, ${D3.walnut})`, padding: '8rem 1.5rem' }}>
      <style>{`
        .feature-card {
          transition: transform 0.25s ease, border-color 0.3s;
          transform-style: preserve-3d;
        }
        .feature-card::after {
          content: '';
          display: block;
          position: absolute;
          top: -1px; left: 0;
          height: 2px;
          width: 0;
          background: ${D3.terracotta};
          transition: width 0.35s ease;
        }
        .feature-card:hover::after {
          width: 100%;
        }
      `}</style>

      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>What’s Inside</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>Built for Food Makers</h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '480px', lineHeight: 1.75 }}>
            Every feature of Cider &amp; Spice was designed around what local food entrepreneurs actually need.
          </p>
        </div>

        {/* Grid */}
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
          {features.map(({ glyph, title, body }) => (
            <div
              key={title}
              className="feature-card"
              style={{
                position: 'relative',
                background: D3.walnut,
                padding: '2.25rem 2rem',
                borderTop: `1px solid rgba(232,193,141,0.09)`,
                cursor: 'default',
              }}
              onMouseMove={tilt}
              onMouseLeave={resetTilt}
            >
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', color: D3.terracotta, marginBottom: '1rem', lineHeight: 1 }} aria-hidden="true">{glyph}</div>
              <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.25rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.65rem', lineHeight: 1.2 }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.82rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.5 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
