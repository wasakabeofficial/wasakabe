import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import { SECTIONS } from '../../../data/sections';
import { useScrollEffect } from '../../../hooks/useScrollEffect';
import MagneticWrapper from '../../motion/MagneticWrapper';
import RollingText from '../../motion/RollingText';
import Button from '../../ui/Button';
import SoundToggle from '../../ui/SoundToggle';

interface HeaderProps {
  activeId: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
}

/** Barra de navegación fija: transparente arriba, sólida y con desenfoque al hacer scroll. */
export default function Header({ activeId, menuOpen, onToggleMenu }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useScrollEffect((scrollY) => setScrolled(scrollY > 40));

  // La línea de subrayado se desliza y cambia de ancho hasta el enlace activo.
  useEffect(() => {
    const place = () => {
      const nav = navRef.current;
      const line = lineRef.current;
      const link = linkRefs.current[activeId];
      if (!nav || !line || !link) return;

      const navBox = nav.getBoundingClientRect();
      const linkBox = link.getBoundingClientRect();

      line.style.width = `${linkBox.width}px`;
      line.style.transform = `translateX(${linkBox.left - navBox.left}px)`;
      line.style.opacity = '1';
    };

    place();
    window.addEventListener('resize', place);
    void document.fonts?.ready.then(place);

    return () => window.removeEventListener('resize', place);
  }, [activeId]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b px-6 py-5 transition-[background-color,border-color] duration-300 md:px-12 lg:px-20 ${
        scrolled ? 'border-white/20 bg-amethyst' : 'border-lightpurple/10 bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <MagneticWrapper>
          <a href="#home" className="group flex items-center gap-3" aria-label="WASAKABE, home">
            <span
              className={`flex h-10 w-10 items-center justify-center border bg-deep/80 font-serif text-base tracking-widest text-white transition-[transform,border-color] duration-300 group-hover:scale-105 ${
                scrolled ? 'border-white/60' : 'border-lavender/60'
              }`}
            >
              WK
            </span>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.26em] text-white">
              WASAKABE
            </span>
          </a>
        </MagneticWrapper>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative hidden items-center gap-7 text-[13px] font-medium tracking-wide nav:flex"
          style={scrolled ? ({ '--rolling-hover': '#fff' } as CSSProperties) : undefined}
        >
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              ref={(element) => {
                linkRefs.current[section.id] = element;
              }}
              href={`#${section.id}`}
              aria-current={activeId === section.id ? 'true' : undefined}
              className={`rolling-host py-1 transition-colors ${
                activeId === section.id
                  ? 'text-white'
                  : scrolled
                    ? 'text-white/80 hover:text-white'
                    : 'text-lightpurple/80 hover:text-white'
              }`}
            >
              <RollingText text={section.label} />
            </a>
          ))}
          <span
            ref={lineRef}
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-1 left-0 h-px opacity-0 transition-[transform,width,opacity,background-color] duration-300 ease-out-expo ${
              scrolled ? 'bg-white' : 'bg-lavender'
            }`}
          />
        </nav>

        <div className="flex items-center gap-4">
          <SoundToggle onAccent={scrolled} />
          <span className="hidden sm:inline-flex">
            <Button href="#contact" size="sm">
              Contact us
            </Button>
          </span>
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={onToggleMenu}
            className="p-2 text-white focus:outline-none nav:hidden"
          >
            {menuOpen ? (
              <MdClose size={24} aria-hidden="true" />
            ) : (
              <MdMenu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
