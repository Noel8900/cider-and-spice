'use client';
// Direction 3 — Artisan Collective feature cards.
// Ghost index numbers, terracotta glyph accents, GSAP scroll reveal.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
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
    glyph: '◈',
    index: '01',
    title: 'Vendor Opportunities',
    body: 'Affordable stalls and shared commercial kitchen space designed for food entrepreneurs ready to scale — without the risk of a standalone restaurant.',
  },
  {
    glyph: '◉',
    index: '02',
    title: 'Community Dining',
    body: 'A gathering place where Las Cruces comes together over authentic, locally-made food — crafted by makers from our own backyard.',
  },
  {
    glyph: '◆',
    index: '03',
    title: 'The Craft Cider Bar',
    body: 'A curated craft cider and artisan beverage experience anchoring the heart of the hub — social, approachable, and unlike anything in Southern New Mexico.',
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-card', {
        opacity: 0, y: 40, duration: 0.9, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
      gsap.from('.feat-floor', {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.feat-floor', start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="opportunity" ref={ref} style={{ background: D3.walnut, padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>The Opportunity</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>Built for Food Makers</h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '480px', lineHeight: 1.75 }}>Designed for makers, growers, and culinary innovators across the Borderland.</p>
        </div>

        {/* Feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: `rgba(232,193,141,0.07)` }}>
          {features.map((f) => (
            <div
              key={f.title}
              className="feat-card"
              style={{ position: 'relative', background: D3.walnut, padding: '2.5rem', overflow: 'hidden', transition: 'background 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
              onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}
            >
              {/* Ghost index */}
              <span aria-hidden="true" style={{
                position: 'absolute', top: '1.25rem', right: '1.75rem',
                fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '5rem', fontWeight: 300,
                color: `${D3.wheat}06`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
              }}>{f.index}</span>

              <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.75rem', color: D3.terracotta, display: 'block', marginBottom: '1.5rem', lineHeight: 1 }}>{f.glyph}</span>

              <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.75rem', lineHeight: 1.25 }}>{f.title}</h3>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.55, marginBottom: '2rem' }}>{f.body}</p>

              {/* Hover terracotta rule */}
              <div style={{ height: '1px', width: '0', background: D3.terracotta, transition: 'width 0.5s ease' }}
                className="feat-rule" />
            </div>
          ))}
        </div>

        {/* Floor Plan CTA */}
        <Link href="/floor-plan/" className="feat-floor" style={{ display: 'block', marginTop: '1px', textDecoration: 'none' }}>
          <div
            style={{ position: 'relative', background: `rgba(92,74,48,0.2)`, borderTop: `1px solid rgba(232,193,141,0.07)`, padding: '2.5rem 3rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', overflow: 'hidden', transition: 'background 0.4s' }}
            onMouseEnter={e => { (e.currentTarget.style.background = `rgba(92,74,48,0.35)`) }}
            onMouseLeave={e => { (e.currentTarget.style.background = `rgba(92,74,48,0.2)`) }}
          >
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '16rem', background: 'radial-gradient(ellipse at right, rgba(192,98,42,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '3.5rem', color: `${D3.terracotta}66`, flexShrink: 0, transition: 'color 0.3s' }}>◇</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '0.4rem' }}>Venue Layout</p>
              <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.4rem' }}>22,400 sq ft Across Two Levels</h3>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.55, lineHeight: 1.75 }}>Explore every vendor stall, dining zone, private event room, and BOH space interactively.</p>
            </div>
            <div style={{ flexShrink: 0, border: `1px solid rgba(247,243,236,0.18)`, padding: '0.875rem 1.75rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${D3.wheat}bb`, display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', transition: 'border-color 0.3s, color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(192,98,42,0.6)`; (e.currentTarget as HTMLDivElement).style.color = D3.parchment; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(247,243,236,0.18)'; (e.currentTarget as HTMLDivElement).style.color = `${D3.wheat}bb`; }}
            >
              Explore the Floor Plan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
