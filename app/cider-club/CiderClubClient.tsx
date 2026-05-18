'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { joinCiderClub } from './actions';
import type { CiderClubFormData, CiderClubTier, CiderClubActionResult } from './actions';
import FormField from '@/components/ui/FormField';
import { darkInput } from '@/components/ui/FormField';

gsap.registerPlugin(ScrollTrigger);

// ─── Tier data ────────────────────────────────────────────────────────────────

const TIERS: {
  id: CiderClubTier;
  name: string;
  price: string;
  sub: string;
  glyph: string;
  perks: string[];
  featured?: boolean;
}[] = [
  {
    id:    'taster',
    name:  'Taster',
    price: '$25',
    sub:   'per month',
    glyph: '◇',
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
    glyph:    '◈',
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
    glyph: '◆',
    perks: [
      'Unlimited tasting flights',
      '20% discount on all pours',
      'Private-label seasonal bottle',
      'Quarterly private pairing dinner',
      'Name on the Founding Member wall',
    ],
  },
];

// ─── Comparison table rows ────────────────────────────────────────────────────

type CellVal = string | boolean;

const COMPARE_ROWS: { feature: string; taster: CellVal; enthusiast: CellVal; founding: CellVal }[] = [
  { feature: 'Monthly tasting flights',       taster: '1 flight',    enthusiast: '2 flights',    founding: 'Unlimited'     },
  { feature: 'Pour discount',                 taster: '10%',         enthusiast: '15%',          founding: '20%'           },
  { feature: 'Early event access',            taster: true,          enthusiast: true,           founding: true            },
  { feature: 'Reserved event seating',        taster: false,         enthusiast: true,           founding: true            },
  { feature: 'Producer meet-and-greet',       taster: false,         enthusiast: true,           founding: true            },
  { feature: 'Priority queue',                taster: false,         enthusiast: true,           founding: true            },
  { feature: 'Private-label seasonal bottle', taster: false,         enthusiast: false,          founding: true            },
  { feature: 'Quarterly pairing dinner',      taster: false,         enthusiast: false,          founding: true            },
  { feature: 'Founding Member wall',          taster: false,         enthusiast: false,          founding: true            },
  { feature: 'Founding-rate lock (12 mo)',    taster: true,          enthusiast: true,           founding: true            },
];

const EMPTY: CiderClubFormData = {
  name:  '',
  email: '',
  phone: '',
  tier:  'enthusiast',
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

function Check() {
  return (
    <svg className="h-4 w-4 text-gold/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Minus() {
  return (
    <svg className="h-4 w-4 text-cream/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  );
}

function Cell({ val }: { val: CellVal }) {
  if (typeof val === 'boolean') {
    return <div className="flex justify-center">{val ? <Check /> : <Minus />}</div>;
  }
  return <span className="font-sans text-sm text-cream/70">{val}</span>;
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ tier }: { tier: CiderClubTier }) {
  const tierName =
    tier === 'founding' ? 'Founding Member' :
    tier === 'enthusiast' ? 'Enthusiast' : 'Taster';

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <span className="font-corp-display text-5xl text-gold block mb-8" aria-hidden="true">◆</span>
        <h2 className="font-corp-display text-4xl font-light text-cream mb-4">
          Welcome to the Club
        </h2>
        <p className="font-sans text-base leading-relaxed text-cream/60 mb-3">
          You&apos;re now on the <strong className="text-gold">{tierName}</strong> waitlist.
        </p>
        <p className="font-sans text-base leading-relaxed text-cream/60 mb-10">
          We&apos;ll be in touch before Grand Opening (Q1–Q2 2027) to confirm your
          membership and lock in your founding-member rate.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/"
            className="bg-ember hover:bg-ember-hover px-8 py-4 font-label text-[10px]
                       tracking-[0.25em] uppercase text-white transition-colors">
            Back to Home
          </Link>
          <Link href="/vendors"
            className="border border-cream/20 hover:border-gold/50 px-8 py-4 font-label
                       text-[10px] tracking-[0.25em] uppercase text-cream/60 hover:text-gold
                       transition-all duration-300">
            Become a Vendor →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CiderClubClient() {
  const tiersRef   = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const [form, setForm]             = useState<CiderClubFormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cc-tier-card', {
        opacity: 0, y: 28, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: tiersRef.current, start: 'top 78%', once: true },
      });
      gsap.from('.cc-compare', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: compareRef.current, start: 'top 82%', once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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

  const selectedTier = TIERS.find((t) => t.id === form.tier);

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
                Membership
              </span>
              <span className="block h-px w-8 bg-gold shrink-0" />
            </div>
            <h1 className="font-corp-display text-5xl sm:text-6xl md:text-7xl font-light
                            leading-[0.92] tracking-tight text-cream mb-6">
              Cider Club
            </h1>
            <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-cream/55">
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
          <div ref={tiersRef} className="grid grid-cols-1 gap-px bg-cream/[0.06] md:grid-cols-3">
            {TIERS.map((tier) => {
              const selected = form.tier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => selectTier(tier.id)}
                  className={`cc-tier-card relative text-left p-8 transition-colors duration-300
                    ${tier.featured
                      ? 'bg-ember/[0.07] hover:bg-ember/[0.12]'
                      : 'bg-bg hover:bg-white/[0.04]'
                    }
                    ${selected ? 'outline outline-1 outline-gold/30' : ''}`}
                  aria-pressed={selected}
                  aria-label={`Select ${tier.name} tier`}
                >
                  {tier.featured && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                     border border-gold/40 bg-bg px-4 py-1 font-label
                                     text-[9px] tracking-[0.2em] uppercase text-gold">
                      Most Popular
                    </span>
                  )}

                  <span className={`font-corp-display text-2xl mb-6 block leading-none
                    ${tier.featured ? 'text-ember' : 'text-gold/50'}`}
                    aria-hidden="true">
                    {tier.glyph}
                  </span>

                  <div className="font-corp-display text-2xl font-light text-cream mb-1">
                    {tier.name}
                  </div>
                  <div className="font-corp-display text-4xl font-light text-gold mb-1">
                    {tier.price}
                    <span className="font-sans text-sm font-normal text-cream/40">
                      &nbsp;{tier.sub}
                    </span>
                  </div>

                  <div className="h-px bg-cream/[0.07] my-5" />

                  <ul className="space-y-2.5">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 font-sans text-sm text-cream/60">
                        <span className="mt-0.5 shrink-0 text-gold/60" aria-hidden="true">—</span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {selected && (
                    <div className="mt-6 border-t border-gold/20 pt-4 font-label text-[9px]
                                    tracking-[0.2em] uppercase text-gold">
                      Selected ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Comparison table ─────────────────────────────────────────── */}
          <div ref={compareRef} className="cc-compare overflow-x-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-8 bg-gold/40 shrink-0" />
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-gold/60">
                Full Comparison
              </span>
            </div>
            <table className="w-full min-w-[540px] border-collapse">
              <thead>
                <tr className="border-b border-cream/[0.08]">
                  <th className="py-3 pr-6 text-left font-label text-[9px] tracking-[0.2em] uppercase text-cream/30 w-1/2">
                    Benefit
                  </th>
                  {TIERS.map((t) => (
                    <th key={t.id}
                      className={`py-3 px-4 text-center font-label text-[9px] tracking-[0.2em] uppercase
                        ${t.id === form.tier ? 'text-gold' : 'text-cream/35'}`}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(({ feature, taster, enthusiast, founding }, i) => (
                  <tr
                    key={feature}
                    className={`border-b border-cream/[0.05] hover:bg-white/[0.02] transition-colors
                      ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
                  >
                    <td className="py-3 pr-6 font-sans text-sm text-cream/50">{feature}</td>
                    <td className="py-3 px-4 text-center"><Cell val={taster} /></td>
                    <td className="py-3 px-4 text-center"><Cell val={enthusiast} /></td>
                    <td className="py-3 px-4 text-center"><Cell val={founding} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Signup form ──────────────────────────────────────────────── */}
          <div>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="block h-px w-8 bg-gold/40 shrink-0" />
                <span className="font-label text-[9px] tracking-[0.3em] uppercase text-gold/60">
                  Pre-Register
                </span>
                <span className="block h-px w-8 bg-gold/40 shrink-0" />
              </div>
              <h2 className="font-corp-display text-4xl font-light text-cream mb-2">
                Reserve Your Spot
              </h2>
              <p className="font-sans text-sm text-cream/45">
                Lock in your founding-member rate. No payment required until opening day.
              </p>
            </div>

            <div className="mx-auto max-w-xl border border-cream/[0.08] bg-white/[0.02] p-10">
              <div className="border border-gold/20 bg-gold/[0.05] px-5 py-3 mb-6 text-center">
                <span className="font-label text-[9px] tracking-[0.2em] uppercase text-cream/40">
                  Selected tier:
                </span>{' '}
                <span className="font-corp-display text-base text-gold">
                  {selectedTier?.name} — {selectedTier?.price}/mo
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField id="cc-name" label="Full Name" required>
                    <input id="cc-name" name="name" type="text" autoComplete="name" required
                      value={form.name} onChange={handleChange} disabled={submitting}
                      placeholder="Jane Smith" className={darkInput} />
                  </FormField>
                  <FormField id="cc-email" label="Email Address" required>
                    <input id="cc-email" name="email" type="email" autoComplete="email" required
                      value={form.email} onChange={handleChange} disabled={submitting}
                      placeholder="jane@example.com" className={darkInput} />
                  </FormField>
                </div>

                <FormField id="cc-phone" label="Phone Number"
                  hint="Optional — for membership confirmation texts only.">
                  <input id="cc-phone" name="phone" type="tel" autoComplete="tel"
                    value={form.phone} onChange={handleChange} disabled={submitting}
                    placeholder="(575) 555-0100" className={darkInput} />
                </FormField>

                {error && (
                  <div role="alert" aria-live="assertive"
                    className="flex items-start gap-3 border border-red-500/30
                               bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertCircle />
                    <span><strong className="font-semibold">Sign-up failed — </strong>{error}</span>
                  </div>
                )}

                <button type="submit" disabled={submitting}
                  className="flex w-full items-center justify-center gap-2.5 bg-ember hover:bg-ember-hover
                             px-6 py-4 font-label text-[10px] tracking-[0.25em] uppercase text-white
                             transition-colors disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? <><Spinner />Signing up…</> : 'Reserve My Founding Rate →'}
                </button>

                <p className="text-center font-sans text-xs text-cream/30">
                  No payment required until we open. Founding rate locked for 12 months. Unsubscribe any time.
                </p>
              </form>
            </div>
          </div>

          <p className="text-center font-sans text-xs text-cream/25">
            Cider Club membership pricing and perks are subject to change before
            Grand Opening. Founding members who pre-register are guaranteed their
            quoted rate for the first 12 months.
          </p>
        </div>
      </div>
    </main>
  );
}
