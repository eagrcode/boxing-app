// utils
import getWorkoutById from "@/src/utils/getWorkoutById";

const UserWorkoutPage = async ({ params }) => {
  const workoutData = await getWorkoutById(params.id);

  console.log(workoutData);

  return <>{workoutData.id}</>;
};

export default UserWorkoutPage;
