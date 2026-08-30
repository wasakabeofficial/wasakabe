import type { LanguageCode } from "../value-objects/Language";
import type { ServicesContent } from "../value-objects/PortfolioContent";

export interface IServicesContentRepository {
  getServicesContent(language: LanguageCode): Promise<ServicesContent>;
}
