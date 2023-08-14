import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const GET = async (request: Request) => {
  console.log(request);
  // fetch
  try {
    const url = new URL(request.url);
    const difficulty = url.searchParams.get("difficulty");
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from("random_combination")
      .select()
      .eq("difficulty", difficulty)
      .limit(1)
      .single();

    if (error) {
      console.log(error);
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error); // log the error to the server console
    return new NextResponse("Database error!", { status: 500 });
  }
};
