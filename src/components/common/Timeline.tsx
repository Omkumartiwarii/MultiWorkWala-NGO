import { Check } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Milestone } from "@/types";

const stateLabel: Record<Milestone["state"], string> = {
  done: "Completed",
  current: "In progress",
  next: "Upcoming",
};

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol>
      {milestones.map((milestone, index) => {
        const last = index === milestones.length - 1;
        return (
          <li key={milestone.label} className="relative flex gap-4 pb-8 last:pb-0">
            {!last && (
              <span
                aria-hidden="true"
                className={cn("absolute top-8 left-[0.95rem] h-[calc(100%-2rem)] w-px", milestone.state === "done" ? "bg-brand-500" : "bg-navy-900/15")}
              />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-2",
                milestone.state === "done" && "border-brand-500 bg-brand-500 text-white",
                milestone.state === "current" && "border-gold-500 bg-gold-100",
                milestone.state === "next" && "border-navy-900/20 bg-white",
              )}
            >
              {milestone.state === "done" && <Check className="size-4" />}
              {milestone.state === "current" && <span className="size-2.5 rounded-full bg-gold-600" />}
            </span>
            <div className="pt-1">
              <p className="font-semibold text-navy-900">{milestone.label}</p>
              <p className="text-sm text-ink-500">{stateLabel[milestone.state]}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
