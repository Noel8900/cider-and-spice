'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitInvestorInquiry } from './actions';
import type { InvestorInquiryData, InvestorActionResult } from './actions';
import FormField from '@/components/ui/FormField';

gsap.registerPlugin(ScrollTrigger);

// ─── Direction 3 — Artisan Collective tokens ──────────────────────────────────
const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

// ─── JSON-LD schema (rendered via dangerouslySetInnerHTML — investors page stays client) ───
const INVESTOR_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.lccullinaryhub.com/investors',
      url: 'https://www.lccullinaryhub.com/investors',
      name: 'Investor Overview — Las Cruces Culinary Innovation Hub',
      description:
        'Private investor overview for the Las Cruces Culinary Innovation Hub. $1,505,000 total project capital, 6 qualifying grant categories, 17–20% illustrative 3-year IRR, and three structured investment tiers from $25K to $200K+.',
      inLanguage: 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.lccullinaryhub.com/#website',
        name: 'Las Cruces Culinary Innovation Hub',
        url: 'https://www.lccullinaryhub.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.lccullinaryhub.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Investor Overview',
          item: 'https://www.lccullinaryhub.com/investors',
        },
      ],
    },
  ],
};

// ─── Static data ──────────────────────────────────────────────────────────────

const METRICS = [
  { id: 'capital',   raw: null,    formatted: '$1.5M',       label: 'Total Project Capital',       prefix: '$', suffix: '' },
  { id: 'revenue',   raw: 822,     formatted: '$822K',       label: 'Year 1 Revenue (Appendix F)', prefix: '$', suffix: 'K' },
  { id: 'breakeven', raw: null,    formatted: '18–20 mo',    label: 'Cash Flow Breakeven',         prefix: '',  suffix: '' },
  { id: 'irr',       raw: null,    formatted: '17–20%',      label: 'Illustrative 3-Year IRR',     prefix: '',  suffix: '' },
] as const;

const ENDORSEMENTS = [
  'Elevate Las Cruces',
  'Visit Las Cruces',
  'NM MainStreet',
  'East Lohman Dev. Plan',
  'W. Picacho MRA',
];

const WHY_NOW = [
  { glyph: '◆', title: 'Zero Direct Competitors',       body: 'There is no food hall within 200 miles of Las Cruces. Cider & Spice is a first-mover in a 215,000-person metro with a rapidly expanding food tourism scene.' },
  { glyph: '◈', title: '6 Grant Categories',            body: 'The Hub is structured to qualify for CDBG, NM MainStreet, USDA RBDG, EDA, SBA 7(a), and Opportunity Zone funding — reducing investor risk and extending runway.' },
  { glyph: '◉', title: 'Multiple Revenue Streams',      body: 'Stall rents, commissary kitchen fees, cider bar revenue, event rentals, and market vendor fees provide diversified cash flow — not single-tenant dependency.' },
  { glyph: '◇', title: 'Incubator Mission = Tax Edge',  body: 'As a culinary incubator, the Hub aligns with NMEDA and federal programs that provide meaningful tax credit eligibility for qualifying investors.' },
  { glyph: '✦', title: 'City & State Alignment',        body: "Endorsed by Elevate Las Cruces, Visit Las Cruces, and aligned with the city\'s East Lohman Development Plan and W. Picacho MRA redevelopment initiative." },
  { glyph: '◇', title: 'Conservative Underwriting',     body: 'The Appendix F model uses conservative Year 1 projections. Breakeven at month 18–20. The 17–20% IRR is illustrative based on base-case assumptions.' },
];

interface InvestorTier { name: string; range: string; glyph: string; featured?: boolean; perks: string[]; }

const TIERS: InvestorTier[] = [
  {
    name: 'Community Investor', range: '$25K – $74,999', glyph: '◇',
    perks: ['Investor newsletter & quarterly updates', 'Named recognition in Hub materials', 'Early access to Cider Club founding membership', '3-year Appendix F projection summary'],
  },
  {
    name: 'Growth Partner', range: '$75K – $199,999', glyph: '◈', featured: true,
    perks: ['All Community Investor perks', 'Invitation to quarterly investor briefings', 'Priority commissary kitchen bookings', 'Hub Advisory Board observer seat', 'Full Appendix F Cashflow Model access'],
  },
  {
    name: 'Founding Investor', range: '$200K+', glyph: '◆',
    perks: ['All Growth Partner perks', 'Named feature in Hub signage & website', 'Annual private cider pairing dinner', 'Equity participation discussion eligible', 'Co-investment in graduating vendors (5–15%)'],
  },
];

const TIMELINE = [
  { label: 'Q3 2025', event: 'SBA 7(a) Pre-Qualification', done: true  },
  { label: 'Q4 2025', event: 'Capital Close & Permit Filing', done: true  },
  { label: 'Q1 2026', event: 'Construction Start',           done: false },
  { label: 'Q3 2026', event: 'Soft Open — Anchor Vendors',   done: false },
  { label: 'Q4 2026', event: 'Full Operations + Cider Bar',  done: false },
  { label: 'Mo. 18–20', event: 'Cash Flow Breakeven',        done: false },
];

const FAQS = [
  { q: 'What is the minimum investment?',         a: 'The minimum check size is $25,000. Investment discussions are conducted privately — there are no online transactions.' },
  { q: 'What structure are investments made in?', a: 'The Hub is structured to support multiple vehicles including direct equity, convertible notes, and grant co-investment. Structure is discussed individually with each investor.' },
  { q: 'When is the expected cash flow breakeven?', a: 'The Appendix F base-case model projects cash flow breakeven between months 18 and 20 of operations, with a 17–20% illustrative 3-year IRR.' },
  { q: 'Can I review the full financial model?',  a: 'Yes. The complete Appendix F Cashflow Model is shared after your initial inquiry is reviewed. Submit a request below and we will respond within 48 hours.' },
];

const INVESTMENT_RANGES = [
  { value: '',              label: 'Select a range…',       disabled: true },
  { value: '$25K–$74,999', label: '$25,000 – $74,999'                     },
  { value: '$75K–$199,999',label: '$75,000 – $199,999'                    },
  { value: '$200K+',       label: '$200,000+'                              },
  { value: 'grant',        label: 'Grant / Non-dilutive Funder'            },
  { value: 'other',        label: 'Other / Not yet determined'             },
];

const EMPTY: InvestorInquiryData = { name: '', email: '', organization: '', investment_range: '', message: '' };

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%', background: '#3a2e1e', border: '1px solid rgba(192,98,42,0.25)',
  borderRadius: '2px', padding: '12px 16px', color: D3.parchment,
  fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem',
  outline: 'none', transition: 'border-color 0.2s',
};

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function SuccessScreen() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '28rem', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '3.5rem', color: D3.terracotta, display: 'block', marginBottom: '2rem' }} aria-hidden="true">◈</span>
        <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: D3.parchment, marginBottom: '1rem', lineHeight: 1.15 }}>Inquiry Received</h2>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.8, marginBottom: '0.75rem' }}>Thank you for your interest in the Las Cruces Culinary Innovation Hub.</p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.8, marginBottom: '2.5rem' }}>We will follow up within <strong style={{ color: D3.parchment }}>48 hours</strong> with the executive summary, capital stack overview, and Appendix F snapshot.</p>
        <Link href="/" style={{ display: 'inline-block', background: D3.terracotta, color: D3.parchment, padding: '14px 40px', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none' }}>Back to Home</Link>
      </div>
    </div>
  );
}

function InvestorNav({ scrolled }: { scrolled: boolean }) {
  const NAV_SECTIONS = [
    { label: 'Overview',   href: '#opportunity' },
    { label: 'Tiers',      href: '#tiers'       },
    { label: 'Timeline',   href: '#timeline'    },
    { label: 'Package',    href: '#inquiry'     },
  ];
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: scrolled ? '14px 48px' : '22px 48px',
      background: scrolled ? 'rgba(44,36,22,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(232,193,141,0.1)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.35rem', fontWeight: 400, color: D3.parchment, letterSpacing: '0.04em' }}>Cider <em style={{ fontStyle: 'italic', color: D3.terracotta }}>&</em> Spice</span>
        <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.5, marginTop: '2px' }}>Las Cruces · Investor Overview</span>
      </Link>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {NAV_SECTIONS.map(({ label, href }) => (
          <a key={label} href={href} style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.6, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}>
            {label}
          </a>
        ))}
        <a href="#inquiry" style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.terracotta, border: `1px solid rgba(192,98,42,0.5)`, padding: '8px 20px', textDecoration: 'none', transition: 'all 0.25s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = D3.terracotta; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = D3.terracotta; }}>
          Request Package
        </a>
      </nav>
    </header>
  );
}

function InvestorFooter() {
  return (
    <footer style={{ background: '#1e1710', borderTop: `1px solid rgba(232,193,141,0.1)`, padding: '3.5rem 3rem 2.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.5rem', color: D3.parchment, marginBottom: '0.5rem' }}>Cider <em style={{ fontStyle: 'italic', color: D3.terracotta }}>&</em> Spice</div>
            <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.45, marginBottom: '1rem' }}>Las Cruces Food Hall · Culinary Collective</div>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.8rem', color: D3.wheat, opacity: 0.45, lineHeight: 1.7 }}>Southern New Mexico\'s first culinary incubator and food hall. Opening 2026.</p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '1.25rem' }}>Investor Contact</div>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.82rem', color: D3.wheat, opacity: 0.55, lineHeight: 1.7, marginBottom: '0.75rem' }}>Inquiries reviewed within 48 hours. Full financial package shared upon qualification.</p>
            <a href="#inquiry" style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.terracotta, textDecoration: 'none' }}>Request Package →</a>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '1.25rem' }}>Aligned With</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Elevate Las Cruces', 'Visit Las Cruces', 'NM MainStreet', 'East Lohman Dev. Plan', 'Opportunity Zone Program'].map(org => (
                <span key={org} style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.8rem', color: D3.wheat, opacity: 0.45 }}>{org}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(232,193,141,0.08)`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.3 }}>© 2026 Cider & Spice LLC · Las Cruces, New Mexico</p>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.7rem', color: D3.wheat, opacity: 0.25, maxWidth: '480px', lineHeight: 1.6, textAlign: 'right' }}>Forward-looking projections are for informational purposes only and do not constitute an offer of securities.</p>
        </div>
      </div>
    </footer>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid rgba(232,193,141,0.1)` }}>
      <button onClick={() => setOpen(v => !v)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.4rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.15rem', fontWeight: 400, color: D3.parchment, lineHeight: 1.3 }}>{q}</span>
        <span style={{ color: D3.terracotta, fontSize: '1.25rem', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: '1.4rem' }}>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem', color: D3.wheat, opacity: 0.65, lineHeight: 1.85 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function InvestorsPage() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const tiersRef   = useRef<HTMLDivElement>(null);
  const whyNowRef  = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled]         = useState(false);
  const [form, setForm]                 = useState<InvestorInquiryData>(EMPTY);
  const [submitting, setSubmitting]     = useState(false);
  const [success, setSuccess]           = useState(false);
  const [error, setError]               = useState<string | null>(null);

  // Inject JSON-LD on mount (client-side, since this page is 'use client')
  useEffect(() => {
    const existing = document.getElementById('investor-jsonld');
    if (existing) return;
    const script = document.createElement('script');
    script.id = 'investor-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(INVESTOR_SCHEMA);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-metric-target]');
    const triggers: ScrollTrigger[] = [];
    els.forEach((el) => {
      const target = Number(el.dataset.metricTarget);
      const prefix = el.dataset.metricPrefix ?? '';
      const suffix = el.dataset.metricSuffix ?? '';
      if (!target) return;
      const obj = { val: 0 };
      const st = ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true,
        onEnter: () => gsap.to(obj, { val: target, duration: 2.2, ease: 'power2.out',
          onUpdate() { el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix; } }),
      });
      triggers.push(st);
    });
    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.inv-tier-card', { opacity: 0, y: 32, duration: 1.0, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: tiersRef.current, start: 'top 78%', once: true } });
      gsap.from('.why-now-card',  { opacity: 0, y: 26, duration: 0.9, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: whyNowRef.current, start: 'top 78%', once: true } });
    }, tiersRef);
    return () => ctx.revert();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true); setError(null);
    const result: InvestorActionResult = await submitInvestorInquiry(form);
    if (result.ok) { setSuccess(true); }
    else { setError(result.message); setSubmitting(false); }
  }

  function SectionHeader({ num, eyebrow, title }: { num: string; eyebrow: string; title: string }) {
    return (
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        <span style={{ position: 'absolute', top: '-1.5rem', left: '-0.5rem', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(5rem, 10vw, 8rem)', fontWeight: 700, color: 'rgba(232,193,141,0.05)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }} aria-hidden="true">{num}</span>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>{eyebrow}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.2 }}>{title}</h2>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ background: D3.walnut, minHeight: '100vh' }}>
        <InvestorNav scrolled={false} />
        <SuccessScreen />
        <InvestorFooter />
      </div>
    );
  }

  return (
    <div style={{ background: D3.walnut, minHeight: '100vh' }}>
      <InvestorNav scrolled={scrolled} />
      <main>
        {/* Hero, metrics, why-now, tiers, timeline, FAQs, inquiry form, footer */}
        {/* ── Hero ── */}
        <div ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden', background: `radial-gradient(ellipse 90% 70% at 50% 40%, rgba(192,98,42,0.13) 0%, transparent 70%), ${D3.walnut}` }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(232,193,141,1) 25%, rgba(232,193,141,1) 26%, transparent 27%), linear-gradient(90deg, transparent 24%, rgba(232,193,141,1) 25%, rgba(232,193,141,1) 26%, transparent 27%)', backgroundSize: '60px 60px' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${D3.walnut} 100%)` }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px', padding: '0 2.5rem' }}>
            <div className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <span style={{ display: 'block', height: '1px', width: '36px', background: D3.terracotta, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: D3.terracotta }}>Private Investor Overview</span>
              <span style={{ display: 'block', height: '1px', width: '36px', background: D3.terracotta, flexShrink: 0 }} />
            </div>
            <h1 className="hero-title" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 300, lineHeight: 1.08, color: D3.parchment, marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
              A Resilient, Diversified<br />
              <em style={{ fontStyle: 'italic', color: D3.terracotta }}>Revenue Platform</em>
            </h1>
            <div style={{ width: '64px', height: '1px', background: `linear-gradient(to right, transparent, ${D3.wheat}, transparent)`, margin: '0 auto 1.75rem' }} />
            <p className="hero-sub" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1rem', lineHeight: 1.85, color: D3.wheat, opacity: 0.75, maxWidth: '560px', margin: '0 auto 3rem', letterSpacing: '0.02em' }}>
              Conservative assumptions. Six qualifying grant categories. A clear path to $1.07M in 3-year cumulative EBITDA for Southern New Mexico&apos;s first food hall and craft cider bar.
            </p>
            <div className="hero-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#inquiry" style={{ display: 'inline-block', background: D3.terracotta, color: D3.parchment, padding: '16px 44px', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none' }}>Request Investor Package</a>
              <a href="#opportunity" style={{ display: 'inline-block', border: `1px solid rgba(232,193,141,0.3)`, color: D3.wheat, padding: '15px 44px', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none' }}>View Opportunity</a>
            </div>
          </div>
          <div className="hero-scroll" style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.35 }}>
            <span style={{ fontFamily: 'var(--font-josefin)', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: D3.wheat }}>Scroll</span>
            <div style={{ width: '1px', height: '48px', background: `linear-gradient(to bottom, ${D3.wheat}, transparent)` }} />
          </div>
        </div>

        {/* ── Endorsement strip ── */}
        <div style={{ background: D3.chestnut, borderTop: `1px solid rgba(232,193,141,0.08)`, borderBottom: `1px solid rgba(232,193,141,0.08)`, padding: '1rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem 2.5rem' }}>
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.35, flexShrink: 0 }}>Endorsed By</span>
            {ENDORSEMENTS.map((org, i) => (
              <span key={org} style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.55 }}>{org}</span>
                {i < ENDORSEMENTS.length - 1 && <span style={{ color: D3.terracotta, opacity: 0.4, fontSize: '0.5rem' }}>✦</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ── Metrics bar ── */}
        <div ref={metricsRef} style={{ borderBottom: `1px solid rgba(232,193,141,0.12)`, background: '#231c10' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(232,193,141,0.08)' }} className="sm:grid-cols-4">
            {METRICS.map(({ id, raw, formatted, label, prefix, suffix }) => (
              <div key={id} style={{ background: '#231c10', padding: '2.75rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.terracotta, marginBottom: '0.6rem', lineHeight: 1 }}
                  data-metric-target={raw ?? undefined} data-metric-prefix={prefix} data-metric-suffix={suffix}>
                  {formatted}
                </div>
                <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.5, lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

            {/* ── Why Now ── */}
            <div id="opportunity" ref={whyNowRef} style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
              <SectionHeader num="01" eyebrow="Why This Opportunity" title="Six Reasons the Timing Is Right" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
                {WHY_NOW.map(({ glyph, title, body }) => (
                  <div key={title} className="why-now-card" style={{ background: D3.walnut, padding: '2.5rem 2rem', borderTop: '2px solid transparent', transition: 'border-color 0.3s, background 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderTopColor = D3.terracotta; (e.currentTarget as HTMLDivElement).style.background = '#33291a'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderTopColor = 'transparent'; (e.currentTarget as HTMLDivElement).style.background = D3.walnut; }}>
                    <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.6rem', color: D3.terracotta, opacity: 0.5, display: 'block', marginBottom: '1.25rem', lineHeight: 1 }} aria-hidden="true">{glyph}</span>
                    <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.3rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.75rem', lineHeight: 1.3 }}>{title}</div>
                    <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.65 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Pull Quote ── */}
            <div style={{ padding: '2rem 0 5rem', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '1px', background: D3.terracotta, margin: '0 auto 2rem', opacity: 0.5 }} />
              <blockquote style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontStyle: 'italic', fontWeight: 300, color: D3.wheat, lineHeight: 1.45, maxWidth: '680px', margin: '0 auto', opacity: 0.85 }}>
                &ldquo;The food here comes from people who&apos;ve been waiting for a place like this — and so have you.&rdquo;
              </blockquote>
              <div style={{ width: '40px', height: '1px', background: D3.terracotta, margin: '2rem auto 0', opacity: 0.5 }} />
            </div>

            {/* ── Investment Tiers ── */}
            <div id="tiers" style={{ paddingBottom: '5rem' }}>
              <SectionHeader num="02" eyebrow="Participation" title="Investment Tiers" />
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.45, marginBottom: '2.5rem' }}>All investment discussions are conducted privately. No online transactions.</p>
              <div ref={tiersRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
                {TIERS.map((tier) => (
                  <div key={tier.name} className="inv-tier-card" style={{ padding: '2.75rem 2.25rem', background: tier.featured ? 'rgba(192,98,42,0.10)' : D3.walnut, borderTop: tier.featured ? `2px solid ${D3.terracotta}` : '2px solid transparent', position: 'relative' }}>
                    {tier.featured && (
                      <span style={{ display: 'inline-block', border: `1px solid rgba(192,98,42,0.45)`, padding: '4px 14px', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '1.25rem' }}>Most Inquired</span>
                    )}
                    <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.75rem', color: tier.featured ? D3.terracotta : `${D3.terracotta}80`, display: 'block', marginBottom: '1.25rem', lineHeight: 1 }} aria-hidden="true">{tier.glyph}</span>
                    <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.5rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.35rem', lineHeight: 1.2 }}>{tier.name}</div>
                    <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', color: D3.terracotta, marginBottom: '1.5rem' }}>{tier.range}</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {tier.perks.map(perk => (
                        <li key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.83rem', color: `${D3.wheat}75`, lineHeight: 1.6 }}>
                          <span style={{ color: D3.terracotta, flexShrink: 0, marginTop: '2px', fontSize: '0.7rem' }} aria-hidden="true">◈</span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <a href="#inquiry" style={{ display: 'inline-block', marginTop: '2rem', border: `1px solid rgba(192,98,42,${tier.featured ? '0.6' : '0.3'})`, padding: '10px 24px', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: tier.featured ? D3.terracotta : `${D3.terracotta}90`, textDecoration: 'none', transition: 'all 0.25s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = D3.terracotta; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = tier.featured ? D3.terracotta : `${D3.terracotta}90`; }}>
                      Request Info
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Timeline ── */}
            <div id="timeline" style={{ paddingBottom: '5rem' }}>
              <SectionHeader num="03" eyebrow="Milestones" title="Project Timeline" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
                {TIMELINE.map(({ label, event, done }) => (
                  <div key={label} style={{ padding: '2rem 1.5rem', background: D3.walnut, borderTop: done ? `2px solid ${D3.terracotta}` : '2px solid rgba(232,193,141,0.15)', opacity: done ? 1 : 0.65 }}>
                    <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: done ? D3.terracotta : `${D3.wheat}50`, marginBottom: '0.75rem' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', fontWeight: 400, color: done ? D3.parchment : `${D3.wheat}70`, lineHeight: 1.3 }}>{event}</div>
                    {done && <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.terracotta, opacity: 0.7 }}>Complete ✓</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* ── FAQs ── */}
            <div style={{ paddingBottom: '5rem', maxWidth: '680px' }}>
              <SectionHeader num="04" eyebrow="Due Diligence" title="Frequently Asked Questions" />
              {FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>

            {/* ── Inquiry form ── */}
            <div id="inquiry" style={{ paddingBottom: '6rem' }}>
              <SectionHeader num="05" eyebrow="Get Started" title="Request the Investor Package" />
              <div style={{ maxWidth: '600px' }}>
                <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', lineHeight: 1.8, color: `${D3.wheat}70`, marginBottom: '2.5rem' }}>
                  Submit your details below. We will follow up within 48 hours with the executive summary, capital stack overview, and Appendix F snapshot.
                </p>
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <FormField id="inv-name" label="Full Name" required>
                      <input id="inv-name" name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange} disabled={submitting} placeholder="Jane Smith" style={inputStyle} />
                    </FormField>
                    <FormField id="inv-email" label="Email Address" required>
                      <input id="inv-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} disabled={submitting} placeholder="jane@example.com" style={inputStyle} />
                    </FormField>
                  </div>
                  <FormField id="inv-org" label="Organization / Fund" hint="Optional">
                    <input id="inv-org" name="organization" type="text" value={form.organization} onChange={handleChange} disabled={submitting} placeholder="Acme Capital" style={inputStyle} />
                  </FormField>
                  <FormField id="inv-range" label="Potential Investment Range" required>
                    <select id="inv-range" name="investment_range" required value={form.investment_range} onChange={handleChange} disabled={submitting} style={{ ...inputStyle, appearance: 'none' }}>
                      {INVESTMENT_RANGES.map(({ value, label, disabled }) => (
                        <option key={value} value={value} disabled={disabled}>{label}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField id="inv-msg" label="Message" hint="Optional — questions, timeline, or context">
                    <textarea id="inv-msg" name="message" rows={4} value={form.message} onChange={handleChange} disabled={submitting} placeholder="I\'m interested in…" style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} />
                  </FormField>
                  {error && (
                    <div role="alert" style={{ display: 'flex', gap: '0.75rem', padding: '0.875rem 1rem', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', borderRadius: '2px' }}>
                      <span style={{ color: '#f87171', fontFamily: 'var(--font-inter)', fontSize: '0.875rem' }}>{error}</span>
                    </div>
                  )}
                  <button type="submit" disabled={submitting} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: D3.terracotta, color: D3.parchment, border: 'none', padding: '16px 44px', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                    {submitting ? <><Spinner /> Submitting…</> : 'Request Investor Package'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <InvestorFooter />
    </div>
  );
}
