// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import type { Database } from "@/src/lib/types/database.types";

// export default async function getUserWorkouts(id: string) {
//   const supabase = createServerComponentClient<
//     Database["public"]["Tables"]["workouts"]["WithProfile"][]
//   >({ cookies });

//   try {
//     const { data, error } = await supabase
//       .from("workouts")
//       .select(
//         `
//         *,
//         profiles: user_id (username, email, full_name)
//       `
//       )
//       .eq("user_id", id)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("DB error: ", error.message);
//       return [];
//     }

//     console.log("Fetch workouts: ", data);
//     return data;
//   } catch (error: any) {
//     console.log("Fetch error: ", error.message);
//     return [];
//   }
// }

"use server";

import { setApiHeaders } from "../../utils/setApiHeaders";
import { Workout } from "../../types/workout.types";

export default async function getUserWorkouts(query: string, id: string): Promise<Workout[]> {
  try {
    const headers = setApiHeaders();

    const res = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + query, {
      method: "POST",
      body: JSON.stringify({ user_id: id }),
      headers: headers,
      cache: "force-cache",
    });

    const data = await res.json();

    console.log("GET USER WORKOUTS DATA: ", data);

    if (!data.length) {
      return [];
    }

    return data;
  } catch (error: any) {
    console.error("Function error: ", error.message);
    throw error;
  }
}
