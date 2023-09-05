"use client";

// styles
import styles from "./BackButton.module.scss";

// next
import { useRouter } from "next/navigation";

// icons
import { IoChevronBack } from "react-icons/io5";

export default function BackButton() {
  // init hooks
  const router = useRouter();

  return (
    <button className={styles.button} onClick={() => router.back()}>
      <IoChevronBack size={35} />
    </button>
  );
}
