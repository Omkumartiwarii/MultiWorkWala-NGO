// DEMO DATA — REPLACE WITH VERIFIED ORGANIZATION DATA
import type { ImpactStat } from "@/types";

export const impactStats: ImpactStat[] = [
  { id: "lives", label: "Lives impacted", value: 10000, suffix: "+", icon: "lives" },
  { id: "communities", label: "Communities reached", value: 25, suffix: "+", icon: "communities" },
  { id: "projects", label: "Projects", value: 50, suffix: "+", icon: "projects" },
  { id: "volunteers", label: "Volunteers", value: 500, suffix: "+", icon: "volunteers" },
  { id: "programs", label: "Programs", value: 15, suffix: "+", icon: "programs" },
  { id: "partners", label: "Partner organizations", value: 20, suffix: "+", icon: "partners" },
];

export function getImpactStat(id: string): ImpactStat {
  const stat = impactStats.find((item) => item.id === id);
  if (!stat) throw new Error(`Unknown impact stat: ${id}`);
  return stat;
}
