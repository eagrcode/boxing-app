"use client";

// styles
import styles from "./SignUpForm.module.scss";

// loader
import PulseLoader from "react-spinners/PulseLoader";

type ButtonProps = {
  isSubmitting: boolean;
};

export default function Button({ isSubmitting }: ButtonProps) {
  return (
    <button disabled={isSubmitting} type="submit" className={styles.signUpBtn}>
      {isSubmitting ? (
        <PulseLoader
          loading={isSubmitting}
          color="var(--bg-black-0)"
          aria-label="Loading Spinner"
          data-testid="loader"
          size={8}
        />
      ) : (
        "Sign Up"
      )}
    </button>
  );
}
