"use client";

// styles
import styles from "./SignInForm.module.scss";

// loader
import PulseLoader from "react-spinners/PulseLoader";

type ButtonProps = {
  isLoading: boolean;
};

export default function SubmitEmailButton({ isLoading }: ButtonProps) {
  return (
    <button disabled={isLoading} type="submit" className={styles.signInBtn}>
      {isLoading ? (
        <PulseLoader
          loading={isLoading}
          color="var(--header-color-main)"
          aria-label="Loading Spinner"
          data-testid="loader"
          size={8}
        />
      ) : (
        "Sign In"
      )}
    </button>
  );
}
