// DEMO DATA — REPLACE WITH THE ORGANIZATION'S ACTUAL FOCUS AREAS
import type { FocusArea, FocusAreaId } from "@/types";

export const focusAreas: FocusArea[] = [
  {
    id: "education",
    shortTitle: "Education",
    title: "Education & Learning",
    description: "Supporting accessible education and learning opportunities.",
    icon: "graduation",
  },
  {
    id: "healthcare",
    shortTitle: "Healthcare",
    title: "Healthcare & Wellbeing",
    description: "Improving access to essential healthcare and wellbeing resources.",
    icon: "health",
  },
  {
    id: "women",
    shortTitle: "Women",
    title: "Women Empowerment",
    description: "Supporting women through opportunity, education and economic participation.",
    icon: "women",
  },
  {
    id: "children",
    shortTitle: "Children",
    title: "Child Welfare",
    description: "Supporting children through education, safety and development.",
    icon: "children",
  },
  {
    id: "community",
    shortTitle: "Community",
    title: "Community Development",
    description: "Strengthening communities through sustainable local initiatives.",
    icon: "community",
  },
  {
    id: "environment",
    shortTitle: "Environment",
    title: "Environment",
    description: "Promoting responsible environmental awareness and action.",
    icon: "environment",
  },
];

export function getFocusArea(id: FocusAreaId): FocusArea {
  const area = focusAreas.find((item) => item.id === id);
  if (!area) throw new Error(`Unknown focus area: ${id}`);
  return area;
}
