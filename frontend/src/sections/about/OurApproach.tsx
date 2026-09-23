import { Reveal } from "@/components/common/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/about";

export function OurApproach() {
  const steps = aboutContent.approach;

  return (
    <Section labelledBy="approach-heading">
      <SectionHeading id="approach-heading" title="How we work" description="Every program follows the same four steps, from first conversation to shared results." />
      <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            <Reveal delay={index * 0.1}>
              {index < steps.length - 1 && (
                <span aria-hidden="true" className="absolute top-6 left-16 hidden h-px w-[calc(100%-2.5rem)] bg-navy-900/15 lg:block" />
              )}
              <span className="relative z-10 grid size-12 place-items-center rounded-full bg-navy-900 text-gold-300">
                <Icon name={step.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-medium">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-500">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
