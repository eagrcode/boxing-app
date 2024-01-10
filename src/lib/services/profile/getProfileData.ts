import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function (id: string | undefined) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase.from("profiles").select().eq("id", id).limit(1).single();
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}
