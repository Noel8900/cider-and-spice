interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export default function FormField({ id, label, required, hint, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-label text-[9px] tracking-[0.2em] uppercase text-cream/50 mb-2 block"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-gold/60" aria-label="required">*</span>
        )}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 font-sans text-xs text-cream/30">
          {hint}
        </p>
      )}
    </div>
  );
}

// Luxury dark input — gold focus ring, sharp corners, dark translucent bg.
export const darkInput =
  'block w-full border border-cream/20 bg-white/[0.03] px-5 py-4 ' +
  'font-sans text-sm text-cream placeholder-cream/25 ' +
  'transition-colors focus:border-gold/40 focus:outline-none ' +
  'focus:ring-1 focus:ring-gold/15 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

