"use client";

import styles from "./ProfileBanner.module.scss";
import React, { useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import ProfileNav from "@/src/components/profile/ProfileNav/ProfileNav";
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog";

type PropTypes = {
  fullName: string;
  username: string;
  workoutsCount: number;
  savedWorkoutsCount: number;
};

export default function ProfileBanner({
  fullName,
  username,
  workoutsCount,
  savedWorkoutsCount,
}: PropTypes) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleShowDialog = () => {
    setShowDialog((prev) => !prev);
  };

  return (
    <>
      <div className={styles.profileBanner}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h1>{fullName}</h1>
            <p>{username}</p>
          </div>
          <div className={styles.topRight}>
            <p>{`${workoutsCount} workout${
              workoutsCount === 0 || workoutsCount > 1 ? "s" : ""
            }`}</p>
            <p>{savedWorkoutsCount} saved</p>
          </div>
        </div>
        {/* <div className={styles.bio}>
      The name's Smith...Guest Smith, just your average fake account.
    </div> */}
        <button onClick={handleShowDialog} className={styles.btnEdit}>
          Edit profile
        </button>
        <ProfileNav />
      </div>
      {showDialog && (
        <EditProfileDialog fullName={fullName} username={username} setShowDialog={setShowDialog} />
      )}
    </>
  );
}
