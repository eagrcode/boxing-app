"use client";

import { IoChevronForward } from "react-icons/io5";
import styles from "./DiscoverBackButton.module.scss";
import { useRouter } from "next/navigation";

export default function DiscoverBackButton() {
  const { back } = useRouter();

  function handleClick() {
    back();
  }

  return (
    <button className={styles.btn} onClick={() => handleClick()}>
      <IoChevronForward size={35} />
    </button>
  );
}
