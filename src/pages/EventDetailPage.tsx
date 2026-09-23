import { useParams } from "react-router-dom";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { AsyncDetail } from "@/components/common/AsyncDetail";
import { CTASection } from "@/components/common/CTASection";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/constants/routes";
import { useAsync } from "@/hooks/useAsync";
import { eventService } from "@/services/eventService";
import { formatDate, isFuture } from "@/utils/date";
import type { NgoEvent } from "@/types";

function EventDetail({ event }: { event: NgoEvent }) {
  const upcoming = isFuture(event.startsAt);

  return (
    <>
      <Seo title={event.title} description={event.description} image={event.image.src} />
      <PageHero
        eyebrow={event.category}
        title={event.title}
        description={event.description}
        image={event.image}
        breadcrumbs={[{ label: "Events", to: ROUTES.events }, { label: event.title }]}
      >
        <ButtonLink to={ROUTES.volunteer}>{upcoming ? "Volunteer at this event" : "Get involved"}</ButtonLink>
      </PageHero>

      <Section labelledBy="event-details-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="event-details-heading" className="text-3xl font-medium sm:text-4xl">
              About this event
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-600">{event.description}</p>
            <p className="mt-6 leading-relaxed text-ink-500">
              This event is part of our community-led work. Join us to learn, contribute and connect with people working
              toward practical local change.
            </p>
          </div>

          <aside className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card sm:p-8 lg:col-span-5">
            <Badge tone="gold">{upcoming ? "Upcoming event" : "Past event"}</Badge>
            <dl className="mt-6 space-y-5 text-ink-600">
              <div className="flex gap-3">
                <CalendarDays className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div><dt className="font-semibold text-navy-900">Date</dt><dd>{formatDate(event.startsAt)}</dd></div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div><dt className="font-semibold text-navy-900">Time</dt><dd>{event.time}</dd></div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                <div><dt className="font-semibold text-navy-900">Location</dt><dd>{event.location}</dd></div>
              </div>
            </dl>
          </aside>
        </div>
      </Section>

      <CTASection
        id="event-cta-heading"
        title={upcoming ? "Be part of this event" : "Stay connected to our work"}
        description="Your time, skills and support help community-led initiatives grow."
        primary={{ label: "Become a Volunteer", to: ROUTES.volunteer }}
        secondary={{ label: "View All Events", to: ROUTES.events }}
      />
    </>
  );
}

export default function EventDetailPage() {
  const { slug = "" } = useParams();
  const state = useAsync(() => eventService.getBySlug(slug), [slug]);

  return (
    <AsyncDetail state={state} loadingLabel="Loading event...">
      {(event) => <EventDetail event={event} />}
    </AsyncDetail>
  );
}