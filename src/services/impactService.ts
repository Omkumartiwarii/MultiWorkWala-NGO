import { apiClient } from "@/api/client";
import type { ImpactStat } from "@/types";

export const impactService = {
  getStats(): Promise<ImpactStat[]> {
    return apiClient.getList("/impact/");
  },
};
