"use client";

// styles
import styles from "./UserAccountNav.module.scss";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserAccountNav() {
  // init links
  const links = [
    {
      id: 1,
      title: "Posts",
      url: "/account",
    },
    {
      id: 2,
      title: "Saved",
      url: "/account/savedWorkouts",
    },
    {
      id: 3,
      title: "History",
      url: "/account/history",
    },
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
