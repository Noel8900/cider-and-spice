'use client';
// GSAP-animated service detail page layout.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Service } from '@/components/corp/data/services';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetailClient({ service: svc }: { service: Service }) {
  const heroRef    = useRef<HTMLElement>(null);
  const bodyRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from('.svc-detail-hero-item', {
        opacity: 0, y: 40, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2,
      });
      // Body sections
      gsap.from('.svc-reveal', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 75%', once: true },
      });
      // Process steps
      gsap.from('.process-step', {
        opacity: 0, x: -20, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-grid', start: 'top 78%', once: true },
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
        aria-label={`${svc.title} — hero`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.4) 0%, transparent 55%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="svc-detail-hero-item flex items-center gap-3 mb-10">
            <Link
              href="/services"
              className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-steel hover:text-corp-gold transition-colors"
            >
              ← All Services
            </Link>
            <span className="text-corp-gold/30">/</span>
            <span className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold">
              {svc.shortTitle}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="svc-detail-hero-item text-5xl text-corp-gold mb-6">{svc.icon}</div>
              <h1 className="svc-detail-hero-item font-corp-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-corp-platinum leading-none mb-4">
                {svc.title}
              </h1>
              <p className="svc-detail-hero-item font-sans text-lg text-corp-gold italic">
                {svc.tagline}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-6 self-end mt-6 lg:mt-0">
              {svc.stats.map(s => (
                <div key={s.label} className="svc-detail-hero-item border-t border-corp-gold/20 pt-4">
                  <div className="font-corp-display text-xl md:text-3xl text-corp-gold mb-1">{s.value}</div>
                  <div className="font-label text-[9px] tracking-wider uppercase text-corp-steel/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div ref={bodyRef}>
        {/* Overview */}
        <section className="py-24 px-6 bg-corp-navy border-b border-corp-gold/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6 svc-reveal">
                <span className="block h-px w-6 bg-corp-gold" />
                <span className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold">Overview</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="svc-reveal font-corp-display text-2xl font-light text-corp-platinum leading-relaxed mb-8">
                {svc.description}
              </p>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-24 px-6 bg-corp-ink border-b border-corp-gold/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-2 svc-reveal">
                  <span className="block h-px w-6 bg-corp-gold" />
                  <span className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold">What We Deliver</span>
                </div>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-5">
                  {svc.outcomes.map((outcome, i) => (
                    <li key={i} className="svc-reveal flex items-start gap-4">
                      <span className="mt-1 font-corp-display text-corp-gold text-sm shrink-0">◈</span>
                      <p className="font-sans text-base text-corp-steel leading-relaxed">{outcome}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 px-6 bg-corp-navy">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-16 svc-reveal">
              <span className="block h-px w-8 bg-corp-gold" />
              <span className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold">Our Approach</span>
              <span className="block h-px w-8 bg-corp-gold" />
            </div>

            <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {svc.process.map(({ step, label, description }, i) => (
                <div
                  key={step}
                  className="process-step relative border border-corp-gold/10 hover:border-corp-gold/30
                             p-6 md:p-8 transition-all duration-400 hover:bg-corp-card group"
                >
                  {/* Step number background */}
                  <span className="absolute top-6 right-6 font-corp-display text-5xl font-light text-corp-gold/[0.07] group-hover:text-corp-gold/[0.12] transition-colors duration-300">
                    {step}
                  </span>
                  {/* Connector arrow */}
                  {i < svc.process.length - 1 && (
                    <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 text-corp-gold/30 text-xs">
                      ▶
                    </span>
                  )}
                  <p className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold mb-3">{step}</p>
                  <h3 className="font-corp-display text-xl font-light text-corp-platinum mb-3 leading-snug">{label}</h3>
                  <p className="font-sans text-sm text-corp-steel leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
