import Hero from './components/Hero/Hero.tsx'
import AboutMe from './components/AboutMe/AboutMe.tsx'
import Services from './components/Services/Services.tsx'
import Experience from './components/Experience/Experience.tsx'

export default function App() {
  return (
    <div className="min-h-screen bg-void-black">
      <Hero />
      <AboutMe />
      <Services />
      <Experience />
    </div>
  )
}
