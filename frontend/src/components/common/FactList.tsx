import type { ReactNode } from "react";

interface FactListProps {
  title: string;
  items: { label: string; value: ReactNode }[];
}

/** "At a glance" panel of label/value facts for detail pages. */
export function FactList({ title, items }: FactListProps) {
  return (
    <aside aria-label={title} className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card sm:p-7">
      <h3 className="font-sans text-base font-semibold text-navy-900">{title}</h3>
      <dl className="mt-5 divide-y divide-navy-900/10">
        {items.map((item) => (
          <div key={item.label} className="py-3.5 first:pt-0 last:pb-0">
            <dt className="text-sm text-ink-500">{item.label}</dt>
            <dd className="mt-1 font-semibold text-navy-900">{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
