"use client";

import styles from "./SignInForm.module.scss";
import PulseLoader from "react-spinners/PulseLoader";
import { FaGoogle } from "react-icons/fa";

type ButtonProps = {
  isLoadingGoogle: boolean;
};

export default function SubmitGoogleButton({ isLoadingGoogle }: ButtonProps) {
  return (
    <button disabled={isLoadingGoogle} type="submit" className={styles.signInBtnGoogle}>
      {isLoadingGoogle ? (
        <PulseLoader
          loading={isLoadingGoogle}
          color="var(--header-color-main)"
          aria-label="Loading Spinner"
          data-testid="loader"
          size={8}
        />
      ) : (
        <>
          <FaGoogle size={15} className={styles.icon} /> Sign in with Google
        </>
      )}
    </button>
  );
}
