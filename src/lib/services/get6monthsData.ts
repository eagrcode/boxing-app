import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface SixMonthsData {
  month: string;
  entry_count: number;
}

export default async function get6MonthsData(id: string): Promise<SixMonthsData[]> {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase.rpc("get_monthly_data");

    if (error) {
      console.log("DB error: ", error.message);
      return [];
    }

    return data as SixMonthsData[];
  } catch (error: any) {
    console.log("Fetch error: ", error.message);
    return [];
  }
}
