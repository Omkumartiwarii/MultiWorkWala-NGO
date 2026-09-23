import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { WorkStatus } from "@/types";

const tones = {
  glass: "bg-white/90 text-navy-900 backdrop-blur",
  brand: "bg-brand-50 text-brand-800",
  gold: "bg-gold-100 text-gold-700",
  navy: "bg-navy-50 text-navy-800",
} as const;

interface BadgeProps {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}

export function Badge({ tone = "brand", className, children }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", tones[tone], className)}
    >
      {children}
    </span>
  );
}

const statusTone: Record<WorkStatus, keyof typeof tones> = {
  ongoing: "brand",
  completed: "navy",
  upcoming: "gold",
};

const statusLabel: Record<WorkStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  upcoming: "Upcoming",
};

export function StatusBadge({ status, className }: { status: WorkStatus; className?: string }) {
  return (
    <Badge tone={statusTone[status]} className={cn("shadow-sm", className)}>
      {statusLabel[status]}
    </Badge>
  );
}
