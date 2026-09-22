import { ROUTES } from "@/constants/routes";
import type { DonationFrequency } from "@/types";

interface DonateUrlOptions {
  amount?: number | null;
  frequency?: DonationFrequency;
}

/** Builds a /donate link that pre-fills the donation form. */
export function donateUrl({ amount, frequency }: DonateUrlOptions = {}): string {
  const params = new URLSearchParams();
  if (amount) params.set("amount", String(amount));
  if (frequency) params.set("frequency", frequency);
  const query = params.toString();
  return query ? `${ROUTES.donate}?${query}` : ROUTES.donate;
}
