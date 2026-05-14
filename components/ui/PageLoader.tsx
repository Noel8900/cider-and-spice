// Used as Suspense fallback for route-level loading
// Centered spinner with brand logo text — never jarring
import LoadingSpinner from './LoadingSpinner';

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-[#1C1209] flex flex-col items-center justify-center gap-4">
      <p className="font-serif text-2xl text-[#F5ECD7]" style={{ opacity: 0.80 }}>
        Cider &amp; Spice
      </p>
      <LoadingSpinner size="lg" />
    </div>
  );
}
