import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getUserCompletedMins(id: string): Promise<number> {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("data_set_user_completed_minutes")
      .select("minutes")
      .eq("user_id", id);

    if (error) {
      console.log("DB error: ", error.message);
    }

    console.log(data);
    return data ? data[0]?.minutes || 0 : 0;
  } catch (error: any) {
    console.log("Fetch error: ", error.message);
    return 0;
  }
}
