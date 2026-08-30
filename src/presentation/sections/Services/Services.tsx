import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { MdCode, MdAutoAwesome, MdVideocam, MdSchool } from "react-icons/md";
import { useServicesContent } from "../../hooks/useServicesContent";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import "./Services.css";

const ICONS = [MdCode, MdAutoAwesome, MdVideocam, MdSchool];
const ACCENTS = [
  "var(--color-gold-400)",
  "var(--color-crim-400)",
  "var(--color-gold-400)",
  "var(--color-crim-400)",
];
const AUTOPLAY_MS = 5000;

export default function Services() {
  const { data: services, loading } = useServicesContent();
  const { elementRef, isVisible } = useRevealOnScroll<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardsLengthRef = useRef(0);

  const cards = services?.cards ?? [];

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (cardsLengthRef.current === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % cardsLengthRef.current);
      setCycleKey((k) => k + 1);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    cardsLengthRef.current = cards.length;
    if (cards.length === 0) return;
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cards.length, startAutoplay]);

  const selectIndex = (index: number) => {
    setActiveIndex(index);
    setCycleKey((k) => k + 1);
    startAutoplay();
  };

  if (loading || !services) return null;

  const active = cards[activeIndex];
  const ActiveIcon = ICONS[activeIndex % ICONS.length];
  const accent = ACCENTS[activeIndex % ACCENTS.length];

  return (
    <section className="services" id="services">
      <div className="services-layout">
        <div className="services-header">
          <span className="services-eyebrow">{services.eyebrow}</span>
          <h2 className="services-title">
            {services.titleStart}{" "}
            <span className="services-title-gold">{services.titleGold}</span>
          </h2>
          <p className="services-sub">{services.sub}</p>
        </div>

        <div
          ref={elementRef}
          className={`services-spotlight reveal ${isVisible ? "is-visible" : ""}`}
          style={{ "--spot-accent": accent } as CSSProperties}
        >
          <div className="services-list" role="tablist" aria-label={services.eyebrow}>
            {cards.map((card, index) => {
              const CardIcon = ICONS[index % ICONS.length];
              const isActive = index === activeIndex;
              return (
                <button
                  key={card.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`services-list-item ${isActive ? "is-active" : ""}`}
                  style={{ "--item-accent": ACCENTS[index % ACCENTS.length] } as CSSProperties}
                  onClick={() => selectIndex(index)}
                >
                  <span className="services-list-num">
                    {String(card.position).padStart(2, "0")}
                  </span>
                  <CardIcon aria-hidden="true" className="services-list-icon" />
                  <span className="services-list-title">{card.title}</span>

                  {isActive && (
                    <span className="services-list-progress" aria-hidden="true">
                      <span
                        key={cycleKey}
                        className="services-list-progress-fill"
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div key={active.slug} className="services-panel">
            <span className="services-panel-ghost" aria-hidden="true">
              {String(active.position).padStart(2, "0")}
            </span>

            <span className="services-panel-icon">
              <ActiveIcon aria-hidden={true} />
            </span>

            <h3 className="services-panel-title">{active.title}</h3>
            <p className="services-panel-desc">{active.description}</p>

            <a
              href={`/servicios/${active.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="services-panel-cta"
            >
              {active.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
