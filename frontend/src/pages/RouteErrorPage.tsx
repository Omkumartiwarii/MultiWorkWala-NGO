import { ErrorState } from "@/components/ui/ErrorState";
import { Container } from "@/components/ui/Container";

/** Shown when a route fails to load (for example a lazy chunk that could not be fetched). */
export function RouteErrorPage() {
  return (
    <section className="bg-ivory-100 py-24">
      <Container size="narrow">
        <ErrorState onRetry={() => window.location.reload()} />
      </Container>
    </section>
  );
}
