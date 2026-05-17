'use client';
// 3-card services bento preview with GSAP stagger reveal.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CorpSectionHeader from '@/components/corp/ui/CorpSectionHeader';

gsap.registerPlugin(ScrollTrigger);

const PREVIEW_SERVICES = [
  {
    slug:        'capital-advisory',
    icon:        '◈',
    title:       'Capital Markets Advisory',
    description: 'Independent, conflict-free guidance across equity, debt, and hybrid capital markets. From IPO positioning to sovereign restructuring.',
    metric:      { value: '$847B', label: 'Capital Raised' },
  },
  {
    slug:        'strategic-transformation',
    icon:        '◉',
    title:       'Strategic Transformation',
    description: 'We embed with leadership teams to design and execute comprehensive organizational reinvention that delivers measurable outcomes.',
    metric:      { value: '4.2×',  label: 'Avg. Value Created' },
  },
  {
    slug:        'private-equity',
    icon:        '◆',
    title:       'Private Equity Solutions',
    description: 'Full-lifecycle PE advisory from proprietary deal origination and due diligence to portfolio value creation and exit optimization.',
    metric:      { value: '3.8×',  label: 'Avg. MOIC' },
  },
];

export default function CorpServicesSnapshot() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-snap-card', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-32 px-6 bg-corp-navy" aria-label="Services overview">
      <div className="max-w-7xl mx-auto">
        <CorpSectionHeader
          eyebrow="Our Practice Areas"
          title="Advisory at the Highest Level"
          subtitle="Six integrated practice areas, one unified philosophy: your strategic objectives are our only priority."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PREVIEW_SERVICES.map(({ slug, icon, title, description, metric }) => (
            <div
              key={slug}
              className="svc-snap-card group flex flex-col border border-corp-gold/10 bg-corp-card
                         hover:border-corp-gold/40 hover:bg-corp-card/80
                         transition-all duration-500 p-6 md:p-10"
            >
              {/* Icon + metric row */}
              <div className="flex items-start justify-between mb-8">
                <span className="font-corp-display text-4xl text-corp-gold/60 group-hover:text-corp-gold transition-colors duration-300">
                  {icon}
                </span>
                <div className="text-right">
                  <div className="font-corp-display text-2xl text-corp-gold">{metric.value}</div>
                  <div className="font-label text-[9px] tracking-widest uppercase text-corp-steel">{metric.label}</div>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-corp-display text-2xl font-light text-corp-platinum mb-4 leading-snug">
                {title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-corp-steel flex-1 mb-8">
                {description}
              </p>

              {/* CTA */}
              <Link
                href={`/services/${slug}`}
                className="font-label text-xs tracking-[0.2em] uppercase text-corp-gold
                           border-b border-corp-gold/30 pb-0.5 w-fit
                           hover:border-corp-gold transition-colors duration-300"
              >
                Explore Practice →
              </Link>
            </div>
          ))}
        </div>

        {/* View all services */}
        <div className="text-center">
          <Link
            href="/services"
            className="font-label text-xs tracking-[0.25em] uppercase px-8 py-4
                       border border-corp-gold/40 text-corp-gold
                       hover:bg-corp-gold hover:text-corp-ink
                       transition-all duration-300 inline-block"
          >
            View All Six Practice Areas →
          </Link>
        </div>
      </div>
    </section>
  );
}
