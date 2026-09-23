import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { SiteImage } from "@/components/common/SiteImage";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/constants/routes";
import { stretchedLink } from "@/utils/styles";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-5/3 overflow-hidden">
        <SiteImage
          image={testimonial.image}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {testimonial.isDemo && (
          <Badge tone="glass" className="absolute top-4 left-4">
            Illustrative story
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-medium">{testimonial.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
          <MapPin className="size-4 text-brand-600" aria-hidden="true" />
          {testimonial.location}
        </p>
        <p className="mt-4 leading-relaxed text-ink-600">{testimonial.story}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Badge tone="brand">{testimonial.program}</Badge>
          <Link
            to={`${ROUTES.impact}#stories`}
            className={`${stretchedLink} text-sm font-semibold text-navy-900 group-hover:underline`}
          >
            Read story
          </Link>
        </div>
      </div>
    </Card>
  );
}
