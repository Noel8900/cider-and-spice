// Reusable field wrapper for dark-bg forms (investors, cider club).
// Vendor form uses lightInput for its light-theme Card layout.

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
        className="mb-1.5 block text-sm font-semibold text-cream/80"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-ember" aria-label="required">*</span>
        )}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-xs text-cream/40">
          {hint}
        </p>
      )}
    </div>
  );
}

// Shared input class string for dark-bg form fields (investors, cider-club).
// Import and spread where needed: className={darkInput}
export const darkInput =
  'block w-full rounded-xl border border-cream/20 bg-white/5 px-4 py-3 ' +
  'text-sm text-cream placeholder-cream/30 ' +
  'transition-colors focus:border-ember/60 focus:outline-none ' +
  'focus:ring-2 focus:ring-ember/20 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

// Shared input class string for light-bg form fields (vendor application).
// Import and spread where needed: className={lightInput}
export const lightInput =
  'block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 ' +
  'placeholder-gray-400 shadow-sm transition-colors ' +
  'focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/20 ' +
  'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed';
