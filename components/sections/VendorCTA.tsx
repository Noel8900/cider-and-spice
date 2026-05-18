'use client';
// Direction 3 — Artisan Collective: vendor CTA.
// Grammar pass: eyebrow, body, and tagline copy tightened.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  walnut:     '#2c2416',
  terracotta: '#c0622a',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

export default function VendorCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vcta-item', { opacity: 0, y: 32, duration: 0.9, stagger: 0.14, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ background: `linear-gradient(160deg, #1e1710 0%, ${D3.walnut} 50%, #1e1710 100%)`, padding: '8rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glows */}
      <div style={{ pointerEvents: 'none', position: 'absolute', top: '-8rem', right: '-8rem', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,98,42,0.10) 0%, transparent 65%)', filter: 'blur(60px)' }} aria-hidden="true" />
      <div style={{ pointerEvents: 'none', position: 'absolute', bottom: '-6rem', left: '-6rem', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,140,107,0.06) 0%, transparent 65%)', filter: 'blur(60px)' }} aria-hidden="true" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>

        {/* Eyebrow */}
        <div className="vcta-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <span style={{ display: 'block', height: '1px', width: '40px', background: D3.terracotta }} />
          <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: D3.terracotta }}>Founding Cohort &mdash; Limited Spots</span>
          <span style={{ display: 'block', height: '1px', width: '40px', background: D3.terracotta }} />
        </div>

        <h2 className="vcta-item" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, color: D3.parchment, lineHeight: 0.95, letterSpacing: '-0.01em', marginBottom: '1.75rem' }}>
          Ready to Grow<br />
          <em style={{ fontStyle: 'italic', color: D3.terracotta }}>Your Food Business?</em>
        </h2>

        <p className="vcta-item" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1rem', color: D3.wheat, opacity: 0.55, lineHeight: 1.8, maxWidth: '36rem', margin: '0 auto 3rem' }}>
          Join a community of passionate food entrepreneurs in the heart of Las Cruces.
          Apply now to reserve your place in the founding cohort.
        </p>

        <div className="vcta-item" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <Link href="/vendors"
            style={{ background: D3.terracotta, color: D3.parchment, padding: '1rem 2.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, transition: 'opacity 0.25s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >Apply for a Stall →</Link>
          <Link href="/investors"
            style={{ border: '1px solid rgba(247,243,236,0.2)', color: `${D3.wheat}bb`, padding: '0.95rem 2.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(192,98,42,0.55)`; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(247,243,236,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}bb`; }}
          >Investor Overview →</Link>
        </div>

        <p className="vcta-item" style={{ marginTop: '2.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}35` }}>
          Opening Q1&ndash;Q2 2027 &middot; Downtown Las Cruces, NM
        </p>
      </div>
    </section>
  );
}
