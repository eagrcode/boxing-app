import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getWorkouts = async () => {
  // try {
  //   const res = await fetch("http://192.168.0.27:3000/api/workouts");
  //   if (!res.ok) {
  //     throw new Error(`HTTP error! status: ${res.status}`);
  //   }
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   console.log(`Fetch error: ${error.message}`);
  // }

  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("workouts")
      .select(
        `
        *,
        profiles: user_id (email)
      `
      )
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("DB error: ", error.message);
    }

    console.log("Fetch workouts: ", data);
    return data;
  } catch (error) {
    console.log("Fetch error: ", error.message);
    return [];
  }
};

export default getWorkouts;
