import type {
  IServicesContentRepository,
  LanguageCode,
  ServiceCard,
  ServicesContent,
} from "../../core";
import { supabase } from "./supabaseClient";
import { languageFilter, pickTranslation } from "./languageFallback";

interface ServicesSectionRow {
  eyebrow: string;
  title_start: string;
  title_gold: string;
  sub: string;
}

interface ServiceCardRow {
  slug: string;
  position: number;
  icon_url: string | null;
  service_card_translations: {
    language_code: string;
    title: string;
    description: string;
    cta_label: string;
  }[];
}

export class SupabaseServicesContentRepository
  implements IServicesContentRepository
{
  async getServicesContent(language: LanguageCode): Promise<ServicesContent> {
    const { data: sectionData, error: sectionError } = await supabase
      .from("services_section_translations")
      .select("eyebrow, title_start, title_gold, sub")
      .eq("language_code", language)
      .single();

    if (sectionError || !sectionData) {
      throw new Error(
        sectionError?.message ?? "No se encontró contenido de Servicios",
      );
    }

    const { data: cardData, error: cardError } = await supabase
      .from("service_cards")
      .select(
        "slug, position, icon_url, service_card_translations!inner(language_code, title, description, cta_label)",
      )
      .in("service_card_translations.language_code", languageFilter(language))
      .order("position");

    if (cardError || !cardData) {
      throw new Error(
        cardError?.message ?? "No se encontraron tarjetas de Servicios",
      );
    }

    const sectionRow = sectionData as unknown as ServicesSectionRow;
    const cardRows = cardData as unknown as ServiceCardRow[];

    return {
      eyebrow: sectionRow.eyebrow,
      titleStart: sectionRow.title_start,
      titleGold: sectionRow.title_gold,
      sub: sectionRow.sub,
      cards: cardRows.map((cardRow): ServiceCard => {
        const translation = pickTranslation(cardRow.service_card_translations, language);
        return {
          slug: cardRow.slug,
          position: cardRow.position,
          iconUrl: cardRow.icon_url,
          title: translation?.title ?? "",
          description: translation?.description ?? "",
          ctaLabel: translation?.cta_label ?? "",
        };
      }),
    };
  }
}
