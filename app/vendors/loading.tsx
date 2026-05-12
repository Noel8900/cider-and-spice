// Next.js Suspense boundary for /vendors — shown while the page shell hydrates.
// SkeletonForm mirrors the vendor application form layout (header + fields + button).

import SkeletonForm from '@/components/ui/SkeletonForm';

export default function VendorsLoading() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <SkeletonForm />
    </main>
  );
}
