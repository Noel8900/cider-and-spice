// Luxury 404 page — minimal, editorial, on-brand.
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Cider & Spice',
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-24">
      <div className="mx-auto max-w-md text-center">

        {/* Large editorial number */}
        <p className="font-corp-display text-[10rem] sm:text-[14rem] font-light leading-none
                       text-cream/[0.04] select-none mb-0 -mb-8"
           aria-hidden="true">
          404
        </p>

        {/* Glyph */}
        <span className="font-corp-display text-4xl text-gold block mb-6" aria-hidden="true">◇</span>

        {/* Copy */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block h-px w-8 bg-gold shrink-0" />
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
            Page Not Found
          </span>
          <span className="block h-px w-8 bg-gold shrink-0" />
        </div>

        <h1 className="font-corp-display text-4xl sm:text-5xl font-light text-cream mb-4 leading-tight">
          Nothing Here Yet
        </h1>
        <p className="font-sans text-base leading-relaxed text-cream/50 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has moved. The hub opens
          Q1–Q2 2027 — there&apos;s plenty more to explore in the meantime.
        </p>

        {/* CTAs */}
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
            Apply as a Vendor →
          </Link>
        </div>
      </div>
    </main>
  );
}
