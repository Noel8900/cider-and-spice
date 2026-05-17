'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import gsap from 'gsap'
import { applyAsVendor } from './actions'
import type { VendorFormData, VendorActionResult } from './actions'
import SkeletonForm from '@/components/ui/SkeletonForm'
import VendorSpotsBar from '@/components/sections/VendorSpotsBar'

// ─── Static option lists ──────────────────────────────────────────────────────

const CUISINE_OPTIONS = [
  { value: '',                      label: 'Select a cuisine type…',         disabled: true },
  { value: 'New Mexican',           label: 'New Mexican'                               },
  { value: 'Mexican Street Food',   label: 'Mexican Street Food'                       },
  { value: 'Southern BBQ',          label: 'Southern BBQ'                              },
  { value: 'Mediterranean',         label: 'Mediterranean'                             },
  { value: 'Asian Fusion',          label: 'Asian Fusion'                              },
  { value: 'Ramen / Noodles',       label: 'Ramen / Noodles'                          },
  { value: 'Plant-Based / Vegan',   label: 'Plant-Based / Vegan'                      },
  { value: 'Desserts & Pastries',   label: 'Desserts & Pastries'                      },
  { value: 'American Comfort',      label: 'American Comfort'                          },
  { value: 'Other',                 label: 'Other'                                     },
]

const BOOTH_OPTIONS = [
  { value: '',               label: 'Select a size…',                   disabled: true  },
  { value: 'small_8x8',     label: 'Small — 8 × 8 ft (~$800 / mo)'                    },
  { value: 'medium_8x12',   label: 'Medium — 8 × 12 ft (~$1,100 / mo)'                },
  { value: 'large_10x12',   label: 'Large — 10 × 12 ft (~$1,400 / mo)'               },
  { value: 'corner_12x12',  label: 'Corner — 12 × 12 ft (~$1,800 / mo)'              },
  { value: 'flexible',      label: 'Flexible / No preference'                          },
]

const EMPTY_FORM: VendorFormData = {
  name:             '',
  business_name:    '',
  email:            '',
  phone:            '',
  cuisine_type:     '',
  booth_preference: '',
  description:      '',
}

const DESC_MAX = 500

// ─── Luxury input class ───────────────────────────────────────────────────────

const inputCls =
  'block w-full border border-cream/20 bg-white/[0.03] px-5 py-4 ' +
  'font-sans text-sm text-cream placeholder-cream/25 ' +
  'transition-colors focus:border-gold/40 focus:outline-none ' +
  'focus:ring-1 focus:ring-gold/15 disabled:opacity-50 disabled:cursor-not-allowed'

const selectCls = `${inputCls} appearance-none cursor-pointer bg-bg`

// ─── Small helpers ────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function AlertCircle() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

interface FieldProps {
  id: string
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}

function Field({ id, label, required, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="font-label text-[9px] tracking-[0.2em] uppercase text-cream/50 mb-2 block">
        {label}
        {required && <span className="ml-0.5 text-gold/60" aria-label="required">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 font-sans text-xs text-cream/30">{hint}</p>}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function VendorsPage() {
  const router = useRouter()
  const formRef = useRef<HTMLDivElement>(null)
  const [form, setForm]             = useState<VendorFormData>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    setInitializing(false)
  }, [])

  useEffect(() => {
    if (!initializing && formRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(formRef.current, { opacity: 0, y: 32, duration: 0.9, ease: 'power3.out', delay: 0.1 })
      })
      return () => ctx.revert()
    }
  }, [initializing])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    const safe = name === 'description' ? value.slice(0, DESC_MAX) : value
    setForm(prev => ({ ...prev, [name]: safe }))
    if (error) setError(null)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const result: VendorActionResult = await applyAsVendor(form)
    if (result.ok) {
      router.push('/vendors/thank-you')
    } else {
      setError(result.message)
      setSubmitting(false)
    }
  }

  if (initializing) return (
    <main className="min-h-screen bg-bg">
      <SkeletonForm />
    </main>
  )

  return (
    <main className="min-h-screen bg-bg">

      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <div className="px-6 pb-16 pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 font-label text-[9px]
                       tracking-[0.2em] uppercase text-cream/40 hover:text-gold
                       transition-colors duration-300"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to the Hub
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block h-px w-8 bg-gold shrink-0" />
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
                Vendor Applications
              </span>
              <span className="block h-px w-8 bg-gold shrink-0" />
            </div>
            <h1 className="font-corp-display text-5xl sm:text-6xl md:text-7xl font-light
                            leading-[0.92] tracking-tight text-cream mb-6">
              Bring Your Concept<br />
              <em className="not-italic text-gold">to the Hub</em>
            </h1>
            <p className="mx-auto max-w-xl font-sans text-base leading-relaxed text-cream/55">
              We&apos;re curating 10–13 distinctive food concepts for our Q1–Q2 2027
              grand opening in downtown Las Cruces. Tell us about your idea and
              we&apos;ll be in touch.
            </p>
          </div>
        </div>
      </div>

      {/* ── Spots urgency bar ────────────────────────────────────────────── */}
      <div className="px-6 pb-10">
        <div className="mx-auto max-w-2xl">
          <VendorSpotsBar />
        </div>
      </div>

      {/* ── Form panel ──────────────────────────────────────────────────── */}
      <div className="px-6 pb-24">
        <div ref={formRef} className="mx-auto max-w-2xl border border-cream/[0.08] bg-white/[0.02] p-10 md:p-14">

          <div className="border-b border-cream/[0.07] pb-6 mb-8">
            <h2 className="font-corp-display text-2xl font-light text-cream mb-1">
              Vendor Application
            </h2>
            <p className="font-sans text-xs text-cream/30">
              Fields marked <span className="text-gold/60">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="name" label="Full Name" required>
                <input id="name" name="name" type="text" autoComplete="name" required
                  value={form.name} onChange={handleChange} disabled={submitting}
                  placeholder="Jane Smith" className={inputCls} />
              </Field>
              <Field id="business_name" label="Business / Concept Name" required>
                <input id="business_name" name="business_name" type="text" autoComplete="organization" required
                  value={form.business_name} onChange={handleChange} disabled={submitting}
                  placeholder="Spice Route Kitchen" className={inputCls} />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="email" label="Email Address" required>
                <input id="email" name="email" type="email" autoComplete="email" required
                  value={form.email} onChange={handleChange} disabled={submitting}
                  placeholder="jane@example.com" className={inputCls} />
              </Field>
              <Field id="phone" label="Phone Number">
                <input id="phone" name="phone" type="tel" autoComplete="tel"
                  value={form.phone} onChange={handleChange} disabled={submitting}
                  placeholder="(575) 555-0100" className={inputCls} />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="cuisine_type" label="Cuisine Type" required>
                <div className="relative">
                  <select id="cuisine_type" name="cuisine_type" required
                    value={form.cuisine_type} onChange={handleChange} disabled={submitting}
                    className={selectCls}>
                    {CUISINE_OPTIONS.map(opt => (
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
              </Field>
              <Field id="booth_preference" label="Booth Size Preference"
                hint="Estimates — final rates confirmed at lease signing.">
                <div className="relative">
                  <select id="booth_preference" name="booth_preference"
                    value={form.booth_preference} onChange={handleChange} disabled={submitting}
                    className={selectCls}>
                    {BOOTH_OPTIONS.map(opt => (
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
              </Field>
            </div>

            <Field id="description" label="Short Description" required
              hint={`${form.description.length} / ${DESC_MAX} characters`}>
              <textarea id="description" name="description" required rows={5}
                value={form.description} onChange={handleChange} disabled={submitting}
                placeholder="Tell us about your food concept, your experience in the industry, and why you'd be a great fit for the Hub…"
                className={`${inputCls} resize-y`} />
            </Field>

            {error && (
              <div role="alert" aria-live="assertive"
                className="flex items-start gap-3 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
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
              {submitting ? <><Spinner />Submitting…</> : 'Submit Application →'}
            </button>

            <p className="text-center font-sans text-xs text-cream/30">
              Your information is kept private and will only be used to evaluate your application.{' '}
              <Link href="/#contact" className="border-b border-cream/20 pb-px hover:border-gold/50 hover:text-gold transition-all duration-300">
                Questions? Contact us.
              </Link>
            </p>

          </form>
        </div>
      </div>

    </main>
  )
}
