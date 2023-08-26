import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const GET = async (request: Request, { params }: any) => {
  const { id } = params;

  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from("workouts")
      .select(
        `
      *,
      profiles: user_id (email)
    `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error); // log the error to the server console
    return new NextResponse("By id Database error!", { status: 500 });
  }
};
