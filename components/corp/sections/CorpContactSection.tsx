'use client';
// Full contact + inquiry form section — replaces the placeholder CTA phone strip.
// Submits to Formspree; mirrors the same pattern as the culinary hub newsletter.

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Status = 'idle' | 'sending' | 'done' | 'error';

const INTERESTS = [
  'Capital Markets Advisory',
  'Strategic Transformation',
  'Private Equity Solutions',
  'Enterprise Risk Management',
  'Digital Excellence',
  'Global Market Expansion',
  'General Inquiry',
];

const OFFICES = [
  { city: 'New York',   phone: '+1 212 555 0100', role: 'Global HQ'          },
  { city: 'London',     phone: '+44 20 7946 0200', role: 'EMEA HQ'           },
  { city: 'Singapore',  phone: '+65 6508 0300',    role: 'Asia-Pacific HQ'   },
];

export default function CorpContactSection() {
  const ref    = useRef<HTMLElement>(null);
  const [form, setForm]   = useState({ name: '', firm: '', email: '', interest: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-item', {
        opacity: 0, y: 30, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xlgzzezb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `Nexus Advisory Inquiry — ${form.interest || 'General'} — ${form.firm || form.name}`,
        }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const inputCls =
    'w-full bg-corp-card border border-corp-gold/15 px-4 py-3 font-sans text-sm text-corp-platinum ' +
    'placeholder-corp-steel/40 transition-colors duration-200 ' +
    'focus:outline-none focus:border-corp-gold/60 focus:ring-1 focus:ring-corp-gold/20 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <section
      ref={ref}
      id="contact"
      className="py-32 px-6 bg-corp-ink border-t border-corp-gold/15"
      aria-label="Contact Nexus Capital Group"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left — copy + office details */}
          <div className="lg:col-span-4">
            {/* Eyebrow */}
            <div className="contact-item flex items-center gap-3 mb-8">
              <span className="block h-px w-8 bg-corp-gold" />
              <span className="font-label text-[10px] tracking-[0.3em] uppercase text-corp-gold">
                Begin a Conversation
              </span>
            </div>

            <h2 className="contact-item font-corp-display text-3xl sm:text-4xl md:text-5xl font-light text-corp-platinum leading-tight mb-6">
              The right advisory<br />
              relationship<br />
              <em className="not-italic text-corp-gold">changes everything.</em>
            </h2>

            <p className="contact-item font-sans text-sm text-corp-steel leading-relaxed mb-12">
              Nexus Capital Group works with a selective roster of institutional clients.
              Share your objectives and we will connect you with the appropriate member
              of our advisory team — typically within one business day.
            </p>

            {/* Office contacts */}
            <div className="contact-item space-y-6">
              {OFFICES.map(({ city, phone, role }) => (
                <div key={city} className="border-l-2 border-corp-gold/30 pl-4">
                  <p className="font-label text-[9px] tracking-[0.25em] uppercase text-corp-gold mb-0.5">{city} · {role}</p>
                  <p className="font-sans text-sm text-corp-steel">{phone}</p>
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="contact-item mt-8 pt-8 border-t border-corp-gold/10">
              <p className="font-label text-[9px] tracking-[0.2em] uppercase text-corp-steel/50 mb-1">Email</p>
              <a
                href="mailto:advisory@nexuscapitalgroup.com"
                className="font-sans text-sm text-corp-platinum hover:text-corp-gold transition-colors duration-200"
              >
                advisory@nexuscapitalgroup.com
              </a>
            </div>
          </div>

          {/* Right — inquiry form */}
          <div className="lg:col-span-8">
            {status === 'done' ? (
              <div className="contact-item flex flex-col items-center justify-center h-full min-h-[400px]
                              border border-corp-gold/25 bg-corp-card p-8 md:p-12 text-center">
                <span className="font-corp-display text-6xl text-corp-gold mb-6">◈</span>
                <h3 className="font-corp-display text-3xl font-light text-corp-platinum mb-4">
                  Thank you, {form.name.split(' ')[0]}.
                </h3>
                <p className="font-sans text-sm text-corp-steel leading-relaxed max-w-md">
                  Your inquiry has been received. A member of our advisory team will be
                  in contact within one business day.
                </p>
                <div className="mt-8 h-px w-12 bg-corp-gold/40" />
                <p className="mt-4 font-label text-[9px] tracking-widest uppercase text-corp-steel/40">
                  Nexus Capital Group · New York · London · Singapore
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-item space-y-5">
                {/* Name + firm row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="corp-name" className="block font-label text-[9px] tracking-[0.2em] uppercase text-corp-steel/70 mb-2">
                      Full Name <span className="text-corp-gold">*</span>
                    </label>
                    <input
                      id="corp-name"
                      type="text"
                      required
                      placeholder="Eleanor Ashworth"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      disabled={status === 'sending'}
                      className={inputCls}
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="corp-firm" className="block font-label text-[9px] tracking-[0.2em] uppercase text-corp-steel/70 mb-2">
                      Institution / Firm
                    </label>
                    <input
                      id="corp-firm"
                      type="text"
                      placeholder="Sovereign Fund of ..."
                      value={form.firm}
                      onChange={e => setForm(f => ({ ...f, firm: e.target.value }))}
                      disabled={status === 'sending'}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Email + interest row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="corp-email" className="block font-label text-[9px] tracking-[0.2em] uppercase text-corp-steel/70 mb-2">
                      Email Address <span className="text-corp-gold">*</span>
                    </label>
                    <input
                      id="corp-email"
                      type="email"
                      required
                      placeholder="e.ashworth@institution.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      disabled={status === 'sending'}
                      className={inputCls}
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="corp-interest" className="block font-label text-[9px] tracking-[0.2em] uppercase text-corp-steel/70 mb-2">
                      Area of Interest
                    </label>
                    <select
                      id="corp-interest"
                      value={form.interest}
                      onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                      disabled={status === 'sending'}
                      className={`${inputCls} appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-corp-card">Select a practice area…</option>
                      {INTERESTS.map(i => (
                        <option key={i} value={i} className="bg-corp-card">{i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="corp-message" className="block font-label text-[9px] tracking-[0.2em] uppercase text-corp-steel/70 mb-2">
                    Brief Overview of Your Objectives
                  </label>
                  <textarea
                    id="corp-message"
                    rows={5}
                    placeholder="Describe the strategic challenge or transaction you are considering…"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    disabled={status === 'sending'}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Disclaimer + submit */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
                  <p className="font-sans text-[11px] text-corp-steel/40 leading-relaxed max-w-sm">
                    All inquiries are treated with the strictest confidence. This form does not create an advisory relationship.
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="shrink-0 font-label text-xs tracking-[0.25em] uppercase px-10 py-4
                               bg-corp-gold text-corp-ink hover:bg-corp-gold-light
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-300 flex items-center gap-3"
                  >
                    {status === 'sending' && (
                      <span className="h-3 w-3 rounded-full border-2 border-corp-ink border-r-transparent animate-spin" />
                    )}
                    {status === 'sending' ? 'Sending…' : 'Submit Inquiry →'}
                  </button>
                </div>

                {status === 'error' && (
                  <p role="alert" className="font-sans text-xs text-red-400">
                    Submission failed — please email us directly at advisory@nexuscapitalgroup.com
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
