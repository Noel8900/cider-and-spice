'use client';

import { useState } from 'react';
import Link from 'next/link';
import { joinCiderClub } from './actions';
import type { CiderClubFormData, CiderClubTier, CiderClubActionResult } from './actions';
import GlassCard from '@/components/ui/GlassCard';
import FormField from '@/components/ui/FormField';
import { darkInput } from '@/components/ui/FormField';

// ─── Tier data ────────────────────────────────────────────────────────────────

const TIERS: {
  id: CiderClubTier;
  name: string;
  price: string;
  sub: string;
  icon: string;
  perks: string[];
  featured?: boolean;
}[] = [
  {
    id:    'taster',
    name:  'Taster',
    price: '$25',
    sub:   'per month',
    icon:  '🍎',
    perks: [
      '1 tasting flight/month (4 ciders)',
      '10% discount on all pours',
      'Member newsletter & early event access',
      'Digital membership card',
    ],
  },
  {
    id:       'enthusiast',
    name:     'Enthusiast',
    price:    '$45',
    sub:      'per month',
    icon:     '🫙',
    featured: true,
    perks: [
      '2 tasting flights/month',
      '15% discount on all pours',
      'Reserved seating at all cider events',
      'Producer meet-and-greet access',
      'Priority Cider Club queue',
    ],
  },
  {
    id:    'founding',
    name:  'Founding Member',
    price: '$85',
    sub:   'per month',
    icon:  '🍾',
    perks: [
      'Unlimited tasting flights',
      '20% discount on all pours',
      'Private-label seasonal bottle',
      'Quarterly private pairing dinner',
      'Name on the Founding Member wall',
    ],
  },
];

const EMPTY: CiderClubFormData = {
  name:  '',
  email: '',
  phone: '',
  tier:  'enthusiast',
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

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ tier }: { tier: CiderClubTier }) {
  const tierName =
    tier === 'founding' ? 'Founding Member' :
    tier === 'enthusiast' ? 'Enthusiast' : 'Taster';

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-ember/30 bg-ember/10 text-5xl">
          🍾
        </div>
        <h2 className="mb-4 font-serif text-3xl font-bold text-cream">
          Welcome to the Club!
        </h2>
        <p className="mb-3 font-sans text-base leading-relaxed text-cream/70">
          You&apos;re now on the <strong className="text-ember">{tierName}</strong> waitlist.
        </p>
        <p className="mb-10 font-sans text-base leading-relaxed text-cream/70">
          We&apos;ll be in touch before Grand Opening (Q1–Q2 2027) to confirm your
          membership and lock in your founding-member rate.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-ember px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-hover"
          >
            Back to Home
          </Link>
          <Link
            href="/vendors"
            className="rounded-xl border border-cream/20 px-6 py-3 text-sm font-semibold text-cream/80 transition-colors hover:border-ember/40 hover:text-ember"
          >
            Become a Vendor →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CiderClubPage() {
  const [form, setForm]           = useState<CiderClubFormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  function selectTier(tier: CiderClubTier) {
    setForm((prev) => ({ ...prev, tier }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result: CiderClubActionResult = await joinCiderClub(form);
    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.message);
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-bg">
        <SuccessScreen tier={form.tier} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="px-6 pb-20 pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-ember transition-opacity hover:opacity-70"
          >
            <BackArrow />
            Back to the Hub
          </Link>

          <div className="text-center">
            <span className="mb-4 inline-block rounded-full border border-ember/40 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-ember">
              Membership
            </span>
            <h1 className="mb-5 font-serif text-5xl font-bold leading-tight text-cream md:text-6xl">
              Cider Club
            </h1>
            <p
              className="mx-auto max-w-xl font-sans text-lg leading-relaxed text-cream/65"
            >
              Southern New Mexico&apos;s first specialty cider bar — 400 years of
              apple-growing heritage in every pour. Pre-register now to lock in
              your founding-member rate before we open.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <div className="mx-auto max-w-5xl space-y-16">

          {/* ── Tier cards ───────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {TIERS.map((tier) => {
              const selected = form.tier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => selectTier(tier.id)}
                  className={`relative text-left rounded-2xl border p-6 transition-all duration-200 ${
                    selected
                      ? 'border-ember/60 bg-ember/10 ring-2 ring-ember/30'
                      : 'border-cream/10 bg-white/5 hover:border-cream/20 hover:bg-white/[0.08]'
                  }`}
                  aria-pressed={selected}
                  aria-label={`Select ${tier.name} tier`}
                >
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-white">
                      Most Popular
                    </span>
                  )}

                  <div className="mb-3 text-3xl" aria-hidden="true">{tier.icon}</div>

                  <div className="mb-0.5 font-serif text-xl font-bold text-cream">
                    {tier.name}
                  </div>
                  <div className="mb-4 font-serif text-3xl font-bold text-ember">
                    {tier.price}
                    <span className="font-sans text-sm font-normal text-cream/50">
                      &nbsp;{tier.sub}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 font-sans text-sm text-cream/70"
                      >
                        <span className="mt-0.5 shrink-0 text-ember" aria-hidden="true">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {selected && (
                    <div className="mt-4 rounded-lg bg-ember/20 px-3 py-2 text-center font-sans text-xs font-semibold text-ember">
                      Selected ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Signup form ──────────────────────────────────────────────── */}
          <div>
            <h2 className="mb-2 text-center font-serif text-3xl font-bold text-cream">
              Pre-Register Now
            </h2>
            <p
              className="mb-10 text-center font-sans text-sm text-cream/50"
            >
              Lock in your founding-member rate. No payment required until opening day.
            </p>

            <GlassCard hover={false} className="mx-auto max-w-xl p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Selected tier display */}
                <div className="rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-center">
                  <span className="font-sans text-xs text-cream/60">
                    Selected tier:
                  </span>{' '}
                  <span className="font-sans text-sm font-semibold text-ember">
                    {TIERS.find((t) => t.id === form.tier)?.name} —{' '}
                    {TIERS.find((t) => t.id === form.tier)?.price}/mo
                  </span>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField id="cc-name" label="Full Name" required>
                    <input
                      id="cc-name"
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

                  <FormField id="cc-email" label="Email Address" required>
                    <input
                      id="cc-email"
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

                {/* Phone */}
                <FormField
                  id="cc-phone"
                  label="Phone Number"
                  hint="Optional — for membership confirmation texts only."
                >
                  <input
                    id="cc-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={submitting}
                    placeholder="(575) 555-0100"
                    className={darkInput}
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
                      <strong className="font-semibold">Sign-up failed — </strong>
                      {error}
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl
                             bg-ember px-6 py-4 text-sm font-bold text-white
                             transition-colors hover:bg-ember-hover
                             disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Spinner />
                      Signing up…
                    </>
                  ) : (
                    'Join the Cider Club →'
                  )}
                </button>

                <p className="text-center font-sans text-xs text-cream/35">
                  No payment required until we open. Unsubscribe any time.
                </p>
              </form>
            </GlassCard>
          </div>

          {/* ── Footnote ─────────────────────────────────────────────────── */}
          <p className="text-center font-sans text-xs text-cream/35">
            Cider Club membership pricing and perks are subject to change before
            Grand Opening. Founding members who pre-register are guaranteed their
            quoted rate for the first 12 months.
          </p>
        </div>
      </div>
    </main>
  );
}
