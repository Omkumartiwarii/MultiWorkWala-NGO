import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/constants/routes";
import { formatDate, getDateParts } from "@/utils/date";
import { stretchedLink } from "@/utils/styles";
import type { NgoEvent } from "@/types";

function DateBlock({ startsAt, className }: { startsAt: string; className?: string }) {
  const { day, month } = getDateParts(startsAt);
  return (
    <div
      aria-hidden="true"
      className={`flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-900 text-ivory-50 ${className ?? ""}`}
    >
      <span className="font-display text-2xl leading-none font-medium">{day}</span>
      <span className="mt-1 text-xs font-semibold text-gold-300">{month}</span>
    </div>
  );
}

function EventMeta({ event }: { event: NgoEvent }) {
  return (
    <ul className="space-y-1.5 text-sm text-ink-600">
      <li className="flex items-center gap-2">
        <Clock className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
        <span>
          <span className="sr-only">Date and time: </span>
          {formatDate(event.startsAt)}, {event.time}
        </span>
      </li>
      <li className="flex items-center gap-2">
        <MapPin className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
        {event.location}
      </li>
    </ul>
  );
}

/** Large card with an image and a registration button. */
export function FeaturedEventCard({ event }: { event: NgoEvent }) {
  return (
    <Card lift={false} className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={event.image.src}
          alt={event.image.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <Badge tone="glass" className="absolute top-4 right-4">
          {event.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
        <div className="flex gap-4">
          <DateBlock startsAt={event.startsAt} />
          <h3 className="text-2xl leading-snug font-medium">{event.title}</h3>
        </div>
        <EventMeta event={event} />
        <p className="leading-relaxed text-ink-500">{event.description}</p>
        <div className="mt-auto pt-2">
          <ButtonLink to={ROUTES.eventDetail(event.slug)}>Register Now</ButtonLink>
        </div>
      </div>
    </Card>
  );
}

/** Compact horizontal card for secondary events. */
export function EventCard({ event }: { event: NgoEvent }) {
  return (
    <Card className="flex gap-4 p-5">
      <DateBlock startsAt={event.startsAt} />
      <div className="min-w-0">
        <Badge tone="gold" className="mb-2">
          {event.category}
        </Badge>
        <h3 className="text-lg leading-snug font-medium">
          <Link to={ROUTES.eventDetail(event.slug)} className={stretchedLink}>
            {event.title}
          </Link>
        </h3>
        <div className="mt-2">
          <EventMeta event={event} />
        </div>
        <span className="mt-3 inline-block text-sm font-semibold text-navy-900 group-hover:underline">View event</span>
      </div>
    </Card>
  );
}
