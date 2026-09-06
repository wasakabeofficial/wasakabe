import type { LanguageCode } from "../value-objects/Language";
import type { CanalContent } from "../value-objects/PortfolioContent";

export interface ICanalContentRepository {
  getCanalContent(language: LanguageCode): Promise<CanalContent>;
}
