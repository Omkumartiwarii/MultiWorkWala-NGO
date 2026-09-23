import { StatCard } from "@/components/cards/StatCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAsync } from "@/hooks/useAsync";
import { impactService } from "@/services/impactService";

const statsGrid = "grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6";

export function ImpactStats() {
  const state = useAsync(impactService.getStats);

  return (
    <section aria-labelledby="impact-stats-heading" className="relative z-10 -mt-20 pb-4 sm:-mt-24">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-navy-900/10 bg-white p-6 shadow-lift sm:p-8 lg:p-10">
            <h2 id="impact-stats-heading" className="sr-only">
              Our impact at a glance
            </h2>
            <AsyncContent
              state={state}
              loadingLabel="Loading impact figures…"
              emptyTitle="Impact figures are not available at the moment."
              skeleton={
                <div className={statsGrid}>
                  {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="space-y-3">
                      <Skeleton className="size-11" />
                      <Skeleton className="h-9 w-24" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  ))}
                </div>
              }
            >
              {(stats) => (
                <ul className={statsGrid}>
                  {stats.map((stat) => (
                    <li key={stat.id}>
                      <StatCard stat={stat} />
                    </li>
                  ))}
                </ul>
              )}
            </AsyncContent>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
