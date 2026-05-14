// Visual rhyme anchor — terracotta pill repeats across hero, cards, nav, forms
// Same shape language used everywhere = cohesion without repetition

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ember' | 'grove' | 'muted';
}

const variants = {
  ember: 'text-[#C4622D] border-[#C4622D]/30 bg-[#C4622D]/10',
  grove: 'text-[#2D5016] border-[#2D5016]/30 bg-[#2D5016]/10',
  muted: 'text-[#F5ECD7]/50 border-[#F5ECD7]/15 bg-white/5',
};

export default function Badge({ children, variant = 'ember' }: BadgeProps) {
  return (
    <span className={`inline-block px-4 py-1.5 text-xs font-semibold tracking-widest
                      uppercase border rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}
