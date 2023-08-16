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

// components
import LogoutButton from "../LogoutButton";
import Hamburger from "./Hamburger/Hamburger";

const Navbar = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  // // init supabase client
  // const supabase = createClientComponentClient();

  // // get session data
  // const {
  //   data: { session },
  // } = supabase.auth.getSession();

  // destructure user data
  const user = session && session.user;

  // log user details if true
  console.log(user);

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

  // return (
  //   <header className={styles.header}>
  //     <nav className={styles.nav}>
  //       <ul>
  //         {!session
  //           ? unAuthLinks.map((link) => <Link href={link.url}>{link.title}</Link>)
  //           : authLinks.map((link) => <Link href={link.url}>{link.title}</Link>)}
  //         {session && <LogoutButton />}
  //       </ul>
  //     </nav>
  //   </header>
  // );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`${styles.menuContainer} ${isOpen && styles.isOpen}`}>
          <ul className={styles.menu}>
            <li className={styles.item} onClick={() => setIsOpen(false)}>
              <Link className={styles.link} href="/" scroll={false}>
                Home
              </Link>
            </li>
            <li className={styles.item} onClick={() => setIsOpen(false)}>
              <Link className={styles.link} href="/timer" scroll={false}>
                Timer
              </Link>
            </li>
            <li className={styles.item} onClick={() => setIsOpen(false)}>
              <Link className={styles.link} href="/workouts" scroll={false}>
                Workouts
              </Link>
            </li>
            {user && (
              <>
                <li className={styles.item} onClick={() => setIsOpen(false)}>
                  <Link className={styles.link} href="/account" scroll={false}>
                    Account
                  </Link>
                </li>
                <LogoutButton />
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
