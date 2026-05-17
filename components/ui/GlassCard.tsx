interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: Omit<GlassCardProps, 'flat'>) {
  return (
    <div className={`border border-cream/[0.08] bg-white/[0.02]
      ${hover ? 'hover:bg-white/[0.04] hover:border-cream/[0.14] transition-all duration-300' : ''}
      ${className}`}
    >
      {children}
    </div>
  );
}
