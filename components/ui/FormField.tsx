// Reusable field wrapper for dark-bg forms (investors, cider club).
// Vendor form keeps its own light-theme Field component.

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
        className="mb-1.5 block text-sm font-semibold text-[#F5ECD7]"
        style={{ opacity: 0.80 }}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-[#C4622D]" aria-label="required">*</span>
        )}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-xs text-[#F5ECD7]" style={{ opacity: 0.40 }}>
          {hint}
        </p>
      )}
    </div>
  );
}

// Shared input class string for dark-bg form fields.
// Import and spread where needed: className={darkInput}
export const darkInput =
  'block w-full rounded-xl border border-[#F5ECD7]/20 bg-white/5 px-4 py-3 ' +
  'text-sm text-[#F5ECD7] placeholder-[#F5ECD7]/30 ' +
  'transition-colors focus:border-[#C4622D]/60 focus:outline-none ' +
  'focus:ring-2 focus:ring-[#C4622D]/20 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';
