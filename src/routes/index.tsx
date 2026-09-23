import type { ComponentType } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { PageLoader } from "@/components/common/PageLoader";
import { MainLayout } from "@/layouts/MainLayout";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import NewsPage from "@/pages/NewsPage";
import NewsDetailPage from "@/pages/NewsDetailPage";
import { RouteErrorPage } from "@/pages/RouteErrorPage";
import ImpactPage from "@/pages/ImpactPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SiteSectionPage from "@/pages/SiteSectionPage";

type PageModule = { default: ComponentType };

/** Code-splits a page: its chunk downloads only when the route is visited. */
const page = (load: () => Promise<PageModule>): Pick<RouteObject, "lazy"> => ({
  lazy: async () => ({ Component: (await load()).default }),
});

const siteSection = (kind: Parameters<typeof SiteSectionPage>[0]["kind"], title: string, description: string): Pick<RouteObject, "element"> => ({
  element: <SiteSectionPage kind={kind} title={title} description={description} />,
});

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
          { path: "impact", element: <ImpactPage /> },
          { path: "events", element: <EventsPage /> },
          { path: "events/:slug", element: <EventDetailPage /> },
          { path: "news", element: <NewsPage /> },
          { path: "news/:slug", element: <NewsDetailPage /> },
          { path: "gallery", ...siteSection("gallery", "Gallery", "A visual collection of the community settings and activities represented across this site.") },
          { path: "donate", ...siteSection("donate", "Donate", "Choose how you would like to support the organization's work and contact the team for verified next steps.") },
          { path: "volunteer", ...siteSection("volunteer", "Volunteer", "Share your time, skills and availability with the team.") },
          { path: "partnership", ...siteSection("partnership", "Partnerships & CSR", "Start a conversation about a responsible partnership or CSR collaboration.") },
          { path: "team", ...siteSection("team", "Our Team", "Learn how to request current, verified information about the people behind the work.") },
          { path: "reports", ...siteSection("reports", "Reports & Transparency", "Find verified reports and request organizational documents from the team.") },
          { path: "contact", ...siteSection("contact", "Contact Us", "Use the official contact details to reach the organization.") },
          { path: "faq", ...siteSection("faq", "Frequently Asked Questions", "Clear answers about participation, support and contacting the organization.") },
          { path: "privacy-policy", ...siteSection("privacy", "Privacy Policy", "The principles used when handling information shared through this website.") },
          { path: "terms", ...siteSection("terms", "Terms & Conditions", "Basic terms for using this website and its illustrative information.") },
          { path: "cancellation-policy", ...siteSection("cancellation", "Cancellation Policy", "How to contact the organization about a donation cancellation or refund request.") },

          { path: "404", element: <NotFoundPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
