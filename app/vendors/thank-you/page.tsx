// Server component — no client state needed.
// Renders after a successful vendor application redirect from /vendors.

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Application Received | Cider & Spice Vendor Applications',
  description:
    'Your vendor application has been received. We will be in touch within 5–7 business days.',
  robots: { index: false, follow: false },
};

export default function VendorThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-24">
      <div className="mx-auto max-w-md text-center">

        {/* Glyph */}
        <span className="font-corp-display text-5xl text-gold block mb-8" aria-hidden="true">◈</span>

        {/* Headline */}
        <h1 className="font-corp-display text-4xl sm:text-5xl font-light text-cream mb-4">
          Application Received
        </h1>

        {/* Body copy */}
        <p className="font-sans text-base leading-relaxed text-cream/60 mb-3">
          Thank you for your interest in the Las Cruces Culinary Innovation Hub.
        </p>
        <p className="font-sans text-base leading-relaxed text-cream/60 mb-10">
          We review every application carefully and will follow up at the email
          you provided within{' '}
          <strong className="text-cream">5–7 business days</strong>.
        </p>

        {/* CTAs */}
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
            Explore the Cider Club →
          </Link>
        </div>

        {/* Footnote */}
        <p className="mt-12 font-sans text-xs text-cream/30">
          Questions? Email us at{' '}
          <a href="mailto:info@lccullinaryhub.com"
            className="border-b border-cream/20 pb-px hover:border-gold/50 hover:text-gold transition-all duration-300">
            info@lccullinaryhub.com
          </a>
        </p>
      </div>
    </main>
  );
}
