'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.hero-eyebrow', '.hero-headline', '.hero-subhead', '.hero-actions', '.hero-badges'], {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center"
      aria-label="Hero"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(28,18,9,0.88) 0%, rgba(28,18,9,0.55) 60%, rgba(28,18,9,0.30) 100%), ' +
              'linear-gradient(to top, rgba(28,18,9,0.75) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 pt-32">

        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3 mb-8">
          <span className="block h-px w-8 bg-gold shrink-0" />
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
            Opening Q1–Q2 2027 · Downtown Las Cruces, NM
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline font-corp-display text-6xl sm:text-7xl md:text-8xl font-light
                        text-cream leading-[0.92] tracking-tight mb-8 max-w-3xl">
          Where Las Cruces<br />
          <em className="not-italic text-gold">Eats the World</em>
        </h1>

        {/* Subhead */}
        <p className="hero-subhead font-sans text-base md:text-lg leading-relaxed text-cream/65
                       max-w-xl mb-10">
          A next-generation food hall, culinary incubator, and Southern New Mexico&apos;s
          only craft cider bar — giving Borderland food makers a permanent downtown home.
        </p>

        {/* CTAs */}
        <div className="hero-actions flex flex-wrap gap-3 mb-12">
          <Link
            href="#opportunity"
            className="bg-ember hover:bg-ember-hover px-8 py-4 font-label text-[10px]
                       tracking-[0.25em] uppercase text-white transition-colors"
          >
            See the Opportunity
          </Link>
          <Link
            href="/investors"
            className="border border-cream/20 hover:border-gold/50 px-8 py-4 font-label
                       text-[10px] tracking-[0.25em] uppercase text-cream/70 hover:text-gold
                       transition-all duration-300"
          >
            Investor Overview
          </Link>
          <Link
            href="/floor-plan/"
            className="border border-cream/20 hover:border-gold/50 px-8 py-4 font-label
                       text-[10px] tracking-[0.25em] uppercase text-cream/70 hover:text-gold
                       transition-all duration-300 flex items-center gap-2"
          >
            <span className="font-corp-display text-sm text-gold/60" aria-hidden="true">✦</span>
            Explore the Floor Plan
          </Link>
        </div>

        {/* Badges */}
        <div className="hero-badges flex flex-wrap gap-2">
          {['8,000 sq ft Indoor Venue', '10–13 Global Concepts', 'Southern NM\'s Only Craft Cider Bar'].map(
            (label) => (
              <span
                key={label}
                className="border border-cream/20 px-4 py-2 font-label text-[9px]
                           tracking-[0.2em] uppercase text-cream/50"
              >
                {label}
              </span>
            )
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#opportunity"
        aria-label="Scroll to the opportunity section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center
                   gap-1.5 font-label text-[9px] tracking-[0.2em] uppercase text-cream/40
                   hover:text-gold transition-colors duration-300 z-10"
      >
        <span>See the Opportunity</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
