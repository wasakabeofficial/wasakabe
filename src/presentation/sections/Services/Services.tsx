import { MdCode, MdAutoAwesome, MdVideocam, MdSchool } from "react-icons/md";
import { useServicesContent } from "../../hooks/useServicesContent";
import "./Services.css";

const icons = [MdCode, MdAutoAwesome, MdVideocam, MdSchool];
const accents = ["gold", "gold", "crimson", "crimson"] as const;

export default function Services() {
  const { data: services, loading } = useServicesContent();

  if (loading || !services) return null;

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

        <div className="services-grid">
          {services.cards.map((card, index) => {
            const Icon = icons[index];
            const accent = accents[index];
            return (
              <article
                key={card.slug}
                className={`services-card services-card--${accent}`}
              >
                <span className="services-card-num" aria-hidden="true">
                  {String(card.position).padStart(2, "0")}
                </span>

                <div className="services-card-top">
                  <span className="services-card-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="services-card-title">{card.title}</h3>
                </div>

                <div className="services-card-line" aria-hidden="true" />

                <p className="services-card-desc">{card.description}</p>

                <span className="services-card-cta">{card.ctaLabel}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
