import type { ComponentType } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { PageLoader } from "@/components/common/PageLoader";
import { MainLayout } from "@/layouts/MainLayout";
import { PlannedPage } from "@/pages/PlannedPage";
import { RouteErrorPage } from "@/pages/RouteErrorPage";

type PageModule = { default: ComponentType };

/** Code-splits a page: its chunk downloads only when the route is visited. */
const page = (load: () => Promise<PageModule>): Pick<RouteObject, "lazy"> => ({
  lazy: async () => ({ Component: (await load()).default }),
});

/** Placeholder for pages built in later phases. See PlannedPage. */
const planned = (title: string, description: string, phase: number): Pick<RouteObject, "element"> => ({
  element: <PlannedPage title={title} description={description} phase={phase} />,
});

const notFound = page(() => import("@/pages/NotFoundPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    HydrateFallback: PageLoader,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, ...page(() => import("@/pages/HomePage")) },

          { path: "about", ...page(() => import("@/pages/AboutPage")) },
          { path: "programs", ...page(() => import("@/pages/ProgramsPage")) },
          { path: "programs/:slug", ...page(() => import("@/pages/ProgramDetailPage")) },
          { path: "projects", ...page(() => import("@/pages/ProjectsPage")) },
          { path: "projects/:slug", ...page(() => import("@/pages/ProjectDetailPage")) },
          { path: "impact", ...planned("Our Impact", "Measured impact across communities and programs.", 9) },
          { path: "events", ...planned("Events", "Upcoming and past events.", 10) },
          { path: "events/:slug", ...planned("Event", "Event details and registration.", 10) },
          { path: "news", ...planned("News & Stories", "News, updates and stories.", 11) },
          { path: "news/:slug", ...planned("Article", "Article details.", 11) },
          { path: "gallery", ...planned("Gallery", "Photos from our work.", 12) },
          { path: "donate", ...planned("Donate", "Support our programs.", 13) },
          { path: "volunteer", ...planned("Volunteer", "Share your time and skills.", 14) },
          { path: "partnership", ...planned("Partnerships & CSR", "Partner with us.", 15) },
          { path: "team", ...planned("Our Team", "The people behind our work.", 16) },
          { path: "reports", ...planned("Reports & Transparency", "Reports, policies and documents.", 17) },
          { path: "contact", ...planned("Contact Us", "Get in touch.", 18) },
          { path: "faq", ...planned("Frequently Asked Questions", "Answers to common questions.", 19) },
          { path: "privacy-policy", ...planned("Privacy Policy", "How we handle personal information.", 19) },
          { path: "terms", ...planned("Terms & Conditions", "Terms of use.", 19) },
          { path: "cancellation-policy", ...planned("Cancellation Policy", "Donation cancellation and refunds.", 19) },

          { path: "404", ...notFound },
          { path: "*", ...notFound },
        ],
      },
    ],
  },
]);
