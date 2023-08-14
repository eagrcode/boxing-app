import styles from "./Navbar.module.scss";

import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { GiCrossedSwords } from "react-icons/gi";

const Navbar = () => {
  const links = [
    {
      id: 1,
      title: "Home",
      url: "/",
      icon: <FaHome size={30} />,
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
      icon: <GiCrossedSwords size={30} />,
    },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.url}>
                {link.icon}
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
