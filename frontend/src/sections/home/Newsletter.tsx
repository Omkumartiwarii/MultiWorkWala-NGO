import { Reveal } from "@/components/common/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newsletterContent as content } from "@/data/homeContent";

export function Newsletter() {
  return (
    <Section tone="white" labelledBy="newsletter-heading">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <SectionHeading
            id="newsletter-heading"
            title={content.title}
            description={content.description}
            className="lg:col-span-5"
          />
          <div className="lg:col-span-7">
            <NewsletterForm />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
