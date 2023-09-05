"use client";

// styles
import styles from "./UserAccountNav.module.scss";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";

// components
import BackButton from "@/src/components/buttons/BackButton/BackButton";

export default function UserAccountNav() {
  // init links
  const links = [
    {
      id: 1,
      title: "My Workouts",
      url: "/account",
    },
    {
      id: 2,
      title: "Saved Workouts",
      url: "/account/savedWorkouts",
    },
  ];

  // init hooks
  const path = usePathname();

  return (
    <div className={styles.linkContainer}>
      {links.map((link) => (
        <Link
          className={path === link.url ? `${styles.link} ${styles.active}` : styles.link}
          href={link.url}
        >
          {link.title}
        </Link>
      ))}
      {path.startsWith("/account/userWorkout/") && <BackButton />}
    </div>
  );
}
