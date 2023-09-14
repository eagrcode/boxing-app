"use client";

// styles
import styles from "./BackButton.module.scss";

// next
import { useRouter } from "next/navigation";

// icons
import { IoChevronBack } from "react-icons/io5";

interface BackButtonProps {
  variant?: string;
}

export default function BackButton({ variant }: BackButtonProps) {
  // init hooks
  const router = useRouter();

  return (
    <button
      className={variant === "sidebar" ? `${styles.button} ${styles.sidebar}` : styles.button}
      onClick={() => router.back()}
    >
      <IoChevronBack size={35} />
    </button>
  );
}
