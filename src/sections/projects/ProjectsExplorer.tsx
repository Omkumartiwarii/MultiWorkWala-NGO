import { ProjectCard } from "@/components/cards/ProjectCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { Reveal } from "@/components/common/Reveal";
import { SearchBar } from "@/components/common/SearchBar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { focusAreas } from "@/data/focusAreas";
import { useAsync } from "@/hooks/useAsync";
import { useFilterParams } from "@/hooks/useFilterParams";
import { projectService } from "@/services/projectService";
import { matchesQuery } from "@/utils/filter";
import type { WorkStatus } from "@/types";

const FILTER_KEYS = ["category", "status", "q"] as const;

const categoryOptions: FilterOption<string>[] = [
  { value: "all", label: "All categories" },
  ...focusAreas.map((area) => ({ value: area.id, label: area.shortTitle })),
];

const statusOptions: FilterOption<string>[] = [
  { value: "all", label: "All statuses" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "upcoming", label: "Upcoming" },
];

export function ProjectsExplorer() {
  const state = useAsync(projectService.getAll);
  const { values, update, clear } = useFilterParams(FILTER_KEYS);
  const category = focusAreas.some((area) => area.id === values.category) ? values.category : "";
  const status = (["ongoing", "completed", "upcoming"] as const).includes(values.status as WorkStatus) ? values.status : "";

  return (
    <Section labelledBy="projects-explorer-heading">
      <SectionHeading
        id="projects-explorer-heading"
        title="Find a project"
        description="Browse by category and status, or search by name, description or location."
      />

      <div className="mt-10 space-y-5">
        <div className="max-w-xl">
          <SearchBar value={values.q} onChange={(q) => update({ q })} label="Search projects" />
        </div>
        <div className="flex flex-col gap-3">
          <FilterBar label="Filter by category" options={categoryOptions} value={category || "all"} onChange={(next) => update({ category: next === "all" ? "" : next })} />
          <FilterBar label="Filter by status" options={statusOptions} value={status || "all"} onChange={(next) => update({ status: next === "all" ? "" : next })} />
        </div>
      </div>

      <div className="mt-10">
        <AsyncContent state={state} loadingLabel="Loading projects…" emptyTitle="No projects available at the moment.">
          {(all) => {
            const visible = all.filter(
              (project) =>
                (!category || project.category === category) &&
                (!status || project.status === status) &&
                matchesQuery([project.title, project.description, project.location], values.q),
            );

            return (
              <>
                <p aria-live="polite" className="mb-6 text-sm text-ink-500">
                  Showing {visible.length} of {all.length} projects
                </p>
                {visible.length === 0 ? (
                  <EmptyState
                    title="No projects match your search."
                    description="Try a different word, or clear the filters to see everything."
                    action={
                      <Button variant="secondary" onClick={clear}>
                        Clear filters
                      </Button>
                    }
                  />
                ) : (
                  <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {visible.map((project, index) => (
                      <li key={project.id}>
                        <Reveal delay={(index % 3) * 0.06} className="h-full">
                          <ProjectCard project={project} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            );
          }}
        </AsyncContent>
      </div>
    </Section>
  );
}
