import { ImpactCounter } from "@/components/common/ImpactCounter";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { impactStoryContent as content } from "@/data/homeContent";
import { getImpactStat } from "@/data/impact";

export function ImpactStory() {
  const stats = content.statIds.map(getImpactStat);

  return (
    <Section labelledBy="story-heading">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <img
            src={content.image.src}
            alt={content.image.alt}
            loading="lazy"
            decoding="async"
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-3xl object-cover shadow-card lg:max-w-none"
          />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <SectionHeading id="story-heading" eyebrow={content.eyebrow} title={content.title} />
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-600">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

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

          <figure className="mt-8">
            <blockquote className="font-display text-2xl leading-snug text-navy-900">“{content.quote.text}”</blockquote>
            <figcaption className="mt-3 text-sm text-ink-500">{content.quote.attribution}</figcaption>
          </figure>

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
