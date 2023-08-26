import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const GET = async (request: Request, { params }: any) => {
  const { id } = params;

  console.log("Saved route id: ", id);

  try {
    const supabase = createRouteHandlerClient({ cookies });
    let { data, error } = await supabase
      .from("user_saved_workouts")
      .select(
        `
      workout_id,
      workouts: workout_id ("*")
    `
      )
      .eq("user_id", id);

    if (error) {
      console.log(error.message);
    }

    console.log("Saved route data: ", data);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.log(error.message); // log the error to the server console
    return new NextResponse("Saved Route Database error!", { status: 500 });
  }
};
