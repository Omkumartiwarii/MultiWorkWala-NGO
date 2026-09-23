import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-navy-900/20 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-navy-50 text-navy-600">
        <Inbox className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-medium">{title}</h3>
      {description && <p className="mt-2 text-ink-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
