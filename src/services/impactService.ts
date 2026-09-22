import { mockRequest } from "@/api/mock";
import { impactStats } from "@/data/impact";
import type { ImpactStat } from "@/types";

export const impactService = {
  getStats(): Promise<ImpactStat[]> {
    return mockRequest(impactStats);
  },
};
