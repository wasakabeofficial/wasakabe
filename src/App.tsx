import Navbar from "./presentation/components/layout/Navbar";
import Hero from "./presentation/sections/Hero/Hero";
import About from "./presentation/sections/About/About";
import Services from "./presentation/sections/Services/Services";
import Experience from "./presentation/sections/Experience/Experience";
import Canal from "./presentation/sections/Canal/Canal";
import Footer from "./presentation/sections/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Canal />
      <Footer />
    </>
  );
}
