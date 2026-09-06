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
export type { IAboutContentRepository } from "./ports/IAboutContentRepository";
export type { IServicesContentRepository } from "./ports/IServicesContentRepository";
export type { IServiceDetailContentRepository } from "./ports/IServiceDetailContentRepository";
export type { IExperienceContentRepository } from "./ports/IExperienceContentRepository";
export type { ICanalContentRepository } from "./ports/ICanalContentRepository";
export type { IBlogContentRepository } from "./ports/IBlogContentRepository";
export type { LanguageCode } from "./value-objects/Language";
export { LANGUAGE_ORDER } from "./value-objects/Language";
export type {
  AboutContent,
  CanalContent,
  Channel,
  ExperienceContent,
  ExperienceEntry,
  ServiceCard,
  ServiceDetailContent,
  ServiceDetailProcessStep,
  ServiceDetailStackGroup,
  ServicesContent,
} from "./value-objects/PortfolioContent";
export type {
  BlogCategory,
  BlogPost,
  BlogPostSummary,
} from "./value-objects/BlogContent";
