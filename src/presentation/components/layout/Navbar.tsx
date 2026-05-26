import { useState, useRef, useEffect } from "react";
import { MdMenu, MdClose, MdLanguage } from "react-icons/md";
import { useI18n } from "../../i18n/I18nContext";
import {
  LANGUAGE_ORDER,
  LANGUAGE_NAMES,
  LANGUAGE_FLAGS,
  type LanguageCode,
} from "../../i18n/translations";
import "./Navbar.css";

/* ─── Subcomponente: selector de idioma ─── */
function LangSelector({
  closeNav,
}: {
  closeNav?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { lang, setLang } = useI18n();

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleChange = (code: LanguageCode) => {
    setLang(code);
    setOpen(false);
    closeNav?.();
  };

  return (
    <div className="navbar-lang" ref={ref}>
      <button
        className="navbar-lang-btn"
        onClick={() => setOpen(!open)}
        aria-label="Seleccionar idioma"
        aria-expanded={open}
      >
        <MdLanguage className="navbar-lang-icon" aria-hidden="true" />
        <span>{LANGUAGE_FLAGS[lang]}</span>
        <span className="navbar-lang-code">{lang.toUpperCase()}</span>
      </button>
      {open && (
        <div className="navbar-lang-dropdown">
          {LANGUAGE_ORDER.map((code) => (
            <button
              key={code}
              className={`navbar-lang-option ${code === lang ? "navbar-lang-option--active" : ""}`}
              onClick={() => handleChange(code)}
            >
              <span>{LANGUAGE_FLAGS[code]}</span>
              <span>{LANGUAGE_NAMES[code]}</span>
              <span className="navbar-lang-code">{code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Componente principal ─── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="navbar">
      <div className="navbar-layout">
        <a href="#" className="navbar-logo">
          <span className="navbar-logo-wk">WK</span>
          <span className="navbar-logo-full">{t.navbar.logoFull}</span>
        </a>

        <nav className={`navbar-nav ${open ? "navbar-nav--open" : ""}`}>
          {t.navbar.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="navbar-lang--mobile">
            <LangSelector closeNav={() => setOpen(false)} />
          </div>

          <a
            href="#contact"
            className="navbar-cta navbar-cta--mobile"
            onClick={() => setOpen(false)}
          >
            {t.navbar.cta}
          </a>
        </nav>

        <div className="navbar-lang--desktop">
          <LangSelector />
        </div>

        <a href="#contact" className="navbar-cta navbar-cta--desktop">
          {t.navbar.cta}
        </a>

        <button
          className="navbar-toggle"
          onClick={() => { setOpen(!open); }}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
    </header>
  );
}
