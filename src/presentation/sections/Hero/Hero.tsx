import { lazy, Suspense, type CSSProperties } from "react";
import { useI18n } from "../../i18n/I18nContext";
import { useParallaxLayer } from "../../hooks/useParallaxLayer";
import "./Hero.css";

const HeroCubes = lazy(() => import("./HeroCubes"));

function riseDelay(delayMs: number): CSSProperties {
  return { "--rise-delay": `${delayMs}ms` } as CSSProperties;
}

export default function Hero() {
  const { t } = useI18n();
  const hero = t.hero;
  const gridRef = useParallaxLayer<HTMLDivElement>(0.15);
  const characterRef = useParallaxLayer<HTMLDivElement>(0.06);

  return (
    <section id="hero" className="hero">
      <div className="hero-aurora" aria-hidden="true">
        <span className="hero-aurora-blob hero-aurora-blob--a" />
        <span className="hero-aurora-blob hero-aurora-blob--b" />
        <span className="hero-aurora-blob hero-aurora-blob--c" />
      </div>
      <div ref={gridRef} className="hero-grid" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-badge hero-rise" style={riseDelay(0)}>
            <span className="hero-badge-dot" aria-hidden="true" />
            <span>{hero.badge}</span>
          </div>

          <h1 className="hero-title hero-rise" style={riseDelay(80)}>
            {hero.title} <span className="hero-title-gold">{hero.titleGold}</span>
            <br />
            <span className="hero-title-white">{hero.titleWhite}</span>{" "}
            <span className="hero-title-gold">{hero.titleGold2}</span>
          </h1>

          <p className="hero-desc hero-rise" style={riseDelay(180)}>
            {hero.desc}
          </p>

          <div className="hero-actions hero-rise" style={riseDelay(260)}>
            <a href="#contact" className="hero-btn hero-btn--primary">
              {hero.btnPrimary}
              <span className="hero-btn-arrow" aria-hidden="true">→</span>
            </a>
            <a href="#services" className="hero-btn hero-btn--secondary">
              {hero.btnSecondary}
            </a>
          </div>

          <div className="hero-stats hero-rise" style={riseDelay(340)}>
            <div className="hero-stat">
              <span className="hero-stat-num">5+</span>
              <span className="hero-stat-label">{hero.statProjects}</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">5+</span>
              <span className="hero-stat-label">{hero.statYears}</span>
            </div>
          </div>
        </div>

        <div ref={characterRef} className="hero-character">
          <div className="hero-character-glow" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--tl" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--tr" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--bl" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--br" aria-hidden="true" />
          <div className="hero-cubes" aria-hidden="true">
            <Suspense fallback={null}>
              <HeroCubes />
            </Suspense>
          </div>
          <div className="hero-character-overlay" aria-hidden="true" />

          <div className="hero-float-badge hero-rise" style={riseDelay(420)}>
            <span className="hero-float-badge-dot" aria-hidden="true" />
            {hero.availableBadge}
          </div>
        </div>
      </div>
    </section>
  );
}
