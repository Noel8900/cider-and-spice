'use client';
// Homepage "Nexus Perspectives" preview — 3 latest insight cards.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { insights, categoryColors } from '@/components/corp/data/insights';
import CorpSectionHeader from '@/components/corp/ui/CorpSectionHeader';

gsap.registerPlugin(ScrollTrigger);

const PREVIEW = insights.slice(0, 3);

export default function CorpPerspectives() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.persp-card', {
        opacity: 0, y: 40, duration: 0.85, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-32 px-6 bg-corp-navy border-t border-corp-gold/10" aria-label="Nexus Perspectives — latest insights">
      <div className="max-w-7xl mx-auto">
        <CorpSectionHeader
          eyebrow="Nexus Perspectives"
          title="Intelligence That Moves Markets"
          subtitle="Rigorous analysis from our advisory leadership on the forces shaping global capital and strategy."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PREVIEW.map(article => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="persp-card group flex flex-col border border-corp-gold/10 bg-corp-card
                         hover:border-corp-gold/35 transition-all duration-400 p-8"
            >
              {/* Category */}
              <span className={`font-label text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 border w-fit mb-6 ${categoryColors[article.category]}`}>
                {article.category}
              </span>

              {/* Title */}
              <h3 className="font-corp-display text-xl font-light text-corp-platinum leading-snug mb-3
                             group-hover:text-corp-gold transition-colors duration-300 flex-1">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="font-sans text-xs text-corp-steel leading-relaxed mb-6 line-clamp-2">
                {article.excerpt}
              </p>

              {/* Author row */}
              <div className="border-t border-corp-gold/10 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center bg-corp-ink border border-corp-gold/20">
                    <span className="font-corp-display text-[10px] text-corp-gold">{article.authorInitials}</span>
                  </div>
                  <p className="font-label text-[9px] tracking-wider uppercase text-corp-steel/70">{article.author}</p>
                </div>
                <p className="font-label text-[9px] tracking-wider uppercase text-corp-steel/40">{article.date}</p>
              </div>

              {/* Hover gold rule */}
              <div className="h-px bg-corp-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left mt-5" />
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/insights"
            className="font-label text-xs tracking-[0.25em] uppercase px-8 py-4
                       border border-corp-gold/40 text-corp-gold
                       hover:bg-corp-gold hover:text-corp-ink
                       transition-all duration-300 inline-block"
          >
            View All Perspectives →
          </Link>
        </div>
      </div>
    </section>
  );
}
