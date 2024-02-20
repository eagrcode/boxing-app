import styles from "./UserSavedWorkouts.module.scss";
import WorkoutPost from "../../shared/WorkoutPost/WorkoutPost";
import getUserSavedWorkouts from "@/src/lib/services/profile/getUserSavedWorkouts";

export default async function UserSavedWorkouts({ userID }: { userID: string }) {
  const savedWorkouts = await getUserSavedWorkouts(userID);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {savedWorkouts &&
          savedWorkouts?.map((save) => (
            <WorkoutPost
              variant={"/workout/"}
              key={save.id}
              userID={userID}
              id={save.workouts.id}
              title={save.workouts.title}
              description={save.workouts.description}
              workoutRounds={save.workouts.number_of_rounds}
              workoutWarmupTime={save.workouts.warmup_time}
              workoutRoundTime={save.workouts.round_time}
              workoutRestTime={save.workouts.rest_time}
              createdAt={save.workouts.created_at}
              createdBy={save.profiles.username || save.profiles.email}
              plays={save.workouts.plays}
              name={save.profiles.full_name}
            />
          ))}
      </div>
    </div>
  );
}
