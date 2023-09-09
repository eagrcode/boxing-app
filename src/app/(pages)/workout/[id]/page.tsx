// utils
import getWorkoutById from "@/src/lib/services/getWorkoutById";
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import isWorkoutSaved from "@/src/lib/services/isWorkoutSaved";

// components
import Workout from "@/src/components/ui/Workout/Workout";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function WorkoutPage({ params }: any) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session && session.user;

  // fetch data
  const likes = await getWorkoutLikes(params.id);
  const saved = await isWorkoutSaved(params.id, user?.id);
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
