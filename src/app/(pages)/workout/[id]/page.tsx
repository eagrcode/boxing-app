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

  const user = session?.user;

  // fetch data
  const likes = await getWorkoutLikes(params.id);
  const saved = await isWorkoutSaved(params.id, user?.id);
  const workoutData = await getWorkoutById(params.id);

  console.log("WORKOUT DATA PAGE: ", workoutData);

  return (
    <Workout
      id={workoutData.id}
      createdBy={workoutData.profiles.username}
      title={workoutData.title}
      description={workoutData.description}
      workoutRounds={workoutData.number_of_rounds}
      workoutRoundTime={workoutData.round_time}
      workoutRestTime={workoutData.rest_time}
      workoutWarmupTime={workoutData.warmup_time}
      roundInfo={workoutData.round_info}
      createdAt={workoutData.created_at}
      data={workoutData}
      likes={likes}
      saved={saved}
      userID={user && user.id}
    />
  );
}
