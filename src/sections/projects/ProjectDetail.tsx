import { Heart } from "lucide-react";
import { CTASection } from "@/components/common/CTASection";
import { CheckList } from "@/components/common/CheckList";
import { FactList } from "@/components/common/FactList";
import { ImageGrid } from "@/components/common/ImageGrid";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/common/Reveal";
import { Seo } from "@/components/common/Seo";
import { Timeline } from "@/components/common/Timeline";
import { StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { getFocusArea } from "@/data/focusAreas";
import { donateUrl } from "@/utils/links";
import { formatNumber } from "@/utils/format";
import type { Project } from "@/types";
import { RelatedProjects } from "./RelatedProjects";

export function ProjectDetail({ project }: { project: Project }) {
  const category = getFocusArea(project.category);

  return (
    <>
      <Seo title={project.title} description={project.description} image={project.image.src} />
      <PageHero
        eyebrow={category.title}
        title={project.title}
        description={project.description}
        image={project.image}
        breadcrumbs={[{ label: "Projects", to: ROUTES.projects }, { label: project.title }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status={project.status} />
          <ButtonLink to={donateUrl()} leftIcon={<Heart className="size-4" aria-hidden="true" />}>
            Support this project
          </ButtonLink>
        </div>
      </PageHero>

      <Section labelledBy="project-overview-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 id="project-overview-heading" className="text-3xl font-medium sm:text-4xl">
              Overview
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl">{project.overview}</p>
            <div className="mt-8">
              <ProgressBar value={project.progress} label="Overall progress" />
            </div>

            <h3 className="mt-12 text-2xl font-medium">Objectives</h3>
            <div className="mt-5">
              <CheckList items={project.objectives} />
            </div>

            <h3 className="mt-12 text-2xl font-medium">Activities</h3>
            <div className="mt-5">
              <CheckList items={project.activities} />
            </div>

            <h3 className="mt-12 text-2xl font-medium">{project.status === "upcoming" ? "Expected impact" : "Impact"}</h3>
            <div className="mt-5">
              <CheckList items={project.impact} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-8 lg:sticky lg:top-28">
              <FactList
                title="At a glance"
                items={[
                  { label: "Status", value: <StatusBadge status={project.status} /> },
                  { label: "Location", value: project.location },
                  { label: "Beneficiaries", value: `${formatNumber(project.beneficiaries)}+` },
                  { label: "Duration", value: project.duration },
                ]}
              />
              <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card sm:p-7">
                <h3 className="font-sans text-base font-semibold text-navy-900">Timeline</h3>
                <div className="mt-6">
                  <Timeline milestones={project.timeline} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" labelledBy="project-gallery-heading">
        <SectionHeading id="project-gallery-heading" title="Gallery" description="Placeholder artwork. Real project photography will appear here." />
        <div className="mt-10">
          <ImageGrid images={project.gallery} />
        </div>
      </Section>

      <RelatedProjects slug={project.slug} />

      <CTASection
        id="project-cta-heading"
        title="Help this project reach the finish line"
        description="Donate, volunteer or partner with us to support this work."
        primary={{ label: "Donate Now", to: donateUrl() }}
        secondary={{ label: "Partner With Us", to: ROUTES.partnership }}
      />
    </>
  );
}
