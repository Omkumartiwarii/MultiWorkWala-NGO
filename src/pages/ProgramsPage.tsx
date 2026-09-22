import { CTASection } from "@/components/common/CTASection";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { pageMetadata } from "@/config/seo";
import { ROUTES } from "@/constants/routes";
import { ImpactBand } from "@/sections/impact/ImpactBand";
import { ProgramsExplorer } from "@/sections/programs/ProgramsExplorer";

export default function ProgramsPage() {
  return (
    <>
      <Seo {...pageMetadata.programs} />
      <PageHero
        title="Programs that open doors"
        description="Six focus areas, one approach: listen first, build with the community, and share what we learn."
        breadcrumbs={[{ label: "Programs" }]}
      />
      <ProgramsExplorer />
      <ImpactBand id="programs-impact-heading" title="Our programs by the numbers" description="Demo figures for now. Verified numbers will replace them." />
      <CTASection
        id="programs-cta-heading"
        title="Help a program grow"
        description="Your support keeps these programs running and helps us start new ones."
        primary={{ label: "Donate Now", to: ROUTES.donate }}
        secondary={{ label: "Become a Volunteer", to: ROUTES.volunteer }}
      />
    </>
  );
}
