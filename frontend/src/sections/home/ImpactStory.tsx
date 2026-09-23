import { ImpactCounter } from "@/components/common/ImpactCounter";
import { SiteImage } from "@/components/common/SiteImage";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { impactStoryContent as content } from "@/data/homeContent";
import { impactStats } from "@/data/impact";

export function ImpactStory() {
  const stats = impactStats.filter((stat) => content.statIds.includes(stat.id));

  return (
    <Section labelledBy="story-heading">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SiteImage
            image={content.image}
            loading="lazy"
            decoding="async"
            className="mx-auto aspect-4/5 w-full max-w-md rounded-3xl object-cover shadow-card lg:max-w-none"
          />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <SectionHeading id="story-heading" eyebrow={content.eyebrow} title={content.title} />
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-600">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {stats.length > 0 && (
            <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-navy-900/10 py-8">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <dd className="font-display text-3xl font-medium text-navy-900 sm:text-4xl">
                    <ImpactCounter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 text-sm text-ink-500">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10">
            <ButtonLink to={ROUTES.impact} variant="secondary" size="lg">
              {content.ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
