// styles
import styles from "./UserWorkoutList.module.scss";

// components
import UserWorkoutCard from "../UserWorkoutCard/UserWorkoutCard";

// utils
import getUserWorkouts from "@/src/utils/getUserWorkouts";

export default async function UserWorkoutList({ userID }) {
  // get workouts
  const userWorkouts = await getUserWorkouts(userID);

  return (
    <div className={styles.wrapper}>
      <p>{`My Workouts (${userWorkouts.length})`}</p>
      {userWorkouts && (
        <div className={styles.container}>
          {userWorkouts.map((workout) => (
            <UserWorkoutCard
              key={workout.id}
              id={workout.id}
              title={workout.title}
              workoutRounds={workout.number_of_rounds}
              workoutRoundTime={workout.round_time}
              createdAt={workout.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}
