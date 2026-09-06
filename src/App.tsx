import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const HomePage = lazy(() => import("./presentation/pages/HomePage"));
const TerminosPage = lazy(() => import("./presentation/pages/TerminosPage"));
const PrivacidadPage = lazy(() => import("./presentation/pages/PrivacidadPage"));
const ServiceDetailPage = lazy(() => import("./presentation/pages/ServiceDetailPage"));
const BlogPostPage = lazy(() => import("./presentation/pages/BlogPostPage"));

export default function App() {
  const path = window.location.pathname;

  if (path === "/terminos-y-condiciones") {
    return (
      <>
        <Suspense fallback={null}>
          <TerminosPage />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  if (path === "/aviso-de-privacidad") {
    return (
      <>
        <Suspense fallback={null}>
          <PrivacidadPage />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  if (path.startsWith("/servicios/")) {
    const slug = path.replace("/servicios/", "").replace(/\/$/, "");
    return (
      <>
        <Suspense fallback={null}>
          <ServiceDetailPage slug={slug} />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "").replace(/\/$/, "");
    return (
      <>
        <Suspense fallback={null}>
          <BlogPostPage slug={slug} />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
