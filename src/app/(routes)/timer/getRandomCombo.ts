import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/src/lib/database.types";

export default async function getRandomCombo(difficulty: string): Promise<string[]> {
  const supabase = createClientComponentClient<Database>();

  try {
    const { data, error } = await supabase
      .from("random_combination")
      .select("sequence")
      .eq("difficulty", difficulty)
      .limit(1)
      .single();

    if (error) {
      console.log(error);
      return [];
    }

    return data.sequence;
  } catch (error) {
    console.error(error);
  }
  return [];
}
