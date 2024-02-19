"use client";

import styles from "./WorkoutAvatar.module.scss";
import Image from "next/image";

export default function WorkoutAvatar({
  fullName,
  avatarURL,
}: {
  fullName: string;
  avatarURL: string;
}) {
  return (
    <>
      {avatarURL === "" ? (
        <div className={`${styles.avatar} ${styles.bdAvatar}  `}>
          <div>{fullName && fullName.charAt(0).toUpperCase()}</div>
        </div>
      ) : (
        <div className={`${styles.avatar} ${styles.googleAvatar}`}>
          <Image src={`${avatarURL}`} alt="User avatar" height={25} width={25} />
        </div>
      )}
    </>
  );
}
