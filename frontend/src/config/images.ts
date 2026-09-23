import type { ImageAsset } from "@/types";
import { getNgoImage, type NgoImageName } from "@/config/ngoImages";

const IMAGE_BASE_PATH = "/images";

/**
 * Every image in the project is created through this helper, so approved
 * production assets can replace temporary artwork without changing components.
 */
export function placeholderImage(name: string, alt: string): ImageAsset {
  if (name in ngoImageNames) return getNgoImage(name as NgoImageName);
  return { src: `${IMAGE_BASE_PATH}/${name}.svg`, alt };
}

const ngoImageNames: Record<NgoImageName, true> = {
  "hero-community": true,
  "about-community": true,
  "about-community1": true,
  "children-1": true,
  "children-2": true,
  "education-1": true,
  "education-2": true,
  "healthcare-1": true,
  "healthcare-2": true,
  "women-1": true,
  "women-2": true,
  "environment-1": true,
  "environment-2": true,
  "community-1": true,
  "community-2": true,
  "volunteers-1": true,
  "volunteers-2": true,
  "events-1": true,
  "events-2": true,
  "leadership-1": true,
  "leadership-2": true,
  "impact-story": true,
};
