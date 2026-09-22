import { AsyncContent } from "@/components/common/AsyncContent";
import { StatsBand } from "@/components/common/StatsBand";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";
import { ButtonLink } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { useAsync } from "@/hooks/useAsync";
import { impactService } from "@/services/impactService";

interface ImpactBandProps {
  id: string;
  title: string;
  description?: string;
  /** Show a link to the full Impact page. */
  showLink?: boolean;
}

/** Loads the organization-wide impact figures and shows them in a StatsBand. */
export function ImpactBand({ id, title, description, showLink = true }: ImpactBandProps) {
  const state = useAsync(impactService.getStats);

  return (
    <AsyncContent
      state={state}
      loadingLabel="Loading impact figures…"
      emptyTitle="Impact figures are not available at the moment."
      skeleton={
        <Section tone="navy">
          <Skeleton className="h-10 w-72 bg-white/10" />
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="h-24 bg-white/10" />
            ))}
          </div>
        </Section>
      }
    >
      {(stats) => (
        <StatsBand
          id={id}
          title={title}
          description={description}
          stats={stats}
          action={
            showLink ? (
              <ButtonLink to={ROUTES.impact} variant="outline" tone="dark">
                View Our Impact
              </ButtonLink>
            ) : undefined
          }
        />
      )}
    </AsyncContent>
  );
}
