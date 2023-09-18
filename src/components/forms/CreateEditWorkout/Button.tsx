"use client";

// styles
import styles from "./CreateEditWorkout.module.scss";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className={styles.submitBtn}>
      {pending ? "Loading..." : "Post"}
    </button>
  );
}
