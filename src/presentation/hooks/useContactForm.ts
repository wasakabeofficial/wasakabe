import { useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import type { ContactFormData } from "../../core";

type FormStatus = "idle" | "sending" | "done" | "error";

const AUTO_RESET_MS = 5000;

export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const { submitContactUseCase: useCase } = useDependencies();

  const clearAlerts = () => {
    setEmailError(null);
    setEmailWarning(null);
  };

  const validateEmail = async (email: string) => {
    if (!email) {
      clearAlerts();
      return;
    }

    setVerifying(true);
    try {
      const result = await useCase.validate(email);
      setEmailError(!result.valid ? result.reason : null);
      setEmailWarning(result.warning);
    } catch {
      setEmailError("Error de validación.");
    } finally {
      setVerifying(false);
    }
  };

  const submit = async (data: ContactFormData): Promise<boolean> => {
    setStatus("sending");
    try {
      const result = await useCase.execute(data);

      if (result.success) {
        setStatus("done");
        setTimeout(() => setStatus("idle"), AUTO_RESET_MS);
        return true;
      }

      setStatus("error");
      setEmailError(result.error ?? "Error al enviar el mensaje.");
      setTimeout(() => setStatus("idle"), AUTO_RESET_MS);
      return false;
    } catch {
      setStatus("error");
      setEmailError("Error inesperado. Intenta de nuevo.");
      setTimeout(() => setStatus("idle"), AUTO_RESET_MS);
      return false;
    }
  };

  const reset = () => {
    setStatus("idle");
    clearAlerts();
    setVerifying(false);
  };

  return {
    status,
    emailError,
    emailWarning,
    verifying,
    setEmailWarning,
    setEmailError,
    clearAlerts,
    validateEmail,
    submit,
    reset,
  };
}
