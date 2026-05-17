interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  flat?: boolean;
}

export default function GlassCard({ children, className = '', hover = true, flat = false }: GlassCardProps) {
  if (flat) {
    return (
      <div className={`border border-cream/[0.08] bg-white/[0.02] ${className}`}>
        {children}
      </div>
    );
  }
  return (
    <div className={`
      rounded-2xl border border-cream/10
      bg-white/5 backdrop-blur-sm
      ${hover ? 'hover:bg-white/10 hover:border-cream/20 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
