export const donationConfig = {
  upiId: import.meta.env.VITE_DONATION_UPI_ID || "8700740710@ybl",
  payeeName: import.meta.env.VITE_DONATION_PAYEE_NAME || "MultiWorkWala Pvt. Ltd.",
  currency: "INR",
} as const;

export function buildUpiUri(amount: number, frequency: "one-time" | "monthly"): string {
  const params = new URLSearchParams({
    pa: donationConfig.upiId,
    pn: donationConfig.payeeName,
    am: amount.toFixed(2),
    cu: donationConfig.currency,
    tn: frequency === "monthly" ? "Monthly donation enquiry" : "Donation to MultiWorkWala Pvt. Ltd.",
  });
  return `upi://pay?${params.toString()}`;
}
