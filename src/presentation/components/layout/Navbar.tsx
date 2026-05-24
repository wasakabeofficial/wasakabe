import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import "./Navbar.css";

const links = [
  { label: "Inicio", href: "#" },
  { label: "Servicios", href: "#services" },
  { label: "Experiencia", href: "#experience" },
  { label: "Canal", href: "#canal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-layout">
        <a href="#" className="navbar-logo">
          <span className="navbar-logo-wk">WK</span>
          <span className="navbar-logo-full">WASAKABE</span>
        </a>

        <nav className={`navbar-nav ${open ? "navbar-nav--open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a href="#contact" className="navbar-cta navbar-cta--mobile">
            CONTACTO
          </a>
        </nav>

        <a href="#contact" className="navbar-cta navbar-cta--desktop">
          CONTACTO
        </a>

        <button
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
    </header>
  );
}
