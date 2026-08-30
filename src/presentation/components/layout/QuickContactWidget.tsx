import { useEffect, useState } from "react";
import { useI18n } from "../../i18n/I18nContext";
import { useScrolled } from "../../hooks/useScrolled";
import "./QuickContactWidget.css";

export default function QuickContactWidget() {
  const { t } = useI18n();
  const pastHero = useScrolled(640);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const isOpen = pastHero && !contactVisible;

  return (
    <div
      className={`quick-contact ${isOpen ? "quick-contact--open" : ""}`}
      aria-hidden={!isOpen}
    >
      <div className="quick-contact-top">
        <span className="quick-contact-badge">WK</span>
        <span className="quick-contact-eyebrow">
          {t.contact.titleStart} {t.contact.titleGold}
        </span>
      </div>
      <p className="quick-contact-text">{t.contact.sub}</p>
      <div className="quick-contact-links">
        <a href="#services" className="quick-contact-link">
          {t.navbar.links[1]?.label ?? "Servicios"} &#8594;
        </a>
        <a href="#contact" className="quick-contact-link quick-contact-link--accent">
          {t.navbar.cta} &#8594;
        </a>
      </div>
    </div>
  );
}
