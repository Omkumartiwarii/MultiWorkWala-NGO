import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/Badge";
import { ROUTES } from "@/constants/routes";
import { formatNumber } from "@/utils/format";
import { stretchedLink } from "@/utils/styles";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image.src}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <StatusBadge status={project.status} className="absolute top-4 left-4" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-snug font-medium">
          <Link to={ROUTES.projectDetail(project.slug)} className={stretchedLink}>
            {project.title}
          </Link>
        </h3>

        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-600">
          <li className="flex items-center gap-1.5">
            <MapPin className="size-4 text-brand-600" aria-hidden="true" />
            {project.location}
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="size-4 text-brand-600" aria-hidden="true" />
            {formatNumber(project.beneficiaries)} beneficiaries
          </li>
        </ul>

        <p className="mt-4 line-clamp-3 leading-relaxed text-ink-500">{project.description}</p>

        <div className="mt-6">
          <ProgressBar value={project.progress} label="Progress" />
        </div>

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
