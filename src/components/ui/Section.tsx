import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Container } from "./Container";

const tones = {
  ivory: "bg-ivory-100",
  white: "bg-white",
  sand: "bg-ivory-200",
  navy: "bg-navy-950 text-ivory-100",
} as const;

const spacings = {
  default: "py-20 sm:py-24 lg:py-28",
  compact: "py-12 lg:py-14",
} as const;

export type SectionTone = keyof typeof tones;

interface SectionProps {
  id?: string;
  /** id of the section's heading, for an accessible name. */
  labelledBy?: string;
  tone?: SectionTone;
  spacing?: keyof typeof spacings;
  className?: string;
  children: ReactNode;
}

export function Section({ id, labelledBy, tone = "ivory", spacing = "default", className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], spacings[spacing], className)}>
      <Container>{children}</Container>
    </section>
  );
}
