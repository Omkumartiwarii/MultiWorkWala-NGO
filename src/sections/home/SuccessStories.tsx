import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionCopy } from "@/data/homeContent";
import { useAsync } from "@/hooks/useAsync";
import { testimonialService } from "@/services/testimonialService";

export function SuccessStories() {
  const state = useAsync(() => testimonialService.getFeatured(3));

  return (
    <Section tone="white" labelledBy="stories-heading">
      <SectionHeading id="stories-heading" {...sectionCopy.stories} />
      <div className="mt-12">
        <AsyncContent state={state} loadingLabel="Loading stories…" emptyTitle="No stories available at the moment.">
          {(stories) => (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, index) => (
                <li key={story.id}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <TestimonialCard testimonial={story} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </AsyncContent>
      </div>
    </Section>
  );
}
