// utils
import getWorkoutById from "@/src/utils/getWorkoutById";

// components
import Workout from "./Workout";

export default async function WorkoutPage({ params }) {
  const workoutData = await getWorkoutById(params.id);

  console.log(workoutData);

  return (
    <Workout
      title={workoutData.title}
      rounds={workoutData.number_of_rounds}
      roundTime={workoutData.round_time}
      restTime={workoutData.rest_time}
      warmupTime={workoutData.warmup_time}
      data={workoutData}
    />
  );
}
