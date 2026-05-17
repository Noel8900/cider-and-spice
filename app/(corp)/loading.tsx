// Corp route loading state — Nexus Capital Group brand
export default function CorpLoading() {
  return (
    <div className="min-h-screen bg-corp-navy flex flex-col items-center justify-center gap-6">
      <span
        className="font-corp-display text-3xl font-light text-corp-gold/50 select-none animate-pulse"
        aria-hidden="true"
      >
        Nexus Capital Group
      </span>
      <span className="block h-px w-16 bg-gradient-to-r from-transparent via-corp-gold/30 to-transparent animate-pulse" />
    </div>
  );
}
