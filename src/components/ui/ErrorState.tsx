import { TriangleAlert } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "We couldn't load this information.",
  description = "Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center"
    >
      <span className="grid size-12 place-items-center rounded-full bg-red-100 text-red-700">
        <TriangleAlert className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-xl font-medium">{title}</h3>
      <p className="mt-2 text-ink-600">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
