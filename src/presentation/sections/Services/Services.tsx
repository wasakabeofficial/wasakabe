import { MdCode, MdAutoAwesome, MdVideocam, MdSchool } from "react-icons/md";
import { useServicesContent } from "../../hooks/useServicesContent";
import ServiceCard from "./ServiceCard";
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
          {services.cards.map((card, index) => (
            <ServiceCard
              key={card.slug}
              position={card.position}
              title={card.title}
              description={card.description}
              ctaLabel={card.ctaLabel}
              icon={icons[index]}
              accent={accents[index]}
              revealDelayMs={index * 90}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
