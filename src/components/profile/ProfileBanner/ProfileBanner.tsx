"use client";

import styles from "./ProfileBanner.module.scss";
import React from "react";
import { useAppSelector } from "@/src/redux/hooks";
import ProfileNav from "@/src/components/profile/ProfileNav/ProfileNav";

export default function ProfileBanner() {
  const user = useAppSelector((state) => state.auth);

  const { userID, fullName, email, avatarURL, username } = user;

  return (
    <div className={styles.profileBanner}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <h1>{fullName}</h1>
          <p>{username}</p>
        </div>
      </div>
      <ProfileNav />
    </div>
  );
}
