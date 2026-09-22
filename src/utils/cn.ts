type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Tiny replacement for clsx. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
