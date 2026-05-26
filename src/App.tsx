import { Analytics } from "@vercel/analytics/react";
import Navbar from "./presentation/components/layout/Navbar";
import Hero from "./presentation/sections/Hero/Hero";
import About from "./presentation/sections/About/About";
import Services from "./presentation/sections/Services/Services";
import Experience from "./presentation/sections/Experience/Experience";
import Canal from "./presentation/sections/Canal/Canal";
import Contact from "./presentation/sections/Contact/Contact";
import Footer from "./presentation/sections/Footer/Footer";
import TerminosPage from "./presentation/pages/TerminosPage";
import PrivacidadPage from "./presentation/pages/PrivacidadPage";

export default function App() {
  const path = window.location.pathname;

  if (path === "/terminos-y-condiciones") {
    return (
      <>
        <TerminosPage />
        <Analytics />
      </>
    );
  }

  if (path === "/aviso-de-privacidad") {
    return (
      <>
        <PrivacidadPage />
        <Analytics />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Canal />
      <Contact />
      <Footer />
      <Analytics />
    </>
  );
}
