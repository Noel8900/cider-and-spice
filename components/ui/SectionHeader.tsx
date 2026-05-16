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
                         uppercase border border-ember/40 rounded-full text-ember">
          {badge}
        </span>
      )}
      {/* Anchor font, 100% opacity — star of the show for each section */}
      <h2 id={id} className="font-serif text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        /* Support font, 60% opacity — secondary hierarchy */
        <p className="font-sans text-lg text-cream/60 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
