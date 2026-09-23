import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-ivory-100">
      <LoadingSpinner label="Loading page…" />
    </div>
  );
}
