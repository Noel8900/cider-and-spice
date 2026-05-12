// Next.js App Router automatically uses this file as the Suspense boundary
// for every page in the app — no manual wiring needed

import PageLoader from '@/components/ui/PageLoader';

export default function Loading() {
  return <PageLoader />;
}
