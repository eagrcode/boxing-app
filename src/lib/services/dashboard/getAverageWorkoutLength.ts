"use server";

import { setApiHeaders } from "../../utils/setApiHeaders";

type PropType = {
  time: number;
};

export const getAverageWorkoutLength = async (query: string): Promise<number> => {
  try {
    const headers = setApiHeaders();

    const res = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + query, {
      headers: headers,
      cache: "force-cache",
    });

    const data: PropType[] = await res.json();

    if (!data.length) {
      return 0;
    }

    const summedData: number = data?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.time;
    }, 0);

    const summedMinutes: number = Math.floor(summedData / 60);

    const avg: number = Math.ceil(summedMinutes / data.length);

    console.log("AVERAGE WORKOUT LENGTH: ", avg);

    return avg;
  } catch (error: any) {
    console.error("Function error: ", error.message);
    throw error;
  }
};
