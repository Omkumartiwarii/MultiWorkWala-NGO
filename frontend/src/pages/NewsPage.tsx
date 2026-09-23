import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { CTASection } from "@/components/common/CTASection";
import { FilterBar, type FilterOption } from "@/components/common/FilterBar";
import { PageHero } from "@/components/common/PageHero";
import { SearchBar } from "@/components/common/SearchBar";
import { SiteImage } from "@/components/common/SiteImage";
import { Seo } from "@/components/common/Seo";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { pageMetadata } from "@/config/seo";
import { ROUTES } from "@/constants/routes";
import { useAsync } from "@/hooks/useAsync";
import { blogService } from "@/services/blogService";
import { formatDate } from "@/utils/date";
import type { BlogPost } from "@/types";

type StoryFilter = "all" | string;

const matches = (post: BlogPost, filter: StoryFilter, query: string) => {
  const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
  return (filter === "all" || post.category === filter) && (!query || haystack.includes(query.toLowerCase()));
};

export default function NewsPage() {
  const state = useAsync(blogService.getAll);
  const [filter, setFilter] = useState<StoryFilter>("all");
  const [query, setQuery] = useState("");

  return (
    <>
      <Seo {...pageMetadata.news} />
      <PageHero
        title="News & Stories"
        description="A window into the questions we are asking, the people we are learning with and the community impact we are working toward."
        breadcrumbs={[{ label: "News & Stories" }]}
      />

      <AsyncContent
        state={state}
        loadingLabel="Loading stories..."
        emptyTitle="No stories are available at the moment."
        skeleton={<Section tone="white"><div className="grid gap-6 md:grid-cols-3"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div></Section>}
      >
        {(posts) => {
          const featured = posts.find((post) => post.featured) ?? posts[0];
          const categories: FilterOption<StoryFilter>[] = [
            { value: "all", label: "All stories" },
            ...Array.from(new Set(posts.map((post) => post.category))).map((category) => ({ value: category, label: category })),
          ];
          const filtered = posts.filter((post) => post.id !== featured?.id && matches(post, filter, query));
          const latest = posts.slice(0, 3);

          return (
            <>
              {featured && (
                <Section tone="ivory" labelledBy="featured-story-heading">
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="overflow-hidden rounded-4xl lg:col-span-7">
                      <SiteImage image={featured.image} className="aspect-16/10 w-full object-cover" />
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Featured story</p>
                      <p className="mt-5 text-sm font-semibold text-gold-700">{featured.category}</p>
                      <h2 id="featured-story-heading" className="mt-3 text-3xl font-medium sm:text-4xl">{featured.title}</h2>
                      <p className="mt-5 leading-relaxed text-ink-500">{featured.excerpt}</p>
                      <p className="mt-5 text-sm text-ink-500"><time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> · Sample editorial content</p>
                      <div className="mt-7"><ButtonLink to={ROUTES.newsDetail(featured.slug)} rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}>Read Story</ButtonLink></div>
                    </div>
                  </div>
                </Section>
              )}

              <Section tone="white" labelledBy="story-library-heading">
                <div className="flex flex-col gap-6 border-b border-navy-900/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Story library</p>
                    <h2 id="story-library-heading" className="mt-3 text-3xl font-medium sm:text-4xl">Explore our latest thinking</h2>
                  </div>
                  <div className="w-full max-w-sm"><SearchBar value={query} onChange={setQuery} label="Search stories" /></div>
                </div>
                <div className="mt-8"><FilterBar label="Filter stories by category" options={categories} value={filter} onChange={setFilter} /></div>
                {filtered.length > 0 ? (
                  <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((post) => <BlogCard key={post.id} post={post} />)}</div>
                ) : (
                  <p className="mt-10 rounded-2xl border border-navy-900/10 bg-ivory-100 p-8 text-ink-500">No stories match your search.</p>
                )}
              </Section>

              <Section tone="sand" labelledBy="latest-updates-heading">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.18em] text-brand-700 uppercase">Latest Updates</p>
                    <h2 id="latest-updates-heading" className="mt-3 text-3xl font-medium sm:text-4xl">Small notes from the work</h2>
                    <p className="mt-5 leading-relaxed text-ink-500">These sample updates show where announcements and short activity notes can live. Verified updates will replace them.</p>
                  </div>
                  <div className="divide-y divide-navy-900/10 rounded-2xl border border-navy-900/10 bg-white px-6">
                    {latest.map((post) => <ButtonLink key={post.id} to={ROUTES.newsDetail(post.slug)} variant="text" className="flex w-full items-center justify-between gap-6 py-5 text-left"><span><span className="block text-xs font-semibold tracking-[0.14em] text-gold-700 uppercase">{post.category}</span><span className="mt-1 block font-semibold text-navy-900">{post.title}</span></span><ArrowRight className="size-4 shrink-0" aria-hidden="true" /></ButtonLink>)}
                  </div>
                </div>
              </Section>
            </>
          );
        }}
      </AsyncContent>

      <CTASection id="news-cta-heading" title="Be Part of the Change" description="Donate, volunteer or share your skills to help community-led work grow." primary={{ label: "Donate Now", to: ROUTES.donate }} secondary={{ label: "Volunteer With Us", to: ROUTES.volunteer }} />
    </>
  );
}