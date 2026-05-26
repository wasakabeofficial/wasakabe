import { type FormEvent, useState, useCallback } from "react";
import {
  MdSend,
  MdCheckCircle,
  MdError,
  MdHourglassEmpty,
  MdWarning,
  MdEmail,
} from "react-icons/md";
import { useContactForm } from "../../hooks/useContactForm";
import { useI18n } from "../../i18n/I18nContext";
import type { EmailErrorCode } from "../../../core";
import "./Contact.css";

/** Mapea un código de error de email a su traducción */
function translateEmailError(
  raw: string | null,
  errors: Record<EmailErrorCode, string>,
): string | null {
  if (!raw) return null;
  const key = raw as EmailErrorCode;
  return key in errors ? errors[key] : raw;
}

export default function Contact() {
  const { t, lang } = useI18n();
  const ct = t.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(ct.subjects[0] ?? "");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const {
    status,
    emailError,
    emailWarning,
    verifying,
    setEmailError,
    setEmailWarning,

    validateEmail,
    submit,
    reset: resetForm,
  } = useContactForm();

  const handleEmailBlur = useCallback(
    () => validateEmail(email),
    [email, validateEmail],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await submit({ name, email, subject, message });
    if (ok) {
      setName("");
      setEmail("");
      setSubject(ct.subjects[0]);
      setMessage("");
      resetForm();
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("wasakabeofficial@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const displayEmailError = translateEmailError(emailError, ct.emailErrors);

  return (
    <section id="contact" className="contact">
      <div className="contact-layout">
        <div className="contact-header">
          <span className="contact-eyebrow">{ct.eyebrow}</span>
          <h2 className="contact-title">
            {ct.titleStart} <span className="contact-title-gold">{ct.titleGold}</span>
          </h2>
          <p className="contact-sub">{ct.sub}</p>
        </div>

        <form className="contact-form" key={lang} onSubmit={handleSubmit} noValidate>
          <div className="contact-fields">
            <div className="contact-field">
              <label htmlFor="contact-name" className="contact-label">
                {ct.formLabels.name}
              </label>
              <input
                id="contact-name"
                className="contact-input"
                type="text"
                required
                placeholder={ct.placeholders.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email" className="contact-label">
                {ct.formLabels.email}
              </label>
              <div className="contact-input-wrap">
                <input
                  id="contact-email"
                  className={`contact-input ${displayEmailError ? "contact-input--err" : emailWarning ? "contact-input--warn" : ""}`}
                  type="email"
                  required
                  placeholder={ct.placeholders.email}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                    setEmailWarning(null);
                  }}
                  onBlur={handleEmailBlur}
                />
                {verifying && (
                  <MdHourglassEmpty
                    className="contact-spinner"
                    aria-label={t.common.loading}
                  />
                )}
              </div>
              {displayEmailError && (
                <span className="contact-field-err">{displayEmailError}</span>
              )}
              {emailWarning && !displayEmailError && (
                <span className="contact-field-warn">
                  <MdWarning aria-hidden="true" />
                  {emailWarning}
                </span>
              )}
            </div>

            <div className="contact-field">
              <label htmlFor="contact-subject" className="contact-label">
                {ct.formLabels.subject}
              </label>
              <select
                id="contact-subject"
                className="contact-input contact-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {ct.subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-field contact-field--full">
              <label htmlFor="contact-message" className="contact-label">
                {ct.formLabels.message}
              </label>
              <textarea
                id="contact-message"
                className="contact-input contact-textarea"
                required
                rows={5}
                placeholder={ct.placeholders.message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <p className="contact-dest">
            {ct.directText}{" "}
            <button
              type="button"
              className="contact-dest-btn"
              onClick={handleCopyEmail}
              aria-label="Copy email"
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
              ct.btnSending
            ) : (
              <>
                {ct.btnSend}
                <MdSend className="contact-btn-icon" aria-hidden="true" />
              </>
            )}
          </button>

          {status === "done" && (
            <div className="contact-feedback contact-feedback--ok">
              <MdCheckCircle aria-hidden="true" />
              {ct.feedbackOk}
            </div>
          )}

          {status === "error" && (
            <div className="contact-feedback contact-feedback--err">
              <MdError aria-hidden="true" />
              {ct.feedbackErr}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
