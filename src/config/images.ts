import type { ImageAsset } from "@/types";

const IMAGE_BASE_PATH = "/images";

/**
 * Every image in the project is created through this helper, so replacing the
 * abstract placeholder artwork with real photography means changing a filename
 * (or this one function). Placeholder artwork does not depict real people.
 */
export function placeholderImage(name: string, alt: string): ImageAsset {
  return { src: `${IMAGE_BASE_PATH}/${name}.svg`, alt };
}
