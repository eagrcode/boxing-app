"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function handleLikePost(
  isLiked: boolean | null,
  id: string,
  userID: string,
  path: string
) {
  const supabase = createServerComponentClient({ cookies });

  if (!isLiked) {
    const { data, error } = await supabase
      .from("likes")
      .upsert([{ workout_id: id, user_id: userID }])
      .select();

    if (error) {
      console.log(error.message);
    } else {
      console.log("Liked: ", data);
    }
  } else {
    const { data, error } = await supabase.from("likes").delete().eq("workout_id", id);

    if (error) {
      console.log(error.message);
    } else {
      console.log("Unliked: ", data);
    }
  }
  revalidatePath(path);
}
