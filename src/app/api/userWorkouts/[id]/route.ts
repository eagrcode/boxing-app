import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const GET = async (request: Request, { params }: any) => {
  console.log(request);

  const { id } = params;

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.from("workouts").select().eq("user_id", id);

    if (error) {
      console.log(error);
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error); // log the error to the server console
    return new NextResponse("Database error!", { status: 500 });
  }
};
