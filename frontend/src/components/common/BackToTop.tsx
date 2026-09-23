import { ArrowUp } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/utils/cn";

export function BackToTop() {
  const visible = useScrolled(700);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-navy-900 text-ivory-50 shadow-lift",
        "transition duration-300 hover:bg-navy-700",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
