"use client";

import styles from "./SignInForm.module.scss";
import PulseLoader from "react-spinners/PulseLoader";
import { FaUserSecret } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";

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
        <>
          <AiFillEyeInvisible size={20} className={styles.icon} /> Sign in as guest
        </>
      )}
    </button>
  );
}
