import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, type SectionTone } from "@/components/ui/Section";
import { cn } from "@/utils/cn";

interface CTAAction {
  label: string;
  to: string;
}

interface CTASectionProps {
  id: string;
  title: string;
  description: string;
  primary: CTAAction;
  secondary?: CTAAction;
  /** Colour of the panel. */
  panel?: "brand" | "navy";
  /** Background of the section around the panel. */
  tone?: SectionTone;
}

const panels = {
  brand: { box: "bg-brand-700", text: "text-brand-100" },
  navy: { box: "bg-navy-950", text: "text-navy-100" },
};

/** Call-to-action band used to close pages. Keep to one primary and at most one secondary action. */
export function CTASection({ id, title, description, primary, secondary, panel = "brand", tone = "ivory" }: CTASectionProps) {
  const style = panels[panel];

  return (
    <Section tone={tone} labelledBy={id} spacing="compact">
      <Reveal>
        <div
          className={cn(
            "flex flex-col gap-8 rounded-[2rem] px-6 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-14",
            style.box,
          )}
        >
          <div className="max-w-xl">
            <h2 id={id} className="text-3xl font-medium text-white sm:text-4xl">
              {title}
            </h2>
            <p className={cn("mt-4 text-lg leading-relaxed", style.text)}>{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <ButtonLink to={primary.to} size="lg">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink to={secondary.to} size="lg" variant="outline" tone="dark">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
