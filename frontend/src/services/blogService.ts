import { apiClient } from "@/api/client";
import type { BlogPost } from "@/types";

export const blogService = {
  getAll(): Promise<BlogPost[]> {
    return apiClient.getList("/news/");
  },

  getBySlug(slug: string): Promise<BlogPost | null> {
    return apiClient.get(`/news/${encodeURIComponent(slug)}/`);
  },

  getLatest(limit = 3): Promise<BlogPost[]> {
    return apiClient.getList(`/news/?page_size=${limit}`);
  },
};
