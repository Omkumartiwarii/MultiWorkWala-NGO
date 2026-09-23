import { apiClient } from "@/api/client";
import type { Testimonial } from "@/types";

export const testimonialService = {
  getFeatured(limit = 3): Promise<Testimonial[]> {
    return apiClient.getList(`/testimonials/?page_size=${limit}`);
  },

  getByProgram(programSlug: string): Promise<Testimonial[]> {
    return apiClient.getList(`/testimonials/?program_slug=${encodeURIComponent(programSlug)}`);
  },
};
