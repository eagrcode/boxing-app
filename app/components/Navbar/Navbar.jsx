// styles
import styles from "./Navbar.module.scss";

// icons
import { FaHome } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { GiCrossedSwords } from "react-icons/gi";

// supabase client
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// next
import Link from "next/link";
import { cookies } from "next/headers";

// components
import LogoutButton from "../LogoutButton";

const Navbar = async () => {
  // init supabase client
  const supabase = createServerComponentClient({ cookies });

  // get session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // destructure user data
  const user = session && session.user;

  // log user details if true
  console.log(session?.user);

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
        <ul>
          {!session
            ? unAuthLinks.map((link) => <Link href={link.url}>{link.title}</Link>)
            : authLinks.map((link) => <Link href={link.url}>{link.title}</Link>)}
          {session && <LogoutButton />}
        </ul>
      </nav>
      {session && <p>Hello, {user.email}</p>}
    </header>
  );
};

export default Navbar;
