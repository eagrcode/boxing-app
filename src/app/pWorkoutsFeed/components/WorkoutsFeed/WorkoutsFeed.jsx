// components
import WorkoutCard from "@/app/components/WorkoutCard/WorkoutCard.jsx";

// utils
import getWorkouts from "@/app/utils/getWorkouts";

const WorkoutsFeed = async () => {
  // fetch workouts data
  const workouts = await getWorkouts();

  console.log(workouts);

  return (
    <>
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          id={workout.id}
          title={workout.title}
          workoutRounds={workout.number_of_rounds}
          workoutRoundTime={workout.round_time}
        />
      ))}
    </>
  );
};

export default WorkoutsFeed;
