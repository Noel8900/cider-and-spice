'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function CorpError({
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
    <main className="min-h-screen bg-corp-navy flex flex-col items-center justify-center px-6 text-center">
      <p
        className="font-corp-display text-[140px] md:text-[200px] font-light leading-none text-corp-platinum/[0.04] select-none mb-0"
        aria-hidden="true"
      >
        500
      </p>
      <span className="block h-px w-12 bg-gradient-to-r from-transparent via-corp-gold/50 to-transparent mb-8" />
      <p className="font-label text-[9px] tracking-[0.35em] uppercase text-corp-gold/60 mb-4">
        System Error
      </p>
      <p className="font-sans text-sm text-corp-steel max-w-sm mb-10">
        An unexpected error has occurred. Please try again or return to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={reset}
          className="font-label text-[10px] tracking-[0.25em] uppercase px-8 py-3
                     bg-corp-gold text-corp-ink hover:bg-corp-gold-light transition-colors duration-200"
        >
          Try Again
        </button>
        <Link
          href="/home"
          className="font-label text-[10px] tracking-[0.25em] uppercase px-8 py-3
                     border border-corp-gold/30 text-corp-steel hover:border-corp-gold hover:text-corp-gold
                     transition-colors duration-200"
        >
          Return to Home
        </Link>
      </div>
    </main>
  )
}
