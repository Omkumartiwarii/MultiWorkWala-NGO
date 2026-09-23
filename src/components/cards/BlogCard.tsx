import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SiteImage } from "@/components/common/SiteImage";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/utils/date";
import { stretchedLink } from "@/utils/styles";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="aspect-16/10 overflow-hidden">
        <SiteImage
          image={post.image}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Badge tone="brand" className="self-start">
          {post.category}
        </Badge>
        <h3 className="mt-4 text-xl leading-snug font-medium">
          <Link to={ROUTES.newsDetail(post.slug)} className={stretchedLink}>
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 leading-relaxed text-ink-500">{post.excerpt}</p>

        <div className="mt-auto pt-6">
          <p className="text-sm text-ink-500">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true"> · </span>
            {post.author.name}
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
          </p>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
            Read more
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Card>
  );
}
