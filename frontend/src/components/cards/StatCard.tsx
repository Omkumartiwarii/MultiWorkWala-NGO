import { ImpactCounter } from "@/components/common/ImpactCounter";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/utils/cn";
import type { ImpactStat } from "@/types";

interface StatCardProps {
  stat: Pick<ImpactStat, "label" | "value" | "suffix"> & { icon?: ImpactStat["icon"] };
  /** Use "dark" on navy backgrounds. */
  tone?: "light" | "dark";
}

export function StatCard({ stat, tone = "light" }: StatCardProps) {
  const dark = tone === "dark";

  return (
    <div className="flex flex-col items-start gap-3">
      {stat.icon && (
        <span className={cn("grid size-11 place-items-center rounded-xl", dark ? "bg-white/10 text-gold-300" : "bg-brand-50 text-brand-700")}>
          <Icon name={stat.icon} className="size-5" />
        </span>
      )}
      <p className={cn("font-display text-3xl font-medium lg:text-[2.1rem]", dark ? "text-ivory-50" : "text-navy-900")}>
        <ImpactCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className={cn("text-sm font-medium", dark ? "text-navy-200" : "text-ink-500")}>{stat.label}</p>
    </div>
  );
}
