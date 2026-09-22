import { Link } from "react-router-dom";
import { organization } from "@/config/organization";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

interface LogoProps {
  /** Use "dark" on navy backgrounds. */
  tone?: "light" | "dark";
  onClick?: () => void;
}

/** Wordmark with a small arch (an open doorway), the motif reused across the site. */
export function Logo({ tone = "light", onClick }: LogoProps) {
  const dark = tone === "dark";

  return (
    <Link
      to={ROUTES.home}
      onClick={onClick}
      aria-label={`${organization.name}, home`}
      className="group inline-flex items-center gap-3 rounded-lg"
    >
      <img
        src="/images/logo.png"
        alt={organization.name}
        className="h-15 w-auto object-contain"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-semibold tracking-tight",
            dark ? "text-ivory-50" : "text-navy-900",
          )}
        >
          {organization.name}
        </span>
        <span className={cn("mt-1.5 text-xs font-semibold", dark ? "text-gold-300" : "text-brand-700")}>
          {organization.descriptor}
        </span>
      </span>
    </Link>
  );
}
