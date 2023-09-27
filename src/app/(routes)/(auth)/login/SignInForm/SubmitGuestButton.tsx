"use client";

// styles
import styles from "./SignInForm.module.scss";

// loader
import PulseLoader from "react-spinners/PulseLoader";

type ButtonProps = {
  isLoadingGuest: boolean;
};

export default function SubmitGuestButton({ isLoadingGuest }: ButtonProps) {
  return (
    <button disabled={isLoadingGuest} type="submit" className={styles.signInBtnGuest}>
      {isLoadingGuest ? (
        <PulseLoader
          loading={isLoadingGuest}
          color="var(--header-color-main)"
          aria-label="Loading Spinner"
          data-testid="loader"
          size={8}
        />
      ) : (
        "Continue as guest"
      )}
    </button>
  );
}
