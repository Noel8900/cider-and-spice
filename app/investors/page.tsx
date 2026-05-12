'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitInvestorInquiry } from './actions';
import type { InvestorInquiryData, InvestorActionResult } from './actions';
import GlassCard from '@/components/ui/GlassCard';
import FormField from '@/components/ui/FormField';
import { darkInput } from '@/components/ui/FormField';

// ─── Static data ──────────────────────────────────────────────────────────────

const METRICS = [
  { value: '$1,505,000', label: 'Total Project Capital' },
  { value: '$822K',      label: 'Year 1 Revenue (Appendix F)' },
  { value: '18–20 mo',  label: 'Cash Flow Breakeven' },
  { value: '17–20%',    label: 'Illustrative 3-Year IRR' },
] as const;

interface InvestorTier {
  name:      string;
  range:     string;
  featured?: boolean;
  perks:     string[];
}

const TIERS: InvestorTier[] = [
  {
    name:  'Community Investor',
    range: '$25K – $74,999',
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

function BackArrow() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

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

function CheckIcon() {
  return (
    <svg className="h-12 w-12 text-[#C4622D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#C4622D]/30 bg-[#C4622D]/10">
          <CheckIcon />
        </div>
        <h2 className="mb-4 font-serif text-3xl font-bold text-[#F5ECD7]">
          Inquiry Received!
        </h2>
        <p className="mb-3 font-sans text-base leading-relaxed text-[#F5ECD7]" style={{ opacity: 0.70 }}>
          Thank you for your interest in the Las Cruces Culinary Innovation Hub.
        </p>
        <p className="mb-10 font-sans text-base leading-relaxed text-[#F5ECD7]" style={{ opacity: 0.70 }}>
          We will review your inquiry and follow up at the email you provided
          within <strong className="text-[#F5ECD7]">48 hours</strong>.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-[#C4622D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a8521f]"
          >
            Back to Home
          </Link>
          <Link
            href="/cider-club"
            className="rounded-xl border border-[#F5ECD7]/20 px-6 py-3 text-sm font-semibold text-[#F5ECD7] transition-colors hover:border-[#C4622D]/40 hover:text-[#C4622D]"
            style={{ opacity: 0.80 }}
          >
            Explore Cider Club →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvestorsPage() {
  const [form, setForm]           = useState<InvestorInquiryData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
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
    <main className="min-h-screen bg-[#1C1209]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="px-6 pb-20 pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#C4622D] transition-opacity hover:opacity-70"
          >
            <BackArrow />
            Back to the Hub
          </Link>

          <div className="text-center">
            <span className="mb-4 inline-block rounded-full border border-[#C4622D]/40 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-[#C4622D]">
              Investor Overview
            </span>
            <h1 className="mb-5 font-serif text-5xl font-bold leading-tight text-[#F5ECD7] md:text-6xl">
              A Resilient, Diversified<br />Revenue Platform
            </h1>
            <p
              className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-[#F5ECD7]"
              style={{ opacity: 0.65 }}
            >
              Conservative assumptions. Six qualifying grant categories. A clear path
              to $1,068,000 in 3-year cumulative EBITDA for Southern New Mexico&apos;s
              first food hall and craft cider bar.
            </p>
          </div>
        </div>
      </div>

      {/* ── Metrics bar ──────────────────────────────────────────────────── */}
      <div className="border-y border-[#F5ECD7]/10 bg-white/[0.02] px-6 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {METRICS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="mb-1 font-serif text-3xl font-bold text-[#C4622D]">
                {value}
              </div>
              <div
                className="font-sans text-xs leading-snug text-[#F5ECD7]"
                style={{ opacity: 0.50 }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-20">

          {/* ── Investment tiers ─────────────────────────────────────────── */}
          <div>
            <h2 className="mb-2 text-center font-serif text-3xl font-bold text-[#F5ECD7]">
              Investment Tiers
            </h2>
            <p
              className="mb-12 text-center font-sans text-base text-[#F5ECD7]"
              style={{ opacity: 0.55 }}
            >
              All investment discussions are conducted privately. No online transactions.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {TIERS.map((tier) => (
                <GlassCard
                  key={tier.name}
                  hover={false}
                  className={`p-6 ${tier.featured ? 'border-[#C4622D]/40 bg-[#C4622D]/5' : ''}`}
                >
                  {tier.featured && (
                    <span className="mb-4 inline-block rounded-full bg-[#C4622D] px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-white">
                      Most Inquired
                    </span>
                  )}
                  <div className="mb-1 font-serif text-xl font-bold text-[#F5ECD7]">
                    {tier.name}
                  </div>
                  <div className="mb-5 font-sans text-sm text-[#C4622D] font-semibold">
                    {tier.range}
                  </div>
                  <ul className="space-y-2.5">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2.5 font-sans text-sm text-[#F5ECD7]"
                        style={{ opacity: 0.70 }}
                      >
                        <span className="mt-0.5 text-[#C4622D]" aria-hidden="true">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* ── Disclosure note ──────────────────────────────────────────── */}
          <GlassCard hover={false} className="p-6">
            <p
              className="font-sans text-xs leading-relaxed text-[#F5ECD7]"
              style={{ opacity: 0.45 }}
            >
              <strong className="text-[#F5ECD7]" style={{ opacity: 0.70 }}>Financial Model Disclosure (May 2026):</strong>{' '}
              The Appendix F Cashflow Tool is the governing financial model — Year 1 Revenue $822,000 /
              EOY Cash $60,100. Projected IRR of 17–20% is illustrative and based on Appendix F base-case
              assumptions. Forward-looking projections are for informational purposes only and do not
              constitute an offer of securities. Prospective investors should review the full business plan
              and consult qualified advisors. Full financial package available upon request.
            </p>
          </GlassCard>

          {/* ── Inquiry form ─────────────────────────────────────────────── */}
          {success ? (
            <SuccessScreen />
          ) : (
            <div>
              <h2 className="mb-2 text-center font-serif text-3xl font-bold text-[#F5ECD7]">
                Request the Investor Package
              </h2>
              <p
                className="mb-10 text-center font-sans text-base text-[#F5ECD7]"
                style={{ opacity: 0.55 }}
              >
                We respond to every inquiry within 48 hours.
              </p>

              <GlassCard hover={false} className="mx-auto max-w-xl p-8">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField id="inv-name" label="Full Name" required>
                      <input
                        id="inv-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        disabled={submitting}
                        placeholder="Jane Smith"
                        className={darkInput}
                      />
                    </FormField>

                    <FormField id="inv-email" label="Email Address" required>
                      <input
                        id="inv-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        disabled={submitting}
                        placeholder="jane@example.com"
                        className={darkInput}
                      />
                    </FormField>
                  </div>

                  {/* Organization + Investment range */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField id="inv-org" label="Organization">
                      <input
                        id="inv-org"
                        name="organization"
                        type="text"
                        autoComplete="organization"
                        value={form.organization}
                        onChange={handleChange}
                        disabled={submitting}
                        placeholder="Firm or institution"
                        className={darkInput}
                      />
                    </FormField>

                    <FormField id="inv-range" label="Investment Range" required>
                      <select
                        id="inv-range"
                        name="investment_range"
                        required
                        value={form.investment_range}
                        onChange={handleChange}
                        disabled={submitting}
                        className={`${darkInput} cursor-pointer`}
                      >
                        {INVESTMENT_RANGES.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            disabled={!!opt.disabled}
                            className="bg-[#1C1209]"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  {/* Message */}
                  <FormField
                    id="inv-message"
                    label="Message"
                    required
                    hint="What would you like to know? We'll include the relevant sections of the investor package."
                  >
                    <textarea
                      id="inv-message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      disabled={submitting}
                      placeholder="I'm interested in reviewing the full Appendix F model and capital stack…"
                      className={`${darkInput} resize-y`}
                    />
                  </FormField>

                  {/* Error banner */}
                  {error && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="flex items-start gap-3 rounded-xl border border-red-500/30
                                 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                    >
                      <AlertCircle />
                      <span>
                        <strong className="font-semibold">Submission failed — </strong>
                        {error}
                      </span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl
                               bg-[#C4622D] px-6 py-4 text-sm font-bold text-white
                               transition-colors hover:bg-[#a8521f]
                               disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Spinner />
                        Sending…
                      </>
                    ) : (
                      'Request Investor Package →'
                    )}
                  </button>

                  <p
                    className="text-center font-sans text-xs text-[#F5ECD7]"
                    style={{ opacity: 0.35 }}
                  >
                    Your information is kept strictly private and will only be used
                    to respond to your inquiry.
                  </p>
                </form>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
