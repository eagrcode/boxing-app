"use client";

// styles
import styles from "./SignUpForm.module.scss";

// loader
import ClockLoader from "react-spinners/ClockLoader";

type ButtonProps = {
  isLoading: boolean;
};

export default function Button({ isLoading }: ButtonProps) {
  return (
    <button disabled={isLoading} type="submit" className={styles.signInBtn}>
      {isLoading ? (
        <ClockLoader
          loading={isLoading}
          size={20}
          color="#fff"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        "Sign Up"
      )}
    </button>
  );
}
