import { useLocation } from "react-router-dom";
import { defaultOgImage } from "@/config/seo";
import { organization } from "@/config/organization";
import { siteConfig } from "@/config/site";
import type { PageMetadata } from "@/types";

interface SeoProps extends PageMetadata {
  type?: "website" | "article";
}

/**
 * Renders page metadata. React 19 hoists <title>, <meta> and <link> into <head>
 * automatically, so no helmet library is needed.
 */
export function Seo({ title, description, image = defaultOgImage, type = "website" }: SeoProps) {
  const { pathname } = useLocation();
  const fullTitle = title.includes(organization.name) ? title : `${title} | ${organization.name}`;
  const canonical = new URL(pathname, siteConfig.siteUrl).toString();
  const imageUrl = new URL(image, siteConfig.siteUrl).toString();

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {!siteConfig.allowIndexing && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:site_name" content={organization.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
