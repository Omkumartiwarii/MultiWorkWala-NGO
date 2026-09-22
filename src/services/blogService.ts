import { mockRequest } from "@/api/mock";
import { blogPosts } from "@/data/blogs";
import type { BlogPost } from "@/types";

export const blogService = {
  getLatest(limit = 3): Promise<BlogPost[]> {
    const latest = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit);
    return mockRequest(latest);
  },
};
