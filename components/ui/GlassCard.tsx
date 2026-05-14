// Depth layer — glass effect rhymes with hero orb material
// Subtle, never competes with the star of the show
// Used consistently across features, vendor cards, admin rows

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div className={`
      rounded-2xl border border-[#F5ECD7]/10
      bg-white/5 backdrop-blur-sm
      ${hover ? 'hover:bg-white/10 hover:border-[#F5ECD7]/20 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
