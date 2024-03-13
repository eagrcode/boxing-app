"use client";

import styles from "./LeftSidebar.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { TbListSearch } from "react-icons/tb";
import React from "react";

const LeftSidebar = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const timerMode = searchParams.get("timer_mode");

  const links = [
    {
      id: 1,
      title: "Dashboard",
      url: "/dashboard",
      icon: <LuLayoutDashboard size={30} />,
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
      url: "/create",
      icon: <IoCreateOutline size={30} />,
    },
    {
      id: 4,
      title: "Discover",
      url: "/discover",
      icon: <TbListSearch size={30} />,
    },
    {
      id: 5,
      title: "Profile",
      url: "/profile",
      icon: <RiAccountCircleLine size={30} />,
    },
  ];

  const shouldHaveActiveStyles = (path: string, linkUrl: string) => {
    return path === linkUrl || (path !== "/" && path.startsWith(linkUrl + "/"));
  };

  if (timerMode === "active") {
    return null;
  }

  return (
    <nav className={styles.nav}>
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
              <p className={styles.title}> {link.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LeftSidebar;
