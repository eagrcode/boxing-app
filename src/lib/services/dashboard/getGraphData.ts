"use server";

import { setApiHeaders } from "../../utils/setApiHeaders";

interface GraphData {
  month: string;
  entry_count: number;
}

export const getGraphData = async (url: string, userID: string): Promise<GraphData[]> => {
  try {
    const headers = setApiHeaders();

    const res = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + url, {
      method: "POST",
      body: JSON.stringify({ p_user_id: userID }),
      headers: headers,
      cache: "force-cache",
    });

    const data = await res.json();

    console.log(`GRAPH DATA: ${url} -`, data);

    return data as GraphData[];
  } catch (error: any) {
    console.error("Error with fetchWithSupabaseToken function: ", error.message);
    throw error;
  }
};
