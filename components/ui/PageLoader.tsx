// Route-level Suspense fallback — luxury editorial style.
// Pulsing gold glyph + brand name: no spinning wheel.

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-6">
      {/* Pulsing glyph */}
      <span
        className="font-corp-display text-4xl text-gold/60 select-none animate-pulse"
        aria-hidden="true"
      >
        ◈
      </span>

      {/* Brand name */}
      <p className="font-corp-display text-2xl font-light text-cream/40 tracking-widest">
        Cider &amp; Spice
      </p>

      {/* Thin animated gold rule */}
      <span className="block h-px w-12 bg-gradient-to-r from-transparent via-gold/40 to-transparent animate-pulse" />
    </div>
  );
}
