import { Heart } from "lucide-react";
import { SiteImage } from "@/components/common/SiteImage";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/constants/routes";
import { heroContent } from "@/data/homeContent";
import { archShape } from "@/utils/styles";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy-950 pt-14 pb-32 text-ivory-100 sm:pt-20 lg:pt-24 lg:pb-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-40 size-144 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-120 rounded-full bg-gold-500/15 blur-3xl" />
      </div>

      <Container className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <h1 id="hero-heading" className="text-[2rem] leading-[1.12] font-medium text-ivory-50 sm:text-5xl">
              {heroContent.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">{heroContent.description}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink to={ROUTES.donate} size="lg" leftIcon={<Heart className="size-5" aria-hidden="true" />}>
                Donate Now
              </ButtonLink>
              <ButtonLink to={ROUTES.programs} size="lg" variant="outline" tone="dark">
                Explore Our Work
              </ButtonLink>
            </div>
            <div className="mt-6">
              <ButtonLink to={ROUTES.volunteer} variant="text" tone="dark">
                Become a Volunteer
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <div className={`relative aspect-4/5 overflow-hidden border border-white/10 shadow-2xl ${archShape}`}>
            <SiteImage
              image={heroContent.image}
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent"
            />
          </div>

        </Reveal>
      </Container>
    </section>
  );
}
