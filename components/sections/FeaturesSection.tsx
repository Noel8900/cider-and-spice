'use client';
// Luxury feature cards — no emoji, sharp corners, GSAP scroll reveal.
// Three practice cards + full-width floor plan card.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

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
    <section id="opportunity" ref={ref} className="py-32 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="The Opportunity"
          title="Built for Food Makers"
          subtitle="Designed for makers, growers, and culinary innovators across the Borderland."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/[0.06]">
          {features.map((f) => (
            <div
              key={f.title}
              className="feat-card group relative bg-bg p-10 hover:bg-white/[0.04]
                         transition-colors duration-500 overflow-hidden"
            >
              {/* Background index number */}
              <span
                className="absolute top-6 right-8 font-corp-display text-7xl font-light
                           text-cream/[0.04] group-hover:text-cream/[0.07] transition-colors
                           duration-500 select-none pointer-events-none"
                aria-hidden="true"
              >
                {f.index}
              </span>

              {/* Glyph */}
              <span className="font-corp-display text-3xl text-gold mb-8 block leading-none">
                {f.glyph}
              </span>

              <h3 className="font-corp-display text-2xl font-light text-cream mb-4 leading-snug">
                {f.title}
              </h3>

              <p className="font-sans text-sm leading-relaxed text-cream/55 mb-8">
                {f.body}
              </p>

              {/* Hover gold accent line */}
              <div
                className="h-px w-0 bg-gold group-hover:w-10
                           transition-all duration-500 ease-out"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Floor Plan — full-width architectural card */}
        <Link href="/floor-plan/" className="feat-floor group block mt-px">
          <div
            className="relative bg-white/[0.02] border-t border-cream/[0.06]
                       p-10 md:p-12 flex flex-col md:flex-row md:items-center gap-8
                       hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden"
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-64 opacity-0
                         group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'radial-gradient(ellipse at right, rgba(196,98,45,0.08) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <span className="font-corp-display text-5xl text-gold/60 group-hover:text-gold
                             transition-colors duration-300 shrink-0">
              ◇
            </span>

            <div className="flex-1">
              <p className="font-label text-[9px] tracking-[0.3em] uppercase text-gold mb-2">
                Venue Layout
              </p>
              <h3 className="font-corp-display text-2xl font-light text-cream mb-2 leading-snug">
                22,400 sq ft Across Two Levels
              </h3>
              <p className="font-sans text-sm leading-relaxed text-cream/55">
                Explore every vendor stall, dining zone, private event room, and BOH space
                interactively. Filter by seating, vendor, event, or operations view.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3 border border-cream/20
                            px-7 py-3.5 font-label text-[10px] tracking-[0.2em] uppercase
                            text-cream/70 group-hover:border-gold/60 group-hover:text-gold
                            transition-all duration-400 whitespace-nowrap">
              Explore the Floor Plan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                   strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
