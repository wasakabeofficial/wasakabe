import { type FormEvent, useState } from "react";
import {
  MdSend,
  MdCheckCircle,
  MdError,
  MdHourglassEmpty,
  MdWarning,
  MdEmail,
} from "react-icons/md";
import { supabase } from "../../../lib/supabase";
import { validateEmail } from "../../../lib/emailValidation";
import "./Contact.css";

const subjects = [
  "Proyecto de software",
  "Consultoría en IA",
  "Colaboración creativa",
  "Mentoría",
  "Otro",
];

type FormStatus = "idle" | "sending" | "done" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("wasakabeofficial@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailBlur = async () => {
    if (!email) {
      setEmailError(null);
      setEmailWarning(null);
      return;
    }

    setVerifying(true);
    const { valid, reason, warning } = await validateEmail(email);
    setEmailError(valid ? null : reason);
    setEmailWarning(warning);
    setVerifying(false);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setEmailError(null);
    setEmailWarning(null);
    setVerifying(false);
    setSubject(subjects[0]);
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setVerifying(true);
    const { valid, reason } = await validateEmail(email);
    setVerifying(false);

    if (!valid) {
      setEmailError(reason);
      return;
    }

    setStatus("sending");

    const { error } = await supabase
      .from("formulario_contactos_wasakabe")
      .insert({
        name,
        email,
        subject,
        messages: message,
      });

    if (error) {
      console.error("Supabase error:", error);
      setStatus("error");
      return;
    }

    setStatus("done");
    reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-layout">
        <div className="contact-header">
          <span className="contact-eyebrow">CONTACTO</span>
          <h2 className="contact-title">
            ¿TIENES UN <span className="contact-title-gold">PROYECTO?</span>
          </h2>
          <p className="contact-sub">
            Estoy abierto a colaboraciones, consultorías y nuevos retos.
            Cuéntame sobre tu proyecto y te responderé a la brevedad.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-fields">
            <div className="contact-field">
              <label htmlFor="contact-name" className="contact-label">
                Nombre
              </label>
              <input
                id="contact-name"
                className="contact-input"
                type="text"
                required
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email" className="contact-label">
                Correo electrónico
              </label>
              <div className="contact-input-wrap">
                <input
                  id="contact-email"
                  className={`contact-input ${emailError ? "contact-input--err" : emailWarning ? "contact-input--warn" : ""}`}
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                    if (emailWarning) setEmailWarning(null);
                  }}
                  onBlur={handleEmailBlur}
                />
                {verifying && (
                  <MdHourglassEmpty className="contact-spinner" aria-label="Verificando correo..." />
                )}
              </div>
              {emailError && (
                <span className="contact-field-err">{emailError}</span>
              )}
              {emailWarning && !emailError && (
                <span className="contact-field-warn">
                  <MdWarning aria-hidden="true" />
                  {emailWarning}
                </span>
              )}
            </div>

            <div className="contact-field">
              <label htmlFor="contact-subject" className="contact-label">
                Asunto
              </label>
              <select
                id="contact-subject"
                className="contact-input contact-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-field contact-field--full">
              <label htmlFor="contact-message" className="contact-label">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                className="contact-input contact-textarea"
                required
                rows={5}
                placeholder="Cuéntame sobre tu proyecto..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <p className="contact-dest">
            ¿Prefieres un contacto más directo? Escríbeme directamente a{" "}
            <button
              type="button"
              className="contact-dest-btn"
              onClick={handleCopyEmail}
              aria-label="Copiar correo electrónico"
            >
              <MdEmail aria-hidden="true" />
            </button>
            {copied && (
              <span className="contact-dest-copied">
                wasakabeofficial@gmail.com
              </span>
            )}
          </p>

          <button
            type="submit"
            className="contact-btn"
            disabled={status === "sending" || verifying}
          >
            {status === "sending" ? (
              "ENVIANDO…"
            ) : (
              <>
                ENVIAR MENSAJE
                <MdSend className="contact-btn-icon" aria-hidden="true" />
              </>
            )}
          </button>

          {status === "done" && (
            <div className="contact-feedback contact-feedback--ok">
              <MdCheckCircle aria-hidden="true" />
              Mensaje enviado con éxito. Te responderé pronto.
            </div>
          )}

          {status === "error" && (
            <div className="contact-feedback contact-feedback--err">
              <MdError aria-hidden="true" />
              Hubo un error al enviar. Intenta de nuevo más tarde.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
