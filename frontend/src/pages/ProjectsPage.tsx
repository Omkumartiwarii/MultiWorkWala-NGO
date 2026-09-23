import { CTASection } from "@/components/common/CTASection";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { pageMetadata } from "@/config/seo";
import { ROUTES } from "@/constants/routes";
import { ProjectsExplorer } from "@/sections/projects/ProjectsExplorer";

export default function ProjectsPage() {
  return (
    <>
      <Seo {...pageMetadata.projects} />
      <PageHero
        title="Projects with clear goals"
        description="Focused, time-bound work with measurable outcomes. See what is underway, finished and coming next."
        breadcrumbs={[{ label: "Projects" }]}
      />
      <ProjectsExplorer />
      <CTASection
        id="projects-cta-heading"
        title="Back a project from start to finish"
        description="Your support helps a project move from planning to lasting impact."
        primary={{ label: "Donate Now", to: ROUTES.donate }}
        secondary={{ label: "Partner With Us", to: ROUTES.partnership }}
      />
    </>
  );
}
