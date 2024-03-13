"use client";

import styles from "./BottomNav.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoTimerOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import BackButton from "../../buttons/BackButton/BackButton";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbListSearch } from "react-icons/tb";
import Avatar from "../../shared/Avatar/Avatar";

export default function BottomNav() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const timerMode = searchParams.get("timer_mode");

  const links = [
    {
      id: 1,
      title: "Dashboard",
      url: "/dashboard",
      icon: <LuLayoutDashboard size={25} />,
    },
    {
      id: 2,
      title: "Timer",
      url: "/timer",
      icon: <IoTimerOutline size={25} />,
    },
    {
      id: 3,
      title: "Create",
      url: "/create",
      icon: <IoCreateOutline size={25} />,
    },
    {
      id: 4,
      title: "Discover",
      url: "/discover",
      icon: <TbListSearch size={25} />,
    },
    {
      id: 5,
      title: "Profile",
      url: "/profile",
      icon: <RiAccountCircleLine size={25} />,
    },
  ];

  const shouldHaveActiveStyles = (path: string, linkUrl: string) => {
    return (
      path === linkUrl ||
      (path.startsWith(linkUrl) && (linkUrl !== "/" || path.startsWith("/workout/")))
    );
  };

  if (timerMode === "active") {
    return null;
  }

  return (
    <nav className={styles.nav}>
      {/* {renderBackButton()} */}
      <ul className={styles.menu}>
        {links.map((link, index) => (
          <li key={index} className={styles.item}>
            <Link
              className={
                shouldHaveActiveStyles(path, link.url)
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
              href={link.url}
              prefetch={true}
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
      <Avatar position={"bottomNav"} />
    </nav>
  );
}
