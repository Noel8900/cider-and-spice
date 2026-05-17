'use client';
// Four statistics with GSAP ScrollTrigger count-up animation.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  raw:    number;
  prefix: string;
  suffix: string;
  label:  string;
  sub:    string;
}

const STATS: Stat[] = [
  { raw: 2.8,  prefix: '$', suffix: 'T',  label: 'Assets Under Advisory',  sub: 'Across 47 global offices'         },
  { raw: 30,   prefix: '',  suffix: '+',  label: 'Years of Excellence',     sub: 'Founded in New York, 1994'        },
  { raw: 1200, prefix: '',  suffix: '+',  label: 'Institutional Clients',   sub: 'In 60+ markets worldwide'         },
  { raw: 98,   prefix: '',  suffix: '%',  label: 'Client Retention Rate',   sub: 'Average across last 10 years'     },
];

export default function CorpStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const valRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = valRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.raw,
          duration: stat.raw > 100 ? 2.5 : 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          onUpdate() {
            const display = stat.raw < 10
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toLocaleString();
            el.textContent = `${stat.prefix}${display}${stat.suffix}`;
          },
        });
      });

      gsap.from('.stat-card', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-corp-ink"
      aria-label="Key performance statistics"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-16 justify-center">
          <span className="block h-px w-8 bg-corp-gold/40" />
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-corp-steel">
            Performance by the Numbers
          </span>
          <span className="block h-px w-8 bg-corp-gold/40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card group relative px-6 py-10 md:px-10 md:py-12 border border-corp-gold/10 hover:border-corp-gold/30 hover:bg-corp-card transition-all duration-500"
            >
              {/* Gold left accent on hover */}
              <div className="absolute left-0 top-8 bottom-8 w-px bg-corp-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

              {/* Counter value */}
              <div className="font-corp-display text-4xl md:text-5xl lg:text-6xl font-light text-corp-gold mb-3 leading-none">
                <span
                  ref={el => { valRefs.current[i] = el; }}
                >
                  {stat.prefix}0{stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="font-label text-xs tracking-[0.15em] uppercase text-corp-platinum mb-2">
                {stat.label}
              </p>

              {/* Sub */}
              <p className="font-sans text-xs text-corp-steel/60">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
