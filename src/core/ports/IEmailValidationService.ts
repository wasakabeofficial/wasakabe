import type { EmailVerificationResult } from "./IEmailVerifier";

export interface IEmailValidationService {
  validate(email: string): Promise<EmailVerificationResult>;
}
