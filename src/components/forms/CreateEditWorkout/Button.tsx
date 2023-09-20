"use client";

// styles
import styles from "./CreateEditWorkout.module.scss";

// loader
import PulseLoader from "react-spinners/PulseLoader";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className={styles.submitBtn}>
      {pending ? (
        <PulseLoader
          loading={pending}
          color="var(--header-color-main)"
          aria-label="Loading Spinner"
          data-testid="loader"
          size={8}
        />
      ) : (
        "Post"
      )}
    </button>
  );
}
