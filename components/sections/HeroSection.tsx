'use client';
// Direction 3 — Artisan Collective: hero.
// Luxury upgrades:
//   • Scroll indicator: SVG chevron bounces via CSS @keyframes hero-bounce.
//   • Primary CTA: darkens on hover + translateY(-1px) lift.
//   • Headline: letter-spacing micro-tightens from -0.01em → -0.025em on mount via GSAP.

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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

function useCountUp(target: number, suffix: string, decimals = 0, duration = 2.2) {
  const [display, setDisplay] = useState('0' + suffix);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration, ease: 'power2.out',
            onUpdate() { setDisplay(obj.val.toFixed(decimals) + suffix); },
            onComplete() { setDisplay(target.toFixed(decimals) + suffix); },
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, decimals, duration]);
  return { ref, display };
}

function StatBadge({ prefix, target, suffix, label, decimals = 0 }: {
  prefix?: string; target: number; suffix: string; label: string; decimals?: number;
}) {
  const { ref, display } = useCountUp(target, suffix, decimals);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      border: '1px solid rgba(247,243,236,0.12)',
      padding: '1.1rem 1.4rem',
      background: 'rgba(44,36,22,0.55)',
      backdropFilter: 'blur(8px)',
      transition: 'border-color 0.4s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(192,98,42,0.45)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(247,243,236,0.12)')}>
      <span ref={ref}
        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.9rem', fontWeight: 300, lineHeight: 1, color: D3.terracotta }}
        aria-live="polite">
        {prefix}{display}
      </span>
      <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '0.4rem', color: `${D3.wheat}60` }}>
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const ref         = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal
      gsap.from(
        ['.hero-eyebrow', '.hero-headline', '.hero-subhead', '.hero-actions', '.hero-stats'],
        { opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );
      // Headline letter-spacing micro-tighten
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { letterSpacing: '0.02em' },
          { letterSpacing: '-0.025em', duration: 1.4, ease: 'power2.out', delay: 0.3 }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ position: 'relative', display: 'flex', minHeight: '100svh', alignItems: 'center' }} aria-label="Hero">
      <style>{`
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0);    opacity: 0.55; }
          50%       { transform: translateY(5px);  opacity: 1;    }
        }
        .hero-scroll-chevron {
          animation: hero-bounce 1.8s ease-in-out infinite;
        }
        .hero-scroll-indicator:hover .hero-scroll-chevron {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <Image
          src="/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png"
          alt="" fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background:
            `linear-gradient(to right, rgba(44,36,22,0.93) 0%, rgba(44,36,22,0.58) 60%, rgba(44,36,22,0.30) 100%), ` +
            `linear-gradient(to top, rgba(44,36,22,0.85) 0%, transparent 45%)`,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 15% 50%, rgba(192,98,42,0.09) 0%, transparent 70%)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '80rem', margin: '0 auto', padding: '6rem 1.5rem 4rem' }}>

        {/* Eyebrow */}
        <div className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>
            Opening Q1–Q2 2027 · Downtown Las Cruces, NM
          </span>
        </div>

        {/* Headline — letter-spacing tightens on mount */}
        <h1
          ref={headlineRef}
          className="hero-headline"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            color: D3.parchment,
            marginBottom: '1.75rem',
            maxWidth: '820px',
          }}
        >
          Where Las Cruces<br />
          <em style={{ fontStyle: 'italic', color: D3.terracotta }}>Eats the World</em>
        </h1>

        {/* Wheat rule */}
        <div style={{ width: '56px', height: '1px', background: `linear-gradient(to right, ${D3.wheat}, transparent)`, marginBottom: '1.75rem' }} />

        {/* Subhead */}
        <p className="hero-subhead" style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
          fontSize: '1rem', lineHeight: 1.85, color: D3.wheat, opacity: 0.7,
          maxWidth: '520px', marginBottom: '2.5rem', letterSpacing: '0.02em',
        }}>
          A next-generation food hall, culinary incubator, and Southern New Mexico&apos;s
          only craft cider bar — giving Borderland food makers a permanent downtown home.
        </p>

        {/* CTAs */}
        <div className="hero-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3.5rem' }}>
          <Link href="#opportunity"
            style={{
              display: 'inline-block', background: D3.terracotta, color: D3.parchment,
              padding: '14px 36px', fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.67rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 600,
              transition: 'background 0.25s, transform 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background  = '#a6511f';
              (e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background  = D3.terracotta;
              (e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(0)';
            }}
          >See the Opportunity</Link>

          <Link href="/investors" style={{
            display: 'inline-block', border: '1px solid rgba(247,243,236,0.2)',
            color: `${D3.wheat}bb`, padding: '13px 36px',
            fontFamily: 'var(--font-josefin), system-ui, sans-serif',
            fontSize: '0.67rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s, transform 0.2s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192,98,42,0.6)';
              (e.currentTarget as HTMLAnchorElement).style.color       = D3.parchment;
              (e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(247,243,236,0.2)';
              (e.currentTarget as HTMLAnchorElement).style.color       = `${D3.wheat}bb`;
              (e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(0)';
            }}
          >Investor Overview</Link>

          <Link href="/floor-plan/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: '1px solid rgba(247,243,236,0.2)', color: `${D3.wheat}bb`,
            padding: '13px 36px', fontFamily: 'var(--font-josefin), system-ui, sans-serif',
            fontSize: '0.67rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s, transform 0.2s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192,98,42,0.6)';
              (e.currentTarget as HTMLAnchorElement).style.color       = D3.parchment;
              (e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(247,243,236,0.2)';
              (e.currentTarget as HTMLAnchorElement).style.color       = `${D3.wheat}bb`;
              (e.currentTarget as HTMLAnchorElement).style.transform   = 'translateY(0)';
            }}
          >
            <span style={{ color: 'rgba(192,98,42,0.65)', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem' }} aria-hidden="true">✦</span>
            Explore the Floor Plan
          </Link>
        </div>

        {/* Stat badges */}
        <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, auto))', gap: '0.75rem', maxWidth: '560px' }}>
          <StatBadge target={8000} suffix=" sq ft" label="Indoor Venue" />
          <StatBadge target={13}   suffix=""        label="Global Concepts" prefix="Up to " />
          <StatBadge target={25}   suffix=" taps"   label="Rotating Cider"  prefix="Up to " />
        </div>
      </div>

      {/* Scroll indicator — chevron bounces via CSS */}
      <a
        href="#opportunity"
        aria-label="Scroll to the opportunity section"
        className="hero-scroll-indicator"
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-josefin), system-ui, sans-serif',
          fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: `${D3.wheat}55`, textDecoration: 'none', transition: 'color 0.3s', zIndex: 10,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = D3.terracotta)}
        onMouseLeave={e => (e.currentTarget.style.color = `${D3.wheat}55`)}
      >
        <span>Explore</span>
        <svg
          className="hero-scroll-chevron"
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
