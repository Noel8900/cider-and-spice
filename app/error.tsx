'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 text-center">
      <p
        className="font-sans text-[140px] md:text-[200px] font-light leading-none text-cream/[0.04] select-none mb-0"
        aria-hidden="true"
      >
        500
      </p>
      <span className="block h-px w-12 bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8" />
      <p className="font-label text-[9px] tracking-[0.35em] uppercase text-gold/60 mb-4">
        Something Went Wrong
      </p>
      <p className="font-sans text-sm text-cream/50 max-w-sm mb-10">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={reset}
          className="font-label text-[10px] tracking-[0.25em] uppercase px-8 py-3
                     bg-ember hover:bg-ember-hover text-cream transition-colors duration-200"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="font-label text-[10px] tracking-[0.25em] uppercase px-8 py-3
                     border border-cream/20 text-cream/70 hover:border-gold/50 hover:text-gold
                     transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
