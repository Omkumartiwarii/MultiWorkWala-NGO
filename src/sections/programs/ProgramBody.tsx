import { CheckList } from "@/components/common/CheckList";
import { FactList } from "@/components/common/FactList";
import { Reveal } from "@/components/common/Reveal";
import { StatusBadge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import type { Program } from "@/types";

export function ProgramBody({ program }: { program: Program }) {
  return (
    <Section labelledBy="program-overview-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h2 id="program-overview-heading" className="text-3xl font-medium sm:text-4xl">
            Overview
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl">{program.overview}</p>

          <h3 className="mt-12 text-2xl font-medium">Objectives</h3>
          <div className="mt-5">
            <CheckList items={program.objectives} />
          </div>

          <h3 className="mt-12 text-2xl font-medium">Our approach</h3>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">{program.approach}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <FactList
              title="At a glance"
              items={[
                { label: "Status", value: <StatusBadge status={program.status} /> },
                { label: "Location", value: program.location },
                ...(program.verified ? [{ label: "People supported", value: `${program.beneficiaries}+` }] : []),
                { label: "Who it is for", value: <span className="font-medium">{program.targetBeneficiaries}</span> },
              ]}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
