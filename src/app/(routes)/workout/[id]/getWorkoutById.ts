import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/src/lib/database.types";

const getWorkoutById = async (id: string) => {
  const supabase = createServerComponentClient<
    Database["public"]["Tables"]["workouts"]["WithProfile"][]
  >({ cookies });

  console.log("params.id: ", id);

  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      *,
      profiles: user_id (username)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
  } else {
    return data;
  }

  console.log("FETCH WORKOUT BY ID: ", data);
};

export default getWorkoutById;
