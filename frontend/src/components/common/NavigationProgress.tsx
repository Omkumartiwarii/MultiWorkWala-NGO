import { useNavigation } from "react-router-dom";
import { cn } from "@/utils/cn";

/** Thin bar shown while a lazily loaded route is being fetched. */
export function NavigationProgress() {
  const { state } = useNavigation();
  const busy = state !== "idle";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-gold-400",
        "transition-[transform,opacity] duration-500",
        busy ? "scale-x-75 opacity-100" : "scale-x-100 opacity-0",
      )}
    />
  );
}
