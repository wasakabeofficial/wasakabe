import { MdCode, MdAutoAwesome, MdVideocam, MdSchool, MdCheck } from "react-icons/md";
import { useServicesContent } from "../hooks/useServicesContent";
import { useServiceDetailContent } from "../hooks/useServiceDetailContent";
import { useI18n } from "../i18n/I18nContext";
import ServiceIllustration from "./ServiceIllustration";
import "./ServiceDetailPage.css";

const ICONS = [MdCode, MdAutoAwesome, MdVideocam, MdSchool];

interface ServiceDetailPageProps {
  slug: string;
}

export default function ServiceDetailPage({ slug }: ServiceDetailPageProps) {
  const { t } = useI18n();
  const sd = t.serviceDetail;
  const { data: services, loading } = useServicesContent();
  const { data: detail, loading: detailLoading } = useServiceDetailContent(slug);

  if (loading) return null;

  const index = services?.cards.findIndex((card) => card.slug === slug) ?? -1;
  const card = index >= 0 ? services?.cards[index] : undefined;

  if (!services || !card) {
    return (
      <main className="service-page">
        <div className="service-page-layout">
          <a href="/#services" className="service-page-back">{sd.back}</a>
          <h1 className="service-page-title">{sd.notFoundTitle}</h1>
          <p className="service-page-desc">{sd.notFoundDesc}</p>
        </div>
      </main>
    );
  }

  const Icon = ICONS[index % ICONS.length];

  return (
    <main className="service-page">
      <div className="service-page-layout">
        <a href="/#services" className="service-page-back">{sd.back}</a>

        <ServiceIllustration slug={slug} />

        <header className="service-page-hero">
          <span className="service-page-icon">
            <Icon aria-hidden={true} />
          </span>
          <div className="service-page-hero-text">
            <span className="service-page-eyebrow">
              {sd.serviceLabel} {String(card.position).padStart(2, "0")}
            </span>
            <h1 className="service-page-title">{card.title}</h1>
            <p className="service-page-desc">{card.description}</p>

            {detail && detail.disciplines.length > 0 && (
              <div className="service-page-disciplines">
                {detail.disciplines.map((d) => (
                  <span key={d} className="service-page-discipline">
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {!detailLoading && detail && (
          <>
            {detail.includes.length > 0 && (
              <section className="service-page-section">
                <h2 className="service-page-h2">{sd.includesHeading}</h2>
                <ul className="service-page-includes">
                  {detail.includes.map((item) => (
                    <li key={item}>
                      <MdCheck aria-hidden="true" className="service-page-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {detail.stack.length > 0 && (
              <section className="service-page-section">
                <h2 className="service-page-h2">{sd.stackHeading}</h2>
                <div className="service-page-stack">
                  {detail.stack.map((group) => (
                    <div key={group.category} className="service-page-stack-group">
                      <span className="service-page-stack-label">{group.category}</span>
                      <div className="service-page-stack-items">
                        {group.items.map((item) => (
                          <span key={item} className="service-page-stack-item">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {detail.process.length > 0 && (
              <section className="service-page-section">
                <h2 className="service-page-h2">{sd.processHeading}</h2>
                <ol className="service-page-process">
                  {detail.process.map((step, i) => (
                    <li key={step.title} className="service-page-step">
                      <span className="service-page-step-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="service-page-step-title">{step.title}</h3>
                        <p className="service-page-step-desc">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className="service-page-section">
              <h2 className="service-page-h2">{sd.goalHeading}</h2>
              <p className="service-page-goal">{detail.goal}</p>
            </section>
          </>
        )}

        <div className="service-page-cta-row">
          <a href="/#contact" className="service-page-cta">
            {sd.ctaContact}
            <span aria-hidden="true">→</span>
          </a>
          <a href="/#services" className="service-page-secondary">
            {sd.ctaAllServices}
          </a>
        </div>
      </div>
    </main>
  );
}
