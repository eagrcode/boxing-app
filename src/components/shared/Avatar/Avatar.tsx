"use client";

import styles from "./Avatar.module.scss";
import Image from "next/image";
import { useState } from "react";
import AvatarDropdown from "./AvatarDropdown/AvatarDropdown";
import { useAppSelector } from "@/src/redux/hooks";

export default function Avatar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const user = useAppSelector((state) => state.auth);

  console.log(user);

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
          <div>{fullName && fullName.charAt(0)}</div>
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
