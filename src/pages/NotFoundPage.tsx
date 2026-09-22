import { Seo } from "@/components/common/Seo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/config/seo";
import { ROUTES } from "@/constants/routes";

export default function NotFoundPage() {
  return (
    <>
      <Seo {...pageMetadata.notFound} />
      <section aria-labelledby="not-found-heading" className="bg-ivory-100 py-24 sm:py-32">
        <Container size="narrow" className="text-center">
          <p aria-hidden="true" className="font-display text-8xl font-medium text-gold-500 sm:text-9xl">
            404
          </p>
          <h1 id="not-found-heading" className="mt-4 text-3xl font-medium sm:text-4xl">
            The page you're looking for couldn't be found.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-500">
            It may have moved, or the link might be incorrect. These pages may help you find your way.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to={ROUTES.home} size="lg">
              Go Home
            </ButtonLink>
            <ButtonLink to={ROUTES.programs} size="lg" variant="outline">
              Explore Programs
            </ButtonLink>
            <ButtonLink to={ROUTES.contact} size="lg" variant="ghost">
              Contact Us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
