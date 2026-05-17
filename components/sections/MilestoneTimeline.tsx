'use client';
// MilestoneTimeline — animated draw effect on the spine, staggered reveal per item.
// GSAP ScrollTrigger: spine draws from top → bottom as user scrolls.
// Each item fades + slides in sequentially.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
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
    detail: "Public grand opening of Las Cruces Culinary Innovation Hub — Southern New Mexico's first food hall and craft cider bar.",
    status: 'upcoming',
  },
];

const statusStyles: Record<MilestoneStatus, { dot: string; dotBg: string; label: string; date: string; card: string }> = {
  done: {
    dot:   'border-gold',
    dotBg: '#D4A84B',
    label: 'text-cream',
    date:  'text-gold',
    card:  'border-gold/20 hover:border-gold/40',
  },
  active: {
    dot:   'border-ember ring-2 ring-ember/30 ring-offset-1 ring-offset-bg',
    dotBg: '#C45D2A',
    label: 'text-cream',
    date:  'text-ember',
    card:  'border-ember/30 hover:border-ember/50',
  },
  upcoming: {
    dot:   'border-cream/20',
    dotBg: 'transparent',
    label: 'text-cream/50',
    date:  'text-cream/35',
    card:  'border-cream/[0.07] hover:border-cream/[0.14]',
  },
};

export default function MilestoneTimeline() {
  const ref    = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spine "draw" — scale Y from 0→1 as section scrolls into view
      if (spineRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.6,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // Items stagger in after spine starts drawing
      gsap.from('.timeline-item', {
        opacity: 0,
        x: -20,
        duration: 0.75,
        stagger: 0.13,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: { trigger: '.timeline-track', start: 'top 76%', once: true },
      });

      // Active dot pulse
      gsap.to('.dot-active', {
        scale: 1.25,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const doneCount = MILESTONES.filter(m => m.status === 'done').length;
  const totalCount = MILESTONES.length;
  const progressPct = Math.round((doneCount / totalCount) * 100);

  return (
    <section id="timeline" ref={ref} className="py-32 px-6 bg-bg">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          badge="Project Roadmap"
          title="The Path to Opening"
          subtitle="From site selection to grand opening — here's where we are and what comes next."
        />

        {/* Progress bar */}
        <div className="mt-12 mb-14">
          <div className="flex justify-between items-center mb-3">
            <span className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/40">
              {doneCount} of {totalCount} milestones complete
            </span>
            <span className="font-corp-display text-2xl font-light" style={{ color: '#D4A84B' }}>
              {progressPct}%
            </span>
          </div>
          <div className="h-px w-full" style={{ background: 'rgba(245,239,230,0.08)' }}>
            <div
              className="h-px transition-all duration-1000"
              style={{
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, #C97A3E, #D4A84B)',
              }}
            />
          </div>
        </div>

        <div className="timeline-track relative mt-6">
          {/* Animated spine */}
          <div
            ref={spineRef}
            className="absolute left-[8px] top-3 bottom-3 w-px"
            style={{ background: 'linear-gradient(to bottom, #D4A84B 0%, rgba(212,168,75,0.15) 100%)' }}
            aria-hidden="true"
          />
          {/* Ghost spine (always visible, faint) */}
          <div
            className="absolute left-[8px] top-3 bottom-3 w-px"
            style={{ background: 'rgba(245,239,230,0.06)' }}
            aria-hidden="true"
          />

          <ol className="relative space-y-0">
            {MILESTONES.map(({ label, date, detail, status }, i) => {
              const s = statusStyles[status];
              const isLast = i === MILESTONES.length - 1;
              return (
                <li
                  key={label}
                  className={`timeline-item relative flex gap-8 pb-10 last:pb-0 group`}
                >
                  {/* Dot */}
                  <div className="relative z-10 flex flex-col items-center pt-0.5 shrink-0">
                    <span
                      className={`block h-[18px] w-[18px] rounded-full border-2 shrink-0
                                  transition-all duration-300 ${
                                    status === 'active' ? 'dot-active' : ''
                                  } ${s.dot}`}
                      style={{
                        backgroundColor: s.dotBg,
                        boxShadow: status === 'done'
                          ? '0 0 8px rgba(212,168,75,0.4)'
                          : status === 'active'
                          ? '0 0 12px rgba(196,93,42,0.5)'
                          : 'none',
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 min-w-0 border px-6 py-5 mb-4 last:mb-0
                                transition-all duration-400 ${s.card}`}
                    style={{ background: 'rgba(28,18,9,0.5)' }}
                  >
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <span className={`font-corp-display text-xl font-light leading-snug ${s.label}`}>
                        {label}
                      </span>
                      <span className={`font-label text-[9px] tracking-[0.2em] uppercase ${s.date}`}>
                        {date}
                      </span>
                      {status === 'active' && (
                        <span className="font-label text-[8px] tracking-[0.2em] uppercase text-[#100E0A]
                                          px-2 py-0.5"
                          style={{ background: 'linear-gradient(135deg,#C97A3E,#D4A84B)' }}>
                          In Progress
                        </span>
                      )}
                      {status === 'done' && (
                        <span className="font-corp-display text-sm" style={{ color: '#D4A84B' }}
                          aria-label="Completed">✓</span>
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
