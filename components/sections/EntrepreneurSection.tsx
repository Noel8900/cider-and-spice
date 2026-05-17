'use client';
// Entrepreneur pathways — luxury editorial redesign.
// Roman numeral pillar labels, GSAP count-up stats, no emoji.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    numeral: 'I',
    title: 'Low-Risk Model',
    bullets: [
      'Flexible month-to-month licensing — no multi-year leases',
      'Shared overhead: utilities, WiFi, POS system included',
      '~60% lower startup cost vs. opening a standalone restaurant',
      'License can pause during slow seasons with 30-day notice',
    ],
  },
  {
    numeral: 'II',
    title: 'Workforce Pipeline',
    bullets: [
      '34 full-time equivalent jobs created in Year 1',
      'NMSU and DACC culinary certificate pathway integration',
      'Paid apprenticeships and front-of-house training placements',
      'Priority hiring for Las Cruces residents and DACA recipients',
    ],
  },
  {
    numeral: 'III',
    title: 'Mentorship & Resources',
    bullets: [
      'Weekly WESST New Mexico business coaching sessions',
      'SCORE mentor match — marketing, finance, and operations',
      'Las Cruces SBDC access for licensing and loan prep',
      'Elevate Las Cruces entrepreneur network and peer cohort',
    ],
  },
];

const stats = [
  { value: 34,    display: '34',    suffix: '',   label: 'FTE Jobs, Year 1'        },
  { value: 12,    display: '12+',   suffix: '+',  label: 'Vendor Stalls Available'  },
  { value: 60,    display: '~60%',  suffix: '%',  label: 'Cost Savings vs. Solo'    },
  { value: 0,     display: '$0',    suffix: '',   label: 'Franchise Fees Ever'       },
];

export default function EntrepreneurSection() {
  const ref        = useRef<HTMLElement>(null);
  const statRefs   = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stat count-up animation
      statRefs.current.forEach((el, i) => {
        if (!el || stats[i].value === 0) return;
        const obj = { val: 0 };
        const target = stats[i].value;
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() {
            if (!el) return;
            const v = Math.round(obj.val);
            el.textContent = i === 1 ? `${v}+` : i === 2 ? `~${v}%` : `${v}`;
          },
        });
      });

      // Pillar cards stagger
      gsap.from('.ent-pillar', {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: '.ent-pillars', start: 'top 78%', once: true },
      });

      // Callout
      gsap.from('.ent-callout', {
        opacity: 0, y: 24, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.ent-callout', start: 'top 82%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="incubator"
      ref={ref}
      className="py-32 px-6"
      style={{ background: 'linear-gradient(to bottom, #1C1209 0%, #12100a 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Entrepreneur Pathways"
          title="Built for Borderland Food Makers"
          subtitle="Southern New Mexico's first culinary incubator — lowering barriers so local food entrepreneurs can build real, lasting businesses."
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/[0.06] mb-16">
          {stats.map(({ display, label }, i) => (
            <div
              key={label}
              className="bg-bg p-8 md:p-10 text-center hover:bg-white/[0.03]
                         transition-colors duration-400"
            >
              <div
                ref={(el) => { statRefs.current[i] = el; }}
                className="font-corp-display text-5xl md:text-6xl font-light text-gold mb-3 leading-none"
              >
                {display}
              </div>
              <div className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/40">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Pillar cards */}
        <div className="ent-pillars grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/[0.06] mb-16">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="ent-pillar group relative bg-bg p-10 hover:bg-white/[0.04]
                         transition-colors duration-500 overflow-hidden"
            >
              {/* Roman numeral background */}
              <span
                className="absolute top-6 right-8 font-corp-display text-7xl font-light
                           text-cream/[0.04] group-hover:text-cream/[0.07] select-none
                           pointer-events-none transition-colors duration-500"
                aria-hidden="true"
              >
                {p.numeral}
              </span>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-corp-display text-2xl font-light text-gold">
                  {p.numeral}
                </span>
                <span className="h-px flex-1 bg-cream/[0.08] max-w-[2rem]" aria-hidden="true" />
              </div>

              <h3 className="font-corp-display text-2xl font-light text-cream mb-6 leading-snug">
                {p.title}
              </h3>

              <ul className="space-y-3.5">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 font-sans text-sm text-cream/55 leading-relaxed"
                  >
                    <span className="mt-[0.35em] text-gold shrink-0 text-xs" aria-hidden="true">◈</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Workforce callout */}
        <div
          className="ent-callout border border-cream/[0.08] bg-white/[0.02]
                     p-10 md:p-14 flex flex-col md:flex-row items-start gap-8
                     hover:border-cream/[0.14] transition-colors duration-400"
        >
          <span className="font-corp-display text-4xl font-light text-gold shrink-0">◆</span>
          <div className="flex-1">
            <p className="font-label text-[9px] tracking-[0.25em] uppercase text-gold mb-3">
              Academic Partnership
            </p>
            <h3 className="font-corp-display text-2xl font-light text-cream mb-3 leading-snug">
              NMSU &amp; DACC Workforce Partnership
            </h3>
            <p className="font-sans text-sm leading-relaxed text-cream/55 max-w-2xl">
              Cider &amp; Spice is partnering with New Mexico State University and Doña Ana Community College
              to create a formal culinary certificate pipeline. Students gain real-world experience inside
              the hub; vendors gain trained staff. The program launches in coordination with our Q1–Q2 2027 opening.
            </p>
          </div>
          <Link
            href="/vendors"
            className="shrink-0 self-start md:self-center border border-cream/25 px-7 py-3.5
                       font-label text-[10px] tracking-[0.2em] uppercase text-cream/70
                       hover:border-gold/60 hover:text-gold transition-all duration-300
                       whitespace-nowrap"
          >
            Apply as a Vendor →
          </Link>
        </div>
      </div>
    </section>
  );
}
