import "./Footer.css";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Servicios", href: "#services" },
  { label: "Experiencia", href: "#experience" },
  { label: "Contacto", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-layout">
        <div className="footer-top">
          <div className="footer-brand">
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
        </div>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} Wasaka Be. Todos los derechos
            reservados.
          </span>
          <span className="footer-legal">
            Ing. Alan de Jesús Martínez Hernández
          </span>
        </div>
      </div>
    </footer>
  );
}
