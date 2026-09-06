import Navbar from "../components/layout/Navbar";
import Hero from "../sections/Hero/Hero";
import Services from "../sections/Services/Services";
import About from "../sections/About/About";
import Experience from "../sections/Experience/Experience";
import Canal from "../sections/Canal/Canal";
import Blog from "../sections/Blog/Blog";
import Contact from "../sections/Contact/Contact";
import Footer from "../sections/Footer/Footer";

export default function HomePage() {
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
    </>
  );
}
