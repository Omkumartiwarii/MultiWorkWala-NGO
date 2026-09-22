import { ProjectCard } from "@/components/cards/ProjectCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { useAsync } from "@/hooks/useAsync";
import { projectService } from "@/services/projectService";

export function RelatedProjects({ slug }: { slug: string }) {
  const state = useAsync(() => projectService.getRelated(slug, 3), [slug]);

  return (
    <Section labelledBy="related-projects-heading">
      <SectionHeading
        id="related-projects-heading"
        title="Related projects"
        action={
          <ButtonLink to={ROUTES.projects} variant="outline">
            All projects
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <AsyncContent state={state} loadingLabel="Loading related projects…" emptyTitle="No related projects at the moment.">
          {(projects) => (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <li key={project.id}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <ProjectCard project={project} />
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
