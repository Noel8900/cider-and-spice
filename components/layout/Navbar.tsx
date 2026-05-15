'use client';
// Public-facing sticky navbar for Cider & Spice.
// Links: Home, The Hub, Cider Bar, Vendors, Cider Club, Contact.
// Active styling: usePathname — page routes get a terracotta underline;
//   hash anchors never get active state (they all resolve to pathname "/").
// Scroll: transparent → dark glass after 80 px.
// Mobile: max-height drawer, closes on link click and on resize ≥ 768 px.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ── Nav link definitions ──────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home',        href: '/'             },
  { label: 'The Hub',     href: '/#opportunity' },
  { label: 'How It Works',href: '/#concept'     },
  { label: 'Community',   href: '/#impact'      },
  { label: 'Cider Bar',   href: '/#cider-bar'   },
  { label: 'Vendors',     href: '/vendors'      },
  { label: 'Cider Club',  href: '/cider-club'   },
  { label: 'Get Involved',href: '/#newsletter'  },
] as const;

/**
 * Returns true when the link should receive active styling.
 * Anchor-only hrefs (starting with "/#") are excluded — they all live on "/"
 * and would make every homepage link appear active simultaneously.
 */
function isActive(href: string, pathname: string): boolean {
  if (href.startsWith('/#')) return false;
  if (href === '/') return pathname === '/';
  // Match /vendors and /vendors/thank-you, /cider-club and any sub-routes
  return pathname === href || pathname.startsWith(href + '/');
}

// ── Icon components ───────────────────────────────────────────────────────────
function MenuIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Scroll detection — solidify background after 80 px
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // set initial state on mount
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile drawer when viewport widens to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Close drawer on route change (e.g. after clicking a page link)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#1C1209]/95 shadow-lg backdrop-blur-sm'
          : 'bg-transparent'
      }`}
      aria-label="Site navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="font-serif text-xl font-bold text-[#F5ECD7] transition-opacity hover:opacity-80"
        >
          Cider &amp; Spice
        </Link>

        {/* ── Desktop nav ───────────────────────────────────────────────── */}
        <ul className="hidden items-center gap-7 md:flex" role="list">
          {navLinks.map(({ label, href }) => {
            const active = isActive(href, pathname);
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`relative font-sans text-sm text-[#F5ECD7] transition-colors
                              hover:text-[#C4622D] ${active ? 'text-[#C4622D]' : ''}`}
                  style={{ opacity: active ? 1 : 0.75 }}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                  {/* Terracotta underline for active page routes */}
                  {active && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#C4622D]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop CTA + mobile hamburger ────────────────────────────── */}
        <div className="flex items-center gap-3">
          <Link
            href="/vendors"
            className="hidden rounded-xl bg-[#C4622D] px-5 py-2.5 text-sm font-semibold
                       text-white transition-colors hover:bg-[#a8521f] md:inline-block"
          >
            Apply Now →
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-[#F5ECD7] transition-colors hover:bg-white/10 md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        className={`overflow-hidden border-t border-[#F5ECD7]/10 transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-6 py-6" role="list">
          {navLinks.map(({ label, href }) => {
            const active = isActive(href, pathname);
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-2.5 font-sans text-base text-[#F5ECD7]
                              transition-colors hover:bg-white/5
                              ${active ? 'text-[#C4622D] bg-white/[0.04]' : 'hover:text-[#C4622D]'}`}
                  style={{ opacity: active ? 1 : 0.80 }}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Mobile CTA */}
          <li className="pt-3">
            <Link
              href="/vendors"
              className="block rounded-xl bg-[#C4622D] px-5 py-3 text-center font-semibold
                         text-white transition-colors hover:bg-[#a8521f]"
              onClick={() => setMenuOpen(false)}
            >
              Apply Now →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
