'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitInvestorInquiry } from './actions';
import type { InvestorInquiryData, InvestorActionResult } from './actions';
import FormField from '@/components/ui/FormField';
import { darkInput } from '@/components/ui/FormField';

gsap.registerPlugin(ScrollTrigger);

// ─── Static data ──────────────────────────────────────────────────────────────

const METRICS = [
  { id: 'capital',   raw: 1505000, formatted: '$1,505,000', label: 'Total Project Capital',        prefix: '$', suffix: '' },
  { id: 'revenue',   raw: 822,     formatted: '$822K',       label: 'Year 1 Revenue (Appendix F)',  prefix: '$', suffix: 'K' },
  { id: 'breakeven', raw: null,    formatted: '18–20 mo',    label: 'Cash Flow Breakeven',          prefix: '', suffix: '' },
  { id: 'irr',       raw: null,    formatted: '17–20%',      label: 'Illustrative 3-Year IRR',      prefix: '', suffix: '' },
] as const;

// ─── Why Now proof points ─────────────────────────────────────────────────────

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
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <span className="font-corp-display text-5xl text-gold block mb-8" aria-hidden="true">◈</span>
        <h2 className="font-corp-display text-4xl font-light text-cream mb-4">
          Inquiry Received
        </h2>
        <p className="font-sans text-base leading-relaxed text-cream/60 mb-3">
          Thank you for your interest in the Las Cruces Culinary Innovation Hub.
        </p>
        <p className="font-sans text-base leading-relaxed text-cream/60 mb-10">
          We will review your inquiry and follow up at the email you provided
          within <strong className="text-cream">48 hours</strong>.
          You will receive the executive summary, capital stack overview, and
          Appendix F financial snapshot.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/"
            className="bg-ember hover:bg-ember-hover px-8 py-4 font-label text-[10px]
                       tracking-[0.25em] uppercase text-white transition-colors">
            Back to Home
          </Link>
          <Link href="/cider-club"
            className="border border-cream/20 hover:border-gold/50 px-8 py-4 font-label
                       text-[10px] tracking-[0.25em] uppercase text-cream/60 hover:text-gold
                       transition-all duration-300">
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
  const [form, setForm]             = useState<InvestorInquiryData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  // GSAP count-up on numeric metrics
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-metric-target]');
    const triggers: ScrollTrigger[] = [];

    els.forEach((el) => {
      const target = Number(el.dataset.metricTarget);
      const prefix = el.dataset.metricPrefix ?? '';
      const suffix = el.dataset.metricSuffix ?? '';
      const decimals = el.dataset.metricDecimals === '1' ? 1 : 0;
      if (!target) return;

      const obj = { val: 0 };
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate() {
              el.textContent = prefix + (decimals ? obj.val.toFixed(decimals) : Math.round(obj.val).toLocaleString()) + suffix;
            },
          });
        },
      });
      triggers.push(st);
    });

    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  // GSAP stagger on tier cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.inv-tier-card', {
        opacity: 0, y: 28, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: tiersRef.current, start: 'top 78%', once: true },
      });
      gsap.from('.why-now-card', {
        opacity: 0, y: 24, duration: 0.8, stagger: 0.08, ease: 'power3.out',
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
    <main className="min-h-screen bg-bg">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="px-6 pb-20 pt-28">
        <div className="mx-auto max-w-4xl">
          <Link href="/"
            className="mb-10 inline-flex items-center gap-2 font-label text-[9px]
                       tracking-[0.2em] uppercase text-cream/40 hover:text-gold
                       transition-colors duration-300">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to the Hub
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block h-px w-8 bg-gold shrink-0" />
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
                Investor Overview
              </span>
              <span className="block h-px w-8 bg-gold shrink-0" />
            </div>
            <h1 className="font-corp-display text-5xl sm:text-6xl md:text-7xl font-light
                            leading-[0.92] tracking-tight text-cream mb-6">
              A Resilient, Diversified<br />
              <em className="not-italic text-gold">Revenue Platform</em>
            </h1>
            <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-cream/55">
              Conservative assumptions. Six qualifying grant categories. A clear path
              to $1,068,000 in 3-year cumulative EBITDA for Southern New Mexico&apos;s
              first food hall and craft cider bar.
            </p>
          </div>
        </div>
      </div>

      {/* ── Metrics bar ──────────────────────────────────────────────────── */}
      <div ref={metricsRef} className="border-y border-cream/[0.07]">
        <div className="grid grid-cols-2 gap-px bg-cream/[0.06] md:grid-cols-4">
          {METRICS.map(({ id, raw, formatted, label, prefix, suffix }) => (
            <div key={id} className="bg-bg px-6 py-10 text-center">
              <div
                className="font-corp-display text-4xl md:text-5xl font-light text-gold mb-2"
                data-metric-target={raw ?? undefined}
                data-metric-prefix={prefix}
                data-metric-suffix={suffix}
              >
                {formatted}
              </div>
              <div className="font-label text-[9px] tracking-[0.3em] uppercase text-cream/40 leading-snug">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-20">

          {/* ── Why Now ──────────────────────────────────────────────────── */}
          <div ref={whyNowRef}>
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-3">
                <span className="block h-px w-8 bg-gold shrink-0" />
                <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
                  Why This Opportunity
                </span>
              </div>
              <h2 className="font-corp-display text-4xl font-light text-cream">
                Six Reasons the Timing Is Right
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/[0.06]">
              {WHY_NOW.map(({ glyph, title, body }) => (
                <div key={title}
                  className="why-now-card group bg-bg p-8 hover:bg-white/[0.04] transition-colors duration-300">
                  <span className="font-corp-display text-2xl text-gold/50 group-hover:text-gold
                                   transition-colors duration-300 block mb-5" aria-hidden="true">
                    {glyph}
                  </span>
                  <div className="font-corp-display text-xl font-light text-cream mb-3 leading-snug">
                    {title}
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-cream/50">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Investment tiers ─────────────────────────────────────────── */}
          <div>
            <div className="text-center mb-12">
              <h2 className="font-corp-display text-4xl font-light text-cream mb-2">
                Investment Tiers
              </h2>
              <p className="font-sans text-sm text-cream/45">
                All investment discussions are conducted privately. No online transactions.
              </p>
            </div>

            <div ref={tiersRef} className="grid grid-cols-1 gap-px bg-cream/[0.06] md:grid-cols-3">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`inv-tier-card p-8 transition-colors duration-300
                    ${tier.featured ? 'bg-ember/[0.07]' : 'bg-bg'}`}
                >
                  {tier.featured && (
                    <span className="inline-block border border-gold/40 px-3 py-1 font-label
                                     text-[9px] tracking-[0.2em] uppercase text-gold mb-4">
                      Most Inquired
                    </span>
                  )}
                  <span className={`font-corp-display text-2xl mb-5 block leading-none
                    ${tier.featured ? 'text-ember' : 'text-gold/50'}`}
                    aria-hidden="true">
                    {tier.glyph}
                  </span>
                  <div className="font-corp-display text-2xl font-light text-cream mb-1">
                    {tier.name}
                  </div>
                  <div className="font-label text-[9px] tracking-[0.2em] uppercase text-gold mb-5">
                    {tier.range}
                  </div>
                  <div className="h-px bg-cream/[0.07] mb-5" />
                  <ul className="space-y-2.5">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 font-sans text-sm text-cream/60">
                        <span className="mt-0.5 text-gold/60 shrink-0" aria-hidden="true">—</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── What You Receive ─────────────────────────────────────────── */}
          <div className="border border-cream/[0.08] bg-white/[0.02] p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-8 bg-gold shrink-0" />
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
                What You Receive After Inquiry
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Executive summary (2-page overview)',
                'Capital stack & use of funds breakdown',
                'Appendix F financial snapshot (Year 1–3)',
                'Grant eligibility & funding pipeline summary',
                'Milestone timeline & construction schedule',
                '48-hour response from the founding team',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 text-gold/60 shrink-0 font-corp-display text-base" aria-hidden="true">—</span>
                  <span className="font-sans text-sm text-cream/60">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Disclosure note ──────────────────────────────────────────── */}
          <div className="border border-cream/[0.08] bg-white/[0.02] p-6">
            <p className="font-sans text-xs leading-relaxed text-cream/40">
              <strong className="text-cream/60">Financial Model Disclosure (May 2026):</strong>{' '}
              The Appendix F Cashflow Tool is the governing financial model — Year 1 Revenue $822,000 /
              EOY Cash $60,100. Projected IRR of 17–20% is illustrative and based on Appendix F base-case
              assumptions. Forward-looking projections are for informational purposes only and do not
              constitute an offer of securities. Prospective investors should review the full business plan
              and consult qualified advisors. Full financial package available upon request.
            </p>
          </div>

          {/* ── Inquiry form ─────────────────────────────────────────────── */}
          {success ? (
            <SuccessScreen />
          ) : (
            <div>
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="block h-px w-8 bg-gold/40 shrink-0" />
                  <span className="font-label text-[9px] tracking-[0.3em] uppercase text-gold/60">
                    Investor Package
                  </span>
                  <span className="block h-px w-8 bg-gold/40 shrink-0" />
                </div>
                <h2 className="font-corp-display text-4xl font-light text-cream mb-2">
                  Request the Investor Package
                </h2>
                <p className="font-sans text-sm text-cream/45">
                  We respond to every inquiry within 48 hours.
                </p>
              </div>

              <div className="mx-auto max-w-xl border border-cream/[0.08] bg-white/[0.02] p-10">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField id="inv-name" label="Full Name" required>
                      <input id="inv-name" name="name" type="text" autoComplete="name" required
                        value={form.name} onChange={handleChange} disabled={submitting}
                        placeholder="Jane Smith" className={darkInput} />
                    </FormField>
                    <FormField id="inv-email" label="Email Address" required>
                      <input id="inv-email" name="email" type="email" autoComplete="email" required
                        value={form.email} onChange={handleChange} disabled={submitting}
                        placeholder="jane@example.com" className={darkInput} />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField id="inv-org" label="Organization">
                      <input id="inv-org" name="organization" type="text" autoComplete="organization"
                        value={form.organization} onChange={handleChange} disabled={submitting}
                        placeholder="Firm or institution" className={darkInput} />
                    </FormField>
                    <FormField id="inv-range" label="Investment Range" required>
                      <div className="relative">
                        <select id="inv-range" name="investment_range" required
                          value={form.investment_range} onChange={handleChange} disabled={submitting}
                          className={`${darkInput} appearance-none cursor-pointer bg-bg`}>
                          {INVESTMENT_RANGES.map((opt) => (
                            <option key={opt.value} value={opt.value} disabled={!!opt.disabled} className="bg-bg">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 text-gold/50"
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
                      className={`${darkInput} resize-y`} />
                  </FormField>

                  {error && (
                    <div role="alert" aria-live="assertive"
                      className="flex items-start gap-3 border border-red-500/30
                                 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      <AlertCircle />
                      <span>
                        <strong className="font-semibold">Submission failed — </strong>
                        {error}
                      </span>
                    </div>
                  )}

                  <button type="submit" disabled={submitting}
                    className="flex w-full items-center justify-center gap-2.5 bg-ember hover:bg-ember-hover
                               px-6 py-4 font-label text-[10px] tracking-[0.25em] uppercase text-white
                               transition-colors disabled:cursor-not-allowed disabled:opacity-60">
                    {submitting ? <><Spinner />Sending…</> : 'Request Investor Package →'}
                  </button>

                  <p className="text-center font-sans text-xs text-cream/30">
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
