'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Insight } from '@/components/corp/data/insights';
import { categoryColors } from '@/components/corp/data/insights';

gsap.registerPlugin(ScrollTrigger);

export default function InsightDetailClient({ article }: { article: Insight }) {
  const heroRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.art-hero-item', {
        opacity: 0, y: 40, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2,
      });
      gsap.from('.art-body-para', {
        opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.art-takeaway', {
        opacity: 0, x: -15, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.takeaways-block', start: 'top 78%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[65vh] flex items-end bg-corp-ink overflow-hidden pb-12 pt-24 md:pb-20 md:pt-40 px-6"
        aria-label={`${article.title} — article`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-12"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.35) 0%, transparent 60%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="art-hero-item flex items-center gap-3 mb-10">
            <Link href="/insights"
              className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-steel hover:text-corp-gold transition-colors">
              ← Nexus Perspectives
            </Link>
            <span className="text-corp-gold/30">/</span>
            <span className={`font-label text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 border ${categoryColors[article.category]}`}>
              {article.category}
            </span>
          </div>

          <h1 className="art-hero-item font-corp-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-corp-platinum leading-tight mb-6">
            {article.title}
          </h1>
          <p className="art-hero-item font-sans text-lg text-corp-steel leading-relaxed mb-10 max-w-3xl">
            {article.subtitle}
          </p>

          {/* Author + meta strip */}
          <div className="art-hero-item flex flex-wrap items-center gap-6 border-t border-corp-gold/15 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-corp-card border border-corp-gold/30">
                <span className="font-corp-display text-sm text-corp-gold">{article.authorInitials}</span>
              </div>
              <div>
                <p className="font-label text-[10px] tracking-wider uppercase text-corp-platinum">{article.author}</p>
                <p className="font-sans text-xs text-corp-steel/60">{article.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-corp-steel/40">
              <span className="font-label text-[9px] tracking-widest uppercase">{article.date}</span>
              <span>·</span>
              <span className="font-label text-[9px] tracking-widest uppercase">{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <div ref={bodyRef} className="bg-corp-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">

            {/* Sticky sidebar — key takeaways */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="takeaways-block lg:sticky lg:top-28 border border-corp-gold/20 bg-corp-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="block h-px w-5 bg-corp-gold" />
                  <span className="font-label text-[9px] tracking-[0.25em] uppercase text-corp-gold">
                    Key Takeaways
                  </span>
                </div>
                <ul className="space-y-4">
                  {article.keyTakeaways.map((t, i) => (
                    <li key={i} className="art-takeaway flex items-start gap-3">
                      <span className="mt-1 text-corp-gold text-xs shrink-0">◈</span>
                      <p className="font-sans text-xs text-corp-steel leading-relaxed">{t}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-corp-gold/10">
                  <Link
                    href="/insights"
                    className="font-label text-[10px] tracking-[0.2em] uppercase text-corp-steel/60
                               hover:text-corp-gold transition-colors duration-200"
                  >
                    ← More Perspectives
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main body */}
            <article className="lg:col-span-8 order-1 lg:order-2">
              <div className="prose-corp space-y-7">
                {article.body.map((para, i) => (
                  <p key={i} className="art-body-para font-sans text-base text-corp-steel leading-[1.85]">
                    {para}
                  </p>
                ))}
              </div>

              {/* Share / navigate */}
              <div className="mt-16 pt-8 border-t border-corp-gold/15 flex flex-col sm:flex-row justify-between gap-4">
                <Link
                  href="/insights"
                  className="font-label text-xs tracking-[0.2em] uppercase text-corp-steel hover:text-corp-gold transition-colors"
                >
                  ← All Perspectives
                </Link>
                <Link
                  href="/home"
                  className="font-label text-xs tracking-[0.2em] uppercase px-6 py-3
                             border border-corp-gold/40 text-corp-gold
                             hover:bg-corp-gold hover:text-corp-ink
                             transition-all duration-300"
                >
                  Explore Nexus Capital →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
