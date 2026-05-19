'use client';
// GlassCard upgrade:
//   • Semilla pathway → GlassCard variant="dark" (cooler, early-stage)
//   • Mariposa pathway → GlassCard variant="glow" (warm terracotta edge on hover)
//   • KPI tiles → GlassCard hover={true} (lifts on hover instead of flat walnut)
//   • All existing GSAP entrances (ip-header, ip-pathway, ip-phase, ip-kpi) preserved.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const phases = [
  { label: 'Phase 0', name: 'Proof-First',      desc: 'Pop-up events, market tables, and vendor tastings validate demand prior to construction risk.' },
  { label: 'Phase 1', name: 'Outdoor / Mobile', desc: 'Food truck court, cider & event pad, and ticketed events gather baseline sales data with lower fixed costs.' },
  { label: 'Phase 2', name: 'Indoor Launch',    desc: 'Permanent and incubator stalls, shared seating, commissary, gift shop, and licensed cider bar open to the public.' },
  { label: 'Phase 3', name: 'Stabilization',    desc: 'Monthly vendor reviews, event rhythms established, and operational adjustments executed.' },
  { label: 'Phase 4', name: 'Optimization',     desc: 'Graduation pathways executed, sponsorships renewed, and backfill cycle managed to maintain 80%+ occupancy.' },
];

const kpis = [
  { metric: 'Occupancy Rate',             detail: 'Alert triggered if below 80% for more than 60 consecutive days.' },
  { metric: 'Sales per Stall per Day',    detail: 'Flagged if performance slips below vendor break-even threshold.' },
  { metric: 'Rent-to-Sales Ratio',        detail: 'Vendors exceeding sustainable threshold flagged for immediate coaching.' },
  { metric: 'Gross Margin / Food Cost',   detail: 'Evaluated monthly during coaching sessions to safeguard unit economics.' },
  { metric: 'Compliance Score',           detail: 'Tracks log completion, cleanliness audits, training currency, and POS sync.' },
  { metric: 'Graduation Readiness Score', detail: 'Proportion of vendors on track to graduate against their target timelines.' },
];

export default function IncubatorProgramSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ip-header',  { opacity: 0, y: 28,  duration: 0.8,  ease: 'power3.out', scrollTrigger: { trigger: '.ip-header',   start: 'top 85%', once: true } });
      gsap.from('.ip-pathway', { opacity: 0, y: 20,  duration: 0.6,  stagger: 0.1,  ease: 'power3.out', scrollTrigger: { trigger: '.ip-pathways', start: 'top 80%', once: true } });
      gsap.from('.ip-phase',   { opacity: 0, x: -16, duration: 0.5,  stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.ip-phases',   start: 'top 82%', once: true } });
      gsap.from('.ip-kpi',     { opacity: 0, y: 14,  duration: 0.45, stagger: 0.07, ease: 'power2.out', scrollTrigger: { trigger: '.ip-kpis',     start: 'top 85%', once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="incubator-program"
      style={{ background: D3.walnut, padding: '6rem 1.5rem' }}
      aria-label="Incubator program overview">
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* Header */}
        <div className="ip-header" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>Incubator Program</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '1rem' }}>
            A Launch Platform,
            <em style={{ fontStyle: 'italic', color: D3.terracotta }}> Not Just a Food Court</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: `${D3.wheat}90`, maxWidth: '600px' }}>
            The Hub occupies a unique position in the food entrepreneurship ecosystem &mdash;
            simultaneously a customer-facing dining destination and a structured business
            development program that systematically builds operator capability.
          </p>
        </div>

        {/* Semilla / Mariposa pathways — GlassCard */}
        <div className="ip-pathways"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4.5rem' }}>

          <GlassCard variant="dark" hover={true} className="ip-pathway" style={{ padding: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '2.4rem', fontWeight: 300, color: D3.terracotta }}>Semilla</span>
            <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: `${D3.wheat}55`, margin: '0.4rem 0 1rem' }}>Early-Stage Track &middot; ~24 Weeks</p>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', lineHeight: 1.75, color: `${D3.wheat}80` }}>
              A 6-month accelerated track built around the sequence
              <strong style={{ color: D3.wheat }}> Validate &rarr; Verify &rarr; Launch</strong>.
              Combines practical worksheets, cohort networking, menu costing, unit economics,
              and NMED compliance package preparation.
            </p>
          </GlassCard>

          <GlassCard variant="glow" hover={true} className="ip-pathway" style={{ padding: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '2.4rem', fontWeight: 300, color: D3.terracotta }}>Mariposa</span>
            <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: `${D3.wheat}55`, margin: '0.4rem 0 1rem' }}>Scale Track &middot; Mature Operators</p>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', lineHeight: 1.75, color: `${D3.wheat}80` }}>
              Designed for mature food-industry businesses ready to scale. Provides specialized
              facility access, equipment guidance, wholesale pathway support, and scaling
              infrastructure &mdash; with graduation into an independent location as the target outcome.
            </p>
          </GlassCard>
        </div>

        {/* Phased launch */}
        <div style={{ marginBottom: '4.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '1.75rem' }}>Phased Launch Strategy</h3>
          <div className="ip-phases" style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {phases.map((p, i) => (
              <div key={p.label} className="ip-phase" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '1.25rem 1.5rem', gap: '1.5rem', background: i % 2 === 0 ? 'rgba(92,74,48,0.2)' : 'rgba(44,36,22,0.3)', borderLeft: `3px solid ${i < 2 ? `${D3.terracotta}40` : i < 4 ? `${D3.terracotta}80` : D3.terracotta}` }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.terracotta, display: 'block' }}>{p.label}</span>
                  <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', color: D3.wheat }}>{p.name}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.88rem', lineHeight: 1.7, color: `${D3.wheat}75`, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* KPI dashboard — GlassCard tiles */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '1.75rem' }}>Performance Dashboard</h3>
          <div className="ip-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {kpis.map(kpi => (
              <GlassCard key={kpi.metric} hover={true} className="ip-kpi" style={{ padding: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: D3.wheat, display: 'block', marginBottom: '0.6rem' }}>{kpi.metric}</span>
                <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.84rem', lineHeight: 1.65, color: `${D3.wheat}65`, margin: 0 }}>{kpi.detail}</p>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
