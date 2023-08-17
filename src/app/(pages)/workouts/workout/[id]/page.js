// utils
import getWorkoutById from "@/src/utils/getWorkoutById";

// components
import Workout from "./components/Workout";

export default async function WorkoutPage({ params }) {
  const workoutData = await getWorkoutById(params.id);

  return (
    <Workout
      title={workoutData.title}
      numberOfRounds={workoutData.number_of_rounds}
      roundTime={workoutData.round_time}
      restTime={workoutData.rest_time}
      warmupTime={workoutData.warmup_time}
      roundInfo={workoutData.round_info}
      data={workoutData}
    />
  );
}
