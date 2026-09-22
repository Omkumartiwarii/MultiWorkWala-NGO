import { useId } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  /** Accessible name, also used as placeholder, e.g. "Search programs". */
  label: string;
}

export function SearchBar({ value, onChange, label }: SearchBarProps) {
  const id = useId();

  return (
    <div role="search" className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-500" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        autoComplete="off"
        className="h-12 w-full rounded-full border border-navy-900/20 bg-white pr-12 pl-12 text-base text-navy-900 transition-colors placeholder:text-ink-500/70 hover:border-navy-900/40 focus-visible:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-500/40 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-ink-500 transition-colors hover:bg-navy-900/5 hover:text-navy-900"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
