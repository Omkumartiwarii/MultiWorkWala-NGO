import { CTASection } from "@/components/common/CTASection";
import { ImpactBand } from "@/sections/impact/ImpactBand";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/config/seo";
import { ROUTES } from "@/constants/routes";

export default function ImpactPage() {
  return (
    <>
      <Seo {...pageMetadata.impact} />

      {/* Hero */}
      <PageHero
        title="Our Impact"
        description="Creating meaningful and measurable change by working alongside communities, local organizations, volunteers and institutions."
        breadcrumbs={[{ label: "Impact" }]}
      />

      {/* Impact Stats */}
      <ImpactBand
        id="impact-stats-heading"
        title="Our impact at a glance"
        description="Together, we are working to expand access to education, healthcare, livelihood opportunities and community support."
        showLink={false}
      />

      {/* Impact Introduction */}
      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                How we create change
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
                Impact that starts with listening
              </h2>

              <p className="mt-6 leading-8 text-ink-500">
                We believe sustainable change begins with understanding what communities actually need. Our work starts
                by listening to families, community members, volunteers and local partners.
              </p>

              <p className="mt-4 leading-8 text-ink-500">
                We then work together to develop practical initiatives that address local challenges and create
                opportunities for people to build more secure and independent futures.
              </p>
            </div>

            <div className="rounded-3xl border border-ivory-300 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-navy-900">From activity to meaningful outcomes</h3>

              <div className="mt-7 space-y-6">
                <div className="border-l-2 border-brand-700 pl-5">
                  <h4 className="font-semibold text-navy-900">01. Listen</h4>
                  <p className="mt-1 text-sm leading-6 text-ink-500">
                    Understand community needs, challenges and priorities.
                  </p>
                </div>

                <div className="border-l-2 border-brand-700 pl-5">
                  <h4 className="font-semibold text-navy-900">02. Collaborate</h4>
                  <p className="mt-1 text-sm leading-6 text-ink-500">
                    Work with local groups, volunteers and institutions.
                  </p>
                </div>

                <div className="border-l-2 border-brand-700 pl-5">
                  <h4 className="font-semibold text-navy-900">03. Act</h4>
                  <p className="mt-1 text-sm leading-6 text-ink-500">
                    Deliver programs designed around practical community needs.
                  </p>
                </div>

                <div className="border-l-2 border-brand-700 pl-5">
                  <h4 className="font-semibold text-navy-900">04. Measure</h4>
                  <p className="mt-1 text-sm leading-6 text-ink-500">
                    Track participation, reach and outcomes to improve future initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Our focus areas</span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
              Where we are creating impact
            </h2>

            <p className="mt-5 leading-7 text-ink-500">
              Our initiatives focus on areas that can strengthen families, communities and opportunities for the future.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Education */}
            <div className="group rounded-2xl border border-ink-100 bg-ivory-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                01
              </div>

              <h3 className="mt-6 text-xl font-semibold text-navy-900">Education</h3>

              <p className="mt-3 text-sm leading-6 text-ink-500">
                Supporting access to learning, educational resources and opportunities for children and young people.
              </p>
            </div>

            {/* Healthcare */}
            <div className="group rounded-2xl border border-ink-100 bg-ivory-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                02
              </div>

              <h3 className="mt-6 text-xl font-semibold text-navy-900">Healthcare</h3>

              <p className="mt-3 text-sm leading-6 text-ink-500">
                Promoting awareness and access to essential health-related support and community initiatives.
              </p>
            </div>

            {/* Livelihoods */}
            <div className="group rounded-2xl border border-ink-100 bg-ivory-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                03
              </div>

              <h3 className="mt-6 text-xl font-semibold text-navy-900">Livelihoods</h3>

              <p className="mt-3 text-sm leading-6 text-ink-500">
                Helping create pathways towards skills, employment and sustainable livelihood opportunities.
              </p>
            </div>

            {/* Community */}
            <div className="group rounded-2xl border border-ink-100 bg-ivory-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                04
              </div>

              <h3 className="mt-6 text-xl font-semibold text-navy-900">Community</h3>

              <p className="mt-3 text-sm leading-6 text-ink-500">
                Building stronger communities through participation, partnerships and volunteer engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Our approach</span>

                <h2 className="mt-4 text-3xl font-bold text-navy-900 md:text-4xl">
                  Communities are partners in our work
                </h2>

                <p className="mt-6 leading-8 text-ink-500">
                  We do not believe in a one-size-fits-all approach. Every community has different needs, strengths and
                  priorities.
                </p>

                <p className="mt-4 leading-8 text-ink-500">
                  By involving local communities in planning and implementation, we aim to make our programs more
                  relevant, inclusive and sustainable.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-100 bg-ivory-100 p-6">
                  <h3 className="font-semibold text-navy-900">Community-led</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-500">
                    Solutions shaped around local needs and experiences.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink-100 bg-ivory-100 p-6">
                  <h3 className="font-semibold text-navy-900">Collaborative</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-500">Partnerships with volunteers and institutions.</p>
                </div>

                <div className="rounded-2xl border border-ink-100 bg-ivory-100 p-6">
                  <h3 className="font-semibold text-navy-900">Inclusive</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-500">
                    Creating opportunities for people from different backgrounds.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink-100 bg-ivory-100 p-6">
                  <h3 className="font-semibold text-navy-900">Measurable</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-500">
                    Using evidence and feedback to improve our work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Looking ahead</span>

          <h2 className="mt-4 text-3xl font-bold text-navy-900 md:text-4xl">Growing our impact together</h2>

          <p className="mt-6 leading-8 text-ink-500">
            Our impact grows when more people contribute their time, skills, resources and ideas. We are committed to
            strengthening existing initiatives, building meaningful partnerships and reaching more communities over
            time.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ButtonLink to={ROUTES.volunteer} size="md">
              Become a Volunteer
            </ButtonLink>

            <ButtonLink to={ROUTES.donate} variant="outline" size="md">
              Support Our Work
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        id="impact-cta-heading"
        title="Help us create more impact"
        description="Support our programs and help us reach more families."
        primary={{
          label: "Donate Now",
          to: ROUTES.donate,
        }}
        secondary={{
          label: "Become a Volunteer",
          to: ROUTES.volunteer,
        }}
      />
    </>
  );
}
