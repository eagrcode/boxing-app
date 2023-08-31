// utils
import getWorkoutById from "@/src/utils/getWorkoutById";

// components
import UserWorkout from "./components/UserWorkout/UserWorkout";

export default async function UserWorkoutPage({ params }) {
  console.log("params.id: ", params.id);
  const workoutData = await getWorkoutById(params.id);

  console.log("COMPONENT DATA ID: ", workoutData);

  return (
    <>
      <UserWorkout
        id={workoutData.id}
        title={workoutData.title}
        roundTime={workoutData.round_time}
        restTime={workoutData.rest_time}
        warmupTime={workoutData.warmup_time}
        roundInfo={workoutData.round_info}
        workoutData={workoutData}
        numberOfRounds={workoutData.number_of_rounds}
        isPublic={workoutData.is_public}
      />
    </>
  );
}
