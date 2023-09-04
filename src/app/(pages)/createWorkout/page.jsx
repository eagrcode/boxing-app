// styles
import styles from "./page.module.scss";

// components
import WorkoutForm from "@/src/components/forms/CreateEditWorkout/CreateEditWorkout";

export default function CreateWorkoutPage() {
  return <WorkoutForm mode={"create"} />;
}
