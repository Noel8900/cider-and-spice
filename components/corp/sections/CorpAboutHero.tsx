'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CorpAboutHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-item', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-end bg-corp-ink overflow-hidden pb-12 pt-24 md:pb-20 md:pt-40 px-6"
      aria-label="About Nexus Capital Group"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.3) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      {/* Subtle vertical gold rule */}
      <div className="hidden md:block pointer-events-none absolute top-0 left-24 bottom-0 w-px bg-corp-gold/10" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <div className="about-hero-item flex items-center gap-3 mb-10">
          <span className="block h-px w-10 bg-corp-gold" />
          <span className="font-label text-xs tracking-[0.3em] uppercase text-corp-gold">About Nexus</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <h1 className="about-hero-item font-corp-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-corp-platinum leading-none mb-0">
              Thirty years<br />
              of <em className="not-italic text-corp-gold">consequence.</em>
            </h1>
          </div>
          <div>
            <p className="about-hero-item font-sans text-lg text-corp-steel leading-relaxed mb-6">
              Founded in New York in 1994 by a group of former Goldman Sachs partners,
              Nexus Capital Group was built on a single conviction: that the world&apos;s most
              important institutions deserve advisory that is fully independent, deeply experienced,
              and unrelentingly focused on their interests alone.
            </p>
            <p className="about-hero-item font-sans text-base text-corp-steel/70 leading-relaxed">
              Today, with 47 offices across six continents and $2.8 trillion in assets under advisory,
              we remain privately held, partner-owned, and completely conflict-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
