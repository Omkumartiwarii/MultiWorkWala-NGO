import { mockRequest } from "@/api/mock";
import { events } from "@/data/events";
import { isFuture } from "@/utils/date";
import type { NgoEvent } from "@/types";

export const eventService = {
  getUpcoming(limit = 3): Promise<NgoEvent[]> {
    const upcoming = events
      .filter((event) => isFuture(event.startsAt))
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
      .slice(0, limit);
    return mockRequest(upcoming);
  },
};
