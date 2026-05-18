'use client';

import { useEffect, useRef, useState } from 'react';
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

const steps = [
  {
    number: '01',
    title: 'Outreach',
    body: 'Program Coordinator matches leads to program mission and cuisine mix goals, ensuring every cohort reflects the diversity of Borderlands food culture.',
  },
  {
    number: '02',
    title: 'Application & Selection',
    body: 'Incubator Director and Selection Committee score concepts, review financials, and host tasting events. Concepts are evaluated on fit, margin literacy, operations history, and compliance readiness.',
  },
  {
    number: '03',
    title: 'Food Entrepreneur Academy',
    body: 'An 8–12 week accelerated track for launch-ready vendors. Covers menu costing, unit economics, POS setup, and full NMED compliance package preparation.',
  },
  {
    number: '04',
    title: 'Onboarding',
    body: 'Operations Manager executes license agreements, verifies insurance certificates, confirms CFPM credentials, and finalizes POS and scheduling software access.',
  },
  {
    number: '05',
    title: 'Soft Launch',
    body: 'Hall Manager monitors opening checklists and daily sales data. Vendors must clear a structured soft-launch review before entering regular scheduling.',
  },
  {
    number: '06',
    title: 'Growth Support',
    body: 'Incubator Director provides monthly review scorecards tracking sales per stall, food cost percentage, rent-to-sales ratio, and compliance score.',
  },
  {
    number: '07',
    title: 'Improvement Plan',
    body: 'A formal, time-bound template executed if a vendor falls below baseline performance standards. Includes coaching milestones and a clear remediation timeline.',
  },
  {
    number: '08',
    title: 'Graduation & Offboarding',
    body: 'Systematic transition into an independent brick-and-mortar location, food truck, or packaged product line — with alumni tracking and Hub referral support.',
  },
];

const criteria = [
  {
    criterion: 'Concept Fit',
    evidence: 'Menu fills a cuisine gap and complements the mix without internal competition.',
    redFlag: 'Duplicates an existing concept without clear differentiation.',
  },
  {
    criterion: 'Financial Readiness',
    evidence: 'Understands margins, COGS, labor, and realistic break-even volumes.',
    redFlag: 'No understanding of margin; cannot explain cost coverage.',
  },
  {
    criterion: 'Operations Capability',
    evidence: 'Prior pop-up, truck, catering, or academy history with strong evaluations.',
    redFlag: 'Erratic or unsafe execution; cannot produce consistent tasting samples.',
  },
  {
    criterion: 'Compliance Readiness',
    evidence: 'Possesses or actively pursuing food handler/CFPM credential; clear insurance plan.',
    redFlag: 'Resistant to documentation; dismissive of health code obligations.',
  },
];

export default function VendorOnboardingSection() {
  const ref = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vo-header', { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.vo-header', start: 'top 85%', once: true } });
      gsap.from('.vo-step', { opacity: 0, x: -20, duration: 0.6, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.vo-steps', start: 'top 80%', once: true } });
      gsap.from('.vo-table-row', { opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: '.vo-table', start: 'top 85%', once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="vendor-onboarding"
      style={{ background: D3.walnut, padding: '6rem 1.5rem' }}
      aria-label="Vendor onboarding process">
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* Header */}
        <div className="vo-header" style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem',
              letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>
              Vendor Program
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 300, color: D3.parchment,
            lineHeight: 1.1, marginBottom: '1rem' }}>
            From First Idea to
            <em style={{ fontStyle: 'italic', color: D3.terracotta }}> Grand Opening</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1rem',
            lineHeight: 1.8, color: `${D3.wheat}99`, maxWidth: '560px' }}>
            Eight structured milestones take every vendor from initial outreach through a supported launch
            and toward a clear graduation pathway &mdash; with coaching at every stage.
          </p>
        </div>

        {/* Steps grid */}
        <div className="vo-steps" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px',
          background: 'rgba(232,193,141,0.08)', border: '1px solid rgba(232,193,141,0.08)',
          marginBottom: '4rem',
        }}>
          {steps.map((s, i) => (
            <div key={s.number} className="vo-step"
              onClick={() => setActiveStep(i)}
              style={{
                padding: '1.75rem', cursor: 'default',
                background: activeStep === i ? 'rgba(192,98,42,0.08)' : D3.walnut,
                borderLeft: activeStep === i ? `2px solid ${D3.terracotta}` : '2px solid transparent',
                transition: 'background 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(192,98,42,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = activeStep === i ? 'rgba(192,98,42,0.08)' : D3.walnut)}>
              <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '2rem', fontWeight: 300, color: `${D3.terracotta}60`, lineHeight: 1 }}>
                {s.number}
              </span>
              <h3 style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: D3.wheat, marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.88rem', lineHeight: 1.75, color: `${D3.wheat}70` }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Selection criteria table */}
        <div className="vo-table">
          <h3 style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: D3.terracotta, marginBottom: '1.5rem' }}>
            Selection Criteria
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid rgba(232,193,141,0.15)` }}>
                  {['Criterion', 'What We Evaluate', 'Red Flags'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem',
                      fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                      color: `${D3.wheat}60`, fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map((row, i) => (
                  <tr key={row.criterion} className="vo-table-row"
                    style={{ borderBottom: '1px solid rgba(232,193,141,0.07)',
                      background: i % 2 === 0 ? 'rgba(44,36,22,0.0)' : 'rgba(92,74,48,0.15)' }}>
                    <td style={{ padding: '1rem', fontSize: '0.82rem', color: D3.wheat,
                      fontWeight: 500, whiteSpace: 'nowrap' }}>{row.criterion}</td>
                    <td style={{ padding: '1rem', fontSize: '0.82rem', color: `${D3.wheat}80`, lineHeight: 1.65 }}>{row.evidence}</td>
                    <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#c0622a99', lineHeight: 1.65 }}>{row.redFlag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
