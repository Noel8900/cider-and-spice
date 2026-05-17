'use client';
// Renders the Culinary Hub navbar + floating button on culinary routes only.
// Corporate routes get their own CorpNavbar via the (corp) route group layout
// — culinary chrome must not appear there.

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import FloatingFloorPlanButton from '@/components/ui/FloatingFloorPlanButton';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';

const CORP_PREFIXES = ['/home', '/about', '/services', '/insights'];

export default function ConditionalCulinaryUI() {
  const pathname = usePathname();
  const isCorp = CORP_PREFIXES.some(p =>
    pathname === p || pathname.startsWith(p + '/')
  );
  if (isCorp) return null;
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <FloatingFloorPlanButton />
    </>
  );
}
