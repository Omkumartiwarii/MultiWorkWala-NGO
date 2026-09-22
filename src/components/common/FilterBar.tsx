import { cn } from "@/utils/cn";

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface FilterBarProps<T extends string> {
  /** Accessible name for the group, e.g. "Filter by category". */
  label: string;
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Single-choice filter chips. Uses aria-pressed toggle buttons, so keyboard and screen readers work natively. */
export function FilterBar<T extends string>({ label, options, value, onChange }: FilterBarProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
              selected
                ? "border-navy-900 bg-navy-900 text-ivory-50"
                : "border-navy-900/20 bg-white text-navy-900 hover:border-navy-900/50",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
