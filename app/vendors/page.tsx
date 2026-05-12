'use client'

import { useState } from 'react'
import Link from 'next/link'
import { applyAsVendor } from './actions'
import type { VendorFormData, VendorActionResult } from './actions'

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

// ─── Small shared components ──────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function CheckCircle() {
  return (
    <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function AlertCircle() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function BackArrow() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
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
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500" aria-label="required">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
    </div>
  )
}

// Shared Tailwind string for every input / select / textarea
const inputCls =
  'block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 ' +
  'placeholder-gray-400 shadow-sm transition-colors ' +
  'focus:border-[#B83A2E] focus:outline-none focus:ring-2 focus:ring-[#B83A2E]/20 ' +
  'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed'

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <main className="flex min-h-screen flex-col" style={{ background: '#faf8f5' }}>
      <div className="px-6 py-4" style={{ background: '#1a0f08' }}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          <BackArrow />
          Back to the Hub
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
            <CheckCircle />
          </div>

          <h2
            className="mb-3 text-3xl font-bold text-gray-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Application Received!
          </h2>

          <p className="mb-2 text-gray-600">
            Thank you for your interest in the Las Cruces Culinary Innovation Hub.
          </p>
          <p className="mb-10 text-gray-600">
            We&apos;ll review your application and follow up at the email you
            provided within <strong>5–7 business days</strong>.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#B83A2E 0%,#d4641a 100%)' }}
          >
            Return to the Hub
          </Link>
        </div>
      </div>
    </main>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function VendorsPage() {
  const [form, setForm]         = useState<VendorFormData>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    // Clamp description to DESC_MAX chars
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
      setSuccess(true)   // unmounts the form, renders SuccessScreen
    } else {
      setError(result.message)
      setSubmitting(false)
    }
  }

  // ── Early exits ─────────────────────────────────────────────────────────────

  if (success) return <SuccessScreen />

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen" style={{ background: '#faf8f5' }}>

      {/* ── Hero header ───────────────────────────────────────────────────── */}
      <div style={{ background: '#1a0f08' }} className="px-6 pb-16 pt-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
          >
            <BackArrow />
            Back to the Hub
          </Link>

          <div className="text-center">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-400"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Vendor Applications
            </p>
            <h1
              className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Bring Your Concept{' '}
              <em className="not-italic text-amber-400">to the Hub</em>
            </h1>
            <p className="mx-auto max-w-xl text-base text-white/70">
              We&apos;re curating 10–13 distinctive food concepts for our Q1–Q2 2027
              grand opening in downtown Las Cruces. Tell us about your idea and
              we&apos;ll be in touch.
            </p>
          </div>
        </div>
      </div>

      {/* ── Form card ─────────────────────────────────────────────────────── */}
      <div className="-mt-8 px-4 pb-24">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">

          {/* Card header */}
          <div className="border-b border-gray-100 px-8 pb-6 pt-8">
            <h2
              className="text-xl font-bold text-gray-900"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Vendor Application
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fields marked{' '}
              <span className="font-semibold text-red-500">*</span>{' '}
              are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6 px-8 py-8">

            {/* ── Row 1: Name + Business name ───────────────────────────── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="name" label="Full Name" required>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Jane Smith"
                  className={inputCls}
                />
              </Field>

              <Field id="business_name" label="Business / Concept Name" required>
                <input
                  id="business_name"
                  name="business_name"
                  type="text"
                  autoComplete="organization"
                  required
                  value={form.business_name}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Spice Route Kitchen"
                  className={inputCls}
                />
              </Field>
            </div>

            {/* ── Row 2: Email + Phone ───────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="email" label="Email Address" required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="jane@example.com"
                  className={inputCls}
                />
              </Field>

              <Field id="phone" label="Phone Number">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="(575) 555-0100"
                  className={inputCls}
                />
              </Field>
            </div>

            {/* ── Row 3: Cuisine type + Booth preference ─────────────────── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="cuisine_type" label="Cuisine Type" required>
                <select
                  id="cuisine_type"
                  name="cuisine_type"
                  required
                  value={form.cuisine_type}
                  onChange={handleChange}
                  disabled={submitting}
                  className={`${inputCls} cursor-pointer`}
                >
                  {CUISINE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} disabled={!!opt.disabled}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                id="booth_preference"
                label="Booth Size Preference"
                hint="Pricing estimates — final rates confirmed at lease signing."
              >
                <select
                  id="booth_preference"
                  name="booth_preference"
                  value={form.booth_preference}
                  onChange={handleChange}
                  disabled={submitting}
                  className={`${inputCls} cursor-pointer`}
                >
                  {BOOTH_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} disabled={!!opt.disabled}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* ── Row 4: Description ────────────────────────────────────── */}
            <Field
              id="description"
              label="Short Description"
              required
              hint={`${form.description.length} / ${DESC_MAX} characters`}
            >
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Tell us about your food concept, your experience in the industry, and why you'd be a great fit for the Hub…"
                className={`${inputCls} resize-y`}
              />
            </Field>

            {/* ── Error banner ──────────────────────────────────────────── */}
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertCircle />
                <span>
                  <strong className="font-semibold">Submission failed — </strong>
                  {error}
                </span>
              </div>
            )}

            {/* ── Submit button ─────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                background: 'linear-gradient(135deg, #B83A2E 0%, #d4641a 100%)',
              }}
            >
              {submitting ? (
                <>
                  <Spinner />
                  Submitting…
                </>
              ) : (
                'Submit Application →'
              )}
            </button>

            {/* ── Privacy note ─────────────────────────────────────────── */}
            <p className="text-center text-xs text-gray-400">
              Your information is kept private and will only be used to evaluate
              your application.{' '}
              <Link href="/#contact" className="underline underline-offset-2 hover:text-gray-600">
                Questions? Contact us.
              </Link>
            </p>

          </form>
        </div>
      </div>

    </main>
  )
}
