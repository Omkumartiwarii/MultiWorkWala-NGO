import { Building2 } from "lucide-react";
import type { Partner } from "@/types";

/** Shows a partner logo, or a clearly labelled placeholder tile when none is supplied. */
export function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="flex min-h-20 items-center justify-center rounded-xl border border-dashed border-navy-900/20 bg-white p-3 text-center sm:px-4">
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          className="max-h-12 w-auto object-contain grayscale transition duration-300 hover:grayscale-0"
        />
      ) : (
        <span className="flex flex-col items-center gap-1.5 text-xs font-medium text-ink-500 sm:flex-row sm:gap-2 sm:text-sm">
          <Building2 className="size-4 shrink-0" aria-hidden="true" />
          {partner.name}
        </span>
      )}
    </div>
  );
}
