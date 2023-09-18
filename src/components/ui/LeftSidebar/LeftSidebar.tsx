"use client";

// styles
import styles from "./LeftSidebar.module.scss";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";

// icons
import { GoHome } from "react-icons/go";
import { IoTimerOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";

// components
import BackButton from "../../buttons/BackButton/BackButton";
import Logo from "../Logo/Logo";

export default function LeftSidebar() {
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

  return (
    <nav className={styles.nav}>
      <Logo variant={"nav"} />
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
              {/* {link.title} */}
            </Link>
          </li>
        ))}
        {renderBackButton()}
      </ul>
    </nav>
  );
}
