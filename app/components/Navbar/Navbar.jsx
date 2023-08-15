import styles from "./Navbar.module.scss";

import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { GiCrossedSwords } from "react-icons/gi";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Navbar = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session?.user);

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
    {
      id: 4,
      title: session ? "Logout" : "Login",
      url: "/login",
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
        {session && <p>Hello, user!</p>}
      </nav>
    </header>
  );
};

export default Navbar;
