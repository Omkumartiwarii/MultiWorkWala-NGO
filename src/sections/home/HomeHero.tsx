import { Heart } from "lucide-react";
import { ImpactCounter } from "@/components/common/ImpactCounter";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import { heroContent } from "@/data/homeContent";
import { archShape } from "@/utils/styles";
import { getImpactStat } from "@/data/impact";

export function HomeHero() {
  const stat = getImpactStat(heroContent.floatingStatId);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy-950 pt-14 pb-32 text-ivory-100 sm:pt-20 lg:pt-24 lg:pb-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-40 size-[36rem] rounded-full bg-brand-600/25 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-gold-500/15 blur-3xl" />
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
          <div className={`relative aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl ${archShape}`}>
            <img
              src={heroContent.image.src}
              alt={heroContent.image.alt}
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent"
            />
          </div>

          <div className="absolute -bottom-8 left-0 w-64 animate-float rounded-2xl bg-ivory-50 p-5 shadow-lift sm:-left-6">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={stat.icon} className="size-6" />
              </span>
              <div>
                <p className="font-display text-3xl leading-none font-medium text-navy-900">
                  <ImpactCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm font-medium text-ink-600">{stat.label}</p>
              </div>
            </div>
            <p className="mt-3 border-t border-navy-900/10 pt-3 text-xs text-ink-500">{heroContent.floatingStatNote}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
