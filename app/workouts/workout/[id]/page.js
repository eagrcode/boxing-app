// utils
import getWorkoutById from "@/app/utils/getWorkoutById";

// components
import Workout from "./Workout";

const WorkoutPage = async ({ params }) => {
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
};

export default WorkoutPage;
