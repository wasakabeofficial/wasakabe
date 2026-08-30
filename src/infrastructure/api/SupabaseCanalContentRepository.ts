import type {
  CanalContent,
  Channel,
  ICanalContentRepository,
  LanguageCode,
} from "../../core";
import { supabase } from "./supabaseClient";

interface CanalSectionRow {
  eyebrow: string;
  title_start: string;
  title_gold: string;
  sub: string;
}

interface ChannelRow {
  platform: string;
  url: string;
  color_hex: string | null;
  channel_translations: {
    handle: string;
    description: string;
    stats: string[];
    label: string;
  }[];
}

export class SupabaseCanalContentRepository implements ICanalContentRepository {
  async getCanalContent(language: LanguageCode): Promise<CanalContent> {
    const { data: sectionData, error: sectionError } = await supabase
      .from("canal_section_translations")
      .select("eyebrow, title_start, title_gold, sub")
      .eq("language_code", language)
      .single();

    if (sectionError || !sectionData) {
      throw new Error(
        sectionError?.message ?? "No se encontró contenido de Canal",
      );
    }

    const { data: channelData, error: channelError } = await supabase
      .from("channels")
      .select(
        "platform, url, color_hex, channel_translations!inner(handle, description, stats, label)",
      )
      .eq("channel_translations.language_code", language)
      .order("position");

    if (channelError || !channelData) {
      throw new Error(channelError?.message ?? "No se encontraron canales");
    }

    const sectionRow = sectionData as unknown as CanalSectionRow;
    const channelRows = channelData as unknown as ChannelRow[];

    return {
      eyebrow: sectionRow.eyebrow,
      titleStart: sectionRow.title_start,
      titleGold: sectionRow.title_gold,
      sub: sectionRow.sub,
      channels: channelRows.map(
        (channelRow): Channel => ({
          platform: channelRow.platform,
          url: channelRow.url,
          colorHex: channelRow.color_hex,
          handle: channelRow.channel_translations[0].handle,
          description: channelRow.channel_translations[0].description,
          stats: channelRow.channel_translations[0].stats,
          label: channelRow.channel_translations[0].label,
        }),
      ),
    };
  }
}
