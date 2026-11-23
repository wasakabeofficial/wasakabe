import { useCallback, useState } from 'react'
import { SECTION_IDS } from '../../data/sections'
import { useActiveSection } from '../../hooks/useActiveSection'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import MobileMenu from '../../components/layout/MobileMenu'
import Preloader from '../../components/layout/Preloader'
import ProgressBar from '../../components/layout/ProgressBar'
import SideIndicator from '../../components/layout/SideIndicator'
import ToastProvider from '../../components/ui/Toast/ToastProvider'
import About from '../../sections/About'
import Blog from '../../sections/Blog'
import Channels from '../../sections/Channels'
import Contact from '../../sections/Contact'
import Hero from '../../sections/Hero'
import Services from '../../sections/Services'
import WhoWeServe from '../../sections/WhoWeServe'

export default function Home() {
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)

  const handlePreloaderDone = useCallback(() => setReady(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <ToastProvider>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-lightpurple focus:px-4 focus:py-2 focus:text-deep"
      >
        Skip to content
      </a>

      <Preloader onDone={handlePreloaderDone} />
      <ProgressBar />
      <SideIndicator activeId={activeId} />
      <Header activeId={activeId} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      <main>
        <Hero ready={ready} />
        <Services />
        <About />
        <WhoWeServe />
        <Channels />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </ToastProvider>
  )
}
