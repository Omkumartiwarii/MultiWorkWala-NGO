import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useAsync } from "@/hooks/useAsync";
import { testimonialService } from "@/services/testimonialService";

/** Renders nothing until there are stories for this program. */
export function ProgramStories({ slug }: { slug: string }) {
  const { data } = useAsync(() => testimonialService.getByProgram(slug), [slug]);
  if (!data || data.length === 0) return null;

  return (
    <Section tone="white" labelledBy="program-stories-heading">
      <SectionHeading
        id="program-stories-heading"
        title="Stories from this program"
        description="Illustrative placeholders. Verified stories, shared with consent, will replace them."
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((story) => (
          <li key={story.id}>
            <Reveal className="h-full">
              <TestimonialCard testimonial={story} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
