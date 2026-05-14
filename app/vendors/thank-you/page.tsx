// Server component — no client state needed.
// Renders after a successful vendor application redirect from /vendors.

import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Application Received | Cider & Spice Vendor Applications',
  description:
    'Your vendor application has been received. We will be in touch within 5–7 business days.',
  robots: { index: false, follow: false },
};

function CheckCircleIcon() {
  return (
    <svg
      className="h-12 w-12 text-ember"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function VendorThankYouPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center
                 bg-bg px-6 py-24"
    >
      <div className="mx-auto max-w-md text-center">
        {/* Icon ring */}
        <div
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center
                     rounded-full border border-ember/30 bg-ember/10"
        >
          <CheckCircleIcon />
        </div>

        {/* Headline */}
        <h1 className="mb-4 font-serif text-4xl font-bold text-cream">
          Application Received!
        </h1>

        {/* Body copy */}
        <p className="mb-3 font-sans text-base leading-relaxed text-cream/70">
          Thank you for your interest in the Las Cruces Culinary Innovation Hub.
        </p>
        <p className="mb-10 font-sans text-base leading-relaxed text-cream/70">
          We review every application carefully and will follow up at the email
          you provided within{' '}
          <strong className="text-cream">5–7 business days</strong>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" href="/">
            Back to Home
          </Button>
          <Button variant="secondary" href="/cider-club">
            Learn About the Cider Club →
          </Button>
        </div>

        {/* Footnote */}
        <p className="mt-12 font-sans text-xs text-cream/35">
          Questions? Email us at{' '}
          <a
            href="mailto:info@lccullinaryhub.com"
            className="underline underline-offset-2 hover:text-ember transition-colors"
          >
            info@lccullinaryhub.com
          </a>
        </p>
      </div>
    </main>
  );
}
