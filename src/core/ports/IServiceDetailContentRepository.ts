import type { LanguageCode } from "../value-objects/Language";
import type { ServiceDetailContent } from "../value-objects/PortfolioContent";

export interface IServiceDetailContentRepository {
  getServiceDetailContent(
    slug: string,
    language: LanguageCode,
  ): Promise<ServiceDetailContent | null>;
}
