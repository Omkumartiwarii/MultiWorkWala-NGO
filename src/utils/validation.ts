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
