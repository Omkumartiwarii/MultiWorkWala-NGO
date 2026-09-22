import { Seo } from "@/components/common/Seo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/constants/routes";

interface PlannedPageProps {
  title: string;
  description: string;
  /** Build phase in which this page is implemented. */
  phase: number;
}

/**
 * TEMPORARY SCAFFOLD. Keeps every planned route navigable while the build is
 * phased. Each route using this is replaced by its real page in the noted phase.
 */
export function PlannedPage({ title, description, phase }: PlannedPageProps) {
  return (
    <>
      <Seo title={title} description={description} />
      <section aria-labelledby="planned-heading" className="bg-ivory-100 py-24 sm:py-32">
        <Container size="narrow" className="text-center">
          <p className="text-sm font-semibold text-gold-700">Planned for build phase {phase}</p>
          <h1 id="planned-heading" className="mt-4 text-4xl font-medium sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-500">
            This page is part of the planned site structure and hasn't been built yet.
          </p>
          <div className="mt-10">
            <ButtonLink to={ROUTES.home} variant="secondary">
              Back to home
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
