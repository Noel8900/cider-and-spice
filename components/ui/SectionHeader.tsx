// Opacity hierarchy applied: title 100%, subtitle 60%
// Anchor font on title, support font on subtitle — matches video tip 1

interface SectionHeaderProps {
  id?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export default function SectionHeader({
  id, badge, title, subtitle, align = 'center'
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`mb-16 max-w-2xl ${alignment}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest
                         uppercase border border-[#C4622D]/40 rounded-full text-[#C4622D]">
          {badge}
        </span>
      )}
      {/* Anchor font, 100% opacity — star of the show for each section */}
      <h2 id={id} className="font-serif text-4xl md:text-5xl font-bold text-[#F5ECD7] leading-tight mb-4"
          style={{ opacity: 'var(--opacity-high)' }}>
        {title}
      </h2>
      {subtitle && (
        /* Support font, 60% opacity — secondary hierarchy */
        <p className="font-sans text-lg text-[#F5ECD7] leading-relaxed"
           style={{ opacity: 'var(--opacity-low)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
