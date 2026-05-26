import { useI18n } from "../../i18n/I18nContext";
import "./Footer.css";

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  return (
    <footer className="footer">
      <div className="footer-layout">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-tagline">{f.tagline}</span>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {f.links.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <span className="footer-copy">
            {f.copyright.replace("{year}", String(new Date().getFullYear()))}
          </span>
          <span className="footer-legal">{f.legal}</span>
        </div>
      </div>
    </footer>
  );
}
