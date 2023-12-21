"use client";

import Image from "next/image";
import styles from "./AvatarDropdown.module.scss";
import { Dispatch, SetStateAction } from "react";
import LogoutButton from "@/src/components/buttons/LogoutButton/LogoutButton";

type propTypes = {
  avatarURL: string;
  fullName: string;
  email: string;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
};

export default function AvatarDropdown({ avatarURL, fullName, email, setShowDropdown }: propTypes) {
  return (
    <div className={styles.dropdown}>
      {avatarURL ? (
        <>
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className={`${styles.avatar} ${styles.googleAvatar}`}
          >
            <Image src={`${avatarURL}`} alt="User avatar" height={40} width={40} />
          </div>
          <div className={styles.userInfo}>
            <p>{fullName}</p>
            <p className={styles.email}>{email}</p>
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className={`${styles.avatar} ${styles.bdAvatar}`}
          >
            <div>{fullName.charAt(0)}</div>
          </div>
          <div className={styles.userInfo}>
            <p>{fullName}</p>
            <p className={styles.email}>{email}</p>
          </div>
        </>
      )}
      <LogoutButton />
    </div>
  );
}
