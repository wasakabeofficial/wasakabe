export { validateEmailFormat } from "./value-objects/Email";
export type { EmailErrorCode } from "./value-objects/Email";
export type {
  ContactFormData,
  ContactResult,
  IContactRepository,
} from "./ports/IContactRepository";
export type {
  EmailVerificationResult,
  IEmailVerifier,
} from "./ports/IEmailVerifier";
export type { IEmailValidationService } from "./ports/IEmailValidationService";
