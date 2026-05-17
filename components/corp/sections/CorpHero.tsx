'use client';
// Full-screen cinematic hero with GSAP staggered headline reveal.
// Background: deep navy with ambient gold gradient orbs (CSS only, no images).

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const HEADLINE_WORDS = ['Capital', 'Elevated.', 'Strategy', 'Defined.'];
const TAGLINES = [
  'Global investment advisory trusted by the world\'s',
  'most consequential institutions since 1994.',
];

export default function CorpHero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger each headline word in
      gsap.from('.hero-word', {
        opacity: 0,
        y: 60,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3,
      });
      // Tagline
      gsap.from('.hero-tagline', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.9,
      });
      // CTAs
      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.3,
      });
      // Stat strip
      gsap.from('.hero-stat', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 1.6,
      });
      // Scroll indicator
      gsap.from('.hero-scroll', {
        opacity: 0,
        duration: 0.8,
        delay: 2,
        ease: 'power1.out',
      });
      // Subtle pulsing glow on orb
      gsap.to('.hero-orb', {
        scale: 1.08,
        opacity: 0.35,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-corp-ink"
      aria-label="Nexus Capital Group — Hero"
    >
      {/* Ambient gold gradient orbs */}
      <div
        className="hero-orb pointer-events-none absolute -top-40 -left-40 w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.35) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[360px] h-[360px] md:w-[800px] md:h-[800px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(26,63,122,0.7) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Eyebrow */}
        <div className="hero-cta flex items-center gap-3 mb-10">
          <span className="block h-px w-10 bg-corp-gold" />
          <span className="font-label text-xs tracking-[0.3em] uppercase text-corp-gold">
            Est. 1994 · New York
          </span>
        </div>

        {/* Main headline — 2×2 word grid on large screens */}
        <h1 className="font-corp-display font-light text-4xl sm:text-5xl md:text-7xl lg:text-9xl leading-none mb-8 md:mb-10 text-corp-platinum">
          {HEADLINE_WORDS.map((word, i) => (
            <span key={word} className="hero-word inline-block mr-3 md:mr-6">
              {i === 1 || i === 3 ? (
                <em className="not-italic text-corp-gold">{word}</em>
              ) : word}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <div className="max-w-xl mb-12">
          {TAGLINES.map(line => (
            <p key={line} className="hero-tagline font-sans text-lg text-corp-steel leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-wrap gap-4 mb-20">
          <Link
            href="/services"
            className="font-label text-xs tracking-[0.25em] uppercase px-8 py-4
                       bg-corp-gold text-corp-ink hover:bg-corp-gold-light
                       transition-all duration-300"
          >
            Our Services →
          </Link>
          <Link
            href="/about"
            className="font-label text-xs tracking-[0.25em] uppercase px-8 py-4
                       border border-corp-platinum/25 text-corp-platinum
                       hover:border-corp-gold hover:text-corp-gold
                       transition-all duration-300"
          >
            About Nexus
          </Link>
        </div>

        {/* Stats strip */}
        <div className="hero-stat grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-corp-gold/15 pt-6 md:pt-8">
          {[
            { value: '$2.8T',  label: 'Assets Under Advisory' },
            { value: '47',     label: 'Global Offices'        },
            { value: '30+',    label: 'Years of Excellence'   },
            { value: '1,200+', label: 'Institutional Clients' },
          ].map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <div className="font-corp-display text-2xl md:text-3xl lg:text-4xl text-corp-gold font-medium mb-1">
                {value}
              </div>
              <div className="font-label text-[10px] tracking-[0.2em] uppercase text-corp-steel">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-label text-[9px] tracking-[0.3em] uppercase text-corp-steel/50">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-corp-gold/50 to-transparent" />
      </div>
    </section>
  );
}
