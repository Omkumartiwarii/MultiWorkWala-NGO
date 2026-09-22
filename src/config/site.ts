export const siteConfig = {
  /** Base URL for canonical and Open Graph links. Set VITE_SITE_URL in production. */
  siteUrl: import.meta.env.VITE_SITE_URL || window.location.origin,
  /** Shows a "preview build" bar while content is demo/placeholder. Set to false at launch. */
  showDemoNotice: true,
  /** Keeps search engines away from the demo build. Set to true at launch. */
  allowIndexing: false,
} as const;
