import { mockRequest } from "@/api/mock";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

export const projectService = {
  getAll(): Promise<Project[]> {
    return mockRequest(projects);
  },

  getFeatured(limit = 3): Promise<Project[]> {
    return mockRequest(projects.filter((project) => project.featured).slice(0, limit));
  },

  /** Resolves to null when no project has this slug. */
  getBySlug(slug: string): Promise<Project | null> {
    return mockRequest(projects.find((project) => project.slug === slug) ?? null);
  },

  /** Same-category projects first, then others. */
  getRelated(slug: string, limit = 3): Promise<Project[]> {
    const current = projects.find((project) => project.slug === slug);
    const others = projects.filter((project) => project.slug !== slug);
    others.sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category));
    return mockRequest(others.slice(0, limit));
  },
};
