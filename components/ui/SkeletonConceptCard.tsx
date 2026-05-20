// Skeleton placeholder rendered while stall data is loading.
// Matches the visual footprint of <ConceptCard /> to prevent layout shift.

export default function SkeletonConceptCard({ compact = false }: { compact?: boolean }) {
  const pulse = {
    background: 'linear-gradient(90deg, rgba(232,211,165,0.05) 25%, rgba(232,211,165,0.10) 50%, rgba(232,211,165,0.05) 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-pulse 1.6s ease-in-out infinite',
    borderRadius: 2,
  } as React.CSSProperties;

  return (
    <div style={{
      border: '1px solid rgba(232,211,165,0.08)',
      borderRadius: 2,
      padding: compact ? '1rem 1.25rem' : '1.5rem',
      background: 'rgba(255,255,255,0.02)',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: compact ? 0 : '0.75rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ ...pulse, width: 32, height: 8 }} />
          <div style={{ ...pulse, width: 110, height: 20 }} />
        </div>
        <div style={{ ...pulse, width: 76, height: 24 }} />
      </div>

      {!compact && (
        <>
          <div style={{ ...pulse, width: 140, height: 9, marginBottom: '0.85rem' }} />
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ ...pulse, width: 60, height: 12 }} />
            <div style={{ ...pulse, width: 60, height: 12 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
            <div style={{ ...pulse, width: '100%', height: 12 }} />
            <div style={{ ...pulse, width: '92%',  height: 12 }} />
            <div style={{ ...pulse, width: '80%',  height: 12 }} />
          </div>
          <div style={{ ...pulse, width: 148, height: 34 }} />
        </>
      )}
    </div>
  );
}
