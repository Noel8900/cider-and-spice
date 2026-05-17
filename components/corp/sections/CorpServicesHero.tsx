'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CorpServicesHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-hero-item', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-end bg-corp-ink overflow-hidden pb-12 pt-24 md:pb-20 md:pt-40 px-6"
      aria-label="Services — hero"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.4) 0%, transparent 55%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="svc-hero-item flex items-center gap-3 mb-10">
          <span className="block h-px w-10 bg-corp-gold" />
          <span className="font-label text-xs tracking-[0.3em] uppercase text-corp-gold">Practice Areas</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <h1 className="svc-hero-item font-corp-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-corp-platinum leading-none">
              Six practices.<br />
              <em className="not-italic text-corp-gold">One standard.</em>
            </h1>
          </div>
          <div>
            <p className="svc-hero-item font-sans text-lg text-corp-steel leading-relaxed">
              Our advisory practices are integrated by design — sharing intelligence, talent, and perspective
              across every engagement to deliver outcomes that siloed firms simply cannot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
