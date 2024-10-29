"use server";

import { setApiHeaders } from "../../utils/setApiHeaders";
import { Workout } from "../../types/workout.types";

export default async function getWorkouts(
  query: string,
  id: string
): Promise<Workout[]> {
  try {
    const headers = await setApiHeaders();

    const res = await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + query, {
      method: "POST",
      body: JSON.stringify({ user_id: id }),
      headers: headers,
      cache: "force-cache",
    });

    const data = await res.json();

    if (!data.length) {
      return [];
    }

    console.log(data);

    return data;
  } catch (error: any) {
    console.error("Function error: ", error.message);
    throw error;
  }
}
