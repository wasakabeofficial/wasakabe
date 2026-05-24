import { MdCode, MdAutoAwesome, MdVideocam, MdSchool } from "react-icons/md";
import "./Services.css";

const services = [
  {
    id: "01",
    icon: MdCode,
    title: "Software Engineering",
    desc: "Arquitectura y desarrollo de sistemas complejos con IA, full-stack, DevOps y mobile. Construyo productos escalables desde el concepto hasta el deploy.",
    accent: "gold",
  },
  {
    id: "02",
    icon: MdAutoAwesome,
    title: "Creative Direction",
    desc: "Dirección creativa para proyectos visuales y audiovisuales. Concepto, narrativa y ejecución con mirada técnica y sensibilidad artística.",
    accent: "gold",
  },
  {
    id: "03",
    icon: MdVideocam,
    title: "Audiovisual",
    desc: "Producción musical, beatmaking, edición de video y postproducción. Del storyboard al master final con estándar profesional.",
    accent: "crimson",
  },
  {
    id: "04",
    icon: MdSchool,
    title: "Mentorship",
    desc: "Guía y asesoría para equipos técnicos y profesionales emergentes. Estrategia de carrera, arquitectura de software y adopción de IA.",
    accent: "crimson",
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services-layout">
        <div className="services-header">
          <span className="services-eyebrow">SERVICIOS</span>
          <h2 className="services-title">
            QUÉ PUEDO <span className="services-title-gold">HACER POR TI</span>
          </h2>
          <p className="services-sub">
            Cuatro áreas donde combino ingeniería de alto nivel con producción
            creativa para entregar resultados medibles.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <article
              key={s.id}
              className={`services-card services-card--${s.accent}`}
            >
              <span className="services-card-num" aria-hidden="true">
                {s.id}
              </span>

              <div className="services-card-top">
                <span className="services-card-icon">
                  <s.icon aria-hidden="true" />
                </span>
                <h3 className="services-card-title">{s.title}</h3>
              </div>

              <div className="services-card-line" aria-hidden="true" />

              <p className="services-card-desc">{s.desc}</p>

              <span className="services-card-cta">Saber más →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
