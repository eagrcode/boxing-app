import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getWorkoutById = async (id) => {
  const supabase = createServerComponentClient({ cookies });

  console.log("params.id: ", id);

  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      *,
      profiles: user_id (email)
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
