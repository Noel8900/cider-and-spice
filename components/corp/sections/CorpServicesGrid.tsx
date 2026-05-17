'use client';
// Full 6-service card grid — hover reveals description + CTA.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/components/corp/data/services';

gsap.registerPlugin(ScrollTrigger);

export default function CorpServicesGrid() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-grid-card', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-corp-navy" aria-label="All practice areas">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="svc-grid-card group relative flex flex-col
                         border border-corp-gold/10 bg-corp-card hover:border-corp-gold/40
                         hover:bg-corp-card/70 transition-all duration-500 p-10 min-h-[340px]"
            >
              {/* Number */}
              <span className="absolute top-8 right-10 font-corp-display text-6xl font-light text-corp-gold/[0.07] group-hover:text-corp-gold/[0.12] transition-colors duration-500">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <span className="font-corp-display text-3xl text-corp-gold/50 group-hover:text-corp-gold transition-colors duration-300 mb-6">
                {svc.icon}
              </span>

              {/* Title */}
              <h2 className="font-corp-display text-2xl font-light text-corp-platinum leading-snug mb-4 group-hover:text-corp-gold transition-colors duration-300">
                {svc.title}
              </h2>

              {/* Tagline */}
              <p className="font-sans text-sm text-corp-steel/70 italic mb-4 leading-relaxed">
                {svc.tagline}
              </p>

              {/* Description on hover (visible always on mobile) */}
              <p className="font-sans text-sm text-corp-steel leading-relaxed flex-1
                            max-h-0 md:max-h-0 overflow-hidden opacity-0
                            md:group-hover:max-h-40 md:group-hover:opacity-100
                            max-md:max-h-40 max-md:opacity-100
                            transition-all duration-500 mb-4">
                {svc.description.slice(0, 160)}…
              </p>

              {/* Stats row */}
              <div className="flex gap-6 mt-auto border-t border-corp-gold/10 pt-6">
                {svc.stats.slice(0, 2).map(s => (
                  <div key={s.label}>
                    <div className="font-corp-display text-lg text-corp-gold">{s.value}</div>
                    <div className="font-label text-[9px] tracking-wider uppercase text-corp-steel/50">{s.label}</div>
                  </div>
                ))}
                <div className="ml-auto flex items-end">
                  <span className="font-label text-[10px] tracking-[0.2em] uppercase text-corp-gold/60 group-hover:text-corp-gold transition-colors duration-300">
                    Learn More →
                  </span>
                </div>
              </div>

              {/* Bottom gold accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-corp-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
