import { Heart } from "lucide-react";
import { CTASection } from "@/components/common/CTASection";
import { CheckList } from "@/components/common/CheckList";
import { ImageGrid } from "@/components/common/ImageGrid";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { StatsBand } from "@/components/common/StatsBand";
import { StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { getFocusArea } from "@/data/focusAreas";
import { donateUrl } from "@/utils/links";
import type { Program } from "@/types";
import { ProgramBody } from "./ProgramBody";
import { ProgramStories } from "./ProgramStories";
import { RelatedPrograms } from "./RelatedPrograms";

export function ProgramDetail({ program }: { program: Program }) {
  const category = getFocusArea(program.category);

  return (
    <>
      <Seo title={program.title} description={program.description} image={program.image.src} />
      <PageHero
        eyebrow={category.title}
        title={program.title}
        description={program.description}
        image={program.image}
        breadcrumbs={[{ label: "Programs", to: ROUTES.programs }, { label: program.title }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status={program.status} />
          <ButtonLink to={donateUrl()} leftIcon={<Heart className="size-4" aria-hidden="true" />}>
            Support this program
          </ButtonLink>
        </div>
      </PageHero>

      <ProgramBody program={program} />

      <Section tone="white" labelledBy="program-activities-heading">
        <SectionHeading id="program-activities-heading" title="What we do" />
        <div className="mt-10">
          <CheckList items={program.activities} columns={2} />
        </div>
      </Section>

      {program.verified && <StatsBand id="program-stats-heading" title="Impact at a glance" stats={program.stats} />}

      <Section labelledBy="program-gallery-heading">
        <SectionHeading id="program-gallery-heading" title="Gallery" description="Images from this program and its community setting." />
        <div className="mt-10">
          <ImageGrid images={program.gallery} />
        </div>
      </Section>

      <ProgramStories slug={program.slug} />
      <RelatedPrograms slug={program.slug} />

      <CTASection
        id="program-cta-heading"
        title="Help this program reach more families"
        description="Donate, volunteer or partner with us to support this work."
        primary={{ label: "Donate Now", to: donateUrl() }}
        secondary={{ label: "Become a Volunteer", to: ROUTES.volunteer }}
        tone="white"
      />
    </>
  );
}
