// utils
import getWorkoutById from "@/src/utils/getWorkoutById";
import getWorkoutLikes from "@/src/utils/getWorkoutLikes";

// components
import Workout from "./components/Workout";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

export default async function WorkoutPage({ params }) {
  const workoutData = await getWorkoutById(params.id);

  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  // fetch workout likes
  const likes = await getWorkoutLikes(params.id);

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
      userID={user && user.id}
    />
  );
}
