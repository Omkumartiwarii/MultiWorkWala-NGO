import { apiClient } from "@/api/client";
import type { NgoEvent } from "@/types";

export const eventService = {
  getAll(): Promise<NgoEvent[]> {
    return apiClient.getList("/events/");
  },

  getBySlug(slug: string): Promise<NgoEvent | null> {
    return apiClient.get(`/events/${encodeURIComponent(slug)}/`);
  },

  getUpcoming(limit = 3): Promise<NgoEvent[]> {
    return apiClient.getList(`/events/upcoming/?limit=${limit}`);
  },
};
