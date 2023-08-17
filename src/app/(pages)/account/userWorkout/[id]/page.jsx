// utils
import getWorkoutById from "@/src/utils/getWorkoutById";

export default async function UserWorkoutPage({ params }) {
  const workoutData = await getWorkoutById(params.id);

  console.log(workoutData);

  return <>{workoutData.id}</>;
}
