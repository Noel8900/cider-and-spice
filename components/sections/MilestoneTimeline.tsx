'use client';
// MilestoneTimeline — visual project roadmap.
// Shows progress from site selection → grand opening.
// GSAP scroll-triggered reveal.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

type MilestoneStatus = 'done' | 'active' | 'upcoming';

const MILESTONES: {
  label: string;
  date: string;
  detail: string;
  status: MilestoneStatus;
}[] = [
  {
    label:  'Site Identified',
    date:   'Q3 2024',
    detail: 'East Lohman Ave corridor selected — 8,000 sq ft anchor space confirmed within the W. Picacho MRA redevelopment zone.',
    status: 'done',
  },
  {
    label:  'Business Plan Complete',
    date:   'Q1 2025',
    detail: 'Full financial model (Appendix F), market analysis, grant eligibility assessment, and capital stack structured.',
    status: 'done',
  },
  {
    label:  'Community & Partner Outreach',
    date:   'Q2–Q3 2025',
    detail: 'Endorsed by Elevate Las Cruces, Visit Las Cruces, WESST NM, SCORE Southern NM, NMSU/DACC, and the Las Cruces SBDC.',
    status: 'done',
  },
  {
    label:  'Capital Raise & Vendor Selection',
    date:   'Q3–Q4 2026',
    detail: 'Investor inquiries open. Founding cohort of 10–13 vendors selected from applications. Grant applications submitted.',
    status: 'active',
  },
  {
    label:  'Permitting & Build-Out',
    date:   'Q4 2026 – Q1 2027',
    detail: 'City permits, contractor selection, stall build-out, kitchen equipment installation, and pre-opening inspections.',
    status: 'upcoming',
  },
  {
    label:  'Soft Open',
    date:   'Q1 2027',
    detail: 'Founding vendors, Cider Club members, and media preview — limited-capacity soft launch before public grand opening.',
    status: 'upcoming',
  },
  {
    label:  'Grand Opening',
    date:   'Q2 2027',
    detail: 'Public grand opening of Las Cruces Culinary Innovation Hub — Southern New Mexico\'s first food hall and craft cider bar.',
    status: 'upcoming',
  },
];

const statusStyles: Record<MilestoneStatus, { dot: string; line: string; label: string; date: string }> = {
  done:     { dot: 'bg-gold border-gold',            line: 'bg-gold/50',           label: 'text-cream',     date: 'text-gold'        },
  active:   { dot: 'bg-ember border-ember ring-2 ring-ember/30 ring-offset-1 ring-offset-bg', line: 'bg-cream/20', label: 'text-cream', date: 'text-ember' },
  upcoming: { dot: 'bg-transparent border-cream/20', line: 'bg-cream/10',          label: 'text-cream/50',  date: 'text-cream/35'    },
};

export default function MilestoneTimeline() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        opacity: 0, x: -24, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.timeline-track', start: 'top 78%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={ref} className="py-32 px-6 bg-bg">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          badge="Project Roadmap"
          title="The Path to Opening"
          subtitle="From site selection to grand opening — here's where we are and what comes next."
        />

        <div className="timeline-track relative mt-16">
          {/* Vertical spine */}
          <div className="absolute left-3.5 top-2 bottom-2 w-px bg-cream/[0.08]" aria-hidden="true" />

          <ol className="relative space-y-0">
            {MILESTONES.map(({ label, date, detail, status }, i) => {
              const s = statusStyles[status];
              const isLast = i === MILESTONES.length - 1;
              return (
                <li key={label} className="timeline-item relative flex gap-8 pb-10 last:pb-0">
                  {/* Dot + connector */}
                  <div className="relative z-10 flex flex-col items-center pt-0.5 shrink-0">
                    <span
                      className={`block h-[18px] w-[18px] rounded-full border-2 shrink-0 transition-all ${s.dot}`}
                      aria-hidden="true"
                    />
                    {!isLast && (
                      <span className={`flex-1 w-px mt-2 ${s.line}`} aria-hidden="true" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-0 pt-0 flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <span className={`font-corp-display text-xl font-light leading-snug ${s.label}`}>
                        {label}
                      </span>
                      <span className={`font-label text-[9px] tracking-[0.2em] uppercase ${s.date}`}>
                        {date}
                      </span>
                      {status === 'active' && (
                        <span className="font-label text-[8px] tracking-[0.2em] uppercase text-white
                                          bg-ember px-2 py-0.5">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm leading-relaxed text-cream/45 max-w-xl">
                      {detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
