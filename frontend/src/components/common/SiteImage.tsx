import type { ComponentProps } from "react";
import type { ImageAsset } from "@/types";

interface SiteImageProps extends Omit<ComponentProps<"img">, "alt" | "src"> {
  image: ImageAsset;
}

/** Requests production WebP assets and falls back to the original illustration until they exist. */
export function SiteImage({ image, onError, style, ...props }: SiteImageProps) {
  return (
    <img
      {...props}
      src={image.src}
      alt={image.alt}
      style={{ objectPosition: image.objectPosition ?? "center", ...style }}
      onError={(event) => {
        const target = event.currentTarget;
        if (image.fallbackSrc && target.src !== new URL(image.fallbackSrc, window.location.href).href) {
          target.src = image.fallbackSrc;
          target.onerror = null;
        }
        onError?.(event);
      }}
    />
  );
}