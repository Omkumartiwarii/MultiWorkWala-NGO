import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/data/about";

export function OurStory() {
  const { story } = aboutContent;

  return (
    <Section tone="white" labelledBy="story-heading">
      <Reveal className="mx-auto max-w-3xl">
        <h2 id="story-heading" className="text-3xl font-medium sm:text-4xl lg:text-[2.6rem]">
          {story.title}
        </h2>
        <div className="mt-8 space-y-5 font-display text-xl leading-relaxed text-navy-800 sm:text-2xl">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
