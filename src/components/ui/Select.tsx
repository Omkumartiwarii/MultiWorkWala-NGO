import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface SelectProps extends ComponentProps<"select"> {
  invalid?: boolean;
}

/** Native select (best mobile and screen reader behaviour) with a custom chevron. */
export function Select({ className, invalid, children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(
          "h-12 w-full appearance-none rounded-xl border bg-white pr-11 pl-4 text-base text-navy-900",
          "transition-colors focus-visible:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-500/40",
          invalid ? "border-red-600" : "border-navy-900/20 hover:border-navy-900/40",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-500" />
    </div>
  );
}
