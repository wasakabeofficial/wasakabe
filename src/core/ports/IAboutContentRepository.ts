import type { LanguageCode } from "../value-objects/Language";
import type { AboutContent } from "../value-objects/PortfolioContent";

export interface IAboutContentRepository {
  getAboutContent(language: LanguageCode): Promise<AboutContent>;
}
