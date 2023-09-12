// utils
import getWorkoutById from "./getWorkoutById";
import getWorkoutLikes from "@/src/lib/services/getWorkoutLikes";
import isWorkoutSaved from "@/src/lib/services/isWorkoutSaved";

// components
import Workout from "./Workout/Workout";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

interface WorkoutPageProps {
  params: {
    id: string;
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // fetch data
  const likes = (await getWorkoutLikes(params.id)) || [];
  const saved = await isWorkoutSaved(params.id, user?.id);
  const workoutData = await getWorkoutById(params.id);

  return (
    <Workout
      id={workoutData?.id}
      createdBy={workoutData?.profiles.username}
      title={workoutData?.title}
      description={workoutData?.description}
      workoutRounds={workoutData?.number_of_rounds}
      workoutRoundTime={workoutData?.round_time}
      workoutRestTime={workoutData?.rest_time}
      workoutWarmupTime={workoutData?.warmup_time}
      roundInfo={workoutData?.round_info}
      createdAt={workoutData?.created_at}
      data={workoutData}
      likes={likes}
      saved={saved}
      userID={user?.id || ""}
    />
  );
}
