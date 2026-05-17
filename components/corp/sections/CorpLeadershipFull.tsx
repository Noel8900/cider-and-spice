'use client';
// 6-card leadership grid with click-to-open modal for full bio.

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { executives, type Executive } from '@/components/corp/data/team';
import CorpSectionHeader from '@/components/corp/ui/CorpSectionHeader';

gsap.registerPlugin(ScrollTrigger);

export default function CorpLeadershipFull() {
  const ref      = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Executive | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.leader-full-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <>
      <section ref={ref} className="py-32 px-6 bg-corp-ink" aria-label="Full leadership team">
        <div className="max-w-7xl mx-auto">
          <CorpSectionHeader
            eyebrow="Leadership"
            title="The Partnership"
            subtitle="Partner-owned and independently governed. Every decision at Nexus Capital Group traces back to this team."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map(exec => (
              <button
                key={exec.id}
                onClick={() => setActive(exec)}
                className="leader-full-card group text-left border border-corp-gold/10 bg-corp-card
                           hover:border-corp-gold/40 hover:bg-corp-navy
                           transition-all duration-500 p-8 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-corp-gold/50"
              >
                {/* Monogram */}
                <div className="relative w-16 h-16 flex items-center justify-center mb-6
                                bg-corp-navy border border-corp-gold/20 group-hover:border-corp-gold/50
                                transition-colors duration-300">
                  <span className="font-corp-display text-2xl font-light text-corp-gold">
                    {exec.initials}
                  </span>
                </div>

                <p className="font-label text-[10px] tracking-[0.2em] uppercase text-corp-gold mb-1">
                  {exec.title}
                </p>
                <h3 className="font-corp-display text-xl font-light text-corp-platinum mb-1">
                  {exec.name}
                </h3>
                <p className="font-sans text-xs text-corp-steel/60 mb-4">{exec.tenure}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {exec.focus.map(f => (
                    <span key={f} className="font-label text-[9px] tracking-wide uppercase px-2 py-0.5 border border-corp-gold/15 text-corp-steel/60">
                      {f}
                    </span>
                  ))}
                </div>

                <span className="font-label text-[10px] tracking-[0.2em] uppercase text-corp-gold/60
                                 group-hover:text-corp-gold transition-colors duration-300">
                  View Full Bio →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} — Full Biography`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-corp-ink/90 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />

          {/* Panel */}
          <div className="relative z-10 max-w-lg md:max-w-2xl w-full bg-corp-card border border-corp-gold/30 p-7 sm:p-10 md:p-14 overflow-y-auto max-h-[90vh]">
            {/* Close */}
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 font-label text-[10px] tracking-widest uppercase text-corp-steel hover:text-corp-gold transition-colors"
              aria-label="Close"
            >
              Close ✕
            </button>

            {/* Monogram */}
            <div className="w-20 h-20 flex items-center justify-center bg-corp-navy border border-corp-gold/30 mb-8">
              <span className="font-corp-display text-3xl font-light text-corp-gold">{active.initials}</span>
            </div>

            {/* Meta */}
            <p className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold mb-1">{active.title}</p>
            <h2 className="font-corp-display text-3xl font-light text-corp-platinum mb-1">{active.name}</h2>
            <p className="font-sans text-sm text-corp-steel/60 mb-6">{active.tenure}</p>

            {/* Focus */}
            <div className="flex flex-wrap gap-2 mb-8">
              {active.focus.map(f => (
                <span key={f} className="font-label text-[9px] tracking-wider uppercase px-3 py-1 border border-corp-gold/25 text-corp-steel/70">
                  {f}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-corp-gold/15 mb-8" />

            {/* Bio */}
            <p className="font-sans text-sm text-corp-steel leading-relaxed">{active.bio}</p>
          </div>
        </div>
      )}
    </>
  );
}
