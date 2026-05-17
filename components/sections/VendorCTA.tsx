'use client';
// Full-width vendor CTA — luxury editorial style.
// Gold rule accent, Cormorant headline, refined CTA pair.
// GSAP entrance on scroll.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    <section
      ref={ref}
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1a0f08 0%, #1C1209 40%, #12100a 100%)' }}
    >
      {/* Ambient ember glow */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(196,98,45,0.12) 0%, transparent 65%)', filter: 'blur(60px)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,168,75,0.06) 0%, transparent 65%)', filter: 'blur(60px)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Eyebrow rule */}
        <div className="vcta-item flex items-center justify-center gap-4 mb-10">
          <span className="block h-px w-12 bg-gold" />
          <span className="font-label text-[10px] tracking-[0.35em] uppercase text-gold">
            Limited Spots Available
          </span>
          <span className="block h-px w-12 bg-gold" />
        </div>

        <h2 className="vcta-item font-corp-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                       font-light text-cream leading-none tracking-tight mb-8">
          Ready to Grow<br />
          <em className="not-italic text-gold">Your Food Business?</em>
        </h2>

        <p className="vcta-item font-sans text-base text-cream/55 leading-relaxed max-w-xl mx-auto mb-12">
          Join a community of passionate food entrepreneurs in the heart of Las Cruces.
          Apply today and secure your place in the founding cohort.
        </p>

        {/* CTA pair */}
        <div className="vcta-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/vendors"
            className="bg-ember hover:bg-ember-hover px-10 py-4 font-label text-[11px]
                       tracking-[0.25em] uppercase text-white transition-all duration-300
                       hover:shadow-lg hover:shadow-ember/20"
          >
            Apply as a Vendor →
          </Link>
          <Link
            href="/investors"
            className="border border-cream/25 hover:border-gold/50 px-10 py-4 font-label
                       text-[11px] tracking-[0.25em] uppercase text-cream/70 hover:text-gold
                       transition-all duration-300"
          >
            Investor Overview →
          </Link>
        </div>

        {/* Opening note */}
        <p className="vcta-item mt-10 font-label text-[9px] tracking-[0.25em] uppercase text-cream/25">
          Opening Q1–Q2 2027 · Downtown Las Cruces, NM
        </p>

      </div>
    </section>
  );
}
