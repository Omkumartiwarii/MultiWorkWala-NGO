import type { ReactNode } from "react";
import type { AsyncState } from "@/hooks/useAsync";
import { Container } from "@/components/ui/Container";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import NotFoundPage from "@/pages/NotFoundPage";

interface AsyncDetailProps<T> {
  state: AsyncState<T | null>;
  loadingLabel: string;
  children: (item: T) => ReactNode;
}

/** Loading / error / not-found handling for detail pages that load a single item by slug. */
export function AsyncDetail<T>({ state, loadingLabel, children }: AsyncDetailProps<T>) {
  const { data, isLoading, error, reload } = state;

  if (isLoading) {
    return (
      <div role="status" aria-busy="true">
        <span className="sr-only">{loadingLabel}</span>
        <div aria-hidden="true" className="bg-navy-950 py-24">
          <Container className="space-y-5">
            <Skeleton className="h-4 w-48 bg-white/10" />
            <Skeleton className="h-12 w-2/3 bg-white/10" />
            <Skeleton className="h-6 w-1/2 bg-white/10" />
          </Container>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-24">
        <ErrorState onRetry={reload} />
      </Container>
    );
  }

  if (!data) return <NotFoundPage />;
  return <>{children(data)}</>;
}
