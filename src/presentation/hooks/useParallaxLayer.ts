import { useEffect, useRef } from "react";

/**
 * Desplaza el elemento a una fracción (`speed`) del scroll mientras su
 * sección contenedora está en pantalla. El listener de scroll solo se
 * conecta mientras la sección es visible (IntersectionObserver) y solo
 * muta `transform` vía rAF, por lo que nunca bloquea ni reemplaza el
 * scroll nativo del navegador.
 */
export function useParallaxLayer<Element extends HTMLElement>(speed: number) {
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    const section = element?.closest("section");
    if (!element || !section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let sectionTop = 0;
    let ticking = false;

    const measureSectionTop = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
    };

    const applyOffset = () => {
      ticking = false;
      const offset = (window.scrollY - sectionTop) * speed;
      element.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const requestOffsetUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(applyOffset);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          measureSectionTop();
          requestOffsetUpdate();
          window.addEventListener("scroll", requestOffsetUpdate, {
            passive: true,
          });
        } else {
          window.removeEventListener("scroll", requestOffsetUpdate);
        }
      },
      { threshold: 0 },
    );

    const handleResize = () => {
      measureSectionTop();
      requestOffsetUpdate();
    };

    observer.observe(section);
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestOffsetUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, [speed]);

  return elementRef;
}
