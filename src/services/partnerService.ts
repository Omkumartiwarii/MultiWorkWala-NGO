import { mockRequest } from "@/api/mock";
import { partners } from "@/data/partners";
import type { Partner } from "@/types";

export const partnerService = {
  getAll(): Promise<Partner[]> {
    return mockRequest(partners);
  },
};
