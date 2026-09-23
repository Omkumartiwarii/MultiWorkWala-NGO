import type { ReactNode } from "react";
import { StatCard } from "@/components/cards/StatCard";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { IconName, LabelledStat } from "@/types";

interface StatsBandProps {
  id: string;
  title: string;
  description?: string;
  stats: (LabelledStat & { icon?: IconName })[];
  action?: ReactNode;
}

/** Navy band of headline figures. Used for program statistics and impact overviews. */
export function StatsBand({ id, title, description, stats, action }: StatsBandProps) {
  return (
    <Section tone="navy" labelledBy={id}>
      <SectionHeading id={id} tone="dark" title={title} description={description} action={action} />
      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, index) => (
          <li key={stat.label} className={stats.length <= 3 ? "lg:col-span-2" : undefined}>
            <Reveal delay={index * 0.06}>
              <StatCard stat={stat} tone="dark" />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
