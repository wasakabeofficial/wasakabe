import { type FormEvent, useState } from "react";
import { MdSend, MdCheckCircle, MdError } from "react-icons/md";
import { supabase } from "../../../lib/supabase";
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
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const reset = () => {
    setName("");
    setEmail("");
    setSubject(subjects[0]);
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
              <input
                id="contact-email"
                className="contact-input"
                type="email"
                required
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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

          <button
            type="submit"
            className="contact-btn"
            disabled={status === "sending"}
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
