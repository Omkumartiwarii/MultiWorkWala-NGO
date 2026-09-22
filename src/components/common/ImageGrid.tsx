import { Reveal } from "@/components/common/Reveal";
import type { ImageAsset } from "@/types";

/** Simple responsive image grid for detail-page galleries. The full Gallery page adds a lightbox. */
export function ImageGrid({ images }: { images: ImageAsset[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {images.map((image, index) => (
        <li key={`${image.src}-${index}`}>
          <Reveal delay={index * 0.08}>
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
