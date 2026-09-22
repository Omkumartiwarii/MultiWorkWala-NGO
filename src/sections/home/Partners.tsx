import { PartnerLogo } from "@/components/cards/PartnerLogo";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partnerCategories } from "@/data/partners";
import { sectionCopy } from "@/data/homeContent";
import { useAsync } from "@/hooks/useAsync";
import { partnerService } from "@/services/partnerService";

export function Partners() {
  const state = useAsync(partnerService.getAll);

  return (
    <Section labelledBy="partners-heading">
      <SectionHeading id="partners-heading" {...sectionCopy.partners} />
      <div className="mt-12">
        <AsyncContent
          state={state}
          loadingLabel="Loading partners…"
          emptyTitle="Partner information is not available at the moment."
        >
          {(partners) => (
            <div className="divide-y divide-navy-900/10 border-y border-navy-900/10">
              {partnerCategories.map((category) => {
                const group = partners.filter((partner) => partner.category === category.id);
                if (group.length === 0) return null;
                return (
                  <Reveal key={category.id}>
                    <div className="grid gap-4 py-6 lg:grid-cols-12 lg:items-center">
                      <h3 className="font-sans text-base font-semibold text-navy-900 lg:col-span-3">
                        {category.label}
                      </h3>
                      <ul className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-9">
                        {group.map((partner) => (
                          <li key={partner.id}>
                            <PartnerLogo partner={partner} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </AsyncContent>
      </div>
    </Section>
  );
}
