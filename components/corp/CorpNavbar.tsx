'use client';
// Nexus Capital Group — Sticky corporate navigation bar.
// Dark glass with champagne gold accent; separate from Culinary Hub navbar.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'About',    href: '/about'    },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact',  href: '#contact'  },
];

export default function CorpNavbar() {
  const pathname  = usePathname();
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href !== '#' && href !== '#contact' && pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-corp-ink/95 backdrop-blur-md border-b border-corp-gold/15 py-4'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/home" className="flex flex-col leading-none group" aria-label="Nexus Capital Group — Home">
            <span className="font-corp-display text-2xl font-medium tracking-wide text-corp-platinum group-hover:text-corp-gold transition-colors duration-300">
              NEXUS
            </span>
            <span className="font-label text-[9px] tracking-[0.35em] uppercase text-corp-steel group-hover:text-corp-gold/80 transition-colors duration-300">
              Capital Group
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`font-label text-xs tracking-[0.2em] uppercase transition-colors duration-200 pb-0.5
                  ${isActive(href)
                    ? 'text-corp-gold border-b border-corp-gold'
                    : 'text-corp-steel hover:text-corp-platinum'
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#"
              className="font-label text-xs tracking-[0.2em] uppercase text-corp-steel hover:text-corp-gold transition-colors duration-200"
            >
              Client Portal →
            </Link>
            <Link
              href="#contact"
              className="font-label text-xs tracking-[0.2em] uppercase px-6 py-2.5
                         border border-corp-gold/60 text-corp-gold
                         hover:bg-corp-gold hover:text-corp-ink
                         transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`block h-px w-6 bg-corp-platinum transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-6 bg-corp-platinum transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-corp-platinum transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-corp-ink/98 backdrop-blur-lg
          flex flex-col justify-center px-6 sm:px-10 transition-all duration-500
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        {/* Gold top rule */}
        <span className="block h-px w-16 bg-corp-gold mb-12" />

        <nav className="flex flex-col gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`font-corp-display text-3xl sm:text-4xl font-light transition-colors duration-200
                ${isActive(href) ? 'text-corp-gold' : 'text-corp-platinum hover:text-corp-gold'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-4">
          <Link
            href="#"
            onClick={() => setMobileOpen(false)}
            className="font-label text-xs tracking-[0.25em] uppercase text-corp-steel"
          >
            Client Portal →
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="font-label text-xs tracking-[0.25em] uppercase px-6 py-3 text-center
                       border border-corp-gold text-corp-gold hover:bg-corp-gold hover:text-corp-ink
                       transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Bottom footer strip */}
        <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 border-t border-corp-gold/15 pt-6">
          <p className="font-label text-[10px] tracking-widest uppercase text-corp-steel/50">
            © 2024 Nexus Capital Group · New York · London · Singapore
          </p>
        </div>
      </div>
    </>
  );
}
