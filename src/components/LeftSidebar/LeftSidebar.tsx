// styles
import styles from "./LeftSidebar.module.scss";

// next
import Link from "next/link";

// icons
import { GoHome } from "react-icons/go";
import { IoTimerOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";

export default function LeftSidebar() {
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
      title: "Workouts",
      url: "/workouts",
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
            <Link className={styles.link} href={link.url}>
              {link.icon}
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
