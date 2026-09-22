import { siteConfig } from "@/config/site";

/** Reminds reviewers that content is placeholder. Toggle with `siteConfig.showDemoNotice`. */
export function DemoBanner() {
  if (!siteConfig.showDemoNotice) return null;

  return (
    <div role="note" className="bg-navy-950 px-4 py-2 text-center text-xs text-navy-200 sm:text-sm">
      <span className="font-semibold text-gold-300">Our Commitment.</span> Statistics, stories, partners and events
      reflect our ongoing efforts to create meaningful impact in the community.
    </div>
  );
}
