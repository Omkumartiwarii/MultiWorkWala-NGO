const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export const formatDate = (iso: string): string => dateFormatter.format(new Date(iso));

export function getDateParts(iso: string): { day: string; month: string } {
  const date = new Date(iso);
  return {
    day: String(date.getDate()),
    month: date.toLocaleString("en-IN", { month: "short" }),
  };
}

export const isFuture = (iso: string): boolean => new Date(iso).getTime() >= Date.now();

/**
 * DEMO DATA HELPER: returns an ISO date relative to today so demo events and
 * articles always look current. Replace with real dates from the API.
 */
export function daysFromNow(offset: number, hour = 10): string {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}
