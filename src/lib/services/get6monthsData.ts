"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface SixMonthsData {
  month: string;
  entry_count: number;
}

export default async function get6MonthsData(id: string, query: string): Promise<SixMonthsData[]> {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase.rpc(`${query ? query : "get_completed_workouts"}`, {
      p_user_id: id,
    });

    if (error) {
      console.log("DB error: ", error.message);
      return [];
    }
    console.log("SERVER ACTION: ", data);
    return data as SixMonthsData[];
  } catch (error: any) {
    console.log("Fetch error: ", error.message);
    return [];
  }
}
