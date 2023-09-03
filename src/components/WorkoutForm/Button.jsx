"use client";

// styles
import styles from "./WorkoutForm.module.scss";

// loader
import { Watch } from "react-loader-spinner";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className={styles.fightBtn}>
      {pending ? "Loading..." : "Submit"}
    </button>
  );
}
