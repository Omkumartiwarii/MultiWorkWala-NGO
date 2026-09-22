import { ProgramCard } from "@/components/cards/ProgramCard";
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
import { programService } from "@/services/programService";
import { matchesQuery } from "@/utils/filter";

const FILTER_KEYS = ["category", "q"] as const;

const categoryOptions: FilterOption<string>[] = [
  { value: "all", label: "All" },
  ...focusAreas.map((area) => ({ value: area.id, label: area.shortTitle })),
];

export function ProgramsExplorer() {
  const state = useAsync(programService.getAll);
  const { values, update, clear } = useFilterParams(FILTER_KEYS);
  const category = focusAreas.some((area) => area.id === values.category) ? values.category : "";

  return (
    <Section labelledBy="programs-explorer-heading">
      <SectionHeading
        id="programs-explorer-heading"
        title="Find a program"
        description="Browse by focus area, or search by name, description or location."
      />

      <div className="mt-10 space-y-5">
        <div className="max-w-xl">
          <SearchBar value={values.q} onChange={(q) => update({ q })} label="Search programs" />
        </div>
        <FilterBar
          label="Filter by focus area"
          options={categoryOptions}
          value={category || "all"}
          onChange={(next) => update({ category: next === "all" ? "" : next })}
        />
      </div>

      <div className="mt-10">
        <AsyncContent state={state} loadingLabel="Loading programs…" emptyTitle="No programs available at the moment.">
          {(all) => {
            const visible = all.filter(
              (program) =>
                (!category || program.category === category) &&
                matchesQuery([program.title, program.description, program.location], values.q),
            );

            return (
              <>
                <p aria-live="polite" className="mb-6 text-sm text-ink-500">
                  Showing {visible.length} of {all.length} programs
                </p>
                {visible.length === 0 ? (
                  <EmptyState
                    title="No programs match your search."
                    description="Try a different word, or clear the filters to see everything."
                    action={
                      <Button variant="secondary" onClick={clear}>
                        Clear filters
                      </Button>
                    }
                  />
                ) : (
                  <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {visible.map((program, index) => (
                      <li key={program.id}>
                        <Reveal delay={(index % 3) * 0.06} className="h-full">
                          <ProgramCard program={program} />
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
