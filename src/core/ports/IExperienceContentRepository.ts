import type { LanguageCode } from "../value-objects/Language";
import type { ExperienceContent } from "../value-objects/PortfolioContent";

export interface IExperienceContentRepository {
  getExperienceContent(language: LanguageCode): Promise<ExperienceContent>;
}
