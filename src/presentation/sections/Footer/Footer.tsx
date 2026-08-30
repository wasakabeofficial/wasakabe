import { useI18n } from "../../i18n/I18nContext";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import "./Footer.css";

export default function Footer() {
  const { t } = useI18n();
  const footer = t.footer;
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>();
  const legalLinks = footer.links.filter((link) => link.href.startsWith("/"));

  return (
    <footer
      ref={elementRef}
      className={`footer reveal ${isVisible ? "is-visible" : ""}`}
    >
      <div className="footer-layout">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <span className="footer-logo-wk">WK</span>
              <span className="footer-logo-full">WASAKABE</span>
            </a>
            <span className="footer-tagline">{footer.tagline}</span>
          </div>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <span className="footer-copy">
            {footer.copyright.replace("{year}", String(new Date().getFullYear()))}
          </span>

          {legalLinks.length > 0 && (
            <nav className="footer-legal-links" aria-label="Legal">
              {legalLinks.map((link, index) => (
                <span key={link.href} className="footer-legal-link-item">
                  <a href={link.href} className="footer-legal-link">
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="footer-legal-sep" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <span className="footer-legal">{footer.legal}</span>
        </div>
      </div>
    </footer>
  );
}
