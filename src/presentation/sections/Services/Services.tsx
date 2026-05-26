import { MdCode, MdAutoAwesome, MdVideocam, MdSchool } from "react-icons/md";
import { useI18n } from "../../i18n/I18nContext";
import "./Services.css";

const icons = [MdCode, MdAutoAwesome, MdVideocam, MdSchool];
const accents = ["gold", "gold", "crimson", "crimson"] as const;

export default function Services() {
  const { t } = useI18n();
  const s = t.services;

  return (
    <section className="services" id="services">
      <div className="services-layout">
        <div className="services-header">
          <span className="services-eyebrow">{s.eyebrow}</span>
          <h2 className="services-title">
            {s.titleStart} <span className="services-title-gold">{s.titleGold}</span>
          </h2>
          <p className="services-sub">{s.sub}</p>
        </div>

        <div className="services-grid">
          {s.cards.map((card, i) => {
            const Icon = icons[i];
            const accent = accents[i];
            return (
              <article
                key={card.id}
                className={`services-card services-card--${accent}`}
              >
                <span className="services-card-num" aria-hidden="true">
                  {card.id}
                </span>

                <div className="services-card-top">
                  <span className="services-card-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="services-card-title">{card.title}</h3>
                </div>

                <div className="services-card-line" aria-hidden="true" />

                <p className="services-card-desc">{card.desc}</p>

                <span className="services-card-cta">{card.cta}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
