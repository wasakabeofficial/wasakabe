import { validateEmailFormat } from "../../core";
import type {
  IEmailVerifier,
  EmailVerificationResult,
  IEmailValidationService,
} from "../../core";

export class EmailValidationService implements IEmailValidationService {
  #verifiers: IEmailVerifier[];

  constructor(verifiers: IEmailVerifier[]) {
    this.#verifiers = verifiers;
  }

  async validate(email: string): Promise<EmailVerificationResult> {
    const formatError = validateEmailFormat(email);
    if (formatError) {
      return { valid: false, reason: formatError, warning: null };
    }

    for (const verifier of this.#verifiers) {
      const result = await verifier.verify(email);
      if (!result.valid) return result;
      if (result.warning) return result;
    }

    return { valid: true, reason: null, warning: null };
  }
}
