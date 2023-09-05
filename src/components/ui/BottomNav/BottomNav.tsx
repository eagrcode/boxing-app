"use client";

// styles
import styles from "./BottomNav.module.scss";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";

// icons
import { GoHome } from "react-icons/go";
import { IoTimerOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";

export default function BottomNav() {
  const path = usePathname();

  // init links view for authenticated users
  const authLinks = [
    {
      id: 1,
      title: "Home",
      url: "/",
      icon: <GoHome size={30} />,
    },
    {
      id: 2,
      title: "Timer",
      url: "/timer",
      icon: <IoTimerOutline size={30} />,
    },
    {
      id: 3,
      title: "Create",
      url: "/createWorkout",
      icon: <IoCreateOutline size={30} />,
    },
    {
      id: 4,
      title: "Account",
      url: "/account",
      icon: <RiAccountCircleLine size={30} />,
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {authLinks.map((link, index) => (
          <li key={index} className={styles.item}>
            <Link
              className={
                path === link.url || (path !== "/" && path.startsWith(link.url + "/"))
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
              href={link.url}
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
