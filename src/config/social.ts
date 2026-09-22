export type SocialPlatform = "linkedin" | "instagram" | "facebook" | "youtube" | "x";

/**
 * PLACEHOLDER VALUES. These are generic platform home pages, not official
 * accounts. Replace each with the organization's verified profile URL.
 */
export const socialLinks: Record<SocialPlatform, string> = {
  linkedin: "https://linkedin.com/",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",
  x: "https://x.com/",
};

export const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
};
