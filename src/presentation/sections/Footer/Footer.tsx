import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Servicios", href: "#services" },
  { label: "Experiencia", href: "#experience" },
  { label: "Contacto", href: "#contact" },
];

const socialLinks = [
  {
    icon: FaYoutube,
    href: `https://youtube.com/channel/${import.meta.env.VITE_YOUTUBE_ID}`,
    label: "YouTube",
  },
  {
    icon: FaFacebook,
    href: `https://facebook.com/${import.meta.env.VITE_FACEBOOK_PAGE_ID}`,
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/wasakabeofficial",
    label: "Instagram",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/company/wasakabeofficial",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-layout">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src="/images/logo.png"
              alt="Wasaka Be"
              className="footer-logo"
              loading="lazy"
            />
            <span className="footer-tagline">
              Ingeniería · IA · Creatividad
            </span>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-social">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={s.label}
              >
                <s.icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} Wasaka Be. Todos los derechos
            reservados.
          </span>
          <span className="footer-legal">Alan de Jesús Martínez Hernández</span>
        </div>
      </div>
    </footer>
  );
}
