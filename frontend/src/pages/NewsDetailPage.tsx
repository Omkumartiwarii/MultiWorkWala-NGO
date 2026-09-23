import { useParams } from "react-router-dom";
import { AsyncDetail } from "@/components/common/AsyncDetail";
import { CTASection } from "@/components/common/CTASection";
import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { useAsync } from "@/hooks/useAsync";
import { blogService } from "@/services/blogService";
import { formatDate } from "@/utils/date";
import type { BlogPost } from "@/types";

function Article({ post }: { post: BlogPost }) {
  return (
    <>
      <Seo title={post.title} description={post.excerpt} image={post.image.src} />
      <PageHero eyebrow={post.category} title={post.title} description={post.excerpt} image={post.image} breadcrumbs={[{ label: "News & Stories", to: ROUTES.news }, { label: post.title }]}>
        <p className="text-sm text-navy-100"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · Sample editorial content · {post.readingMinutes} min read</p>
      </PageHero>
      <Section labelledBy="article-heading">
        <article className="mx-auto max-w-3xl">
          <h2 id="article-heading" className="text-3xl font-medium sm:text-4xl">A note from our team</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-600">{post.excerpt}</p>
          <p className="mt-6 leading-relaxed text-ink-500">This is sample editorial content for the website structure. It describes an area of work without claiming a verified result, named participant or completed activity. Published stories will be updated with consent-led reporting, context and links to supporting information.</p>
          <p className="mt-6 leading-relaxed text-ink-500">We believe credible storytelling starts with listening carefully, sharing context and making room for community voices. As this work develops, this article space can carry the details that help supporters understand how to participate.</p>
          <div className="mt-10"><ButtonLink to={ROUTES.news} variant="outline">Back to News & Stories</ButtonLink></div>
        </article>
      </Section>
      <CTASection id="article-cta-heading" title="Be Part of the Change" description="Help us build thoughtful, community-led work." primary={{ label: "Donate Now", to: ROUTES.donate }} secondary={{ label: "Volunteer With Us", to: ROUTES.volunteer }} />
    </>
  );
}

export default function NewsDetailPage() {
  const { slug = "" } = useParams();
  const state = useAsync(() => blogService.getBySlug(slug), [slug]);
  return <AsyncDetail state={state} loadingLabel="Loading story...">{(post) => <Article post={post} />}</AsyncDetail>;
}