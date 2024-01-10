"use server";

import { setApiHeaders } from "../../utils/setApiHeaders";

type PropType = {
  created_at: string;
};

export const getTotalCompletedWorkouts = async (query: string): Promise<number> => {
  try {
    const headers = setApiHeaders();

    const res = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + query, {
      headers: headers,
      cache: "force-cache",
    });

    const data: PropType[] = await res.json();

    const dataCount: number = data.length;

    console.log("FETCHED DATA: ", dataCount);

    return dataCount;
  } catch (error: any) {
    console.error("Function error: ", error.message);
    throw error;
  }
};
