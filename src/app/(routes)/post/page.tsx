import styles from "./page.module.scss";
import WorkoutForm from "@/src/components/forms/CreateEditWorkout/CreateEditWorkout";

export default function CreateWorkoutPage() {
  return (
    <div className={styles.wrapper}>
      <header>Post</header>
      <WorkoutForm mode={"create"} />
    </div>
  );
}
