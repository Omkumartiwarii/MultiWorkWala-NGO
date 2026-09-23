import { apiClient } from "@/api/client";
import type { NewsletterSubscription } from "@/types";

export const newsletterService = {
  async subscribe(subscription: NewsletterSubscription): Promise<void> {
    await apiClient.post("/newsletter/", subscription);
  },
};
