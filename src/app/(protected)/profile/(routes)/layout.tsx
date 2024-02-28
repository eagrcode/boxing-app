"use client";

import styles from "./page.module.scss";
import UserAccountNav from "@/src/components/profile/UserAccountNav/UserAccountNav";
import Image from "next/image";
import { useAppSelector } from "@/src/redux/hooks";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((state) => state.auth);

  const { userID, fullName, email, avatarURL } = user;

  return (
    <div className={styles.wrapper}>
      <header>Account</header>
      <div className={styles.layoutTop}>
        <div className={styles.topLeft}>
          <div>
            <h1>{fullName}</h1>
          </div>
          <p>{email}</p>
        </div>

        {avatarURL ? (
          <div className={styles.googleAvatar}>
            <Image src={`${avatarURL}`} alt="User avatar" height={65} width={65} />
          </div>
        ) : (
          <div className={styles.avatar}>
            <div>{fullName.charAt(0)}</div>
          </div>
        )}
      </div>
      <UserAccountNav />
      {children}
    </div>
  );
}
