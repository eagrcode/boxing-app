"use server";

import { cookies } from "next/headers";

interface SixMonthsData {
  month: string;
  entry_count: number;
}

export const getSixMonthsData = async (userID: string, query: string): Promise<SixMonthsData[]> => {
  try {
    const supabaseToken = cookies().get("sb-qaohjtcwvtqnnmzvhzty-auth-token")?.value;
    const accessToken = supabaseToken ? JSON.parse(supabaseToken)[0] : "";

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
    headers.set("Authorization", "Bearer " + accessToken);

    const res = await fetch(
      process.env.NEXT_PUBLIC_SUPABASE_URL +
        `/rest/v1/rpc/${query ? query : "get_completed_workouts"}`,
      {
        method: "POST",
        body: JSON.stringify({ p_user_id: userID }),
        headers: headers,
        cache: "force-cache",
      }
    );

    const data = await res.json();

    console.log(query ? query : "get_completed_workouts", data);

    return data as SixMonthsData[];
  } catch (error: any) {
    console.error("Error with fetchWithSupabaseToken function: ", error.message);
    throw error;
  }
};
