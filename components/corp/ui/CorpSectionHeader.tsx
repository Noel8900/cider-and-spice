interface CorpSectionHeaderProps {
  eyebrow:   string;
  title:     string;
  subtitle?: string;
  align?:    'left' | 'center';
  light?:    boolean; // true = lighter title treatment
}

export default function CorpSectionHeader({
  eyebrow,
  title,
  subtitle,
  align   = 'center',
  light   = false,
}: CorpSectionHeaderProps) {
  const alignClass = align === 'center'
    ? 'text-center items-center mx-auto'
    : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-4 mb-16 ${alignClass} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      {/* Gold eyebrow line + label */}
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="block h-px w-8 bg-corp-gold" />
        <span className="font-label text-xs tracking-[0.25em] uppercase text-corp-gold">
          {eyebrow}
        </span>
        <span className="block h-px w-8 bg-corp-gold" />
      </div>

      {/* Title */}
      <h2
        className={`font-corp-display text-4xl md:text-5xl leading-tight ${
          light ? 'text-corp-platinum/90 font-light' : 'text-corp-platinum font-medium'
        }`}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="font-sans text-base leading-relaxed text-corp-steel max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
