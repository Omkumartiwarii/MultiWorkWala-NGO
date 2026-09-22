import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  invalid?: boolean;
}

export function Input({ className, invalid, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "h-12 w-full rounded-xl border bg-white px-4 text-base text-navy-900 placeholder:text-ink-500/70",
        "transition-colors focus-visible:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-500/40",
        invalid ? "border-red-600" : "border-navy-900/20 hover:border-navy-900/40",
        className,
      )}
      {...rest}
    />
  );
}
