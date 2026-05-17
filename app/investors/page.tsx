'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitInvestorInquiry } from './actions';
import type { InvestorInquiryData, InvestorActionResult } from './actions';
import FormField from '@/components/ui/FormField';

gsap.registerPlugin(ScrollTrigger);

// ─── Direction 3 — Artisan Collective design tokens ───────────────────────────
const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

// ─── Static data ──────────────────────────────────────────────────────────────

const METRICS = [
  { id: 'capital',   raw: 1505000, formatted: '$1,505,000', label: 'Total Project Capital',        prefix: '$', suffix: '' },
  { id: 'revenue',   raw: 822,     formatted: '$822K',       label: 'Year 1 Revenue (Appendix F)',  prefix: '$', suffix: 'K' },
  { id: 'breakeven', raw: null,    formatted: '18–20 mo',    label: 'Cash Flow Breakeven',          prefix: '',  suffix: '' },
  { id: 'irr',       raw: null,    formatted: '17–20%',      label: 'Illustrative 3-Year IRR',      prefix: '',  suffix: '' },
] as const;

const WHY_NOW = [
  {
    glyph: '◆',
    title: 'Zero Direct Competitors',
    body:  'There is no food hall within 200 miles of Las Cruces. Cider & Spice is a first-mover in a 215,000-person metro with a rapidly expanding food tourism scene.',
  },
  {
    glyph: '◈',
    title: '6 Grant Categories',
    body:  'The Hub is structured to qualify for CDBG, NM MainStreet, USDA RBDG, EDA, SBA 7(a), and Opportunity Zone funding — reducing investor risk and extending runway.',
  },
  {
    glyph: '◉',
    title: 'Multiple Revenue Streams',
    body:  'Stall rents, commissary kitchen fees, cider bar revenue, event rentals, and market vendor fees provide diversified cash flow — not single-tenant dependency.',
  },
  {
    glyph: '◇',
    title: 'Incubator Mission = Tax Advantages',
    body:  'As a culinary incubator, the Hub aligns with NMEDA and federal programs that provide meaningful tax credit eligibility for qualifying investors.',
  },
  {
    glyph: '✦',
    title: 'City & State Alignment',
    body:  "Endorsed by Elevate Las Cruces, Visit Las Cruces, and aligned with the city's East Lohman Development Plan and W. Picacho MRA redevelopment initiative.",
  },
  {
    glyph: '◇',
    title: 'Conservative Underwriting',
    body:  'The Appendix F model uses conservative Year 1 projections. Breakeven at month 18–20. The 17–20% IRR is illustrative based on base-case assumptions.',
  },
];

interface InvestorTier {
  name:      string;
  range:     string;
  glyph:     string;
  featured?: boolean;
  perks:     string[];
}

const TIERS: InvestorTier[] = [
  {
    name:  'Community Investor',
    range: '$25K – $74,999',
    glyph: '◇',
    perks: [
      'Investor newsletter & quarterly updates',
      'Named recognition in Hub materials',
      'Early access to Cider Club founding membership',
      '3-year Appendix F projection summary',
    ],
  },
  {
    name:     'Growth Partner',
    range:    '$75K – $199,999',
    glyph:    '◈',
    featured: true,
    perks: [
      'All Community Investor perks',
      'Invitation to quarterly investor briefings',
      'Priority commissary kitchen bookings',
      'Hub Advisory Board observer seat',
      'Full Appendix F Cashflow Model access',
    ],
  },
  {
    name:  'Founding Investor',
    range: '$200K+',
    glyph: '◆',
    perks: [
      'All Growth Partner perks',
      'Named feature in Hub signage & website',
      'Annual private cider pairing dinner',
      'Equity participation discussion eligible',
      'Co-investment in graduating vendors (5–15%)',
    ],
  },
];

const INVESTMENT_RANGES = [
  { value: '',               label: 'Select a range…',        disabled: true },
  { value: '$25K–$74,999',  label: '$25,000 – $74,999'                      },
  { value: '$75K–$199,999', label: '$75,000 – $199,999'                     },
  { value: '$200K+',        label: '$200,000+'                               },
  { value: 'grant',         label: 'Grant / Non-dilutive Funder'             },
  { value: 'other',         label: 'Other / Not yet determined'              },
];

const EMPTY: InvestorInquiryData = {
  name:             '',
  email:            '',
  organization:     '',
  investment_range: '',
  message:          '',
};

// ─── Shared inline styles ─────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#3a2e1e',
  border: '1px solid rgba(192,98,42,0.25)',
  borderRadius: '2px',
  padding: '12px 16px',
  color: D3.parchment,
  fontFamily: 'var(--font-inter), system-ui, sans-serif',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};

// ─── Small helpers ────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function AlertCircle() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0" style={{ color: '#f87171' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '28rem', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '3.5rem', color: D3.terracotta, display: 'block', marginBottom: '2rem' }} aria-hidden="true">◈</span>
        <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: D3.parchment, marginBottom: '1rem', lineHeight: 1.15 }}>
          Inquiry Received
        </h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.8, marginBottom: '0.75rem' }}>
          Thank you for your interest in the Las Cruces Culinary Innovation Hub.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.8, marginBottom: '2.5rem' }}>
          We will review your inquiry and follow up at the email you provided within{' '}
          <strong style={{ color: D3.parchment }}>48 hours</strong>. You will receive the executive summary,
          capital stack overview, and Appendix F financial snapshot.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <Link href="/"
            style={{
              display: 'inline-block',
              background: D3.terracotta,
              color: D3.parchment,
              padding: '14px 40px',
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
            Back to Home
          </Link>
          <Link href="/cider-club"
            style={{
              display: 'inline-block',
              border: `1px solid rgba(232,193,141,0.25)`,
              color: D3.wheat,
              padding: '13px 40px',
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
            Explore Cider Club →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvestorsPage() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const tiersRef   = useRef<HTMLDivElement>(null);
  const whyNowRef  = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const [form, setForm]             = useState<InvestorInquiryData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  // GSAP hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-title',   { opacity: 0, y: 24, duration: 1.0, ease: 'power3.out', delay: 0.4 });
      gsap.from('.hero-sub',     { opacity: 0, y: 18, duration: 0.9, ease: 'power3.out', delay: 0.65 });
      gsap.from('.hero-actions', { opacity: 0, y: 14, duration: 0.8, ease: 'power3.out', delay: 0.85 });
      gsap.from('.hero-scroll',  { opacity: 0, duration: 1.0, ease: 'power2.out', delay: 1.3 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // GSAP count-up on numeric metrics
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-metric-target]');
    const triggers: ScrollTrigger[] = [];
    els.forEach((el) => {
      const target = Number(el.dataset.metricTarget);
      const prefix = el.dataset.metricPrefix ?? '';
      const suffix = el.dataset.metricSuffix ?? '';
      if (!target) return;
      const obj = { val: 0 };
      const st = ScrollTrigger.create({
        trigger: el, start: 'top 80%', once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target, duration: 2.2, ease: 'power2.out',
            onUpdate() {
              el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
            },
          });
        },
      });
      triggers.push(st);
    });
    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  // GSAP stagger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.inv-tier-card', {
        opacity: 0, y: 32, duration: 1.0, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: tiersRef.current, start: 'top 78%', once: true },
      });
      gsap.from('.why-now-card', {
        opacity: 0, y: 26, duration: 0.9, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: whyNowRef.current, start: 'top 78%', once: true },
      });
    }, tiersRef);
    return () => ctx.revert();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result: InvestorActionResult = await submitInvestorInquiry(form);
    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.message);
      setSubmitting(false);
    }
  }

  return (
    <main style={{ background: D3.walnut, minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background: `radial-gradient(ellipse 90% 70% at 50% 40%, rgba(192,98,42,0.13) 0%, transparent 70%), ${D3.walnut}`,
      }}>
        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(232,193,141,1) 25%, rgba(232,193,141,1) 26%, transparent 27%), linear-gradient(90deg, transparent 24%, rgba(232,193,141,1) 25%, rgba(232,193,141,1) 26%, transparent 27%)',
          backgroundSize: '60px 60px',
        }} />
        {/* Bottom fade */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${D3.walnut} 100%)` }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px', padding: '0 2.5rem' }}>

          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-josefin), system-ui, sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: D3.wheat, opacity: 0.5, textDecoration: 'none',
            marginBottom: '3rem',
          }} className="hero-eyebrow">
            <svg style={{ width: 10, height: 10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to the Hub
          </Link>

          <div className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
            <span style={{ display: 'block', height: '1px', width: '36px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: D3.terracotta }}>
              Private Investor Overview
            </span>
            <span style={{ display: 'block', height: '1px', width: '36px', background: D3.terracotta, flexShrink: 0 }} />
          </div>

          <h1 className="hero-title" style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 300,
            lineHeight: 1.08,
            color: D3.parchment,
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            A Resilient, Diversified<br />
            <em style={{ fontStyle: 'italic', color: D3.terracotta }}>Revenue Platform</em>
          </h1>

          {/* Wheat rule */}
          <div style={{ width: '64px', height: '1px', background: `linear-gradient(to right, transparent, ${D3.wheat}, transparent)`, margin: '0 auto 1.75rem' }} />

          <p className="hero-sub" style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '1rem',
            lineHeight: 1.85,
            color: D3.wheat,
            opacity: 0.75,
            maxWidth: '560px',
            margin: '0 auto 3rem',
            letterSpacing: '0.02em',
          }}>
            Conservative assumptions. Six qualifying grant categories. A clear path
            to $1,068,000 in 3-year cumulative EBITDA for Southern New Mexico&apos;s
            first food hall and craft cider bar.
          </p>

          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#inquiry" style={{
              display: 'inline-block',
              background: D3.terracotta,
              color: D3.parchment,
              padding: '16px 44px',
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              Request Investor Package
            </a>
            <a href="#opportunity" style={{
              display: 'inline-block',
              border: `1px solid rgba(232,193,141,0.3)`,
              color: D3.wheat,
              padding: '15px 44px',
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              View Opportunity
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll" style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          opacity: 0.35,
        }}>
          <span style={{ fontFamily: 'var(--font-josefin)', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: D3.wheat }}>Scroll</span>
          <div style={{ width: '1px', height: '48px', background: `linear-gradient(to bottom, ${D3.wheat}, transparent)` }} />
        </div>
      </div>

      {/* ── Metrics bar ──────────────────────────────────────────────────── */}
      <div ref={metricsRef} style={{ borderTop: `1px solid rgba(232,193,141,0.12)`, borderBottom: `1px solid rgba(232,193,141,0.12)`, background: D3.chestnut }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(232,193,141,0.08)' }}>
          {METRICS.map(({ id, raw, formatted, label, prefix, suffix }) => (
            <div key={id} style={{ background: D3.chestnut, padding: '2.75rem 1.5rem', textAlign: 'center' }}>
              <div
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.terracotta, marginBottom: '0.6rem', lineHeight: 1 }}
                data-metric-target={raw ?? undefined}
                data-metric-prefix={prefix}
                data-metric-suffix={suffix}
              >
                {formatted}
              </div>
              <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.55, lineHeight: 1.4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

          {/* ── Why Now ──────────────────────────────────────────────────── */}
          <div id="opportunity" ref={whyNowRef} style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>
                  Why This Opportunity
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.2 }}>
                Six Reasons the Timing Is Right
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
              {WHY_NOW.map(({ glyph, title, body }) => (
                <div key={title} className="why-now-card" style={{
                  background: D3.walnut,
                  padding: '2.5rem 2rem',
                  borderTop: `2px solid transparent`,
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderTopColor = D3.terracotta;
                    (e.currentTarget as HTMLDivElement).style.background = '#33291a';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderTopColor = 'transparent';
                    (e.currentTarget as HTMLDivElement).style.background = D3.walnut;
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.6rem', color: D3.terracotta, opacity: 0.5, display: 'block', marginBottom: '1.25rem', lineHeight: 1 }} aria-hidden="true">
                    {glyph}
                  </span>
                  <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.3rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.65 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Investment Tiers ─────────────────────────────────────────── */}
          <div style={{ paddingBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, marginBottom: '0.6rem' }}>
                Investment Tiers
              </h2>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.5 }}>
                All investment discussions are conducted privately. No online transactions.
              </p>
            </div>

            <div ref={tiersRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
              {TIERS.map((tier) => (
                <div key={tier.name} className="inv-tier-card" style={{
                  padding: '2.75rem 2.25rem',
                  background: tier.featured ? 'rgba(192,98,42,0.10)' : D3.walnut,
                  borderTop: tier.featured ? `2px solid ${D3.terracotta}` : '2px solid transparent',
                  position: 'relative',
                }}>
                  {tier.featured && (
                    <span style={{
                      display: 'inline-block',
                      border: `1px solid rgba(192,98,42,0.45)`,
                      padding: '4px 14px',
                      fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: D3.terracotta,
                      marginBottom: '1.25rem',
                    }}>
                      Most Inquired
                    </span>
                  )}
                  <span style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '1.75rem',
                    color: tier.featured ? D3.terracotta : `${D3.terracotta}80`,
                    display: 'block',
                    marginBottom: '1.25rem',
                    lineHeight: 1,
                  }} aria-hidden="true">
                    {tier.glyph}
                  </span>
                  <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.5rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.3rem', lineHeight: 1.2 }}>
                    {tier.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '1.5rem' }}>
                    {tier.range}
                  </div>
                  <div style={{ height: '1px', background: 'rgba(232,193,141,0.1)', marginBottom: '1.5rem' }} />
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {tier.perks.map((perk) => (
                      <li key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.7, lineHeight: 1.6 }}>
                        <span style={{ color: D3.sage, flexShrink: 0, marginTop: '0.15rem' }} aria-hidden="true">—</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── What You Receive ─────────────────────────────────────────── */}
          <div style={{
            border: `1px solid rgba(232,193,141,0.1)`,
            background: 'rgba(92,74,48,0.3)',
            padding: '2.75rem 3rem',
            marginBottom: '3rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>
                What You Receive After Inquiry
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[
                'Executive summary (2-page overview)',
                'Capital stack & use of funds breakdown',
                'Appendix F financial snapshot (Year 1–3)',
                'Grant eligibility & funding pipeline summary',
                'Milestone timeline & construction schedule',
                '48-hour response from the founding team',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: D3.sage, flexShrink: 0, fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', marginTop: '0.1rem' }} aria-hidden="true">—</span>
                  <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem', color: D3.wheat, opacity: 0.7, lineHeight: 1.65 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Disclosure ───────────────────────────────────────────────── */}
          <div style={{
            border: `1px solid rgba(232,193,141,0.08)`,
            background: 'rgba(92,74,48,0.2)',
            padding: '1.5rem 2rem',
            marginBottom: '4rem',
          }}>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.75rem', lineHeight: 1.85, color: D3.wheat, opacity: 0.45 }}>
              <strong style={{ color: D3.wheat, opacity: 0.65 }}>Financial Model Disclosure (May 2026):</strong>{' '}
              The Appendix F Cashflow Tool is the governing financial model — Year 1 Revenue $822,000 /
              EOY Cash $60,100. Projected IRR of 17–20% is illustrative and based on Appendix F base-case
              assumptions. Forward-looking projections are for informational purposes only and do not
              constitute an offer of securities. Prospective investors should review the full business plan
              and consult qualified advisors. Full financial package available upon request.
            </p>
          </div>

          {/* ── Inquiry Form ─────────────────────────────────────────────── */}
          {success ? (
            <SuccessScreen />
          ) : (
            <div id="inquiry" style={{ paddingBottom: '6rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <span style={{ display: 'block', height: '1px', width: '32px', background: `rgba(192,98,42,0.45)`, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: `${D3.terracotta}99` }}>
                    Investor Package
                  </span>
                  <span style={{ display: 'block', height: '1px', width: '32px', background: `rgba(192,98,42,0.45)`, flexShrink: 0 }} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 300, color: D3.parchment, marginBottom: '0.5rem' }}>
                  Request the Investor Package
                </h2>
                <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem', color: D3.wheat, opacity: 0.5 }}>
                  We respond to every inquiry within 48 hours.
                </p>
              </div>

              <div style={{
                maxWidth: '36rem',
                margin: '0 auto',
                border: `1px solid rgba(232,193,141,0.1)`,
                background: 'rgba(92,74,48,0.25)',
                padding: '3rem',
              }}>
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormField id="inv-name" label="Full Name" required>
                      <input id="inv-name" name="name" type="text" autoComplete="name" required
                        value={form.name} onChange={handleChange} disabled={submitting}
                        placeholder="Jane Smith"
                        style={inputStyle}
                        onFocus={e => (e.target as HTMLInputElement).style.borderColor = D3.terracotta}
                        onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(192,98,42,0.25)'}
                      />
                    </FormField>
                    <FormField id="inv-email" label="Email Address" required>
                      <input id="inv-email" name="email" type="email" autoComplete="email" required
                        value={form.email} onChange={handleChange} disabled={submitting}
                        placeholder="jane@example.com"
                        style={inputStyle}
                        onFocus={e => (e.target as HTMLInputElement).style.borderColor = D3.terracotta}
                        onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(192,98,42,0.25)'}
                      />
                    </FormField>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormField id="inv-org" label="Organization">
                      <input id="inv-org" name="organization" type="text" autoComplete="organization"
                        value={form.organization} onChange={handleChange} disabled={submitting}
                        placeholder="Firm or institution"
                        style={inputStyle}
                        onFocus={e => (e.target as HTMLInputElement).style.borderColor = D3.terracotta}
                        onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(192,98,42,0.25)'}
                      />
                    </FormField>
                    <FormField id="inv-range" label="Investment Range" required>
                      <div style={{ position: 'relative' }}>
                        <select id="inv-range" name="investment_range" required
                          value={form.investment_range} onChange={handleChange} disabled={submitting}
                          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                          {INVESTMENT_RANGES.map((opt) => (
                            <option key={opt.value} value={opt.value} disabled={!!opt.disabled} style={{ background: D3.chestnut }}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <svg style={{ pointerEvents: 'none', position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, color: `${D3.terracotta}80` }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </FormField>
                  </div>

                  <FormField id="inv-message" label="Message" required
                    hint="What would you like to know? We'll include the relevant sections of the investor package.">
                    <textarea id="inv-message" name="message" required rows={4}
                      value={form.message} onChange={handleChange} disabled={submitting}
                      placeholder="I'm interested in reviewing the full Appendix F model and capital stack…"
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = D3.terracotta}
                      onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(192,98,42,0.25)'}
                    />
                  </FormField>

                  {error && (
                    <div role="alert" aria-live="assertive" style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                      border: '1px solid rgba(248,113,113,0.3)',
                      background: 'rgba(248,113,113,0.08)',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem', color: '#f87171',
                    }}>
                      <AlertCircle />
                      <span><strong style={{ fontWeight: 600 }}>Submission failed — </strong>{error}</span>
                    </div>
                  )}

                  <button type="submit" disabled={submitting} style={{
                    display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                    background: submitting ? D3.chestnut : D3.terracotta,
                    color: D3.parchment,
                    padding: '16px 24px',
                    fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                    fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                    border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.6 : 1,
                    transition: 'background 0.25s, opacity 0.25s',
                  }}>
                    {submitting ? <><Spinner />Sending…</> : 'Request Investor Package →'}
                  </button>

                  <p style={{ textAlign: 'center', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.72rem', color: D3.wheat, opacity: 0.3 }}>
                    Your information is kept strictly private and will only be used to respond to your inquiry.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
