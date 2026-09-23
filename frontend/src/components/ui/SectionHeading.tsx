import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use "dark" on navy backgrounds. */
  tone?: "light" | "dark";
  /** Optional action (usually a "View all" link) shown beside the heading on wide screens. */
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  action,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div
      className={cn(action ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between" : undefined, className)}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow && (
          <p
            className={cn(
              "mb-4 flex items-center gap-3 text-sm font-semibold",
              centered && "justify-center",
              dark ? "text-gold-300" : "text-gold-700",
            )}
          >
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className={cn("text-3xl leading-[1.12] font-medium sm:text-4xl lg:text-[2.6rem]", dark && "text-ivory-50")}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-navy-200" : "text-ink-500")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
