import { mockRequest } from "@/api/mock";
import { programs } from "@/data/programs";
import type { Program } from "@/types";

export const programService = {
  getAll(): Promise<Program[]> {
    return mockRequest(programs);
  },

  getFeatured(limit = 3): Promise<Program[]> {
    return mockRequest(programs.filter((program) => program.featured).slice(0, limit));
  },

  /** Resolves to null when no program has this slug. */
  getBySlug(slug: string): Promise<Program | null> {
    return mockRequest(programs.find((program) => program.slug === slug) ?? null);
  },

  /** Same-category programs first, then others. */
  getRelated(slug: string, limit = 3): Promise<Program[]> {
    const current = programs.find((program) => program.slug === slug);
    const others = programs.filter((program) => program.slug !== slug);
    others.sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category));
    return mockRequest(others.slice(0, limit));
  },
};
