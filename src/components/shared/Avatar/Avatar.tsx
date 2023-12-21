"use client";

import styles from "./Avatar.module.scss";
import Image from "next/image";
import { useState } from "react";
import AvatarDropdown from "./AvatarDropdown/AvatarDropdown";
import { useSelector } from "react-redux";

type propTypes = {
  avatarURL: string;
  fullName: string;
  email: string;
};

export default function Avatar() {
  const [showDropdown, setShowDropdown] = useState(false);

  // Inside your component
  const user = useSelector((state) => state.auth);

  console.log(user);

  // Now you can access user details like:
  const { userID, fullName, email, avatarURL } = user;

  return (
    <>
      {avatarURL ? (
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          className={`${styles.avatar} ${styles.googleAvatar}`}
        >
          <Image src={`${avatarURL}`} alt="User avatar" height={40} width={40} />
        </div>
      ) : (
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          className={`${styles.avatar} ${styles.bdAvatar}`}
        >
          <div>{fullName.charAt(0)}</div>
        </div>
      )}
      {showDropdown && (
        <AvatarDropdown
          avatarURL={avatarURL}
          setShowDropdown={setShowDropdown}
          fullName={fullName}
          email={email}
        />
      )}
    </>
  );
}
