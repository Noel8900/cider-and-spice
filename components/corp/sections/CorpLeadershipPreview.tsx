'use client';
// 3 executive cards with gold monogram avatars and hover bio overlay.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { executives } from '@/components/corp/data/team';
import CorpSectionHeader from '@/components/corp/ui/CorpSectionHeader';

gsap.registerPlugin(ScrollTrigger);

const PREVIEW = executives.slice(0, 3);

export default function CorpLeadershipPreview() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.leader-card', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-32 px-6 bg-corp-ink" aria-label="Leadership preview">
      <div className="max-w-7xl mx-auto">
        <CorpSectionHeader
          eyebrow="Executive Leadership"
          title="Guided by Decades of Excellence"
          subtitle="Our leadership team brings together the foremost minds in capital markets, strategy, and enterprise transformation."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PREVIEW.map(exec => (
            <div
              key={exec.id}
              className="leader-card group relative overflow-hidden border border-corp-gold/10 bg-corp-card
                         hover:border-corp-gold/30 transition-all duration-500"
            >
              {/* Monogram avatar */}
              <div className="relative h-56 bg-corp-navy flex items-center justify-center overflow-hidden">
                {/* Ambient gradient */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.4) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <span className="font-corp-display text-6xl font-light text-corp-gold relative z-10">
                  {exec.initials}
                </span>
              </div>

              {/* Details */}
              <div className="p-8">
                <p className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold mb-2">
                  {exec.title}
                </p>
                <h3 className="font-corp-display text-2xl font-light text-corp-platinum mb-1">
                  {exec.name}
                </h3>
                <p className="font-sans text-xs text-corp-steel/60 mb-4">
                  {exec.tenure}
                </p>

                {/* Focus areas */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exec.focus.slice(0, 2).map(f => (
                    <span
                      key={f}
                      className="font-label text-[9px] tracking-wider uppercase px-3 py-2
                                 border border-corp-gold/20 text-corp-steel/70"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Bio excerpt */}
                <p className="font-sans text-xs text-corp-steel leading-relaxed line-clamp-3">
                  {exec.bio}
                </p>
              </div>

              {/* Hover gold bottom rule */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-corp-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="font-label text-xs tracking-[0.25em] uppercase px-8 py-4
                       border border-corp-platinum/20 text-corp-platinum
                       hover:border-corp-gold hover:text-corp-gold
                       transition-all duration-300 inline-block"
          >
            Meet Full Leadership Team →
          </Link>
        </div>
      </div>
    </section>
  );
}
