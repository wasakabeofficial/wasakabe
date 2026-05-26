import type {
  IContactRepository,
  ContactFormData,
  IEmailValidationService,
} from "../../core";

export interface SubmitResult {
  success: boolean;
  error?: string;
  warning?: string;
}

export class SubmitContactUseCase {
  #repository: IContactRepository;
  #validator: IEmailValidationService;

  constructor(repository: IContactRepository, validator: IEmailValidationService) {
    this.#repository = repository;
    this.#validator = validator;
  }

  async validate(email: string) {
    return this.#validator.validate(email);
  }

  async execute(data: ContactFormData): Promise<SubmitResult> {
    const validation = await this.#validator.validate(data.email);

    if (!validation.valid) {
      return {
        success: false,
        error: validation.reason ?? "Correo electrónico inválido",
      };
    }

    const result = await this.#repository.submit(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error ?? "Error al enviar el mensaje. Intenta de nuevo.",
      };
    }

    return { success: true, warning: validation.warning ?? undefined };
  }
}
