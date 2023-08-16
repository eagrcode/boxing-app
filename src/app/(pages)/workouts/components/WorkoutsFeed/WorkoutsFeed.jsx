// styles
import styles from "./WorkoutsFeed.module.scss";

// components
import WorkoutCard from "@/src/components/WorkoutCard/WorkoutCard.jsx";

// utils
import getWorkouts from "@/src/utils/getWorkouts";

const WorkoutsFeed = async () => {
  // fetch workouts data
  const workouts = await getWorkouts();

  console.log(workouts);

  return (
    <div className={styles.container}>
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          id={workout.id}
          title={workout.title}
          workoutRounds={workout.number_of_rounds}
          workoutRoundTime={workout.round_time}
          createdBy={workout.profiles.email}
        />
      ))}
    </div>
  );
};

export default WorkoutsFeed;
