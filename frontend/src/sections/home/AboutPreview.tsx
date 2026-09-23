import { Reveal } from "@/components/common/Reveal";
import { SiteImage } from "@/components/common/SiteImage";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { aboutPreviewContent as content } from "@/data/homeContent";
import { archShape } from "@/utils/styles";

export function AboutPreview() {
  return (
    <Section labelledBy="about-heading">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative">
            <div
              aria-hidden="true"
              className={`absolute -right-4 -bottom-4 size-full border-2 border-gold-400/60 sm:-right-6 sm:-bottom-6 ${archShape}`}
            />
            <SiteImage
              image={content.image}
              loading="lazy"
              decoding="async"
              className={`relative aspect-4/5 w-full object-cover shadow-card ${archShape}`}
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading
            id="about-heading"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
          <blockquote className="mt-8 border-l-4 border-gold-400 pl-6">
            <p className="font-display text-xl leading-snug text-navy-900 sm:text-2xl">{content.mission}</p>
          </blockquote>
          <div className="mt-10">
            <ButtonLink to={ROUTES.about} variant="secondary" size="lg">
              {content.ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
