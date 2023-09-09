import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getRandomCombo(difficulty) {
  const supabase = createClientComponentClient();

  try {
    const { data, error } = await supabase
      .from("random_combination")
      .select()
      .eq("difficulty", difficulty)
      .limit(1)
      .single();

    if (error) {
      console.log(error);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
