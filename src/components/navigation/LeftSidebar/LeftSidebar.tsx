"use client";

import styles from "./LeftSidebar.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import { TbListSearch } from "react-icons/tb";
import BackButton from "../../buttons/BackButton/BackButton";
import { useTimerDataContext } from "@/src/context/TimerData.context";
import { useWorkoutTimerDataContext } from "@/src/context/WorkoutTimerData.context";

export default function LeftSidebar() {
  const path = usePathname();
  const { isTimerActive } = useTimerDataContext();
  const { isWorkoutMode } = useWorkoutTimerDataContext();

  // init links view for authenticated users
  const authLinks = [
    {
      id: 1,
      title: "Dashboard",
      url: "/",
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

  // Define a function to determine if the link should have active styles
  const shouldHaveActiveStyles = (path: string, linkUrl: string) => {
    return path === linkUrl || (path !== "/" && path.startsWith(linkUrl + "/"));
  };

  // Conditionally render the BackButton based on the path
  const renderBackButton = () => {
    if (
      path.startsWith("/workout/") ||
      path.startsWith("/account/userWorkout/") ||
      path.startsWith("/account/savedWorkouts/")
    ) {
      return <BackButton variant={"sidebar"} />;
    }
    return null;
  };

  if (isTimerActive) {
    return null;
  } else if (isWorkoutMode) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      {/* <Logo variant={"nav"} /> */}
      <ul className={styles.menu}>
        {authLinks.map((link, index) => (
          <li key={index} className={styles.item}>
            <Link
              className={
                shouldHaveActiveStyles(path, link.url)
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
              href={link.url}
            >
              {link.icon}
              <p className={styles.title}> {link.title}</p>
            </Link>
          </li>
        ))}
        {renderBackButton()}
      </ul>
    </nav>
  );
}
