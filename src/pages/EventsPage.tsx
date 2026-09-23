import { useState } from "react";
import { EventCard, FeaturedEventCard } from "@/components/cards/EventCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { CTASection } from "@/components/common/CTASection";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { Skeleton } from "@/components/ui/Skeleton";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/config/seo";
import { ROUTES } from "@/constants/routes";
import { useAsync } from "@/hooks/useAsync";
import { eventService } from "@/services/eventService";
import { isFuture } from "@/utils/date";
import type { NgoEvent } from "@/types";

type EventFilter = "all" | string;

const getCategories = (items: NgoEvent[]): FilterOption<EventFilter>[] => [
  { value: "all", label: "All events" },
  ...Array.from(new Set(items.map((event) => event.category))).map((category) => ({ value: category, label: category })),
];

const matchesFilter = (event: NgoEvent, filter: EventFilter): boolean => filter === "all" || event.category === filter;

export default function EventsPage() {
  const state = useAsync(eventService.getAll);
  const [filter, setFilter] = useState<EventFilter>("all");

  return (
    <>
      <Seo {...pageMetadata.events} />
      <PageHero
        title="Events that bring people together"
        description="Join learning sessions, health camps, workshops and community activities led with the people we serve."
        breadcrumbs={[{ label: "Events" }]}
      />

      <AsyncContent
        state={state}
        loadingLabel="Loading events..."
        emptyTitle="No events are available at the moment."
        skeleton={
          <Section tone="ivory" labelledBy="events-loading-heading">
            <div className="grid gap-6 lg:grid-cols-3">
              <Skeleton className="h-80 lg:col-span-2" />
              <Skeleton className="h-80" />
            </div>
          </Section>
        }
      >
        {(items) => {
          const filtered = items.filter((event) => matchesFilter(event, filter));
          const upcoming = filtered.filter((event) => isFuture(event.startsAt));
          const past = filtered.filter((event) => !isFuture(event.startsAt)).reverse();
          const categories = getCategories(items);
          const featured = upcoming[0];
          const secondary = upcoming.slice(1);

          return (
            <>
              <Section tone="ivory" labelledBy="upcoming-events-heading">
                <div className="flex flex-col gap-6 border-b border-navy-900/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Upcoming</p>
                    <h2 id="upcoming-events-heading" className="mt-3 text-3xl font-medium sm:text-4xl">
                      Find your next way to participate
                    </h2>
                  </div>
                  <FilterBar label="Filter events by category" options={categories} value={filter} onChange={setFilter} />
                </div>

                {featured ? (
                  <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    <FeaturedEventCard event={featured} />
                    <div className="grid gap-4">
                      {secondary.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-10 rounded-2xl border border-navy-900/10 bg-white p-8 text-ink-500">
                    No upcoming events match this category.
                  </p>
                )}
              </Section>

              {past.length > 0 && (
                <Section tone="white" labelledBy="past-events-heading">
                  <p className="text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Past events</p>
                  <h2 id="past-events-heading" className="mt-3 text-3xl font-medium sm:text-4xl">
                    Moments from our community work
                  </h2>
                  <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {past.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </Section>
              )}
            </>
          );
        }}
      </AsyncContent>

      <CTASection
        id="events-cta-heading"
        title="Bring your time and skills"
        description="Volunteer at an event, support a program or help us reach more people in the community."
        primary={{ label: "Become a Volunteer", to: ROUTES.volunteer }}
        secondary={{ label: "Support Our Work", to: ROUTES.donate }}
      />
    </>
  );
}