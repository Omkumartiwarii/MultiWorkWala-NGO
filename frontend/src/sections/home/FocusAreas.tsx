import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { focusAreas } from "@/data/focusAreas";
import { sectionCopy } from "@/data/homeContent";
import { stretchedLink } from "@/utils/styles";

export function FocusAreas() {
  return (
    <Section tone="white" labelledBy="focus-heading">
      <SectionHeading id="focus-heading" {...sectionCopy.focusAreas} />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area, index) => (
          <li key={area.id}>
            <Reveal delay={(index % 3) * 0.08} className="h-full">
              <Card className="h-full bg-ivory-50 p-7 shadow-none">
                <span className="grid size-12 place-items-center rounded-xl bg-navy-900 text-gold-300 transition-colors duration-300 group-hover:bg-brand-700">
                  <Icon name={area.icon} className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-medium">
                  <Link to={`${ROUTES.programs}?category=${area.id}`} className={stretchedLink}>
                    {area.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-ink-500">{area.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
                  See programs
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
