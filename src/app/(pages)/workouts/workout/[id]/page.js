// utils
import getWorkoutById from "@/src/utils/getWorkoutById";
import getWorkoutLikes from "@/src/utils/getWorkoutLikes";
import isWorkoutSaved from "@/src/utils/isWorkoutSaved";

// components
import Workout from "./components/Workout";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

export default async function WorkoutPage({ params }) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session && session.user;

  // fetch data
  const likes = await getWorkoutLikes(params.id);
  const saved = await isWorkoutSaved(params.id, user.id);
  const workoutData = await getWorkoutById(params.id);

  console.log("workout page likes:", likes);

  return (
    <Workout
      id={workoutData.id}
      title={workoutData.title}
      numberOfRounds={workoutData.number_of_rounds}
      roundTime={workoutData.round_time}
      restTime={workoutData.rest_time}
      warmupTime={workoutData.warmup_time}
      roundInfo={workoutData.round_info}
      data={workoutData}
      likes={likes}
      saved={saved}
      userID={user && user.id}
    />
  );
}
