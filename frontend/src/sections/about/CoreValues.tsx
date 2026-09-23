import { Reveal } from "@/components/common/Reveal";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/about";

export function CoreValues() {
  return (
    <Section labelledBy="values-heading">
      <SectionHeading id="values-heading" title="What we stand for" description="Six values guide how we work with communities, partners and each other." />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {aboutContent.values.map((value, index) => (
          <li key={value.title}>
            <Reveal delay={(index % 3) * 0.08} className="h-full">
              <Card lift={false} className="h-full p-7 shadow-none">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={value.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-xl font-medium">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-500">{value.description}</p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
