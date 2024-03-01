"use client";

import styles from "./Topbar.module.scss";
import Logo from "../Logo/Logo";
import Avatar from "../Avatar/Avatar";
import { useSearchParams } from "next/navigation";

const Topbar = () => {
  const searchParams = useSearchParams();
  const timerMode = searchParams.get("timer_mode");

  if (timerMode === "active") {
    return null;
  }

  return (
    <div className={styles.topBar}>
      <Logo variant={"nav"} />
      <Avatar position={"topBar"} />
    </div>
  );
};

export default Topbar;
