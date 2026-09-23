import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

interface CheckListProps {
  items: string[];
  /** Lay items out in two columns on wider screens. */
  columns?: 1 | 2;
}

export function CheckList({ items, columns = 1 }: CheckListProps) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-3", columns === 2 && "sm:grid-cols-2")}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-relaxed text-ink-700">
          <span aria-hidden="true" className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
            <Check className="size-3.5" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
