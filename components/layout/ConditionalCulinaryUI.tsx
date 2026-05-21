'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import ActiveSectionHighlight from './ActiveSectionHighlight';
import PageTransition from './PageTransition';

const HIDE_NAV_PREFIXES = ['/admin'];

export default function ConditionalCulinaryUI() {
  const pathname = usePathname() ?? '';
  const hideNav  = HIDE_NAV_PREFIXES.some(p => pathname.startsWith(p));
  const isHome   = pathname === '/';

  if (hideNav) return null;

  return (
    <>
      {/* GSAP fade overlay fires on every route change */}
      <PageTransition />

      {/* Desktop nav — hidden on mobile via sm:hidden inside Navbar */}
      <Navbar />

      {/* Mobile nav — sticky top bar + slide drawer, visible only on mobile */}
      <MobileNav />

      {/* Theme toggle — fixed top-right, desktop only */}
      <div className="fixed top-4 right-20 z-[60] hidden md:flex items-center">
        <ThemeToggle />
      </div>

      {/* Active section sidebar dots — homepage only */}
      {isHome && <ActiveSectionHighlight />}
    </>
  );
}
