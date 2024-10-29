"use server";

import { setApiHeaders } from "../../utils/setApiHeaders";

type PropType = {
  rounds: number;
};

export const getTotalCompletedRounds = async (
  query: string
): Promise<number> => {
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
      return accumulator + currentValue.rounds;
    }, 0);

    console.log("COMPLETED ROUNDS: ", summedData);

    return summedData;
  } catch (error: any) {
    console.error("Function error: ", error.message);
    throw error;
  }
};
