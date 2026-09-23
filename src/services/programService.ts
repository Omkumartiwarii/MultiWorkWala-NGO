import { apiClient } from "@/api/client";
import type { Program } from "@/types";

export const programService = {
  getAll(): Promise<Program[]> {
    return apiClient.getList("/programs/");
  },

  getFeatured(limit = 3): Promise<Program[]> {
    return apiClient.getList(`/programs/featured/?limit=${limit}`);
  },

  /** Resolves to null when no program has this slug. */
  getBySlug(slug: string): Promise<Program | null> {
    return apiClient.get(`/programs/${encodeURIComponent(slug)}/`);
  },

  /** Same-category programs first, then others. */
  getRelated(slug: string, limit = 3): Promise<Program[]> {
    return apiClient.getList(`/programs/${encodeURIComponent(slug)}/related/?limit=${limit}`);
  },
};
