"use client";

// styles
import styles from "./SignInForm.module.scss";

// loader

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className={styles.signInBtn}>
      {pending ? "Loading..." : "Sign In"}
    </button>
  );
}
