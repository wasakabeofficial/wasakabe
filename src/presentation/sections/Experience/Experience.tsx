import "./Experience.css";

const experience = [
  {
    period: "MAY 2025 — PRESENTE",
    role: "Full Stack AI Engineer",
    company: "Neuropoint.ai",
    location: "San Pedro Garza García, N.L.",
    highlights: [
      "Ecosistemas de Agentes de IA — Ingeniería y despliegue en producción de agentes conversacionales autónomos (voz y texto) para automatización de flujos de trabajo y atención 24/7 en sectores médico, hospitalario y de eventos.",
      "Monitoreo Autonómico de Infraestructura — Arquitectura de un sistema inteligente de alertas mediante la integración de agentes de IA con Zabbix y GNS3, incluyendo un motor de enrutamiento de alta precisión para gestión autónoma de incidentes.",
      "Arquitectura para Logística y Automatización B2B — Diseño backend de plataformas de IA para optimización de operaciones aduaneras complejas. Orquestación de pipelines de web scraping y agentes de IA para prospección automatizada en LinkedIn y cribado inteligente de candidatos en procesos de Recursos Humanos.",
    ],
    tags: ["AI Agents", "n8n", "LLMs", "Automation", "Zabbix", "GNS3"],
  },
  {
    period: "ENE — ABR 2025",
    role: "Mobile Developer",
    company: "Like Capital",
    location: "San Pedro Garza García, N.L.",
    highlights: [
      "Ingeniería Mobile End-to-End — Responsable único del ciclo completo de desarrollo, desde la arquitectura hasta la publicación en App Store y Google Play, utilizando React Native.",
      "Pasarelas de Pago — Integración de infraestructura de pagos segura y recurrente con Stripe, gestionando lógica transaccional compleja bajo cumplimiento PCI.",
      'Módulos de Impacto Social — Desarrollo de un ecosistema de red privada ("Connect") con feeds en tiempo real y un sistema ciudadano de reporte de incidentes urbanos.',
    ],
    tags: ["React Native", "Stripe", "Mobile", "iOS", "Android"],
  },
  {
    period: "SEP 2023 — DIC 2024",
    role: "Full Stack Software Engineer",
    company: "CBTA No. 5",
    location: "Huejutla de Reyes, Hgo.",
    highlights: [
      "Arquitectura Hexagonal Backend — Desarrollo de APIs robustas y desacopladas en Python (Flask) bajo principios de Arquitectura Hexagonal para asegurar mantenibilidad y flexibilidad.",
      "Ecosistema Multiplataforma — Líder de arquitectura para una red unificada utilizando React.js + Vite (TypeScript) en web y Flutter para dispositivos móviles y wearables (Smartwatches).",
      "Integración de Voz (Alexa) — Desarrollo de una skill de Amazon Alexa para la consulta en tiempo real de registros académicos mediante procesamiento de lenguaje natural.",
      "Identidad Digital y DevOps — Diseño de control de acceso perimetral mediante credenciales digitales e implementación de pipelines de CI/CD para automatización de pruebas y despliegue.",
    ],
    tags: ["Flask", "React", "Flutter", "Alexa", "CI/CD", "Python"],
  },
  {
    period: "FEB — ABR 2024",
    role: "Software Engineer",
    company: "IFRESH",
    location: "Pachuca, Hgo.",
    highlights: [
      "Optimización y Mantenimiento Evolutivo — Corrección de fallos críticos en plataformas empresariales basadas en Java (Spring Boot) y PHP (Laravel).",
      "Motores de Notificación y Datos — Diseño de un sistema de alertas institucionales bajo la convención de nomenclatura DSD-Core y liderazgo en la migración y limpieza de bases de datos legadas para asegurar la integridad de caracteres especiales.",
    ],
    tags: ["Java", "Spring Boot", "PHP", "Laravel", "Databases"],
  },
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="experience-layout">
        <div className="experience-header">
          <span className="experience-eyebrow">TRAYECTORIA</span>
          <h2 className="experience-title">
            DONDE HE <span className="experience-title-gold">TRABAJADO</span>
          </h2>
          <p className="experience-sub">
            Experiencia profesional en empresas tecnológicas, combinando
            ingeniería de software con inteligencia artificial.
          </p>
        </div>

        <div className="experience-timeline">
          <div className="experience-line" aria-hidden="true" />

          {experience.map((item, i) => (
            <article
              key={item.company}
              className={`experience-item ${i % 2 === 0 ? "experience-item--left" : "experience-item--right"}`}
            >
              <div className="experience-dot" aria-hidden="true" />

              <div className="experience-card">
                <span className="experience-period">{item.period}</span>
                <h3 className="experience-role">{item.role}</h3>
                <span className="experience-company">{item.company}</span>
                <span className="experience-location">{item.location}</span>

                <ul className="experience-highlights">
                  {item.highlights.map((h, idx) => (
                    <li key={idx} className="experience-highlight">
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="experience-tags">
                  {item.tags.map((t) => (
                    <span key={t} className="experience-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
