import { CTASection } from "@/components/common/CTASection";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { pageMetadata } from "@/config/seo";
import { ROUTES } from "@/constants/routes";
import { aboutContent } from "@/data/about";
import { AboutIntro } from "@/sections/about/AboutIntro";
import { CoreValues } from "@/sections/about/CoreValues";
import { LeadershipPreview } from "@/sections/about/LeadershipPreview";
import { MissionVision } from "@/sections/about/MissionVision";
import { OurApproach } from "@/sections/about/OurApproach";
import { OurStory } from "@/sections/about/OurStory";
import { FocusAreas } from "@/sections/home/FocusAreas";
import { ImpactBand } from "@/sections/impact/ImpactBand";

export default function AboutPage() {
  return (
    <>
      <Seo {...pageMetadata.about} />
      <PageHero title={aboutContent.hero.title} description={aboutContent.hero.description} breadcrumbs={[{ label: "About" }]} />
      <AboutIntro />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <FocusAreas />
      <OurApproach />
      <LeadershipPreview />
      <ImpactBand id="about-impact-heading" title="Our impact so far" description="Demo figures for now. Verified numbers will replace them." />
      <CTASection
        id="about-cta-heading"
        title="Be part of the story"
        description="Support our programs, give your time, or partner with us to reach more families."
        primary={{ label: "Donate Now", to: ROUTES.donate }}
        secondary={{ label: "Become a Volunteer", to: ROUTES.volunteer }}
      />
    </>
  );
}
