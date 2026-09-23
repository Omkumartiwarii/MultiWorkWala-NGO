import { apiClient } from "@/api/client";
import type { Partner } from "@/types";

export const partnerService = {
  getAll(): Promise<Partner[]> {
    return apiClient.getList("/partners/");
  },
};
