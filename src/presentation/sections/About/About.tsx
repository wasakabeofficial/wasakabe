import { yo } from "../../../assets";
import "./About.css";

const badges = [
  { label: "AI Agents", type: "tech" },
  { label: "Fullstack", type: "tech" },
  { label: "DevOps", type: "tech" },
  { label: "LLMs", type: "tech" },
  { label: "Mobile", type: "tech" },
  { label: "Film", type: "creative" },
  { label: "Beatmaker", type: "creative" },
  { label: "Photography", type: "creative" },
  { label: "Direction", type: "creative" },
];

export default function About() {
  return (
    <section className="about">
      <div className="about-layout">
        <div className="about-media">
          <div className="about-frame" aria-hidden="true" />
          <div className="about-frame-corner" aria-hidden="true" />
          <img
            src={yo}
            alt="Alan de Jesús Martínez Hernández — Wasaka Be"
            className="about-img"
            loading="lazy"
          />
          <div className="about-img-glow" aria-hidden="true" />
        </div>

        <div className="about-body">
          <div className="about-accent-bar" aria-hidden="true" />

          <span className="about-eyebrow">SOBRE MÍ</span>

          <h2 className="about-heading">
            ARQUITECTURA
            <br />
            <span className="about-heading-gold">DETRÁS</span> DEL CÓDIGO
          </h2>

          <p className="about-pull">
            &ldquo;El mejor software no solo funciona, también se siente
            bien.&rdquo;
          </p>

          <p className="about-text">
            Arquitecto de software e ingeniero multidisciplinario con
            experiencia en IA, full-stack y DevOps. Mi enfoque combina
            pensamiento sistémico con sensibilidad creativa.
          </p>

          <p className="about-text">
            Detrás de cada línea de código hay una decisión de diseño. Ya sea
            construyendo agentes de IA en Neuropoint.ai, desarrollando
            aplicaciones móviles en XTI Like Capital, o produciendo piezas
            audiovisuales y música, aplico el mismo principio: la arquitectura
            importa.
          </p>

          <p className="about-text">
            <span className="about-credential">
              Ingeniero en Desarrollo y Gestión de Software titulado de la{" "}
              <a
                href="https://www.uthh.edu.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                UTHH
              </a>
              <span className="about-credential-sep" aria-hidden="true" />
              Creador de la marca personal{" "}
              <span className="about-brand">WasakaBe</span>
            </span>
          </p>

          <div className="about-divider" aria-hidden="true" />

          <div className="about-badges">
            {badges.map((b) => (
              <span
                key={b.label}
                className={`about-badge about-badge--${b.type}`}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
