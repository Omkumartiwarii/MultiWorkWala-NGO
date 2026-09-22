import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { archShape } from "@/utils/styles";
import type { ImageAsset } from "@/types";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  /** Small label above the title (for example a category). */
  eyebrow?: string;
  /** When set, shows an arch-framed image beside the text on large screens. */
  image?: ImageAsset;
  /** Buttons or meta shown under the description. */
  children?: ReactNode;
}

/** Shared hero for every inner page: breadcrumb, h1, supporting text and optional image. */
export function PageHero({ title, description, breadcrumbs, eyebrow, image, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-navy-950 pt-8 pb-16 text-ivory-100 sm:pb-20 lg:pt-10 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-brand-600/25 blur-3xl" />
        <div className="absolute -right-24 -bottom-32 size-[26rem] rounded-full bg-gold-500/15 blur-3xl" />
      </div>

      <Container>
        <Breadcrumb items={breadcrumbs} tone="dark" />
        <div className={image ? "mt-10 grid items-center gap-12 lg:grid-cols-12" : "mt-10"}>
          <Reveal className={image ? "lg:col-span-7" : "max-w-3xl"}>
            {eyebrow && (
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-gold-300">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                {eyebrow}
              </p>
            )}
            <h1 id="page-title" className="text-4xl leading-[1.1] font-medium text-ivory-50 sm:text-5xl">
              {title}
            </h1>
            {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">{description}</p>}
            {children && <div className="mt-8">{children}</div>}
          </Reveal>

          {image && (
            <Reveal delay={0.1} className="hidden lg:col-span-5 lg:block">
              <img
                src={image.src}
                alt={image.alt}
                fetchPriority="high"
                decoding="async"
                className={`mx-auto aspect-[4/5] w-full max-w-sm border border-white/10 object-cover shadow-2xl ${archShape}`}
              />
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
