import { mockRequest } from "@/api/mock";
import type { NewsletterSubscription } from "@/types";

export const newsletterService = {
  /**
   * Frontend-only: nothing is sent or stored.
   * FUTURE: POST the subscription to the backend newsletter endpoint.
   */
  async subscribe(subscription: NewsletterSubscription): Promise<void> {
    await mockRequest(subscription, 700);
  },
};
