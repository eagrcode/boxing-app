"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Profile(userID: string) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("profiles").select().eq("id", userID);

  if (error) {
    console.log(error.message);
    return [];
  }

  return data[0];
}
