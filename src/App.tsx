import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "./presentation/components/layout/Navbar";
import Hero from "./presentation/sections/Hero/Hero";
import About from "./presentation/sections/About/About";
import Services from "./presentation/sections/Services/Services";
import Experience from "./presentation/sections/Experience/Experience";
import Canal from "./presentation/sections/Canal/Canal";
import Blog from "./presentation/sections/Blog/Blog";
import Contact from "./presentation/sections/Contact/Contact";
import Footer from "./presentation/sections/Footer/Footer";
import TerminosPage from "./presentation/pages/TerminosPage";
import PrivacidadPage from "./presentation/pages/PrivacidadPage";
import ServiceDetailPage from "./presentation/pages/ServiceDetailPage";

export default function App() {
  const path = window.location.pathname;

  if (path === "/terminos-y-condiciones") {
    return (
      <>
        <TerminosPage />
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  if (path === "/aviso-de-privacidad") {
    return (
      <>
        <PrivacidadPage />
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  if (path.startsWith("/servicios/")) {
    const slug = path.replace("/servicios/", "").replace(/\/$/, "");
    return (
      <>
        <ServiceDetailPage slug={slug} />
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Experience />
      <Canal />
      <Blog />
      <Contact />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
