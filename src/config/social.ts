export type SocialPlatform = "linkedin" | "instagram" | "facebook" | "youtube" | "x";

/** Add only verified organization profiles here. */
export const socialLinks: Partial<Record<SocialPlatform, string>> = {};

export const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
};
