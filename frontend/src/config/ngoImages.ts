import type { ImageAsset } from "@/types";

export type NgoImageName =
  | "hero-community"
  | "about-community"
  | "about-community1"
  | "children-1"
  | "children-2"
  | "education-1"
  | "education-2"
  | "healthcare-1"
  | "healthcare-2"
  | "women-1"
  | "women-2"
  | "environment-1"
  | "environment-2"
  | "community-1"
  | "community-2"
  | "volunteers-1"
  | "volunteers-2"
  | "events-1"
  | "events-2"
  | "leadership-1"
  | "leadership-2"
  | "impact-story";

const NGO_IMAGE_BASE = "/images/ngo";
const SVG_FALLBACK_BASE = "/images";

const altText: Record<NgoImageName, string> = {
  "hero-community": "Volunteers speaking with local community members outdoors",
  "about-community": "NGO workers listening with families during a community visit",
  "about-community1": "Community members and NGO workers sharing a conversation outdoors",
  "children-1": "Children reading together during a community learning activity",
  "children-2": "Children participating in a welcoming classroom learning session",
  "education-1": "Teacher helping children with books in an NGO-supported classroom",
  "education-2": "Young people learning digital skills together with a facilitator",
  "healthcare-1": "Health worker speaking with a family at a community health camp",
  "healthcare-2": "Doctor providing basic consultation during a local health awareness camp",
  "women-1": "Women learning practical skills together during a community workshop",
  "women-2": "Women collaborating on a livelihood activity in a local training space",
  "environment-1": "Community volunteers planting a young tree together",
  "environment-2": "Residents working together during a neighbourhood cleanliness activity",
  "community-1": "Volunteers distributing information and support during community outreach",
  "community-2": "Local residents and volunteers discussing a neighbourhood improvement activity",
  "volunteers-1": "NGO volunteers preparing materials together for a community activity",
  "volunteers-2": "Volunteers collaborating with community members during an outreach session",
  "events-1": "Community members taking part in an NGO learning and awareness event",
  "events-2": "A diverse group participating in a local community workshop",
  "leadership-1": "NGO team members reviewing a community program together",
  "leadership-2": "NGO staff discussing plans around a table in a modest office",
  "impact-story": "A warm moment between a community participant and an NGO worker",
};

export const ngoImages: Record<NgoImageName, ImageAsset> = Object.fromEntries(
  (Object.keys(altText) as NgoImageName[]).map((name) => [
    name,
    {
      src: `${NGO_IMAGE_BASE}/${name}.webp`,
      fallbackSrc: `${SVG_FALLBACK_BASE}/${name}.svg`,
      alt: altText[name],
      objectPosition: "center",
    },
  ]),
) as Record<NgoImageName, ImageAsset>;

export function getNgoImage(name: NgoImageName, alt = ngoImages[name].alt): ImageAsset {
  return { ...ngoImages[name], alt };
}
