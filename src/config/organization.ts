import { socialLinks } from "./social";

/**
 * Centralised organization details.
 *
 * Contact values are carried over from the existing multiworkwala.com website
 * as a reference. Because this is a separate NGO/Trust initiative, confirm or
 * replace each of them before launch.
 */
export const organization = {
  name: "MultiWorkWala",
  descriptor: "Social Impact Initiative",
  tagline: "Creating opportunities. Transforming communities.",
  email: "info@multiworkwala.com",
  phone: "9810987894",
  phoneHref: "tel:+919810987894",
  address: {
    lines: ["Office No. 404, Fourth Floor,", "H-159, H Block, Sector-63,", "Noida, Uttar Pradesh – 201301"],
  },
  logo: "/favicon.svg",
  socialLinks,
} as const;
