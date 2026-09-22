import { mockRequest } from "@/api/mock";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types";

export const testimonialService = {
  getFeatured(limit = 3): Promise<Testimonial[]> {
    return mockRequest(testimonials.slice(0, limit));
  },

  getByProgram(programSlug: string): Promise<Testimonial[]> {
    return mockRequest(testimonials.filter((item) => item.programSlug === programSlug));
  },
};
