import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

export interface Crumb {
  label: string;
  /** Omit for the current page. */
  to?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  /** Use "dark" on navy backgrounds. */
  tone?: "light" | "dark";
}

/** Home is added automatically; pass the trail after it. */
export function Breadcrumb({ items, tone = "light" }: BreadcrumbProps) {
  const dark = tone === "dark";
  const trail: Crumb[] = [{ label: "Home", to: ROUTES.home }, ...items];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {trail.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <li aria-hidden="true">
                <ChevronRight className={cn("size-4", dark ? "text-navy-300" : "text-ink-500")} />
              </li>
            )}
            <li>
              {item.to ? (
                <Link
                  to={item.to}
                  className={cn("rounded underline-offset-4 hover:underline", dark ? "text-navy-200 hover:text-white" : "text-ink-600 hover:text-navy-900")}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className={cn("font-semibold", dark ? "text-white" : "text-navy-900")}>
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
