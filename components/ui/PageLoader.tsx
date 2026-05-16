// Used as Suspense fallback for route-level loading
// Centered spinner with brand logo text — never jarring
import LoadingSpinner from './LoadingSpinner';

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4">
      <p className="font-serif text-2xl text-cream/80">
        Cider &amp; Spice
      </p>
      <LoadingSpinner size="lg" />
    </div>
  );
}
