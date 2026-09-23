import { BlogCard } from "@/components/cards/BlogCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { sectionCopy } from "@/data/homeContent";
import { useAsync } from "@/hooks/useAsync";
import { blogService } from "@/services/blogService";

export function LatestStories() {
  const state = useAsync(() => blogService.getLatest(3));

  return (
    <Section tone="white" labelledBy="news-heading">
      <SectionHeading
        id="news-heading"
        {...sectionCopy.news}
        action={
          <ButtonLink to={ROUTES.news} variant="outline">
            View All Stories
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <AsyncContent state={state} loadingLabel="Loading stories…" emptyTitle="No stories available at the moment.">
          {(posts) => (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <li key={post.id}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <BlogCard post={post} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </AsyncContent>
      </div>
    </Section>
  );
}
