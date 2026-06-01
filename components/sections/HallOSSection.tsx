'use client';
// Hall OS — The Digital Nervous System of Cider & Spice.
// Showcases the food hall operating system: vendor dashboard, POS,
// analytics, loyalty, events, and AI-powered concierge.
// Direction 3: Artisan Collective aesthetic.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  bg:         '#1C1209',
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const modules = [
  {
    glyph:  '◈',
    title:  'Vendor Dashboard',
    body:   'Real-time sales, inventory alerts, and commissary booking — every stall operator has a live window into their business.',
  },
  {
    glyph:  '◉',
    title:  'Unified POS',
    body:   'One point-of-sale ecosystem across all stalls, the cider bar, and events — shared data, shared customers.',
  },
  {
    glyph:  '◆',
    title:  'Analytics & Reporting',
    body:   'Foot-traffic heatmaps, revenue by daypart, and cohort retention — management insight at a glance.',
  },
  {
    glyph:  '✦',
    title:  'Loyalty & Cider Club',
    body:   'Integrated guest profiles link Cider Club membership, stall purchases, and event attendance into a single loyalty layer.',
  },
  {
    glyph:  '○',
    title:  'Events & Floor Flow',
    body:   'Live event scheduling, capacity tracking, and floor-plan overlays help operators run seamless programming nights.',
  },
  {
    glyph:  '□',
    title:  'AI Concierge',
    body:   'A Claude-powered assistant answers vendor questions, surfaces operational insights, and coaches new entrepreneurs in real time.',
  },
];

export default function HallOSSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hos-card', {
        opacity: 0, y: 28,
        duration: 0.8, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: '.hos-grid', start: 'top 78%', once: true },
      });
      gsap.from('.hos-cta-row', {
        opacity: 0, y: 18,
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.hos-cta-row', start: 'top 85%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hall-os"
      ref={ref}
      style={{ background: D3.bg, padding: '8rem 1.5rem', borderTop: '1px solid rgba(232,193,141,0.07)' }}
    >
      <style>{`
        .hos-card {
          position: relative;
          background: rgba(44,36,22,0.55);
          border: 1px solid rgba(232,193,141,0.09);
          padding: 2rem 1.75rem;
          transition: border-color 0.3s, background 0.3s;
          cursor: default;
        }
        .hos-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 2px;
          background: ${D3.terracotta};
          transition: width 0.35s ease;
        }
        .hos-card:hover { background: rgba(44,36,22,0.85); border-color: rgba(232,193,141,0.18); }
        .hos-card:hover::before { width: 100%; }
        .hos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1px;
          background: rgba(232,193,141,0.06);
          margin-bottom: 3.5rem;
        }
        .hos-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid rgba(192,98,42,0.35);
          background: rgba(192,98,42,0.08);
          padding: 0.35rem 0.85rem;
          font-family: var(--font-josefin), system-ui, sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: ${D3.terracotta};
        }
        .hos-pulse {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: ${D3.terracotta};
          animation: hos-pulse 1.8s ease-in-out infinite;
        }
        @keyframes hos-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        .hos-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          border: 1px solid rgba(232,193,141,0.2);
          padding: 0.9rem 2rem;
          font-family: var(--font-josefin), system-ui, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(232,193,141,0.65);
          text-decoration: none;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
        }
        .hos-explore-btn:hover {
          border-color: rgba(192,98,42,0.6);
          color: ${D3.parchment};
          background: rgba(192,98,42,0.08);
        }
        @media (max-width: 640px) {
          .hos-grid { grid-template-columns: 1fr; }
          .hos-cta-row { flex-direction: column; align-items: flex-start; gap: 1.25rem; }
        }
      `}</style>

      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>Hall OS</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>
              The Digital Nervous System
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '500px', lineHeight: 1.75 }}>
              Every stall, every tap, every event — unified in one operating platform built
              specifically for the Cider &amp; Spice ecosystem.
            </p>
          </div>
          <span className="hos-live-badge">
            <span className="hos-pulse" aria-hidden="true" />
            Live Demo Available
          </span>
        </div>

        {/* Module grid */}
        <div className="hos-grid">
          {modules.map(({ glyph, title, body }) => (
            <div key={title} className="hos-card">
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.35rem', color: D3.terracotta, marginBottom: '0.9rem', lineHeight: 1 }} aria-hidden="true">{glyph}</div>
              <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.15rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.55rem', lineHeight: 1.2 }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.82rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.5 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="hos-cta-row" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/hall-os/" className="hos-explore-btn">
            Explore Hall OS Live Demo
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.8rem', color: `${D3.wheat}45`, lineHeight: 1.6 }}>
            Interactive prototype &middot; No login required
          </p>
        </div>

      </div>
    </section>
  );
}
