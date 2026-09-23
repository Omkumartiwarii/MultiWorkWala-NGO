import { z } from "zod";

export const newsletterSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Enter a valid email address, like name@example.com."),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(40, "Please enter a shorter phone number.").optional(),
  subject: z.string().trim().min(3, "Please enter a subject."),
  message: z.string().trim().min(10, "Please enter at least 10 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const volunteerSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  city: z.string().trim().min(2, "Please enter your city."),
  state: z.string().trim().min(2, "Please enter your state."),
  interests: z.string().trim().min(2, "Please tell us your interests."),
  skills: z.string().trim().min(2, "Please tell us about your skills."),
  availability: z.string().trim().min(2, "Please share your availability."),
  experience: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;
