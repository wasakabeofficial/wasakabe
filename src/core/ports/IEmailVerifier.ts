export interface EmailVerificationResult {
  valid: boolean;
  reason: string | null;
  warning: string | null;
}

export interface IEmailVerifier {
  verify(email: string): Promise<EmailVerificationResult>;
}
