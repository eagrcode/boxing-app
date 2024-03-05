"use client";

import styles from "./ProfileBanner.module.scss";
import React from "react";
import { useAppSelector } from "@/src/redux/hooks";
import ProfileNav from "@/src/components/profile/ProfileNav/ProfileNav";

type PropTypes = {
  workoutsCount: number;
  savedWorkoutsCount: number;
};

export default function ProfileBanner({ workoutsCount, savedWorkoutsCount }: PropTypes) {
  const user = useAppSelector((state) => state.auth);

  const { userID, fullName, email, avatarURL, username } = user;

  return (
    <div className={styles.profileBanner}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <h1>{fullName}</h1>
          <p>{username}</p>
        </div>
        <div className={styles.topRight}>
          <p>{`${workoutsCount} workout${workoutsCount === 0 || workoutsCount > 1 ? "s" : ""}`}</p>
          <p>{savedWorkoutsCount} saved</p>
        </div>
      </div>
      {/* <div className={styles.bio}>
        The name's Smith...Guest Smith, just your average fake account.
      </div> */}
      <button className={styles.btnEdit}>Edit profile</button>
      <ProfileNav />
    </div>
  );
}
