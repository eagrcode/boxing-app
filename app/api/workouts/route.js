import { NextResponse } from "next/server";
import connect from "@/utils/dbConnect";
import Workout from "@/models/Workout";

export const GET = async () => {
  // fetch
  try {
    await connect();
    const workouts = await Workout.find();
    return new NextResponse(JSON.stringify(workouts), { status: 200 });
  } catch {
    return new NextResponse("Database error!", { status: 500 });
  }
};
