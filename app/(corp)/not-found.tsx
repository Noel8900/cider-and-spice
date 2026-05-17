import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Nexus Capital Group',
}

export default function CorpNotFound() {
  return (
    <main className="min-h-screen bg-corp-navy flex flex-col items-center justify-center px-6 text-center">
      <p
        className="font-sans text-[120px] md:text-[180px] font-light leading-none text-corp-platinum/[0.05] select-none mb-0"
        aria-hidden="true"
      >
        404
      </p>
      <span className="block h-px w-12 bg-gradient-to-r from-transparent via-corp-gold/50 to-transparent mb-8" />
      <p className="font-label text-[9px] tracking-[0.35em] uppercase text-corp-gold/60 mb-4">
        Page Not Found
      </p>
      <p className="font-sans text-sm text-corp-steel max-w-xs mb-10">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/home"
          className="font-label text-[10px] tracking-[0.25em] uppercase px-8 py-3
                     bg-corp-gold text-corp-ink hover:bg-corp-gold-light transition-colors duration-200"
        >
          Return to Home
        </Link>
        <Link
          href="/services"
          className="font-label text-[10px] tracking-[0.25em] uppercase px-8 py-3
                     border border-corp-gold/30 text-corp-steel hover:border-corp-gold hover:text-corp-gold
                     transition-colors duration-200"
        >
          Our Services
        </Link>
      </div>
    </main>
  )
}
