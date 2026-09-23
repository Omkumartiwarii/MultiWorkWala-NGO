import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SiteImage } from "@/components/common/SiteImage";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/constants/routes";
import { getFocusArea } from "@/data/focusAreas";
import { stretchedLink } from "@/utils/styles";
import type { Program } from "@/types";

export function ProgramCard({ program }: { program: Program }) {
  const category = getFocusArea(program.category);

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-4/3 overflow-hidden">
        <SiteImage
          image={program.image}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <Badge tone="glass" className="absolute top-4 left-4">
          {category.title}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-snug font-medium">
          <Link to={ROUTES.programDetail(program.slug)} className={stretchedLink}>
            {program.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 leading-relaxed text-ink-500">{program.description}</p>

        <ul className="mt-5 space-y-2 text-sm text-ink-600">
          <li className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
            {program.location}
          </li>
          {program.verified && (
            <li className="flex items-center gap-2">
              <Users className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
              {program.beneficiaries} people supported
            </li>
          )}
        </ul>

        <p className="mt-4 flex items-start gap-2 rounded-xl bg-brand-50 px-3 py-2.5 text-sm font-medium text-brand-800">
          <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {program.impactHighlight}
        </p>

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
            Learn more
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Card>
  );
}
