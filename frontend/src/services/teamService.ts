import { apiClient } from "@/api/client";
import type { TeamMember } from "@/types";

export const teamService = {
  getLeadership(limit = 4): Promise<TeamMember[]> {
    return apiClient.getList(`/team/?page_size=${limit}`);
  },
};
