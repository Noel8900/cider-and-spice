'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import ThemeToggle from './ThemeToggle';
import ActiveSectionHighlight from './ActiveSectionHighlight';

const HIDE_NAV_PREFIXES = ['/admin'];

export default function ConditionalCulinaryUI() {
  const pathname = usePathname() ?? '';
  const hideNav  = HIDE_NAV_PREFIXES.some(p => pathname.startsWith(p));
  const isHome   = pathname === '/';

  if (hideNav) return null;

  return (
    <>
      <Navbar />
      {/* Theme toggle — fixed top-right, outside nav to avoid layout conflicts */}
      <div className="fixed top-4 right-20 z-[60] hidden md:flex items-center">
        <ThemeToggle />
      </div>
      {/* Active section sidebar dots — homepage only */}
      {isHome && <ActiveSectionHighlight />}
    </>
  );
}
