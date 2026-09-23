import { ProgramCard } from "@/components/cards/ProgramCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { useAsync } from "@/hooks/useAsync";
import { programService } from "@/services/programService";

export function RelatedPrograms({ slug }: { slug: string }) {
  const state = useAsync(() => programService.getRelated(slug, 3), [slug]);

  return (
    <Section labelledBy="related-programs-heading">
      <SectionHeading
        id="related-programs-heading"
        title="Related programs"
        action={
          <ButtonLink to={ROUTES.programs} variant="outline">
            All programs
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <AsyncContent state={state} loadingLabel="Loading related programs…" emptyTitle="No related programs at the moment.">
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
