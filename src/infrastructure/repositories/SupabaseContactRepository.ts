import { createClient } from "@supabase/supabase-js";
import type {
  IContactRepository,
  ContactFormData,
  ContactResult,
} from "../../core";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseContactRepository implements IContactRepository {
  async submit(data: ContactFormData): Promise<ContactResult> {
    const { error } = await supabase
      .from("formulario_contactos_wasakabe")
      .insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        messages: data.message,
      });

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  }
}
