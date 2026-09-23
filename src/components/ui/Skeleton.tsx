import { cn } from "@/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-lg bg-navy-900/10", className)} />;
}

export function SkeletonCard() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white">
      <Skeleton className="aspect-4/3 rounded-none" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="mt-4 h-4 w-1/3" />
      </div>
    </div>
  );
}
