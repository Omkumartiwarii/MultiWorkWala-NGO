import { EventCard, FeaturedEventCard } from "@/components/cards/EventCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { sectionCopy } from "@/data/homeContent";
import { useAsync } from "@/hooks/useAsync";
import { eventService } from "@/services/eventService";

export function UpcomingEvents() {
  const state = useAsync(() => eventService.getUpcoming(3));

  return (
    <Section labelledBy="events-heading">
      <SectionHeading
        id="events-heading"
        {...sectionCopy.events}
        action={
          <ButtonLink to={ROUTES.events} variant="outline">
            View All Events
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <AsyncContent
          state={state}
          loadingLabel="Loading events…"
          emptyTitle="No upcoming events at the moment."
          emptyDescription="Please check back soon."
          skeletonCount={2}
        >
          {([featured, ...others]) => (
            <div className="grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <FeaturedEventCard event={featured} />
              </Reveal>
              {others.length > 0 && (
                <ul className="flex flex-col gap-6 lg:col-span-5">
                  {others.map((event, index) => (
                    <li key={event.id}>
                      <Reveal delay={0.1 + index * 0.08}>
                        <EventCard event={event} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </AsyncContent>
      </div>
    </Section>
  );
}
