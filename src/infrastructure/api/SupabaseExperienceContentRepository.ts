import type {
  ExperienceContent,
  ExperienceEntry,
  IExperienceContentRepository,
  LanguageCode,
} from "../../core";
import { supabase } from "./supabaseClient";

interface ExperienceSectionRow {
  eyebrow: string;
  title_start: string;
  title_gold: string;
  sub: string;
}

interface ExperienceEntryRow {
  slug: string;
  start_date: string;
  end_date: string | null;
  company: string | null;
  location: string | null;
  experience_entry_translations: {
    period_label: string;
    role: string;
    highlights: string[];
    tags: string[];
  }[];
}

export class SupabaseExperienceContentRepository
  implements IExperienceContentRepository
{
  async getExperienceContent(
    language: LanguageCode,
  ): Promise<ExperienceContent> {
    const { data: sectionData, error: sectionError } = await supabase
      .from("experience_section_translations")
      .select("eyebrow, title_start, title_gold, sub")
      .eq("language_code", language)
      .single();

    if (sectionError || !sectionData) {
      throw new Error(
        sectionError?.message ?? "No se encontró contenido de Trayectoria",
      );
    }

    const { data: entryData, error: entryError } = await supabase
      .from("experience_entries")
      .select(
        "slug, start_date, end_date, company, location, experience_entry_translations!inner(period_label, role, highlights, tags)",
      )
      .eq("experience_entry_translations.language_code", language)
      .order("position");

    if (entryError || !entryData) {
      throw new Error(
        entryError?.message ?? "No se encontró la Trayectoria",
      );
    }

    const sectionRow = sectionData as unknown as ExperienceSectionRow;
    const entryRows = entryData as unknown as ExperienceEntryRow[];

    return {
      eyebrow: sectionRow.eyebrow,
      titleStart: sectionRow.title_start,
      titleGold: sectionRow.title_gold,
      sub: sectionRow.sub,
      entries: entryRows.map(
        (entryRow): ExperienceEntry => ({
          slug: entryRow.slug,
          startDate: entryRow.start_date,
          endDate: entryRow.end_date,
          company: entryRow.company,
          location: entryRow.location,
          periodLabel: entryRow.experience_entry_translations[0].period_label,
          role: entryRow.experience_entry_translations[0].role,
          highlights: entryRow.experience_entry_translations[0].highlights,
          tags: entryRow.experience_entry_translations[0].tags,
        }),
      ),
    };
  }
}
