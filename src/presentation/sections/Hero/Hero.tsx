import { chica } from "../../../assets";
import "./Hero.css";


export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span>FULLSTACK · IA · CREATIVO</span>
          </div>

          <h1 className="hero-title">
            INTELIGENCIA <span className="hero-title-gold">HÍBRIDA</span>
            <br />
            <span className="hero-title-white">&</span>{" "}
            <span className="hero-title-gold">PRODUCCIÓN CREATIVA</span>
          </h1>

          <p className="hero-desc">
            Estudio multidisciplinario donde la ingeniería en IA y full-stack
            convergen con el arte cinematográfico y la producción musical.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="hero-btn hero-btn--primary">
              INICIAR PROYECTO
              <span className="hero-btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="#work" className="hero-btn hero-btn--secondary">
              EXPLORAR TRABAJO
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">5</span>
              <span className="hero-stat-label">Proyectos</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-num">5+</span>
              <span className="hero-stat-label">Años</span>
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
            alt="Personaje IA de Wasaka Be"
            className="hero-character-img"
            loading="eager"
          />

          <div className="hero-character-overlay" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
