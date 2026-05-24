let active = false;

export function initScrollSmoother(factor = 0.15) {
  if (active) return;
  active = true;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) return;

  let accumulated = 0;
  let rafId: number | null = null;

  const flush = () => {
    rafId = null;
    const top = Math.round(accumulated);
    if (top === 0) return;
    accumulated = 0;
    window.scrollBy({ top, behavior: "smooth" });
  };

  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      accumulated += e.deltaY * factor;

      if (rafId === null) {
        rafId = requestAnimationFrame(flush);
      }
    },
    { passive: false },
  );
}
