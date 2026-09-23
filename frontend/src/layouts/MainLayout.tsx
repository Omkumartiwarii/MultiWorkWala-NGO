import { Outlet, ScrollRestoration } from "react-router-dom";
import { BackToTop } from "@/components/common/BackToTop";
import { DemoBanner } from "@/components/common/DemoBanner";
import { NavigationProgress } from "@/components/common/NavigationProgress";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function MainLayout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <NavigationProgress />
      <DemoBanner />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <ScrollRestoration />
    </>
  );
}
