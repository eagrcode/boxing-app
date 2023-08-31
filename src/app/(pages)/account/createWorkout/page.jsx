// styles
import styles from "./page.module.scss";

// components
import WorkoutForm from "../components/WorkoutForm/WorkoutForm";

export default function CreateWorkoutPage() {
  return <WorkoutForm mode={"create"} />;
}
