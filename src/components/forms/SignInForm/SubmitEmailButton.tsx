"use client";

// styles
import styles from "./SignInForm.module.scss";

// loader
import PulseLoader from "react-spinners/PulseLoader";

type ButtonProps = {
  isSubmitting: boolean;
};

export default function SubmitEmailButton({ isSubmitting }: ButtonProps) {
  return (
    <button disabled={isSubmitting} type="submit" className={styles.signInBtn}>
      {isSubmitting ? (
        <PulseLoader
          loading={isSubmitting}
          color="var(--header-color-main)"
          aria-label="Submitting Spinner"
          data-testid="loader"
          size={8}
        />
      ) : (
        "Sign In"
      )}
    </button>
  );
}
