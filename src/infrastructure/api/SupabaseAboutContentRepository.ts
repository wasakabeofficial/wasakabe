import type {
  AboutContent,
  IAboutContentRepository,
  LanguageCode,
} from "../../core";
import { supabase } from "./supabaseClient";

interface AboutContentRow {
  eyebrow: string;
  heading_start: string;
  heading_gold: string;
  heading_end: string;
  pull_quote: string;
  text1: string;
  text2: string;
  text3_start: string;
  text3_link: string;
  text3_end: string;
  badges_tech: string[];
  badges_creative: string[];
  about_profile: { photo_url: string | null; brand: string };
}

export class SupabaseAboutContentRepository implements IAboutContentRepository {
  async getAboutContent(language: LanguageCode): Promise<AboutContent> {
    const { data, error } = await supabase
      .from("about_profile_translations")
      .select(
        "eyebrow, heading_start, heading_gold, heading_end, pull_quote, text1, text2, text3_start, text3_link, text3_end, badges_tech, badges_creative, about_profile(photo_url, brand)",
      )
      .eq("language_code", language)
      .single();

    if (error || !data) {
      throw new Error(error?.message ?? "No se encontró contenido de About");
    }

    const contentRow = data as unknown as AboutContentRow;

    return {
      photoUrl: contentRow.about_profile.photo_url,
      brand: contentRow.about_profile.brand,
      badgesTech: contentRow.badges_tech,
      badgesCreative: contentRow.badges_creative,
      eyebrow: contentRow.eyebrow,
      headingStart: contentRow.heading_start,
      headingGold: contentRow.heading_gold,
      headingEnd: contentRow.heading_end,
      pullQuote: contentRow.pull_quote,
      text1: contentRow.text1,
      text2: contentRow.text2,
      text3Start: contentRow.text3_start,
      text3Link: contentRow.text3_link,
      text3End: contentRow.text3_end,
    };
  }
}
