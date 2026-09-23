import { apiClient } from "@/api/client";
import type { Project } from "@/types";

export const projectService = {
  getAll(): Promise<Project[]> {
    return apiClient.getList("/projects/");
  },

  getFeatured(limit = 3): Promise<Project[]> {
    return apiClient.getList(`/projects/featured/?limit=${limit}`);
  },

  /** Resolves to null when no project has this slug. */
  getBySlug(slug: string): Promise<Project | null> {
    return apiClient.get(`/projects/${encodeURIComponent(slug)}/`);
  },

  /** Same-category projects first, then others. */
  getRelated(slug: string, limit = 3): Promise<Project[]> {
    return apiClient.getList(`/projects/${encodeURIComponent(slug)}/related/?limit=${limit}`);
  },
};
