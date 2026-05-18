'use client';
// Direction 3 — Artisan Collective: project roadmap.
// Grammar pass: milestone detail copy tightened, badge spacing improved.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

type MilestoneStatus = 'done' | 'active' | 'upcoming';

const MILESTONES: { label: string; date: string; detail: string; status: MilestoneStatus }[] = [
  {
    label: 'Site Identified',
    date: 'Q3 2024',
    detail: 'East Lohman Ave corridor selected — 8,000 sq ft anchor space confirmed within the West Picacho MRA redevelopment zone.',
    status: 'done',
  },
  {
    label: 'Business Plan Complete',
    date: 'Q1 2025',
    detail: 'Full financial model (Appendix F), market analysis, grant eligibility assessment, and capital stack structured.',
    status: 'done',
  },
  {
    label: 'Community & Partner Outreach',
    date: 'Q2–Q3 2025',
    detail: 'Endorsed by Elevate Las Cruces, Visit Las Cruces, WESST NM, SCORE Southern NM, NMSU/DACC, and the Las Cruces SBDC.',
    status: 'done',
  },
  {
    label: 'Capital Raise & Vendor Selection',
    date: 'Q3–Q4 2026',
    detail: 'Investor inquiries are now open. Founding cohort of 10–13 vendors selected from applications. Grant applications submitted.',
    status: 'active',
  },
  {
    label: 'Permitting & Build-Out',
    date: 'Q4 2026 – Q1 2027',
    detail: 'City permits, contractor selection, stall build-out, kitchen equipment installation, and pre-opening inspections.',
    status: 'upcoming',
  },
  {
    label: 'Soft Open',
    date: 'Q1 2027',
    detail: 'Founding vendors, Cider Club members, and press & media preview — limited-capacity soft launch before the public grand opening.',
    status: 'upcoming',
  },
  {
    label: 'Grand Opening',
    date: 'Q2 2027',
    detail: "Public grand opening of Cider & Spice — Southern New Mexico’s first food hall and craft cider bar.",
    status: 'upcoming',
  },
];

export default function MilestoneTimeline() {
  const ref      = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (spineRef.current) {
        gsap.fromTo(spineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } }
        );
      }
      gsap.from('.timeline-item', { opacity: 0, x: -20, duration: 0.75, stagger: 0.13, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: '.timeline-track', start: 'top 76%', once: true } });
      gsap.to('.dot-active', { scale: 1.25, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, ref);
    return () => ctx.revert();
  }, []);

  const doneCount   = MILESTONES.filter(m => m.status === 'done').length;
  const totalCount  = MILESTONES.length;
  const progressPct = Math.round((doneCount / totalCount) * 100);

  return (
    <section id="timeline" ref={ref} style={{ background: `linear-gradient(to bottom, ${D3.walnut}, #1e1710)`, padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>Project Roadmap</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>The Path to Opening</h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '480px', lineHeight: 1.75 }}>From site selection to grand opening — here’s where we are and what comes next.</p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}50` }}>
              {doneCount} of {totalCount} milestones complete
            </span>
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.5rem', fontWeight: 300, color: D3.terracotta }}>{progressPct}%</span>
          </div>
          <div style={{ height: '1px', width: '100%', background: 'rgba(247,243,236,0.07)' }}>
            <div style={{ height: '1px', width: `${progressPct}%`, background: `linear-gradient(90deg, ${D3.terracotta}, ${D3.wheat})` }} />
          </div>
        </div>

        <div className="timeline-track" style={{ position: 'relative', marginTop: '1.5rem' }}>
          {/* Animated spine */}
          <div ref={spineRef} style={{ position: 'absolute', left: '8px', top: '0.75rem', bottom: '0.75rem', width: '1px', background: `linear-gradient(to bottom, ${D3.terracotta} 0%, rgba(192,98,42,0.15) 100%)` }} aria-hidden="true" />
          {/* Ghost spine */}
          <div style={{ position: 'absolute', left: '8px', top: '0.75rem', bottom: '0.75rem', width: '1px', background: 'rgba(247,243,236,0.05)' }} aria-hidden="true" />

          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {MILESTONES.map(({ label, date, detail, status }, i) => {
              const isDone     = status === 'done';
              const isActive   = status === 'active';
              const isUpcoming = status === 'upcoming';
              return (
                <li key={label} className="timeline-item" style={{ position: 'relative', display: 'flex', gap: '2rem', paddingBottom: i < MILESTONES.length - 1 ? '2.5rem' : 0 }}>
                  {/* Dot */}
                  <div style={{ position: 'relative', zIndex: 10, flexShrink: 0, paddingTop: '2px' }}>
                    <span
                      className={isActive ? 'dot-active' : ''}
                      style={{
                        display: 'block', width: '18px', height: '18px', borderRadius: '50%',
                        border: `2px solid ${ isDone ? D3.wheat : isActive ? D3.terracotta : 'rgba(247,243,236,0.2)' }`,
                        background: isDone ? D3.wheat : isActive ? D3.terracotta : 'transparent',
                        boxShadow: isDone ? `0 0 8px rgba(232,193,141,0.35)` : isActive ? `0 0 12px rgba(192,98,42,0.5)` : 'none',
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1,
                    border: `1px solid ${ isDone ? 'rgba(232,193,141,0.2)' : isActive ? 'rgba(192,98,42,0.3)' : 'rgba(247,243,236,0.07)' }`,
                    background: 'rgba(44,36,22,0.55)', padding: '1.25rem 1.5rem', marginBottom: '1rem',
                    transition: 'border-color 0.3s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = isDone ? 'rgba(232,193,141,0.4)' : isActive ? 'rgba(192,98,42,0.55)' : 'rgba(247,243,236,0.18)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = isDone ? 'rgba(232,193,141,0.2)' : isActive ? 'rgba(192,98,42,0.3)' : 'rgba(247,243,236,0.07)')}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.2rem', fontWeight: 400, color: isUpcoming ? `${D3.parchment}80` : D3.parchment, lineHeight: 1.25 }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: isDone ? `${D3.wheat}90` : isActive ? D3.terracotta : `${D3.wheat}50` }}>{date}</span>
                      {isActive && (
                        <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', background: D3.terracotta, color: D3.parchment, padding: '2px 10px' }}>In Progress</span>
                      )}
                      {isDone && (
                        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '0.9rem', color: D3.wheat }} aria-label="Completed">✓</span>
                      )}
                    </div>
                    <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.82rem', lineHeight: 1.75, color: D3.wheat, opacity: isUpcoming ? 0.35 : 0.5, maxWidth: '38rem' }}>{detail}</p>
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
