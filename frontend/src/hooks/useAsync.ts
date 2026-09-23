import { useCallback, useEffect, useState, type DependencyList } from "react";

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  reload: () => void;
}

interface Snapshot<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/** Runs an async loader on mount (and when `deps` change) and exposes loading/error/data. */
export function useAsync<T>(loader: () => Promise<T>, deps: DependencyList = []): AsyncState<T> {
  const [snapshot, setSnapshot] = useState<Snapshot<T>>({ data: null, isLoading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setSnapshot((previous) => ({ ...previous, isLoading: true, error: null }));

    loader()
      .then((data) => {
        if (!cancelled) setSnapshot({ data, isLoading: false, error: null });
      })
      .catch((reason: unknown) => {
        if (cancelled) return;
        const error = reason instanceof Error ? reason : new Error("Request failed");
        setSnapshot({ data: null, isLoading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [attempt, ...deps]);

  const reload = useCallback(() => setAttempt((count) => count + 1), []);

  return { ...snapshot, reload };
}
