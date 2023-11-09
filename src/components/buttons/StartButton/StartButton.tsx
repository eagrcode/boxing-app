"use client";

import styles from "./StartButton.module.scss";
import PulseLoader from "react-spinners/PulseLoader";
import { useFormStatus } from "react-dom";

export default function StartButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className={styles.btnStart}>
      {pending ? (
        <PulseLoader
          loading={pending}
          color="var(--header-color-main)"
          aria-label="Loading Spinner"
          data-testid="loader"
          size={8}
        />
      ) : (
        "START"
      )}
    </button>
  );
}
