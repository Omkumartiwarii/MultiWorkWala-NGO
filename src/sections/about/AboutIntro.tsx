import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/about";

export function AboutIntro() {
  const { intro } = aboutContent;

  return (
    <Section labelledBy="about-intro-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading id="about-intro-heading" eyebrow={intro.eyebrow} title={intro.title} />
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink-600">
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <img
            src={intro.image.src}
            alt={intro.image.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[5/4] w-full rounded-3xl object-cover shadow-card"
          />
        </Reveal>
      </div>
    </Section>
  );
}
