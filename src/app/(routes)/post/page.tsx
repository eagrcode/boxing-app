import styles from "./page.module.scss";
import CreateWorkoutForm from "@/src/components/forms/CreateWorkoutForm/CreateWorkoutForm";

export default function CreateWorkoutPage() {
  return (
    <div className={styles.wrapper}>
      <header>Post</header>
      <CreateWorkoutForm mode={"create"} />
    </div>
  );
}
