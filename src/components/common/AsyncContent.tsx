import type { ReactNode } from "react";
import type { AsyncState } from "@/hooks/useAsync";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { SkeletonCard } from "@/components/ui/Skeleton";

interface AsyncContentProps<T> {
  state: AsyncState<T[]>;
  /** Announced to screen readers while loading, e.g. "Loading programs…" */
  loadingLabel: string;
  emptyTitle: string;
  emptyDescription?: string;
  /** Custom loading placeholder. Defaults to a grid of card skeletons. */
  skeleton?: ReactNode;
  skeletonCount?: number;
  children: (items: T[]) => ReactNode;
}

/** Renders loading, error and empty states so every data-driven section behaves the same. */
export function AsyncContent<T>({
  state,
  loadingLabel,
  emptyTitle,
  emptyDescription,
  skeleton,
  skeletonCount = 3,
  children,
}: AsyncContentProps<T>) {
  const { data, isLoading, error, reload } = state;

  if (isLoading) {
    return (
      <div role="status" aria-busy="true">
        <span className="sr-only">{loadingLabel}</span>
        {skeleton ?? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: skeletonCount }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (error) return <ErrorState onRetry={reload} />;
  if (!data || data.length === 0) return <EmptyState title={emptyTitle} description={emptyDescription} />;

  return <>{children(data)}</>;
}
