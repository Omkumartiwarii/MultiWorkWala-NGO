import { Seo } from "@/components/common/Seo";
import { pageMetadata } from "@/config/seo";
import { AboutPreview } from "@/sections/home/AboutPreview";
import { DonationCTA } from "@/sections/home/DonationCTA";
import { FeaturedPrograms } from "@/sections/home/FeaturedPrograms";
import { FeaturedProjects } from "@/sections/home/FeaturedProjects";
import { FocusAreas } from "@/sections/home/FocusAreas";
import { HomeHero } from "@/sections/home/HomeHero";
import { ImpactStats } from "@/sections/home/ImpactStats";
import { ImpactStory } from "@/sections/home/ImpactStory";
import { LatestStories } from "@/sections/home/LatestStories";
import { Newsletter } from "@/sections/home/Newsletter";
import { Partners } from "@/sections/home/Partners";
import { SuccessStories } from "@/sections/home/SuccessStories";
import { UpcomingEvents } from "@/sections/home/UpcomingEvents";
import { VolunteerCTA } from "@/sections/home/VolunteerCTA";

export default function HomePage() {
  return (
    <>
      <Seo {...pageMetadata.home} />
      <HomeHero />
      <ImpactStats />
      <AboutPreview />
      <FocusAreas />
      <FeaturedPrograms />
      <FeaturedProjects />
      <ImpactStory />
      <SuccessStories />
      <UpcomingEvents />
      <LatestStories />
      <Partners />
      <DonationCTA />
      <VolunteerCTA />
      <Newsletter />
    </>
  );
}
