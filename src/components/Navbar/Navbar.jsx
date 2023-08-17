"use client";

// styles
import styles from "./Navbar.module.scss";

// icons
import { FaHome } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { GiCrossedSwords } from "react-icons/gi";

// react
import { useState } from "react";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";

// components
import LogoutButton from "../LogoutButton";
import Hamburger from "./Hamburger/Hamburger";

const Navbar = ({ session }) => {
  // init state
  const [isOpen, setIsOpen] = useState(false);

  // destructure user data
  const user = session && session.user;

  // log user details if true
  console.log(user);

  const pathname = usePathname();

  const formatPathname = (pathname) => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/timer":
        return "Timer";
      case "/workouts":
        return "Workouts";
      case "/login":
        return "Login";
      case "/account":
        return "Account";
      default:
        "";
    }
  };

  // init links view for unauthenticated users
  const unAuthLinks = [
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
    {
      id: 4,
      title: "Login",
      url: "/login",
    },
  ];

  // init links view for authenticated users
  const authLinks = [
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
    {
      id: 4,
      title: "Account",
      url: "/account",
      icon: <GiCrossedSwords size={30} />,
    },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        <h1>{formatPathname(pathname)}</h1>
        <div className={`${styles.menuContainer} ${isOpen && styles.isOpen}`}>
          <ul className={styles.menu}>
            {!session
              ? unAuthLinks.map((link, index) => (
                  <li key={index} className={styles.item}>
                    <Link className={styles.link} href={link.url}>
                      {link.title}
                    </Link>
                  </li>
                ))
              : authLinks.map((link) => (
                  <li className={styles.item}>
                    <Link className={styles.link} href={link.url}>
                      {link.title}
                    </Link>
                  </li>
                ))}
            {session && <LogoutButton />}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
