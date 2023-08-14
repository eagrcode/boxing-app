import { NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Workout from "@/models/Workout";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const workout = await Workout.findById(id);
    return new NextResponse(JSON.stringify(workout), { status: 200 });
  } catch {
    return new NextResponse("Database error!", { status: 500 });
  }
};
