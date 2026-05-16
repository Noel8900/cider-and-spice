// Next.js Suspense boundary for /cider-club — shown while the page shell hydrates.
// SkeletonForm mirrors the cider club signup form layout.

import SkeletonForm from '@/components/ui/SkeletonForm';

export default function CiderClubLoading() {
  return (
    <main className="min-h-screen bg-bg">
      <SkeletonForm />
    </main>
  );
}
