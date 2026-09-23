import { useSearchParams } from "react-router-dom";

/**
 * Keeps list filters in the URL (for example /programs?category=education), so filtered views
 * can be shared, bookmarked and reached from other pages. Empty values remove the parameter.
 */
export function useFilterParams<K extends string>(keys: readonly K[]) {
  const [params, setParams] = useSearchParams();

  const values = Object.fromEntries(keys.map((key) => [key, params.get(key) ?? ""])) as Record<K, string>;

  const update = (patch: Partial<Record<K, string>>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries<string | undefined>(patch)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setParams(next, { replace: true });
  };

  const clear = () => setParams({}, { replace: true });
  const hasActive = keys.some((key) => values[key] !== "");

  return { values, update, clear, hasActive };
}
