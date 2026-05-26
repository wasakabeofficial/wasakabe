import { useI18n } from "../../i18n/I18nContext";
import { chica } from "../../../assets";
import "./Hero.css";

export default function Hero() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span>{h.badge}</span>
          </div>

          <h1 className="hero-title">
            {h.title} <span className="hero-title-gold">{h.titleGold}</span>
            <br />
            <span className="hero-title-white">{h.titleWhite}</span>{" "}
            <span className="hero-title-gold">{h.titleGold2}</span>
          </h1>

          <p className="hero-desc">{h.desc}</p>

          <div className="hero-actions">
            <a href="#contact" className="hero-btn hero-btn--primary">
              {h.btnPrimary}
              <span className="hero-btn-arrow" aria-hidden="true">→</span>
            </a>
            <a href="#services" className="hero-btn hero-btn--secondary">
              {h.btnSecondary}
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">5+</span>
              <span className="hero-stat-label">{h.statProjects}</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">5+</span>
              <span className="hero-stat-label">{h.statYears}</span>
            </div>
          </div>
        </div>

        <div className="hero-character">
          <div className="hero-character-glow" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--tl" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--tr" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--bl" aria-hidden="true" />
          <div className="hero-bracket hero-bracket--br" aria-hidden="true" />
          <img
            src={chica}
            alt="Hero character Wasaka Be"
            className="hero-character-img"
            loading="eager"
          />
          <div className="hero-character-overlay" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
