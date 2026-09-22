import { mockRequest } from "@/api/mock";
import { teamMembers } from "@/data/team";
import type { TeamMember } from "@/types";

export const teamService = {
  getLeadership(limit = 4): Promise<TeamMember[]> {
    return mockRequest(teamMembers.slice(0, limit));
  },
};
