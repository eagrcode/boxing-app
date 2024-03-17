"use client";

import styles from "./ProfileNav.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNav() {
  // init links
  const links = [
    {
      id: 1,
      title: "Workouts",
      url: "/profile",
    },
    {
      id: 2,
      title: "Saved",
      url: "/profile/savedWorkouts",
    },
    // {
    //   id: 3,
    //   title: "History",
    //   url: "/profile/history",
    // },
  ];

  // init hooks
  const path = usePathname();

  function shouldHaveActiveStyles(path: string, linkUrl: string) {
    return (
      path === linkUrl ||
      (path.startsWith("/account/userWorkout/") && linkUrl === "/account") ||
      (path === "/account/savedWorkouts" && linkUrl === "/account/savedWorkouts")
    );
  }

  return (
    <div className={styles.linkContainer}>
      {links.map((link, index) => (
        <Link
          key={index}
          className={
            shouldHaveActiveStyles(path, link.url) ? `${styles.link} ${styles.active}` : styles.link
          }
          href={link.url}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
