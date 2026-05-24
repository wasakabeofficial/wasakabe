import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Canal.css";

const youtubeId = import.meta.env.VITE_YOUTUBE_ID as string;
const facebookPageId = import.meta.env.VITE_FACEBOOK_PAGE_ID as string;

const channels = [
  {
    name: "YouTube",
    icon: FaYoutube,
    color: "#FF0000",
    handle: `Canal WasakaBe`,
    description:
      "Contenido técnico sobre IA, desarrollo de software, arquitectura de sistemas y tecnología en general. Tutoriales, análisis y proyectos en vivo.",
    stats: ["Tutoriales", "Proyectos", "Semanales"],
    url: `https://youtube.com/channel/${youtubeId}`,
    label: "SUSCRIBIRSE",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    color: "#1877F2",
    handle: "WasakaBe Oficial",
    description:
      "Comunidad activa donde comparto contenido exclusivo, detrás de cámaras, música y conexión directa con la audiencia.",
    stats: ["Contenido diario", "Comunidad", "Exclusivo"],
    url: `https://facebook.com/${facebookPageId}`,
    label: "SEGUIR",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    color: "#E4405F",
    handle: "@wasakabeofficial",
    description:
      "Detrás de cámaras, fotografías, adelantos de proyectos y estilo de vida como ingeniero y creador multidisciplinario.",
    stats: ["Historias", "Detrás de cámaras", "Directos"],
    url: `https://instagram.com/wasakabeofficial`,
    label: "SEGUIR",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "#0A66C2",
    handle: "WasakaBe Official",
    description:
      "Red profesional donde comparto experiencia en IA, arquitectura de software, proyectos tecnológicos y crecimiento profesional.",
    stats: ["Red profesional", "Proyectos", "Artículos"],
    url: "https://linkedin.com/company/wasakabeofficial",
    label: "CONECTAR",
  },
];

export default function Canal() {
  return (
    <section id="canal" className="canal">
      <div className="canal-layout">
        <div className="canal-header">
          <span className="canal-eyebrow">CANAL & COMUNIDAD</span>
          <h2 className="canal-title">
            MIRA MI <span className="canal-title-gold">CONTENIDO</span>
          </h2>
          <p className="canal-sub">
            Sígueme en YouTube, Facebook, Instagram y LinkedIn para
            contenido semanal sobre IA, desarrollo, música y tecnología.
          </p>
        </div>

        <div className="canal-grid">
          {channels.map((ch) => (
            <article key={ch.name} className="canal-card">
              <div className="canal-card-top">
                <ch.icon
                  className="canal-card-icon"
                  style={{ color: ch.color }}
                  aria-hidden="true"
                />
                <span className="canal-card-name">{ch.name}</span>
              </div>

              <span className="canal-card-handle">{ch.handle}</span>

              <p className="canal-card-desc">{ch.description}</p>

              <div className="canal-card-stats">
                {ch.stats.map((s) => (
                  <span key={s} className="canal-card-stat">
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="canal-card-btn"
              >
                {ch.label} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
