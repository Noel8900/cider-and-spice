// Editorial luxury section header.
// Replaces the pill badge with a thin gold rule + label.
// Uses Cormorant Garamond (font-corp-display) for display headlines.
// Opacity hierarchy: label 50%, title 100%, subtitle 55%.

interface SectionHeaderProps {
  id?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  light?: boolean; // light variant for dark-on-light sections
}

export default function SectionHeader({
  id, badge, title, subtitle, align = 'center', light = false,
}: SectionHeaderProps) {
  const isCentered = align === 'center';
  const textColor  = light ? 'text-bg' : 'text-cream';
  const subColor   = light ? 'text-bg/55' : 'text-cream/55';
  const labelColor = light ? 'text-ember' : 'text-gold';
  const ruleColor  = light ? 'bg-ember' : 'bg-gold';

  return (
    <div className={`mb-16 ${isCentered ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'}`}>
      {badge && (
        <div className={`flex items-center gap-3 mb-6 ${isCentered ? 'justify-center' : ''}`}>
          <span className={`block h-px w-8 ${ruleColor} shrink-0`} />
          <span className={`font-label text-[10px] tracking-[0.3em] uppercase ${labelColor}`}>
            {badge}
          </span>
        </div>
      )}

      <h2
        id={id}
        className={`font-corp-display text-5xl md:text-6xl lg:text-7xl font-light ${textColor} leading-[0.95] tracking-tight mb-6`}
      >
        {title}
      </h2>

      {subtitle && (
        <p className={`font-sans text-base leading-relaxed ${subColor} max-w-xl ${isCentered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
