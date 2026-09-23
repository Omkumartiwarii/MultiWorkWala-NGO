import { apiClient } from "@/api/client";
import type { ContactEnquiry, Donation, VolunteerApplication } from "@/types";

export type ContactSubmission = ContactEnquiry;

export const submissionService = {
  submitVolunteer(application: VolunteerApplication): Promise<void> {
    return apiClient.post("/volunteers/", {
      full_name: application.fullName,
      email: application.email,
      phone: application.phone,
      city: application.city,
      state: application.state,
      interests: application.interests,
      skills: application.skills,
      availability: application.availability,
      experience: application.experience,
      message: application.message,
    }).then(() => undefined);
  },
  submitContact(enquiry: ContactSubmission): Promise<void> {
    return apiClient.post("/contact/", enquiry).then(() => undefined);
  },
  createDonation(donation: Donation): Promise<Donation> {
    return apiClient.post<Donation>("/donations/create/", {
      amount: donation.amount,
      frequency: donation.frequency,
      full_name: donation.donor.fullName,
      email: donation.donor.email,
      phone: donation.donor.phone ?? "",
      anonymous: donation.anonymous ?? false,
      message: donation.message ?? "",
      purpose: donation.purpose ?? "General support",
    });
  },
  completeDemoDonation(orderId: string, outcome: "success" | "failed" | "cancelled"): Promise<Donation> {
    const path = outcome === "success" ? "demo-success" : outcome === "failed" ? "demo-failed" : "demo-cancel";
    return apiClient.post<Donation>(`/donations/${path}/`, { order_id: orderId });
  },
};