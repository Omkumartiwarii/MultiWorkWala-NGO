/** True when any field contains the query (case-insensitive). An empty query matches everything. */
export function matchesQuery(fields: string[], query: string): boolean {
  const needle = query.trim().toLowerCase();
  return needle === "" || fields.some((field) => field.toLowerCase().includes(needle));
}
