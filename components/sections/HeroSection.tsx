'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Animated counter hook ────────────────────────────────────────────────────
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
            val: target,
            duration,
            ease: 'power2.out',
            onUpdate() {
              setDisplay(obj.val.toFixed(decimals) + suffix);
            },
            onComplete() {
              setDisplay(target.toFixed(decimals) + suffix);
            },
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

// ── Stat badge component ─────────────────────────────────────────────────────
function StatBadge({
  prefix, target, suffix, label, decimals = 0,
}: {
  prefix?: string;
  target: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const { ref, display } = useCountUp(target, suffix, decimals);
  return (
    <div
      className="flex flex-col items-start border border-cream/15 px-5 py-4
                 hover:border-gold/40 transition-colors duration-500"
      style={{ background: 'rgba(28,18,9,0.45)', backdropFilter: 'blur(8px)' }}
    >
      <span
        ref={ref}
        className="font-corp-display text-3xl font-light leading-none"
        style={{ color: '#D4A84B' }}
        aria-live="polite"
      >
        {prefix}{display}
      </span>
      <span className="font-label text-[8px] tracking-[0.22em] uppercase mt-1.5"
        style={{ color: 'rgba(232,211,165,0.40)' }}>
        {label}
      </span>
    </div>
  );
}

// ── Hero section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        ['.hero-eyebrow', '.hero-headline', '.hero-subhead', '.hero-actions', '.hero-stats'],
        {
          opacity: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
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
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(28,18,9,0.90) 0%, rgba(28,18,9,0.55) 60%, rgba(28,18,9,0.28) 100%), ' +
              'linear-gradient(to top, rgba(28,18,9,0.80) 0%, transparent 45%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 pt-32">

        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3 mb-8">
          <span className="block h-px w-8 shrink-0" style={{ background: 'linear-gradient(90deg, #C97A3E, #D4A84B)' }} />
          <span className="font-label text-[10px] tracking-[0.3em] uppercase" style={{ color: '#C97A3E' }}>
            Opening Q1–Q2 2027 · Downtown Las Cruces, NM
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline font-corp-display text-6xl sm:text-7xl md:text-8xl font-light
                       text-cream leading-[0.92] tracking-tight mb-8 max-w-3xl">
          Where Las Cruces<br />
          <em className="not-italic" style={{ color: '#D4A84B' }}>Eats the World</em>
        </h1>

        {/* Subhead */}
        <p className="hero-subhead font-sans text-base md:text-lg leading-relaxed text-cream/65
                      max-w-xl mb-10">
          A next-generation food hall, culinary incubator, and Southern New Mexico&apos;s
          only craft cider bar — giving Borderland food makers a permanent downtown home.
        </p>

        {/* CTAs */}
        <div className="hero-actions flex flex-wrap gap-3 mb-14">
          <Link
            href="#opportunity"
            className="px-8 py-4 font-label text-[10px] tracking-[0.25em] uppercase text-[#100E0A]
                       transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #C97A3E, #D4A84B)', fontWeight: 500 }}
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
            <span className="font-corp-display text-sm" style={{ color: 'rgba(212,168,75,0.60)' }} aria-hidden="true">✦</span>
            Explore the Floor Plan
          </Link>
        </div>

        {/* ── Animated stat badges ── */}
        <div className="hero-stats grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
          <StatBadge target={8000}  suffix=" sq ft"  label="Indoor Venue"                     />
          <StatBadge target={13}    suffix=""         label="Global Concepts"    prefix="Up to " />
          <StatBadge target={25}    suffix=" taps"    label="Rotating Cider"     prefix="Up to " />
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
        <span>Explore</span>
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
