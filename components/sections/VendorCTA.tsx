'use client';
// Direction 3 — Artisan Collective: vendor CTA.
// GlassCard upgrade:
//   • Central content card wrapped in GlassCard variant="glow" so the whole
//     CTA floats as a warm frosted glass surface above the ambient blobs.
//   • All existing ripple, hover, and GSAP stagger animations preserved.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  walnut:     '#2c2416',
  terracotta: '#c0622a',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

function triggerRipple(e: React.PointerEvent<HTMLAnchorElement>) {
  const btn  = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x    = e.clientX - rect.left - size / 2;
  const y    = e.clientY - rect.top  - size / 2;
  const ripple = document.createElement('span');
  Object.assign(ripple.style, {
    position:      'absolute',
    width:         size + 'px',
    height:        size + 'px',
    left:          x + 'px',
    top:           y + 'px',
    borderRadius:  '50%',
    background:    'rgba(247,243,236,0.18)',
    transform:     'scale(0)',
    pointerEvents: 'none',
    animation:     'vcta-ripple 0.55s ease-out forwards',
  });
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

export default function VendorCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vcta-item', {
        opacity: 0, y: 32, duration: 0.9, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      background: `linear-gradient(160deg, #1e1710 0%, ${D3.walnut} 50%, #1e1710 100%)`,
      padding: '8rem 1.5rem', position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes vcta-ripple {
          to { transform: scale(1); opacity: 0; }
        }
      `}</style>

      {/* Ambient radial blobs — sit behind the glass card */}
      <div style={{ pointerEvents: 'none', position: 'absolute', top: '-8rem', right: '-8rem', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,98,42,0.10) 0%, transparent 65%)', filter: 'blur(60px)', zIndex: 0 }} aria-hidden="true" />
      <div style={{ pointerEvents: 'none', position: 'absolute', bottom: '-6rem', left: '-6rem', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,140,107,0.06) 0%, transparent 65%)', filter: 'blur(60px)', zIndex: 0 }} aria-hidden="true" />

      {/* Glass card floats above blobs */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '52rem', margin: '0 auto' }}>
        <GlassCard
          variant="glow"
          hover={false}
          style={{ padding: '4rem 3.5rem', textAlign: 'center' }}
        >
          <div className="vcta-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <span style={{ display: 'block', height: '1px', width: '40px', background: D3.terracotta }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: D3.terracotta }}>
              Founding Cohort &mdash; Limited Spots
            </span>
            <span style={{ display: 'block', height: '1px', width: '40px', background: D3.terracotta }} />
          </div>

          <h2 className="vcta-item" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, color: D3.parchment, lineHeight: 0.95, letterSpacing: '-0.01em', marginBottom: '1.75rem' }}>
            Ready to Grow<br />
            <em style={{ fontStyle: 'italic', color: D3.terracotta }}>Your Food Business?</em>
          </h2>

          <p className="vcta-item" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1rem', color: D3.wheat, opacity: 0.55, lineHeight: 1.8, maxWidth: '36rem', margin: '0 auto 3rem' }}>
            Join a community of passionate food entrepreneurs in the heart of Las Cruces.
            Apply now to reserve your place in the founding cohort &mdash; or explore the
            Semilla and Mariposa incubator pathways before you apply.
          </p>

          <div className="vcta-item" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Link
              href="/vendors"
              style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', background: D3.terracotta, color: D3.parchment, padding: '1rem 2.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, transition: 'background 0.25s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#a6511f'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = D3.terracotta; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
              onPointerDown={triggerRipple}
            >
              Apply for a Stall →
            </Link>

            <Link
              href="/incubator"
              style={{ display: 'inline-block', border: '1px solid rgba(192,98,42,0.45)', color: `${D3.wheat}cc`, padding: '0.95rem 2.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192,98,42,0.85)'; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192,98,42,0.45)'; (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}cc`; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
            >
              Explore the Incubator →
            </Link>

            <Link
              href="/investors"
              style={{ display: 'inline-block', border: '1px solid rgba(247,243,236,0.2)', color: `${D3.wheat}bb`, padding: '0.95rem 2.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s, transform 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192,98,42,0.55)'; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(247,243,236,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}bb`; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
            >
              Investor Overview →
            </Link>
          </div>

          <p className="vcta-item" style={{ marginTop: '2.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}35` }}>
            Opening Q1&ndash;Q2 2027 &middot; Downtown Las Cruces, NM
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
