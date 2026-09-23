import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends ComponentProps<"article"> {
  /** Raises the card on hover. Turn off for cards that contain their own buttons. */
  lift?: boolean;
}

/**
 * Base card. Pair with `stretchedLink` on the card's main link so the whole
 * card is clickable while keyboard users get a single focus stop.
 */
export function Card({ className, lift = true, ...rest }: CardProps) {
  return (
    <article
      className={cn(
        "group relative rounded-2xl border border-navy-900/10 bg-white shadow-card transition duration-300",
        lift && "hover:-translate-y-1 hover:shadow-lift",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500 has-[:focus-visible]:ring-offset-2",
        className,
      )}
      {...rest}
    />
  );
}
