// Suspense boundary for /admin while data fetches.
// SkeletonStats + SkeletonTable mirror the admin dashboard layout.

import SkeletonStats from '@/components/ui/SkeletonStats';
import SkeletonTable from '@/components/ui/SkeletonTable';

export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-bg px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-12">
        <SkeletonStats />
        <SkeletonTable />
      </div>
    </main>
  );
}
