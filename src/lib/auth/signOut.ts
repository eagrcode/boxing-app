"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export default async function signOut() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  redirect("/login");
}
