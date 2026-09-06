import type {
  IServiceDetailContentRepository,
  LanguageCode,
  ServiceDetailContent,
} from "../../core";
import { supabase } from "./supabaseClient";

interface DetailRow {
  id: number;
  service_slug: string;
}

interface TranslationRow {
  includes: string[];
  goal: string;
  disciplines: string[];
}

interface ProcessStepRow {
  position: number;
  title: string;
  description: string;
}

interface StackGroupRow {
  position: number;
  category: string;
  items: string[];
}

const FALLBACK_LANGUAGE: LanguageCode = "es";

export class SupabaseServiceDetailContentRepository
  implements IServiceDetailContentRepository
{
  async getServiceDetailContent(
    slug: string,
    language: LanguageCode,
  ): Promise<ServiceDetailContent | null> {
    const { data: detailData, error: detailError } = await supabase
      .from("service_details")
      .select("id, service_slug")
      .eq("service_slug", slug)
      .maybeSingle();

    if (detailError || !detailData) return null;

    const detail = detailData as unknown as DetailRow;

    const translation = await this.getTranslation(detail.id, language);
    if (!translation) return null;

    const [process, stack] = await Promise.all([
      this.getProcessSteps(detail.id, language),
      this.getStackGroups(detail.id, language),
    ]);

    return {
      includes: translation.includes,
      goal: translation.goal,
      disciplines: translation.disciplines,
      process: process.map((step) => ({
        title: step.title,
        description: step.description,
      })),
      stack: stack.map((group) => ({
        category: group.category,
        items: group.items,
      })),
    };
  }

  private async getTranslation(
    detailId: number,
    language: LanguageCode,
  ): Promise<TranslationRow | null> {
    const { data } = await supabase
      .from("service_detail_translations")
      .select("includes, goal, disciplines")
      .eq("detail_id", detailId)
      .eq("language_code", language)
      .maybeSingle();

    if (data) return data as unknown as TranslationRow;
    if (language === FALLBACK_LANGUAGE) return null;

    // Hereda el contenido en español si el idioma elegido aún no tiene
    // traducción propia, para que la sección nunca se quede vacía.
    const { data: fallbackData } = await supabase
      .from("service_detail_translations")
      .select("includes, goal, disciplines")
      .eq("detail_id", detailId)
      .eq("language_code", FALLBACK_LANGUAGE)
      .maybeSingle();

    return (fallbackData as unknown as TranslationRow) ?? null;
  }

  private async getProcessSteps(
    detailId: number,
    language: LanguageCode,
  ): Promise<ProcessStepRow[]> {
    const { data } = await supabase
      .from("service_detail_process_steps")
      .select("position, title, description")
      .eq("detail_id", detailId)
      .eq("language_code", language)
      .order("position");

    if (data && data.length > 0) return data as unknown as ProcessStepRow[];
    if (language === FALLBACK_LANGUAGE) return [];

    const { data: fallbackData } = await supabase
      .from("service_detail_process_steps")
      .select("position, title, description")
      .eq("detail_id", detailId)
      .eq("language_code", FALLBACK_LANGUAGE)
      .order("position");

    return (fallbackData as unknown as ProcessStepRow[]) ?? [];
  }

  private async getStackGroups(
    detailId: number,
    language: LanguageCode,
  ): Promise<StackGroupRow[]> {
    const { data } = await supabase
      .from("service_detail_stack_groups")
      .select("position, category, items")
      .eq("detail_id", detailId)
      .eq("language_code", language)
      .order("position");

    if (data && data.length > 0) return data as unknown as StackGroupRow[];
    if (language === FALLBACK_LANGUAGE) return [];

    const { data: fallbackData } = await supabase
      .from("service_detail_stack_groups")
      .select("position, category, items")
      .eq("detail_id", detailId)
      .eq("language_code", FALLBACK_LANGUAGE)
      .order("position");

    return (fallbackData as unknown as StackGroupRow[]) ?? [];
  }
}
