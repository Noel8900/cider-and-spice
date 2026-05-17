'use client';
// Vertical GSAP ScrollTrigger-driven milestone timeline.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: '1994', title: 'Founded in New York',       body: 'Seven Goldman Sachs veterans establish Nexus Capital Group with a mandate to provide conflict-free, elite-tier advisory to institutional clients globally.' },
  { year: '1999', title: 'London & Frankfurt Opening', body: 'First international expansion establishes our European presence, enabling 24-hour coverage of global capital markets.' },
  { year: '2004', title: '$100B Advisory Milestone',   body: 'Nexus surpasses $100 billion in total assets under advisory — a landmark that validates our differentiated, independent model.' },
  { year: '2008', title: 'Navigating the Crisis',      body: 'Our risk advisory practice guides 34 institutional clients through the global financial crisis, preserving an estimated $67 billion in capital.' },
  { year: '2012', title: 'Asia-Pacific Expansion',     body: 'Offices in Singapore, Hong Kong, and Tokyo extend our reach to the world\'s fastest-growing capital markets.' },
  { year: '2016', title: 'Middle East & Africa Entry', body: 'Partnerships with sovereign wealth funds across the GCC and landmark advisory mandates in Sub-Saharan Africa position Nexus at the frontier of global capital.' },
  { year: '2019', title: 'ESG Integration Framework',  body: 'Launch of our Integrated ESG Risk Model — now a reference architecture used by peer institutions and recognized by the UN Principles for Responsible Investment.' },
  { year: '2024', title: '$2.8T Under Advisory',       body: 'Thirty years after founding, Nexus Capital Group advises $2.8 trillion in assets across 1,200+ institutional clients in 60+ markets — our most consequential year yet.' },
];

export default function CorpTimeline() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical spine
      gsap.from('.timeline-spine', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      });

      // Stagger milestone items
      gsap.from('.milestone-item', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 65%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="py-32 px-6 bg-corp-navy"
      aria-label="Company history timeline"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-20">
          <span className="block h-px w-10 bg-corp-gold" />
          <span className="font-label text-xs tracking-[0.3em] uppercase text-corp-gold">Our Journey</span>
        </div>

        <div className="relative">
          {/* Vertical spine — hidden on mobile, shown md+ */}
          <div className="timeline-spine hidden md:block absolute md:left-32 lg:left-36 top-0 bottom-0 w-px bg-corp-gold/20" />

          {/* Milestones */}
          <div className="space-y-10 md:space-y-16">
            {MILESTONES.map(({ year, title, body }) => (
              <div key={year} className="milestone-item relative">
                {/* Mobile layout: year above content, left-border accent */}
                <div className="md:hidden pl-5 border-l-2 border-corp-gold/30">
                  <span className="block font-corp-display text-xl font-light text-corp-gold mb-2">
                    {year}
                  </span>
                  <h3 className="font-corp-display text-lg font-light text-corp-platinum mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="font-sans text-sm text-corp-steel leading-relaxed">
                    {body}
                  </p>
                </div>

                {/* Desktop layout: year + spine + content */}
                <div className="hidden md:flex items-start gap-12 lg:gap-16">
                  {/* Year */}
                  <div className="w-28 lg:w-32 shrink-0 pt-1 text-right">
                    <span className="font-corp-display text-2xl font-light text-corp-gold">
                      {year}
                    </span>
                  </div>

                  {/* Dot on spine */}
                  <div className="absolute left-[7.8rem] lg:left-[8.75rem] top-2 w-3 h-3 rounded-full border-2 border-corp-gold bg-corp-navy" />

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-corp-display text-xl font-light text-corp-platinum mb-2 leading-snug">
                      {title}
                    </h3>
                    <p className="font-sans text-sm text-corp-steel leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
