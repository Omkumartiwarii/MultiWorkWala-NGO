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
  submitDonation(donation: Donation): Promise<void> {
    return apiClient.post("/donations/", {
      amount: donation.amount,
      frequency: donation.frequency,
      full_name: donation.donor.fullName,
      email: donation.donor.email,
      phone: donation.donor.phone ?? "",
      purpose: donation.purpose ?? "General support",
    }).then(() => undefined);
  },
};