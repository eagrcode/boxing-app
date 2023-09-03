// styles
import styles from "./page.module.scss";

// components
import WorkoutForm from "@/src/components/WorkoutForm/WorkoutForm";

export default function CreateWorkoutPage() {
  return <WorkoutForm mode={"create"} />;
}
