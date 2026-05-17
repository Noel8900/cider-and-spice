// Next.js Suspense boundary for /investors — shown while the page shell hydrates.
// SkeletonForm mirrors the investor inquiry form layout.

import SkeletonForm from '@/components/ui/SkeletonForm';

export default function InvestorsLoading() {
  return (
    <main className="min-h-screen bg-bg">
      <SkeletonForm />
    </main>
  );
}
