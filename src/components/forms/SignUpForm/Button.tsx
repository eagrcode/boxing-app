"use client";

// styles
import styles from "./SignUpForm.module.scss";

// loader
import PulseLoader from "react-spinners/PulseLoader";

type ButtonProps = {
  isLoading: boolean;
};

export default function Button({ isLoading }: ButtonProps) {
  return (
    <button disabled={isLoading} type="submit" className={styles.signUpBtn}>
      {isLoading ? (
        <PulseLoader
          loading={isLoading}
          color="var(--header-color-main)"
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
