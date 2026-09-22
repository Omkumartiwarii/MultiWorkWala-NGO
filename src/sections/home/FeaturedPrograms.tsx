import { ProgramCard } from "@/components/cards/ProgramCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { sectionCopy } from "@/data/homeContent";
import { useAsync } from "@/hooks/useAsync";
import { programService } from "@/services/programService";

export function FeaturedPrograms() {
  const state = useAsync(() => programService.getFeatured(3));

  return (
    <Section labelledBy="programs-heading">
      <SectionHeading
        id="programs-heading"
        {...sectionCopy.programs}
        action={
          <ButtonLink to={ROUTES.programs} variant="outline">
            View all programs
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <AsyncContent state={state} loadingLabel="Loading programs…" emptyTitle="No programs available at the moment.">
          {(programs) => (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => (
                <li key={program.id}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <ProgramCard program={program} />
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
