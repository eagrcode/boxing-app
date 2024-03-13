import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

const getUserSavedWorkouts = async (id: string) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data, error } = await supabase.rpc("get_user_saved_workouts", {
      user_id: id,
    });

    if (error) {
      console.log("DB error: ", error.message);
      return [];
    }

    console.log("Fetch saved workouts: ", data);
    return data;
  } catch (error: any) {
    console.log("Fetch error: ", error.message);
    return [];
  }
};

export default unstable_cache(getUserSavedWorkouts);
