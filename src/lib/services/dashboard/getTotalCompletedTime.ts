"use server";

import { setApiHeaders } from "../../utils/setApiHeaders";

type PropType = {
  time: number;
};

export const getTotalCompletedTime = async (query: string): Promise<number> => {
  try {
    const headers = await setApiHeaders();

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

    const summedMinutes: number = Math.ceil(summedData / 60);

    console.log("COMPLETED TIME: ", summedMinutes);

    return summedMinutes;
  } catch (error: any) {
    console.error("Function error: ", error.message);
    throw error;
  }
};
