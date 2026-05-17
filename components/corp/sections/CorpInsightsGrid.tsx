'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { insights, categoryColors, type Insight } from '@/components/corp/data/insights';

gsap.registerPlugin(ScrollTrigger);

const ALL_CATEGORIES = ['All', 'Capital Markets', 'Strategy', 'Risk', 'Digital', 'Global'] as const;

export default function CorpInsightsGrid() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>('All');

  const filtered = active === 'All'
    ? insights
    : insights.filter(i => i.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.insight-card', {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Re-animate on filter change
  useEffect(() => {
    gsap.fromTo('.insight-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out' }
    );
  }, [active]);

  return (
    <section ref={ref} className="py-20 px-6 bg-corp-navy" aria-label="Insights articles">
      <div className="max-w-7xl mx-auto">

        {/* Category filter bar */}
        <div className="flex flex-wrap gap-3 mb-16 border-b border-corp-gold/10 pb-8">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-label text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-3 py-2 sm:px-4
                          border transition-all duration-200 min-h-[40px] flex items-center
                          ${active === cat
                            ? 'border-corp-gold text-corp-gold bg-corp-gold/10'
                            : 'border-corp-gold/20 text-corp-steel hover:border-corp-gold/50 hover:text-corp-platinum'
                          }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured insight (first item if All selected) */}
        {active === 'All' && insights[0] && (
          <Link
            href={`/insights/${insights[0].slug}`}
            className="insight-card group block border border-corp-gold/15 bg-corp-card
                       hover:border-corp-gold/40 transition-all duration-500 mb-8
                       grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Left panel */}
            <div className="p-7 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`font-label text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 border ${categoryColors[insights[0].category]}`}>
                    {insights[0].category}
                  </span>
                  <span className="font-label text-[9px] tracking-widest uppercase text-corp-steel/40">
                    Featured
                  </span>
                </div>
                <h2 className="font-corp-display text-3xl md:text-4xl font-light text-corp-platinum leading-snug mb-4 group-hover:text-corp-gold transition-colors duration-300">
                  {insights[0].title}
                </h2>
                <p className="font-sans text-sm text-corp-steel leading-relaxed mb-6">
                  {insights[0].excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-corp-gold/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-corp-navy border border-corp-gold/20">
                    <span className="font-corp-display text-xs text-corp-gold">{insights[0].authorInitials}</span>
                  </div>
                  <div>
                    <p className="font-label text-[9px] tracking-wider uppercase text-corp-platinum">{insights[0].author}</p>
                    <p className="font-sans text-[10px] text-corp-steel/60">{insights[0].authorTitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-label text-[9px] tracking-wider uppercase text-corp-steel/50">{insights[0].date}</p>
                  <p className="font-label text-[9px] tracking-wider uppercase text-corp-steel/40">{insights[0].readTime}</p>
                </div>
              </div>
            </div>

            {/* Right panel — decorative */}
            <div className="relative hidden lg:flex items-center justify-center bg-corp-ink border-l border-corp-gold/10 min-h-[300px] overflow-hidden">
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.5) 0%, transparent 65%)' }}
                aria-hidden="true"
              />
              <span className="font-corp-display text-7xl md:text-[120px] font-light text-corp-gold/[0.07] select-none leading-none">
                {insights[0].category.split(' ')[0]}
              </span>
              <div className="absolute bottom-8 right-8">
                <span className="font-label text-[10px] tracking-[0.2em] uppercase text-corp-gold group-hover:tracking-[0.35em] transition-all duration-400">
                  Read Article →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(active === 'All' ? 1 : 0).map(article => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-sans text-corp-steel py-20">
            No articles in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

function InsightCard({ article }: { article: Insight }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="insight-card group flex flex-col border border-corp-gold/10 bg-corp-card
                 hover:border-corp-gold/35 hover:bg-corp-card/70
                 transition-all duration-400 p-8"
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
      <p className="font-sans text-xs text-corp-steel leading-relaxed mb-6 line-clamp-3">
        {article.excerpt}
      </p>

      {/* Author + meta */}
      <div className="border-t border-corp-gold/10 pt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center bg-corp-navy border border-corp-gold/20">
            <span className="font-corp-display text-[10px] text-corp-gold">{article.authorInitials}</span>
          </div>
          <p className="font-label text-[9px] tracking-wider uppercase text-corp-steel/70">{article.author}</p>
        </div>
        <div className="text-right">
          <p className="font-label text-[9px] tracking-wider uppercase text-corp-steel/40">{article.readTime}</p>
        </div>
      </div>

      {/* Bottom gold rule on hover */}
      <div className="h-px bg-corp-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left mt-5" />
    </Link>
  );
}
